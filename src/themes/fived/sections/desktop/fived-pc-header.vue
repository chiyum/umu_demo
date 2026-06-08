<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * fived desktop 頂部 header
 *
 * 視覺結構：對齊 5d_v2 src/components/common/Header.vue 設計語言
 * - 深棕 sticky bar + 金描邊細線 + 金漸層登入按鈕
 * - 中央橫向 nav 8 項
 * - 與 mobile-header 同設計語言
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

const navItems = [
  "首頁",
  "公告",
  "活動",
  "熱門",
  "電子",
  "真人",
  "彩票",
  "下載"
];
</script>

<template>
  <header class="fived-pc-header">
    <div class="fived-pc-header__inner">
      <a class="fived-pc-header__brand" href="#" :aria-label="logoLabel">
        <img
          :src="logoSrc"
          :alt="logoLabel"
          class="fived-pc-header__logo"
          :class="{ 'fived-pc-header__logo--blend': useScreenBlend }"
        />
      </a>

      <nav class="fived-pc-header__nav" aria-label="主導覽">
        <a
          v-for="n in navItems"
          :key="n"
          href="#"
          class="fived-pc-header__nav-link"
        >
          {{ n }}
        </a>
      </nav>

      <div class="fived-pc-header__actions">
        <button
          type="button"
          class="fived-pc-header__btn fived-pc-header__btn--ghost"
        >
          註冊
        </button>
        <button
          type="button"
          class="fived-pc-header__btn fived-pc-header__btn--primary"
        >
          登入
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.fived-pc-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: linear-gradient(
    180deg,
    rgba(12, 6, 8, 0.92) 0%,
    rgba(12, 6, 8, 0.72) 100%
  );
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--fived-banner-border);
  box-shadow: var(--shadow-sticky);
}

.fived-pc-header__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 12px;
  height: 76px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.fived-pc-header__brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.fived-pc-header__logo {
  height: 48px;
  width: auto;
  max-width: 180px;
  object-fit: contain;

  &--blend {
    mix-blend-mode: screen;
  }
}

.fived-pc-header__nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 22px;
}

.fived-pc-header__nav-link {
  color: var(--primary-01);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;
  position: relative;
  transition: color 0.18s ease;

  &:hover {
    color: var(--primary-03);

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

.fived-pc-header__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.fived-pc-header__btn {
  height: 38px;
  padding: 0 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    filter 0.18s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.96);
  }

  &--ghost {
    color: var(--primary-01);
    background: transparent;
    border: 1px solid var(--primary-01);
  }

  &--primary {
    color: var(--text-on-gold);
    background: var(--gradient-gold);
    border: none;
    box-shadow: 0 4px 12px rgba(226, 189, 135, 0.32);
  }

  &:hover {
    filter: brightness(1.1);
  }
}
</style>
