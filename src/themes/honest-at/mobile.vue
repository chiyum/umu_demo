<script setup lang="ts">
import HonestAtMobileHeader from "./sections/honest-at-mobile-header.vue";
import HonestAtMobileHero from "./sections/honest-at-mobile-hero.vue";
import HonestAtMobileGameMenu from "./sections/honest-at-mobile-game-menu.vue";
import HonestAtMobileTabBar from "./sections/honest-at-mobile-tab-bar.vue";

/**
 * honest-at 手機版佈局 — 對齊 honest_real src/pages/at/home.vue
 *
 * 由上到下：
 * 1. Header     logo + 語系切換（demo 已登入視角，移除註冊/登入按鈕）
 * 2. Hero       banner 輪播 + 跑馬燈 + JACKPOT 數字框（封裝同一段）
 * 3. GameMenu   左 7 分類 sidebar + 右 game grid（熱門 / 真人 各一頁）
 * 底部 TabBar   5 個固定 tab（中間「存提」放大成 CTA 球）
 *
 * 整頁深藍底：bg-base + radial 雙角柔光
 */
</script>

<template>
  <div class="honest-at-m-layout">
    <HonestAtMobileHeader />

    <main class="honest-at-m-layout__main">
      <HonestAtMobileHero />
      <HonestAtMobileGameMenu />
    </main>

    <HonestAtMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-at-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  background-attachment: scroll;
  overflow: hidden;

  &__main {
    flex: 1;

    // 底部留出 tab bar 空間（中間 CTA 球 56px + 安全距離）
    padding-bottom: calc(100px + env(safe-area-inset-bottom));
  }
}
</style>
