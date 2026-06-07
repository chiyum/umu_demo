<script setup lang="ts">
import { ref } from "vue";
import hot1 from "../assets/hot/hot-1.png?url";
import hot2 from "../assets/hot/hot-2.png?url";
import hot3 from "../assets/hot/hot-3.png?url";
import hot4 from "../assets/hot/hot-4.png?url";
import hot5 from "../assets/hot/hot-5.png?url";

/**
 * honest-at mobile 遊戲選單 — 1:1 對齊 honest_real widgets/pages/at/game.vue
 *
 * 原作 DOM：
 *   .at-game (grid-template-columns: 25% 75%)
 *     .at-game-category
 *       .at-game-category-item--hot.active
 *       .at-game-category-item--live
 *       .at-game-category-item--slot
 *       .at-game-category-item--lottery
 *       .at-game-category-item--chess
 *       .at-game-category-item--fish
 *       .at-game-category-item--sport
 *         （每個 item 75×75 / linear-gradient bg / ::before icon + active 動畫 / ::after border）
 *     .at-game-list
 *       <swiper> 7 slide
 *         slide 1 (hot)：
 *           .at-game-list-slide-hot
 *             [5 個 hot-item]
 *               .at-game-list-slide-hot-box (170px / dark gradient + ::before border)
 *                 .at-game-list-slide-hot-box-content (圓 radial 內含 img)
 *               .at-game-list-slide-hot-label (cap top → cyan gradient text)
 *
 * 沒有「切換版本」「粉絲專頁」「活動中心」這些卡 — 那些是原作 hot-link 區（小膠囊），
 * 但因為原作 hot 卡有 5 個會塞滿兩列+1，hot-link 是放在第六格的小膠囊
 * 為了 demo 簡化，先不渲染這塊（hot-link 在原作裡是滿小很丟在右下，視覺上不重要）
 *
 * 7 個 cat 與對應 icon 來源（從原作 SCSS 抓）：
 *   hot: normal 10129.png / active 10112.png
 *   live: normal 10109.png / active 10108.png
 *   slot: normal 10111.png / active 10110.png
 *   lottery: normal 10105.png / active lottery_a.png
 *   chess: normal 10106.png / active board_a.png
 *   fish: normal 10107.png / active fish_a.png
 *   sport: normal 10104.png / active sport_a.png
 */

interface Category {
  key: string;
  label: string;
  icon: string;
  activeIcon: string;
}

// 用 import.meta.glob 動態載入 14 個 icon（避免寫 14 行 import）
const iconUrls = import.meta.glob<string>("../assets/games/*.png", {
  eager: true,
  import: "default",
  query: "?url"
});

function urlFor(name: string): string {
  // glob key 是 "../assets/games/<name>"，找對應 URL
  return iconUrls[`../assets/games/${name}`] ?? "";
}

const CATEGORIES: Category[] = [
  {
    key: "hot",
    label: "熱門",
    icon: urlFor("10129.png"),
    activeIcon: urlFor("10112.png")
  },
  {
    key: "live",
    label: "真人",
    icon: urlFor("10109.png"),
    activeIcon: urlFor("10108.png")
  },
  {
    key: "slot",
    label: "電子",
    icon: urlFor("10111.png"),
    activeIcon: urlFor("10110.png")
  },
  {
    key: "lottery",
    label: "彩票",
    icon: urlFor("10105.png"),
    activeIcon: urlFor("lottery_a.png")
  },
  {
    key: "chess",
    label: "棋牌",
    icon: urlFor("10106.png"),
    activeIcon: urlFor("board_a.png")
  },
  {
    key: "fish",
    label: "捕魚",
    icon: urlFor("10107.png"),
    activeIcon: urlFor("fish_a.png")
  },
  {
    key: "sport",
    label: "體育",
    icon: urlFor("10104.png"),
    activeIcon: urlFor("sport_a.png")
  }
];

const activeCategory = ref<string>("hot");

// 5 個 hot 卡（對齊原作 HOT_LIST）
const HOT_ITEMS = [
  { icon: hot1, label: "AT-體育" },
  { icon: hot2, label: "DG-真人" },
  { icon: hot3, label: "ATG-電子" },
  { icon: hot4, label: "ATG-麻將" },
  { icon: hot5, label: "AG-戰神塞特" }
];
</script>

<template>
  <div class="honest-at-m-game">
    <!-- 左 25% category 7 cat -->
    <div class="honest-at-m-game__category">
      <div
        v-for="c in CATEGORIES"
        :key="c.key"
        class="honest-at-m-game__cat"
        :class="{ 'honest-at-m-game__cat--active': activeCategory === c.key }"
        @click="activeCategory = c.key"
      >
        <img
          :src="activeCategory === c.key ? c.activeIcon : c.icon"
          :alt="c.label"
          class="honest-at-m-game__cat-icon"
        />
        <div class="honest-at-m-game__cat-label">{{ c.label }}</div>
      </div>
    </div>

    <!-- 右 75% slide（hot 5 卡 + 1 hot-link 第六格） -->
    <div class="honest-at-m-game__list">
      <div class="honest-at-m-game__slide">
        <div
          v-for="(item, i) in HOT_ITEMS"
          :key="i"
          class="honest-at-m-game__hot-item"
        >
          <div class="honest-at-m-game__hot-box">
            <div class="honest-at-m-game__hot-box-content">
              <img :src="item.icon" :alt="item.label" />
            </div>
          </div>
          <div class="honest-at-m-game__hot-label">{{ item.label }}</div>
        </div>
        <!-- 對齊原作第 6 格 hot-link：上下兩個小膠囊「粉絲專頁」「活動中心」 -->
        <div class="honest-at-m-game__hot-link">
          <div class="honest-at-m-game__hot-link-row">
            <span>粉絲專頁</span>
          </div>
          <div class="honest-at-m-game__hot-link-row">
            <span>活動中心</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .at-game：grid-template-columns 25% 75%
