import type { Component } from "vue";

/**
 * Theme 系統的型別定義
 *
 * 設計理念：
 * - layoutKey：版面骨架（決定整體區塊組合與視覺主結構，例如 noya / at99）
 * - colorKey：色彩變體（在同一版面下可以切換配色，例如 noya 預設 / 日落橘 / 青檸綠）
 * - layout 與 color 解耦：同一個版面可以套用該版面下定義的任一配色
 *
 * 為什麼用 lazy import：避免所有版面 chunk 一次塞進主 bundle，
 * 切換版面才下載對應檔案，後續切回 module cache 拿。
 */

/** 動態載入的 Vue 元件型別 */
export type AsyncVueComponent = () => Promise<{ default: Component }>;

/**
 * 配色變體
 * - key：CSS 上會寫成 data-theme-color="<key>"，由 _variants.scss 對應定義 CSS var
 * - label：給 FAB 切換器顯示用，i18n 可後續再接
 * - swatch：顯示在 FAB 配色按鈕內的代表色，方便辨識
 */
export interface ColorVariant {
  key: string;
  label: string;
  swatch: string;
}

/**
 * Logo 候選資產
 *
 * - key：FAB / store 用來辨識 / persist 的識別碼
 * - label：FAB 列表顯示用 hover 提示
 * - src：實際 logo 圖檔 URL（用 new URL + import.meta.url 算出 vite 處理過的 hash 路徑）
 * - transparentBg：是否已是透明背景，預設 false（白底彩字 PNG）
 *   - false：mobile-header 等深色 bar 會套 `mix-blend-mode: screen` 把白底洗掉
 *   - true：跳過 mix-blend-mode，避免把透明底的彩色筆畫變淡
 *   為什麼這旗標必要：ant-sport 內 default-mobile 自帶透明背景，其他 3 張白底；
 *   若 mix-blend-mode 一律套，透明底 logo 會被洗成半透明發白
 *
 * 為什麼 src 用 string（URL）而非 SFC 內 ?url import：
 * - registry 是純 metadata，不該 import 任何 chunk 等級的圖檔
 * - 用 new URL(..., import.meta.url) 在 vite build 時會解析成正確 hash 路徑（含 base path）
 * - 切到不同 theme 時對應的 logos 才會跟著 lazy chunk 帶過去
 */
export interface LogoCandidate {
  key: string;
  label: string;
  src: string;
  /** 是否已是透明背景 PNG / SVG，影響深色 bar 是否要套 mix-blend-mode 洗底（預設 false） */
  transparentBg?: boolean;
}

/**
 * Theme（版面）的 metadata
 *
 * - key：路由 query / localStorage / data-theme 屬性都用這個
 * - desktop / mobile：兩個入口元件，由 home host 依 useDevice 動態切
 * - defaultColor：未指定 colorKey 時的預設值
 * - colors：本版面支援的所有配色
 * - description：showcase 卡片下方顯示的一句話說明
 * - previewDesktop / previewMobile：showcase 卡片縮圖與 lightbox 預覽用的截圖 URL
 *   ─ 為什麼用 string（URL）而非 import 整張圖：
 *     用 `new URL('@/assets/previews/xxx.png', import.meta.url).href` 在 registry 動態算 URL，
 *     vite 會幫我們處理 base path（含 GitHub Pages 子路徑 /umu_demo/）+ hash 指紋，
 *     圖片不會塞進首頁 JS bundle，純靠 <img src> 帶 URL 即可
 */
export interface ThemeMeta {
  key: string;
  label: string;
  description: string;
  desktop: AsyncVueComponent;
  mobile: AsyncVueComponent;
  defaultColor: string;
  colors: ColorVariant[];
  previewDesktop: string;
  previewMobile: string;
  /**
   * 該 theme 可用的 logo 候選清單
   *
   * 型別為 non-empty tuple（強制至少 1 張）：
   * - 編譯期保證 theme.logos[0] 永遠存在，getLogo / store 的 fallback 鏈不會踩空陣列爆 undefined
   * - 違反時 TypeScript 直接報錯，不會等到 runtime 才在 `themeStore.currentLogo.src` 噴 null
   * 至少 2 張為慣例（default + 替代）；ant-sport 提供 4 張供選擇。
   */
  logos: [LogoCandidate, ...LogoCandidate[]];
  /**
   * 預設 logo key
   *
   * 未指定 logoKey 時（首次進站 / 該 theme 無 logoKey 偏好）會 fallback 到這
   * 必為 logos[].key 之一
   */
  defaultLogo: string;
}

/**
 * Section 元件對應表（保留型別，未來若想抽出更細粒度的「插槽組合」可用）
 *
 * 目前 noya / at99 版面內部直接 import 自己的 sections，不走這層 indirection；
 * 此型別保留是因為使用者規格書有列，留作擴充點。
 */
export type SlotComponentMap = Record<string, AsyncVueComponent>;

/** FAB 浮標位置（百分比，相對視窗，方便縮放後位置不失真） */
export interface FabPosition {
  /** 0 ~ 1，相對 viewport 寬 */
  xRatio: number;
  /** 0 ~ 1，相對 viewport 高 */
  yRatio: number;
  /** 吸附邊（拖到邊緣自動吸附後標記） */
  edge: "left" | "right" | "top" | "bottom" | null;
}
