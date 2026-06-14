/**
 * noya-hive（諾亞蜂巢）共用資料 + 資產
 *
 * 移植 ly5 六角蜂巢版型，翡翠綠（emerald）色世界。
 * 遊戲大廳 categories 只用 live 類，卡片圖用真人切片。
 */

/** hero banner（沿用 noya-blue hero.png 切片） */
export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
/** 真人 DG 卡切片 */
export const cardDgSrc = new URL("./assets/card-dg.png", import.meta.url).href;
/** 真人 歐博卡切片 */
export const cardAllbetSrc = new URL(
  "./assets/card-allbet.png",
  import.meta.url
).href;

/**
 * 大廳左側分類（5 大類：真人 / 體育 / 棋牌 / 電子 / 捕魚）
 *
 * 對齊設計稿 CATS，icon 本地化為等義 material-symbols。
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
 * 各分類卡片（對齊設計稿 GAMES）
 *
 * - 真人（live）：DG 真人 / 歐博真人 / WM 真人 / 沙龍國際，含 tag
 * - 其他分類：佔位漸層卡，含 name / en / tag（部分）
 */
export interface LobbyCard {
  /** 真人切片圖（live 類專屬） */
  img?: string;
  alt?: string;
  /** 遊戲中文名 */
  name?: string;
  /** 英文副標 */
  en?: string;
  /** HOT / NEW / LIVE 等 tag 徽章 */
  tag?: string;
}
export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    {
      img: cardDgSrc,
      alt: "DG 真人 DG CASINO",
      name: "DG 真人",
      en: "DG CASINO",
      tag: "HOT"
    },
    {
      img: cardAllbetSrc,
      alt: "歐博真人 ALLBET",
      name: "歐博真人",
      en: "ALLBET"
    },
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

/** 各分類人物圖區說明文字（佔位卡用） */
export const FIGLAB: Record<string, string> = {
  live: "真人視訊 · LIVE",
  sport: "賽事畫面 · MATCH",
  chess: "牌桌 · TABLE",
  slot: "機台 · MACHINE",
  fish: "場景 · SCENE"
};

/** 在線人數旁的 3 個快捷功能 */
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
  "PG SLOT",
  "PT SLOT",
  "MG SLOT",
  "開元棋牌",
  "博雅棋牌",
  "鑫寶體育",
  "熊貓體育",
  "捕魚達人",
  "全民捕魚"
];
