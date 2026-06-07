<script setup lang="ts">
import banner1 from "../assets/banner/banner-1.png?url";
import announcement from "../assets/marquee/announcement.png?url";
import info1 from "../assets/header/info-1.png?url";
import info2 from "../assets/header/info-2.png?url";
import info3 from "../assets/header/info-3.png?url";

/**
 * honest-no6 mobile hero — 對齊 honest_real no6/home.vue 第 16-58 行
 *
 * 原作結構：
 *   .home__banner（城堡大門 + 3 戰士剪影 banner.png，疊 hero 大字「山日日」+「儲值 1000 試送 1000」）
 *   .home__marquee（公告小喇叭 + 跑馬燈：公告 / 綁定帳戶注意事項 / FG 商城）
 *   .grid grid-cols-3 三張資訊小圖（1.png / 2.png / 3.png）
 *
 * 為什麼把 hero / marquee / info 三段封裝同一個 section：
 * - 原作 home.vue 也是連續排列在 .home__banner / .home__marquee / .grid 三段，視覺上是首屏
 * - hero 的疊字「山日日」必須擋在 banner 圖上方，獨立 section 拆出去語意不對
 */
</script>

<template>
  <section class="honest-no6-m-hero">
    <!-- banner 圖 + 疊字 -->
    <div class="honest-no6-m-hero__banner">
      <img :src="banner1" alt="" class="honest-no6-m-hero__img" />
      <div class="honest-no6-m-hero__overlay">
        <div class="honest-no6-m-hero__title">山日日</div>
        <div class="honest-no6-m-hero__sub">
          <span class="honest-no6-m-hero__sub-em">儲值 1000 試送 1000</span>
          <span class="honest-no6-m-hero__sub-tail">
            流水只算一次即可提現
          </span>
        </div>
        <div class="honest-no6-m-hero__tags">
          <span class="honest-no6-m-hero__tag">註冊送現金</span>
          <span class="honest-no6-m-hero__tag">儲值送更多</span>
        </div>
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="honest-no6-m-hero__marquee">
      <img :src="announcement" alt="" class="honest-no6-m-hero__marquee-icon" />
      <div class="honest-no6-m-hero__marquee-track">
        <span class="honest-no6-m-hero__marquee-text">
          公告 ★ 綁定帳戶注意事項 ★ FG 商城 ★ 玩家保密協議 ★ 客服 24h 服務 ★
          回頭客 VIP 福利已發送至站內信箱，歡迎查收
        </span>
      </div>
    </div>

    <!-- 三張資訊小圖 -->
    <div class="honest-no6-m-hero__info">
      <img :src="info1" alt="" />
      <img :src="info2" alt="" />
      <img :src="info3" alt="" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.honest-no6-m-hero {
  position: relative;
  display: flex;
  flex-direction: column;
}

.honest-no6-m-hero__banner {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
}

.honest-no6-m-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// 疊字 overlay：title 「山日日」白字大字 + sub 粉色行銷句
.honest-no6-m-hero__overlay {
  position: absolute;
  inset: 0;
  padding: 60px 14px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  background: var(--honest-no6-hero-fade);
  pointer-events: none;
}

.honest-no6-m-hero__title {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 8px;
  color: #ffffff;
  text-shadow:
    0 0 14px hsla(var(--primary-h), var(--primary-s), 50%, 0.7),
    0 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 6px;
}

.honest-no6-m-hero__sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  &-em {
    background: var(--gradient-gold);
    background-clip: text;
    color: transparent;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 1px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.55));
  }

  &-tail {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  }
}

.honest-no6-m-hero__tags {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.honest-no6-m-hero__tag {
  padding: 4px 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--primary-01);
  color: var(--primary-02);
  font-size: 11px;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

// ─────── 跑馬燈 ───────
.honest-no6-m-hero__marquee {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 8px 0;
  padding: 6px 10px;
  background: var(--honest-no6-marquee-bg);
  border: 1px solid var(--honest-no6-marquee-border);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(6px);
}

.honest-no6-m-hero__marquee-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex: none;
}

.honest-no6-m-hero__marquee-track {
  flex: 1;
  overflow: hidden;
  display: flex;
  white-space: nowrap;
}

.honest-no6-m-hero__marquee-text {
  font-size: 12px;
  color: var(--secondary-01);
  display: inline-block;
  padding-left: 100%;
  animation: honest-no6-marquee 32s linear infinite;
}

@keyframes honest-no6-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

// ─────── 三張資訊小圖 ───────
.honest-no6-m-hero__info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
}
</style>
