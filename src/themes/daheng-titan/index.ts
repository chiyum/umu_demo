/**
 * daheng-titan（a20 大亨鈦灰琥珀）theme 入口
 *
 * 與既有 daheng-neon / daheng-rank 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengTitanDesktop } from "./desktop.vue";
export { default as DahengTitanMobile } from "./mobile.vue";
