/**
 * daheng-crimson（a19 大亨赤焰紅金）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型G_赤焰紅金.html（AWD 完整響應式單檔）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 錢幣入口 / 燈籠遊戲卡 / 紅包優惠 / 公告 / footer / dock 資料與圖片，
 * 抽出後避免兩個 SFC 各寫一遍字面量。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages /umu_demo/）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 首圖（開運首存禮 banner，原稿 .hero 內唯一一張圖） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/** hero 左上角緞帶文案（對齊原稿 .ribbon） */
export const HERO_RIBBON = "開運首存禮";

/** 燈籠遊戲卡圖片（原稿 lant-grid 6 張；第 6 張歐博沿用 ch_dg.png） */
const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;

/**
 * 頂欄導覽（對齊原稿 .topnav 6 項，桌機顯示、手機隱藏）
 */
export interface TopNavItem {
  label: string;
  active?: boolean;
}
export const TOP_NAV: TopNavItem[] = [
  { label: "首頁", active: true },
  { label: "真人" },
  { label: "電子" },
  { label: "體育" },
  { label: "棋牌" },
  { label: "優惠" }
];

/**
 * 錢幣遊戲入口（對齊原稿 .coins .rail 8 入口，emoji / 中文 / 英文短名忠於原稿）
 *
 * 手機 4 欄 / 桌機 8 欄；手機版 em（英文短名）隱藏，桌機顯示。
 */
export interface CoinEntry {
  icon: string;
  label: string;
  en: string;
}
export const COINS: CoinEntry[] = [
  { icon: "🎴", label: "真人", en: "LIVE" },
  { icon: "🎰", label: "電子", en: "SLOTS" },
  { icon: "⚽", label: "體育", en: "SPORTS" },
  { icon: "🀄", label: "棋牌", en: "POKER" },
  { icon: "🐟", label: "捕魚", en: "FISH" },
  { icon: "🎟️", label: "彩票", en: "LOTTO" },
  { icon: "📺", label: "直播", en: "SHOW" },
  { icon: "🧧", label: "活動", en: "EVENT" }
];

/** 跑馬燈公告（對齊原稿 .notice 內單句，🏮 圖示 + 三段以全形點分隔） */
export const NOTICE =
  "恭喜會員 林＊豪 於 DG 真人連勝 18 局，贏得 NT$ 888,000　·　天天簽到領紅包，週週返水無上限　·　新會員首存 1000 送 1000";

/**
 * 燈籠拱形遊戲卡（對齊原稿 .lant-grid 6 張）
 *
 * - tag：角標（對齊原稿 .tag，僅前兩張有；其餘為 undefined 不渲染）
 * - 第 6 張歐博真人沿用 ch_dg.png（與原稿一致）
 */
export interface LantCard {
  img: string;
  name: string;
  en: string;
  tag?: string;
}
export const LANTS: LantCard[] = [
  { img: chDg, name: "DG 真人", en: "DG LIVE", tag: "人氣 NO.1" },
  { img: chRsg, name: "RSG 電子", en: "RSG SLOTS", tag: "爆分中" },
  { img: chPanda, name: "熊貓體育", en: "PANDA SPORTS" },
  { img: chQt, name: "QT 電子", en: "QT SLOTS" },
  { img: chOfa, name: "美女直播", en: "OFA GIRLS" },
  { img: chDg, name: "歐博真人", en: "ALLBET" }
];

/**
 * 紅包優惠（對齊原稿 .packets 3 張：emoji 圖示 + 標題 + 說明 + 金額角標）
 */
export interface PacketCard {
  icon: string;
  title: string;
  desc: string;
  amount: string;
}
export const PACKETS: PacketCard[] = [
  {
    icon: "🧧",
    title: "首存翻倍紅包",
    desc: "首存 1000 送 1000，喜上加喜",
    amount: "100%"
  },
  {
    icon: "🏮",
    title: "天天返水",
    desc: "全館別無上限，每日自動入帳",
    amount: "1.2%"
  },
  {
    icon: "🎊",
    title: "VIP 黃金禮遇",
    desc: "晉級彩金、生日禮金、專屬客服",
    amount: "VIP"
  }
];

/** 區塊標題（對齊原稿兩個 .sec-head：金牌館別 / 開運紅包） */
export const SEC_GAMES_TITLE = "金牌館別";
export const SEC_PROMO_TITLE = "開運紅包";

/** footer 免責聲明（對齊原稿 footer 內 p） */
export const FOOTER_FINE =
  "本平台僅供成年人娛樂使用 · 請理性投注 © 2026 TYCOON GAMING";

/**
 * 手機底部 dock（對齊原稿 .dock 5 格，中間「遊戲」為凸出 CTA 球）
 *
 * 原稿結構：首頁 / 優惠 / 🎰(cta) / 存款 / 我的，中間 CTA 無文字只放 emoji。
 */
export interface DockTab {
  icon: string;
  label?: string;
  cta?: boolean;
  active?: boolean;
}
export const DOCK_TABS: DockTab[] = [
  { icon: "🏮", label: "首頁", active: true },
  { icon: "🧧", label: "優惠" },
  { icon: "🎰", cta: true },
  { icon: "💰", label: "存款" },
  { icon: "👤", label: "我的" }
];
