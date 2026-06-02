<script setup lang="ts">
import NoyaButton from "../atoms/noya-button.vue";

/**
 * noya header：玫瑰金 logo + 導覽 + 登入 / 註冊
 */
interface Props {
  /** 是否為手機版（控制 nav 顯示與排版） */
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

const navItems = [
  { label: "首頁", href: "#hero" },
  { label: "真人課程", href: "#cta" },
  { label: "熱門遊戲", href: "#games" },
  { label: "下載", href: "#download" }
];
</script>

<template>
  <header class="noya-header" :class="{ 'noya-header--mobile': mobile }">
    <div class="noya-header__inner">
      <div class="noya-header__brand">
        <!-- SVG logo placeholder：N + Noya 字樣 -->
        <svg
          class="noya-header__logo"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="17" fill="var(--color-primary)" />
          <text
            x="18"
            y="24"
            text-anchor="middle"
            font-size="18"
            font-weight="700"
            fill="#fff"
          >
            N
          </text>
        </svg>
        <span class="noya-header__brand-name">NOYA</span>
      </div>

      <nav v-if="!mobile" class="noya-header__nav">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="noya-header__nav-item"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="noya-header__actions">
        <NoyaButton variant="ghost">登入</NoyaButton>
        <NoyaButton variant="primary">立即註冊</NoyaButton>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.noya-header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__brand-name {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 2px;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 28px;
    flex: 1;
    justify-content: center;
  }

  &__nav-item {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &--mobile {
    .noya-header__inner {
      padding: 10px 16px;
    }

    .noya-header__actions {
      gap: 6px;

      :deep(.noya-btn) {
        padding: 8px 14px;
        font-size: 12px;
      }
    }
  }
}
</style>
