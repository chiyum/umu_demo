<script setup lang="ts">
import gamesIcon from "../../assets/icon/games-icon.png?url";
import game1 from "../../assets/games/game-1.png?url";
import game2 from "../../assets/games/game-2.png?url";
import game3 from "../../assets/games/game-3.png?url";
import game4 from "../../assets/games/game-4.png?url";
import game5 from "../../assets/games/game-5.png?url";
import game6 from "../../assets/games/game-6.png?url";

/**
 * fived desktop 熱門遊戲區 — 對齊 5d_v2 _index.scss .index-hotGame-wrap +
 *   GameCarousel.vue PC 區（hot block 金邊 + 暗紅底）
 *
 * 原作結構：
 *   .index-hotGame-wrap (background linear-gradient(0deg, #000000e2 80%, #2e1822 100%))
 *     .index-hotGame-main
 *       .titleBox.game
 *         <img games-icon /> + <h2>熱門遊戲</h2> + <h3>HOT GAMES</h3>
 *       .index-hotGame-box (grid-template-columns: repeat(3, 1fr) / gap 85px 12px)
 *         .index-hotGame-block × N
 *           ::before 雙層金邊 (linear-gradient #ffdaa4 → #7d571e + mask exclude)
 *           hover ::before opacity 0→1 + box-shadow 0 0 12px 2px #ffdaa460
 *           內含 <img game.png /> + <div> 標題 h3 + 副標 p
 *           img top -38px / width 416px / aspect-ratio 416/184  ← 圖突出 block 上緣
 *           div top -26px / padding 0 16px / gap 20px
 *
 * Demo 化：
 * - 3-col grid 6 張卡（與 mobile 同卡片庫，PC 大尺寸 + 突出圖效果）
 * - 完整套用「圖突出 block 上緣 + 金邊雙層描邊 + hover glow」金禮盒視覺
 */

interface GameCard {
  img: string;
  title: string;
  desc: string;
}

const GAMES: GameCard[] = [
  { img: game1, title: "鳳凰之翼", desc: "電子精選 · 高爆率千倍中獎" },
  { img: game2, title: "黃金羅馬", desc: "古典帝國 · 限時加碼活動" },
  { img: game3, title: "雷神之槌", desc: "北歐神話 · 自由旋轉爆連線" },
  { img: game4, title: "璀璨星河", desc: "宇宙星空 · 連線多倍獎金" },
  { img: game5, title: "幸運寶箱", desc: "經典 777 · 三軸老虎機之王" },
  { img: game6, title: "東方傳奇", desc: "古典武俠 · 龍珠收集大獎" }
];
</script>

<template>
  <section class="fived-pc-hot">
    <div class="fived-pc-hot__inner">
      <header class="fived-pc-hot__title">
        <img :src="gamesIcon" alt="" class="fived-pc-hot__icon" />
        <h2 class="fived-pc-hot__cn">熱門遊戲</h2>
        <span class="fived-pc-hot__en">HOT GAMES</span>
      </header>

      <div class="fived-pc-hot__grid">
        <article v-for="(g, i) in GAMES" :key="i" class="fived-pc-hot__card">
          <div class="fived-pc-hot__card-img">
            <img :src="g.img" :alt="g.title" />
          </div>
          <div class="fived-pc-hot__card-info">
            <h3 class="fived-pc-hot__card-title">{{ g.title }}</h3>
            <p class="fived-pc-hot__card-desc">{{ g.desc }}</p>
          </div>
        </article>
      </div>

      <div class="fived-pc-hot__more">
        <a href="#" class="fived-pc-hot__more-link">MORE</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊原作 .index-hotGame-wrap：背景漸層 + flex 1
.fived-pc-hot {
  background: var(--gradient-hero);
  padding: 28px 0 36px;
}

.fived-pc-hot__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 16px;
}

// 對齊原作 .titleBox.game：icon + cn + en 三層橫排
.fived-pc-hot__title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.fived-pc-hot__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  align-self: center;
}

.fived-pc-hot__cn {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: var(--fived-title-cn);
  letter-spacing: 2px;
}

.fived-pc-hot__en {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--fived-title-en);
  letter-spacing: 3px;
}

// 對齊原作 .index-hotGame-box：grid 3-col / gap 85px 12px
// （85px 縱向是為了讓圖突出上緣有空間；本 demo 縮成 40px 視覺更收斂）
.fived-pc-hot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 14px;
  margin-top: 56px; // 預留上方圖突出空間
}

// 對齊原作 .index-hotGame-block：
//   暗紅漸層底 + 1px padding + ::before 雙層金邊 mask exclude + hover glow
.fived-pc-hot__card {
  position: relative;
  background: var(--fived-card-fill);
  padding: 1px;
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  // ::before 金邊：對齊原作 mask-composite exclude
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    background: var(--fived-card-border);
    mask:
      linear-gradient(#ffffff 0 0) content-box,
      linear-gradient(#ffffff 0 0);
    mask-composite: exclude;
    mask-composite: destination-out;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: var(--shadow-glow);

    &::before {
      opacity: 1;
    }
  }
}

// 對齊原作 img top -38px / aspect 416/184 / margin 0 auto
//   → 圖突出 block 上緣，標題 div 上推
.fived-pc-hot__card-img {
  position: relative;
  margin: -36px auto 0;
  width: 88%;
  aspect-ratio: 416 / 184;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

// 對齊原作 div top -26px / padding 0 16px / gap 20px
.fived-pc-hot__card-info {
  position: relative;
  margin-top: -18px;
  padding: 0 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

// 對齊原作 h3 #e2bd87 22px 700 letter-spacing 1px
.fived-pc-hot__card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--primary-01);
  letter-spacing: 1px;
}

// 對齊原作 p #a67c8b 18px
.fived-pc-hot__card-desc {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}

.fived-pc-hot__more {
  margin-top: 32px;
  text-align: center;
}

.fived-pc-hot__more-link {
  display: inline-block;
  padding: 10px 48px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 6px;
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
