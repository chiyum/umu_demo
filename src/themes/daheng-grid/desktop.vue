<script setup lang="ts">
/**
 * daheng-grid desktop：a07 大亨滿版宮格 PC 重構版面
 *
 * PC 重構策略：
 * - 頂部 mega header（橫向 nav + 品牌 logo + 雙 CTA）
 * - 全幅 hero swiper（單張大圖，模擬 swiper 視覺）
 * - 4 欄宮格牆（6 張遊戲 × 2 = 12 卡，每卡帶浮動 hot 標籤）
 * - 底部 promo 橫條（左獎盃右 CTA，與手機版 promo 視覺呼應）
 *
 * 為什麼選「mega header + 全幅 hero + 4 欄宮格牆」：
 * - 手機 v2 = 2 欄 3 列 6 張，PC 重構成更大規模的 4 欄宮格牆
 * - mega header 替代手機 statusbar+header 雙列，凝聚成單列充分利用 PC 寬度
 */
import { computed } from "vue";
import {
  DAHENG_CATS,
  DAHENG_GAMES,
  heroSrc,
  trophySrc
} from "../daheng-shared/_data";
import { useDemoThemeStore } from "@/store/demo-theme.store";

// logo 改接 themeStore.currentLogo（v4.5 起）：對齊既有 theme 慣例
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

// 展開 12 張卡（6 張 × 2）以填滿 4 欄宮格牆
const wallGames = [...DAHENG_GAMES, ...DAHENG_GAMES];
</script>

