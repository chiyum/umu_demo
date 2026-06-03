<script setup lang="ts">
import { ref } from "vue";
import indexgameTitle from "@/themes/ant-sport/assets/pc/indexgame-title.png?url";
import gameSport from "@/themes/ant-sport/assets/pc/game-sport.png?url";
import gameLive from "@/themes/ant-sport/assets/pc/game-live.png?url";
import gameChess from "@/themes/ant-sport/assets/pc/game-chess.png?url";
import gameEsport from "@/themes/ant-sport/assets/pc/game-esport.png?url";
import gameLottery from "@/themes/ant-sport/assets/pc/game-lottery.png?url";
import gameFish from "@/themes/ant-sport/assets/pc/game-fish.png?url";
import gameEgame from "@/themes/ant-sport/assets/pc/game-egame.png?url";

/**
 * ant-sport PC indexGame 區
 *
 * 對齊 lilian_ant_pc main.vue 第 145-254 行 `.indexGame` + `.indexGameContent`：
 * - 上：頂部標題圖
 * - 中：橫排 tabs（體育 / 真人 / 棋牌 / 電競 / 彩票 / 捕魚 / 電子）7 類
 * - 下：當前 tab 對應的「左大圖 + 右文字 + 底部 platform 橫條」內容
 *
 * 簡化處：
 * - 原 repo platform list 從 store.app.platforms 抓並逐 platform 切圖；
 *   demo 用 4 個假 platform 名稱橫排
 * - 切 tab 用 ref index + v-show；原 repo 有額外「離開」動畫，demo 簡化為 fade
 */

interface GameCategory {
  key: string;
  name: string;
  desc: string;
  image: string;
  /** demo 用假 platform 名 */
  platforms: string[];
}

const categories: GameCategory[] = [
  {
    key: "sport",
    name: "體育投注",
    desc: "亞洲頂尖的體育博彩平台，每日數千場熱門賽事盤口，秒級結算，賠率業界最優。",
    image: gameSport,
    platforms: ["SABA 體育", "OB 體育", "IM 體育", "CMD 體育"]
  },
  {
    key: "live",
    name: "真人視訊",
    desc: "高清視訊百家樂、輪盤、骰寶，真實荷官 24 小時在線發牌，沉浸式娛樂體驗。",
    image: gameLive,
    platforms: ["AG 真人", "BG 真人", "DG 真人", "OG 真人"]
  },
  {
    key: "chess",
    name: "棋牌遊戲",
    desc: "經典德州撲克、麻將、鬥地主，與全球玩家同桌競技，高額獎池等你來戰。",
    image: gameChess,
    platforms: ["WINWIN 棋牌", "BOYA 棋牌", "GOLDEN 棋牌", "FC 棋牌"]
  },
  {
    key: "esport",
    name: "電子競技",
    desc: "英雄聯盟、Dota 2、CS:GO、王者榮耀，全球頂級電競賽事盤口同步上線。",
    image: gameEsport,
    platforms: ["IM 電競", "AVIA 電競", "TF 電競", "WS 電競"]
  },
  {
    key: "lottery",
    name: "彩票投注",
    desc: "雙色球、大樂透、北京賽車、PK10，秒秒開獎，多元玩法，獎金豐厚。",
    image: gameLottery,
    platforms: ["SG 彩票", "LB 彩票", "TCG 彩票", "YABO 彩票"]
  },
  {
    key: "fish",
    name: "捕魚遊戲",
    desc: "全民競技捕魚競技場，多炮多倍率，精美畫面，每砲都可能爆出大獎。",
    image: gameFish,
    platforms: ["JDB 捕魚", "TP 捕魚", "MW 捕魚", "VG 捕魚"]
  },
  {
    key: "egame",
    name: "電子遊戲",
    desc: "上千款線上拉霸機台，每日新增，畫質精美，特色玩法多樣，獎金倍率高。",
    image: gameEgame,
    platforms: ["PG 電子", "PT 電子", "MG 電子", "KY 電子"]
  }
];

/** 當前 active tab index */
const activeIdx = ref(0);
</script>

<template>
  <section class="ant-sport-pc-game" aria-label="遊戲類別">
    <div class="ant-sport-pc-game__inner">
      <div class="ant-sport-pc-game__title">
        <img
          :src="indexgameTitle"
          alt="熱門遊戲"
          class="ant-sport-pc-game__title-img"
        />
      </div>

      <ul class="ant-sport-pc-game__tabs" role="tablist">
        <li
          v-for="(c, i) in categories"
          :key="c.key"
          role="tab"
          :aria-selected="i === activeIdx"
          class="ant-sport-pc-game__tab"
          :class="{ 'ant-sport-pc-game__tab--active': i === activeIdx }"
          @click="activeIdx = i"
        >
          {{ c.name }}
        </li>
      </ul>

      <template v-for="(c, i) in categories" :key="c.key">
        <div
          v-show="i === activeIdx"
          class="ant-sport-pc-game__panel"
          role="tabpanel"
        >
          <div class="ant-sport-pc-game__media">
            <img
              :src="c.image"
              :alt="`${c.name} 主視覺`"
              class="ant-sport-pc-game__media-img"
              loading="lazy"
            />
          </div>
          <div class="ant-sport-pc-game__copy">
            <h2 class="ant-sport-pc-game__name">{{ c.name }}</h2>
            <p class="ant-sport-pc-game__desc">{{ c.desc }}</p>

            <ul class="ant-sport-pc-game__providers" role="list">
              <li
                v-for="p in c.platforms"
                :key="p"
                class="ant-sport-pc-game__provider"
              >
                <span class="ant-sport-pc-game__provider-name">{{ p }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ant-sport-pc-game {
  background: var(--bg-base-deep);
  padding: 60px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__title {
    text-align: center;
    margin-bottom: 28px;
  }

  &__title-img {
    height: 60px;
    width: auto;
    object-fit: contain;
  }

  &__tabs {
    margin: 0 0 28px;
    padding: 8px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    background: var(--bg-surface);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    justify-content: center;
  }

  &__tab {
    padding: 10px 22px;
    cursor: pointer;
    font-size: 15px;
    color: var(--text-muted);
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.18s ease;

    &:hover {
      color: var(--color-primary);
      background: var(--bg-overlay);
    }

    &--active {
      background: var(--gradient-cta);
      color: var(--text-on-primary);

      // hover 覆寫不變色（保持選中態的亮度）
      &:hover {
        color: var(--text-on-primary);
        background: var(--gradient-cta);
        filter: brightness(1.05);
      }
    }
  }

  &__panel {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 40px;
    background: var(--bg-surface);
    border-radius: 16px;
    padding: 36px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border);
    animation: ant-sport-pc-game-fade 0.4s ease;
    align-items: center;
  }

  &__media {
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    overflow: hidden;
    background: var(--provider-card-bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__media-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 18px;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__name {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: 1.5px;
  }

  &__desc {
    margin: 0;
    font-size: 15px;
    color: var(--text-muted);
    line-height: 1.8;
  }

  &__providers {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  &__provider {
    background: var(--provider-card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    cursor: pointer;
    transition: all 0.18s ease;

    &:hover {
      border-color: var(--color-primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }
  }

  &__provider-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }
}

@keyframes ant-sport-pc-game-fade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
