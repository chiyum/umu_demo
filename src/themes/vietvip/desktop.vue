<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import VietvipPcMarquee from "./sections/vietvip-pc-marquee.vue";
import VietvipPcHero from "./sections/vietvip-pc-hero.vue";
import VietvipPcGameGrid from "./sections/vietvip-pc-game-grid.vue";
import VietvipPcFooter from "./sections/vietvip-pc-footer.vue";

/**
 * vietvip 桌面版佈局 — 「mobile 結構橫向延伸 + 同設計語言放大」
 *
 * 設計取捨（重設計理由）：
 * - 上輪採「ant-sport 五段範式」（sticky topbar / 全寬 banner / news / app-download / serve）
 *   被使用者拒收：lilian_vietvip_web 是純手機專案沒有 PC 原作，硬套商業站結構違反
 *   「以 1:1 復刻為主」的明確要求
 * - 本輪改為「忠於 mobile 元素」的橫向延伸：
 *     header 用 mobile 同樣的「深紅半透 + 金線 brand bar」（沿用 sticky 但 nav 加寬）
 *     hero 雙欄 = 左 mobile banner（同 4 張）+ 右 mobile user-card（同 VIP 卡內容）
 *     marquee 維持金條 + 喇叭設計語言
 *     game-grid 維持「左 sidebar 7 分類 + 右 cards」結構，但分類校準為原作 7 個
 *     footer 精簡為「logo + 導覽 + 多語 + 版權單行」（不再走商業站 4 欄）
 *
 * 由上到下：
 * 1. Header   深紅金線 brand bar（與 mobile header 設計語言一致，加寬版 nav）
 * 2. Marquee  全寬跑馬燈條（mobile marquee 設計語言放大）
 * 3. Hero     雙欄 = 左 banner 輪播 + 右 VIP 會員卡
 * 4. GameGrid 左 7 分類 sidebar + 右 4 column 卡片網格
 * 5. Footer   精簡版權底（mobile tab-bar 同視覺）
 *
 * 整體背景：var(--vietvip-bg-img) 紅金葉脈大底圖（與 mobile 同源），
 * 用 mask 漸隱往下淡出到 bg-base 深酒紅
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

// PC nav 8 個導覽項（mobile header 只有「註冊 / 登入 / 訊息」三項，PC 寬可多列）
// 分類項對齊 mobile-game-menu 的 7 個 cats key 命名一致
const navItems = [
  "首頁",
  "體育",
  "真人",
  "棋牌",
  "電競",
  "彩票",
  "電子",
  "捕魚"
];
</script>

<template>
  <div class="vietvip-layout">
    <!-- 大底圖：home_background2.png（與 mobile 同源），用 absolute + mask 漸隱 -->
    <div class="vietvip-layout__bg" aria-hidden="true" />

    <!-- 頂部 brand bar — mobile header 設計語言放大版 -->
    <header class="vietvip-layout__header">
      <div class="vietvip-layout__header-inner">
        <a class="vietvip-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="vietvip-layout__logo"
            :class="{ 'vietvip-layout__logo--blend': useScreenBlend }"
          />
        </a>

        <nav class="vietvip-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="vietvip-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="vietvip-layout__actions">
          <button
            type="button"
            class="vietvip-layout__btn vietvip-layout__btn--ghost"
          >
            註冊
          </button>
          <button
            type="button"
            class="vietvip-layout__btn vietvip-layout__btn--primary"
          >
            登入
          </button>
        </div>
      </div>
    </header>

    <main class="vietvip-layout__main">
      <VietvipPcMarquee />
      <VietvipPcHero />
      <VietvipPcGameGrid />
    </main>

    <VietvipPcFooter />
  </div>
</template>

<style lang="scss" scoped>
.vietvip-layout {
  position: relative;
  background: var(--bg-base);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // 與 mobile.vue 同源的大底圖 + mask 漸隱
  &__bg {
    position: absolute;
    inset: 0 0 auto;
    height: 760px;
    z-index: 0;
    background-image: var(--vietvip-bg-img);
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    mask-image: linear-gradient(
      180deg,
      #000000 0%,
      #000000 70%,
      transparent 100%
    );
    pointer-events: none;
  }

  > *:not(&__bg) {
    position: relative;
    z-index: 1;
  }

  &__main {
    flex: 1;
  }

  // ─────── 頂部 brand bar（mobile header 設計語言） ───────
  // mobile 是 sticky，PC 也保留 sticky 但拿掉強 blur 與重陰影，讓視覺更輕
  &__header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: linear-gradient(
      180deg,
      rgba(28, 3, 9, 0.78) 0%,
      rgba(28, 3, 9, 0.55) 100%
    );
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--vietvip-gold-2);
    box-shadow: var(--shadow-sticky);
  }

  &__header-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 12px;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 50px;
    width: auto;
    max-width: 200px;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 22px;
  }

  &__nav-link {
    color: var(--vietvip-gold-1);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;
    position: relative;
    letter-spacing: 0.5px;

    &:hover {
      color: #ffffff;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: var(--gradient-gold);
        border-radius: 1px;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  // 註冊鈕：透明底 + 金邊金字（與 mobile header 同設計）
  // 登入鈕：金漸層 + 深酒紅字（與 mobile header 同設計）
  &__btn {
    height: 38px;
    padding: 0 22px;
    border-radius: 22px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition:
      filter 0.18s ease,
      transform 0.18s ease;

    &:active {
      transform: scale(0.96);
    }

    &--ghost {
      color: var(--vietvip-gold-1);
      background: transparent;
      border: 1.5px solid var(--vietvip-gold-2);

      &:hover {
        background: rgba(199, 154, 69, 0.18);
      }
    }

    &--primary {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      border: none;
      box-shadow:
        0 4px 12px hsla(var(--secondary-h), var(--secondary-s), 50%, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}
</style>
