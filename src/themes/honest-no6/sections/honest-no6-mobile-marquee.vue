<script setup lang="ts">
import announcement from "../assets/marquee/announcement.png?url";

/**
 * honest-no6 mobile 跑馬燈 — 1:1 對齊 honest_real src/widgets/pages/no6/marquee.vue
 *
 * 原作 DOM：
 *   .marquee_wrap (padding 5px 10px / linear-gradient #48405a → #402937 / 圓角 10px)
 *     .marquee_content (flex / #08090d / 圓角 10px / 白字)
 *       .title (12% 寬 / center / <img announcement.png>)
 *       <vue3-marquee :speed="20" pauseOnHover>
 *         <div v-for items class="marquee-item">{{ item.text }}</div>
 *
 * 原作 items 6 條：
 *   ★【金流部門通知】★
 *   ★【營運部門通知】★
 *   ★【官方公告】★
 *   【綁定帳戶注意事項】
 *   ★【FG商城正式上線通知】★
 *   【鄭重聲明】請認明唯一官方Line帳號: @FG88
 *
 * Demo 化：CSS-only marquee，文字串接成一條，保留紫色 wrap + 黑色 content + 喇叭 icon
 */

const MARQUEE_ITEMS = [
  "★【金流部門通知】★",
  "★【營運部門通知】★",
  "★【官方公告】★",
  "【綁定帳戶注意事項】",
  "★【FG商城正式上線通知】★",
  "【鄭重聲明】請認明唯一官方Line帳號: @FG88"
];
</script>

<template>
  <div class="honest-no6-m-marquee-wrap">
    <div class="honest-no6-m-marquee-content">
      <div class="honest-no6-m-marquee-content__title">
        <img :src="announcement" alt="" />
      </div>
      <div class="honest-no6-m-marquee-content__track">
        <span class="honest-no6-m-marquee-content__text">
          <span
            v-for="(item, idx) in MARQUEE_ITEMS"
            :key="idx"
            class="honest-no6-m-marquee-content__item"
          >
            {{ item }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .marquee_wrap：padding 5px 10px / linear-gradient #48405a→#402937 / 圓角 10px
.honest-no6-m-marquee-wrap {
  margin: 6px 8px 0;
  padding: 5px 10px;
  background: linear-gradient(to bottom, #48405a, #402937);
  border-radius: 10px;
}

// 對齊原作 .marquee_content：flex / #08090d 黑底 / 圓角 10px / 白字
.honest-no6-m-marquee-content {
  display: flex;
  flex-flow: nowrap;
  background-color: #08090d;
  color: #ffffff;
  border-radius: 10px;
  height: 32px;
  overflow: hidden;
  align-items: center;

  // 對齊原作 .title：12% width / center
  &__title {
    width: 12%;
    min-width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 24px;
      height: 18px;
      object-fit: contain;
    }
  }

  &__track {
    flex: 1;
    overflow: hidden;
    display: flex;
    white-space: nowrap;
  }

  &__text {
    display: inline-block;
    padding-left: 100%;
    animation: honest-no6-marquee-scroll 30s linear infinite;
    font-size: 13px;
  }

  // 對齊原作 .marquee-item：margin 0 10px
  &__item {
    margin: 0 10px;
  }
}

@keyframes honest-no6-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
