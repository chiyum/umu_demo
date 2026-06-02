<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * at99 熱門遊戲區：頂部 4 tab 切換 + 下方 6×2 = 12 個 slot tile
 *
 * 設計：
 * - 4 個分類 tab：電子遊戲 / 彩票遊戲 / 真人視訊 / 棋牌遊戲
 * - 每個 tile：圖像（CSS 漸層 + 大字 + 光環）+ 標題 + 副標 + 「立即遊玩」按鈕
 * - 切 tab 換 grid 內容；資料寫死在組件內
 *
 * 為何 tabs + grid 合併在一個 SFC：tab 是 grid 的控制器，
 * 若拆兩個元件得用 store 或 prop 同步，徒增複雜度
 *
 * 文字：遊戲名通用幻想名（如「霓虹之夜」「太空冒險」），不抄原站
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface SlotTile {
  key: string;
  title: string;
  sub: string;
  /** 視覺色相（0-360） */
  hue: number;
  /** 中央大字符（避免直接寫遊戲品牌名） */
  icon: string;
}

interface Category {
  key: string;
  label: string;
  tiles: SlotTile[];
}

const categories: Category[] = [
  {
    key: "slot",
    label: "電子遊戲",
    tiles: [
      { key: "s1", title: "霓虹之夜", sub: "Neon Night", hue: 200, icon: "✦" },
      { key: "s2", title: "黃金國度", sub: "Golden Land", hue: 45, icon: "★" },
      { key: "s3", title: "太空冒險", sub: "Space Quest", hue: 270, icon: "✺" },
      { key: "s4", title: "深海寶藏", sub: "Deep Sea", hue: 180, icon: "✧" },
      {
        key: "s5",
        title: "森林精靈",
        sub: "Forest Spirit",
        hue: 140,
        icon: "✿"
      },
      { key: "s6", title: "火焰戰場", sub: "Fire Field", hue: 10, icon: "✷" },
      { key: "s7", title: "幻夜之歌", sub: "Night Song", hue: 290, icon: "✨" },
      { key: "s8", title: "古代神殿", sub: "Ancient Hall", hue: 30, icon: "✪" },
      {
        key: "s9",
        title: "魔法城堡",
        sub: "Magic Castle",
        hue: 320,
        icon: "⚜"
      },
      {
        key: "s10",
        title: "極光之境",
        sub: "Aurora Land",
        hue: 160,
        icon: "❋"
      },
      { key: "s11", title: "星際大門", sub: "Star Gate", hue: 240, icon: "❉" },
      {
        key: "s12",
        title: "獸王傳說",
        sub: "King of Beasts",
        hue: 60,
        icon: "❄"
      }
    ]
  },
  {
    key: "lottery",
    label: "彩票遊戲",
    tiles: [
      { key: "l1", title: "幸運大球", sub: "Big Lotto", hue: 0, icon: "❶" },
      { key: "l2", title: "今彩 539", sub: "Lucky 539", hue: 200, icon: "❷" },
      { key: "l3", title: "雙球大彩", sub: "Twin Pick", hue: 45, icon: "❸" },
      { key: "l4", title: "快樂時時", sub: "Lucky Time", hue: 140, icon: "❹" },
      { key: "l5", title: "六合彩", sub: "Mark Six", hue: 290, icon: "❺" },
      { key: "l6", title: "幸運轉盤", sub: "Lucky Wheel", hue: 30, icon: "❻" },
      { key: "l7", title: "刮刮卡", sub: "Scratch Off", hue: 170, icon: "❼" },
      { key: "l8", title: "賓果連線", sub: "Bingo Line", hue: 320, icon: "❽" },
      { key: "l9", title: "三星彩", sub: "Pick Three", hue: 60, icon: "❾" },
      { key: "l10", title: "彩球連珠", sub: "Ball Combo", hue: 240, icon: "❶" },
      { key: "l11", title: "幸運雙星", sub: "Twin Star", hue: 100, icon: "❷" },
      { key: "l12", title: "速贏快樂", sub: "Fast Win", hue: 10, icon: "❸" }
    ]
  },
  {
    key: "live",
    label: "真人視訊",
    tiles: [
      { key: "v1", title: "百家樂", sub: "Baccarat", hue: 0, icon: "♠" },
      { key: "v2", title: "龍虎鬥", sub: "Dragon Tiger", hue: 200, icon: "♥" },
      { key: "v3", title: "輪盤賭", sub: "Roulette", hue: 45, icon: "◉" },
      { key: "v4", title: "21 點", sub: "Blackjack", hue: 140, icon: "♣" },
      { key: "v5", title: "骰寶", sub: "Sic Bo", hue: 290, icon: "⚀" },
      { key: "v6", title: "牛牛", sub: "Bull Bull", hue: 30, icon: "♦" },
      { key: "v7", title: "炸金花", sub: "Three Flower", hue: 170, icon: "❀" },
      { key: "v8", title: "鬥地主", sub: "Landlord", hue: 320, icon: "✦" },
      { key: "v9", title: "百搭撲克", sub: "Poker Mix", hue: 60, icon: "♤" },
      { key: "v10", title: "魚蝦蟹", sub: "Fish Shrimp", hue: 240, icon: "✻" },
      {
        key: "v11",
        title: "輪盤精選",
        sub: "Roulette Plus",
        hue: 100,
        icon: "◎"
      },
      { key: "v12", title: "極速骰寶", sub: "Speed Dice", hue: 10, icon: "⚄" }
    ]
  },
  {
    key: "chess",
    label: "棋牌遊戲",
    tiles: [
      { key: "c1", title: "麻將大廳", sub: "Mahjong Hall", hue: 0, icon: "麻" },
      { key: "c2", title: "象棋對決", sub: "Chess Duel", hue: 200, icon: "象" },
      { key: "c3", title: "中國跳棋", sub: "Checkers", hue: 45, icon: "跳" },
      { key: "c4", title: "圍棋大師", sub: "Go Master", hue: 140, icon: "圍" },
      {
        key: "c5",
        title: "撲克大賽",
        sub: "Poker Battle",
        hue: 290,
        icon: "撲"
      },
      { key: "c6", title: "鬥地主", sub: "Landlord", hue: 30, icon: "鬥" },
      { key: "c7", title: "拱豬戰", sub: "Hearts", hue: 170, icon: "豬" },
      {
        key: "c8",
        title: "橋牌大廳",
        sub: "Bridge Hall",
        hue: 320,
        icon: "橋"
      },
      { key: "c9", title: "五子相連", sub: "Gomoku", hue: 60, icon: "五" },
      { key: "c10", title: "海戰棋", sub: "Battleship", hue: 240, icon: "海" },
      { key: "c11", title: "牌九大全", sub: "Pai Gow", hue: 100, icon: "牌" },
      { key: "c12", title: "黑白棋", sub: "Reversi", hue: 10, icon: "棋" }
    ]
  }
];

