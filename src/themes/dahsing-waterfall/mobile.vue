<script setup lang="ts">
/**
 * dahsing-waterfall mobile：版型 A 瀑布流（1:1 對齊原稿）
 *
 * 來源：/Users/georgehuang/Downloads/images 2/大亨首頁-版型A 瀑布流 (1).html
 *
 * 結構順序（與原稿 HTML body 對齊）：
 *   .statusbar / .header / .hero / .marquee
 *   .stage（左 side.compact + 右 main）
 *     left: dahsing-sidebar compact 變體
 *     right: sec-head (熱門推薦) + dahsing-waterfall-wall column-count:2
 *   .hotbar
 *   .tabbar
 *
 * 為什麼 sidebar 用 compact：原稿 A 版唯一走 .side.compact 62px 窄版（B/C 用標準 96px）
 *
 * defineOptions 必須是靜態字面量（pageMetaPlugin 規約），這份 SFC 沒有 page 等級設定，
 * 因為 theme 入口元件不是 page，是被 layout-theme-host 動態載入
 */
import { ref } from "vue";
import DahsingStatusBar from "../dahsing-shared/atoms/dahsing-status-bar.vue";
import DahsingMobileHeader from "../dahsing-shared/atoms/dahsing-mobile-header.vue";
import DahsingHeroBanner from "../dahsing-shared/atoms/dahsing-hero-banner.vue";
import DahsingMarquee from "../dahsing-shared/atoms/dahsing-marquee.vue";
import DahsingSidebar from "../dahsing-shared/atoms/dahsing-sidebar.vue";
import DahsingSecHead from "../dahsing-shared/atoms/dahsing-sec-head.vue";
import DahsingHotBar from "../dahsing-shared/atoms/dahsing-hot-bar.vue";
import DahsingTabBar from "../dahsing-shared/atoms/dahsing-tab-bar.vue";
import DahsingWaterfallWall from "./sections/dahsing-waterfall-wall.vue";

const activeNav = ref<string>("hot");
</script>

<template>
  <div class="dahsing-waterfall-m">
    <DahsingStatusBar />
    <DahsingMobileHeader />
    <DahsingHeroBanner width-mode="phone" />
    <DahsingMarquee />

    <div class="dahsing-waterfall-m__stage">
      <DahsingSidebar
        compact
        :active-key="activeNav"
        @update:active-key="activeNav = $event"
      />

      <main class="dahsing-waterfall-m__main">
        <DahsingSecHead title="熱門推薦" />
        <DahsingWaterfallWall :columns="2" />
      </main>
    </div>

    <DahsingHotBar />
    <DahsingTabBar />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-waterfall-m {
  // 對齊原稿 .phone 容器：max-width 430、雙側陰影、底部留 tabbar 空間
  position: relative;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 104px;
  background: var(--bg-base);
  box-shadow: 0 0 60px rgba(120, 70, 30, 0.18);
  overflow-x: hidden;
  font-family: var(--font-body);
  color: var(--text-primary);

  &__stage {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 16px 0;
  }

  &__main {
    flex: 1;
    min-width: 0;
  }
}
</style>
