<script setup lang="ts">
import { ref } from "vue";
import logoKu from "../assets/games/logo-ku.svg?url";
import logoDg from "../assets/games/logo-dg.png?url";
import logoLaliga from "../assets/games/logo-laliga.svg?url";
import logoCi from "../assets/games/logo-ci.svg?url";
import bgHot1 from "../assets/games/bg-hot-1.png?url";
import bgHot2 from "../assets/games/bg-hot-2.png?url";
import bgHot3 from "../assets/games/bg-hot-3.png?url";
import bgHot4 from "../assets/games/bg-hot-4.png?url";
import bgExtra from "../assets/games/bg-extra.png?url";
import charHot1 from "../assets/games/char-hot-1.png?url";
import charHot2 from "../assets/games/char-hot-2.png?url";
import charHot3 from "../assets/games/char-hot-3.png?url";
import charHot4 from "../assets/games/char-hot-4.png?url";
import charExtra from "../assets/games/char-extra.png?url";
import badgeHot from "../assets/games/badge-hot.svg?url";
import iconLive from "../assets/sidebar/live.png?url";
import iconEgame from "../assets/sidebar/egame.png?url";
import iconSport from "../assets/sidebar/sport.png?url";
import iconLottery from "../assets/sidebar/lottery.png?url";
import iconEsport from "../assets/sidebar/esport.png?url";
import iconChess from "../assets/sidebar/chess.png?url";

/**
 * honest-max mobile 遊戲選單 — 對齊 honest_real max/widgets/pages/max/game/index.vue
 *
 * 原作結構：
 *   左側 .sidebar 7 分類垂直 button（真人/電子/體育/彩球/捕魚/對戰/電競）
 *     每個 button：icon + active 對應 icon_focus（活躍狀態切色）+ 文字
 *   右側 swiper 垂直滑動 7 個 slide：
 *     首屏熱門 slide 共有 4 個「hot 卡」（hots[]）= 2x2 grid
 *       每張卡：platform_bg_img 大色塊背景 + platform_logo（KU 字樣大 logo）+ platform_img（人物角色）+ 可選 super_bonus 角章
 *     接著 1 張 hot_draws「迪迦抽 1 億」獎品圖
 *     接著 platform_mode_5 兩張：免費電影紫色塊 + 五大聯賽西甲 La Liga 卡
 *
 * Demo 化策略：
 * - sidebar 7 button：用原作每個 cat 色（粉/綠/紅/藍/紫/橙/青）做色塊背景，active 加 box-shadow
 * - hot 卡 2x2 grid：直接複用 bg-hot-1..4.png + char-hot-1..4.png + logo-ku.svg
 * - 額外卡：bg-extra.png + char-extra.png 顯示「迪迦抽 1 億」
 * - 免費電影 / 西甲 卡放到 hot 區下方
 */

interface CatItem {
  key: string;
  label: string;
  icon: string;
  catVar: string;
}

const CATEGORIES: CatItem[] = [
  {
    key: "live",
    label: "真人",
    icon: iconLive,
    catVar: "--honest-max-cat-live"
  },
  {
    key: "slot",
    label: "電子",
    icon: iconEgame,
    catVar: "--honest-max-cat-slot"
  },
  {
    key: "sport",
    label: "體育",
    icon: iconSport,
    catVar: "--honest-max-cat-sport"
  },
  {
    key: "lottery",
    label: "彩球",
    icon: iconLottery,
    catVar: "--honest-max-cat-lottery"
  },
  {
    key: "fish",
    label: "捕魚",
    icon: iconChess,
    catVar: "--honest-max-cat-fish"
  },
  {
    key: "versus",
    label: "對戰",
    icon: iconEsport,
    catVar: "--honest-max-cat-versus"
  },
  {
    key: "esport",
    label: "電競",
    icon: iconEsport,
    catVar: "--honest-max-cat-esport"
  }
];

