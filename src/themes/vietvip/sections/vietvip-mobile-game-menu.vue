<script setup lang="ts">
import { ref } from "vue";
// 從本 theme 自家 assets 取遊戲分類 icon（normal/selected 雙態）
import iconHot from "../assets/game/icon-hot.png?url";
import iconHotOn from "../assets/game/icon-hot-on.png?url";
import iconSport from "../assets/game/icon-sport.png?url";
import iconSportOn from "../assets/game/icon-sport-on.webp?url";
import iconLive from "../assets/game/icon-live.png?url";
import iconLiveOn from "../assets/game/icon-live-on.webp?url";
import iconChess from "../assets/game/icon-chess.png?url";
import iconChessOn from "../assets/game/icon-chess-on.webp?url";
import iconLottery from "../assets/game/icon-lottery.png?url";
import iconLotteryOn from "../assets/game/icon-lottery-on.webp?url";
import iconSlot from "../assets/game/icon-slot.png?url";
import iconSlotOn from "../assets/game/icon-slot-on.webp?url";
import iconFish from "../assets/game/icon-fish.png?url";
import iconFishOn from "../assets/game/icon-fish-on.png?url";

// 遊戲卡 placeholder（中性遊戲類別圖）
import cardSport from "../assets/game/card-sport.png?url";
import cardLive from "../assets/game/card-live.png?url";
import cardSlot from "../assets/game/card-slot.png?url";
import cardLottery from "../assets/game/card-lottery.png?url";
import cardFish from "../assets/game/card-fish.png?url";
import cardChess from "../assets/game/card-chess.png?url";

/**
 * vietvip mobile 遊戲選單
 *
 * 對齊 lilian_vietvip_web src/widgets/pages/home/game/index.vue 結構：
 * - 左 sidebar：18% 寬，垂直堆疊 7 個分類（熱門 / 體育 / 真人 / 棋牌 / 彩票 / 電子 / 捕魚）
 * - 右 main：82% 寬，每個分類對應一行橫向滾動的遊戲卡
 *
 * 原專案 sidebar 用 backbround_left_menu_active2.svg 當 active 背景，
 * 我們改用「金漸層 + inset 白邊」對齊 vietvip 紅金主題；
 * normal 狀態用「半透紅底 + 金描邊」維持與卡片整體調性
 *
 * 為什麼右側遊戲卡用既有 placeholder 圖：
 * - 原專案的 api_placeholder_*_single.png 本來就是 demo 用 placeholder
 * - 設計含意明確（足球 / 撲克牌 / 拉霸 / 魚 等 silhouette）
 * - 圖檔本身白底彩字，落在紅金卡片內仍清晰
 */

interface CatItem {
  key: string;
  label: string;
  icon: string;
  iconOn: string;
}

interface GameItem {
  key: string;
  label: string;
  image: string;
  category: string;
}

const cats: CatItem[] = [
  { key: "hot", label: "熱門", icon: iconHot, iconOn: iconHotOn },
  { key: "sport", label: "體育", icon: iconSport, iconOn: iconSportOn },
  { key: "live", label: "真人", icon: iconLive, iconOn: iconLiveOn },
  { key: "chess", label: "棋牌", icon: iconChess, iconOn: iconChessOn },
  { key: "lottery", label: "彩票", icon: iconLottery, iconOn: iconLotteryOn },
  { key: "slot", label: "電子", icon: iconSlot, iconOn: iconSlotOn },
  { key: "fish", label: "捕魚", icon: iconFish, iconOn: iconFishOn }
];

// 每個分類各擺 4 張遊戲卡示意（橫向 scroll）
const gamesByCategory: Record<string, GameItem[]> = {
  hot: [
    { key: "hot-1", label: "皇牌體育", image: cardSport, category: "hot" },
    { key: "hot-2", label: "AG 真人", image: cardLive, category: "hot" },
    { key: "hot-3", label: "PG 電子", image: cardSlot, category: "hot" },
    { key: "hot-4", label: "JDB 捕魚", image: cardFish, category: "hot" }
  ],
  sport: [
    { key: "sport-1", label: "沙巴體育", image: cardSport, category: "sport" },
    { key: "sport-2", label: "皇牌體育", image: cardSport, category: "sport" },
    { key: "sport-3", label: "BTI 體育", image: cardSport, category: "sport" }
  ],
  live: [
    { key: "live-1", label: "AG 真人", image: cardLive, category: "live" },
    { key: "live-2", label: "DG 真人", image: cardLive, category: "live" },
    { key: "live-3", label: "EVO 真人", image: cardLive, category: "live" }
  ],
  chess: [
    { key: "chess-1", label: "MT 棋牌", image: cardChess, category: "chess" },
    { key: "chess-2", label: "VS 棋牌", image: cardChess, category: "chess" }
  ],
  lottery: [
    {
      key: "lottery-1",
      label: "VR 彩票",
      image: cardLottery,
      category: "lottery"
    },
    {
      key: "lottery-2",
      label: "TC 彩票",
      image: cardLottery,
      category: "lottery"
    }
  ],
  slot: [
    { key: "slot-1", label: "PG 電子", image: cardSlot, category: "slot" },
    { key: "slot-2", label: "PT 電子", image: cardSlot, category: "slot" },
    { key: "slot-3", label: "BNG 電子", image: cardSlot, category: "slot" }
  ],
  fish: [
    { key: "fish-1", label: "JDB 捕魚", image: cardFish, category: "fish" },
    { key: "fish-2", label: "BNG 捕魚", image: cardFish, category: "fish" }
  ]
};

