<script setup lang="ts">
import imgSport from "@/themes/ant-sport/assets/pc/game-sport.png";
import imgLive from "@/themes/ant-sport/assets/pc/game-live.png";
import imgChess from "@/themes/ant-sport/assets/pc/game-chess.png";
import imgEsport from "@/themes/ant-sport/assets/pc/game-esport.png";
import imgLottery from "@/themes/ant-sport/assets/pc/game-lottery.png";
import imgFish from "@/themes/ant-sport/assets/pc/game-fish.png";
import imgEgame from "@/themes/ant-sport/assets/pc/game-egame.png";

/**
 * ant-sport mobile 遊戲類別矩陣
 *
 * 對齊 lilian_ant_web home.vue 第 73-76 行 `<Game />` widget，
 * 該 widget 在原 repo 是 7 大類別卡片（體育 / 真人 / 棋牌 / 電競 / 彩票 / 捕魚 / 電子）
 *
 * mobile 限定 3 欄佈局：第一張「體育」用大卡（spanning），下方 2 欄 3 列為其他 6 類，
 * 對應蚂蚁體育以「體育」為主視覺主推、其他類別輔位的品牌定位
 */

interface GameCategory {
  key: string;
  name: string;
  sub: string;
  image: string;
  /** 是否大卡（佔 2 欄） */
  large?: boolean;
}

const games: GameCategory[] = [
  {
    key: "sport",
    name: "體育投注",
    sub: "Sports Betting",
    image: imgSport,
    large: true
  },
  { key: "live", name: "真人視訊", sub: "Live Casino", image: imgLive },
  { key: "esport", name: "電子競技", sub: "E-Sports", image: imgEsport },
  { key: "chess", name: "棋牌遊戲", sub: "Card Games", image: imgChess },
  { key: "lottery", name: "彩票投注", sub: "Lottery", image: imgLottery },
  { key: "fish", name: "捕魚遊戲", sub: "Fishing", image: imgFish },
  { key: "egame", name: "電子遊戲", sub: "Slots", image: imgEgame }
];
</script>

<template>
  <section class="ant-sport-m-games" aria-label="遊戲類別">
    <h2 class="ant-sport-m-games__heading">熱門遊戲</h2>
    <ul class="ant-sport-m-games__grid" role="list">
      <li
        v-for="g in games"
        :key="g.key"
        class="ant-sport-m-games__item"
        :class="{ 'ant-sport-m-games__item--large': g.large }"
      >
        <div class="ant-sport-m-games__media">
          <img
            :src="g.image"
            :alt="`${g.name} 圖示`"
            class="ant-sport-m-games__img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="ant-sport-m-games__meta">
          <span class="ant-sport-m-games__name">{{ g.name }}</span>
          <span class="ant-sport-m-games__sub">{{ g.sub }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.ant-sport-m-games {
  margin: 8px 12px 16px;

  &__heading {
    margin: 0 0 10px;
    padding: 0 4px;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: 1px;

    // 標題左側細色條，致敬原 lilian_ant 體育博彩設計語言
    border-left: 3px solid var(--color-primary);
  }

  &__grid {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  &__item {
    background: var(--bg-surface);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;

    // 主推卡（體育）：橫跨兩欄
    &--large {
      grid-column: 1 / -1;
    }

    &:active {
      transform: scale(0.98);
      box-shadow: var(--shadow-md);
    }
  }

  &__media {
    width: 100%;
    aspect-ratio: 5 / 3;
    background: var(--provider-card-bg);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }

  &__meta {
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
  }

  &__name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  &__sub {
    font-size: 10px;
    opacity: 0.85;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}
</style>
