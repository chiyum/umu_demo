<script setup lang="ts">
import NoyaHeader from "./sections/noya-header.vue";
import NoyaHero from "./sections/noya-hero.vue";
import NoyaLiveCasinoCta from "./sections/noya-live-casino-cta.vue";
import NoyaGameGrid from "./sections/noya-game-grid.vue";
import NoyaStatsCounter from "./sections/noya-stats-counter.vue";
import NoyaAppDownload from "./sections/noya-app-download.vue";
import NoyaFooter from "./sections/noya-footer.vue";

/**
 * noya 桌面版佈局：依設計圖順序排列各個 section
 *
 * 注意：所有顏色都由 [data-theme="noya"] CSS var 提供，
 * 不寫死任何顏色，這樣切換配色時不必碰元件。
 */
</script>

<template>
  <div class="noya-layout">
    <NoyaHeader />
    <main class="noya-layout__main">
      <NoyaHero />
      <NoyaLiveCasinoCta />
      <NoyaGameGrid />
      <NoyaStatsCounter />
      <NoyaAppDownload />
    </main>
    <NoyaFooter />
  </div>
</template>

<style lang="scss" scoped>
.noya-layout {
  background: var(--bg-base);
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
