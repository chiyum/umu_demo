<script setup lang="ts">
/**
 * dahsing-tabs 整齊網格 .tgrid + .tcard（角色立繪靠右 mask 漸入）
 *
 * 1:1 對齊原稿 .tgrid / .tcard：
 * - grid 2 col / gap 11px（mobile）；桌面延伸到 3-4 col
 * - 每卡 138px 高（mobile）；桌面 170px 高
 * - .char img width 62% / mask: linear-gradient(90deg, transparent 0%, #000 32%)
 * - .meta 左上文字（zh 15px / en 10px italic）
 * - .play 左下圓形 CTA（漸層底 + chev icon）
 */
import { computed } from "vue";
import DahsingIcon from "../../dahsing-shared/atoms/dahsing-icon.vue";
import {
  chDgSrc,
  chOfaSrc,
  chPandaSrc,
  chQtSrc,
  chRsgSrc,
  chMascotSrc
} from "../../dahsing-shared/_assets";

const props = withDefaults(
  defineProps<{
    /** 欄數：mobile 2、桌面 3-4 */
    columns?: number;
  }>(),
  { columns: 2 }
);

interface TabCard {
  zh: string;
  en: string;
  img: string;
}

// 與原稿同樣 6 張角色卡，桌面多欄時補加
const cards: TabCard[] = [
  { zh: "DG 真人", en: "DG LIVE", img: chDgSrc },
  { zh: "熊貓體育", en: "PANDA SPORTS", img: chPandaSrc },
  { zh: "QT 電子", en: "QT SLOTS", img: chQtSrc },
  { zh: "美女直播", en: "OFA GIRLS", img: chOfaSrc },
  { zh: "RSG 電子", en: "RSG SLOTS", img: chRsgSrc },
  { zh: "招財貓福袋", en: "FORTUNE CAT", img: chMascotSrc }
];

const extendedCards = computed<TabCard[]>(() => {
  if (props.columns <= 2) return cards;
  // 桌面 3+ 欄補卡，順序輪替
  return [...cards, ...cards];
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`
}));
</script>

<template>
  <div class="dahsing-tabs-grid" :style="gridStyle">
    <div
      v-for="(card, idx) in extendedCards"
      :key="idx"
      class="dahsing-tabs-grid__card"
    >
      <img class="dahsing-tabs-grid__char" :src="card.img" :alt="card.zh" />
      <div class="dahsing-tabs-grid__meta">
        <div class="dahsing-tabs-grid__zh">{{ card.zh }}</div>
        <div class="dahsing-tabs-grid__en">{{ card.en }}</div>
      </div>
      <div class="dahsing-tabs-grid__play">
        <DahsingIcon name="chevron-right" size="13px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-tabs-grid {
  display: grid;
  gap: 11px;

  &__card {
    position: relative;
    overflow: hidden;
    height: 138px;
    background: linear-gradient(155deg, var(--bg-surface), var(--color-accent));
    border: 1px solid var(--border);
    border-radius: 16px;
    cursor: pointer;
    box-shadow: var(--shadow-md, var(--shadow));
    transition: transform 0.18s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  // 桌面卡片加高（內部尺寸不變但卡片更大）
  @media (width >= 1024px) {
    &__card {
      height: 170px;
    }
  }

  &__char {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 62%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
    mask: linear-gradient(90deg, transparent 0%, #000000 32%, #000000 100%);
  }

  &__meta {
    position: absolute;
    left: 12px;
    top: 12px;
    z-index: 2;
  }

  &__zh {
    font-size: 15px;
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1.08;
    white-space: nowrap;
  }

  &__en {
    margin-top: 2px;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: 0.4px;
    font-style: italic;
    white-space: nowrap;
  }

  &__play {
    position: absolute;
    left: 12px;
    bottom: 12px;
    z-index: 3;
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border-radius: 50%;
    box-shadow: var(--shadow-md, var(--shadow));
  }
}
</style>
