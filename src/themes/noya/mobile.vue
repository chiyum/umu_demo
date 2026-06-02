<script setup lang="ts">
import NoyaHeader from "./sections/noya-header.vue";
import NoyaHero from "./sections/noya-hero.vue";
import NoyaLiveCasinoCta from "./sections/noya-live-casino-cta.vue";
import NoyaGameGrid from "./sections/noya-game-grid.vue";
import NoyaStatsCounter from "./sections/noya-stats-counter.vue";
import NoyaAppDownload from "./sections/noya-app-download.vue";
import NoyaFooter from "./sections/noya-footer.vue";

/**
 * noya 手機版佈局：把每個 section 切到 mobile 模式（堆疊式排版）
 *
 * 為什麼用 prop 切而非另寫一份元件：節省維護成本，
 * 同 section 內部 mobile 條件分支已封裝好；多增功能時只動一處。
 */
</script>

<template>
  <div class="noya-layout noya-layout--mobile">
    <NoyaHeader mobile />
    <main class="noya-layout__main">
      <NoyaHero mobile />
      <NoyaLiveCasinoCta mobile />
      <NoyaGameGrid mobile />
      <NoyaStatsCounter mobile />
      <NoyaAppDownload mobile />
    </main>
    <NoyaFooter mobile />
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
