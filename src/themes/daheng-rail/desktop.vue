<script setup lang="ts">
/**
 * daheng-rail desktop：a08 大亨橫向滑軌 PC 重構版面
 *
 * PC 重構策略（完全捨棄手機的橫向滑軌）：
 * - 上方 sticky header（同 daheng-grid 結構）
 * - carousel hero（左 65% 大圖 + 右 35% 小縮圖列表，視覺像「專題網頁」）
 * - 三段大型分欄：每段「左 1 大圖 banner + 右 4 小縮圖」（呼應手機 3 條 rail 但換成靜態分欄）
 * - 底部 promo bar
 *
 * 為什麼 PC 不留滑軌：
 * - PC 寬度足夠，使用者習慣「一次看完」而非「左右滑」
 * - 改成靜態分欄展示，視覺更像專題介紹頁，與手機 rail 的「快速瀏覽」職責互補
 */
import { computed } from "vue";
import {
  DAHENG_CATS,
  DAHENG_GAMES,
  heroSrc,
  mascotLogoSrc,
  trophySrc
} from "../daheng-shared/_data";

const sections = computed(() => [
  {
    title: "熱門推薦",
    hot: true,
    main: DAHENG_GAMES[0],
    side: [DAHENG_GAMES[3], DAHENG_GAMES[2], DAHENG_GAMES[1], DAHENG_GAMES[4]]
  },
  {
    title: "真人 LIVE 廳",
    hot: false,
    main: DAHENG_GAMES[3],
    side: [DAHENG_GAMES[0], DAHENG_GAMES[5], DAHENG_GAMES[3], DAHENG_GAMES[0]]
  },
  {
    title: "電子 SLOTS 殿堂",
    hot: false,
    main: DAHENG_GAMES[2],
    side: [DAHENG_GAMES[4], DAHENG_GAMES[1], DAHENG_GAMES[2], DAHENG_GAMES[4]]
  }
]);
</script>

