<script setup lang="ts">
/**
 * dahsing-horizontal 單列橫向滾動（含 rhead + scroller + 可選 feat 大卡）
 *
 * 1:1 對齊原稿 大亨首頁-版型C 橫向列表 (1).html 的 .row / .rhead / .scroller / .hcard / .feat：
 * - .rhead 左 title + 右「更多」
 * - .scroller display flex / gap 11 / overflow-x auto / scroll-snap-type x mandatory
 * - .hcard flex 0 0 132px / height 152px（標準卡）
 * - .feat flex 0 0 230px / height 152px（首列才有的精選大卡）
 *
 * 為什麼 row 用 slot：每列的 cards 結構不同（首列含 feat），元件層只負責 chrome
 *
 * 為什麼 showFeat 用 prop：首列才有 feat 大卡（原稿 row 1 才放 .feat），其他列純 hcard
 */
import { QIcon } from "quasar";

interface HCard {
  zh: string;
  en: string;
  img: string;
  tag?: { text: string; icon: string };
}

interface FeatCard {
  zh: string;
  en: string;
  img: string;
}

withDefaults(
  defineProps<{
    title: string;
    icon?: string;
    moreText?: string;
    cards: HCard[];
    /** 首列才有的精選大卡 */
    featCard?: FeatCard;
  }>(),
  {
    icon: "material-symbols:local-fire-department",
    moreText: "更多",
    featCard: undefined
  }
);
</script>

<template>
  <div class="dahsing-horizontal-row">
    <div class="dahsing-horizontal-row__head">
      <div class="dahsing-horizontal-row__title">
        <QIcon :name="icon" size="14px" />
        {{ title }}
      </div>
      <div class="dahsing-horizontal-row__more">
        {{ moreText }}
        <QIcon name="material-symbols:chevron-right" size="12px" />
      </div>
    </div>

    <div class="dahsing-horizontal-row__scroller">
      <!-- 首列才有的精選大卡 -->
      <div v-if="featCard" class="dahsing-horizontal-row__feat">
        <img :src="featCard.img" :alt="featCard.zh" />
        <div class="dahsing-horizontal-row__feat-cap">
          <div class="dahsing-horizontal-row__feat-zh">{{ featCard.zh }}</div>
          <div class="dahsing-horizontal-row__feat-en">{{ featCard.en }}</div>
        </div>
        <div class="dahsing-horizontal-row__feat-go">
          立即遊玩
          <QIcon name="material-symbols:chevron-right" size="9px" />
        </div>
      </div>

      <!-- 標準 hcard 卡 -->
      <div
        v-for="(card, idx) in cards"
        :key="idx"
        class="dahsing-horizontal-row__hcard"
      >
        <span v-if="card.tag" class="dahsing-horizontal-row__tag">
          <QIcon :name="card.tag.icon" size="8px" />
          {{ card.tag.text }}
        </span>
        <img :src="card.img" :alt="card.zh" />
        <div class="dahsing-horizontal-row__cap">
          <div class="dahsing-horizontal-row__zh">{{ card.zh }}</div>
          <div class="dahsing-horizontal-row__en">{{ card.en }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-horizontal-row {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--text-primary);
    font-size: 16px;
    font-weight: 900;

    :deep(.q-icon) {
      color: var(--badge-live, #e0552b);
    }
  }

  &__more {
    display: flex;
    align-items: center;
    gap: 3px;
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  &__scroller {
    display: flex;
    gap: 11px;
    padding: 0 4px 4px 0;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  // 標準 hcard：132×152（mobile / 桌面同尺寸，桌面僅多顯示張數）
  &__hcard {
    position: relative;
    flex: 0 0 132px;
    height: 152px;
    overflow: hidden;
    background: linear-gradient(155deg, var(--bg-surface), var(--color-accent));
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow-md, var(--shadow));
    cursor: pointer;
    scroll-snap-align: start;
    transition: transform 0.18s ease;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
  }

  &__cap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 24px 11px 11px;
    background: linear-gradient(180deg, transparent, rgba(60, 34, 18, 0.85));
  }

  &__zh {
    font-size: 14px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.05;
    white-space: nowrap;
  }

  // 英文小標題色走 --text-caption-en token；fallback 為米橘 default 值 #f4d9b8
  &__en {
    margin-top: 2px;
    font-size: 9px;
    font-weight: 700;
    color: var(--text-caption-en, #f4d9b8);
    letter-spacing: 0.4px;
    font-style: italic;
    white-space: nowrap;
  }

  // hcard 紅橘 hot tag：走 --gradient-fire-tag token；金 / 紫變體適配主色系
  &__tag {
    position: absolute;
    left: 8px;
    top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 8px;
    background: var(
      --gradient-fire-tag,
      linear-gradient(180deg, #e8602f, #c63d16)
    );
    color: #ffffff;
    font-size: 9px;
    font-weight: 800;
    border-radius: 999px;
    box-shadow: 0 3px 6px rgba(170, 50, 20, 0.3);
  }

  // feat 精選大卡：230×152
  &__feat {
    position: relative;
    flex: 0 0 230px;
    height: 152px;
    overflow: hidden;
    background: var(--gradient-hero);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow-lg, var(--shadow));
    cursor: pointer;
    scroll-snap-align: start;
    transition: transform 0.18s ease;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 64%;
      height: 100%;
      object-fit: cover;
      object-position: center bottom;
      mask: linear-gradient(90deg, transparent, #000000 38%);
    }
  }

  &__feat-cap {
    position: absolute;
    left: 14px;
    top: 16px;
    z-index: 2;
  }

  &__feat-zh {
    font-size: 19px;
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1.05;
    white-space: nowrap;
  }

  &__feat-en {
    margin-top: 3px;
    font-size: 11px;
    font-weight: 700;
    color: var(--text-muted);
    font-style: italic;
    white-space: nowrap;
  }

  &__feat-go {
    position: absolute;
    left: 14px;
    bottom: 14px;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    box-shadow: var(--shadow-md, var(--shadow));
  }
}
</style>
