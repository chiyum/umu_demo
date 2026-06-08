<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import slide1 from "../assets/banner/slide-1.jpg?url";
import slide2 from "../assets/banner/slide-2.jpg?url";
import slide3 from "../assets/banner/slide-3.jpg?url";

/**
 * fived mobile banner — 對齊 5d_v2 _index.scss .index-slider-wrap
 *
 * 原作結構（base/home.vue + _index.scss）：
 *   <div ref="bannerRef" class="index-slider-wrap">
 *     <swiper :slides-per-view="1" :loop :autoplay :pagination>
 *       <swiper-slide><figure :style="bg-image: url(slider01.jpg)" /></swiper-slide>
 *       ...
 *     </swiper>
 *     <div class="custom-swiper-pagination"></div>
 *   </div>
 *
 * 原作樣式重點：
 *   .index-slider-wrap aspect-ratio: 852 / 455
 *   .swiper-slide figure {
 *     background-repeat no-repeat / position center / size cover
 *     border: 2px solid #ccb28a    ← 米金邊框
 *   }
 *   .swiper-pagination-bullet {
 *     border-radius: 0   ← 方點
 *     background: rgba(#fff, 0.5)
 *     filter: drop-shadow(0 0 2px #fff700)   ← 金黃光暈
 *   }
 *
 * Demo 化：
 * - CSS-only fade swiper
 * - figure 米金邊 + 方點 dot + 金黃 drop-shadow
 */

const SLIDES = [slide1, slide2, slide3];
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
  <div class="fived-m-banner">
    <div class="fived-m-banner__slider">
      <figure
        v-for="(src, idx) in SLIDES"
        :key="idx"
        class="fived-m-banner__slide"
        :class="{ 'fived-m-banner__slide--active': activeIdx === idx }"
        :style="{ backgroundImage: `url(${src})` }"
      />

      <div class="fived-m-banner__dots">
        <span
          v-for="(_, idx) in SLIDES"
          :key="idx"
          class="fived-m-banner__dot"
          :class="{ 'fived-m-banner__dot--active': activeIdx === idx }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .index-slider-wrap：aspect-ratio 852/455
.fived-m-banner {
  padding: 14px 12px 8px;
}

.fived-m-banner__slider {
  position: relative;
  width: 100%;
  aspect-ratio: 852 / 455;
  border-radius: 8px;
  overflow: hidden;
}

// 對齊原作 figure：cover / 米金邊 2px solid #ccb28a
.fived-m-banner__slide {
  position: absolute;
  inset: 0;
  margin: 0;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  border: 2px solid var(--fived-banner-border);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }
}

// 對齊原作 swiper-pagination-bullet：方點 + 金黃 drop-shadow
.fived-m-banner__dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.fived-m-banner__dot {
  width: 12px;
  height: 4px;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.5);
  filter: drop-shadow(var(--shadow-glow-dot));
  transition: background 0.3s ease;

  &--active {
    background: rgba(255, 255, 255, 1);
  }
}
</style>
