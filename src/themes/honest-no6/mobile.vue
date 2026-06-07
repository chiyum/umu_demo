<script setup lang="ts">
import HonestNo6MobileHeader from "./sections/honest-no6-mobile-header.vue";
import HonestNo6MobileHero from "./sections/honest-no6-mobile-hero.vue";
import HonestNo6MobileGameMenu from "./sections/honest-no6-mobile-game-menu.vue";
import HonestNo6MobileTabBar from "./sections/honest-no6-mobile-tab-bar.vue";

/**
 * honest-no6 手機版佈局 — 對齊 honest_real src/pages/no6/home.vue
 *
 * 由上到下：
 * 1. Header   absolute 透明 header（疊在 hero 圖上）：logo + 登入 / 註冊鈕
 * 2. Hero     城堡 hero + 「山日日」疊字 + 跑馬燈 + 3 張資訊小圖
 * 3. GameMenu 左 7 分類 sidebar + 右 2 列 girl-model 卡片 grid
 * 底部 TabBar 5 個 tab（中間「首頁」粉色圓凸 CTA）
 *
 * 整頁深黑紫底 + radial 紫光柔角
 *
 * 為什麼 header 用 absolute 而非 sticky：
 * - 原作 hero 圖延伸到 viewport 頂端，header 不能擋住圖
 * - sticky 會在捲動時固定在頂部，但對 demo 主要看首屏視覺反而干擾
 */
</script>

<template>
  <div class="honest-no6-m-layout">
    <HonestNo6MobileHeader />

    <main class="honest-no6-m-layout__main">
      <HonestNo6MobileHero />
      <HonestNo6MobileGameMenu />
    </main>

    <HonestNo6MobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-m-layout {
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

    // 底部留出 tab bar 空間 + 中間粉球凸出
    padding-bottom: calc(96px + env(safe-area-inset-bottom));
  }
}
</style>
