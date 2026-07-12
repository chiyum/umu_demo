# ADR-0001：批量新增 theme 採「複用佈局殼 + hue-rotation 新配色」而非自包含 SFC

- 狀態：Accepted
- 日期：2026-07-13
- 決策者：architect（/dev auto 自主模式，採推薦方案）

## 背景（Context）

需求：一次新增 20 套賭場 landing page theme（52 → 72 套）。

限制與風險：

1. **GitHub Pages CI build 記憶體上限**：memory 有紀錄「41 套 theme 後 CI build 曾 OOM」，
   目前 `deploy.yml` 已設 `NODE_OPTIONS=--max-old-space-size=8192` 勉強撐住 52 套。
   若每套新 theme 都各自帶一份自包含的 `desktop.vue` + `mobile.vue`（既有每檔 ~12KB SFC，
   各自成 lazy chunk），20 套 = 40 個新 SFC chunk，會顯著推高 build 期記憶體與時間，逼近 OOM。
2. **theme 系統機制**（既有）：
   - `data-theme=<themeKey>` / `data-theme-color=<colorKey>` 掛在 `documentElement`（`layout-theme-host.vue`）。
   - `vite.config.ts` 的 `buildThemeScssImports()` 於 build 時掃描 **每一個** `src/themes/*/` 下的
     `_tokens.scss`（必要）/ `_variants.scss`（可選）自動 `@use`，**不要求該目錄有 `.vue`**。
   - registry 的 `desktop` / `mobile` 是 lazy import，可指向**任意**既有元件。
3. 既有 daheng AWD 系列已有 9 套結構各異、乾淨的響應式佈局殼（版型 A~I）。

## 決策（Decision）

新 theme **不新增 `desktop.vue` / `mobile.vue`**。改為：

- 每套新 theme 目錄只放 `_tokens.scss` + `_variants.scss`（零新 JS chunk）。
- registry entry 的 `desktop` / `mobile` lazy import **直接指向既有 daheng AWD 佈局殼**
  （例：`() => import("./daheng-neon/desktop.vue")`）。多套共用同一殼 = 共用同一 chunk。
- 配色為對應殼**原稿調色盤的 hue-rotation**（保留 L / C / alpha，只轉色相）：
  - oklch 只轉第三分量（色相 deg），不動 gradient 角度；hex / rgba 走 HSL 轉色相。
  - 保留 L → 暗底維持暗、亮底維持亮；保留 C 與對比 → 不破圖、不失可讀性；只換色相 → 視覺與殼區隔。
- 由一次性 Node 生成器（`scratchpad`，不進 repo）產出 40 個 SCSS 檔與 registry 片段。

20 套分佈於 9 個殼；每殼被 1~3 套複用，各給不同色相位移（default 位移皆非 0，確保與殼本身視覺不同）。

## 替代方案（Considered）

- **方案 B：20 份自包含 desktop/mobile.vue**。優點：每套佈局可完全客製。
  缺點：40 個新 SFC chunk，顯著推高 build 記憶體 → 直接命中 OOM 風險，違反本任務首要約束。**否決**。
- **方案 C：直接複用既有 variant 調色（不 hue-rotation）**。優點：零色彩風險。
  缺點：新 theme 只是「既有 theme 切某個 color」的複製，不是「新配色」，不符需求。**否決**。

## 影響（Consequences）

正面：

- Build 體積幾乎不增（僅 +~80KB SCSS，無新 JS chunk）；本機 `yarn build` 實測 exit 0、~2 分、無 OOM。
- 新增 / 維護成本極低；未來要再擴充同模式可重跑生成器。

代價 / 鐵則：

- **複用殼時，新 theme 的 `_tokens.scss` 必須完整重寫該殼 token 契約的每一個 token**——
  不只 12 個公用 CSS var，還包含殼元件 scoped CSS 實讀的所有結構 token
  （如 `--bg-2` / `--glow-c` / `--coin-face` / `--radius-card` / `--hero-slide-*`…）。
  漏一個 → 該殼只在此 theme 破圖（其他 theme 不受影響，難以察覺）。
  故生成器一律「整份 token body 逐色位移後重寫」，`_variants.scss` 每個色也重寫整份 body（避免切色殘色）。
- 同一殼被多套複用 → 這幾套版面結構相同、僅配色不同（可接受：本 demo 目的即「同版型不同配色」比稿）。
- 對應知識卡：`~/.claude/knowledge/theme-reuse-shell-full-token-contract.md`。
