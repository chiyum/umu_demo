<script setup lang="ts">
/**
 * dahsing 三版型共用 section 標題列（左 title + 右「查看更多」）
 *
 * 為什麼抽：版型 A 主區 + 各版桌面 section 都用，避免每處重寫
 * 為什麼 prop 接 icon name：原稿 .title 內含 fa-fire 等不同 icon，抽 prop 才能彈性
 *
 * icon prop 為什麼改為 DahsingIcon 自家 name 集合：
 * - 原本接 Iconify 字串給 QIcon 但渲染為空（已造成版型跑版）
 * - 改用 DahsingIcon 元件統一渲染 inline SVG，name 受元件 enum 約束
 */
import DahsingIcon from "./dahsing-icon.vue";

type DahsingIconName =
  | "fire"
  | "star"
  | "soccer"
  | "premium"
  | "schedule"
  | "casino"
  | "headphones"
  | "chevron-right";

withDefaults(
  defineProps<{
    /** 標題文字（如「熱門推薦」） */
    title: string;
    /** 左側 icon 名稱（DahsingIcon name，預設熱門火焰） */
    icon?: DahsingIconName;
    /** 是否顯示「查看更多」連結（預設 true） */
    showMore?: boolean;
    /** 「查看更多」文字（預設「查看更多」） */
    moreText?: string;
  }>(),
  {
    icon: "fire",
    showMore: true,
    moreText: "查看更多"
  }
);
</script>

<template>
  <div class="dahsing-sec-head">
    <div class="dahsing-sec-head__title">
      <DahsingIcon :name="icon" size="16px" />
      {{ title }}
    </div>
    <div v-if="showMore" class="dahsing-sec-head__more">
      {{ moreText }}
      <DahsingIcon name="chevron-right" size="12px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  &__title {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 18px;
    font-weight: 900;
    color: var(--text-primary);

    // 切到 dahsing-icon class（取代原本 :deep(.q-icon)，QIcon 已被替換）
    :deep(.dahsing-icon) {
      color: var(--badge-live, #e0552b);
    }
  }

  &__more {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
