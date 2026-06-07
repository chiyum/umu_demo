<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestNo6MobileBanner from "./sections/honest-no6-mobile-banner.vue";
import HonestNo6MobileMarquee from "./sections/honest-no6-mobile-marquee.vue";
import HonestNo6MobileInfo from "./sections/honest-no6-mobile-info.vue";
import HonestNo6MobileGameMenu from "./sections/honest-no6-mobile-game-menu.vue";

/**
 * honest-no6 桌面版佈局 — 沿用「mobile 結構橫向延伸」策略
 *
 * 與 honest-at / honest-max / vietvip 同理：honest_real 無 PC 原作，
 * 不硬套五段範式，改放大 mobile 元件 + sticky brand bar + 精簡 footer
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
  "體育",
  "真人",
  "棋牌",
  "電子",
  "彩球",
  "捕魚"
];

const footerLinks = ["關於 FG", "服務條款", "VIP 福利", "綁定教學", "聯絡客服"];
</script>

<template>
  <div class="honest-no6-layout">
    <header class="honest-no6-layout__header">
      <div class="honest-no6-layout__header-inner">
        <a class="honest-no6-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-no6-layout__logo"
            :class="{ 'honest-no6-layout__logo--blend': useScreenBlend }"
          />
        </a>

        <nav class="honest-no6-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-no6-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-no6-layout__actions">
          <button
            type="button"
            class="honest-no6-layout__btn honest-no6-layout__btn--ghost"
          >
            登入
          </button>
          <button
            type="button"
            class="honest-no6-layout__btn honest-no6-layout__btn--primary"
          >
            註冊
          </button>
        </div>
      </div>
    </header>

    <main class="honest-no6-layout__main">
      <div class="honest-no6-layout__container">
        <HonestNo6MobileBanner />
        <HonestNo6MobileMarquee />
        <HonestNo6MobileInfo />
        <HonestNo6MobileGameMenu />
      </div>
    </main>

    <footer class="honest-no6-layout__footer">
      <div class="honest-no6-layout__footer-inner">
        <div class="honest-no6-layout__footer-brand">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-no6-layout__footer-logo"
            :class="{ 'honest-no6-layout__logo--blend': useScreenBlend }"
          />
          <span class="honest-no6-layout__footer-tag">山日日 · 暮夜不眠</span>
        </div>
        <nav class="honest-no6-layout__footer-nav">
          <a v-for="l in footerLinks" :key="l" href="#">{{ l }}</a>
        </nav>
        <div class="honest-no6-layout__footer-copy">
          © {{ new Date().getFullYear() }} FG Demo Layout · All Rights Reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-layout {
  position: relative;
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: linear-gradient(
      180deg,
      rgba(10, 3, 18, 0.82) 0%,
      rgba(10, 3, 18, 0.58) 100%
    );
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--honest-no6-marquee-border);
    box-shadow: var(--shadow-sticky);
  }

  &__header-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 12px;
    height: 78px;
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
    color: var(--text-on-primary);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;
    position: relative;

    &:hover {
      color: var(--secondary-01);

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

  &__btn {
    height: 36px;
    padding: 0 22px;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition:
      filter 0.18s ease,
      transform 0.18s ease;
    border: none;

    &:active {
      transform: scale(0.96);
    }

    &--ghost {
      color: var(--text-on-primary);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.35);
    }

    &--primary {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      box-shadow: 0 4px 12px
        hsla(var(--secondary-h), var(--secondary-s), 50%, 0.4);
    }

    &:hover {
      filter: brightness(1.08);
    }
  }

  &__main {
    flex: 1;
    padding: 0 0 64px;
  }

  &__container {
    width: 980px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__footer {
    background: var(--footer-bg);
    border-top: 1px solid var(--honest-no6-marquee-border);
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
        color: var(--secondary-01);
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
