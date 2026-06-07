<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * honest-max mobile 頂部 header — 對齊 honest_real max/home.vue 第 3-13 行
 *
 * 原作結構：[88WIN logo] [註冊（黃漸層球）] [登入（藍漸層球）]
 * Demo 站採已登入會員視角（與 vietvip / honest-at 一致），保留註冊 / 登入按鈕作為 demo 元素
 * 因為 MAX 主視覺重點就是「兩顆對比強烈的圓鈕」，移除掉視覺立刻失衡
 *
 * 為什麼 logo 用 SHARED_LOGOS：與其他 honest theme 一致，showcase 切 logo 跟動
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <header class="honest-max-m-header">
    <a class="honest-max-m-header__brand" href="#" :aria-label="logoLabel">
      <img :src="logoSrc" :alt="logoLabel" class="honest-max-m-header__logo" />
    </a>

    <div class="honest-max-m-header__actions">
      <button
        type="button"
        class="honest-max-m-header__btn honest-max-m-header__btn--reg"
      >
        註冊
      </button>
      <button
        type="button"
        class="honest-max-m-header__btn honest-max-m-header__btn--log"
      >
        登入
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.honest-max-m-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--bg-base);

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
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  // 兩顆膠囊按鈕：黃漸層註冊 + 藍漸層登入
  // 對齊 max reference 上方右邊兩顆對比按鈕
  &__btn {
    height: 30px;
    padding: 0 18px;
    border-radius: 16px;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition:
      filter 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.95);
    }

    &--reg {
      background: var(--gradient-gold);
      color: var(--text-on-gold);
    }

    &--log {
      background: linear-gradient(
        135deg,
        var(--secondary-02) 0%,
        var(--secondary-01) 100%
      );
    }

    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style>
