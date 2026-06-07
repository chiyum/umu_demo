<script setup lang="ts">
import icon1 from "../../assets/desktop/intro-icon-1.png?url";
import icon2 from "../../assets/desktop/intro-icon-2.png?url";
import icon3 from "../../assets/desktop/intro-icon-3.png?url";
import icon4 from "../../assets/desktop/intro-icon-4.png?url";

const INTRO_ITEMS = [
  {
    img: icon1,
    title: "KU 真人專場",
    content: "與西甲球員 KU x OSASUNA 跨界合作，獨家真人荷官"
  },
  {
    img: icon2,
    title: "3D 電子娛樂",
    content: "HD 3D 視覺呈現，多家品牌 KU / BNG / ZEBRA 任你選"
  },
  {
    img: icon3,
    title: "VIP 加碼活動",
    content: "邀請好友抽 1 億，VIP 等級越高加碼越多"
  },
  {
    img: icon4,
    title: "極速金流",
    content: "支援多家銀行 + 第三方支付，存提秒到帳"
  }
];
</script>

<template>
  <div class="honest-max-pc-intro">
    <div
      v-for="(item, index) in INTRO_ITEMS"
      :key="`intro-${index}`"
      class="honest-max-pc-intro__item"
    >
      <img :src="item.img" :alt="item.title" class="honest-max-pc-intro__img" />
      <div class="honest-max-pc-intro__text">
        <p class="honest-max-pc-intro__title">{{ item.title }}</p>
        <p class="honest-max-pc-intro__content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long introduction: 2-col grid / 圖左文右 / 角落柔光
.honest-max-pc-intro {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 60px 8%;
  background: radial-gradient(
      ellipse 1700px 1400px at top right,
      rgba(231, 91, 255, 0.12) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 1200px 800px at 30% 120%,
      rgba(62, 193, 245, 0.12) 0%,
      transparent 70%
    ),
    #f5f6fa;

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
  }

  &__text {
    flex: 1;
    padding-bottom: 12px;
  }

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: #2a1a3e;
    margin-bottom: 12px;
    background: linear-gradient(90deg, #e75bff 0%, #3ec1f5 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  &__content {
    font-size: 16px;
    color: #6d6486;
    line-height: 1.6;
  }
}

@media (max-width: 1440px) {
  .honest-max-pc-intro {
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
