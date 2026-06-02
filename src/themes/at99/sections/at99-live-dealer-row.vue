<script setup lang="ts">
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";

/**
 * at99 真人視訊區：5 個圓形 hostess
 *
 * 設計：
 * - 圓形 silhouette（用共用 AvatarSilhouette square ratio）
 * - 圖下方標題與站台代號
 * - hostess 改用 silhouette 完全避免肖像權
 *
 * 文字：示範真人 A/B/C/D/E（不抄原站 DG / SA / WG 等品牌字）
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface Dealer {
  key: string;
  title: string;
  badge: string;
  seed: number;
}

const dealers: Dealer[] = [
  { key: "d1", title: "示範真人 A", badge: "DA", seed: 8 },
  { key: "d2", title: "示範真人 B", badge: "DB", seed: 16 },
  { key: "d3", title: "示範真人 C", badge: "DC", seed: 24 },
  { key: "d4", title: "示範真人 D", badge: "DD", seed: 32 },
  { key: "d5", title: "示範真人 E", badge: "DE", seed: 40 }
];
</script>

<template>
  <section class="at99-live" :class="{ 'at99-live--mobile': mobile }">
    <div class="at99-live__inner">
      <header class="at99-live__header">
        <h2 class="at99-live__heading">真人館別</h2>
        <span class="at99-live__sub">Live Dealer</span>
      </header>

      <div class="at99-live__row">
        <article
          v-for="d in dealers"
          :key="d.key"
          class="at99-live__item"
          tabindex="0"
        >
          <div class="at99-live__halo" aria-hidden="true" />
          <div class="at99-live__avatar">
            <AvatarSilhouette :seed="d.seed" variant="vivid" ratio="square" />
          </div>
          <div class="at99-live__title">{{ d.title }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-live {
  background: var(--bg-base);
  padding: 16px 0 28px;
  padding-left: 60px;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 14px;
  }

  &__heading {
    font-size: 22px;
    font-weight: 800;
    color: var(--color-primary);
    text-shadow: var(--neon-glow);
    margin: 0;
    letter-spacing: 2px;
  }

  &__sub {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      outline: none;

      .at99-live__halo {
        opacity: 1;
      }
    }
  }

  &__halo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--color-primary) 0%,
      transparent 60%
    );
    opacity: 0.5;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &__avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--color-primary);
    box-shadow: var(--neon-glow);
    position: relative;
    z-index: 1;

    :deep(.avatar-silhouette) {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: 1.5px;
    z-index: 1;
  }

  &--mobile {
    padding-left: 0;

    .at99-live__inner {
      padding: 0 12px;
    }

    .at99-live__row {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;

      // 第 4、5 個從第二排開始（grid 自動處理）
    }

    .at99-live__avatar {
      width: 84px;
      height: 84px;
    }

    .at99-live__halo {
      width: 92px;
      height: 92px;
    }

    .at99-live__title {
      font-size: 11px;
    }
  }
}
</style>
