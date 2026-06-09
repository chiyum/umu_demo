<script setup lang="ts">
/**
 * dahsing-waterfall 主視覺：瀑布流卡片牆
 *
 * 結構 1:1 對齊原稿 大亨首頁-版型A 瀑布流 (1).html 的 .wall + .wcard：
 * - .wall：column-count: 2 / column-gap: 11px（CSS masonry）
 * - .wcard.t：高卡（img height 182px）
 * - .wcard.s：矮卡（img height 128px）
 * - .wcard .cap：底部漸入文字（zh 15px / en 10px italic）
 * - .wcard .tag：左上 tag（fire 變體用紅漸層）
 *
 * 為什麼 prop 接 columns：
 * - mobile 維持 2 欄（原稿）
 * - 桌面延伸到 3-4 欄（widthMode='desktop'）讓資訊密度提升
 *
 * 為什麼 cards 用固定 mock 而非 prop：demo 只是視覺展示，不接 API；
 * 與既有 noya/at99 元件作法一致（資料硬編在元件內）
 */
import { computed } from "vue";
import DahsingIcon from "../../dahsing-shared/atoms/dahsing-icon.vue";
import {
  chDgSrc,
  chMascotSrc,
  chOfaSrc,
  chPandaSrc,
  chQtSrc,
  chRsgSrc
} from "../../dahsing-shared/_assets";

// DahsingIcon 統一 name 集合（與元件 enum 對齊）
type DahsingIconName =
  | "fire"
  | "star"
  | "soccer"
  | "premium"
  | "schedule"
  | "chevron-right";

const props = withDefaults(
  defineProps<{
    /** 欄數：mobile 2、桌面 3-4 */
    columns?: number;
  }>(),
  { columns: 2 }
);

// 卡片寬高對應 .wcard.t (height: 182) / .wcard.s (height: 128)
type CardSize = "t" | "s";
type TagKind = "fire" | "star" | "futbol" | "crown" | "clock";

interface WaterfallCard {
  size: CardSize;
  tag: TagKind;
  tagText: string;
  zh: string;
  en: string;
  img: string;
}

// 與原稿同樣 8 張，順序與 tag 對齊（混排 fire / star / futbol / crown / clock）
const cards: WaterfallCard[] = [
  {
    size: "t",
    tag: "fire",
    tagText: "熱門",
    zh: "DG 真人",
    en: "DG LIVE",
    img: chDgSrc
  },
  {
    size: "s",
    tag: "star",
    tagText: "推薦",
    zh: "QT 電子",
    en: "QT SLOTS",
    img: chQtSrc
  },
  {
    size: "t",
    tag: "futbol",
    tagText: "賽事",
    zh: "熊貓體育",
    en: "PANDA SPORTS",
    img: chPandaSrc
  },
  {
    size: "s",
    tag: "star",
    tagText: "直播",
    zh: "美女直播",
    en: "OFA GIRLS",
    img: chOfaSrc
  },
  {
    size: "s",
    tag: "fire",
    tagText: "熱門",
    zh: "RSG 電子",
    en: "RSG SLOTS",
    img: chRsgSrc
  },
  {
    size: "t",
    tag: "crown",
    tagText: "精選",
    zh: "招財貓福袋",
    en: "FORTUNE CAT",
    img: chMascotSrc
  },
  {
    size: "t",
    tag: "star",
    tagText: "真人",
    zh: "DG 百家樂",
    en: "DG BACCARAT",
    img: chDgSrc
  },
  {
    size: "s",
    tag: "clock",
    tagText: "最新",
    zh: "QT 老虎機",
    en: "QT JACKPOT",
    img: chQtSrc
  }
];

// 桌面多欄時補多卡，避免 column 太空
const extendedCards = computed<WaterfallCard[]>(() => {
  if (props.columns <= 2) return cards;
  // 桌面 3-4 欄補 8 張變 16 張，順序輪替維持 tag 多樣性
  return [...cards, ...cards];
});

// 為什麼回傳 DahsingIcon 自家 name：原 Iconify 字串在 QIcon 上無法渲染（已造成 tag 跑版）
function tagIcon(kind: TagKind): DahsingIconName {
  switch (kind) {
    case "fire":
      return "fire";
    case "star":
      return "star";
    case "futbol":
      return "soccer";
    case "crown":
      return "premium";
    case "clock":
      return "schedule";
  }
}
</script>

<template>
  <div class="dahsing-waterfall-wall" :style="{ columnCount: columns }">
    <div
      v-for="(card, idx) in extendedCards"
      :key="idx"
      class="dahsing-waterfall-wall__card"
      :class="`dahsing-waterfall-wall__card--${card.size}`"
    >
      <span
        class="dahsing-waterfall-wall__tag"
        :class="{ 'dahsing-waterfall-wall__tag--fire': card.tag === 'fire' }"
      >
        <DahsingIcon :name="tagIcon(card.tag)" size="9px" />
        {{ card.tagText }}
      </span>
      <img :src="card.img" :alt="card.zh" />
      <div class="dahsing-waterfall-wall__cap">
        <div class="dahsing-waterfall-wall__zh">{{ card.zh }}</div>
        <div class="dahsing-waterfall-wall__en">{{ card.en }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-waterfall-wall {
  column-gap: 11px;

  &__card {
    position: relative;
    overflow: hidden;
    margin-bottom: 11px;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: linear-gradient(
      155deg,
      var(--bg-surface),
      var(--accent, var(--color-accent))
    );
    box-shadow: var(--shadow-md, var(--shadow));
    cursor: pointer;
    break-inside: avoid;
    transition: transform 0.18s ease;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      display: block;
      width: 100%;
      object-fit: cover;
      object-position: center top;
    }

    &--t img {
      height: 182px;
    }

    &--s img {
      height: 128px;
    }
  }

  &__cap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 22px 12px 11px;
    background: linear-gradient(180deg, transparent, rgba(60, 34, 18, 0.82));
  }

  &__zh {
    font-size: 15px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.05;
  }

  // 英文小標題色走 --text-caption-en token；各 variant 提供對應淺色（米金 / 米紫 / 米橘）
  // fallback 為米橘 default 值 #f4d9b8
  &__en {
    margin-top: 2px;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-caption-en, #f4d9b8);
    letter-spacing: 0.4px;
    font-style: italic;
  }

  &__tag {
    position: absolute;
    left: 9px;
    top: 9px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 9px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--color-secondary);
    font-size: 10px;
    font-weight: 800;
    border-radius: 999px;
    box-shadow: var(--shadow);

    // fire tag 紅橘漸層走 --gradient-fire-tag token；金 / 紫變體適配主色系
    &--fire {
      background: var(
        --gradient-fire-tag,
        linear-gradient(180deg, #e8602f, #c63d16)
      );
      color: #ffffff;
    }
  }
}
</style>
