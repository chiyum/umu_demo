<script setup lang="ts">
/**
 * honest-max 桌面版跑馬燈 — 視覺結構參考 slime-wu88-pc 主版面跑馬燈
 * 對齊原作 Vue3Marquee 背景半透黑 + 文字
 *
 * 配色：honest-max 桃粉藍綠混色風（白底品牌色字）
 * 喇叭 icon 用 inline SVG（max theme 沒有額外 announcement.png）
 */

const MARQUEE_TEXTS = [
  "★ 88WIN 注送 8,888 流水只需一次即可體現 ★",
  "★ KU 體育五大聯賽冠名贊助 西甲官方合作夥伴 ★",
  "★ 新會員首儲 1000 送 1000 立即註冊享好禮 ★",
  "★ KU 真人 / 3D 電子 / KU 體育 / KU 彩球 同步開放 ★"
];
</script>

<template>
  <div class="honest-max-pc-marquee">
    <div class="honest-max-pc-marquee__inner">
      <span class="honest-max-pc-marquee__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 2.05v2.06a8 8 0 0 1 0 15.78v2.06A10 10 0 0 0 14 2.05z"
          />
        </svg>
      </span>
      <div class="honest-max-pc-marquee__track">
        <span class="honest-max-pc-marquee__text">
          <span
            v-for="(msg, idx) in MARQUEE_TEXTS"
            :key="idx"
            class="honest-max-pc-marquee__item"
          >
            {{ msg }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 wu88 marquee：max 走桃粉藍綠漸層橫條（取代 no6 的半透黑）
.honest-max-pc-marquee {
  width: 100%;
  background: linear-gradient(
    90deg,
    var(--primary-01) 0%,
    var(--secondary-01) 100%
  );
}

.honest-max-pc-marquee__inner {
  display: flex;
  align-items: center;
  max-width: 1696px;
  margin: 0 auto;
  padding: 0 32px;
  height: 48px;
}

.honest-max-pc-marquee__icon {
  width: 26px;
  height: 22px;
  margin-right: 16px;
  flex-shrink: 0;
  color: var(--text-on-primary);
  display: inline-flex;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
}

.honest-max-pc-marquee__track {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}

.honest-max-pc-marquee__text {
  display: inline-block;
  padding-left: 100%;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-on-primary);
  animation: honest-max-pc-marquee-scroll 30s linear infinite;
}

.honest-max-pc-marquee__item {
  margin: 0 24px;
}

@keyframes honest-max-pc-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
