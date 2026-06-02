<script setup lang="ts">
import { computed } from "vue";

/**
 * Provider 徽章 — 取代真實的遊戲提供商 logo
 *
 * 設計：
 * - 圓角矩形 + 文字（2-3 字母）+ 顏色
 * - 顏色從 seed 派生，多個 badge 並排不會撞色
 * - 純 CSS 繪製，不引外部圖
 *
 * 動機：原本 noya / at99 都下載了真實 provider 的 logo 圖（dg / sa / allbet 等），
 * 有商標權疑慮；改用文字徽章既能保留版面節奏，又完全合規。
 */

interface Props {
  /** 顯示文字（2-3 字母，例如 DG / SA / DB） */
  text: string;
  /** 影響底色變化（0-360 hue） */
  seed?: number;
  /** 尺寸：sm / md / lg */
  size?: "sm" | "md" | "lg";
  /** 是否帶光暈（at99 風格適用） */
  glow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  seed: 0,
  size: "md",
  glow: false
});

/**
 * 從 seed 派生底色：用 hsl 直接組，飽和度與亮度固定，hue 隨 seed 變
 *
 * 為何不用 var()：badge 之間要有色相區別，無法靠單一 CSS var 表達。
 * 但仍保留 var() 給文字顏色，配合配色切換時文字會對比。
 */
const bgHue = computed(() => {
  const v = (props.seed * 57.296) % 360; // 57.296 = 黃金角，分佈均勻
  return Math.floor(v);
});

const styleVars = computed(() => ({
  "--badge-bg": `hsl(${bgHue.value}, 55%, 60%)`,
  "--badge-bg-end": `hsl(${(bgHue.value + 30) % 360}, 55%, 50%)`
}));
</script>

<template>
  <div
    class="provider-badge"
    :class="[
      `provider-badge--${props.size}`,
      { 'provider-badge--glow': props.glow }
    ]"
    :style="styleVars"
  >
    <span class="provider-badge__text">{{ props.text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.provider-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--badge-bg), var(--badge-bg-end));
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 8px;
  font-family: var(--font-display);
  flex-shrink: 0;

  // 內部光澤
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -2px 0 rgba(0, 0, 0, 0.12);

  &--sm {
    width: 36px;
    height: 36px;
    font-size: 13px;
  }

  &--md {
    width: 56px;
    height: 53px;
    font-size: 16px;
    border-radius: 10px;
  }

  &--lg {
    width: 80px;
    height: 80px;
    font-size: 22px;
    border-radius: 12px;
  }

  &--glow {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -2px 0 rgba(0, 0, 0, 0.12),
      0 0 12px var(--badge-bg);
  }

  &__text {
    line-height: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }
}
</style>
