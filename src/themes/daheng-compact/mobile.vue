<script setup lang="ts">
/**
 * daheng-compact mobile：版型 V4 三欄密集（1:1 對齊 phones.js v4）
 *
 * 結構順序：
 *   statusbar / header
 *   .wrap{ hero('small') / marquee / cats-grid 4×2 / sec-head(全部遊戲🔥) / grid3 3×3 }
 *   promo / tabbar
 *
 * 注意：v4 是唯一用 cats-grid（4 欄宮格分類）+ hero 'small'（aspect-ratio 816/220）的版型
 */
import DahengStatusbar from "../daheng-shared/atoms/daheng-statusbar.vue";
import DahengHeader from "../daheng-shared/atoms/daheng-header.vue";
import DahengHero from "../daheng-shared/atoms/daheng-hero.vue";
import DahengMarquee from "../daheng-shared/atoms/daheng-marquee.vue";
import DahengCatsGrid from "../daheng-shared/atoms/daheng-cats-grid.vue";
import DahengSecHead from "../daheng-shared/atoms/daheng-sec-head.vue";
import DahengPromo from "../daheng-shared/atoms/daheng-promo.vue";
import DahengTabbar from "../daheng-shared/atoms/daheng-tabbar.vue";
import DahengCompactMobileGrid3 from "./sections/daheng-compact-mobile-grid3.vue";
</script>

<template>
  <div class="daheng-compact-m">
    <DahengStatusbar />
    <DahengHeader />
    <div class="daheng-compact-m__wrap">
      <DahengHero size="small" />
      <DahengMarquee />
      <DahengCatsGrid />
      <DahengSecHead title="全部遊戲" hot />
      <DahengCompactMobileGrid3 />
    </div>
    <DahengPromo />
    <DahengTabbar />
  </div>
</template>

<style lang="scss" scoped>
.daheng-compact-m {
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
