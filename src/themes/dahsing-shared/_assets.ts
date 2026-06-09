/**
 * dahsing 三版型共用 asset 集中匯出
 *
 * 為什麼集中：
 * - 三 theme（waterfall / tabs / horizontal）共用 8 張圖（hero / trophy + 6 張遊戲縮圖）
 * - 集中匯出避免三 theme 各自重複 import.meta.url 寫一遍 path
 * - vite 在 build 時對同一個 URL 來源只 emit 一份 hash asset，三 theme 引用同一張只佔一份體積
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - 與 registry.ts 的 logo 解析模式一致：vite build 時會解析成含 base path（GitHub Pages 子路徑 /umu_demo/）+ hash 的最終 URL
 * - 三 theme 引用同一張時走同一份來源，不會重複 emit
 *
 * 為什麼不用 ?url 靜態 import：
 * - 6 張 ch-* 在不同 theme 內被引用多次時 vite dedupe 機制需要 URL 字串一致
 * - new URL + .href 在 build 後產出固定字串，比多個 ?url import 更安全
 */
export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
export const trophySrc = new URL("./assets/trophy.png", import.meta.url).href;
export const chDgSrc = new URL("./assets/ch-dg.png", import.meta.url).href;
export const chMascotSrc = new URL("./assets/ch-mascot.png", import.meta.url)
  .href;
export const chOfaSrc = new URL("./assets/ch-ofa.png", import.meta.url).href;
export const chPandaSrc = new URL("./assets/ch-panda.png", import.meta.url)
  .href;
export const chQtSrc = new URL("./assets/ch-qt.png", import.meta.url).href;
export const chRsgSrc = new URL("./assets/ch-rsg.png", import.meta.url).href;

/**
 * 7 分類 nav 的固定資料（三 theme mobile sidebar 共用）
 *
 * 為什麼把 nav 結構抽出來：
 * - 三 theme 的 sidebar 元件結構幾乎一致，差別只在「是否 compact」（waterfall 用 compact 變體）
 * - 抽 NAV_ITEMS 後 sidebar 元件只負責渲染，不必各 theme 維護自己的清單
 *
 * iconKind 用 string 而非 Component：
 * - sidebar 元件用 v-if 切 6 種 icon 渲染（fa-fire / fa-headphones / fa-futbol / mi.lotto / mi-cards / mi.slot / fa-fish）
 * - 這樣 iconKind 是純資料，不必塞 Vue 元件實例進去，序列化友善
 */
export interface DahsingNavItem {
  key: string;
  label: string;
  shortLabel: string;
  iconKind:
    | "fire"
    | "headphones"
    | "futbol"
    | "lotto"
    | "cards"
    | "slot"
    | "fish";
  hot?: boolean;
}

export const DAHSING_NAV_ITEMS: DahsingNavItem[] = [
  {
    key: "hot",
    label: "熱門推薦",
    shortLabel: "熱門",
    iconKind: "fire",
    hot: true
  },
  {
    key: "live",
    label: "真人遊戲",
    shortLabel: "真人",
    iconKind: "headphones"
  },
  { key: "sport", label: "體育賽事", shortLabel: "體育", iconKind: "futbol" },
  { key: "lotto", label: "彩票遊戲", shortLabel: "彩票", iconKind: "lotto" },
  { key: "card", label: "棋牌遊戲", shortLabel: "棋牌", iconKind: "cards" },
  { key: "slot", label: "電子遊戲", shortLabel: "電子", iconKind: "slot" },
  { key: "fish", label: "捕魚遊戲", shortLabel: "捕魚", iconKind: "fish" }
];

/**
 * 底部 5 tab（mobile bottom tab bar）固定資料
 *
 * 為什麼放在 _assets.ts 而非各自元件：理由同 NAV_ITEMS（純資料、跨 theme 重複）
 *
 * icon 為什麼改成 DahsingIcon 自家 name（不再用 material-symbols:xxx）：
 * - 原本想吃 Iconify 字串，但 Quasar QIcon 不認 Iconify 命名空間 → 渲染為空 → 跑版
 * - 改為由 DahsingIcon 元件內 inline SVG path 承擔，name 直接對應元件 enum
 */
export interface DahsingTabItem {
  key: string;
  label: string;
  /** DahsingIcon name（與元件 enum 對齊） */
  icon: "home" | "campaign" | "savings" | "support-agent" | "person";
}

export const DAHSING_TAB_ITEMS: DahsingTabItem[] = [
  { key: "home", label: "首頁", icon: "home" },
  { key: "promo", label: "優惠", icon: "campaign" },
  { key: "deposit", label: "存提款", icon: "savings" },
  { key: "service", label: "客服", icon: "support-agent" },
  { key: "me", label: "我的", icon: "person" }
];
