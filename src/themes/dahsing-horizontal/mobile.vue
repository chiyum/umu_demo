<script setup lang="ts">
/**
 * dahsing-horizontal mobile：版型 C 橫向列表（1:1 對齊原稿）
 *
 * 來源：/Users/georgehuang/Downloads/images 2/大亨首頁-版型C 橫向列表 (1).html
 *
 * 結構順序：
 *   .statusbar / .header / .hero / .marquee
 *   .stage（左 side 標準 + 右 main .rows）
 *     - row1: 熱門推薦（feat DG 真人 + hcard ×2）
 *     - row2: 真人遊戲
 *     - row3: 體育賽事
 *   .hotbar
 *   .tabbar
 */
import { ref } from "vue";
import DahsingMobileHeader from "../dahsing-shared/atoms/dahsing-mobile-header.vue";
import DahsingHeroBanner from "../dahsing-shared/atoms/dahsing-hero-banner.vue";
import DahsingMarquee from "../dahsing-shared/atoms/dahsing-marquee.vue";
import DahsingSidebar from "../dahsing-shared/atoms/dahsing-sidebar.vue";
import DahsingHotBar from "../dahsing-shared/atoms/dahsing-hot-bar.vue";
import DahsingTabBar from "../dahsing-shared/atoms/dahsing-tab-bar.vue";
import DahsingHorizontalRow from "./sections/dahsing-horizontal-row.vue";
import {
  chDgSrc,
  chOfaSrc,
  chPandaSrc,
  chQtSrc,
  chRsgSrc
} from "../dahsing-shared/_assets";

const activeNav = ref<string>("hot");

// 三列資料對齊原稿 .rows 三 row
const hotFeat = { zh: "DG 真人", en: "DG LIVE", img: chDgSrc };

// 為什麼 tag.icon 改為 DahsingIcon 自家 name：
// 原本 "material-symbols:xxx" 在 QIcon 上不會渲染（已造成 tag 跑版），全面改走 inline SVG 共用元件
const hotCards = [
  {
    zh: "QT 電子",
    en: "QT SLOTS",
    img: chQtSrc,
    tag: { text: "HOT", icon: "fire" as const }
  },
  { zh: "美女直播", en: "OFA GIRLS", img: chOfaSrc }
];

const liveCards = [
  { zh: "DG 百家", en: "DG BACCARAT", img: chDgSrc },
  { zh: "美女荷官", en: "OFA GIRLS", img: chOfaSrc },
  {
    zh: "RSG 真人",
    en: "RSG LIVE",
    img: chRsgSrc,
    tag: { text: "新", icon: "star" as const }
  }
];

const sportCards = [
  {
    zh: "熊貓體育",
    en: "PANDA SPORTS",
    img: chPandaSrc,
    tag: { text: "熱", icon: "fire" as const }
  },
  { zh: "滾球投注", en: "LIVE BET", img: chPandaSrc },
  { zh: "電競賽事", en: "E-SPORTS", img: chQtSrc }
];
</script>

<template>
  <div class="dahsing-horizontal-m">
    <DahsingMobileHeader />
    <DahsingHeroBanner width-mode="phone" />
    <DahsingMarquee />

    <div class="dahsing-horizontal-m__stage">
      <DahsingSidebar
        :active-key="activeNav"
        @update:active-key="activeNav = $event"
      />

      <main class="dahsing-horizontal-m__main">
        <div class="dahsing-horizontal-m__rows">
          <DahsingHorizontalRow
            title="熱門推薦"
            icon="fire"
            :feat-card="hotFeat"
            :cards="hotCards"
          />
          <DahsingHorizontalRow
            title="真人遊戲"
            icon="headphones"
            :cards="liveCards"
          />
          <DahsingHorizontalRow
            title="體育賽事"
            icon="soccer"
            :cards="sportCards"
          />
        </div>
      </main>
    </div>

    <DahsingHotBar />
    <DahsingTabBar />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-horizontal-m {
  position: relative;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 104px;
  background: var(--bg-base);

  // phone-frame 雙側陰影走 --shadow-phone token；金 / 紫變體用對應主色 rgba
  box-shadow: var(--shadow-phone, 0 0 60px rgba(120, 70, 30, 0.18));
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

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
