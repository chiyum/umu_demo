<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * at99 桌面版 header — 視覺結構參考 slime-at99 desktop header.vue
 *
 * 對應原作 DOM：
 *   <header.header>
 *     .header-block
 *       <img.header-logo />
 *       .header-block--selectors
 *         .header-login（已登入視角）
 *           VIP 按鈕 / 帳號名 / 餘額 + 加值 / 8 個工具 icon menu
 *
 * Demo 化策略：
 * - 保留「已登入會員視角」（與 honest 三 theme 一致）：顯示帳號 / VIP 等級 / 餘額 / 加值
 * - 8 個工具 icon menu 用文字快捷鈕替代（投注/交易/公告/會員/信箱/VIP/優惠/登出）
 * - 配色：深藍底（--bg-base-deep）+ 青藍霓虹線（--color-primary），切變體時跟動
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

const TOOL_MENU = [
  "投注記錄",
  "交易紀錄",
  "最新公告",
  "會員中心",
  "信箱",
  "VIP",
  "優惠活動",
  "登出"
];
</script>

<template>
  <header class="at99-pc-header">
    <div class="at99-pc-header__block">
      <a class="at99-pc-header__brand" href="#" :aria-label="logoLabel">
        <img
          :src="logoSrc"
          :alt="logoLabel"
          class="at99-pc-header__logo"
          :class="{ 'at99-pc-header__logo--blend': useScreenBlend }"
        />
      </a>

      <div class="at99-pc-header__selectors">
        <button type="button" class="at99-pc-header__vip">VIP 0</button>
        <div class="at99-pc-header__account">
          <span class="at99-pc-header__account-name">xxxooo</span>
          <span class="at99-pc-header__account-money">$ 1,234</span>
          <button type="button" class="at99-pc-header__topup">+</button>
        </div>
        <ul class="at99-pc-header__tools">
          <li
            v-for="item in TOOL_MENU"
            :key="item"
            class="at99-pc-header__tool-item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// 對齊 slime-at99 .header：sticky / 深藍底 / 霓虹光線 / 1696 max-width inner
.at99-pc-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(
    180deg,
    var(--bg-base-deep) 0%,
    var(--bg-base) 100%
  );
  border-bottom: 1px solid var(--color-primary);
  box-shadow: 0 2px 12px hsla(0deg, 0%, 0%, 0.6);

  &__block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1696px;
    height: 76px;
    padding: 0 32px;
    margin: 0 auto;
    gap: 24px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 44px;
    width: auto;
    max-width: 180px;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__selectors {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    justify-content: flex-end;
  }

  // VIP 圓凸鈕：金漸層（變體可換色）
  &__vip {
    height: 36px;
    padding: 0 16px;
    border-radius: 18px;
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    font-size: 14px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-md);

    &:hover {
      filter: brightness(1.08);
    }
  }

  // 帳號 + 餘額 + 加值
  &__account {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    color: var(--text-primary);
    font-size: 14px;
  }

  &__account-name {
    font-weight: 600;
  }

  &__account-money {
    color: var(--color-accent);
    font-weight: 700;
  }

  &__topup {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: none;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    box-shadow: var(--neon-glow);

    &:hover {
      filter: brightness(1.1);
    }
  }

  // 工具列：8 個 chip 文字鈕
  &__tools {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__tool-item {
    padding: 6px 10px;
    color: var(--text-muted);
    font-size: 13px;
    cursor: pointer;
    border-radius: 6px;
    transition:
      color 0.18s ease,
      background 0.18s ease;

    &:hover {
      color: var(--color-primary);
      background: var(--bg-overlay);
    }
  }
}

@media (width <= 1440px) {
  .at99-pc-header__tool-item {
    padding: 6px 8px;
    font-size: 12px;
  }
}

@media (width <= 1280px) {
  .at99-pc-header__tools {
    display: none;
  }
}
</style>
