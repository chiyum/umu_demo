<script setup lang="ts">
import appBg from "../../assets/desktop/app-bg.png?url";
import appLight from "../../assets/desktop/app-light.png?url";

/**
 * honest-max 桌面版 app-download — 視覺骨架對齊 kingdom long app-download
 * 配色：max 桃粉天藍漸層（沿用 gradient-hero / gradient-gold 設計）
 */
</script>

<template>
  <div class="honest-max-pc-app">
    <img :src="appBg" alt="" class="honest-max-pc-app__bg" />
    <div class="honest-max-pc-app__content">
      <div class="honest-max-pc-app__text">
        <p class="honest-max-pc-app__title">
          88WIN APP
          <img :src="appLight" alt="" class="honest-max-pc-app__light" />
        </p>
        <p class="honest-max-pc-app__sub">人在塔在 玩轉德州</p>
        <p class="honest-max-pc-app__desc">iOS / Android 雙平台支援</p>
      </div>
      <div class="honest-max-pc-app__qr">
        <div class="honest-max-pc-app__qr-pattern">
          <div
            v-for="i in 100"
            :key="i"
            class="honest-max-pc-app__qr-cell"
            :class="{
              'honest-max-pc-app__qr-cell--dark':
                (i * 41) % 5 < 3 || i % 7 === 0 || (i * 11) % 13 === 0
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.honest-max-pc-app {
  position: relative;
  width: 100%;
  aspect-ratio: 960 / 329;
  overflow: hidden;
  background: linear-gradient(135deg, #e75bff 0%, #3ec1f5 100%);

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.25;
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
    background: linear-gradient(90deg, #ffffff 0%, #ffd57c 50%, #ffffff 100%);
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
    margin-bottom: 12px;
    text-shadow: 0 2px 4px rgba(95, 50, 130, 0.4);
  }

  &__desc {
    font-size: 1.6vw;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.85);
  }

  &__qr {
    flex-shrink: 0;
    padding: 14px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 18px rgba(95, 50, 130, 0.4);
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
      background: #2a1a3e;
    }
  }
}
</style>
