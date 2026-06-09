<script setup lang="ts">
/**
 * dahsing 三版型共用 hero banner（首存 1000 送 1000 主視覺）
 *
 * 為什麼直接 <img> 不做 swiper：原稿就是單張 hero.png 不是輪播；
 * 維持 1:1 復刻不增添原作沒有的元素。
 *
 * 為什麼 prop 接 widthMode：
 * - mobile（預設 'phone'）：margin 16px 內縮，圓角 18px
 * - desktop（'wide'）：全寬展開，兩側用 token 漸層補邊（hero.png 是直立比例）
 */
import { heroSrc } from "../_assets";

withDefaults(
  defineProps<{
    /** 'phone' 給 mobile 用、'wide' 給桌面用 */
    widthMode?: "phone" | "wide";
  }>(),
  { widthMode: "phone" }
);
</script>

<template>
  <div
    class="dahsing-hero"
    :class="{
      'dahsing-hero--phone': widthMode === 'phone',
      'dahsing-hero--wide': widthMode === 'wide'
    }"
  >
    <img class="dahsing-hero__art" :src="heroSrc" alt="首存 1000 送 1000" />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-hero {
  position: relative;
  overflow: hidden;
  background: var(--gradient-hero);
  box-shadow: var(--shadow-lg, var(--shadow));

  &--phone {
    margin: 4px 16px 0;
    border-radius: 18px;
  }

  // 桌面寬版：全寬 + 兩側漸層補邊（hero.png 是手機比例約 430:240）
  // 為避免裁切上下、又不能拉伸變形，用 background 補邊 + img 置中縮放
  &--wide {
    margin: 16px auto 0;
    width: 100%;
    max-width: 1280px;
    border-radius: 22px;
    aspect-ratio: 1280 / 320;
  }

  &__art {
    display: block;
    width: 100%;
    height: auto;
  }

  &--wide &__art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
  }
}
</style>
