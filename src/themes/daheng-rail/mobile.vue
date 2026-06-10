<script setup lang="ts">
/**
 * daheng-rail mobile：版型 V3 橫向滑軌（1:1 對齊 phones.js v3）
 *
 * 結構順序：
 *   statusbar / header
 *   .wrap{ hero / marquee / cats-row }
 *   3 條 rails（沒包在 .wrap 內 — 原稿 rail 的 padding 0 16px 是 rail 自己的，wrap 在前面就關閉）
 *   promo / tabbar
 */
import DahengStatusbar from "../daheng-shared/atoms/daheng-statusbar.vue";
import DahengHeader from "../daheng-shared/atoms/daheng-header.vue";
import DahengHero from "../daheng-shared/atoms/daheng-hero.vue";
import DahengMarquee from "../daheng-shared/atoms/daheng-marquee.vue";
import DahengCatsRow from "../daheng-shared/atoms/daheng-cats-row.vue";
import DahengPromo from "../daheng-shared/atoms/daheng-promo.vue";
import DahengTabbar from "../daheng-shared/atoms/daheng-tabbar.vue";
import DahengRailMobileRails from "./sections/daheng-rail-mobile-rails.vue";
</script>

<template>
  <div class="daheng-rail-m">
    <DahengStatusbar />
    <DahengHeader />
    <div class="daheng-rail-m__wrap">
      <DahengHero />
      <DahengMarquee />
      <DahengCatsRow />
    </div>
    <DahengRailMobileRails />
    <DahengPromo />
    <DahengTabbar />
  </div>
</template>

<style lang="scss" scoped>
.daheng-rail-m {
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
