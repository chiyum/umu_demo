<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
// 從 ant-sport 借 4 張藍系運動 banner（避免新增外部圖檔）
import banner1 from "@/themes/ant-sport/assets/banner/banner-1.jpg?url";
import banner2 from "@/themes/ant-sport/assets/banner/banner-2.jpg?url";
import banner3 from "@/themes/ant-sport/assets/banner/banner-3.jpg?url";
import banner4 from "@/themes/ant-sport/assets/banner/banner-4.jpg?url";

/**
 * tycoon PC banner — 全寬大圖輪播
 *
 * 結構與 ant-sport PC banner 對齊（4 張輪播 + 左右箭頭 + 底部圓點），
 * 但加入「冰光 swoosh」覆蓋層，營造設計稿原 .hero swoosh 效果在 PC 版的呼應：
 * - 透過 ::after 在 viewport 上方疊一條對角白光
 * - mix-blend-mode: screen 讓白光與下方圖混合產生金屬冰光感
 * - 不影響箭頭 / 圓點互動（pointer-events: none）
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "p1", image: banner1, alt: "tycoon PC banner 1" },
  { key: "p2", image: banner2, alt: "tycoon PC banner 2" },
  { key: "p3", image: banner3, alt: "tycoon PC banner 3" },
  { key: "p4", image: banner4, alt: "tycoon PC banner 4" }
];

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

let timer: ReturnType<typeof setInterval> | null = null;

function next(): void {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
}

function prev(): void {
  activeIdx.value = (activeIdx.value - 1 + slides.length) % slides.length;
}

function startAuto(): void {
  stopAuto();
  timer = setInterval(next, 5000);
}

function stopAuto(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function goTo(idx: number): void {
  activeIdx.value = idx;
  startAuto();
}

function handlePrev(): void {
  prev();
  startAuto();
}

function handleNext(): void {
  next();
  startAuto();
}

onMounted(startAuto);
onBeforeUnmount(stopAuto);
</script>

<template>
  <section class="tycoon-pc-banner" aria-label="活動 banner 輪播">
    <div class="tycoon-pc-banner__viewport">
      <div class="tycoon-pc-banner__track" :style="trackStyle">
        <article
          v-for="s in slides"
          :key="s.key"
          class="tycoon-pc-banner__slide"
        >
          <img
            :src="s.image"
            :alt="s.alt"
            class="tycoon-pc-banner__img"
            loading="lazy"
            decoding="async"
          />
        </article>
      </div>
      <!-- 冰光 swoosh 對角線條紋：與 mobile hero 視覺呼應 -->
      <div class="tycoon-pc-banner__swoosh" aria-hidden="true" />
    </div>

    <button
      type="button"
      class="tycoon-pc-banner__arrow tycoon-pc-banner__arrow--prev"
      aria-label="上一張 banner"
      @click="handlePrev"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      type="button"
      class="tycoon-pc-banner__arrow tycoon-pc-banner__arrow--next"
      aria-label="下一張 banner"
      @click="handleNext"
    >
      <span aria-hidden="true">›</span>
    </button>

    <div class="tycoon-pc-banner__dots">
      <button
        v-for="(s, i) in slides"
        :key="s.key"
        type="button"
        class="tycoon-pc-banner__dot"
        :class="{ 'tycoon-pc-banner__dot--on': activeIdx === i }"
        :aria-label="`第 ${i + 1} 張 banner`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tycoon-pc-banner {
  position: relative;
  width: 100%;
  background: var(--bg-base-deep);
  overflow: hidden;

  &__viewport {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  &__track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__slide {
    flex: 0 0 100%;
    aspect-ratio: 1920 / 700;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // 冰光 swoosh：兩條對角白光 + mix-blend-mode screen
  // 這是 tycoon 與 ant-sport 視覺差異點 — 體現「藍冰」金屬光感
  &__swoosh {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
        115deg,
        transparent 35%,
        var(--tycoon-streak-1) 42%,
        transparent 48%
      ),
      linear-gradient(
        115deg,
        transparent 60%,
        var(--tycoon-streak-2) 66%,
        transparent 70%
      );
    mix-blend-mode: screen;
    opacity: 0.7;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(11, 58, 134, 0.32);
    color: #ffffff;
    font-size: 26px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 2;

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    &--prev {
      left: 24px;
    }

    &--next {
      right: 24px;
    }
  }

  &__dots {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 2;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 24px;
      border-radius: 4px;
      background: var(--color-primary);
    }
  }
}
</style>
