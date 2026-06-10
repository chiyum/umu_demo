<script setup lang="ts">
/**
 * daheng-magazine mobile：版型 V6 雜誌精選（1:1 對齊 phones.js v6）
 *
 * 結構順序：
 *   statusbar / header
 *   .wrap{ chips(6 個分類 chip) / feature(大 hero + 立即遊玩 CTA) /
 *         sec-head(精選遊戲🔥) / masonry 2 欄 6 張 }
 *   promo / tabbar
 *
 * 注意：
 * - v6 是唯一用 chips 取代 cats-row 的版型
 * - v6 沒有 hero atom（feature 元件替代）
 * - sec-head 在 feature 後 masonry 前
 */
import DahengStatusbar from "../daheng-shared/atoms/daheng-statusbar.vue";
import DahengHeader from "../daheng-shared/atoms/daheng-header.vue";
import DahengChips from "../daheng-shared/atoms/daheng-chips.vue";
import DahengSecHead from "../daheng-shared/atoms/daheng-sec-head.vue";
import DahengPromo from "../daheng-shared/atoms/daheng-promo.vue";
import DahengTabbar from "../daheng-shared/atoms/daheng-tabbar.vue";
import DahengMagazineMobileFeature from "./sections/daheng-magazine-mobile-feature.vue";
import DahengMagazineMobileMasonry from "./sections/daheng-magazine-mobile-masonry.vue";
</script>

<template>
  <div class="daheng-magazine-m">
    <DahengStatusbar />
    <DahengHeader />
    <div class="daheng-magazine-m__wrap">
      <DahengChips />
      <DahengMagazineMobileFeature />
      <DahengSecHead title="精選遊戲" hot />
      <DahengMagazineMobileMasonry />
    </div>
    <DahengPromo />
    <DahengTabbar />
  </div>
</template>

<style lang="scss" scoped>
.daheng-magazine-m {
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
