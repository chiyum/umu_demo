<script setup lang="ts">
import marqueeIcon from "@/themes/ant-sport/assets/pc/marquee-icon.png?url";

/**
 * ant-sport PC indexNews 區
 *
 * 對齊 lilian_ant_pc main.vue 第 4-37 行 `.indexNews`：
 * - 內部 indexNews-content 橫排：左公告 icon + 中跑馬燈文字 + 右「更多」按鈕
 * - 設計重點是「橫長窄條」帶卡片陰影，與 banner 上下對齊但縮排兩側 padding
 *
 * 跑馬燈文字寫死示意（demo 無 API）
 */

const items: string[] = [
  "尊敬的客戶：蚂蚁最新 APP v5.2.9 版本，增加福利中心",
  "OB 體育提前結算功能，您的每日返水以及 VIP 升級禮金皆可在福利中心查詢",
  "大量賽事接入，美女主播伴您觀球賽，為您推單",
  "關注直播廳，主播每日不定時提示下發紅包雨"
];

const joinedText = items.join("　·　");
</script>

<template>
  <div class="ant-sport-pc-news">
    <div class="ant-sport-pc-news__content">
      <div class="ant-sport-pc-news__marquee">
        <span class="ant-sport-pc-news__icon" aria-hidden="true">
          <img :src="marqueeIcon" alt="" class="ant-sport-pc-news__icon-img" />
        </span>
        <div class="ant-sport-pc-news__viewport">
          <div class="ant-sport-pc-news__track">
            <span class="ant-sport-pc-news__text">{{ joinedText }}</span>
            <span class="ant-sport-pc-news__text" aria-hidden="true">
              {{ joinedText }}
            </span>
          </div>
        </div>
      </div>
      <button type="button" class="ant-sport-pc-news__btn">更多</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// PC indexNews 區嚴格對齊原作 lilian_ant_pc main.scss 第 3472-3548 行：
// - .indexNews-content 規格：1200×40, padding 0 10px 0 18px, margin-top: 31px,
//   border-radius: 20px (pill), 漸層底 + 重落影
// - .indexNews-icon 規格：61×63, top: -6px（突出於 bar 上方）
// - .indexNews-btn 規格：75×26, line-height: 26px, border-radius: 13px
// - 文字 font-size: 16px, color: var(--secondary-01)
.ant-sport-pc-news {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  &__content {
    display: flex;
    align-items: center;
    width: 1200px;
    max-width: calc(100% - 48px);
    height: 40px;
    padding: 0 10px 0 18px;
    margin-top: 31px;
    border-radius: 20px;
    background-image: linear-gradient(
      180deg,
      var(--bg-surface) 14%,
      var(--highlight-strip) 74%,
      var(--bg-base-translucent) 98%
    );
    box-shadow: 0 6px 12px 0 var(--secondary-10);
    position: relative;
    z-index: 3;
  }

  &__marquee {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    height: 100%;
  }

  // 公告小喇叭 icon — 對齊原版「位置略高出 bar」的 .indexNews-icon top: -6px
  &__icon {
    position: relative;
    flex-shrink: 0;
    width: 32px;
    height: 36px;
    top: -3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  &__icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__viewport {
    flex: 1;
    overflow: hidden;
    min-width: 0;
    height: 100%;
    display: flex;
    align-items: center;
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 3%,
      #000000 97%,
      transparent 100%
    );
  }

  &__track {
    display: inline-flex;
    gap: 36px;
    white-space: nowrap;
    animation: ant-sport-pc-news-scroll 32s linear infinite;
    will-change: transform;
  }

  // 文字色直接取 secondary-01（對齊原版 .indexNews-text color: var(--secondary-01)）
  &__text {
    font-size: 16px;
    letter-spacing: -0.4px;
    color: var(--secondary-01);
    line-height: 40px;
  }

  // 「更多」按鈕：原版規格 75×26 / radius 13px / 1px primary border / hover 反白
  &__btn {
    flex-shrink: 0;
    width: 75px;
    height: 26px;
    line-height: 26px;
    margin-left: 10px;
    padding: 0;
    text-align: center;
    border: 1px solid var(--color-primary);
    border-radius: 13px;
    color: var(--color-primary);
    background: transparent;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-primary);
      color: var(--text-on-primary);
    }
  }
}

@keyframes ant-sport-pc-news-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
