<script setup lang="ts">
import info1 from "../assets/header/info-1.png?url";
import info2 from "../assets/header/info-2.png?url";
import info3 from "../assets/header/info-3.png?url";

/**
 * honest-no6 mobile 三張資訊小圖 — 1:1 對齊 honest_real no6/home.vue 第 42-58 行
 *
 * 原作 DOM：
 *   <div class="grid grid-cols-3 px-[2%] my-[5px]">
 *     <img class="justify-self-start" :src="1.png" />
 *     <img class="justify-self-center" :src="2.png" />
 *     <img class="justify-self-end" :src="3.png" />
 *   </div>
 *
 * 直接純 img 3 張，沒有任何 wrapper / label / 互動，純視覺裝飾
 */
</script>

<template>
  <div class="honest-no6-m-info">
    <img
      :src="info1"
      alt=""
      class="honest-no6-m-info__img honest-no6-m-info__img--start"
    />
    <img
      :src="info2"
      alt=""
      class="honest-no6-m-info__img honest-no6-m-info__img--center"
    />
    <img
      :src="info3"
      alt=""
      class="honest-no6-m-info__img honest-no6-m-info__img--end"
    />
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .grid.grid-cols-3.px-[2%].my-[5px]
.honest-no6-m-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 2%;
  margin: 5px 0;
}

.honest-no6-m-info__img {
  height: auto;
  object-fit: contain;
  display: block;
  max-width: 100%;

  &--start {
    justify-self: start;
  }

  &--center {
    justify-self: center;
  }

  &--end {
    justify-self: end;
  }
}
</style>
