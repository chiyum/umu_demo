<script setup lang="ts">
/**
 * 大亨手機 header：吉祥物 logo + 註冊 / 登入 + 旗子
 *
 * 為什麼 logo 不走 themeStore.currentLogo：
 * - 6 個 daheng theme 是品牌專屬版型，不適用「FAB 切 logo」的探索性功能
 * - mascotLogoSrc 寫死從 daheng-shared/assets 取 ch-mascot.png（使用者拍板替代 logo.png）
 * - 若未來要加 FAB 切 logo 支援，再導入 themeStore 即可
 *
 * 為什麼旗子用 CSS 偽元素而非 SVG：
 * - 原稿 phones.js .flag 用 div + ::before（藍色 55%×55%）+ ::after（白圓 28%×28% + box-shadow）
 *   組合「日本國旗左上角樣式」抽象示意，照搬原稿 CSS 不轉換成 SVG
 * - 若改 SVG 視覺密度會跑掉（圓角、陰影、外框白邊都是 CSS 屬性）
 */
import { mascotLogoSrc } from "../_data";
</script>

<template>
  <div class="daheng-header">
    <img :src="mascotLogoSrc" alt="大亨" class="daheng-header__logo" />
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

  &__logo {
    width: 84px;
    height: 60px;
    flex: none;
    object-fit: contain;
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
