import type { ThemeMeta } from "./_types";

/**
 * 集中註冊所有版面
 *
 * 新增版面流程：
 * 1. 在 src/themes/<your-key>/ 建立 desktop.vue、mobile.vue、_tokens.scss、_variants.scss
 * 2. 在這份檔案 import meta，並加入 themes 物件
 * 3. 在 src/assets/scss/main.default.scss 引入該 theme 的 tokens / variants
 *
 * 為什麼用 lazy import：每個版面是獨立 chunk，切換才下載；
 * 主 bundle 只帶這份 registry（純 metadata），不會把所有版面 SFC 塞進去。
 */

/** noya 版面（玫瑰金 / 暖色系） */
const noya: ThemeMeta = {
  key: "noya",
  label: "版面 A · 暖金",
  // 重點：箭頭函式內部才呼叫 dynamic import，這樣才會切 chunk
  desktop: () => import("./noya/desktop.vue"),
  mobile: () => import("./noya/mobile.vue"),
  defaultColor: "rose-gold",
  colors: [
    { key: "rose-gold", label: "玫瑰金", swatch: "#d4a574" },
    { key: "sunset", label: "日落橘", swatch: "#ff7e47" },
    { key: "lime", label: "青檸綠", swatch: "#9fd356" }
  ]
};

/** at99 版面（深藍霓虹 / 賭場風） */
const at99: ThemeMeta = {
  key: "at99",
  label: "版面 B · 霓虹",
  desktop: () => import("./at99/desktop.vue"),
  mobile: () => import("./at99/mobile.vue"),
  defaultColor: "neon-blue",
  colors: [
    { key: "neon-blue", label: "霓虹藍", swatch: "#2dd4ff" },
    { key: "neon-purple", label: "霓虹紫", swatch: "#a855f7" },
    { key: "neon-green", label: "霓虹綠", swatch: "#22d3a4" }
  ]
};

/** 對外暴露的 theme 表，key 是 layoutKey */
export const themes: Record<string, ThemeMeta> = {
  noya,
  at99
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

/** 給 store / UI 列舉用 */
export function listThemes(): ThemeMeta[] {
  return Object.values(themes);
}
