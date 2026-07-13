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

### 品質檢查與已知地雷

```
yarn lint:style       # 手動跑 stylelint，列出全 src 的 SCSS / Vue style 違規
yarn lint:style:fix   # 同上但自動修可修的（建議先 commit 再跑，方便還原）
```

**已知地雷：「`yarn build` 通過但 `yarn dev` 起不來」**

歷史上多次踩到：build 模式下 stylelint 違規不擋 build，但 dev 模式 `vite-plugin-stylelint`
的 `lintOnStart: true` 會在 `buildStart` hook 嚴格擋 error，導致開發者改完 SCSS 後 commit、
push、build 都過，**唯獨開發者本機 dev server 起不來**。已透過 commit `6d93797` / `1ae172e`
等修光既有 debt（目前 `npx stylelint "src/**/*.{css,scss,sass,vue}"` 應回 `0 problems found`），
但流程上仍需提醒：

| 場景 | 必跑 | 理由 |
|---|---|---|
| 改完 SCSS / Vue style block | `yarn lint:style` **與** `yarn dev`（看到 `ready in ... ms`） | 避免「build 通過 dev 起不來」漏網 |
| 改完 TS / Vue script block | `npx eslint <檔案>` 或 `yarn build` | ESLint 在 build 與 dev 都同樣嚴格 |
| 跨改 SCSS + Vue + TS | `yarn build` + `yarn dev`（10 秒看 ready）+ `yarn lint:style` | 三軌都過才算完成 |

**為什麼不直接讓 build 也擋 stylelint：** 目前 debt = 0，改 `vite.config.ts`
的價值低風險不對稱（沒有保護到任何已知錯誤，但有可能影響 GitHub Actions build 行為），
保持現狀，以 `yarn lint:style` script 提供開發者顯式驗證入口。
若未來 stylelint debt 再次堆積到顯著規模（例如 > 20 個 error），再考慮把 build 也擋下並
搭配 husky pre-commit hook。

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

本專案的 demo 頁採用「動態 Layout Component + CSS Var」架構，
支援多個版面（layout）與多組配色（color variant）即時切換。
- 版面：由 URL path 參數鎖定，路由為 `/demo/:layoutkey`（例：`/demo/noya`、`/demo/at99`）
- 配色：由 URL query 控制，`?color=<colorKey>`，預設取該 theme 第一組配色
- 持久化：FAB 切配色 / logo 時寫入 localStorage，下次同 theme 重新進入會 fallback 用

**兩種預覽路由（v4.12 起）：**

| 路由 | layout | 用途 | chrome |
|---|---|---|---|
| `/demo/:layoutkey` | `layout-theme-host` | 完整體驗頁，可用 FAB 切配色 / logo | 有 FAB、URL 雙向同步 |
| `/preview/:layoutkey` | `layout-theme-preview` | 乾淨的**獨立可分享預覽頁**，也當 showcase 卡片即時預覽 iframe 的 src | **無** FAB、無 URL sync |

- `/preview/:layoutkey` 只渲染該 theme 本體，URL 可直達、可分享（`?color=` / `?logoKey=` 一樣生效）；
  走 GitHub Pages `/umu_demo/` base 與 404.html SPA fallback，重整不 404。機制決策見 `docs/adr/0002`。

### Theme 編號規約（v4.3）

每個 theme 的 `label` 都帶「類別字母 + 兩位流水號」前綴，方便 showcase / FAB / preview dialog
列表掃視時快速辨識業務分類與同類別內排序。**新增 theme 時務必依本規約編號**。

#### label 格式

`<letter><nn> · <名稱>`

- `<letter>`：依該 theme `categories` 陣列「第一個元素」對照下表
- `<nn>`：兩位流水號（從 01 起算，< 10 補 0），每個類別獨立計數
- `<名稱>`：theme 顯示名稱（無「版面 X · 」舊前綴）

範例：`c01 · 暖金`（live 類第一個）、`a01 · 霓虹`（general 類第一個）、`d01 · 體育博彩`（sports 類第一個）

#### 字母 → 類別對照（固定，禁止改動順序與字母）

| 字母 | 類別 key | 中文 |
|---|---|---|
| `a` | `general` | 通用大廳 |
| `b` | `slots` | 電子 / 老虎機 |
| `c` | `live` | 真人視訊 |
| `d` | `sports` | 體育博彩 |
| `e` | `luxury` | VIP / 奢華 |

該對照表同步定義在 `src/themes/_registry.ts` 的 `CATEGORY_LETTER_MAP` 常數（型別為
`Record<ThemeCategory, string>`），未來新增 `ThemeCategory` 字面量時，TS 會強制要求補上對應字母。

#### 新增 theme SOP

1. 決定該 theme 的 `categories`，**第一個元素即為主類別**
2. 打開 `src/themes/_registry.ts`，掃描現有同主類別的所有 label，找出最大流水號 `n`
3. 新 theme 的 label 寫成 `<主類別字母><n+1>` 兩位數 + ` · <名稱>`（例如 general 類最大 `a05`，下一個就是 `a06`）
4. 該主類別還沒有 theme → 從 `01` 起算
5. 編號**一旦發布後不再改動**（重編會打散 sales demo 對外展示的順序記憶）

#### 現有 theme 編號對照（72 個）

