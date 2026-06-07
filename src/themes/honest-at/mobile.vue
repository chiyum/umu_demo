<script setup lang="ts">
import HonestAtMobileHeader from "./sections/honest-at-mobile-header.vue";
import HonestAtMobileMarquee from "./sections/honest-at-mobile-marquee.vue";
import HonestAtMobileBanner from "./sections/honest-at-mobile-banner.vue";
import HonestAtMobilePrizepoor from "./sections/honest-at-mobile-prizepoor.vue";
import HonestAtMobileGameMenu from "./sections/honest-at-mobile-game-menu.vue";
import HonestAtMobileTabBar from "./sections/honest-at-mobile-tab-bar.vue";

/**
 * honest-at 手機版佈局 — 1:1 對齊 honest_real src/pages/at/home.vue + layouts/layout-at-home.vue
 *
 * 原作 DOM 順序（home.vue）：
 *   .at-home
 *     .at-home-header   ← logo + 登入 + 註冊 + 語系
 *     .at-home-marquee-wrap
 *       .at-home-marquee
 *     <Banner />        ← 純 img swiper，3 張 jpg
 *     <Prizepoor />     ← JACKPOT 11 位 sprite（疊在 banner 底部 margin -50px）
 *     <Game />          ← 25/75 grid，7 cat + 5 hot 卡
 *   ↓ 外層 layout-at-home.vue 渲染
 *   .layout-at-actions  ← 底部 5 tab (home 頁不顯示首頁項)
 *
 * Demo 站不渲染原作 <Fab /> 切換版本拖曳球（使用者明確要求拿掉，
 *   demo 不需切換 mode 功能）
 *
 * 原作 layout SCSS：.layout-at 整頁鋪 url(10114.jpg) bg / padding-bottom 75px
 *
 * 注意：不可在 Banner 上疊任何 HTML overlay（標題副標 jackpot 都在 jpg 內）
 */
</script>

<template>
  <div class="honest-at-m-layout">
    <div class="honest-at-m-layout__page">
      <HonestAtMobileHeader />
      <HonestAtMobileMarquee />
      <HonestAtMobileBanner />
      <HonestAtMobilePrizepoor />
      <HonestAtMobileGameMenu />
    </div>
    <HonestAtMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .layout-at：整頁鋪 10114.jpg / padding-bottom 75px
// 背景色走 token 讓變體可以切換底色（image 為灰階科幻底圖，各變體都能套）
.honest-at-m-layout {
  position: relative;
  min-height: 100vh;
  background-image: url("./assets/games/page-bg.jpg");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--bg-base-deep);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  padding-bottom: 75px;
  overflow-x: hidden;

  &__page {
    position: relative;
    min-height: calc(100vh - 75px);
  }
}
</style>
