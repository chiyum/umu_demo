import type { LogoCandidate, PreviewByLogo, ThemeMeta } from "./_types";

/**
 * 集中註冊所有版面
 *
 * 新增版面流程：
 * 1. 在 src/themes/<your-key>/ 建立 desktop.vue、mobile.vue、_tokens.scss、_variants.scss
 * 2. 在 src/assets/previews/ 放每個 logoKey × 裝置的截圖（命名見下方 previews 區塊）
 * 3. 在這份檔案加入 themes 物件（含 logos + previews 矩陣）
 * 4. main.default.scss 不必動，vite.config.ts 的 buildThemeScssImports 會自動掃資料夾
 *
 * 為什麼用 lazy import：每個版面是獨立 chunk，切換才下載；
 * 主 bundle 只帶這份 registry（純 metadata），不會把所有版面 SFC 塞進去。
 *
 * 為什麼預覽圖用 `new URL(..., import.meta.url).href`：
 * - vite 會把它轉成帶 base path（含 GitHub Pages 子路徑 /umu_demo/）的正確 URL，
 *   並掛 hash 指紋；showcase 主頁用 <img src> 拿圖即可
 * - 圖片走 asset pipeline 而不是被 import 進 JS bundle
 *
 * 三 theme 統一三張 logo（v4）：
 * - 三個 theme 的 logos 清單統一為 [dahsing, umu, long-heng]（順序固定）
 * - 來源：at99 的大亨 ONLINE / noya 的 UMU / kingdom_front 的隆亨 ONLINE
 * - 預設 logo 按品牌調性指派：at99 預設大亨、noya 預設 UMU、ant-sport 預設隆亨
 * - 為什麼共用：使用者要求「showcase 主頁能用同一組 logo 統一比對三個 theme 視覺」
 */

/**
 * 三個 theme 共用的 logo src（用常數算一次，避免三 theme 重複寫 new URL）
 *
 * 為什麼從 theme 自家 assets/logos 取（at99 的 default、noya 的 default）而非搬到 shared-logos：
 * - 不必動既有檔案位置 / 不影響 git 歷史
 * - 隆亨是「新加」沒有歸屬 theme，所以放 src/assets/shared-logos/
 * - vite 的 new URL + import.meta.url 在 build 後皆會輸出到 dist/assets/ 含 hash，與來源資料夾無關
 */
const DAHSING_LOGO_SRC = new URL(
  "./at99/assets/logos/default.png",
  import.meta.url
).href;
const UMU_LOGO_SRC = new URL("./noya/assets/logos/default.png", import.meta.url)
  .href;
const LONG_HENG_LOGO_SRC = new URL(
  "@/assets/shared-logos/long-heng.png",
  import.meta.url
).href;

/**
 * 三個共用 logo 的 metadata（每個 theme 直接帶這份）
 *
 * 為什麼是常數而非 helper：三 theme 的 logo 清單完全一致（src / label / transparentBg 都同），
 * 抽 helper 反而多一層意圖跳轉，常數陣列更直觀
 *
 * 為什麼全部 transparentBg=true：
 * - 大亨 / UMU 兩張在改造前就已驗過四角 alpha=0（見前次 commit）
 * - 隆亨 ONLINE 來源是 kingdom_front pwa-512x512.png，PWA 規範要求圖示透明背景；
 *   經 file 指令確認為 8-bit/color RGBA non-interlaced，符合透明背景慣例
 * - 三張都跳過 mix-blend-mode 處理，視覺一致
 */
const SHARED_LOGOS: [LogoCandidate, LogoCandidate, LogoCandidate] = [
  {
    key: "dahsing",
    label: "大亨 ONLINE",
    src: DAHSING_LOGO_SRC,
    transparentBg: true
  },
  {
    key: "umu",
    label: "UMU",
    src: UMU_LOGO_SRC,
    transparentBg: true
  },
  {
    key: "long-heng",
    label: "隆亨 ONLINE",
    src: LONG_HENG_LOGO_SRC,
    transparentBg: true
  }
];

