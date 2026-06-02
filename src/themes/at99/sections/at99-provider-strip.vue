<script setup lang="ts">
/**
 * at99 廠商標誌跑馬列：多個遊戲廠商 logo 平鋪
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const providers = ["PT", "MG", "EVO", "NE", "BBIN", "JDB", "RTG", "ASK"];
</script>

<template>
  <section
    class="at99-strip"
    :class="{ 'at99-strip--mobile': mobile }"
    aria-label="合作廠商"
  >
    <div class="at99-strip__inner">
      <span class="at99-strip__label">Partner</span>
      <div class="at99-strip__list">
        <div v-for="p in providers" :key="p" class="at99-strip__item">
          {{ p }}
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-strip {
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 18px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__label {
    color: var(--color-accent);
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 14px;
  }

  &__list {
    flex: 1;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  &__item {
    padding: 6px 14px;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1px;
    background: rgba(255, 255, 255, 0.02);
  }

  &--mobile {
    .at99-strip__inner {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 14px;
      gap: 10px;
    }
  }
}
</style>
