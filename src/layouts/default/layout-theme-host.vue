<script setup lang="ts">
import { computed, inject, watchEffect, type Ref } from "vue";
import { useThemeStore } from "@/store/theme.store";
import { useThemeUrlSync } from "@/utils/use-theme-url-sync";
import ThemeSwitcherFab from "@/components/common/theme-switcher-fab.vue";
import ThemeSwitcherFabMobile from "@/components/common/theme-switcher-fab.mobile.vue";

/**
 * Theme host layout — 給 theme demo 頁專用的薄殼 layout
 *
 * 為什麼不用 layout-default：
 * - layout-default 是 Quasar admin 風骨架（header / drawer / page-container），
 *   會把 theme 的整頁設計包進 q-page，造成滾動容器 / 寬度 / 背景多層干擾
 * - theme 要的是「整個 viewport 完全交給我」
 *
 * 這個 layout 的職責：
 * 1. 把 [data-theme] / [data-theme-color] 屬性掛到根 div，讓 CSS var 接管整頁
 * 2. 掛載 FAB 浮標（依 isMobile 切版本），全頁都會看到
 * 3. 啟動 URL <-> store 雙向同步（useThemeUrlSync）
 */

const themeStore = useThemeStore();
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
    <ThemeSwitcherFabMobile v-if="isMobileView" />
    <ThemeSwitcherFab v-else />
  </div>
</template>

<style lang="scss" scoped>
.theme-host-layout {
  // 父層充滿，內部 theme 自行決定高度 / 滾動
  width: 100%;
  min-height: 100vh;
}
</style>
