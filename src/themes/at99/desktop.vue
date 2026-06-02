<script setup lang="ts">
import At99Header from "./sections/at99-header.vue";
import At99PromoBanner from "./sections/at99-promo-banner.vue";
import At99GameGrid from "./sections/at99-game-grid.vue";
import At99LiveDealerGrid from "./sections/at99-live-dealer-grid.vue";
import At99Leaderboard from "./sections/at99-leaderboard.vue";
import At99ProviderStrip from "./sections/at99-provider-strip.vue";
import At99Footer from "./sections/at99-footer.vue";

/** at99 桌面版佈局 */
</script>

<template>
  <div class="at99-layout">
    <At99Header />
    <main class="at99-layout__main">
      <At99PromoBanner />
      <At99GameGrid />
      <At99LiveDealerGrid />
      <At99Leaderboard />
      <At99ProviderStrip />
    </main>
    <At99Footer />
  </div>
</template>

<style lang="scss" scoped>
.at99-layout {
  background: radial-gradient(
      circle at 20% 10%,
      rgba(45, 212, 255, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 90%,
      rgba(168, 85, 247, 0.05) 0%,
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
  }
}
</style>
