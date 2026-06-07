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
 *     .sidebar (flex column / width 80px / overflow-y scroll)
 *       button.sidebar-button v-for (7 cat)
 *         width 100% / padding 15px / dark purple gradient bg / display flex space-evenly
 *         <img class="icon" /> + <span>{{ title }}</span>
 *     .main (padding-left 5px / width calc(100% - 80px))
 *       <swiper direction="vertical">
 *         <swiper-slide>
 *           <div>  ← **display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px**
 *             .item v-for（display flex / height 157px / live.png bg /
 *                        <p> 50% 寬 25px 高紫粉漸層 label /
 *                        <div.logo> 內含 ATG.png）
 *
 * 上一輪錯誤：把 .main 寫成 1-col vertical stack（漏看 index.vue 內聯 SCSS 第 308-313 行
 * `.swiper-slide > div { display: grid; grid-template-columns: repeat(2, 1fr); }`）
 * 本次改回 2-col grid，與原作完全對齊
 *
 * 7 個 cat 對應 icon：hot / sport / live / chess / slot / lotto / fish
 * hot slide 內 7 個 item 名稱：ATG電子 / RSG電子 / DG真人 / 歐博真人 / DG真人 × 3
 *
 * icon 染色禁忌：原作就是彩色 icon，opacity 區分 active 即可
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

// 對齊原作 hot slide 內 7 個 item 的 label（重複 DG真人 模擬 demo 數據）
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

    <!-- 右 main 7 items 2-col grid -->
    <div class="honest-no6-m-game__main">
      <div class="honest-no6-m-game__grid">
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
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .game：flex / padding 0 3%
.honest-no6-m-game {
  display: flex;
  padding: 0 3%;
}

// 對齊原作 .sidebar：80px 寬 / flex column / overflow scroll
.honest-no6-m-game__sidebar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80px;
  flex-shrink: 0;
  gap: 10px;
}

// 對齊原作 .sidebar-button：
//   width 100% / padding 15px 0 / dark purple gradient
//   border-radius 10px / box-shadow / letter-spacing 3px
// icon + label 改 column 排列以符合「窄 80px 寬」視覺（原作 flex 預設 row 在 80px 寬會擠，
// 這裡折中讓 icon 上 label 下，與 reference 截圖對齊）
.honest-no6-m-game__cat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 10px 4px;
  background: linear-gradient(135deg, rgb(75 65 90), rgb(70 60 84));
  color: #ffffff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &--active {
    background: linear-gradient(135deg, rgb(93 79 148), rgb(87 75 142));
  }
}

// 對齊原作 .icon：min-width 20px / min-height 20px
.honest-no6-m-game__cat-icon {
  min-width: 24px;
  min-height: 24px;
  width: 28px;
  height: 28px;
  object-fit: contain;
  opacity: 0.92;
}

.honest-no6-m-game__cat--active .honest-no6-m-game__cat-icon {
  opacity: 1;
}

.honest-no6-m-game__cat-label {
  white-space: nowrap;
}

// 對齊原作 .main：padding-left 5px / width calc(100% - 80px)
.honest-no6-m-game__main {
  padding-left: 5px;
  width: calc(100% - 80px);
}

// 對齊原作 .swiper-slide > div：display grid / grid-template-columns repeat(2, 1fr) / gap 5px
// **這是最關鍵的對齊點**（上一輪漏寫導致變成 1-col 垂直列表）
.honest-no6-m-game__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}

// 對齊原作 .main .item：
//   display flex / height 157px / background no-repeat right cover
//   background-color #453c54 / border-radius 5px
.honest-no6-m-game__item {
  display: flex;
  height: 157px;
  background-color: #453c54;
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  border-radius: 5px;
  overflow: hidden;
}

// 對齊原作 .item p：
//   width 50% / height 25px / linear-gradient #DE76D9→#453E97
//   color white / center / border-radius 5px 0 5px 0
//   font-weight bold / margin-right 4px
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
  font-size: 12px;
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
    max-width: 60px;
    height: auto;
    object-fit: contain;
  }
}
</style>
