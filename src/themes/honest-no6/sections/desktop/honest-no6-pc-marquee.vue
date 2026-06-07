<script setup lang="ts">
import announcement from "../../assets/marquee/announcement.png?url";

/**
 * honest-no6 桌面版跑馬燈 — 視覺結構參考 slime-wu88-pc 主版面跑馬燈
 * 對齊原作 Vue3Marquee 背景半透黑 + 文字
 *
 * 配色：honest-no6 紫黑神秘風（金字 + 喇叭 icon）
 */

const MARQUEE_TEXTS = [
  "★【金流部門通知】★",
  "★【營運部門通知】★",
  "★【官方公告】★",
  "【綁定帳戶注意事項】",
  "★【FG商城正式上線通知】★",
  "【鄭重聲明】請認明唯一官方 Line 帳號: @FG88"
];
</script>

<template>
  <div class="honest-no6-pc-marquee">
    <div class="honest-no6-pc-marquee__inner">
      <img :src="announcement" alt="" class="honest-no6-pc-marquee__icon" />
      <div class="honest-no6-pc-marquee__track">
        <span class="honest-no6-pc-marquee__text">
          <span
            v-for="(msg, idx) in MARQUEE_TEXTS"
            :key="idx"
            class="honest-no6-pc-marquee__item"
          >
            {{ msg }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 wu88 marquee：半透黑底滿寬橫條
.honest-no6-pc-marquee {
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.honest-no6-pc-marquee__inner {
  display: flex;
  align-items: center;
  max-width: 1696px;
  margin: 0 auto;
  padding: 0 32px;
  height: 48px;
}

.honest-no6-pc-marquee__icon {
  width: 26px;
  height: 22px;
  object-fit: contain;
  margin-right: 16px;
  flex-shrink: 0;
}

.honest-no6-pc-marquee__track {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}

.honest-no6-pc-marquee__text {
  display: inline-block;
  padding-left: 100%;
  font-size: 15px;
  font-weight: 600;
  color: var(--secondary-01);
  animation: honest-no6-pc-marquee-scroll 30s linear infinite;
}

.honest-no6-pc-marquee__item {
  margin: 0 24px;
}

@keyframes honest-no6-pc-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
