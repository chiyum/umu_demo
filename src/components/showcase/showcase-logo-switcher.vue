<script setup lang="ts">
import { useShowcaseStore } from "@/store/showcase.store";

/**
 * Showcase Logo Switcher — 主頁頂部的 logo 切換 row
 *
 * 設計：
 * - 顯示一條 row，含「label + 三個 logo 縮圖按鈕」
 * - 點按鈕 → showcaseStore.setShowcaseLogoKey(key)
 * - active 樣式：邊框反白 + 上提陰影（呼應 demo 頁 FAB 的 logoBtn--active 視覺記憶）
 * - 三張卡片與 dialog 內的預覽圖會 reactive 跟著換
 *
 * 為什麼獨立成元件而非塞進 home.vue：
 * - home.vue 已是 layout 編排層（hero + grid + dialog），混入按鈕細節會臃腫
 * - 拆出後元件職責純粹：「讀 showcaseStore.showcaseLogoOptions 顯示，setter 寫回 store」
 *
 * 為什麼不重用 FAB 的 logo button 樣式：
 * - FAB 在 demo 頁 fixed 飄浮、小尺寸；showcase 在 hero 下方平鋪、可以做大一點
 * - 兩者視覺語境不同（FAB 偏工具列、showcase 偏 hero CTA），各自獨立樣式較清楚
 *
 * 為什麼用 active 視覺而不顯示 「目前選擇：XXX」文字：
 * - logo 圖示本身即是品牌符號，使用者一眼可辨；多餘文字反而吵
 * - 縮圖按鈕配 title attr 滿足 a11y（hover 時 tooltip 顯示 label）
 */

const showcaseStore = useShowcaseStore();

function pickLogo(key: string): void {
  showcaseStore.setShowcaseLogoKey(key);
}
</script>

<template>
  <section
    class="logo-switcher"
    role="radiogroup"
    aria-label="主頁預覽 logo 切換"
  >
    <div class="logo-switcher__inner">
      <div class="logo-switcher__label">
        <span class="logo-switcher__label-eyebrow">PREVIEW LOGO</span>
        <span class="logo-switcher__label-text">切換 Logo 對比三個版型</span>
      </div>
      <div class="logo-switcher__row">
        <button
          v-for="logo in showcaseStore.showcaseLogoOptions"
          :key="logo.key"
          type="button"
          role="radio"
          class="logo-switcher__btn"
          :class="{
            'logo-switcher__btn--active':
              showcaseStore.showcaseLogoKey === logo.key
          }"
          :aria-checked="showcaseStore.showcaseLogoKey === logo.key"
          :title="logo.label"
          :aria-label="logo.label"
          @click="pickLogo(logo.key)"
        >
          <img :src="logo.src" :alt="logo.label" class="logo-switcher__img" />
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.logo-switcher {
  // 與 hero / grid-wrap 共用「白底 + 淺暖金漸層」基底，視覺自然從 hero 過渡到卡片
  background: linear-gradient(180deg, #fef9f1 0%, #ffffff 100%);
  border-bottom: 1px solid rgba(212, 165, 116, 0.12);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    color: #b8854a;
    text-transform: uppercase;
  }

  &__label-text {
    font-size: 15px;
    color: #6b5a48;
    font-weight: 500;
  }

  &__row {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__btn {
    width: 72px;
    height: 72px;
    padding: 8px;
    border-radius: 12px;
    border: 2px solid rgba(212, 165, 116, 0.22);
    background: #ffffff;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease;

    &:hover {
      transform: translateY(-2px);
      border-color: rgba(212, 165, 116, 0.55);
      box-shadow: 0 6px 16px rgba(212, 165, 116, 0.18);
    }

    &--active {
      // 反白邊框 + 暖金陰影：與 demo 頁 FAB logoBtn--active 同設計語言
      border-color: #b8854a;
      background: #faf5ef;
      box-shadow: 0 4px 12px rgba(184, 133, 74, 0.28);
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

@media (width <= 768px) {
  .logo-switcher {
    &__inner {
      padding: 20px;
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    &__row {
      width: 100%;
      justify-content: space-between;
      gap: 10px;
    }

    &__btn {
      flex: 1;
      max-width: 96px;
      width: auto;
      height: 64px;
    }
  }
}
</style>
