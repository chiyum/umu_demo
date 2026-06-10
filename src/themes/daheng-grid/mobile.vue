<script setup lang="ts">
/**
 * daheng-grid mobile：版型 V2 滿版宮格（1:1 對齊 phones.js v2）
 *
 * 結構順序：
 *   statusbar / header
 *   .wrap{ hero / marquee / cats-row / sec-head(熱門遊戲🔥) / fwgrid }
 *   promo / tabbar
 */
import DahengStatusbar from "../daheng-shared/atoms/daheng-statusbar.vue";
import DahengHeader from "../daheng-shared/atoms/daheng-header.vue";
import DahengHero from "../daheng-shared/atoms/daheng-hero.vue";
import DahengMarquee from "../daheng-shared/atoms/daheng-marquee.vue";
import DahengCatsRow from "../daheng-shared/atoms/daheng-cats-row.vue";
import DahengSecHead from "../daheng-shared/atoms/daheng-sec-head.vue";
import DahengPromo from "../daheng-shared/atoms/daheng-promo.vue";
import DahengTabbar from "../daheng-shared/atoms/daheng-tabbar.vue";
import DahengGridMobileGrid from "./sections/daheng-grid-mobile-grid.vue";
</script>

<template>
  <div class="daheng-grid-m">
    <DahengStatusbar />
    <DahengHeader />
    <div class="daheng-grid-m__wrap">
      <DahengHero />
      <DahengMarquee />
      <DahengCatsRow />
      <DahengSecHead title="熱門遊戲" hot />
      <DahengGridMobileGrid />
    </div>
    <DahengPromo />
    <DahengTabbar />
  </div>
</template>

<style lang="scss" scoped>
.daheng-grid-m {
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
