/**
 * daheng-fresh（a15 大亨清新活力）theme 入口
 *
 * 與既有 daheng-rank / fuyou pattern 一致：只負責 explicit named export，
 * 真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengFreshDesktop } from "./desktop.vue";
export { default as DahengFreshMobile } from "./mobile.vue";
