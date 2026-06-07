<script setup lang="ts">
import marqueeIcon from "../../assets/desktop/marquee-icon.png?url";

/**
 * honest-max 桌面版跑馬燈 — 視覺骨架參考 kingdom_front long/marquee.vue
 * 配色：honest-max 桃粉藍綠混色（自家手機 token 配色語言）
 */

const MARQUEE_TEXTS = [
  "88WIN 注送 8,888 流水只需一次即可體現",
  "KU 體育五大聯賽冠名贊助 西甲官方合作夥伴",
  "新會員首儲 1000 送 1000 立即註冊享好禮"
];
</script>

<template>
  <div class="honest-max-pc-marquee">
    <div class="honest-max-pc-marquee__inner">
      <img :src="marqueeIcon" alt="" class="honest-max-pc-marquee__icon" />
      <div class="honest-max-pc-marquee__track">
        <span class="honest-max-pc-marquee__text">
          <span
            v-for="(msg, idx) in MARQUEE_TEXTS"
            :key="idx"
            class="honest-max-pc-marquee__item"
          >
            ★ {{ msg }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long/marquee：62px / 左右 padding / 配色改為 max 桃粉漸層
.honest-max-pc-marquee {
  width: 100%;
  background: linear-gradient(
    90deg,
    var(--primary-01) 0%,
    var(--secondary-01) 100%
  );

  &__inner {
    display: flex;
    align-items: center;
    padding: 0 min(60px, 3.125%);
    height: 62px;
    max-width: 1696px;
    margin: 0 auto;
  }

  &__icon {
    width: 28px;
    height: 28px;
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
    color: var(--text-on-primary);
    animation: honest-max-pc-marquee-scroll 30s linear infinite;
    text-shadow: 0 1px 2px hsla(var(--primary-h), var(--primary-s), 30%, 0.3);
  }

  &__item {
    margin: 0 24px;
  }
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
