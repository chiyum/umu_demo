<script setup lang="ts">
/**
 * daheng-list mobile：版型 V5 清單榜單（1:1 對齊 phones.js v5）
 *
 * 結構順序：
 *   statusbar / header
 *   .wrap{ hero / marquee / cats-row / sec-head(人氣榜單🔥) / glist 6 列 }
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
import DahengListMobileList from "./sections/daheng-list-mobile-list.vue";
</script>

<template>
  <div class="daheng-list-m">
    <DahengStatusbar />
    <DahengHeader />
    <div class="daheng-list-m__wrap">
      <DahengHero />
      <DahengMarquee />
      <DahengCatsRow />
      <DahengSecHead title="人氣榜單" hot />
      <DahengListMobileList />
    </div>
    <DahengPromo />
    <DahengTabbar />
  </div>
</template>

<style lang="scss" scoped>
.daheng-list-m {
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