const activeCategory = ref<string>("live");

interface HotCard {
  msg: string;
  logo: string;
  bg: string;
  char: string;
  showBadge?: boolean;
}

// 對齊原作 hots[]：KU真人 / 3D電子 / KU體育 / KU彩球
const HOT_CARDS: HotCard[] = [
  { msg: "KU真人", logo: logoKu, bg: bgHot1, char: charHot1, showBadge: true },
  { msg: "3D電子", logo: logoKu, bg: bgHot2, char: charHot2 },
  { msg: "KU體育", logo: logoKu, bg: bgHot3, char: charHot3 },
  { msg: "KU彩球", logo: logoKu, bg: bgHot4, char: charHot4 }
];

const EXTRA_TITLE = "加碼 邀請抽一億";
</script>

<template>
  <section class="honest-max-m-menu">
    <!-- 左 sidebar -->
    <aside class="honest-max-m-menu__sidebar">
      <button
        v-for="c in CATEGORIES"
        :key="c.key"
        type="button"
        class="honest-max-m-menu__cat"
        :class="{ 'honest-max-m-menu__cat--active': activeCategory === c.key }"
        :style="{ '--cat-color': `var(${c.catVar})` }"
        @click="activeCategory = c.key"
      >
        <span class="honest-max-m-menu__cat-icon">
          <img :src="c.icon" :alt="`${c.label} 圖示`" />
        </span>
        <span class="honest-max-m-menu__cat-label">{{ c.label }}</span>
      </button>
    </aside>

    <!-- 右 cards panel -->
    <div class="honest-max-m-menu__panel">
      <div class="honest-max-m-menu__grid">
        <div
          v-for="(card, i) in HOT_CARDS"
          :key="i"
          class="honest-max-m-menu__card"
        >
          <img
            :src="card.bg"
            alt=""
            class="honest-max-m-menu__card-bg"
            aria-hidden="true"
          />
          <div class="honest-max-m-menu__card-text">
            <div class="honest-max-m-menu__card-msg">
              <strong>{{ card.msg }}</strong>
            </div>
            <img
              :src="card.logo"
              :alt="`${card.msg} logo`"
              class="honest-max-m-menu__card-logo"
            />
          </div>
          <img
            :src="card.char"
            alt=""
            class="honest-max-m-menu__card-char"
            aria-hidden="true"
          />
          <img
            v-if="card.showBadge"
            :src="badgeHot"
            alt="HOT"
            class="honest-max-m-menu__card-badge"
          />
        </div>
      </div>

      <!-- 額外卡：迪迦抽 1 億 -->
      <div class="honest-max-m-menu__extra-card">
        <img
          :src="bgExtra"
          alt=""
          class="honest-max-m-menu__extra-bg"
          aria-hidden="true"
        />
        <img
          :src="charExtra"
          alt=""
          class="honest-max-m-menu__extra-char"
          aria-hidden="true"
        />
        <div class="honest-max-m-menu__extra-text">
          <span>{{ EXTRA_TITLE }}</span>
        </div>
      </div>

      <!-- 免費電影紫卡 + 西甲卡 -->
      <div class="honest-max-m-menu__split-grid">
        <div class="honest-max-m-menu__purple-card">
          <span>免費電影</span>
          <img
            :src="logoCi"
            alt="CI"
            class="honest-max-m-menu__purple-card-logo"
          />
        </div>
        <div class="honest-max-m-menu__purple-card">
          <span>
            <strong>五大聯賽西甲</strong><br />
            官方合作夥伴
          </span>
          <img
            :src="logoLaliga"
            alt="La Liga"
            class="honest-max-m-menu__purple-card-logo"
          />
        </div>
      </div>

      <!-- 切換版本 + DG 真人小卡 -->
      <div class="honest-max-m-menu__switch-row">
        <div class="honest-max-m-menu__switch-pill">免費電影</div>
        <div
          class="honest-max-m-menu__switch-pill honest-max-m-menu__switch-pill--brand"
        >
          切換版本
        </div>
        <div class="honest-max-m-menu__switch-dg">
          <img
            :src="logoDg"
            alt="DG"
            class="honest-max-m-menu__switch-dg-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.honest-max-m-menu {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 8px;
  padding: 4px 8px 12px;
}

