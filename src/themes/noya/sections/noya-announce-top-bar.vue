<script setup lang="ts">
import { ref } from "vue";
import AnnounceMarquee from "@/components/common/landing/announce-marquee.vue";
import LoginModal from "@/components/common/landing/login-modal.vue";
import { useQuasar } from "quasar";

/**
 * noya PC 最頂 sticky 細長 bar：左跑馬燈 + 右兩顆 CTA 按鈕
 *
 * Round 5 改版：
 * - 背景從白底改為深色（走 --top-bar-dark），與下方 main-nav 形成明顯層次
 * - 整條 bar 高度由 50px 降至 40px（節省垂直空間）
 * - 把內嵌的 LoginInlineForm（帳/密/驗證碼）收進 LoginModal，
 *   右側只留 2 顆按鈕（紫色 outline 登入 / 金色實心 免費註冊），
 *   配合「桌面上方僅放 CTA、登入彈窗集中處理」的設計
 *
 * 為何不直接寫死 #1a1a2e 之類深色：用 token --top-bar-dark 集中管理，
 * variants（sunset / lime）可獨立覆寫，深色基底不影響整頁配色
 */

const $q = useQuasar();
const loginOpen = ref(false);

// 通用佔位的公告內容（不抄原站字樣，純展示）
const announceMessages = [
  "歡迎光臨示範娛樂城 A，本站僅為前端版面 Demo",
  "新會員首存好禮即將上線，敬請期待",
  "客服系統 24 小時為您服務，平台運作穩定",
  "全新真人視訊頻道即將開啟，沉浸體驗等你來",
  "活動公告：版面切換 / 配色變化請點擊左下浮標"
];

function onRegister() {
  // 註冊也走同一個 modal（modal 內含開戶連結），demo 不實際送出
  $q.notify({
    message: "Demo 環境：免費註冊 僅展示版面，不會實際送出",
    color: "primary",
    position: "top",
    timeout: 1800
  });
}
</script>

<template>
  <div class="noya-announce-bar">
    <div class="noya-announce-bar__inner">
      <AnnounceMarquee
        label="系統公告"
        :items="announceMessages"
        :duration-sec="40"
      />
      <div class="noya-announce-bar__actions">
        <button
          type="button"
          class="noya-announce-bar__btn noya-announce-bar__btn--ghost"
          @click="loginOpen = true"
        >
          登入
        </button>
        <button
          type="button"
          class="noya-announce-bar__btn noya-announce-bar__btn--solid"
          @click="onRegister"
        >
          免費註冊
        </button>
      </div>
    </div>

    <!-- 登入 modal 走共用元件，與 at99 mobile 共用同一份 UI / 互動 -->
    <LoginModal v-model="loginOpen" title="會員登入" />
  </div>
</template>

<style lang="scss" scoped>
.noya-announce-bar {
  // 深色背景：走 token --top-bar-dark，variants 可覆寫；
  // 預設用 banner-dark-bg（已存在的深綠暗底 gradient）讓 rose-gold 配色看起來高級
  background: var(--top-bar-dark, var(--banner-dark-bg));

  // 深底配色使用 banner-dark-text（淺奶色），與下方主 nav 區分
  color: var(--top-bar-dark-text, var(--banner-dark-text));
  border-bottom: 1px solid var(--border);

  // kingdom DNA：sticky bar 雙層陰影規律（細線分隔 + 主色 alpha 軟光暈）
  box-shadow: var(--shadow-sticky);
  position: sticky;
  top: 0;
  z-index: 200;

  // Round 5：高度由 50px 降至 40px
  height: 40px;

  // 父層 .noya-layout 是 flex column container，flex item 預設
  // align-self: stretch 在部分瀏覽器（含 Chromium）會讓 sticky 無效，
  // 加上 align-self: flex-start 強制 sticky 子層保持原大小，sticky 才會生效
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

  // 跑馬燈在深底環境下需要強化對比：
  // 子元件用 color-primary / text-muted，淺底沒問題，深底會糊掉
  // 用 :deep 覆寫元件內部顏色，但仍保留 token 變動空間（accent 跟 muted 走另一組 alpha 白）
  :deep(.announce-marquee__label) {
    color: var(--color-accent);
    background: rgba(255, 255, 255, 0.1);
  }

  :deep(.announce-marquee__text) {
    color: var(--top-bar-dark-text, var(--banner-dark-text));
    opacity: 0.92;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  // 兩顆按鈕共用基底：圓角小型 CTA
  // kingdom DNA：CTA 用 pill 形 (--radius-pill)，與下方主 CTA 模式統一
  &__btn {
    height: 28px;
    padding: 0 18px;
    border-radius: var(--radius-pill);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  // outline 紫色登入按鈕：原規格寫「紫色 outline」，
  // 但走 var(--color-primary)，因為 noya 預設玫瑰金 / sunset 橘 / lime 綠 — 由 variant 決定
  // 「紫色 outline」是描述視覺風格（outline + 主色），不是字面色
  &__btn--ghost {
    background: transparent;
    color: var(--color-accent);
    border-color: var(--color-accent);

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  // solid 金色實心免費註冊按鈕：與全站金色 CTA 一致
  // kingdom DNA：金色 CTA 用較柔的 filter（避免過曝）
  &__btn--solid {
    background: var(--gradient-gold, var(--gradient-cta));
    color: var(--text-on-gold, var(--text-on-primary));
    border-color: transparent;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

    &:hover {
      filter: var(--filter-hover-soft);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    }
  }
}
</style>
