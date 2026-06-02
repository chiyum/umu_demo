<script setup lang="ts">
import { ref } from "vue";
import At99Button from "../atoms/at99-button.vue";
import LoginModal from "@/components/common/landing/login-modal.vue";

/**
 * at99 頂部 header：黑底 logo + 11 項 nav + 登入/開戶 + 音訊 toggle
 *
 * 設計：
 * - sticky 在頁面最頂，背景 bg-base-translucent
 * - logo 用 CSS 文字繪製（黃漸層 + 描邊），避免使用任何外部品牌素材
 * - 11 個 nav 項目，水平排列
 * - 右側登入（實心 cyan）+ 免費開戶（金色漸層）+ 音訊 toggle
 *
 * 為何 logo 不用 SVG：保持品牌 mark 通用化「DC」(DEMO CASINO)，
 * 完全避免外觀識別性
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

const navItems = [
  { key: "home", label: "首頁" },
  { key: "sport", label: "體育賽事" },
  { key: "lottery", label: "彩票遊戲" },
  { key: "live", label: "真人視訊" },
  { key: "slot", label: "電子遊戲" },
  { key: "fish", label: "捕魚達人" },
  { key: "chess", label: "棋牌遊戲" },
  { key: "esport", label: "電子競技" },
  { key: "vip", label: "VIP" },
  { key: "promo", label: "優惠活動" },
  { key: "reward", label: "領獎中心" }
];

const audioOn = ref(true);
const loginOpen = ref(false);
</script>

<template>
  <header class="at99-top" :class="{ 'at99-top--mobile': mobile }">
    <div class="at99-top__inner">
      <!-- 左：logo -->
      <a class="at99-top__brand" href="#" aria-label="回首頁">
        <span class="at99-top__brand-mark">DC</span>
        <span class="at99-top__brand-text">
          <span class="at99-top__brand-title">DEMO CASINO</span>
          <span class="at99-top__brand-sub">示範娛樂城 B</span>
        </span>
      </a>

      <!-- 中：11 nav（mobile 隱藏） -->
      <nav v-if="!mobile" class="at99-top__nav" aria-label="主導覽">
        <a
          v-for="item in navItems"
          :key="item.key"
          href="#"
          class="at99-top__nav-item"
          :class="{ 'at99-top__nav-item--active': item.key === 'home' }"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- 右：登入 / 開戶 / 音訊 -->
      <div class="at99-top__actions">
        <At99Button variant="primary" @click="loginOpen = true">
          登入
        </At99Button>
        <At99Button variant="gold" @click="loginOpen = true">
          免費開戶
        </At99Button>
        <button
          type="button"
          class="at99-top__audio"
          :class="{ 'at99-top__audio--on': audioOn }"
          :aria-label="audioOn ? '靜音' : '開啟音訊'"
          @click="audioOn = !audioOn"
        >
          <q-icon :name="audioOn ? 'volume_up' : 'volume_off'" size="20px" />
        </button>
      </div>
    </div>

    <LoginModal v-model="loginOpen" title="會員登入 / 開戶" />
  </header>
</template>

<style lang="scss" scoped>
.at99-top {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    gap: 18px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  &__brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background: linear-gradient(180deg, var(--color-accent) 0%, #d4951a 100%);
    color: #1a0e00;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 1px;
    box-shadow:
      0 0 12px var(--color-accent),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  &__brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  &__brand-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--color-primary);
    letter-spacing: 1.5px;
    text-shadow: 0 0 8px var(--color-primary);
  }

  &__brand-sub {
    font-size: 9px;
    color: var(--text-muted);
    letter-spacing: 2px;
    margin-top: 2px;
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 4px;
    flex-wrap: wrap;
  }

  &__nav-item {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 4px;
    transition: all 0.15s ease;
    white-space: nowrap;

    &:hover {
      color: var(--color-primary);
      background: var(--bg-overlay);
      text-shadow: 0 0 6px var(--color-primary);
    }

    &--active {
      color: var(--color-primary);
      text-shadow: 0 0 6px var(--color-primary);

      &::after {
        content: "";
        display: block;
        margin: 4px auto 0;
        width: 16px;
        height: 2px;
        background: var(--color-primary);
        border-radius: 1px;
        box-shadow: var(--neon-glow);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__audio {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-overlay);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &--on {
      color: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  &--mobile {
    .at99-top__inner {
      padding: 8px 12px;
      gap: 10px;
    }

    .at99-top__brand-mark {
      width: 34px;
      height: 34px;
      font-size: 13px;
    }

    .at99-top__brand-title {
      font-size: 13px;
    }

    .at99-top__brand-sub {
      font-size: 8px;
    }

    .at99-top__actions :deep(.at99-btn) {
      padding: 6px 10px;
      font-size: 11px;
    }

    .at99-top__audio {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
