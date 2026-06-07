<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestAtPcMarquee from "./sections/desktop/honest-at-pc-marquee.vue";
import HonestAtPcBanner from "./sections/desktop/honest-at-pc-banner.vue";
import HonestAtPcOnline from "./sections/desktop/honest-at-pc-online.vue";
import HonestAtPcIntroduction from "./sections/desktop/honest-at-pc-introduction.vue";
import HonestAtPcAppDownload from "./sections/desktop/honest-at-pc-app-download.vue";
import HonestAtPcFooter from "./sections/desktop/honest-at-pc-footer.vue";

/**
 * honest-at 桌面版佈局 — 視覺骨架參考 kingdom_front long/home/desktop.vue
 *
 * kingdom long 桌面五段：
 *   Marquee → Banner → OnlinePeople → Introduction → AppDownload → Footer
 *
 * honest-at 採同樣骨架但全部 sections 自製，配色 / 字體 / icon 套用
 * honest-at 自家深藍霓虹科技風（不沿用 kingdom 的淡藍白底）：
 *   - header: 深藍 #14171d + 青藍霓虹線（與手機 header 同調性）
 *   - marquee: 同手機 marquee 視覺語言放大
 *   - banner: 手機同源 3 張 jpg（hero 文字都在圖內）
 *   - online: 即時人數計數，藍色 sprite 數字
 *   - introduction: 4 段品牌特色 2-col grid
 *   - app-download: 大圖 + QR
 *   - footer: 兩段（logo bg + link bar）
 *
 * 移除上一輪「mobile 結構橫向延伸」策略：那個策略對純手機原作 theme 缺乏 PC 風格參考
 * 改用 kingdom_front 桌面範式提供完整的 desktop layout
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

// 對齊 kingdom long header 結構：左 logo + 中遊戲分類 / 右 register/login
const navItems = [
  "首頁",
  "熱門",
  "真人",
  "電子",
  "彩票",
  "棋牌",
  "捕魚",
  "體育"
];
</script>

<template>
  <div class="honest-at-pc-layout">
    <!-- Header: 對齊 kingdom long header 結構（左 logo + nav / 右 register/login） -->
    <header class="honest-at-pc-layout__header">
      <div class="honest-at-pc-layout__header-inner">
        <a class="honest-at-pc-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-at-pc-layout__logo"
            :class="{ 'honest-at-pc-layout__logo--blend': useScreenBlend }"
          />
        </a>

        <nav class="honest-at-pc-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-at-pc-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-at-pc-layout__actions">
          <button
            type="button"
            class="honest-at-pc-layout__btn honest-at-pc-layout__btn--login"
          >
            登入
          </button>
          <button
            type="button"
            class="honest-at-pc-layout__btn honest-at-pc-layout__btn--register"
          >
            註冊
          </button>
        </div>
      </div>
    </header>

    <main class="honest-at-pc-layout__main">
      <HonestAtPcMarquee />
      <HonestAtPcBanner />
      <HonestAtPcOnline />
      <HonestAtPcIntroduction />
      <HonestAtPcAppDownload />
    </main>

    <HonestAtPcFooter />
  </div>
</template>

<style lang="scss" scoped>
.honest-at-pc-layout {
  position: relative;
  background: var(--bg-base);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  // 對齊 kingdom long/desktop/header：sticky / 改為 honest-at 深底 + 霓虹線（變體跟動）
  &__header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: linear-gradient(
      180deg,
      var(--honest-at-header-bg) 0%,
      var(--bg-surface) 100%
    );
    padding: 0 5%;
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.5),
      inset 0 -1px 0 var(--honest-at-neon-frame);
  }

  &__header-inner {
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 1696px;
    height: 80px;
    gap: 40px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 48px;
    width: auto;
    max-width: 180px;
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
    gap: 28px;
  }

  &__nav-link {
    color: var(--text-on-primary);
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    position: relative;
    transition: color 0.18s ease;

    &:hover {
      color: var(--honest-at-neon-frame);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: var(--honest-at-neon-frame);
        box-shadow: 0 0 8px var(--honest-at-neon-frame);
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  // 對齊原作 .at-submit-btn / .at-submit-border-btn 視覺語言
  &__btn {
    height: 38px;
    min-width: 84px;
    padding: 0 20px;
    border-radius: 6px;
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

    &--login {
      color: var(--text-on-primary);
      background: var(--honest-at-header-btn-bg);
      border: none;

      &:hover {
        filter: brightness(1.1);
      }
    }

    &--register {
      color: var(--text-on-primary);
      background: transparent;
      border: 1px solid var(--honest-at-neon-frame);

      &:hover {
        background: hsla(var(--primary-h), var(--primary-s), 60%, 0.18);
      }
    }
  }

  &__main {
    flex: 1;
  }
}
</style>
