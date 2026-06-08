<script setup lang="ts">
import { ref } from "vue";
import iconHot from "../assets/icon/cat-hot.png?url";
import iconLive from "../assets/icon/cat-live.png?url";
import iconSlot from "../assets/icon/cat-slot.png?url";
import iconLottery from "../assets/icon/cat-lottery.png?url";
import iconSport from "../assets/icon/cat-sport.png?url";
import iconBoard from "../assets/icon/cat-board.png?url";
import iconFish from "../assets/icon/cat-fish.png?url";
import iconESport from "../assets/icon/cat-ESport.png?url";
import hot1 from "../assets/games/hot-1.png?url";
import hot2 from "../assets/games/hot-2.png?url";
import hot3 from "../assets/games/hot-3.png?url";
import hot4 from "../assets/games/hot-4.png?url";
import hot5 from "../assets/games/hot-5.png?url";
import hot6 from "../assets/games/hot-6.png?url";

/**
 * at-deluxe mobile 遊戲選單 — 對齊 slime-at99 mobile.vue 第 494-568 行 .mb-home-main
 *
 * 原作 DOM：
 *   .mb-home-main (flex / margin 10px / padding 0.6rem / relative)
 *     ul.mb-home-tab (flex column / width 90px / gap 8px / overflow auto)
 *       li.mb-home-tab--item (relative / flex center column / 漸層膠囊
 *                              背景 linear-gradient(270deg, #263557 → #3b4d71))
 *         img.mb-home-tab--img (20×20)
 *         span.mb-home-tab--text (12px)
 *       active 時切到 mb-btn-color-tabActive 樣式（彩色 icon + 高亮）
 *
 *     .mb-home-games (8 tab 中熱門時 = grid-template-columns repeat(2,1fr) /
 *                     gap 8px / height 360px / overflow auto / 隱藏 scrollbar)
 *       .mb-home-games--box (border 1px solid #485092 / border-radius 10px)
 *         .mb-home-games--top
 *           img
 *           p (中央 0.8rem / color #97b6f2 / 900 字重)
 *           .mb-home-games--hot (absolute top-left / 紅角徽 #f24a82→#c71f57)
 *
 * Demo 化：
 *   - 8 個 sidebar 分類（熱門 / 真人 / 電子 / 彩票 / 體育 / 棋牌 / 捕魚 / 電競）
 *   - hot tab 6 張卡 grid 2-col + 「熱門」紅角徽（demo 前 3 張帶 hot 標）
 *
 * icon 染色禁忌：原作 icon 是彩色 PNG，opacity 區分 active 即可
 */

interface CatItem {
  key: string;
  label: string;
  icon: string;
}

const CATEGORIES: CatItem[] = [
  { key: "hot", label: "熱門", icon: iconHot },
  { key: "live", label: "真人", icon: iconLive },
  { key: "slot", label: "電子", icon: iconSlot },
  { key: "lotto", label: "彩票", icon: iconLottery },
  { key: "sport", label: "體育", icon: iconSport },
  { key: "board", label: "棋牌", icon: iconBoard },
  { key: "fish", label: "捕魚", icon: iconFish },
  { key: "esport", label: "電競", icon: iconESport }
];

interface GameCard {
  img: string;
  text: string;
  hot?: boolean;
}

const GAME_CARDS: GameCard[] = [
  { img: hot1, text: "GT-彩票", hot: true },
  { img: hot2, text: "BT-捕魚" },
  { img: hot3, text: "ATG-棋牌", hot: true },
  { img: hot4, text: "SLOTMILL-仙境傳說", hot: true },
  { img: hot5, text: "ATG-戰神塞特" },
  { img: hot6, text: "NS-電子" }
];

const activeCategory = ref<string>("hot");
</script>

<template>
  <div class="at-deluxe-m-game">
    <!-- 左 sidebar 8 分類 -->
    <ul class="at-deluxe-m-game__sidebar">
      <li
        v-for="c in CATEGORIES"
        :key="c.key"
        class="at-deluxe-m-game__cat"
        :class="{
          'at-deluxe-m-game__cat--active': activeCategory === c.key
        }"
        @click="activeCategory = c.key"
      >
        <img :src="c.icon" :alt="c.label" class="at-deluxe-m-game__cat-icon" />
        <span class="at-deluxe-m-game__cat-label">{{ c.label }}</span>
      </li>
    </ul>

    <!-- 右側 2-col grid 卡片 -->
    <div class="at-deluxe-m-game__grid">
      <div v-for="(g, i) in GAME_CARDS" :key="i" class="at-deluxe-m-game__card">
        <div class="at-deluxe-m-game__card-img">
          <img :src="g.img" :alt="g.text" />
          <span v-if="g.hot" class="at-deluxe-m-game__card-hot">熱門</span>
        </div>
        <p class="at-deluxe-m-game__card-text">{{ g.text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .mb-home-main：flex / margin 10px / padding 0.6rem
.at-deluxe-m-game {
  display: flex;
  align-items: stretch;
  margin: 10px;
  padding: 10px;
  position: relative;
  gap: 8px;
}

// 對齊原作 .mb-home-tab：flex column / width 90px / gap 8px
.at-deluxe-m-game__sidebar {
  display: flex;
  flex-direction: column;
  width: 86px;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
  flex-shrink: 0;

  // overflow auto + 隱藏 scrollbar（對齊原作）
  max-height: 360px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

// 對齊原作 .mb-home-tab--item：relative / flex center column / 漸層膠囊 / 圓角 8px
.at-deluxe-m-game__cat {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  color: #97a8c7;
  background: var(--gradient-sidebar-cat);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;

  &:active {
    transform: scale(0.96);
  }

  &--active {
    background: var(--gradient-sidebar-cat-active);
    color: #ffffff;
    box-shadow: var(--shadow-glow);
  }
}

.at-deluxe-m-game__cat-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  opacity: 0.86;
}

.at-deluxe-m-game__cat--active .at-deluxe-m-game__cat-icon {
  opacity: 1;
}

.at-deluxe-m-game__cat-label {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
}

// 對齊原作 .mb-home-games：grid 2-col / gap 8px / height 360px / overflow auto / 隱藏 scrollbar
.at-deluxe-m-game__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  height: 360px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

// 對齊原作 .mb-home-games--box：border 1px solid #485092 / 圓角 10px
.at-deluxe-m-game__card {
  position: relative;
  border-radius: 10px;
  border: 1px solid var(--at-deluxe-card-border);
  background: var(--bg-surface);
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--at-deluxe-card-border-active);
    box-shadow: var(--shadow-glow);
  }
}

.at-deluxe-m-game__card-img {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
  }
}

// 對齊原作 .mb-home-games--hot：absolute top-left / padding 2x4 / 紅角徽 / 圓角 5 0 8 0
.at-deluxe-m-game__card-hot {
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 6px;
  background: var(--gradient-hot);
  color: #ffffff;
  font-size: 11px;
  font-weight: 900;
  border-radius: 5px 0 8px 0;
  box-shadow: var(--shadow-glow-hot);
}

// 對齊原作 .mb-home-games--text：center / padding 2px 0 / #97b6f2 / 0.8rem / 900
.at-deluxe-m-game__card-text {
  margin: 0;
  padding: 4px 6px;
  text-align: center;
  color: #97b6f2;
  font-size: 12px;
  font-weight: 900;
}
</style>
