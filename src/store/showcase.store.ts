import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import {
  themes,
  DEFAULT_LAYOUT_KEY,
  listThemes,
  colorDistance,
  getThemeMainSwatch,
  getLocalToday,
  isThemeReleased
} from "@/themes/_registry";
import type { ThemeBrightness, ThemeCategory } from "@/themes/_types";

/**
 * Showcase store — 服務「/」showcase 主頁
 *
 * 為什麼獨立成 store 而不重用 theme.store：
 * - 領域不同：theme.store（demo-theme）服務 demo 頁的 layoutKey / colorKey / fabPosition；
 *   showcase 頁完全不關心 layoutKey、不需要 persist 配色
 * - 解耦後 showcase 頁不會誤觸 LS 寫入、不必背 demo store 的 mode 旗標
 * - 元件 inject 時意圖明確：showcase 頁只 `useShowcaseStore`、demo 頁只 `useDemoThemeStore`
 *
 * 目前 state：
 * - 預覽 dialog 開關 + 鎖定當前預覽的 layoutKey
 * - dialog 內當前顯示的尺寸 tab（desktop / mobile）
 * - showcaseLogoKey：頁面頂部 logo 切換 row 選的 key，決定三張卡片預覽圖以哪個 logo 呈現
 * 之後若加篩選 / 排序 / hover preview 也都歸到這份 store。
 */

export type PreviewDevice = "desktop" | "mobile";

/**
 * 排序方向
 *
 * - "oldest"：由舊到新（預設）
 * - "newest"：由新到舊
 * - "code"：依編號 label 前綴升序（a01 → a02 → … → b01 → …）
 *           取 label 的 `<letter><nn>` 前綴比較：letter 升序為主鍵、兩位流水號升序為次鍵，
 *           讓使用者「點了之後從 a01、a02 這樣排，a 類排完再換 b 類」
 *
 * 為什麼用 union 而非 boolean：
 * - 語意明確，避免「true = 由新到舊 還是 由舊到新」的歧義
 * - 三態（oldest / newest / code）天然不適合 boolean，union 才表達得了
 * - UI segmented control 可直接綁這個值，與既有 BrightnessFilter 風格一致
 */
export type SortOrder = "oldest" | "newest" | "code";

/**
 * 沒有 releaseDate 的舊 theme 排序時視為「最早」用的哨兵字串
 *
 * 為什麼用 "0000-00-00"：
 * - 排序主鍵是 releaseDate（YYYY-MM-DD 字串字典序 == 時間序）
 * - 既有 13 個舊 theme 確實是最早建立、但沒有 releaseDate 欄位，
 *   用一個「字典序必定小於任何真實日期」的哨兵讓它們排在最前面（oldest 升序時）
 * - 它們彼此之間 / 與有日期者之間的穩定先後，再用 registryIndex 當 tiebreaker
 */
const NO_RELEASE_DATE_SENTINEL = "0000-00-00";

/**
 * 亮暗篩選值
 *
 * 為什麼用 union 而非 ThemeBrightness | null：
 * - "all" 是「不篩選」的明確語意值，比 null 更直覺
 * - UI segmented control 可直接 v-model 綁這個值
 */
export type BrightnessFilter = "all" | ThemeBrightness;

/** 推薦版型的最大數量：依使用者規格固定為 5 */
const RECOMMEND_LIMIT = 5;

/**
 * showcaseLogoKey 的 LS 鍵
 *
 * 為什麼用 `:v4` 後綴而非沿用 `:v3`：
 * - showcase logo 切換是「v4 才新增的能力」，舊使用者 LS 沒這條 key，新就是新
 * - 與 demo 頁的 LS_LOGO_KEY_PREFIX（v3）完全隔離，showcase 與 demo 兩條切換鏈不互通
 *   （這是使用者選定的「showcase 與 demo 分離」方案）
 */
const LS_SHOWCASE_LOGO_KEY = "casino-demo:showcase-logoKey:v4";

