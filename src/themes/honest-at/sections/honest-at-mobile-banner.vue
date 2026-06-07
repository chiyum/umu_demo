<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import banner1 from "../assets/banner/banner-1.jpg?url";
import banner2 from "../assets/banner/banner-2.jpg?url";
import banner3 from "../assets/banner/banner-3.jpg?url";

/**
 * honest-at mobile Banner — 1:1 對齊 honest_real src/widgets/banner.vue（被 at/home.vue 引用）
 *
 * 原作 DOM：
 *   <Swiper :slides-per-view="1" :modules="[Autoplay, Pagination]" loop autoplay pagination>
 *     <SwiperSlide v-for><img v-lazy :src /></SwiperSlide>
 *   </Swiper>
 *
 * 原作圖檔：getImageUrl("at/10009.jpg") / 10010 / 10011
 *   ← AT99 誠意相迎 / 日返1% / 無上限 / JACKPOT 等大字都是「印在 jpg 內」
 *      因此這裡只能是純 <img>，禁止疊任何 HTML overlay 文字
 *
 * 原作 swiper pagination bullet：白色長條（active 16px / normal 10px / 高 4px）
 *
 * Demo 化：CSS-only autoplay 輪播（dots 點 + 淡入淡出），不裝 swiper
 */
const BANNERS: string[] = [banner1, banner2, banner3];
const activeIdx = ref<number>(0);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % BANNERS.length;
  }, 3000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
</script>

<template>
  <div class="honest-at-m-banner">
    <div
      v-for="(src, idx) in BANNERS"
      :key="idx"
      class="honest-at-m-banner__slide"
      :class="{ 'honest-at-m-banner__slide--active': activeIdx === idx }"
    >
      <img :src="src" alt="" class="honest-at-m-banner__img" />
    </div>
    <div class="honest-at-m-banner__dots">
      <span
        v-for="(_, idx) in BANNERS"
        :key="idx"
        class="honest-at-m-banner__dot"
        :class="{ 'honest-at-m-banner__dot--active': activeIdx === idx }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 純 <img> 輪播，無任何疊字 overlay
// 對齊 honest_real widgets/banner.vue — 唯一視覺主體是 img 本身
.honest-at-m-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.honest-at-m-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }
}

.honest-at-m-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// 對齊原作 swiper pagination bullet：10px×4px 白色，active 16px
.honest-at-m-banner__dots {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
}

.honest-at-m-banner__dot {
  width: 10px;
  height: 4px;
  border-radius: 9999px;
  background: #eeeeee;
  opacity: 0.8;
  transition: width 0.3s ease;

  &--active {
    width: 16px;
    background: #ffffff;
    opacity: 1;
  }
}
</style>
