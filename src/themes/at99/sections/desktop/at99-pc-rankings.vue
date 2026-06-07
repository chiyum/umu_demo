<script setup lang="ts">
import { ref } from "vue";
import rankingsIcon from "../../assets/desktop/home/rankings-icon.png?url";

/**
 * at99 桌面版排行榜 — 視覺結構參考 slime-at99 desktop/rankings.vue
 *
 * 原作 DOM：
 *   .rankings
 *     .rankings-title → 大標題「排行榜」
 *     .rankings-card
 *       .rankings-card--title  ← icon + 風雲榜
 *       .rankings-card--tab    ← 本日 / 本週 / 本月
 *       .rankings-card--listTitle ← 表頭 序號 / 玩家 / 投注額 / 風雲獎金
 *       .rankings-list-container
 *         <Vue3Marquee vertical>
 *           <ul><li v-for winList>{ serialNum / player / bet / bonus }
 *
 * Demo 化：CSS-only 垂直跑動的排行榜，8 個玩家循環
 */

interface RankItem {
  serialNum: number;
  player: string;
  bet: number;
  bonus: number;
}

const WIN_LIST: RankItem[] = [
  { serialNum: 1, player: "玩家A", bet: 5000, bonus: 200 },
  { serialNum: 2, player: "玩家B", bet: 4000, bonus: 180 },
  { serialNum: 3, player: "玩家C", bet: 3000, bonus: 150 },
  { serialNum: 4, player: "玩家D", bet: 2000, bonus: 120 },
  { serialNum: 5, player: "玩家E", bet: 1000, bonus: 100 },
  { serialNum: 6, player: "玩家F", bet: 900, bonus: 90 },
  { serialNum: 7, player: "玩家G", bet: 800, bonus: 80 },
  { serialNum: 8, player: "玩家H", bet: 700, bonus: 70 }
];

const RANKING_TABS = ["本日", "本週", "本月"];
const tabIndex = ref<number>(0);
</script>

<template>
  <div class="at99-pc-rankings">
    <div class="at99-pc-rankings__title">
      <h2 class="at99-pc-rankings__title-text">排行榜</h2>
    </div>

    <div class="at99-pc-rankings__card">
      <div class="at99-pc-rankings__card-title">
        <img :src="rankingsIcon" alt="" />
        <h3>風雲榜</h3>
      </div>

      <div class="at99-pc-rankings__tabs">
        <p
          v-for="(item, idx) in RANKING_TABS"
          :key="idx"
          class="at99-pc-rankings__tab"
          :class="{ 'at99-pc-rankings__tab--active': tabIndex === idx }"
          @click="tabIndex = idx"
        >
          {{ item }}
        </p>
      </div>

      <div class="at99-pc-rankings__list-title">
        <p class="at99-pc-rankings__col-serialNum">序號</p>
        <p class="at99-pc-rankings__col-player">玩家</p>
        <p class="at99-pc-rankings__col-bet">投注額</p>
        <p class="at99-pc-rankings__col-bonus">風雲獎金</p>
      </div>

      <div class="at99-pc-rankings__list-container">
        <ul class="at99-pc-rankings__list">
          <li
            v-for="item in WIN_LIST"
            :key="item.serialNum"
            class="at99-pc-rankings__row"
          >
            <p class="at99-pc-rankings__col-serialNum">{{ item.serialNum }}</p>
            <p class="at99-pc-rankings__col-player">{{ item.player }}</p>
            <p class="at99-pc-rankings__col-bet">${{ item.bet }}</p>
            <p class="at99-pc-rankings__col-bonus">${{ item.bonus }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.at99-pc-rankings {
  margin: 32px 0;
  padding: 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.at99-pc-rankings__title {
  margin-bottom: 16px;
}

.at99-pc-rankings__title-text {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
  text-shadow: var(--neon-glow);
  margin: 0;
}

.at99-pc-rankings__card {
  display: flex;
  flex-direction: column;
}

.at99-pc-rankings__card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--color-accent);
  }
}

.at99-pc-rankings__tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}

.at99-pc-rankings__tab {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  margin: 0;
  border-radius: 6px;
  transition: all 0.18s ease;

  &:hover {
    color: var(--color-primary);
  }

  &--active {
    color: var(--text-on-primary);
    background: var(--gradient-cta);
    box-shadow: var(--neon-glow);
  }
}

.at99-pc-rankings__list-title {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr;
  gap: 8px;
  padding: 10px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);

  p {
    margin: 0;
  }
}

.at99-pc-rankings__list-container {
  max-height: 320px;
  overflow: hidden;
}

.at99-pc-rankings__list {
  list-style: none;
  margin: 0;
  padding: 0;
  animation: at99-pc-rankings-scroll 16s linear infinite;
}

.at99-pc-rankings__row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr;
  gap: 8px;
  padding: 12px 0;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--table-row-alt);
  align-items: center;

  p {
    margin: 0;
  }

  &:nth-child(odd) {
    background: var(--table-row-alt);
  }
}

.at99-pc-rankings__col-serialNum {
  color: var(--color-accent);
  font-weight: 700;
  text-align: center;
}

.at99-pc-rankings__col-bet,
.at99-pc-rankings__col-bonus {
  color: var(--color-primary);
  font-weight: 600;
}

@keyframes at99-pc-rankings-scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-50%);
  }
}
</style>
