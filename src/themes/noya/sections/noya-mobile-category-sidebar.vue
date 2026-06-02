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

/**
 * 分類 icon 統一走 Iconify Material Symbols Outlined，與 noya PC main nav
 * 保持同一組 icon name（真人 person / 體育 sports-soccer / 棋牌 casino / 電子 smart-toy / 捕魚 phishing），
 * 兩個版面語意一致才不會給使用者「兩套圖」的錯亂感
 */
// 第十輪：原本「體育」用 material-symbols:sports-soccer-outline，但 Iconify Material Symbols 集合中
// sports-soccer 沒有 -outline 變體（Material Symbols 部分 icon 不提供 outline 後綴），
// 結果渲染為空 SVG（viewBox="0 0 16 16" 無 path）。
// 改用實際存在的 material-symbols:sports-soccer 作為體育 icon；其他 icon 也統一檢查確認可用
// 同時把 phishing 改為加 -outline 嘗試 → 確認 phishing-outline 存在
const categories = [
  { key: "live", icon: "material-symbols:person-outline", label: "真人" },
  {
    key: "sport",
    icon: "material-symbols:sports-soccer",
    label: "體育"
  },
  { key: "chess", icon: "material-symbols:casino-outline", label: "棋牌" },
  { key: "slot", icon: "material-symbols:smart-toy-outline", label: "電子" },
  { key: "fish", icon: "material-symbols:phishing", label: "捕魚" }
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
      <span class="noya-m-side__bubble">
        <Icon :icon="c.icon" class="noya-m-side__icon" />
      </span>
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
    position: relative;
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
      background var(--transition-fast),
      color var(--transition-fast);

    // 第十輪：active 視覺對比增強
    // 原本只用 surface deep + 內陰影 + bubble 漸層，整體與非 active 對比太弱
    // 改為：實心主色背景 + 白字 + 左側 4px 主色條（kingdom block-label 風格）+ glow
    // stylelint-disable-next-line no-descending-specificity
    &--active {
      // 用主色實心背景，讓 active 跟非 active 形成「面積 vs 線」的強烈對比
      background: var(--color-primary);

      // active 項目 icon + label 改為白色（或 bg-base），高對比
      color: var(--text-on-primary, #ffffff);

      // 主色條的 inset shadow 移除，改用 ::after 偽元素畫，視覺更乾淨
      box-shadow:
        0 2px 8px var(--bg-overlay),
        0 0 12px var(--color-primary);

      // 左側 4px 主色條：kingdom block-label DNA
      // 為什麼用 ::after 而非 inset shadow：偽元素可獨立控制色階 + 邊緣 glow，
      // 也方便未來改成漸層條而不影響 box-shadow stack
      &::after {
        content: "";
        position: absolute;
        top: 8px;
        bottom: 8px;
        left: 0;
        width: 4px;
        background: var(--color-accent, #ffd84d);
        border-radius: 0 2px 2px 0;
        box-shadow: 0 0 6px var(--color-accent, #ffd84d);
      }

      // stylelint-disable-next-line no-descending-specificity
      .noya-m-side__bubble {
        // active bubble：白底圓 + 主色 icon，與實心主色背景形成「白圓徽」視覺焦點
        // 不再用 gradient-cta（避免雙主色漸層疊在主色背景上造成混亂）
        background: rgba(255, 255, 255, 0.95);
        border-color: transparent;
        color: var(--color-primary);
        box-shadow:
          0 4px 8px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.6);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__bubble {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-circle);
    background: var(--bg-base);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all var(--transition-base);
  }

  // Iconify icon 用 currentColor，靠 bubble 父層 color 控色
  &__icon {
    width: 22px;
    height: 22px;
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
</style>
