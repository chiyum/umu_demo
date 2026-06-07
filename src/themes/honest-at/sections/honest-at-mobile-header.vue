<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import langTw from "../assets/header/lang-tw.png?url";
import langEn from "../assets/header/lang-en.png?url";

/**
 * honest-at mobile 頂部 header — 對齊 honest_real at/home.vue 第 3-43 行
 *
 * 原作結構：[logo] [登入] [註冊] [語系切換]
 * Demo 站採「已登入會員視角」與 vietvip 一致，不渲染註冊 / 登入按鈕，
 * 改成「logo + 語系切換」精簡 header；保留 demo 性質又不誤導使用者
 *
 * 為什麼 logo 不直接吃原 10003.png：
 * - 三個 honest theme 統一接 SHARED_LOGOS（dahsing/umu/long-heng），切 logo 整套要跟動
 * - 原 10003 是 AT99 字樣 PNG，已轉作 fallback 用不直接顯示
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

const lang = ref<"tw" | "en">("tw");
const langIcon = computed(() => (lang.value === "tw" ? langTw : langEn));

function toggleLang(): void {
  lang.value = lang.value === "tw" ? "en" : "tw";
}
</script>

<template>
  <header class="honest-at-m-header">
    <a class="honest-at-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="honest-at-m-header__logo"
        :class="{ 'honest-at-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <div class="honest-at-m-header__spacer" />

    <button
      type="button"
      class="honest-at-m-header__lang"
      aria-label="切換語系"
      @click="toggleLang"
    >
      <img :src="langIcon" alt="" class="honest-at-m-header__lang-img" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
.honest-at-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(
    180deg,
    rgba(10, 20, 48, 0.72) 0%,
    rgba(10, 20, 48, 0.42) 100%
  );
  backdrop-filter: blur(10px);
  color: var(--text-on-primary);
  border-bottom: 1px solid var(--honest-at-neon-frame);
  box-shadow: var(--shadow-sticky);

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
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

  &__lang {
    flex: none;
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 50%;
    border: 1px solid var(--honest-at-neon-frame);
    background: rgba(255, 255, 255, 0.06);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }
  }

  &__lang-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
}
</style>
