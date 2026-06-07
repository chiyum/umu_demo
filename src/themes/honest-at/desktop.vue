<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestAtMobileMarquee from "./sections/honest-at-mobile-marquee.vue";
import HonestAtMobileBanner from "./sections/honest-at-mobile-banner.vue";
import HonestAtMobilePrizepoor from "./sections/honest-at-mobile-prizepoor.vue";
import HonestAtMobileGameMenu from "./sections/honest-at-mobile-game-menu.vue";

/**
 * honest-at 桌面版佈局 — 沿用「mobile 結構橫向延伸」策略
 *
 * honest_real 三個版本皆為純手機站，無 PC 原作。
 * 採頂部 sticky brand bar + 1024 居中容器內嵌 mobile section + 精簡 footer
 *
 * 不渲染 Fab：那是 mobile 版的拖曳球，PC 不需要
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

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

const footerLinks = [
  "關於 AT99",
  "服務條款",
  "隱私政策",
  "負責任博彩",
  "聯絡客服"
];
</script>

<template>
  <div class="honest-at-layout">
    <header class="honest-at-layout__header">
      <div class="honest-at-layout__header-inner">
        <a class="honest-at-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-at-layout__logo"
            :class="{ 'honest-at-layout__logo--blend': useScreenBlend }"
          />
        </a>

        <nav class="honest-at-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-at-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-at-layout__actions">
          <button
            type="button"
            class="honest-at-layout__btn honest-at-layout__btn--ghost"
          >
            登入
          </button>
          <button
            type="button"
            class="honest-at-layout__btn honest-at-layout__btn--primary"
          >
            註冊
          </button>
        </div>
      </div>
    </header>

    <main class="honest-at-layout__main">
      <div class="honest-at-layout__container">
        <HonestAtMobileMarquee />
        <HonestAtMobileBanner />
        <HonestAtMobilePrizepoor />
        <HonestAtMobileGameMenu />
      </div>
    </main>

    <footer class="honest-at-layout__footer">
      <div class="honest-at-layout__footer-inner">
        <div class="honest-at-layout__footer-brand">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-at-layout__footer-logo"
            :class="{ 'honest-at-layout__logo--blend': useScreenBlend }"
          />
          <span class="honest-at-layout__footer-tag"
            >霓虹電競 · 24h 不打烊</span
          >
        </div>
        <nav class="honest-at-layout__footer-nav">
          <a v-for="l in footerLinks" :key="l" href="#">{{ l }}</a>
        </nav>
        <div class="honest-at-layout__footer-copy">
          © {{ new Date().getFullYear() }} AT99 Demo Layout · All Rights
          Reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.honest-at-layout {
  position: relative;
  background-image: url("./assets/games/page-bg.jpg");
  background-color: #050a1a;
  background-size: cover;
  background-position: center top;
  color: #ffffff;
  font-family: var(--font-body, "Noto Sans TC", "PingFang TC", sans-serif);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: rgba(20, 23, 29, 0.92);
    border-bottom: 1px solid #3aa2ec;
    backdrop-filter: blur(10px);
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
    height: 44px;
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
    gap: 20px;
  }

  &__nav-link {
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;
    position: relative;

    &:hover {
      color: #3aa2ec;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: #3aa2ec;
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
    height: 36px;
    min-width: 76px;
    padding: 0 18px;
    border-radius: 18px;
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
      color: #ffffff;
      background: linear-gradient(180deg, #3aa2ec 0%, #1859ff 100%);
      border: none;
    }

    &--primary {
      color: #ffffff;
      background: transparent;
      border: 1px solid #3aa2ec;
    }

    &:hover {
      filter: brightness(1.08);
    }
  }

  &__main {
    flex: 1;
    padding: 16px 0 64px;
  }

  &__container {
    width: 1024px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  &__footer {
    background: #050a1a;
    border-top: 1px solid #3aa2ec;
    padding: 32px 0 24px;
  }

  &__footer-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    text-align: center;
  }

  &__footer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__footer-logo {
    height: 38px;
    object-fit: contain;
  }

  &__footer-tag {
    font-size: 13px;
    color: #abacac;
  }

  &__footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    a {
      color: #abacac;
      text-decoration: none;
      font-size: 13px;
      transition: color 0.15s ease;

      &:hover {
        color: #3aa2ec;
      }
    }
  }

  &__footer-copy {
    font-size: 12px;
    color: #6c6f75;
    margin-top: 8px;
  }
}
</style>
