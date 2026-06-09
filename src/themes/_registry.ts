import type {
  ColorVariant,
  LogoCandidate,
  PreviewByColorLogo,
  PreviewByLogo,
  ThemeMeta
} from "./_types";

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
 * 命名規約：<themeKey>-<logoKey>-<device>.png
 * 例：at99-dahsing-desktop.png、noya-umu-mobile.png、ant-sport-long-heng-desktop.png
 *
 * glob 結果型別：Record<相對路徑, URL string>
 * 例：{ "@/assets/previews/at99-dahsing-desktop.png": "/assets/at99-dahsing-desktop-HASH.png" }
 * - import:'default' 讓 value 直接是 URL string（而非 ESM module 物件）
 * - query:'?url' 強制走 vite 的 asset URL 解析（避免被 imagetools 等 plugin 攔截轉 webp）
 */
const PREVIEW_URL_MAP = import.meta.glob<string>("@/assets/previews/*.png", {
  eager: true,
  import: "default",
  query: "?url"
});

/**
 * 從 PREVIEW_URL_MAP 查指定 (theme, logo, device) 對應的 URL
 *
 * 為什麼 glob 的 key 用 `/src/assets/previews/...` 而非 `@/assets/...`：
 * - vite 的 import.meta.glob 路徑解析後 key 永遠是「relative to project root 的絕對路徑」
 *   實測在本專案會是 `/src/assets/previews/<file>.png`
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
  const key = `/src/assets/previews/${themeKey}-${logoKey}-${device}.png`;
  return PREVIEW_URL_MAP[key] ?? "";
}

/**
 * 從 PREVIEW_URL_MAP 查指定 (theme, color, logo, device) 對應的 URL
 *
 * 新色變體命名規約：`<themeKey>-<colorKey>-<logoKey>-<device>.png`
 * 例：`dahsing-tabs-copper-dahsing-desktop.png`、`dahsing-waterfall-purple-umu-mobile.png`
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
  const key = `/src/assets/previews/${themeKey}-${colorKey}-${logoKey}-${device}.png`;
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

/** noya 版面（玫瑰金 / 暖色系） */
const noya: ThemeMeta = {
  key: "noya",
  label: "版面 A · 暖金",
  description: "暖金奶油調的真人視訊風格，玫瑰金 / 日落橘 / 青檸綠三種配色",
  // 重點：箭頭函式內部才呼叫 dynamic import，這樣才會切 chunk
  desktop: () => import("./noya/desktop.vue"),
  mobile: () => import("./noya/mobile.vue"),
  defaultColor: "rose-gold",
  colors: [
    { key: "rose-gold", label: "玫瑰金", swatch: "#d4a574" },
    { key: "sunset", label: "日落橘", swatch: "#ff7e47" },
    { key: "lime", label: "青檸綠", swatch: "#9fd356" }
  ],
  previews: buildPreviews("noya"),
  // noya 主視覺對應 UMU 品牌，預設帶 UMU
  defaultLogo: "umu",
  logos: SHARED_LOGOS,
  // 米白底 + 暖玫瑰金 accent，整體偏淺
  brightness: "light",
  // 真人視訊風 + 品味暖金 → live / luxury 兩個面向
  categories: ["live", "luxury"]
};

