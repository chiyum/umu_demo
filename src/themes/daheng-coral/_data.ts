/**
 * daheng-coral（a18 大亨奶油珊瑚）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型F_奶油珊瑚.html（AWD 完整響應式單檔，
 * 同時含桌機 220px 側欄 + hero/每日簽到 + 膠囊分類 + 圓角大卡遊戲 + 橫向優惠卡 + 手機 dock）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 側欄 / 分類 / 遊戲卡 / 優惠卡 / dock 資料與圖片，抽出後避免兩個 SFC 各寫一遍。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 首圖（首存 1000 送 1000 banner，對齊原稿 .hero img） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/** 遊戲卡圖片（對齊原稿 .ggrid 6 張；第 6 張歐博沿用 ch_dg） */
const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;

/**
 * 桌機側欄導覽（對齊原稿 .side：兩個 group「遊戲大廳 / 會員中心」+ 各項目）
 * group 用來在側欄分段，emoji 圖示與標籤忠於原稿。
 */
export interface SideNavItem {
  label: string;
  icon: string;
  /** 分組標題（每個 group 第一項帶，渲染時於該項上方插入小標） */
  group?: string;
  active?: boolean;
}
export const SIDE_NAV: SideNavItem[] = [
  { label: "熱門推薦", icon: "🔥", group: "遊戲大廳", active: true },
  { label: "真人視訊", icon: "🎴" },
  { label: "電子老虎機", icon: "🎰" },
  { label: "體育賽事", icon: "⚽" },
  { label: "棋牌對戰", icon: "🀄" },
  { label: "捕魚機台", icon: "🐟" },
  { label: "彩票遊戲", icon: "🎟️" },
  { label: "優惠活動", icon: "🎁", group: "會員中心" },
  { label: "存款提領", icon: "💰" },
  { label: "線上客服", icon: "🛎️" }
];

/** 膠囊分類列（對齊原稿 .chips 7 顆；手機/平板顯示，桌機隱藏） */
export interface ChipItem {
  label: string;
  icon: string;
  active?: boolean;
}
export const CHIPS: ChipItem[] = [
  { label: "熱門", icon: "🔥", active: true },
  { label: "真人", icon: "🎴" },
  { label: "電子", icon: "🎰" },
  { label: "體育", icon: "⚽" },
  { label: "棋牌", icon: "🀄" },
  { label: "捕魚", icon: "🐟" },
  { label: "彩票", icon: "🎟️" }
];

/** 圓角大卡遊戲（對齊原稿 .ggrid 6 張，順序 / 名稱 / 英名 / hot 全對齊） */
export interface GameCard {
  img: string;
  name: string;
  en: string;
  hot: boolean;
}
export const GAMES: GameCard[] = [
  { img: chDg, name: "DG 真人", en: "DG LIVE", hot: true },
  { img: chRsg, name: "RSG 電子", en: "RSG SLOTS", hot: true },
  { img: chPanda, name: "熊貓體育", en: "PANDA SPORTS", hot: false },
  { img: chQt, name: "QT 電子", en: "QT SLOTS", hot: false },
  { img: chOfa, name: "美女直播", en: "OFA GIRLS", hot: false },
  { img: chDg, name: "歐博真人", en: "ALLBET", hot: false }
];

/** 橫向優惠卡（對齊原稿 .prail 3 張：emoji ico + 標題 + 描述） */
export interface PromoCard {
  icon: string;
  title: string;
  desc: string;
}
export const PROMOS: PromoCard[] = [
  {
    icon: "🥳",
    title: "首存 100% 禮金",
    desc: "首存 1000 送 1000，立即翻倍"
  },
  {
    icon: "💧",
    title: "每日返水 1.2%",
    desc: "全館別無上限，自動派發"
  },
  {
    icon: "👑",
    title: "VIP 尊榮禮",
    desc: "晉級彩金、生日禮、專屬客服"
  }
];

/** 每日簽到卡（對齊原稿 .daily；桌機 hero-row 右側顯示） */
export const DAILY = {
  title: "☀️ 每日簽到",
  desc: "連續簽到 7 天，幸運轉盤最高可抽 8,888 彩金。",
  cta: "立即簽到"
};

/** footer 免責聲明（對齊原稿 footer） */
export const FOOTER_FINE =
  "本平台僅供成年人娛樂使用 · 請理性投注 © 2026 大亨遊戲城";

/** 手機底部 dock 5 格（對齊原稿 .dock，中間「遊戲」為凸出 CTA 球） */
export interface DockTab {
  label: string;
  icon: string;
  cta?: boolean;
  active?: boolean;
}
export const DOCK_TABS: DockTab[] = [
  { label: "首頁", icon: "🏠", active: true },
  { label: "優惠", icon: "🎁" },
  { label: "遊戲", icon: "🎮", cta: true },
  { label: "錢包", icon: "💰" },
  { label: "我的", icon: "👤" }
];
