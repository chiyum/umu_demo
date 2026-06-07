<script setup lang="ts">
import At99PcHeader from "./sections/desktop/at99-pc-header.vue";
import At99PcLeftside from "./sections/desktop/at99-pc-leftside.vue";
import At99PcBanner from "./sections/desktop/at99-pc-banner.vue";
import At99PcMarquee from "./sections/desktop/at99-pc-marquee.vue";
import At99PcHotGame from "./sections/desktop/at99-pc-hot-game.vue";
import At99PcGameBar from "./sections/desktop/at99-pc-game-bar.vue";
import At99PcRankings from "./sections/desktop/at99-pc-rankings.vue";
import At99PcRightside from "./sections/desktop/at99-pc-rightside.vue";
import At99PcFooter from "./sections/desktop/at99-pc-footer.vue";

// 捕魚 / 真人圖片集中 import（vite 靜態解析 + URL 重寫）
import fishImg1 from "./assets/desktop/gameBar/fish1.png?url";
import fishImg2 from "./assets/desktop/gameBar/fish2.png?url";
import fishImg3 from "./assets/desktop/gameBar/fish3.png?url";
import fishImg4 from "./assets/desktop/gameBar/fish4.png?url";
import fishImg5 from "./assets/desktop/gameBar/fish5.png?url";
import fishImg6 from "./assets/desktop/gameBar/fish6.png?url";
import fishImg7 from "./assets/desktop/gameBar/fish7.png?url";
import personImg1 from "./assets/desktop/gameBar/person1.png?url";
import personImg2 from "./assets/desktop/gameBar/person2.png?url";
import personImg3 from "./assets/desktop/gameBar/person3.png?url";
import personImg4 from "./assets/desktop/gameBar/person4.png?url";
import personImg5 from "./assets/desktop/gameBar/person5.png?url";
import personImg6 from "./assets/desktop/gameBar/person6.png?url";

/**
 * at99 桌面版佈局 — 視覺結構參考 slime-at99 桌面首頁
 * （/Users/georgehuang/Documents/GitHub/slime-at99/src/pages/at99/desktop.vue）
 *
 * 對應原作頂層 DOM 結構：
 *   layout-default.vue：
 *     <Header />        ← logo + VIP + 帳號 + 8 工具
 *     <RightSide />     ← fixed 右側 4 浮窗
 *     <MailFloat />
 *     .layout-default--main：
 *       <LeftSide />    ← fixed 左側 11 icon menu
 *       #content：
 *         <slot />      ← 各頁
 *         <Footer />
 *
 *   home (at99/desktop.vue) 主內容：
 *     .home-banner   ← swiper 3 張 + side banner
 *     .home-marquee  ← news icon + 跑馬燈
 *     .home-game：
 *       <HotGame :games="hotGame" />     ← 3 tab + grid 10 張
 *       <GameBar :game="gameBar[0]" />   ← 捕魚 6 張
 *       <GameBar :game="gameBar[1]" />   ← 真人 6 張
 *       <Rankings />                      ← 排行榜 marquee
 *
 * 採同樣的「左 sidebar + 主內容 + 右浮窗」橫向布局，
 * 用本專案 BEM 範式重寫；變體切換時所有 sections 走 token 跟動
 */

const FISH_GAME = {
  gameName: "捕魚遊戲",
  images: [fishImg1, fishImg2, fishImg3, fishImg4, fishImg5, fishImg6, fishImg7]
};

const PERSON_GAME = {
  gameName: "真人視訊",
  images: [
    personImg1,
    personImg2,
    personImg3,
    personImg4,
    personImg5,
    personImg6
  ]
};
</script>

<template>
  <div class="at99-pc-layout">
    <At99PcHeader />
    <div class="at99-pc-layout__body">
      <At99PcLeftside />
      <main class="at99-pc-layout__main">
        <div class="at99-pc-layout__container">
          <At99PcBanner />
          <At99PcMarquee />
          <At99PcHotGame />
          <At99PcGameBar :game="FISH_GAME" />
          <At99PcGameBar :game="PERSON_GAME" />
          <At99PcRankings />
        </div>
        <At99PcFooter />
      </main>
    </div>
    <At99PcRightside />
  </div>
</template>

<style lang="scss" scoped>
.at99-pc-layout {
  position: relative;
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body, "Noto Sans TC", "PingFang TC", sans-serif);
  display: flex;
  flex-direction: column;
}

// body：左 sidebar (110px) + 主內容
.at99-pc-layout__body {
  display: flex;
  flex: 1;
  align-items: stretch;
}

.at99-pc-layout__main {
  flex: 1;
  min-width: 0; // 避免 flex 子內容撐爆
  display: flex;
  flex-direction: column;
}

.at99-pc-layout__container {
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 24px 32px;
}
</style>
