<script setup lang="ts">
/**
 * dahsing 三版型共用 mobile header：logo + 註冊/登入 + flag
 *
 * 為什麼 logo 走 themeStore.currentLogo：
 * - 使用者要求三 theme defaultLogo 用既有 dahsing PNG（與 at99 一致）
 * - FAB 切 logo 時所有引用自動更新（與其他 theme 行為一致）
 *
 * 為什麼旗子用 SCSS background-image 而非 <img>：
 * - 原稿 HTML 用 background-image: url('https://flagcdn.com/...') 但本 demo 不允許外連 CDN（GitHub Pages 離線部署）
 * - 改成 div + token 漸層當「旗子色塊」示意，視覺密度不變但無外網依賴
 */
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="dahsing-m-header">
    <a class="dahsing-m-header__logo" href="#" :aria-label="logoLabel">
      <img :src="logoSrc" :alt="logoLabel" class="dahsing-m-header__logo-img" />
    </a>

    <div class="dahsing-m-header__auth">
      <button
        type="button"
        class="dahsing-m-header__btn dahsing-m-header__btn--ghost"
      >
        註冊
      </button>
      <button
        type="button"
        class="dahsing-m-header__btn dahsing-m-header__btn--fill"
      >
        登入
      </button>
    </div>

    <div class="dahsing-m-header__flag" aria-label="繁中" role="img" />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-m-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 18px 14px;

  &__logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 6px 12px;
    border-radius: 14px;
    text-decoration: none;
  }

  &__logo-img {
    height: 38px;
    width: auto;
    max-width: 110px;
    object-fit: contain;
  }

  &__auth {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__btn {
    font-family: inherit;
    font-weight: 700;
    font-size: 16px;
    padding: 11px 22px;
    border-radius: 999px;
    cursor: pointer;
    border: 1.6px solid var(--color-secondary);
    transition: transform 0.12s ease;

    &:active {
      transform: scale(0.94);
    }

    &--ghost {
      background: var(--bg-surface);
      color: var(--color-primary);
      box-shadow: var(--shadow);
    }

    &--fill {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: transparent;
      box-shadow: var(--shadow);
    }
  }

  // 旗子色塊：用 token 漸層代替 flagcdn 外連，視覺密度不變
  &__flag {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 2px solid var(--bg-surface);
    box-shadow: var(--shadow);
    background: radial-gradient(
      circle at 50% 40%,
      #f5e3d4 0%,
      var(--color-primary) 75%
    );
  }
}
</style>
