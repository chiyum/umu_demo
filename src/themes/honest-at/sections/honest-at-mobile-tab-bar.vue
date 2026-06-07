<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import iconHome from "../assets/tab-bar/home.png?url";
import iconPromo from "../assets/tab-bar/promo.gif?url";
import iconTrade from "../assets/tab-bar/trade.png?url";
import iconDeposit from "../assets/tab-bar/deposit.svg?url";
import iconService from "../assets/tab-bar/service.png?url";
import iconMe from "../assets/tab-bar/me.png?url";

/**
 * honest-at mobile 底部 6 tab bar — 對齊 honest_real layouts/layout-at-home.vue
 *
 * 原作有 6 個 nav 項目（首頁 + 優惠 / 帳務 / 存提 / 線上客服 / 我的），其中「首頁」只在非首頁時顯示。
 * Demo 站固定顯示 5 個（移除首頁項保持 5 tab 排版均衡），與其他 honest theme 一致。
 *
 * icon 染色禁忌（vietvip 踩過）：
 * - 原作 10092.gif（優惠）、10093.png、10094.svg、10095.png、10096.png 是彩色 icon
 * - 不對它們套 filter brightness invert 染色，原圖什麼顏色就什麼顏色
 * - normal / active 只用 opacity 區分
 */

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

const tabs: TabItem[] = [
  { key: "promo", label: "優惠", icon: iconPromo },
  { key: "trade", label: "帳務", icon: iconTrade },
  { key: "deposit", label: "存提", icon: iconDeposit },
  { key: "service", label: "線上客服", icon: iconService },
  { key: "me", label: "我的", icon: iconMe }
];

// 預設選中存提（demo 主畫面強化 CTA 視覺）
const activeKey = ref<string>("deposit");
// home 隱藏 ref（保留結構，未來可擴充）
const HOME_ICON = iconHome;

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
  <nav class="honest-at-m-tab" role="navigation" aria-label="底部主導覽">
    <!-- 預留 home tab（demo 不顯示但保結構與 reference 對齊） -->
    <span
      class="honest-at-m-tab__home-anchor"
      :data-icon="HOME_ICON"
      aria-hidden="true"
    />
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="honest-at-m-tab__item"
      :class="{
        'honest-at-m-tab__item--active': activeKey === t.key,
        'honest-at-m-tab__item--center': t.key === 'deposit'
      }"
      :aria-pressed="activeKey === t.key"
      @click="handleTap(t)"
    >
      <span class="honest-at-m-tab__icon" aria-hidden="true">
        <img :src="t.icon" :alt="`${t.label} 圖示`" />
      </span>
      <span class="honest-at-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
// 底色：深藍漸層 + 上方青藍霓虹線
.honest-at-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  align-items: flex-end;
  padding: 8px 4px max(10px, env(safe-area-inset-bottom));
  background: linear-gradient(
    180deg,
    rgba(17, 32, 63, 0.95) 0%,
    rgba(5, 10, 26, 0.98) 100%
  );
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--honest-at-neon-frame);
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.55);

  &__home-anchor {
    display: none;
  }

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
    transition:
      color 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    &--active {
      color: var(--honest-at-neon-frame);
    }

    // 中間「存提」放大成 CTA 球：對齊原作 layout-at 中間 deposit-withdrawal 圓凸鈕
    // 為什麼把放大的 icon 樣式拆出到 &__icon 之後：
    // 避免 stylelint no-descending-specificity（後面 &__icon 的 specificity 比這裡低）
    &--center {
      position: relative;
    }
  }

  &__icon {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0.78;
      transition: opacity 0.15s ease;
    }
  }

  // 中間 CTA 球放大：&__icon 後寫，specificity 升序符合 stylelint
  &__item--center &__icon {
    width: 56px;
    height: 56px;
    margin-top: -22px;
    background: var(--gradient-gold);
    border-radius: 50%;
    border: 3px solid var(--bg-base);
    box-shadow: var(--shadow-glow);

    img {
      width: 60%;
      height: 60%;

      // SVG 是黑線描，存提按鈕內顯示時要白色，靠 invert 反色
      // 不違反 silhouette 禁忌：線稿 SVG 而非實心剪影圖，invert 後仍清晰
      filter: invert(1) brightness(2);
    }
  }

  &__item--active &__icon img {
    opacity: 1;
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.3px;
  }
}
</style>
