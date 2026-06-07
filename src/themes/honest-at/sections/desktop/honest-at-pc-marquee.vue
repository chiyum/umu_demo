<script setup lang="ts">
import marqueeIcon from "../../assets/desktop/marquee-icon.png?url";

/**
 * honest-at 桌面版跑馬燈 — 參考 kingdom_front long/marquee.vue
 *
 * 視覺骨架：
 *   .pc-marquee 62px 高 / 左右 padding / 左側 icon + 右側橫向跑馬燈文字
 *   原作 kingdom 用 linear-gradient(#blue-accent → #blue-2) 藍底
 *   honest-at 改用自家 #14171d 深底 + 青藍霓虹光線（對齊手機 marquee 設計語言）
 */

const MARQUEE_TEXTS = [
  "AT99 本月 VIP 會員福利【儲值回饋券】已發送至站內信箱",
  "遊戲上線通知：【FTG 電子】新增遊戲 馬雅末日 Maya Doomsday",
  "歡迎光臨，AT99 陪伴您渡過每一個遊戲的歡樂時光"
];
</script>

<template>
  <div class="honest-at-pc-marquee">
    <div class="honest-at-pc-marquee__inner">
      <img :src="marqueeIcon" alt="" class="honest-at-pc-marquee__icon" />
      <div class="honest-at-pc-marquee__track">
        <span class="honest-at-pc-marquee__text">
          <span
            v-for="(msg, idx) in MARQUEE_TEXTS"
            :key="idx"
            class="honest-at-pc-marquee__item"
          >
            ★ {{ msg }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long/marquee: 62px / 左右 padding / 上下青藍漸層線（取自手機 marquee）
.honest-at-pc-marquee {
  width: 100%;
  background: linear-gradient(90deg, #14171d 0%, #1a2540 100%);
  border-top: 1px solid #3aa2ec;
  border-bottom: 1px solid #3aa2ec;
  box-shadow: 0 0 12px rgba(58, 162, 236, 0.3);

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
    color: #ffffff;
    animation: honest-at-pc-marquee-scroll 30s linear infinite;
  }

  &__item {
    margin: 0 24px;
    color: #3aa2ec;

    &:first-child {
      color: #ffd57c;
    }
  }
}

@keyframes honest-at-pc-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
