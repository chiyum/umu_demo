<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

/**
 * Layout Showcase — 給 showcase 主頁專用的極簡 layout
 *
 * 為什麼不用 layout-default：
 * - layout-default 是 Quasar admin 骨架（drawer / header / page-container），
 *   showcase 是純展示頁，需要完全乾淨的 viewport，不該有任何 admin chrome
 *
 * 為什麼不用 layout-theme-host：
 * - layout-theme-host 會把 [data-theme] 屬性掛到 documentElement，並掛 FAB
 * - showcase 不應該被任何 theme 影響、不應該掛 FAB（FAB 是 demo 頁的東西）
 * - 共用 layout-theme-host 需要加條件分支，違反方案 2「徹底解耦」初衷
 *
 * 這個 layout 的職責：
 * 1. 純薄殼，僅 <slot />，視覺由 home.vue 自己決定
 * 2. 進場時把 [data-theme] / [data-theme-color] 從 documentElement 清掉，
 *    避免使用者從 demo 頁回主頁時殘留 theme 屬性污染 showcase 視覺
 * 3. 不掛 FAB、不掛 URL sync、不讀 theme store
 */

/**
 * 清掉殘留的 theme 屬性
 *
 * 場景：使用者在 demo 頁切過配色 → 點瀏覽器返回回到 showcase →
 * documentElement 上仍有 data-theme="noya" 等屬性，雖然 showcase 元件不用 var()
 * 不會被影響，但屬性殘留會干擾「全頁字體」等 root scope 規則（noya tokens 有定義 font-display/body）
 */
function clearThemeAttrs(): void {
  if (typeof document === "undefined") return;
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-color");
}

onMounted(() => {
  clearThemeAttrs();
});

onBeforeUnmount(() => {
  // 離開 showcase 時不需要做什麼 — 下個 layout（layout-theme-host）會在 watchEffect 重新掛上
});
</script>

<template>
  <div class="layout-showcase">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout-showcase {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;

  // showcase 用 Outfit + 微軟正黑體（對齊 noya 字體 stack 的 body 部分）
  // 不引 noya tokens 避免被 data-theme 切換影響
  font-family: outfit, "微軟正黑體", "Microsoft JhengHei UI",
    "Microsoft JhengHei", pmingliu, "Segoe UI", tahoma, arial, sans-serif;
  color: #3d3329;
}
</style>
