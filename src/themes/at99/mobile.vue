<script setup lang="ts">
import At99MobileTopBar from "./sections/at99-mobile-top-bar.vue";
import At99PromoBannerCarousel from "./sections/at99-promo-banner-carousel.vue";
import At99SlotGameGrid from "./sections/at99-slot-game-grid.vue";
import At99EsportsRow from "./sections/at99-esports-row.vue";
import At99LiveDealerRow from "./sections/at99-live-dealer-row.vue";
import At99Leaderboard from "./sections/at99-leaderboard.vue";
import At99AboutSection from "./sections/at99-about-section.vue";
import At99Footer from "./sections/at99-footer.vue";
import MobileBottomTabBar from "@/components/common/landing/mobile-bottom-tab-bar.vue";

/**
 * at99 手機版佈局：壓縮 PC 結構為單欄直式
 *
 * 對照 GAP_ANALYSIS 對手機版的處理原則：
 * - TopHeader 改 hamburger + logo + 登入（at99-mobile-top-bar）
 * - LeftSidebarDock 收進 hamburger drawer（已在 mobile-top-bar 內處理）
 * - PromoBannerCarousel 改全寬單張 swiper（PC 元件即為單張，mobile prop 壓縮 padding）
 * - SlotGameGrid 改 2 欄 × 6 列（mobile prop 控制）
 * - EsportsRow / LiveDealerRow 改網格自動換行（mobile prop）
 * - LeaderboardTable 縮欄位
 * - 底部加 fixed tab bar（共用元件）
 */
</script>

<template>
  <div class="at99-m-layout">
    <At99MobileTopBar />

    <main class="at99-m-layout__main">
      <At99PromoBannerCarousel mobile />
      <At99SlotGameGrid mobile />
      <At99EsportsRow mobile />
      <At99LiveDealerRow mobile />
      <At99Leaderboard mobile />
      <At99AboutSection mobile />
    </main>

    <At99Footer mobile />
    <MobileBottomTabBar />
  </div>
</template>

<style lang="scss" scoped>
.at99-m-layout {
  background: radial-gradient(
      circle at 20% 10%,
      var(--bg-overlay) 0%,
      transparent 50%
    ),
    var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;

    // 留底部 tab bar 空間（tab bar 高約 56px）
    padding-bottom: 60px;
  }
}
</style>
