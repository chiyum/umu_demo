<script setup lang="ts">
/**
 * 大亨 chips（v6 雜誌精選專用）：6 個分類膠囊
 *
 * 為什麼 chip 第一顆預設 on：原稿 phones.js chips() 內 `i===0?'on':''`，
 * demo 不接互動，第一顆寫死高亮即可
 */
import { DAHENG_CHIPS } from "../_data";
</script>

<template>
  <div class="daheng-chips">
    <div
      v-for="(label, i) in DAHENG_CHIPS"
      :key="label"
      class="daheng-chips__chip"
      :class="{ 'daheng-chips__chip--on': i === 0 }"
    >
      {{ label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-chips {
  margin-top: 16px;
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding: 2px 16px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__chip {
    flex: none;
    font-size: 14px;
    font-weight: 700;
    color: #6a5142;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid var(--border);
    padding: 9px 16px;
    border-radius: 20px;
    white-space: nowrap;

    &--on {
      color: #ffffff;
      background: linear-gradient(180deg, #cf8a4f, #a85d2b);
      border-color: transparent;
    }
  }
}
</style>
