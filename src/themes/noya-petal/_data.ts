/**
 * noya-petal（諾亞玫瑰花瓣）共用資料 + 資產
 *
 * 移植自設計稿 ly3 葉片曲線標籤版型。
 * 色調玫瑰（rose）為主，亮色系（brightness=light）。
 * 真人視訊分類為主（categories=["live"]）。
 */

/** hero banner（沿用 noya-blue 的 hero 切片，覆以玫瑰色調） */
export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
/** 真人 DG 卡切片 */
export const cardDgSrc = new URL("./assets/card-dg.png", import.meta.url).href;
/** 真人 歐博卡切片 */
export const cardAllbetSrc = new URL(
  "./assets/card-allbet.png",
  import.meta.url
).href;

/**
 * 大廳左側分類（對齊設計稿 CATS 5 大類：真人 / 體育 / 棋牌 / 電子 / 捕魚）
 *
 * icon 使用 Iconify material-symbols 等義替換原稿 inline SVG
 */
export interface LobbyCategory {
  key: string;
  label: string;
  icon: string;
}
export const LOBBY_CATEGORIES: LobbyCategory[] = [
  { key: "live", label: "真人", icon: "material-symbols:person-outline" },
  { key: "sport", label: "體育", icon: "material-symbols:sports-soccer" },
  { key: "chess", label: "棋牌", icon: "material-symbols:casino-outline" },
  { key: "slot", label: "電子", icon: "material-symbols:smart-toy-outline" },
  { key: "fish", label: "捕魚", icon: "material-symbols:phishing" }
];

/**
 * 各分類遊戲卡資料（對齊設計稿 GAMES）
 *
 * - 真人（live）：提供 name/en/tag 供三層合成卡渲染（g-bg + g-txt + g-fig）
 * - 其他分類：same 三層合成卡，g-fig 用 .ph 佔位
 */
export interface LobbyCard {
  name: string;
  en: string;
  tag?: string;
  /** 真人分類可用真實切片圖（g-fig img） */
  img?: string;
  imgAlt?: string;
}
export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    {
      name: "DG 真人",
      en: "DG CASINO",
      tag: "HOT",
      img: cardDgSrc,
      imgAlt: "DG真人"
    },
    { name: "歐博真人", en: "ALLBET", img: cardAllbetSrc, imgAlt: "歐博真人" },
    { name: "WM 真人", en: "WM LIVE" },
    { name: "沙龍國際", en: "SA GAMING" }
  ],
  sport: [
    { name: "體育投注", en: "SPORTS", tag: "LIVE" },
    { name: "電競專區", en: "E-SPORTS" },
    { name: "即時比分", en: "LIVE SCORE" }
  ],
  chess: [
    { name: "德州撲克", en: "TEXAS POKER" },
    { name: "十三麻將", en: "MAHJONG" },
    { name: "鬥地主", en: "LANDLORD", tag: "NEW" }
  ],
  slot: [
    { name: "招財進寶", en: "FORTUNE", tag: "NEW" },
    { name: "經典老虎機", en: "CLASSIC SLOT" },
    { name: "水果盤", en: "FRUIT PARTY" }
  ],
  fish: [
    { name: "神龍捕魚", en: "DRAGON FISH", tag: "HOT" },
    { name: "海王捕魚", en: "OCEAN KING" },
    { name: "捕魚達人", en: "FISHING" }
  ]
};

/** 分類佔位文字（g-fig .ph 用） */
export const FIGLAB: Record<string, string> = {
  live: "真人視訊 · LIVE",
  sport: "賽事畫面 · MATCH",
  chess: "牌桌 · TABLE",
  slot: "機台 · MACHINE",
  fish: "場景 · SCENE"
};

/** 在線人數旁 3 個快捷功能 */
export interface QuickAction {
  key: string;
  label: string;
  icon: string;
}
export const QUICK_ACTIONS: QuickAction[] = [
  {
    key: "deposit",
    label: "存款",
    icon: "material-symbols:credit-card-outline"
  },
  {
    key: "withdraw",
    label: "取款",
    icon: "material-symbols:account-balance-outline"
  },
  { key: "msg", label: "消息", icon: "material-symbols:notifications-outline" }
];

/** 底部 tabbar 5 項（中間「首頁」凸出） */
export interface BottomTab {
  key: string;
  label: string;
  icon: string;
  center?: boolean;
}
export const BOTTOM_TABS: BottomTab[] = [
  {
    key: "promo",
    label: "優惠活動",
    icon: "material-symbols:local-activity-outline"
  },
  { key: "service", label: "在線客服", icon: "material-symbols:chat-outline" },
  { key: "home", label: "首頁", icon: "material-symbols:home", center: true },
  { key: "app", label: "APP下載", icon: "material-symbols:download" },
  { key: "me", label: "個人中心", icon: "material-symbols:person-outline" }
];

/** desktop 頂部導覽 */
export const DESKTOP_NAV: { key: string; label: string }[] = [
  { key: "live", label: "真人視訊" },
  { key: "sport", label: "體育投注" },
  { key: "chess", label: "棋牌遊戲" },
  { key: "slot", label: "電子遊戲" },
  { key: "fish", label: "捕魚遊戲" }
];

/** desktop footer 廠商文字牆 */
export const FOOTER_PROVIDERS: string[] = [
  "DG CASINO",
  "AllBet",
  "歐博真人",
  "WM LIVE",
  "SA GAMING",
  "PG SLOT",
  "PT SLOT",
  "MG SLOT",
  "開元棋牌",
  "博雅棋牌",
  "鑫寶體育",
  "捕魚達人"
];
