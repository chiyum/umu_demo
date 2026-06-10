<script setup lang="ts">
/**
 * daheng-rank mobile：版型 V1 排行榜（1:1 對齊 phones.js v1）
 *
 * 結構順序：
 *   statusbar / header
 *   .wrap{ hero / marquee / cats-row / main(左 ranklist + 右 grid2) }
 *   promo / tabbar
 */
import DahengStatusbar from "../daheng-shared/atoms/daheng-statusbar.vue";
import DahengHeader from "../daheng-shared/atoms/daheng-header.vue";
import DahengHero from "../daheng-shared/atoms/daheng-hero.vue";
import DahengMarquee from "../daheng-shared/atoms/daheng-marquee.vue";
import DahengCatsRow from "../daheng-shared/atoms/daheng-cats-row.vue";
import DahengPromo from "../daheng-shared/atoms/daheng-promo.vue";
import DahengTabbar from "../daheng-shared/atoms/daheng-tabbar.vue";
import DahengRankMobileMain from "./sections/daheng-rank-mobile-main.vue";
</script>

<template>
  <div class="daheng-rank-m">
    <DahengStatusbar />
    <DahengHeader />
    <div class="daheng-rank-m__wrap">
      <DahengHero />
      <DahengMarquee />
      <DahengCatsRow />
      <DahengRankMobileMain />
    </div>
    <DahengPromo />
    <DahengTabbar />
  </div>
</template>

<style lang="scss" scoped>
.daheng-rank-m {
  position: relative;
  width: 100%;
  max-width: 432px;
  min-height: 100vh;
  margin: 0 auto;
  background: var(--gradient-hero);
  font-family: var(--font-body);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;

  &__wrap {
    padding: 0 16px;
  }
}
</style>
