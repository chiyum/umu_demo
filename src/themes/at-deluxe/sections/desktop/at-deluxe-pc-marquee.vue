<script setup lang="ts">
import newsIcon from "../../assets/icon/news.png?url";

/**
 * at-deluxe desktop 跑馬燈 — mobile-marquee 設計語言放大版
 *
 * 對齊原作 desktop.vue 第 323-339 行 .home-marquee：
 * - <img class="home-marquee--img" />
 * - <Vue3Marquee :pause-on-click :clone :duration>
 * - 文字 + 內容串接的 marquee-item
 *
 * Demo 化：上下青藍漸層細線 + news icon 動畫 + 6 條文字串接
 */

const MARQUEE_ITEMS = [
  "★【最新公告】 系統維護中，請稍候即可恢復服務 ★",
  "★【活動消息】 新用戶註冊即送 $100 體驗金，老用戶推薦再加碼 50% ★",
  "★【優惠資訊】 週末儲值送 50% 紅利，活動限時 72 小時 ★",
  "★【遊戲熱門】 ATG 戰神塞特跨夜爆獎 188 萬，歡迎挑戰 ★",
  "★【提領通知】 平台 7×24 小時即時提領，3 分鐘到帳 ★",
  "★【安全提醒】 請認明官方唯一網址，謹防仿冒網站詐騙 ★"
];
</script>

<template>
  <div class="at-deluxe-pc-marquee">
    <div class="at-deluxe-pc-marquee__inner">
      <div class="at-deluxe-pc-marquee__bar">
        <img :src="newsIcon" alt="" class="at-deluxe-pc-marquee__news-icon" />
        <div class="at-deluxe-pc-marquee__track">
          <span class="at-deluxe-pc-marquee__text">
            <span
              v-for="(item, idx) in MARQUEE_ITEMS"
              :key="idx"
              class="at-deluxe-pc-marquee__item"
            >
              {{ item }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-marquee {
  padding: 0 0 16px;
}

.at-deluxe-pc-marquee__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 16px;
}

.at-deluxe-pc-marquee__bar {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 24px;
  color: #ffffff;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--at-deluxe-marquee-line);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}

.at-deluxe-pc-marquee__news-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 18px;
  height: 22px;
  object-fit: contain;
  animation: at-deluxe-pc-news-zoom 1.5s infinite ease-in-out;
}

.at-deluxe-pc-marquee__track {
  flex: 1;
  margin-left: 24px;
  overflow: hidden;
  white-space: nowrap;
}

.at-deluxe-pc-marquee__text {
  display: inline-block;
  padding-left: 100%;
  animation: at-deluxe-pc-marquee-scroll 60s linear infinite;
  font-size: 14px;
  color: var(--text-on-primary);
}

.at-deluxe-pc-marquee__item {
  margin: 0 32px;
}

@keyframes at-deluxe-pc-news-zoom {
  0%,
  100% {
    transform: translateY(-50%) scale(1);
  }

  50% {
    transform: translateY(-50%) scale(1.2);
  }
}

@keyframes at-deluxe-pc-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
