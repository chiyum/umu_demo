<script setup lang="ts">
/**
 * fived mobile bottom footer / tab bar
 *
 * 視覺取自 5d_v2 src/components/layout/MobileFooter.vue：
 * 原作有 5 個入口：首頁 / 優惠 / 客服 / 下載 / 我的
 * 中間「客服」放凸出的金色圓鈕（賭場大廳客服 CTA 球，與 at-deluxe 設計呼應但球色不同）
 *
 * Demo 化：5 tab + 中間客服球 + Quasar Notify 提示
 */
import { ref } from "vue";
import { useQuasar } from "quasar";

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

const tabs: TabItem[] = [
  { key: "home", label: "首頁", icon: "🏠" },
  { key: "promo", label: "優惠", icon: "🎁" },
  { key: "cs", label: "客服", icon: "💬" },
  { key: "download", label: "下載", icon: "⬇" },
  { key: "me", label: "我的", icon: "👤" }
];

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
  <nav class="fived-m-tab" aria-label="底部主導覽">
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="fived-m-tab__item"
      :class="{
        'fived-m-tab__item--active': activeKey === t.key,
        'fived-m-tab__item--center': t.key === 'cs'
      }"
      @click="handleTap(t)"
    >
      <span class="fived-m-tab__icon">{{ t.icon }}</span>
      <span class="fived-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.fived-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(26, 12, 18, 0.92) 0%,
    rgba(12, 6, 8, 0.98) 100%
  );
  border-top: 1px solid var(--fived-banner-border);
  backdrop-filter: blur(10px);
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.55);
}

.fived-m-tab__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 100%;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  user-select: none;
  font-family: inherit;
  padding: 0;
  transition:
    color 0.18s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.94);
  }

  &--active {
    color: var(--primary-01);
  }
}

.fived-m-tab__icon {
  font-size: 18px;
  line-height: 1;
}

.fived-m-tab__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

// 中間客服凸出金球
.fived-m-tab__item--center {
  position: relative;
}

.fived-m-tab__item--center .fived-m-tab__icon {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50%;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  border: 3px solid var(--bg-base-deep);
  box-shadow:
    var(--shadow-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.fived-m-tab__item--center .fived-m-tab__label {
  margin-top: 18px;
}
</style>
