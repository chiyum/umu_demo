<script setup lang="ts">
import news from "../assets/icon/news.png?url";

/**
 * at-deluxe mobile 跑馬燈 — 對齊 slime-at99 mobile.vue .mb-home-news / .mb-home-marquee
 *
 * 原作 DOM：
 *   .mb-home-news (margin 8px 0)
 *     .mb-home-news--new (relative / flex center / 28px / border-radius 50px
 *                         + ::before/::after 上下青藍漸層線)
 *       .mb-home-marquee (padding-left 20px / ::before news.png 16x20 + zoomInOut 動畫)
 *         <Vue3Marquee />
 *
 * Demo 化：
 *   - 上下青藍漸層細線（var(--at-deluxe-marquee-line)）
 *   - news 圖示 zoomInOut 1.5s 動畫
 *   - CSS-only marquee（與 honest-no6 同套）
 *   - 文字 6 條對齊原作 marqueeData 的「公告 / 維護通知」風格
 */

const MARQUEE_ITEMS = [
  "★【預防詐騙公告】★ 請勿相信任何不明的代儲、代操業者或不正規的點數儲值渠道",
  "【部分託售通道維護通知】 目前託售通道進行臨時維護中，造成您的不便請見諒",
  "【小額通道維護通知】 目前小額通道進行臨時維護中，維護期間僅開放部分通道",
  "★【固定銀行維護通知】★ 700 郵局每日 00:00 至 01:30 (台灣時間)固定時間維護",
  "【APL 固定遊戲維護通知】 每日 06:00-07:00 進行例行維護，維護期間玩家無法進入遊戲",
  "★【SP 電子遊戲維護通知】★ 即刻起進行臨時維護，結束時間另行通知"
];
</script>

<template>
  <div class="at-deluxe-m-marquee">
    <div class="at-deluxe-m-marquee__bar">
      <img :src="news" alt="" class="at-deluxe-m-marquee__news-icon" />
      <div class="at-deluxe-m-marquee__track">
        <span class="at-deluxe-m-marquee__text">
          <span
            v-for="(item, idx) in MARQUEE_ITEMS"
            :key="idx"
            class="at-deluxe-m-marquee__item"
          >
            {{ item }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 mb-home-news：margin 8px 0
.at-deluxe-m-marquee {
  margin: 8px 0;
  padding: 0 10px;
}

// 對齊原作 .mb-home-news--new：relative / flex center / 28px / border-radius 50px
// + ::before/::after 上下漸層細線
.at-deluxe-m-marquee__bar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 28px;
  color: #ffffff;
  background: transparent;
  border-radius: 50px;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--at-deluxe-marquee-line);
    z-index: 1;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}

// 對齊原作 mb-home-marquee::before news.png + zoomInOut 1.5s ease-in-out
.at-deluxe-m-marquee__news-icon {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 20px;
  object-fit: contain;
  animation: at-deluxe-zoom-in-out 1.5s infinite ease-in-out;
  z-index: 2;
}

.at-deluxe-m-marquee__track {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 16px;
}

.at-deluxe-m-marquee__text {
  display: inline-block;
  padding-left: 100%;
  animation: at-deluxe-marquee-scroll 38s linear infinite;
  font-size: 13px;
  color: var(--text-on-primary);
}

.at-deluxe-m-marquee__item {
  margin: 0 18px;
}

@keyframes at-deluxe-zoom-in-out {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

@keyframes at-deluxe-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
