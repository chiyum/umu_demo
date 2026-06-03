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
.ant-sport-pc-news {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  &__content {
    margin-top: -28px;
    position: relative;
    z-index: 3;
    background: var(--bg-surface);
    border-radius: 10px;
    box-shadow: var(--shadow-lg);
    padding: 14px 22px;
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid var(--border);
  }

  &__marquee {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  &__icon {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

  &__text {
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.6;
  }

  &__btn {
    flex-shrink: 0;
    padding: 6px 18px;
    border-radius: var(--radius-pill, 999px);
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.18s ease;
    box-shadow: var(--shadow-md);

    &:hover {
      filter: brightness(1.1);
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
