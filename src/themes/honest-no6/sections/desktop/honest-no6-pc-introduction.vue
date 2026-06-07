<script setup lang="ts">
import icon1 from "../../assets/desktop/intro-icon-1.png?url";
import icon2 from "../../assets/desktop/intro-icon-2.png?url";
import icon3 from "../../assets/desktop/intro-icon-3.png?url";
import icon4 from "../../assets/desktop/intro-icon-4.png?url";

const INTRO_ITEMS = [
  {
    img: icon1,
    title: "山日日 神祕禮包",
    content: "註冊送 1000，儲值再送 1000，流水僅算一次即可提現"
  },
  {
    img: icon2,
    title: "FG 商城獨家",
    content: "全網限定優惠商城正式上線，VIP 折扣最高 88%"
  },
  {
    img: icon3,
    title: "綁定帳戶安心",
    content: "多層金流加密，綁定無上限，提款秒到帳"
  },
  {
    img: icon4,
    title: "24h 客服在線",
    content: "Line @FG88 官方客服，全天候即時回應"
  }
];
</script>

<template>
  <div class="honest-no6-pc-intro">
    <div
      v-for="(item, index) in INTRO_ITEMS"
      :key="`intro-${index}`"
      class="honest-no6-pc-intro__item"
    >
      <img :src="item.img" :alt="item.title" class="honest-no6-pc-intro__img" />
      <div class="honest-no6-pc-intro__text">
        <p class="honest-no6-pc-intro__title">{{ item.title }}</p>
        <p class="honest-no6-pc-intro__content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-pc-intro {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 60px 8%;
  background: radial-gradient(
      ellipse 1700px 1400px at top right,
      hsla(var(--primary-h), var(--primary-s), 60%, 0.18) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 1200px 800px at 30% 120%,
      hsla(var(--secondary-h), var(--secondary-s), 60%, 0.1) 0%,
      transparent 70%
    ),
    var(--bg-base);

  &__item {
    display: flex;
    align-items: flex-end;
    font-weight: 500;
    gap: 30px;
  }

  &__img {
    width: 200px;
    aspect-ratio: 298 / 256;
    object-fit: contain;
    flex-shrink: 0;
    filter: hue-rotate(280deg) brightness(0.95);
  }

  &__text {
    flex: 1;
    padding-bottom: 12px;
  }

  &__title {
    font-size: 28px;
    font-weight: 600;
    background: linear-gradient(
      90deg,
      var(--secondary-01) 0%,
      var(--primary-01) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 12px;
  }

  &__content {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.6;
  }
}

@media (max-width: 1440px) {
  .honest-no6-pc-intro {
    &__title {
      font-size: 24px;
    }

    &__content {
      font-size: 14px;
    }

    &__img {
      width: 160px;
    }
  }
}
</style>
