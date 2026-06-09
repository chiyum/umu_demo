import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { themes, DEFAULT_LAYOUT_KEY } from "@/themes/_registry";

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

  /** 所有可選的 logo 候選（給 UI row 渲染用） */
  const showcaseLogoOptions = computed(() => listShowcaseLogos());

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

  return {
    // state
    previewDialogOpen,
    activePreviewKey,
    previewDevice,
    previewColor,
    showcaseLogoKey,
    // getters
    isPreviewing,
    showcaseLogoOptions,
    // actions
    openPreview,
    closePreview,
    setPreviewDevice,
    setPreviewColor,
    setShowcaseLogoKey
  };
});
