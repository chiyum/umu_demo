<script setup lang="ts">
/**
 * at99 真人荷官列：DG / DB / AB / WG / SA 五大廠牌
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const providers = [
  { code: "DG", name: "DG 真人" },
  { code: "DB", name: "DB 真人" },
  { code: "AB", name: "AB 真人" },
  { code: "WG", name: "WG 真人" },
  { code: "SA", name: "SA 真人" }
];
</script>

<template>
  <section id="live" class="at99-live" :class="{ 'at99-live--mobile': mobile }">
    <div class="at99-live__inner">
      <h2 class="at99-live__title">真人娛樂</h2>
      <div class="at99-live__list">
        <div v-for="p in providers" :key="p.code" class="at99-live__card">
          <div class="at99-live__card-portrait">
            <!-- SVG 人像剪影 -->
            <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  :id="`grad-${p.code}`"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="var(--color-primary)"
                    stop-opacity="0.8"
                  />
                  <stop offset="100%" stop-color="var(--bg-surface)" />
                </linearGradient>
              </defs>
              <rect width="120" height="140" :fill="`url(#grad-${p.code})`" />
              <circle cx="60" cy="55" r="22" fill="#fff" opacity="0.8" />
              <path
                d="M30 140 Q30 95, 60 85 Q90 95, 90 140 Z"
                fill="#fff"
                opacity="0.65"
              />
            </svg>
          </div>
          <div class="at99-live__card-name">{{ p.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-live {
  background: var(--bg-base);
  padding: 32px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__title {
    text-align: center;
    color: var(--text-primary);
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 24px;
    letter-spacing: 2px;
    text-shadow: var(--neon-glow);
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  &__card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 50%;
    overflow: hidden;
    aspect-ratio: 1;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow);

    &:hover {
      border-color: var(--color-primary);
      transform: scale(1.05);
      box-shadow: var(--neon-glow);
    }
  }

  &__card-portrait {
    width: 100%;
    height: 100%;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__card-name {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    text-align: center;
    color: var(--color-accent);
    font-weight: 700;
    font-size: 13px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
  }

  &--mobile {
    .at99-live__inner {
      padding: 0 14px;
    }

    .at99-live__list {
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .at99-live__card-name {
      font-size: 11px;
      bottom: 6px;
    }
  }
}
</style>
