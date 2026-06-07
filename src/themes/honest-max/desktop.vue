<script setup lang="ts">
import HonestMaxPcHeader from "./sections/desktop/honest-max-pc-header.vue";
import HonestMaxPcBanner from "./sections/desktop/honest-max-pc-banner.vue";
import HonestMaxPcMarquee from "./sections/desktop/honest-max-pc-marquee.vue";
import HonestMaxPcPicMenu from "./sections/desktop/honest-max-pc-pic-menu.vue";
import HonestMaxPcPlatforms from "./sections/desktop/honest-max-pc-platforms.vue";
import HonestMaxPcRightBar from "./sections/desktop/honest-max-pc-right-bar.vue";
import HonestMaxPcFooter from "./sections/desktop/honest-max-pc-footer.vue";

/**
 * honest-max 桌面版佈局 — 視覺結構參考 slime-wu88-pc 桌面首頁
 *
 * 與 honest-no6 桌面版同骨架（兩者共用 wu88 視覺參考），
 * 但配色 / 字體 / 品牌標誌沿用 honest-max 桃粉藍綠混色風 token：
 *   - bg-base 淡灰白底 / header 白底
 *   - marquee 桃粉藍綠漸層
 *   - 註冊金漸層 / 登入藍漸層
 *
 * sections 各自走 var(--*) 讓變體（pink / azure / sunset）跟動
 */
</script>

<template>
  <div class="honest-max-pc-layout">
    <HonestMaxPcHeader />
    <main class="honest-max-pc-layout__main">
      <HonestMaxPcBanner />
      <HonestMaxPcMarquee />
      <div class="honest-max-pc-layout__container">
        <HonestMaxPcPicMenu />
        <HonestMaxPcPlatforms />
      </div>
    </main>
    <HonestMaxPcFooter />
    <HonestMaxPcRightBar />
  </div>
</template>

<style lang="scss" scoped>
.honest-max-pc-layout {
  position: relative;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.honest-max-pc-layout__main {
  flex: 1;
}

.honest-max-pc-layout__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
}
</style>