| label | key | 主類別 |
|---|---|---|
| `a01 · 霓虹` | `at99` | general |
| `a02 · 藍冰大亨` | `tycoon` | general |
| `a03 · 88WIN` | `honest-max` | general |
| `a04 · 瀑布流` | `dahsing-waterfall` | general |
| `a05 · 分頁` | `dahsing-tabs` | general |
| `a06 · 大亨排行榜` | `daheng-rank` | general |
| `a07 · 大亨滿版宮格` | `daheng-grid` | general |
| `a08 · 大亨橫向滑軌` | `daheng-rail` | general |
| `a09 · 大亨三欄密集` | `daheng-compact` | general |
| `a10 · 大亨清單榜單` | `daheng-list` | general |
| `a11 · 大亨雜誌精選` | `daheng-magazine` | general |
| `a12 · 富遊大亨` | `fuyou` | general |
| `a13 · 大亨霓虹電競` | `daheng-neon` | general |
| `a14 · 大亨翡翠金典` | `daheng-emerald` | general |
| `a15 · 大亨清新活力` | `daheng-fresh` | general |
| `a16 · 大亨夜空樂園` | `daheng-night` | general |
| `a17 · 大亨曜黑燙金` | `daheng-onyx` | general |
| `a18 · 大亨奶油珊瑚` | `daheng-coral` | general |
| `a19 · 大亨赤焰紅金` | `daheng-crimson` | general |
| `a20 · 大亨鈦灰琥珀` | `daheng-titan` | general |
| `a21 · 大亨冰川晨藍` | `daheng-glacier` | general |
| `a22 · 大亨湛藍電競` | `daheng-flux` | general |
| `a23 · 大亨紫晶夜宴` | `daheng-amethyst` | general |
| `a24 · 大亨蒼翠金典` | `daheng-verdant` | general |
| `a25 · 大亨赤金盛宴` | `daheng-scarlet` | general |
| `a26 · 大亨鈷藍活力` | `daheng-cobalt` | general |
| `a27 · 大亨碧波大廳` | `daheng-teal` | general |
| `a28 · 大亨落日霓虹` | `daheng-sunset` | general |
| `b01 · AT99` | `honest-at` | slots |
| `b02 · AT Deluxe` | `at-deluxe` | slots |
| `b03 · 大亨電漿電子` | `daheng-plasma` | slots |
| `b04 · 大亨墨鋼電子` | `daheng-sable` | slots |
| `b05 · 大亨象牙電子` | `daheng-ivory` | slots |
| `c01 · 暖金` | `noya` | live |
| `c02 · FG` | `honest-no6` | live |
| `c03 · 橫向列表` | `dahsing-horizontal` | live |
| `c04 · 諾亞米色` | `noya-beige` | live |
| `c05 · 諾亞藍` | `noya-blue` | live |
| `c06 · 諾亞翡翠` | `noya-jade` | live |
| `c07 · 諾亞晨曦` | `noya-dawn` | live |
| `c08 · 諾亞琉金` | `noya-lux` | live |
| `c09 · 諾亞櫻` | `noya-sakura` | live |
| `c10 · 諾亞極光` | `noya-aurora` | live |
| `c11 · 諾亞墨竹` | `noya-ink` | live |
| `c12 · 諾亞鈦銀` | `noya-steel` | live |
| `c13 · 諾亞珊瑚` | `noya-reef` | live |
| `c14 · 諾亞星夜` | `noya-starlit` | live |
| `c15 · 諾亞薄荷` | `noya-mint` | live |
| `c16 · 諾亞膠囊` | `noya-pill` | live |
| `c17 · 諾亞圓標` | `noya-orbit` | live |
| `c18 · 諾亞葉瓣` | `noya-petal` | live |
| `c19 · 諾亞稜形` | `noya-rhombus` | live |
| `c20 · 諾亞蜂巢` | `noya-hive` | live |
| `c21 · 諾亞側燈` | `noya-beacon` | live |
| `c22 · 諾亞浮丸` | `noya-bubble` | live |
| `c23 · 諾亞書籤` | `noya-bookmark` | live |
| `c24 · 諾亞方磚` | `noya-squircle` | live |
| `c25 · 諾亞分線` | `noya-tabline` | live |
| `c26 · 諾亞礁湖` | `noya-lagoon` | live |
| `c27 · 大亨蜜桃真人` | `daheng-peach` | live |
| `c28 · 大亨霜藍真人` | `daheng-frost` | live |
| `c29 · 大亨緋櫻真人` | `daheng-blush` | live |
| `c30 · 大亨霧青真人` | `daheng-mist` | live |
| `c31 · 大亨蘭夜真人` | `daheng-orchid` | live |
| `d01 · 體育博彩` | `ant-sport` | sports |
| `d02 · 大亨青銅競技` | `daheng-bronze` | sports |
| `d03 · 大亨金盞體育` | `daheng-marigold` | sports |
| `d04 · 大亨鋼藍競技` | `daheng-slate` | sports |
| `e01 · 越南 VIP` | `vietvip` | luxury |
| `e02 · 5D` | `fived` | luxury |
| `e03 · 大亨曜金尊爵` | `daheng-obsidian` | luxury |
| `e04 · 大亨紅寶尊榮` | `daheng-ruby` | luxury |

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
├── dahsing-horizontal/      # 大亨橫向列表（C 版）
├── daheng-shared/           # 棕金大亨 6 版型共用基底（不註冊為 theme，只匯出元件）
│   ├── _data.ts             # 8 張 asset URL + GAMES / RANKS / CATS / CHIPS / TAB_ITEMS 共用資料
│   ├── assets/              # hero / trophy / ch-mascot / ch-dg / ch-panda / ch-qt / ch-ofa / ch-rsg 共 8 張
│   └── atoms/               # 9 個 mobile 共用 atoms（statusbar / header / hero / marquee / cats-row / cats-grid / chips / sec-head / promo / tabbar / cat-icon / tab-icon）
├── daheng-rank/             # 大亨排行榜（a06，v1 對齊）；PC：左 sidebar + 中央 hero + 排行榜橫向卡片帶 + 右 promo 側欄
├── daheng-grid/             # 大亨滿版宮格（a07，v2 對齊）；PC：mega header + 全幅 hero + 4 欄宮格牆 + promo 橫條
├── daheng-rail/             # 大亨橫向滑軌（a08，v3 對齊）；PC：carousel hero（左大圖+右縮圖列）+ 三段大型分欄
├── daheng-compact/          # 大亨三欄密集（a09，v4 對齊）；PC：dashboard 風格（左 menu + 中央 6 欄密集 grid + 右 panel）
├── daheng-list/             # 大亨清單榜單（a10，v5 對齊）；PC：leaderboard 主題頁（top 3 大卡 + 表格式榜單含玩家數/賠率/趨勢）
├── daheng-magazine/         # 大亨雜誌精選（a11，v6 對齊）；PC：雜誌封面風（大封面 banner + 編輯精選 + 4 欄 masonry）
├── fuyou/                   # 富遊大亨（a12，深藍金賭場入口）；desktop 1:1 對齊富遊原稿桌機 6 段，mobile 為「新做」app 式佈局
│   ├── _data.ts             # nav/tabs/遊戲卡/服務卡/footer 廠商/跑馬燈 共用資料 + hero/hotgame/app 三張圖 URL
│   └── assets/              # hero / hotgame / app / card_dg / card_allbet
├── noya-beige/              # 諾亞米色（c04，暖橘米調真人廳）；mobile 1:1 復刻原稿手機切片版，desktop 為「新做」（參考富遊桌機結構 + 米色配色）
│   ├── _data.ts             # 5 大類 lobby + 各分類卡片 + footer 廠商 共用資料 + 切片圖 URL（logo/headright/notice/actions/nav/card-*/g1..g6/promo）
│   └── assets/              # 諾亞米色手機切片素材（與原稿同批）
├── noya-blue/               # 諾亞藍（c05，深海軍藍真人廳）；mobile 1:1 復刻原稿手機 inline-SVG 版，desktop 為「新做」（參考富遊桌機結構 + 深藍配色）
│   ├── _data.ts             # 5 大類 lobby + 各分類卡片（藍漸層佔位卡含水印籌碼）+ 快捷/底部 tab + footer 廠商 共用資料
│   └── assets/              # hero / card-dg / card-allbet（live 卡切片，其餘為 inline 樣式）
├── daheng-neon/             # 大亨霓虹電競（a13，深藍 + 青/紫霓虹，dark）；對齊 AWD 版型A，desktop = 原稿 ≥960px 左 sidebar 佈局，mobile = 原稿 <960px 頂欄 + 底部 5 tab
│   ├── _data.ts             # sideNav / quick / 遊戲大廳 tabs+grid（8 卡）/ 即時派彩 / promo / 公告 / footer 共用資料 + hero + 8 張遊戲卡圖 URL
│   └── assets/              # hero_banner + ch_dg/ch_panda/ch_rsg/ch_qt/ch_ofa + g2/g3/g4
├── daheng-emerald/          # 大亨翡翠金典（a14，墨綠 + 金襯線古典，dark）；對齊 AWD 版型B，desktop = 置中容器 + 水平 nav + 直式卡 + 中獎榜/優惠 duo + VIP，mobile = 直式卡 2 欄 + 固定底部 tab
│   ├── _data.ts             # topNav / 遊戲大廳 tabs+grid / 中獎榜 6 列 / 優惠 banner / VIP / footer 共用資料 + hero + trophy + 8 張遊戲卡圖
│   └── assets/              # hero_banner + 8 張遊戲卡 + trophy_cut（優惠 banner 裝飾）
├── daheng-fresh/            # 大亨清新活力（a15，藍白淺色 + 橘點綴，light）；對齊 AWD 版型C，desktop = hero+sideStack/氣泡/彩金池/grid/中獎跑馬/優惠/APP banner，mobile = 2 欄 grid + 浮動圓角底部 tab
│   ├── _data.ts             # topNav / hero mini / 分類氣泡 / 中獎跑馬 / 彩金池 / 遊戲大廳 grid / 優惠 / footer 共用資料 + hero + 8 張遊戲卡圖
│   └── assets/              # hero_banner + 8 張遊戲卡
├── daheng-night/            # 大亨夜空樂園（a16，深紫夜空 + 金/紫高光 social-casino 手遊，dark）；對齊 AWD 版型D，JS 驅動 SVG 場景，desktop = HUD 頂欄 + canvas 星空 + GRAND JACKPOT + SVG 遊戲卡，mobile = 底部 5 tab（中間 jackpot 凸出金球）；全 inline SVG 無 PNG，無 assets/
│   └── _data.ts             # nav / GRAND JACKPOT / SVG 場景遊戲卡（feat 大卡 + HOT/NEW ribbon）/ 促銷輪播 / 中獎跑馬 共用資料
├── daheng-onyx/             # 大亨曜黑燙金（a17，近黑 + 燙金細框古典，dark）；對齊 AWD 版型E，desktop = 水平 nav + hero 金雙框 + 八角徽章 8 入口 + 拱門卡 6 + 尊榮禮遇 3，mobile = 八角徽章排最前 + 拱門卡 2 欄 + 底部 dock
│   ├── _data.ts             # topNav / 八角徽章 8 入口 / hero / 拱門卡熱門館別 6 / 尊榮禮遇優惠 3 / footer 共用資料
│   └── assets/              # hero_banner + 館別 / 優惠切片素材
├── daheng-coral/            # 大亨奶油珊瑚（a18，奶油近白 + 珊瑚暖橙，light）；對齊 AWD 版型F，desktop = 左 220px 側欄 + 主欄（hero/簽到卡/squircle 大卡 3 欄/橫向優惠），mobile = 膠囊分類列 + 卡 2 欄 + 底部 dock 膠囊
│   ├── _data.ts             # sideNav / hero / 每日簽到 / squircle 圓角大卡遊戲 / 橫向優惠卡 / footer 共用資料
│   └── assets/              # hero_banner + 遊戲卡 / 優惠切片素材
├── daheng-crimson/          # 大亨赤焰紅金（a19，深紅 radial + 三階金喜慶，dark）；對齊 AWD 版型G，desktop = 頂欄 nav + 錢幣圓形 8 入口 + hero 金邊 ribbon + 燈籠拱形卡 6 + 紅包優惠 3，mobile = 錢幣入口排最前 + 燈籠卡 2 欄 + 底部 dock
│   ├── _data.ts             # topNav / 錢幣圓形 8 入口 / hero ribbon / 燈籠拱形卡熱門館別 6 / 紅包優惠 3 / footer 共用資料
│   └── assets/              # hero_banner + 燈籠 / 錢幣 / 紅包切片素材
├── daheng-titan/            # 大亨鈦灰琥珀（a20，鈦灰深底 + 琥珀金屬雙描邊，dark）；對齊 AWD 版型H，desktop = 左側類別 rail 橫展 170px sticky + 內容（熱門館別斜切卡 3~4 欄/壓縮 banner/3 數據條），mobile = 窄 64px 圖示 rail + 卡 2 欄 + 底部 dock；熱門館別排在 hero 之前
│   ├── _data.ts             # 類別 rail / 熱門館別圓角斜切卡 / 壓縮 banner / 3 數據條 / footer 共用資料
│   └── assets/              # banner + 館別切片素材
├── daheng-glacier/          # 大亨冰川晨藍（a21，純白卡片 + 淺藍漸層底清爽，light）；對齊 AWD 版型I，desktop = 內容欄 + 右側類別 rail 78px sticky（人氣館別圓頂雪窗卡 3~4 欄/壓縮 banner/橫向優惠），mobile = 右側窄 rail + 卡 2 欄 + 底部 dock 膠囊；熱門館別排在 hero 之前
│   ├── _data.ts             # 類別 rail / 本週人氣館別圓頂雪窗卡 / 壓縮 banner / 橫向優惠 / footer 共用資料
│   └── assets/              # banner + 館別切片素材
├── noya-jade/               # 諾亞翡翠（c06，深綠玻璃底 + 翡翠綠金描邊，dark）；參考 c03/c04/c05「左分類按鈕欄 + 右卡片頁面」雙欄真人廳變體
├── noya-dawn/               # 諾亞晨曦（c07，蜜桃暖光淺底 + 圓潤按鈕欄，light）
├── noya-lux/                # 諾亞琉金（c08，曜黑底 + 香檳燙金細邊 + 金框真人卡，dark）
├── noya-sakura/             # 諾亞櫻（c09，櫻粉柔美淺底 + 花瓣感按鈕欄，light）
├── noya-aurora/             # 諾亞極光（c10，深空底 + 霓虹描邊 + 青紫高光卡，dark）
├── noya-ink/                # 諾亞墨竹（c11，宣紙米白底 + 墨竹翠水墨按鈕欄 + 東方留白卡，light）
├── noya-steel/              # 諾亞鈦銀（c12，鈦灰金屬深底 + 琥珀雙描邊，dark）
├── noya-reef/               # 諾亞珊瑚（c13，奶油淺底 + 珊瑚橙圓潤按鈕欄，light）
├── noya-starlit/            # 諾亞星夜（c14，深紫星空底 + 星點描邊 + 夢幻紫光卡，dark）
├── noya-mint/               # 諾亞薄荷（c15，清爽白底 + 薄荷綠圓角按鈕欄，light）
├── noya-pill/               # 諾亞膠囊（c16，米色暖底 + 直欄膠囊按鈕欄，ly1，light）
├── noya-orbit/              # 諾亞圓標（c17，米色暖底 + 正圓圖標導航 + 圖在上雙欄卡，ly2，light）
├── noya-petal/              # 諾亞葉瓣（c18，乳白底 + 葉片不對稱圓角按鈕欄 + 斜切漸層卡，ly3，light）
├── noya-rhombus/            # 諾亞稜形（c19，亮白紫底 + 平行四邊形斜切按鈕欄 + 斜切卡，ly4，light）
├── noya-hive/               # 諾亞蜂巢（c20，近白翡翠底 + 六角蜂巢按鈕欄，ly5，light）
├── noya-beacon/             # 諾亞側燈（c21，近白霧藍底 + 窄條側燈指示按鈕欄，ly6，light）
├── noya-bubble/             # 諾亞浮丸（c22，米色暖底 + 全圓藥丸交錯按鈕欄 + 大圓角卡，ly7，light）
├── noya-bookmark/           # 諾亞書籤（c23，暗金底 + 書籤箭頭摺角按鈕欄 + 角標卡，ly8，light）
├── noya-squircle/           # 諾亞方磚（c24，亮白米底 + Squircle 大圓角方磚按鈕欄 + 玻璃高光卡，ly9，light）
└── noya-tabline/            # 諾亞分線（c25，米色極簡底 + 純文字側線/頂分頁 + 留白卡，ly10，light）
```

> **fuyou / noya-beige / noya-blue 三 theme 的「跨裝置補做」規約**：
> - 來源稿只有單一裝置 → 另一裝置「新做」並參考對向設計稿的版面結構，但配色與內容沿用該稿自己的調性
> - fuyou 來源是桌機稿 → mobile 新做 app 式（參考兩份諾亞手機版佈局，深藍金配色 + 富遊內容）
> - noya-beige / noya-blue 來源是手機稿 → desktop 新做（參考富遊桌機 top nav / hero / 熱門遊戲 grid / 下載 / 服務 / footer，各自米色 / 深藍配色 + 諾亞內容）
> - 三 theme 的 header logo 都接 `useDemoThemeStore().currentLogo`，不寫死品牌，FAB / showcase logo 切換器可換 logo

> **daheng-neon / daheng-emerald / daheng-fresh 三 theme 的「AWD 完整響應式」規約**：
> - 來源稿（大亨_AWD 版型A/B/C）本身即「桌機 sidebar/置中 + 手機底部 tab」單檔響應式，**不需跨裝置補做**，忠實拆成 desktop / mobile 兩 SFC 即可
> - desktop = 原稿 ≥960px 佈局（A 版左 sidebar + 主內容多欄 grid + duo；B/C 版置中容器 + 水平 nav）；mobile = 原稿 <960px 佈局（頂欄 + 內容 + 固定底部 5 格 tab）
> - 兩者共用同一份 `_data.ts`（hero / 公告 / quick / 遊戲大廳 tabs+grid / 優惠 / 即時派彩或中獎榜 / footer）
> - 原稿那顆 A/B/C/D 版型切換浮標（.vswitch）是 mockup 自己的導覽，**未移植**；版型D（紫色手遊）無來源 HTML，本批不做
> - 三 theme 各自帶 assets（hero + 8 張遊戲卡；emerald 額外帶 trophy），不共用 daheng-shared
> - header / sidebar logo 都接 `useDemoThemeStore().currentLogo`，不寫死 logo_cut.png

> **大亨 AWD 第二批 a16~a21 六 theme 規約（版型 D~I）**：
> - 來源稿：`/Users/georgehuang/Downloads/daheng_awd_assets` 內版型 D~I 六份 AWD 完整響應式 HTML，續第一批（A/B/C → a13~a15）
>   - D 紫色手遊（夜空樂園，JS 驅動 social-casino）→ `daheng-night`（a16）
>   - E 曜黑燙金 → `daheng-onyx`（a17）／ F 奶油珊瑚 → `daheng-coral`（a18）
>   - G 赤焰紅金 → `daheng-crimson`（a19）／ H 鈦灰琥珀 → `daheng-titan`（a20）／ I 冰川晨藍 → `daheng-glacier`（a21）
> - 全部 general 類，logos 統一 `SHARED_LOGOS`、`defaultLogo = dahsing`，previews 採 `buildPreviews`（不帶 colorPreviews，缺截圖由 `getPreview` fallback 不破圖）
> - **排程分批上架**（每天 2 版，起始日 6/12）：6/12 `daheng-night` + `daheng-onyx`；6/13 `daheng-coral` + `daheng-crimson`；6/14 `daheng-titan` + `daheng-glacier`（`releaseDate` 控主頁顯示，`/demo/<key>` 直連與 `?bypass` query 不擋）
> - 原稿 A/B/C/D 版型切換浮標（.vswitch）**未移植**
> - `daheng-night`（版型 D）為 **JS 驅動 SVG 場景**：canvas 星空粒子背景 + 全 inline SVG 遊戲卡，無 PNG 素材，無 `assets/` 目錄；其餘 5 theme 各自帶 `assets/`
> - 每個 theme 各自帶 `assets`，不共用 daheng-shared；header / sidebar / rail logo 都接 `useDemoThemeStore().currentLogo`

> **諾亞真人視訊第二批 c06~c15 十 theme 規約（live 類）**：
> - 設計主軸：參考既有 `c03`（橫向列表）/ `c04`（諾亞米色）/ `c05`（諾亞藍）的「左分類按鈕欄 + 右卡片頁面」雙欄真人廳結構，做 10 個精緻配色 / 質感變體
>   - 5 dark：`c06 noya-jade` 翡翠 / `c08 noya-lux` 琉金 / `c10 noya-aurora` 極光 / `c12 noya-steel` 鈦銀 / `c14 noya-starlit` 星夜
>   - 5 light：`c07 noya-dawn` 晨曦 / `c09 noya-sakura` 櫻 / `c11 noya-ink` 墨竹 / `c13 noya-reef` 珊瑚 / `c15 noya-mint` 薄荷
> - 每個 theme 完全自包含（desktop.vue / mobile.vue / _tokens.scss / _variants.scss / _data.ts / index.ts / assets），不共用 shared 目錄
> - 全部 live 類，logos 統一 `SHARED_LOGOS`、`defaultLogo = umu`（諾亞品牌調性），previews 採 `buildPreviews`（不帶實際色變體截圖，缺檔由 `getPreview` fallback 不破圖）
> - 每款各帶三色票（default + 兩變體），color machine key 已與各自 `_tokens` 預設區塊、`_variants` 的 `[data-theme-color="xxx"]` 逐一核對一致
> - **排程分批上架**（每天 2 版，起始日 6/15）：6/15 `noya-jade` + `noya-dawn`；6/16 `noya-lux` + `noya-sakura`；6/17 `noya-aurora` + `noya-ink`；6/18 `noya-steel` + `noya-reef`；6/19 `noya-starlit` + `noya-mint`（`releaseDate` 控主頁顯示，`/demo/<key>` 直連與 `?preview=1` query 不擋）

> **諾亞真人視訊第三批 c16~c25 十 theme 規約（live 類）**：
> - 來源稿：設計稿「諾亞_遊戲區塊_10款版型.html」ly1 ~ ly10，每款以不同的「左分類按鈕造形 + 右遊戲卡片頁面」詮釋同一套真人廳結構
>   - `c16 noya-pill` 膠囊（ly1，直欄膠囊按鈕欄）/ `c17 noya-orbit` 圓標（ly2，正圓圖標導航 + 圖在上雙欄卡）
>   - `c18 noya-petal` 葉瓣（ly3，葉片不對稱圓角按鈕 + 斜切漸層卡）/ `c19 noya-rhombus` 稜形（ly4，平行四邊形斜切按鈕 + 斜切 clip-path 卡）
>   - `c20 noya-hive` 蜂巢（ly5，六角蜂巢按鈕欄）/ `c21 noya-beacon` 側燈（ly6，窄條側燈指示按鈕欄）
>   - `c22 noya-bubble` 浮丸（ly7，全圓藥丸交錯按鈕 + 大圓角卡）/ `c23 noya-bookmark` 書籤（ly8，書籤箭頭摺角按鈕 + 角標卡）
>   - `c24 noya-squircle` 方磚（ly9，Squircle 大圓角方磚按鈕 + 玻璃高光卡）/ `c25 noya-tabline` 分線（ly10，純文字側線/頂分頁 + 留白卡）
> - 每個 theme 完全自包含（desktop.vue / mobile.vue / _tokens.scss / _variants.scss / _data.ts / index.ts / assets），不共用 shared 目錄
> - 全部 live 類、全 10 款皆 `brightness=light`，logos 統一 `SHARED_LOGOS`、`defaultLogo = umu`（諾亞品牌調性），previews 採 `buildPreviews`（不帶實際色變體截圖，缺檔由 `getPreview` fallback 不破圖）
> - 每款各帶三色票（default + 兩變體，色源共用 米橘 #c66a3c / 玫瑰 #c75f5a / 翡翠 #3f8a6e / 霧藍 #5a6f9d / 梅紫 #9d4f86 / 暗金 #9a7d3a 六色），color machine key 已與各自 `_tokens` 預設區塊、`_variants` 的 `[data-theme-color="xxx"]` 逐一核對一致（本批 10 款全對齊無修正）
> - **排程分批上架**（每天 2 版，起始日 6/20）：6/20 `noya-pill` + `noya-orbit`；6/21 `noya-petal` + `noya-rhombus`；6/22 `noya-hive` + `noya-beacon`；6/23 `noya-bubble` + `noya-bookmark`；6/24 `noya-squircle` + `noya-tabline`（`releaseDate` 控主頁顯示，`/demo/<key>` 直連與 `?preview=1` query 不擋）

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
5. **驗證**：`yarn build` 跑過後到 `/demo/<your-key>` 看效果（demo 路由格式：`/demo/:layoutkey`）

> **複用佈局殼 + hue-rotation 新配色（v4.11，20 套一次新增）**：
> 為壓低 build 體積 / 避免 GitHub Pages CI OOM（現有 52→72 套），本批新 theme **不新增 desktop/mobile.vue**，
> 而是 registry 的 `desktop` / `mobile` lazy import **直接指向既有 daheng AWD 佈局殼**（如 `() => import("./daheng-neon/desktop.vue")`），
> 每套只新增 `_tokens.scss` + `_variants.scss` 兩個 SCSS 檔（零新 JS chunk）。
> 配色為對應殼原稿調色盤的 **hue-rotation**（保留 L / C / 對比，只換色相 → 暗底維持暗、亮底維持亮、切色不破圖）。
> **鐵則**：複用殼時，新 theme 的 `_tokens.scss` 必須完整重寫該殼 token 契約的**每一個 token**
> （不只 12 個公用 var，還有殼元件實讀的所有結構 token，如 `--bg-2` / `--glow-c` / `--coin-face` / `--radius-card`…），
> 缺一即該殼只在此 theme 破圖。變體 `_variants.scss` 亦逐色重寫整份 token body，避免切色殘色。
> 本批 20 套（複用殼）：
> - general：`daheng-flux`(neon) `daheng-amethyst`(night) `daheng-verdant`(emerald) `daheng-scarlet`(crimson) `daheng-cobalt`(fresh) `daheng-teal`(glacier) `daheng-sunset`(neon)
> - slots：`daheng-plasma`(neon) `daheng-sable`(onyx) `daheng-ivory`(emerald)
> - live：`daheng-peach`(coral) `daheng-frost`(glacier) `daheng-blush`(coral) `daheng-mist`(titan) `daheng-orchid`(night)
> - sports：`daheng-bronze`(titan) `daheng-marigold`(fresh) `daheng-slate`(titan)
> - luxury：`daheng-obsidian`(onyx) `daheng-ruby`(crimson)
> 產生腳本：一次性 hue-rotation 生成器（不進 repo，紀錄於 ADR）。

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

#### dahsing 三 theme 擴充 token（6 個，dahsing-shared 元件用）

dahsing-waterfall / tabs / horizontal 共用 sidebar / hot-bar / 卡片 fire tag / phone-frame / flag 等元素，這些視覺特性不在 12 必要 var 內，獨立成 6 個擴充 token；其他 theme 沒這些元素不需提供。三 theme 的 `_tokens.scss` 與每組 `_variants.scss` 都會列出對應色，元件層用 `var(--xxx, fallback)` 模式，未升級配置仍可運作。

| Var | 用途 | hard-code 位置（已 token 化） |
|---|---|---|
| `--gradient-nav-active` | sidebar item / icon active 漸層（0deg 由下到上） | `dahsing-shared/atoms/dahsing-sidebar.vue` |
| `--gradient-hot-ribbon` | hot-bar 左上 HOT 角標漸層 | `dahsing-shared/atoms/dahsing-hot-bar.vue` |
| `--gradient-fire-tag` | 卡片 fire / hot 紅橘小徽章漸層 | `dahsing-waterfall/sections/dahsing-waterfall-wall.vue`、`dahsing-horizontal/sections/dahsing-horizontal-row.vue` |
| `--shadow-phone` | mobile phone-frame 雙側陰影 | `dahsing-{waterfall,tabs,horizontal}/mobile.vue` |
| `--text-caption-en` | 卡片英文小標題色（落在黑遮罩上的淺色文字） | `dahsing-waterfall-wall.vue`、`dahsing-horizontal-row.vue` |
| `--gradient-flag-bg` | mobile-header / pc-topbar 圓形旗子色塊 radial 漸層 | `dahsing-mobile-header.vue`、`dahsing-shared/desktop/dahsing-pc-topbar.vue` |

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
- **URL 同步**：color 與 URL `?color=` query 雙向同步，用 `router.replace` 不污染 history（layout 由路由 path `/demo/:layoutkey` 鎖定，FAB 不切 layout）
- **多 fallback**：URL query > localStorage > 預設值

### 切換版面的 URL 範例

> Demo 頁路由格式：`/demo/:layoutkey?color=<colorKey>`（layoutkey 為 path 參數，color 為 query；color 省略時取該 theme 第一組配色）

- `/demo/noya?color=sunset` — noya 版面 + 日落橘配色
- `/demo/at99?color=neon-purple` — at99 版面 + 霓虹紫配色
- `/demo/dahsing-waterfall` — 大亨瀑布流（米橘預設）
- `/demo/dahsing-waterfall?color=copper` — 大亨瀑布流（copper 經典）
- `/demo/dahsing-tabs` — 大亨分頁切換
- `/demo/dahsing-horizontal` — 大亨橫向列表

諾亞真人視訊第二批（c06~c15，依排程上架；上架前可帶 `?preview=1` 直連預覽）：

- `/demo/noya-jade` — c06 諾亞翡翠（翡翠綠金，dark）
- `/demo/noya-dawn` — c07 諾亞晨曦（蜜桃晨曦，light）
- `/demo/noya-lux` — c08 諾亞琉金（香檳燙金，dark）
- `/demo/noya-sakura` — c09 諾亞櫻（櫻粉，light）
- `/demo/noya-aurora` — c10 諾亞極光（極光青紫，dark）
- `/demo/noya-ink` — c11 諾亞墨竹（墨竹翠，light）
- `/demo/noya-steel` — c12 諾亞鈦銀（鈦銀琥珀，dark）
- `/demo/noya-reef` — c13 諾亞珊瑚（珊瑚橙，light）
- `/demo/noya-starlit` — c14 諾亞星夜（星夜紫，dark）
- `/demo/noya-mint` — c15 諾亞薄荷（薄荷綠，light）

諾亞真人視訊第三批（c16~c25，移植自設計稿「諾亞_遊戲區塊_10款版型」ly1~ly10，依排程上架；上架前可帶 `?preview=1` 直連預覽）：

- `/demo/noya-pill` — c16 諾亞膠囊（米橘暖調，light，ly1）
- `/demo/noya-orbit` — c17 諾亞圓標（米橘暖調，light，ly2）
- `/demo/noya-petal` — c18 諾亞葉瓣（玫瑰珊瑚，light，ly3）
- `/demo/noya-rhombus` — c19 諾亞稜形（梅紫，light，ly4）
- `/demo/noya-hive` — c20 諾亞蜂巢（翡翠綠，light，ly5）
- `/demo/noya-beacon` — c21 諾亞側燈（霧石板藍，light，ly6）
- `/demo/noya-bubble` — c22 諾亞浮丸（米橘暖調，light，ly7）
- `/demo/noya-bookmark` — c23 諾亞書籤（暗金，light，ly8）
- `/demo/noya-squircle` — c24 諾亞方磚（米橘暖調，light，ly9）
- `/demo/noya-tabline` — c25 諾亞分線（米橘暖調，light，ly10）

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

### Showcase 篩選 + 推薦機制（v4.2）

Showcase 主頁（`/home`）在 hero + logo 切換器下方新增「篩選列」，並依「當前 LOGO 主色 vs 各 theme 主色」自動推薦最搭的 5 個版型。

#### Theme 標籤：明暗 + 業務分類（必填）

每個 `ThemeMeta` 新增兩個必填欄位（registry 拍板，使用者可後續微調）：

- `brightness: "light" | "dark"` — 主調明暗，判定依據是該 theme 的 `bg-base` 是淡白系（light）或深色系（dark）
- `categories: ThemeCategory[]` — 業務分類（多選），union 約束防拼錯。5 個合法值：
  - `sports`（體育）/ `live`（真人）/ `slots`（電子）/ `general`（綜合）/ `luxury`（VIP 豪華）

各 theme 的拍板分配表：

| theme key | brightness | categories | 拍板理由 |
|---|---|---|---|
| `noya` | light | `live` / `luxury` | 米白 + 玫瑰金真人視訊風 |
| `at99` | dark | `general` / `slots` | 深藍霓虹通用大廳 |
| `ant-sport` | light | `sports` | 白底體育博彩專屬 |
| `tycoon` | dark | `general` / `slots` | 藍冰大廳 sidebar + 遊戲列表 |
| `vietvip` | dark | `luxury` / `live` | 深紅金邊 VIP + 真人廳堂 |
| `honest-at` | dark | `slots` / `general` | 深藍霓虹 JACKPOT 老虎機 |
| `honest-max` | light | `general` / `live` | 淡白底多品類大廳含真人 |
| `honest-no6` | dark | `live` / `slots` | 紫黑 girl-model + 老虎機 |
| `at-deluxe` | dark | `slots` / `luxury` | 深藍 radial + JACKPOT 奢華 |
| `fived` | dark | `luxury` / `general` | 深棕暗金禮盒 |
| `dahsing-waterfall` | light | `general` / `slots` | 米橘瀑布流多遊戲縮圖 |
| `dahsing-tabs` | light | `general` / `sports` | 金奧華 subtabs 含體育子分頁 |
| `dahsing-horizontal` | light | `live` / `general` | 米白略紫底 + Netflix 橫滾含真人列 |
| `fuyou` | dark | `general` | 深海軍藍金賭場入口（富遊大亨）|
| `noya-beige` | light | `live` | 近白米底暖橘真人廳（諾亞米色）|
| `noya-blue` | dark | `live` | 深海軍藍玻璃感真人廳（諾亞藍）|
| `daheng-neon` | dark | `general` | 深藍 + 青/紫霓虹電競大廳（大亨霓虹電競）|
| `daheng-emerald` | dark | `general` | 墨綠 + 金襯線古典大廳（大亨翡翠金典）|
| `daheng-fresh` | light | `general` | 藍白淺底 + 橘點綴明快大廳（大亨清新活力）|
| `daheng-night` | dark | `general` | 深紫夜空 + 金/紫高光 social-casino 手遊（大亨夜空樂園）|
| `daheng-onyx` | dark | `general` | 近黑 + 燙金細框古典大廳（大亨曜黑燙金）|
| `daheng-coral` | light | `general` | 奶油近白 + 珊瑚暖橙側欄大廳（大亨奶油珊瑚）|
| `daheng-crimson` | dark | `general` | 深紅 radial + 三階金喜慶大廳（大亨赤焰紅金）|
| `daheng-titan` | dark | `general` | 鈦灰深底 + 琥珀金屬左 rail 大廳（大亨鈦灰琥珀）|
| `daheng-glacier` | light | `general` | 純白卡片 + 淺藍漸層右 rail 大廳（大亨冰川晨藍）|

> 「dahsing-horizontal default 是紫貴族但 bg-base 是 `#faf5fd` 米白略紫」是 light 判定的關鍵。
> 後續若有人覺得 horizontal 應該歸 dark（看 swatch 配色），改 registry 內該 theme 的 `brightness` 即可。

