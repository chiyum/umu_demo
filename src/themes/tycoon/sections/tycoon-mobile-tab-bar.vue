<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

/**
 * tycoon mobile 底部 5 tab bar
 *
 * 對齊使用者設計稿 .tabbar 段：
 * - fixed 底部 + 半透明白底 + backdrop blur + 上邊 1.5px 白色描邊 + 上方落影
 * - 5 個 tab：首頁 / 優惠 / 存提 / 客服 / 我的
 * - 每個 tab：icon + label 上下排列
 * - 預設灰藍色（#7aa0d2），active 時主藍（var(--color-primary)）
 *
 * 為何不複用 common/landing/mobile-bottom-tab-bar.vue：
 * - 共用元件用 Material Symbols 字型，設計稿手機 5 tab 用 inline monochrome SVG
 * - 設計稿配色（灰藍 7aa0d2 / 主藍切換）很特定，自寫一份控制度高
 * - 配 var(--text-muted) / var(--color-primary) 三變體都會跟著走
 */

interface TabItem {
  key: string;
  label: string;
}

const tabs: TabItem[] = [
  { key: "home", label: "首頁" },
  { key: "promo", label: "優惠" },
  { key: "wallet", label: "存提" },
  { key: "cs", label: "客服" },
  { key: "me", label: "我的" }
];

/** 當前 active tab key，預設 home */
const activeKey = ref<string>("home");

const $q = useQuasar();

function handleTap(item: TabItem): void {
  activeKey.value = item.key;
  $q.notify({
    message: `Demo 環境：${item.label} 僅展示版面`,
    color: "primary",
    position: "top",
    timeout: 1500
  });
}
</script>

<template>
  <nav class="tycoon-m-tab" role="navigation" aria-label="底部主導覽">
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="tycoon-m-tab__item"
      :class="{ 'tycoon-m-tab__item--active': activeKey === t.key }"
      :aria-pressed="activeKey === t.key"
      @click="handleTap(t)"
    >
      <span class="tycoon-m-tab__icon" aria-hidden="true">
        <!--
          5 個 tab 各自獨立 SVG path（對齊設計稿 T 物件內 5 條 path）
          - currentColor 跟父層走 → active 時自動變主色
          - viewBox 24x24 統一寬高
        -->
        <!-- home：屋頂 + 牆 -->
        <svg v-if="t.key === 'home'" viewBox="0 0 24 24" focusable="false">
          <path
            fill="currentColor"
            d="M12 3 2.5 11h2.2v9h5.3v-5.5h4v5.5h5.3v-9h2.2z"
          />
        </svg>
        <!-- promo：擴音器 -->
        <svg
          v-else-if="t.key === 'promo'"
          viewBox="0 0 24 24"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M3 10l13-5v14L9 16v3H6v-4l-3-1zm15-4.5c2.5.7 2.5 6.3 0 7z"
          />
        </svg>
        <!-- wallet：錢包 + 銀色硬幣 -->
        <svg
          v-else-if="t.key === 'wallet'"
          viewBox="0 0 24 24"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M5 5h11a3 3 0 0 1 3 3v1h-6a3 3 0 0 0 0 6h6v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"
          />
          <circle cx="15" cy="12" r="1.6" fill="#fff" />
        </svg>
        <!-- cs：客服耳機 -->
        <svg v-else-if="t.key === 'cs'" viewBox="0 0 24 24" focusable="false">
          <path
            fill="currentColor"
            d="M12 3a8 8 0 0 0-8 8v5a3 3 0 0 0 3 3h1v-7H6a6 6 0 0 1 12 0h-2v7h1a3 3 0 0 0 3-3v-5a8 8 0 0 0-8-8z"
          />
        </svg>
        <!-- me：人頭像 -->
        <svg v-else viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="8" r="4.2" fill="currentColor" />
          <path fill="currentColor" d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
        </svg>
      </span>

      <span class="tycoon-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
// 對齊設計稿 .tabbar 規格：
// - position fixed / bottom 0 / max-width 430 / padding 10px 6px 14px
// - 半透白漸層底 + backdrop-filter blur(8px) + 上邊 1.5px 白
// - shadow 上方 -4px 18px 藍黑光
.tycoon-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  padding: 10px 6px max(14px, env(safe-area-inset-bottom));
  background: linear-gradient(
    180deg,
    rgba(233, 243, 253, 0.85) 0%,
    rgba(214, 231, 248, 0.97) 100%
  );
  backdrop-filter: blur(8px);
  border-top: 1.5px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 -4px 18px rgba(20, 70, 160, 0.12);

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px;
    border: none;
    background: transparent;
    // 預設灰藍（對齊設計稿 .tab color #7aa0d2）
    color: #7aa0d2;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition:
      color 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    // active：主藍
    &--active {
      color: var(--color-primary);
    }
  }

  &__icon {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  &__icon svg {
    width: 100%;
    height: 100%;
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.3px;
  }
}
</style>
