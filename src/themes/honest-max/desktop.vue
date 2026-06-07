<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestMaxPcMarquee from "./sections/desktop/honest-max-pc-marquee.vue";
import HonestMaxPcBanner from "./sections/desktop/honest-max-pc-banner.vue";
import HonestMaxPcOnline from "./sections/desktop/honest-max-pc-online.vue";
import HonestMaxPcIntroduction from "./sections/desktop/honest-max-pc-introduction.vue";
import HonestMaxPcAppDownload from "./sections/desktop/honest-max-pc-app-download.vue";
import HonestMaxPcFooter from "./sections/desktop/honest-max-pc-footer.vue";

/**
 * honest-max 桌面版佈局 — 視覺骨架參考 kingdom_front long/home/desktop.vue
 *
 * 採同樣的「Marquee → Banner → OnlinePeople → Introduction → AppDownload → Footer」
 * 五段範式，但每段配色 / 字體都套用 honest-max 自家手機 token：桃粉藍綠混色
 *
 * Header 對齊 max 手機 header 視覺語言（雙顆對比按鈕）但放大版
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
</script>

<template>
  <div class="honest-max-pc-layout">
    <header class="honest-max-pc-layout__header">
      <div class="honest-max-pc-layout__header-inner">
        <a class="honest-max-pc-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-max-pc-layout__logo"
          />
        </a>

        <nav class="honest-max-pc-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-max-pc-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-max-pc-layout__actions">
          <button
            type="button"
            class="honest-max-pc-layout__btn honest-max-pc-layout__btn--reg"
          >
            註冊
          </button>
          <button
            type="button"
            class="honest-max-pc-layout__btn honest-max-pc-layout__btn--log"
          >
            登入
          </button>
        </div>
      </div>
    </header>

    <main class="honest-max-pc-layout__main">
      <HonestMaxPcMarquee />
      <HonestMaxPcBanner />
      <HonestMaxPcOnline />
      <HonestMaxPcIntroduction />
      <HonestMaxPcAppDownload />
    </main>

    <HonestMaxPcFooter />
  </div>
</template>

<style lang="scss" scoped>
.honest-max-pc-layout {
  position: relative;
  background: #f5f6fa;
  color: #2a1a3e;
  font-family: var(--font-body, "Noto Sans TC", "PingFang TC", sans-serif);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  &__header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #ffffff;
    padding: 0 5%;
    box-shadow: 0 2px 6px rgba(95, 50, 130, 0.18);
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
    height: 44px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
  }

  &__nav-link {
    color: #2a1a3e;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    position: relative;
    transition: color 0.18s ease;

    &:hover {
      color: #e75bff;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: linear-gradient(90deg, #e75bff 0%, #3ec1f5 100%);
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  // 對齊手機 header 視覺：黃漸層註冊 / 藍漸層登入
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
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition:
      filter 0.18s ease,
      transform 0.18s ease;

    &:active {
      transform: scale(0.96);
    }

    &--reg {
      background: linear-gradient(
        135deg,
        #ffd57c 0%,
        #ff8a4c 50%,
        #ff5959 100%
      );
      color: #2a0500;
    }

    &--log {
      background: linear-gradient(135deg, #3ec1f5 0%, #2a7fc4 100%);
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
