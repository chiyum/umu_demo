<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

/**
 * honest-max mobile 底部 tab bar — 對齊 honest_real layouts/layout-max-home.vue 底部 5 tab
 *
 * 原作結構：bottom-nav 5 個文字 tab（優惠 / 帳號 / 錢包 / 客服 / 我的），
 * 上方一條淡灰 border-top，icon 是 CSS sprite（demo 化用 emoji-style mask 即可）
 *
 * 為什麼 max 的底 nav 設計與 honest-at / vietvip 不同：
 * - 原作 max 走「白底 + 淡灰 border + 上方 CSS icon class」，沒有 png icon
 * - 直接抄用 vietvip 的「深底 + 圖示」反而失去 max 的「亮色簡潔感」
 * - 用內嵌 SVG mask 染色：normal 灰 / active 主色
 */

interface TabItem {
  key: string;
  label: string;
  svg: string;
}

// 5 個 tab 圖示 inline data URL（節省檔案數，視覺上是輪廓 silhouette）
const tabs: TabItem[] = [
  {
    key: "promo",
    label: "優惠",
    svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M21 5h-3l-2-2H8L6 5H3v2h18V5Zm-2 4H5v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9Zm-7 9-4-4 1.4-1.4 2.6 2.6 5.6-5.6L19 11l-7 7Z'/%3E%3C/svg%3E"
  },
  {
    key: "account",
    label: "帳號",
    svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M3 5h18v3H3V5Zm0 5h18v9H3v-9Zm3 3v3h4v-3H6Z'/%3E%3C/svg%3E"
  },
  {
    key: "wallet",
    label: "錢包",
    svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M20 4h-2v3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-2 12a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v4h-2Z'/%3E%3C/svg%3E"
  },
  {
    key: "cs",
    label: "客服",
    svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M12 1a10 10 0 0 0-10 10v6a4 4 0 0 0 4 4h2v-9H4v-1a8 8 0 0 1 16 0v1h-4v9h2a4 4 0 0 0 4-4v-6A10 10 0 0 0 12 1Z'/%3E%3C/svg%3E"
  },
  {
    key: "me",
    label: "我的",
    svg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4Z'/%3E%3C/svg%3E"
  }
];

const activeKey = ref<string>("account");

const $q = useQuasar();

// 拆出 helper：避免在 template 內寫 escape quote 的 url() 字串引爆 Vue parser
// 為什麼需要 url(...)：CSS mask 屬性要的是 url(<src>) 才能載入 data URL
function iconStyle(item: TabItem): Record<string, string> {
  return { "--icon-url": `url("${item.svg}")` };
}

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
  <nav class="honest-max-m-tab" role="navigation" aria-label="底部主導覽">
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="honest-max-m-tab__item"
      :class="{ 'honest-max-m-tab__item--active': activeKey === t.key }"
      :aria-pressed="activeKey === t.key"
      @click="handleTap(t)"
    >
      <span
        class="honest-max-m-tab__icon"
        :style="iconStyle(t)"
        aria-hidden="true"
      ></span>
      <span class="honest-max-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
// 底色白 + 上方淡灰 border：對齊原作 max layout 的清爽風格
.honest-max-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  padding: 6px 4px max(8px, env(safe-area-inset-bottom));
  background: var(--bg-surface);
  border-top: 1px solid #e1e1e2;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.06);

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.15s ease;

    &:active {
      transform: scale(0.94);
    }

    &--active {
      color: var(--primary-01);
    }
  }

  // icon 用 CSS mask 染色，可隨 currentColor 跟動
  &__icon {
    width: 24px;
    height: 24px;
    background: currentcolor;
    mask: var(--icon-url) no-repeat center / contain;
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
  }
}
</style>
