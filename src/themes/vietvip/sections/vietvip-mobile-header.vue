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
 * 與原作對齊到位：
 * - 原作 home.vue .home__header 段就只有訊息按鈕，沒有 logo 也沒有註冊/登入按鈕
 *   （註冊/登入按鈕在 widgets/pages/home/user.vue 內，依登入狀態切換）
 * - demo 站採「預設已登入會員視角」（user-card 已顯示帳號 / VIP / 餘額），
 *   header 不再放註冊/登入按鈕；保留品牌 logo 是 demo 站展示需求
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
  </header>
</template>

<style lang="scss" scoped>
// 對齊越南 VIP 大底深紅 + 葉脈金邊的視覺基底
// sticky 必須帶半透明酒紅底 + backdrop blur，避免捲動時內容穿透
// 移除註冊/登入按鈕後 header 變成單排，padding 不需要為下排預留空間
.vietvip-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
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
}
</style>
