<script setup lang="ts">
import HonestMaxMobileHeader from "./sections/honest-max-mobile-header.vue";
import HonestMaxMobileBanner from "./sections/honest-max-mobile-banner.vue";
import HonestMaxMobileGameMenu from "./sections/honest-max-mobile-game-menu.vue";
import HonestMaxMobileTabBar from "./sections/honest-max-mobile-tab-bar.vue";

/**
 * honest-max 手機版佈局 — 對齊 honest_real src/pages/max/home.vue
 *
 * 由上到下：
 * 1. Header   logo + 註冊 / 登入兩顆對比按鈕
 * 2. Banner   人在塔在主視覺輪播
 * 3. GameMenu 左 7 分類 sidebar + 右 hot/extra/purple 卡組合
 * 底部 TabBar 5 個白底淡邊 tab
 *
 * 整頁淡灰白底（與 honest-at 深底對比鮮明）+ radial 雙角柔光
 */
</script>

<template>
  <div class="honest-max-m-layout">
    <HonestMaxMobileHeader />

    <main class="honest-max-m-layout__main">
      <HonestMaxMobileBanner />
      <HonestMaxMobileGameMenu />
    </main>

    <HonestMaxMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-max-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-primary);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  background-attachment: scroll;
  overflow: hidden;

  &__main {
    flex: 1;
    padding: 0 4px;

    // 底部留出 tab bar 空間
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
  }
}
</style>
