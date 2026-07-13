# 架構決策紀錄（ADR）索引

本目錄記錄 casino-landing-demo 的重大技術決策（Architecture Decision Records）。
格式採 Michael Nygard ADR：Context / Decision / Consequences。

| 編號 | 標題 | 狀態 | 日期 |
|---|---|---|---|
| [0001](0001-reuse-layout-shell-hue-rotation-themes.md) | 批量新增 theme 採「複用佈局殼 + hue-rotation 新配色」而非自包含 SFC | Accepted | 2026-07-13 |
| [0002](0002-live-html-preview-and-shareable-preview-route.md) | showcase 卡片改即時 HTML 預覽（懶載入 iframe）+ 每套 theme 可分享的獨立預覽路由 `/preview/:layoutkey` | Accepted | 2026-07-13 |
| [0003](0003-pinned-top-batch-and-live-html-preview-dialog.md) | 最新批次置頂排序（`PINNED_THEME_KEYS` 分區）+ 詳情 modal 改即時 HTML 預覽（`/preview` 加 `?device=` 覆蓋） | Accepted | 2026-07-13 |
