<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import iconDiscount from "../assets/tab-bar/discount.png?url";
import iconAccount from "../assets/tab-bar/account.png?url";
import iconHome from "../assets/tab-bar/home.png?url";
import iconService from "../assets/tab-bar/service.png?url";
import iconMine from "../assets/tab-bar/mine.png?url";

/**
 * honest-no6 mobile 底部 5 tab bar — 對齊 honest_real layouts/layout-no6-home.vue 第 5-72 行
 *
 * 原作結構：底部 5 tab（優惠 / 帳號 / 首頁 / 客服 / 我的）
 *   - 中間「首頁」是 active 預設，套了一個 .active 圓凸粉色背景
 *   - 整個 nav 用 rounded-t-20 rounded-b-10 的「上圓下半圓」框
 *   - 文字白色
 *
 * icon 染色禁忌：原作 5 個 footer png 就是不同色的彩色 icon，不套 filter
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
  <nav class="honest-no6-m-tab" role="navigation" aria-label="底部主導覽">
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="honest-no6-m-tab__item"
      :class="{
        'honest-no6-m-tab__item--active': activeKey === t.key,
        'honest-no6-m-tab__item--center': t.key === 'home'
      }"
      :aria-pressed="activeKey === t.key"
      @click="handleTap(t)"
    >
      <span class="honest-no6-m-tab__icon" aria-hidden="true">
        <img :src="t.icon" :alt="`${t.label} 圖示`" />
      </span>
      <span class="honest-no6-m-tab__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
// 底色：深紫黑漸層 + 上圓角下半圓 + 兩側內距
// 對齊原作 .footer_mo `w-[98%] left-[1%] rounded-t-[20px] rounded-b-[10px]`
.honest-no6-m-tab {
  position: fixed;
  bottom: 8px;
  left: 1%;
  right: 1%;
  z-index: 90;
  display: flex;
  align-items: flex-end;
  padding: 8px 4px max(8px, env(safe-area-inset-bottom));
  background: linear-gradient(
    180deg,
    rgba(58, 14, 88, 0.94) 0%,
    rgba(10, 3, 18, 0.98) 100%
  );
  border: 1px solid var(--honest-no6-marquee-border);
  border-radius: 20px 20px 10px 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.5);

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--text-on-primary);
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition:
      color 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    // 中間「首頁」放粉色圓凸：對齊原作 .active 那塊
    // 為什麼把放大樣式拆出到 &__icon 之後：
    // 避免 stylelint no-descending-specificity
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
      opacity: 0.92;
    }
  }

  // 中間 CTA 球：放大 icon 容器 + 粉色圓凸
  // 寫在 &__icon 之後，specificity 升序符合 stylelint
  &__item--center &__icon {
    width: 50px;
    height: 50px;
    margin-top: -22px;
    background: var(--gradient-cta);
    border-radius: 50%;
    border: 3px solid var(--bg-base);
    box-shadow: var(--shadow-glow);
    padding: 8px;
  }

  // active：金光高亮（除非是中間 center 已有自己樣式）
  &__item--active:not(.honest-no6-m-tab__item--center) &__icon img {
    opacity: 1;
    filter: drop-shadow(0 0 4px var(--primary-01));
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
  }
}
</style>
