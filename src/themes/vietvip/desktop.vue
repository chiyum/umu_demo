<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import VietvipPcBanner from "./sections/vietvip-pc-banner.vue";
import VietvipPcMarquee from "./sections/vietvip-pc-marquee.vue";
import VietvipPcGameGrid from "./sections/vietvip-pc-game-grid.vue";
import VietvipPcVipPerks from "./sections/vietvip-pc-vip-perks.vue";
import VietvipPcFooter from "./sections/vietvip-pc-footer.vue";

/**
 * vietvip 桌面版佈局 — 五段直敘式
 *
 * 採方案：「橫向五段佈局，配色完全對齊越南 VIP 紅金主題」
 *
 * 設計取捨：
 * - 與「中段 phone-frame 居中」方案的取捨：
 *   - phone-frame 雖能 100% 與 mobile 視覺一致，但 PC viewport 浪費（兩側留白過多）
 *   - 橫向五段能填滿 PC 寬度，且配色 / 字體 / 卡片風格仍與 mobile 統一
 *   - demo 站要展示 PC 也有設計感而非只是「mobile 放大」
 * - 與 ant-sport / tycoon 五段的差異：
 *   - 第 4 段不放「APP 下載」而放「VIP Perks」（vietvip 主打 VIP 福利）
 *   - 加 footer（vietvip 風格的版權底）
 *
 * 由上到下：
 * 1. Topbar       sticky 頂部 logo bar + 主導覽 + 註冊/登入
 * 2. Banner       全寬大圖輪播 + 金邊葉脈光帶
 * 3. Marquee      跑馬燈條（margin-top -24 overlap banner）
 * 4. GameGrid     左 sidebar 7 分類 + 右 grid 4 column 遊戲卡
 * 5. VipPerks     VIP 等級徽章 + 福利說明（vietvip 專屬）
 * 6. Footer       品牌資訊 + 連結列 + 即時客服入口
 *
 * Logo 切換邏輯沿用其他 theme：
 * - themeStore.currentLogo 取當前 logoKey 對應 src
 * - sticky topbar 永遠可見，便於切換間維持品牌存在感
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

// 桌面 sticky topbar 的導覽項目（demo 不接路由，純展示）
const navItems = [
  "首頁",
  "體育",
  "真人",
  "彩票",
  "棋牌",
  "電子",
  "捕魚",
  "優惠"
];
</script>

<template>
  <div class="vietvip-layout">
    <!-- 整層底圖：home_background2.png（紅金葉脈大底） + 蓋層 radial 角落柔光 -->
    <div class="vietvip-layout__bg" aria-hidden="true" />

    <!-- 頂部 brand bar（sticky） -->
    <header class="vietvip-layout__topbar">
      <div class="vietvip-layout__topbar-inner">
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
      <VietvipPcBanner />
      <VietvipPcMarquee />
      <VietvipPcGameGrid />
      <VietvipPcVipPerks />
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

  // 整層大背景：home_background2.png 鋪在 topbar 後方，僅顯示上方 720px
  // 用 absolute + mask 漸隱讓圖往下淡出，銜接 game-grid 區的深紅底
  &__bg {
    position: absolute;
    inset: 0 0 auto 0;
    height: 720px;
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

  // ─────── 頂部 sticky bar ───────
  // 越南 VIP 風：半透深紅 + 底部金線
  &__topbar {
    position: sticky;
    top: 0;
    z-index: 200;
    background: linear-gradient(
      180deg,
      rgba(28, 3, 9, 0.85) 0%,
      rgba(28, 3, 9, 0.55) 100%
    );
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--vietvip-gold-2);
    box-shadow: var(--shadow-sticky);
  }

  &__topbar-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 24px;
    height: 88px;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 56px;
    width: auto;
    max-width: 220px;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__nav {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
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
        bottom: -10px;
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

  &__btn {
    height: 40px;
    padding: 0 26px;
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

    // 註冊鈕：透明底 + 金邊金字
    &--ghost {
      color: var(--vietvip-gold-1);
      background: transparent;
      border: 1.5px solid var(--vietvip-gold-2);

      &:hover {
        background: rgba(199, 154, 69, 0.18);
      }
    }

    // 登入鈕：金漸層
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
