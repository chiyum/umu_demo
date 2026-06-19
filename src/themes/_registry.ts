import type {
  ColorVariant,
  LogoCandidate,
  PreviewByColorLogo,
  PreviewByLogo,
  ThemeCategory,
  ThemeMeta
} from "./_types";

/**
 * Theme 編號規約（v4.3 起，每個 theme label 都帶「類別字母 + 兩位流水號」前綴）
 *
 * label 格式：`<letter><nn> · <名稱>`
 *   - letter：取自 CATEGORY_LETTER_MAP，依該 theme `categories` 陣列「第一個元素」決定
 *   - nn：兩位流水號（從 01 起算），每個類別獨立計數
 *   - 名稱：原 theme 顯示名稱（拿掉舊版「版面 X · 」前綴）
 *   - 範例：c01 · 暖金（live 類第一個）、a01 · 霓虹（general 類第一個）、d01 · 體育博彩（sports 類第一個）
 *
 * 字母 → 類別對應（固定，禁止改動順序與字母）：
 *   a → general（通用大廳）
 *   b → slots（電子 / 老虎機）
 *   c → live（真人視訊）
 *   d → sports（體育博彩）
 *   e → luxury（VIP / 奢華）
 *
 * 新增 theme SOP：
 *   1. 決定該 theme 的 `categories`，第一個元素即為「主類別」
 *   2. 查本檔下方所有 ThemeMeta，找出該主類別已使用的最大流水號
 *   3. label 寫成 `<letter><maxN+1> · <名稱>`（流水號永遠兩位數，<10 補 0）
 *   4. 若該主類別尚未有 theme，從 01 起算
 *
 * 為什麼 label 仍寫死字串而非由常數動態生成：
 *   - 編號決定後通常不變，沒必要為了避免 5 個字元重複而引入 indirection 拖慢可讀性
 *   - 字串寫死讓 grep 規約對照表更直觀，CATEGORY_LETTER_MAP 作為「字母來源說明」+「未來新類別擴充入口」存在
 *
 * 為什麼 Record<ThemeCategory, string> 而非自由 Record<string, string>：
 *   - 編譯期保證 CATEGORY_LETTER_MAP 覆蓋所有 ThemeCategory 值，未來新增類別忘了補字母會被 TS 直接擋下
 *
 * 既有 51 個 theme 編號對照（與本檔下方 ThemeMeta label 完全一致）：
 *   a01 霓虹（at99）/ a02 藍冰大亨（tycoon）/ a03 88WIN（honest-max）/ a04 瀑布流（dahsing-waterfall）/ a05 分頁（dahsing-tabs）
 *   a06 大亨排行榜（daheng-rank）/ a07 大亨滿版宮格（daheng-grid）/ a08 大亨橫向滑軌（daheng-rail）
 *   a09 大亨三欄密集（daheng-compact）/ a10 大亨清單榜單（daheng-list）/ a11 大亨雜誌精選（daheng-magazine）
 *   a12 富遊大亨（fuyou）/ a13 大亨霓虹電競（daheng-neon）/ a14 大亨翡翠金典（daheng-emerald）/ a15 大亨清新活力（daheng-fresh）
 *   a16 大亨夜空樂園（daheng-night）/ a17 大亨曜黑燙金（daheng-onyx）/ a18 大亨奶油珊瑚（daheng-coral）
 *   a19 大亨赤焰紅金（daheng-crimson）/ a20 大亨鈦灰琥珀（daheng-titan）/ a21 大亨冰川晨藍（daheng-glacier）
 *   b01 AT99（honest-at）/ b02 AT Deluxe（at-deluxe）
 *   c01 暖金（noya）/ c02 FG（honest-no6）/ c03 橫向列表（dahsing-horizontal）/ c04 諾亞米色（noya-beige）/ c05 諾亞藍（noya-blue）
 *   c06 諾亞翡翠（noya-jade）/ c07 諾亞晨曦（noya-dawn）/ c08 諾亞琉金（noya-lux）/ c09 諾亞櫻（noya-sakura）/ c10 諾亞極光（noya-aurora）
 *   c11 諾亞墨竹（noya-ink）/ c12 諾亞鈦銀（noya-steel）/ c13 諾亞珊瑚（noya-reef）/ c14 諾亞星夜（noya-starlit）/ c15 諾亞薄荷（noya-mint）
 *   c16 諾亞膠囊（noya-pill）/ c17 諾亞圓標（noya-orbit）/ c18 諾亞葉瓣（noya-petal）/ c19 諾亞稜形（noya-rhombus）/ c20 諾亞蜂巢（noya-hive）
 *   c21 諾亞側燈（noya-beacon）/ c22 諾亞浮丸（noya-bubble）/ c23 諾亞書籤（noya-bookmark）/ c24 諾亞方磚（noya-squircle）/ c25 諾亞分線（noya-tabline）
 *   d01 體育博彩（ant-sport）
 *   e01 越南 VIP（vietvip）/ e02 5D（fived）
 */
export const CATEGORY_LETTER_MAP: Record<ThemeCategory, string> = {
  general: "a",
  slots: "b",
  live: "c",
  sports: "d",
  luxury: "e"
};

/**
 * 集中註冊所有版面
 *
 * 新增版面流程：
 * 1. 在 src/themes/<your-key>/ 建立 desktop.vue、mobile.vue、_tokens.scss、_variants.scss
 * 2. 在 src/assets/previews/ 放每個 logoKey × 裝置的截圖（命名見下方 previews 區塊）
 * 3. 在這份檔案加入 themes 物件（含 logos + previews 矩陣）
 * 4. main.default.scss 不必動，vite.config.ts 的 buildThemeScssImports 會自動掃資料夾
 *
 * 為什麼用 lazy import：每個版面是獨立 chunk，切換才下載；
 * 主 bundle 只帶這份 registry（純 metadata），不會把所有版面 SFC 塞進去。
 *
 * 為什麼預覽圖用 `new URL(..., import.meta.url).href`：
 * - vite 會把它轉成帶 base path（含 GitHub Pages 子路徑 /umu_demo/）的正確 URL，
 *   並掛 hash 指紋；showcase 主頁用 <img src> 拿圖即可
 * - 圖片走 asset pipeline 而不是被 import 進 JS bundle
 *
 * 三 theme 統一三張 logo（v4）：
 * - 三個 theme 的 logos 清單統一為 [dahsing, umu, long-heng]（順序固定）
 * - 來源：at99 的大亨 ONLINE / noya 的 UMU / kingdom_front 的隆亨 ONLINE
 * - 預設 logo 按品牌調性指派：at99 預設大亨、noya 預設 UMU、ant-sport 預設隆亨
 * - 為什麼共用：使用者要求「showcase 主頁能用同一組 logo 統一比對三個 theme 視覺」
 */

/**
 * 三個 theme 共用的 logo src（用常數算一次，避免三 theme 重複寫 new URL）
 *
 * 為什麼從 theme 自家 assets/logos 取（at99 的 default、noya 的 default）而非搬到 shared-logos：
 * - 不必動既有檔案位置 / 不影響 git 歷史
 * - 隆亨是「新加」沒有歸屬 theme，所以放 src/assets/shared-logos/
 * - vite 的 new URL + import.meta.url 在 build 後皆會輸出到 dist/assets/ 含 hash，與來源資料夾無關
 */
const DAHSING_LOGO_SRC = new URL(
  "./at99/assets/logos/default.png",
  import.meta.url
).href;
const UMU_LOGO_SRC = new URL("./noya/assets/logos/default.png", import.meta.url)
  .href;
const LONG_HENG_LOGO_SRC = new URL(
  "@/assets/shared-logos/long-heng.png",
  import.meta.url
).href;

/**
 * 三個共用 logo 的 metadata（每個 theme 直接帶這份）
 *
 * 為什麼是常數而非 helper：三 theme 的 logo 清單完全一致（src / label / transparentBg 都同），
 * 抽 helper 反而多一層意圖跳轉，常數陣列更直觀
 *
 * 為什麼全部 transparentBg=true：
 * - 大亨 / UMU 兩張在改造前就已驗過四角 alpha=0（見前次 commit）
 * - 隆亨 ONLINE 來源是 kingdom_front pwa-512x512.png，PWA 規範要求圖示透明背景；
 *   經 file 指令確認為 8-bit/color RGBA non-interlaced，符合透明背景慣例
 * - 三張都跳過 mix-blend-mode 處理，視覺一致
 */
/**
 * mainColor 拍板：用於 showcase「依 logo 主色推薦版型」演算法
 *
 * - dahsing（大亨 ONLINE）：黑底金字，金色 `#d4a574` 是最搶眼的視覺主體
 *   → 與 noya rose-gold / dahsing-waterfall 米橘 / fived 暗金 等暖金 theme 距離近
 * - umu（UMU）：藍黃漸層字標，藍佔比較大且為品牌識別色 `#3ec1f5`
 *   → 與 honest-max azure / at99 霓虹藍 等藍系 theme 距離近
 * - long-heng（隆亨 ONLINE）：青藍底大色塊 + 金字，整體視覺主導是青藍底 `#2dd4ff`
 *   → 與 at99 / at-deluxe / honest-at 霓虹青藍 theme 距離近
 *
 * 為什麼選擇「整圖主導色」而非「品牌字色」：
 * - 推薦演算法是給人「視覺融洽度」的暗示，黑底金字 logo 放在「金色系版面」上比放在「黑色版面」上更搶眼，
 *   但放在「米橘 / 暖金 / 香檳金」等同色系版面上會有「品牌與版面延續」的高級感
 * - 隆亨整圖青藍 + 金，但青藍佔幅遠大於金字，故取青藍當主色
 */
const SHARED_LOGOS: [LogoCandidate, LogoCandidate, LogoCandidate] = [
  {
    key: "dahsing",
    label: "大亨 ONLINE",
    src: DAHSING_LOGO_SRC,
    transparentBg: true,
    mainColor: "#d4a574"
  },
  {
    key: "umu",
    label: "UMU",
    src: UMU_LOGO_SRC,
    transparentBg: true,
    mainColor: "#3ec1f5"
  },
  {
    key: "long-heng",
    label: "隆亨 ONLINE",
    src: LONG_HENG_LOGO_SRC,
    transparentBg: true,
    mainColor: "#2dd4ff"
  }
];

/**
 * 預先載入所有 previews 的 URL 表（18 張）
 *
 * 為什麼用 `import.meta.glob({ eager: true, import: 'default' })` 而非 `new URL()`：
 * - vite 的 `new URL('./...', import.meta.url)` 只支援「完全靜態」字串；
 *   `new URL(`@/assets/previews/${themeKey}-${lk}-...`, ...)` 是 template literal，
 *   vite 會把模板字串轉成 `Object.assign({})[模板]` 然後丟 `new URL(undefined, ...)`，prod 必破圖
 * - `import.meta.glob` 在 build 時靜態解析所有命中檔案 + emit 為 hashed asset + 給每個 path 一個 URL
 *   完全符合「動態 key 查 URL」的需求
 * - eager:true 讓所有 glob 結果直接 inline 進當前 chunk（registry 本來就是 metadata 不會切 chunk）
 *
 * 命名規約：<themeKey>-<logoKey>-<device>.webp
 * 例：at99-dahsing-desktop.webp、noya-umu-mobile.webp、ant-sport-long-heng-desktop.webp
 * （預覽圖統一 WebP：桌面 1080w、手機原寸、q82，由 scripts/compress-previews.mjs 產出）
 *
 * glob 結果型別：Record<相對路徑, URL string>
 * 例：{ "@/assets/previews/at99-dahsing-desktop.webp": "/assets/at99-dahsing-desktop-HASH.webp" }
 * - import:'default' 讓 value 直接是 URL string（而非 ESM module 物件）
 * - query:'?url' 強制走 vite 的 asset URL 解析（webp 已是成品，不需再被 imagetools 轉檔）
 */
const PREVIEW_URL_MAP = import.meta.glob<string>("@/assets/previews/*.webp", {
  eager: true,
  import: "default",
  query: "?url"
});

/**
 * 從 PREVIEW_URL_MAP 查指定 (theme, logo, device) 對應的 URL
 *
 * 為什麼 glob 的 key 用 `/src/assets/previews/...` 而非 `@/assets/...`：
 * - vite 的 import.meta.glob 路徑解析後 key 永遠是「relative to project root 的絕對路徑」
 *   實測在本專案會是 `/src/assets/previews/<file>.webp`
 * - alias `@` 在 glob key 不會被保留，所以查表時要用 `/src/assets/...` 拼接
 *
 * 為什麼回 string（而非 undefined）：
 * - getPreview helper 的 fallback 鏈會處理 undefined 情境，這層回 "" 較直接
 * - "" 進 <img src> 會破圖但不會 runtime crash，配合 fallback 鏈最差也只顯示預設 logo 截圖
 *
 * 注意：本函式只回「預先 build 時解析好的 URL 字串」，**不會 runtime 預抓圖片**。
 * import.meta.glob 在 build 階段把命中檔案各自 emit 成獨立 asset 並產生對應 URL，
 * 沒有 `<link rel="prefetch">` / `new Image()` 之類 preloader 行為。
 * 實際下載發生時機：消費端把 URL 塞進 `<img src>` 之後由瀏覽器決定（搭配 loading="lazy" 更晚）。
 */
function pickPreviewUrl(
  themeKey: string,
  logoKey: string,
  device: "desktop" | "mobile"
): string {
  // 既有規約：`<theme>-<logo>-<device>.webp`（不含 color 段，13 個既有 theme 全採此命名）
  const legacyKey = `/src/assets/previews/${themeKey}-${logoKey}-${device}.webp`;
  const legacy = PREVIEW_URL_MAP[legacyKey];
  if (legacy) return legacy;

  // 統一規約 fallback（v4.5 起，daheng 6 theme 全採此命名）：
  // `<theme>-default-<logo>-<device>.webp` — 把 default 色檔也納入色變體命名
  // 為什麼加此 fallback：daheng 截圖 script 統一輸出含 color 段檔名（108 張完整對稱），
  // 既有的 buildPreviews 走 legacy 路徑找不到 default 檔；加此 fallback 讓兩規約共存
  const unifiedKey = `/src/assets/previews/${themeKey}-default-${logoKey}-${device}.webp`;
  return PREVIEW_URL_MAP[unifiedKey] ?? "";
}

/**
 * 從 PREVIEW_URL_MAP 查指定 (theme, color, logo, device) 對應的 URL
 *
 * 新色變體命名規約：`<themeKey>-<colorKey>-<logoKey>-<device>.webp`
 * 例：`dahsing-tabs-copper-dahsing-desktop.webp`、`dahsing-waterfall-purple-umu-mobile.webp`
 *
 * 為什麼與 pickPreviewUrl 拆兩支：
 * - 雙規約並存（含 color 段 / 不含 color 段）若塞同一支函式內 if/else 反而難讀
 * - 兩支對應「兩條 fallback 鏈支線」，呼叫端 getPreview 控流時也更直觀
 *
 * 同樣不會 runtime 預抓；URL 由 build-time glob 解析，缺檔回 ""。
 */
function pickColorPreviewUrl(
  themeKey: string,
  colorKey: string,
  logoKey: string,
  device: "desktop" | "mobile"
): string {
  const key = `/src/assets/previews/${themeKey}-${colorKey}-${logoKey}-${device}.webp`;
  return PREVIEW_URL_MAP[key] ?? "";
}

