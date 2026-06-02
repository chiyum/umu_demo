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
// kingdom DNA：賭場版同樣走 pill 形主 CTA，但保留 at99 霓虹光暈與大寫字體
// 與 noya CTA 結構一致（pill / var token / brightness hover），色相由 token 切換
.at99-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: 10px 24px;

  // kingdom DNA：CTA 走 pill 形（與 noya 統一），霓虹光暈仍由 shadow / glow 提供
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  letter-spacing: 1px;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-base),
    filter var(--transition-fast);
  text-transform: uppercase;

  &:hover {
    transform: translateY(-1px);
  }

  &--primary {
    // kingdom DNA：藍/紫/綠霓虹用強 brightness hover
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: 1px solid var(--color-primary);
    box-shadow: var(--neon-glow);

    &:hover {
      filter: var(--filter-hover-strong);
      box-shadow: var(--shadow-glow);
    }

    &:active {
      filter: var(--filter-active-strong);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    text-shadow: 0 0 6px var(--color-primary);

    &:hover {
      background: var(--bg-overlay);
      box-shadow: var(--shadow-glow);
      filter: var(--filter-hover-strong);
    }
  }

  &--gold {
    // kingdom DNA：金色 CTA 走 gradient-gold token + soft brightness（金色不過曝）
    background: var(
      --gradient-gold,
      linear-gradient(135deg, var(--color-accent), #f59e0b)
    );
    color: var(--text-on-gold, #1f1100);
    border: none;
    box-shadow: 0 0 8px var(--color-accent);

    &:hover {
      filter: var(--filter-hover-soft);
      box-shadow: 0 0 16px var(--color-accent);
    }

    &:active {
      filter: var(--filter-active-soft);
    }
  }
}
</style>
