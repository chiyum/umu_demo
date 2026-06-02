<script setup lang="ts">
import { ref } from "vue";

/**
 * noya 手機版分類「左側 vertical sidebar」 — round 4 對齊原站
 *
 * 為什麼從原本的 noya-mobile-category-strip（頂部橫排）改成 vertical sidebar：
 * 原站 5168th.com 手機版的真人 / 體育 / 棋牌 / 電子 / 捕魚 5 大類在
 * 「畫面左側上下排列」（不是頂部橫排），右半邊才是各家真人館列表。
 * Round 4 結構對齊把這個排列方向修正，視覺保持原 emoji + 文字結構。
 *
 * 結構：
 * - 左固定寬約 76px，每個 item 用 emoji + 文字垂直堆疊
 * - active 時整列 highlight 並把 emoji 圓形底變色
 * - 父層 mobile.vue 用 flex row 把 sidebar 放在左、右側 main 帶捲動
 *
 * 為何不沿用原本 strip：橫排 vs 直排 flex 軸向相反、active 樣式邊框位置完全不同，
 * 用條件 prop 在同檔切換會讓 CSS 條件分支爆炸，直接拆新元件比較乾淨。
 */

interface Props {
  /** 預設選中的分類 key */
  activeCategory?: string;
}

withDefaults(defineProps<Props>(), { activeCategory: "live" });

const emit = defineEmits<{
  (e: "update:activeCategory", v: string): void;
}>();

const categories = [
  { key: "live", emoji: "🎴", label: "真人" },
  { key: "sport", emoji: "⚽", label: "體育" },
  { key: "chess", emoji: "♟️", label: "棋牌" },
  { key: "slot", emoji: "🎰", label: "電子" },
  { key: "fish", emoji: "🐟", label: "捕魚" }
];

const localActive = ref("live");

function pick(key: string) {
  localActive.value = key;
  emit("update:activeCategory", key);
}
</script>

<template>
  <nav class="noya-m-side" aria-label="分類選單">
    <button
      v-for="c in categories"
      :key="c.key"
      type="button"
      class="noya-m-side__item"
      :class="{ 'noya-m-side__item--active': localActive === c.key }"
      @click="pick(c.key)"
    >
      <span class="noya-m-side__bubble">{{ c.emoji }}</span>
      <span class="noya-m-side__label">{{ c.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.noya-m-side {
  // 左側固定欄：寬度抓 76px 與原站接近。
  // 用 background 把 sidebar 與右側 main 區隔開，邊界用細 border 線
  width: 76px;
  flex-shrink: 0;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  // 與右側 main 同步可捲動：高度由 flex 父層撐滿
  overflow-y: auto;

  &__item {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text-muted);
    padding: 10px 4px;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    // stylelint-disable-next-line no-descending-specificity
    &--active {
      color: var(--color-primary);

      // active item 用 surface deep 帶左側色條提示，與 strip 的圓徽 highlight
      // 表達意圖一致但符合 vertical 排版習慣
      background: var(--bg-overlay);
      box-shadow: inset 3px 0 0 var(--color-primary);

      // stylelint-disable-next-line no-descending-specificity
      .noya-m-side__bubble {
        background: var(--gradient-cta);
        box-shadow: 0 4px 8px var(--bg-overlay);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__bubble {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bg-base);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.18s ease;
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
</style>
