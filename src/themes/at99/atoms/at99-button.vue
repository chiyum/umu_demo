<script setup lang="ts">
/**
 * at99 風格按鈕：霓虹光暈，方角，賭場感
 */
interface Props {
  variant?: "primary" | "ghost" | "gold";
  type?: "button" | "submit";
}
withDefaults(defineProps<Props>(), { variant: "primary", type: "button" });
</script>

<template>
  <button :type="type" class="at99-btn" :class="`at99-btn--${variant}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.at99-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.18s ease;
  text-transform: uppercase;

  &:hover {
    transform: translateY(-1px);
  }

  &--primary {
    background: var(--gradient-cta);
    color: #ffffff;
    border: 1px solid var(--color-primary);
    box-shadow: var(--neon-glow);

    &:hover {
      box-shadow:
        0 0 12px var(--color-primary),
        0 0 32px rgba(45, 212, 255, 0.5);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    text-shadow: 0 0 6px var(--color-primary);

    &:hover {
      background: var(--bg-overlay);
      box-shadow: var(--neon-glow);
    }
  }

  &--gold {
    background: linear-gradient(135deg, var(--color-accent), #f59e0b);
    color: #1f1100;
    border: none;
    box-shadow: 0 0 8px var(--color-accent);

    &:hover {
      box-shadow: 0 0 16px var(--color-accent);
    }
  }
}
</style>
