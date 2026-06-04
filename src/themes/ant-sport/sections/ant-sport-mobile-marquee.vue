<script setup lang="ts">
import noteIcon from "@/themes/ant-sport/assets/user-action/note.webp?url";

/**
 * ant-sport mobile 跑馬燈
 *
 * 對齊 lilian_ant_web home.vue 第 16-21 行 `.home__marquee`：
 * - 左：公告小圖（icon_note.webp）
 * - 中：橫向滾動文字
 * - 右：自動省略
 *
 * 文字寫死示意活動內容（與原 lilian_ant_web 抓 store marquee 不同，demo 無 API）；
 * 動畫用 CSS keyframes，duplicate 兩份首尾相接 + translateX(-50%) 實現無縫
 */

// 示意性公告文字（demo 純展示）
const items: string[] = [
  "新會員首存享 168% 紅利",
  "週週反水 5%，越玩越賺",
  "VIP 專屬升等禮金活動進行中",
  "體育賽事即將開打，敬請鎖定"
];

/** 串接後的文字（用 · 分隔） */
const joinedText = items.join("　·　");
</script>

<template>
  <div class="ant-sport-m-marquee">
    <span class="ant-sport-m-marquee__icon" aria-hidden="true">
      <img :src="noteIcon" alt="" class="ant-sport-m-marquee__icon-img" />
    </span>
    <div class="ant-sport-m-marquee__viewport">
      <div class="ant-sport-m-marquee__track">
        <span class="ant-sport-m-marquee__text">{{ joinedText }}</span>
        <span class="ant-sport-m-marquee__text" aria-hidden="true">{{
          joinedText
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 lilian_ant_web .home__marquee：
// - height: 0.76rem (~28px), padding: 0.2rem 0.3rem (~7px 11px)
// - 內部 padding-left: 0.4rem (~15px) 留 icon 空間
// - 文字色 #9ca3bf 對齊 secondary-04
.ant-sport-m-marquee {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 12px;
  padding: 7px 12px;
  background: var(--highlight-strip);
  border-radius: 8px;
  border: 1px solid var(--border);
  min-height: 28px;

  &__icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
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

    // 邊緣淡出
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 4%,
      #000000 96%,
      transparent 100%
    );
  }

  &__track {
    display: inline-flex;
    gap: 36px;
    white-space: nowrap;
    animation: ant-sport-marquee 28s linear infinite;
    will-change: transform;
  }

  &__text {
    font-size: 13px;
    color: var(--text-primary);
    line-height: 1.6;
  }
}

@keyframes ant-sport-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
