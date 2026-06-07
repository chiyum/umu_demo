<script setup lang="ts">
import appBg from "../../assets/desktop/app-bg.png?url";
import appLight from "../../assets/desktop/app-light.png?url";

/**
 * honest-at 桌面版「App 下載」 — 參考 kingdom_front long/desktop/app-download.vue
 *
 * 視覺骨架：
 *   大圖背景（app-bg.png）/ 左側文字三行 + 右側 QR Code
 *   p:nth-child(1) 金色漸層大字 +「光暈裝飾」（app-light.png）
 *
 * 配色：原作 kingdom 金色漸層 #ffcb00 → #cd9736
 * honest-at 沿用自家 gradient-gold（粉橘黃漸層）+ 青藍光點綴
 *
 * QR Code：用 SVG 模擬 QR 圖案（不裝 qrcode 套件）
 */
</script>

<template>
  <div class="honest-at-pc-app">
    <img :src="appBg" alt="" class="honest-at-pc-app__bg" />
    <div class="honest-at-pc-app__content">
      <div class="honest-at-pc-app__text">
        <p class="honest-at-pc-app__title">
          AT99 APP
          <img :src="appLight" alt="" class="honest-at-pc-app__light" />
        </p>
        <p class="honest-at-pc-app__sub">下載即享 168 點 VIP 體驗金</p>
        <p class="honest-at-pc-app__desc">iOS / Android 雙平台支援</p>
      </div>
      <div class="honest-at-pc-app__qr">
        <!-- QR Code 用 CSS grid 模擬，避免裝 qrcode.vue 套件 -->
        <div class="honest-at-pc-app__qr-pattern">
          <div
            v-for="i in 100"
            :key="i"
            class="honest-at-pc-app__qr-cell"
            :class="{
              'honest-at-pc-app__qr-cell--dark':
                (i * 37) % 5 < 3 || i % 11 === 0 || (i * 13) % 7 === 0
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long/desktop/app-download：背景大圖 / 左文右 QR
.honest-at-pc-app {
  position: relative;
  width: 100%;
  aspect-ratio: 960 / 329;
  overflow: hidden;
  background-color: #0a1430;

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4.16% 10.41%;
    height: 100%;
    gap: 40px;
  }

  &__text {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex: 1;
  }

  &__title {
    position: relative;
    font-size: 4vw;
    font-weight: 700;
    background: linear-gradient(90deg, #ffcb00 0%, #cd9736 50%, #ff5959 100%);
    background-clip: text;
    color: transparent;
    margin-bottom: 24px;
  }

  &__light {
    position: absolute;
    right: -45%;
    bottom: -10%;
    width: 19vw;
    aspect-ratio: 368 / 98;
    object-fit: contain;
    pointer-events: none;
  }

  &__sub {
    font-size: 2.4vw;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0 0 8px rgba(58, 162, 236, 0.6);
    margin-bottom: 12px;
  }

  &__desc {
    font-size: 1.6vw;
    font-weight: 300;
    color: #abacac;
  }

  &__qr {
    flex-shrink: 0;
    padding: 14px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 18px rgba(58, 162, 236, 0.4);
  }

  &__qr-pattern {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 2px;
    width: 10vw;
    height: 10vw;
    max-width: 180px;
    max-height: 180px;
  }

  &__qr-cell {
    background: #ffffff;

    &--dark {
      background: #0a1430;
    }
  }
}
</style>
