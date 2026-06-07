<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import banner1 from "../assets/banner/banner-1.jpg?url";
import banner2 from "../assets/banner/banner-2.jpg?url";
import banner3 from "../assets/banner/banner-3.jpg?url";
import marqueeIcon from "../assets/header/marquee-icon.png?url";

/**
 * honest-at mobile hero 段 — 對齊 honest_real at/home.vue：
 *   <Banner />（at99 banner.vue 內三張 10009/10010/10011.jpg）
 *   .at-home-marquee-wrap + Marquee
 *   <Prizepoor /> JACKPOT 七段顯示數字 11 位
 *
 * 為什麼 banner + marquee + jackpot 包成同一個 section：
 * - 視覺上是首屏連續一段（沒有 padding 分隔）
 * - 原作 home.vue 的 .at-home-header / .at-home-marquee-wrap / banner / prizepoor 也是連續排列
 * - jackpot 緊貼 banner 底部疊出來，不適合拆兩段
 *
 * jackpot 數字採「11 位 + 千位逗號」自然顯示：每秒 +random 推進
 * 不做 sprite animation（原作走 sprite，demo 化簡為文字 + monospace 字體）
 */
const BANNERS: string[] = [banner1, banner2, banner3];
const activeBanner = ref<number>(0);
let bannerTimer: number | null = null;

const jackpot = ref<number>(654728);
let jackpotTimer: number | null = null;

const MARQUEE_TEXT =
  "AT99 本月 VIP 福利【儲值回饋券】已發送至站內信箱；遊戲上線通知：【FTG 電子】新增馬雅末日 Maya Doomsday；【BNG 電子】新增 777 經典水果盤；歡迎光臨 AT99 陪伴您渡過每一個遊戲歡樂時光。";

function formatJackpot(n: number): string {
  // 11 位數字，不足前補 0；千位逗號讓視覺更接近 JACKPOT 板的閱讀習慣
  const padded = n.toString().padStart(11, "0");
  return padded.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

onMounted(() => {
  // banner 自動輪播（3 秒一張）
  bannerTimer = window.setInterval(() => {
    activeBanner.value = (activeBanner.value + 1) % BANNERS.length;
  }, 3000);
  // jackpot 隨機累加，營造即時開獎感
  jackpotTimer = window.setInterval(() => {
    jackpot.value += Math.floor(Math.random() * 9999);
  }, 1500);
});

onBeforeUnmount(() => {
  if (bannerTimer !== null) window.clearInterval(bannerTimer);
  if (jackpotTimer !== null) window.clearInterval(jackpotTimer);
});
</script>

<template>
  <section class="honest-at-m-hero">
    <!-- banner 輪播 -->
    <div class="honest-at-m-hero__banner">
      <div
        v-for="(src, idx) in BANNERS"
        :key="idx"
        class="honest-at-m-hero__slide"
        :class="{ 'honest-at-m-hero__slide--active': activeBanner === idx }"
      >
        <img :src="src" alt="" class="honest-at-m-hero__slide-img" />
      </div>
      <!-- hero 大字（疊在 banner 上） -->
      <div class="honest-at-m-hero__overlay">
        <div class="honest-at-m-hero__title">AT99 誠意相迎</div>
        <div class="honest-at-m-hero__sub">
          <span class="honest-at-m-hero__sub-em">日返 1%</span>
          <span class="honest-at-m-hero__sub-tail">無上限</span>
        </div>
      </div>
      <!-- pagination 點 -->
      <div class="honest-at-m-hero__dots">
        <span
          v-for="(_, idx) in BANNERS"
          :key="idx"
          class="honest-at-m-hero__dot"
          :class="{ 'honest-at-m-hero__dot--active': activeBanner === idx }"
        />
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="honest-at-m-hero__marquee">
      <img :src="marqueeIcon" alt="" class="honest-at-m-hero__marquee-icon" />
      <div class="honest-at-m-hero__marquee-track">
        <span class="honest-at-m-hero__marquee-text">{{ MARQUEE_TEXT }}</span>
      </div>
    </div>

    <!-- JACKPOT 數字框 -->
    <div class="honest-at-m-hero__jackpot">
      <div class="honest-at-m-hero__jackpot-title">JACKPOT</div>
      <div class="honest-at-m-hero__jackpot-digits">
        <span
          v-for="(ch, idx) in formatJackpot(jackpot).split('')"
          :key="`${ch}-${idx}`"
          class="honest-at-m-hero__jackpot-digit"
          :class="{ 'honest-at-m-hero__jackpot-digit--comma': ch === ',' }"
        >
          {{ ch }}
        </span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// hero 段以 banner（h 200px）+ marquee（h 32px）+ jackpot（h 約 70px）三層垂直堆疊
// 全寬鋪滿，沒有左右 padding（與原作對齊）
.honest-at-m-hero {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

// ─────── banner ───────
.honest-at-m-hero__banner {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.honest-at-m-hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }

  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

// hero overlay：原作 banner 內就帶大字「AT99 誠意相迎 / 日返 1% 無上限」
// 為什麼 overlay 走絕對定位：banner 是輪播圖，文字必須脫離圖層獨立顯示
.honest-at-m-hero__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;

  // 淡黑 gradient 提升白字可讀性
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(10, 20, 48, 0.32) 100%
  );
}

