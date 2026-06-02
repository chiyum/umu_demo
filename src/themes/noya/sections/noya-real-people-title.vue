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
        <h2 class="noya-rp-title__main">真人視訊</h2>
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
    font-size: 38px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 4px;
    line-height: 1;

    // 金屬光澤：用 gradient + text-fill
    background: linear-gradient(
      180deg,
      var(--color-accent) 0%,
      var(--color-primary) 50%,
      var(--color-secondary) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    // 額外加層投影，立體感
    filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.08));
  }

  &__sub {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 4px;
    margin: 0;
    text-transform: uppercase;
  }

  &__more {
    background: var(--bg-surface);
    color: var(--color-primary);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: var(--shadow);
    transition: all 0.18s ease;
    white-space: nowrap;

    &:hover {
      background: var(--bg-overlay);
      transform: translateY(-1px);
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