#### 篩選列 UI

`src/components/showcase/showcase-filter-bar.vue` 位於 logo 切換器與卡片 grid 之間：

- **明暗 segmented control**：全部 / 亮色 / 暗色 三選一，預設「全部」
- **排序 segmented control**：由舊到新 / 由新到舊 兩選一，**預設「由舊到新」**
- **類別 chip multi-select**：5 個 chip 可任意組合，OR 邏輯（任一交集即命中），預設全不選等同不篩選
- **右上推薦提示**：說明「卡片帶徽章 = 依當前 LOGO 主色推薦的最佳搭配」
- **清除篩選按鈕**：有任何條件生效時才顯示
- **0 結果提示**：篩選結果為空時顯示「目前條件沒有版型」卡 + 清除篩選 CTA，避免使用者卡住

篩選與排序狀態（`filterBrightness` / `filterCategories` / `sortOrder`）存在 `useShowcaseStore`，**不 persist 到 LS**：屬 per-session 探索行為，重新進站重新自由瀏覽更合適。

#### 排序機制（v4.6，v4.13 加入置頂分區）

主頁版型清單可切換排序方向，**預設「由舊到新」**（sales demo 依開發時間順序掃過所有版型，先看基礎款再看新款）。

- **state**：`useShowcaseStore.sortOrder`（`"oldest" | "newest" | "code"`，預設 `"oldest"`），action `setSortOrder(v)` / `toggleSortOrder()`
- **computed**：`sortedThemes` 以 `filteredThemes` 為 base（已過排程 + 使用者篩選）做穩定排序
  - 排序鍵 tuple = `[releaseDate ?? "0000-00-00", registryIndex]`
  - 沒有 `releaseDate` 的舊 theme 視為「最早」（哨兵 `"0000-00-00"`，它們確實最早建立），彼此 / 與有日期者之間用 `registryIndex`（`listThemes()` 插入順序）當穩定 tiebreaker
  - oldest = 升序；newest = oldest 結果的「精確反向」（`reverse()`，含 tiebreaker），保證雙向順序完全相反
  - code = 依 label 前綴 `a01 → a02 → … → b01 …` 升序