.honest-at-m-hero__title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 2px;
  text-shadow:
    0 0 12px var(--honest-at-neon-frame),
    0 2px 4px rgba(0, 0, 0, 0.6);
  margin-bottom: 6px;
}

.honest-at-m-hero__sub {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  background: var(--gradient-gold);
  background-clip: text;
  color: transparent;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 30px;
  letter-spacing: 1px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.55));

  &-em {
    font-size: 38px;
  }

  &-tail {
    font-size: 22px;
  }
}

// pagination 點：對齊原作 swiper dots（白色長條）
.honest-at-m-hero__dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
}

.honest-at-m-hero__dot {
  width: 10px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.55);
  transition:
    width 0.3s ease,
    background 0.3s ease;

  &--active {
    width: 16px;
    background: #ffffff;
  }
}

// ─────── 跑馬燈 ───────
.honest-at-m-hero__marquee {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  background: rgba(10, 20, 48, 0.78);
  border-top: 1px solid var(--honest-at-neon-frame);
  border-bottom: 1px solid var(--honest-at-neon-frame);
  overflow: hidden;
}

.honest-at-m-hero__marquee-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex: none;
}

// CSS-only marquee：滑動 -100% 形成無縫滾動
// 為什麼用 CSS 而非 JS：簡單視覺需求不必拉 vue-marquee 套件，避免多裝套件
.honest-at-m-hero__marquee-track {
  flex: 1;
  overflow: hidden;
  display: flex;
  white-space: nowrap;
}

.honest-at-m-hero__marquee-text {
  font-size: 12px;
  color: #ffd57c;
  display: inline-block;
  padding-left: 100%;
  animation: honest-at-marquee 30s linear infinite;
}

@keyframes honest-at-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

// ─────── JACKPOT 七段數字框 ───────
.honest-at-m-hero__jackpot {
  margin: 12px auto 8px;
  width: calc(100% - 24px);
  padding: 8px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--honest-at-jackpot-frame);
  border-radius: 12px;
  box-shadow: var(--shadow-glow);
}

.honest-at-m-hero__jackpot-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 8px;
  color: #1a0500;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  margin-bottom: 6px;
}

// 七段數字底色用 jackpot-digit-bg token，數字色 jackpot-digit-color
.honest-at-m-hero__jackpot-digits {
  display: flex;
  gap: 2px;
  width: 100%;
  justify-content: center;
}

.honest-at-m-hero__jackpot-digit {
  flex: 0 0 auto;
  min-width: 22px;
  height: 36px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--honest-at-jackpot-digit-bg);
  color: var(--honest-at-jackpot-digit-color);
  font-family: "Courier New", Menlo, monospace;
  font-size: 22px;
  font-weight: 900;
  border-radius: 4px;
  border: 1px solid rgba(255, 213, 124, 0.5);
  box-shadow:
    inset 0 0 8px rgba(255, 213, 124, 0.25),
    0 0 6px rgba(255, 213, 124, 0.32);

  &--comma {
    min-width: 12px;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
  }
}
</style>
