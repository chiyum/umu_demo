<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * at99 排行榜：標題 + tab 切換（每日 / 中獎率）+ 5 欄表格 10 行資料
 *
 * 設計：
 * - 兩個 tab：每日排行 / 中獎率 %
 * - 表格 5 欄：排名 / 用戶 / 遊戲 / 投注金額 / 中獎金額
 * - 用戶暱稱使用 Player***01 通用佔位
 * - 資料寫死，純展示
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface Row {
  rank: number;
  user: string;
  game: string;
  bet: string;
  win: string;
  /** 中獎率（顯示在「中獎率」tab） */
  rate: string;
}

const dailyRows: Row[] = [
  {
    rank: 1,
    user: "Player***01",
    game: "霓虹之夜",
    bet: "12,800",
    win: "168,200",
    rate: "98.5%"
  },
  {
    rank: 2,
    user: "Lucky***07",
    game: "百家樂",
    bet: "8,500",
    win: "92,400",
    rate: "94.2%"
  },
  {
    rank: 3,
    user: "King***18",
    game: "黃金國度",
    bet: "15,200",
    win: "88,700",
    rate: "92.1%"
  },
  {
    rank: 4,
    user: "Ace***23",
    game: "龍虎鬥",
    bet: "5,600",
    win: "76,500",
    rate: "88.8%"
  },
  {
    rank: 5,
    user: "Star***45",
    game: "輪盤賭",
    bet: "9,200",
    win: "54,300",
    rate: "86.5%"
  },
  {
    rank: 6,
    user: "Gold***82",
    game: "深海寶藏",
    bet: "4,300",
    win: "42,800",
    rate: "84.2%"
  },
  {
    rank: 7,
    user: "Royal***91",
    game: "21 點",
    bet: "6,800",
    win: "38,500",
    rate: "82.1%"
  },
  {
    rank: 8,
    user: "Dragon***34",
    game: "麻將大廳",
    bet: "3,900",
    win: "30,200",
    rate: "80.5%"
  },
  {
    rank: 9,
    user: "Phoenix***66",
    game: "火焰戰場",
    bet: "5,100",
    win: "26,800",
    rate: "78.4%"
  },
  {
    rank: 10,
    user: "Eagle***75",
    game: "骰寶",
    bet: "2,800",
    win: "21,500",
    rate: "76.1%"
  }
];

const rateRows = computed(() => {
  // 中獎率 tab：依 rate 排序（已預先排好就好，這裡只切換 tab）
  return [...dailyRows].sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
});

const activeTab = ref<"daily" | "rate">("daily");

const rows = computed(() =>
  activeTab.value === "daily" ? dailyRows : rateRows.value
);
</script>

<template>
  <section class="at99-lb" :class="{ 'at99-lb--mobile': mobile }">
    <div class="at99-lb__inner">
      <header class="at99-lb__header">
        <h2 class="at99-lb__heading kingdom-block-label">排行榜</h2>
        <span class="at99-lb__sub">Leaderboard</span>
      </header>

      <!-- Tab 切換 -->
      <div class="at99-lb__tabs">
        <button
          type="button"
          class="at99-lb__tab"
          :class="{ 'at99-lb__tab--active': activeTab === 'daily' }"
          @click="activeTab = 'daily'"
        >
          每日排行
        </button>
        <button
          type="button"
          class="at99-lb__tab"
          :class="{ 'at99-lb__tab--active': activeTab === 'rate' }"
          @click="activeTab = 'rate'"
        >
          中獎率 %
        </button>
      </div>

      <!-- 表格 -->
      <div class="at99-lb__table-wrap">
        <table class="at99-lb__table">
          <thead>
            <tr>
              <th class="at99-lb__th--rank">排名</th>
              <th>用戶</th>
              <th>遊戲</th>
              <th>投注金額</th>
              <th v-if="activeTab === 'daily'">中獎金額</th>
              <th v-else>中獎率</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.user"
              :class="{ 'at99-lb__row--top': row.rank <= 3 }"
            >
              <td class="at99-lb__td--rank">
                <span
                  class="at99-lb__rank-badge"
                  :class="`at99-lb__rank-badge--r${row.rank}`"
                >
                  {{ row.rank }}
                </span>
              </td>
              <td>{{ row.user }}</td>
              <td>{{ row.game }}</td>
              <td class="at99-lb__td--amount">{{ row.bet }}</td>
              <td v-if="activeTab === 'daily'" class="at99-lb__td--win">
                {{ row.win }}
              </td>
              <td v-else class="at99-lb__td--win">{{ row.rate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-lb {
  background: var(--bg-base);
  padding: 24px 0;
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
    margin-bottom: 14px;
  }

  &__heading {
    font-size: 24px;
    font-weight: 800;
    color: var(--color-primary);
    text-shadow: var(--neon-glow);
    margin: 0;
    letter-spacing: 2px;
  }

  &__sub {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__tabs {
    // kingdom DNA：tab 群外殼 --radius-md（8px）
    display: inline-flex;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 4px;
    gap: 4px;
    margin-bottom: 16px;
  }

  &__tab {
    // kingdom DNA：個別 tab --radius-sm（6px）
    background: transparent;
    color: var(--text-muted);
    border: none;
    padding: var(--space-sm) 18px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all var(--transition-fast);

    &--active {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &__table-wrap {
    // kingdom DNA：表格容器 --radius-lg（10px，原 12px 改為標準 10px）
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 18px;
      text-align: left;
      font-size: 13px;
      color: var(--text-primary);
    }

    th {
      background: var(--bg-base-deep);
      color: var(--color-primary);
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 12px;
      border-bottom: 1px solid var(--border);
    }

    tbody tr {
      transition: background 0.15s ease;

      &:nth-child(even) {
        background: var(--table-row-alt);
      }

      &:hover {
        background: var(--bg-overlay);
      }
    }
  }

  &__th--rank,
  &__td--rank {
    width: 70px;
    text-align: center;
  }

  &__rank-badge {
    // kingdom DNA：圓徽章走 --radius-circle
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-circle);
    font-weight: 800;
    background: var(--bg-overlay);
    color: var(--text-primary);

    // 前 3 名特殊配色
    // r1 走 theme 金色 token，配色切換時跟著走；r2 銀 / r3 銅是
    // 普世「銀 / 銅牌」直覺，故維持寫死讓視覺辨識度不受 variants 影響
    &--r1 {
      background: var(--gradient-gold);
      color: var(--text-on-gold);
      box-shadow: 0 0 10px var(--color-accent);
    }

    &--r2 {
      background: linear-gradient(135deg, #d6d6d6 0%, #8a8a8a 100%);
      color: #1a1a1a;
    }

    &--r3 {
      background: linear-gradient(135deg, #cd7f32 0%, #8b4513 100%);
      color: #ffffff;
    }
  }

  &__td--amount,
  &__td--win {
    font-family: var(--font-display);
    font-weight: 700;
  }

  &__td--win {
    color: var(--color-accent);
    text-shadow: 0 0 4px var(--color-accent);
  }

  &--mobile {
    padding-left: 0;

    .at99-lb__inner {
      padding: 0 12px;
    }

    .at99-lb__table {
      th,
      td {
        padding: 10px 8px;
        font-size: 11px;
      }
    }

    // 手機隱藏「遊戲」「投注金額」其中一欄以節省空間
    .at99-lb__table th:nth-child(3),
    .at99-lb__table td:nth-child(3) {
      display: none;
    }
  }
}
</style>
