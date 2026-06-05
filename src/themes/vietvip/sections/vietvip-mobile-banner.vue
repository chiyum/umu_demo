<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
// 借用 ant-sport 4 張既有 banner 當 demo 用
// 為什麼借 ant-sport 而不是越南專案內的 banner_01.jpg：
// - 原專案 banner 多帶「KP 188」之類的具體品牌字樣，借進來會品牌混雜
// - ant-sport 4 張中性運動 banner 配合 vietvip 紅金 token 後（filter / mix-blend）視覺自然
import banner1 from "@/themes/ant-sport/assets/banner/banner-1.jpg?url";
import banner2 from "@/themes/ant-sport/assets/banner/banner-2.jpg?url";
import banner3 from "@/themes/ant-sport/assets/banner/banner-3.jpg?url";

/**
 * vietvip mobile banner
 *
 * 對齊 lilian_vietvip_web src/widgets/banner.vue（swiper-based）：
 * - 原專案是 SwiperJS 自動輪播 + 排行榜雙 slide
 * - demo 站不需要排行榜邏輯，純粹 3 張 banner 5 秒自動切
 * - 加上「越南 VIP 風」金邊外框 + 葉脈裝飾光帶
 *
 * 為什麼不依賴 SwiperJS：
 * - 主專案 demo 已用「純 CSS transform + setInterval」實作輪播（tycoon-pc-banner），
 *   不需引入 swiper 套件徒增 bundle 體積
 * - 自製 200 行內就可以涵蓋輪播 + 指示點 + 自動播放
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "m1", image: banner1, alt: "vietvip banner 1" },
  { key: "m2", image: banner2, alt: "vietvip banner 2" },
  { key: "m3", image: banner3, alt: "vietvip banner 3" }
];

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

let timer: ReturnType<typeof setInterval> | null = null;

function next(): void {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
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

onMounted(startAuto);
onBeforeUnmount(stopAuto);
</script>

<template>
  <section class="vietvip-m-banner" aria-label="活動 banner 輪播">
    <div class="vietvip-m-banner__frame">
      <div class="vietvip-m-banner__viewport">
        <div class="vietvip-m-banner__track" :style="trackStyle">
          <article
            v-for="s in slides"
            :key="s.key"
            class="vietvip-m-banner__slide"
          >
            <img
              :src="s.image"
              :alt="s.alt"
              class="vietvip-m-banner__img"
              loading="lazy"
            />
          </article>
        </div>
        <!-- 金色光帶：模擬 home_background2.png 葉脈金邊向中間延伸 -->
        <div class="vietvip-m-banner__streak" aria-hidden="true" />
      </div>

      <div class="vietvip-m-banner__dots">
        <button
          v-for="(s, i) in slides"
          :key="s.key"
          type="button"
          class="vietvip-m-banner__dot"
          :class="{ 'vietvip-m-banner__dot--on': activeIdx === i }"
          :aria-label="`第 ${i + 1} 張 banner`"
          @click="goTo(i)"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊越南 VIP「金框內襯紅 banner」的視覺
// - 外層 frame：金漸層邊框 + 陰影
// - 內層 viewport：圓角 16px 顯示 banner，圖上疊金色 streak 強化品牌感
.vietvip-m-banner {
  margin: 12px 14px 0;

  &__frame {
    position: relative;
    padding: 3px;
    border-radius: 18px;
    background: var(--gradient-gold);
    box-shadow:
      0 8px 22px var(--vietvip-card-glow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  &__viewport {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 15px;
    overflow: hidden;
    background: var(--bg-base-deep);
  }

  &__track {
    display: flex;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__slide {
    flex: 0 0 100%;
    height: 100%;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;

    // 借用的 banner 偏冷藍，疊紅色加 mix-blend 拉到紅金調性
    // 為什麼用 hue-rotate 而非 sepia：sepia 會把彩度壓死變黃濁；
    // hue-rotate(330deg) 把藍紫往紅色推、保留亮度
    filter: brightness(0.85) saturate(1.1) hue-rotate(330deg);
  }

  // 金色光帶：右上角 → 中段，模擬「金箔光線從右上灑下」
  &__streak {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        70% 60% at 75% 20%,
        var(--vietvip-streak) 0%,
        transparent 60%
      ),
      linear-gradient(
        125deg,
        transparent 60%,
        var(--vietvip-streak) 66%,
        transparent 72%
      );
    mix-blend-mode: screen;
    opacity: 0.7;
  }

  &__dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 2;
  }

  &__dot {
    width: 7px;
    height: 7px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 22px;
      border-radius: 4px;
      background: var(--vietvip-gold-1);
    }
  }
}
</style>
