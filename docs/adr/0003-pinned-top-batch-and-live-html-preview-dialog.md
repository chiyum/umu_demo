# 0003 — 最新批次置頂排序（PINNED_THEME_KEYS 分區）+ 詳情 modal 改即時 HTML 預覽（/preview 加 ?device 覆蓋）

- 狀態：Accepted
- 日期：2026-07-13
- 關聯：0001（複用佈局殼新增 20 套 theme）、0002（showcase 卡片即時 HTML 預覽 + `/preview/:layoutkey` 路由）

## Context

第 3 批一次新增 20 套 theme（a22-a28 / b03-b05 / c27-c31 / d02-d04 / e03-e04，複用 daheng AWD 佈局殼 + hue-rotation 配色），刻意**不帶 `releaseDate`**（即時全開、不走排程）。上線後使用者回報兩個問題：

1. **首頁「看不到」新版面**：showcase 主頁預設排序為 `oldest`（由舊到新）。排序鍵為 `[releaseDate ?? "0000-00-00"（哨兵）, registryIndex]`。這 20 套無 `releaseDate` → 被哨兵歸入「最早」群組，再按 `registryIndex` 排到「最早建立的 13 套原始 theme 之後」，實測落在第 14-33 位，被夾在中段，使用者以為沒上線。
2. **詳情預覽 modal 對新版面破圖**：卡片「預覽」開的 `showcase-preview-dialog.vue`，桌面版 / 手機版兩分頁仍是靜態 WebP `<img>`（`getPreview`）。20 套新 theme 沒有 WebP 截圖 → 空白破圖（實測 a22 桌面版為空白）。

使用者拍板：(A) 20 套**全部立即置頂（視為最新）**、不做日期排程；(B) 詳情 modal 兩分頁都改**即時 HTML**。

## Decision

### A. 排序：以 `PINNED_THEME_KEYS` 做「置頂分區」

「預設 `oldest` + 最新置頂」本質互斥，無法只靠日期排序達成，故引入**明確的置頂名單**：

- 在 `src/themes/_registry.ts` 宣告 `PINNED_THEME_KEYS: ReadonlySet<string>`（這 20 套 key）+ 純函式 `isThemePinned(key)`。
- `showcase.store.ts` 的 `sortedThemes` 改為**置頂分區**：把 `filteredThemes` 依 `isThemePinned` 切成 `pinned` / `rest` 兩區，各自套「當前 `sortOrder` 方向」的同一 comparator（抽成 `sortWithinPartition` helper），再 `pinned` 在前、`rest` 在後串接。
- 效果：
  - 預設 `oldest`：20 套新版面（分區內無 releaseDate → 哨兵 + `registryIndex` → registry 宣告序 a22→e04）在最前；52 套舊版面維持**既有 oldest 相對序**在後。總數 72，無漏無重。
  - 不引入任何日期閘門（這 20 套本來就無 `releaseDate`，`isThemeReleased` 恆 true，永遠可見）。
  - 切「由新到舊 / 依編號」時，置頂 20 套內部也照該方向呈現，行為一致好預期。

**為什麼用 key 的 Set，而非在 `ThemeMeta` 加 `pinned` 欄位：**

- 單一來源、集中一處即可一眼看到「哪 20 套被置頂」，不必散落到 20 個 theme 物件各加一行（20 處分散編輯易漏）。
- 下一批新版面上架時，整批替換這個 Set 即可（舊批移出、新批移入），維護成本最低。
- 排序是 showcase 層行為，用「置頂名單」表達比在資料層每個 theme 綁旗標更貼近意圖。
- 代價：key typo 不會被 TS 擋（字串 Set）。緩解：Set 緊鄰 themes map，review 可直接對照。

**被否決的替代方案：**

- **給 20 套近期 `releaseDate` + 預設改 `newest`**：`newest` 會**反轉 52 套舊版面的相對順序**（違反「舊版面維持相對序」鐵則）；且近期日期在 `oldest` 下反而排到最後。
- **store 排序把「無 releaseDate 的新 theme」視為最新**：13 套原始 theme 也無 `releaseDate`，無法與新批區分。

