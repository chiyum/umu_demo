/**
 * daheng-coral（a18 大亨奶油珊瑚）theme 入口
 *
 * 與既有 daheng-neon 等 theme 的 index.ts pattern 一致：
 * 只負責 explicit named export，真正註冊在 src/themes/_registry.ts（lazy import）。
 */

export { default as DahengCoralDesktop } from "./desktop.vue";
export { default as DahengCoralMobile } from "./mobile.vue";
