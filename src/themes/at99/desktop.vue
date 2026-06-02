<script setup lang="ts">
import At99TopHeader from "./sections/at99-top-header.vue";
import At99LeftSidebarDock from "./sections/at99-left-sidebar-dock.vue";
import At99PromoBannerCarousel from "./sections/at99-promo-banner-carousel.vue";
import At99SlotGameGrid from "./sections/at99-slot-game-grid.vue";
import At99EsportsRow from "./sections/at99-esports-row.vue";
import At99LiveDealerRow from "./sections/at99-live-dealer-row.vue";
import At99Leaderboard from "./sections/at99-leaderboard.vue";
import At99AboutSection from "./sections/at99-about-section.vue";
import At99Footer from "./sections/at99-footer.vue";

/**
 * at99 桌面版佈局：依 GAP_ANALYSIS 10 大區順序排列
 *
 * 1. TopHeader            logo + 11 nav + 登入/開戶 + 音訊
 * 2. LeftSidebarDock      fixed 左側垂直 icon dock
 * 3. PromoBannerCarousel  雙 banner + 分頁圓點
 * 4-5. SlotGameGrid       4 tab + 6×2 = 12 tile（tabs 已合併在 grid 元件內）
 * 6. EsportsRow           電競賽事 5 tile
 * 7. LiveDealerRow        真人 5 圓形
 * 8. Leaderboard          排行榜 + tab + 表格
 * 9. AboutSection         平台介紹
 * 10. Footer              mascot + Partner + Disclaimer
 *
 * 注意：dock 為 fixed left，內容區所有 section 都會 padding-left: 60px
 * 避免被 dock 蓋住。padding 在每個 section 內 by class 控制（避免 flex 容器干擾）
 */
</script>

<template>
  <div class="at99-layout">
    <At99TopHeader />
    <At99LeftSidebarDock />

    <main class="at99-layout__main">
      <At99PromoBannerCarousel />
      <At99SlotGameGrid />
      <At99EsportsRow />
      <At99LiveDealerRow />
      <At99Leaderboard />
      <At99AboutSection />
    </main>

    <At99Footer />
  </div>
</template>

<style lang="scss" scoped>
.at99-layout {
  // kingdom DNA #9：layout 角落 radial 柔光（霓虹版，跟 noya 統一語言）
  // 原本就有兩顆 bg-overlay radial 模擬霓虹，這次抽 token 後改走 --bg-decoration，
  // variants 切色時不再寫死 bg-overlay alpha，紫 / 綠霓虹會跟著 _variants 走。
  // 不再用 circle 而是 kingdom DNA 規律的 ellipse（與 noya 視覺一致）
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }
}
</style>