### B. 詳情 modal 改即時 HTML + `/preview` 加 `?device=` 覆蓋

- `showcase-preview-dialog.vue` 桌面 / 手機兩分頁改為即時 iframe 嵌 `/preview/<key>`（複用 0002 路由），帶 `?color=<activeColorKey>&logoKey=<showcaseLogoKey>&device=<previewDevice>`。以「參考視口尺寸 × `transform: scale()`」縮進 modal 框（桌機 1280×820 / 手機 390×800，ResizeObserver 依框寬高 contain 縮放）。任何 theme（含無截圖新版面）都顯示真實版面，不再破圖，內容永遠與 demo 頁一致。
- 一次最多掛 1 個 iframe（桌機 / 手機分頁互斥，切分頁改 src 重載），dialog 關閉整塊卸載，不需 IntersectionObserver。
- 配色 swatch 切換即時重載 iframe（改 `?color=`），對所有 `colors>=2` 的 theme 都有效，不再依賴是否備有 `colorPreviews` 色截圖。

**關鍵：`/preview` 必須加 `?device=` 覆蓋。** `useDevice`（`src/utils/use-device.ts`）的判斷是「UA 為行動關鍵字 **AND** `innerWidth<=768`」兩者皆真才算手機。桌機瀏覽器 UA 非行動關鍵字 → `isMobile` 恆 false，**即使把 iframe 縮到 390px 也只會渲染 desktop.vue**。故手機分頁無法只靠縮窄 iframe 觸發 mobile 版，必須由外層明確帶 `?device=mobile` 讓 `/preview` 強制渲染對應版面（`preview/_layoutkey.vue` 的 `forcedIsMobile`：`?device=` 優先，未帶則沿用 inject 的 `isMobile`，獨立分享連結行為不變）。

## Consequences

- **正面**：新版面預設一進站即在前 20 位可見；詳情 modal 對所有 theme（含無截圖新版面）不破圖、內容即時真實、切色即時；`/preview` 多了明確的裝置覆蓋能力（也可產生「指定手機版的可分享連結」）。
- **回滾**：低。排序：移除 `PINNED_THEME_KEYS` 使用點、`sortedThemes` 還原單一 comparator 即可，純前端無資料殘留。modal：還原 `<img>` + `getPreview` 即可；`?device=` 覆蓋向後相容（未帶時行為不變），保留無害。
- **維護注意**：
  - 下一批新版面上架時，決定是否把「置頂名單」換成新批（把目前 20 套移出、新批移入），並同步 README「排序機制」與產品配置。
  - `PINNED_THEME_KEYS` 的 key 必須與 themes map 註冊的新批 key 完全一致（緊鄰放置便於對照）。
  - iframe 每開一個 modal 會載入一個獨立 SPA context；一次僅 1 個、關閉即卸載，成本可控。
- **build**：純前端 runtime，不增 build 體積；本機 `yarn build`（不帶 env）exit 0、無 OOM（實測 2m31s）。

### 補充：`/preview` store 唯讀（reviewer 批 4 修正）

`/preview/<key>` 與 `/demo/<key>` 共用同一個 `demo-theme` store + 同一組 LS 鍵；預覽 iframe（卡片縮圖 A8、詳情 modal A11）與 /demo 同源共享 `localStorage`，其 persist watch 會把「預覽用的預設色 / 縮圖指定色 / modal 切色」**靜默寫進全域 demo 偏好**，污染使用者下次開 /demo 的配色 / logo。此問題 A8/A9 上線後已存在，A11 的 modal 切色放大它。

修法：`demo-theme.store.ts` 於 init 以 `detectPreviewReadonly()`（pathname 比對 `/preview/`）判定唯讀模式，唯讀時**不掛 color / logo / fabPosition 三個 persist watch**——只讀 URL query 決定顯示、完全不回寫 LS。/demo 情境維持原本會記住偏好的行為；獨立分享的 `/preview/<key>?color=X` 仍照 URL 正確顯示。沿用本檔既有的 `/(?:demo|preview)/` pathname signal，零額外相依、store singleton init 判定一次即固定。
