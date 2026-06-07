<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * honest-no6 桌面版頂部 nav header — 視覺結構參考 slime-wu88-pc 主導覽
 *
 * 對應原作 main-nav.vue：
 *   .mainNav
 *     .mainNav_In
 *       <img.logo />
 *       <ul.navList>
 *         <li v-for category>
 *           <div.gameBanner><ul.subList><li v-for platform>
 *
 * Demo 化策略：
 * - 頂部 sticky bar 含 logo + 5 大類別 nav（hover 展開副選單）
 * - 為簡化視覺只渲染主類別，副選單以 hover 預覽提示
 * - 配色保留 honest-no6 紫黑神秘風（token 跟動變體）
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

interface NavCat {
  key: string;
  label: string;
  subItems: string[];
}

const NAV_CATEGORIES: NavCat[] = [
  {
    key: "hot",
    label: "熱門",
    subItems: ["KU真人", "KU體育", "KU彩球", "3D 電子"]
  },
  {
    key: "live",
    label: "真人",
    subItems: ["KU真人", "DG 真人", "歐博真人", "WM 真人"]
  },
  { key: "sport", label: "體育", subItems: ["KU體育", "IM 體育", "BTI 體育"] },
  { key: "slot", label: "電子", subItems: ["KU 電子", "BNG 電子", "BT 電子"] },
  {
    key: "lottery",
    label: "彩球",
    subItems: ["KU 彩球", "DG 彩球", "DBG 彩球"]
  }
];
</script>

<template>
  <header class="honest-no6-pc-header">
    <div class="honest-no6-pc-header__inner">
      <a class="honest-no6-pc-header__brand" href="#" :aria-label="logoLabel">
        <img
          :src="logoSrc"
          :alt="logoLabel"
          class="honest-no6-pc-header__logo"
          :class="{ 'honest-no6-pc-header__logo--blend': useScreenBlend }"
        />
      </a>

      <nav class="honest-no6-pc-header__nav" aria-label="主導覽">
        <div
          v-for="cat in NAV_CATEGORIES"
          :key="cat.key"
          class="honest-no6-pc-header__cat"
        >
          <span class="honest-no6-pc-header__cat-label">{{ cat.label }}</span>
          <div class="honest-no6-pc-header__sub">
            <span
              v-for="item in cat.subItems"
              :key="item"
              class="honest-no6-pc-header__sub-item"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </nav>

      <div class="honest-no6-pc-header__actions">
        <button
          type="button"
          class="honest-no6-pc-header__btn honest-no6-pc-header__btn--log"
        >
          登入
        </button>
        <button
          type="button"
          class="honest-no6-pc-header__btn honest-no6-pc-header__btn--reg"
        >
          註冊
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// 對齊 wu88 .mainNav：sticky / 暗底 + 金邊線
.honest-no6-pc-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(
    180deg,
    var(--bg-base-translucent) 0%,
    hsla(var(--primary-h), var(--primary-s), 8%, 0.85) 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid hsla(var(--primary-h), var(--primary-s), 60%, 0.4);

  &__inner {
    display: flex;
    align-items: center;
    max-width: 1696px;
    margin: 0 auto;
    padding: 0 32px;
    height: 76px;
    gap: 32px;
  }

  &__brand {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
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
    align-items: center;
    justify-content: center;
    gap: 32px;
  }

  &__cat {
    position: relative;
    cursor: pointer;
  }

  &__cat-label {
    color: var(--text-on-primary);
    font-size: 16px;
    font-weight: 600;
    padding: 28px 0;
    transition: color 0.18s ease;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 18px;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--secondary-01),
        transparent
      );
      opacity: 0;
      transition: opacity 0.18s ease;
    }
  }

  &__cat:hover &__cat-label::after {
    opacity: 1;
  }

  // 副選單：hover 展開
  &__sub {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 140px;
    padding: 10px 14px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    z-index: 10;
  }

  &__sub-item {
    color: var(--text-on-primary);
    font-size: 14px;
    padding: 6px 8px;
    border-radius: 4px;
    transition: background 0.15s ease;

    &:hover {
      background: hsla(var(--primary-h), var(--primary-s), 60%, 0.15);
    }
  }

  // hover state：放在最後讓 specificity 升序符合 stylelint
  &__cat:hover &__cat-label {
    color: var(--secondary-01);
  }

  &__cat:hover &__sub {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

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
}
</style>
