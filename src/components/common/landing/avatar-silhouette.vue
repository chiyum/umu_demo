<script setup lang="ts">
import { computed } from "vue";

/**
 * 抽象人形剪影 — 取代「真人女性照片」
 *
 * 設計：
 * - 純 SVG 繪製，無需下載任何外部圖檔
 * - 顏色用 CSS var，配色切換時跟著走
 * - seed 影響底色 / 髮型 / 配件變化，讓多張並排時不會完全一樣
 * - 永遠是抽象、非識別性、無真實肖像
 *
 * 動機：原本 noya 用了下載自原站的 live_modal-1.png 等真實女性肖像，
 * 有侵權與肖像權疑慮；改用程式繪製 silhouette 不只合規，
 * 也讓 demo 更明確「這是版面範例，不是真實圖像」。
 */

interface Props {
  /** 影響色相變化（0-360 hue rotate） */
  seed?: number;
  /** 是否顯示底部高亮，加強卡片感 */
  variant?: "default" | "soft" | "vivid";
  /** 寬高比：portrait 直幅、square 正方 */
  ratio?: "portrait" | "square";
}

const props = withDefaults(defineProps<Props>(), {
  seed: 0,
  variant: "default",
  ratio: "portrait"
});

/**
 * 把 seed 映射成 0-1 區間，做出多樣化視覺
 * 用簡單的 fract(seed * 0.618) 取得均勻分佈（黃金比例）
 */
const seedRatio = computed(() => {
  const v = (props.seed * 0.618) % 1;
  return v < 0 ? v + 1 : v;
});

/** 背景 hue 偏移，讓多張並排看起來不同色調 */
const hueOffset = computed(() => Math.floor(seedRatio.value * 60) - 30);

/** 頭髮陰影濃度 */
const hairTone = computed(() => 0.4 + seedRatio.value * 0.3);

/** 是否顯示髮帶 / 耳環變化 */
const showAccessory = computed(() => seedRatio.value > 0.5);
</script>

<template>
  <div
    class="avatar-silhouette"
    :class="[
      `avatar-silhouette--${props.variant}`,
      `avatar-silhouette--${props.ratio}`
    ]"
    :style="{
      filter: `hue-rotate(${hueOffset}deg)`
    }"
  >
    <svg
      class="avatar-silhouette__svg"
      viewBox="0 0 100 140"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="抽象人形示意圖"
    >
      <!-- 漸層背景：上深下淺 -->
      <defs>
        <linearGradient :id="`bg-${props.seed}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--color-accent)" />
          <stop offset="100%" stop-color="var(--bg-overlay)" />
        </linearGradient>
        <linearGradient :id="`body-${props.seed}`" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stop-color="var(--color-primary)"
            stop-opacity="0.65"
          />
          <stop
            offset="100%"
            stop-color="var(--color-secondary)"
            stop-opacity="0.5"
          />
        </linearGradient>
      </defs>

      <!-- 背景 -->
      <rect width="100" height="140" :fill="`url(#bg-${props.seed})`" />

      <!-- 光暈圓 -->
      <circle
        cx="50"
        cy="55"
        r="48"
        fill="var(--color-primary)"
        opacity="0.08"
      />

      <!-- 身體輪廓（梯形肩部） -->
      <path
        d="M20,140 L26,90 Q50,76 74,90 L80,140 Z"
        :fill="`url(#body-${props.seed})`"
      />

      <!-- 脖子 -->
      <path
        d="M44,82 L44,95 Q50,98 56,95 L56,82 Z"
        fill="var(--color-secondary)"
        opacity="0.55"
      />

      <!-- 頭部（橢圓） -->
      <ellipse
        cx="50"
        cy="58"
        rx="18"
        ry="22"
        fill="var(--color-secondary)"
        opacity="0.7"
      />

      <!-- 頭髮（後側） -->
      <path
        d="M30,55 Q30,30 50,28 Q70,30 70,55 L70,72 Q60,68 50,68 Q40,68 30,72 Z"
        fill="var(--text-primary)"
        :opacity="hairTone"
      />

      <!-- 頭髮（前側瀏海） -->
      <path
        d="M34,48 Q40,38 50,42 Q60,38 66,48 Q60,44 50,46 Q40,44 34,48 Z"
        fill="var(--text-primary)"
        :opacity="hairTone + 0.1"
      />

      <!-- 簡化五官：兩個小點代表眼，不畫鼻嘴避免具象化 -->
      <circle
        cx="43"
        cy="60"
        r="1.2"
        fill="var(--text-primary)"
        opacity="0.6"
      />
      <circle
        cx="57"
        cy="60"
        r="1.2"
        fill="var(--text-primary)"
        opacity="0.6"
      />

      <!-- 配件：耳環（seed > 0.5 才顯示） -->
      <template v-if="showAccessory">
        <circle cx="32" cy="63" r="1.5" fill="var(--color-accent)" />
        <circle cx="68" cy="63" r="1.5" fill="var(--color-accent)" />
      </template>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.avatar-silhouette {
  display: block;
  overflow: hidden;
  background: var(--bg-overlay);
  border-radius: inherit;

  &--portrait {
    aspect-ratio: 5 / 7;
  }

  &--square {
    aspect-ratio: 1 / 1;
  }

  &--soft {
    opacity: 0.92;
  }

  &--vivid {
    filter: saturate(1.15);
  }

  &__svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
