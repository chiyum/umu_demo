# 0002 — showcase 即時 HTML 預覽 + 每套 theme 可分享的獨立預覽路由

- 狀態：Accepted
- 日期：2026-07-13
- 關聯：ADR-0001（批量新增 theme 採複用佈局殼）、A8 / A9 驗收條目

## Context（背景）

showcase 主頁（`/home`）原本用靜態 WebP 截圖當卡片縮圖（`src/assets/previews/*.webp`，
透過 `import.meta.glob` + `buildPreviews()` 建矩陣）。隨著 theme 數量成長到 72 套，靜態截圖有兩個痛點：

1. **維護成本**：每新增一套 theme 都要另外用 Playwright 截圖、壓縮、命名、放進 repo；
   v4.11 一次新增 20 套時就因此全部缺截圖，只能靠 fallback 漸層佔位。
2. **失真**：截圖是某個時間點的靜態畫面，與真實版面可能不同步。

使用者追加兩個需求（選「兩者都做」）：

- **A8**：showcase 卡片改為「即時 HTML 預覽」——嵌真實版面的即時渲染而非靜態圖。
- **A9**：每套 theme 有一份「可獨立開啟 / 分享的 HTML 預覽」入口。

本專案為純前端 SPA，部署在 GitHub Pages 子路徑 `/umu_demo/`，且 CI build 對記憶體敏感
（72 套 theme 已需 `--max-old-space-size=8192` 避 OOM，見 ADR 脈絡與產品 memory）。

## Decision（決策）

### A9：以「輕量 SPA 專屬路由 `/preview/:layoutkey`」實作獨立預覽，而非 build 時靜態 pre-render 每套一檔

新增：

- 頁面 `src/pages/default/preview/_layoutkey.vue`（pages.ts 自動轉成 `/preview/:layoutkey`）
- layout `src/layouts/default/layout-theme-preview.vue`（只掛 `[data-theme]`，**無 FAB、無 URL sync**）

此路由只渲染該 theme 本體、無任何 showcase / demo chrome，URL 可直達、可分享。
demo store 的 URL 解析正則同步擴充為 `/(?:demo|preview)/`，讓 `?color=` / `?logoKey=`
在 preview 路由也能正確對應到該 theme 的配色 / logo 清單。

**為什麼不用 build 時靜態 pre-render（`dist/preview/<key>.html` 每套一檔）：**

- 72 套 × headless pre-render（puppeteer / vite-ssg）會大幅推高 build 峰值記憶體與時間，
  直接衝撞 A6「build 不得 OOM」鐵則。
- 需額外處理 base path、`.nojekyll`、每檔資源路徑，複雜度高。
- SPA 路由零 build 成本，且沿用既有 `dist/index.html → 404.html` 的 SPA fallback，
  直連 `/umu_demo/preview/<key>` 重整不會 404。
- 「可分享的 HTML 預覽」需求本質＝「一個可直達、獨立渲染的 URL」，SPA 路由完全滿足。

### A8：showcase 卡片改用「懶載入 iframe 嵌 `/preview/<key>`」+ WebP/漸層 poster 退回

`showcase-theme-card.vue` 的縮圖由靜態 `<img>` 改為：

- **iframe** 嵌 `/preview/<key>?color=<defaultColor>&logoKey=<showcaseLogoKey>`，
  以 `transform: scale(容器寬 / 1280)`（`transform-origin: top left`）縮到卡片 16:10 框內；
  `pointer-events: none` + `scrolling=no` + 透明點擊層承接「點縮圖 = 預覽」。
- **IntersectionObserver 懶載入**（rootMargin 300px）：iframe 只在卡片進視窗才掛 `src`，
  離開即卸載（`v-if`），避免 72 個 SPA 同時常駐爆記憶體。
- **ResizeObserver** 依容器實際寬度重算縮放比例（RWD / grid 換欄自適應）。
- **poster 退回**：既有 WebP 先顯示，iframe `@load` 後淡出蓋上；無 WebP 的新 theme
  用 theme 主色漸層佔位，絕不破圖。既有 WebP 檔全數保留、不刪。

iframe src 用 `/preview/<key>` 而非 `/demo/<key>`：preview 無 FAB（不擋縮圖）、無 URL sync
（不製造 iframe 內 history churn），一石二鳥。

## Consequences（後果）

正面：

- 卡片顯示真實即時版面，新增 theme 不再強制截圖（WebP 降為「首屏 poster」選配）。
- A9 每套 theme 天生有可分享 URL（`/preview/<key>`），零額外 build 產物。
- iframe runtime 渲染，不增 build 體積 / 不影響 A6（build 仍 exit 0 無 OOM，實測 ~108s）。

代價 / 風險：

- iframe 首次進視窗要載入完整 app bundle，比靜態圖重；靠懶載入 + poster 緩衝，
  只有可視卡片會載入，捲動不明顯卡頓。
- 切 showcase logo 會讓可視 iframe 重載（src 變）；靠 poster 蓋回過渡，可接受。
- Vue 3.4（非 3.5）無 `useTemplateRef`，改用 `ref(null)` + `ref="thumbWrap"` 綁定。

## 回滾

- A8：`showcase-theme-card.vue` 還原成靜態 `<img>` 即可（WebP 未刪，poster 邏輯可直接退回）。
- A9：刪 `preview/_layoutkey.vue` + `layout-theme-preview.vue`，還原 store 正則的 `preview` 分支。
- 皆為 revert commit 級別，無 DB / 無殘留資料。
