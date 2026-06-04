import type { LogoCandidate, ThemeMeta } from "./_types";

/**
 * 集中註冊所有版面
 *
 * 新增版面流程：
 * 1. 在 src/themes/<your-key>/ 建立 desktop.vue、mobile.vue、_tokens.scss、_variants.scss
 * 2. 在 src/assets/previews/ 放 <key>-desktop.png 與 <key>-mobile.png 截圖
 * 3. 在這份檔案加入 themes 物件（含 previewDesktop / previewMobile）
 * 4. main.default.scss 不必動，vite.config.ts 的 buildThemeScssImports 會自動掃資料夾
 *
 * 為什麼用 lazy import：每個版面是獨立 chunk，切換才下載；
 * 主 bundle 只帶這份 registry（純 metadata），不會把所有版面 SFC 塞進去。
 *
 * 為什麼預覽圖用 `new URL(..., import.meta.url).href`：
 * - vite 會把它轉成帶 base path（含 GitHub Pages 子路徑 /umu_demo/）的正確 URL，
 *   並掛 hash 指紋；showcase 主頁用 <img src> 拿圖即可
 * - 圖片走 asset pipeline 而不是被 import 進 JS bundle
 */

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
  previewDesktop: new URL("@/assets/previews/noya-desktop.png", import.meta.url)
    .href,
  previewMobile: new URL("@/assets/previews/noya-mobile.png", import.meta.url)
    .href,
  defaultLogo: "default",
  // 兩張都是透明背景 PNG（四角 alpha=0 已驗）→ transparentBg: true
  // 避免深色 bar 套 mix-blend-mode 把彩色筆畫洗淡
  logos: [
    {
      key: "default",
      label: "UMU 品牌標準款",
      src: new URL("./noya/assets/logos/default.png", import.meta.url).href,
      transparentBg: true
    },
    {
      key: "alt1",
      label: "通用備用款 A",
      src: new URL("./noya/assets/logos/alt1.png", import.meta.url).href,
      transparentBg: true
    }
  ]
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
  previewDesktop: new URL("@/assets/previews/at99-desktop.png", import.meta.url)
    .href,
  previewMobile: new URL("@/assets/previews/at99-mobile.png", import.meta.url)
    .href,
  defaultLogo: "default",
  // 兩張都是透明背景 PNG（四角 alpha=0 已驗）→ transparentBg: true
  logos: [
    {
      key: "default",
      label: "大亨 ONLINE 標準款",
      src: new URL("./at99/assets/logos/default.png", import.meta.url).href,
      transparentBg: true
    },
    {
      key: "alt1",
      label: "通用備用款 A",
      src: new URL("./at99/assets/logos/alt1.png", import.meta.url).href,
      transparentBg: true
    }
  ]
};

/**
 * ant-sport 版面（蚂蚁体育 / 體育博彩風）
 *
 * DOM 1:1 對齊 lilian_ant_web home.vue + lilian_ant_pc main.vue 五段結構；
 * 配色 HSL 三軸（primary-h / primary-s / primary-l）推導，
 * 三變體：blue 預設 / midnight 深藍夜間 / red 紅
 *
 * preview 暫指向 noya 圖佔位：後續以 playwright 截實際 demo 圖補上
 * （ThemeMeta.previewDesktop/Mobile 型別必填 string，空字串會破圖）
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
  previewDesktop: new URL(
    "@/assets/previews/ant-sport-desktop.png",
    import.meta.url
  ).href,
  previewMobile: new URL(
    "@/assets/previews/ant-sport-mobile.png",
    import.meta.url
  ).href,
  defaultLogo: "pc",
  // 4 個候選：PC 原圖 / mobile 原圖 / 兩張通用備用款（lilian_ant_pc logo2 / lilian_ant_web logo_header）
  // 四張皆透明背景 PNG（已用 python 直接讀 PNG alpha channel 驗過四角 alpha=0）
  // → transparentBg: true，mobile-header 不再對它們套 mix-blend-mode
  logos: [
    {
      key: "pc",
      label: "蚂蚁体育 桌面款",
      src: new URL("./ant-sport/assets/logos/default-pc.png", import.meta.url)
        .href,
      transparentBg: true
    },
    {
      key: "mobile",
      label: "蚂蚁体育 手機款",
      src: new URL(
        "./ant-sport/assets/logos/default-mobile.png",
        import.meta.url
      ).href,
      transparentBg: true
    },
    {
      key: "alt1",
      label: "通用備用款 A",
      src: new URL("./ant-sport/assets/logos/alt1.png", import.meta.url).href,
      transparentBg: true
    },
    {
      key: "alt2",
      label: "通用備用款 B",
      src: new URL("./ant-sport/assets/logos/alt2.png", import.meta.url).href,
      transparentBg: true
    }
  ]
};

/** 對外暴露的 theme 表，key 是 layoutKey */
export const themes: Record<string, ThemeMeta> = {
  noya,
  at99,
  "ant-sport": antSport
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

/** 給 store / UI 列舉用 */
export function listThemes(): ThemeMeta[] {
  return Object.values(themes);
}