- **置頂分區（v4.13，見 `docs/adr/0003`）**：最新批次（`PINNED_THEME_KEYS` 的 20 套：a22-a28 / b03-b05 / c27-c31 / d02-d04 / e03-e04）**一律浮到最前**，不受排序方向影響。作法：先把 base 依 `isThemePinned` 切成 `pinned` / `rest` 兩區，各自套「當前排序方向」的同一 comparator（`sortWithinPartition`），再 `pinned` 在前、`rest` 在後串接
  - 動機：這 20 套刻意無 `releaseDate`（即時全開），若沿用單一排序會被哨兵歸入「最早」群組排到舊版面之後（實測第 14-33 位），使用者以為沒上線；置頂分區讓「預設 oldest」下 20 套新版面在最前、52 套舊版面維持既有 oldest 相對序在後，且不引入日期閘門（全部可見）
  - 為什麼用 `PINNED_THEME_KEYS`（Set）而非在 `ThemeMeta` 加 `pinned` 欄位：單一來源、集中一處看得到整批、下一批可整批替換；緊鄰 `_registry.ts` 的 themes map 便於 review 對照
  - **下一批新版面上架時**：決定是否把置頂名單換成新批（舊批移出、新批移入），並同步更新本節
- **UI**：`showcase-filter-bar.vue` 的排序 segmented control（與明暗同風格，`role="radiogroup"` + `aria-checked`）
- `home.vue` 的 `visibleThemes` 從 `filteredThemes` 改讀 `sortedThemes`，排程 + 篩選 + 排序 + 置頂四層疊加都生效

