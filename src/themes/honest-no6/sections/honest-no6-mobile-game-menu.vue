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
 * honest-no6 mobile 遊戲選單 — 對齊 honest_real no6/widgets/pages/no6/game/index.vue
 *
 * 原作結構：
 *   sidebar 7 個 sidebar-button（熱門 / 體育 / 真人 / 棋牌 / 電子 / 彩球 / 捕魚）
 *   右側 swiper 7 slide 各 8 張 .swiper-slide：每張卡用 background-image: live.png
 *     裡面有 ATG 平台 logo overlay；熱門 slide 預設啟用
 *
 * Demo 化策略：
 * - sidebar 走「圖示縮圖 + active 紫紅色背景」對齊參考圖中熱門 active 視覺
 * - 卡片 grid 2 列，每張用 live.png 當 girl model bg + ATG logo 覆蓋
 *   為了多樣化，標籤改為 ATG真人 / RSG電子 / 數位真人 / DG真人 / DG真人 / DG真人
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

interface GameCard {
  label: string;
}

// 對齊 reference 顯示的 8 張卡（標籤循環 ATG真人 / RSG電子 / 數位真人 / DG真人）
const GAME_CARDS: GameCard[] = [
  { label: "ATG真人" },
  { label: "RSG電子" },
  { label: "數位真人" },
  { label: "DG真人" },
  { label: "DG真人" },
  { label: "DG真人" }
];
</script>

<template>
  <section class="honest-no6-m-menu">
    <!-- 左 sidebar 7 cat -->
    <aside class="honest-no6-m-menu__sidebar">
      <button
        v-for="c in CATEGORIES"
        :key="c.key"
        type="button"
        class="honest-no6-m-menu__cat"
        :class="{ 'honest-no6-m-menu__cat--active': activeCategory === c.key }"
        @click="activeCategory = c.key"
      >
        <span class="honest-no6-m-menu__cat-icon">
          <img :src="c.icon" :alt="`${c.label} 圖示`" />
        </span>
        <span class="honest-no6-m-menu__cat-label">{{ c.label }}</span>
      </button>
    </aside>

    <!-- 右 cards -->
    <div class="honest-no6-m-menu__panel">
      <div class="honest-no6-m-menu__grid">
        <div
          v-for="(card, i) in GAME_CARDS"
          :key="i"
          class="honest-no6-m-menu__card"
        >
          <img
            :src="cardBg"
            alt=""
            class="honest-no6-m-menu__card-bg"
            aria-hidden="true"
          />
          <div class="honest-no6-m-menu__card-overlay">
            <img
              :src="atgLogo"
              :alt="card.label"
              class="honest-no6-m-menu__card-logo"
            />
            <div class="honest-no6-m-menu__card-label">{{ card.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.honest-no6-m-menu {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 8px;
  padding: 0 8px 12px;
}

// ─────── sidebar ───────
.honest-no6-m-menu__sidebar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.honest-no6-m-menu__cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 4px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid transparent;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 12px;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:active {
    transform: scale(0.96);
  }

  // active：紫粉 gradient bg + 白字 + 邊框金光
  // 對齊原作熱門 active 強烈高亮的視覺感
  &--active {
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border-color: var(--secondary-01);
    box-shadow: var(--shadow-glow);
  }
}

.honest-no6-m-menu__cat-icon {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.78;
    transition: opacity 0.15s ease;
  }
}

.honest-no6-m-menu__cat--active .honest-no6-m-menu__cat-icon img {
  opacity: 1;
}

// ─────── cards grid ───────
.honest-no6-m-menu__panel {
  display: flex;
  flex-direction: column;
}

.honest-no6-m-menu__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.honest-no6-m-menu__card {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}

.honest-no6-m-menu__card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.honest-no6-m-menu__card-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: var(--honest-no6-card-overlay);
}

.honest-no6-m-menu__card-logo {
  width: 50%;
  max-width: 80px;
  height: auto;
  object-fit: contain;

  // 對齊原作半透明大 logo 蓋在模特圖上的視覺
  opacity: 0.92;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
}

.honest-no6-m-menu__card-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-on-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}
</style>
