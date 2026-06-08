<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

/**
 * at-deluxe mobile 底部 tab bar
 *
 * 視覺取自 slime-at99 整體賭場霓虹風格延伸：
 * - 原作 mobile.vue 內沒有 bottom tab（floatingButton 是 chat icon 右下浮球，
 *   完整 bottom nav 在外層 layout-default）
 * - demo 站補一條 5 tab fixed bar，與其它 theme（honest-no6 / vietvip）的 tab-bar 一致
 *
 * 視覺差異化（避免與 honest-no6 / vietvip / honest-at 等深底 tab bar 撞）：
 * - 整條 tab bar 深藍 radial（與 hero 同調）+ 青藍頂線
 * - 中間「首頁」放凸出的青藍霓虹球（賭場大廳常見的「主入口 CTA 球」）
 * - 凸出球用 svg-icon style 高光內描邊
 *
 * 純 CSS / Quasar Notify 提示
 */
interface TabItem {
  key: string;
  label: string;
  icon: string;
}

const tabs: TabItem[] = [
  { key: "promo", label: "優惠", icon: "🎁" },
  { key: "wallet", label: "錢包", icon: "👛" },
  { key: "home", label: "首頁", icon: "♠️" },
  { key: "cs", label: "客服", icon: "💬" },
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
  <nav class="at-deluxe-m-tab" aria-label="底部主導覽">
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="at-deluxe-m-tab__item"
      :class="{
        'at-deluxe-m-tab__item--active': activeKey === t.key,
        'at-deluxe-m-tab__item--center': t.key === 'home'
      }"
      @click="handleTap(t)"
    >
      <span class="at-deluxe-m-tab__icon">{{ t.icon }}</span>
      <span class="at-deluxe-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
// 深藍 radial 底 + 上方青藍細線 + 中間球凸出
.at-deluxe-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(10, 16, 36, 0.92) 0%,
    rgba(5, 9, 19, 0.98) 100%
  );
  border-top: 1px solid var(--border);
  backdrop-filter: blur(10px);
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.55);
}

.at-deluxe-m-tab__item {
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

.at-deluxe-m-tab__icon {
  font-size: 20px;
  line-height: 1;
}

.at-deluxe-m-tab__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

// 中間 home 凸出球：青藍漸層 + glow（賭場大廳主入口 CTA）
.at-deluxe-m-tab__item--center {
  position: relative;
}

.at-deluxe-m-tab__item--center .at-deluxe-m-tab__icon {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border-radius: 50%;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  border: 3px solid var(--bg-base-deep);
  box-shadow:
    var(--shadow-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.at-deluxe-m-tab__item--center .at-deluxe-m-tab__label {
  margin-top: 18px;
}
</style>
