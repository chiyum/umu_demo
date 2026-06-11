/**
 * daheng-emerald（a14 大亨翡翠金典）共用資料 + 資產
 *
 * 來源設計稿：大亨_AWD_版型B_翡翠金典.html（AWD 完整響應式）
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，
 * 共用遊戲卡 / 分類 / 中獎榜 / 優惠 / footer 資料與圖片。
 */

/** hero 首圖（首存 1000 送 1000 banner，原稿第一張 slide） */
export const heroSrc = new URL("./assets/hero_banner.png", import.meta.url)
  .href;
/** 優惠卡裝飾獎盃圖（原稿 pban 內 trophy_cut.png） */
export const trophySrc = new URL("./assets/trophy_cut.png", import.meta.url)
  .href;

const chDg = new URL("./assets/ch_dg.png", import.meta.url).href;
const chPanda = new URL("./assets/ch_panda.png", import.meta.url).href;
const chRsg = new URL("./assets/ch_rsg.png", import.meta.url).href;
const chQt = new URL("./assets/ch_qt.png", import.meta.url).href;
const chOfa = new URL("./assets/ch_ofa.png", import.meta.url).href;
const g2 = new URL("./assets/g2.png", import.meta.url).href;
const g3 = new URL("./assets/g3.png", import.meta.url).href;
const g4 = new URL("./assets/g4.png", import.meta.url).href;

/** 頂部水平導覽（桌機限定，對齊原稿 topbar nav 7 項） */
export interface TopNavItem {
  label: string;
  active?: boolean;
}
export const TOP_NAV: TopNavItem[] = [
  { label: "首頁", active: true },
  { label: "真人" },
  { label: "體育" },
  { label: "電子" },
  { label: "棋牌" },
  { label: "彩票" },
  { label: "優惠" }
];

/** 遊戲大廳分類 tabs（對齊原稿 CATS 6 項） */
export interface GameCat {
  id: string;
  label: string;
}
export const GAME_CATS: GameCat[] = [
  { id: "hot", label: "熱門推薦" },
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

/** 遊戲卡（對齊原稿 GAMES 8 張，B 版 QT 也標 hot） */
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
 * 中獎名單榜（原稿 6 列隨機 mock；這裡固定一組降序資料對齊視覺）
 *
 * 為什麼固定：與 neon 同理，demo 追求穩定截圖 / 復刻一致性，
 * 不照原稿用 setInterval 隨機重排。
 */
export interface BoardRow {
  name: string;
  game: string;
  amount: number;
}
export const BOARD_ROWS: BoardRow[] = [
  { name: "黃**", game: "DG 真人・百家樂", amount: 412000 },
  { name: "陳**", game: "RSG 電子・雷神之鎚", amount: 308000 },
  { name: "林**", game: "熊貓體育・英超", amount: 221000 },
  { name: "張**", game: "QT 電子・金財神", amount: 156000 },
  { name: "王**", game: "好路棋牌・德州撲克", amount: 94000 },
  { name: "蔡**", game: "DG 真人・龍虎", amount: 47000 }
];

/** 優惠橫幅（對齊原稿 promo 2 張，第一張帶獎盃裝飾圖） */
export interface PromoBanner {
  kicker: string;
  title: string;
  desc: string;
  trophy?: boolean;
}
export const PROMOS: PromoBanner[] = [
  {
    kicker: "NEW MEMBER",
    title: "首存 1000 送 1000",
    desc: "新會員首存即享 100% 加碼",
    trophy: true
  },
  {
    kicker: "DAILY REBATE",
    title: "每週流水回饋 1.2%",
    desc: "全場館計入・自動派發無上限"
  }
];

/** 跑馬燈公告（對齊原稿 notice） */
export const NOTICE =
  "【系統公告】自 6/15（00:00）起，ATM 存款最低金額調整為 NT$300；翡翠廳新增 VIP 專屬百家樂桌，歐國盃首存加碼 20%。";

/** VIP 區文案（對齊原稿 .vip） */
export const VIP_DESC =
  "專屬客服、生日禮金、極速出款通道。下載 APP 開啟生物辨識登入，隨時隨地進入翡翠廳。";

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

/** 手機底部 5 格 tab（對齊原稿 bottomnav，中間「首頁」用皇冠 ♛） */
export interface BottomTab {
  label: string;
  icon: string;
  cta?: boolean;
  active?: boolean;
}
export const BOTTOM_TABS: BottomTab[] = [
  { label: "優惠", icon: "🎁" },
  { label: "客服", icon: "💬" },
  { label: "首頁", icon: "♛", cta: true, active: true },
  { label: "APP", icon: "📱" },
  { label: "我的", icon: "👤" }
];
