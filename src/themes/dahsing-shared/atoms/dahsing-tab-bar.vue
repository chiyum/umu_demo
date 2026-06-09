<script setup lang="ts">
/**
 * dahsing 三版型共用底部 5-tab bar（mobile fixed bottom）
 *
 * 為什麼用 fixed + max-width 430：與原稿一致，phone 框最大寬度 430px，
 * tab bar 隨之置中對齊（更寬視窗時不會占整列）
 *
 * 為什麼預設「首頁」active：原稿 3 份 HTML 都是 .tab.active 在首頁，這是 demo 首頁狀態
 */
import { ref } from "vue";
import DahsingIcon from "./dahsing-icon.vue";
import { DAHSING_TAB_ITEMS } from "../_assets";

const activeKey = ref<string>("home");
</script>

<template>
  <div class="dahsing-tab-bar">
    <button
      v-for="tab in DAHSING_TAB_ITEMS"
      :key="tab.key"
      type="button"
      class="dahsing-tab-bar__tab"
      :class="{ 'dahsing-tab-bar__tab--active': activeKey === tab.key }"
      @click="activeKey = tab.key"
    >
      <DahsingIcon :name="tab.icon" size="21px" />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-tab-bar {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 88px;
  padding-top: 12px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  box-shadow: 0 -6px 18px var(--shadow);
  z-index: 20;

  &__tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 700;
    font-family: inherit;

    &--active {
      color: var(--color-primary);

      // 切到 dahsing-icon class（取代原本 :deep(.q-icon)，QIcon 已被替換）
      :deep(.dahsing-icon) {
        filter: drop-shadow(0 3px 5px var(--shadow));
      }
    }
  }
}
</style>
