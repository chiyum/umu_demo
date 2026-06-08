<script setup lang="ts">
import gamesIcon from "../assets/icon/games-icon.png?url";
import game1 from "../assets/games/game-1.png?url";
import game2 from "../assets/games/game-2.png?url";
import game3 from "../assets/games/game-3.png?url";
import game4 from "../assets/games/game-4.png?url";
import game5 from "../assets/games/game-5.png?url";
import game6 from "../assets/games/game-6.png?url";

/**
 * fived mobile 熱門遊戲區 — 對齊 5d_v2 GameCarousel.vue + _index.scss
 *
 * 原作結構（mobile 區，第 270-321 行）：
 *   .mb-hotGame (display flex column)
 *     .titleBox      ← icon + 中文 + 英文副標
 *     <swiper-detection>
 *       .index-hotGame-slider .carousel-container (height 250px)
 *         .carousel-top .carousel-main .carousel-track
 *           .carousel-item (3D 中央放大 scale(1.3) / 左右 scale(1))
 *             .index-hotGame-block
 *               <img game.png />
 *               <div><h3>{{ title }}</h3><p>{{ desc }}</p></div>
 *     .news-bottom <router-link to="/_tutorial/intro">MORE</router-link>
 *
 * Demo 化：
 * - 不做 3D drag carousel（純展示 demo 不必複雜手勢）
 * - 改 4 張橫向 grid 卡（card 帶金邊 hover glow）+ MORE 按鈕
 * - 標題用 5d_v2 titleBox 風格（icon + cn + en）
 */

interface GameCard {
  img: string;
  title: string;
  desc: string;
}

const GAMES: GameCard[] = [
  { img: game1, title: "鳳凰之翼", desc: "電子精選 · 高爆率" },
  { img: game2, title: "黃金羅馬", desc: "千倍中獎 · 限時加碼" },
  { img: game3, title: "雷神之槌", desc: "北歐神話 · 自由旋轉" },
  { img: game4, title: "璀璨星河", desc: "宇宙主題 · 連線爆獎" },
  { img: game5, title: "幸運寶箱", desc: "經典 777 · 三軸老虎機" },
  { img: game6, title: "東方傳奇", desc: "古典武俠 · 龍珠收集" }
];
</script>

<template>
  <section class="fived-m-hot">
    <header class="fived-m-hot__title">
      <img :src="gamesIcon" alt="" class="fived-m-hot__icon" />
      <h2 class="fived-m-hot__cn">熱門遊戲</h2>
      <span class="fived-m-hot__en">HOT GAMES</span>
    </header>

    <div class="fived-m-hot__grid">
      <article v-for="(g, i) in GAMES" :key="i" class="fived-m-hot__card">
        <div class="fived-m-hot__card-img">
          <img :src="g.img" :alt="g.title" />
        </div>
        <div class="fived-m-hot__card-info">
          <h3 class="fived-m-hot__card-title">{{ g.title }}</h3>
          <p class="fived-m-hot__card-desc">{{ g.desc }}</p>
        </div>
      </article>
    </div>

    <div class="fived-m-hot__more">
      <a href="#" class="fived-m-hot__more-link">MORE</a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊原作 .mb-hotGame：display flex column
.fived-m-hot {
  padding: 8px 12px 20px;
}

// 對齊原作 .titleBox：icon + cn + en 三層橫排
.fived-m-hot__title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.fived-m-hot__icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  align-self: center;
}

.fived-m-hot__cn {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--fived-title-cn);
  letter-spacing: 1px;
}

.fived-m-hot__en {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: var(--fived-title-en);
  letter-spacing: 2px;
}

// 對齊原作 .index-hotGame-block：cursor pointer / 1px padding /
// ::before 金邊雙層漸層 / hover box-shadow 0 0 12px #ffdaa460
.fived-m-hot__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.fived-m-hot__card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--fived-card-fill);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  padding: 1px;
  transition: box-shadow 0.3s ease;

  // ::before 金邊（對齊原作 mask + mask-composite exclude）
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 8px;
    background: var(--fived-card-border);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
    pointer-events: none;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: var(--shadow-glow);

    &::before {
      opacity: 1;
    }
  }
}

.fived-m-hot__card-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

// 對齊原作 .index-hotGame-block div：top -26px / padding 0 16px / gap 6
.fived-m-hot__card-info {
  padding: 8px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

// 對齊原作 h3 #e2bd87 22px / p #a67c8b 18px（mobile 縮成 14/11）
.fived-m-hot__card-title {
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: var(--primary-01);
  letter-spacing: 0.5px;
}

.fived-m-hot__card-desc {
  margin: 0;
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.4;
}

.fived-m-hot__more {
  margin-top: 16px;
  text-align: center;
}

.fived-m-hot__more-link {
  display: inline-block;
  padding: 8px 32px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 4px;
  color: var(--text-on-gold);
  background: var(--gradient-gold);
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(226, 189, 135, 0.32);
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.08);
  }
}
</style>
