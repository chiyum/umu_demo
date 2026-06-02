<script setup lang="ts">
/**
 * noya 風格按鈕：暖金漸層，圓角，輕陰影
 *
 * 為什麼抽出來：noya 各 section 內會多處用到，集中維護避免複製貼上。
 */

interface Props {
  /** 主要 / 次要 — 主要為實心漸層，次要為描邊 */
  variant?: "primary" | "ghost";
  /** 按鈕原生 type */
  type?: "button" | "submit";
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  type: "button"
});
</script>

<template>
  <button :type="type" class="noya-btn" :class="`noya-btn--${variant}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
// kingdom_front big-btn DNA：pill 形 + 2px border + brightness hover + shadow stack
// 對齊 kingdom 整站「主 CTA pill 形 / 描邊 / 主漸層 / filter hover」模式
.noya-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-base),
    filter var(--transition-fast);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  &--primary {
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: none;
    box-shadow: var(--shadow-md);

    &:hover {
      // kingdom DNA：藍色系主 CTA 用 brightness 強 hover + shadow-lg 浮起
      filter: var(--filter-hover-strong);
      box-shadow: var(--shadow-lg);
    }

    &:active {
      filter: var(--filter-active-strong);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-primary);

    // kingdom big-btn DNA：描邊維持 1.5px（接近原 2px），輪廓清楚
    border: 1.5px solid var(--color-primary);

    &:hover {
      background: var(--bg-overlay);
      filter: var(--filter-hover-strong);
    }

    &:active {
      filter: var(--filter-active-strong);
    }
  }
}
</style>