/**
 * 預先載入所有 previews 的 URL 表（18 張）
 *
 * 為什麼用 `import.meta.glob({ eager: true, import: 'default' })` 而非 `new URL()`：
 * - vite 的 `new URL('./...', import.meta.url)` 只支援「完全靜態」字串；
 *   `new URL(`@/assets/previews/${themeKey}-${lk}-...`, ...)` 是 template literal，
 *   vite 會把模板字串轉成 `Object.assign({})[模板]` 然後丟 `new URL(undefined, ...)`，prod 必破圖
 * - `import.meta.glob` 在 build 時靜態解析所有命中檔案 + emit 為 hashed asset + 給每個 path 一個 URL
 *   完全符合「動態 key 查 URL」的需求
 * - eager:true 讓所有 glob 結果直接 inline 進當前 chunk（registry 本來就是 metadata 不會切 chunk）
 *
 * 命名規約：<themeKey>-<logoKey>-<device>.png
 * 例：at99-dahsing-desktop.png、noya-umu-mobile.png、ant-sport-long-heng-desktop.png
 *
 * glob 結果型別：Record<相對路徑, URL string>
 * 例：{ "@/assets/previews/at99-dahsing-desktop.png": "/assets/at99-dahsing-desktop-HASH.png" }
 * - import:'default' 讓 value 直接是 URL string（而非 ESM module 物件）
 * - query:'?url' 強制走 vite 的 asset URL 解析（避免被 imagetools 等 plugin 攔截轉 webp）
 */
const PREVIEW_URL_MAP = import.meta.glob<string>("@/assets/previews/*.png", {
  eager: true,
  import: "default",
  query: "?url"
});

/**
 * 從 PREVIEW_URL_MAP 查指定 (theme, logo, device) 對應的 URL
 *
 * 為什麼 glob 的 key 用 `/src/assets/previews/...` 而非 `@/assets/...`：
 * - vite 的 import.meta.glob 路徑解析後 key 永遠是「relative to project root 的絕對路徑」
 *   實測在本專案會是 `/src/assets/previews/<file>.png`
 * - alias `@` 在 glob key 不會被保留，所以查表時要用 `/src/assets/...` 拼接
 *
 * 為什麼回 string（而非 undefined）：
 * - getPreview helper 的 fallback 鏈會處理 undefined 情境，這層回 "" 較直接
 * - "" 進 <img src> 會破圖但不會 runtime crash，配合 fallback 鏈最差也只顯示預設 logo 截圖
 */
function pickPreviewUrl(
  themeKey: string,
  logoKey: string,
  device: "desktop" | "mobile"
): string {
  const key = `/src/assets/previews/${themeKey}-${logoKey}-${device}.png`;
  return PREVIEW_URL_MAP[key] ?? "";
}

/**
 * 建立某個 theme 的 previews 矩陣
 *
 * 為什麼用 helper 而非三 theme 各自重複展開：
 * - 18 條 URL 路徑全寫死 = 18 行 noise，且漏一條 TS 不會擋（PreviewByLogo 是 Record<string, ...>）
 * - helper 把 themeKey 折進去，呼叫端只寫一行，少出 typo 機會
 */
function buildPreviews(themeKey: string): PreviewByLogo {
  // 列出三個共用 logoKey 對應的 18 張新截圖；缺檔時 showcase 端 <img> src="" 會破圖，
  // 故需確保 src/assets/previews/ 內 18 張齊全（由本任務 commit 3 補上）
  const logoKeys = ["dahsing", "umu", "long-heng"];
  const map: PreviewByLogo = {};
  for (const lk of logoKeys) {
    map[lk] = {
      desktop: pickPreviewUrl(themeKey, lk, "desktop"),
      mobile: pickPreviewUrl(themeKey, lk, "mobile")
    };
  }
  return map;
}

/** noya 版面（玫瑰金 / 暖色系） */
const noya: ThemeMeta = {
  key: "noya",
  label: "版面 A · 暖金",
  description: "暖金奶油調的真人視訊風格，玫瑰金 / 日落橘 / 青檸綠三種配色",
  // 重點：箭頭函式內部才呼叫 dynamic import，這樣才會切 chunk
  desktop: () => import("./noya/desktop.vue"),
  mobile: () => import("./noya/mobile.vue"),
  defaultColor: "rose-gold",
  colors: [
    { key: "rose-gold", label: "玫瑰金", swatch: "#d4a574" },
    { key: "sunset", label: "日落橘", swatch: "#ff7e47" },
    { key: "lime", label: "青檸綠", swatch: "#9fd356" }
  ],
  previews: buildPreviews("noya"),
  // noya 主視覺對應 UMU 品牌，預設帶 UMU
  defaultLogo: "umu",
  logos: SHARED_LOGOS
};

