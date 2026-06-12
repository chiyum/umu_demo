/**
 * daheng-onyx（a17 大亨曜黑燙金）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型E_曜黑燙金.html（AWD 完整響應式單檔，
 * 同時含寬版 topnav 八角徽章 8 欄、窄版手機底部 dock，medals order:-1 排最前）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 遊戲入口 / 拱門卡 / 優惠 / nav / footer 資料與圖片，抽出後避免兩個 SFC 各寫一遍。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages /umu_demo/）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 首圖（首存 1000 送 1000 banner，原稿 .hero img） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/** 拱門卡圖片（對齊原稿 arch-grid 6 張，第 6 張歐博真人沿用 ch_dg.png 與來源一致） */
const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;

/**
 * 頂部水平導覽（對齊原稿 .topnav 6 項，首頁為 active）
 *
 * 寬版顯示水平 nav；窄版隱藏（改用底部 dock）。
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
 * 八角徽章遊戲入口（對齊原稿 .medals 8 項：emoji + 中文名 + 英文小字）
 *
 * 寬版 8 欄一排；窄版 2 排（grid 4 欄、order:-1 排最前）。
 */
export interface MedalItem {
  icon: string;
  /** 中文名（原稿用全形空格分隔字元，如「真 人」，這裡保留視覺） */
  name: string;
  en: string;
}
export const MEDALS: MedalItem[] = [
  { icon: "🎴", name: "真 人", en: "LIVE" },
  { icon: "🎰", name: "電 子", en: "SLOTS" },
  { icon: "⚽", name: "體 育", en: "SPORTS" },
  { icon: "🀄", name: "棋 牌", en: "POKER" },
  { icon: "🐟", name: "捕 魚", en: "FISHING" },
  { icon: "🎟️", name: "彩 票", en: "LOTTERY" },
  { icon: "📺", name: "直 播", en: "SHOW" },
  { icon: "🏆", name: "賽 事", en: "EVENT" }
];

/**
 * 拱門形熱門館別卡（對齊原稿 arch-grid 6 張，順序 / 名稱 / 英文全對齊）
 *
 * 寬版 6 欄一排（≥1024px）；窄版 2 欄。
 */
export interface ArchCard {
  img: string;
  name: string;
  en: string;
}
export const ARCH_CARDS: ArchCard[] = [
  { img: chDg, name: "DG 真人", en: "DG LIVE" },
  { img: chRsg, name: "RSG 電子", en: "RSG SLOTS" },
  { img: chPanda, name: "熊貓體育", en: "PANDA SPORTS" },
  { img: chQt, name: "QT 電子", en: "QT SLOTS" },
  { img: chOfa, name: "美女直播", en: "OFA GIRLS" },
  // 第 6 張歐博真人沿用 ch_dg.png，與來源 HTML 一致
  { img: chDg, name: "歐博真人", en: "ALLBET" }
];

/**
 * 尊榮禮遇優惠列（對齊原稿 .promos 3 張：emoji ico + 標題 + 說明 + 數值徽章）
 *
 * 寬版 3 欄縱向置中；窄版單欄橫向。
 */
export interface PromoCard {
  icon: string;
  title: string;
  desc: string;
  /** 右側數值徽章（100% / 1.2% / VIP） */
  pct: string;
}
export const PROMOS: PromoCard[] = [
  {
    icon: "🥂",
    title: "首存禮金",
    desc: "首存 1000 送 1000，翻倍開局",
    pct: "100%"
  },
  {
    icon: "💎",
    title: "每日返水",
    desc: "全館別無上限，週週自動派發",
    pct: "1.2%"
  },
  {
    icon: "👑",
    title: "VIP 晉級禮",
    desc: "專屬客服、生日禮金、晉級彩金",
    pct: "VIP"
  }
];

/** 跑馬燈公告（對齊原稿 .notice .run 單句，含全形分隔符） */
export const NOTICE =
  "恭喜會員 王＊明 於 RSG 電子贏得 NT$ 1,288,000　·　每日簽到領彩金，連續七日再送幸運轉盤　·　新會員首存 1000 送 1000，視訊實名制安心暢玩";

/** footer 免責聲明（對齊原稿 footer p） */
export const FOOTER_FINE =
  "本平台僅供成年人娛樂使用 · 請理性投注 © 2026 TYCOON GAMING";

/**
 * 手機底部 5 格 dock（對齊原稿 .dock：首頁 / 優惠 / 中間 CTA / 存款 / 我的）
 *
 * 中間「🎰」為凸出 CTA 球（原稿 .dock .cta），首頁為 active。
 */
export interface DockItem {
  label: string;
  icon: string;
  cta?: boolean;
  active?: boolean;
}
export const DOCK_ITEMS: DockItem[] = [
  { label: "首頁", icon: "🏛️", active: true },
  { label: "優惠", icon: "🎁" },
  { label: "", icon: "🎰", cta: true },
  { label: "存款", icon: "💰" },
  { label: "我的", icon: "👤" }
];
