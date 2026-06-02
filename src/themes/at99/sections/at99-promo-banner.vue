<script setup lang="ts">
import At99Button from "../atoms/at99-button.vue";

/** at99 主視覺：電子因雲機 + 2025 世足賽兩張 banner */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });
</script>

<template>
  <section class="at99-promo" :class="{ 'at99-promo--mobile': mobile }">
    <div class="at99-promo__inner">
      <article class="at99-promo__card at99-promo__card--big">
        <div class="at99-promo__card-text">
          <span class="at99-promo__tag">電子因雲機</span>
          <h2 class="at99-promo__title">穩贏都有獎</h2>
          <p class="at99-promo__desc">登入即可參加每日抽獎，獎金高達 100 萬</p>
          <At99Button variant="gold">立即參加</At99Button>
        </div>
        <div class="at99-promo__card-visual">
          <!-- 老虎機機台 SVG placeholder -->
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="40"
              y="30"
              width="120"
              height="150"
              rx="10"
              fill="var(--color-secondary)"
            />
            <rect x="50" y="50" width="100" height="80" fill="var(--bg-base)" />
            <text
              x="100"
              y="100"
              text-anchor="middle"
              fill="var(--color-accent)"
              font-size="32"
              font-weight="900"
            >
              777
            </text>
            <rect
              x="60"
              y="150"
              width="80"
              height="20"
              rx="3"
              fill="var(--color-accent)"
            />
            <circle cx="170" cy="100" r="8" fill="var(--color-primary)" />
          </svg>
        </div>
      </article>

      <article class="at99-promo__card at99-promo__card--small">
        <div class="at99-promo__card-text">
          <span class="at99-promo__tag at99-promo__tag--gold">2025 世足賽</span>
          <h2 class="at99-promo__title-sm">熱門賽事盤口</h2>
          <p class="at99-promo__desc-sm">即時賠率，多元玩法</p>
        </div>
        <!-- 球隊隊徽 placeholder -->
        <div class="at99-promo__balls">
          <span />
          <span />
          <span />
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-promo {
  background: var(--bg-base);
  padding: 32px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }

  &__card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__card-text {
    flex: 1;
  }

  &__card-visual {
    flex: 0 0 160px;

    svg {
      width: 100%;
      height: auto;
    }
  }

  &__tag {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    background: var(--bg-overlay);
    color: var(--color-primary);
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 700;
    margin-bottom: 12px;
    text-shadow: 0 0 4px var(--color-primary);

    &--gold {
      color: var(--color-accent);
      background: rgba(255, 216, 77, 0.1);
      text-shadow: 0 0 4px var(--color-accent);
    }
  }

  &__title {
    font-size: 32px;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 8px;
    text-shadow: var(--neon-glow);
  }

  &__title-sm {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 6px;
  }

  &__desc,
  &__desc-sm {
    color: var(--text-muted);
    margin: 0 0 16px;
    font-size: 13px;
  }

  &__balls {
    display: flex;
    gap: 4px;
    align-items: center;

    span {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-accent), #f59e0b);
      box-shadow: 0 0 8px var(--color-accent);
    }
  }

  &--mobile {
    .at99-promo__inner {
      grid-template-columns: 1fr;
      padding: 0 14px;
    }

    .at99-promo__card {
      flex-direction: column;
      text-align: center;
      padding: 20px;
    }

    .at99-promo__card-visual {
      flex-basis: auto;

      svg {
        max-width: 140px;
      }
    }

    .at99-promo__balls {
      justify-content: center;
    }
  }
}
</style>
