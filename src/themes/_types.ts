import type { Component } from "vue";

/**
 * 既有 import 入口（保留 default 簽名以供其他模組）
 *
 * 本檔案下方陸續追加 PreviewByColorLogo / ThemeMeta.colorPreviews 等型別，
 * 對應 showcase 預覽 dialog 新增 color 切換能力。
 */

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
 * - mainColor：logo 主色 hex（含 `#`），用於 showcase 主頁「依 logo 推薦版型」演算法
 *   - 取「整張 logo 視覺主導色」（例如大亨金字 / UMU 藍 / 隆亨青藍底）
 *   - 推薦演算法以 mainColor vs 各 theme defaultColor 的 RGB 歐式距離做排序，取最近 5 個 theme 加推薦徽章
 *   - 為什麼放在 logo 而非 store：logo 主色屬於資產 metadata，與 src / label 同層級；
 *     store 只負責「當前選了哪個 logo」與「篩選 state」，不該硬編品牌色
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
  /**
   * Logo 主色 hex（必須以 `#` 開頭，3 或 6 位數十六進位）
   *
   * 用於 showcase 主頁「依 logo 推薦版型」演算法。
   * 取「整張 logo 的視覺主導色」而非次要點綴色，例如：
   * - 大亨 ONLINE：金字 `#d4a574`（黑底襯托下金字最搶眼）
   * - UMU：藍標 `#3ec1f5`（藍黃漸層但藍佔比較大）
   * - 隆亨 ONLINE：青藍底 `#2dd4ff`（金字在青藍背景上）
   */
  mainColor: string;
}

/**
 * 版面分類列舉
 *
 * 為什麼用 union string literal 而非 enum：
 * - 與既有 theme key / colorKey 風格一致（皆為 string literal union）
 * - 編譯期防呆：拼錯立刻爆紅，不用等 runtime
 * - JSON 化 / URL query 輸出時不需轉換層
 *
 * 5 個類別涵蓋此 demo 內 13 個 theme 的賭場主要業務面向：
 * - sports：體育（足球 / 籃球 / 棒球等運彩盤口）
 * - live：真人視訊（百家樂 / 龍虎 / 輪盤等發牌員直播）
 * - slots：電子（老虎機 / 捕魚 / 街機等 RNG 遊戲）
 * - general：綜合多品類（首頁集合多種遊戲入口的大廳）
 * - luxury：VIP / 豪華（高端會員 / 高額限紅 / 禮賓服務調性）
 */
export type ThemeCategory = "sports" | "live" | "slots" | "general" | "luxury";

/**
 * 版面明暗主調
 *
 * 為什麼用 union 而非 boolean isDark：
 * - 語意明確，避免「true = light 還是 true = dark」歧義
 * - 未來若要加 auto / system / mixed 等選項，擴充直覺
 *
 * 判定依據：theme `bg-base` 是淡白系 → light；深色系 → dark
 */
export type ThemeBrightness = "light" | "dark";

/**
 * 預覽截圖的「裝置 / logo」交叉表
 *
 * 為什麼從 previewDesktop / previewMobile 改為 previews：
 * - showcase 主頁現在可由使用者在頂部切「以哪個 logo 預覽」，
 *   每個 (theme, logoKey, device) 都對應一張獨立截圖
 * - 三個 theme 共用同樣三組 logo 後，總共 3 theme × 3 logo × 2 device = 18 張
 * - 用 Record 而非 nested if/switch，新增 logoKey 時只要往 registry 加一筆，
 *   showcase 取圖端 getPreview helper 自動命中
 *
 * 結構：previews[logoKey] = { desktop, mobile }
 * - logoKey 必為該 theme.logos[].key 之一（registry 建構時用 type 守住）
 * - 缺 logoKey 對應條目時，由 getPreview 走預設 logo fallback 鏈，不破圖
 */
export type PreviewByLogo = Record<string, { desktop: string; mobile: string }>;

/**
 * 配色變體的預覽截圖矩陣（colorKey × logoKey × device）
 *
 * 為什麼加這個結構：
 * - showcase 預覽 dialog 加上 color 切換後，每個 (theme, color, logo, device) 都對應獨立截圖
 * - 為避免破壞既有 theme（非 dahsing 系列沒有 color 變體截圖），這個欄位為 optional
 * - 命名規約：`<themeKey>-<colorKey>-<logoKey>-<device>.png`（注意：與既有 default 檔名差別在 colorKey 段）
 * - 既有 `previews` 欄位視為「default color」的截圖，getPreview helper 內負責 fallback：
 *   有 color 變體就用 colorPreviews[color][logo][device]，否則退回 previews[logo][device]
 *
 * 為什麼是 optional 而非強迫所有 theme 都列：
 * - 截圖補齊是漸進式工作，使用者只先補 dahsing 三 theme（4 color × 3 logo × 2 device = 24 張 / theme）
 * - 沒列的 theme 行為與本次改動前完全一致（fallback 鏈會自動退回 default 截圖）
 */
export type PreviewByColorLogo = Record<string, PreviewByLogo>;