/** showcase 預設用的 logoKey：以 noya（DEFAULT_LAYOUT_KEY）的 defaultLogo 為基準 */
const DEFAULT_SHOWCASE_LOGO_KEY = themes[DEFAULT_LAYOUT_KEY].defaultLogo;

/** 讀 localStorage 的 helper，吞 SSR / 隱私模式錯誤（複製 demo-theme.store 的同名工具） */
function safeGetLS(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLS(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 隱私模式 / quota exceeded 都吞掉，UI 不受影響
  }
}

/**
 * 列出 showcase 切換 row 可選的所有 logoKey
 *
 * 為什麼掃所有 theme 的 logos 取聯集而非 hardcode：
 * - 三 theme 統一三 logo 後，三者 logos 完全一致，本來可寫死
 *   但抽 helper 後若未來加第 4 個 logo、或某 theme 自己加變體，這層自動跟上
 * - 用 Map 去重 + 保留首次出現順序（與 registry 順序對齊）
 *
 * 回傳 LogoCandidate 陣列（給 UI 直接拿來畫縮圖按鈕用，含 src / label / key）
 */
function listShowcaseLogos() {
  const seen = new Map<string, (typeof themes)[string]["logos"][number]>();
  for (const t of Object.values(themes)) {
    for (const lg of t.logos) {
      if (!seen.has(lg.key)) seen.set(lg.key, lg);
    }
  }
  return Array.from(seen.values());
}

/**
 * 初始解析 showcaseLogoKey
 *
 * 優先順序：
 * 1. LS 有命中且仍在 listShowcaseLogos() 範圍 → 用 LS
 * 2. fallback 到 DEFAULT_SHOWCASE_LOGO_KEY（noya 的 defaultLogo = "umu"）
 *
 * 為什麼 showcase 不接 URL ?logo= query：
 * - showcase 不在 demo 頁的 URL sync 鏈中，URL 上沒這個概念
 * - 若使用者要分享「主頁配某 logo」的觀感，未來可加 URL query；目前範圍縮在 LS
 */
function resolveInitialShowcaseLogoKey(): string {
  const valid = new Set(listShowcaseLogos().map((l) => l.key));
  const ls = safeGetLS(LS_SHOWCASE_LOGO_KEY);
  if (ls && valid.has(ls)) return ls;
  if (valid.has(DEFAULT_SHOWCASE_LOGO_KEY)) return DEFAULT_SHOWCASE_LOGO_KEY;
  // 最後底線：拿聯集第一個，避免空字串
  const first = listShowcaseLogos()[0];
  return first ? first.key : DEFAULT_SHOWCASE_LOGO_KEY;
}

