<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import iconHome from "../assets/bottom-bar/tab-home.svg?url";
import iconPromo from "../assets/bottom-bar/tab-promo.svg?url";
import iconWallet from "../assets/bottom-bar/tab-wallet.svg?url";
import iconMe from "../assets/bottom-bar/tab-me.svg?url";
import iconCs from "../assets/bottom-bar/tab-cs.svg?url";

/**
 * vietvip mobile 底部 5 tab bar
 *
 * 對齊 lilian_vietvip_web layout.scss .nav 結構：
 * - 原專案 nav：bottom 0.8rem / height 2rem / 玫瑰金漸層 ul
 *   linear-gradient(180deg, #b48777 5%, #e4b39e 20%, #edc7b1 36%, #ddad98 52%, #8a6459 73%)
 * - 5 個 icon：bottom_bar_item_home / discount / wallet / mine / hotline
 *
 * 視覺對齊「越南 VIP 紅金主題」：
 * - 底色從玫瑰金漸層改成「深酒紅半透 + 金邊」，配色更貼近 vietvip 主視覺
 * - icon 仍用原 5 個 SVG（已標準化白色 silhouette），active 時用金色 filter
 */

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

const tabs: TabItem[] = [
  { key: "home", label: "首頁", icon: iconHome },
  { key: "promo", label: "優惠", icon: iconPromo },
  { key: "wallet", label: "錢包", icon: iconWallet },
  { key: "cs", label: "客服", icon: iconCs },
  { key: "me", label: "我的", icon: iconMe }
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
  <nav class="vietvip-m-tab" role="navigation" aria-label="底部主導覽">
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="vietvip-m-tab__item"
      :class="{ 'vietvip-m-tab__item--active': activeKey === t.key }"
      :aria-pressed="activeKey === t.key"
      @click="handleTap(t)"
    >
      <span class="vietvip-m-tab__icon" aria-hidden="true">
        <img :src="t.icon" :alt="`${t.label} 圖示`" />
      </span>
      <span class="vietvip-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
// 對齊越南 VIP 主題：深酒紅半透底 + 上方金線
// 高度比 tycoon / ant-sport 略高，配合「上方圓角 + 金邊」打造 VIP 感
.vietvip-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  padding: 10px 6px max(14px, env(safe-area-inset-bottom));
  background: linear-gradient(
    180deg,
    rgba(74, 15, 29, 0.92) 0%,
    rgba(28, 3, 9, 0.98) 100%
  );
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--vietvip-gold-2);
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.55);

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--vietvip-gold-2);
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition:
      color 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    &--active {
      color: var(--vietvip-gold-1);
    }
  }

  &__icon {
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  // icon 白色 silhouette PNG / SVG → 用 CSS filter 染成金色
  // 為什麼用 filter 而非另外準備兩套圖：
  // - 原 5 個 SVG 都是白色 silhouette，可吃 filter 做染色
  // - 兩態（normal/active）只差金色深淺，靠 brightness / hue-rotate 一行搞定
  &__icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    // 把白色 silhouette 染成深金（normal）
    filter: brightness(0) saturate(100%) invert(63%) sepia(48%) saturate(531%)
      hue-rotate(7deg) brightness(91%) contrast(86%);
    transition: filter 0.15s ease;
  }

  &__item--active &__icon img {
    // active：染成更亮的金（對應 --vietvip-gold-1）
    filter: brightness(0) saturate(100%) invert(89%) sepia(28%) saturate(637%)
      hue-rotate(2deg) brightness(106%) contrast(91%);
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.3px;
  }
}
</style>
