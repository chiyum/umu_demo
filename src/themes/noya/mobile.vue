<script setup lang="ts">
import { ref } from "vue";
import NoyaMobileTopBar from "./sections/noya-mobile-top-bar.vue";
import NoyaMobileAnnounceDialog from "./sections/noya-mobile-announce-dialog.vue";
import NoyaMobileBannerSwiper from "./sections/noya-mobile-banner-swiper.vue";
import NoyaMobileCategorySidebar from "./sections/noya-mobile-category-sidebar.vue";
import NoyaMobileRealPeopleList from "./sections/noya-mobile-real-people-list.vue";
import MobileBottomTabBar from "@/components/common/landing/mobile-bottom-tab-bar.vue";

/**
 * noya 手機版佈局 — round 4 結構對齊：類別「左側 sidebar」
 *
 * 對齊原站 5168th.com/noya/：
 * - TopBar (sticky 50px) + 公告 modal 維持不動
 * - Banner swiper 在頂部，全寬
 * - 主內容區分兩欄：左 76px sidebar + 右 main（捲動）
 *   原本是 banner → 橫排 category strip → list；
 *   round 4 改為 banner → 二欄 row（sidebar 在左、list 在右）
 * - 底部 fixed tab bar，中央凸起「登入」由共用元件 prop 控制
 *
 * 為何不把 banner 也納入 row（讓 sidebar 從畫面頂到底）：
 * 原站 banner 仍是全寬橫向佔據頂部，sidebar 只從跑馬燈下方開始；
 * 與原站視覺結構一致。
 */

const activeCategory = ref<string>("live");

/**
 * noya mobile 的 bottom tab 對齊原站結構：5 個 icon，中央「登入」凸起
 *
 * 原站順序：首頁 / 在線客服 / 登入 / APP 下載 / 進入官網
 * Round 5：icon 全部走 Iconify Material Symbols Outlined（全站統一），
 * 同樣語意（客服 / APP / 登入）跨版面用相同 icon name，視覺保持一致
 */
const tabItems = [
  { key: "home", icon: "material-symbols:home-outline", label: "首頁" },
  {
    key: "service",
    icon: "material-symbols:support-agent",
    label: "客服"
  },
  {
    key: "login",
    icon: "material-symbols:person-outline",
    label: "登入",
    raised: true
  },
  { key: "app", icon: "material-symbols:smartphone-outline", label: "APP" },
  { key: "site", icon: "material-symbols:language", label: "官網" }
];
</script>

<template>
  <div class="noya-m-layout">
    <NoyaMobileTopBar />
    <NoyaMobileAnnounceDialog />

    <!-- Banner 全寬，獨立在 row 上方 -->
    <NoyaMobileBannerSwiper />

    <!-- 左 sidebar + 右 main 的 row（對齊原站 5168th.com/noya/ 結構） -->
    <div class="noya-m-layout__row">
      <NoyaMobileCategorySidebar
        :active-category="activeCategory"
        @update:active-category="activeCategory = $event"
      />
      <main class="noya-m-layout__main">
        <NoyaMobileRealPeopleList />
      </main>
    </div>

    <MobileBottomTabBar :items="tabItems" />
  </div>
</template>

<style lang="scss" scoped>
.noya-m-layout {
  // kingdom DNA #9：mobile layout 同樣套角落柔光，與 desktop 視覺語言一致
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__row {
    flex: 1;
    display: flex;
    align-items: stretch;

    // 預留底部 tab bar 空間（高約 56px，含 safe-area 取整 60）
    padding-bottom: 60px;
  }

  &__main {
    flex: 1;
    min-width: 0;

    // main 自身可捲動（與 sidebar 平行），避免 sidebar 被推下去
    overflow-y: auto;
  }
}
</style>
