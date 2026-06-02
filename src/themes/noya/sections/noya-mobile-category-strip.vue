<script setup lang="ts">
import { ref } from "vue";

/**
 * noya 手機版分類橫條 — 銜接 banner 與 real people list
 *
 * 結構：5 個小圖示分類，類似 app 首頁的分類入口
 * - 圓形底 + emoji icon + 文字
 * - 點擊 emit 切換，本層只做高亮，內容由上層決定
 *
 * 為什麼用 emoji 而非 Quasar icon：跨配色更好控制（emoji 不會被 text color 影響）
 * 也避免再多載 icon font
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
  <nav class="noya-m-cat" aria-label="分類選單">
    <button
      v-for="c in categories"
      :key="c.key"
      type="button"
      class="noya-m-cat__item"
      :class="{ 'noya-m-cat__item--active': localActive === c.key }"
      @click="pick(c.key)"
    >
      <span class="noya-m-cat__bubble">{{ c.emoji }}</span>
      <span class="noya-m-cat__label">{{ c.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.noya-m-cat {
  background: var(--bg-base);
  display: flex;
  justify-content: space-around;
  padding: 14px 12px 8px;

  &__item {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text-muted);
    padding: 4px 2px;
    transition: color 0.15s ease;

    &--active {
      color: var(--color-primary);

      .noya-m-cat__bubble {
        background: var(--gradient-cta);
        box-shadow: 0 4px 8px var(--bg-overlay);
      }
    }
  }

  &__bubble {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.18s ease;
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
</style>
