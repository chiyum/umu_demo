<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestMaxMobileBanner from "./sections/honest-max-mobile-banner.vue";
import HonestMaxMobileGameMenu from "./sections/honest-max-mobile-game-menu.vue";

/**
 * honest-max 桌面版佈局 — 沿用「mobile 結構橫向延伸」策略（同 honest-at / vietvip）
 *
 * 為什麼：honest_real max 沒有 PC 原作，硬套五段範式違反 1:1 復刻精神
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const navItems = [
  "首頁",
  "真人",
  "電子",
  "體育",
  "彩球",
  "捕魚",
  "對戰",
  "電競"
];

const footerLinks = [
  "關於 88WIN",
  "服務條款",
  "隱私政策",
  "VIP 福利",
  "聯絡客服"
];
</script>

<template>
  <div class="honest-max-layout">
    <header class="honest-max-layout__header">
      <div class="honest-max-layout__header-inner">
        <a class="honest-max-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-max-layout__logo"
          />
        </a>

        <nav class="honest-max-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-max-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-max-layout__actions">
          <button
            type="button"
            class="honest-max-layout__btn honest-max-layout__btn--reg"
          >
            註冊
          </button>
          <button
            type="button"
            class="honest-max-layout__btn honest-max-layout__btn--log"
          >
            登入
          </button>
        </div>
      </div>
    </header>

    <main class="honest-max-layout__main">
      <div class="honest-max-layout__container">
        <HonestMaxMobileBanner />
        <HonestMaxMobileGameMenu />
      </div>
    </main>

    <footer class="honest-max-layout__footer">
      <div class="honest-max-layout__footer-inner">
        <div class="honest-max-layout__footer-brand">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-max-layout__footer-logo"
          />
          <span class="honest-max-layout__footer-tag">人在塔在 · 玩轉德州</span>
        </div>
        <nav class="honest-max-layout__footer-nav">
          <a v-for="l in footerLinks" :key="l" href="#">{{ l }}</a>
        </nav>
        <div class="honest-max-layout__footer-copy">
          © {{ new Date().getFullYear() }} 88WIN Demo Layout · All Rights
          Reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.honest-max-layout {
  position: relative;
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: var(--bg-surface);
    border-bottom: 1px solid #e1e1e2;
    box-shadow: var(--shadow-sticky);
  }

  &__header-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 12px;
    height: 72px;
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
    height: 40px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  &__nav-link {
    color: var(--text-primary);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;

    &:hover {
      color: var(--primary-01);
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  &__btn {
    height: 36px;
    padding: 0 22px;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition:
      filter 0.18s ease,
      transform 0.18s ease;

    &:active {
      transform: scale(0.96);
    }

    &--reg {
      background: var(--gradient-gold);
      color: var(--text-on-gold);
    }

    &--log {
      background: var(--gradient-cta);
    }

    &:hover {
      filter: brightness(1.08);
    }
  }

  &__main {
    flex: 1;
    padding: 24px 0 64px;
  }

  &__container {
    width: 960px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__footer {
    background: var(--footer-bg);
    border-top: 1px solid #e1e1e2;
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
    height: 32px;
    object-fit: contain;
  }

  &__footer-tag {
    font-size: 13px;
    color: var(--footer-text);
  }

  &__footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    a {
      color: var(--footer-text);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.15s ease;

      &:hover {
        color: var(--primary-01);
      }
    }
  }

  &__footer-copy {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 8px;
  }
}
</style>
