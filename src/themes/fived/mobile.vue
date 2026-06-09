<script setup lang="ts">
import { ref } from "vue";
import FivedMobileHeader from "./sections/fived-mobile-header.vue";
import FivedMobileMenu from "./sections/fived-mobile-menu.vue";
import FivedMobileBanner from "./sections/fived-mobile-banner.vue";
import FivedMobileNews from "./sections/fived-mobile-news.vue";
import FivedMobileHotGames from "./sections/fived-mobile-hot-games.vue";
import FivedMobileFooter from "./sections/fived-mobile-footer.vue";

/**
 * fived 手機版佈局 — 視覺結構參考 5d_v2 src/pages/base/home.vue
 *   + src/layouts/layout-default.vue 的 mobile 部分
 *
 * 對齊原作 layout-default 的 mobile chrome：
 *   <MobileMenu :isActive="isMenuActive" @toggleMenu="toggleMenu" />
 *   <MobileHeader @toggleMenu="toggleMenu" :isScrolled="isScrolled" />
 *
 * Demo 化拆解：
 *   Menu       ← 從左滑入抽屜（6 大主分類 + 子項展開）
 *   Header     ← sticky 漢堡 / logo / 登入按鈕
 *   Banner     ← banner swiper（米金邊 + 金黃方點 pagination）
 *   News       ← 公告卡（titleBox + 多色 tag）
 *   HotGames   ← 熱門遊戲 2-col grid（金邊 hover glow）
 *   Footer     ← demo 站補的 bottom tab bar（5 tab 中間客服球）
 *
 * 整體底色：深棕 + radial 暗金光（bg-decoration）
 */

// 對齊 5d_v2 layout-default：isMenuActive 由 layout 維護，header & menu 共用
const isMenuActive = ref<boolean>(false);
function toggleMenu(): void {
  isMenuActive.value = !isMenuActive.value;
}
</script>

<template>
  <div class="fived-m-layout">
    <FivedMobileMenu :is-active="isMenuActive" @toggle-menu="toggleMenu" />
    <FivedMobileHeader
      :is-menu-active="isMenuActive"
      @toggle-menu="toggleMenu"
    />
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
