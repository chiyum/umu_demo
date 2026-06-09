# 多架構專案
腳手架為Vite，使用的語言是TS並掛載Vue
用於多個版型、樣式適用共同維護的專案。

## 主要運用的套件

- quasar UI組件
- pinia 狀態儲存
- autoImport 自動引入

## 架構說明

### _app 自動化等的設定檔存放位置
專案的路由是使用自動化。
若有要新增頁面只需要在pages新增vue檔案，就會自動新增在Vue-router中。
支援多層路由 example:user/phone

### assets 樣式／媒體檔
存放圖、影、scss的資料夾
使用vite-imagetools將格式轉換為webp  getImageUrl()中 .png?format=webp


### components 樣式／媒體檔
存放可重用的 Vue 組件

### directive
自定義directive存放地點，已經搭配自動化載入。
新增檔案後會自動加入Vue

### interceptors
儲存axios攔截器的資料夾，依照功能區分檔案

### layouts layout存放位置
專案的路由可以設定不同路由搭配指定layout。
這個資料夾專門儲存layout的.vue檔
#### layout模式
layout的模式有三種
- 第一種
最簡單的就是直接在layout建立一個.vue檔，這個是rwd的layout，不管是什麼寬度都只會使用這個layout
- 第二種
第二種是awd模式，在layout建立一個資料夾，這個資料夾的名稱是layout名稱。裡面有分desktop與mobile兩個.vue檔。
對應的是PC版本與手機版本的layout，在超過isMobile的寬度就會載入desktop.vue，否則載入mobile.vue
可參考layout-vip
- 第三種
第三種也與第二種一樣是awd，差別在區別是不使用資料夾而是使用檔名。
直接在layouts資料夾新增兩個.vue檔案，PC版本就直接命名layout名稱，而手機版則是在檔名後面加上-mobile
可以參考layout-default


### locales
儲存語系檔的資料夾，依照語系區分檔案

### pages 頁面存放位置
放入此資料夾的檔案，會自動設定並加入Vue-router
但第一層最主要的是樣式的環境。
例如當環境設定是base就是會載入base裡面的元件檔案
路由會依照檔案名稱或資料夾自動設定

#### 頁面版型設置
頁面以及layout有分為rwd與awd兩種版型
rwd頁面亦可以搭配awd的layout
awd頁面也可以搭配rwd的layout
根據放在defineOption的setting物件中的設置決定

- rwd頁面 + rwd layout
直接指定layout的名稱即可
```JS
defineOptions({
  layout: "layout-rwd"
});
```

- rwd頁面 + awd layout
搭配useAwd的參數
```JS
defineOptions({
  layout: "layout-vip",
  setting: {
    useAwdLayout: true // 使用awdLayout
  }
});
```

- awd頁面 + awd layout
只要你有使用awd的頁面，預設就會是awd的layout
```JS
defineOptions({
  layout: "layout-vip",
});
```

- awd頁面 + rwd layout
若使用awd頁面但想要使用rwd的layout就需要搭配useAwd的參數
```JS
defineOptions({
  layout: "layout-vip",
  setting: {
    useAwdLayout: false // 關閉awdLayout
  }
});
```

- awd頁面 + 電腦版與手機版要使用不同的layout
在手機版的layout中使用awdAssignLayout的參數
```JS
defineOptions({
  layout: "layout-vip",
  setting: {
    awdAssignLayout: "layout-vip-mobile" // 使用不awdLayout
  }
});
```

#### awd頁面
目前有分awd以及一般頁面
awd的話就需要建立一個資料夾。這個資料夾將會是路由名稱。
接著將檔案分成desktop以及mobile，當超過App.vue設定的寬度就會依照寬度載入對應的元件。

#### 一般頁面
如果是一般頁面，只需要在pages建立一個vue檔案即可。可以有無限層的路由。
例如
- pages/trade/deposit.vue => /trade/deposit
- pages/trade/detail/withdraw.vue => /trade/detail/withdraw

