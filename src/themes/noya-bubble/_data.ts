/**
 * noya-bubble（浮動藥丸交錯）共用資料 + 資產
 *
 * 移植自設計稿 ly7：浮動藥丸交錯，米色調
 * 真人（live）分類使用 DG / 歐博切片，其他分類用 CSS 佔位卡
 */

/** hero banner（米色暖調主視覺，沿用 hero.png 切片） */
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
 * icon 使用 Iconify material-symbols，對齊設計稿語意
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
 * - 真人（live）：使用真實切片 banner（img）
 * - 其他分類：米色漸層佔位卡（big + sub + tag + wm）
 */
export interface LobbyCard {
  img?: string;
  alt?: string;
  big?: string;
  sub?: string;
  tag?: string; // HOT / NEW / LIVE 角標
  wm?: string; // 右側半透明水印英文
}

export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    { img: cardDgSrc, alt: "DG真人 DG CASINO", tag: "HOT" },
    { img: cardAllbetSrc, alt: "歐博真人 ALLBET CASINO" },
    { big: "WM 真人", sub: "WM LIVE", wm: "LIVE" },
    { big: "沙龍國際", sub: "SA GAMING", wm: "LIVE" }
  ],
  sport: [
    { big: "體育投注", sub: "SPORTS", tag: "LIVE", wm: "SPORTS" },
    { big: "電競專區", sub: "E-SPORTS", wm: "SPORTS" },
    { big: "即時比分", sub: "LIVE SCORE", wm: "SPORTS" }
  ],
  chess: [
    { big: "德州撲克", sub: "TEXAS POKER", wm: "POKER" },
    { big: "十三麻將", sub: "MAHJONG", wm: "POKER" },
    { big: "鬥地主", sub: "LANDLORD", tag: "NEW", wm: "POKER" }
  ],
  slot: [
    { big: "招財進寶", sub: "FORTUNE", tag: "NEW", wm: "SLOT" },
    { big: "經典老虎機", sub: "CLASSIC SLOT", wm: "SLOT" },
    { big: "水果盤", sub: "FRUIT PARTY", wm: "SLOT" }
  ],
  fish: [
    { big: "神龍捕魚", sub: "DRAGON FISH", tag: "HOT", wm: "FISHING" },
    { big: "海王捕魚", sub: "OCEAN KING", wm: "FISHING" },
    { big: "捕魚達人", sub: "FISHING", wm: "FISHING" }
  ]
};

/** 在線人數旁的快捷功能 */
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
  {
    key: "msg",
    label: "消息",
    icon: "material-symbols:notifications-outline"
  }
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
  "鑫寶體育",
  "熊貓體育",
  "開元棋牌",
  "博雅棋牌",
  "PG SLOT",
  "捕魚達人",
  "全民捕魚"
];
