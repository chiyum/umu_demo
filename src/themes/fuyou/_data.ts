/**
 * fuyou（富遊大亨）共用資料 + 資產
 *
 * 為什麼集中一處：desktop / mobile 兩版共用同一批遊戲卡資料與圖片，
 * 抽出後避免兩個 SFC 各寫一遍 new URL 與遊戲陣列字面量。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages /umu_demo/）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 主視覺 banner（深藍金賭場入口大圖） */
export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
/** 熱門遊戲區右側主視覺（模特＋遊戲元素） */
export const hotGameSrc = new URL("./assets/hotgame.png", import.meta.url).href;
/** App 下載區左側手機展示主視覺 */
export const appSrc = new URL("./assets/app.png", import.meta.url).href;

/**
 * 頂部 / 手機分類導覽列（對齊原稿 9 項，最後一項「富遊直播」為金色 CTA）
 */
export interface NavItem {
  label: string;
  gold?: boolean;
}
export const NAV_ITEMS: NavItem[] = [
  { label: "熱門" },
  { label: "體育" },
  { label: "真人" },
  { label: "電子" },
  { label: "彩票" },
  { label: "棋牌" },
  { label: "捕魚" },
  { label: "優惠" },
  { label: "富遊直播", gold: true }
];

/** 熱門遊戲 tabs（對齊原稿 6 個） */
export const POPULAR_TABS: string[] = [
  "熱門",
  "體育",
  "真人",
  "電子",
  "彩票",
  "棋牌"
];

/**
 * 熱門遊戲卡（對齊原稿 8 張）
 *
 * 兩種樣式：
 * - rg：RG 紅字 logo + 中文遊戲名（富遊自有品牌）+ 可選橘紅角標 badge
 * - wm：直接顯示廠商縮寫（RSG / DG / PA）+ 中文名
 */
export interface GameCard {
  /** 橘紅角標文字（可選） */
  badge?: string;
  /** RG 樣式：true = 顯示 RG 紅字 + name 為富遊子品牌；false = 顯示 wm 廠商縮寫 */
  rg: boolean;
  /** RG 樣式時的小字（富遊電子 / 富遊真人...）；wm 樣式時忽略 */
  rgLabel?: string;
  /** wm 樣式時的廠商縮寫（RSG / DG / PA） */
  wm?: string;
  /** wm 樣式時的中文名 */
  name?: string;
}
export const GAME_CARDS: GameCard[] = [
  { badge: "屬靈勇者", rg: true, rgLabel: "富遊電子" },
  { badge: "即時反水", rg: true, rgLabel: "富遊真人" },
  { badge: "開獎直播", rg: true, rgLabel: "富遊彩票" },
  { rg: false, wm: "RSG", name: "RSG" },
  { badge: "最佳賠率", rg: true, rgLabel: "富遊體育" },
  { rg: false, wm: "DG", name: "DG" },
  { badge: "世足直播", rg: true, rgLabel: "富遊直播" },
  { rg: false, wm: "PA", name: "熊貓體育" }
];

/** 頂尖優質服務 3 卡（對齊原稿文案） */
export interface ServiceCard {
  /** Iconify icon 名稱（material-symbols） */
  icon: string;
  title: string;
  desc: string;
}
export const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: "material-symbols:savings-outline",
    title: "快速存款轉帳",
    desc: "富遊自行研發的財務系統，真正做到快速存取、轉帳等獨家網路技術，為您提供一流的遊戲體驗。"
  },
  {
    icon: "material-symbols:stadia-controller-outline",
    title: "眾多遊戲種類",
    desc: "每日有眾多精彩的海內外彩票、真人、體育、電子等多種娛樂方式，讓您一次享受完美體驗。"
  },
  {
    icon: "material-symbols:shield-lock-outline",
    title: "資金安全管理",
    desc: "富遊研發強大的數據加密技術，為您的帳號安全護航，讓客戶安心享受每一刻的遊玩過程。"
  }
];

/** footer 廠商文字牆（對齊原稿 24 個 provider wordmark） */
export const FOOTER_PROVIDERS: string[] = [
  "SA GAMING",
  "AllBet",
  "DRAGON",
  "OG CASINO",
  "AE SEXY",
  "GR",
  "PANDA SPORTS",
  "LIVE CASINO",
  "POKER",
  "SLOTS",
  "BC HASH",
  "LOTTERY",
  "RG 棋牌",
  "GEMINI",
  "WM",
  "WORLD",
  "QTech",
  "S PLUS",
  "VG",
  "JILI",
  "CQ9",
  "KT GAMES",
  "LIVE 22",
  "BNG"
];

/** 跑馬燈公告（對齊原稿 4 句，重複一輪做無縫滾動） */
export const TICKER_MESSAGES: string[] = [
  "公告 ➡ 定期更改密碼很重要！",
  "防詐公告：本平台並無信用版",
  "反詐騙宣導 ➡ 請你匯款都是假的！！！",
  "反詐騙宣導 ➡ 簡訊優惠詐騙！"
];

/** 手機版大廳左側分類（app 式佈局用，沿用 5 大類語意） */
export interface LobbyCategory {
  key: string;
  label: string;
  icon: string;
}
export const LOBBY_CATEGORIES: LobbyCategory[] = [
  { key: "hot", label: "熱門", icon: "material-symbols:local-fire-department" },
  { key: "live", label: "真人", icon: "material-symbols:person-outline" },
  { key: "sport", label: "體育", icon: "material-symbols:sports-soccer" },
  { key: "slot", label: "電子", icon: "material-symbols:smart-toy-outline" },
  { key: "fish", label: "捕魚", icon: "material-symbols:phishing" }
];
