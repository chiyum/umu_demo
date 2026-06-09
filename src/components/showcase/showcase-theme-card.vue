<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { ThemeMeta } from "@/themes/_types";
import { getPreview } from "@/themes/_registry";
import { useShowcaseStore } from "@/store/showcase.store";

/**
 * Showcase Theme Card — 單張版型展示卡片
 *
 * 設計：
 * - 上半部縮圖（desktop 預覽，依 showcaseLogoKey 切換 logo 版本），下半部標題 / 描述 / 兩個 CTA
 * - 「預覽」按鈕觸發 emit，由父層用 showcase store 開 dialog
 * - 「Demo」按鈕走 router.resolve + window.open 開新分頁
 *
 * 為什麼用 router.resolve 而不寫死字串：
 * - 部署到 GitHub Pages 是子路徑 /umu_demo/，router.resolve 會自動帶上 base
 * - 寫 `/demo/noya` 字串在 prod 會錯成 https://chiyum.github.io/demo/noya（缺前綴 → 404）
 * - resolve 拿到的 href 已是含 base 的完整相對路徑，window.open 用它最安全
 *
 * 為什麼 emit preview 而不在元件內 useShowcaseStore.openPreview：
 * - 預覽行為（開 dialog）由父層集中管理，元件對外只 emit 語意事件，較易測試與重用
 * - 但 showcaseLogoKey 是「畫面狀態」，本元件自己渲染就需要它，所以這層 useShowcaseStore 是讀不寫
 */

const props = defineProps<{
  theme: ThemeMeta;
  /**
   * 是否為「依當前 logo 主色推薦」的版型
   *
   * 由父層（home.vue）依 showcaseStore.recommendedThemeKeys 計算傳入。
   * 預設 false，避免 prop 漏傳時誤打徽章。
   * 切 logo / 切篩選都會 reactive 更新（推薦集合 vs 篩選集合各自獨立 computed）
   */
  recommended?: boolean;
}>();

const emit = defineEmits<{
  (e: "preview", themeKey: string): void;
}>();

const router = useRouter();
const showcaseStore = useShowcaseStore();

/** 顏色 swatch 預覽：在卡片底部顯示該 theme 支援的 3 色 */
const colorSwatches = computed(() => props.theme.colors);

/**
 * 卡片縮圖 src：依 showcaseLogoKey 從 previews 矩陣抓 desktop 圖
 *
 * 為什麼用 getPreview helper 而非直接 props.theme.previews[key].desktop：
 * - getPreview 內含 logoKey → defaultLogo → logos[0] fallback 鏈，避免無效 key 破圖
 * - 與 showcase-preview-dialog 共用同一個 helper，行為一致
 */
const thumbSrc = computed(() =>
  getPreview(props.theme, showcaseStore.showcaseLogoKey, "desktop")
);

/**
 * 點預覽：往上 emit，由父層決定行為（通常是開 ShowcasePreviewDialog）
 */
function handlePreview(): void {
  emit("preview", props.theme.key);
}

/**
 * 點 Demo：開新分頁到 /demo/:layoutKey
 *
 * 為什麼用 router.resolve(...).href：
 * - 拿到含 BASE_URL 的完整 href，自動處理 /umu_demo/ 子路徑
 * - 直接 window.open(href, '_blank') 即可開新分頁
 *
 * noopener / noreferrer：避免新分頁有 window.opener 反向操控原頁（安全慣例）
 */
function handleOpenDemo(): void {
  // 用 path 字串 resolve 而不用 name：
  // pages.ts 自動產的 route name 對含 `:` 的動態段邏輯較難預測（雖實測為 `demo-:layoutkey`），
  // 用 path 字串走 resolve 在 vue-router 完全等價且不依賴 name 生成規律
  const route = router.resolve(`/demo/${props.theme.key}`);
  // resolve 後的 href 已含 base，例如 /umu_demo/demo/noya
  window.open(route.href, "_blank", "noopener,noreferrer");
}
</script>

