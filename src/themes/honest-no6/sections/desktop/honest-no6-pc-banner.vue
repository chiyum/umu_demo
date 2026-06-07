<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import banner from "../../assets/banner/banner-1.png?url";

/**
 * honest-no6 桌面版 banner — 視覺骨架對齊 kingdom long banner
 * 圖檔沿用手機版 banner.png × 6（純 img，無 overlay）
 */
const SLIDES = Array.from({ length: 6 }, () => banner);
const activeIdx = ref<number>(0);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % SLIDES.length;
  }, 5000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
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
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-pc-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 192 / 61;
  overflow: hidden;
  background: #1a0526;
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

.honest-no6-pc-banner__dots {
  position: absolute;
  bottom: 16px;
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
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &--active {
    background: #f8b62d;
    transform: scale(1.2);
    box-shadow: 0 0 6px #f7c66c;
  }
}
</style>
