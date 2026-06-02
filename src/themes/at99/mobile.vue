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
 * 對照原 at99tw.net mobile（m.at99tw.net）：
 * - TopHeader 改 hamburger + logo + 登入（at99-mobile-top-bar）
 * - LeftSidebarDock 收進 hamburger drawer（已在 mobile-top-bar 內處理）
 * - 底部 bottom tab bar：5 個 icon，中央「存提」凸起（round 4 對齊）
 * - PromoBannerCarousel / SlotGameGrid / EsportsRow / LiveDealerRow 用 mobile prop 壓縮
 */

/**
 * at99 mobile 的 bottom tab 對齊 m.at99tw.net 結構：5 個 icon，中央「存提」凸起
 *
 * 原站順序：優惠 / 線上客服 / 存提(凸) / 帳號 / 我們
 * 用 Material icon 模擬同樣語意，raised 旗標讓共用元件套用凸起樣式
 */
const tabItems = [
  { key: "promo", icon: "redeem", label: "優惠" },
  { key: "service", icon: "support_agent", label: "線上客服" },
  {
    key: "deposit",
    icon: "account_balance_wallet",
    label: "存提",
    raised: true
  },
  { key: "account", icon: "person", label: "帳號" },
  { key: "mine", icon: "apps", label: "我們" }
];
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
    <MobileBottomTabBar :items="tabItems" />
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
