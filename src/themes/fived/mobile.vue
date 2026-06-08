<script setup lang="ts">
import FivedMobileHeader from "./sections/fived-mobile-header.vue";
import FivedMobileBanner from "./sections/fived-mobile-banner.vue";
import FivedMobileNews from "./sections/fived-mobile-news.vue";
import FivedMobileHotGames from "./sections/fived-mobile-hot-games.vue";
import FivedMobileFooter from "./sections/fived-mobile-footer.vue";

/**
 * fived 手機版佈局 — 視覺結構參考 5d_v2 src/pages/base/home.vue
 *   + src/layouts/layout-default.vue 的 mobile 部分
 *
 * 原作 DOM 順序（base/home.vue）：
 *   .index-wrap
 *     .index-block.index-block--swiper
 *       .index-slider-wrap   ← banner swiper（米金邊）
 *       <News />              ← 公告區（mobile 在 banner 下方）
 *     .index-block
 *       <GameCarousel />      ← 熱門遊戲 3D carousel
 *
 * Demo 化拆解：
 *   Header     ← demo 站補的 sticky header（原作在 layout 外層）
 *   Banner     ← banner swiper（米金邊 + 金黃方點 pagination）
 *   News       ← 公告卡（titleBox + 多色 tag）
 *   HotGames   ← 熱門遊戲 2-col grid（金邊 hover glow）
 *   Footer     ← demo 站補的 bottom tab bar（5 tab 中間客服球）
 *
 * 整體底色：深棕 + radial 暗金光（bg-decoration）
 */
</script>

<template>
  <div class="fived-m-layout">
    <FivedMobileHeader />
    <main class="fived-m-layout__main">
      <FivedMobileBanner />
      <FivedMobileNews />
      <FivedMobileHotGames />
    </main>
    <FivedMobileFooter />
  </div>
</template>

<style lang="scss" scoped>
.fived-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  background-attachment: fixed;
  overflow-x: hidden;
  padding-bottom: calc(76px + env(safe-area-inset-bottom));

  &__main {
    position: relative;
    z-index: 1;
  }
}
</style>
