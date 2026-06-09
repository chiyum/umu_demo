<script setup lang="ts">
/**
 * dahsing 三版型共用桌面 sticky topbar
 *
 * 結構參考 tycoon-pc / at99-pc，把 mobile 的 header 概念橫向延伸到桌面：
 * - 左：logo
 * - 中：主導覽（7 分類橫排，桌面才有 — mobile 用左側 sidebar）
 * - 右：註冊 + 登入 + flag 色塊
 *
 * 為什麼三 theme 桌面共用同一個 topbar：
 * - topbar 屬於品牌 chrome（logo + 主導覽 + auth），與「中央版面風格」無關
 * - 三 theme 桌面的差異主要在 main 中央區（瀑布流 / 分頁 / 橫向列表）
 * - 共用 chrome 才能突顯「同品牌但中央版面不同」的銷售敘事
 *
 * 為什麼 navItems 用 DAHSING_NAV_ITEMS：與 mobile sidebar 同一份資料源，
 * 整站 7 分類一致；mobile sidebar 走 compact 模式、桌面走橫排 inline 模式。
 */
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { DAHSING_NAV_ITEMS } from "../_assets";

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <header class="dahsing-pc-topbar">
    <div class="dahsing-pc-topbar__inner">
      <a class="dahsing-pc-topbar__brand" href="#" :aria-label="logoLabel">
        <img :src="logoSrc" :alt="logoLabel" class="dahsing-pc-topbar__logo" />
      </a>

      <nav class="dahsing-pc-topbar__nav" aria-label="主導覽">
        <a
          v-for="item in DAHSING_NAV_ITEMS"
          :key="item.key"
          href="#"
          class="dahsing-pc-topbar__nav-link"
          :class="{ 'dahsing-pc-topbar__nav-link--hot': item.hot }"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="dahsing-pc-topbar__actions">
        <button
          type="button"
          class="dahsing-pc-topbar__btn dahsing-pc-topbar__btn--ghost"
        >
          註冊
        </button>
        <button
          type="button"
          class="dahsing-pc-topbar__btn dahsing-pc-topbar__btn--primary"
        >
          登入
        </button>
        <div class="dahsing-pc-topbar__flag" role="img" aria-label="繁中" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.dahsing-pc-topbar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--bg-base-translucent, var(--bg-surface));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sticky, var(--shadow));

  &__inner {
    width: 1280px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 24px;
    height: 76px;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 48px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
  }

  &__nav {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 22px;

    // 不設 overflow：桌面 1280 寬下 nav 約 590-680px，actions 已 flex-shrink:0 保護
    // 設了 overflow-x:auto 會建立 clipping context 把 HOT badge ::after 的負偏移裁掉
  }

  &__nav-link {
    position: relative;
    color: var(--text-primary);
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.18s ease;

    &:hover {
      color: var(--color-primary);
    }

    // active 用 hot 標記第一個（首頁）
    &--hot::after {
      content: "HOT";
      position: absolute;
      top: -10px;
      right: -28px;
      padding: 1px 5px;
      background: var(--badge-live, #e0552b);
      color: #ffffff;
      font-size: 8px;
      font-weight: 900;
      letter-spacing: 0.5px;
      border-radius: 6px 6px 6px 0;
      transform: rotate(-8deg);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  &__btn {
    height: 38px;
    padding: 0 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.18s ease;
    font-family: inherit;

    &--ghost {
      background: var(--bg-surface);
      color: var(--color-primary);
      border: 1.5px solid var(--color-secondary);
    }

    &--primary {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: none;
      box-shadow: var(--shadow);
    }

    &:hover {
      filter: brightness(1.06);
    }
  }

  // flag 色塊與 mobile-header 同 token：走 --gradient-flag-bg；fallback 為米橘 default
  &__flag {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--bg-surface);
    box-shadow: var(--shadow);
    background: var(
      --gradient-flag-bg,
      radial-gradient(circle at 50% 40%, #f5e3d4 0%, var(--color-primary) 75%)
    );
  }
}
</style>
