<script setup lang="ts">
import VietvipMobileHeader from "./sections/vietvip-mobile-header.vue";
import VietvipMobileBanner from "./sections/vietvip-mobile-banner.vue";
import VietvipMobileMarquee from "./sections/vietvip-mobile-marquee.vue";
import VietvipMobileUserCard from "./sections/vietvip-mobile-user-card.vue";
import VietvipMobileGameMenu from "./sections/vietvip-mobile-game-menu.vue";
import VietvipMobileBuoy from "./sections/vietvip-mobile-buoy.vue";
import VietvipMobileTabBar from "./sections/vietvip-mobile-tab-bar.vue";

/**
 * vietvip 手機版佈局 — 對齊 lilian_vietvip_web src/pages/home.vue 五段結構
 *
 * 由上到下：
 * 1. Header     頂部 logo bar + 訊息 icon + 註冊/登入按鈕（原專案無註冊/登入，demo 補入）
 * 2. Banner     SwiperJS 風格輪播 banner（自製 + 金邊 + 葉脈光帶）
 * 3. Marquee    跑馬燈
 * 4. UserCard   會員資料卡（VIP 等級徽章 + 餘額 + 4 個快捷功能）
 * 5. GameMenu   遊戲選單（左 7 分類 sidebar + 右 7 個分類橫向滾動卡）
 * 浮窗：Buoy（fixed 右側、上下擺動，原專案的小遊戲入口）
 * 底部：TabBar（fixed 5 tab：首頁 / 優惠 / 錢包 / 客服 / 我的）
 *
 * 整體背景：var(--vietvip-bg-img)（home_background2.png）+ 半透紅色漸層蓋層
 * 對齊原專案 home.vue 第 5-13 行 `v-bg-image-load` 指令的兩層背景：
 *   - old: home_background_middle2.png（暗紅光帶）
 *   - cover: home_background2.png（深紅葉脈金邊）
 * Demo 站用 CSS background 雙層疊圖實現同樣視覺，不需動態 directive
 *
 * 為什麼整頁背景大圖必須 fixed：
 * - 原專案就是 fixed（home.vue isFixed: true）
 * - 不 fixed 時跑馬燈 / 卡片下方就直接看到 bg-base 深酒紅純色，失去葉脈金邊質感
 * - 配合 background-attachment: scroll（不是 fixed）避免 iOS 上的 parallax bug
 */
</script>

<template>
  <div class="vietvip-m-layout">
    <!-- 大背景圖（home_background2.png）作為 absolute 圖層蓋滿 viewport
         分離出 div 而非用 layout 的 background 屬性：
         - 圖只需顯示在「viewport 上方 480px」，下方延伸用純色 bg-base 即可
         - 用 div 配 mask-image 漸隱讓圖往下淡出，銜接卡片區的深紅底
    -->
    <div class="vietvip-m-layout__bg" aria-hidden="true" />

    <VietvipMobileHeader />

    <main class="vietvip-m-layout__main">
      <VietvipMobileBanner />
      <VietvipMobileMarquee />
      <VietvipMobileUserCard />
      <VietvipMobileGameMenu />
    </main>

    <VietvipMobileBuoy />
    <VietvipMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.vietvip-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-on-primary);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  overflow: hidden;

  // 整頁紅金葉脈大底圖（home_background2.png）
  // 用 absolute + mask 漸隱：上方 480px 顯示圖、再下方淡出到 bg-base 深酒紅純色
  &__bg {
    position: absolute;
    inset: 0 0 auto;
    height: 480px;
    z-index: 0;
    background-image: var(--vietvip-bg-img);
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;

    // 上方有圖、下方漸隱：銜接卡片區的深紅底
    mask-image: linear-gradient(
      180deg,
      #000000 0%,
      #000000 60%,
      transparent 100%
    );
    pointer-events: none;
  }

  // 所有 section 都壓在背景之上
  > *:not(&__bg) {
    position: relative;
    z-index: 1;
  }

  &__main {
    flex: 1;

    // 底部留出 tab bar 空間（高約 70px + safe-area）
    padding-bottom: calc(96px + env(safe-area-inset-bottom));
  }
}
</style>
