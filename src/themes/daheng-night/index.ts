/**
 * daheng-night（a16 大亨夜空樂園）theme 入口
 *
 * 與既有 daheng-neon / daheng-emerald 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengNightDesktop } from "./desktop.vue";
export { default as DahengNightMobile } from "./mobile.vue";
