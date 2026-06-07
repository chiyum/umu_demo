<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import iconDiscount from "../assets/tab-bar/discount.png?url";
import iconAccount from "../assets/tab-bar/account.png?url";
import iconHome from "../assets/tab-bar/home.png?url";
import iconService from "../assets/tab-bar/service.png?url";
import iconMine from "../assets/tab-bar/mine.png?url";

/**
 * honest-no6 mobile 底部 tab bar — 1:1 對齊 honest_real layouts/layout-no6-home.vue 第 5-72 行
 *
 * 原作 DOM：
 *   <div class="fixed bottom-2 left-0 w-full z-10">
 *     <div class="h-[65px] flex items-center w-[98%] left-[1%] grid grid-cols-5 z-10
 *                 rounded-t-[20px] rounded-b-[10px] footer_mo footer bottom-5">
 *       <div v-for cat>
 *         <div class="flex flex-col items-center justify-start">
 *           <div class="active" v-if="cat == home">   ← 只有「首頁」有 .active 包裝
 *             <img :src="cat.icon" />
 *             <div class="text-white text-3lg mt-[2px] text-center">{{ cat.title }}</div>
 *           </div>
 *           <img v-else />
 *           <div v-else class="text-white text-3lg" />
 *         </div>
 *       </div>
 *
 * 對齊原作五個 tab 順序與 icon：
 *   優惠 (discount.png)
 *   帳號 (account.png)
 *   首頁 (home.png) ← active 樣式（白邊 + 凸）但**不是凸出粉球**
 *   客服 (service.png)
 *   我的 (mine.png)
 *
 * 上次錯誤：把「首頁」做成凸出的粉色 CTA 球。原作只是在文字 / icon 上加 active 樣式，
 * 整個 tab-bar 是平的，沒有凸出設計
 *
 * icon 染色禁忌：原作 footer png 是彩色（橘 / 綠 / 粉 / 藍 / 紫）的多色 icon，不染色
 */

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

const tabs: TabItem[] = [
  { key: "promo", label: "優惠", icon: iconDiscount },
  { key: "account", label: "帳號", icon: iconAccount },
  { key: "home", label: "首頁", icon: iconHome },
  { key: "cs", label: "客服", icon: iconService },
  { key: "me", label: "我的", icon: iconMine }
];

// 對齊原作預設 home 為 active
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
  <div class="honest-no6-m-tab">
    <div
      v-for="t in tabs"
      :key="t.key"
      class="honest-no6-m-tab__item"
      :class="{ 'honest-no6-m-tab__item--active': activeKey === t.key }"
      @click="handleTap(t)"
    >
      <div class="honest-no6-m-tab__icon-wrap">
        <img
          :src="t.icon"
          :alt="`${t.label} 圖示`"
          class="honest-no6-m-tab__icon"
        />
      </div>
      <div class="honest-no6-m-tab__label">{{ t.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 footer_mo：fixed bottom 8px / w-[98%] left-[1%] / grid-cols-5 /
// 圓角 rounded-t-20 rounded-b-10 / h-65
.honest-no6-m-tab {
  position: fixed;
  bottom: 8px;
  left: 1%;
  right: 1%;
  width: 98%;
  height: 65px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  z-index: 90;
  border-radius: 20px 20px 10px 10px;
  background: linear-gradient(
    180deg,
    rgba(58, 14, 88, 0.94) 0%,
    rgba(10, 3, 18, 0.98) 100%
  );
  border: 1px solid rgba(212, 78, 224, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.55);
  padding-bottom: max(0px, env(safe-area-inset-bottom));

  // 對齊原作 div.flex flex-col items-center justify-start
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 0;
    color: #ffffff;
    cursor: pointer;
    user-select: none;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.94);
    }
  }

  &__icon-wrap {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.92;
  }

  // 對齊原作 active：只是高亮（更亮 + 微微 glow），不是凸出球
  &__item--active &__icon {
    opacity: 1;
    filter: drop-shadow(0 0 4px #d44ee0);
  }

  // 對齊原作 .text-white .text-3lg .mt-[2px] .text-center
  &__label {
    margin-top: 2px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    line-height: 1.2;
  }
}
</style>
