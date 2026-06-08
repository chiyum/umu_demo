// fived 版面入口：方便外部直接 import meta
// 真正的註冊在 src/themes/_registry.ts，這檔案只是提供 IDE 跳轉用
//
// 為什麼 key 命名為 fived 而非 5d：
// - CSS class 不能以數字開頭（規範限制，否則必須 escape \35 d 才能用），
//   為避免 .5d-xxx 在所有 selector / 命名空間都需要 escape，整個 theme 改用英文 fived
// - data-theme 屬性也用 fived，與 class 命名一致
export { themes } from "../_registry";
