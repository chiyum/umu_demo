<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import homeSelected from "@/themes/ant-sport/assets/nav/home-selected.webp";
import homeNormal from "@/themes/ant-sport/assets/nav/home-normal.webp";
import discountSelected from "@/themes/ant-sport/assets/nav/discount-selected.webp";
import discountNormal from "@/themes/ant-sport/assets/nav/discount-normal.webp";
import chatSelected from "@/themes/ant-sport/assets/nav/chat-selected.png";
import chatNormal from "@/themes/ant-sport/assets/nav/chat-normal.png";
import mineSelected from "@/themes/ant-sport/assets/nav/mine-selected.webp";
import mineNormal from "@/themes/ant-sport/assets/nav/mine-normal.webp";
import hotlineSelected from "@/themes/ant-sport/assets/nav/hotline-selected.webp";
import hotlineNormal from "@/themes/ant-sport/assets/nav/hotline-normal.webp";

/**
 * ant-sport 專屬 mobile 底部 tab bar
 *
 * 為什麼不複用 common/landing/mobile-bottom-tab-bar.vue：
 * 共用元件用 Iconify Material Symbols 字型（向量），
 * 蚂蚁体育原 5 個 tab icon 是品牌專屬 webp/png（在 lilian_ant_web layout.scss 寫死圖檔），
 * 為了「DOM 完全照搬」需求保留原 brand icon，獨立寫一份
 *
 * 5 個 tab 對齊 lilian_ant_web layout.scss 的 `.bottom-nav__item`：
 * 首頁 / 優惠 / 客服 / 我的 / 聊天（已將「聊天」改成「熱線」以符合 hotline 圖檔語意）
 */

interface TabItem {
  key: string;
  /** 預設狀態圖檔 */
  iconNormal: string;
  /** 選中狀態圖檔 */
  iconActive: string;
  label: string;
}

const tabs: TabItem[] = [
  {
    key: "home",
    iconNormal: homeNormal,
    iconActive: homeSelected,
    label: "首頁"
  },
  {
    key: "discount",
    iconNormal: discountNormal,
    iconActive: discountSelected,
    label: "優惠"
  },
  {
    key: "chat",
    iconNormal: chatNormal,
    iconActive: chatSelected,
    label: "客服"
  },
  {
    key: "mine",
    iconNormal: mineNormal,
    iconActive: mineSelected,
    label: "我的"
  },
  {
    key: "hotline",
    iconNormal: hotlineNormal,
    iconActive: hotlineSelected,
    label: "熱線"
  }
];

/** 當前 active tab，預設首頁 */
const activeKey = ref<string>("home");

const $q = useQuasar();

function handleTap(item: TabItem) {
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
  <nav
    class="ant-sport-m-nav"
    role="navigation"
    aria-label="蚂蚁体育 底部主導覽"
  >
    <button
      v-for="t in tabs"
      :key="t.key"
      type="button"
      class="ant-sport-m-nav__item"
      :class="{ 'ant-sport-m-nav__item--active': activeKey === t.key }"
      @click="handleTap(t)"
    >
      <span class="ant-sport-m-nav__icon-wrap">
        <!-- 同時放兩張 img，用 CSS 切換顯示，避免每次點擊重抓 -->
        <img
          :src="t.iconActive"
          :alt="`${t.label} 選中圖示`"
          class="ant-sport-m-nav__icon ant-sport-m-nav__icon--active"
        />
        <img
          :src="t.iconNormal"
          :alt="`${t.label} 預設圖示`"
          class="ant-sport-m-nav__icon ant-sport-m-nav__icon--normal"
        />
      </span>
      <span class="ant-sport-m-nav__label">{{ t.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.ant-sport-m-nav {
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
    padding: 4px;
    cursor: pointer;
    transition: color 0.15s ease;

    &:active {
      transform: scale(0.96);
    }
  }

  &__icon-wrap {
    position: relative;
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    inset: 0;
    transition: opacity 0.18s ease;
  }

  &__icon--active {
    opacity: 0;
  }

  &__icon--normal {
    opacity: 1;
  }

  // active 狀態：切換 icon 顯示 + label 變主色
  &__item--active {
    color: var(--color-primary);

    .ant-sport-m-nav__icon--active {
      opacity: 1;
    }

    .ant-sport-m-nav__icon--normal {
      opacity: 0;
    }
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }
}
</style>