<template>
  <div class="daheng-rail-pc">
    <header class="daheng-rail-pc__header">
      <div class="daheng-rail-pc__brand">
        <img :src="mascotLogoSrc" alt="大亨" />
        <span>大亨娛樂城</span>
      </div>
      <nav class="daheng-rail-pc__nav">
        <a
          v-for="(cat, i) in DAHENG_CATS"
          :key="cat.key"
          href="#"
          class="daheng-rail-pc__nav-item"
          :class="{ 'daheng-rail-pc__nav-item--active': i === 0 }"
        >
          {{ cat.label }}
        </a>
      </nav>
      <div class="daheng-rail-pc__auth">
        <button type="button" class="daheng-rail-pc__btn-reg">註冊</button>
        <button type="button" class="daheng-rail-pc__btn-login">登入</button>
      </div>
    </header>

    <!-- carousel hero：左大圖 + 右縮圖列表 -->
    <section class="daheng-rail-pc__carousel">
      <div class="daheng-rail-pc__carousel-main">
        <img :src="heroSrc" alt="首存1000送1000" />
        <div class="daheng-rail-pc__carousel-tag">本期主推</div>
      </div>
      <ul class="daheng-rail-pc__carousel-list">
        <li
          v-for="(g, i) in DAHENG_GAMES.slice(0, 4)"
          :key="g.key"
          class="daheng-rail-pc__carousel-item"
          :class="{ 'daheng-rail-pc__carousel-item--on': i === 0 }"
        >
          <img :src="g.img" :alt="g.name" />
          <div>
            <b>{{ g.name }}</b>
            <small>{{ g.en }}</small>
          </div>
        </li>
      </ul>
    </section>

    <!-- 三段大型分欄 -->
    <section
      v-for="sec in sections"
      :key="sec.title"
      class="daheng-rail-pc__section"
    >
      <header class="daheng-rail-pc__sec-head">
        <h2>
          <span v-if="sec.hot" class="daheng-rail-pc__flame">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2c1 3-1 4-2 6-1 1.7-3 3-3 6a5 5 0 0 0 10 0c0-2-1-3-1-4 1 .4 2 1.2 2 2 .8-1 1-2 1-3 0-3-3-5-3-8-1.5 1-2 2.5-2 3 0-2-1-3-2-4Z"
                fill="#e8642a"
              />
            </svg>
          </span>
          {{ sec.title }}
        </h2>
        <span class="daheng-rail-pc__more">查看全部</span>
      </header>
      <div class="daheng-rail-pc__columns">
        <div class="daheng-rail-pc__main-card">
          <img :src="sec.main.img" :alt="sec.main.name" />
          <div class="daheng-rail-pc__main-card-overlay">
            <b>{{ sec.main.name }}</b>
            <small>{{ sec.main.en }}</small>
          </div>
        </div>
        <div class="daheng-rail-pc__side-cards">
          <div
            v-for="(g, i) in sec.side"
            :key="`${sec.title}-${g.key}-${i}`"
            class="daheng-rail-pc__side-card"
          >
            <img :src="g.img" :alt="g.name" />
            <b>{{ g.name }}</b>
          </div>
        </div>
      </div>
    </section>

    <section class="daheng-rail-pc__promo-bar">
      <img :src="trophySrc" alt="獎盃" />
      <div>
        <h3>週週優惠享不停</h3>
        <p>超值回饋等你拿！</p>
      </div>
      <button type="button">立即查看</button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.daheng-rail-pc {
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

    img {
      width: 44px;
      height: 44px;
      object-fit: contain;
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
    padding: 10px 14px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;

    &:hover {
      background: rgba(255, 255, 255, 0.6);
      color: var(--color-primary);
    }

    &--active {
      background: linear-gradient(180deg, #ffffff, #ffe7d2);
      color: var(--color-primary);
    }
  }

  &__auth {
    display: flex;
    gap: 10px;
  }

  &__btn-reg,
  &__btn-login {
    font-weight: 700;
    font-size: 15px;
    padding: 10px 22px;
    border-radius: 24px;
    cursor: pointer;
  }

  &__btn-reg {
    color: var(--color-primary);
    background: #ffffff;
    border: 1.6px solid var(--color-secondary);
  }

  &__btn-login {
    color: #ffffff;
    background: var(--gradient-cta);
    border: none;
    box-shadow: 0 6px 14px -6px rgba(150, 80, 30, 0.6);
  }

  // ── carousel hero ───────────────────────────────
  &__carousel {
    margin: 24px 48px 0;
    display: grid;
    grid-template-columns: 65% 35%;
    gap: 18px;
    height: 360px;
  }

  &__carousel-main {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__carousel-tag {
    position: absolute;
    top: 22px;
    left: 24px;
    padding: 8px 18px;
    background: rgba(44, 37, 33, 0.78);
    color: #ffffff;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  &__carousel-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }

  &__carousel-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: background 0.18s ease;

    &:hover {
      background: #ffffff;
    }

    &--on {
      background: linear-gradient(180deg, #ffffff, #ffe7d2);
    }

    img {
      width: 78px;
      height: 60px;
      border-radius: 10px;
      object-fit: cover;
    }

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

  // ── 三段大型分欄 ───────────────────────────────
  &__section {
    margin: 40px 48px 0;
  }

  &__sec-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    h2 {
      font-size: 22px;
      font-weight: 900;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__flame {
    width: 22px;
    height: 22px;
    display: inline-flex;
  }

  &__more {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-primary);
    cursor: pointer;
  }

  &__columns {
    display: grid;
    grid-template-columns: 45% 1fr;
    gap: 18px;
  }

  &__main-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
    height: 280px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__main-card-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 18px 22px;
    background: linear-gradient(180deg, transparent, rgba(44, 37, 33, 0.82));
    color: #ffffff;

    b {
      display: block;
      font-size: 22px;
      font-weight: 900;
    }

    small {
      display: block;
      margin-top: 4px;
      font-style: italic;
      font-weight: 700;
      font-size: 12px;
      color: #f4d9b8;
    }
  }

  &__side-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  &__side-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      display: block;
    }

    b {
      display: block;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }
  }

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
      width: 130px;
      height: auto;
    }

    h3 {
      font-size: 24px;
      font-weight: 900;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #86705c;
      margin: 4px 0 0;
    }

    button {
      flex: none;
      padding: 12px 32px;
      border: none;
      border-radius: 24px;
      background: var(--gradient-cta);
      color: #ffffff;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 16px -6px rgba(150, 80, 30, 0.6);
    }

    > div:not(:first-child) {
      flex: 1;
    }
  }
}
</style>
