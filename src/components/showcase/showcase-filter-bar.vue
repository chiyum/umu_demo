<script setup lang="ts">
import { computed } from "vue";
import {
  useShowcaseStore,
  type BrightnessFilter
} from "@/store/showcase.store";
import type { ThemeCategory } from "@/themes/_types";

/**
 * Showcase Filter Bar — 主頁版型篩選列
 *
 * 設計：
 * - 上半部：亮暗 segmented control（全部 / 亮 / 暗）+ 右側「搭配 LOGO 推薦」提示
 * - 下半部：5 個類別 chip（multi-select，OR 邏輯）+ 「清除篩選」按鈕（有篩選條件時才顯示）
 * - 視覺與既有 showcase-logo-switcher 對齊（暖金 token 寫死、白底奶油色基底）
 *
 * 為什麼獨立成元件而非塞進 home.vue：
 * - home.vue 已是 layout 編排層；篩選互動細節（segmented active 樣式、chip multi-select 行為）拆出後職責純粹
 * - 後續若要把 filter bar 改成 sticky / 加搜尋框，影響範圍可控
 *
 * 為什麼用 store 而非 props/emit：
 * - 篩選狀態屬於 showcase 全域 state（filteredThemes 等多 computed 都依賴它）
 * - home.vue 也直接從 store 讀 filteredThemes 取代 themes，與本元件解耦
 *
 * 無障礙：
 * - segmented control 用 role="radiogroup" + aria-checked
 * - 類別 chip 用 type="button" + aria-pressed
 * - 「清除篩選」用語意化按鈕
 */

const showcaseStore = useShowcaseStore();

/** 亮暗三選一選項（順序：全部 / 亮 / 暗） */
const brightnessOptions: { key: BrightnessFilter; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "light", label: "亮色" },
  { key: "dark", label: "暗色" }
];

/** 是否有任何篩選條件正在生效（給「清除」按鈕的顯示開關） */
const hasActiveFilter = computed(
  () =>
    showcaseStore.filterBrightness !== "all" ||
    showcaseStore.filterCategories.length > 0
);

function pickBrightness(value: BrightnessFilter): void {
  showcaseStore.setFilterBrightness(value);
}

function toggleCategory(key: ThemeCategory): void {
  showcaseStore.toggleFilterCategory(key);
}

function isCategoryActive(key: ThemeCategory): boolean {
  return showcaseStore.filterCategories.includes(key);
}

function handleClear(): void {
  showcaseStore.clearFilters();
}
</script>