### store 狀態儲存的資料夾
儲存pinia的資料夾，pinia會根據功能分成不同的ts檔

### utils
儲存小函式所存的資料夾，目前是一個函式一個檔案。
可以依照個人需求更改。

### apis
API的資料夾，戳API都撰寫在此資料夾便於管理。

### models
定義轉換後的資料型別的資料夾，依照功能區分檔案。
此資料夾的檔名需要夾上.model
example: user.model.ts

### types
定義API資料型別的資料夾，依照功能區分檔案。
此資料夾的檔名需要夾上.type
example: user.type.ts

### adapters
資料轉換接口與實例的資料夾，一樣按照功能區分檔案。
base為最原始的街口定義。

#### adapters開發流程建議
1. 先在models定義好資料型別
2. 在types定義好API資料型別
3. 在adapters中撰寫轉換的處理

### public
存放不會打包的靜態檔

### 環境的模板與樣式設置
因為是多版型，所以會根據環境變數中的來載入不同的html模板與樣式。
#### 環境全域sass變數與樣式設定
```
VITE_STYLE_ENV="base"
```
會根據設定去載入scss中的main.[env].scss

#### 環境模板設置
```
VITE_TEMPLATE_ENV="base"                # 樣式模板環境
```
會根據設定去載入pages中的env資料夾的頁面並自動轉為路由。
### 其他設定檔

- auto-imports.d.ts 自動引入產生的設定檔 ts用

- vite-env.d.ts 可以在專案中運用vite環境的設定檔

- .eslintrc-auto-import.json 自動引入的設定檔

- tsconfig.node.json tsconfig.json的額外設定檔

- quasar-variables.scss quasar的變數檔，可以在此檔案中設定quasar的變數

- variables.[env].scss 環境變數的設定檔，根據不同的環境變數設置全域的scss變數

## Version

- **Node.js** v20.9.0
- **yarn** v1.22.18
- **vue** v3.4.31

## Config

- **.env.development** 開發模式
- **.env.production** 生產模式
- **.env.uat** 測試模式

## Setup

```
yarn install
```

### Compiles and minifies for production

```
yarn run dev 開發模式
yarn build 生產模式
yarn build:uat 測試模式
```

### Deploy

執行 compile 之後根目錄下產生 `/dist` 檔案夾

### GitHub Pages 自動部署

本專案已配置 GitHub Action（`.github/workflows/deploy.yml`），將 SPA 自動部署到 GitHub Pages。

**部署流程：**

- push 任何 commit 到 `main` 分支，會自動觸發 build + deploy
- 也可至 GitHub Repo 的 `Actions` 頁手動觸發 `Deploy to GitHub Pages` workflow
- 同時間最多跑一個 workflow（concurrency cancel-in-progress），新推送會中止前一次部署

**首次啟用需要手動設定一次：**

1. 進到 Repo `Settings` → `Pages`
2. `Build and deployment` → `Source` 選擇 `GitHub Actions`（**不是** Deploy from a branch）
3. 第一次推送後 Action 跑完即可在 `Actions` 結果頁看到部署 URL

