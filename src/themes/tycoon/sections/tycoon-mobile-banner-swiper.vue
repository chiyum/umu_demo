<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
// 借 ant-sport 4 張 banner 當 tycoon mobile 輪播 banner
// 為什麼可以借：
// - tycoon 本來就是「以 ant-sport 為骨架的藍冰系」（desktop fork ant-sport 五段、
//   sections 命名同範式），借 banner 在範式內可以接受
// - ant-sport banner 本身就是藍系運動 banner，與 tycoon 藍冰主色相容，
//   不需要再對 banner 套 mix-blend / hue-rotate 調色
import banner1 from "@/themes/ant-sport/assets/banner/banner-1.jpg?url";
import banner2 from "@/themes/ant-sport/assets/banner/banner-2.jpg?url";
import banner3 from "@/themes/ant-sport/assets/banner/banner-3.jpg?url";
import banner4 from "@/themes/ant-sport/assets/banner/banner-4.jpg?url";

/**
 * tycoon mobile banner swiper（取代原 hero 段）
 *
 * 原 hero 段是「左標語 + 右單張 figure 圖」的固定畫面，
 * 改為與 ant-sport-mobile-banner-swiper 同範式的 4 張 banner 輪播：
 * - 自寫 transform + setInterval 4 秒一張
 * - 底部圓點 indicator（active 變寬條 + 主色填）
 * - 點圓點手動切換後重啟 timer 避免馬上又被覆蓋
 * - onMounted(startAuto) / onBeforeUnmount(stopAuto) 雙保險
 *
 * 為什麼不引 swiper.js 套件：
 * - noya / ant-sport / vietvip 都已驗證自寫 200 行內可達流暢
 * - 不增加 100KB+ 依賴
 *
 * BEM class 前綴沿用檔名：.tycoon-m-banner__*
 * （與 ant-sport-m-banner / vietvip-m-banner 命名一致，便於同範式視覺比對）
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "b1", image: banner1, alt: "藍冰大亨 活動 banner 1" },
  { key: "b2", image: banner2, alt: "藍冰大亨 活動 banner 2" },
  { key: "b3", image: banner3, alt: "藍冰大亨 活動 banner 3" },
  { key: "b4", image: banner4, alt: "藍冰大亨 活動 banner 4" }
];

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

/** 輪播 timer */
let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
}

function startAuto() {
  stopAuto();
  timer = setInterval(next, 4000);
}

function stopAuto() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function goTo(idx: number) {
  activeIdx.value = idx;
  startAuto();
}

onMounted(startAuto);
onBeforeUnmount(stopAuto);
</script>

<template>
  <section class="tycoon-m-banner" aria-label="活動輪播 banner">
    <div class="tycoon-m-banner__viewport">
      <div class="tycoon-m-banner__track" :style="trackStyle">
        <article
          v-for="s in slides"
          :key="s.key"
          class="tycoon-m-banner__slide"
        >
          <img
            :src="s.image"
            :alt="s.alt"
            class="tycoon-m-banner__img"
            loading="lazy"
            decoding="async"
          />
        </article>
      </div>
    </div>

    <div class="tycoon-m-banner__dots">
      <button
        v-for="(s, i) in slides"
        :key="s.key"
        type="button"
        class="tycoon-m-banner__dot"
        :class="{ 'tycoon-m-banner__dot--on': activeIdx === i }"
        :aria-label="`第 ${i + 1} 張 banner`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊原 tycoon-mobile-hero 的視覺基底（margin / border-radius / shadow）
// - margin: 6px 14px 0 保持與 marquee / body 對齊的水平內縮
// - border-radius 18px 維持 hero 段的圓角質感
// - 高度約 200px（aspect-ratio 15/8 自動換算 → 寬度滿版時 ~190~200px）
.tycoon-m-banner {
  position: relative;
  margin: 6px 14px 0;
  padding: 0 0 8px;

  &__viewport {
    overflow: hidden;
    margin: 0;
    border-radius: 18px;
    box-shadow:
      0 8px 22px rgba(20, 70, 160, 0.3),
      inset 0 0 0 1.5px rgba(255, 255, 255, 0.4);
  }

  &__track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__slide {
    flex: 0 0 100%;
    // 對齊 ant-sport banner 原 750×400 比例（15/8）
    aspect-ratio: 15 / 8;
    overflow: hidden;
  }

  // banner 不套 filter / mix-blend：ant-sport banner 本身是藍系運動，
  // 與 tycoon 藍冰主色相容
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 10px;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 0 0 1px rgba(11, 58, 134, 0.18);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 18px;
      border-radius: 3px;
      background: var(--color-primary);
      box-shadow: 0 1px 3px rgba(11, 58, 134, 0.32);
    }
  }
}
</style>
