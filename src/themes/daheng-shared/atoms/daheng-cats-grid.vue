<script setup lang="ts">
/**
 * 大亨分類網格（v4 三欄密集專用）：4 欄 2 列 7 個分類 tile
 *
 * 為什麼 catgrid 比 cats-row 多一份 atom：
 * - 原稿 phones.js catsGrid() 是獨立函式：grid-template-columns:repeat(4,1fr) + gap 16px 8px
 * - 與 cats-row 的橫向滾動結構差異足夠大，硬塞同個 atom 加 prop 切版會更難讀
 * - 內部 cat tile / hot-badge / icon 渲染邏輯與 cats-row 一致，靠 SCSS 變數共享避免重複
 */
import { DAHENG_CATS } from "../_data";
import DahengCatIcon from "./daheng-cat-icon.vue";
</script>

<template>
  <div class="daheng-cats-grid">
    <div
      v-for="cat in DAHENG_CATS"
      :key="cat.key"
      class="daheng-cats-grid__cat"
      :class="{ 'daheng-cats-grid__cat--hot': cat.hot }"
    >
      <div class="daheng-cats-grid__tile">
        <span v-if="cat.hot" class="daheng-cats-grid__hot-badge">HOT!</span>
        <DahengCatIcon :kind="cat.iconKind" />
      </div>
      <span class="daheng-cats-grid__label">{{ cat.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-cats-grid {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  padding: 18px 14px 14px;
  box-shadow: var(--shadow);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 8px;

  &__cat {
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
