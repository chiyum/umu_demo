<script setup lang="ts">
import { ref } from "vue";
import NoyaAnnounceTopBar from "./sections/noya-announce-top-bar.vue";
import NoyaMainNav from "./sections/noya-main-nav.vue";
import NoyaProviderGridStrip from "./sections/noya-provider-grid-strip.vue";
import NoyaHeroDoubleBanner from "./sections/noya-hero-double-banner.vue";
import NoyaRealPeopleTitle from "./sections/noya-real-people-title.vue";
import NoyaPopularGamesGrid from "./sections/noya-popular-games-grid.vue";
import NoyaAppDownload from "./sections/noya-app-download.vue";
import NoyaStatsCounter from "./sections/noya-stats-counter.vue";
import NoyaFooter from "./sections/noya-footer.vue";

/**
 * noya 桌面版佈局：依 GAP_ANALYSIS 9 大區順序排列
 *
 * 1. AnnounceTopBar   跑馬燈 + 登入區（sticky）
 * 2. MainNav          品牌 + 5 大分類 tab
 * 3. ProviderGridStrip 當前 tab 對應的 provider 橫排
 * 4. HeroDoubleBanner 雙 banner 並排
 * 5. RealPeopleTitle  金色標題列
 * 6. PopularGamesGrid 4 欄熱門遊戲
 * 7. AppDownload      手機 mockup + QR
 * 8. StatsCounter     4 數字
 * 9. Footer           4 欄連結 + provider 跑馬燈 + 版權
 *
 * 互動：MainNav 切換 tab → ProviderGridStrip 顯示對應 provider
 * （本層用一個 ref 串接，避免共享 store；demo 單頁不需要 Pinia）
 *
 * 注意：所有顏色都由 [data-theme="noya"] CSS var 提供，
 * 不寫死任何顏色，切換配色時不必碰元件。
 */

/** 當前 active 的分類，由 MainNav 控制，傳給 ProviderGridStrip */
const activeCategory = ref<string>("live");
</script>

<template>
  <div class="noya-layout">
    <!-- 1. 跑馬燈 + 登入區（sticky 在最頂） -->
    <NoyaAnnounceTopBar />

    <!-- 2. 主導覽 -->
    <NoyaMainNav
      :active-category="activeCategory"
      @update:active-category="activeCategory = $event"
    />

    <main class="noya-layout__main">
      <!-- 3. provider 橫排 -->
      <NoyaProviderGridStrip :active-category="activeCategory" />

      <!-- 4. 雙 banner hero -->
      <NoyaHeroDoubleBanner />

      <!-- 5. 真人視訊標題列 -->
      <NoyaRealPeopleTitle />

      <!-- 6. 熱門遊戲 4 欄 -->
      <NoyaPopularGamesGrid />

      <!-- 7. App 下載 -->
      <NoyaAppDownload />

      <!-- 8. Stats 4 數字 -->
      <NoyaStatsCounter />
    </main>

    <!-- 9. Footer -->
    <NoyaFooter />
  </div>
</template>

<style lang="scss" scoped>
.noya-layout {
  // kingdom DNA #9：layout 角落 radial 柔光（暖金 / 配色變化跟著走）
  // 底層 bg-base 先鋪平，上層 bg-decoration 兩顆 radial 提供右上 / 左下角光暈
  // 沒有 --bg-decoration 時退回單純 bg-base，不會破畫面
  background: var(--bg-decoration, none), var(--bg-base);

  // 角落柔光需要鋪滿整個 viewport 而不重複，避免長頁面下尾段補光不自然
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }
}
</style>
