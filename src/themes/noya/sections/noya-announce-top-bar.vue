<script setup lang="ts">
import AnnounceMarquee from "@/components/common/landing/announce-marquee.vue";
import LoginInlineForm from "@/components/common/landing/login-inline-form.vue";

/**
 * noya PC 最頂 fixed 細長 bar：左跑馬燈 + 右內嵌登入區
 *
 * 設計：
 * - 高度約 50px，sticky 黏在頁面最頂
 * - 左側用共用 AnnounceMarquee，右側用共用 LoginInlineForm
 * - 純 demo，所有內容文字皆通用占位（非原站字樣）
 *
 * 為什麼這層只是 layout 殼：跑馬燈與登入兩塊都是共用 component，
 * 這個檔案只負責「noya 風格的容器、間距、顏色」。
 */

// 通用佔位的公告內容（不抄原站字樣，純展示）
const announceMessages = [
  "歡迎光臨示範娛樂城 A，本站僅為前端版面 Demo",
  "新會員首存好禮即將上線，敬請期待",
  "客服系統 24 小時為您服務，平台運作穩定",
  "全新真人視訊頻道即將開啟，沉浸體驗等你來",
  "活動公告：版面切換 / 配色變化請點擊左下浮標"
];
</script>

<template>
  <div class="noya-announce-bar">
    <div class="noya-announce-bar__inner">
      <AnnounceMarquee
        label="最新公告"
        :items="announceMessages"
        :duration-sec="40"
      />
      <LoginInlineForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.noya-announce-bar {
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 200;
  height: 50px;

  // 父層 .noya-layout 是 flex column container，flex item 預設
  // align-self: stretch 在部分瀏覽器（含 Chromium）會讓 sticky 無效，
  // 加上 align-self: flex-start 強制 sticky 子層保持原大小，sticky 才會生效。
  // 同時加 width: 100% 補回原 stretch 撐滿的寬度行為。
  align-self: flex-start;
  width: 100%;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    height: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }
}
</style>
