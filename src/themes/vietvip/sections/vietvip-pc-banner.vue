<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
// 改用 vietvip 自家 banner（任務要求「素材拿該專案的素材」）
// 與 mobile 同 4 張：FIFA / 777 SLOTS / 提款獎勵 / 春節，
// 都是 lilian_vietvip_web 原作真實 demo 圖，自帶 VietVip 品牌字樣與越南文文案。
// PC 顯示時 aspect 改為 1920/600（mobile 是 16/9 卡片），
// 同樣 4 張橫向 stretch 完整呈現紅金 hero 視覺
import banner01 from "../assets/banner/banner-01.jpg?url";
import banner02 from "../assets/banner/banner-02.jpg?url";
import banner08 from "../assets/banner/banner-08.jpg?url";
import banner09 from "../assets/banner/banner-09.jpg?url";

/**
 * vietvip PC banner — 全寬大圖輪播 + 金邊外框 + 葉脈光帶
 *
 * 與 mobile banner 共用同 4 張素材，但 PC 走全寬 hero 呈現方式：
 * - 1920×600 aspect-ratio（mobile 是 16/9 卡片版）
 * - 左右箭頭 + 底部圓點操作（mobile 只有圓點）
 * - swoosh 光帶 opacity 同 mobile 降到 0.4（自家 banner 已是紅金調，不能再疊太厚）
 *
 * 為什麼 PC banner 高度設成 600 而非 700：
 * - 越南 VIP 設計常見「不過高的 hero」+ 下方資訊密度高
 * - 700 太高會在 1440 viewport 把 fold 線壓到 banner 內，後續內容看不到
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "p1", image: banner01, alt: "VietVip Pro FIFA 2022" },
  { key: "p2", image: banner02, alt: "VietVip Pro 777 Slots" },
  { key: "p3", image: banner08, alt: "VietVip Pro 提款獎勵" },
  { key: "p4", image: banner09, alt: "VietVip Pro 春節" }
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
  <section class="vietvip-pc-banner" aria-label="活動 banner 輪播">
    <div class="vietvip-pc-banner__viewport">
      <div class="vietvip-pc-banner__track" :style="trackStyle">
        <article
          v-for="s in slides"
          :key="s.key"
          class="vietvip-pc-banner__slide"
        >
          <img
            :src="s.image"
            :alt="s.alt"
            class="vietvip-pc-banner__img"
            loading="lazy"
            decoding="async"
          />
        </article>
      </div>
      <!-- 金色葉脈光帶：對齊 mobile banner 視覺呼應 -->
      <div class="vietvip-pc-banner__streak" aria-hidden="true" />
    </div>

    <button
      type="button"
      class="vietvip-pc-banner__arrow vietvip-pc-banner__arrow--prev"
      aria-label="上一張 banner"
      @click="handlePrev"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      type="button"
      class="vietvip-pc-banner__arrow vietvip-pc-banner__arrow--next"
      aria-label="下一張 banner"
      @click="handleNext"
    >
      <span aria-hidden="true">›</span>
    </button>

    <div class="vietvip-pc-banner__dots">
      <button
        v-for="(s, i) in slides"
        :key="s.key"
        type="button"
        class="vietvip-pc-banner__dot"
        :class="{ 'vietvip-pc-banner__dot--on': activeIdx === i }"
        :aria-label="`第 ${i + 1} 張 banner`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.vietvip-pc-banner {
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
    aspect-ratio: 1920 / 600;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    // 用 vietvip 自家紅金 banner，不套 filter 保留原作完整視覺
  }

  // 金色葉脈光帶：右上角輻射 + 對角線白光
  // opacity 同 mobile banner 降到 0.4（vietvip 自家 banner 已是紅金調）
  &__streak {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        70% 60% at 80% 15%,
        var(--vietvip-streak) 0%,
        transparent 60%
      ),
      linear-gradient(
        120deg,
        transparent 55%,
        var(--vietvip-streak) 62%,
        transparent 68%
      );
    mix-blend-mode: screen;
    opacity: 0.4;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1.5px solid var(--vietvip-gold-2);
    background: rgba(28, 3, 9, 0.55);
    color: var(--vietvip-gold-1);
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 2;

    &:hover {
      background: var(--gradient-gold);
      color: var(--text-on-gold);
      border-color: var(--vietvip-gold-1);
    }

    &--prev {
      left: 32px;
    }

    &--next {
      right: 32px;
    }
  }

  &__dots {
    position: absolute;
    bottom: 22px;
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
      width: 28px;
      border-radius: 4px;
      background: var(--vietvip-gold-1);
    }
  }
}
</style>
