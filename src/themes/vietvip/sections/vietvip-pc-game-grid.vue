<script setup lang="ts">
import { ref } from "vue";
// 從本 theme 自家 assets 取分類 icon + 卡片 placeholder
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

import cardSport from "../assets/game/card-sport.png?url";
import cardLive from "../assets/game/card-live.png?url";
import cardSlot from "../assets/game/card-slot.png?url";
import cardLottery from "../assets/game/card-lottery.png?url";
import cardFish from "../assets/game/card-fish.png?url";
import cardChess from "../assets/game/card-chess.png?url";

/**
 * vietvip PC 遊戲區 — 左 sidebar 7 分類 + 右遊戲卡格狀網格
 *
 * 與 mobile 結構同骨架，但 PC 版以「縱列 sidebar + 4 column grid」展開：
 * - sidebar 寬 130px：分類卡縱列堆疊（與 mobile 同設計語言但放大尺寸）
 * - main grid：4 列 × 多行的卡片網格（mobile 是橫向 scroll、PC 改 grid 更易導覽）
 *
 * 為什麼 PC 改 grid 而非沿用橫向 scroll：
 * - PC viewport 寬，橫向 scroll 浪費版面（卡片只顯示一行）
 * - grid 一次顯示 4×N 多張卡片，配合大型 hover 動畫呈現「VIP 廳堂遊戲牆」感
 * - 與 ant-sport tabs / tycoon 縱列卡片區隔，建立 vietvip 自己的識別
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

const gamesByCategory: Record<string, GameItem[]> = {
  hot: [
    { key: "h1", label: "皇牌體育", image: cardSport },
    { key: "h2", label: "AG 真人", image: cardLive },
    { key: "h3", label: "PG 電子", image: cardSlot },
    { key: "h4", label: "JDB 捕魚", image: cardFish },
    { key: "h5", label: "MT 棋牌", image: cardChess },
    { key: "h6", label: "VR 彩票", image: cardLottery },
    { key: "h7", label: "BTI 體育", image: cardSport },
    { key: "h8", label: "EVO 真人", image: cardLive }
  ],
  sport: [
    { key: "s1", label: "沙巴體育", image: cardSport },
    { key: "s2", label: "皇牌體育", image: cardSport },
    { key: "s3", label: "BTI 體育", image: cardSport },
    { key: "s4", label: "BBin 體育", image: cardSport }
  ],
  live: [
    { key: "l1", label: "AG 真人", image: cardLive },
    { key: "l2", label: "DG 真人", image: cardLive },
    { key: "l3", label: "EVO 真人", image: cardLive },
    { key: "l4", label: "WM 真人", image: cardLive }
  ],
  chess: [
    { key: "c1", label: "MT 棋牌", image: cardChess },
    { key: "c2", label: "VS 棋牌", image: cardChess },
    { key: "c3", label: "BOLE 棋牌", image: cardChess }
  ],
  lottery: [
    { key: "lo1", label: "VR 彩票", image: cardLottery },
    { key: "lo2", label: "TC 彩票", image: cardLottery },
    { key: "lo3", label: "GW 彩票", image: cardLottery }
  ],
  slot: [
    { key: "sl1", label: "PG 電子", image: cardSlot },
    { key: "sl2", label: "PT 電子", image: cardSlot },
    { key: "sl3", label: "BNG 電子", image: cardSlot },
    { key: "sl4", label: "RSG 電子", image: cardSlot }
  ],
  fish: [
    { key: "f1", label: "JDB 捕魚", image: cardFish },
    { key: "f2", label: "BNG 捕魚", image: cardFish }
  ]
};

const activeCat = ref<string>("hot");

function pickCat(key: string): void {
  activeCat.value = key;
}
</script>

<template>
  <section class="vietvip-pc-game" aria-label="遊戲分類與卡片">
    <div class="vietvip-pc-game__inner">
      <header class="vietvip-pc-game__header">
        <span class="vietvip-pc-game__eyebrow">GAME HALL</span>
        <h2 class="vietvip-pc-game__title">越南 VIP 廳堂</h2>
        <p class="vietvip-pc-game__subtitle">
          挑選您喜愛的遊戲類別，立即進入專屬 VIP 室
        </p>
        <span class="vietvip-pc-game__divider" aria-hidden="true" />
      </header>

      <div class="vietvip-pc-game__layout">
        <!-- 左側：7 分類 sidebar -->
        <nav class="vietvip-pc-game__side" aria-label="遊戲分類">
          <button
            v-for="c in cats"
            :key="c.key"
            type="button"
            class="vietvip-pc-game__cat"
            :class="{ 'vietvip-pc-game__cat--active': activeCat === c.key }"
            :aria-pressed="activeCat === c.key"
            @click="pickCat(c.key)"
          >
            <span class="vietvip-pc-game__cat-ico" aria-hidden="true">
              <img
                :src="activeCat === c.key ? c.iconOn : c.icon"
                :alt="`${c.label} 圖示`"
              />
            </span>
            <span class="vietvip-pc-game__cat-lbl">{{ c.label }}</span>
          </button>
        </nav>

        <!-- 右側：當前分類的遊戲卡 grid -->
        <ul class="vietvip-pc-game__grid" role="list">
          <li
            v-for="g in gamesByCategory[activeCat]"
            :key="g.key"
            class="vietvip-pc-game__card"
          >
            <div class="vietvip-pc-game__card-image">
              <img :src="g.image" :alt="g.label" loading="lazy" />
            </div>
            <div class="vietvip-pc-game__card-body">
              <span class="vietvip-pc-game__card-label">{{ g.label }}</span>
              <button type="button" class="vietvip-pc-game__card-play">
                立即進入
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// PC 遊戲區：1200 寬容器 + 左 130px sidebar + 右 grid 4 column
.vietvip-pc-game {
  padding: 80px 0 60px;
  // 深紅底 + 上方金色光帶（呼應 mobile bg-img 過渡到深紅大底）
  background: radial-gradient(
      ellipse 80% 60% at 50% 0%,
      hsla(var(--primary-h), var(--primary-s), 38%, 0.4) 0%,
      transparent 70%
    ),
    var(--bg-base);

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 36px;
  }

  &__eyebrow {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 6px;
    color: var(--vietvip-gold-2);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  &__title {
    margin: 0;
    font-size: 42px;
    font-weight: 800;
    color: var(--vietvip-gold-1);
    letter-spacing: 2px;
    font-family: var(--font-display);
  }

  &__subtitle {
    margin: 8px 0 0;
    font-size: 15px;
    color: var(--vietvip-gold-2);
    letter-spacing: 0.5px;
  }

  // 標題下方金色細分隔線
  &__divider {
    display: block;
    margin: 16px auto 0;
    width: 200px;
    height: 1px;
    background: var(--vietvip-divider);
  }

  &__layout {
    display: flex;
    gap: 28px;
    align-items: flex-start;
  }

  // ─────── 左側 sidebar 7 分類（PC 寬 130px） ───────
  &__side {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: none;
    width: 130px;
  }

  &__cat {
    position: relative;
    padding: 16px 6px 12px;
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 16px;
    background: linear-gradient(
      180deg,
      rgba(74, 15, 29, 0.6) 0%,
      rgba(28, 3, 9, 0.85) 100%
    );
    color: var(--vietvip-gold-1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.18s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px var(--vietvip-card-glow);
    }

    &--active {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      box-shadow:
        0 6px 16px rgba(199, 154, 69, 0.55),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
  }

  &__cat-ico {
    width: 52px;
    height: 52px;
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
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
  }

  // ─────── 右側遊戲卡 grid（4 column） ───────
  &__grid {
    flex: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    min-width: 0;
  }

  &__card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: var(--bg-surface);
    border: 1px solid var(--vietvip-gold-2);
    box-shadow:
      0 6px 18px var(--vietvip-card-glow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-4px);
      box-shadow:
        0 12px 26px var(--vietvip-card-glow),
        0 0 0 1px var(--vietvip-gold-1),
        inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    }
  }

  &__card-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: linear-gradient(
      180deg,
      var(--secondary-09) 0%,
      var(--secondary-10) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
  }

  &__card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-body {
    padding: 12px 12px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &__card-label {
    font-size: 16px;
    font-weight: 700;
    color: var(--primary-01);
    text-align: center;
    line-height: 1.2;
  }

  &__card-play {
    width: 100%;
    height: 32px;
    padding: 0 12px;
    border: none;
    border-radius: 16px;
    background: var(--gradient-cta);
    color: var(--text-on-gold);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.18s ease;
    box-shadow: 0 3px 8px
      hsla(var(--secondary-h), var(--secondary-s), 50%, 0.45);

    &:hover {
      filter: brightness(1.1);
    }
  }
}
</style>
