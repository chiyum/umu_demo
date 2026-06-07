<script setup lang="ts">
import HonestNo6PcHeader from "./sections/desktop/honest-no6-pc-header.vue";
import HonestNo6PcBanner from "./sections/desktop/honest-no6-pc-banner.vue";
import HonestNo6PcMarquee from "./sections/desktop/honest-no6-pc-marquee.vue";
import HonestNo6PcPicMenu from "./sections/desktop/honest-no6-pc-pic-menu.vue";
import HonestNo6PcPlatforms from "./sections/desktop/honest-no6-pc-platforms.vue";
import HonestNo6PcRightBar from "./sections/desktop/honest-no6-pc-right-bar.vue";
import HonestNo6PcFooter from "./sections/desktop/honest-no6-pc-footer.vue";

/**
 * honest-no6 桌面版佈局 — 視覺結構參考 slime-wu88-pc 桌面首頁
 * （/Users/georgehuang/Documents/GitHub/slime-wu88-pc/src/pages/index.vue）
 *
 * 對應原作頂層 DOM：
 *   <MainNav :category />                ← 頂部 sticky 主導覽（含副選單）
 *   <Banner :bannerData :marqueeData />   ← swiper 大 banner + 跑馬燈
 *   <PicMenu />                            ← 4 張橫向活動卡
 *   <Footer :category />                   ← 底部多段（連結 + 廠商列表 + 大 logo）
 *   <RightBar />                           ← fixed 右側客服列
 *
 * 上一輪錯誤：用 kingdom_front 殼把桌面套五段範式（marquee/banner/online/intro/app/footer）
 * 本輪換用 wu88 視覺結構：header / banner / marquee / pic-menu / platforms / right-bar / footer
 *
 * 配色保留 honest-no6 紫黑神秘風（變體跟動 purple/midnight/crimson）
 */
</script>

<template>
  <div class="honest-no6-pc-layout">
    <HonestNo6PcHeader />
    <main class="honest-no6-pc-layout__main">
      <HonestNo6PcBanner />
      <HonestNo6PcMarquee />
      <div class="honest-no6-pc-layout__container">
        <HonestNo6PcPicMenu />
        <HonestNo6PcPlatforms />
      </div>
    </main>
    <HonestNo6PcFooter />
    <HonestNo6PcRightBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-pc-layout {
  position: relative;
  background: var(--bg-base);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.honest-no6-pc-layout__main {
  flex: 1;
}

.honest-no6-pc-layout__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
}
</style>
