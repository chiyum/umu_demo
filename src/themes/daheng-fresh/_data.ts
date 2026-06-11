/**
 * daheng-fresh（a15 大亨清新活力）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型C_清新活力.html（AWD 完整響應式，淺色藍白系）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，
 * 共用遊戲卡 / 分類氣泡 / 中獎跑馬 / 優惠 / footer 資料與圖片。
 */

/** hero 首圖（首存 1000 送 1000 banner，原稿第一張 slide） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;

/**
 * Hero 輪播 slide（對齊原稿 3 個 slide：1 張圖 + 2 個漸層文案 s-b1 / s-b2）
 *
 * - kind "image"：原稿首張 banner 圖
 * - kind "grad"：原稿 .s-grad.s-b1 / .s-b2（白字疊在藍/橘漸層上）
 *   variant 對應 _tokens.scss 的 --hero-slide-b1 / b2 漸層背景
 *
 * 為什麼抽到 _data：desktop / mobile 共用同一組輪播，避免重複字面量。
 */
export interface HeroSlideImage {
  kind: "image";
}
export interface HeroSlideGrad {
  kind: "grad";
  variant: "b1" | "b2";
  kicker: string;
  titleLines: string[];
  desc: string;
}
export type HeroSlide = HeroSlideImage | HeroSlideGrad;
export const HERO_SLIDES: HeroSlide[] = [
  { kind: "image" },
  {
    kind: "grad",
    variant: "b1",
    kicker: "DAILY MISSION",
    titleLines: ["每日任務 簽到拿好禮"],
    desc: "連續簽到 7 天，最高領 777 點"
  },
  {
    kind: "grad",
    variant: "b2",
    kicker: "EURO 2026",
    titleLines: ["歐國盃專區 開賽啦！"],
    desc: "首存加碼 20%・串關加倍送"
  }
];

const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;
const g2 = new URL("./assets/g2.png", import.meta.url).href;
const g3 = new URL("./assets/g3.png", import.meta.url).href;
const g4 = new URL("./assets/g4.png", import.meta.url).href;

/** 頂部水平導覽（桌機限定，對齊原稿 topbar nav 5 項） */
export interface TopNavItem {
  label: string;
  active?: boolean;
}
export const TOP_NAV: TopNavItem[] = [
  { label: "首頁", active: true },
  { label: "遊戲大廳" },
  { label: "優惠活動" },
  { label: "排行榜" },
  { label: "客服中心" }
];

/**
 * hero 右側兩張漸層 mini 卡（桌機限定 sideStack，對齊原稿）
 */
export interface HeroMini {
  title: string;
  desc: string;
  variant: "m1" | "m2";
}
export const HERO_MINIS: HeroMini[] = [
  { title: "好友推薦 雙方得 588", desc: "邀請越多領越多", variant: "m1" },
  { title: "每週流水回饋 1.2%", desc: "自動派發無上限", variant: "m2" }
];

/** 分類氣泡（對齊原稿 CATS 6 項，含 emoji 圖示） */
export interface CatBubble {
  id: string;
  icon: string;
  label: string;
}
export const CAT_BUBBLES: CatBubble[] = [
  { id: "hot", icon: "🔥", label: "熱門" },
  { id: "live", icon: "🂡", label: "真人" },
  { id: "sport", icon: "⚽", label: "體育" },
  { id: "slot", icon: "🎰", label: "電子" },
  { id: "board", icon: "🀄", label: "棋牌" },
  { id: "lotto", icon: "🎫", label: "彩票" }
];

/** 分類 → 大廳標題（對齊原稿 CAT_NAME） */
export const CAT_TITLE: Record<string, string> = {
  hot: "熱門推薦",
  live: "真人遊戲",
  sport: "體育賽事",
  slot: "電子遊戲",
  board: "棋牌遊戲",
  lotto: "彩票遊戲"
};

/** 分類 → 卡片角標短名（對齊原稿 TAGS） */
export const CAT_TAG: Record<string, string> = {
  live: "真人",
  sport: "體育",
  slot: "電子",
  board: "棋牌",
  lotto: "彩票"
};

/** 遊戲卡（對齊原稿 GAMES 8 張，QT 也標 hot） */
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
  { img: chQt, name: "QT 電子", en: "QT SLOTS", cat: "slot", hot: true },
  { img: chOfa, name: "美女直播", en: "OFA GIRLS", cat: "live", hot: true },
  { img: g2, name: "歐博真人", en: "ALLBET LIVE", cat: "live", hot: false },
  { img: g3, name: "好路棋牌", en: "HOLO POKER", cat: "board", hot: false },
  { img: g4, name: "六合彩票", en: "LOTTERY 6", cat: "lotto", hot: false }
];

/**
 * 中獎跑馬燈晶片（原稿 8 個隨機 mock；這裡固定一組對齊視覺，
 * 元件層複製一輪做無縫滾動）
 */
export interface WinnerChip {
  name: string;
  game: string;
  amount: number;
}
export const WINNERS: WinnerChip[] = [
  { name: "黃**", game: "百家樂", amount: 286000 },
  { name: "陳**", game: "雷神之鎚", amount: 174000 },
  { name: "林**", game: "英超串關", amount: 96000 },
  { name: "張**", game: "金財神", amount: 53000 },
  { name: "王**", game: "德州撲克", amount: 142000 },
  { name: "吳**", game: "捕魚大師", amount: 38000 },
  { name: "劉**", game: "百家樂", amount: 210000 },
  { name: "蔡**", game: "雷神之鎚", amount: 67000 }
];

/** 彩金池起始金額（對齊原稿 jackpot 起始值；demo 取固定值不做跳動） */
export const JACKPOT = 36184920;

/** 優惠卡（對齊原稿 promo 3 張，含對應 icon 與底色 class） */
export interface PromoCard {
  icon: string;
  colorClass: "c1" | "c2" | "c3";
  title: string;
  desc: string;
}
export const PROMOS: PromoCard[] = [
  {
    icon: "🎁",
    colorClass: "c1",
    title: "首存 1000 送 1000",
    desc: "新會員首存即享 100% 加碼"
  },
  {
    icon: "🛟",
    colorClass: "c2",
    title: "負盈利救援金 5%",
    desc: "每日結算，翻本不求人"
  },
  {
    icon: "🤝",
    colorClass: "c3",
    title: "好友推薦 雙方得 588",
    desc: "邀請越多領越多，上不封頂"
  }
];

/** 跑馬燈公告（對齊原稿 notice） */
export const NOTICE =
  "【系統公告】自 6/15（00:00）起，ATM 存款最低金額調整為 NT$300；每日任務新上線，簽到即送好禮！";

/** footer 連結（對齊原稿 6 項） */
export const FOOTER_LINKS: string[] = [
  "關於我們",
  "存取款說明",
  "常見問題",
  "合作夥伴",
  "責任博彩",
  "隱私條款"
];

export const FOOTER_FINE =
  "大亨娛樂城祇接受年滿 21 歲之用戶註冊遊玩。請理性投注、量力而為。";

/** 手機底部 5 格 tab（對齊原稿 bottomnav，中間「首頁」用骰子 🎲） */
export interface BottomTab {
  label: string;
  icon: string;
  cta?: boolean;
  active?: boolean;
}
export const BOTTOM_TABS: BottomTab[] = [
  { label: "優惠", icon: "🎁" },
  { label: "客服", icon: "💬" },
  { label: "首頁", icon: "🎲", cta: true, active: true },
  { label: "排行", icon: "🏆" },
  { label: "我的", icon: "👤" }
];
