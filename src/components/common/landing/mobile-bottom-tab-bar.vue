<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuasar } from "quasar";

/**
 * 行動裝置底部 fixed tab bar — noya / at99 mobile 共用
 *
 * 設計：
 * - 5 個 icon + label 平均分配
 * - 點擊只跳 Notify 提示，純 demo
 * - icon 走全站統一的 Iconify Material Symbols Outlined（@iconify/vue 已在 main.ts 註冊為 Icon 元件）
 * - 顏色全走 var()，配色切換時跟著走
 *
 * 為何是共用元件而非各 theme 自己寫：手機底部 tab bar 結構幾乎一樣，
 * 只是配色差異；用 CSS var 已可解決配色，沒理由重複實作。
 *
 * Round 5：icon 從 Quasar Material Icons 字型統一遷移至 Iconify Material Symbols Outlined，
 * 全站 outline 風格一致；icon 名稱以完整 iconify 格式傳入（含 `material-symbols:` prefix）。
 */

interface TabItem {
  /** 識別 key */
  key: string;
  /** Iconify icon 名稱（完整格式，例：material-symbols:home-outline） */
  icon: string;
  /** 文字標籤 */
  label: string;
  /**
   * 是否為「中央凸起」項目
   *
   * noya / at99 mobile 的原站 bottom tab 中央都有一顆凸起按鈕（登入 / 存提），
   * 設這個旗標讓共用元件用同一份結構處理，避免各自做一份。
   * 一個 tab bar 內最多一個 raised；若多個會視覺打架，但元件層不擋。
   */
  raised?: boolean;
}

interface Props {
  /** 自訂 tab 項目；不傳則用 5 個預設項 */
  items?: TabItem[];
  /** 預設 active 的 key */
  activeKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeKey: "home",
  items: () => [
    { key: "home", icon: "material-symbols:home-outline", label: "首頁" },
    { key: "promo", icon: "material-symbols:redeem", label: "優惠" },
    {
      key: "service",
      icon: "material-symbols:support-agent",
      label: "客服"
    },
    { key: "member", icon: "material-symbols:person-outline", label: "會員" },
    { key: "more", icon: "material-symbols:menu", label: "更多" }
  ]
});

const $q = useQuasar();

/**
 * 當前 active key
 *
 * 改為 ref 而非 computed setter 為空的 wrapper：原本寫成
 * `computed({ set: () => {} })` 會讓 v-model / 賦值靜默失效，
 * 點擊後 highlight 停不住，使用者體感是「按下沒反應」。
 *
 * 改用 ref 內部維護，並 watch props.activeKey 同步外部初始值；
 * 如父層之後想接管，再加 emit 或改回 v-model 模式。
 */
const internalActive = ref(props.activeKey);

watch(
  () => props.activeKey,
  (next) => {
    internalActive.value = next;
  }
);

function handleTap(item: TabItem) {
  internalActive.value = item.key;
  $q.notify({
    message: `Demo 環境：${item.label} 僅展示版面`,
    color: "primary",
    position: "top",
    timeout: 1500
  });
}
</script>

<template>
  <nav class="mobile-tab-bar" role="navigation" aria-label="底部主導覽">
    <button
      v-for="item in props.items"
      :key="item.key"
      type="button"
      class="mobile-tab-bar__item"
      :class="{
        'mobile-tab-bar__item--active': internalActive === item.key,
        'mobile-tab-bar__item--raised': item.raised
      }"
      @click="handleTap(item)"
    >
      <span class="mobile-tab-bar__icon-wrap">
        <!-- 全站統一 Iconify Material Symbols Outlined（width / height 走 css 控制以利調整） -->
        <Icon :icon="item.icon" class="mobile-tab-bar__icon" />
      </span>
      <span class="mobile-tab-bar__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  padding: 4px 0 max(4px, env(safe-area-inset-bottom));
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);

  &__item {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 6px 4px;
    cursor: pointer;
    transition: color 0.15s ease;
    position: relative;

    &--active {
      color: var(--color-primary);
    }

    &:active {
      transform: scale(0.96);
    }
  }

  // 中央凸起樣式：把 icon 容器放大成圓並用 primary 漸層
  // 對齊 noya / at99 mobile 原站 bottom tab 的 raised 中央按鈕視覺
  &__icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: inherit;
    transition: all 0.18s ease;
  }

  // Iconify <Icon> 預設用 currentColor，靠父層 color 控色；
  // 統一給 22px 與舊 q-icon size 一致
  &__icon {
    width: 22px;
    height: 22px;
  }

  &__label {
    font-size: 11px;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }

  // 中央凸起樣式：raised 旗標為 true 的 item 把 icon 圓鈕浮到 tab bar 上方
  // 對齊 noya / at99 mobile 原站 bottom tab 的 raised 中央按鈕視覺
  // stylelint-disable no-descending-specificity
  &__item--raised {
    color: var(--text-on-primary);

    // raised 用 margin-top 負值把 icon 提到 tab bar 上方，
    // 視覺上像凸起的圓鈕；下方 label 仍維持原位置
    .mobile-tab-bar__icon-wrap {
      width: 48px;
      height: 48px;
      background: var(--gradient-cta);
      box-shadow:
        0 4px 12px var(--bg-overlay),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
      margin-top: -22px;
      border: 3px solid var(--bg-base);
    }

    .mobile-tab-bar__label {
      color: var(--color-primary);
      font-weight: 700;
      margin-top: 2px;
    }
  }
  // stylelint-enable no-descending-specificity
}
</style>
