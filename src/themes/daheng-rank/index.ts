/**
 * daheng-rank（a06 大亨排行榜）theme 入口
 *
 * 為什麼僅 re-export desktop / mobile：
 * - 與既有 noya / at99 / dahsing-* 等 theme 的 index.ts pattern 一致
 * - registry.ts 用 lazy import 動態載入 desktop / mobile，這層只負責「explicit named export」
 * - 若未來要新增 theme 等級的 helpers（例如 daheng-rank 專屬 utils），加在這即可
 */

export { default as DahengRankDesktop } from "./desktop.vue";
export { default as DahengRankMobile } from "./mobile.vue";
