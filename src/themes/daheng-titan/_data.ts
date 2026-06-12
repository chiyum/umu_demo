/**
 * daheng-titan（a20 大亨鈦灰琥珀）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型H_鈦灰琥珀.html（AWD 單檔響應式，同時含桌機橫向 rail 與手機底部 dock）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 左側類別欄 / 熱門館別卡 / 數據條 / 底部 dock 資料與圖片，抽出後避免兩個 SFC 各寫一遍。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages /umu_demo/）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 壓縮版 banner（原稿 .hero 單張圖） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/** 熱門館別卡圖片（原稿 6 張，第 6 張歐博真人沿用 ch_dg.png） */
const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;

/**
 * 左側類別欄導覽（對齊原稿 .rail 8 項，emoji 圖示忠於原稿）
 *
 * 桌機 rail 橫向展開（圖示 + 文字），手機 rail 窄欄（圖示直排）。
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

/**
 * 熱門館別遊戲卡（對齊原稿 .ggrid 6 張，順序 / 名稱 / 英文 / 角標全對齊）
 *
 * tag 為左上角標（原稿前兩張有 TOP 1 / 爆分，其餘無），空字串代表不顯示角標。
 */
export interface GameCard {
  img: string;
  name: string;
  en: string;
  tag: string;
}
export const GAMES: GameCard[] = [
  { img: chDg, name: "DG 真人", en: "DG LIVE", tag: "TOP 1" },
  { img: chRsg, name: "RSG 電子", en: "RSG SLOTS", tag: "爆分" },
  { img: chPanda, name: "熊貓體育", en: "SPORTS", tag: "" },
  { img: chQt, name: "QT 電子", en: "QT SLOTS", tag: "" },
  { img: chOfa, name: "美女直播", en: "OFA GIRLS", tag: "" },
  { img: chDg, name: "歐博真人", en: "ALLBET", tag: "" }
];

/** 平台數據條（對齊原稿 .stats 3 項） */
export interface StatItem {
  value: string;
  label: string;
}
export const STATS: StatItem[] = [
  { value: "1.2%", label: "每日返水" },
  { value: "3 分鐘", label: "極速出金" },
  { value: "24 H", label: "真人客服" }
];

/** 公告跑馬燈（原稿無 .notice 字串，沿用大亨系列慣用公告維持質感） */
export const NOTICE =
  "【系統公告】自 6/15（00:00）起，ATM 存款最低金額調整為 NT$300；體育賽事新增 UEFA 歐國盃專區，首存加碼 20%。";

/** footer 免責聲明（對齊原稿 footer 單句） */
export const FOOTER_FINE =
  "本平台僅供成年人娛樂使用 · 請理性投注 © 2026 大亨遊戲城";

/** 手機底部 5 格 dock（對齊原稿 .dock，首頁為 on 狀態） */
export interface DockItem {
  label: string;
  icon: string;
  active?: boolean;
}
export const DOCK_ITEMS: DockItem[] = [
  { label: "首頁", icon: "🏠", active: true },
  { label: "優惠", icon: "🎁" },
  { label: "遊戲", icon: "🎮" },
  { label: "存款", icon: "💰" },
  { label: "我的", icon: "👤" }
];
