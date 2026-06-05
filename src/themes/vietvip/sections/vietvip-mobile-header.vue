<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import iconMessage from "../assets/home/icon-message.png?url";

/**
 * vietvip mobile 頂部 header
 *
 * 對齊 lilian_vietvip_web src/pages/home.vue 第 16-22 行 .home__header 段：
 * - header 本身是視覺主背景（home_background2.png）的一部分，
 *   標準作法是「透明 header 疊在大背景上」，讓酒紅金邊葉脈直接從 viewport 頂部開始
 * - 右上角是訊息按鈕（home_message 連到消息中心），demo 站點擊跳 Notify
 *
 * 與原專案差異：
 * - 原專案 header 沒有 logo 與註冊/登入按鈕（按鈕在 User widget 內依登入狀態切）
 * - demo 站需要展示品牌 logo + 註冊/登入入口，故把這兩件事補進 header，
 *   兩排：上排 logo + 訊息 icon，下排 註冊 / 登入按鈕
 *   這對應「越南 VIP 首頁」實際視覺常見的「VIP 廳堂入口」感受
 *
 * 為什麼用透明背景而非半透明 + blur：
 * - 越南 VIP 設計核心是「深紅金邊大背景」，header 一旦遮掉就失去視覺主軸
 * - 但 sticky 時必須有一定不透明度避免下方內容穿透；折衷用「酒紅深底 alpha 0.55」
 *   配合 backdrop blur(10px) 模糊掉滾動內容，仍能看到背景紅金光暈
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
/**
 * 部分 logo 是白底彩字 PNG（非 transparentBg）— 需套 mix-blend-mode: screen
 * 把白底洗成透明融入深紅 header；標 transparentBg 的 logo 跳過避免變淡
 */
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);
</script>

<template>
  <header class="vietvip-m-header">
    <div class="vietvip-m-header__row vietvip-m-header__row--top">
      <a class="vietvip-m-header__brand" href="#" :aria-label="logoLabel">
        <img
          :src="logoSrc"
          :alt="logoLabel"
          class="vietvip-m-header__logo"
          :class="{ 'vietvip-m-header__logo--blend': useScreenBlend }"
        />
      </a>

      <div class="vietvip-m-header__spacer" />

      <button type="button" class="vietvip-m-header__msg" aria-label="消息中心">
        <img :src="iconMessage" alt="" class="vietvip-m-header__msg-img" />
      </button>
    </div>

    <div class="vietvip-m-header__row vietvip-m-header__row--bottom">
      <button type="button" class="vietvip-m-header__btn-reg">註冊</button>
      <button type="button" class="vietvip-m-header__btn-login">登入</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// 對齊越南 VIP 大底深紅 + 葉脈金邊的視覺基底
// sticky 必須帶半透明酒紅底 + backdrop blur，避免捲動時內容穿透
.vietvip-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  padding: 12px 16px 10px;
  background: linear-gradient(
    180deg,
    rgba(42, 6, 15, 0.62) 0%,
    rgba(42, 6, 15, 0.32) 100%
  );
  backdrop-filter: blur(10px);
  color: var(--text-on-primary);

  // 底部一條金線：對齊 home_background2 中段葉脈金邊的視覺斷面
  border-bottom: 1px solid var(--vietvip-gold-2);
  box-shadow: var(--shadow-sticky);

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;

    &--top {
      margin-bottom: 8px;
    }

    &--bottom {
      gap: 10px;
      justify-content: flex-end;
    }
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  // logo：高度 36px，需要 mix-blend-mode 把白底洗掉融入深紅
  // transparentBg 的 logo 跳過 blend 避免被洗淡
  &__logo {
    height: 36px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__spacer {
    flex: 1;
  }

  // 訊息 icon：圓形容器 + 內嵌訊息 icon，金邊強化點綴
  &__msg {
    flex: none;
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 50%;
    border: 1px solid var(--vietvip-gold-2);
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }
  }

  &__msg-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  // 註冊鈕：透明底 + 金邊 + 金字（次要 CTA）
  &__btn-reg {
    padding: 8px 22px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    color: var(--vietvip-gold-1);
    background: transparent;
    border: 1.5px solid var(--vietvip-gold-2);
    border-radius: 22px;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      background 0.15s ease;

    &:active {
      transform: scale(0.95);
    }

    &:hover {
      background: rgba(199, 154, 69, 0.18);
    }
  }

  // 登入鈕：金漸層 + 深酒紅字（主要 CTA）
  // 用 var(--gradient-cta) 讓三變體下都跟著走（ruby/midnight 紅底金鈕 / gold 金底紅鈕）
  &__btn-login {
    padding: 8px 22px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    color: var(--text-on-gold);
    background: var(--gradient-cta);
    border: none;
    border-radius: 22px;
    cursor: pointer;
    box-shadow:
      0 4px 12px hsla(var(--secondary-h), var(--secondary-s), 50%, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
