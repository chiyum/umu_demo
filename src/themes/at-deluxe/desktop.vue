<script setup lang="ts">
import AtDeluxePcHeader from "./sections/desktop/at-deluxe-pc-header.vue";
import AtDeluxePcBanner from "./sections/desktop/at-deluxe-pc-banner.vue";
import AtDeluxePcMarquee from "./sections/desktop/at-deluxe-pc-marquee.vue";
import AtDeluxePcHotGames from "./sections/desktop/at-deluxe-pc-hot-games.vue";
import AtDeluxePcGameBar from "./sections/desktop/at-deluxe-pc-game-bar.vue";
import AtDeluxePcFooter from "./sections/desktop/at-deluxe-pc-footer.vue";

/**
 * at-deluxe 桌面版佈局 — 視覺結構參考 slime-at99 src/pages/at99/desktop.vue
 *
 * 對應原作頂層 DOM（desktop.vue 第 295-347 行）：
 *   .home-banner       ← banner Splide 輪播
 *   .home-marquee      ← 跑馬燈條
 *   .home-game
 *     <HotGame />      ← 熱門 / 電子 / 最新 三 tab，grid 卡片
 *     <GameBar :game="gameBar[0]" />  ← 真人視訊（demo 化）
 *     <GameBar :game="gameBar[1]" />  ← 捕魚（demo 化）
 *     <Rankings />     ← 排行榜（demo 不做，保持結構乾淨）
 *   <floatingButton /> ← 右下角 chat 浮球（demo 站不需要，已被 FAB 系統涵蓋）
 *
 * Demo 化拆解（5 段）：
 *   .at-deluxe-pc-layout
 *     Header     ← sticky 主導覽
 *     Banner     ← banner 大圖 + JACKPOT 七段顯示浮層
 *     Marquee    ← 跑馬燈條（news icon 動畫）
 *     HotGames   ← 熱門遊戲 3-col grid + 3 tab 切換
 *     GameBar    ← 真人 / 捕魚 雙列遊戲列（6 張橫向卡）
 *     Footer     ← 連結 + 多語列 + 版權
 *
 * 與既有 at99 區隔：
 *   - at99 桌面 = 「hero 三段組合」單軸霓虹
 *   - at-deluxe 桌面 = 「banner + JACKPOT + 雙列遊戲」多層次賭場大廳結構
 *   - 配色從深藍 radial + JACKPOT 七段顯示就能直觀分辨
 */
</script>

<template>
  <div class="at-deluxe-pc-layout">
    <AtDeluxePcHeader />
    <main class="at-deluxe-pc-layout__main">
      <AtDeluxePcBanner />
      <AtDeluxePcMarquee />
      <AtDeluxePcHotGames />
      <AtDeluxePcGameBar />
    </main>
    <AtDeluxePcFooter />
  </div>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  display: flex;
  flex-direction: column;
}

.at-deluxe-pc-layout__main {
  flex: 1;
}
</style>
