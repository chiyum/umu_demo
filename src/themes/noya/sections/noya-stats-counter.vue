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

    // 對齊原站：60px 大金字立體感（不是橙色！）
    // 用 gradient-gold + text-fill-color 做金屬光澤
    font-size: clamp(48px, 5vw, 64px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: 3px;
    background: var(--gradient-gold);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    // 雙層 drop-shadow 強化立體感
    filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.1))
      drop-shadow(0 4px 12px var(--bg-overlay));
  }

  // 金色細分隔線：每個 counter 下方
  &__rule {
    width: 40px;
    height: 2px;
    background: var(--gradient-gold);
    border-radius: 1px;
    box-shadow: 0 1px 4px var(--bg-overlay);
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
