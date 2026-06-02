<script setup lang="ts">
import { computed } from "vue";

/**
 * 跑馬燈 — 用 CSS animation 做橫向無限滾動
 *
 * 設計：
 * - 把字串 duplicate 一份首尾相接，用 transform: translateX(-50%) 實現無縫
 * - 滾動速度由 prop 控制，預設 30 秒一輪
 * - 不引外部套件，純 CSS keyframes，行動裝置友善
 *
 * 為何不抽到 utils：這個元件本身就是純 UI 表現，無業務邏輯，
 * 抽到 component 比抽到 directive 更直覺、容易組合到 SFC 內。
 */

interface Props {
  /** 跑馬燈內容（多段文字會被中圓點串接） */
  items: string[];
  /** 滾動一輪秒數，預設 30s（內容越長越慢） */
  durationSec?: number;
  /** label 標籤（左側固定不動的小標，如「最新公告」） */
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  durationSec: 30,
  label: ""
});

/** 串好的文字（用 · 分隔），重複兩份做無縫滾動 */
const joinedText = computed(() => props.items.join("　·　"));

const animationStyle = computed(() => ({
  animationDuration: `${props.durationSec}s`
}));
</script>

<template>
  <div class="announce-marquee">
    <span v-if="label" class="announce-marquee__label">{{ label }}</span>
    <div class="announce-marquee__viewport">
      <!-- duplicate 兩份，第二份接在第一份後面，translate -50% 就能無縫 -->
      <div class="announce-marquee__track" :style="animationStyle">
        <span class="announce-marquee__text">{{ joinedText }}</span>
        <span class="announce-marquee__text" aria-hidden="true">{{
          joinedText
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.announce-marquee {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;

  &__label {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary);
    padding: 4px 10px;
    background: var(--bg-overlay);
    border-radius: 999px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  &__viewport {
    flex: 1;
    overflow: hidden;
    min-width: 0;
    position: relative;

    // 邊緣淡出遮罩，視覺更柔
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 5%,
      #000 95%,
      transparent 100%
    );
  }

  &__track {
    display: inline-flex;
    gap: 36px;
    white-space: nowrap;
    animation: marquee-scroll linear infinite;
    will-change: transform;
  }

  &__text {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
  }
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    // 因為 track 內放了兩份等寬文字，移動一半長度就剛好換到第二份起點
    transform: translateX(-50%);
  }
}
</style>
