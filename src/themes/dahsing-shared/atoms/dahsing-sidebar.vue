<script setup lang="ts">
/**
 * dahsing 三版型共用 7 分類左 sidebar
 *
 * 為什麼用 props 控 compact：
 * - 版型 A（waterfall）原稿走 .side.compact（62px 窄版、icon-only 風格）
 * - 版型 B / C 走標準 96px sidebar（icon + 完整文字）
 * - 抽 prop 後三 theme mobile.vue 只差一個布林，不必各複製一份元件
 *
 * 為什麼 active state 與圖示色塊用 token：
 * - 使用者指定的色票：
 *   - 未 active 背景 #fcf7f4、文字 #bb7353 → 走 var(--bg-surface) / var(--text-muted)
 *   - active 背景 linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%) → var(--gradient-cta)
 *     注意 0deg = 由下往上，深色在上、淺色在下（使用者明示）
 * - 切色變體（米橘 ↔ copper）時整套 sidebar 跟著換，不必動元件
 */
import { QIcon } from "quasar";
import DahsingMiniIcon from "./dahsing-mini-icon.vue";
import { DAHSING_NAV_ITEMS } from "../_assets";

withDefaults(
  defineProps<{
    /** 是否使用窄版 icon-only sidebar（waterfall 用 true） */
    compact?: boolean;
    /** 當前 active 的 nav key（預設 hot） */
    activeKey?: string;
  }>(),
  { compact: false, activeKey: "hot" }
);

defineEmits<{
  (e: "update:active-key", key: string): void;
}>();

/** 從 iconKind 對到 q-icon 名稱（fire / headphones / futbol / fish 走 Iconify） */
function iconifyName(kind: string): string | null {
  switch (kind) {
    case "fire":
      return "material-symbols:local-fire-department";
    case "headphones":
      return "material-symbols:headphones-outline";
    case "futbol":
      return "material-symbols:sports-soccer";
    case "fish":
      return "material-symbols:phishing";
    default:
      return null;
  }
}

/** mini-icon 三種類型（彩票 / 電子 / 棋牌）用獨立元件渲染 */
function miniKind(kind: string): "lotto" | "slot" | "cards" | null {
  if (kind === "lotto") return "lotto";
  if (kind === "slot") return "slot";
  if (kind === "cards") return "cards";
  return null;
}
</script>

<template>
  <div class="dahsing-sidebar" :class="{ 'dahsing-sidebar--compact': compact }">
    <button
      v-for="item in DAHSING_NAV_ITEMS"
      :key="item.key"
      type="button"
      class="dahsing-sidebar__item"
      :class="{ 'dahsing-sidebar__item--active': activeKey === item.key }"
      @click="$emit('update:active-key', item.key)"
    >
      <span v-if="item.hot" class="dahsing-sidebar__hot">HOT!</span>
      <div class="dahsing-sidebar__icon">
        <QIcon
          v-if="iconifyName(item.iconKind)"
          :name="iconifyName(item.iconKind)!"
          size="18px"
        />
        <DahsingMiniIcon
          v-else-if="miniKind(item.iconKind)"
          :kind="miniKind(item.iconKind)!"
        />
      </div>
      <span class="dahsing-sidebar__label">
        {{ compact ? item.shortLabel : item.label }}
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 2px;
  width: 96px;

  &--compact {
    width: 62px;
    gap: 4px;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 14px 4px;
    background: var(--bg-surface);
    color: var(--text-muted);
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
    font-family: inherit;

    &:active {
      transform: scale(0.96);
    }
  }

  &--compact &__item {
    padding: 10px 2px;
    border-radius: 14px;
    gap: 5px;
  }

  // active 用 var(--gradient-cta)（米橘預設：linear-gradient(0deg, #fcf7f4, #bb7353)）
  // 0deg = bottom to top，淺色在下、深色在上（使用者指定）
  &__item--active {
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    box-shadow: var(--shadow);
  }

  &__icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 18px;
    background: var(--bg-overlay);
    color: var(--color-primary);
    box-shadow:
      inset 0 1px 2px rgba(255, 255, 255, 0.6),
      0 2px 5px var(--shadow);
  }

  &--compact &__icon {
    width: 34px;
    height: 34px;
    font-size: 16px;
  }

  &__item--active &__icon {
    background: var(--gradient-cta);
    color: var(--text-on-primary);
  }

  &__label {
    font-size: 13px;
    font-weight: 700;
  }

  &--compact &__label {
    font-size: 10px;
    letter-spacing: -0.3px;
  }

  &__hot {
    position: absolute;
    top: -2px;
    right: 14px;
    padding: 2px 6px;
    background: var(--badge-live, #e0552b);
    color: #fff;
    font-size: 9px;
    font-weight: 900;
    font-style: italic;
    letter-spacing: 0.5px;
    border-radius: 8px 8px 8px 0;
    transform: rotate(-8deg);
    box-shadow: 0 2px 4px rgba(200, 60, 20, 0.4);
  }

  &--compact &__hot {
    right: 6px;
    font-size: 8px;
    padding: 1px 4px;
  }
}
</style>
