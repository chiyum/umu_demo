<script setup lang="ts">
/**
 * daheng-list desktop：a10 大亨清單榜單 PC 重構版面（leaderboard 主題頁）
 *
 * PC 重構策略：
 * - 上方 top 3 大卡橫排（金、銀、銅徽章；金牌略放大）
 * - 下方表格式 4~6 列含 PC 才有的附加欄：玩家數 / 賠率 / 趨勢
 * - 視覺像「leaderboard 競賽榜」，與手機 v5 的「6 列簡潔清單」呼應但資料密度更高
 */
import { computed } from "vue";
import {
  DAHENG_CATS,
  DAHENG_GAMES,
  mascotLogoSrc
} from "../daheng-shared/_data";

// 表格列：在 mobile 6 列基礎上補附加欄（玩家數 / 賠率 / 趨勢）
const tableRows = computed(() =>
  DAHENG_GAMES.map((g, i) => ({
    rank: i + 1,
    game: g,
    players: [1248, 982, 871, 760, 654, 612][i] ?? 500,
    odds: ["1.98", "1.92", "1.88", "1.84", "1.80", "1.78"][i] ?? "1.75",
    trend: ["▲ 12%", "▲ 8%", "▼ 3%", "▲ 5%", "▼ 1%", "▲ 4%"][i] ?? "—"
  }))
);

const top3 = computed(() => tableRows.value.slice(0, 3));
const restRows = computed(() => tableRows.value.slice(3));
</script>

