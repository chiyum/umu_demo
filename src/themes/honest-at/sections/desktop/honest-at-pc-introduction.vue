<script setup lang="ts">
import icon1 from "../../assets/desktop/intro-icon-1.png?url";
import icon2 from "../../assets/desktop/intro-icon-2.png?url";
import icon3 from "../../assets/desktop/intro-icon-3.png?url";
import icon4 from "../../assets/desktop/intro-icon-4.png?url";

/**
 * honest-at 桌面版「品牌特色」 — 參考 kingdom_front long/desktop/introduction.vue
 *
 * 視覺骨架：grid-template-columns repeat(2, 1fr) / padding 0 8% 60px / 大圖 + title + content
 * 配色：原作淡藍漸層白底，honest-at 改深藍底 + 青藍霓虹高光
 */

const INTRO_ITEMS = [
  {
    img: icon1,
    title: "霓虹電競",
    content: "AT99 24h 不打烊，提供完整電競賽事直播與即時下注"
  },
  {
    img: icon2,
    title: "JACKPOT 累積獎池",
    content: "全站玩家共享獎池，分分秒秒累積驚喜大獎"
  },
  {
    img: icon3,
    title: "日返 1% 無上限",
    content: "VIP 會員每日穩定回饋 1%，越玩越賺不封頂"
  },
  {
    img: icon4,
    title: "極速存提",
    content: "智慧多通道金流，存款 1 分鐘提款 3 分鐘到帳"
  }
];
</script>

<template>
  <div class="honest-at-pc-intro">
    <div
      v-for="(item, index) in INTRO_ITEMS"
      :key="`intro-${index}`"
      class="honest-at-pc-intro__item"
    >
      <img :src="item.img" :alt="item.title" class="honest-at-pc-intro__img" />
      <div class="honest-at-pc-intro__text">
        <p class="honest-at-pc-intro__title">{{ item.title }}</p>
        <p class="honest-at-pc-intro__content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long/desktop/introduction：grid 2 col / padding 0 8% 60px / 角落柔光
.honest-at-pc-intro {
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
      hsla(var(--secondary-h), var(--secondary-s), 60%, 0.12) 0%,
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
  }

  &__text {
    flex: 1;
    padding-bottom: 12px;
  }

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: var(--honest-at-pc-intro-title-color);
    margin-bottom: 12px;
    text-shadow: 0 0 8px hsla(var(--primary-h), var(--primary-s), 60%, 0.4);
  }

  &__content {
    font-size: 16px;
    color: var(--honest-at-tab-text-muted);
    line-height: 1.6;
  }
}

@media (max-width: 1440px) {
  .honest-at-pc-intro {
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
