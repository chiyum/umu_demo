<script setup lang="ts">
import AtDeluxeMobileHeader from "./sections/at-deluxe-mobile-header.vue";
import AtDeluxeMobileBanner from "./sections/at-deluxe-mobile-banner.vue";
import AtDeluxeMobileMarquee from "./sections/at-deluxe-mobile-marquee.vue";
import AtDeluxeMobileGameMenu from "./sections/at-deluxe-mobile-game-menu.vue";
import AtDeluxeMobileTabBar from "./sections/at-deluxe-mobile-tab-bar.vue";

/**
 * at-deluxe 手機版佈局 — 視覺結構參考 slime-at99 src/pages/at99/mobile.vue
 *
 * 原作 DOM 順序：
 *   .mb-home
 *     .mb-home-slide (banner swiper + JACKPOT 浮層 + marquee 在內部底部)
 *     .mb-home-main  (左 sidebar 8 分類 + 右 2-col grid 卡片)
 *
 * Demo 化拆解：
 *   .at-deluxe-m-layout
 *     Header           ← demo 站補的 sticky header（原作沒有）
 *     Banner+JACKPOT   ← banner 大框 + 浮層 JACKPOT 七段數字
 *     Marquee          ← 跑馬燈條（news icon 動畫）
 *     GameMenu         ← 左 sidebar 8 分類 + 右 2-col grid 卡片
 *     TabBar           ← demo 站補的 bottom 5 tab（原作 layout 外層）
 *
 * 整體底色：深藍 bg-base + 角落 radial 柔光（bg-decoration）
 */
</script>

<template>
  <div class="at-deluxe-m-layout">
    <AtDeluxeMobileHeader />
    <main class="at-deluxe-m-layout__main">
      <AtDeluxeMobileBanner />
      <AtDeluxeMobileMarquee />
      <AtDeluxeMobileGameMenu />
    </main>
    <AtDeluxeMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.at-deluxe-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  background-attachment: fixed;
  overflow-x: hidden;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));

  &__main {
    position: relative;
    z-index: 1;
  }
}
</style>