/**
 * 建立某個 theme 的 previews 矩陣
 *
 * 為什麼用 helper 而非三 theme 各自重複展開：
 * - 18 條 URL 路徑全寫死 = 18 行 noise，且漏一條 TS 不會擋（PreviewByLogo 是 Record<string, ...>）
 * - helper 把 themeKey 折進去，呼叫端只寫一行，少出 typo 機會
 */
function buildPreviews(themeKey: string): PreviewByLogo {
  // 列出三個共用 logoKey 對應的 18 張新截圖；缺檔時 showcase 端 <img> src="" 會破圖，
  // 故需確保 src/assets/previews/ 內 18 張齊全（由本任務 commit 3 補上）
  const logoKeys = ["dahsing", "umu", "long-heng"];
  const map: PreviewByLogo = {};
  for (const lk of logoKeys) {
    map[lk] = {
      desktop: pickPreviewUrl(themeKey, lk, "desktop"),
      mobile: pickPreviewUrl(themeKey, lk, "mobile")
    };
  }
  return map;
}

/**
 * 建立某個 theme 的「色變體」預覽矩陣 colorPreviews
 *
 * 為什麼新加這支而非重用 buildPreviews：
 * - color 變體只有 dahsing 三 theme 需要，其他 theme 沒對應色截圖
 * - 雙規約並存：含 color 段檔名 vs 不含 color 段檔名兩種樣態，呼叫端分流更清楚
 * - 回傳 PreviewByColorLogo（colorKey → logoKey → device URL 三層），
 *   getPreview helper 內依 colorKey 切換取哪個一級索引
 *
 * 為什麼跳過 theme 的 default color：
 * - 該色直接用既有 previews（不含 color 段檔名），避免重複截一張同款圖
 * - 例：dahsing-tabs 的 default color 是「金奧華」，截圖是 dahsing-tabs-<logo>-<device>.png；
 *   buildColorPreviews 只展開 beige / copper / purple 三色，跳過 default
 *
 * 缺檔時 pickColorPreviewUrl 回 ""，getPreview helper 再 fallback 回 default 截圖。
 */
function buildColorPreviews(
  themeKey: string,
  colors: ColorVariant[],
  defaultColorKey: string
): PreviewByColorLogo {
  const logoKeys = ["dahsing", "umu", "long-heng"];
  const map: PreviewByColorLogo = {};
  for (const c of colors) {
    // 跳過 default color：直接用既有 previews 不含 color 段檔名
    if (c.key === defaultColorKey) continue;
    const inner: PreviewByLogo = {};
    for (const lk of logoKeys) {
      inner[lk] = {
        desktop: pickColorPreviewUrl(themeKey, c.key, lk, "desktop"),
        mobile: pickColorPreviewUrl(themeKey, c.key, lk, "mobile")
      };
    }
    map[c.key] = inner;
  }
  return map;
}

/** noya 配色（抽常數讓 colors 與 buildColorPreviews 共用同一份來源） */
const NOYA_COLORS: ColorVariant[] = [
  { key: "rose-gold", label: "玫瑰金", swatch: "#d4a574" },
  { key: "sunset", label: "日落橘", swatch: "#ff7e47" },
  { key: "lime", label: "青檸綠", swatch: "#9fd356" }
];

/** noya 版面（玫瑰金 / 暖色系） */
const noya: ThemeMeta = {
  key: "noya",
  label: "c01 · 暖金",
  description: "暖金奶油調的真人視訊風格，玫瑰金 / 日落橘 / 青檸綠三種配色",
  // 重點：箭頭函式內部才呼叫 dynamic import，這樣才會切 chunk
  desktop: () => import("./noya/desktop.vue"),
  mobile: () => import("./noya/mobile.vue"),
  defaultColor: "rose-gold",
  colors: NOYA_COLORS,
  previews: buildPreviews("noya"),
  // 色變體截圖：跳過 default（rose-gold），只列 sunset / lime
  colorPreviews: buildColorPreviews("noya", NOYA_COLORS, "rose-gold"),
  // noya 主視覺對應 UMU 品牌，預設帶 UMU
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 米白底 + 暖玫瑰金 accent，整體偏淺
  brightness: "light",
  // 真人視訊風 + 品味暖金 → live / luxury 兩個面向
  categories: ["live", "luxury"]
};

/** at99 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const AT99_COLORS: ColorVariant[] = [
  { key: "neon-blue", label: "霓虹藍", swatch: "#2dd4ff" },
  { key: "neon-purple", label: "霓虹紫", swatch: "#a855f7" },
  { key: "neon-green", label: "霓虹綠", swatch: "#22d3a4" }
];

/** at99 版面（深藍霓虹 / 賭場風） */
const at99: ThemeMeta = {
  key: "at99",
  label: "a01 · 霓虹",
  description: "深藍霓虹的賭場風格，霓虹藍 / 紫 / 綠三種配色",
  desktop: () => import("./at99/desktop.vue"),
  mobile: () => import("./at99/mobile.vue"),
  defaultColor: "neon-blue",
  colors: AT99_COLORS,
  previews: buildPreviews("at99"),
  // 色變體截圖：跳過 default（neon-blue），只列 neon-purple / neon-green
  colorPreviews: buildColorPreviews("at99", AT99_COLORS, "neon-blue"),
  // at99 主視覺對應大亨 ONLINE，預設帶 dahsing
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 深藍霓虹底色
  brightness: "dark",
  // 賭場大廳通用入口 + 電子遊戲分類占比較大
  categories: ["general", "slots"]
};

/**
 * ant-sport 版面（螞蟻體育 / 體育博彩風）
 *
 * DOM 1:1 對齊 lilian_ant_web home.vue + lilian_ant_pc main.vue 五段結構；
 * 配色 HSL 三軸（primary-h / primary-s / primary-l）推導，
 * 三變體：blue 預設 / midnight 深藍夜間 / red 紅
 *
 * 為什麼 ant-sport 預設 logo 改成 long-heng：
 * - 原本 ant-sport 沒有對應的真實品牌，過去用螞蟻體育原圖佔位
 * - 三 theme 統一三 logo 後，隆亨 ONLINE 剛好無歸屬 theme，視覺也搭得起來
 * - 與 at99（大亨）/ noya（UMU）的「品牌-版面」一對一映射對齊
 */
/** ant-sport 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const ANT_SPORT_COLORS: ColorVariant[] = [
  { key: "blue", label: "螞蟻藍", swatch: "#3c70fd" },
  { key: "midnight", label: "夜間藍", swatch: "#0d152b" },
  { key: "red", label: "節慶紅", swatch: "#e63946" }
];

const antSport: ThemeMeta = {
  key: "ant-sport",
  label: "d01 · 體育博彩",
  // 為什麼 description 內「蚂蚁体育」改繁體「螞蟻體育」：
  // 與本次 label 簡繁統一同步處理，避免同一段文案混用簡繁
  description:
    "對齊螞蟻體育原視覺的體育博彩風格，預設藍 / 深藍夜間 / 節慶紅三種配色",
  desktop: () => import("./ant-sport/desktop.vue"),
  mobile: () => import("./ant-sport/mobile.vue"),
  defaultColor: "blue",
  colors: ANT_SPORT_COLORS,
  previews: buildPreviews("ant-sport"),
  // 色變體截圖：跳過 default（blue），只列 midnight / red
  colorPreviews: buildColorPreviews("ant-sport", ANT_SPORT_COLORS, "blue"),
  defaultLogo: "long-heng",
  logos: SHARED_LOGOS,
  // 白底為主，僅 hero banner 帶藍底
  brightness: "light",
  // 體育博彩專屬版面
  categories: ["sports"]
};

/**
 * tycoon 版面（藍冰大亨 / 冷光金屬風）
 *
 * 取自使用者設計示意稿「大亨娛樂城.html」：
 * - mobile：header / hero（藍冰漸層+白光swoosh）/ marquee /
 *   body（左 sidebar 6 分類 + 右 6 遊戲卡）/ bottom 5 tab
 * - desktop fork ant-sport 五段，但 GameGrid 改成「sidebar + 遊戲卡列表」與 ant-sport 區隔
 * - 三變體：ice 預設冰藍 / deep 深海藍 / gold 金邊冰
 *
 * 為什麼 defaultLogo 也是 dahsing：
 * - tycoon 本來就是「大亨」風格版型（label / hero 文案都呼應），與 at99 重疊
 * - 三 theme 統一三 logo 後可自由配對，這裡與品牌精神 1:1 對齊
 * - 與 at99（大亨霓虹版）形成「同品牌但不同視覺解讀」對照，showcase 主頁切 logo 時更有趣
 */
/** tycoon 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const TYCOON_COLORS: ColorVariant[] = [
  { key: "ice", label: "冰藍", swatch: "#1f7ff0" },
  { key: "deep", label: "深海藍", swatch: "#0a52c4" },
  { key: "gold", label: "金邊冰", swatch: "#d4a574" }
];

const tycoon: ThemeMeta = {
  key: "tycoon",
  label: "a02 · 藍冰大亨",
  description:
    "藍冰大亨冷光金屬風，sidebar + 遊戲卡列表雙欄結構，預設冰藍 / 深海藍 / 金邊冰三種配色",
  desktop: () => import("./tycoon/desktop.vue"),
  mobile: () => import("./tycoon/mobile.vue"),
  defaultColor: "ice",
  colors: TYCOON_COLORS,
  previews: buildPreviews("tycoon"),
  // 色變體截圖：跳過 default（ice），只列 deep / gold
  colorPreviews: buildColorPreviews("tycoon", TYCOON_COLORS, "ice"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 藍冰冷光金屬，整體深色
  brightness: "dark",
  // sidebar 6 分類 + 遊戲卡列表，定位偏通用大廳
  categories: ["general", "slots"]
};

/**
 * vietvip 版面（越南 VIP / 深紅金邊風）
 *
 * 對齊 lilian_vietvip_web 首頁五段結構做 mobile 1:1 復刻，並設計 PC 版橫向五段：
 * - mobile：header / banner / marquee / user-card（VIP 4 徽章 + 4 快捷功能） /
 *   game-menu（左 7 分類 sidebar + 右橫向遊戲卡）/ buoy 浮窗 + tab-bar，
 *   整頁鋪 home_background2 紅金葉脈大底圖
 * - desktop：sticky topbar / 全寬 banner / marquee / game-grid（左 sidebar + 右 4 col grid） /
 *   vip-perks（VIP 等級徽章 + 福利說明） / footer
 * - 三變體：ruby 預設酒紅 / midnight 午夜深紅 / gold 純金禮盒（金主紅副反轉）
 *
 * 為什麼 defaultLogo 用 long-heng（隆亨）：
 * - 原專案 logo 是 pro168，不在 SHARED_LOGOS 三張內
 * - 三張共用 logo 中，隆亨的金色筆畫與 vietvip 紅金主題視覺最搭
 * - 大亨（at99/tycoon）/ UMU（noya）已分別有歸屬，隆亨原本在 ant-sport 借走，
 *   vietvip 沿用同一張仍能保留「隆亨 = 金色品牌符號」的一致性
 */
/** vietvip 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const VIETVIP_COLORS: ColorVariant[] = [
  { key: "ruby", label: "寶石紅", swatch: "#82122a" },
  { key: "midnight", label: "午夜紅", swatch: "#3a0613" },
  { key: "gold", label: "純金禮盒", swatch: "#c79a45" }
];

const vietvip: ThemeMeta = {
  key: "vietvip",
  label: "e01 · 越南 VIP",
  description:
    "東南亞深紅金邊 VIP 廳堂風格，葉脈紅金大底 + VIP 徽章四等級，預設酒紅 / 午夜深紅 / 純金禮盒三種配色",
  desktop: () => import("./vietvip/desktop.vue"),
  mobile: () => import("./vietvip/mobile.vue"),
  defaultColor: "ruby",
  colors: VIETVIP_COLORS,
  previews: buildPreviews("vietvip"),
  // 色變體截圖：跳過 default（ruby），只列 midnight / gold
  colorPreviews: buildColorPreviews("vietvip", VIETVIP_COLORS, "ruby"),
  defaultLogo: "long-heng",
  logos: SHARED_LOGOS,
  // 深紅金邊葉脈大底圖
  brightness: "dark",
  // VIP 4 徽章 + 高階廳堂風 → luxury 為主，同時含真人 + 多遊戲入口
  categories: ["luxury", "live"]
};

/**
 * honest-at 版面（AT99 霓虹科技風）
 *
 * 來源：honest_real src/pages/at/home.vue 完全照抄
 * - mobile：sticky brand bar + 語系切換 / banner 輪播 + 中央漸層金大字 hero / JACKPOT 七段數字 /
 *   左側 7 分類 sidebar + 熱門 5 圈 + 真人卡片 / 底部 5 tab（中間「存提」放大 CTA 球）
 * - desktop：mobile 結構橫向延伸（sticky brand bar 加寬 + 1024 居中容器 + 精簡 footer）
 * - 配色：HSL 三軸（neon-blue 預設 / neon-purple / neon-cyan），主視覺青藍霓虹科幻感
 * - defaultLogo：dahsing 大亨 ONLINE（與 AT99 賭場霓虹品牌調性對齊）
 */
/** honest-at 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const HONEST_AT_COLORS: ColorVariant[] = [
  { key: "neon-blue", label: "霓虹藍", swatch: "#2dd4ff" },
  { key: "neon-purple", label: "紫色霓虹", swatch: "#c879ff" },
  { key: "neon-cyan", label: "螢光青", swatch: "#3dd7d3" }
];

const honestAt: ThemeMeta = {
  key: "honest-at",
  label: "b01 · AT99",
  description:
    "AT99 霓虹科技風，深藍底 + 青藍霓虹高光，hero 帶 JACKPOT 七段數字，預設霓虹藍 / 紫 / 青三種配色",
  desktop: () => import("./honest-at/desktop.vue"),
  mobile: () => import("./honest-at/mobile.vue"),
  defaultColor: "neon-blue",
  colors: HONEST_AT_COLORS,
  previews: buildPreviews("honest-at"),
  // 色變體截圖：跳過 default（neon-blue），只列 neon-purple / neon-cyan
  colorPreviews: buildColorPreviews("honest-at", HONEST_AT_COLORS, "neon-blue"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 深藍底 + 青藍霓虹高光
  brightness: "dark",
  // hero JACKPOT 七段 + 老虎機集合
  categories: ["slots", "general"]
};

/**
 * honest-max 版面（88WIN 桃粉藍綠混色風）
 *
 * 來源：honest_real src/pages/max/home.vue 完全照抄
 * - mobile：白底 brand bar + 雙顆對比按鈕（黃漸層註冊 / 藍漸層登入） /「人在塔在」banner /
 *   左 7 分類 sidebar（彩色卡）+ 右 hot 2x2 大卡（KU 真人 / 3D 電子 / KU 體育 / KU 彩球）+
 *   迪迦額外卡 + 紫色雙卡（免費電影 / 西甲）+ 切換版本列 / 底部 5 文字 tab（白底淡邊）
 * - desktop：mobile 結構橫向延伸（white brand bar + 960 容器）
 * - 配色：HSL 三軸（pink 預設桃粉 / azure 藍主 / sunset 橘黃），活潑、亮色簡潔感
 * - defaultLogo：umu（亮色 brand 配色與 UMU 風格最搭，與 noya 區隔）
 */