#### Logo 推薦演算法

每個 `LogoCandidate` 新增 `mainColor: string`（hex）欄位：

| logo key | mainColor | 取色理由 |
|---|---|---|
| `dahsing` | `#d4a574` | 金字最搶眼（黑底襯托） |
| `umu` | `#3ec1f5` | 藍標佔比較大 |
| `long-heng` | `#2dd4ff` | 青藍底為視覺主導 |

演算法：對當前選定 logo 的 `mainColor` 與每個 theme 的「defaultColor swatch hex」算 **RGB 歐式距離**（`sqrt((r1-r2)² + (g1-g2)² + (b1-b2)²)`），距離最近的 5 個 theme 在卡片右上角加「LOGO 推薦」金色徽章。

為什麼用 RGB 距離而非 CIELAB / HSL：本 demo 只需粗略「色感相近」排序，RGB 三軸最簡單、無依賴；輕微誤差由「最近 5 個」截斷掩蓋。

預期推薦結果（registry 內目前拍板的 swatch 算出）：

| 當前 LOGO | Top 5 推薦版型（由近到遠） |
|---|---|
| `dahsing`（暖金） | `noya` / `fived` / `dahsing-waterfall` / `dahsing-tabs` / `honest-no6` |
| `umu`（青藍） | `at99` / `honest-at` / `tycoon` / `at-deluxe` / `ant-sport` |
| `long-heng`（青藍） | `at99` / `honest-at` / `at-deluxe` / `tycoon` / `ant-sport` |

#### 互動規約

- **推薦徽章不影響卡片點擊**：徽章本身 `pointer-events: none`，整個卡片區仍由 thumb-btn / 「預覽」/「Demo」按鈕負責互動
- **推薦 ∩ 篩選**：篩選後仍出現的推薦 theme 才會帶徽章（推薦集合與篩選集合各自 computed，不互相影響）
- **reactive 更新**：切 logo / 切篩選都用 Pinia computed 重算，不全頁 reload
- **TS union type 防呆**：`ThemeCategory` / `ThemeBrightness` / `BrightnessFilter` 都是 string literal union，拼錯立刻 TS 報錯
- **無障礙**：segmented control 用 `role="radiogroup"` + `aria-checked`、chip 用 `aria-pressed`、徽章用 `role="note"` + `aria-label`

#### 修改篩選分類 / 推薦演算法 SOP

- **改 theme 的 brightness / categories**：只動 `src/themes/_registry.ts`，找到對應 theme 物件改值即可
- **加 / 改 logo mainColor**：改 `SHARED_LOGOS` 對應條目的 `mainColor`；對應到實際 logo 主色越精準推薦越好
- **加新類別**：先在 `src/themes/_types.ts` 的 `ThemeCategory` union 加新字串字面量，再到 store 的 `allCategoryOptions` 加 chip label，最後到 registry 為相關 theme 補上該分類
- **改推薦數量**：改 `src/store/showcase.store.ts` 的 `RECOMMEND_LIMIT`（目前固定 5）
- **改距離演算法**：改 `src/themes/_registry.ts` 的 `colorDistance` 實作（例如換 CIELAB Delta E）；型別簽名穩定，呼叫端不受影響

### 預覽截圖矩陣

`ThemeMeta.previews` 是 `Record<logoKey, { desktop, mobile }>` 結構（default color 截圖鏈），
搭配可選的 `ThemeMeta.colorPreviews`（`Record<colorKey, Record<logoKey, { desktop, mobile }>>`）
用於支援 showcase 預覽 dialog 內的「色切換」能力。

> **格式統一為 WebP**：預覽圖一律 WebP（桌面 1080w、手機原寸、quality 82），由 `scripts/compress-previews.mjs` 一次性把全量 PNG 轉檔（528MB → ~49MB），registry 的 `import.meta.glob` 掃 `@/assets/previews/*.webp`。後續產圖請用已改 WebP 輸出的 `scripts/capture-noya-live-v2-previews.mjs`，或產完 PNG 後跑 `compress-previews.mjs` 補轉，避免目錄混進 PNG。

命名規約（雙規約並存）：

- **default color**：`<themeKey>-<logoKey>-<device>.webp`（既有，不動）
  - 例：`at99-dahsing-desktop.webp`、`noya-umu-mobile.webp`、`ant-sport-long-heng-desktop.webp`、`dahsing-tabs-dahsing-desktop.webp`
- **色變體**：`<themeKey>-<colorKey>-<logoKey>-<device>.webp`（新增於 v4.1）
  - 例：`dahsing-tabs-copper-dahsing-desktop.webp`、`dahsing-waterfall-purple-umu-mobile.webp`、`dahsing-horizontal-gold-long-heng-desktop.webp`
  - 僅 dahsing 三 theme 需要色變體截圖（4 colors × 3 logos × 2 devices = 24 張 / theme，但 default 那組沿用既有檔名，所以實際新增 3 colors × 3 logos × 2 devices = 18 張 / theme）
  - 其他 theme 不需色變體截圖（colorPreviews 欄位未設定，getPreview 自動 fallback 到 default 截圖）

`getPreview(theme, logoKey, device, colorKey?)` helper 內含完整 fallback 鏈：

1. colorKey 為 null / 等於 theme.defaultColor → 走 default 截圖鏈（從 `previews`）
2. colorKey 為非 default 色 → 嘗試 `colorPreviews[colorKey][logoKey][device]`
   - 命中 → 回傳
   - 缺檔 → 試 `colorPreviews[colorKey][theme.defaultLogo][device]`
   - 仍缺 → 退回 default 截圖鏈
3. default 截圖鏈：`previews[logoKey]` → `previews[theme.defaultLogo]` → `previews[theme.logos[0].key]`

任一層都保證命中現有截圖之一，showcase 不會破圖。

#### dahsing 三 theme 色變體截圖補齊清單（QA 接續處理）

每個 dahsing theme 需要 18 張新色截圖（3 非 default colors × 3 logos × 2 devices）：

