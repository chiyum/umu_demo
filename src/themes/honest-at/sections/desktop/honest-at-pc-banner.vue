<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import banner1 from "../../assets/banner/banner-1.jpg?url";
import banner2 from "../../assets/banner/banner-2.jpg?url";
import banner3 from "../../assets/banner/banner-3.jpg?url";

/**
 * honest-at 桌面版 banner — 參考 kingdom_front long/banner.vue
 *
 * 視覺骨架：
 *   全寬 swiper / aspect-ratio 192/61（kingdom long 比例）/ pagination 白色 bullet
 *
 * 圖檔沿用手機版 banner JPG（10009/10010/10011），內含 AT99 hero 視覺
 * 禁止疊任何 HTML overlay 文字
 */

const BANNERS: string[] = [banner1, banner2, banner3];
const activeIdx = ref<number>(0);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % BANNERS.length;
  }, 5000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
</script>

<template>
  <div class="honest-at-pc-banner">
    <div
      v-for="(src, idx) in BANNERS"
      :key="idx"
      class="honest-at-pc-banner__slide"
      :class="{ 'honest-at-pc-banner__slide--active': activeIdx === idx }"
    >
      <img :src="src" alt="" class="honest-at-pc-banner__img" />
    </div>
    <div class="honest-at-pc-banner__dots">
      <span
        v-for="(_, idx) in BANNERS"
        :key="idx"
        class="honest-at-pc-banner__dot"
        :class="{ 'honest-at-pc-banner__dot--active': activeIdx === idx }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long banner：aspect-ratio 192/61 / 全寬 / pagination bullet 白色
.honest-at-pc-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 192 / 61;
  overflow: hidden;
  background: #050a1a;
}

.honest-at-pc-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s ease;

  &--active {
    opacity: 1;
  }
}

.honest-at-pc-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.honest-at-pc-banner__dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.honest-at-pc-banner__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &--active {
    background: #ffffff;
    transform: scale(1.2);
    box-shadow: 0 0 6px #3aa2ec;
  }
}
</style>
