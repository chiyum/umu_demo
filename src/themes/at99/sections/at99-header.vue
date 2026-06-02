<script setup lang="ts">
import At99Button from "../atoms/at99-button.vue";
// 真實素材：原站 (at99tw.net CDN) logo
import at99Logo from "@/assets/themes/at99/images/logos/at99-logo.png";

interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const navItems = [
  { label: "首頁", href: "#" },
  { label: "電子遊戲", href: "#games" },
  { label: "真人娛樂", href: "#live" },
  { label: "排行榜", href: "#leaderboard" }
];
</script>

<template>
  <header class="at99-header" :class="{ 'at99-header--mobile': mobile }">
    <div class="at99-header__inner">
      <div class="at99-header__brand">
        <img class="at99-header__logo" :src="at99Logo" alt="AT99" />
      </div>

      <nav v-if="!mobile" class="at99-header__nav">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="at99-header__nav-item"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="at99-header__actions">
        <At99Button variant="ghost">登入</At99Button>
        <At99Button variant="gold">立即註冊</At99Button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.at99-header {
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 24px;
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

  &__logo {
    display: block;
    height: 36px;
    width: auto;
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
    font-weight: 600;
    transition: all 0.15s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
      color: var(--color-primary);
      text-shadow: 0 0 6px var(--color-primary);
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &--mobile {
    .at99-header__inner {
      padding: 10px 14px;
      gap: 8px;
    }

    .at99-header__actions {
      :deep(.at99-btn) {
        padding: 7px 14px;
        font-size: 11px;
      }
    }

    .at99-header__logo {
      height: 28px;
    }
  }
}
</style>