| theme | default color（既有檔名沿用） | 需新增的色變體 |
|---|---|---|
| `dahsing-waterfall` | `default`（米橘暖系） | `copper` / `gold` / `purple` |
| `dahsing-tabs` | `default`（金奧華） | `beige` / `copper` / `purple` |
| `dahsing-horizontal` | `default`（紫貴族） | `beige` / `copper` / `gold` |

合計 3 theme × 18 張 = **54 張新色變體截圖**，加上既有 18 張 default 截圖共 72 張覆蓋 dahsing 系列。截圖時用「預覽截圖矩陣」章節 SOP（Playwright + domcontentloaded + 顯式 selector wait），URL 上帶 `?color=<colorKey>` 切色再截。

截圖更新流程（qa-screenshots 在 .gitignore 內，腳本不入版控）：

1. 啟動 dev server：`yarn dev`（預設 port 9527）
2. 寫一個 Playwright Node script，對 18 個 (theme, logoKey, device) 組合：
   - `ctx.addInitScript(() => localStorage.setItem('casino-demo:logoKey:v3:<theme>', '<logoKey>'))`
   - `page.goto('http://localhost:9527/demo/<theme>', { waitUntil: 'domcontentloaded' })`
   - 等待對應 theme root selector（`.noya-layout` / `.at99-layout` / `.ant-sport-layout` 或其 `-m-` 手機版）
   - 等字體 ready + 所有 `<img>` load + 滾到底再回頂部觸發 lazy section
   - `page.screenshot({ fullPage: true })`
3. 桌面 viewport 1440×900，手機 viewport 390×844
4. 命名 `<themeKey>-<logoKey>-<device>.webp` 存到 `src/assets/previews/`（桌面截 PNG buffer 後 sharp resize 1080 + webp q82；手機原寸轉 webp）

注意：chrome --dump-dom / chrome headless 之前踩過 mount-race 坑（SPA 還沒 mount 就截、profile 路徑卡 race），務必用 Playwright。
networkidle 在 dev server 下可能因 HMR client polling 永不達成，用 domcontentloaded + 顯式 selector wait 較穩。

### Showcase 卡片即時 HTML 預覽（v4.12 起）

Showcase 卡片縮圖從「靜態 WebP 截圖」升級為「即時 HTML 預覽」：卡片內嵌 iframe
載入該 theme 的獨立預覽頁 `/preview/<key>?color=<defaultColor>&logoKey=<showcaseLogoKey>`，
以 `transform: scale(容器寬 / 1280)`（`transform-origin: top left`）縮到卡片 16:10 框內，
呈現真實版面而非靜態圖。實作與取捨見 `docs/adr/0002`。

效能與退回設計（`showcase-theme-card.vue`）：

- **IntersectionObserver 懶載入**（rootMargin 300px）：iframe 只在卡片進視窗才掛 `src`，
  離開視窗即 `v-if` 卸載——72 套不會同時常駐，捲動不明顯卡頓
- **ResizeObserver**：依縮圖容器實際寬度重算 `scale`，RWD / grid 換欄自適應
- **poster 退回**：既有 WebP 先顯示當底圖，iframe `@load` 完成後淡出蓋上；
  **無 WebP 的新 theme** 用 theme 主色漸層佔位（`getThemeMainSwatch`），絕不破圖
- **iframe 隔離**：`pointer-events: none` + `scrolling=no` + 透明點擊層承接「點縮圖 = 預覽」；
  iframe 是獨立 browsing context，`window.innerWidth = 1280` 恆判為桌機、渲染 desktop.vue
- **WebP 由「唯一縮圖」降為「首屏 poster（選配）」**：新增 theme **不再強制截圖**，
  沒截圖也能靠即時 iframe 顯示真實版面 + 漸層 poster 過渡；既有 WebP 全數保留不刪

> **新增 theme 免再截圖**：v4.12 前每套 theme 都得用 Playwright 補 WebP 縮圖；改即時 HTML 預覽後，
> WebP 只是「載入 iframe 前的 poster 底圖」，缺檔會自動用 theme 主色漸層佔位，不影響卡片可用。

### 詳情 modal 即時 HTML 預覽（v4.13 起）

卡片「預覽」開的 `showcase-preview-dialog.vue`，桌面版 / 手機版兩分頁從靜態 WebP `<img>` 升級為即時 iframe：

- **iframe src**：`/preview/<key>?color=<activeColorKey>&logoKey=<showcaseLogoKey>&device=<previewDevice>`（複用 A9 路由）
- **縮放**：桌機分頁參考視口 `1280×820`、手機分頁 `390×800`，`ResizeObserver` 依 modal 預覽框寬高算 `scale = min(框寬/w, 框高/h)`（contain，最大不放大），viewport 盒 `= dims × scale`，iframe 內在 `dims` 尺寸再 `transform: scale()`（`transform-origin: top left`）填滿盒
- **配色切換即時反映**：點 swatch 改 `?color=` → iframe 重載對應配色真實版面，對所有 `colors>=2` 的 theme 都有效（不再依賴 `colorPreviews` 色截圖）
- **效能**：一次最多掛 1 個 iframe（桌機 / 手機分頁互斥，切分頁改 src 重載），dialog 用 `v-if` 動態 mount、關閉整塊卸載，不需 IntersectionObserver

> **關鍵：手機分頁必須帶 `?device=mobile`。** `useDevice`（`src/utils/use-device.ts`）是「行動 UA **AND** `innerWidth<=768`」兩者皆真才算手機；桌機瀏覽器 UA 下即使把 iframe 縮到 390px 也只會渲染 `desktop.vue`。故手機分頁無法只靠縮窄 iframe 觸發手機版，必須由 modal 明確帶 `?device=`，讓 `/preview` 的 `forcedIsMobile` 強制渲染對應版面（未帶 `device` 時沿用 inject 的 `isMobile`，獨立分享連結行為不變）。動機與取捨見 `docs/adr/0003`。

### Showcase 圖片 Lazy-Load 機制

Showcase 主頁（`/home` 路由，根據 vue-router 自動產生規則 `src/pages/default/home.vue` → `/home`）
會一次渲染全部 theme 卡片；卡片縮圖與詳情 dialog 皆已改為即時 iframe（見上節與下節）：

| 元件 | 預覽用途 | 機制 |
|---|---|---|
| `showcase-theme-card.vue` | 卡片縮圖（**即時 iframe** + WebP/漸層 poster） | IntersectionObserver 懶載入 + poster `loading="lazy"` + `decoding="async"` |
| `showcase-preview-dialog.vue` | 詳情 modal 預覽（desktop / mobile 分頁，含 color 切換） | **即時 iframe**（`transform: scale` 縮框）+ `loading="lazy"` + spinner overlay |

設計重點：

- **only below-the-fold**：`showcase-hero` 沒有 `<img>`，`showcase-logo-switcher` 的
  logo 圖在首屏 above-the-fold（hero 下方平鋪 row），**不加 lazy** 以免閃爍
- **防 CLS**：theme-card 縮圖容器 `.theme-card__thumb` 已用 `aspect-ratio: 16 / 10`
  穩定佔位，iframe / poster 載入前後不會跳版。新增 `<img>` 時遵守同原則：用 CSS aspect-ratio
  或父容器固定尺寸佔位，**不要**靠 width/height attribute（CSS aspect-ratio 會蓋掉）
- **`decoding="async"`**：把圖片解碼工作丟到非主執行緒，捲動與切換 tab 時更順
- **dialog 內的圖**：dialog 用 `v-if` 動態 mount，理論上只在開啟時才下載；
  仍保留 `loading="lazy"` 作為「快速 desktop ↔ mobile / color swatch 切換時」的瀏覽器排程保險
- **dialog 切換 loading state**（v4.1 新增）：dialog 內 `previewSrc` 變化（切 device / logo / color）會觸發
  `imgLoading = true`，期間圖片 opacity:0 + spinner 顯示在同位置；`<img @load>` 觸發 `imgLoading = false` 淡入新圖。
  用 opacity 控制而非 v-if 切換 `<img>`，避免瀏覽器丟掉背景已下載的請求
- **嚴禁 preload / prefetch**：getPreview helper 只回 URL 字串，不會 runtime 預抓；
  buildPreviews 用 `import.meta.glob` 是 **build-time** URL 解析（每張圖各自 emit 為 hashed asset），
  不是 runtime 預抓。任何 `<link rel="prefetch">` / `new Image()` / `fetchpriority="high"` 都不該出現在 showcase 相關元件

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

- **共用基底**：`src/themes/dahsing-shared/` 含 8 個 mobile atoms（mobile-header / hero-banner / marquee / sidebar / sec-head / hot-bar / tab-bar / mini-icon）+ 桌面 sticky topbar；8 張 asset（hero / trophy / ch-* 6 張遊戲縮圖）集中於 `dahsing-shared/assets/`，三 theme 引用同一份不重複 emit
- **mobile 1:1 對齊原稿 HTML**：來源檔案 `/Users/georgehuang/Downloads/images 2/大亨首頁-版型{A 瀑布流,B 分頁,C 橫向列表} (1).html`，DOM 結構 / class 語意 / 卡片尺寸（wcard.t img 182px、wcard.s img 128px、tcard 138px、hcard 132×152、feat 230×152）嚴格對齊
- **桌面三 theme 風格差異化**（無原稿，自主設計，借鑑既有 theme pattern）：
  - dahsing-waterfall：Pinterest-style 4 欄 masonry（mobile 2 欄延伸）
  - dahsing-tabs：Steam-style 全寬 subtabs + 3 欄 tgrid
  - dahsing-horizontal：Netflix-style 4 列橫滾（mobile 3 列 + 加一列電子）
