<script setup lang="ts">
/**
 * 大亨底部 5 tab：首頁 / 優惠 / 存提款 / 客服 / 我的
 *
 * 為什麼第一顆預設 active：原稿 phones.js nav() 第一個 div class="tab active"，
 * demo 不接路由切換，照搬
 *
 * 為什麼 spacer 元素在 tabbar 之前：原稿用 .spacer{flex:1} 把 tabbar 推到底，
 * 但因每個 theme mobile 容器都用 flex column + padding-bottom 預留空間，這裡 spacer 省略
 */
import { DAHENG_TAB_ITEMS } from "../_data";
import DahengTabIcon from "./daheng-tab-icon.vue";
</script>

<template>
  <nav class="daheng-tabbar">
    <div
      v-for="(item, i) in DAHENG_TAB_ITEMS"
      :key="item.key"
      class="daheng-tabbar__tab"
      :class="{ 'daheng-tabbar__tab--active': i === 0 }"
    >
      <DahengTabIcon :kind="item.iconKind" />
      <span class="daheng-tabbar__label">{{ item.label }}</span>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.daheng-tabbar {
  margin-top: 20px;
  background: #ffffff;
  border-top: 1px solid #f0e2d0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 12px 6px 20px;
  box-shadow: 0 -8px 24px -14px rgba(120, 72, 28, 0.4);

  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    color: #c2a98f;
    flex: 1;

    svg {
      display: block;
    }

    &--active {
      color: var(--color-primary);
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 700;
  }
}
</style>
