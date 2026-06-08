<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * fived mobile 頂部 header
 *
 * 視覺取自 5d_v2 src/components/layout/MobileHeader.vue 設計語言：
 * - 深棕底 + 金描邊 + 雙 CTA（左金鈕 / 右暗紅鈕）
 * - 5d_v2 原作 MobileHeader 帶漢堡選單 + logo，demo 化簡為「logo + 註冊 + 登入」
 *
 * 為什麼用 sticky + 半透明 + blur：
 * - 整頁底是深棕 + radial 暗金光，sticky 實心會壓掉 hero 視覺
 * - 半透 + blur 模糊滾動內容仍能看到底色金光暈
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);
</script>

<template>
  <header class="fived-m-header">
    <a class="fived-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="fived-m-header__logo"
        :class="{ 'fived-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <div class="fived-m-header__spacer" />

    <div class="fived-m-header__actions">
      <button
        type="button"
        class="fived-m-header__btn fived-m-header__btn--ghost"
      >
        註冊
      </button>
      <button
        type="button"
        class="fived-m-header__btn fived-m-header__btn--primary"
      >
        登入
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.fived-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(
    180deg,
    rgba(12, 6, 8, 0.78) 0%,
    rgba(12, 6, 8, 0.42) 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--fived-banner-border);
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

  // 雙鈕：ghost 金邊金字 / primary 金漸層暗字
  &__btn {
    height: 30px;
    padding: 0 16px;
    border-radius: 6px;
    font-size: 12px;
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
      transform: scale(0.94);
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
      box-shadow: 0 2px 8px rgba(226, 189, 135, 0.32);
    }

    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style>
