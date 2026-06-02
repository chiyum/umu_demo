<script setup lang="ts">
/**
 * noya 真人視訊區標題列
 *
 * 設計：
 * - 左側金色立體字「真人視訊」+ 英文副標
 * - 右側「全部真人」白底圓角按鈕（連結到完整列表頁，demo 只跳 Notify）
 * - 標題色用 gradient + text-fill 做金屬光澤感
 *
 * 文字：用「真人視訊．沉浸體驗」取代原站「真人課程．優雅體驗」，避免抄文案
 */

import { useQuasar } from "quasar";

interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const $q = useQuasar();

function onAllClick() {
  $q.notify({
    message: "Demo 環境：完整真人列表僅展示版面",
    color: "primary",
    position: "top",
    timeout: 1500
  });
}
</script>

<template>
  <section
    class="noya-rp-title"
    :class="{ 'noya-rp-title--mobile': mobile }"
    aria-label="真人視訊區"
  >
    <div class="noya-rp-title__inner">
      <div class="noya-rp-title__heading">
        <!--
          DNA #8：金標題前置金色 block-label 粗條（gold 變體）
          走 kingdom-block-label--gold 讓粗條用 var(--gradient-gold) 而非 cta 漸層，
          與下方金字 text-fill 同色系，視覺統一
        -->
        <h2
          class="noya-rp-title__main kingdom-block-label kingdom-block-label--gold"
        >
          真人視訊
        </h2>
        <p class="noya-rp-title__sub">Real People · Live Show</p>
      </div>

      <button
        type="button"
        class="noya-rp-title__more"
        @click="onAllClick"
        aria-label="查看全部真人"
      >
        全部真人
        <span class="noya-rp-title__arrow" aria-hidden="true">›</span>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-rp-title {
  background: var(--bg-base);
  padding: 36px 0 18px;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 18px;
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__main {
    font-family: var(--font-display);
    font-size: 44px;
    font-weight: 900;
    margin: 0;
    padding-left: 10px;
    letter-spacing: 6px;
    line-height: 1;

    // 金屬光澤：用 gradient + text-fill 做書法手寫感金字立體感（對齊原站）
    background: linear-gradient(
      180deg,
      var(--color-accent) 0%,
      var(--color-primary) 45%,
      var(--color-secondary) 100%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;

    // 多層 drop-shadow 強化立體感：深咖啡 base + 金色光暈
    filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.12))
      drop-shadow(0 4px 12px var(--bg-overlay));
  }

  &__sub {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 4px;
    margin: 0;
    text-transform: uppercase;
  }

  &__more {
    // kingdom DNA：pill 形描邊按鈕（與 noya-button ghost 一致）+ var token
    background: var(--bg-surface);
    color: var(--color-primary);
    border: 1.5px solid var(--color-primary);
    border-radius: var(--radius-pill);
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
    white-space: nowrap;

    &:hover {
      background: var(--bg-overlay);
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
      filter: var(--filter-hover-strong);
    }
  }

  &__arrow {
    font-size: 18px;
    line-height: 1;
  }

  &--mobile {
    padding: 24px 0 12px;

    .noya-rp-title__inner {
      padding: 0 16px;
    }

    .noya-rp-title__main {
      font-size: 26px;
      letter-spacing: 2px;
    }

    .noya-rp-title__sub {
      font-size: 10px;
      letter-spacing: 2px;
    }

    .noya-rp-title__more {
      padding: 6px 12px;
      font-size: 11px;
    }
  }
}
</style>