<template>
  <section class="filter-bar" aria-label="版型篩選">
    <div class="filter-bar__inner">
      <!-- 第一列：亮暗 segmented + 右側 LOGO 推薦提示 -->
      <div class="filter-bar__row filter-bar__row--top">
        <div class="filter-bar__group">
          <span class="filter-bar__label" id="brightness-label">明暗</span>
          <div
            class="filter-bar__segmented"
            role="radiogroup"
            aria-labelledby="brightness-label"
          >
            <button
              v-for="opt in brightnessOptions"
              :key="opt.key"
              type="button"
              role="radio"
              class="filter-bar__segment"
              :class="{
                'filter-bar__segment--active':
                  showcaseStore.filterBrightness === opt.key
              }"
              :aria-checked="showcaseStore.filterBrightness === opt.key"
              @click="pickBrightness(opt.key)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!--
          推薦提示：固定在 filter bar 右上方，告訴使用者「卡片上的徽章是依當前 LOGO 主色推薦」
          無 emoji 規範下用「★」單一字符當視覺記號（CSS pseudo），避免 emoji 違規
        -->
        <p class="filter-bar__recommend-hint" aria-hidden="true">
          <span class="filter-bar__recommend-mark">★</span>
          <span>卡片帶徽章 = 依當前 LOGO 主色推薦的最佳搭配</span>
        </p>
      </div>

      <!-- 第二列：類別 chip multi-select + 清除篩選 -->
      <div class="filter-bar__row filter-bar__row--bottom">
        <div class="filter-bar__group filter-bar__group--chips">
          <span class="filter-bar__label" id="category-label">類別</span>
          <div
            class="filter-bar__chips"
            role="group"
            aria-labelledby="category-label"
          >
            <button
              v-for="cat in showcaseStore.allCategoryOptions"
              :key="cat.key"
              type="button"
              class="filter-bar__chip"
              :class="{
                'filter-bar__chip--active': isCategoryActive(cat.key)
              }"
              :aria-pressed="isCategoryActive(cat.key)"
              @click="toggleCategory(cat.key)"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <button
          v-if="hasActiveFilter"
          type="button"
          class="filter-bar__clear"
          @click="handleClear"
        >
          清除篩選
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.filter-bar {
  // 與 logo-switcher / hero 共用暖金漸層基底，視覺自然延續
  background: linear-gradient(180deg, #ffffff 0%, #fef9f1 100%);
  border-bottom: 1px solid rgba(212, 165, 116, 0.12);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;

    &--chips {
      flex: 1;
      min-width: 0;
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 600;
    color: #b8854a;
    letter-spacing: 1px;
  }

  // segmented control（全部 / 亮色 / 暗色）
  &__segmented {
    display: inline-flex;
    border: 1px solid rgba(212, 165, 116, 0.35);
    border-radius: 10px;
    overflow: hidden;
    background: #ffffff;
  }

  &__segment {
    padding: 8px 18px;
    font-size: 14px;
    font-weight: 500;
    color: #6b5a48;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition:
      background 0.18s ease,
      color 0.18s ease;

    & + & {
      border-left: 1px solid rgba(212, 165, 116, 0.2);
    }

    &:hover {
      background: rgba(212, 165, 116, 0.08);
    }

    &--active {
      background: linear-gradient(135deg, #d4a574 0%, #c79968 100%);
      color: #ffffff;
    }
  }

  // 類別 chip
  &__chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__chip {
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #8a7a6a;
    background: #ffffff;
    border: 1px solid rgba(212, 165, 116, 0.32);
    border-radius: 999px;
    cursor: pointer;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      border-color 0.18s ease;

    &:hover {
      border-color: rgba(212, 165, 116, 0.6);
      color: #b8854a;
    }

    &--active {
      background: linear-gradient(135deg, #d4a574 0%, #c79968 100%);
      border-color: transparent;
      color: #ffffff;

      &:hover {
        color: #ffffff;
      }
    }
  }

  // 清除篩選 ghost 按鈕
  &__clear {
    background: transparent;
    border: 1px solid rgba(212, 165, 116, 0.4);
    color: #b8854a;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition:
      background 0.18s ease,
      border-color 0.18s ease;

    &:hover {
      background: rgba(212, 165, 116, 0.08);
      border-color: #d4a574;
    }
  }

  // 右上推薦提示
  &__recommend-hint {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    font-size: 12.5px;
    color: #8a7a6a;
    line-height: 1.5;
  }

  &__recommend-mark {
    color: #d4a574;
    font-size: 14px;
    line-height: 1;
  }
}

@media (width <= 768px) {
  .filter-bar {
    &__inner {
      padding: 18px 20px 22px;
      gap: 14px;
    }

    &__row {
      gap: 12px;
    }

    &__row--top {
      // mobile：亮暗 segment 與推薦提示換行垂直堆疊
      flex-direction: column;
      align-items: flex-start;
    }

    &__group {
      gap: 10px;
      width: 100%;
    }

    &__segmented {
      flex: 1;
    }

    &__segment {
      flex: 1;
      padding: 8px 12px;
      text-align: center;
    }

    &__chip {
      padding: 6px 12px;
      font-size: 12.5px;
    }

    &__recommend-hint {
      font-size: 12px;
    }
  }
}
</style>
