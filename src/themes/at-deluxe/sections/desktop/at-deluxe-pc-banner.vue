<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import slide1 from "../../assets/banner/slide-1.jpg?url";
import slide2 from "../../assets/banner/slide-2.jpg?url";
import slide3 from "../../assets/banner/slide-3.png?url";

/**
 * at-deluxe desktop banner + JACKPOT 七段顯示
 *
 * 視覺結構取自 slime-at99 desktop.vue 第 296-322 行 .home-banner：
 * - 兩段：home-mySwiper（多 slide 輪播）+ home-banner--banner（固定推廣 banner，
 *   demo 化省略）
 *
 * Demo 化：
 * - 取一張 slide 大圖 + 旁掛 JACKPOT 七段數字面板（PC 寬度允許）
 * - CSS-only fade swiper
 */

const SLIDES = [slide1, slide2, slide3];
const activeIdx = ref<number>(0);
let timer: number | null = null;

const JACKPOT_DIGITS = "00000556880".split("");

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
  <section class="at-deluxe-pc-banner">
    <div class="at-deluxe-pc-banner__inner">
      <div class="at-deluxe-pc-banner__slider">
        <div
          v-for="(src, idx) in SLIDES"
          :key="idx"
          class="at-deluxe-pc-banner__slide"
          :class="{ 'at-deluxe-pc-banner__slide--active': activeIdx === idx }"
        >
          <img :src="src" alt="" class="at-deluxe-pc-banner__img" />
        </div>

        <div class="at-deluxe-pc-banner__dots">
          <span
            v-for="(_, idx) in SLIDES"
            :key="idx"
            class="at-deluxe-pc-banner__dot"
            :class="{
              'at-deluxe-pc-banner__dot--active': activeIdx === idx
            }"
          />
        </div>
      </div>

      <!-- JACKPOT 浮在 banner 左上角，賭場大廳常見視覺 -->
      <div class="at-deluxe-pc-banner__jackpot">
        <div class="at-deluxe-pc-banner__jackpot-title">
          <span class="at-deluxe-pc-banner__jackpot-line" />
          <span class="at-deluxe-pc-banner__jackpot-label">JACKPOT</span>
          <span class="at-deluxe-pc-banner__jackpot-line" />
        </div>
        <div class="at-deluxe-pc-banner__jackpot-numbers">
          <span
            v-for="(d, i) in JACKPOT_DIGITS"
            :key="i"
            class="at-deluxe-pc-banner__jackpot-digit"
          >
            {{ d }}
          </span>
        </div>
        <div class="at-deluxe-pc-banner__jackpot-sub">當前累積獎池</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-banner {
  padding: 24px 0;
}

.at-deluxe-pc-banner__inner {
  position: relative;
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  border-radius: 16px;
  background: var(--gradient-hero);
  padding: 16px;
  box-shadow: var(--shadow-lg);
}

.at-deluxe-pc-banner__slider {
  position: relative;
  width: 100%;
  aspect-ratio: 1248 / 360;
  overflow: hidden;
  border-radius: 10px;
}

.at-deluxe-pc-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }
}

.at-deluxe-pc-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.at-deluxe-pc-banner__dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.at-deluxe-pc-banner__dot {
  width: 12px;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0 0 2px var(--primary-01));
  transition:
    width 0.3s ease,
    background 0.3s ease;

  &--active {
    width: 20px;
    background: var(--primary-01);
  }
}

// JACKPOT 浮層：絕對定位左上、PC 寬度有空間
.at-deluxe-pc-banner__jackpot {
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 3;
  width: 360px;
  padding: 14px 18px;
  background: rgba(5, 9, 19, 0.72);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: #ffffff;
  pointer-events: none;
}

.at-deluxe-pc-banner__jackpot-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.at-deluxe-pc-banner__jackpot-line {
  flex: 1;
  height: 2px;
  background: var(--at-deluxe-jackpot-line);
}

.at-deluxe-pc-banner__jackpot-label {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--primary-01);
  text-shadow: 0 0 6px var(--primary-01);
}

.at-deluxe-pc-banner__jackpot-numbers {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  font-family: var(--font-display);
  transform: skew(-25deg, 0);
}

.at-deluxe-pc-banner__jackpot-digit {
  color: var(--at-deluxe-jackpot-digit);
  font-size: 28px;
  font-weight: 700;
  text-shadow: 0 0 8px var(--at-deluxe-jackpot-digit);
}

.at-deluxe-pc-banner__jackpot-sub {
  margin-top: 6px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-muted);
}
</style>
