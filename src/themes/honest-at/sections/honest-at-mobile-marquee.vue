<script setup lang="ts">
import marqueeIcon from "../assets/header/marquee-icon.png?url";

/**
 * honest-at mobile 跑馬燈 — 1:1 對齊 honest_real at/home.vue 第 44-55 行
 *
 * 原作 DOM：
 *   .at-home-marquee-wrap
 *     .at-home-marquee
 *       [q-img marquee-icon 10115.png]
 *       <Marquee :texts="tempMarquee" />  ← swiper vertical autoplay 滾動文字
 *
 * 原作 SCSS：
 *   - .at-home-marquee 25px / rgba(12,18,22,0.8) / position relative
 *   - 上下 1px linear-gradient(#1b1e1a,#3aa2ec,#1c1e1c) border
 *   - .at-home-marquee-icon absolute top 6px / 20px×15px / bg #000
 *   - .at-home-marquee-wrap padding 0 4px / position absolute
 *
 * 注意：原作 home.vue 順序是「header → marquee → Banner」，但 marquee 是
 * position absolute 浮在 banner 之上（z-index: 2，icon: 6）
 *
 * Demo 化：保留視覺結構但用 CSS-only 跑馬燈動畫（不裝 swiper），維持原作的：
 *   - 高度 25px
 *   - 半透明黑底 + 上下青藍漸層線
 *   - 左側 marquee icon（20×15 黑底）
 *   - 文字白色從右滑到左
 */

// 原作 tempMarquee 第二筆完整文字，與原作一致
const MARQUEE_TEXT =
  "⭐️004 臺灣銀行於 07/13 20:00 至 21:00 進行維護，維護期間暫停跨行交易服務，感謝您的支持 ⭐AT99 本月 VIP 會員福利【儲值回饋券】已發送至站內信箱 ⭐由於目前銀行維護中，單筆提款最高為 20 萬 ⭐臨時維護通知【TF 電競】即刻起進行臨時維護 ⭐遊戲上線通知：【FTG 電子】新增遊戲：馬雅末日 Maya Doomsday ⭐歡迎光臨，AT99 陪伴您渡過每一個遊戲的歡樂時光";
</script>

<template>
  <div class="honest-at-m-marquee-wrap">
    <div class="honest-at-m-marquee">
      <img :src="marqueeIcon" alt="" class="honest-at-m-marquee__icon" />
      <div class="honest-at-m-marquee__track">
        <span class="honest-at-m-marquee__text">{{ MARQUEE_TEXT }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .at-home-marquee-wrap：padding 0 4px，width 100%
// 不用 position absolute（demo 不需要浮在 banner 上）
.honest-at-m-marquee-wrap {
  padding: 0 4px;
  width: 100%;
}

// 對齊原作 .at-home-marquee：25px / rgba(12,18,22,0.8) / 上下青藍線
.honest-at-m-marquee {
  position: relative;
  height: 25px;
  padding: 0.5rem 0;
  color: var(--text-on-primary);
  background: var(--honest-at-marquee-bg);
  z-index: 2;
  overflow: hidden;
  display: flex;
  align-items: center;

  // 上下兩條霓虹線：linear-gradient 透過 token --honest-at-marquee-line 跟動變體
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--honest-at-marquee-line);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--honest-at-marquee-line);
  }

  // 對齊原作 .at-home-marquee-icon：absolute top 6px / 20px×15px / bg #000
  &__icon {
    position: absolute;
    top: 6px;
    left: 4px;
    width: 20px;
    height: 15px;
    background: #000000;
    z-index: 6;
    object-fit: contain;
  }

  &__track {
    margin-left: 30px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
  }

  // CSS-only 跑馬燈動畫
  &__text {
    font-size: 12px;
    color: var(--honest-at-marquee-text);
    display: inline-block;
    padding-left: 100%;
    animation: honest-at-m-marquee-scroll 30s linear infinite;
  }
}

@keyframes honest-at-m-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
