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
// layout 改為 flex column：讓「上方固定區（header / banner / marquee）」自然撐高，
// 「下方主遊戲區（game）」透過 flex: 1 吃完剩餘高度，避免短內容在大螢幕下出現底部留白；
// TabBar 為 position: fixed 浮層（見 at-deluxe-mobile-tab-bar.vue），不在 flex 鏈內，
// padding-bottom 仍保留供 TabBar 高度避讓。
.at-deluxe-m-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  background-attachment: fixed;
  overflow-x: hidden;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));

  // main 是夾在 header 與 tabbar 間的中介容器；同樣設成 flex column 並吃完剩餘空間，
  // 才能把「撐滿剩餘高度」的責任順利傳遞給 game 區（flex:1 鏈不能斷）。
  &__main {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }
}
</style>
