<script setup lang="ts">
/**
 * dahsing-tabs 桌面：Steam-style 分頁切換廳堂
 *
 * 桌面風格定位：以 mobile「subtabs + 2 col tgrid」為 DNA，桌面延伸成全寬 subtabs + 3 col grid。
 * 借鑑來源：at99 的 PcHeader 結構 + ant-sport 的 GameGrid 分頁概念
 *
 * 結構：
 *   ┌─ DahsingPcTopbar（sticky）
 *   ├─ DahsingHeroBanner wide
 *   ├─ DahsingMarquee
 *   └─ 1280 container 兩欄布局
 *        ├─ 左 sidebar 96px（隨頁面 sticky）
 *        └─ 中央區：subtabs（全寬可橫向 scroll）+ promo + tgrid 3 col
 *   ┌─ DahsingHotBar 全寬置底（取代 mobile 版的浮版 hotbar）
 *
 * 為什麼桌面 subtabs 不抽 dropdown：subtabs 在桌面仍走 pill 橫排，與 mobile 一致；
 * 桌面寬度 1024+ 時 5 個 pill 完全攤平，視覺強化「分頁切換」這個 layout 賣點。
 */
import { ref } from "vue";
import DahsingPcTopbar from "../dahsing-shared/desktop/dahsing-pc-topbar.vue";
import DahsingHeroBanner from "../dahsing-shared/atoms/dahsing-hero-banner.vue";
import DahsingMarquee from "../dahsing-shared/atoms/dahsing-marquee.vue";
import DahsingSidebar from "../dahsing-shared/atoms/dahsing-sidebar.vue";
import DahsingHotBar from "../dahsing-shared/atoms/dahsing-hot-bar.vue";
import DahsingTabsSubtabs from "./sections/dahsing-tabs-subtabs.vue";
import DahsingTabsPromo from "./sections/dahsing-tabs-promo.vue";
import DahsingTabsGrid from "./sections/dahsing-tabs-grid.vue";

const activeNav = ref<string>("hot");
</script>

<template>
  <div class="dahsing-tabs-pc">
    <DahsingPcTopbar />

    <div class="dahsing-tabs-pc__container">
      <DahsingHeroBanner width-mode="wide" />
      <DahsingMarquee />

      <div class="dahsing-tabs-pc__stage">
        <aside class="dahsing-tabs-pc__sidebar">
          <DahsingSidebar
            :active-key="activeNav"
            @update:active-key="activeNav = $event"
          />
        </aside>

        <main class="dahsing-tabs-pc__main">
          <DahsingTabsSubtabs />
          <DahsingTabsPromo />
          <DahsingTabsGrid :columns="3" />
        </main>
      </div>

      <DahsingHotBar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-tabs-pc {
  position: relative;
  min-height: 100vh;
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  color: var(--text-primary);
  font-family: var(--font-body);

  &__container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  &__stage {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-top: 24px;
  }

  &__sidebar {
    position: sticky;
    top: 96px;
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    min-width: 0;
  }
}
</style>
