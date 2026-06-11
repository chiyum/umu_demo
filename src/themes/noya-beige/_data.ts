/**
 * noya-beige（諾亞米色）共用資料 + 資產
 *
 * 來源稿諾亞米色 mobile 幾乎 1:1 對應 noya_assets/assets/ 那批切片，
 * 忠實還原版面所需圖片集中在這裡，mobile（忠實復刻）與 desktop（新做）共用。
 *
 * 用 `new URL(..., import.meta.url).href`：vite build 解析含 base path + hash 的 URL。
 */

/** header 左側品牌切片（原稿 logo.png；但實際 header logo 走 theme store，這張保留作 hero 裝飾備用） */
export const heroSrc = new URL("./assets/hero.png", import.meta.url).href;
/** header 右側「會員登入 / 會員註冊」切片 */
export const headRightSrc = new URL("./assets/headright.png", import.meta.url)
  .href;
/** 系統公告切片 */
export const noticeSrc = new URL("./assets/notice.png", import.meta.url).href;
/** 在線人數旁的快捷功能切片（存款 取款 消息） */
export const actionsSrc = new URL("./assets/actions.png", import.meta.url).href;
/** 底部 tabbar 切片（優惠活動 在線客服 首頁 APP下載 個人中心） */
export const navSrc = new URL("./assets/nav.png", import.meta.url).href;
/** 真人分類 DG 真人卡 banner 切片 */
export const cardDgSrc = new URL("./assets/card-dg.png", import.meta.url).href;
/** 真人分類 歐博真人卡 banner 切片 */
export const cardAllbetSrc = new URL(
  "./assets/card-allbet.png",
  import.meta.url
).href;
/** desktop 補做用的橫幅 promo 切片 */
export const promoSrc = new URL("./assets/promo_v2.png", import.meta.url).href;

/** desktop 熱門遊戲格用的遊戲縮圖切片 g1..g6（原稿同批素材） */
export const gameThumbs: string[] = [
  new URL("./assets/g1.png", import.meta.url).href,
  new URL("./assets/g2.png", import.meta.url).href,
  new URL("./assets/g3.png", import.meta.url).href,
  new URL("./assets/g4.png", import.meta.url).href,
  new URL("./assets/g6.png", import.meta.url).href
];

/**
 * 大廳左側分類（對齊原稿 5 大類：真人 / 體育 / 棋牌 / 電子 / 捕魚）
 *
 * icon 用 Iconify material-symbols（原稿是 inline SVG，這裡本地化為等義 icon，
 * 與既有 noya / fuyou 的 5 大類 icon 語意一致）
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
 * 各分類的卡片資料（對齊原稿 CATS）
 *
 * - 真人（live）：用真實切片 banner（DG / 歐博 / 真人）
 * - 其他分類：原稿是 placeholder 卡（big + sub 文字），忠實復刻成佔位卡
 */
export interface LobbyCard {
  /** 真實 banner 切片 URL（live 用） */
  img?: string;
  alt?: string;
  /** 佔位卡中文大標 */
  big?: string;
  /** 佔位卡英文副標 */
  sub?: string;
}
export const LOBBY_CARDS: Record<string, LobbyCard[]> = {
  live: [
    { img: cardDgSrc, alt: "DG真人 DG CASINO" },
    { img: cardAllbetSrc, alt: "歐博真人 ALLBET CASINO" },
    { img: cardDgSrc, alt: "真人 LIVE CASINO" }
  ],
  sport: [
    { big: "鑫寶體育", sub: "SHINBO SPORTS" },
    { big: "熊貓體育", sub: "PANDA SPORTS" }
  ],
  chess: [
    { big: "開元棋牌", sub: "KAIYUAN CHESS" },
    { big: "博雅棋牌", sub: "BOYAA POKER" }
  ],
  slot: [
    { big: "PG 電子", sub: "PG SLOT" },
    { big: "PT 電子", sub: "PT SLOT" },
    { big: "MG 電子", sub: "MG SLOT" }
  ],
  fish: [
    { big: "捕魚達人", sub: "FISHING MASTER" },
    { big: "全民捕魚", sub: "OCEAN KING" }
  ]
};

/** desktop 補做用：頂部導覽 5 大類 + 品牌 */
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
