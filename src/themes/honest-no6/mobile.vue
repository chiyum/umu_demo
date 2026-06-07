<script setup lang="ts">
import HonestNo6MobileHeader from "./sections/honest-no6-mobile-header.vue";
import HonestNo6MobileBanner from "./sections/honest-no6-mobile-banner.vue";
import HonestNo6MobileMarquee from "./sections/honest-no6-mobile-marquee.vue";
import HonestNo6MobileInfo from "./sections/honest-no6-mobile-info.vue";
import HonestNo6MobileGameMenu from "./sections/honest-no6-mobile-game-menu.vue";
import HonestNo6MobileFab from "./sections/honest-no6-mobile-fab.vue";
import HonestNo6MobileTabBar from "./sections/honest-no6-mobile-tab-bar.vue";

/**
 * honest-no6 手機版佈局 — 1:1 對齊 honest_real src/pages/no6/home.vue
 *
 * 原作 DOM 順序：
 *   .home
 *     .home__header        ← absolute 浮在 banner 上方
 *     .home__banner        ← 純 img 輪播 × 6
 *     .home__marquee       ← Marquee 元件（紫色 wrap + 黑底）
 *     .home__action v-if   ← 不顯示（user 有值）
 *     .grid grid-cols-3    ← 三張資訊小圖
 *     .home__game          ← 左 sidebar + 右 vertical item list
 *   <Fab />                ← 切換版本拖曳球
 *
 * 注意：banner 上**禁止疊任何 HTML overlay**（山日日 / 儲值1000 / tags 都在 banner.png 內）
 */
</script>

<template>
  <div class="honest-no6-m-layout">
    <div class="honest-no6-m-layout__page">
      <HonestNo6MobileHeader />
      <HonestNo6MobileBanner />
      <HonestNo6MobileMarquee />
      <HonestNo6MobileInfo />
      <HonestNo6MobileGameMenu />
      <HonestNo6MobileFab />
    </div>
    <HonestNo6MobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  overflow-x: hidden;
  padding-bottom: calc(85px + env(safe-area-inset-bottom));

  &__page {
    position: relative;
    min-height: calc(100vh - 85px);
  }
}
</style>