/** at99 版面（深藍霓虹 / 賭場風） */
const at99: ThemeMeta = {
  key: "at99",
  label: "版面 B · 霓虹",
  description: "深藍霓虹的賭場風格，霓虹藍 / 紫 / 綠三種配色",
  desktop: () => import("./at99/desktop.vue"),
  mobile: () => import("./at99/mobile.vue"),
  defaultColor: "neon-blue",
  colors: [
    { key: "neon-blue", label: "霓虹藍", swatch: "#2dd4ff" },
    { key: "neon-purple", label: "霓虹紫", swatch: "#a855f7" },
    { key: "neon-green", label: "霓虹綠", swatch: "#22d3a4" }
  ],
  previews: buildPreviews("at99"),
  // at99 主視覺對應大亨 ONLINE，預設帶 dahsing
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS
};

/**
 * ant-sport 版面（蚂蚁体育 / 體育博彩風）
 *
 * DOM 1:1 對齊 lilian_ant_web home.vue + lilian_ant_pc main.vue 五段結構；
 * 配色 HSL 三軸（primary-h / primary-s / primary-l）推導，
 * 三變體：blue 預設 / midnight 深藍夜間 / red 紅
 *
 * 為什麼 ant-sport 預設 logo 改成 long-heng：
 * - 原本 ant-sport 沒有對應的真實品牌，過去用蚂蚁体育原圖佔位
 * - 三 theme 統一三 logo 後，隆亨 ONLINE 剛好無歸屬 theme，視覺也搭得起來
 * - 與 at99（大亨）/ noya（UMU）的「品牌-版面」一對一映射對齊
 */
const antSport: ThemeMeta = {
  key: "ant-sport",
  label: "蚂蚁体育",
  description:
    "對齊蚂蚁体育原視覺的體育博彩風格，預設藍 / 深藍夜間 / 節慶紅三種配色",
  desktop: () => import("./ant-sport/desktop.vue"),
  mobile: () => import("./ant-sport/mobile.vue"),
  defaultColor: "blue",
  colors: [
    { key: "blue", label: "蚂蚁藍", swatch: "#3c70fd" },
    { key: "midnight", label: "夜間藍", swatch: "#0d152b" },
    { key: "red", label: "節慶紅", swatch: "#e63946" }
  ],
  previews: buildPreviews("ant-sport"),
  defaultLogo: "long-heng",
  logos: SHARED_LOGOS
};

/**
 * tycoon 版面（藍冰大亨 / 冷光金屬風）
 *
 * 取自使用者設計示意稿「大亨娛樂城.html」：
 * - mobile：header / hero（藍冰漸層+白光swoosh）/ marquee /
 *   body（左 sidebar 6 分類 + 右 6 遊戲卡）/ bottom 5 tab
 * - desktop fork ant-sport 五段，但 GameGrid 改成「sidebar + 遊戲卡列表」與 ant-sport 區隔
 * - 三變體：ice 預設冰藍 / deep 深海藍 / gold 金邊冰
 *
 * 為什麼 defaultLogo 也是 dahsing：
 * - tycoon 本來就是「大亨」風格版型（label / hero 文案都呼應），與 at99 重疊
 * - 三 theme 統一三 logo 後可自由配對，這裡與品牌精神 1:1 對齊
 * - 與 at99（大亨霓虹版）形成「同品牌但不同視覺解讀」對照，showcase 主頁切 logo 時更有趣
 */
