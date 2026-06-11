/**
 * daheng-neon（a13 大亨霓虹電競）theme 入口
 *
 * 與既有 daheng-rank / fuyou 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengNeonDesktop } from "./desktop.vue";
export { default as DahengNeonMobile } from "./mobile.vue";
