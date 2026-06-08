<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import slide1 from "../assets/banner/slide-1.jpg?url";
import slide2 from "../assets/banner/slide-2.jpg?url";
import slide3 from "../assets/banner/slide-3.png?url";

/**
 * at-deluxe mobile banner + JACKPOT 七段顯示數字
 *
 * 視覺結構取自 slime-at99 mobile.vue 第 430-493 行 .mb-home-slide：
 * - 一個 radial 漸層大圓角框（圓角 14px、margin 10px、padding 0.6rem）
 * - 上方 banner swiper（type=fade、3 張）
 * - 內部 absolute 「JACKPOT」橫條：左 line 漸層 + 「JACKPOT」白字
 * - JACKPOT 數字面板：透明斜切 skew(-25deg) + Orbitron 字體 10 位數字
 *
 * 對齊原作但 demo 化：
 * - swiper 改 CSS-only fade（與 honest-no6 同套）
 * - JACKPOT 數字用 hardcode demo 值「0000055688」
 * - 七段數字用 var(--at-deluxe-jackpot-digit) 跟著變體切色
 */

const SLIDES = [slide1, slide2, slide3];
const activeIdx = ref<number>(0);
let timer: number | null = null;

// JACKPOT demo 數字（10 位，與原作對齊）
const JACKPOT_DIGITS = "0000055688".split("");

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
  <div class="at-deluxe-m-banner">
    <!-- banner 輪播 + JACKPOT 一體大框（對齊原作 mb-home-slide radial 漸層大框）-->
    <div class="at-deluxe-m-banner__frame">
      <!-- JACKPOT 數字面板：absolute 浮在 banner 上方 -->
      <div class="at-deluxe-m-banner__jackpot">
        <div class="at-deluxe-m-banner__jackpot-title">
          <span class="at-deluxe-m-banner__jackpot-line" />
          <span class="at-deluxe-m-banner__jackpot-label">JACKPOT</span>
        </div>
        <div class="at-deluxe-m-banner__jackpot-numbers">
          <span
            v-for="(d, i) in JACKPOT_DIGITS"
            :key="i"
            class="at-deluxe-m-banner__jackpot-digit"
          >
            {{ d }}
          </span>
        </div>
      </div>

      <!-- swiper -->
      <div class="at-deluxe-m-banner__slider">
        <div
          v-for="(src, idx) in SLIDES"
          :key="idx"
          class="at-deluxe-m-banner__slide"
          :class="{ 'at-deluxe-m-banner__slide--active': activeIdx === idx }"
        >
          <img :src="src" alt="" class="at-deluxe-m-banner__img" />
        </div>
      </div>

      <!-- dots -->
      <div class="at-deluxe-m-banner__dots">
        <span
          v-for="(_, idx) in SLIDES"
          :key="idx"
          class="at-deluxe-m-banner__dot"
          :class="{ 'at-deluxe-m-banner__dot--active': activeIdx === idx }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 mb-home-slide：margin 10px / padding 0.6rem 0.5rem / 圓角 14px / radial 漸層底
.at-deluxe-m-banner {
  margin: 10px;
}

.at-deluxe-m-banner__frame {
  position: relative;
  padding: 10px 8px;
  background: var(--gradient-hero);
  border-radius: 14px;
  box-shadow: var(--shadow-md);
}

// JACKPOT 浮層：對齊原作 .mb-home-jackPot top:6px / 42vw / 白字 12px
.at-deluxe-m-banner__jackpot {
  position: absolute;
  top: 8px;
  left: 10px;
  z-index: 2;
  width: 44vw;
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  pointer-events: none;
}

.at-deluxe-m-banner__jackpot-title {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
}

// 對齊原作 mb-home-jackPot--line：青藍漸層細線
.at-deluxe-m-banner__jackpot-line {
  flex: 1;
  height: 2px;
  background: var(--at-deluxe-jackpot-line);
}

.at-deluxe-m-banner__jackpot-label {
  letter-spacing: 1px;
  font-family: var(--font-display);
  white-space: nowrap;
}

// 對齊原作 .mb-home-number：skew(-25deg) + Orbitron + flex space-around
.at-deluxe-m-banner__jackpot-numbers {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 25px;
  font-family: var(--font-display);
  transform: skew(-25deg, 0);
  overflow: hidden;
}

.at-deluxe-m-banner__jackpot-digit {
  color: var(--at-deluxe-jackpot-digit);
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0 0 6px var(--at-deluxe-jackpot-digit);
}

// banner 區塊
.at-deluxe-m-banner__slider {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 40px; // 預留上方 JACKPOT 浮層空間
}

.at-deluxe-m-banner__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }
}

.at-deluxe-m-banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.at-deluxe-m-banner__dots {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
}

.at-deluxe-m-banner__dot {
  width: 10px;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0 0 2px var(--primary-01));
  transition:
    width 0.3s ease,
    background 0.3s ease;

  &--active {
    width: 18px;
    background: var(--primary-01);
  }
}
</style>
