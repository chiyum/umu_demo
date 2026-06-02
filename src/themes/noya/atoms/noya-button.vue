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
.noya-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  &--primary {
    background: var(--gradient-cta);
    color: #ffffff;
    border: none;
    box-shadow: var(--shadow);

    &:hover {
      box-shadow: 0 6px 18px var(--color-primary);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-primary);
    border: 1.5px solid var(--color-primary);

    &:hover {
      background: var(--bg-overlay);
    }
  }
}
</style>