<template>
  <div class="daheng-grid-pc">
    <!-- 頂部 mega header -->
    <header class="daheng-grid-pc__header">
      <div class="daheng-grid-pc__brand">
        <img :src="logoSrc" :alt="logoLabel" />
        <span>大亨娛樂城</span>
      </div>
      <nav class="daheng-grid-pc__nav">
        <a
          v-for="(cat, i) in DAHENG_CATS"
          :key="cat.key"
          href="#"
          class="daheng-grid-pc__nav-item"
          :class="{ 'daheng-grid-pc__nav-item--active': i === 0 }"
        >
          {{ cat.label }}
          <span v-if="cat.hot" class="daheng-grid-pc__nav-hot">HOT</span>
        </a>
      </nav>
      <div class="daheng-grid-pc__auth">
        <button type="button" class="daheng-grid-pc__btn-reg">註冊</button>
        <button type="button" class="daheng-grid-pc__btn-login">登入</button>
      </div>
    </header>

    <!-- 全幅 hero swiper（單張大圖示意） -->
    <section class="daheng-grid-pc__hero">
      <img :src="heroSrc" alt="首存1000送1000" />
      <div class="daheng-grid-pc__hero-dots">
        <span class="daheng-grid-pc__hero-dot daheng-grid-pc__hero-dot--on" />
        <span class="daheng-grid-pc__hero-dot" />
        <span class="daheng-grid-pc__hero-dot" />
      </div>
    </section>

    <!-- 4 欄宮格牆 -->
    <section class="daheng-grid-pc__wall-section">
      <header class="daheng-grid-pc__sec-head">
        <h2>熱門遊戲牆</h2>
        <span class="daheng-grid-pc__more">查看全部</span>
      </header>
      <div class="daheng-grid-pc__wall">
        <div
          v-for="(g, i) in wallGames"
          :key="`${g.key}-${i}`"
          class="daheng-grid-pc__card"
        >
          <img :src="g.img" :alt="g.name" />
          <span v-if="i % 3 === 0" class="daheng-grid-pc__card-hot">HOT</span>
          <div class="daheng-grid-pc__card-meta">
            <b>{{ g.name }}</b>
            <small>{{ g.en }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 promo 橫條 -->
    <section class="daheng-grid-pc__promo-bar">
      <img :src="trophySrc" alt="獎盃" />
      <div class="daheng-grid-pc__promo-text">
        <h3>週週優惠享不停</h3>
        <p>超值回饋等你拿 · 首存 1000 送 1000，新會員 VIP 月禮等你開啟</p>
      </div>
      <button type="button" class="daheng-grid-pc__promo-cta">立即查看</button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.daheng-grid-pc {
  min-height: 100vh;
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
  padding: 0 0 60px;

  &__header {
    display: flex;
    align-items: center;
    gap: 32px;
    background: rgba(255, 255, 255, 0.84);
    backdrop-filter: blur(12px);
    padding: 18px 48px;
    box-shadow: 0 4px 18px -10px rgba(120, 72, 28, 0.3);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;

    // logo 樣式對齊 at99 / noya 橫式 logo pattern：height 固定 + width auto + max-width contain
    img {
      height: 44px;
      width: auto;
      max-width: 120px;
      object-fit: contain;
      display: block;
    }

    span {
      font-size: 18px;
      font-weight: 900;
      color: var(--color-primary);
      letter-spacing: 1px;
    }
  }

  &__nav {
    flex: 1;
    display: flex;
    gap: 6px;
  }

  &__nav-item {
    position: relative;
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;
    cursor: pointer;
    transition: background 0.18s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.6);
      color: var(--color-primary);
    }

    &--active {
      background: linear-gradient(180deg, #ffffff, #ffe7d2);
      color: var(--color-primary);
    }
  }

  &__nav-hot {
    margin-left: 4px;
    font-style: italic;
    font-weight: 900;
    font-size: 10px;
    color: #ffffff;
    background: #e8642a;
    padding: 1px 5px;
    border-radius: 4px;
  }

  &__auth {
    display: flex;
    gap: 10px;
  }

  &__btn-reg {
    font-weight: 700;
    font-size: 15px;
    padding: 10px 22px;
    border-radius: 24px;
    color: var(--color-primary);
    background: #ffffff;
    border: 1.6px solid var(--color-secondary);
    cursor: pointer;
  }

  &__btn-login {
    font-weight: 700;
    font-size: 15px;
    padding: 10px 22px;
    border-radius: 24px;
    color: #ffffff;
    background: var(--gradient-cta);
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 14px -6px rgba(150, 80, 30, 0.6);
  }

  // ── 全幅 hero ───────────────────────────────
  &__hero {
    position: relative;
    margin: 24px 48px 0;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 360px;
      object-fit: cover;
      display: block;
    }
  }

  &__hero-dots {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }

  &__hero-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);

    &--on {
      background: #ffffff;
      width: 28px;
      border-radius: 6px;
    }
  }

  // ── 4 欄宮格牆 ───────────────────────────────
  &__wall-section {
    margin: 36px 48px 0;
  }

  &__sec-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;

    h2 {
      font-size: 24px;
      font-weight: 900;
      margin: 0;
    }
  }

  &__more {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-primary);
    cursor: pointer;
  }

  &__wall {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }

  &__card {
    position: relative;
    background: #ffffff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
  }

  &__card-hot {
    position: absolute;
    top: 12px;
    left: 12px;
    font-style: italic;
    font-weight: 900;
    font-size: 13px;
    color: #ffffff;
    background: #e8642a;
    padding: 3px 10px;
    border-radius: 10px 10px 10px 2px;
    transform: rotate(-6deg);
    box-shadow: 0 3px 6px -2px rgba(200, 80, 20, 0.6);
  }

  &__card-meta {
    padding: 12px 16px 14px;
    text-align: center;

    b {
      display: block;
      font-size: 15px;
      font-weight: 700;
    }

    small {
      display: block;
      margin-top: 2px;
      font-style: italic;
      font-weight: 700;
      font-size: 10px;
      color: #c4a68c;
      letter-spacing: 0.4px;
    }
  }

  // ── 底部 promo 橫條 ───────────────────────────────
  &__promo-bar {
    margin: 40px 48px 0;
    padding: 24px 32px;
    border-radius: 24px;
    background: linear-gradient(110deg, #fbe6d2, #f7dcbf);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 24px;

    img {
      width: 140px;
      height: auto;
      flex: none;
    }
  }

  &__promo-text {
    flex: 1;

    h3 {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 1px;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #86705c;
      margin: 6px 0 0;
    }
  }

  &__promo-cta {
    flex: none;
    padding: 14px 36px;
    border: none;
    border-radius: 26px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 16px -6px rgba(150, 80, 30, 0.6);
  }
}
</style>
