<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import banner1 from "../../assets/desktop/banner/mySwiper1.jpg?url";
import banner2 from "../../assets/desktop/banner/mySwiper2.jpg?url";
import banner3 from "../../assets/desktop/banner/mySwiper3.png?url";
import bannerSide from "../../assets/desktop/banner/banner.jpg?url";

/**
 * at99 桌面版 banner — 視覺結構參考 slime-at99 desktop.vue .home-banner
 *
 * 原作 DOM：
 *   .home-banner (flex / gap 20px)
 *     Splide swiper（3 張 mySwiperX.jpg，autoplay 3s）→ flex 1
 *     <a.home-banner--banner><img banner.jpg /> → max-width 22%
 *
 * Demo 化策略：
 * - 左側 swiper 3 張輪播（CSS-only fade transition）
 * - 右側 22% 大圖（純展示，無路由跳轉）
 * - 圓角 24px（對齊 .home-banner--img）
 */
const SLIDES = [banner1, banner2, banner3];
const activeIdx = ref<number>(0);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % SLIDES.length;
  }, 3000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
</script>

<template>
  <div class="at99-pc-banner">
    <div class="at99-pc-banner__swiper">
      <div
        v-for="(src, idx) in SLIDES"
        :key="idx"
        class="at99-pc-banner__slide"
        :class="{ 'at99-pc-banner__slide--active': activeIdx === idx }"
      >
        <img :src="src" alt="" class="at99-pc-banner__slide-img" />
      </div>
    </div>
    <a class="at99-pc-banner__side" href="#">
      <img :src="bannerSide" alt="" class="at99-pc-banner__side-img" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 slime-at99 .home-banner：flex row + gap 20px / 圓角 24px / 右側 22%
.at99-pc-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  &__swiper {
    position: relative;
    flex: 1;
    aspect-ratio: 18 / 7;
    border-radius: 24px;
    overflow: hidden;
    background: var(--bg-base-deep);
  }

  &__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.8s ease;

    &--active {
      opacity: 1;
    }
  }

  &__slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__side {
    flex: 0 0 22%;
    aspect-ratio: 4 / 5;
    border-radius: 24px;
    overflow: hidden;
    text-decoration: none;
    box-shadow: var(--shadow);
  }

  &__side-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (width <= 1280px) {
  .at99-pc-banner__side {
    display: none;
  }
}
</style>
