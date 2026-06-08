<script setup lang="ts">
import iconLive from "../../assets/icon/cat-live.png?url";
import iconFish from "../../assets/icon/cat-fish.png?url";
import hot1 from "../../assets/games/hot-1.png?url";
import hot2 from "../../assets/games/hot-2.png?url";
import hot3 from "../../assets/games/hot-3.png?url";
import hot4 from "../../assets/games/hot-4.png?url";
import hot5 from "../../assets/games/hot-5.png?url";
import hot6 from "../../assets/games/hot-6.png?url";

/**
 * at-deluxe desktop 雙列遊戲列 — 對齊 slime-at99 desktop.vue GameBar 雙列
 *
 * 原作結構：
 *   <GameBar :game="gameBar[0]" />   // 捕魚
 *   <GameBar :game="gameBar[1]" />   // 真人視訊
 *   每列：標題 + 6~7 張橫向 grid，hover 浮動 + 邊框高亮
 *
 * Demo 化：
 * - 雙列分別「真人視訊」「捕魚遊戲」
 * - 6 張橫向卡 grid-cols-6 + hover glow
 */
interface GameRow {
  icon: string;
  title: string;
  titleEn: string;
  games: { img: string; name: string }[];
}

const ROWS: GameRow[] = [
  {
    icon: iconLive,
    title: "真人視訊",
    titleEn: "LIVE",
    games: [
      { img: hot1, name: "MT 真人 1" },
      { img: hot2, name: "MT 真人 2" },
      { img: hot3, name: "MT 真人 3" },
      { img: hot4, name: "MT 真人 4" },
      { img: hot5, name: "MT 真人 5" },
      { img: hot6, name: "MT 真人 6" }
    ]
  },
  {
    icon: iconFish,
    title: "捕魚遊戲",
    titleEn: "FISH",
    games: [
      { img: hot6, name: "BT 捕魚 1" },
      { img: hot5, name: "BT 捕魚 2" },
      { img: hot4, name: "BT 捕魚 3" },
      { img: hot3, name: "BT 捕魚 4" },
      { img: hot2, name: "BT 捕魚 5" },
      { img: hot1, name: "BT 捕魚 6" }
    ]
  }
];
</script>

<template>
  <section class="at-deluxe-pc-bar">
    <div class="at-deluxe-pc-bar__inner">
      <article
        v-for="(row, ri) in ROWS"
        :key="ri"
        class="at-deluxe-pc-bar__row"
      >
        <header class="at-deluxe-pc-bar__head">
          <img
            :src="row.icon"
            :alt="row.title"
            class="at-deluxe-pc-bar__icon"
          />
          <h2 class="at-deluxe-pc-bar__title">{{ row.title }}</h2>
          <span class="at-deluxe-pc-bar__title-en">{{ row.titleEn }}</span>
        </header>
        <div class="at-deluxe-pc-bar__games">
          <div
            v-for="(g, gi) in row.games"
            :key="gi"
            class="at-deluxe-pc-bar__game"
          >
            <img :src="g.img" :alt="g.name" />
            <span class="at-deluxe-pc-bar__game-name">{{ g.name }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-bar {
  padding: 16px 0 32px;
}

.at-deluxe-pc-bar__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.at-deluxe-pc-bar__row {
  background: var(--gradient-hero);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid var(--border);
}

.at-deluxe-pc-bar__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--at-deluxe-card-border);
}

.at-deluxe-pc-bar__icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.at-deluxe-pc-bar__title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--text-on-primary);
  letter-spacing: 2px;
}

.at-deluxe-pc-bar__title-en {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-01);
  letter-spacing: 3px;
  text-shadow: 0 0 6px var(--primary-01);
}

.at-deluxe-pc-bar__games {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.at-deluxe-pc-bar__game {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--at-deluxe-card-border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-surface);
  cursor: pointer;
  transition: all 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--at-deluxe-card-border-active);
    box-shadow: var(--shadow-glow);
  }

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: block;
  }
}

.at-deluxe-pc-bar__game-name {
  padding: 8px 4px;
  font-size: 12px;
  font-weight: 700;
  color: #97b6f2;
  text-align: center;
  letter-spacing: 0.5px;
}
</style>
