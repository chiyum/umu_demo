<script setup lang="ts">
/**
 * dahsing-horizontal 桌面：Netflix-style 多 row 橫滾
 *
 * 桌面風格定位：以 mobile「rows 多列 scroller」為 DNA，桌面延伸成更多 row + 每 row 更多卡。
 * 借鑑來源：vietvip 的 hero-pc 概念 + fived 的橫滾卡片 + 自寫多 row 結構
 *
 * 結構：
 *   ┌─ DahsingPcTopbar（sticky）
 *   ├─ DahsingHeroBanner wide
 *   ├─ DahsingMarquee
 *   └─ 1280 container 兩欄
 *        ├─ 左 sidebar 96px sticky
 *        └─ 中央 .rows（4 列：熱門 / 真人 / 體育 / 電子）
 *   ┌─ DahsingHotBar 全寬置底
 *
 * 為什麼桌面多一列「電子」：mobile 只 3 列（熱門 / 真人 / 體育）；
 * 桌面空間多，補一列電子（QT / RSG / 招財）讓畫面不空。
 *
 * 為什麼不加翻頁鈕：scroll-snap-type x mandatory 在桌面用滑鼠 wheel 或觸控板自然滑順，
 * 加翻頁鈕反而干擾原作「無 chrome、純內容」的瀑布感（與 Netflix 同邏輯）
 */
import { ref } from "vue";
import DahsingPcTopbar from "../dahsing-shared/desktop/dahsing-pc-topbar.vue";
import DahsingHeroBanner from "../dahsing-shared/atoms/dahsing-hero-banner.vue";
import DahsingMarquee from "../dahsing-shared/atoms/dahsing-marquee.vue";
import DahsingSidebar from "../dahsing-shared/atoms/dahsing-sidebar.vue";
import DahsingHotBar from "../dahsing-shared/atoms/dahsing-hot-bar.vue";
import DahsingHorizontalRow from "./sections/dahsing-horizontal-row.vue";
import {
  chDgSrc,
  chMascotSrc,
  chOfaSrc,
  chPandaSrc,
  chQtSrc,
  chRsgSrc
} from "../dahsing-shared/_assets";

const activeNav = ref<string>("hot");

const hotFeat = { zh: "DG 真人", en: "DG LIVE", img: chDgSrc };

// 桌面每 row 卡片比 mobile 多（mobile 2-3 張、桌面 5-6 張）
const hotCards = [
  {
    zh: "QT 電子",
    en: "QT SLOTS",
    img: chQtSrc,
    tag: { text: "HOT", icon: "material-symbols:local-fire-department" }
  },
  { zh: "美女直播", en: "OFA GIRLS", img: chOfaSrc },
  { zh: "招財貓福袋", en: "FORTUNE CAT", img: chMascotSrc },
  { zh: "熊貓體育", en: "PANDA SPORTS", img: chPandaSrc },
  { zh: "RSG 電子", en: "RSG SLOTS", img: chRsgSrc }
];

const liveCards = [
  { zh: "DG 百家", en: "DG BACCARAT", img: chDgSrc },
  { zh: "美女荷官", en: "OFA GIRLS", img: chOfaSrc },
  {
    zh: "RSG 真人",
    en: "RSG LIVE",
    img: chRsgSrc,
    tag: { text: "新", icon: "material-symbols:star-outline" }
  },
  { zh: "DG 龍虎", en: "DRAGON TIGER", img: chDgSrc },
  { zh: "OFA 輪盤", en: "OFA ROULETTE", img: chOfaSrc }
];

const sportCards = [
  {
    zh: "熊貓體育",
    en: "PANDA SPORTS",
    img: chPandaSrc,
    tag: { text: "熱", icon: "material-symbols:local-fire-department" }
  },
  { zh: "滾球投注", en: "LIVE BET", img: chPandaSrc },
  { zh: "電競賽事", en: "E-SPORTS", img: chQtSrc },
  { zh: "PANDA NBA", en: "NBA PRO", img: chPandaSrc },
  { zh: "PANDA 籃球", en: "BASKET", img: chPandaSrc }
];

const slotCards = [
  {
    zh: "QT 老虎機",
    en: "QT JACKPOT",
    img: chQtSrc,
    tag: { text: "推", icon: "material-symbols:star-outline" }
  },
  { zh: "RSG 電子", en: "RSG SLOTS", img: chRsgSrc },
  { zh: "招財貓福袋", en: "FORTUNE CAT", img: chMascotSrc },
  { zh: "QT 水果盤", en: "QT FRUIT", img: chQtSrc },
  { zh: "RSG 金龍", en: "GOLD DRAGON", img: chRsgSrc }
];
</script>

<template>
  <div class="dahsing-horizontal-pc">
    <DahsingPcTopbar />

    <div class="dahsing-horizontal-pc__container">
      <DahsingHeroBanner width-mode="wide" />
      <DahsingMarquee />

      <div class="dahsing-horizontal-pc__stage">
        <aside class="dahsing-horizontal-pc__sidebar">
          <DahsingSidebar
            :active-key="activeNav"
            @update:active-key="activeNav = $event"
          />
        </aside>

        <main class="dahsing-horizontal-pc__main">
          <div class="dahsing-horizontal-pc__rows">
            <DahsingHorizontalRow
              title="熱門推薦"
              icon="material-symbols:local-fire-department"
              :feat-card="hotFeat"
              :cards="hotCards"
            />
            <DahsingHorizontalRow
              title="真人遊戲"
              icon="material-symbols:headphones-outline"
              :cards="liveCards"
            />
            <DahsingHorizontalRow
              title="體育賽事"
              icon="material-symbols:sports-soccer"
              :cards="sportCards"
            />
            <DahsingHorizontalRow
              title="電子遊戲"
              icon="material-symbols:casino-outline"
              :cards="slotCards"
            />
          </div>
        </main>
      </div>

      <DahsingHotBar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-horizontal-pc {
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

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
}
</style>
