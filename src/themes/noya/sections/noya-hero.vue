<script setup lang="ts">
import NoyaButton from "../atoms/noya-button.vue";

/**
 * noya hero：真人荷官形象區 + 主標語 + CTA
 * 用 SVG placeholder 代替真人圖（避免 hotlink 外站）
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });
</script>

<template>
  <section class="noya-hero" id="hero" :class="{ 'noya-hero--mobile': mobile }">
    <div class="noya-hero__bg" />
    <div class="noya-hero__inner">
      <div class="noya-hero__text">
        <span class="noya-hero__eyebrow">LIVE CASINO</span>
        <h1 class="noya-hero__title">
          真人課程<br />
          <span class="noya-hero__title-accent">優雅體驗</span>
        </h1>
        <p class="noya-hero__desc">
          24 小時不打烊的真人荷官，多元語言隨選，沉浸式遊戲體驗。
        </p>
        <div class="noya-hero__cta">
          <NoyaButton variant="primary">立即體驗</NoyaButton>
          <NoyaButton variant="ghost">了解更多</NoyaButton>
        </div>
      </div>
      <div class="noya-hero__visual" aria-hidden="true">
        <!-- 真人荷官 SVG placeholder：簡化的剪影輪廓 -->
        <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="noyaHeroGrad" cx="50%" cy="40%" r="60%">
              <stop
                offset="0%"
                stop-color="var(--color-accent)"
                stop-opacity="0.6"
              />
              <stop
                offset="100%"
                stop-color="var(--color-primary)"
                stop-opacity="0.05"
              />
            </radialGradient>
          </defs>
          <circle cx="160" cy="200" r="160" fill="url(#noyaHeroGrad)" />
          <!-- 頭部 -->
          <ellipse
            cx="160"
            cy="140"
            rx="40"
            ry="50"
            fill="var(--color-primary)"
            opacity="0.75"
          />
          <!-- 身體 -->
          <path
            d="M100 360 Q100 240, 160 220 Q220 240, 220 360 Z"
            fill="var(--color-secondary)"
            opacity="0.7"
          />
          <!-- 裝飾光點 -->
          <circle cx="80" cy="100" r="4" fill="var(--color-accent)" />
          <circle
            cx="240"
            cy="80"
            r="6"
            fill="var(--color-accent)"
            opacity="0.6"
          />
          <circle cx="260" cy="280" r="3" fill="var(--color-primary)" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-hero {
  position: relative;
  overflow: hidden;
  background: var(--gradient-hero);

  &__bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 80% 50%,
      var(--bg-overlay) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &__inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  &__eyebrow {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    background: var(--bg-overlay);
    color: var(--color-primary);
    font-size: 12px;
    letter-spacing: 3px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    line-height: 1.1;
    color: var(--text-primary);
    margin: 0 0 16px;
  }

  &__title-accent {
    color: var(--color-primary);
  }

  &__desc {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 32px;
    max-width: 420px;
  }

  &__cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__visual {
    display: flex;
    justify-content: center;

    svg {
      width: 100%;
      max-width: 360px;
      height: auto;
    }
  }

  // 手機版：堆疊 + 縮小 padding
  &--mobile {
    .noya-hero__inner {
      grid-template-columns: 1fr;
      padding: 40px 16px;
      text-align: center;
    }

    .noya-hero__cta {
      justify-content: center;
    }

    .noya-hero__visual {
      order: -1;

      svg {
        max-width: 240px;
      }
    }

    .noya-hero__desc {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