<template>
  <div class="daheng-list-pc">
    <header class="daheng-list-pc__header">
      <div class="daheng-list-pc__brand">
        <img :src="mascotLogoSrc" alt="大亨" />
        <span>大亨娛樂城 · 人氣榜單</span>
      </div>
      <nav class="daheng-list-pc__nav">
        <a
          v-for="(cat, i) in DAHENG_CATS"
          :key="cat.key"
          href="#"
          class="daheng-list-pc__nav-item"
          :class="{ 'daheng-list-pc__nav-item--active': i === 0 }"
        >
          {{ cat.label }}
        </a>
      </nav>
      <button type="button" class="daheng-list-pc__btn-login">登入</button>
    </header>

    <!-- Top 3 大卡橫排 -->
    <section class="daheng-list-pc__top3">
      <div
        v-for="row in top3"
        :key="row.game.key"
        class="daheng-list-pc__top-card"
        :class="`daheng-list-pc__top-card--rank${row.rank}`"
      >
        <div class="daheng-list-pc__top-medal">
          {{ row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : "🥉" }}
        </div>
        <div class="daheng-list-pc__top-thumb">
          <img :src="row.game.img" :alt="row.game.name" />
        </div>
        <div class="daheng-list-pc__top-meta">
          <b>{{ row.game.name }}</b>
          <small>{{ row.game.en }}</small>
        </div>
        <div class="daheng-list-pc__top-stats">
          <div>
            <span>玩家數</span>
            <strong>{{ row.players }}</strong>
          </div>
          <div>
            <span>賠率</span>
            <strong>{{ row.odds }}</strong>
          </div>
          <div>
            <span>趨勢</span>
            <strong>{{ row.trend }}</strong>
          </div>
        </div>
        <button type="button" class="daheng-list-pc__top-cta">立即進入</button>
      </div>
    </section>

    <!-- 表格式榜單（第 4~6 名） -->
    <section class="daheng-list-pc__table-section">
      <header class="daheng-list-pc__sec-head">
        <h2>完整榜單</h2>
        <span class="daheng-list-pc__more">查看全部</span>
      </header>
      <div class="daheng-list-pc__table">
        <div class="daheng-list-pc__table-head">
          <span>排名</span>
          <span>遊戲</span>
          <span>玩家數</span>
          <span>賠率</span>
          <span>趨勢</span>
          <span />
        </div>
        <div
          v-for="row in restRows"
          :key="row.game.key"
          class="daheng-list-pc__table-row"
        >
          <span class="daheng-list-pc__row-rank">
            {{ String(row.rank).padStart(2, "0") }}
          </span>
          <span class="daheng-list-pc__row-game">
            <img :src="row.game.img" :alt="row.game.name" />
            <div>
              <b>{{ row.game.name }}</b>
              <small>{{ row.game.en }}</small>
            </div>
          </span>
          <span>{{ row.players }}</span>
          <span>{{ row.odds }}</span>
          <span class="daheng-list-pc__row-trend">{{ row.trend }}</span>
          <button type="button" class="daheng-list-pc__row-go">進入</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.daheng-list-pc {
  min-height: 100vh;
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
  padding: 0 0 60px;

  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 18px 48px;
    background: rgba(255, 255, 255, 0.84);
    backdrop-filter: blur(12px);
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
    gap: 4px;
  }

  &__nav-item {
    padding: 10px 14px;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;

    &--active {
      background: linear-gradient(180deg, #ffffff, #ffe7d2);
      color: var(--color-primary);
    }
  }

  &__btn-login {
    padding: 10px 22px;
    border: none;
    border-radius: 22px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  // ── Top 3 大卡 ───────────────────────────────
  &__top3 {
    margin: 32px 48px 0;
    display: grid;
    grid-template-columns: 1fr 1.18fr 1fr;
    gap: 18px;
    align-items: end;
  }

  &__top-card {
    background: #ffffff;
    border-radius: 22px;
    padding: 24px 20px;
    text-align: center;
    box-shadow: var(--shadow);
    position: relative;

    &--rank1 {
      background: linear-gradient(180deg, #fff8e7, #fce7c2);
      transform: translateY(-8px);
      box-shadow: 0 18px 32px -16px rgba(217, 162, 75, 0.55);
    }

    &--rank2 {
      background: linear-gradient(180deg, #ffffff, #f0f0f0);
    }

    &--rank3 {
      background: linear-gradient(180deg, #ffffff, #fbe7d2);
    }
  }

  &__top-medal {
    font-size: 36px;
    margin-bottom: 12px;
  }

  &__top-thumb {
    width: 140px;
    height: 140px;
    margin: 0 auto 12px;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__top-meta b {
    display: block;
    font-size: 18px;
    font-weight: 900;
  }

  &__top-meta small {
    display: block;
    margin-top: 2px;
    font-style: italic;
    font-weight: 700;
    font-size: 11px;
    color: #c4a68c;
    letter-spacing: 0.5px;
  }

  &__top-stats {
    margin: 16px 0;
    display: flex;
    justify-content: space-around;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  &__top-stats > div {
    text-align: center;

    span {
      display: block;
      font-size: 11px;
      color: #c4a68c;
      margin-bottom: 4px;
    }

    strong {
      font-size: 14px;
      font-weight: 900;
      color: var(--text-primary);
    }
  }

  &__top-cta {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 22px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 6px 14px -6px rgba(150, 80, 30, 0.6);
  }

  // ── 表格式榜單 ───────────────────────────────
  &__table-section {
    margin: 40px 48px 0;
  }

  &__sec-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;

    h2 {
      font-size: 22px;
      font-weight: 900;
      margin: 0;
    }
  }

  &__more {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-primary);
  }

  &__table {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  &__table-head,
  &__table-row {
    display: grid;
    grid-template-columns: 64px minmax(0, 2.4fr) 1fr 1fr 1fr 100px;
    align-items: center;
    padding: 14px 22px;
    gap: 12px;
  }

  &__table-head {
    background: rgba(252, 239, 223, 0.7);
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__table-row {
    border-top: 1px solid var(--border);
    font-size: 14px;
  }

  &__row-rank {
    font-style: italic;
    font-weight: 900;
    font-size: 18px;
    color: var(--color-accent);
    -webkit-text-stroke: 0.4px rgba(180, 130, 60, 0.35);
  }

  &__row-game {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 10px;
      object-fit: cover;
    }

    b {
      display: block;
      font-size: 14px;
      font-weight: 700;
    }

    small {
      display: block;
      font-style: italic;
      font-weight: 700;
      font-size: 10px;
      color: #c4a68c;
    }
  }

  &__row-trend {
    font-weight: 700;
    color: var(--color-primary);
  }

  &__row-go {
    padding: 8px 18px;
    border: none;
    border-radius: 18px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
