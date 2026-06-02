<script setup lang="ts">
/**
 * noya 統計數據區：60 / 90 / 98 / 24 四欄
 *
 * 修正項目（依 GAP_ANALYSIS）：
 * - 字級加大、字距加寬，與原站質感更接近
 * - 每個 counter 下方加一條短橫分隔線
 * - 4 欄之間維持垂直分隔線（手機改 2x2 時取消）
 *
 * 文字：合作場館 / 真人荷官 / 滿意度 / 小時服務（皆通用佔位用語）
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
        <!-- 短橫線：原站每個 counter 下方都有 -->
        <div class="noya-stats__rule" aria-hidden="true" />
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
    max-width: 1280px;
    margin: 0 auto;
    padding: 56px 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  &__item {
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    &--divider::after {
      content: "";
      position: absolute;
      right: -12px;
      top: 15%;
      height: 70%;
      width: 1px;
      background: var(--border);
    }
  }

  &__value {
    font-family: var(--font-display);
    font-size: clamp(48px, 5vw, 72px);
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1;
    letter-spacing: 2px;
    text-shadow: 0 2px 6px var(--bg-overlay);
  }

  &__rule {
    width: 36px;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
    opacity: 0.75;
  }

  &__label {
    color: var(--text-muted);
    font-size: 14px;
    letter-spacing: 4px;
    font-weight: 500;
  }

  &--mobile {
    .noya-stats__inner {
      grid-template-columns: repeat(2, 1fr);
      padding: 32px 16px;
      gap: 28px 18px;
    }

    .noya-stats__value {
      font-size: 40px;
    }

    .noya-stats__label {
      font-size: 11px;
      letter-spacing: 2px;
    }

    // 2x2 時取消所有垂直分隔線
    .noya-stats__item--divider::after {
      display: none;
    }
  }
}
</style>