**部署位址：** [https://chiyum.github.io/umu_demo/](https://chiyum.github.io/umu_demo/)

**關鍵設計：**

- `vite.config.ts` 的 `base` 在 production 模式自動切到 `/umu_demo/`，確保子路徑部署下 asset 路徑正確
- `public/.nojekyll` 防止 Pages 用 Jekyll 處理底線開頭目錄
- workflow build 後將 `dist/index.html` 複製成 `dist/404.html`，作為 SPA 路由 fallback（`createWebHistory` 直連子路徑 refresh 時，Pages 會回 404.html，由瀏覽器載入 SPA 後 vue-router 接手）

**若 repo 改名：** 需同步更新 `vite.config.ts` 內的 base 字串以及本說明的部署位址。

## 結構概覽
```
VUE_VITE_TS_START/                # 專案根目錄
├── env/                          # 環境變數文件，包含 .env.development、.env.production、.env.uat 等
├── mock/                         # 模擬數據資料夾，用於本地開發測試 API 數據
├── node_modules/                 # 安裝的依賴包，由 Yarn 或 npm 管理
├── public/                       # 不會被打包的靜態資源，例如 favicon 圖標
├── src/                          # 主應用程式的源代碼目錄
│   ├── _app/                     # 全局設定和自動化配置檔案
│   ├── assets/                   # 靜態資源資料夾，包含圖片、影片、樣式等
│   ├── components/               # 可重用的 Vue 組件資料夾
│   ├── directives/               # 自定義指令的資料夾，新增指令會自動註冊
│   ├── interceptors/             # axios 攔截器資料夾，根據功能區分文件
│   ├── layouts/                  # 儲存不同路由版型的 .vue 檔案
│   ├── locales/                  # 多語系支援資料夾，語言包檔案按語系區分
│   ├── pages/                    # 頁面組件資料夾，檔案會自動生成路由
│   ├── store/                    # Pinia 狀態管理資料夾，按功能分成多個 ts 文件
│   ├── apis/                     # API管理資料夾
│   ├── models/                   # 轉換後的資料型別的資料夾
│   ├── types/                    # 定義API資料型別的資料夾
│   ├── adapters/                 # 資料轉換接口與實例的資料夾
│   ├── utils/                    # 小工具函數資料夾，根據功能分文件
│   ├── App.vue                   # Vue 根組件
│   ├── auto-imports.d.ts         # 自動引入插件生成的類型定義檔案
│   ├── axios.ts                  # axios 配置和初始化文件
│   ├── i18n.ts                   # 國際化配置檔案
│   ├── main.ts                   # 應用的入口文件，初始化 Vue 實例
│   ├── quasar-variables.sass     # Quasar 的變數文件，用於自訂 Quasar 样式
│   ├── router.ts                 # 路由設定文件，負責管理應用的路由
│   └── vite-env.d.ts             # Vite 環境變數的 TypeScript 類型定義文件
├── .editorconfig                 # 編碼風格設定文件，為不同編輯器提供一致的代碼格式
├── .eslintrc-auto-import.json    # 自動引入插件的 ESLint 配置
├── .gitignore                    # Git 忽略文件，用於排除不需要追蹤的文件
├── .prettierrc                   # Prettier 配置文件，用於統一代碼格式
├── eslint.config.js              # ESLint 配置文件，用於代碼風格檢查
├── index.html                    # 應用的 HTML 入口文件
├── package.json                  # 專案的依賴、腳本和其他配置信息
├── README.md                     # 專案的說明文件，包含安裝、使用說明
├── tsconfig.json                 # TypeScript 配置文件
├── tsconfig.node.json            # TypeScript 的 Node.js 環境配置補充文件
├── vite.config.ts                # Vite 配置文件，包含插件和構建設定
└── yarn.lock                     # Yarn 鎖定文件，確保相同的依賴版本
```

## Theme（版面）系統

本專案的 `/home` 頁面採用「單一 Route + 動態 Layout Component + CSS Var」架構，
支援多個版面（layout）與多組配色（color variant）即時切換，
切換時 URL 會帶 `?theme=<layoutKey>&color=<colorKey>` 並寫入 localStorage。

### 目錄結構

```
src/themes/
├── _types.ts                # ThemeMeta / ColorVariant / FabPosition 型別
├── _registry.ts             # 集中註冊所有版面，給 store 與 host 讀取
├── noya/
│   ├── index.ts
│   ├── desktop.vue          # 桌面入口
│   ├── mobile.vue           # 手機入口
│   ├── _tokens.scss         # 該版面預設配色（CSS var）
│   ├── _variants.scss       # 該版面替代配色
│   ├── sections/            # 大區塊：hero / cta / grid / footer ...
│   └── atoms/               # 共用小元件：按鈕、卡片
├── at99/                    # 結構同上
├── fived/                   # 5D 暗金禮盒風（對齊 5d_v2 原稿）
│   ├── desktop.vue          # PC：header + (left-sidebar | main) + right-sidebar + footer
│   ├── mobile.vue           # M：抽屜選單 + header + banner/news/hot-games + bottom tab
│   ├── _tokens.scss / _variants.scss
│   ├── assets/              # banner / games / icon 三類圖
│   └── sections/
│       ├── fived-mobile-header.vue       # 漢堡(左) / logo(中) / 登入(右)，scroll 變色
│       ├── fived-mobile-menu.vue         # 左滑入抽屜：6 大分類 + 子項 + 底部社群
│       ├── fived-mobile-banner.vue
│       ├── fived-mobile-news.vue
│       ├── fived-mobile-hot-games.vue
│       ├── fived-mobile-footer.vue
│       └── desktop/
│           ├── fived-pc-header.vue       # 6 主分類 hover 下拉 + 金漸層登入
│           ├── fived-pc-left-sidebar.vue # 對齊原作為空殼 aside（保留 224px 寬度位置）
│           ├── fived-pc-right-sidebar.vue # fixed 浮動：scrollY>500 顯示，QR/下載/社群/回頂
│           ├── fived-pc-hero.vue
│           ├── fived-pc-hot-games.vue
│           └── fived-pc-footer.vue
├── dahsing-shared/          # 大亨三版型共用基底（不註冊為 theme，只匯出元件）
│   ├── _assets.ts           # 8 張 asset URL 集中 + 7 nav / 5 tab 共用資料
│   ├── assets/              # hero / trophy / ch-* 6 張共用圖片
│   ├── atoms/               # 8 個 mobile 共用 atoms
│   └── desktop/             # 桌面共用 chrome（sticky topbar）
├── dahsing-waterfall/       # 大亨瀑布流（A 版）
├── dahsing-tabs/            # 大亨分頁（B 版）
└── dahsing-horizontal/      # 大亨橫向列表（C 版）
```

### 新增第三個版面流程

1. **建檔**：複製 `src/themes/noya/` 為 `src/themes/<your-key>/`，依需求調整 sections / atoms
2. **配色**：在 `_tokens.scss` 中定義預設配色（key 為 `[data-theme="<your-key>"]`）；
   在 `_variants.scss` 中加 1-N 組替代配色（`[data-theme="<your-key>"][data-theme-color="xxx"]`）
3. **註冊**：在 `src/themes/_registry.ts` 加 import 與 `themes` 物件項目，
   `desktop` / `mobile` 用 lazy import：`() => import("./<your-key>/desktop.vue")`
4. **SCSS 整合**：**不需要動 main.default.scss**。
   `vite.config.ts` 的 `buildThemeScssImports()` 會在 build 時掃描
   `src/themes/<your-key>/_tokens.scss` 與 `_variants.scss` 並自動 `@use` 進去；
   只要檔名是 `_tokens.scss` / `_variants.scss` 就會被認到（variants 為可選）。
5. **驗證**：`yarn build` 跑過後到 `/home?theme=<your-key>` 看效果

### CSS Var 命名公約

所有 theme 的 `_tokens.scss` 都遵守相同 var 名稱，這樣 section 元件不必為每個 theme 改寫：

| Var | 用途 |
|---|---|
| `--color-primary` | 主色（CTA、強調） |
| `--color-secondary` | 輔助色 |
| `--color-accent` | 亮點、徽章 |
| `--bg-base` | 頁面背景 |
| `--bg-surface` | 卡片、panel 背景 |
| `--bg-overlay` | 半透明遮罩 |
| `--text-primary` | 主要文字 |
| `--text-muted` | 次要文字 |
| `--border` | 分隔線、邊框 |
| `--shadow` | 通用陰影 |
| `--gradient-hero` | hero 區漸層背景 |
| `--gradient-cta` | CTA 按鈕漸層 |

### Theme Color FAB（浮標）

`src/components/common/theme-color-fab.vue`（桌面）與
`theme-color-fab.mobile.vue`（手機）兩個版本，
由 `layout-theme-host` 依 `useDevice.isMobile` 動態載入。

> 命名歷史：早期叫 `theme-switcher-fab.vue`（同時切版面 + 配色），
> `/demo/:layoutkey` 路由把版面鎖死在 URL 後，FAB 只剩配色 + Logo 切換，
> 故改名為 `theme-color-fab.vue` 更貼近職責。

特性：
- **可拖曳**：PC 滑鼠 + Mobile 觸控（使用 Pointer Events 統一處理）
- **邊緣吸附**：拖到距邊 < 20px 自動吸到邊
- **位置持久化**：位置存 ratio（百分比）寫入 localStorage，視窗縮放後不失真
- **URL 同步**：layout / color 雙向同步 `?theme=&color=`，用 `router.replace` 不污染 history
- **多 fallback**：URL query > localStorage > 預設值

### 切換版面的 URL 範例

- `/home?theme=noya&color=sunset` — noya 版面 + 日落橘配色
- `/home?theme=at99&color=neon-purple` — at99 版面 + 霓虹紫配色
- `/home?theme=dahsing-waterfall` — 大亨瀑布流（米橘預設）
- `/home?theme=dahsing-waterfall&color=copper` — 大亨瀑布流（copper 經典）
- `/home?theme=dahsing-tabs` — 大亨分頁切換
- `/home?theme=dahsing-horizontal` — 大亨橫向列表

### Logo 候選與切換（v4：三 theme 統一三 logo）

三個 theme 共用同一組 logo，便於跨 theme 視覺比對：

| logo key | 名稱 | 來源檔案 |
|---|---|---|
| `dahsing` | 大亨 ONLINE | `src/themes/at99/assets/logos/default.png` |
| `umu` | UMU | `src/themes/noya/assets/logos/default.png` |
| `long-heng` | 隆亨 ONLINE | `src/assets/shared-logos/long-heng.png` |

各 theme 的 `defaultLogo`（FAB 沒切過 logo 時的顯示 + showcase 預覽預設 logo）：

| Theme | defaultLogo | 理由 |
|---|---|---|
| at99 | `dahsing` | 主視覺對應大亨 ONLINE |
| noya | `umu` | 主視覺對應 UMU 自有品牌 |
| ant-sport | `long-heng` | 原本無對應品牌，剛好補上隆亨 |

**設計重點：**

- **Demo 頁 FAB（per-theme）**：`logoKey` per-theme 各自 persist 到 LS
  （鍵：`casino-demo:logoKey:v3:<layoutKey>`），不同版面互不污染；
  舊使用者 LS 殘留的 `pc / mobile / alt1 / alt2 / default` 已不在新 logos 清單中，
  store 內 `resolveInitialLogoKey` 會自動 fallback 到該 theme 新的 `defaultLogo`，不需手動清 LS
- **Showcase 主頁（全域共用）**：showcase 自有一個 logoKey state
  （鍵：`casino-demo:showcase-logoKey:v4`），切換時三張卡片預覽圖同時更新；
  與 demo 頁的 FAB 完全獨立、互不影響
- 切換版面時 store 內 `watch(layoutKey)` 會把 `logoKey` 重置成新 theme 的 LS 偏好或預設
- theme 入口元件（desktop.vue / mobile-header / main-nav / top-header 等）統一透過
  `useDemoThemeStore().currentLogo` 取 logo src，使用者切 logo 時所有引用自動更新
- FAB row 用縮圖按鈕（PC 36×36，mobile sheet 48×48 + label），active 樣式延續 colorBtn 反白邊框

### 預覽截圖矩陣

`ThemeMeta.previews` 是 `Record<logoKey, { desktop, mobile }>` 結構，
3 theme × 3 logoKey × 2 device = **18 張靜態截圖**，存放於 `src/assets/previews/`：

命名規約：`<themeKey>-<logoKey>-<device>.png`
例：`at99-dahsing-desktop.png`、`noya-umu-mobile.png`、`ant-sport-long-heng-desktop.png`

`getPreview(theme, logoKey, device)` helper 內含 fallback 鏈：
指定 logoKey → theme.defaultLogo → theme.logos[0].key，
任一層都保證命中 18 張之一，showcase 不會破圖。

截圖更新流程（qa-screenshots 在 .gitignore 內，腳本不入版控）：

1. 啟動 dev server：`yarn dev`（預設 port 9527）
2. 寫一個 Playwright Node script，對 18 個 (theme, logoKey, device) 組合：
   - `ctx.addInitScript(() => localStorage.setItem('casino-demo:logoKey:v3:<theme>', '<logoKey>'))`
   - `page.goto('http://localhost:9527/demo/<theme>', { waitUntil: 'domcontentloaded' })`
   - 等待對應 theme root selector（`.noya-layout` / `.at99-layout` / `.ant-sport-layout` 或其 `-m-` 手機版）
   - 等字體 ready + 所有 `<img>` load + 滾到底再回頂部觸發 lazy section
   - `page.screenshot({ fullPage: true })`
3. 桌面 viewport 1440×900，手機 viewport 390×844
4. 命名 `<themeKey>-<logoKey>-<device>.png` 存到 `src/assets/previews/`

注意：chrome --dump-dom / chrome headless 之前踩過 mount-race 坑（SPA 還沒 mount 就截、profile 路徑卡 race），務必用 Playwright。
networkidle 在 dev server 下可能因 HMR client polling 永不達成，用 domcontentloaded + 顯式 selector wait 較穩。

### Showcase 圖片 Lazy-Load 機制

Showcase 主頁（`/home` 路由，根據 vue-router 自動產生規則 `src/pages/default/home.vue` → `/home`）
會一次渲染全部 theme 卡片，每張卡片含一張 desktop 預覽圖；
總圖數量隨 theme 增加會線性放大，網速慢時若全部圖片同時下載會嚴重拖慢首屏。
為解決此問題，以下兩處 `<img>` 套用瀏覽器原生 lazy-load：

| 元件 | 圖片用途 | 屬性 |
|---|---|---|
| `showcase-theme-card.vue` | 卡片縮圖（desktop 預覽） | `loading="lazy"` + `decoding="async"` |
| `showcase-preview-dialog.vue` | 彈窗預覽圖（desktop / mobile） | `loading="lazy"` + `decoding="async"` |

設計重點：

- **only below-the-fold**：`showcase-hero` 沒有 `<img>`，`showcase-logo-switcher` 的
  logo 圖在首屏 above-the-fold（hero 下方平鋪 row），**不加 lazy** 以免閃爍
- **防 CLS**：theme-card thumb 外層 `.theme-card__thumb-btn` 已用 `aspect-ratio: 16 / 10`
  穩定佔位，圖片載入前後不會跳版。新增 `<img>` 時遵守同原則：用 CSS aspect-ratio
  或父容器固定尺寸佔位，**不要**靠 width/height attribute（CSS aspect-ratio 會蓋掉）
- **`decoding="async"`**：把圖片解碼工作丟到非主執行緒，捲動與切換 tab 時更順
- **dialog 內的圖**：dialog 用 `v-if` 動態 mount，理論上只在開啟時才下載；
  仍保留 `loading="lazy"` 作為「快速 desktop ↔ mobile tab 切換時」的瀏覽器排程保險

新增 showcase 卡片 / 預覽相關 `<img>` 時請延續同樣的 lazy 設定，保持首屏載入體驗一致。

### ant-sport 版面（蚂蚁体育對齊）

`src/themes/ant-sport/` 是 lilian_ant_pc 桌面 main.vue 5 段 + lilian_ant_web 手機 home.vue 6 段
的視覺對齊版本（DOM / SCSS 規格逐段對齊原作，但保留 token 化以支援三色切換）：

- **桌面 5 段**：Banner / News（marquee）/ AppDownload / GameGrid（7 tabs）/ Serve（4 計數 + 4 特色）
- **手機 6 段**：Header / BannerSwiper / Marquee / UserCard / GameMenu / BottomNav
- **配色 3 套**：blue 預設 / midnight 夜間 / red 節慶；HSL 三軸推導整套階層
- **規格對齊**：item 96×40 pill / radius 30.6px / 168×168 QR / 160×137 計數圓盤 / 580×140 特色卡

未引入 swiper / qrcode-vue3 套件，banner 用自寫 translateX + interval，QR 用靜態示意圖；
demo 不接後端 / 不接路由跳轉。

### dahsing 三版型（大亨米橘暖系，A 瀑布流 / B 分頁 / C 橫向列表）

`src/themes/dahsing-{waterfall,tabs,horizontal}/` 是「同品牌、三種中央 layout 風格」的三版面組合：

- **共用基底**：`src/themes/dahsing-shared/` 含 8 個 mobile atoms（status-bar / mobile-header / hero-banner / marquee / sidebar / sec-head / hot-bar / tab-bar / mini-icon）+ 桌面 sticky topbar；8 張 asset（hero / trophy / ch-* 6 張遊戲縮圖）集中於 `dahsing-shared/assets/`，三 theme 引用同一份不重複 emit
- **mobile 1:1 對齊原稿 HTML**：來源檔案 `/Users/georgehuang/Downloads/images 2/大亨首頁-版型{A 瀑布流,B 分頁,C 橫向列表} (1).html`，DOM 結構 / class 語意 / 卡片尺寸（wcard.t img 182px、wcard.s img 128px、tcard 138px、hcard 132×152、feat 230×152）嚴格對齊
- **桌面三 theme 風格差異化**（無原稿，自主設計，借鑑既有 theme pattern）：
  - dahsing-waterfall：Pinterest-style 4 欄 masonry（mobile 2 欄延伸）
  - dahsing-tabs：Steam-style 全寬 subtabs + 3 欄 tgrid
  - dahsing-horizontal：Netflix-style 4 列橫滾（mobile 3 列 + 加一列電子）
- **配色**：使用者指定米橘預設（主背景 `#fdfdfc` / nav 未 active 底 `#fcf7f4` + 文字 `#bb7353` / nav active 漸層 `linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%)`，0deg = 由下到上）+ copper 經典變體（保留原稿 `:root --copper / --copper-deep` 三色）
- **logo**：三 theme 預設 `dahsing`（與 at99 一致使用「大亨 ONLINE」logo PNG），無需新增 logo 候選

#### 借用既有 theme 元件對照表（traceability）

| dahsing theme | 桌面元件 | 借用來源 / 自寫 |
|---|---|---|
| 全部三 theme | dahsing-pc-topbar（sticky topbar） | 結構借鑑 tycoon / at99 桌面 topbar pattern |
| 全部三 theme | dahsing-hero-banner widthMode='wide' | 自寫（hero.png 直立比例 + 桌面 1280×320 拉伸） |
| dahsing-waterfall | column-count: 4 masonry | 自寫（既有 theme 無瀑布流元件） |
| dahsing-tabs | subtabs pill + tgrid 3 col | subtabs 概念對齊 ant-sport GameGrid，tgrid 自寫 |
| dahsing-horizontal | row scroller 4 列 | scroll 邏輯對齊 vietvip / fived 橫滾卡片，scroll-snap 自寫 |

#### 預覽截圖

dahsing 三版型截圖待補（既有 18 張預覽矩陣是 noya/at99/ant-sport 用，dahsing 三 theme registry 內 `previews: {}`，showcase 會走 `getPreview` fallback 鏈回 `""`，不會 runtime crash）。後續若要產截圖，沿用「預覽截圖矩陣」章節 SOP：等待 root selector `.dahsing-waterfall-pc` / `.dahsing-tabs-pc` / `.dahsing-horizontal-pc`（桌面）或 `.dahsing-waterfall-m` 等（mobile）。

