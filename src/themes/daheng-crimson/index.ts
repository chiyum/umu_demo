/**
 * daheng-crimson（a19 大亨赤焰紅金）theme 入口
 *
 * 與既有 daheng-neon / daheng-rank / fuyou 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengCrimsonDesktop } from "./desktop.vue";
export { default as DahengCrimsonMobile } from "./mobile.vue";
