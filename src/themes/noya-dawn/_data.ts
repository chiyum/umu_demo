/**
 * noya-dawn（蜜桃晨曦）共用資料 + 資產
 *
 * 淺色暖調底（近白米），蜜桃晨曦 accent，
 * 右側頁面：頂部 1 張精選大卡 + 下方垂直列表（縮圖 + 標題副標 + 進入按鈕）。
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

/**
 * 各分類資料
 *
 * 版面為：頂部 1 張精選大卡（featured）+ 下方垂直列表（list[]）。
 * live 分類的精選卡用真實切片，list 也用切片；其他用純暖色漸層佔位。
 */
export interface LobbyFeatured {
  img?: string;
  alt?: string;
  big?: string;
  sub?: string;
  wm?: string;
}
export interface LobbyListItem {
  img?: string;
  alt?: string;
  big: string;
  sub: string;
}
export interface LobbySection {
  featured: LobbyFeatured;
  list: LobbyListItem[];
}
export const LOBBY_SECTIONS: Record<string, LobbySection> = {
  live: {
    featured: { img: cardDgSrc, alt: "DG真人 DG CASINO" },
    list: [
      {
        img: cardAllbetSrc,
        alt: "歐博真人",
        big: "歐博真人",
        sub: "ALLBET CASINO"
      },
      { img: cardDgSrc, alt: "DG 真人", big: "DG 真人", sub: "DG CASINO" },
      { big: "沙龍真人", sub: "SA GAMING" }
    ]
  },
  sport: {
    featured: { big: "鑫寶體育", sub: "SHINBO SPORTS", wm: "SPORTS" },
    list: [
      { big: "熊貓體育", sub: "PANDA SPORTS" },
      { big: "沙巴體育", sub: "SABA SPORTS" }
    ]
  },
  chess: {
    featured: { big: "開元棋牌", sub: "KAIYUAN CHESS", wm: "POKER" },
    list: [
      { big: "博雅棋牌", sub: "BOYAA POKER" },
      { big: "歡樂鬥地主", sub: "HAPPY DDZ" }
    ]
  },
  slot: {
    featured: { big: "PG 電子", sub: "PG SLOT", wm: "SLOT" },
    list: [
      { big: "PT 電子", sub: "PT SLOT" },
      { big: "MG 電子", sub: "MG SLOT" },
      { big: "JDB 電子", sub: "JDB SLOT" }
    ]
  },
  fish: {
    featured: { big: "捕魚達人", sub: "FISHING MASTER", wm: "FISHING" },
    list: [
      { big: "全民捕魚", sub: "OCEAN KING" },
      { big: "龍王捕魚", sub: "DRAGON KING FISH" }
    ]
  }
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
