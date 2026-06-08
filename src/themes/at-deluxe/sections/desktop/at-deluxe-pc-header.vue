<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * at-deluxe desktop 頂部 header — sticky brand bar + nav + 雙 CTA
 *
 * 視覺結構：與 mobile-header 同設計語言（深藍 sticky + 青藍漸層登入鈕 + 紅角徽註冊鈕），
 * PC 寬度多 8 項導覽列在 logo 與按鈕之間
 *
 * 為什麼 PC 有 nav 而 mobile 沒有：
 * - PC 寬度足夠橫向放 8 項，mobile 空間有限優先給 logo + 兩顆 CTA
 * - 對齊 slime-at99 PC 版視覺密度高、賭場大廳橫向 nav 是主視覺
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

const navItems = [
  "首頁",
  "真人",
  "電子",
  "彩票",
  "體育",
  "棋牌",
  "捕魚",
  "電競"
];
</script>

<template>
  <header class="at-deluxe-pc-header">
    <div class="at-deluxe-pc-header__inner">
      <a class="at-deluxe-pc-header__brand" href="#" :aria-label="logoLabel">
        <img
          :src="logoSrc"
          :alt="logoLabel"
          class="at-deluxe-pc-header__logo"
          :class="{ 'at-deluxe-pc-header__logo--blend': useScreenBlend }"
        />
      </a>

      <nav class="at-deluxe-pc-header__nav" aria-label="主導覽">
        <a
          v-for="n in navItems"
          :key="n"
          href="#"
          class="at-deluxe-pc-header__nav-link"
        >
          {{ n }}
        </a>
      </nav>

      <div class="at-deluxe-pc-header__actions">
        <button
          type="button"
          class="at-deluxe-pc-header__btn at-deluxe-pc-header__btn--login"
        >
          登入
        </button>
        <button
          type="button"
          class="at-deluxe-pc-header__btn at-deluxe-pc-header__btn--reg"
        >
          註冊
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: linear-gradient(
    180deg,
    rgba(5, 9, 19, 0.88) 0%,
    rgba(5, 9, 19, 0.62) 100%
  );
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sticky);
}

.at-deluxe-pc-header__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 12px;
  height: 76px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.at-deluxe-pc-header__brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.at-deluxe-pc-header__logo {
  height: 48px;
  width: auto;
  max-width: 180px;
  object-fit: contain;

  &--blend {
    mix-blend-mode: screen;
  }
}

.at-deluxe-pc-header__nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 22px;
}

.at-deluxe-pc-header__nav-link {
  color: var(--text-muted);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;
  position: relative;
  transition: color 0.18s ease;

  &:hover {
    color: var(--primary-01);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -8px;
      height: 2px;
      background: var(--at-deluxe-jackpot-line);
      border-radius: 1px;
    }
  }
}

.at-deluxe-pc-header__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

// login = 青藍漸層、reg = 紅角徽（與 mobile header 同設計）
.at-deluxe-pc-header__btn {
  height: 38px;
  padding: 0 22px;
  border-radius: 19px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  border: none;
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

  &--login {
    color: var(--text-on-gold);
    background: var(--gradient-gold);
    box-shadow: 0 4px 12px rgba(105, 255, 255, 0.32);
  }

  &--reg {
    color: #ffffff;
    background: var(--gradient-hot);
    box-shadow: var(--shadow-glow-hot);
  }

  &:hover {
    filter: brightness(1.1);
  }
}
</style>
