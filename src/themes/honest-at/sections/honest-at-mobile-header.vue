<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import langTw from "../assets/header/lang-tw.png?url";
import langEn from "../assets/header/lang-en.png?url";

/**
 * honest-at mobile 頂部 header — 1:1 對齊 honest_real src/pages/at/home.vue 第 3-43 行
 *
 * 原作 DOM 結構（必須完全對齊）：
 *   .at-home-header
 *     [q-img logo 165px]
 *     .at-home-header-actions
 *       .at-submit-btn         「登入」
 *       .at-submit-border-btn  「註冊」
 *       .at-home-header-actions-lang
 *         .at-home-header-actions-lang-icon  [icon + arrow_down]
 *         .at-home-header-actions-lang-list  (v-if 展開時)
 *
 * 對應原作 home.scss .at-home-header：
 *   - height: 52px / background: #14171d / padding: 1px 10px / space-between
 *   - actions gap: 0.5rem / each div min-width 57px padding 0 5px
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

const lang = ref<"tw" | "en">("tw");
const langIcon = computed(() => (lang.value === "tw" ? langTw : langEn));
const isOpenLangList = ref(false);

function toggleLangList(): void {
  isOpenLangList.value = !isOpenLangList.value;
}

function selectLang(value: "tw" | "en"): void {
  lang.value = value;
  isOpenLangList.value = false;
}
</script>

<template>
  <div class="honest-at-m-header">
    <a class="honest-at-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="honest-at-m-header__logo"
        :class="{ 'honest-at-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <div class="honest-at-m-header__actions">
      <div class="honest-at-m-header__btn">登入</div>
      <div class="honest-at-m-header__btn honest-at-m-header__btn--border">
        註冊
      </div>
      <div class="honest-at-m-header__lang">
        <div class="honest-at-m-header__lang-icon" @click="toggleLangList">
          <img :src="langIcon" alt="" class="honest-at-m-header__lang-img" />
          <span class="honest-at-m-header__lang-arrow" aria-hidden="true"
            >▾</span
          >
        </div>
        <div v-if="isOpenLangList" class="honest-at-m-header__lang-list">
          <div class="honest-at-m-header__lang-item" @click="selectLang('tw')">
            <img :src="langTw" alt="" />
            <span>繁體中文</span>
          </div>
          <div class="honest-at-m-header__lang-item" @click="selectLang('en')">
            <img :src="langEn" alt="" />
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .at-home-header：52px / #14171d / padding 1px 10px / space-between
.honest-at-m-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 10px 2px;
  height: 52px;
  background: var(--honest-at-header-bg);
  z-index: 5;

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  &__logo {
    height: 32px;
    width: auto;
    max-width: 165px;
    object-fit: contain;
    display: block;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  // 對齊原作 actions > div: min-width 57px / padding 0 5px
  &__btn {
    min-width: 57px;
    padding: 0 5px;
    height: 28px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--honest-at-header-btn-bg);
    transition: filter 0.15s ease;

    &--border {
      background: transparent;
      border: 1px solid var(--honest-at-neon-frame);
    }

    &:hover {
      filter: brightness(1.1);
    }
  }

  &__lang {
    position: relative;
    min-width: 57px;
    padding: 0 5px;
  }

  &__lang-icon {
    display: flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    color: #ffffff;
  }

  &__lang-img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    border-radius: 50%;
  }

  &__lang-arrow {
    font-size: 14px;
    line-height: 1;
  }

  // 對齊原作 lang-list：top:100% right:0 / 100px / dark bg + 1px #3aa2ec border
  &__lang-list {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    padding: 5px 0;
    width: 100px;
    gap: 5px;
    flex-direction: column;
    color: var(--text-on-primary);
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid var(--honest-at-neon-frame);
    border-radius: 5px;
    z-index: 3;
  }

  &__lang-item {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    gap: 6px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background: hsla(var(--primary-h), var(--primary-s), 60%, 0.18);
    }

    img {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      object-fit: contain;
    }
  }
}
</style>
