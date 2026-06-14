/**
 * noya-orbit（圓形圖標導航）共用資料 + 資產
 *
 * 移植設計稿 ly2（beige 色世界）：
 *   左側正圓圖標欄、右側緊湊雙欄卡
 * 真人（live）分類使用真實切片 DG / 歐博，其他分類用 CSS 斜紋佔位（忠實照設計稿）。
 */

/** hero banner */
export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
/** 真人 DG 卡切片 */
export const cardDgSrc = new URL("./assets/card-dg.png", import.meta.url).href;
/** 真人 歐博卡切片 */
export const cardAllbetSrc = new URL(
  "./assets/card-allbet.png",
  import.meta.url
).href;

/** 大廳左側分類（5 大類，icon 本地化為 Iconify material-symbols） */
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
 * 各分類遊戲卡（對齊設計稿 GAMES + 三層合成）
 * - ly2 卡片：圖在上 60%、文字在下、無 g-cta、g-deco 隱藏
 * - live：使用 figSrc 真實切片人物圖
 * - 其他分類：figSrc 留空，由 CSS .g-fig .ph 斜紋佔位渲染
 */
export interface LobbyCard {
  name: string;
  en: string;
  tag?: string;
  figSrc?: string;
  figLabel?: string;
}

export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    { name: "DG 真人", en: "DG CASINO", tag: "HOT", figSrc: cardDgSrc },
    { name: "歐博真人", en: "ALLBET", figSrc: cardAllbetSrc },
    { name: "WM 真人", en: "WM LIVE", figSrc: cardDgSrc },
    { name: "沙龍國際", en: "SA GAMING", figSrc: cardAllbetSrc }
  ],
  sport: [
    {
      name: "體育投注",
      en: "SPORTS",
      tag: "LIVE",
      figLabel: "賽事畫面 · MATCH"
    },
    { name: "電競專區", en: "E-SPORTS", figLabel: "賽事畫面 · MATCH" },
    { name: "即時比分", en: "LIVE SCORE", figLabel: "賽事畫面 · MATCH" }
  ],
  chess: [
    { name: "德州撲克", en: "TEXAS POKER", figLabel: "牌桌 · TABLE" },
    { name: "十三麻將", en: "MAHJONG", figLabel: "牌桌 · TABLE" },
    { name: "鬥地主", en: "LANDLORD", tag: "NEW", figLabel: "牌桌 · TABLE" }
  ],
  slot: [
    { name: "招財進寶", en: "FORTUNE", tag: "NEW", figLabel: "機台 · MACHINE" },
    { name: "經典老虎機", en: "CLASSIC SLOT", figLabel: "機台 · MACHINE" },
    { name: "水果盤", en: "FRUIT PARTY", figLabel: "機台 · MACHINE" }
  ],
  fish: [
    {
      name: "神龍捕魚",
      en: "DRAGON FISH",
      tag: "HOT",
      figLabel: "場景 · SCENE"
    },
    { name: "海王捕魚", en: "OCEAN KING", figLabel: "場景 · SCENE" },
    { name: "捕魚達人", en: "FISHING", figLabel: "場景 · SCENE" }
  ]
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

/** 底部 tabbar 5 項（中間「首頁」凸出球） */
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
