<script setup lang="ts">
/**
 * noya 統計數據區：60 / 90 / 98 / 24 四欄
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const stats = [
  { value: "60", label: "合作場館" },
  { value: "90", label: "真人荷官" },
  { value: "98", label: "滿意度 %" },
  { value: "24", label: "小時服務" }
];
</script>

<template>
  <section class="noya-stats" :class="{ 'noya-stats--mobile': mobile }">
    <div class="noya-stats__inner">
      <div
        v-for="(item, idx) in stats"
        :key="item.label"
        class="noya-stats__item"
        :class="{ 'noya-stats__item--divider': idx < stats.length - 1 }"
      >
        <div class="noya-stats__value">{{ item.value }}</div>
        <div class="noya-stats__label">{{ item.label }}</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-stats {
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 56px 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  &__item {
    text-align: center;
    position: relative;

    &--divider::after {
      content: "";
      position: absolute;
      right: -12px;
      top: 20%;
      height: 60%;
      width: 1px;
      background: var(--border);
    }
  }

  &__value {
    font-family: var(--font-display);
    font-size: clamp(40px, 4vw, 56px);
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
  }

  &__label {
    color: var(--text-muted);
    font-size: 14px;
    margin-top: 8px;
  }

  &--mobile {
    .noya-stats__inner {
      grid-template-columns: repeat(2, 1fr);
      padding: 36px 16px;
      row-gap: 32px;
    }

    // 手機版 2x2，奇數行的右側分隔線取消
    .noya-stats__item--divider::after {
      display: none;
    }
  }
}
</style>