const activeKey = ref<string>("slot");

const activeCategory = computed(
  () => categories.find((c) => c.key === activeKey.value) ?? categories[0]
);
</script>

<template>
  <section class="at99-slots" :class="{ 'at99-slots--mobile': mobile }">
    <div class="at99-slots__inner">
      <!-- 4 tab -->
      <div class="at99-slots__tabs">
        <button
          v-for="c in categories"
          :key="c.key"
          type="button"
          class="at99-slots__tab"
          :class="{ 'at99-slots__tab--active': activeKey === c.key }"
          @click="activeKey = c.key"
        >
          {{ c.label }}
        </button>
        <div class="at99-slots__more">
          <a href="#" class="at99-slots__more-link">全部 ›</a>
        </div>
      </div>

      <!-- 6×2 grid -->
      <div class="at99-slots__grid">
        <article
          v-for="t in activeCategory.tiles"
          :key="t.key"
          class="at99-slots__tile"
          tabindex="0"
        >
          <div
            class="at99-slots__art"
            :style="{
              background: `radial-gradient(circle at 50% 40%, hsl(${t.hue}, 65%, 45%) 0%, hsl(${(t.hue + 30) % 360}, 70%, 22%) 70%, #0a0a14 100%)`
            }"
          >
            <span class="at99-slots__icon">{{ t.icon }}</span>
            <span class="at99-slots__glow" />
          </div>
          <div class="at99-slots__meta">
            <div class="at99-slots__title">{{ t.title }}</div>
            <div class="at99-slots__sub">{{ t.sub }}</div>
          </div>
          <button type="button" class="at99-slots__play">立即遊玩</button>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-slots {
  background: var(--bg-base);
  padding: 24px 0;
  padding-left: 60px; // 留 dock 空間

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__tabs {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  &__tab {
    background: var(--bg-surface);
    color: var(--text-muted);
    border: 1px solid var(--border);
    padding: 8px 18px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 1px;

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }

    &--active {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &__more {
    margin-left: auto;
  }

  &__more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;

    &:hover {
      text-shadow: 0 0 6px var(--color-primary);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
  }

  &__tile {
    background: var(--slot-tile-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.2s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      box-shadow: var(--neon-glow);
      outline: none;
    }
  }

  &__art {
    aspect-ratio: 5 / 4;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__icon {
    font-size: 42px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 800;
    text-shadow:
      0 0 14px rgba(255, 255, 255, 0.6),
      0 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1;
    z-index: 2;
  }

  &__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 100%,
      rgba(255, 255, 255, 0.18) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &__meta {
    padding: 8px 10px 4px;
  }

  &__title {
    font-size: 13px;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.1;
    letter-spacing: 1px;
  }

  &__sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  &__play {
    margin: 6px 10px 10px;
    height: 28px;
    background: linear-gradient(135deg, var(--color-accent) 0%, #d4951a 100%);
    color: #1a0e00;
    border: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &:hover {
      filter: brightness(1.1);
    }
  }

  &--mobile {
    padding-left: 0;
    padding: 16px 0;

    .at99-slots__inner {
      padding: 0 12px;
    }

    .at99-slots__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .at99-slots__tab {
      padding: 6px 12px;
      font-size: 12px;
    }

    .at99-slots__icon {
      font-size: 32px;
    }
  }
}
</style>