- **配色（三 theme default 分離 + 4 套色可切換）**：為了讓 showcase 主頁三張預覽卡片視覺差異更明顯，三 theme 各自的 default 配色不同：
  - `a04 · 瀑布流`（waterfall）：default = **米橘暖系**（主背景 `#fdfdfc` / nav 未 active 底 `#fcf7f4` + 文字 `#bb7353` / nav active 漸層 `linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%)`，0deg = 由下到上）
  - `a05 · 分頁`（tabs）：default = **金奧華**（主色 `#c9a227` 經典金 / bg-base `#fffdf5` 米金白 / nav active 漸層 `linear-gradient(0deg, #faf1d4 0%, #c9a227 100%)`）
  - `c03 · 橫向列表`（horizontal）：default = **紫貴族**（主色 `#6a1b9a` 深紫 / bg-base `#faf5fd` 米白略紫 / nav active 漸層 `linear-gradient(0deg, #f1e4f7 0%, #6a1b9a 100%)`）
  - 每 theme 都提供 4 套 colorKey 可切（自己 default + 另外 3 套），`_variants.scss` 內 selector 對應如下：
    - waterfall：`default(米橘) / copper / gold / purple`
    - tabs：`default(金) / beige(米橘) / copper / purple`
    - horizontal：`default(紫) / beige(米橘) / copper / gold`
  - **colorKey 統一保留 `default`** 而非用語意名（如 `gold`）：維持向下相容（既有 `?color=default` URL / FAB localStorage 殘留仍命中），label 則顯示語意名（「米橘暖系」/「金奧華」/「紫貴族」）
  - **切色不殘留**：每個 variant 都覆寫 12 必要 var + 6 個 dahsing 擴充 token（sidebar / HOT ribbon / fire tag / phone-frame / 英文字 / flag）；漏寫會看到 sidebar nav active 還是前一色
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

dahsing 三版型已補齊 18 張預覽截圖（3 theme × 3 logoKey × 2 device），存於 `src/assets/previews/dahsing-{waterfall,tabs,horizontal}-{dahsing,umu,long-heng}-{desktop,mobile}.png`，registry 透過 `buildPreviews()` helper + `import.meta.glob` 自動命中（與其他 theme 一致）。再次產截圖時沿用「預覽截圖矩陣」章節 SOP：等待 root selector `.dahsing-waterfall-pc` / `.dahsing-tabs-pc` / `.dahsing-horizontal-pc`（桌面）或 `.dahsing-waterfall-m` 等（mobile）。

> **三 theme default 配色分離後的截圖維護**：waterfall default 仍是米橘（既有 6 張不動）；tabs default 改為金奧華、horizontal default 改為紫貴族，對應 12 張截圖（tabs × 3 logo × 2 device + horizontal × 3 logo × 2 device）需要以新 default 配色重截，覆蓋既有檔案後 registry 與 showcase 視覺即同步刷新。

#### dahsing 色變體預覽（v4.1：dialog 內 color 切換）

showcase 預覽 dialog 新增 color swatch row，可在 dialog 內切換配色看對應截圖（dahsing 三 theme 限定）。registry 用 `buildColorPreviews(themeKey, colors, defaultColor)` helper 在 `ThemeMeta.colorPreviews` 內展開 3 個非 default 色 × 3 logo × 2 device 的 URL 表，命名 `<themeKey>-<colorKey>-<logoKey>-<device>.png`。`getPreview` 第四參數 `colorKey` 控制走 default 截圖鏈或色變體鏈，缺檔自動 fallback 回 default 截圖避免破圖。Loading 體驗詳見「Showcase 圖片 Lazy-Load 機制」章節。

色變體截圖補齊清單見「預覽截圖矩陣 → dahsing 三 theme 色變體截圖補齊清單」表。

### daheng 六版型（棕金大亨米橘暖系，a06 ~ a11，6 款手機 + 6 款獨立 PC）

`src/themes/daheng-{rank,grid,rail,compact,list,magazine}/` 是來自使用者「大亨 版型探索 6 款」設計稿的 1:1 復刻 + PC 重構組合：

- **共用基底**：`src/themes/daheng-shared/` 含 9 個 mobile atoms（statusbar / header / hero / marquee / cats-row / cats-grid / chips / sec-head / promo / tabbar + cat-icon / tab-icon）+ 8 張 asset（hero / trophy / ch-mascot 與 5 張遊戲縮圖，集中於 `daheng-shared/assets/`，6 theme 引用同一份不重複 emit）+ GAMES / RANKS / CATS / CHIPS / TAB_ITEMS 共用資料

- **mobile 1:1 對齊原稿 phones.js**：來源 `/tmp/dh6_workspace/phones.js` 與 `shared.css`，DOM 結構 / class 語意 / SVG icon path / 卡片尺寸 / padding / 漸層 / 陰影 / 字級嚴格對齊；BEM 本地化（class 名一律改成 `daheng-<theme>__<block>--<modifier>` pattern）

  | theme key | label | 對應原稿版型 | mobile 中央 main 結構 |
  |---|---|---|---|
  | `daheng-rank` | `a06 · 大亨排行榜` | phones.js v1 | 左 ranklist 5 名 / 看全部 + 右 grid2 2×3 6 張 |
  | `daheng-grid` | `a07 · 大亨滿版宮格` | phones.js v2 | fwgrid 2×3 6 張大卡（150px 高） |
  | `daheng-rail` | `a08 · 大亨橫向滑軌` | phones.js v3 | 3 條 rail：熱門推薦 4 張 / 真人 3 張 / 電子 3 張（208×132 卡片橫向滑動） |
  | `daheng-compact` | `a09 · 大亨三欄密集` | phones.js v4 | cats-grid 4×2 + 3 欄 3 列 9 張 tcard（hero 用 small 變體 + tcard 含 96px 圖+名稱） |
  | `daheng-list` | `a10 · 大亨清單榜單` | phones.js v5 | 6 列 glist（排名 22px 義大利斜體+70×70 縮圖+名稱 EN+進入 CTA） |
  | `daheng-magazine` | `a11 · 大亨雜誌精選` | phones.js v6 | chips 6 個分類 + feature 200px hero+「立即遊玩」CTA + 2 欄 masonry 6 張（tall 3/4 + shortc 4/3 交錯） |

- **桌面 6 theme 風格差異化**（無原稿，每款自由發揮以「不是 RWD 縮放、完全重構」的原則設計）：
  - daheng-rank PC：左 220px sidebar（品牌+7 分類 nav+雙 CTA）+ 中央 940px main（hero 大圖+排行榜橫向 5 大卡+遊戲牆 3 欄）+ 右 240px aside（promo 卡+近期公告）
  - daheng-grid PC：sticky mega header（橫向 7 nav）+ 全幅 hero（360px 高+swiper 點點）+ 4 欄宮格牆（12 張+浮動 HOT 標籤）+ promo 橫條
  - daheng-rail PC：carousel hero（左 65% 大圖 + 右 35% 縮圖 4 列）+ 三段大型分欄（每段左 45% 大圖+右 4 小縮圖）+ promo bar
  - daheng-compact PC：dashboard 風格（180px 左 menu + 中央 main with filter chip+6 欄 18 張高密度 grid + 240px 右 panel 聚合排行/promo/公告）
  - daheng-list PC：leaderboard 主題頁（top 3 大卡橫排+金牌略放大+獎牌徽章+玩家數/賠率/趨勢統計）+ 表格式榜單（6 欄含進入 CTA）
  - daheng-magazine PC：雜誌封面風（左 2/3 大封面+overlay 標題+CTA+右 1/3 編輯精選 5 筆）+ 4 欄 masonry（12 張 tall/shortc 交錯）

- **配色（3 配色變體：default / noir / jade，v4.4 起）**：
  - `default` 棕金大亨米橘暖系（取自原稿 shared.css `:root`，定義於 `_tokens.scss`）
    - `--color-primary` `#b06a34`（brown，原稿 `--brown`）
    - `--color-secondary` `#c98a52`（brown-soft）
    - `--color-accent` `#d9a24b`（gold，排名數字色）
    - `--bg-base` `#fdf4ea` / `--bg-surface` `#fcefdf`
    - `--text-primary` `#2c2521`（ink）/ `--border` `#efddc8`
    - `--gradient-cta` `linear-gradient(180deg, #cf8a4f, #a85d2b)`
  - `noir` 黑金奢華（定義於 `_variants.scss`）：黑底 `#1a1410` + 香檳金 `#d4a574` + 暗金漸層；與既有 fived 5D 暗金禮盒區隔（fived 偏紅棕、noir 走純黑）；swatch 用香檳金以避免色塊在白底像「禁用」
  - `jade` 翡翠玉璽（定義於 `_variants.scss`）：深翠綠 `#1e5b3a` + 玉璽金 `#c8a04b` + 古米色 `#f5efd9`；東方識別，與既有 vietvip 紅金東南亞區隔
  - 6 個 daheng 的 `_variants.scss` 各自完整覆寫 12 必要 var + `--bg-decoration`（共 13 個），即便部分 var 目前未被消費（`--bg-base` / `--bg-surface` / `--bg-overlay` / `--bg-decoration`）也照公約鐵則覆寫，防未來 atom 新增引用造成色殘留
  - 字體 stack（`--font-display` / `--font-body`）跨變體不變，繼承自上層 `[data-theme="daheng-x"]` selector，不重複覆寫
  - 為什麼 6 theme 不抽共用 token 檔：vite buildThemeScssImports 只掃 `src/themes/<key>/_tokens.scss`，跨 theme @use 共用需多走一層，務實複製 6 份 token 內容（命名公約鐵則：12 必要 var 不可改名）

- **logo（v4.5 起 daheng-header / desktop brand 全接 themeStore.currentLogo）**：
  - 6 theme 的 `logos` 接 `SHARED_LOGOS`（dahsing / umu / long-heng），`defaultLogo` 統一 `"dahsing"`（大亨 ONLINE，棕金品牌調性與 daheng 識別最搭）
  - **v4.5 起 daheng-header 與 6 個 desktop.vue brand 區塊全部改接 `themeStore.currentLogo.src / .label`**：對齊 at99 / noya / dahsing-* 等既有 theme 慣例，使用者透過 FAB 或 showcase logo switcher 切 logo 時，daheng 內部 logo 跟著換
  - **演進歷史**：
    - v4.3 之前：6 daheng 用獨立 `daheng` logoKey + 單一 mascot logo（不接 SHARED_LOGOS）
    - v4.4：`logos` 改接 SHARED_LOGOS 但 daheng-header 內部仍寫死 mascot（showcase 卡片有切但 theme 內部沒切，造成不一致）
    - v4.5：daheng-header / 6 個 desktop.vue brand 區塊也接 `themeStore.currentLogo`，showcase 切換 + theme 內部 logo 完全聯動
  - **logo 樣式調整（v4.5 起）**：對齊 at99-mobile-top-bar 的橫式 logo CSS pattern — `height: 固定` + `width: auto` + `max-width: contain`（取代既有方形 `width × height` 寫法，避免 SHARED_LOGOS 三張橫式 logo 被壓扁）。mobile header `height: 60px / max-width: 140px`；PC brand 區塊依各 theme 設計 height 44~60px / max-width 120~140px

