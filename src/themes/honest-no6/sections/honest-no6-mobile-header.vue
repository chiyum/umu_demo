<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * honest-no6 mobile 頂部 header — 對齊 honest_real no6/home.vue 第 3-8 行
 *
 * 原作結構：[FG logo] + 右上 [登入][註冊] 兩顆膠囊鈕
 * Demo 站採已登入會員視角（與其他 honest theme 一致），保留登入註冊作為品牌視覺元素
 *
 * 為什麼 no6 header 走透明：原作 header 直接疊在城堡 hero 大圖上
 * 不能套深色 sticky，會遮掉視覺主軸
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);
</script>

<template>
  <header class="honest-no6-m-header">
    <a class="honest-no6-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="honest-no6-m-header__logo"
        :class="{ 'honest-no6-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <div class="honest-no6-m-header__actions">
      <button
        type="button"
        class="honest-no6-m-header__btn honest-no6-m-header__btn--log"
      >
        登入
      </button>
      <button
        type="button"
        class="honest-no6-m-header__btn honest-no6-m-header__btn--reg"
      >
        註冊
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.honest-no6-m-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    flex: 1;
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

  &__actions {
    display: flex;
    gap: 6px;
  }

  // 對齊原作 logo + 兩顆小膠囊鈕（登入透明邊 / 註冊金漸層）
  &__btn {
    height: 28px;
    padding: 0 14px;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition:
      filter 0.15s ease,
      transform 0.15s ease;
    border: none;

    &:active {
      transform: scale(0.95);
    }

    &--log {
      color: var(--text-on-primary);
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.35);
      backdrop-filter: blur(6px);
    }

    &--reg {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      box-shadow: 0 2px 6px
        hsla(var(--secondary-h), var(--secondary-s), 50%, 0.4);
    }

    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style>
