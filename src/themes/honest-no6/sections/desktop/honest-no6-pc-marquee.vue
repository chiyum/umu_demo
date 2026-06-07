<script setup lang="ts">
import announcement from "../../assets/marquee/announcement.png?url";

/**
 * honest-no6 桌面版跑馬燈 — 視覺骨架對齊 kingdom long marquee
 * 配色：no6 紫黑神秘風 + 金色文字
 */

const MARQUEE_TEXTS = [
  "★【金流部門通知】★",
  "★【營運部門通知】★",
  "★【官方公告】★",
  "【綁定帳戶注意事項】",
  "★【FG商城正式上線通知】★",
  "【鄭重聲明】請認明唯一官方Line帳號: @FG88"
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
.honest-no6-pc-marquee {
  width: 100%;
  background: linear-gradient(
    180deg,
    var(--bg-surface) 0%,
    var(--bg-base-deep) 100%
  );

  &__inner {
    display: flex;
    align-items: center;
    padding: 0 min(60px, 3.125%);
    height: 62px;
    max-width: 1696px;
    margin: 0 auto;
    background: var(--bg-base-deep);
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 10px;
  }

  &__icon {
    width: 28px;
    height: 22px;
    object-fit: contain;
    margin-right: 20px;
    flex-shrink: 0;
  }

  &__track {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
  }

  &__text {
    display: inline-block;
    padding-left: 100%;
    font-size: 16px;
    font-weight: 600;
    color: var(--secondary-01);
    animation: honest-no6-pc-marquee-scroll 30s linear infinite;
  }

  &__item {
    margin: 0 24px;
  }
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
