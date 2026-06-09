<script setup lang="ts">
import FivedPcHeader from "./sections/desktop/fived-pc-header.vue";
import FivedPcLeftSidebar from "./sections/desktop/fived-pc-left-sidebar.vue";
import FivedPcRightSidebar from "./sections/desktop/fived-pc-right-sidebar.vue";
import FivedPcHero from "./sections/desktop/fived-pc-hero.vue";
import FivedPcHotGames from "./sections/desktop/fived-pc-hot-games.vue";
import FivedPcFooter from "./sections/desktop/fived-pc-footer.vue";

/**
 * fived 桌面版佈局 — 視覺結構參考 5d_v2 src/pages/base/home.vue + layout-default.vue
 *
 * 對齊原作頂層 DOM（layout-default.vue）：
 *   <Header />
 *   <div class="container-wrap">
 *     <LeftSidebar />          ← 左側欄（原作 v3 是空殼）
 *     <div class="container-center"> <slot /> ... </div>
 *     <RightSidebar />         ← 右側浮動工具列（QR / 下載 / 社群 / 回頂）
 *   </div>
 *   <Footer />
 *
 * Demo 化拆解：
 *   Header        ← sticky brand bar + 中央 6 主分類（hover 下拉子選單）+ 金漸層登入按鈕
 *   LeftSidebar   ← 對齊原作為空殼 aside，保留 224px 寬度版面位置
 *   Hero          ← 雙欄 grid（左 banner / 右 news 公告列表）
 *   HotGames      ← 3-col 金邊大卡（圖突出 + hover glow）
 *   RightSidebar  ← fixed 浮動，scrollY > 500 才顯示（QR / 下載 / 社群 / 回頂）
 *   Footer        ← 連結 + 多語列 + 版權
 *
 * 為什麼 LeftSidebar / RightSidebar 放在 main 之外：
 * 原作 RightSidebar 是 fixed 全頁浮動（不在 flex 流內），LeftSidebar 是空殼但保留寬度位置；
 * 為了 demo 簡化，這裡 LeftSidebar 放進 flex 行內（保留 reserve 寬度），
 * RightSidebar 自身 fixed 不影響 main 寬度，放在 layout 末端即可。
 */
</script>

<template>
  <div class="fived-pc-layout">
    <FivedPcHeader />
    <div class="fived-pc-layout__container">
      <FivedPcLeftSidebar />
      <main class="fived-pc-layout__main">
        <FivedPcHero />
        <FivedPcHotGames />
      </main>
    </div>
    <FivedPcRightSidebar />
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

// container-wrap：對齊原作 flex 行內三欄
.fived-pc-layout__container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
}

.fived-pc-layout__main {
  flex: 1;
  min-width: 0;
}
</style>
