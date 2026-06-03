<script setup lang="ts">
import logoHeader from "@/themes/ant-sport/assets/logo-mobile.png";
import messageIcon from "@/themes/ant-sport/assets/user-action/message.webp";

/**
 * ant-sport mobile 頂部 logo bar
 *
 * 對齊 lilian_ant_web src/pages/home.vue 第 3-8 行 `.home__header`：
 * - 左側：蚂蚁体育 logo（logo_header.png）
 * - 右側：訊息通知圖示（連到 /newsCenter，本 demo 純展示）
 *
 * 結構保留原 BEM 風格命名（home__header → ant-sport-m-header），
 * 主視覺定位用 sticky 而非 fixed，避免吃掉 banner swiper 的 z-index 層級
 */
</script>

<template>
  <header class="ant-sport-m-header">
    <a class="ant-sport-m-header__brand" href="#" aria-label="蚂蚁体育">
      <img
        :src="logoHeader"
        alt="蚂蚁体育 logo"
        class="ant-sport-m-header__logo"
      />
    </a>
    <button
      type="button"
      class="ant-sport-m-header__message"
      aria-label="訊息中心"
    >
      <img
        :src="messageIcon"
        alt=""
        aria-hidden="true"
        class="ant-sport-m-header__message-icon"
      />
      <!-- 紅點：模擬有新訊息（Demo 固定顯示） -->
      <span class="ant-sport-m-header__dot" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
.ant-sport-m-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 50px;
  padding: 0 12px;
  background: var(--gradient-cta);
  color: var(--text-on-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sticky);

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  &__logo {
    height: 32px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;

    // 來源 logo 為白底彩字 PNG，套到藍色頂部 bar 顯不出來；
    // 用 mix-blend-mode: screen 把白底洗掉只留主視覺，避免改圖
    mix-blend-mode: screen;
  }

  &__message {
    position: relative;
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__message-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;

    // 同樣對白色圖標套色：mask 把 webp 轉成可染色形狀
    filter: brightness(0) invert(1);
  }

  &__dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--badge-live);
    box-shadow: 0 0 0 1.5px var(--bg-surface);
  }
}
</style>
