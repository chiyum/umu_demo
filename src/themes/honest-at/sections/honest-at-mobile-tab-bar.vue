<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import iconPromo from "../assets/tab-bar/promo.gif?url";
import iconTrade from "../assets/tab-bar/trade.png?url";
import iconDeposit from "../assets/tab-bar/deposit.svg?url";
import iconService from "../assets/tab-bar/service.png?url";
import iconMe from "../assets/tab-bar/me.png?url";

/**
 * honest-at mobile 底部 tab bar — 1:1 對齊 honest_real src/layouts/layout-at-home.vue
 *
 * 原作 DOM（home 頁時，首頁項 v-show=!isInHome 不顯示）：
 *   .layout-at-actions (fixed bottom / 75px / #0c1429 / 上方 1.5px linear-gradient line)
 *     .layout-at-actions-items (優惠)     icon 10092.gif
 *     .layout-at-actions-items (帳務)     icon 10093.png
 *     .layout-at-actions-items (存提)     icon 10094.svg  ← scale 1.75 / bottom 0.5rem
 *     .layout-at-actions-items (線上客服) icon 10095.png
 *     .layout-at-actions-items (我的)     icon 10096.png
 *
 * 每個 item：column / center / icon 40×40 / text 0.75rem #abacac
 * active text 變 #fff，active icon scale 1.35
 * 優惠 icon 額外 bottom 1rem（gif 動畫凸出視覺）
 * 存提 icon 額外 scale 1.75 + bottom 0.5rem
 *
 * icon 染色禁忌：原作就用原圖，不對 png 染色
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

// 對齊原作預設 activeAction = "discount"（即優惠）
const activeKey = ref<string>("promo");

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
  <div class="honest-at-m-tab">
    <div
      v-for="t in tabs"
      :key="t.key"
      class="honest-at-m-tab__item"
      :class="{
        'honest-at-m-tab__item--active': activeKey === t.key,
        'honest-at-m-tab__item--promo': t.key === 'promo',
        'honest-at-m-tab__item--deposit': t.key === 'deposit'
      }"
      @click="handleTap(t)"
    >
      <div class="honest-at-m-tab__icon">
        <img :src="t.icon" :alt="`${t.label} 圖示`" />
      </div>
      <div class="honest-at-m-tab__label">{{ t.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .layout-at-actions：fixed bottom / 75px / #0c1429 / blur(30px)
// 上方 1.5px linear-gradient 青藍線
.honest-at-m-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 75px;
  padding: 0 1.5rem max(0px, env(safe-area-inset-bottom));
  background: #0c1429;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: linear-gradient(to right, #1b1e1a, #3aa2ec, #1c1e1c);
  }

  // 對齊原作 .layout-at-actions-items：column / center / center
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: 0.2rem;
    transition: transform 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  // 對齊原作 active icon scale 1.35
  &__item--active &__icon {
    transform: scale(1.35);
  }

  // 對齊原作 .layout-at-actions-items-icon-discount：position relative / bottom 1rem
  &__item--promo &__icon {
    position: relative;
    bottom: 1rem;
  }

  // 對齊原作 .layout-at-actions-items-icon-depositwithdrawal：scale 1.75 / bottom 0.5rem
  &__item--deposit &__icon {
    position: relative;
    bottom: 0.5rem;
    transform: scale(1.75);
  }

  // 對齊原作 .layout-at-actions-items-text：0.75rem #abacac
  &__label {
    font-size: 0.75rem;
    color: #abacac;
  }

  &__item--active &__label {
    color: #ffffff;
  }
}
</style>
