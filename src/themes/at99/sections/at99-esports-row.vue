<script setup lang="ts">
// Round 9：lilian banner_bg_snake.png（黑底金龍 / 喇叭裝飾，無平台字樣）
// 作為 esports section 背景紋理（低不透明度 + blend），加重電競賽事「東方競技」視覺氛圍
import esportsBgPattern from "@/assets/themes/at99/extra/decor/esports-bg-pattern.png";

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
  <section
    class="at99-esports"
    :class="{ 'at99-esports--mobile': mobile }"
    :style="{ '--esports-bg-pattern': `url(${esportsBgPattern})` }"
  >
    <div class="at99-esports__inner">
      <header class="at99-esports__header">
        <h2 class="at99-esports__heading kingdom-block-label">電競賽事</h2>
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
  // Round 9：背景紋理 + 深底層疊
  //   1) 底層 var(--bg-base)
  //   2) 中層：esports pattern PNG（金龍 / 喇叭），靠右 + cover，低 alpha + blend：multiply
  //   3) 上層：深色漸層 overlay 控制可讀性（避免 pattern 過搶眼）
  // 為何用 multiply：黑底 pattern multiply 後保留金色亮部、深色部分壓暗，跟主底融合自然
  // 為何不用 background-image url 直接寫：需要從 ts import 走 vite asset 處理，外面用 inline style 透過 CSS var 傳入
  background:
    linear-gradient(
      90deg,
      var(--bg-base) 0%,
      rgba(0, 0, 0, 0.55) 55%,
      transparent 100%
    ),
    var(--esports-bg-pattern) right center / cover no-repeat,
    var(--bg-base);
  padding: 16px 0;
  padding-left: var(--dock-offset);
  position: relative;

  // overlay 加一道暗角避免 pattern 右下角過亮
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      ellipse at right bottom,
      rgba(0, 0, 0, 0.45) 0%,
      transparent 60%
    );
    z-index: 0;
  }

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
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
    // kingdom DNA：tile --radius-lg（10px）+ var transition + shadow glow hover
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    overflow: hidden;
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #ffffff;
    transition: all var(--transition-base);

    &:hover,
    &:focus-visible {
      transform: translateY(-3px);
      box-shadow: var(--shadow-glow);
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
    // kingdom DNA：小型 CTA --radius-xs（4px）+ var transition
    background: rgba(0, 0, 0, 0.35);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-xs);
    padding: 4px 12px;
    font-size: 11px;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all var(--transition-fast);

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
