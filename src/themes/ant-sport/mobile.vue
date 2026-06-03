<script setup lang="ts">
import AntSportMobileHeader from "./sections/ant-sport-mobile-header.vue";
import AntSportMobileBannerSwiper from "./sections/ant-sport-mobile-banner-swiper.vue";
import AntSportMobileMarquee from "./sections/ant-sport-mobile-marquee.vue";
import AntSportMobileUserCard from "./sections/ant-sport-mobile-user-card.vue";
import AntSportMobileGameMenu from "./sections/ant-sport-mobile-game-menu.vue";
import AntSportMobileBottomNav from "./sections/ant-sport-mobile-bottom-nav.vue";

/**
 * ant-sport 手機版佈局 — 對齊 lilian_ant_web src/pages/home.vue 五段結構
 *
 * 由上到下：
 * 1. Header      頂部 logo bar（左 logo / 右訊息 icon）
 * 2. BannerSwiper 全寬輪播 banner（4 張原 banner）
 * 3. Marquee     跑馬燈
 * 4. UserCard    會員卡（帳號 / VIP / 餘額 + 4 個快捷功能）
 * 5. GameMenu    遊戲類別矩陣（體育大卡 + 6 類小卡）
 * 底部：專屬 BottomNav，原蚂蚁體育 5 個 webp/png icon
 *
 * 整體背景：var(--bg-decoration) 角落柔光 + var(--bg-base)，
 * 對齊 noya kingdom DNA #9 設計語言；配色變體切換時 token 全部跟著走
 */
</script>

<template>
  <div class="ant-sport-m-layout">
    <AntSportMobileHeader />
    <main class="ant-sport-m-layout__main">
      <AntSportMobileBannerSwiper />
      <AntSportMobileMarquee />
      <AntSportMobileUserCard />
      <AntSportMobileGameMenu />
    </main>
    <AntSportMobileBottomNav />
  </div>
</template>

<style lang="scss" scoped>
.ant-sport-m-layout {
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;

    // 預留底部 fixed nav 空間，避免最後一段被遮
    padding-bottom: 68px;
  }
}
</style>