/** honest-max 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const HONEST_MAX_COLORS: ColorVariant[] = [
  { key: "pink", label: "桃粉", swatch: "#e75bff" },
  { key: "azure", label: "藍主", swatch: "#3ec1f5" },
  { key: "sunset", label: "夕陽橘", swatch: "#ff8a4c" }
];

const honestMax: ThemeMeta = {
  key: "honest-max",
  label: "a03 · 88WIN",
  description:
    "88WIN 桃粉藍綠混色風，淡灰白底 + 彩色 hot 卡 + 紫色 CTA，預設桃粉 / 藍主 / 橘黃三種配色",
  desktop: () => import("./honest-max/desktop.vue"),
  mobile: () => import("./honest-max/mobile.vue"),
  defaultColor: "pink",
  colors: HONEST_MAX_COLORS,
  previews: buildPreviews("honest-max"),
  // 色變體截圖：跳過 default（pink），只列 azure / sunset
  colorPreviews: buildColorPreviews("honest-max", HONEST_MAX_COLORS, "pink"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 淡灰白底 + 彩色 hot 卡
  brightness: "light",
  // 大廳集合多品類（KU 真人 / 3D 電子 / 體育 / 彩球）
  categories: ["general", "live"]
};

/**
 * honest-no6 版面（FG 紫黑神秘風）
 *
 * 來源：honest_real src/pages/no6/home.vue 完全照抄
 * - mobile：絕對定位透明 header（疊在 hero 上）+ 城堡 banner 圖 +「山日日」白色大字 +
 *   金漸層「儲值 1000 試送 1000」副標 / 跑馬燈條 + 3 張資訊小圖 /
 *   左 7 分類 sidebar（active 紫紅高亮） + 右 2 列 girl-model 卡片 grid /
 *   底部 5 tab，中間「首頁」放粉色圓凸 CTA 球
 * - desktop：mobile 結構橫向延伸（紫黑 sticky brand bar + 金邊 nav + 980 容器）
 * - 配色：HSL 三軸（purple 預設紫主 / midnight 夜紫 / crimson 紫紅倒轉）
 * - defaultLogo：long-heng（金筆畫與 no6 的金色 hero 文字 + 紫黑底搭配最融洽）
 */
/** honest-no6 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const HONEST_NO6_COLORS: ColorVariant[] = [
  { key: "purple", label: "紫主", swatch: "#d44ee0" },
  { key: "midnight", label: "夜紫", swatch: "#5b3da1" },
  { key: "crimson", label: "紫紅", swatch: "#d63d5e" }
];

const honestNo6: ThemeMeta = {
  key: "honest-no6",
  label: "c02 · FG",
  description:
    "FG 紫黑神秘風，紫黑底 + 城堡 hero + 金色 hero 副標 + girl-model 卡片，預設紫主 / 夜紫 / 紫紅三種配色",
  desktop: () => import("./honest-no6/desktop.vue"),
  mobile: () => import("./honest-no6/mobile.vue"),
  defaultColor: "purple",
  colors: HONEST_NO6_COLORS,
  previews: buildPreviews("honest-no6"),
  // 色變體截圖：跳過 default（purple），只列 midnight / crimson
  colorPreviews: buildColorPreviews("honest-no6", HONEST_NO6_COLORS, "purple"),
  defaultLogo: "long-heng",
  logos: SHARED_LOGOS,
  // 紫黑神秘底色
  brightness: "dark",
  // girl-model 真人卡片為主 + 老虎機分類入口
  categories: ["live", "slots"]
};

/**
 * at-deluxe 版面（AT99 Deluxe 賭場霓虹奢華風）
 *
 * 來源：slime-at99 src/pages/at99/{desktop,mobile}.vue
 * - mobile：banner + JACKPOT 七段顯示 + marquee 上下青藍細線 +
 *   左 sidebar 8 分類（漸層膠囊）+ 右 2-col grid 卡片（hot 紅角徽）+
 *   demo 補 sticky header / bottom tab bar（5 tab 中間凸出 CTA 球）
 * - desktop：sticky brand bar + banner 大框 + JACKPOT 浮層 + 跑馬燈條 +
 *   熱門遊戲 3-col grid + 真人/捕魚 雙列遊戲列 + 精簡 footer
 * - 配色：HSL 三軸（cyan-neon 預設霓虹青 / rose-neon 玫紅 / gold-deluxe 賭場金）
 * - defaultLogo：dahsing（大亨 ONLINE 與「霓虹賭場」品牌調性對齊）
 *
 * 與既有 at99 區隔：
 * - at99 是「霓虹藍紫綠單軸高飽和」、桌面 hero 三段組合單純扁平
 * - at-deluxe 是「深藍 radial + JACKPOT 七段數字 + 漸層膠囊 sidebar + 雙列遊戲」
 *   多層次賭場大廳結構，視覺密度高且帶 hot 紅角徽 / 金球凸出 CTA
 */
/** at-deluxe 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const AT_DELUXE_COLORS: ColorVariant[] = [
  { key: "cyan-neon", label: "霓虹青", swatch: "#69ffff" },
  { key: "rose-neon", label: "霓虹玫紅", swatch: "#f24a82" },
  { key: "gold-deluxe", label: "賭場金", swatch: "#ffd86b" }
];

const atDeluxe: ThemeMeta = {
  key: "at-deluxe",
  label: "b02 · AT Deluxe",
  description:
    "AT99 Deluxe 賭場霓虹奢華風，深藍 radial + JACKPOT 七段顯示 + 漸層膠囊 sidebar，預設霓虹青 / 玫紅 / 賭場金三種配色",
  desktop: () => import("./at-deluxe/desktop.vue"),
  mobile: () => import("./at-deluxe/mobile.vue"),
  defaultColor: "cyan-neon",
  colors: AT_DELUXE_COLORS,
  previews: buildPreviews("at-deluxe"),
  // 色變體截圖：跳過 default（cyan-neon），只列 rose-neon / gold-deluxe
  colorPreviews: buildColorPreviews("at-deluxe", AT_DELUXE_COLORS, "cyan-neon"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 深藍 radial + JACKPOT 數字賭場大廳奢華風
  brightness: "dark",
  // 電子捕魚雙列 + 賭場奢華調性
  categories: ["slots", "luxury"]
};

/**
 * dahsing-waterfall 版面（大亨米橘瀑布流大廳）
 *
 * 來源：使用者提供的 /Users/georgehuang/Downloads/images 2/大亨首頁-版型A 瀑布流 (1).html
 * - mobile：statusbar / header / hero / marquee / stage(side.compact + .wall masonry 2 col) / hotbar / tabbar
 * - desktop：Pinterest-style 4 col masonry + sticky PC topbar + 全寬 hero
 * - 配色：使用者指定米橘預設（#fdfdfc 主背景 / #fcf7f4 nav 未 active 底 / #bb7353 文字色 / nav active 漸層 0deg #fcf7f4→#bb7353）
 * - copper 變體保留原稿經典 :root --copper / --copper-deep 三色
 * - defaultLogo：dahsing（與 at99 一致使用「大亨 ONLINE」logo PNG）
 *
 * 借用既有 theme 桌面元件對照：
 * - sticky PC topbar 結構：借鑑 tycoon / at99 桌面 topbar pattern（重寫成 dahsing-shared/desktop/dahsing-pc-topbar.vue）
 * - 桌面 4 col masonry：與既有 theme 無類似元件，自寫 column-count: 4
 *
 * 與 at99（霓虹大亨）、tycoon（藍冰大亨）區隔：
 * - at99/tycoon 是「大亨」字面但走霓虹 / 冰冷主題
 * - dahsing-* 系列是「大亨」原稿暖米橘調，與 noya 暖玫瑰金接近但更乾爽（米橘 < 玫瑰金 < 暖金）
 */
const DAHSING_WATERFALL_COLORS: ColorVariant[] = [
  { key: "default", label: "米橘暖系", swatch: "#bb7353" },
  { key: "copper", label: "經典銅金", swatch: "#b5652f" },
  { key: "gold", label: "金奧華", swatch: "#c9a227" },
  { key: "purple", label: "紫貴族", swatch: "#6a1b9a" }
];