- **缺失資源替代**（使用者拍板）：原稿引用 `logo.png` 與 `promo_v2.png` 在素材夾不存在。`logo.png` 原本以 `ch-mascot.png` 替代，但 v4.5 起 daheng-header 已改接 `themeStore.currentLogo`，**mascot 圖檔與 `_data.ts` 的 `mascotLogoSrc` export 保留作未來「吉祥物裝飾」使用，目前無消費點**；`promo_v2.png` → `trophy.png`（獎盃延續「優惠週週送」視覺）仍在使用

- **預覽截圖（v4.5 補齊 108 張、v4.6 修截圖內容重複 bug）**：6 theme × 3 colors × 3 logos × 2 devices = 108 張預覽截圖已補齊，存於 `src/assets/previews/`，命名 `daheng-<theme>-<color>-<logo>-<device>.png`（注意 `long-heng` 帶 hyphen 不要拆字）。registry 透過 `buildPreviews()` + `buildColorPreviews()` 自動命中（與其他 theme 一致）
  - **default 色檔命名**：buildPreviews 用 `<theme>-<logo>-<device>.png` 規約，但 v4.5 統一補的 108 張使用完整 `<theme>-<color>-<logo>-<device>.png` 規約（含 default 色段，方便未來腳本批次處理）。`getPreview` fallback 鏈會自動處理：default 色看不到 `<theme>-default-<logo>-<device>.png` 命中時退回 `<theme>-<logo>-<device>.png`（既有命名）
  - **v4.6 修截圖內容重複 bug**：v4.5 截圖踩過 silent fail — 三個 logoKey 截出同一張圖（72/108 重複，reviewer md5 抓到）。根因：`useDemoThemeStore` 的 `resolveInitialColorKey()` 只讀 `?color=` 沒讀 `?logoKey=`，加上 `useThemeUrlSync` 的「store→URL」watcher immediate=true 把 store 預設 logoKey 寫回 URL 蓋掉原始 query。修法見 `demo-theme.store.ts` 的 `resolveInitialThemeQuery()`（v4.6）：同時解析 `?color=` 與 `?logoKey=`，URL 沒給才走 LS / defaultLogo 第二優先級
  - **截圖 SOP + Sanity check**：見下方「截圖維護 SOP」小節

#### 截圖維護 SOP

新增 / 重新生成 daheng theme 預覽截圖時：

```bash
# 1. 啟動本機 dev server（首選 9527，已佔用會自動 +1 升到 9528 / 9530）
yarn dev

# 2. 確認 console 顯示的 Local URL 後，跑截圖 script
#    預設 BASE_URL=http://localhost:9528（與 admin 專案常見的 port 衝突後升 9528 對齊）
node scripts/capture-daheng-previews.mjs

# 3. port 不同時用 env override
BASE_URL=http://localhost:9530 node scripts/capture-daheng-previews.mjs

# 4. 也可截 deployed 站
BASE_URL=https://chiyum.github.io/umu_demo node scripts/capture-daheng-previews.mjs
```

Script 規格：

| 項目 | 值 |
|---|---|
| 路徑 | `scripts/capture-daheng-previews.mjs` |
| 套件依賴 | `playwright`（devDependency，chromium browser binary） |
| 輸出 | `src/assets/previews/<theme>-<color>-<logo>-<device>.png` |
| Mobile viewport | 390 × 844（觸發 useDevice.isMobile，渲染 mobile.vue） |
| Desktop viewport | 1440 × 900（渲染 desktop.vue） |
| deviceScaleFactor | 1（避免 hidpi 截圖兩倍大） |
| 等待策略 | domcontentloaded（dev）/ networkidle（prod）+ root selector wait + 600ms sleep |
| **Sanity check（v4.6 新增）** | 截圖前驗 logo img.src 含 `LOGO_KEY_TO_SRC_FRAGMENT` 對應 fragment；不對就 throw → 個別 page 失敗（既有 try/catch 接住、exit code 1 列清單） |
| 平行度 | 序列跑（避免 SPA 字體 / chunk 載入排程被打亂） |
| 預估時間 | 108 張 × 約 3 秒 ≈ 5~6 分鐘 |
| 失敗處理 | 個別 page 失敗時 console.error + 最後一次 exit code 1 列出，可重跑（既成功的覆寫即可） |

**Sanity check 細節**：
- 防 v4.5 silent fail bug 再發生（截圖時實際渲染永遠是 store defaultLogo）
- mobile 用 `.daheng-header__logo` selector，desktop 用 `[class*="__brand"] img`
- fragment 對應：`dahsing → themes/at99/assets/logos/default`、`umu → themes/noya/assets/logos/default`、`long-heng → shared-logos/long-heng`
- 為什麼 fragment 選 path 中間：dahsing 與 umu 的 logo 檔名都叫 `default.png`，差別只在 path 中間（at99 / noya）；結尾比對會雙方 match 失效
- prod build 後 path 改成 `/assets/<filename>-<hash>.png`，sanity check 在 `IS_PRODUCTION_BASE=true` 時自動跳過

URL query 控制（依賴 `use-theme-url-sync` 的 v4.5 雙向同步 + `demo-theme.store` 的 v4.6 init 解析）：

- `?color=default` / `?color=noir` / `?color=jade` — 切配色
- `?logoKey=dahsing` / `?logoKey=umu` / `?logoKey=long-heng` — 切 logo
- 兩者皆雙向同步：store 改動會更新 URL，URL 改動會推進 store

#### 排程顯示機制（`releaseDate` 欄位 + `?preview=1` bypass）

6 個 daheng theme 在 `_registry.ts` 內各自帶 `releaseDate` 欄位（依 6/10 / 6/11 / 6/12 三批上架），showcase 主頁依本機時區比對顯示。

- **排程批次**：
  - 6/10：`daheng-rank`（a06）+ `daheng-grid`（a07）
  - 6/11：`daheng-rail`（a08）+ `daheng-compact`（a09）
  - 6/12：`daheng-list`（a10）+ `daheng-magazine`（a11）
- **欄位定義**：`ThemeMeta.releaseDate?: string`（ISO `YYYY-MM-DD`，本機時區）。**既有 13 個 theme 不帶此欄位 = 永遠顯示**，行為完全不變
- **過濾邏輯位置**：`src/themes/_registry.ts` 提供 `getLocalToday()` + `isThemeReleased(theme, today)` 純函式；`src/store/showcase.store.ts` 的 `releaseFilteredThemes` computed 套用過濾，`filteredThemes` 以此為 base 再疊 brightness / categories 篩選
- **比較方式**：兩邊都正規化為 `YYYY-MM-DD` 字串字典序比較（前提：固定 zero-pad），避免時分秒誤差 / 跨瀏覽器 Date.parse 不一致
- **本機時區處理**：`getLocalToday()` 用 `getFullYear / getMonth / getDate` 拼字串，**不走 UTC 轉換**（呼應使用者規約 [[feedback-schedule-release-by-date]]：「本機已 6/10 就該看到 6/10 上架的版型」）
- **單一 theme 預覽頁不擋**：`/demo/:layoutkey` 直連路由由 `layout-theme-host` 直接讀 `themes[key]`，**完全不經過 showcase store filter**，即便該 theme 未到 releaseDate 也能直連預覽
- **Query bypass**：showcase 主頁 URL 加 `?preview=1` 時跳過排程 filter，所有 theme 都顯示
  - 容錯接受 `?preview=true` / `?preview=yes` / `?preview=on`（任一 truthy 字串）
  - 不持久化到 LS（避免使用者忘了曾 enable 預覽模式）
  - 同步機制：`home.vue` 用 `watch(route.query.preview)` + `immediate:true` 推進 store
- **跨日邊界**：使用者半夜開頁停留到次日，computed 不會重算（無依賴變動）；demo 站台一般不會「停在主頁過夜」，可接受。若未來要支援自動跨日更新，加 `visibilitychange` 重算即可
- **測試 URL 範例**：
  - 正常 → `http://localhost:9528/`（只看到既有 13 + 已上架的 daheng）
  - bypass → `http://localhost:9528/?preview=1`（顯示全部 19 個 theme 含未到日期的）
  - 單一 theme 直連 → `http://localhost:9528/demo/daheng-list`（永遠可用不受日期影響）

#### 借用既有 theme 元件對照表（traceability）

| daheng theme | 行為 | 借鑑 / 自寫 |
|---|---|---|
| 全部 6 theme | mobile 9 atoms（statusbar/header/hero/marquee/cats-row/cats-grid/chips/sec-head/promo/tabbar）抽到 daheng-shared/atoms/ | 學 dahsing-shared pattern |
| 全部 6 theme | SVG icon（7 分類 + 5 tab + flame + chev）寫在 daheng-cat-icon.vue / daheng-tab-icon.vue inline SVG | 對齊 dahsing-icon 不依賴 Iconify 的策略 |
| daheng-rank PC | 排行榜橫向 5 大卡 | 自寫（既有 theme 無排行榜橫排元件） |
| daheng-grid PC | 4 欄宮格牆 + 浮動 HOT 標籤 | 自寫（hot 標籤對齊原稿 cats-row hot-badge 撕角樣式） |
| daheng-rail PC | carousel hero 左大圖+右縮圖列 | 自寫（與 fived hero swiper 概念類似但 layout 不同） |
| daheng-compact PC | dashboard 風格（左 menu + 中央 grid + 右 panel 三欄） | 自寫（dahsing-tabs PC 是雙欄，daheng-compact 是三欄含右 panel） |
| daheng-list PC | leaderboard top 3 大卡 + 表格式榜單含玩家數/賠率/趨勢 | 自寫（既有 theme 無 leaderboard pattern） |
| daheng-magazine PC | 雜誌封面（大封面+overlay+編輯精選） + 4 欄 masonry | masonry 借鑑 dahsing-waterfall column-count 模式 |

