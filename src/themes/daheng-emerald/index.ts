/**
 * daheng-emerald（a14 大亨翡翠金典）theme 入口
 *
 * 與既有 daheng-rank / fuyou pattern 一致：只負責 explicit named export，
 * 真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengEmeraldDesktop } from "./desktop.vue";
export { default as DahengEmeraldMobile } from "./mobile.vue";
