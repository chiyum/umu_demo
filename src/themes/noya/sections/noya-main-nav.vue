<script setup lang="ts">
import { ref } from "vue";

/**
 * noya 主導覽：左側品牌 + 5 大類 tab
 *
 * 設計：
 * - 5 個分類大 tab：真人 / 體育 / 棋牌 / 電子 / 捕魚
 * - 預設 active = 真人
 * - 切 tab 時 emit 'update:activeCategory'，由父層 (desktop.vue) 同步給 provider grid
 *
 * 為何用 emit 而非 v-model：保留純 emit 讓父層自由決定要不要綁，
 * 將來可能改用 router query 控制；目前 desktop.vue 用 ref 接住。
 *
 * 品牌字樣：用「示範娛樂城 A」取代原站 NOYA / 諾亞，避免侵權。
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

const categories = [
  { key: "live", label: "真人", subLabel: "Live Casino" },
  { key: "sport", label: "體育", subLabel: "Sports" },
  { key: "chess", label: "棋牌", subLabel: "Card Games" },
  { key: "slot", label: "電子", subLabel: "Slots" },
  { key: "fish", label: "捕魚", subLabel: "Fishing" }
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
      <!-- 左：品牌 -->
      <a class="noya-main-nav__brand" href="#" aria-label="回首頁">
        <span class="noya-main-nav__brand-mark">A</span>
        <span class="noya-main-nav__brand-text">
          <span class="noya-main-nav__brand-title">示範娛樂城 A</span>
          <span class="noya-main-nav__brand-sub">DEMO CASINO</span>
        </span>
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
    gap: 10px;
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  &__brand-mark {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    box-shadow: var(--shadow);
  }

  &__brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  &__brand-title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 1px;
  }

  &__brand-sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 2px;
    margin-top: 2px;
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
