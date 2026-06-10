<script setup lang="ts">
/**
 * 大亨手機 header：品牌 logo + 註冊 / 登入 + 旗子
 *
 * 為什麼 logo 改接 themeStore.currentLogo（v4.5 起）：
 * - 對齊 at99 / noya / honest-max / dahsing-* 等既有 theme 慣例，使用者切 logo（透過 FAB
 *   或 showcase logo switcher）時，daheng 6 theme 也跟著換 logo，主頁訪客體驗一致
 * - 既有 daheng-shared/assets/ch-mascot.png 圖檔保留作未來裝飾用（未刪），但不再被引用為
 *   daheng-header 品牌頭；showcase logo 切換接 SHARED_LOGOS（大亨 / UMU / 隆亨）
 *
 * 為什麼樣式從方形 84×60 改成 height 60 + width auto + max-width 140（v4.5 起）：
 * - SHARED_LOGOS 三張是橫式 logo（大亨 ONLINE 較寬、UMU / 隆亨較窄），固定 width 84px 會
 *   壓扁長 logo 或留空白
 * - 對齊 at99-mobile-top-bar / noya-mobile-top-bar 的 logo CSS pattern（height 固定 + width
 *   auto + max-width contain），三張 logo 視覺平衡
 *
 * 為什麼旗子用 CSS 偽元素而非 SVG：
 * - 原稿 phones.js .flag 用 div + ::before（藍色 55%×55%）+ ::after（白圓 28%×28% + box-shadow）
 *   組合「日本國旗左上角樣式」抽象示意，照搬原稿 CSS 不轉換成 SVG
 * - 若改 SVG 視覺密度會跑掉（圓角、陰影、外框白邊都是 CSS 屬性）
 */
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="daheng-header">
    <a class="daheng-header__brand" href="#" :aria-label="logoLabel">
      <img :src="logoSrc" :alt="logoLabel" class="daheng-header__logo" />
    </a>
    <div class="daheng-header__actions">
      <button type="button" class="daheng-header__btn-reg">註冊</button>
      <button type="button" class="daheng-header__btn-login">登入</button>
      <div class="daheng-header__flag" aria-label="繁中" role="img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px 12px;
  gap: 10px;

  &__brand {
    display: inline-flex;
    align-items: center;
    flex: none;
    text-decoration: none;
  }

  // logo 樣式對齊 at99 / noya / dahsing-* 等既有 theme 的橫式 logo pattern：
  // height 固定 + width auto + max-width contain，三張 SHARED_LOGOS 視覺平衡
  &__logo {
    height: 60px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  &__btn-reg {
    font:
      700 17px "Noto Sans TC",
      sans-serif;
    color: var(--color-primary);
    background: #ffffff;
    border: 1.6px solid var(--color-secondary);
    padding: 9px 22px;
    border-radius: 24px;
    cursor: pointer;
  }

  &__btn-login {
    font:
      700 17px "Noto Sans TC",
      sans-serif;
    color: #ffffff;
    background: linear-gradient(180deg, #cf8a4f, #a85d2b);
    border: none;
    padding: 11px 24px;
    border-radius: 24px;
    cursor: pointer;
    box-shadow: 0 6px 14px -6px rgba(150, 80, 30, 0.6);
  }

  // 旗子：div + ::before 藍底 + ::after 白圓藍邊（原稿示意）
  &__flag {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex: none;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    position: relative;
    background: #d8202f;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 55%;
      height: 55%;
      background: #1d3a8f;
    }

    &::after {
      content: "";
      position: absolute;
      left: 13%;
      top: 13%;
      width: 28%;
      height: 28%;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #1d3a8f;
    }
  }
}
</style>
