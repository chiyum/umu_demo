<script setup lang="ts">
import newsIcon from "../../assets/desktop/home/news.png?url";

/**
 * at99 桌面版跑馬燈 — 視覺結構參考 slime-at99 desktop.vue .home-marquee
 *
 * 原作 DOM：
 *   .home-marquee
 *     <img.home-marquee--img />  ← news icon
 *     <Vue3Marquee>
 *       <span.home-marquee--item v-for />
 *
 * 原作 SCSS：
 *   高度 40px / 25px margin
 *   上下兩條 2px 青藍漸層線 (::before / ::after，至 #3aa2ec)
 *   左→右 透明→黑0.3→透明 暗底
 */

const MARQUEE_DATA = [
  { title: "最新公告", content: "系統維護中，請稍候" },
  { title: "活動消息", content: "新用戶註冊即送 $100" },
  { title: "優惠資訊", content: "週末充值送 50%" },
  { title: "VIP 福利", content: "本月儲值回饋券已發送至站內信箱" }
];
</script>

<template>
  <div class="at99-pc-marquee">
    <img :src="newsIcon" alt="" class="at99-pc-marquee__icon" />
    <div class="at99-pc-marquee__track">
      <span class="at99-pc-marquee__text">
        <span
          v-for="(item, idx) in MARQUEE_DATA"
          :key="idx"
          class="at99-pc-marquee__item"
        >
          【{{ item.title }}】 {{ item.content }}
        </span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .home-marquee：
//   高度 40px / 上下兩條 2px 霓虹漸層線 / 中央暗底
//   霓虹色用 var(--color-primary) 讓變體跟動
.at99-pc-marquee {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  margin: 25px 0;
  padding: 0 16px;
  overflow: hidden;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.32),
    transparent
  );

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      var(--color-primary),
      transparent
    );
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  &__icon {
    width: 22px;
    height: 22px;
    object-fit: contain;
    margin-right: 14px;
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
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    animation: at99-pc-marquee-scroll 24s linear infinite;
  }

  &__item {
    margin: 0 24px;
    color: var(--color-accent);
  }
}

@keyframes at99-pc-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
