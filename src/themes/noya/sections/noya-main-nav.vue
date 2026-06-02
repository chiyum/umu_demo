<script setup lang="ts">
import { ref } from "vue";
import noyaLogo from "@/assets/themes/noya/images/logo.png";

/**
 * noya 主導覽：左側品牌 logo + 5 大類 tab
 *
 * 設計：
 * - 5 個分類大 tab：真人 / 體育 / 棋牌 / 電子 / 捕魚
 * - 預設 active = 真人
 * - 切 tab 時 emit 'update:activeCategory'，由父層 (desktop.vue) 同步給 provider grid
 *
 * 為何用 emit 而非 v-model：保留純 emit 讓父層自由決定要不要綁，
 * 將來可能改用 router query 控制；目前 desktop.vue 用 ref 接住。
 *
 * Logo：使用 UMU 自有品牌 logo（src/assets/themes/noya/images/logo.png）取代原先文字佔位
 * UMU 為寬版橫式 logo，PC header 約 40px 高度可保有清晰可辨識度
 */

interface Props {
  /** 當前 active 分類 key */
  activeCategory?: string;
}

withDefaults(defineProps<Props>(), {
  activeCategory: "live"
});

const emit = defineEmits<{
  (e: "update:activeCategory", value: string): void;
}>();

/**
 * 5 大類 icon：全站統一走 Iconify Material Symbols Outlined
 * 對齊使用者指定：真人=person / 體育=sports-soccer / 棋牌=casino / 電子=smart-toy / 捕魚=phishing
 * mobile sidebar 也用同一組（noya-mobile-category-sidebar.vue），跨版面同語意同視覺
 */
const categories = [
  {
    key: "live",
    label: "真人",
    subLabel: "Live Casino",
    icon: "material-symbols:person-outline"
  },
  {
    key: "sport",
    label: "體育",
    subLabel: "Sports",
    icon: "material-symbols:sports-soccer-outline"
  },
  {
    key: "chess",
    label: "棋牌",
    subLabel: "Card Games",
    icon: "material-symbols:casino-outline"
  },
  {
    key: "slot",
    label: "電子",
    subLabel: "Slots",
    icon: "material-symbols:smart-toy-outline"
  },
  {
    key: "fish",
    label: "捕魚",
    subLabel: "Fishing",
    icon: "material-symbols:phishing"
  }
];

const localActive = ref("live");

function pick(key: string) {
  localActive.value = key;
  emit("update:activeCategory", key);
}
</script>

<template>
  <div class="noya-main-nav">
    <div class="noya-main-nav__inner">
      <!-- 左：品牌 logo（UMU 自有品牌） -->
      <a class="noya-main-nav__brand" href="#" aria-label="DEMO 回首頁">
        <img :src="noyaLogo" alt="DEMO" class="noya-main-nav__brand-img" />
      </a>

      <!-- 中：5 大分類 tab -->
      <nav class="noya-main-nav__tabs" aria-label="主分類">
        <button
          v-for="cat in categories"
          :key="cat.key"
          type="button"
          class="noya-main-nav__tab"
          :class="{ 'noya-main-nav__tab--active': localActive === cat.key }"
          @click="pick(cat.key)"
        >
          <!-- icon 用 Iconify，視覺上比純文字更明確分類 -->
          <Icon :icon="cat.icon" class="noya-main-nav__tab-icon" />
          <span class="noya-main-nav__tab-label">{{ cat.label }}</span>
          <span class="noya-main-nav__tab-sub">{{ cat.subLabel }}</span>
        </button>
      </nav>

      <!-- 右：附加區（保留語言切換等位置） -->
      <div class="noya-main-nav__extra">
        <span class="noya-main-nav__lang" aria-label="語言切換">繁中</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.noya-main-nav {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);

  // 接續 announce-top-bar (sticky top:0 / height:40px，Round 5 由 50 降至 40) 下方，
  // 捲動時 5 大類 tab 仍保留在視窗內，避免使用者下捲後找不到分類切換入口
  position: sticky;
  top: 40px;
  z-index: 150;

  // 同 announce-top-bar：flex 父層 stretch 在 Chromium 會讓 sticky 失效，
  // 顯式宣告 align-self: flex-start + width: 100% 才會 stick 住。
  align-self: flex-start;
  width: 100%;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  // UMU logo 為寬版橫式，高度限 40px、寬自動，object-fit: contain 保比例
  &__brand-img {
    height: 40px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;
  }

  &__tabs {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  &__tab {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 8px 18px;
    cursor: pointer;
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    transition: all 0.18s ease;
    min-width: 80px;

    // tab 內 icon：26px，與大字 16px 拉開層次，並走 currentColor 跟 active 變色
    &-icon {
      width: 26px;
      height: 26px;
      margin-bottom: 2px;
    }

    &-label {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    &-sub {
      font-size: 10px;
      letter-spacing: 1px;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    &:hover {
      border-color: var(--border);
      background: var(--bg-overlay);
    }

    &--active {
      background: var(--gradient-cta);
      border-color: var(--color-primary);
      color: var(--text-on-primary);
      box-shadow: var(--shadow);

      .noya-main-nav__tab-sub {
        color: var(--text-on-primary);
        opacity: 0.8;
      }
    }
  }

  &__extra {
    flex-shrink: 0;
  }

  &__lang {
    font-size: 12px;
    color: var(--text-muted);
    padding: 6px 12px;
    border: 1px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
