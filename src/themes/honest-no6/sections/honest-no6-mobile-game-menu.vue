<script setup lang="ts">
import { ref } from "vue";
import cardBg from "../assets/games/card-bg.png?url";
import atgLogo from "../assets/games/atg.png?url";
import iconHot from "../assets/sidebar/hot.png?url";
import iconSport from "../assets/sidebar/sport.png?url";
import iconLive from "../assets/sidebar/live.png?url";
import iconChess from "../assets/sidebar/chess.png?url";
import iconSlot from "../assets/sidebar/slot.png?url";
import iconLotto from "../assets/sidebar/lotto.png?url";
import iconFish from "../assets/sidebar/fish.png?url";

/**
 * honest-no6 mobile 遊戲選單 — 1:1 對齊 honest_real widgets/pages/no6/game/index.vue
 *
 * 原作 DOM：
 *   .game (flex / padding 0 3% / padding-bottom calc(70px+0.2rem))
 *     .sidebar (column / width 80px / overflow-y scroll)
 *       button.sidebar-button v-for cat (7 cat)
 *         <img :src="icon" /> + <span>{{ title }}</span>
 *     .main (padding-left 5px / width calc(100% - 80px))
 *       <swiper direction="vertical" pagination>
 *         <swiper-slide v-for>
 *           <div>
 *             .item v-for（**display flex 橫向**，height 157px，
 *                        backgroundImage = live.png，
 *                        左邊 50% width 25px 高 紫粉漸層 <p> 顯文字 + 圓角 5px 0 5px 0，
 *                        右邊 .logo padding 3px <img ATG.png />）
 *
 * 原作熱門 slide 7 個 item，每個都同樣結構：
 *   1) ATG電子 / 2) RSG電子 / 3) DG真人 / 4) 歐博真人 / 5/6/7) DG真人 × 3
 *
 * 7 個 cat 對應 icon：hot / sport / live / chess / slot / lotto / fish
 *
 * Demo 化重點：
 * - 7 個 item 垂直堆疊（**不是 2-col grid**）
 * - 每個 item height 157px、display flex 左右兩半（label + logo）
 * - 不對 sidebar icon 染色（原作就是彩色 icon，opacity 區分 active）
 */

interface CatItem {
  key: string;
  label: string;
  icon: string;
}

const CATEGORIES: CatItem[] = [
  { key: "hot", label: "熱門", icon: iconHot },
  { key: "sport", label: "體育", icon: iconSport },
  { key: "live", label: "真人", icon: iconLive },
  { key: "chess", label: "棋牌", icon: iconChess },
  { key: "slot", label: "電子", icon: iconSlot },
  { key: "lotto", label: "彩球", icon: iconLotto },
  { key: "fish", label: "捕魚", icon: iconFish }
];

const activeCategory = ref<string>("hot");

// 對齊原作 hot slide 內 7 個 item 的 label
const GAME_ITEMS = [
  "ATG電子",
  "RSG電子",
  "DG真人",
  "歐博真人",
  "DG真人",
  "DG真人",
  "DG真人"
];
</script>

<template>
  <div class="honest-no6-m-game">
    <!-- 左 80px sidebar -->
    <div class="honest-no6-m-game__sidebar">
      <button
        v-for="c in CATEGORIES"
        :key="c.key"
        type="button"
        class="honest-no6-m-game__cat"
        :class="{ 'honest-no6-m-game__cat--active': activeCategory === c.key }"
        @click="activeCategory = c.key"
      >
        <img :src="c.icon" :alt="c.label" class="honest-no6-m-game__cat-icon" />
        <span class="honest-no6-m-game__cat-label">{{ c.label }}</span>
      </button>
    </div>

    <!-- 右 main 7 vertical items -->
    <div class="honest-no6-m-game__main">
      <div
        v-for="(label, i) in GAME_ITEMS"
        :key="i"
        class="honest-no6-m-game__item"
        :style="{ backgroundImage: `url(${cardBg})` }"
      >
        <p class="honest-no6-m-game__item-label">{{ label }}</p>
        <div class="honest-no6-m-game__item-logo">
          <img :src="atgLogo" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .game：flex / padding 0 3%
.honest-no6-m-game {
  display: flex;
  padding: 0 3%;
}

// 對齊原作 .sidebar：80px 寬 / column / center
.honest-no6-m-game__sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  flex-shrink: 0;
}

// 對齊原作 .sidebar .item：min-width 58px / min-height 約 1rem / mb 0.2rem / 圓角 14px
.honest-no6-m-game__cat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
  min-width: 58px;
  min-height: 64px;
  padding: 8px 4px;
  background: rgba(255, 255, 255, 0.04);
  border: none;
  border-radius: 14px;
  color: #5b4f4f;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
  font-weight: 600;

  // 對齊原作 .item.active：color #fff
  &--active {
    color: #ffffff;
    background: linear-gradient(135deg, #d44ee0 0%, #6b3aa4 100%);
    box-shadow: 0 4px 12px rgba(212, 78, 224, 0.45);
  }
}

.honest-no6-m-game__cat-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  opacity: 0.78;
  transition: opacity 0.2s ease;
}

.honest-no6-m-game__cat--active .honest-no6-m-game__cat-icon {
  opacity: 1;
}

.honest-no6-m-game__cat-label {
  margin-top: 2px;
  white-space: nowrap;
  font-size: 12px;
}

// 對齊原作 .main：padding-left 5px / width calc(100% - 80px)
.honest-no6-m-game__main {
  padding-left: 5px;
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

// 對齊原作 .main .item：display flex / height 157px / background no-repeat right cover / 圓角 5px
.honest-no6-m-game__item {
  display: flex;
  height: 157px;
  background-color: #453c54;
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  border-radius: 5px;
}

// 對齊原作 p：50% 寬 / 25px 高 / linear-gradient #DE76D9→#453E97 / 圓角 5px 0 5px 0
.honest-no6-m-game__item-label {
  width: 50%;
  height: 25px;
  background: linear-gradient(to right, #de76d9, #453e97);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 5px 0;
  font-weight: bold;
  font-size: 13px;
  margin: 0 4px 0 0;
}

// 對齊原作 .logo：padding 3px / img 100% width
.honest-no6-m-game__item-logo {
  padding: 3px;
  height: 25px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    max-width: 80px;
    height: auto;
    object-fit: contain;
  }
}
</style>