const activeCat = ref<string>("hot");

function pickCat(key: string): void {
  activeCat.value = key;
  // 平滑 scroll 到對應分類
  const target = document.getElementById(`vietvip-game-${key}`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
</script>

<template>
  <section class="vietvip-m-game" aria-label="遊戲選單">
    <!-- 左側：7 分類 sidebar -->
    <nav class="vietvip-m-game__side" aria-label="遊戲分類">
      <button
        v-for="c in cats"
        :key="c.key"
        type="button"
        class="vietvip-m-game__cat"
        :class="{ 'vietvip-m-game__cat--active': activeCat === c.key }"
        :aria-pressed="activeCat === c.key"
        @click="pickCat(c.key)"
      >
        <span class="vietvip-m-game__cat-ico" aria-hidden="true">
          <img
            :src="activeCat === c.key ? c.iconOn : c.icon"
            :alt="`${c.label} 圖示`"
          />
        </span>
        <span class="vietvip-m-game__cat-lbl">{{ c.label }}</span>
      </button>
    </nav>

    <!-- 右側：分類滾動列表 -->
    <div class="vietvip-m-game__main">
      <div
        v-for="c in cats"
        :id="`vietvip-game-${c.key}`"
        :key="c.key"
        class="vietvip-m-game__group"
      >
        <header class="vietvip-m-game__group-header">
          <span class="vietvip-m-game__group-title">{{ c.label }}</span>
          <span class="vietvip-m-game__group-line" aria-hidden="true" />
        </header>
        <ul class="vietvip-m-game__list" role="list">
          <li
            v-for="g in gamesByCategory[c.key]"
            :key="g.key"
            class="vietvip-m-game__card"
          >
            <div class="vietvip-m-game__card-image">
              <img :src="g.image" :alt="g.label" loading="lazy" />
            </div>
            <span class="vietvip-m-game__card-label">{{ g.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊 lilian_vietvip_web .game 結構：display flex / sidebar 18% / main 82%
.vietvip-m-game {
  display: flex;
  gap: 8px;
  margin: 14px 12px 0;
  padding: 12px 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border-radius: 16px;

  // ─────── sidebar 7 分類（垂直堆疊） ───────
  &__side {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: none;
    width: 76px;
    padding-left: 6px;
  }

  // 單張分類卡（對齊原專案 .game .sidebar .item）
  &__cat {
    position: relative;
    padding: 6px 4px;
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 12px;
    background: linear-gradient(
      180deg,
      rgba(74, 15, 29, 0.65) 0%,
      rgba(42, 6, 15, 0.85) 100%
    );
    color: var(--vietvip-gold-1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    transition:
      transform 0.15s ease,
      background 0.15s ease,
      box-shadow 0.15s ease;

    &:active {
      transform: scale(0.95);
    }

    // active 狀態：金漸層底 + 深紅字
    // 對齊原專案 background_left_menu_active2.svg 的「金色 active 卡」視覺
    &--active {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      box-shadow:
        0 4px 12px rgba(199, 154, 69, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
  }

  &__cat-ico {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__cat-ico img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__cat-lbl {
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.3px;
  }

  // ─────── 右側遊戲卡列表 ───────
  &__main {
    flex: 1;
    min-width: 0;
    padding-right: 6px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 4px 6px;
  }

  &__group-title {
    flex: none;
    font-size: 15px;
    font-weight: 800;
    color: var(--vietvip-gold-1);
    letter-spacing: 0.5px;
    font-family: var(--font-display);
  }

  // 標題右側的金色細線（對齊 vietvip-divider token 視覺）
  &__group-line {
    flex: 1;
    height: 1px;
    background: var(--vietvip-divider);
  }

  // 橫向 scroll 遊戲卡列表
  &__list {
    margin: 0;
    padding: 0 4px 4px;
    list-style: none;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__card {
    flex: none;
    width: 100px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-surface);
    border: 1px solid var(--vietvip-gold-2);
    box-shadow:
      0 4px 12px var(--vietvip-card-glow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.96);
    }
  }

  &__card-image {
    width: 100%;
    aspect-ratio: 1;
    background: linear-gradient(
      180deg,
      var(--secondary-09) 0%,
      var(--secondary-10) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  &__card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-label {
    padding: 6px 8px 8px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-01);
    line-height: 1.2;
  }
}
</style>
