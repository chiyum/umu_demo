<script setup lang="ts">
import { ref } from "vue";
import NoyaMobileTopBar from "./sections/noya-mobile-top-bar.vue";
import NoyaMobileAnnounceDialog from "./sections/noya-mobile-announce-dialog.vue";
import NoyaMobileBannerSwiper from "./sections/noya-mobile-banner-swiper.vue";
import NoyaMobileCategoryStrip from "./sections/noya-mobile-category-strip.vue";
import NoyaMobileRealPeopleList from "./sections/noya-mobile-real-people-list.vue";
import MobileBottomTabBar from "@/components/common/landing/mobile-bottom-tab-bar.vue";

/**
 * noya 手機版佈局：依 GAP_ANALYSIS 6 大區
 *
 * 1. MobileTopBar           fixed top bar (50px)
 * 2. MobileAnnounceDialog   開站 modal
 * 3. MobileBannerSwiper     橫向 swiper
 * 4. MobileCategoryStrip    分類橫條
 * 5. MobileRealPeopleList   直式卡片列表
 * 6. MobileBottomTabBar     fixed bottom (共用元件)
 *
 * 動機：手機版 layout 不能與桌面共用，因為 sticky top + bottom tab 都是
 * 行動裝置特化模式；桌面版的雙 banner / 4 欄 grid 也不適合直接縮給手機看。
 *
 * activeCategory 只在前端 demo 切高亮，不真正改 list 內容
 * （要做也可以，但 GAP 沒要求，留空間給後續擴充）
 */

const activeCategory = ref<string>("live");
</script>

<template>
  <div class="noya-m-layout">
    <NoyaMobileTopBar />
    <NoyaMobileAnnounceDialog />

    <main class="noya-m-layout__main">
      <NoyaMobileBannerSwiper />
      <NoyaMobileCategoryStrip
        :active-category="activeCategory"
        @update:active-category="activeCategory = $event"
      />
      <NoyaMobileRealPeopleList />
    </main>

    <MobileBottomTabBar />
  </div>
</template>

<style lang="scss" scoped>
.noya-m-layout {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
    // 預留底部 tab bar 空間（高約 56px，含 safe-area 取整 60）
    // 與 at99 mobile 一致：由父層統一處理，子元件保持單純
    padding-bottom: 60px;
  }
}
</style>
