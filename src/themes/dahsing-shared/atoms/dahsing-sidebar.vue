<script setup lang="ts">
/**
 * dahsing 三版型共用 7 分類左 sidebar
 *
 * 為什麼用 props 控 compact：
 * - 版型 A（waterfall）原稿走 .side.compact（62px 窄版、icon-only 風格）
 * - 版型 B / C 走標準 96px sidebar（icon + 完整文字）
 * - 抽 prop 後三 theme mobile.vue 只差一個布林，不必各複製一份元件
 *
 * 為什麼未 active 走 token、active 漸層 hard-code：
 * - 未 active 背景 #fcf7f4、文字 #bb7353 → 走 var(--bg-surface) / var(--text-muted)
 *   切色變體（米橘 ↔ copper）時自動換色
 * - active 漸層 linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%) 由使用者明確指定為 sidebar nav 專用
 *   （0deg = 由下往上，深色在上、淺色在下）
 *   不走 --gradient-cta：reviewer 指出該 token 同時被 hot-bar 標題 / 登入按鈕 / .play / .pic
 *   / .go 等銅金 CTA 元件引用；若把 token 改成此 nav 漸層會破壞那些元件視覺；nav active 漸層
 *   性質與「主 CTA 按鈕色」不同，應由元件自管
 * - active label 文字色從 var(--text-on-primary)=#ffffff 改為 var(--color-primary)=#bb7353：
 *   原本白字落在漸層下半段 #fcf7f4 米白底上幾乎看不見（嚴重可讀性），深棕橘在淺底上對比足夠
 * - active icon 區塊改用同一條 nav 漸層 + 白字（icon 底色屬於漸層整體一部份，白色 icon 落在
 *   漸層上半段 #bb7353 區可讀）
 *
 * 為什麼 copper variant 不另外覆寫 nav active 漸層：
 * - copper 是「沿用原稿銅金經典」配色，原稿本來就無「nav active 用米橘漸層」這個視覺
 * - 暫保 copper 模式下 sidebar active 仍維持米橘漸層（與標題銅金形成對比），視覺仍可讀
 *   若未來使用者要求 copper 模式 nav active 改色，再加 :where([data-theme-color="copper"]) 局部覆寫
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

  // active 漸層 hard-code 使用者指定的 nav 專用色（不走 token，理由見 script 區註解）
  // 0deg = bottom to top，淺色在下、深色在上
  // label 文字色用 var(--color-primary)（深棕橘）取代原本的 var(--text-on-primary)（白）
  // —— 白字在漸層下半段 #fcf7f4 米白底上不可讀；深棕橘在淺底對比足夠
  &__item--active {
    background: linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%);
    color: var(--color-primary);
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

  // active icon：與 item 同條 nav 漸層；icon 本身用白色（落在漸層上半段深棕橘區可讀）
  // 為什麼不沿用 var(--gradient-cta)：同 item--active，避免被 token 重構又帶錯色
  &__item--active &__icon {
    background: linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%);
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