// ─────── sidebar ───────
.honest-max-m-menu__sidebar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

// 每個 cat button 走 CSS var 變色（白底 + active 色邊 + icon 染色）
// 對齊原作 sidebar：未 active 灰色 / active 顯彩色
.honest-max-m-menu__cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 4px;
  background: var(--honest-max-cat-bg);
  border: none;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  transition:
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:active {
    transform: scale(0.96);
  }

  &--active {
    color: var(--cat-color);
    box-shadow:
      0 0 0 2px var(--cat-color),
      var(--shadow-md);
  }
}

.honest-max-m-menu__cat-icon {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // icon 是黑色 silhouette，需要染成 cat-color
  // 不直接套 mix-blend-mode（會被白底吃掉），改用 mask filter 染色
  // 為什麼用 mask + currentColor：保留 silhouette 形狀讓配色完全跟動 CSS var
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.55;
    transition: opacity 0.2s ease;
  }
}

.honest-max-m-menu__cat--active .honest-max-m-menu__cat-icon img {
  opacity: 1;
}

.honest-max-m-menu__cat-label {
  font-size: 12px;
  line-height: 1.2;
}

// ─────── hot cards 2x2 grid ───────
.honest-max-m-menu__panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.honest-max-m-menu__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.honest-max-m-menu__card {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: var(--honest-max-card-pink);
  box-shadow: var(--shadow-md);
}

.honest-max-m-menu__card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.honest-max-m-menu__card-text {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.honest-max-m-menu__card-msg {
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}

.honest-max-m-menu__card-logo {
  width: 42px;
  height: auto;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 6px;
  padding: 3px 6px;
}

.honest-max-m-menu__card-char {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80%;
  height: auto;
  object-fit: contain;
  z-index: 2;
}

.honest-max-m-menu__card-badge {
  position: absolute;
  right: 4px;
  top: 4px;
  width: 32px;
  height: 32px;
  z-index: 4;
}

// ─────── 額外卡（橫向長條） ───────
.honest-max-m-menu__extra-card {
  position: relative;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--honest-max-card-purple);
  box-shadow: var(--shadow-md);
}

.honest-max-m-menu__extra-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.honest-max-m-menu__extra-char {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  width: auto;
  object-fit: contain;
  z-index: 2;
}

.honest-max-m-menu__extra-text {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

// ─────── 紫色雙卡（免費電影 / 西甲） ───────
.honest-max-m-menu__split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.honest-max-m-menu__purple-card {
  position: relative;
  min-height: 70px;
  padding: 10px;
  background: var(--honest-max-card-purple);
  border-radius: 10px;
  color: #ffffff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}

// 拆出來而非嵌套 img：避免 stylelint no-descending-specificity 與上方 active icon 規則衝突
.honest-max-m-menu__purple-card-logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 6px;
  padding: 3px;
}

// ─────── 切換版本列 + DG 小卡 ───────
.honest-max-m-menu__switch-row {
  display: grid;
  grid-template-columns: 1fr 1fr 80px;
  gap: 8px;
  align-items: center;
}

.honest-max-m-menu__switch-pill {
  height: 36px;
  border-radius: 18px;
  background: var(--bg-surface);
  color: var(--text-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  &--brand {
    background: var(--gradient-cta);
    color: #ffffff;
  }
}

.honest-max-m-menu__switch-dg {
  height: 36px;
  border-radius: 8px;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

// 拆出避免 specificity 排序問題
.honest-max-m-menu__switch-dg-img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}
</style>