export const useShowcaseStore = defineStore("showcase", () => {
  /** 是否開啟預覽 dialog */
  const previewDialogOpen = ref(false);
  /** 當前預覽的 theme key（null = 未開或剛關） */
  const activePreviewKey = ref<string | null>(null);
  /** dialog 內顯示的尺寸（desktop / mobile） */
  const previewDevice = ref<PreviewDevice>("desktop");
  /**
   * dialog 內當前預覽的 colorKey
   *
   * null 表示「使用 theme 的 defaultColor 截圖（即既有 default 檔名）」。
   *
   * 為什麼用 null 而非預設帶 defaultColor 值：
   * - 開 dialog 時不知道 activeTheme 是哪個，無法先填對應 defaultColor
   * - 用 null 當「初始 / 重置」狀態，由 getPreview helper 內統一處理「null 等同 defaultColor 截圖」
   * - 也避免 watcher 在 openPreview 切 theme 時為了同步 previewColor 多寫一層條件
   *
   * 不 persist 到 LS：
   * - 與 device tab 一致，色切換是「per-session 預覽偏好」，下次開 dialog 重新從 default 開始更合理
   */
  const previewColor = ref<string | null>(null);

  /**
   * showcaseLogoKey：影響「三張卡片縮圖」與「預覽 dialog 內圖片」要用哪個 logo 版本
   *
   * 與 demo 頁 FAB 的 logoKey 完全獨立：
   * - showcase 是「主頁訪客的全域偏好」，三張卡片共用
   * - demo 頁是「per-theme 偏好」，不同 theme 各自一份 LS key
   * - 兩者 LS key 不同（:v4 vs :v3:）、不會互相覆蓋
   */
  const showcaseLogoKey = ref<string>(resolveInitialShowcaseLogoKey());

  /**
   * 亮暗主調篩選
   *
   * 預設 "all" 不篩選，呼應「使用者進站第一眼看到全部版型」直覺。
   * 不 persist 到 LS：篩選是「per-session 探索行為」，重新進站重新自由瀏覽更合適
   */
  const filterBrightness = ref<BrightnessFilter>("all");

  /**
   * 類別篩選（multi-select）
   *
   * 空陣列 → 不篩選類別（等同全選）。
   * 非空 → OR 邏輯：theme 的 categories 與 filterCategories 有任何交集就視為命中
   *
   * 為什麼用 OR 而非 AND：
   * - 使用者點「體育 + 真人」通常意思是「我想看與其中任一相關的版型」而非「兩者都涵蓋的版型」
   * - 此 demo 內每個 theme 平均掛 1-2 個分類，AND 會大幅減少可見版型，與探索意圖相違
   *
   * 不 persist 到 LS：同 filterBrightness 理由
   */
  const filterCategories = ref<ThemeCategory[]>([]);

  /**
   * 版型清單排序方向
   *
   * 預設 "oldest"（由舊到新）：
   * - 這是 sales demo，最早做的版型擺前面、最新做的擺後面，
   *   讓客戶 / 業務「依開發時間順序」掃過所有版型，符合「先看基礎款再看新款」的瀏覽直覺
   * - 與 daheng 6 版分批上架的 releaseDate 排程語意一致：先上架的排前面
   *
   * 不 persist 到 LS：
   * - 與既有 filterBrightness / filterCategories 一致，排序是 per-session 探索行為，
   *   重新進站從預設「由舊到新」重新瀏覽更一致；避免使用者上次切過「由新到舊」後
   *   下次進站莫名其妙看到反序而困惑
   */
  const sortOrder = ref<SortOrder>("oldest");

  /** 所有可選的 logo 候選（給 UI row 渲染用） */
  const showcaseLogoOptions = computed(() => listShowcaseLogos());

  /** 所有可選的類別 chip（依 ThemeCategory union 列舉順序） */
  const allCategoryOptions: { key: ThemeCategory; label: string }[] = [
    { key: "sports", label: "體育" },
    { key: "live", label: "真人" },
    { key: "slots", label: "電子" },
    { key: "general", label: "綜合" },
    { key: "luxury", label: "VIP 豪華" }
  ];

  /**
   * 當前選定 logo 主色 → 對應推薦的 theme key 集合（依 RGB 距離取最近 RECOMMEND_LIMIT 個）
   *
   * 為什麼用 Set 而非排序後的陣列：
   * - 卡片端只需要「O(1) 查我是不是推薦」的能力，不關心 5 個推薦的內部順序
   * - 使用 Set 避免下游每張卡片都做 .includes 線性掃描
   *
   * 為什麼用 computed 而非 watch 寫進 ref：
   * - 推薦集合是「派生狀態」，根源於 showcaseLogoKey + registry（不會改）
   * - computed 自動依賴追蹤 + cache，比手動 watch 更安全
   */
  const recommendedThemeKeys = computed<Set<string>>(() => {
    const currentLogo = showcaseLogoOptions.value.find(
      (l) => l.key === showcaseLogoKey.value
    );
    // 找不到 logo（理論不可能，store 內邊界檢查擋住）→ 回空 set，所有卡片無推薦徽章
    if (!currentLogo) return new Set();

    const all = listThemes();
    // 算距離 → 升序排 → 取前 N 個 key
    const sorted = all
      .map((t) => ({
        key: t.key,
        distance: colorDistance(currentLogo.mainColor, getThemeMainSwatch(t))
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, RECOMMEND_LIMIT);
    return new Set(sorted.map((x) => x.key));
  });

  /**
   * 預覽模式旗標：URL `?preview=1` 時啟用，跳過 releaseDate filter，顯示所有 theme
   *
   * 為什麼用 ref 而非 computed(() => route.query.preview)：
   * - showcase store 是 setup store，在 module level use route 會在 SSR / 測試環境踩到 router 未注入
   * - 改由 home.vue 啟動時 setPreviewQueryActive 推進來，store 內維持單一資料源
   * - 副作用：URL query 變動時 home.vue watch route 改寫一次，比直接 route reactive 更明確
   *
   * 為什麼 query key 用 `preview` 而非 `showAll`：
   * - `preview` 語意更貼近「預覽未發布版型」用途（行銷 / QA / 內部 demo 場景）
   * - 「showAll」聽起來像「忽略所有篩選」，會跟既有 brightness/categories 篩選混淆
   * - 一個字省事且足以表意
   *
   * 為什麼不 persist 到 LS：
   * - bypass 是「臨時性檢視」，每次帶 query 上門最清楚
   * - 避免使用者忘了曾 enable 預覽模式而長期看到未發布 theme
   */
  const previewQueryActive = ref(false);

  /**
   * 排程過濾的 base theme 集合
   *
   * 為什麼把「依日期過濾」獨立成 computed 而非塞進 filteredThemes：
   * - 兩種過濾語義不同：releaseDate 是「能不能看到」（業務排程），
   *   brightness/categories 是「使用者想看什麼」（探索篩選）
   * - 分層後 home.vue 用 filteredThemes 是「既排程後又使用者篩選」結果，
   *   未來需要「排程已篩 + 未經使用者篩」的場景（例如 sitemap 列表）直接讀 releaseFilteredThemes
   * - 邏輯位置與 isThemeReleased 純函式同層，比硬塞回 filteredThemes 連帶 brightness/categories 邏輯更乾淨
   *
   * 為什麼 today 在 computed 內每次重算而非快取：
   * - getLocalToday 內僅做 4 個 Date.get* + 字串拼接，O(1) cost，無快取必要
   * - computed 依賴 previewQueryActive；previewQueryActive 變動或 reactive 依賴觸發時都會重算
   * - 跨日邊界：使用者半夜開頁停留到次日，computed 不會重算（無依賴變動），
   *   但 demo 站台一般不會「停在主頁過夜」，可接受；若未來要支援，加 visibilitychange 重算即可
   */
  const releaseFilteredThemes = computed(() => {
    const all = listThemes();
    // ?preview=1 時跳過排程過濾，全部 theme 通過
    if (previewQueryActive.value) return all;
    const today = getLocalToday();
    return all.filter((t) => isThemeReleased(t, today));
  });

  /**
   * 篩選後的 theme 列表（套用 brightness + categories 兩個條件，base 已過排程 filter）
   *
   * 為什麼 base 從 listThemes 改成 releaseFilteredThemes：
   * - 排程是「全域硬性過濾」，未到日期的 theme 不該出現在任何使用者面前（除非 ?preview=1）
   * - brightness/categories 是「使用者主動篩選」，與排程獨立分層
   *
   * 為什麼篩選不影響推薦徽章邏輯：
   * - 推薦徽章基於「logo vs theme 主色距離」，與篩選獨立計算
   * - UI 表現：篩選後仍出現的推薦 theme 才會帶徽章（推薦 ∩ 篩選）
   * - 若使用者篩到 0 結果，UI 顯示「目前條件沒有版型」提示
   */
  const filteredThemes = computed(() => {
    const base = releaseFilteredThemes.value;
    const wantBrightness = filterBrightness.value;
    const wantCats = filterCategories.value;
    return base.filter((t) => {
      // brightness 篩選
      if (wantBrightness !== "all" && t.brightness !== wantBrightness) {
        return false;
      }
      // categories 篩選（空陣列 = 不篩；非空 = 任一交集即命中）
      if (wantCats.length > 0) {
        const hit = t.categories.some((c) => wantCats.includes(c));
        if (!hit) return false;
      }
      return true;
    });
  });

  /**
   * 排序後的版型清單（以 filteredThemes 為 base，套用 sortOrder）
   *
   * 排序規則：
   * - 主鍵 = releaseDate（YYYY-MM-DD 字串字典序即時間序）；
   *   沒有 releaseDate 的舊 theme 用 NO_RELEASE_DATE_SENTINEL（"0000-00-00"）視為「最早」
   *   （它們確實是最早建立的 13 個 theme，只是當初沒補日期欄位）
   * - 次鍵（tiebreaker）= registryIndex（該 theme 在 listThemes() 內的插入順序）
   *   保證「同日期」或「同樣無日期」的 theme 之間有穩定且符合 registry 宣告順序的先後
   *
   * oldest（預設）：主鍵升序 → 次鍵升序（早的、registry 靠前的排前面）
   * newest：oldest 的「精確反向」——直接把 oldest 結果 reverse，
   *   保證任兩個 theme 的相對順序在兩個方向完全相反（含 tiebreaker），不會出現
   *   「日期相同時兩個方向順序一樣」的不對稱
   *
   * 為什麼 base 用 filteredThemes 而非 releaseFilteredThemes / listThemes：
   * - 排序要作用在「使用者最終看到的清單」上：既已排程過濾、又已使用者篩選
   * - home.vue 把 visibleThemes 從 filteredThemes 改讀 sortedThemes，
   *   排程 + 篩選 + 排序三層疊加都生效
   *
   * 為什麼用 computed 而非 watch 寫進 ref：
   * - sortedThemes 是純派生狀態（根源 filteredThemes + sortOrder），computed 自動依賴追蹤 + cache
   * - 切 sortOrder / 切篩選都自動重算，不需手動同步
   *
   * 為什麼建一份 registryIndex map 而非每次 indexOf：
   * - listThemes() 回的順序就是 registry 插入順序（Object.values）
   * - 用 Map 一次建好 key→index，排序比較時 O(1) 查，避免 N 次 indexOf 退化成 O(N^2)
   */
  const sortedThemes = computed(() => {
    // registryIndex：listThemes() 的順序即 registry 宣告順序，作為穩定 tiebreaker
    const registryIndex = new Map<string, number>();
    listThemes().forEach((t, i) => registryIndex.set(t.key, i));

    // 每個 theme 算一個可比較的排序鍵 tuple [releaseDate ?? 哨兵, registryIndex]
    const sortKeyOf = (key: string, releaseDate?: string) => ({
      date: releaseDate ?? NO_RELEASE_DATE_SENTINEL,
      idx: registryIndex.get(key) ?? Number.MAX_SAFE_INTEGER
    });

    /**
     * code 排序專用：從 label 解析 `<letter><nn>` 前綴成可比較 tuple
     *
     * label 規約為 `<letter><nn> · <名稱>`（例：`a01 · 霓虹`、`b01 · AT99`）。
     * 用 regex 抓開頭的「一個小寫字母 + 一串數字」，letter 升序為主鍵、數字升序為次鍵。
     *
     * fallback 設計（不 crash 原則）：
     * - label 不符格式（抓不到前綴）→ letter 給 "{"（ASCII 上大於 'z'，排到所有正常字母之後），
     *   數字給 MAX_SAFE_INTEGER，再靠 registryIndex 當最終 tiebreaker，
     *   讓格式異常的 theme 穩定沉到清單尾端而非讓排序爆掉
     */
    const codeKeyOf = (key: string, label: string) => {
      const m = /^([a-z])(\d+)/.exec(label.trim());
      return {
        letter: m ? m[1] : "{",
        num: m ? Number.parseInt(m[2], 10) : Number.MAX_SAFE_INTEGER,
        idx: registryIndex.get(key) ?? Number.MAX_SAFE_INTEGER
      };
    };

    // code 模式：依編號 label 前綴升序（a01 < a02 < … < b01 …），與 oldest/newest 互斥分支
    if (sortOrder.value === "code") {
      return [...filteredThemes.value].sort((a, b) => {
        const ka = codeKeyOf(a.key, a.label);
        const kb = codeKeyOf(b.key, b.label);
        if (ka.letter !== kb.letter) return ka.letter < kb.letter ? -1 : 1;
        if (ka.num !== kb.num) return ka.num - kb.num;
        return ka.idx - kb.idx; // 前綴完全相同（理論不會）→ 用 registry 順序穩定收尾
      });
    }

    // 先一律以 oldest（升序）排出穩定結果，再依方向決定是否反向
    const ascending = [...filteredThemes.value].sort((a, b) => {
      const ka = sortKeyOf(a.key, a.releaseDate);
      const kb = sortKeyOf(b.key, b.releaseDate);
      if (ka.date !== kb.date) return ka.date < kb.date ? -1 : 1;
      return ka.idx - kb.idx;
    });

    // newest = oldest 的精確反向（含 tiebreaker），保證雙向順序完全相反
    return sortOrder.value === "newest" ? ascending.reverse() : ascending;
  });

  /** 給 UI 判斷便利用 */
  const isPreviewing = computed(() => previewDialogOpen.value);

  /**
   * 開啟預覽
   *
   * 為什麼參數帶 key 而不靠呼叫端先 setActive：避免「忘了 set 就 open」的時序坑
   *
   * 開啟時 previewColor 重置為 null（使用 theme 的 default 截圖），確保上一次 dialog
   * 殘留的色選擇不會延續到下一個 theme（例如上次看 dahsing-tabs 切到 copper，
   * 關掉後再開 dahsing-waterfall 應該是看 default 米橘而非 copper）。
   */
  function openPreview(key: string, device: PreviewDevice = "desktop"): void {
    activePreviewKey.value = key;
    previewDevice.value = device;
    previewColor.value = null;
    previewDialogOpen.value = true;
  }

  /** 關閉預覽，順手清掉 activePreviewKey 讓 dialog 內的 watch 不再亂跑 */
  function closePreview(): void {
    previewDialogOpen.value = false;
    activePreviewKey.value = null;
    previewColor.value = null;
  }

  /** 切換 dialog 內的尺寸 tab */
  function setPreviewDevice(device: PreviewDevice): void {
    previewDevice.value = device;
  }

  /**
   * 切換 dialog 內預覽的 colorKey
   *
   * 傳 null 或不傳 → 回到 theme default 截圖
   * 傳具體 colorKey → 顯示對應色變體截圖（缺檔時 getPreview helper 內 fallback 回 default）
   *
   * 為什麼不做「colorKey 必須在 activeTheme.colors 內」的驗證：
   * - 切換 UI 由 dialog template 內遍歷 activeTheme.colors 渲染 swatch 觸發，
   *   理論上不可能傳到不存在的 key
   * - 真有殘留 / 髒值，getPreview helper 的 fallback 鏈會處理，顯示 default 截圖
   */
  function setPreviewColor(colorKey: string | null): void {
    previewColor.value = colorKey;
  }

  /**
   * 切 showcase 用的 logoKey
   *
   * 為什麼這裡要邊界檢查（同 demo-theme.store.setLogo 行為一致）：
   * - 防呆：呼叫端傳了不存在的 key 不該污染 state，否則 LS 寫了個無效值下次也撈不回來
   */
  function setShowcaseLogoKey(key: string): void {
    if (!showcaseLogoOptions.value.some((l) => l.key === key)) return;
    showcaseLogoKey.value = key;
  }

  // showcaseLogoKey 變動就 persist 到 LS
  watch(showcaseLogoKey, (v) => {
    if (!v) return;
    safeSetLS(LS_SHOWCASE_LOGO_KEY, v);
  });

  /**
   * 設定亮暗篩選
   *
   * 為什麼要有 action 而非讓 UI 直接寫 filterBrightness.value：
   * - 保留未來插入「篩選變動時通知 analytics / 記錄使用者偏好」的接縫
   * - UI 用 v-model 透過 setter 行為一致，便於 testing 觀察
   */
  function setFilterBrightness(value: BrightnessFilter): void {
    filterBrightness.value = value;
  }

  /**
   * 切換類別 chip 的選中狀態
   *
   * 為什麼用 toggle 而非 setFilterCategories(array)：
   * - chip multi-select UI 慣用「點一下切換」互動，toggle 是天然 API
   * - 避免呼叫端傳 array 時要先讀目前狀態 + manipulate，多一層心智負擔
   */
  function toggleFilterCategory(category: ThemeCategory): void {
    const idx = filterCategories.value.indexOf(category);
    if (idx >= 0) {
      filterCategories.value.splice(idx, 1);
    } else {
      filterCategories.value.push(category);
    }
  }

  /**
   * 清空所有篩選條件（亮暗回 all，類別清空）
   *
   * 提供給 UI 「清除篩選」按鈕、或 0 結果頁的「重設」CTA
   *
   * 注意：不會清掉 previewQueryActive — 那是 URL query 控制的，由 home.vue watch route 同步
   */
  function clearFilters(): void {
    filterBrightness.value = "all";
    filterCategories.value = [];
  }

  /**
   * 設定排序方向
   *
   * 為什麼用 action 而非讓 UI 直接寫 sortOrder.value：
   * - 與 setFilterBrightness 風格一致，保留未來插入 analytics / 行為記錄的接縫
   * - UI 透過 setter 行為一致，便於 testing 觀察
   */
  function setSortOrder(value: SortOrder): void {
    sortOrder.value = value;
  }

  /**
   * 在「由舊到新 / 由新到舊」之間切換
   *
   * 提供給「點一下切換」型 UI（若 UI 改用單顆 toggle 按鈕而非 segmented control 時可用）；
   * 目前 filter-bar 用 segmented control（每態各一顆 radio），主要呼叫 setSortOrder
   *
   * 注意：SortOrder 已擴成三態（oldest / newest / code），此 toggle 只在 oldest/newest
   * 之間互換，刻意不納入 code——「依編號」是獨立語意，用 toggle 在三態間輪轉並不直覺。
   * 若目前是 code，toggle 會落到 newest（非 code → 視為 newest 分支）。
   * 保留此 export 是為了不破壞既有可能的引用；實際 UI 不靠它。
   */
  function toggleSortOrder(): void {
    sortOrder.value = sortOrder.value === "oldest" ? "newest" : "oldest";
  }

  /**
   * 設定 `?preview=1` 旗標
   *
   * 由 home.vue 在 onMounted + watch route.query 時呼叫；store 內單向接收，
   * 避免在 store 直接 use useRoute（會踩到 setup store 在 SSR / 測試環境的 router 注入順序問題）
   */
  function setPreviewQueryActive(active: boolean): void {
    previewQueryActive.value = active;
  }

  return {
    // state
    previewDialogOpen,
    activePreviewKey,
    previewDevice,
    previewColor,
    showcaseLogoKey,
    filterBrightness,
    filterCategories,
    sortOrder,
    previewQueryActive,
    // getters
    isPreviewing,
    showcaseLogoOptions,
    allCategoryOptions,
    recommendedThemeKeys,
    releaseFilteredThemes,
    filteredThemes,
    sortedThemes,
    // actions
    openPreview,
    closePreview,
    setPreviewDevice,
    setPreviewColor,
    setShowcaseLogoKey,
    setFilterBrightness,
    toggleFilterCategory,
    clearFilters,
    setSortOrder,
    toggleSortOrder,
    setPreviewQueryActive
  };
});