const tycoon: ThemeMeta = {
  key: "tycoon",
  label: "版面 D · 藍冰大亨",
  description:
    "藍冰大亨冷光金屬風，sidebar + 遊戲卡列表雙欄結構，預設冰藍 / 深海藍 / 金邊冰三種配色",
  desktop: () => import("./tycoon/desktop.vue"),
  mobile: () => import("./tycoon/mobile.vue"),
  defaultColor: "ice",
  colors: [
    { key: "ice", label: "冰藍", swatch: "#1f7ff0" },
    { key: "deep", label: "深海藍", swatch: "#0a52c4" },
    { key: "gold", label: "金邊冰", swatch: "#d4a574" }
  ],
  previews: buildPreviews("tycoon"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS
};

/** 對外暴露的 theme 表，key 是 layoutKey */
export const themes: Record<string, ThemeMeta> = {
  noya,
  at99,
  "ant-sport": antSport,
  tycoon
};

/** 預設版面（首次進站、query 與 localStorage 都缺時使用） */
export const DEFAULT_LAYOUT_KEY = "noya";

/** 取得指定 theme，找不到回 fallback 預設 */
export function getTheme(key: string | null | undefined): ThemeMeta {
  if (key && themes[key]) return themes[key];
  return themes[DEFAULT_LAYOUT_KEY];
}

/** 取得 theme 下指定配色，找不到回該 theme 預設配色 */
export function getColorVariant(
  theme: ThemeMeta,
  colorKey: string | null | undefined
) {
  const found = theme.colors.find((c) => c.key === colorKey);
  return (
    found ??
    theme.colors.find((c) => c.key === theme.defaultColor) ??
    theme.colors[0]
  );
}

/**
 * 取得 theme 下指定 logo，找不到回該 theme 預設 logo
 *
 * 為什麼提供 helper 而非要呼叫端自行查：
 * - 同 getColorVariant 一致的 API 形狀，呼叫端不必處理 fallback 邏輯
 * - 若未來要支援 logo 多語系或變體（橫式/方形），可在這層統一處理
 *
 * 為什麼明確標 return 型別為 LogoCandidate（非 undefined）：
 * - `theme.logos` 型別為 `[LogoCandidate, ...LogoCandidate[]]`（non-empty tuple），
 *   `theme.logos[0]` 編譯期保證存在
 * - 呼叫端 `themeStore.currentLogo.src` 可放心解構，不需要 optional chaining
 * - 違反 non-empty 約束會在 registry 建構時就被 TS 擋下，這層 helper 不必再做 runtime 防呆
 */
export function getLogo(
  theme: ThemeMeta,
  logoKey: string | null | undefined
): LogoCandidate {
  const found = theme.logos.find((l) => l.key === logoKey);
  if (found) return found;
  const fallback = theme.logos.find((l) => l.key === theme.defaultLogo);
  // theme.logos[0] 由型別保證存在（non-empty tuple），不會回 undefined
  return fallback ?? theme.logos[0];
}

/**
 * 取得指定 (theme, logoKey, device) 對應的預覽截圖 URL
 *
 * 為什麼這層 helper 必要：
 * - showcase 卡片 / dialog 都需要依「當下選定的 showcaseLogoKey」決定預覽圖
 * - fallback 鏈：指定 logoKey → theme.defaultLogo → theme.logos[0].key
 *   任何一層都保證命中 previews 矩陣（registry 建構時 buildPreviews 列出三 logoKey 完整 18 張）
 * - 呼叫端拿 string 即可塞 <img src>，不必懂 fallback 邏輯
 *
 * 為什麼不直接讓呼叫端做 `theme.previews[logoKey].desktop`：
 * - 若使用者切到一個 theme 沒列出的 logoKey（理論上不該發生，但 LS 殘留可能造成），
 *   直接索引會吃到 undefined → noya/at99/ant-sport 卡片同時破圖
 * - helper 內處理 fallback 後最差也只是顯示預設 logo 的截圖，UI 不會塌
 */
export function getPreview(
  theme: ThemeMeta,
  logoKey: string | null | undefined,
  device: "desktop" | "mobile"
): string {
  const direct = logoKey ? theme.previews[logoKey] : undefined;
  if (direct) return direct[device];
  const def = theme.previews[theme.defaultLogo];
  if (def) return def[device];
  // 最後底線：拿 logos[0] 的 key 找；型別保證 logos non-empty
  const firstKey = theme.logos[0].key;
  const first = theme.previews[firstKey];
  // 若連 first 都缺（registry 配置漏寫），回空字串避免 runtime crash；
  // <img src=""> 會破圖，但比丟 undefined 進 src 觸發 Vue 警告好
  return first ? first[device] : "";
}

/** 給 store / UI 列舉用 */
export function listThemes(): ThemeMeta[] {
  return Object.values(themes);
}