/** at99 版面（深藍霓虹 / 賭場風） */
const at99: ThemeMeta = {
  key: "at99",
  label: "版面 B · 霓虹",
  description: "深藍霓虹的賭場風格，霓虹藍 / 紫 / 綠三種配色",
  desktop: () => import("./at99/desktop.vue"),
  mobile: () => import("./at99/mobile.vue"),
  defaultColor: "neon-blue",
  colors: [
    { key: "neon-blue", label: "霓虹藍", swatch: "#2dd4ff" },
    { key: "neon-purple", label: "霓虹紫", swatch: "#a855f7" },
    { key: "neon-green", label: "霓虹綠", swatch: "#22d3a4" }
  ],
  previews: buildPreviews("at99"),
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
const antSport: ThemeMeta = {
  key: "ant-sport",
  label: "版面 C · 體育博彩",
  // 為什麼 description 內「蚂蚁体育」改繁體「螞蟻體育」：
  // 與本次 label 簡繁統一同步處理，避免同一段文案混用簡繁
  description:
    "對齊螞蟻體育原視覺的體育博彩風格，預設藍 / 深藍夜間 / 節慶紅三種配色",
  desktop: () => import("./ant-sport/desktop.vue"),
  mobile: () => import("./ant-sport/mobile.vue"),
  defaultColor: "blue",
  colors: [
    { key: "blue", label: "螞蟻藍", swatch: "#3c70fd" },
    { key: "midnight", label: "夜間藍", swatch: "#0d152b" },
    { key: "red", label: "節慶紅", swatch: "#e63946" }
  ],
  previews: buildPreviews("ant-sport"),
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
const tycoon: ThemeMeta = {
  key: "tycoon",
  label: "版面 D · 藍冰大亨",
  description:
    "藍冰大亨冷光金屬風，sidebar + 遊戲卡列表雙欄結構，預設冰藍 / 深海藍 / 金邊冰三種配色",
  desktop: () => import("./tycoon/desktop.vue"),
  mobile: () => import("./tycoon/mobile.vue"),
  defaultColor: "ice",
  colors: [
    { key: "ice", label: "冰藍", swatch: "#1f7ff0" },
    { key: "deep", label: "深海藍", swatch: "#0a52c4" },
    { key: "gold", label: "金邊冰", swatch: "#d4a574" }
  ],
  previews: buildPreviews("tycoon"),
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
const vietvip: ThemeMeta = {
  key: "vietvip",
  label: "版面 E · 越南 VIP",
  description:
    "東南亞深紅金邊 VIP 廳堂風格，葉脈紅金大底 + VIP 徽章四等級，預設酒紅 / 午夜深紅 / 純金禮盒三種配色",
  desktop: () => import("./vietvip/desktop.vue"),
  mobile: () => import("./vietvip/mobile.vue"),
  defaultColor: "ruby",
  colors: [
    { key: "ruby", label: "寶石紅", swatch: "#82122a" },
    { key: "midnight", label: "午夜紅", swatch: "#3a0613" },
    { key: "gold", label: "純金禮盒", swatch: "#c79a45" }
  ],
  previews: buildPreviews("vietvip"),
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
const honestAt: ThemeMeta = {
  key: "honest-at",
  label: "版面 F · AT99",
  description:
    "AT99 霓虹科技風，深藍底 + 青藍霓虹高光，hero 帶 JACKPOT 七段數字，預設霓虹藍 / 紫 / 青三種配色",
  desktop: () => import("./honest-at/desktop.vue"),
  mobile: () => import("./honest-at/mobile.vue"),
  defaultColor: "neon-blue",
  colors: [
    { key: "neon-blue", label: "霓虹藍", swatch: "#2dd4ff" },
    { key: "neon-purple", label: "紫色霓虹", swatch: "#c879ff" },
    { key: "neon-cyan", label: "螢光青", swatch: "#3dd7d3" }
  ],
  previews: buildPreviews("honest-at"),
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
const honestMax: ThemeMeta = {
  key: "honest-max",
  label: "版面 G · 88WIN",
  description:
    "88WIN 桃粉藍綠混色風，淡灰白底 + 彩色 hot 卡 + 紫色 CTA，預設桃粉 / 藍主 / 橘黃三種配色",
  desktop: () => import("./honest-max/desktop.vue"),
  mobile: () => import("./honest-max/mobile.vue"),
  defaultColor: "pink",
  colors: [
    { key: "pink", label: "桃粉", swatch: "#e75bff" },
    { key: "azure", label: "藍主", swatch: "#3ec1f5" },
    { key: "sunset", label: "夕陽橘", swatch: "#ff8a4c" }
  ],
  previews: buildPreviews("honest-max"),
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
const honestNo6: ThemeMeta = {
  key: "honest-no6",
  label: "版面 H · FG",
  description:
    "FG 紫黑神秘風，紫黑底 + 城堡 hero + 金色 hero 副標 + girl-model 卡片，預設紫主 / 夜紫 / 紫紅三種配色",
  desktop: () => import("./honest-no6/desktop.vue"),
  mobile: () => import("./honest-no6/mobile.vue"),
  defaultColor: "purple",
  colors: [
    { key: "purple", label: "紫主", swatch: "#d44ee0" },
    { key: "midnight", label: "夜紫", swatch: "#5b3da1" },
    { key: "crimson", label: "紫紅", swatch: "#d63d5e" }
  ],
  previews: buildPreviews("honest-no6"),
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
const atDeluxe: ThemeMeta = {
  key: "at-deluxe",
  label: "版面 I · AT Deluxe",
  description:
    "AT99 Deluxe 賭場霓虹奢華風，深藍 radial + JACKPOT 七段顯示 + 漸層膠囊 sidebar，預設霓虹青 / 玫紅 / 賭場金三種配色",
  desktop: () => import("./at-deluxe/desktop.vue"),
  mobile: () => import("./at-deluxe/mobile.vue"),
  defaultColor: "cyan-neon",
  colors: [
    { key: "cyan-neon", label: "霓虹青", swatch: "#69ffff" },
    { key: "rose-neon", label: "霓虹玫紅", swatch: "#f24a82" },
    { key: "gold-deluxe", label: "賭場金", swatch: "#ffd86b" }
  ],
  previews: buildPreviews("at-deluxe"),
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
  label: "版面 K · 瀑布流",
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
  label: "版面 L · 分頁",
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
  label: "版面 M · 橫向列表",
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
const fived: ThemeMeta = {
  key: "fived",
  label: "版面 J · 5D",
  description:
    "5D 暗金禮盒風，深棕底 + 金漸層邊框 + 雙欄 banner+news + tag 多色標籤，預設暗金 / 銀邊深藍 / 酒紅玫瑰三種配色",
  desktop: () => import("./fived/desktop.vue"),
  mobile: () => import("./fived/mobile.vue"),
  defaultColor: "gold-deep",
  colors: [
    { key: "gold-deep", label: "暗金", swatch: "#e2bd87" },
    { key: "royal-blue", label: "皇家藍", swatch: "#6fa8ff" },
    { key: "crimson-rose", label: "酒紅玫瑰", swatch: "#d63d5e" }
  ],
  previews: buildPreviews("fived"),
  defaultLogo: "long-heng",
  logos: SHARED_LOGOS,
  // 深棕底 + 金漸層邊框
  brightness: "dark",
  // 暗金禮盒奢華風 + 雙欄 banner+news 多品類
  categories: ["luxury", "general"]
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
  "dahsing-horizontal": dahsingHorizontal
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
