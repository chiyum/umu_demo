/**
 * daheng-neon（a13 大亨霓虹電競）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型A_霓虹電競.html（AWD 完整響應式，同時含桌機 sidebar 與手機底部 tab）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 遊戲卡 / 分類 / 即時派彩 / nav / footer 資料與圖片，抽出後避免兩個 SFC 各寫一遍。
 *
 * 為什麼用 `new URL(..., import.meta.url).href`：
 * - vite build 時解析成含 base path（GitHub Pages /umu_demo/）+ hash 指紋的正確 URL
 * - 圖片走 asset pipeline 不會被 import 進 JS bundle
 */

/** hero 首圖（首存 1000 送 1000 banner，原稿第一張 slide） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/** 遊戲卡圖片（原稿 GAMES 8 張） */
const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;
const g2 = new URL("./assets/g2.png", import.meta.url).href;
const g3 = new URL("./assets/g3.png", import.meta.url).href;
const g4 = new URL("./assets/g4.png", import.meta.url).href;

/**
 * 桌機側欄 / 手機選單導覽（對齊原稿 sidebar nav 8 項，emoji 圖示忠於原稿）
 */
export interface SideNavItem {
  label: string;
  icon: string;
  active?: boolean;
}
export const SIDE_NAV: SideNavItem[] = [
  { label: "首頁", icon: "⌂", active: true },
  { label: "優惠活動", icon: "🎁" },
  { label: "真人遊戲", icon: "🂡" },
  { label: "體育賽事", icon: "⚽" },
  { label: "電子遊戲", icon: "🎰" },
  { label: "棋牌遊戲", icon: "🀄" },
  { label: "彩票遊戲", icon: "⑥" },
  { label: "捕魚遊戲", icon: "🐟" }
];

/** 頂部快捷功能（對齊原稿 quick 4 顆） */
export interface QuickAction {
  label: string;
  icon: string;
}
export const QUICK_ACTIONS: QuickAction[] = [
  { label: "存款", icon: "💳" },
  { label: "取款", icon: "🏧" },
  { label: "VIP", icon: "👑" },
  { label: "客服", icon: "💬" }
];

/** 遊戲大廳分類 tabs（對齊原稿 CATS 6 項，hot 為熱門推薦聚合） */
export interface GameCat {
  id: string;
  label: string;
}
export const GAME_CATS: GameCat[] = [
  { id: "hot", label: "🔥 熱門推薦" },
  { id: "live", label: "真人遊戲" },
  { id: "sport", label: "體育賽事" },
  { id: "slot", label: "電子遊戲" },
  { id: "board", label: "棋牌遊戲" },
  { id: "lotto", label: "彩票遊戲" }
];

/** 分類 → 卡片角標短名（對齊原稿 CAT_NAME） */
export const CAT_TAG: Record<string, string> = {
  live: "真人",
  sport: "體育",
  slot: "電子",
  board: "棋牌",
  lotto: "彩票"
};

/** 遊戲卡（對齊原稿 GAMES 8 張，順序 / 名稱 / 分類 / hot 全對齊） */
export interface GameCard {
  img: string;
  name: string;
  en: string;
  cat: string;
  hot: boolean;
}
export const GAMES: GameCard[] = [
  { img: chDg, name: "DG 真人", en: "DG LIVE", cat: "live", hot: true },
  {
    img: chPanda,
    name: "熊貓體育",
    en: "PANDA SPORTS",
    cat: "sport",
    hot: true
  },
  { img: chRsg, name: "RSG 電子", en: "RSG SLOTS", cat: "slot", hot: true },
  { img: chQt, name: "QT 電子", en: "QT SLOTS", cat: "slot", hot: false },
  { img: chOfa, name: "美女直播", en: "OFA GIRLS", cat: "live", hot: true },
  { img: g2, name: "歐博真人", en: "ALLBET LIVE", cat: "live", hot: false },
  { img: g3, name: "好路棋牌", en: "HOLO POKER", cat: "board", hot: false },
  { img: g4, name: "六合彩票", en: "LOTTERY 6", cat: "lotto", hot: false }
];

/** 優惠活動卡（對齊原稿 promo 3 張） */
export interface PromoCard {
  kicker: string;
  title: string;
  desc: string;
}
export const PROMOS: PromoCard[] = [
  {
    kicker: "NEW MEMBER",
    title: "首存 1000 送 1000",
    desc: "新會員首存即享 100% 加碼"
  },
  {
    kicker: "REBATE",
    title: "負盈利救援金 5%",
    desc: "每日結算，翻本不求人"
  },
  {
    kicker: "REFERRAL",
    title: "好友推薦 雙方得 588",
    desc: "邀請越多領越多，上不封頂"
  }
];

/**
 * 即時派彩榜（原稿是隨機跳動的 mock，這裡固定一組靜態資料）
 *
 * 為什麼不照原稿用 setInterval 隨機重排：
 * - demo 頁追求穩定截圖 / 復刻一致性，隨機跳動對 sales demo 無加分且增加 race / 記憶體負擔
 * - 取原稿 NAMES / GAMENAMES 字面量組一組合理結果，已降序排好對齊原稿視覺
 */
export interface RankRow {
  name: string;
  game: string;
  amount: number;
}
export const RANKS: RankRow[] = [
  { name: "黃**", game: "DG 真人・百家樂", amount: 408000 },
  { name: "陳**", game: "RSG 電子・雷神之鎚", amount: 286000 },
  { name: "林**", game: "熊貓體育・英超", amount: 174000 },
  { name: "王**", game: "QT 電子・金財神", amount: 96000 },
  { name: "蔡**", game: "好路棋牌・德州撲克", amount: 53000 }
];

/** 跑馬燈公告（對齊原稿 notice 單句） */
export const NOTICE =
  "【系統公告】自 6/15（00:00）起，ATM 存款最低金額調整為 NT$300；體育賽事新增 UEFA 歐國盃專區，首存加碼 20%。";

/** 頂欄歡迎詞（對齊原稿 .welcome） */
export const WELCOME = "歡迎來到大亨娛樂城，今日已派彩 NT$ 12,847,300";

/** footer 連結（對齊原稿 6 項） */
export const FOOTER_LINKS: string[] = [
  "關於我們",
  "存取款說明",
  "常見問題",
  "合作夥伴",
  "責任博彩",
  "隱私條款"
];

/** footer 免責聲明（對齊原稿） */
export const FOOTER_FINE =
  "大亨娛樂城祇接受年滿 21 歲之用戶註冊遊玩。請理性投注、量力而為。";

/** 手機底部 5 格 tab（對齊原稿 bottomnav，中間「首頁」為凸出 CTA） */
export interface BottomTab {
  label: string;
  icon: string;
  cta?: boolean;
  active?: boolean;
}
export const BOTTOM_TABS: BottomTab[] = [
  { label: "優惠", icon: "🎁" },
  { label: "客服", icon: "💬" },
  { label: "首頁", icon: "⌂", cta: true, active: true },
  { label: "APP", icon: "📱" },
  { label: "我的", icon: "👤" }
];
