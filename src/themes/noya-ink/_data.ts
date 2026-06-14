/**
 * noya-ink（東方墨竹宣紙）共用資料 + 資產
 *
 * 宣紙米白底、東方美學、印章風方形 tab、宣紙裱框卡片。
 * 三色票：jade（預設）墨竹翠 / vermillion 硃砂紅 / indigo 靛墨藍
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

/** 大廳左側分類（5 大類） */
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

/** 各分類卡片 */
export interface LobbyCard {
  img?: string;
  alt?: string;
  big?: string;
  sub?: string;
  /** 卡片右側半透明大水印英文 */
  wm?: string;
}
export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    { img: cardDgSrc, alt: "DG真人 DG CASINO" },
    { img: cardAllbetSrc, alt: "歐博真人 ALLBET CASINO" },
    { img: cardDgSrc, alt: "DG真人 DG CASINO" }
  ],
  sport: [
    { big: "鑫寶體育", sub: "SHINBO SPORTS", wm: "體育" },
    { big: "熊貓體育", sub: "PANDA SPORTS", wm: "博彩" }
  ],
  chess: [
    { big: "開元棋牌", sub: "KAIYUAN CHESS", wm: "棋牌" },
    { big: "博雅棋牌", sub: "BOYAA POKER", wm: "雅趣" }
  ],
  slot: [
    { big: "PG 電子", sub: "PG SLOT", wm: "電子" },
    { big: "PT 電子", sub: "PT SLOT", wm: "遊戲" },
    { big: "MG 電子", sub: "MG SLOT", wm: "娛樂" }
  ],
  fish: [
    { big: "捕魚達人", sub: "FISHING MASTER", wm: "捕魚" },
    { big: "全民捕魚", sub: "OCEAN KING", wm: "海洋" }
  ]
};

/** 快捷功能 */
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
