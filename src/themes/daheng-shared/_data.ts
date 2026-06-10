/**
 * 大亨 6 版型共用資料 + asset URL 集中匯出
 *
 * 為什麼集中：
 * - 6 個 theme（daheng-rank / grid / rail / compact / list / magazine）共用 8 張圖
 *   （hero / trophy + 6 張遊戲縮圖）以及 GAMES / RANKS / CATS 三組固定資料
 * - 集中後避免 6 theme 各自重複 import.meta.url 寫一遍 path、6 份 GAMES 陣列字面量
 * - vite build 對同一個 URL 來源只 emit 一份 hash asset，6 theme 引用同一張只佔一份體積
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - 與 registry.ts、dahsing-shared 的解析模式一致：vite build 時會解析成含 base path
 *   （GitHub Pages 子路徑 /umu_demo/）+ hash 的最終 URL
 *
 * 為什麼 logo 用 ch-mascot.png、promo 用 trophy.png：
 * - 使用者拍板：原稿引用的 logo.png / promo_v2.png 在素材夾不存在
 * - logo.png → ch-mascot.png（吉祥物作 brand mark）
 * - promo_v2.png → trophy.png（獎盃延續「優惠週週送」視覺）
 */

export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
export const trophySrc = new URL("./assets/trophy.png", import.meta.url).href;
export const mascotLogoSrc = new URL("./assets/ch-mascot.png", import.meta.url)
  .href;

const chDgSrc = new URL("./assets/ch-dg.png", import.meta.url).href;
const chPandaSrc = new URL("./assets/ch-panda.png", import.meta.url).href;
const chQtSrc = new URL("./assets/ch-qt.png", import.meta.url).href;
const chOfaSrc = new URL("./assets/ch-ofa.png", import.meta.url).href;
const chRsgSrc = new URL("./assets/ch-rsg.png", import.meta.url).href;

/**
 * 6 個遊戲品牌（對應 phones.js GAMES 陣列順序）
 * g1=DG / g2=熊貓 / g3=QT / g4=OFA / g5=RSG / g6=熊貓（與原稿一致重複）
 */
export interface DahengGame {
  key: string;
  name: string;
  en: string;
  img: string;
}

export const DAHENG_GAMES: DahengGame[] = [
  { key: "g1", name: "DG 真人", en: "DG LIVE", img: chDgSrc },
  { key: "g2", name: "熊貓體育", en: "PANDA SPORTS", img: chPandaSrc },
  { key: "g3", name: "QT 電子", en: "QT SLOTS", img: chQtSrc },
  { key: "g4", name: "美女直播", en: "OFA GIRLS", img: chOfaSrc },
  { key: "g5", name: "RSG 電子", en: "RSG SLOTS", img: chRsgSrc },
  { key: "g6", name: "熊貓體育", en: "PANDA SPORTS", img: chPandaSrc }
];

/**
 * v1 / v5 排行榜資料（5 名）— 對應 phones.js RANKS
 */
export interface DahengRank {
  n: string;
  name: string;
  en: string;
}

export const DAHENG_RANKS: DahengRank[] = [
  { n: "01", name: "DG 真人", en: "DG LIVE" },
  { n: "02", name: "QT 電子", en: "QT SLOTS" },
  { n: "03", name: "RSG 電子", en: "RSG SLOTS" },
  { n: "04", name: "美女直播", en: "OFA GIRLS" },
  { n: "05", name: "熊貓體育", en: "PANDA SPORTS" }
];

/**
 * 7 個分類（cats-row / cats-grid 共用）
 *
 * iconKind 對應 daheng-cat-icon 元件內 SVG path enum：
 * - flame（熱門推薦，hot=true，火焰 icon 帶橘色）
 * - live（真人遊戲，人像剪影）
 * - sport（體育賽事，足球）
 * - lotto（彩票遊戲，數字 6）
 * - chess（棋牌遊戲，雙撲克牌）
 * - slot（電子遊戲，777 機台）
 * - fish（捕魚遊戲，魚 + 漁網）
 *
 * 為什麼 icon SVG path 不放這檔而獨立成元件：
 * - SVG path 字串長且含巢狀屬性（fill / stroke / text 等），混在 data 內難讀
 * - 抽 daheng-cat-icon 元件後資料層只保留 enum key，元件層負責渲染
 */
export type DahengCatIconKind =
  | "flame"
  | "live"
  | "sport"
  | "lotto"
  | "chess"
  | "slot"
  | "fish";

export interface DahengCat {
  key: string;
  label: string;
  iconKind: DahengCatIconKind;
  hot?: boolean;
}

export const DAHENG_CATS: DahengCat[] = [
  { key: "hot", label: "熱門推薦", iconKind: "flame", hot: true },
  { key: "live", label: "真人遊戲", iconKind: "live" },
  { key: "sport", label: "體育賽事", iconKind: "sport" },
  { key: "lotto", label: "彩票遊戲", iconKind: "lotto" },
  { key: "chess", label: "棋牌遊戲", iconKind: "chess" },
  { key: "slot", label: "電子遊戲", iconKind: "slot" },
  { key: "fish", label: "捕魚遊戲", iconKind: "fish" }
];

/**
 * v6 雜誌精選 chips（6 個分類 chip）
 * 對應 phones.js chips() 內陣列
 */
export const DAHENG_CHIPS: string[] = [
  "熱門推薦",
  "真人遊戲",
  "體育賽事",
  "彩票遊戲",
  "棋牌遊戲",
  "電子遊戲"
];

/**
 * 5 個底部 tab（tabbar 共用）
 * iconKind 對應 daheng-tab-icon 元件內 SVG path enum
 */
export type DahengTabIconKind =
  | "home"
  | "promo"
  | "deposit"
  | "service"
  | "account";

export interface DahengTabItem {
  key: string;
  label: string;
  iconKind: DahengTabIconKind;
}

export const DAHENG_TAB_ITEMS: DahengTabItem[] = [
  { key: "home", label: "首頁", iconKind: "home" },
  { key: "promo", label: "優惠", iconKind: "promo" },
  { key: "deposit", label: "存提款", iconKind: "deposit" },
  { key: "service", label: "客服", iconKind: "service" },
  { key: "account", label: "我的", iconKind: "account" }
];
