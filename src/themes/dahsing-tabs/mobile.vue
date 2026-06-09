<script setup lang="ts">
/**
 * dahsing-tabs mobile：版型 B 分頁（1:1 對齊原稿）
 *
 * 來源：/Users/georgehuang/Downloads/images 2/大亨首頁-版型B 分頁 (1).html
 *
 * 結構順序：
 *   .statusbar / .header / .hero / .marquee
 *   .stage（左 side 標準 + 右 main）
 *     left: dahsing-sidebar 標準（96px）
 *     right: subtabs + promo + tgrid 2 col
 *   .hotbar
 *   .tabbar
 */
import { ref } from "vue";
import DahsingStatusBar from "../dahsing-shared/atoms/dahsing-status-bar.vue";
import DahsingMobileHeader from "../dahsing-shared/atoms/dahsing-mobile-header.vue";
import DahsingHeroBanner from "../dahsing-shared/atoms/dahsing-hero-banner.vue";
import DahsingMarquee from "../dahsing-shared/atoms/dahsing-marquee.vue";
import DahsingSidebar from "../dahsing-shared/atoms/dahsing-sidebar.vue";
import DahsingHotBar from "../dahsing-shared/atoms/dahsing-hot-bar.vue";
import DahsingTabBar from "../dahsing-shared/atoms/dahsing-tab-bar.vue";
import DahsingTabsSubtabs from "./sections/dahsing-tabs-subtabs.vue";
import DahsingTabsPromo from "./sections/dahsing-tabs-promo.vue";
import DahsingTabsGrid from "./sections/dahsing-tabs-grid.vue";

const activeNav = ref<string>("hot");
</script>

<template>
  <div class="dahsing-tabs-m">
    <DahsingStatusBar />
    <DahsingMobileHeader />
    <DahsingHeroBanner width-mode="phone" />
    <DahsingMarquee />

    <div class="dahsing-tabs-m__stage">
      <DahsingSidebar
        :active-key="activeNav"
        @update:active-key="activeNav = $event"
      />

      <main class="dahsing-tabs-m__main">
        <DahsingTabsSubtabs />
        <DahsingTabsPromo />
        <DahsingTabsGrid :columns="2" />
      </main>
    </div>

    <DahsingHotBar />
    <DahsingTabBar />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-tabs-m {
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
