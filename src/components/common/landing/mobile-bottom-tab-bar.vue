<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuasar } from "quasar";

/**
 * 行動裝置底部 fixed tab bar — noya / at99 mobile 共用
 *
 * 設計：
 * - 5 個 icon + label 平均分配
 * - 點擊只跳 Notify 提示，純 demo
 * - icon 用 Quasar 內建 material symbol（避免再下載額外字型）
 * - 顏色全走 var()，配色切換時跟著走
 *
 * 為何是共用元件而非各 theme 自己寫：手機底部 tab bar 結構幾乎一樣，
 * 只是配色差異；用 CSS var 已可解決配色，沒理由重複實作。
 */

interface TabItem {
  /** 識別 key */
  key: string;
  /** Quasar / Material icon 名稱 */
  icon: string;
  /** 文字標籤 */
  label: string;
}

interface Props {
  /** 自訂 tab 項目；不傳則用 5 個預設項 */
  items?: TabItem[];
  /** 預設 active 的 key */
  activeKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeKey: "home",
  items: () => [
    { key: "home", icon: "home", label: "首頁" },
    { key: "promo", icon: "redeem", label: "優惠" },
    { key: "service", icon: "support_agent", label: "客服" },
    { key: "member", icon: "person", label: "會員" },
    { key: "more", icon: "menu", label: "更多" }
  ]
});

const $q = useQuasar();

/**
 * 當前 active key
 *
 * 改為 ref 而非 computed setter 為空的 wrapper：原本寫成
 * `computed({ set: () => {} })` 會讓 v-model / 賦值靜默失效，
 * 點擊後 highlight 停不住，使用者體感是「按下沒反應」。
 *
 * 改用 ref 內部維護，並 watch props.activeKey 同步外部初始值；
 * 如父層之後想接管，再加 emit 或改回 v-model 模式。
 */
const internalActive = ref(props.activeKey);

watch(
  () => props.activeKey,
  (next) => {
    internalActive.value = next;
  }
);

function handleTap(item: TabItem) {
  internalActive.value = item.key;
  $q.notify({
    message: `Demo 環境：${item.label} 僅展示版面`,
    color: "primary",
    position: "top",
    timeout: 1500
  });
}
</script>

<template>
  <nav class="mobile-tab-bar" role="navigation" aria-label="底部主導覽">
    <button
      v-for="item in props.items"
      :key="item.key"
      type="button"
      class="mobile-tab-bar__item"
      :class="{ 'mobile-tab-bar__item--active': internalActive === item.key }"
      @click="handleTap(item)"
    >
      <q-icon :name="item.icon" size="22px" />
      <span class="mobile-tab-bar__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  padding: 4px 0 max(4px, env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);

  &__item {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 6px 4px;
    cursor: pointer;
    transition: color 0.15s ease;

    &--active {
      color: var(--color-primary);
    }

    &:active {
      transform: scale(0.96);
    }
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }
}
</style>