/**
 * Theme（版面）的 metadata
 *
 * - key：路由 query / localStorage / data-theme 屬性都用這個
 * - desktop / mobile：兩個入口元件，由 home host 依 useDevice 動態切
 * - defaultColor：未指定 colorKey 時的預設值
 * - colors：本版面支援的所有配色
 * - description：showcase 卡片下方顯示的一句話說明
 * - previews：showcase 卡片縮圖與 lightbox 預覽用的截圖矩陣
 *   ─ 為什麼用 string（URL）而非 import 整張圖：
 *     用 `new URL('@/assets/previews/xxx.webp', import.meta.url).href` 在 registry 動態算 URL，
 *     vite 會幫我們處理 base path（含 GitHub Pages 子路徑 /umu_demo/）+ hash 指紋，
 *     圖片不會塞進首頁 JS bundle，純靠 <img src> 帶 URL 即可
 *   ─ 為什麼不再用 previewDesktop / previewMobile 兩個欄位：
 *     showcase 頂部加 logo 切換 row 後，預覽圖必須跟著選定 logo 換，
 *     需要「依 logoKey 索引」的資料結構，這層 indirection 不可避免
 */
export interface ThemeMeta {
  key: string;
  label: string;
  description: string;
  desktop: AsyncVueComponent;
  mobile: AsyncVueComponent;
  defaultColor: string;
  colors: ColorVariant[];
  /**
   * 預覽圖矩陣：以 logoKey 為一級索引，desktop / mobile 為二級索引
   *
   * 所有列出的 logoKey 都必須在 `logos[].key` 中存在；getPreview helper 會在
   * 找不到對應條目時 fallback 到該 theme 的 defaultLogo，再不行 fallback 到第一張 logo
   */
  previews: PreviewByLogo;
  /**
   * （可選）配色變體預覽矩陣：colorKey × logoKey × device → URL
   *
   * 何時提供：
   * - 該 theme 想讓 showcase 預覽 dialog 切 color swatch 時換對應截圖（dahsing 三 theme 是目標）
   * - 其他 theme 不提供 → dialog 仍會渲染 swatch row（如果有多 color），但點下去只是換 CSS（dialog 不會切圖，因為沒色變體截圖）
   *
   * 為什麼 optional 而非強制：
   * - 避免逼所有既有 theme 補齊截圖；只有 dahsing 三 theme 補 4 color × 3 logo × 2 device = 24 張 / theme
   * - getPreview helper 內處理 fallback：colorKey = defaultColor 或 colorPreviews 缺對應條目 → 回 previews（default 截圖）
   *
   * 命名規約：`<themeKey>-<colorKey>-<logoKey>-<device>.png`
   * 例：`dahsing-tabs-copper-dahsing-desktop.png`
   */
  colorPreviews?: PreviewByColorLogo;
  /**
   * 該 theme 可用的 logo 候選清單
   *
   * 型別為 non-empty tuple（強制至少 1 張）：
   * - 編譯期保證 theme.logos[0] 永遠存在，getLogo / store 的 fallback 鏈不會踩空陣列爆 undefined
   * - 違反時 TypeScript 直接報錯，不會等到 runtime 才在 `themeStore.currentLogo.src` 噴 null
   * 至少 2 張為慣例（default + 替代）；目前三個 theme 統一帶三張共用 logo（大亨 / UMU / 隆亨）。
   */
  logos: [LogoCandidate, ...LogoCandidate[]];
  /**
   * 預設 logo key
   *
   * 未指定 logoKey 時（首次進站 / 該 theme 無 logoKey 偏好）會 fallback 到這
   * 必為 logos[].key 之一
   */
  defaultLogo: string;
  /**
   * 該 theme 的明暗主調
   *
   * 影響 showcase 主頁「亮 / 暗 / 全部」篩選 toggle。
   * 判定依據：theme `bg-base` 為淡白系 → "light"；深色系 → "dark"
   */
  brightness: ThemeBrightness;
  /**
   * 該 theme 對應的業務分類（1~多個）
   *
   * 用於 showcase 主頁類別 chip multi-select 篩選；空陣列代表完全不分類（目前不使用）
   * 多分類時取「OR 邏輯」：使用者選中任何一個 chip 即視為命中
   * 至少填 1 個（registry 建構期不檢，依約定填入；review 時把關）
   */
  categories: ThemeCategory[];
  /**
   * （可選）排程上架日期（ISO 格式 `YYYY-MM-DD`，本機時區）
   *
   * 行為：
   * - 缺欄位 → 視為「永遠顯示」（既有 13 個 theme 維持無欄位，showcase 行為完全不變）
   * - 有欄位且 `releaseDate <= 本機 today` → showcase 主頁顯示
   * - 有欄位且 `releaseDate > 本機 today` → showcase 主頁隱藏
   * - 直連 `/demo/<theme-key>` 永遠不擋（單一 theme 預覽頁不經過 showcase store filter）
   *
   * 比較方式：把 releaseDate 與本機 today 都正規化為 `YYYY-MM-DD` 字串再比較
   * （避免時分秒誤差；本機時區直接用 `new Date()` 各 component 拼接，不做 UTC 轉換）
   *
   * Query bypass：showcase 主頁 URL 加 `?preview=1` 時跳過排程 filter，
   * 所有 theme 都顯示（含未到日期的）。query key 用 `preview` 而非 `showAll`，
   * 語意更貼近「預覽未發布版型」用途
   *
   * 為什麼用 string 而非 Date：
   * - Date 物件序列化 / hydration 複雜，registry 是純 metadata 用 string 最直觀
   * - 日期比較不需要時分秒，字串字典序就等於日期序（YYYY-MM-DD 設計即如此）
   * - 不會踩 Date.parse 跨瀏覽器格式不一致地雷
   *
   * 為什麼用本機時區而非 UTC：
   * - 使用者規約 [[feedback-schedule-release-by-date]] 規定排程依本機 today 比對
   * - 「本機已經 6/10 了就該看到 6/10 上架的版型」最符合直覺，UTC 會造成跨時區誤差
   */
  releaseDate?: string;
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
