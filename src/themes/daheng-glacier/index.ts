/**
 * daheng-glacier（a21 大亨冰川晨藍）theme 入口
 *
 * 與既有 daheng-neon / daheng-rank / fuyou 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengGlacierDesktop } from "./desktop.vue";
export { default as DahengGlacierMobile } from "./mobile.vue";
