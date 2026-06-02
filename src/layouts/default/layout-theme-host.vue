<script setup lang="ts">
import { computed, inject, watchEffect, type Ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useThemeUrlSync } from "@/utils/use-theme-url-sync";
import ThemeColorFab from "@/components/common/theme-color-fab.vue";
import ThemeColorFabMobile from "@/components/common/theme-color-fab.mobile.vue";

/**
 * Theme host layout — 給 /demo/:layoutkey demo 頁專用的薄殼 layout
 *
 * 為什麼不用 layout-default：
 * - layout-default 是 Quasar admin 風骨架（header / drawer / page-container），
 *   會把 theme 的整頁設計包進 q-page，造成滾動容器 / 寬度 / 背景多層干擾
 * - theme 要的是「整個 viewport 完全交給我」
 *
 * 這個 layout 的職責：
 * 1. 把 [data-theme] / [data-theme-color] 屬性掛到 documentElement，讓 CSS var 接管整頁
 * 2. 掛載 ThemeColorFab 浮標（依 isMobile 切版本）— 只切配色，不切版面
 *    版面由 URL :layoutkey 鎖定，FAB 不該再有切版面功能
 * 3. 啟動 URL <-> store 雙向同步（useThemeUrlSync）— 只同步 colorKey
 *    layoutKey 是 demo store 從 route.params 算出來的 computed，不用 sync 回 URL
 *
 * Store 切換：
 * - 改用 useDemoThemeStore（layoutKey 由 route 動態算、不寫 LS）
 * - 舊 useThemeStore 已不再被 layout / demo page 使用，下一個 chore commit 標 deprecated
 */

const themeStore = useDemoThemeStore();
const isMobile = inject<Ref<boolean>>("isMobile");

// 啟動 URL 同步（內部會 watch route.query 與 store）
useThemeUrlSync();

/**
 * 把屬性同步到 <html>，讓全域 token / variants CSS var 生效
 *
 * 為什麼掛在 documentElement 而不是 layout 根：
 * - FAB / sheet 等 fixed 定位元素跑出 layout 樹之外，
 *   屬性需要在更上層才能被它們繼承讀到 CSS var
 */
watchEffect(() => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", themeStore.layoutKey);
  document.documentElement.setAttribute(
    "data-theme-color",
    themeStore.colorKey
  );
});

/** AWD 切 FAB 版本 */
const isMobileView = computed(() => !!isMobile?.value);
</script>

<template>
  <div class="theme-host-layout">
    <!-- theme 元件區：home.vue 的 <Suspense> 渲染這裡 -->
    <slot />

    <!-- FAB：固定定位，跑出 slot 之外，故放在末尾不影響佈局 -->
    <!-- 改用 ThemeColorFab：只切配色（版面由 URL 鎖定，不該被 FAB 改） -->
    <ThemeColorFabMobile v-if="isMobileView" />
    <ThemeColorFab v-else />
  </div>
</template>

<style lang="scss" scoped>
.theme-host-layout {
  // 父層充滿，內部 theme 自行決定高度 / 滾動
  width: 100%;
  min-height: 100vh;
}
</style>
