<script setup lang="ts">
import HonestMaxMobileHeader from "./sections/honest-max-mobile-header.vue";
import HonestMaxMobileBanner from "./sections/honest-max-mobile-banner.vue";
import HonestMaxMobileGameMenu from "./sections/honest-max-mobile-game-menu.vue";
import HonestMaxMobileTabBar from "./sections/honest-max-mobile-tab-bar.vue";

/**
 * honest-max 手機版佈局 — 1:1 對齊 honest_real src/pages/max/home.vue
 *
 * 原作 DOM 順序：
 *   .home
 *     .home__header   ← 88win2-logo 78px + 註冊鈕（前）+ 登入鈕（後）
 *     .home__banner   ← 純 img Banner（BannerGuest01.jpg，內含「人在塔在」視覺）
 *     // marquee 註解掉
 *     // home__action v-if isEmpty(user) 不顯示（user 是寫死的物件）
 *     // home__user__action 註解
 *     .home__game     ← Game (左 7 cat + swiper 多 slide)
 *
 * Demo 站不渲染原作 <Fab /> 切換版本拖曳球（使用者明確要求拿掉，
 *   demo 不需切換 mode 功能）
 *
 * 注意：banner 上**禁止疊任何 HTML overlay 文字**，視覺主體是 BannerGuest01.jpg
 */
</script>

<template>
  <div class="honest-max-m-layout">
    <div class="honest-max-m-layout__page">
      <HonestMaxMobileHeader />
      <HonestMaxMobileBanner />
      <HonestMaxMobileGameMenu />
    </div>
    <HonestMaxMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-max-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  background-attachment: scroll;
  overflow-x: hidden;
  padding-bottom: calc(70px + env(safe-area-inset-bottom));

  &__page {
    position: relative;
    min-height: calc(100vh - 70px);
  }
}
</style>
