/**
 * daheng-glacier（a21 大亨冰川晨藍）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型I_冰川晨藍.html（AWD 完整響應式淺色版型，單檔同時含
 * 桌機右側類別欄展開與手機底部 dock 膠囊）。
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 遊戲卡 / 右側類別 / 優惠帶 / dock 資料與圖片，抽出後避免兩個 SFC 各寫一遍。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages /umu_demo/）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 首圖（首存 1000 送 1000 banner，對齊原稿 .hero img） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/** 遊戲卡圖片（對齊原稿 ggrid 6 張；第 6 張歐博真人沿用 ch_dg.png） */
const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chRsg = new URL("./assets/rsg.png", import.meta.url).href;
const chPanda = new URL("./assets/panda.png", import.meta.url).href;
const chQt = new URL("./assets/qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ofa.png", import.meta.url).href;

/**
 * 本週人氣館別遊戲卡（圓頂雪窗形，對齊原稿 ggrid 6 張，順序 / 名稱 / 角標全對齊）
 *
 * - tag：原稿只有前兩張帶角標（TOP 1 / 爆分中），其餘無；以 optional 表達
 */
export interface GameCard {
  img: string;
  name: string;
  /** 卡片頂部置中角標，只有部分卡有（對齊原稿 .tag） */
  tag?: string;
}
export const GAMES: GameCard[] = [
  { img: chDg, name: "DG 真人", tag: "TOP 1" },
  { img: chRsg, name: "RSG 電子", tag: "爆分中" },
  { img: chPanda, name: "熊貓體育" },
  { img: chQt, name: "QT 電子" },
  { img: chOfa, name: "美女直播" },
  { img: chDg, name: "歐博真人" }
];

/**
 * 右側類別欄（對齊原稿 .rail 8 項，emoji 圖示 + 短名忠於原稿，hot 為當前選中）
 */
export interface RailItem {
  label: string;
  icon: string;
  active?: boolean;
}
export const RAIL_ITEMS: RailItem[] = [
  { label: "熱門", icon: "🔥", active: true },
  { label: "真人", icon: "🎴" },
  { label: "電子", icon: "🎰" },
  { label: "體育", icon: "⚽" },
  { label: "棋牌", icon: "🀄" },
  { label: "捕魚", icon: "🐟" },
  { label: "彩票", icon: "🎟️" },
  { label: "優惠", icon: "🎁" }
];

/** 優惠帶活動卡（對齊原稿 .prail 3 張，圖示 + 標題 + 說明全對齊） */
export interface PromoCard {
  icon: string;
  title: string;
  desc: string;
}
export const PROMOS: PromoCard[] = [
  { icon: "🎉", title: "首存 100% 禮金", desc: "首存 1000 送 1000" },
  { icon: "💧", title: "每日返水 1.2%", desc: "全館別無上限自動派發" },
  { icon: "👑", title: "VIP 尊榮禮", desc: "晉級彩金、生日禮金" }
];

/** footer 免責聲明（對齊原稿 footer 單句） */
export const FOOTER_FINE =
  "本平台僅供成年人娛樂使用 · 請理性投注 © 2026 大亨遊戲城";

/** 手機底部 dock 膠囊 5 格（對齊原稿 .dock，首頁為當前選中 on） */
export interface DockTab {
  label: string;
  icon: string;
  active?: boolean;
}
export const DOCK_TABS: DockTab[] = [
  { label: "首頁", icon: "🏠", active: true },
  { label: "優惠", icon: "🎁" },
  { label: "遊戲", icon: "🎮" },
  { label: "錢包", icon: "💰" },
  { label: "我的", icon: "👤" }
];
