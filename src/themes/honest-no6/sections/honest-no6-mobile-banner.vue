<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import banner from "../assets/banner/banner-1.png?url";

/**
 * honest-no6 mobile banner — 1:1 對齊 honest_real src/widgets/pages/no6/banner.vue
 *
 * 原作 DOM：
 *   <Swiper :slides-per-view="1" loop autoplay pagination class="swiper-no6">
 *     <SwiperSlide v-for="banner.png × 6" class="swiper-slide-custom">
 *       <img v-lazy class="w-full h-full" :src="banner.png" />
 *     </SwiperSlide>
 *   </Swiper>
 *
 * 原作圖檔：banner.png（包含「山日日」、「儲值1000試送1000」等所有文字 + 三尊女戰士剪影）
 *
 * **絕對禁止疊任何 HTML overlay**（標題副標 tags），banner.png 已包含全部視覺
 *
 * 原作 swiper pagination bullet：active 16px / 高 4px / 預設白色 0.8 透明 / active 金色 #f8b62d
 * 原作 pagination bottom: 24px（比一般 swiper 高）
 *
 * Demo 化：CSS-only autoplay + dots，純 img
 */

// 對齊原作：6 個 slide 都是同一張 banner.png
const SLIDES = Array.from({ length: 6 }, () => banner);
const activeIdx = ref<number>(0);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % SLIDES.length;
  }, 3500);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
</script>

<template>
  <div class="honest-no6-m-banner">
    <div
      v-for="(src, idx) in SLIDES"
      :key="idx"
      class="honest-no6-m-banner__slide"
      :class="{ 'honest-no6-m-banner__slide--active': activeIdx === idx }"
    >
      <img :src="src" alt="" class="honest-no6-m-banner__img" />
    </div>
    <div class="honest-no6-m-banner__dots">
      <span
        v-for="(_, idx) in SLIDES"
        :key="idx"
        class="honest-no6-m-banner__dot"
        :class="{ 'honest-no6-m-banner__dot--active': activeIdx === idx }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 純 <img> 輪播，無任何 HTML overlay
.honest-no6-m-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
}

.honest-no6-m-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }
}

.honest-no6-m-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// 對齊原作 swiper-no6 .swiper-pagination：bottom 24px / bullet 10×4 / active 16×4 金色
.honest-no6-m-banner__dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
}

.honest-no6-m-banner__dot {
  width: 10px;
  height: 4px;
  border-radius: 9999px;
  background: #eeeeee;
  opacity: 0.8;
  transition:
    width 0.3s ease,
    background 0.3s ease;

  &--active {
    width: 16px;
    background: #f8b62d;
    opacity: 1;
  }
}
</style>
