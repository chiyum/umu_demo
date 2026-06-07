<script setup lang="ts">
import appBg from "../../assets/desktop/app-bg.png?url";
import appLight from "../../assets/desktop/app-light.png?url";
</script>

<template>
  <div class="honest-no6-pc-app">
    <img :src="appBg" alt="" class="honest-no6-pc-app__bg" />
    <div class="honest-no6-pc-app__content">
      <div class="honest-no6-pc-app__text">
        <p class="honest-no6-pc-app__title">
          FG APP
          <img :src="appLight" alt="" class="honest-no6-pc-app__light" />
        </p>
        <p class="honest-no6-pc-app__sub">山日日 暮夜不眠</p>
        <p class="honest-no6-pc-app__desc">iOS / Android 雙平台支援</p>
      </div>
      <div class="honest-no6-pc-app__qr">
        <div class="honest-no6-pc-app__qr-pattern">
          <div
            v-for="i in 100"
            :key="i"
            class="honest-no6-pc-app__qr-cell"
            :class="{
              'honest-no6-pc-app__qr-cell--dark':
                (i * 23) % 5 < 3 || i % 9 === 0 || (i * 17) % 13 === 0
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.honest-no6-pc-app {
  position: relative;
  width: 100%;
  aspect-ratio: 960 / 329;
  overflow: hidden;
  background: linear-gradient(135deg, #2a1042 0%, #1a0526 100%);

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.18;
    filter: hue-rotate(280deg);
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
    background: linear-gradient(90deg, #ffe79e 0%, #f7c66c 50%, #c79a45 100%);
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
    filter: hue-rotate(-30deg);
  }

  &__sub {
    font-size: 2.4vw;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0 0 12px rgba(212, 78, 224, 0.6);
    margin-bottom: 12px;
  }

  &__desc {
    font-size: 1.6vw;
    font-weight: 300;
    color: #a78cc0;
  }

  &__qr {
    flex-shrink: 0;
    padding: 14px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 18px rgba(212, 78, 224, 0.45);
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
      background: #1a0526;
    }
  }
}
</style>
