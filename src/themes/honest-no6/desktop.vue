<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestNo6PcMarquee from "./sections/desktop/honest-no6-pc-marquee.vue";
import HonestNo6PcBanner from "./sections/desktop/honest-no6-pc-banner.vue";
import HonestNo6PcOnline from "./sections/desktop/honest-no6-pc-online.vue";
import HonestNo6PcIntroduction from "./sections/desktop/honest-no6-pc-introduction.vue";
import HonestNo6PcAppDownload from "./sections/desktop/honest-no6-pc-app-download.vue";
import HonestNo6PcFooter from "./sections/desktop/honest-no6-pc-footer.vue";

/**
 * honest-no6 桌面版佈局 — 視覺骨架對齊 kingdom_front long/home/desktop.vue
 *
 * 五段範式 Marquee → Banner → OnlinePeople → Introduction → AppDownload → Footer
 * 配色全部套用 honest-no6 紫黑神秘風（與手機版 token 一致）
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
</script>

<template>
  <div class="honest-no6-pc-layout">
    <header class="honest-no6-pc-layout__header">
      <div class="honest-no6-pc-layout__header-inner">
        <a class="honest-no6-pc-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-no6-pc-layout__logo"
            :class="{ 'honest-no6-pc-layout__logo--blend': useScreenBlend }"
          />
        </a>

        <nav class="honest-no6-pc-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-no6-pc-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-no6-pc-layout__actions">
          <button
            type="button"
            class="honest-no6-pc-layout__btn honest-no6-pc-layout__btn--log"
          >
            登入
          </button>
          <button
            type="button"
            class="honest-no6-pc-layout__btn honest-no6-pc-layout__btn--reg"
          >
            註冊
          </button>
        </div>
      </div>
    </header>

    <main class="honest-no6-pc-layout__main">
      <HonestNo6PcMarquee />
      <HonestNo6PcBanner />
      <HonestNo6PcOnline />
      <HonestNo6PcIntroduction />
      <HonestNo6PcAppDownload />
    </main>

    <HonestNo6PcFooter />
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-pc-layout {
  position: relative;
  background: var(--bg-base);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  &__header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: linear-gradient(
      180deg,
      var(--bg-base-translucent) 0%,
      hsla(var(--primary-h), var(--primary-s), 8%, 0.85) 100%
    );
    backdrop-filter: blur(10px);
    padding: 0 5%;
    border-bottom: 1px solid hsla(var(--primary-h), var(--primary-s), 60%, 0.4);
  }

  &__header-inner {
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 1696px;
    height: 76px;
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
      color: var(--secondary-01);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: linear-gradient(
          90deg,
          var(--secondary-01) 0%,
          var(--primary-01) 100%
        );
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  // 對齊手機 header 視覺：log 半透明邊 / reg 金漸層
  &__btn {
    height: 38px;
    min-width: 84px;
    padding: 0 22px;
    border-radius: 19px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition:
      filter 0.18s ease,
      transform 0.18s ease;

    &:active {
      transform: scale(0.96);
    }

    &--log {
      color: var(--text-on-primary);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(6px);
    }

    &--reg {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      box-shadow: 0 2px 6px
        hsla(var(--secondary-h), var(--secondary-s), 50%, 0.42);
    }

    &:hover {
      filter: brightness(1.08);
    }
  }

  &__main {
    flex: 1;
  }
}
</style>
