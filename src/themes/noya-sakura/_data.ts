/**
 * noya-sakura（櫻粉柔美）共用資料 + 資產
 *
 * 淺色主題，底色近白帶極淺粉，
 * live 真人切片卡 + 其他分類粉漸層佔位卡。
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

/**
 * 大廳左側分類（5 大類：真人 / 體育 / 棋牌 / 電子 / 捕魚）
 *
 * 每個分類附帶熱門數 badge（右上角小圓數字）
 */
export interface LobbyCategory {
  key: string;
  label: string;
  icon: string;
  badge?: number;
}
export const LOBBY_CATEGORIES: LobbyCategory[] = [
  {
    key: "live",
    label: "真人",
    icon: "material-symbols:person-outline",
    badge: 98
  },
  {
    key: "sport",
    label: "體育",
    icon: "material-symbols:sports-soccer",
    badge: 64
  },
  {
    key: "chess",
    label: "棋牌",
    icon: "material-symbols:casino-outline",
    badge: 31
  },
  {
    key: "slot",
    label: "電子",
    icon: "material-symbols:smart-toy-outline",
    badge: 127
  },
  {
    key: "fish",
    label: "捕魚",
    icon: "material-symbols:phishing",
    badge: 22
  }
];

/**
 * 各分類卡片
 * - live：真實切片圖
 * - 其他：粉漸層佔位卡（大標 + 副標 + 英文水印）
 */
export interface LobbyCard {
  img?: string;
  alt?: string;
  big?: string;
  sub?: string;
  wm?: string;
}
export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    { img: cardDgSrc, alt: "DG真人 DG CASINO" },
    { img: cardAllbetSrc, alt: "歐博真人 ALLBET CASINO" },
    { img: cardDgSrc, alt: "DG真人 DG CASINO" }
  ],
  sport: [
    { big: "鑫寶體育", sub: "SHINBO SPORTS", wm: "SPORTS" },
    { big: "熊貓體育", sub: "PANDA SPORTS", wm: "SPORTS" }
  ],
  chess: [
    { big: "開元棋牌", sub: "KAIYUAN CHESS", wm: "POKER" },
    { big: "博雅棋牌", sub: "BOYAA POKER", wm: "POKER" }
  ],
  slot: [
    { big: "PG 電子", sub: "PG SLOT", wm: "SLOT" },
    { big: "PT 電子", sub: "PT SLOT", wm: "SLOT" },
    { big: "MG 電子", sub: "MG SLOT", wm: "SLOT" }
  ],
  fish: [
    { big: "捕魚達人", sub: "FISHING MASTER", wm: "FISHING" },
    { big: "全民捕魚", sub: "OCEAN KING", wm: "FISHING" }
  ]
};

/** 快捷功能（存款 / 取款 / 消息） */
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
