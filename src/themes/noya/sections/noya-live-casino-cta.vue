<script setup lang="ts">
import NoyaButton from "../atoms/noya-button.vue";

/**
 * noya 真人 casino CTA：橫幅式區塊，引導至真人遊戲頁
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });
</script>

<template>
  <section id="cta" class="noya-cta" :class="{ 'noya-cta--mobile': mobile }">
    <div class="noya-cta__inner">
      <div class="noya-cta__text">
        <h2 class="noya-cta__title">真人課程 LIVE</h2>
        <p class="noya-cta__sub">沉浸式真人對戰，享受實體賭場氛圍。</p>
      </div>
      <NoyaButton variant="primary">進入真人區</NoyaButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-cta {
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0 0 4px;
    letter-spacing: 2px;
  }

  &__sub {
    color: var(--text-muted);
    font-size: 14px;
    margin: 0;
  }

  &--mobile {
    .noya-cta__inner {
      flex-direction: column;
      padding: 32px 16px;
      text-align: center;
    }
  }
}
</style>
