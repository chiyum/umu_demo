<script setup lang="ts">
import banner1 from "../../assets/banner/banner-1.jpg?url";

/**
 * honest-max 桌面版 banner — 視覺骨架參考 kingdom_front long/banner.vue
 *
 * 圖檔沿用手機版 BannerGuest01.jpg（人在塔在），純 img 無 overlay
 */

const BANNERS: string[] = [banner1];
</script>

<template>
  <div class="honest-max-pc-banner">
    <div
      v-for="(src, idx) in BANNERS"
      :key="idx"
      class="honest-max-pc-banner__slide honest-max-pc-banner__slide--active"
    >
      <img :src="src" alt="" class="honest-max-pc-banner__img" />
    </div>
    <div class="honest-max-pc-banner__dots">
      <span
        v-for="(_, idx) in BANNERS"
        :key="idx"
        class="honest-max-pc-banner__dot honest-max-pc-banner__dot--active"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.honest-max-pc-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 192 / 61;
  overflow: hidden;
  background: linear-gradient(180deg, #e8e4f3 0%, #ffffff 100%);
}

.honest-max-pc-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s ease;

  &--active {
    opacity: 1;
  }
}

.honest-max-pc-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.honest-max-pc-banner__dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.honest-max-pc-banner__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);

  &--active {
    background: #ffffff;
    transform: scale(1.2);
    box-shadow: 0 0 6px #e75bff;
  }
}
</style>
