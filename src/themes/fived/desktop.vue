<script setup lang="ts">
import FivedPcHeader from "./sections/desktop/fived-pc-header.vue";
import FivedPcHero from "./sections/desktop/fived-pc-hero.vue";
import FivedPcHotGames from "./sections/desktop/fived-pc-hot-games.vue";
import FivedPcFooter from "./sections/desktop/fived-pc-footer.vue";

/**
 * fived 桌面版佈局 — 視覺結構參考 5d_v2 src/pages/base/home.vue + _index.scss
 *
 * 對應原作頂層 DOM（base/home.vue）：
 *   .index-wrap
 *     .index-block.index-block--swiper (grid 66.5% 1fr)
 *       .index-slider-wrap   ← banner swiper
 *       <News />              ← 公告區
 *     .index-block
 *       <GameCarousel />      ← 熱門遊戲 3-col 金邊大卡
 *
 * Demo 化拆解：
 *   Header     ← sticky brand bar + 中央 nav 8 項
 *   Hero       ← 雙欄 grid（左 banner / 右 news 公告列表）
 *   HotGames   ← 3-col 金邊大卡（圖突出 + hover glow）
 *   Footer     ← 連結 + 多語列 + 版權
 *
 * 與其他 theme 區隔：
 *   - 不同於 noya（暖玫瑰金）/ vietvip（酒紅金）的「整頁鋪大底圖」風格
 *   - fived 結構明確劃分「雙欄 hero / 主視覺 hotGame 區 / footer」三段，
 *     hotGame 區套用獨立漸層底色拉開層次（對齊原作 .index-hotGame-wrap）
 *   - 字體 Noto Sans 顯示體 + 金邊雙層描邊風是「禮盒級」獨有質感
 */
</script>

<template>
  <div class="fived-pc-layout">
    <FivedPcHeader />
    <main class="fived-pc-layout__main">
      <FivedPcHero />
      <FivedPcHotGames />
    </main>
    <FivedPcFooter />
  </div>
</template>

<style lang="scss" scoped>
.fived-pc-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  display: flex;
  flex-direction: column;
}

.fived-pc-layout__main {
  flex: 1;
}
</style>
