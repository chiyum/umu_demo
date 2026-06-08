<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * at-deluxe mobile 頂部 header
 *
 * 視覺取自 slime-at99 的「深藍 sticky bar + 雙顆膠囊鈕」概念：
 * - 原作 mobile.vue 本身沒獨立 header，登入 / 註冊在更上層 layout
 * - demo 站補一條 sticky bar，與其它 theme（honest-no6 / vietvip）的 header 結構一致
 * - 賭場霓虹風的「登入＝青藍膠囊」「註冊＝紅角徽」對齊原作 hot 標的 gradient-hot
 *
 * 為什麼用 sticky 半透明 + blur 而非實心：
 * - 整頁底是深藍 radial 漸層，sticky 實心會壓掉 hero 視覺
 * - rgba 0.62 + blur(10px) 在捲動到下方仍能看到底色光暈
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);
</script>

<template>
  <header class="at-deluxe-m-header">
    <a class="at-deluxe-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="at-deluxe-m-header__logo"
        :class="{ 'at-deluxe-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <div class="at-deluxe-m-header__spacer" />

    <div class="at-deluxe-m-header__actions">
      <button
        type="button"
        class="at-deluxe-m-header__btn at-deluxe-m-header__btn--login"
      >
        登入
      </button>
      <button
        type="button"
        class="at-deluxe-m-header__btn at-deluxe-m-header__btn--reg"
      >
        註冊
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.at-deluxe-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(
    180deg,
    rgba(5, 9, 19, 0.78) 0%,
    rgba(5, 9, 19, 0.42) 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  color: var(--text-on-primary);

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  &__logo {
    height: 32px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__spacer {
    flex: 1;
  }

  &__actions {
    display: flex;
    gap: 6px;
  }

  // 兩顆膠囊：login 青藍漸層 / reg 紅角徽
  &__btn {
    height: 30px;
    padding: 0 16px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      filter 0.18s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.94);
    }

    &--login {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      box-shadow: 0 2px 8px rgba(105, 255, 255, 0.32);
    }

    &--reg {
      color: #ffffff;
      background: var(--gradient-hot);
      box-shadow: var(--shadow-glow-hot);
    }

    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style>
