<script setup lang="ts">
import { useQuasar } from "quasar";

/**
 * at99 左側 fixed sidebar dock
 *
 * 設計：
 * - 100px 寬（與 --dock-offset 一致），垂直排列 8 個圓形 icon
 * - 黏在視窗左側，scrollable 頁面內容不影響
 * - icon 使用 Quasar 內建 material symbol
 *
 * Round 4 對齊原站：原站 at99tw.net DOM 的 `nav` 量到寬 101px，
 * 我們從 60px 拉寬到 100px，與原站結構對齊
 *
 * 為何放在左側：原站 dock 在左側，避開右下角客服浮標
 * 注意：theme switcher FAB 已改放左下角，與 dock 區分位置
 *      （dock 是 fixed left top-aligned，FAB 是 fixed left bottom）
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

const $q = useQuasar();

interface DockItem {
  key: string;
  icon: string;
  label: string;
}

const items: DockItem[] = [
  { key: "service", icon: "support_agent", label: "客服" },
  { key: "vip", icon: "diamond", label: "VIP" },
  { key: "promo", icon: "card_giftcard", label: "優惠" },
  { key: "rank", icon: "emoji_events", label: "排行" },
  { key: "app", icon: "smartphone", label: "App" },
  { key: "faq", icon: "help_outline", label: "FAQ" },
  { key: "agent", icon: "groups", label: "代理" },
  { key: "deposit", icon: "account_balance_wallet", label: "存款" }
];

function tap(item: DockItem) {
  $q.notify({
    message: `Demo：${item.label} 僅展示版面`,
    color: "primary",
    position: "left",
    timeout: 1200
  });
}
</script>

<template>
  <aside v-if="!mobile" class="at99-dock" aria-label="左側快捷工具列">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="at99-dock__item"
      :aria-label="item.label"
      @click="tap(item)"
    >
      <q-icon :name="item.icon" size="20px" />
      <span class="at99-dock__label">{{ item.label }}</span>
    </button>
  </aside>
</template>

<style lang="scss" scoped>
.at99-dock {
  position: fixed;

  // 從 top header 下方開始，使用 64px 安全高度
  top: 70px;
  left: 0;
  width: var(--dock-offset);
  z-index: 90;
  background: var(--dock-bg);
  border-right: 1px solid var(--border);
  border-radius: 0 8px 8px 0;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: var(--shadow);

  &__item {
    width: 100%;
    height: 64px;
    border-radius: 12px;
    background: var(--dock-icon-bg);
    border: 1px solid transparent;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    transition: all 0.15s ease;

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
      transform: translateX(2px);
    }
  }

  &__label {
    font-size: 10px;
    letter-spacing: 0.5px;
  }
}
</style>
