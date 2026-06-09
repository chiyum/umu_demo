<script setup lang="ts">
/**
 * dahsing-waterfall 桌面：Pinterest-style 瀑布流大廳
 *
 * 桌面風格定位：以 mobile 「2 欄 masonry」為 DNA，桌面延伸成 4 欄大瀑布流。
 * 借鑑來源：tycoon 的 sticky topbar 結構 + 自寫 column-count: 4 masonry
 *
 * 結構：
 *   ┌─ DahsingPcTopbar（sticky）
 *   ├─ DahsingHeroBanner wide（全寬 1280×320）
 *   ├─ DahsingMarquee（沿用 mobile 元件，內部 margin 16px 不重寫）
 *   └─ main 容器（1280 max-width）
 *        ├─ 左 sidebar 96px 標準版（桌面用完整 7 分類文字）
 *        └─ 中央區：DahsingSecHead + DahsingWaterfallWall columns=4
 *   ┌─ DahsingHotBar（全寬置底）
 *
 * 為什麼桌面 sidebar 不走 compact：桌面空間充足，完整文字 7 分類更清楚；
 * 但 layout 維持 sticky 左欄、隨頁面滾動固定
 */
import { ref } from "vue";
import DahsingPcTopbar from "../dahsing-shared/desktop/dahsing-pc-topbar.vue";
import DahsingHeroBanner from "../dahsing-shared/atoms/dahsing-hero-banner.vue";
import DahsingMarquee from "../dahsing-shared/atoms/dahsing-marquee.vue";
import DahsingSidebar from "../dahsing-shared/atoms/dahsing-sidebar.vue";
import DahsingSecHead from "../dahsing-shared/atoms/dahsing-sec-head.vue";
import DahsingHotBar from "../dahsing-shared/atoms/dahsing-hot-bar.vue";
import DahsingWaterfallWall from "./sections/dahsing-waterfall-wall.vue";

const activeNav = ref<string>("hot");
</script>

<template>
  <div class="dahsing-waterfall-pc">
    <DahsingPcTopbar />

    <div class="dahsing-waterfall-pc__container">
      <DahsingHeroBanner width-mode="wide" />
      <DahsingMarquee />

      <div class="dahsing-waterfall-pc__stage">
        <aside class="dahsing-waterfall-pc__sidebar">
          <DahsingSidebar
            :active-key="activeNav"
            @update:active-key="activeNav = $event"
          />
        </aside>

        <main class="dahsing-waterfall-pc__main">
          <DahsingSecHead title="熱門推薦 · 瀑布流大廳" />
          <DahsingWaterfallWall :columns="4" />
        </main>
      </div>

      <DahsingHotBar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-waterfall-pc {
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
    top: 96px; // sticky topbar 76px + 20px gap
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    min-width: 0;
  }
}
</style>
