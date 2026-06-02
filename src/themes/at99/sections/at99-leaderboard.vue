<script setup lang="ts">
/**
 * at99 排行榜：用 tab 切「派彩榜」與「Win Rate 榜」
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const tabs = ["派彩榜", "Win Rate 榜"];
const activeTab = ref(0);

// 假資料：兩個 tab 各自一份
const data = [
  [
    { rank: 1, name: "Player***88", amount: "$1,288,000" },
    { rank: 2, name: "Player***52", amount: "$986,400" },
    { rank: 3, name: "Player***19", amount: "$754,100" },
    { rank: 4, name: "Player***27", amount: "$612,800" },
    { rank: 5, name: "Player***05", amount: "$501,250" }
  ],
  [
    { rank: 1, name: "Player***88", amount: "87.4%" },
    { rank: 2, name: "Player***33", amount: "84.1%" },
    { rank: 3, name: "Player***19", amount: "82.9%" },
    { rank: 4, name: "Player***60", amount: "80.5%" },
    { rank: 5, name: "Player***41", amount: "78.2%" }
  ]
];
</script>

<template>
  <section
    id="leaderboard"
    class="at99-board"
    :class="{ 'at99-board--mobile': mobile }"
  >
    <div class="at99-board__inner">
      <h2 class="at99-board__title">排行榜</h2>

      <div class="at99-board__tabs">
        <button
          v-for="(t, idx) in tabs"
          :key="t"
          type="button"
          class="at99-board__tab"
          :class="{ 'at99-board__tab--active': activeTab === idx }"
          @click="activeTab = idx"
        >
          {{ t }}
        </button>
      </div>

      <div class="at99-board__list">
        <div class="at99-board__head">
          <span>排名</span>
          <span>玩家</span>
          <span>{{ activeTab === 0 ? "派彩金額" : "勝率" }}</span>
        </div>
        <div
          v-for="row in data[activeTab]"
          :key="row.rank"
          class="at99-board__row"
        >
          <span
            class="at99-board__rank"
            :class="`at99-board__rank--${row.rank}`"
          >
            {{ row.rank }}
          </span>
          <span class="at99-board__name">{{ row.name }}</span>
          <span class="at99-board__amount">{{ row.amount }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-board {
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
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 20px;
    letter-spacing: 2px;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 18px;
  }

  &__tab {
    padding: 8px 22px;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 600;
    border-radius: 999px;
    cursor: pointer;

    &--active {
      background: var(--gradient-cta);
      color: #0a1535;
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &__list {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  &__head {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    padding: 14px 24px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__row {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    padding: 14px 24px;
    border-top: 1px solid var(--border);
    align-items: center;
    color: var(--text-primary);
    font-size: 14px;
  }

  &__rank {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--bg-overlay);
    color: var(--text-muted);
    font-weight: 700;
    font-size: 12px;

    &--1 {
      background: linear-gradient(135deg, #ffd84d, #f59e0b);
      color: #1f1100;
      box-shadow: 0 0 8px #ffd84d;
    }

    &--2 {
      background: linear-gradient(135deg, #d1d5db, #9ca3af);
      color: #111827;
    }

    &--3 {
      background: linear-gradient(135deg, #d97706, #92400e);
      color: #ffffff;
    }
  }

  &__amount {
    color: var(--color-accent);
    font-weight: 700;
  }

  &--mobile {
    .at99-board__inner {
      padding: 0 14px;
    }

    .at99-board__head,
    .at99-board__row {
      padding: 10px 14px;
      grid-template-columns: 50px 1fr auto;
      font-size: 12px;
    }
  }
}
</style>
