<script setup lang="ts">
/**
 * at99 電競賽事 row：5 個大 tile 橫排
 *
 * 設計：
 * - 5 個不同類型電競（不抄真實遊戲品牌名，用通用代號）
 * - 每個 tile 漸層底 + 中央大圖示 + 標題 + 即時賠率
 * - 跨配色用 var() 控制邊框
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface Game {
  key: string;
  title: string;
  sub: string;
  /** 中央 icon */
  icon: string;
  /** 主視覺 hue */
  hue: number;
}

const games: Game[] = [
  { key: "e1", title: "MOBA 競技", sub: "5v5 Battle", icon: "⚔", hue: 220 },
  { key: "e2", title: "戰術射擊", sub: "FPS Arena", icon: "🎯", hue: 0 },
  { key: "e3", title: "格鬥對戰", sub: "Fight Cup", icon: "👊", hue: 300 },
  { key: "e4", title: "卡牌策略", sub: "Card Master", icon: "🃏", hue: 45 },
  { key: "e5", title: "賽車競速", sub: "Racing Pro", icon: "🏎", hue: 160 }
];
</script>

<template>
  <section class="at99-esports" :class="{ 'at99-esports--mobile': mobile }">
    <div class="at99-esports__inner">
      <header class="at99-esports__header">
        <h2 class="at99-esports__heading">電競賽事</h2>
        <span class="at99-esports__sub">E-Sports Center</span>
      </header>

      <div class="at99-esports__grid">
        <article
          v-for="g in games"
          :key="g.key"
          class="at99-esports__tile"
          tabindex="0"
          :style="{
            background: `linear-gradient(160deg, hsl(${g.hue}, 60%, 32%) 0%, hsl(${(g.hue + 30) % 360}, 65%, 18%) 100%)`
          }"
        >
          <div class="at99-esports__icon">{{ g.icon }}</div>
          <div class="at99-esports__meta">
            <div class="at99-esports__title">{{ g.title }}</div>
            <div class="at99-esports__sub-text">{{ g.sub }}</div>
          </div>
          <button type="button" class="at99-esports__cta">即時賠率</button>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-esports {
  background: var(--bg-base);
  padding: 16px 0;
  padding-left: var(--dock-offset);

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 12px;
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
  }

  &__tile {
    border-radius: 12px;
    border: 1px solid var(--border);
    overflow: hidden;
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #ffffff;
    transition: all 0.18s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-3px);
      box-shadow: var(--neon-glow);
      outline: none;
    }
  }

  &__icon {
    font-size: 40px;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  }

  &__meta {
    text-align: center;
  }

  &__title {
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 1px;
  }

  &__sub-text {
    font-size: 10px;
    opacity: 0.8;
    margin-top: 2px;
    letter-spacing: 1px;
  }

  &__cta {
    background: rgba(0, 0, 0, 0.35);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    padding: 4px 12px;
    font-size: 11px;
    cursor: pointer;
    letter-spacing: 1px;

    &:hover {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
    }
  }

  &--mobile {
    padding-left: 0;

    .at99-esports__inner {
      padding: 0 12px;
    }

    .at99-esports__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