const dahsingWaterfall: ThemeMeta = {
  key: "dahsing-waterfall",
  label: "a04 · 瀑布流",
  description:
    "瀑布流大廳，2 欄 masonry（mobile）/ 4 欄 masonry（桌面）+ HOT ribbon hotbar，預設米橘暖系，可切換經典銅金 / 金奧華 / 紫貴族",
  desktop: () => import("./dahsing-waterfall/desktop.vue"),
  mobile: () => import("./dahsing-waterfall/mobile.vue"),
  // default = 米橘（既有），key 用 "default" 維持向下相容（LS / URL ?color=default 殘留仍命中）
  defaultColor: "default",
  colors: DAHSING_WATERFALL_COLORS,
  previews: buildPreviews("dahsing-waterfall"),
  // color 變體截圖：跳過 default，只列 copper / gold / purple 三色
  colorPreviews: buildColorPreviews(
    "dahsing-waterfall",
    DAHSING_WATERFALL_COLORS,
    "default"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 米橘暖系米白底
  brightness: "light",
  // 瀑布流大廳 + 多遊戲縮圖 → 通用 + 電子
  categories: ["general", "slots"]
};

/**
 * dahsing-tabs 版面（大亨金奧華分頁切換廳堂）
 *
 * 來源：/Users/georgehuang/Downloads/images 2/大亨首頁-版型B 分頁 (1).html
 * - mobile：statusbar / header / hero / marquee / stage(side + subtabs + promo + tgrid 2 col) / hotbar / tabbar
 * - desktop：Steam-style 全寬 subtabs + 3 col tgrid + sticky PC topbar
 * - 配色：default = 金奧華（與 dahsing-waterfall 米橘 / dahsing-horizontal 紫互相區隔，凸顯三版面差異）
 *   可切換 beige 米橘 / copper 銅金 / purple 紫貴族
 * - defaultLogo：dahsing
 *
 * 為什麼 default 改成金而非沿用米橘：
 * - 使用者要求三 theme 各自 default 不同，讓 showcase 主頁 L / M 預覽圖用後出色系凸顯版面差異
 * - colorKey 仍叫 "default" 維持向下相容（LS / URL ?color=default 殘留仍命中，只是視覺改成金）
 */
const DAHSING_TABS_COLORS: ColorVariant[] = [
  { key: "default", label: "金奧華", swatch: "#c9a227" },
  { key: "beige", label: "米橘暖系", swatch: "#bb7353" },
  { key: "copper", label: "經典銅金", swatch: "#b5652f" },
  { key: "purple", label: "紫貴族", swatch: "#6a1b9a" }
];

const dahsingTabs: ThemeMeta = {
  key: "dahsing-tabs",
  label: "a05 · 分頁",
  description:
    "分頁切換廳堂，subtabs 子分頁 + VIP 條 + 2 欄整齊網格（mobile）/ 3 欄（桌面），預設金奧華，可切換米橘 / 銅金 / 紫貴族",
  desktop: () => import("./dahsing-tabs/desktop.vue"),
  mobile: () => import("./dahsing-tabs/mobile.vue"),
  defaultColor: "default",
  colors: DAHSING_TABS_COLORS,
  previews: buildPreviews("dahsing-tabs"),
  colorPreviews: buildColorPreviews(
    "dahsing-tabs",
    DAHSING_TABS_COLORS,
    "default"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 金奧華米金白底
  brightness: "light",
  // subtabs 分頁集合 → 通用大廳；含體育子分頁
  categories: ["general", "sports"]
};

/**
 * dahsing-horizontal 版面（大亨紫貴族橫向列表）
 *
 * 來源：/Users/georgehuang/Downloads/images 2/大亨首頁-版型C 橫向列表 (1).html
 * - mobile：statusbar / header / hero / marquee / stage(side + .rows 多列 horizontal scroller) / hotbar / tabbar
 * - desktop：Netflix-style 4 列橫滾 + sticky PC topbar
 * - 配色：default = 紫貴族（與 waterfall 米橘 / tabs 金分別對應，凸顯三版面差異）
 *   可切換 beige 米橘 / copper 銅金 / gold 金奧華
 * - defaultLogo：dahsing
 *
 * 為什麼 default 改成紫而非沿用米橘：
 * - 使用者要求三 theme 各自 default 不同，讓 showcase 主頁 L / M 預覽圖用後出色系凸顯版面差異
 * - colorKey 仍叫 "default" 維持向下相容（LS / URL ?color=default 殘留仍命中，只是視覺改成紫）
 */
const DAHSING_HORIZONTAL_COLORS: ColorVariant[] = [
  { key: "default", label: "紫貴族", swatch: "#6a1b9a" },
  { key: "beige", label: "米橘暖系", swatch: "#bb7353" },
  { key: "copper", label: "經典銅金", swatch: "#b5652f" },
  { key: "gold", label: "金奧華", swatch: "#c9a227" }
];

const dahsingHorizontal: ThemeMeta = {
  key: "dahsing-horizontal",
  label: "c03 · 橫向列表",
  description:
    "橫向列表，多列 scroller + 首列精選大卡（mobile 3 列 / 桌面 4 列），預設紫貴族，可切換米橘 / 銅金 / 金奧華",
  desktop: () => import("./dahsing-horizontal/desktop.vue"),
  mobile: () => import("./dahsing-horizontal/mobile.vue"),
  defaultColor: "default",
  colors: DAHSING_HORIZONTAL_COLORS,
  previews: buildPreviews("dahsing-horizontal"),
  colorPreviews: buildColorPreviews(
    "dahsing-horizontal",
    DAHSING_HORIZONTAL_COLORS,
    "default"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 紫貴族但 bg-base 是米白略紫（#faf5fd），整體仍偏淺
  brightness: "light",
  // Netflix-style 橫滾多列 → 通用大廳 + 含真人列
  categories: ["live", "general"]
};

/**
 * 大亨 6 版型（a06 ~ a11，棕金大亨米橘暖系）
 *
 * 來源：使用者提供的 /tmp/dh6_workspace/phones.js + shared.css 設計稿
 * - phones.js 定義 6 個手機版型 v1~v6：
 *   v1 排行榜 / v2 滿版宮格 / v3 橫向滑軌 / v4 三欄密集 / v5 清單榜單 / v6 雜誌精選
 * - 6 個 theme 共用 daheng-shared/ 內的 9 個 mobile atoms + 8 張 asset + GAMES/RANKS/CATS data
 * - 6 個 theme 的 desktop.vue 完全獨立，每款 PC 採完全不同版面策略：
 *   - daheng-rank PC：左 sidebar + 中央 hero + 排行榜橫向卡片帶 + 右 promo 側欄
 *   - daheng-grid PC：mega header + 全幅 hero + 4 欄宮格牆 + promo 橫條
 *   - daheng-rail PC：carousel hero（左大圖+右縮圖列）+ 三段大型分欄 + promo bar
 *   - daheng-compact PC：dashboard 風格（左 menu + 中央 6 欄密集 grid + 右 panel）
 *   - daheng-list PC：leaderboard 主題頁（top 3 大卡 + 表格式榜單含玩家數/賠率/趨勢）
 *   - daheng-magazine PC：雜誌封面風（大封面 banner + 編輯精選 + 4 欄 masonry）
 *
 * 共用品牌色票（default 配色）：棕金大亨米橘暖系
 *   ink #2c2521 / brown #b06a34 / brown-soft #c98a52 / gold #d9a24b / 米橘漸層底
 *
 * 為什麼 logos 改回 SHARED_LOGOS（v4.4 修正）：
 * - reviewer 觀察 5：showcase 主頁的 logo 切換 row 對 daheng 卡片無效，破壞「主頁訪客用同一組
 *   logo 統一比對所有 theme」的 UX 一致性
 * - 6 theme 改接 SHARED_LOGOS（dahsing / umu / long-heng），與 at99 / noya / dahsing-* 等
 *   既有 theme 一致；defaultLogo 設為 dahsing（大亨 ONLINE，棕金品牌調性與 daheng 識別最搭）
 * - v4.5 起 daheng-header.vue 與 6 個 desktop.vue brand 區塊也接 themeStore.currentLogo.src，
 *   使用者切 logo（透過 FAB 或 showcase logo switcher）時 daheng theme 內部 logo 跟著換，
 *   體驗完全對齊 at99 / noya / dahsing-* 慣例
 * - 為什麼移除既有的 DAHENG_MASCOT_LOGO_SRC / DAHENG_SHARED_LOGOS 常數：
 *   不再需要獨立 logoKey，留著反而誤導未來開發者；mascot.png 與 _data.ts 的 mascotLogoSrc
 *   export 仍保留供未來「吉祥物裝飾元素」使用，但目前無消費點
 *
 * 為什麼 3 配色變體（default / noir / jade）：
 * - default 對齊原稿棕金大亨米橘暖系（在 _tokens.scss 內定義）
 * - noir 黑金奢華（黑底 + 香檳金 + 暗金漸層）— 與既有 fived 5D 暗金禮盒近但更冷峻
 * - jade 翡翠玉璽（深綠 + 金邊 + 米色 surface）— 東方識別，與既有 vietvip 紅金路線完全不同方向
 * - 3 色語意明確、不重複既有 theme 配色，showcase swatch 一目了然
 *
 * 為什麼 previews 暫不填截圖：
 * - 6 個新 theme × 3 colors × 3 logos × 2 device = 108 張截圖檔尚未產出
 * - buildPreviews / buildColorPreviews 找不到對應檔會回 ""，showcase 端 fallback 鏈會處理破圖
 * - QA 後續用 Playwright 補圖（至少先補 default × 3 logos × 2 device = 6 張 / theme）
 */
const DAHENG_COLORS: ColorVariant[] = [
  { key: "default", label: "棕金大亨", swatch: "#b06a34" },
  { key: "noir", label: "黑金奢華", swatch: "#d4a574" },
  { key: "jade", label: "翡翠玉璽", swatch: "#1e5b3a" }
];

/**
 * daheng 6 theme 排程上架日期表
 *
 * 依使用者規格分批上架：
 * - 6/10：rank（v1 排行榜）+ grid（v2 滿版宮格）
 * - 6/11：rail（v3 橫向滑軌）+ compact（v4 三欄密集）
 * - 6/12：list（v5 清單榜單）+ magazine（v6 雜誌精選）
 *
 * 為什麼集中宣告成常數而非各 theme 內寫死：
 * - 6 個日期集中一處方便日後微調批次
 * - 與 theme 本體分離後，未來要把欄位從 registry 改抽到 cms 也容易
 */
const DAHENG_RELEASE_DATES = {
  rank: "2026-06-10",
  grid: "2026-06-10",
  rail: "2026-06-11",
  compact: "2026-06-11",
  list: "2026-06-12",
  magazine: "2026-06-12"
} as const;

const dahengRank: ThemeMeta = {
  key: "daheng-rank",
  label: "a06 · 大亨排行榜",
  description:
    "大亨排行榜版型，米橘暖系 + 左排行榜 5 名清單 + 右 2 欄遊戲縮圖；PC 重構為左 sidebar + 中央排行榜橫向卡片帶 + 右 promo 側欄",
  desktop: () => import("./daheng-rank/desktop.vue"),
  mobile: () => import("./daheng-rank/mobile.vue"),
  defaultColor: "default",
  colors: DAHENG_COLORS,
  previews: buildPreviews("daheng-rank"),
  // color 變體截圖：跳過 default（沿用既有 previews 不含 color 段檔名），只列 noir / jade
  colorPreviews: buildColorPreviews("daheng-rank", DAHENG_COLORS, "default"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 米白底 + 棕金暖系
  brightness: "light",
  // 通用大廳排行榜入口
  categories: ["general"],
  releaseDate: DAHENG_RELEASE_DATES.rank
};

const dahengGrid: ThemeMeta = {
  key: "daheng-grid",
  label: "a07 · 大亨滿版宮格",
  description:
    "大亨滿版宮格版型，米橘暖系 + 2 欄 3 列 6 張大卡；PC 重構為 mega header + 全幅 hero + 4 欄宮格牆",
  desktop: () => import("./daheng-grid/desktop.vue"),
  mobile: () => import("./daheng-grid/mobile.vue"),
  defaultColor: "default",
  colors: DAHENG_COLORS,
  previews: buildPreviews("daheng-grid"),
  colorPreviews: buildColorPreviews("daheng-grid", DAHENG_COLORS, "default"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_RELEASE_DATES.grid
};

const dahengRail: ThemeMeta = {
  key: "daheng-rail",
  label: "a08 · 大亨橫向滑軌",
  description:
    "大亨橫向滑軌版型，米橘暖系 + 3 條橫向 rail（熱門/真人/電子）；PC 重構為 carousel hero + 三段大型分欄",
  desktop: () => import("./daheng-rail/desktop.vue"),
  mobile: () => import("./daheng-rail/mobile.vue"),
  defaultColor: "default",
  colors: DAHENG_COLORS,
  previews: buildPreviews("daheng-rail"),
  colorPreviews: buildColorPreviews("daheng-rail", DAHENG_COLORS, "default"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_RELEASE_DATES.rail
};

const dahengCompact: ThemeMeta = {
  key: "daheng-compact",
  label: "a09 · 大亨三欄密集",
  description:
    "大亨三欄密集版型，米橘暖系 + cats-grid 4×2 + 3 欄 3 列 9 張 tcard；PC 重構為 dashboard 風格（左 menu + 中央 6 欄密集 grid + 右 panel）",
  desktop: () => import("./daheng-compact/desktop.vue"),
  mobile: () => import("./daheng-compact/mobile.vue"),
  defaultColor: "default",
  colors: DAHENG_COLORS,
  previews: buildPreviews("daheng-compact"),
  colorPreviews: buildColorPreviews("daheng-compact", DAHENG_COLORS, "default"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_RELEASE_DATES.compact
};

const dahengList: ThemeMeta = {
  key: "daheng-list",
  label: "a10 · 大亨清單榜單",
  description:
    "大亨清單榜單版型，米橘暖系 + 6 列 glist（排名+縮圖+名稱+進入按鈕）；PC 重構為 leaderboard 主題頁（top 3 大卡 + 表格式榜單含玩家數/賠率/趨勢）",
  desktop: () => import("./daheng-list/desktop.vue"),
  mobile: () => import("./daheng-list/mobile.vue"),
  defaultColor: "default",
  colors: DAHENG_COLORS,
  previews: buildPreviews("daheng-list"),
  colorPreviews: buildColorPreviews("daheng-list", DAHENG_COLORS, "default"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_RELEASE_DATES.list
};

const dahengMagazine: ThemeMeta = {
  key: "daheng-magazine",
  label: "a11 · 大亨雜誌精選",
  description:
    "大亨雜誌精選版型，米橘暖系 + chips 分類 + feature 大圖 + 2 欄 masonry；PC 重構為雜誌封面風（封面 banner + 編輯精選 + 4 欄 masonry）",
  desktop: () => import("./daheng-magazine/desktop.vue"),
  mobile: () => import("./daheng-magazine/mobile.vue"),
  defaultColor: "default",
  colors: DAHENG_COLORS,
  previews: buildPreviews("daheng-magazine"),
  colorPreviews: buildColorPreviews(
    "daheng-magazine",
    DAHENG_COLORS,
    "default"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_RELEASE_DATES.magazine
};

/**
 * fived 版面（5D 暗金禮盒風）
 *
 * 來源：5d_v2 src/pages/base/home.vue + src/assets/scss/pages/_index.scss
 * - 為什麼選 base 不選 plus：plus 是 quasar q-card 空殼沒實質視覺；
 *   base 有完整 banner swiper + news 雙欄 grid + hotGame 3D 卡片金邊發光，
 *   是 5d_v2 真正的「視覺主軸」所在
 * - mobile：banner swiper + news 公告卡 + 熱門遊戲 2-col 金邊卡
 * - desktop：grid 雙欄（66.5% banner + 33.5% news 公告列表）+ 熱門遊戲 3-col 金邊大卡
 * - 配色：HSL 三軸（gold-deep 預設暗金 / royal-blue 銀邊深藍 / crimson-rose 酒紅）
 * - defaultLogo：long-heng（金筆畫與暗金主視覺最搭）
 *
 * key 命名為 fived（CSS class 不能以數字開頭，避免 `5d`）
 *
 * 與其他 theme 區隔：
 * - 與 noya（暖玫瑰金）/ vietvip（酒紅金）色域接近，但「裝飾線條更乾淨、
 *   字體 Noto Sans 顯示體 + 雙欄 grid 結構 + tag 多色標籤」是獨有
 */
/** fived 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const FIVED_COLORS: ColorVariant[] = [
  { key: "gold-deep", label: "暗金", swatch: "#e2bd87" },
  { key: "royal-blue", label: "皇家藍", swatch: "#6fa8ff" },
  { key: "crimson-rose", label: "酒紅玫瑰", swatch: "#d63d5e" }
];

const fived: ThemeMeta = {
  key: "fived",
  label: "e02 · 5D",
  description:
    "5D 暗金禮盒風，深棕底 + 金漸層邊框 + 雙欄 banner+news + tag 多色標籤，預設暗金 / 銀邊深藍 / 酒紅玫瑰三種配色",
  desktop: () => import("./fived/desktop.vue"),
  mobile: () => import("./fived/mobile.vue"),
  defaultColor: "gold-deep",
  colors: FIVED_COLORS,
  previews: buildPreviews("fived"),
  // 色變體截圖：跳過 default（gold-deep），只列 royal-blue / crimson-rose
  colorPreviews: buildColorPreviews("fived", FIVED_COLORS, "gold-deep"),
  defaultLogo: "long-heng",
  logos: SHARED_LOGOS,
  // 深棕底 + 金漸層邊框
  brightness: "dark",
  // 暗金禮盒奢華風 + 雙欄 banner+news 多品類
  categories: ["luxury", "general"]
};

/**
 * fuyou 版面（富遊大亨 / 深藍金賭場入口）
 *
 * 來源設計稿：大亨_富遊_clone_自包含.html（桌機優先完整響應式）
 * - desktop：1:1 對齊原稿 6 段（sticky nav / hero stage / ticker / popular 8 卡 /
 *   download QR / services 3 卡 / footer 24 廠商牆）
 * - mobile：來源稿是桌機設計，依規約「電腦版 → 參考兩份諾亞手機版補做 app 式 mobile」，
 *   用富遊深藍金配色 + 富遊內容（熱門遊戲 / RG APP / 頂尖服務）
 * - 配色三變體：navy-gold 預設深藍金 / royal 皇家銀藍 / crimson 暗夜紅金
 * - defaultLogo：dahsing（大亨 ONLINE，與富遊「大亨」品牌調性對齊）
 *
 * 編號：general 類現有最大 a11（daheng-magazine），故 a12
 */
/** fuyou 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const FUYOU_COLORS: ColorVariant[] = [
  { key: "navy-gold", label: "深藍金", swatch: "#2e8bff" },
  { key: "royal", label: "皇家銀藍", swatch: "#3aa0ff" },
  { key: "crimson", label: "暗夜紅金", swatch: "#e23b5a" }
];

const fuyou: ThemeMeta = {
  key: "fuyou",
  label: "a12 · 富遊大亨",
  description:
    "富遊大亨深藍金賭場入口，sticky nav + 藍色 radial hero + 8 張藍邊遊戲卡 + RG APP 下載 + 頂尖服務三卡，預設深藍金 / 皇家銀藍 / 暗夜紅金三種配色",
  desktop: () => import("./fuyou/desktop.vue"),
  mobile: () => import("./fuyou/mobile.vue"),
  defaultColor: "navy-gold",
  colors: FUYOU_COLORS,
  previews: buildPreviews("fuyou"),
  // 色變體截圖：跳過 default（navy-gold），只列 royal / crimson
  colorPreviews: buildColorPreviews("fuyou", FUYOU_COLORS, "navy-gold"),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 深海軍藍底
  brightness: "dark",
  // 賭場大廳通用入口（熱門 / 體育 / 真人 / 電子 / 彩票 / 棋牌 / 捕魚）
  categories: ["general"],
  releaseDate: "2026-06-11"
};

/**
 * noya-beige 版面（諾亞米色 / 暖橘米調真人廳）
 *
 * 來源設計稿：諾亞_版型探索_米色_自包含.html（純手機版，米色暖調、圖片切片排版）
 * - mobile：1:1 忠實復刻原稿 app 結構（header / hero / 公告切片 / 在線人數 + actions /
 *   左 5 分類 tab + 右卡片列含 DG/歐博真人切片 + 佔位卡 / 底部 nav 切片）
 * - desktop：來源稿只有手機版，依規約「手機版 → 參考富遊桌機區塊結構補做 desktop」，
 *   用諾亞米色暖橘配色 + 諾亞內容（hero / 公告 / 在線人數 / 大廳分類 + 卡片）
 * - 配色三變體：beige 預設米色暖調 / rose 玫瑰粉 / olive 橄欖綠
 * - defaultLogo：umu（與 noya 同走 UMU 品牌調性）
 *
 * 編號：live 類現有最大 c03（dahsing-horizontal），故 c04
 */
/** noya-beige 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_BEIGE_COLORS: ColorVariant[] = [
  { key: "beige", label: "米色暖調", swatch: "#c66a3c" },
  { key: "rose", label: "玫瑰粉", swatch: "#d76a86" },
  { key: "olive", label: "橄欖綠", swatch: "#7a8b3c" }
];

const noyaBeige: ThemeMeta = {
  key: "noya-beige",
  label: "c04 · 諾亞米色",
  description:
    "諾亞米色暖橘米調真人廳，近白米底 + 暖橘 active pill + 左分類 5 大類 + 真人卡片切片，預設米色暖調 / 玫瑰粉 / 橄欖綠三種配色",
  desktop: () => import("./noya-beige/desktop.vue"),
  mobile: () => import("./noya-beige/mobile.vue"),
  defaultColor: "beige",
  colors: NOYA_BEIGE_COLORS,
  previews: buildPreviews("noya-beige"),
  // 色變體截圖：跳過 default（beige），只列 rose / olive
  colorPreviews: buildColorPreviews("noya-beige", NOYA_BEIGE_COLORS, "beige"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 近白米底，整體偏淺
  brightness: "light",
  // 真人視訊大廳為主視覺
  categories: ["live"],
  releaseDate: "2026-06-11"
};

/**
 * noya-blue 版面（諾亞藍 / 深海軍藍真人廳）
 *
 * 來源設計稿：諾亞_版型探索_藍_自包含.html（純手機版，藍色調、大量 inline SVG/HTML）
 * - mobile：1:1 忠實復刻原稿 app 結構（header brand + 登入/註冊 pill / hero /
 *   公告跑馬燈 / 在線人數 + 存款取款消息快捷 / 左 5 分類 tab + 右卡片含藍漸層佔位卡
 *   水印 + 籌碼裝飾 / 底部 tabbar 中間首頁凸出球）
 * - desktop：來源稿只有手機版，依規約「手機版 → 參考富遊桌機區塊結構補做 desktop」，
 *   用諾亞藍深海軍藍配色 + 諾亞藍內容
 * - 配色三變體：blue 預設深海藍 / teal 青碧藍 / indigo 靛紫藍
 * - defaultLogo：umu（與 noya / noya-beige 同走 UMU 品牌調性）
 *
 * 為什麼 brightness=dark：app 底色為深海軍藍（#06142a / #0d2a52），bg-base 深色系
 *
 * 編號：live 類現有最大 c04（本批 noya-beige 剛佔），故 c05
 */
/** noya-blue 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_BLUE_COLORS: ColorVariant[] = [
  { key: "blue", label: "深海藍", swatch: "#4aa3ff" },
  { key: "teal", label: "青碧藍", swatch: "#2fd6d0" },
  { key: "indigo", label: "靛紫藍", swatch: "#8c7cff" }
];

const noyaBlue: ThemeMeta = {
  key: "noya-blue",
  label: "c05 · 諾亞藍",
  description:
    "諾亞藍深海軍藍真人廳，玻璃感藍卡 + 籌碼裝飾 + 左分類 5 大類 + 真人卡片切片 + 底部凸出首頁球，預設深海藍 / 青碧藍 / 靛紫藍三種配色",
  desktop: () => import("./noya-blue/desktop.vue"),
  mobile: () => import("./noya-blue/mobile.vue"),
  defaultColor: "blue",
  colors: NOYA_BLUE_COLORS,
  previews: buildPreviews("noya-blue"),
  // 色變體截圖：跳過 default（blue），只列 teal / indigo
  colorPreviews: buildColorPreviews("noya-blue", NOYA_BLUE_COLORS, "blue"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 深海軍藍底，bg-base 深色系
  brightness: "dark",
  // 真人視訊大廳為主視覺
  categories: ["live"],
  releaseDate: "2026-06-11"
};

/**
 * 大亨 AWD 三版型（a13 ~ a15）
 *
 * 來源設計稿：/Users/georgehuang/Downloads/daheng_awd_assets 內三份 AWD 完整響應式 HTML：
 *   - 版型A 霓虹電競 → daheng-neon（深藍 + 青/紫霓虹，dark）
 *   - 版型B 翡翠金典 → daheng-emerald（墨綠 + 金，古典襯線，dark）
 *   - 版型C 清新活力 → daheng-fresh（藍白淺色 + 橘點綴，light）
 *
 * 共同特性：
 * - 每份原稿本身即「桌機 sidebar/置中 + 手機底部 tab」單檔響應式，忠實拆成 desktop / mobile 兩 SFC
 * - 內容資料共用（hero / 公告跑馬燈 / quick / 遊戲大廳 tabs+grid / 優惠 promo / 即時派彩 / footer）
 * - 原稿那顆 A/B/C/D 版型切換浮標（.vswitch）是 mockup 自己的導覽，未移植
 * - 三 theme 各自帶 assets 目錄（hero / 8 張遊戲卡 + emerald 額外 trophy），不共用 daheng-shared
 * - 編號接續 general 現況：fuyou 是 a12，故本批 a13 / a14 / a15
 *
 * logos 統一 SHARED_LOGOS（dahsing / umu / long-heng），defaultLogo = dahsing（大亨品牌調性最搭）
 * previews 採 buildPreviews（不帶 colorPreviews，比照 noya 那批省截圖；缺檔由 getPreview fallback 不破圖）
 * releaseDate 2026-06-11（與本批同日上架）
 */
/** daheng-neon 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_NEON_COLORS: ColorVariant[] = [
  { key: "neon-cyan", label: "青紫霓虹", swatch: "#40d2ff" },
  { key: "neon-magenta", label: "洋紅電競", swatch: "#ff5ac8" },
  { key: "neon-lime", label: "螢光綠駭客", swatch: "#3cffaa" }
];

const dahengNeon: ThemeMeta = {
  key: "daheng-neon",
  label: "a13 · 大亨霓虹電競",
  description:
    "大亨霓虹電競版型，深藍底 + 青/紫霓虹雙色高光；PC 左 sidebar 導覽 + 主內容（hero/快捷/遊戲大廳/優惠+即時派彩 duo）+ APP 條，手機頂欄 + 內容 + 底部 5 格 tab，預設青紫霓虹，可切換洋紅電競 / 螢光綠駭客",
  desktop: () => import("./daheng-neon/desktop.vue"),
  mobile: () => import("./daheng-neon/mobile.vue"),
  defaultColor: "neon-cyan",
  colors: DAHENG_NEON_COLORS,
  previews: buildPreviews("daheng-neon"),
  // 色變體截圖：跳過 default（neon-cyan），只列 neon-magenta / neon-lime
  colorPreviews: buildColorPreviews(
    "daheng-neon",
    DAHENG_NEON_COLORS,
    "neon-cyan"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 深藍霓虹底色
  brightness: "dark",
  // 通用大廳（遊戲大廳多分類入口）
  categories: ["general"],
  releaseDate: "2026-06-11"
};

/** daheng-emerald 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_EMERALD_COLORS: ColorVariant[] = [
  { key: "emerald-gold", label: "墨綠金典", swatch: "#d8b56c" },
  { key: "jade-rose", label: "翡翠玫瑰金", swatch: "#e0a878" },
  { key: "onyx-gold", label: "黑曜金", swatch: "#e7c478" }
];

const dahengEmerald: ThemeMeta = {
  key: "daheng-emerald",
  label: "a14 · 大亨翡翠金典",
  description:
    "大亨翡翠金典版型，墨綠底 + 金色襯線古典風；PC 置中容器（hero framebox/遊戲大廳直式卡/中獎榜+優惠 duo/VIP 條）+ 水平 nav，手機頂欄 + 直式卡 2 欄 + 底部 5 格 tab，預設墨綠金典，可切換翡翠玫瑰金 / 黑曜金",
  desktop: () => import("./daheng-emerald/desktop.vue"),
  mobile: () => import("./daheng-emerald/mobile.vue"),
  defaultColor: "emerald-gold",
  colors: DAHENG_EMERALD_COLORS,
  previews: buildPreviews("daheng-emerald"),
  // 色變體截圖：跳過 default（emerald-gold），只列 jade-rose / onyx-gold
  colorPreviews: buildColorPreviews(
    "daheng-emerald",
    DAHENG_EMERALD_COLORS,
    "emerald-gold"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 墨綠 + 金邊深色
  brightness: "dark",
  // 通用大廳（含 VIP 尊爵會員條，但主結構仍是遊戲大廳入口）
  categories: ["general"],
  releaseDate: "2026-06-11"
};

/** daheng-fresh 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_FRESH_COLORS: ColorVariant[] = [
  { key: "sky-blue", label: "清新藍橘", swatch: "#3f7fe0" },
  { key: "mint-green", label: "薄荷綠", swatch: "#34c08a" },
  { key: "coral-pink", label: "珊瑚粉", swatch: "#ec6a8e" }
];

const dahengFresh: ThemeMeta = {
  key: "daheng-fresh",
  label: "a15 · 大亨清新活力",
  description:
    "大亨清新活力版型，藍白淺底 + 橘色點綴明快風；PC 置中容器（hero + sideStack/分類氣泡/彩金池/遊戲大廳 grid/中獎跑馬/優惠/APP banner）+ 水平 nav，手機頂欄 + 2 欄 grid + 浮動圓角底部 tab，預設清新藍橘，可切換薄荷綠 / 珊瑚粉",
  desktop: () => import("./daheng-fresh/desktop.vue"),
  mobile: () => import("./daheng-fresh/mobile.vue"),
  defaultColor: "sky-blue",
  colors: DAHENG_FRESH_COLORS,
  previews: buildPreviews("daheng-fresh"),
  // 色變體截圖：跳過 default（sky-blue），只列 mint-green / coral-pink
  colorPreviews: buildColorPreviews(
    "daheng-fresh",
    DAHENG_FRESH_COLORS,
    "sky-blue"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  // 藍白淺底
  brightness: "light",
  // 通用大廳
  categories: ["general"],
  releaseDate: "2026-06-11"
};

/**
 * 大亨 AWD 第二批 6 版型（a16 ~ a21）
 *
 * 來源設計稿：/Users/georgehuang/Downloads/daheng_awd_assets 內版型 D~I 六份 AWD HTML
 *   D 紫色手遊（夜空樂園，JS 驅動 social-casino）→ daheng-night
 *   E 曜黑燙金 → daheng-onyx ／ F 奶油珊瑚 → daheng-coral
 *   G 赤焰紅金 → daheng-crimson ／ H 鈦灰琥珀 → daheng-titan ／ I 冰川晨藍 → daheng-glacier
 *
 * 編號接續 general 類 a15（daheng-fresh），故 a16 ~ a21。logos 統一 SHARED_LOGOS、
 * defaultLogo = dahsing。每個 theme 各自帶 assets（daheng-night 全 inline SVG 無 PNG）。
 * 原稿 A/B/C/D 版型切換浮標（.vswitch）未移植。
 *
 * 排程上架（依使用者規約：每天 2 版，起始日今天 6/12）：
 *   6/12：daheng-night（D）+ daheng-onyx（E）
 *   6/13：daheng-coral（F）+ daheng-crimson（G）
 *   6/14：daheng-titan（H）+ daheng-glacier（I）
 */
const DAHENG_AWD2_RELEASE_DATES = {
  night: "2026-06-12",
  onyx: "2026-06-12",
  coral: "2026-06-13",
  crimson: "2026-06-13",
  titan: "2026-06-14",
  glacier: "2026-06-14"
} as const;

/** daheng-night 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_NIGHT_COLORS: ColorVariant[] = [
  { key: "night-purple", label: "夜空紫金", swatch: "#8a5cf0" },
  { key: "aurora", label: "極光綠紫", swatch: "#5ad1a0" },
  { key: "cyber-blue", label: "賽博藍紫", swatch: "#5aa8ff" }
];

const dahengNight: ThemeMeta = {
  key: "daheng-night",
  label: "a16 · 大亨夜空樂園",
  description:
    "大亨夜空樂園版型，深紫夜空底 + 金/紫高光的 social-casino 手遊風；canvas 星空粒子背景、GRAND JACKPOT 燈板、SVG 場景遊戲卡（feat 大卡跨格 + HOT/NEW ribbon）、促銷輪播 + 中獎跑馬，PC HUD 頂欄含桌機 nav，手機底部 5 格 tab（中間 jackpot 凸出金球），預設夜空紫金，可切換極光綠紫 / 賽博藍紫",
  desktop: () => import("./daheng-night/desktop.vue"),
  mobile: () => import("./daheng-night/mobile.vue"),
  defaultColor: "night-purple",
  colors: DAHENG_NIGHT_COLORS,
  previews: buildPreviews("daheng-night"),
  // 色變體截圖：跳過 default（night-purple），只列 aurora / cyber-blue
  colorPreviews: buildColorPreviews(
    "daheng-night",
    DAHENG_NIGHT_COLORS,
    "night-purple"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "dark",
  categories: ["general"],
  releaseDate: DAHENG_AWD2_RELEASE_DATES.night
};

/** daheng-onyx 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_ONYX_COLORS: ColorVariant[] = [
  { key: "onyx-gold", label: "曜黑燙金", swatch: "#d4af5f" },
  { key: "rose-gold", label: "玫瑰燙金", swatch: "#e6b98f" },
  { key: "champagne", label: "香檳冷金", swatch: "#cdbf9a" }
];

const dahengOnyx: ThemeMeta = {
  key: "daheng-onyx",
  label: "a17 · 大亨曜黑燙金",
  description:
    "大亨曜黑燙金版型，近黑底 + 燙金細框古典風；PC 頂欄水平 nav + hero 金雙框 banner + 八角徽章 8 入口 + 拱門卡熱門館別 6 + 尊榮禮遇優惠 3，手機八角徽章排最前 + 拱門卡 2 欄 + 底部 dock，預設曜黑燙金，可切換玫瑰燙金 / 香檳冷金",
  desktop: () => import("./daheng-onyx/desktop.vue"),
  mobile: () => import("./daheng-onyx/mobile.vue"),
  defaultColor: "onyx-gold",
  colors: DAHENG_ONYX_COLORS,
  previews: buildPreviews("daheng-onyx"),
  // 色變體截圖：跳過 default（onyx-gold），只列 rose-gold / champagne
  colorPreviews: buildColorPreviews(
    "daheng-onyx",
    DAHENG_ONYX_COLORS,
    "onyx-gold"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "dark",
  categories: ["general"],
  releaseDate: DAHENG_AWD2_RELEASE_DATES.onyx
};

/** daheng-coral 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_CORAL_COLORS: ColorVariant[] = [
  { key: "cream-coral", label: "奶油珊瑚", swatch: "#e07a52" },
  { key: "mango", label: "芒果橘", swatch: "#eaa64e" },
  { key: "berry", label: "莓果粉", swatch: "#e06a86" }
];

const dahengCoral: ThemeMeta = {
  key: "daheng-coral",
  label: "a18 · 大亨奶油珊瑚",
  description:
    "大亨奶油珊瑚版型，奶油近白底 + 珊瑚暖橙高光；PC 左 220px 側欄導覽 + 主欄（hero 大圖 + 每日簽到卡 / squircle 圓角大卡遊戲 3 欄 / 橫向優惠卡），手機膠囊分類列 + 遊戲卡 2 欄 + 底部 dock 膠囊，預設奶油珊瑚，可切換芒果橘 / 莓果粉",
  desktop: () => import("./daheng-coral/desktop.vue"),
  mobile: () => import("./daheng-coral/mobile.vue"),
  defaultColor: "cream-coral",
  colors: DAHENG_CORAL_COLORS,
  previews: buildPreviews("daheng-coral"),
  // 色變體截圖：跳過 default（cream-coral），只列 mango / berry
  colorPreviews: buildColorPreviews(
    "daheng-coral",
    DAHENG_CORAL_COLORS,
    "cream-coral"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_AWD2_RELEASE_DATES.coral
};

/** daheng-crimson 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_CRIMSON_COLORS: ColorVariant[] = [
  { key: "crimson-gold", label: "赤焰紅金", swatch: "#ffd271" },
  { key: "imperial", label: "帝王紫金", swatch: "#ffcf6a" },
  { key: "vermillion", label: "朱焰亮紅", swatch: "#ff8a3d" }
];

const dahengCrimson: ThemeMeta = {
  key: "daheng-crimson",
  label: "a19 · 大亨赤焰紅金",
  description:
    "大亨赤焰紅金版型，深紅 radial 底 + 三階金喜慶華麗；PC 頂欄 nav + 錢幣圓形 8 入口 + hero 金邊 ribbon banner + 燈籠拱形卡熱門館別 6 + 紅包優惠 3，手機錢幣入口排最前 + 燈籠卡 2 欄 + 底部 dock，預設赤焰紅金，可切換帝王紫金 / 朱焰亮紅",
  desktop: () => import("./daheng-crimson/desktop.vue"),
  mobile: () => import("./daheng-crimson/mobile.vue"),
  defaultColor: "crimson-gold",
  colors: DAHENG_CRIMSON_COLORS,
  previews: buildPreviews("daheng-crimson"),
  // 色變體截圖：跳過 default（crimson-gold），只列 imperial / vermillion
  colorPreviews: buildColorPreviews(
    "daheng-crimson",
    DAHENG_CRIMSON_COLORS,
    "crimson-gold"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "dark",
  categories: ["general"],
  releaseDate: DAHENG_AWD2_RELEASE_DATES.crimson
};

/** daheng-titan 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_TITAN_COLORS: ColorVariant[] = [
  { key: "titan-amber", label: "鈦灰琥珀", swatch: "#d9a24b" },
  { key: "gunmetal-cyan", label: "鈦灰青", swatch: "#4fc6d0" },
  { key: "graphite-rose", label: "石墨玫瑰", swatch: "#e68aa0" }
];

const dahengTitan: ThemeMeta = {
  key: "daheng-titan",
  label: "a20 · 大亨鈦灰琥珀",
  description:
    "大亨鈦灰琥珀版型，鈦灰深底 + 琥珀金屬高光雙描邊；PC 左側類別 rail 橫向展開 170px sticky + 內容（熱門館別圓角斜切卡 3~4 欄 / 壓縮 banner / 3 數據條），手機窄 64px 圖示 rail + 2 欄卡 + 底部 dock，熱門館別排在 hero 之前，預設鈦灰琥珀，可切換鈦灰青 / 石墨玫瑰",
  desktop: () => import("./daheng-titan/desktop.vue"),
  mobile: () => import("./daheng-titan/mobile.vue"),
  defaultColor: "titan-amber",
  colors: DAHENG_TITAN_COLORS,
  previews: buildPreviews("daheng-titan"),
  // 色變體截圖：跳過 default（titan-amber），只列 gunmetal-cyan / graphite-rose
  colorPreviews: buildColorPreviews(
    "daheng-titan",
    DAHENG_TITAN_COLORS,
    "titan-amber"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "dark",
  categories: ["general"],
  releaseDate: DAHENG_AWD2_RELEASE_DATES.titan
};

/** daheng-glacier 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const DAHENG_GLACIER_COLORS: ColorVariant[] = [
  { key: "glacier-blue", label: "冰川晨藍", swatch: "#3f8fe0" },
  { key: "mint-ice", label: "薄荷冰", swatch: "#34b8c0" },
  { key: "lavender-frost", label: "薰衣草霜", swatch: "#8c9cf0" }
];

const dahengGlacier: ThemeMeta = {
  key: "daheng-glacier",
  label: "a21 · 大亨冰川晨藍",
  description:
    "大亨冰川晨藍版型，純白卡片 + 淺藍漸層底清爽風；PC 內容欄 + 右側類別 rail 78px sticky（本週人氣館別圓頂雪窗卡 3~4 欄 / 壓縮 banner / 橫向優惠），手機右側窄 rail + 2 欄卡 + 底部 dock 膠囊，熱門館別排在 hero 之前，預設冰川晨藍，可切換薄荷冰 / 薰衣草霜",
  desktop: () => import("./daheng-glacier/desktop.vue"),
  mobile: () => import("./daheng-glacier/mobile.vue"),
  defaultColor: "glacier-blue",
  colors: DAHENG_GLACIER_COLORS,
  previews: buildPreviews("daheng-glacier"),
  // 色變體截圖：跳過 default（glacier-blue），只列 mint-ice / lavender-frost
  colorPreviews: buildColorPreviews(
    "daheng-glacier",
    DAHENG_GLACIER_COLORS,
    "glacier-blue"
  ),
  defaultLogo: "dahsing",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["general"],
  releaseDate: DAHENG_AWD2_RELEASE_DATES.glacier
};

/**
 * 諾亞真人視訊第二批 10 版型（c06 ~ c15）
 *
 * 設計主軸：參考既有 c03（橫向列表）/ c04（諾亞米色）/ c05（諾亞藍）的
 * 「左分類按鈕欄 + 右卡片頁面」雙欄真人廳結構，做 10 個獨立配色 / 質感變體
 *   - 5 dark：c06 翡翠 / c08 琉金 / c10 極光 / c12 鈦銀 / c14 星夜
 *   - 5 light：c07 晨曦 / c09 櫻 / c11 墨竹 / c13 珊瑚 / c15 薄荷
 *
 * 共同特性：
 * - 每個 theme 完全自包含（desktop.vue / mobile.vue / _tokens.scss / _variants.scss /
 *   _data.ts / index.ts / assets），不共用 shared 目錄
 * - 每款各自帶三色票（default + 兩變體），color machine key 已與各自 _tokens 預設區塊、
 *   _variants 的 `[data-theme-color="xxx"]` 逐一核對一致
 * - logos 統一 SHARED_LOGOS（dahsing / umu / long-heng），defaultLogo = umu（諾亞品牌調性）
 * - previews 採 buildPreviews（不帶實際色變體截圖；缺檔由 getPreview fallback 鏈處理不破圖）
 *
 * 排程上架（依規約：每天 2 版，起始日 6/15）：
 *   6/15：jade（c06 翡翠）+ dawn（c07 晨曦）
 *   6/16：lux（c08 琉金）+ sakura（c09 櫻）
 *   6/17：aurora（c10 極光）+ ink（c11 墨竹）
 *   6/18：steel（c12 鈦銀）+ reef（c13 珊瑚）
 *   6/19：starlit（c14 星夜）+ mint（c15 薄荷）
 *
 * 為什麼集中宣告排程常數表（同 daheng 批做法）：
 * - 10 個日期集中一處方便日後微調批次
 * - 與 theme 本體分離後，未來要把欄位從 registry 改抽到 cms 也容易
 */
const NOYA_LIVE_V2_RELEASE_DATES = {
  jade: "2026-06-15",
  dawn: "2026-06-15",
  lux: "2026-06-16",
  sakura: "2026-06-16",
  aurora: "2026-06-17",
  ink: "2026-06-17",
  steel: "2026-06-18",
  reef: "2026-06-18",
  starlit: "2026-06-19",
  mint: "2026-06-19"
} as const;

/** noya-jade 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_JADE_COLORS: ColorVariant[] = [
  { key: "jade", label: "翡翠綠金", swatch: "#1f9d6b" },
  { key: "forest", label: "森林墨綠", swatch: "#0f7a52" },
  { key: "aqua", label: "碧金青", swatch: "#14b3a6" }
];

const noyaJade: ThemeMeta = {
  key: "noya-jade",
  label: "c06 · 諾亞翡翠",
  description:
    "諾亞翡翠真人廳，深綠玻璃底 + 翡翠綠金描邊左分類按鈕欄 + 右真人卡片頁面，預設翡翠綠金 / 森林墨綠 / 碧金青三種配色",
  desktop: () => import("./noya-jade/desktop.vue"),
  mobile: () => import("./noya-jade/mobile.vue"),
  defaultColor: "jade",
  colors: NOYA_JADE_COLORS,
  previews: buildPreviews("noya-jade"),
  // 色變體截圖：跳過 default（jade），只列 forest / aqua
  colorPreviews: buildColorPreviews("noya-jade", NOYA_JADE_COLORS, "jade"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 深綠玻璃底
  brightness: "dark",
  // 真人視訊大廳為主視覺
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.jade
};

/** noya-dawn 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_DAWN_COLORS: ColorVariant[] = [
  { key: "peach", label: "蜜桃晨曦", swatch: "#ef8a5c" },
  { key: "rose", label: "玫瑰晨光", swatch: "#e87a8e" },
  { key: "sand", label: "沙金", swatch: "#d9a45c" }
];

const noyaDawn: ThemeMeta = {
  key: "noya-dawn",
  label: "c07 · 諾亞晨曦",
  description:
    "諾亞晨曦真人廳，蜜桃暖光淺底 + 圓潤左分類按鈕欄 + 右柔光真人卡片頁面，預設蜜桃晨曦 / 玫瑰晨光 / 沙金三種配色",
  desktop: () => import("./noya-dawn/desktop.vue"),
  mobile: () => import("./noya-dawn/mobile.vue"),
  defaultColor: "peach",
  colors: NOYA_DAWN_COLORS,
  previews: buildPreviews("noya-dawn"),
  // 色變體截圖：跳過 default（peach），只列 rose / sand
  colorPreviews: buildColorPreviews("noya-dawn", NOYA_DAWN_COLORS, "peach"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 蜜桃暖光淺底
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.dawn
};

/** noya-lux 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_LUX_COLORS: ColorVariant[] = [
  { key: "champagne", label: "香檳燙金", swatch: "#d9b86a" },
  { key: "rosegold", label: "玫瑰燙金", swatch: "#e0a880" },
  { key: "platinum", label: "鉑金白", swatch: "#c9ccd2" }
];

const noyaLux: ThemeMeta = {
  key: "noya-lux",
  label: "c08 · 諾亞琉金",
  description:
    "諾亞琉金真人廳，曜黑底 + 香檳燙金細邊左分類按鈕欄 + 右金框奢華真人卡片頁面，預設香檳燙金 / 玫瑰燙金 / 鉑金白三種配色",
  desktop: () => import("./noya-lux/desktop.vue"),
  mobile: () => import("./noya-lux/mobile.vue"),
  defaultColor: "champagne",
  colors: NOYA_LUX_COLORS,
  previews: buildPreviews("noya-lux"),
  // 色變體截圖：跳過 default（champagne），只列 rosegold / platinum
  colorPreviews: buildColorPreviews("noya-lux", NOYA_LUX_COLORS, "champagne"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 曜黑燙金底
  brightness: "dark",
  // 燙金奢華真人廳 → live + luxury 兩個面向
  categories: ["live", "luxury"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.lux
};

/** noya-sakura 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_SAKURA_COLORS: ColorVariant[] = [
  { key: "sakura", label: "櫻粉", swatch: "#e86b9e" },
  { key: "peony", label: "牡丹紅", swatch: "#d8455f" },
  { key: "lilac", label: "薰衣草紫", swatch: "#a07cd6" }
];

const noyaSakura: ThemeMeta = {
  key: "noya-sakura",
  label: "c09 · 諾亞櫻",
  description:
    "諾亞櫻真人廳，櫻粉柔美淺底 + 花瓣感左分類按鈕欄 + 右粉嫩真人卡片頁面，預設櫻粉 / 牡丹紅 / 薰衣草紫三種配色",
  desktop: () => import("./noya-sakura/desktop.vue"),
  mobile: () => import("./noya-sakura/mobile.vue"),
  defaultColor: "sakura",
  colors: NOYA_SAKURA_COLORS,
  previews: buildPreviews("noya-sakura"),
  // 色變體截圖：跳過 default（sakura），只列 peony / lilac
  colorPreviews: buildColorPreviews(
    "noya-sakura",
    NOYA_SAKURA_COLORS,
    "sakura"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 櫻粉柔美淺底
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.sakura
};

/** noya-aurora 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_AURORA_COLORS: ColorVariant[] = [
  { key: "aurora", label: "極光青紫", swatch: "#34e0d0" },
  { key: "magenta", label: "洋紅電光", swatch: "#ff5ac8" },
  { key: "violet", label: "紫電", swatch: "#8c7cff" }
];

const noyaAurora: ThemeMeta = {
  key: "noya-aurora",
  label: "c10 · 諾亞極光",
  description:
    "諾亞極光真人廳，深空底 + 霓虹描邊左分類按鈕欄 + 右青紫高光真人卡片頁面，預設極光青紫 / 洋紅電光 / 紫電三種配色",
  desktop: () => import("./noya-aurora/desktop.vue"),
  mobile: () => import("./noya-aurora/mobile.vue"),
  defaultColor: "aurora",
  colors: NOYA_AURORA_COLORS,
  previews: buildPreviews("noya-aurora"),
  // 色變體截圖：跳過 default（aurora），只列 magenta / violet
  colorPreviews: buildColorPreviews(
    "noya-aurora",
    NOYA_AURORA_COLORS,
    "aurora"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 深空霓虹底
  brightness: "dark",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.aurora
};

/** noya-ink 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_INK_COLORS: ColorVariant[] = [
  { key: "jade", label: "墨竹翠", swatch: "#2f7d5e" },
  { key: "vermillion", label: "硃砂紅", swatch: "#c8432e" },
  { key: "indigo", label: "靛墨藍", swatch: "#2f4a7d" }
];

const noyaInk: ThemeMeta = {
  key: "noya-ink",
  label: "c11 · 諾亞墨竹",
  description:
    "諾亞墨竹真人廳，宣紙米白底 + 墨竹翠水墨左分類按鈕欄 + 右東方留白真人卡片頁面，預設墨竹翠 / 硃砂紅 / 靛墨藍三種配色",
  desktop: () => import("./noya-ink/desktop.vue"),
  mobile: () => import("./noya-ink/mobile.vue"),
  defaultColor: "jade",
  colors: NOYA_INK_COLORS,
  previews: buildPreviews("noya-ink"),
  // 色變體截圖：跳過 default（jade），只列 vermillion / indigo
  colorPreviews: buildColorPreviews("noya-ink", NOYA_INK_COLORS, "jade"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 宣紙米白底
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.ink
};

/** noya-steel 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_STEEL_COLORS: ColorVariant[] = [
  { key: "amber", label: "鈦銀琥珀", swatch: "#d9a24b" },
  { key: "cyan", label: "鈦青", swatch: "#4fc6d0" },
  { key: "crimson", label: "鈦緋", swatch: "#e0566e" }
];

const noyaSteel: ThemeMeta = {
  key: "noya-steel",
  label: "c12 · 諾亞鈦銀",
  description:
    "諾亞鈦銀真人廳，鈦灰金屬深底 + 琥珀雙描邊左分類按鈕欄 + 右金屬質感真人卡片頁面，預設鈦銀琥珀 / 鈦青 / 鈦緋三種配色",
  desktop: () => import("./noya-steel/desktop.vue"),
  mobile: () => import("./noya-steel/mobile.vue"),
  defaultColor: "amber",
  colors: NOYA_STEEL_COLORS,
  previews: buildPreviews("noya-steel"),
  // 色變體截圖：跳過 default（amber），只列 cyan / crimson
  colorPreviews: buildColorPreviews("noya-steel", NOYA_STEEL_COLORS, "amber"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 鈦灰金屬深底
  brightness: "dark",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.steel
};

/** noya-reef 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_REEF_COLORS: ColorVariant[] = [
  { key: "coral", label: "珊瑚橙", swatch: "#f0744e" },
  { key: "mango", label: "芒果黃", swatch: "#eaa64e" },
  { key: "berry", label: "莓果粉", swatch: "#e0668a" }
];

const noyaReef: ThemeMeta = {
  key: "noya-reef",
  label: "c13 · 諾亞珊瑚",
  description:
    "諾亞珊瑚真人廳，奶油淺底 + 珊瑚橙圓潤左分類按鈕欄 + 右明快活潑真人卡片頁面，預設珊瑚橙 / 芒果黃 / 莓果粉三種配色",
  desktop: () => import("./noya-reef/desktop.vue"),
  mobile: () => import("./noya-reef/mobile.vue"),
  defaultColor: "coral",
  colors: NOYA_REEF_COLORS,
  previews: buildPreviews("noya-reef"),
  // 色變體截圖：跳過 default（coral），只列 mango / berry
  colorPreviews: buildColorPreviews("noya-reef", NOYA_REEF_COLORS, "coral"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 奶油淺底
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.reef
};

// noya-lagoon（諾亞礁湖）沿用珊瑚配色，故直接共用 NOYA_REEF_COLORS
const noyaLagoon: ThemeMeta = {
  key: "noya-lagoon",
  label: "c26 · 諾亞礁湖",
  description:
    "諾亞礁湖：以 c13 諾亞珊瑚為基底的手機改版——存款 / 取款 / 消息快捷功能移到 strip 左側，每日簽到改緊湊版（標題 + 今日領取小按鈕同行 space-between、7 天圓點可水平滑動）移到右側並與左側等高；電腦版沿用珊瑚版面，預設珊瑚橙 / 芒果黃 / 莓果粉三種配色",
  desktop: () => import("./noya-lagoon/desktop.vue"),
  mobile: () => import("./noya-lagoon/mobile.vue"),
  defaultColor: "coral",
  colors: NOYA_REEF_COLORS,
  previews: buildPreviews("noya-lagoon"),
  // 色變體截圖：跳過 default（coral），只列 mango / berry
  colorPreviews: buildColorPreviews("noya-lagoon", NOYA_REEF_COLORS, "coral"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 奶油淺底
  brightness: "light",
  categories: ["live"],
  releaseDate: "2026-06-19"
};

/** noya-starlit 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_STARLIT_COLORS: ColorVariant[] = [
  { key: "purple", label: "星夜紫", swatch: "#8a5cf0" },
  { key: "nebula", label: "星雲粉", swatch: "#e06ab0" },
  { key: "cosmos", label: "宇宙藍", swatch: "#5aa8ff" }
];

const noyaStarlit: ThemeMeta = {
  key: "noya-starlit",
  label: "c14 · 諾亞星夜",
  description:
    "諾亞星夜真人廳，深紫星空底 + 星點描邊左分類按鈕欄 + 右夢幻紫光真人卡片頁面，預設星夜紫 / 星雲粉 / 宇宙藍三種配色",
  desktop: () => import("./noya-starlit/desktop.vue"),
  mobile: () => import("./noya-starlit/mobile.vue"),
  defaultColor: "purple",
  colors: NOYA_STARLIT_COLORS,
  previews: buildPreviews("noya-starlit"),
  // 色變體截圖：跳過 default（purple），只列 nebula / cosmos
  colorPreviews: buildColorPreviews(
    "noya-starlit",
    NOYA_STARLIT_COLORS,
    "purple"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 深紫星空底
  brightness: "dark",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.starlit
};

/** noya-mint 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_MINT_COLORS: ColorVariant[] = [
  { key: "mint", label: "薄荷綠", swatch: "#2fb98a" },
  { key: "sky", label: "晴空藍", swatch: "#3f9fe0" },
  { key: "lemon", label: "檸檬黃", swatch: "#e0b84e" }
];

const noyaMint: ThemeMeta = {
  key: "noya-mint",
  label: "c15 · 諾亞薄荷",
  description:
    "諾亞薄荷真人廳，清爽白底 + 薄荷綠圓角左分類按鈕欄 + 右清新通透真人卡片頁面，預設薄荷綠 / 晴空藍 / 檸檬黃三種配色",
  desktop: () => import("./noya-mint/desktop.vue"),
  mobile: () => import("./noya-mint/mobile.vue"),
  defaultColor: "mint",
  colors: NOYA_MINT_COLORS,
  previews: buildPreviews("noya-mint"),
  // 色變體截圖：跳過 default（mint），只列 sky / lemon
  colorPreviews: buildColorPreviews("noya-mint", NOYA_MINT_COLORS, "mint"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 清爽白底
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V2_RELEASE_DATES.mint
};

/**
 * 諾亞真人視訊第三批 10 版型（c16 ~ c25）
 *
 * 設計主軸：移植自設計稿「諾亞_遊戲區塊_10款版型.html」ly1 ~ ly10，
 * 每款各以不同的「左分類按鈕造形 + 右遊戲卡片頁面」詮釋同一套真人廳結構：
 *   ly1 經典直欄膠囊 / ly2 圓形圖標導航 / ly3 玫瑰花瓣斜切 / ly4 斜切菱形 /
 *   ly5 六角蜂巢 / ly6 窄條側燈 / ly7 浮動藥丸交錯 / ly8 書籤摺角標籤 /
 *   ly9 Squircle 漸層磚 / ly10 極簡側線分頁
 *
 * 共同特性：
 * - 每個 theme 完全自包含（desktop.vue / mobile.vue / _tokens.scss / _variants.scss /
 *   _data.ts / index.ts / assets），不共用 shared 目錄
 * - 每款各自帶三色票（default + 兩變體），color machine key 已與各自 _tokens 預設區塊、
 *   _variants 的 `[data-theme-color="xxx"]` 逐一核對一致（本批 10 款全對齊無修正）
 * - 全 10 款皆 brightness=light（米色 / 玫瑰 / 翡翠 / 霧藍等近白頁底）
 * - logos 統一 SHARED_LOGOS（dahsing / umu / long-heng），defaultLogo = umu（諾亞品牌調性）
 * - previews 採 buildPreviews（不帶實際色變體截圖；缺檔由 getPreview fallback 鏈處理不破圖）
 *
 * 排程上架（依規約：每天 2 版，起始日 6/20）：
 *   6/20：pill（c16 膠囊）+ orbit（c17 圓標）
 *   6/21：petal（c18 葉瓣）+ rhombus（c19 稜形）
 *   6/22：hive（c20 蜂巢）+ beacon（c21 側燈）
 *   6/23：bubble（c22 浮丸）+ bookmark（c23 書籤）
 *   6/24：squircle（c24 方磚）+ tabline（c25 分線）
 *
 * 為什麼集中宣告排程常數表（同 daheng / noya v2 批做法）：
 * - 10 個日期集中一處方便日後微調批次
 * - 與 theme 本體分離後，未來要把欄位從 registry 改抽到 cms 也容易
 */
const NOYA_LIVE_V3_RELEASE_DATES = {
  pill: "2026-06-20",
  orbit: "2026-06-20",
  petal: "2026-06-21",
  rhombus: "2026-06-21",
  hive: "2026-06-22",
  beacon: "2026-06-22",
  bubble: "2026-06-23",
  bookmark: "2026-06-23",
  squircle: "2026-06-24",
  tabline: "2026-06-24"
} as const;

/** noya-pill 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_PILL_COLORS: ColorVariant[] = [
  { key: "beige", label: "米橘暖調", swatch: "#c66a3c" },
  { key: "rose", label: "玫瑰珊瑚", swatch: "#c75f5a" },
  { key: "emerald", label: "翡翠綠", swatch: "#3f8a6e" }
];

const noyaPill: ThemeMeta = {
  key: "noya-pill",
  label: "c16 · 諾亞膠囊",
  description:
    "諾亞膠囊真人廳，米色暖底 + 直欄膠囊左分類按鈕欄 + 右雙欄真人卡片頁面，源自設計稿 ly1，預設米橘暖調 / 玫瑰珊瑚 / 翡翠綠三種配色",
  desktop: () => import("./noya-pill/desktop.vue"),
  mobile: () => import("./noya-pill/mobile.vue"),
  defaultColor: "beige",
  colors: NOYA_PILL_COLORS,
  previews: buildPreviews("noya-pill"),
  // 色變體截圖：跳過 default（beige），只列 rose / emerald
  colorPreviews: buildColorPreviews("noya-pill", NOYA_PILL_COLORS, "beige"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 米色暖底，整體偏淺
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.pill
};

/** noya-orbit 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_ORBIT_COLORS: ColorVariant[] = [
  { key: "beige", label: "米橘暖調", swatch: "#c66a3c" },
  { key: "slate", label: "霧石板藍", swatch: "#5a6f9d" },
  { key: "gold", label: "暗金", swatch: "#9a7d3a" }
];

const noyaOrbit: ThemeMeta = {
  key: "noya-orbit",
  label: "c17 · 諾亞圓標",
  description:
    "諾亞圓標真人廳，米色暖底 + 正圓圖標左分類導航 + 右緊湊雙欄圖在上真人卡片頁面，源自設計稿 ly2，預設米橘暖調 / 霧石板藍 / 暗金三種配色",
  desktop: () => import("./noya-orbit/desktop.vue"),
  mobile: () => import("./noya-orbit/mobile.vue"),
  defaultColor: "beige",
  colors: NOYA_ORBIT_COLORS,
  previews: buildPreviews("noya-orbit"),
  // 色變體截圖：跳過 default（beige），只列 slate / gold
  colorPreviews: buildColorPreviews("noya-orbit", NOYA_ORBIT_COLORS, "beige"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.orbit
};

/** noya-petal 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_PETAL_COLORS: ColorVariant[] = [
  { key: "rose", label: "玫瑰珊瑚", swatch: "#c75f5a" },
  { key: "plum", label: "梅紫", swatch: "#9d4f86" },
  { key: "beige", label: "米橘暖調", swatch: "#c66a3c" }
];

const noyaPetal: ThemeMeta = {
  key: "noya-petal",
  label: "c18 · 諾亞葉瓣",
  description:
    "諾亞葉瓣真人廳，乳白底 + 葉片/水滴不對稱圓角左分類按鈕欄 + 右柔和斜切漸層真人卡片頁面，源自設計稿 ly3，預設玫瑰珊瑚 / 梅紫 / 米橘暖調三種配色",
  desktop: () => import("./noya-petal/desktop.vue"),
  mobile: () => import("./noya-petal/mobile.vue"),
  defaultColor: "rose",
  colors: NOYA_PETAL_COLORS,
  previews: buildPreviews("noya-petal"),
  // 色變體截圖：跳過 default（rose），只列 plum / beige
  colorPreviews: buildColorPreviews("noya-petal", NOYA_PETAL_COLORS, "rose"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.petal
};

/** noya-rhombus 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_RHOMBUS_COLORS: ColorVariant[] = [
  { key: "plum", label: "梅紫", swatch: "#9d4f86" },
  { key: "slate", label: "霧石板藍", swatch: "#5a6f9d" },
  { key: "rose", label: "玫瑰珊瑚", swatch: "#c75f5a" }
];

const noyaRhombus: ThemeMeta = {
  key: "noya-rhombus",
  label: "c19 · 諾亞稜形",
  description:
    "諾亞稜形真人廳，亮白紫底 + 平行四邊形斜切左分類按鈕欄（文字回正）+ 右緣斜切 clip-path 真人卡片頁面，動感電競紫調，源自設計稿 ly4，預設梅紫 / 霧石板藍 / 玫瑰珊瑚三種配色",
  desktop: () => import("./noya-rhombus/desktop.vue"),
  mobile: () => import("./noya-rhombus/mobile.vue"),
  defaultColor: "plum",
  colors: NOYA_RHOMBUS_COLORS,
  previews: buildPreviews("noya-rhombus"),
  // 色變體截圖：跳過 default（plum），只列 slate / rose
  colorPreviews: buildColorPreviews(
    "noya-rhombus",
    NOYA_RHOMBUS_COLORS,
    "plum"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.rhombus
};

/** noya-hive 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_HIVE_COLORS: ColorVariant[] = [
  { key: "emerald", label: "翡翠綠", swatch: "#3f8a6e" },
  { key: "slate", label: "霧石板藍", swatch: "#5a6f9d" },
  { key: "gold", label: "暗金", swatch: "#9a7d3a" }
];

const noyaHive: ThemeMeta = {
  key: "noya-hive",
  label: "c20 · 諾亞蜂巢",
  description:
    "諾亞蜂巢真人廳，近白翡翠底 + 六角蜂巢造形左分類按鈕欄 + 右翡翠綠描邊真人卡片頁面，源自設計稿 ly5，預設翡翠綠 / 霧石板藍 / 暗金三種配色",
  desktop: () => import("./noya-hive/desktop.vue"),
  mobile: () => import("./noya-hive/mobile.vue"),
  defaultColor: "emerald",
  colors: NOYA_HIVE_COLORS,
  previews: buildPreviews("noya-hive"),
  // 色變體截圖：跳過 default（emerald），只列 slate / gold
  colorPreviews: buildColorPreviews("noya-hive", NOYA_HIVE_COLORS, "emerald"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.hive
};

/** noya-beacon 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_BEACON_COLORS: ColorVariant[] = [
  { key: "slate", label: "霧石板藍", swatch: "#5a6f9d" },
  { key: "emerald", label: "翡翠綠", swatch: "#3f8a6e" },
  { key: "plum", label: "梅紫", swatch: "#9d4f86" }
];

const noyaBeacon: ThemeMeta = {
  key: "noya-beacon",
  label: "c21 · 諾亞側燈",
  description:
    "諾亞側燈真人廳，近白霧藍底 + 窄條側燈指示左分類按鈕欄 + 右霧藍質感真人卡片頁面，源自設計稿 ly6，預設霧石板藍 / 翡翠綠 / 梅紫三種配色",
  desktop: () => import("./noya-beacon/desktop.vue"),
  mobile: () => import("./noya-beacon/mobile.vue"),
  defaultColor: "slate",
  colors: NOYA_BEACON_COLORS,
  previews: buildPreviews("noya-beacon"),
  // 色變體截圖：跳過 default（slate），只列 emerald / plum
  colorPreviews: buildColorPreviews("noya-beacon", NOYA_BEACON_COLORS, "slate"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.beacon
};

/** noya-bubble 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_BUBBLE_COLORS: ColorVariant[] = [
  { key: "beige", label: "米橘暖調", swatch: "#c66a3c" },
  { key: "rose", label: "玫瑰珊瑚", swatch: "#c75f5a" },
  { key: "gold", label: "暗金", swatch: "#9a7d3a" }
];

const noyaBubble: ThemeMeta = {
  key: "noya-bubble",
  label: "c22 · 諾亞浮丸",
  description:
    "諾亞浮丸真人廳，米色暖底 + 全圓藥丸交錯浮動左分類按鈕欄（選中填米橘漸層浮起）+ 右大圓角真人卡片頁面，源自設計稿 ly7，預設米橘暖調 / 玫瑰珊瑚 / 暗金三種配色",
  desktop: () => import("./noya-bubble/desktop.vue"),
  mobile: () => import("./noya-bubble/mobile.vue"),
  defaultColor: "beige",
  colors: NOYA_BUBBLE_COLORS,
  previews: buildPreviews("noya-bubble"),
  // 色變體截圖：跳過 default（beige），只列 rose / gold
  colorPreviews: buildColorPreviews("noya-bubble", NOYA_BUBBLE_COLORS, "beige"),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.bubble
};

/** noya-bookmark 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_BOOKMARK_COLORS: ColorVariant[] = [
  { key: "gold", label: "暗金", swatch: "#9a7d3a" },
  { key: "emerald", label: "翡翠綠", swatch: "#3f8a6e" },
  { key: "plum", label: "梅紫", swatch: "#9d4f86" }
];

const noyaBookmark: ThemeMeta = {
  key: "noya-bookmark",
  label: "c23 · 諾亞書籤",
  description:
    "諾亞書籤真人廳，暗金色底 + 書籤箭頭摺角 clip-path 左分類按鈕欄（選中外推貼齊發光）+ 右角標真人卡片頁面，源自設計稿 ly8，預設暗金 / 翡翠綠 / 梅紫三種配色",
  desktop: () => import("./noya-bookmark/desktop.vue"),
  mobile: () => import("./noya-bookmark/mobile.vue"),
  defaultColor: "gold",
  colors: NOYA_BOOKMARK_COLORS,
  previews: buildPreviews("noya-bookmark"),
  // 色變體截圖：跳過 default（gold），只列 emerald / plum
  colorPreviews: buildColorPreviews(
    "noya-bookmark",
    NOYA_BOOKMARK_COLORS,
    "gold"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.bookmark
};

/** noya-squircle 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_SQUIRCLE_COLORS: ColorVariant[] = [
  { key: "beige", label: "米橘暖調", swatch: "#c66a3c" },
  { key: "plum", label: "梅紫", swatch: "#9d4f86" },
  { key: "slate", label: "霧石板藍", swatch: "#5a6f9d" }
];

const noyaSquircle: ThemeMeta = {
  key: "noya-squircle",
  label: "c24 · 諾亞方磚",
  description:
    "諾亞方磚真人廳，亮白米底 + Squircle 大圓角方磚左分類按鈕欄 + 右玻璃高光真人卡片頁面，源自設計稿 ly9，預設米橘暖調 / 梅紫 / 霧石板藍三種配色",
  desktop: () => import("./noya-squircle/desktop.vue"),
  mobile: () => import("./noya-squircle/mobile.vue"),
  defaultColor: "beige",
  colors: NOYA_SQUIRCLE_COLORS,
  previews: buildPreviews("noya-squircle"),
  // 色變體截圖：跳過 default（beige），只列 plum / slate
  colorPreviews: buildColorPreviews(
    "noya-squircle",
    NOYA_SQUIRCLE_COLORS,
    "beige"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.squircle
};

/** noya-tabline 配色（抽常數讓 colors 與 buildColorPreviews 共用） */
const NOYA_TABLINE_COLORS: ColorVariant[] = [
  { key: "beige", label: "米橘暖調", swatch: "#c66a3c" },
  { key: "gold", label: "暗金", swatch: "#9a7d3a" },
  { key: "rose", label: "玫瑰珊瑚", swatch: "#c75f5a" }
];

const noyaTabline: ThemeMeta = {
  key: "noya-tabline",
  label: "c25 · 諾亞分線",
  description:
    "諾亞分線真人廳，米色極簡底 + 純文字標籤側線指示（手機）/ 頂部分頁（桌面）左分類 + 右克制留白真人卡片頁面，源自設計稿 ly10，預設米橘暖調 / 暗金 / 玫瑰珊瑚三種配色",
  desktop: () => import("./noya-tabline/desktop.vue"),
  mobile: () => import("./noya-tabline/mobile.vue"),
  defaultColor: "beige",
  colors: NOYA_TABLINE_COLORS,
  previews: buildPreviews("noya-tabline"),
  // 色變體截圖：跳過 default（beige），只列 gold / rose
  colorPreviews: buildColorPreviews(
    "noya-tabline",
    NOYA_TABLINE_COLORS,
    "beige"
  ),
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  brightness: "light",
  categories: ["live"],
  releaseDate: NOYA_LIVE_V3_RELEASE_DATES.tabline
};

/** 對外暴露的 theme 表，key 是 layoutKey */
export const themes: Record<string, ThemeMeta> = {
  noya,
  at99,
  "ant-sport": antSport,
  tycoon,
  vietvip,
  "honest-at": honestAt,
  "honest-max": honestMax,
  "honest-no6": honestNo6,
  "at-deluxe": atDeluxe,
  fived,
  "dahsing-waterfall": dahsingWaterfall,
  "dahsing-tabs": dahsingTabs,
  "dahsing-horizontal": dahsingHorizontal,
  "daheng-rank": dahengRank,
  "daheng-grid": dahengGrid,
  "daheng-rail": dahengRail,
  "daheng-compact": dahengCompact,
  "daheng-list": dahengList,
  "daheng-magazine": dahengMagazine,
  fuyou,
  "noya-beige": noyaBeige,
  "noya-blue": noyaBlue,
  "daheng-neon": dahengNeon,
  "daheng-emerald": dahengEmerald,
  "daheng-fresh": dahengFresh,
  "daheng-night": dahengNight,
  "daheng-onyx": dahengOnyx,
  "daheng-coral": dahengCoral,
  "daheng-crimson": dahengCrimson,
  "daheng-titan": dahengTitan,
  "daheng-glacier": dahengGlacier,
  "noya-jade": noyaJade,
  "noya-dawn": noyaDawn,
  "noya-lux": noyaLux,
  "noya-sakura": noyaSakura,
  "noya-aurora": noyaAurora,
  "noya-ink": noyaInk,
  "noya-steel": noyaSteel,
  "noya-reef": noyaReef,
  "noya-lagoon": noyaLagoon,
  "noya-starlit": noyaStarlit,
  "noya-mint": noyaMint,
  "noya-pill": noyaPill,
  "noya-orbit": noyaOrbit,
  "noya-petal": noyaPetal,
  "noya-rhombus": noyaRhombus,
  "noya-hive": noyaHive,
  "noya-beacon": noyaBeacon,
  "noya-bubble": noyaBubble,
  "noya-bookmark": noyaBookmark,
  "noya-squircle": noyaSquircle,
  "noya-tabline": noyaTabline
};

/** 預設版面（首次進站、query 與 localStorage 都缺時使用） */
export const DEFAULT_LAYOUT_KEY = "noya";

/** 取得指定 theme，找不到回 fallback 預設 */
export function getTheme(key: string | null | undefined): ThemeMeta {
  if (key && themes[key]) return themes[key];
  return themes[DEFAULT_LAYOUT_KEY];
}

/** 取得 theme 下指定配色，找不到回該 theme 預設配色 */
export function getColorVariant(
  theme: ThemeMeta,
  colorKey: string | null | undefined
) {
  const found = theme.colors.find((c) => c.key === colorKey);
  return (
    found ??
    theme.colors.find((c) => c.key === theme.defaultColor) ??
    theme.colors[0]
  );
}

/**
 * 取得 theme 下指定 logo，找不到回該 theme 預設 logo
 *
 * 為什麼提供 helper 而非要呼叫端自行查：
 * - 同 getColorVariant 一致的 API 形狀，呼叫端不必處理 fallback 邏輯
 * - 若未來要支援 logo 多語系或變體（橫式/方形），可在這層統一處理
 *
 * 為什麼明確標 return 型別為 LogoCandidate（非 undefined）：
 * - `theme.logos` 型別為 `[LogoCandidate, ...LogoCandidate[]]`（non-empty tuple），
 *   `theme.logos[0]` 編譯期保證存在
 * - 呼叫端 `themeStore.currentLogo.src` 可放心解構，不需要 optional chaining
 * - 違反 non-empty 約束會在 registry 建構時就被 TS 擋下，這層 helper 不必再做 runtime 防呆
 */
export function getLogo(
  theme: ThemeMeta,
  logoKey: string | null | undefined
): LogoCandidate {
  const found = theme.logos.find((l) => l.key === logoKey);
  if (found) return found;
  const fallback = theme.logos.find((l) => l.key === theme.defaultLogo);
  // theme.logos[0] 由型別保證存在（non-empty tuple），不會回 undefined
  return fallback ?? theme.logos[0];
}

/**
 * 取得指定 (theme, logoKey, device, colorKey?) 對應的預覽截圖 URL
 *
 * 為什麼這層 helper 必要：
 * - showcase 卡片 / dialog 都需要依「當下選定的 showcaseLogoKey」決定預覽圖
 * - 預覽 dialog 加上 color 切換後，還要依「當下 previewColor」決定走 default 截圖還是色變體截圖
 * - fallback 鏈集中在這層，呼叫端拿 string 即可塞 <img src>，不必懂 fallback 邏輯
 *
 * Fallback 順序（colorKey 提供時）：
 * 1. 若 colorKey == null / undefined / theme.defaultColor → 直接走 default 截圖鏈（從 previews 取）
 * 2. 若 colorKey 為非 default 色 → 嘗試 colorPreviews[colorKey][logoKey][device]
 *    - 命中且 URL 非空 → 回傳
 *    - 未命中 / URL 空 → 嘗試 colorPreviews[colorKey][theme.defaultLogo][device]
 *    - 仍未命中 → 退回 default 截圖鏈（走 previews）
 * 3. default 截圖鏈：previews[logoKey] → previews[theme.defaultLogo] → previews[theme.logos[0].key]
 *
 * 為什麼這樣排：
 * - 色變體截圖只有 dahsing 三 theme 補齊；其他 theme 沒提供 colorPreviews 直接走 default 鏈
 * - dahsing 三 theme 內若使用者切到某 color 而該色截圖還沒補齊（例如初期補了 desktop 沒補 mobile），
 *   退回 default 截圖避免破圖，但呼叫端 watch URL 變化的 loading state 仍會正常觸發
 *
 * 為什麼不直接讓呼叫端做 `theme.colorPreviews?.[c]?.[l]?.[d]`：
 * - fallback 鏈一旦寫在 template / computed 內會非常雜亂
 * - 集中在這層也方便未來加 logging / metrics（例如統計哪個 (theme, color, logo) 缺截圖）
 */
export function getPreview(
  theme: ThemeMeta,
  logoKey: string | null | undefined,
  device: "desktop" | "mobile",
  colorKey?: string | null
): string {
  // default 截圖鏈（fallback 終點）
  const fromDefaultChain = (): string => {
    const direct = logoKey ? theme.previews[logoKey] : undefined;
    if (direct && direct[device]) return direct[device];
    const def = theme.previews[theme.defaultLogo];
    if (def && def[device]) return def[device];
    const firstKey = theme.logos[0].key;
    const first = theme.previews[firstKey];
    return first ? first[device] : "";
  };

  // colorKey 為 null / undefined / 與 defaultColor 同 → 直接走 default 鏈
  if (!colorKey || colorKey === theme.defaultColor) {
    return fromDefaultChain();
  }

  // colorPreviews 缺整個欄位（其他不支援色變體的 theme）→ 退回 default 鏈
  const colorMap = theme.colorPreviews?.[colorKey];
  if (!colorMap) return fromDefaultChain();

  // 試指定 logo
  const byLogo = logoKey ? colorMap[logoKey] : undefined;
  if (byLogo && byLogo[device]) return byLogo[device];

  // 試 default logo
  const byDefaultLogo = colorMap[theme.defaultLogo];
  if (byDefaultLogo && byDefaultLogo[device]) return byDefaultLogo[device];

  // 該 color 該 device 全部都缺檔 → 退回 default 截圖鏈
  return fromDefaultChain();
}

/** 給 store / UI 列舉用 */
export function listThemes(): ThemeMeta[] {
  return Object.values(themes);
}

/**
 * 把 hex 色字串解析為 [r, g, b]（0~255 整數）
 *
 * 支援格式：
 * - `#RGB`（3 位簡寫，每位展開為 RR/GG/BB）
 * - `#RRGGBB`（6 位完整）
 *
 * 為什麼不丟給 CSS computed style 算：
 * - registry 是純資料層，不應該依賴 DOM；推薦演算法可能在 SSR / unit test 環境跑
 * - 純字串解析簡單可靠，效能也比建 DOM 取 computed style 高
 *
 * 容錯：拿到不合法字串時回 [0, 0, 0]（黑），讓推薦演算法不爆，極端情況下排序可能略有偏差但不影響功能
 */
function parseHexColor(hex: string): [number, number, number] {
  if (typeof hex !== "string") return [0, 0, 0];
  const trimmed = hex.trim().replace(/^#/, "");
  // 3 位簡寫 → 展開為 6 位
  const full =
    trimmed.length === 3
      ? trimmed
          .split("")
          .map((c) => c + c)
          .join("")
      : trimmed;
  if (full.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(full)) return [0, 0, 0];
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return [r, g, b];
}

/**
 * 兩個 hex 色的 RGB 歐式距離
 *
 * 公式：sqrt((r1-r2)^2 + (g1-g2)^2 + (b1-b2)^2)
 * 範圍：0（同色）~ ~441（黑白兩極端）
 *
 * 為什麼用 RGB 距離而非 CIELAB / HSL：
 * - 本 demo 只需「色感相近 / 不相近」的粗略排序，不需要符合人眼感知精度
 * - RGB 三軸最簡單、無依賴；CIELAB 需要色彩空間轉換 + 矩陣運算，徒增複雜度
 * - 推薦結果由「最近 5 個 theme」截斷，輕微誤差不影響使用者體驗
 *
 * 為什麼導出（export）：
 * - 給 showcase.store 直接呼叫做推薦計算
 * - 給未來測試 / 其他位置（例如 hover preview tooltip 顯示「色感相近度」）重用
 */
export function colorDistance(hexA: string, hexB: string): number {
  const [r1, g1, b1] = parseHexColor(hexA);
  const [r2, g2, b2] = parseHexColor(hexB);
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * 取指定 theme 的 defaultColor 對應 swatch hex
 *
 * 為什麼這層 helper 必要：
 * - 推薦演算法需要拿到 theme 的「代表色」算距離
 * - theme.colors 內的 swatch 是 hex 字串，theme.defaultColor 是 colorKey，
 *   需要對應查 → 抽出 helper 避免呼叫端寫 find
 * - 找不到時退回第一個 swatch（colors 在型別內沒強制 non-empty，但實務上每個 theme 都至少 3 色）
 */
export function getThemeMainSwatch(theme: ThemeMeta): string {
  const found = theme.colors.find((c) => c.key === theme.defaultColor);
  return found?.swatch ?? theme.colors[0]?.swatch ?? "#000000";
}

/**
 * 取得本機時區的「今天」字串（格式 `YYYY-MM-DD`）
 *
 * 為什麼自己拼而非用 `toISOString().slice(0, 10)`：
 * - toISOString 強制走 UTC，跨時區會有「本機已 6/10 但 UTC 仍 6/9」的誤差
 * - 使用者規約 [[feedback-schedule-release-by-date]] 明示「本機時區，不要 UTC 轉換」
 * - 用 getFullYear / getMonth / getDate 拿到本機時區值再 padStart 拼字串，行為穩定
 *
 * 為什麼把它做成 helper 而非 inline：
 * - 同一份判斷邏輯會被 showcase store / 未來其他地方（例如 sitemap / SSR）共用
 * - 抽 helper 後 TS 一致回 string 型別，呼叫端不必處理 Date 物件
 *
 * 為什麼 export 而非僅 internal：
 * - showcase store 需要它做 isThemeReleased 判斷的 base
 * - 測試 / 開發工具未來可能也要查「現在被視為哪一天」
 */
export function getLocalToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * 判斷指定 theme 是否「已上架」（依排程日期，純函式不碰 DOM / store）
 *
 * 規則：
 * - 缺 `releaseDate` 欄位 → 視為「永遠顯示」回 true（既有 13 個 theme 不受影響）
 * - 有欄位且 `releaseDate <= today` → 已上架回 true
 * - 有欄位且 `releaseDate > today` → 未上架回 false
 *
 * 為什麼用字串字典序比較 `YYYY-MM-DD`：
 * - 字串字典序 == 日期序（前提：固定 zero-pad 月日，本檔 helper 保證如此）
 * - 不需要 Date.parse 或 timezone 換算，無跨瀏覽器地雷
 * - 比 `new Date(a) <= new Date(b)` 快、易測、輸入合法時無例外
 *
 * 為什麼 today 走參數而非 helper 內部呼叫 getLocalToday：
 * - 純函式更易測（傳入固定 today 可重現各種日期邊界 case）
 * - 呼叫端通常一次過濾整個 themes 陣列，提取 today 到外層只算一次更省
 *
 * 為什麼不在這層加 query bypass：
 * - bypass 是「使用者層的測試功能」屬 UI 行為，不該污染純資料層判斷
 * - showcase store 在呼叫這支前自己 check query，bypass 時跳過整個 filter
 *
 * 為什麼 export：
 * - showcase store 需要呼叫做 listing filter
 * - 未來 sitemap 產生器 / E2E 測試 / dev tools 都可重用
 */
export function isThemeReleased(theme: ThemeMeta, today: string): boolean {
  // 無欄位視為「永遠顯示」，與既有 13 個 theme 行為一致
  if (!theme.releaseDate) return true;
  // 字典序比較：releaseDate <= today 表示已到上架日
  return theme.releaseDate <= today;
}
