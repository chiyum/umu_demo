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

/**
 * 為什麼 4 個 icon 從 QIcon (Iconify) 改回 inline SVG：
 * - 原本 iconifyName() 回傳 "material-symbols:local-fire-department" 等命名空間字串給 QIcon
 * - 但 Quasar QIcon 預設不認 Iconify 命名空間（沒設 iconSet / 沒掛 svg-use loader），實際渲染為空
 * - 改用 inline SVG：bundle 內、立即渲染、無外部依賴、fill="currentColor" 跟著 active 切色
 *
 * 統一風格：Font Awesome 6 Free Solid（與原稿 HTML 的 fa-solid fa-{fire,headphones,futbol,fish} 1:1 對齊）
 * - viewBox 各自原始尺寸（FA path data 對應的 native viewBox）
 * - fill="currentColor"：色彩跟著 .dahsing-sidebar__icon { color } 走，active 時自動變白
 * - width/height 透過 CSS class 控制（compact 16px / 標準 18px，對齊原本 QIcon size）
 *
 * 為什麼 inline 而非抽 sub-component：4 個 path 都是短字串，抽元件多開檔反而增加跳轉成本
 *
 * 為什麼不動 mini-icon（lotto/slot/cards）：那 3 個是 1:1 對齊原 HTML 的純 CSS / 純文字實作，
 * 不是 FA icon（彩票"6"是 mi.lotto 純數字、電子"777"是 mi.slot 純文字、棋牌是 ::before/::after 兩張疊牌）
 */

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
        <!--
          fire / headphones / futbol / fish：Font Awesome 6 Free Solid inline SVG
          path data 為公開 FA 資料；fill="currentColor" 讓 SVG 跟著 color 切色
        -->
        <svg
          v-if="item.iconKind === 'fire'"
          class="dahsing-sidebar__svg"
          viewBox="0 0 448 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"
          />
        </svg>
        <svg
          v-else-if="item.iconKind === 'headphones'"
          class="dahsing-sidebar__svg"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26 0 49 12.4 63.5 31.5c5.4-5.9 12.1-10.5 19.6-13.4c13.6-5.2 28.7-5.2 42.3 0c25.7 9.9 38.3 38.7 28.4 64.3l-77.5 201.3c-3.7 9.6-9.6 17.9-17 24.6c-15.7 13.9-37.5 17-56.5 7.8C13.2 555.5 0 510.2 0 462.2v-22.8V416 304 256C0 114.6 114.6 0 256 0S512 114.6 512 256v48 112 23.4 22.8c0 47.9-13.2 93.3-50.8 109.9c-19 9.2-40.8 6.1-56.5-7.8c-7.4-6.6-13.3-15-17-24.6L310.2 338.3c-9.9-25.7 2.7-54.5 28.4-64.3c13.6-5.2 28.7-5.2 42.3 0c7.5 2.9 14.1 7.6 19.6 13.4C414.9 268.4 438 256 464 256c10.8 0 21 2.2 30.4 6C481.6 159.4 394.1 80 288 80h-32z"
          />
        </svg>
        <svg
          v-else-if="item.iconKind === 'futbol'"
          class="dahsing-sidebar__svg"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59c-15.66 4.219-32.04 6.766-49.04 6.766s-33.38-2.547-49.04-6.766l-25.15-81.59l-85.4 1.297c-17.97-22.05-31.27-48.14-37.95-76.84L137.4 235.2L84.51 168.2c11.51-27.46 28.87-51.74 50.46-71.32L213.7 124.5L283.9 67.93C264.8 56.65 246.4 47.34 226 41.81C235.8 39.69 245.7 38.4 256 38.4s20.16 1.293 30.04 3.418c-20.45 5.535-38.81 14.84-57.91 26.13L298.3 124.5l78.74-27.62c21.59 19.59 38.95 43.86 50.46 71.32l-52.89 67.04l78.16 48.85C445.1 312.7 432.6 338.8 416.6 360.9z"
          />
        </svg>
        <svg
          v-else-if="item.iconKind === 'fish'"
          class="dahsing-sidebar__svg"
          viewBox="0 0 576 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M180.5 141.5C219.7 108.5 272.6 80 336 80s116.3 28.5 155.5 61.5c39.1 33 66.9 72.4 81 99.8c4.7 9.2 4.7 20.1 0 29.3c-14.1 27.4-41.9 66.8-81 99.8C452.3 403.5 399.4 432 336 432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1 379.6c-12.5 7.3-28.4 5.3-38.7-4.9S-3 348.7 4.2 336.1L50 256 4.2 175.9c-7.2-12.6-5-28.4 5.3-38.6s26.1-12.2 38.7-4.9l89.7 52.3c12.2-14.6 26.5-29.4 42.7-43.1zM448 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
          />
        </svg>
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

  // active 漸層走 --gradient-nav-active token：各 theme 在 _tokens.scss / _variants.scss
  // 自帶對應色（米橘 / copper / gold / purple）；token 不在時 fallback 米橘原值
  // 0deg = bottom to top，淺色在下、深色在上
  // label 文字色用 var(--color-primary) 取代原本的 var(--text-on-primary)（白）
  // —— 白字在漸層下半段淺底上不可讀；主色在淺底對比足夠
  &__item--active {
    background: var(
      --gradient-nav-active,
      linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%)
    );
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

  // FA inline SVG 尺寸（對齊原本 QIcon size 18 / compact 16）
  // 為什麼需要顯式 size：SVG 不像 font icon 靠 font-size 撐開；
  // 必須給 width/height 否則 SVG 內 element 會用 viewBox 的原始尺寸（如 448×512）爆出 icon 圓圈
  &__svg {
    display: block;
    width: 18px;
    height: 18px;
  }

  &--compact &__svg {
    width: 16px;
    height: 16px;
  }

  // active icon：與 item 同條 nav 漸層；icon 本身用白色（落在漸層上半段深色區可讀）
  // 為什麼不沿用 var(--gradient-cta)：CTA 是主按鈕視覺，與 nav active 性質不同；走獨立 token
  &__item--active &__icon {
    background: var(
      --gradient-nav-active,
      linear-gradient(0deg, #fcf7f4 0%, #bb7353 100%)
    );
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
    color: #ffffff;
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