.honest-at-m-game {
  display: grid;
  grid-template-columns: 25% 75%;
  padding: 0 4px;
}

// ─────── category 7 cat ───────
// 對齊原作 .at-game-category：column / center / gap 0.8rem / pt 0.5rem
.honest-at-m-game__category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding-top: 0.5rem;
}

// 對齊原作 .at-game-category-item：75×75 / 圓角 14px / dark gradient bg / 中央 icon + label
.honest-at-m-game__cat {
  position: relative;
  width: 75px;
  height: 75px;
  min-width: 75px;
  min-height: 75px;
  max-width: 75px;
  max-height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 9px;
  border-radius: 14px;
  background: linear-gradient(
    90deg,
    rgba(3, 3, 3, 0.3) 0%,
    rgba(51, 66, 107, 0.6) 100%
  );
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: filter 0.2s ease;

  // 對齊原作 ::after：圓角 14px / 漸層描邊（border-box mask trick）
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 14px;
    border: 2px solid transparent;
    background: linear-gradient(270deg, #263557 0%, #3b4d71 100%) border-box;
    mask:
      linear-gradient(#ffffff 0 0) padding-box,
      linear-gradient(#ffffff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &--active {
    filter: brightness(1.18);
  }
}

.honest-at-m-game__cat-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-left: 3px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.honest-at-m-game__cat--active .honest-at-m-game__cat-icon {
  animation: honest-at-game-active 0.8s ease-out infinite;
}

.honest-at-m-game__cat-label {
  font-size: 12px;
  color: #ffffff;
  line-height: 1.2;
  margin-top: 2px;
}

// ─────── slide 5 hot cards ───────
// 對齊原作 .at-game-list-slide-hot：grid 2 col
.honest-at-m-game__list {
  height: 100%;
}

.honest-at-m-game__slide {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  padding: 0 4px;
}

.honest-at-m-game__hot-item {
  position: relative;
  height: 170px;
}

// 對齊原作 .at-game-list-slide-hot-box：170px / 圓角 8px / dark gradient
.honest-at-m-game__hot-box {
  position: relative;
  height: 170px;
  border-radius: 8px;
  background: linear-gradient(180deg, #191d43 47.77%, #191b2c 100%);
  padding: 4px 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  // 對齊原作 ::before：圓角 8px / 漸層描邊
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 8px;
    border: 2px solid transparent;
    background: linear-gradient(180deg, #343c56 0%, #191919 93.54%) border-box;
    mask:
      linear-gradient(#ffffff 0 0) padding-box,
      linear-gradient(#ffffff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

// 對齊原作 .at-game-list-slide-hot-box-content：80% 高 / 圓角 4px / cyan radial
.honest-at-m-game__hot-box-content {
  position: relative;
  width: 100%;
  height: 80%;
  border-radius: 4px;
  background: radial-gradient(
    103.07% 103.07% at 50% 22.13%,
    #78efff 0%,
    #435b99 50%,
    #192458 100%
  );
  box-shadow: 0 0 8px 0 #1856ff;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    border: 2px solid transparent;
    background: linear-gradient(180deg, #63ffff 0%, #19262f 100%) border-box;
    mask:
      linear-gradient(#ffffff 0 0) padding-box,
      linear-gradient(#ffffff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    z-index: 1;
    pointer-events: none;
  }

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

// 對齊原作 .at-game-list-slide-hot-label：absolute bottom 0 / cyan gradient text
.honest-at-m-game__hot-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 0;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
  background: linear-gradient(180deg, #b2c6d8 0%, #69ffff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

// 對齊原作 .at-game-list-slide-hot-link：第 6 格 hot-link，
// 內含上下兩格小膠囊，每格 50% 高，dark radial gradient + 金邊 / cyan-yellow gradient text
.honest-at-m-game__hot-link {
  position: relative;
  height: 170px;
  display: flex;
  flex-direction: column;
}

.honest-at-m-game__hot-link-row {
  position: relative;
  flex: 1;
  margin: 2px 0;
  border-radius: 4px;
  background: radial-gradient(
    79.62% 100% at 53.93% 100%,
    rgba(25, 27, 45, 0.7) 0.62%,
    rgba(25, 48, 91, 0.7) 100%
  );
  backdrop-filter: blur(15px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 4px;
    border-radius: 4px;
    background: radial-gradient(
      111.95% 100.14% at 50.02% -0.67%,
      rgba(108, 179, 255, 0.2) 0%,
      rgba(17, 58, 112, 0.55) 54.06%,
      #191e30 100%
    );
  }

  span {
    position: relative;
    z-index: 2;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    background: linear-gradient(180deg, #b2c6d8 0%, #69ffff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

// 對齊原作 game-active：上下漂浮動畫
@keyframes honest-at-game-active {
  0% {
    transform: translateY(-3px);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-3px);
  }
}
</style>
