<script setup lang="ts">
/**
 * daheng-grid mobile 滿版宮格：2 欄 3 列 6 張大卡（v2 對齊）
 *
 * 對應 phones.js v2：
 *   <div class="fwgrid">{6 個 gcard}</div>
 *   .fwgrid{grid-template-columns:1fr 1fr; gap:13px}
 *   .fwgrid .gcard{height:150px}
 */
import { DAHENG_GAMES } from "../../daheng-shared/_data";
</script>

<template>
  <div class="daheng-grid-mobile-grid">
    <div
      v-for="g in DAHENG_GAMES"
      :key="g.key"
      class="daheng-grid-mobile-grid__card"
    >
      <img :src="g.img" :alt="g.name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-grid-mobile-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;

  &__card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);
    box-shadow: var(--shadow);
    height: 150px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
