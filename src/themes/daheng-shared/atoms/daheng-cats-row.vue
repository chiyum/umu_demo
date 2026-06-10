<script setup lang="ts">
/**
 * 大亨分類列：橫向滾動 7 個分類 tile
 *
 * 為什麼把 hot 標籤抽到「HOT!」徽章樣式：
 * - 原稿用 transform:rotate(-8deg) + 不對稱圓角（左上 8 / 右上 8 / 右下 8 / 左下 2px）+ 義大利斜體
 *   組合「貼紙撕角」視覺，照搬避免 drift
 *
 * scrollbar-width:none + ::-webkit-scrollbar:display:none 隱藏滾動條
 */
import { DAHENG_CATS } from "../_data";
import DahengCatIcon from "./daheng-cat-icon.vue";
</script>

<template>
  <div class="daheng-cats-row">
    <div class="daheng-cats-row__scroll">
      <div
        v-for="cat in DAHENG_CATS"
        :key="cat.key"
        class="daheng-cats-row__cat"
        :class="{ 'daheng-cats-row__cat--hot': cat.hot }"
      >
        <div class="daheng-cats-row__tile">
          <span v-if="cat.hot" class="daheng-cats-row__hot-badge">HOT!</span>
          <DahengCatIcon :kind="cat.iconKind" />
        </div>
        <span class="daheng-cats-row__label">{{ cat.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-cats-row {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  padding: 14px 4px;
  box-shadow: var(--shadow);

  &__scroll {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    padding: 18px 12px 6px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__cat {
    flex: none;
    width: 62px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  &__tile {
    width: 54px;
    height: 54px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ffffff, #fbeede);
    box-shadow: 0 4px 10px -6px rgba(150, 90, 40, 0.5);
    position: relative;
    color: var(--color-primary);
  }

  &__cat--hot &__tile {
    background: linear-gradient(180deg, #ffffff, #ffe7d2);
  }

  // HOT 徽章：撕角樣式（左上 / 右上 / 右下 8px、左下 2px、傾斜 -8deg）
  &__hot-badge {
    position: absolute;
    top: -9px;
    left: -4px;
    font-style: italic;
    font-weight: 900;
    font-size: 13px;
    color: #ffffff;
    background: #e8642a;
    padding: 1px 7px;
    border-radius: 8px 8px 8px 2px;
    transform: rotate(-8deg);
    box-shadow: 0 3px 6px -2px rgba(200, 80, 20, 0.6);
    letter-spacing: 0.5px;
  }

  &__label {
    font-size: 13px;
    font-weight: 700;
    color: #5b4a3c;
    white-space: nowrap;
  }
}
</style>