<template>
  <article
    class="theme-card"
    :class="{ 'theme-card--recommended': props.recommended }"
  >
    <!--
      推薦徽章：絕對定位在卡片右上角
      - 不影響卡片本身點擊行為（pointer-events: none，徽章只是視覺標記）
      - 用「LOGO 推薦」純文字 + 金色帶設計，避免 emoji
    -->
    <span
      v-if="props.recommended"
      class="theme-card__badge"
      role="note"
      aria-label="搭配當前 LOGO 主色推薦的版型"
    >
      <span class="theme-card__badge-mark" aria-hidden="true">★</span>
      <span class="theme-card__badge-text">LOGO 推薦</span>
    </span>

    <!-- 縮圖：點圖也算預覽（提高觸發機會） -->
    <button
      class="theme-card__thumb-btn"
      type="button"
      :aria-label="`預覽 ${props.theme.label}`"
      @click="handlePreview"
    >
      <!--
        效能：showcase 主頁會渲染全部 theme 卡片（>10 張），每張卡片一張 desktop 預覽圖。
        - loading="lazy"：瀏覽器原生延遲載入 below-the-fold 圖，首屏只下載可見卡片
        - decoding="async"：圖片解碼不阻塞主執行緒，捲動時也更順
        - 防 CLS：外層 .theme-card__thumb-btn 已用 aspect-ratio: 16 / 10 佔位，
          圖片載入前後不會跳版，不必再硬塞 width/height attribute（理由：實際渲染尺寸
          由 CSS 控制，attribute 寫死的 intrinsic ratio 反而會被 CSS aspect-ratio 蓋掉）
      -->
      <img
        :src="thumbSrc"
        :alt="`${props.theme.label} 預覽縮圖`"
        class="theme-card__thumb"
        loading="lazy"
        decoding="async"
      />
      <span class="theme-card__thumb-overlay">
        <span class="theme-card__thumb-overlay-text">點擊預覽</span>
      </span>
    </button>

    <div class="theme-card__body">
      <h2 class="theme-card__title">{{ props.theme.label }}</h2>
      <p class="theme-card__desc">{{ props.theme.description }}</p>

      <!-- 顏色配色預覽：3 個小圓點 + label -->
      <div
        class="theme-card__swatches"
        :aria-label="`${props.theme.label} 配色`"
      >
        <span
          v-for="c in colorSwatches"
          :key="c.key"
          class="theme-card__swatch"
          :style="{ background: c.swatch }"
          :title="c.label"
        />
      </div>

      <div class="theme-card__actions">
        <button
          type="button"
          class="theme-card__btn theme-card__btn--ghost"
          @click="handlePreview"
        >
          預覽
        </button>
        <button
          type="button"
          class="theme-card__btn theme-card__btn--primary"
          @click="handleOpenDemo"
        >
          Demo
          <span class="theme-card__btn-icon" aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.theme-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(212, 165, 116, 0.12);
  border: 1px solid rgba(212, 165, 116, 0.18);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(212, 165, 116, 0.24);
  }

  // 推薦態：金色邊框 + 加重陰影，視覺上比一般卡片更搶眼
  &--recommended {
    border-color: rgba(184, 133, 74, 0.6);
    box-shadow: 0 6px 22px rgba(184, 133, 74, 0.22);

    &:hover {
      box-shadow: 0 14px 32px rgba(184, 133, 74, 0.34);
    }
  }

  // 推薦徽章本體（絕對定位於卡片右上角）
  &__badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 999px;
    background: linear-gradient(135deg, #d4a574 0%, #b8854a 100%);
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    box-shadow: 0 4px 10px rgba(184, 133, 74, 0.4);

    // 徽章僅作為視覺標記，不應攔截點擊；確保「點卡片任何位置 = 觸發 thumb-btn 預覽」
    // 但徽章本身有 role="note"，不該被點擊（也避免遮住底下縮圖按鈕）
    pointer-events: none;
  }

  &__badge-mark {
    font-size: 12px;
    line-height: 1;
  }

  &__badge-text {
    line-height: 1;
  }

  // stylelint no-descending-specificity：所有低 specificity 的 base 規則
  // （&__thumb-btn / &__thumb / &__thumb-overlay / &__thumb-overlay-text）
  // 必須宣告在高 specificity 的 hover combo 規則（&__thumb-btn:hover .xxx）之前。
  // 為了維持「同主題的 selector 視覺上聚在一起」，把兩條 hover combo 集中放在 thumb 區塊末尾
  &__thumb-btn {
    position: relative;
    padding: 0;
    border: 0;
    background: #faf5ef;
    cursor: pointer;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    display: block;
  }

  &__thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.4s ease;
  }

  &__thumb-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(61, 51, 41, 0.55);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &__thumb-overlay-text {
    color: #fff8eb;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 10px 22px;
    border: 1px solid rgba(255, 248, 235, 0.7);
    border-radius: 6px;
  }

  // hover combo：必須在所有 base 規則之後，避免 stylelint no-descending-specificity 違規
  &__thumb-btn:hover .theme-card__thumb {
    transform: scale(1.03);
  }

  &__thumb-btn:hover .theme-card__thumb-overlay {
    opacity: 1;
  }

  &__body {
    padding: 24px 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    font-size: 22px;
    font-weight: 700;
    color: #3d3329;
    margin: 0;
  }

  &__desc {
    font-size: 14px;
    color: #8a7a6a;
    line-height: 1.6;
    margin: 0;
    min-height: 44px; // 描述 1-2 行高度齊平
  }

  &__swatches {
    display: flex;
    gap: 8px;
    margin: 4px 0 8px;
  }

  &__swatch {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  &__actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }

  &__btn {
    flex: 1;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  &__btn--ghost {
    background: transparent;
    border: 1px solid rgba(212, 165, 116, 0.4);
    color: #b8854a;

    &:hover {
      background: rgba(212, 165, 116, 0.08);
      border-color: #d4a574;
    }
  }

  &__btn--primary {
    background: linear-gradient(135deg, #d4a574 0%, #c79968 100%);
    border: 1px solid transparent;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(212, 165, 116, 0.32);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(212, 165, 116, 0.42);
    }
  }

  &__btn-icon {
    font-size: 16px;
    line-height: 1;
  }
}

@media (width <= 768px) {
  .theme-card {
    &__body {
      padding: 20px;
    }

    &__title {
      font-size: 19px;
    }

    &__btn {
      padding: 11px 14px;
    }
  }
}
</style>
