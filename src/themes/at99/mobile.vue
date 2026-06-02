<script setup lang="ts">
import At99Header from "./sections/at99-header.vue";
import At99PromoBanner from "./sections/at99-promo-banner.vue";
import At99GameGrid from "./sections/at99-game-grid.vue";
import At99LiveDealerGrid from "./sections/at99-live-dealer-grid.vue";
import At99Leaderboard from "./sections/at99-leaderboard.vue";
import At99ProviderStrip from "./sections/at99-provider-strip.vue";
import At99Footer from "./sections/at99-footer.vue";
</script>

<template>
  <div class="at99-layout at99-layout--mobile">
    <At99Header mobile />
    <main class="at99-layout__main">
      <At99PromoBanner mobile />
      <At99GameGrid mobile />
      <At99LiveDealerGrid mobile />
      <At99Leaderboard mobile />
      <At99ProviderStrip mobile />
    </main>
    <At99Footer mobile />
  </div>
</template>

<style lang="scss" scoped>
.at99-layout {
  background: radial-gradient(
      circle at 20% 10%,
      rgba(45, 212, 255, 0.08) 0%,
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
