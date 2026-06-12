/**
 * daheng-onyx（a17 大亨曜黑燙金）theme 入口
 *
 * 與既有 daheng-neon / fuyou 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengOnyxDesktop } from "./desktop.vue";
export { default as DahengOnyxMobile } from "./mobile.vue";
