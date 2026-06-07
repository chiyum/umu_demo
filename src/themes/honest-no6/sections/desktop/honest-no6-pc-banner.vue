<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import banner from "../../assets/banner/banner-1.png?url";

/**
 * honest-no6 桌面版 banner — 視覺結構參考 slime-wu88-pc widgets/index/banner.vue
 *
 * 對應原作 DOM：
 *   <swiper effect="fade" autoplay loop pagination navigation>
 *     <swiper-slide v-for=banner items>
 *       <div bannerImg :style backgroundImage>
 *
 * Demo 化：純 img 輪播（沿用手機 banner.png × 6），fade 切換 + 圓點
 * 禁止疊任何 HTML overlay（山日日等字都在 banner.png 內）
 */
const SLIDES = Array.from({ length: 6 }, () => banner);
const activeIdx = ref<number>(0);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % SLIDES.length;
  }, 2500);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});

function goTo(idx: number): void {
  activeIdx.value = idx;
}
</script>

<template>
  <div class="honest-no6-pc-banner">
    <div
      v-for="(src, idx) in SLIDES"
      :key="idx"
      class="honest-no6-pc-banner__slide"
      :class="{ 'honest-no6-pc-banner__slide--active': activeIdx === idx }"
    >
      <img :src="src" alt="" class="honest-no6-pc-banner__img" />
    </div>

    <div class="honest-no6-pc-banner__dots">
      <span
        v-for="(_, idx) in SLIDES"
        :key="idx"
        class="honest-no6-pc-banner__dot"
        :class="{ 'honest-no6-pc-banner__dot--active': activeIdx === idx }"
        @click="goTo(idx)"
      />
    </div>

    <button
      type="button"
      class="honest-no6-pc-banner__arrow honest-no6-pc-banner__arrow--prev"
      @click="goTo((activeIdx - 1 + SLIDES.length) % SLIDES.length)"
      aria-label="上一張"
    />
    <button
      type="button"
      class="honest-no6-pc-banner__arrow honest-no6-pc-banner__arrow--next"
      @click="goTo((activeIdx + 1) % SLIDES.length)"
      aria-label="下一張"
    />
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-pc-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 192 / 65;
  overflow: hidden;
  background: var(--bg-base-deep);
}

.honest-no6-pc-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s ease;

  &--active {
    opacity: 1;
  }
}

.honest-no6-pc-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// pagination dots
.honest-no6-pc-banner__dots {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.honest-no6-pc-banner__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &--active {
    background: var(--secondary-01);
    transform: scale(1.25);
    box-shadow: 0 0 6px var(--secondary-01);
  }
}

// navigation arrows
.honest-no6-pc-banner__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--secondary-01);
  cursor: pointer;
  z-index: 3;
  transition: background 0.18s ease;

  &--prev {
    left: 24px;
  }

  &--next {
    right: 24px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    border-top: 2px solid var(--secondary-01);
    border-right: 2px solid var(--secondary-01);
    transform: translateX(-2px) rotate(45deg);
  }

  &--prev::before {
    transform: translateX(2px) rotate(225deg);
  }
}
</style>
