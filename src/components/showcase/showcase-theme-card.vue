<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import type { ThemeMeta } from "@/themes/_types";
import { getPreview, getThemeMainSwatch } from "@/themes/_registry";
import { useShowcaseStore } from "@/store/showcase.store";

/**
 * Showcase Theme Card — 單張版型展示卡片
 *
 * 設計（v4.12 起改為「即時 HTML 預覽」）：
 * - 上半部縮圖改用 iframe 嵌入 /preview/<key>（該 theme 的獨立乾淨預覽頁），
 *   以 transform: scale() 縮放到卡片尺寸，呈現真實版面而非靜態截圖
 * - 效能鐵則（72 套）：IntersectionObserver 懶載入——iframe 只在卡片進視窗才掛 src；
 *   離開視窗即卸載以省記憶體（避免 72 個 SPA 同時常駐）
 * - 退回策略：既有 WebP 截圖當 poster 先顯示，iframe 載入完成再淡入蓋上；
 *   無對應 WebP 的新 theme 用 theme 主色漸層佔位，絕不破圖
 * - 下半部標題 / 描述 / 兩個 CTA 維持不變
 *
 * 為什麼 iframe src 用 /preview/<key> 而非 /demo/<key>：
 * - /preview 是無 chrome 的乾淨版面（無 FAB），嵌進卡片不會被浮標擋住縮圖
 * - 且不跑 URL sync，避免 iframe 內無謂的 history churn（見 layout-theme-preview）
 *
 * 為什麼「預覽」按鈕仍 emit 而不在元件內開 dialog：
 * - 預覽 dialog 由父層（home.vue）集中管理，元件對外只 emit 語意事件，較易測試與重用
 * - 但 showcaseLogoKey 是「畫面狀態」，本元件渲染 iframe src 就需要它，故這層 useShowcaseStore 是讀不寫
 */

const props = defineProps<{
  theme: ThemeMeta;
  /**
   * 是否為「依當前 logo 主色推薦」的版型（由父層 home.vue 依 recommendedThemeKeys 計算傳入）
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
 * iframe 內部渲染寬度（CSS px）——固定用桌機參考寬度
 *
 * 為什麼固定 1280：
 * - iframe 是獨立 browsing context，其 window.innerWidth = 此 CSS 寬度（1280）> 768 手機閾值，
 *   故 iframe 內 useDevice 一律判為桌機、渲染 desktop.vue，與既有 WebP poster（桌面截圖）一致
 * - 即使使用者在真手機上看 showcase，iframe 仍以 1280 寬渲染桌機版，縮放後預覽比例穩定
 */
const PREVIEW_REFERENCE_WIDTH = 1280;

/**
 * 卡片縮圖 poster src：既有 WebP 截圖（依 showcaseLogoKey 切 logo 版本）
 *
 * 缺檔（20 套新 theme 無截圖）時 getPreview 回 ""，改用 theme 主色漸層佔位（見 template）。
 */
const posterSrc = computed(() =>
  getPreview(props.theme, showcaseStore.showcaseLogoKey, "desktop")
);

/** 無 WebP 時的漸層佔位底色（取 theme 代表色，避免破圖） */
const posterGradientStyle = computed(() => {
  const c = getThemeMainSwatch(props.theme);
  return {
    background: `linear-gradient(135deg, ${c} 0%, rgba(0, 0, 0, 0.35) 100%)`
  };
});

/**
 * iframe src：/preview/<key>?color=<defaultColor>&logoKey=<showcaseLogoKey>
 *
 * 為什麼用 router.resolve(...).href：
 * - 拿到含 BASE_URL 的完整 href，自動處理 GitHub Pages /umu_demo/ 子路徑；
 *   寫死字串在 prod 會缺前綴 404
 * - 帶 color = theme.defaultColor 讓 iframe 顯示該 theme 的預設配色（與 poster 一致）
 * - 帶 logoKey = 使用者在 showcase 選定的 logo，卡片即時預覽跟著換 logo（與舊行為一致）
 */
const previewSrc = computed(() => {
  const query = new URLSearchParams({
    color: props.theme.defaultColor,
    logoKey: showcaseStore.showcaseLogoKey
  }).toString();
  return router.resolve(`/preview/${props.theme.key}?${query}`).href;
});

/**
 * 縮圖容器（IntersectionObserver + ResizeObserver 的觀測目標）
 *
 * 用 ref(null) + template 的 ref="thumbWrap" 自動綁定（Vue 3.4 無 useTemplateRef，該 API 為 3.5+）
 */
const thumbWrap = ref<HTMLElement | null>(null);

/** iframe 是否進入視窗（懶載入開關）；離開視窗即卸載省記憶體 */
const isVisible = ref(false);
/** iframe 是否已 load 完成（控制 poster 淡出） */
const isFrameLoaded = ref(false);
/** 縮放比例：容器寬 / 參考寬（1280）；預設 0.45 避免首拍未量測時的視覺跳動 */
const scale = ref(0.45);

/** iframe 內容盒寬高（參考寬 × 16:10 比例），scale 後剛好填滿 16:10 容器 */
const frameStyle = computed(() => ({
  width: `${PREVIEW_REFERENCE_WIDTH}px`,
  height: `${(PREVIEW_REFERENCE_WIDTH * 10) / 16}px`,
  transform: `scale(${scale.value})`
}));

let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;

/** iframe load 完成 → 標記已載入，觸發 poster 淡出 */
function onFrameLoad(): void {
  isFrameLoaded.value = true;
}

/** 依容器實際寬度重算縮放比例 */
function recomputeScale(width: number): void {
  if (width > 0) scale.value = width / PREVIEW_REFERENCE_WIDTH;
}

onMounted(() => {
  const el = thumbWrap.value;
  if (!el) return;

  // 首拍先量一次，避免等到 observer callback 才有正確 scale
  recomputeScale(el.clientWidth);

  // ResizeObserver：容器寬度變動（RWD / grid 換欄）時同步縮放比例
  ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      recomputeScale(entry.contentRect.width);
    }
  });
  ro.observe(el);

  // IntersectionObserver：進視窗才掛 iframe，離開即卸載（72 套避免同時常駐）
  // rootMargin 300px：鄰近卡片提前掛載，捲動到時已載好，減少 poster 閃爍
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible.value = true;
        } else {
          // 離開視窗：卸載 iframe（v-if）並重置載入旗標，回退顯示 poster
          isVisible.value = false;
          isFrameLoaded.value = false;
        }
      }
    },
    { rootMargin: "300px 0px" }
  );
  io.observe(el);
});

onBeforeUnmount(() => {
  io?.disconnect();
  ro?.disconnect();
  io = null;
  ro = null;
});

/**
 * previewSrc 改變（使用者切 showcase logo）時，若 iframe 正掛載中，
 * src 綁定會讓 iframe 重載 → 重置 isFrameLoaded 讓 poster 先蓋回、載完再淡出，避免顯示半載入畫面。
 */
watch(previewSrc, () => {
  if (isVisible.value) isFrameLoaded.value = false;
});

/** 點預覽：往上 emit，由父層開 ShowcasePreviewDialog */
function handlePreview(): void {
  emit("preview", props.theme.key);
}

/**
 * 點 Demo：開新分頁到 /demo/:layoutKey
 * 用 router.resolve(...).href 取得含 base 的完整路徑（處理 /umu_demo/ 子路徑）；
 * noopener/noreferrer 避免新分頁反向操控原頁。
 */
function handleOpenDemo(): void {
  const route = router.resolve(`/demo/${props.theme.key}`);
  window.open(route.href, "_blank", "noopener,noreferrer");
}
</script>

<template>
  <article
    class="theme-card"
    :class="{ 'theme-card--recommended': props.recommended }"
  >
    <!-- 推薦徽章：絕對定位在卡片右上角，pointer-events:none 不攔截點擊 -->
    <span
      v-if="props.recommended"
      class="theme-card__badge"
      role="note"
      aria-label="搭配當前 LOGO 主色推薦的版型"
    >
      <span class="theme-card__badge-mark" aria-hidden="true">★</span>
      <span class="theme-card__badge-text">LOGO 推薦</span>
    </span>

    <!--
      縮圖區：poster（底層）+ 即時 iframe（懶載入蓋在上層）+ 透明點擊按鈕（最上層）
      - 用 div 當容器（而非 button）：iframe 屬互動內容不可置於 button 內（HTML 規範）
      - 點擊由絕對定位的透明 button 承接，維持「點縮圖任一處 = 預覽」
    -->
    <div ref="thumbWrap" class="theme-card__thumb">
      <!--
        底層佔位：一律 theme 主色漸層（純 CSS、零網路請求），WebP / iframe 疊在其上
        - 對所有 72 套皆為安全底圖：缺 WebP 的新 theme 只靠它；有 WebP 者被上層截圖蓋住
      -->
      <div
        class="theme-card__poster theme-card__poster--gradient"
        :style="posterGradientStyle"
        aria-hidden="true"
      />

      <!--
        WebP poster：僅在卡片接近視窗時（isVisible，IntersectionObserver rootMargin 300px）
        才掛 src 發請求——硬保證「未進視窗的卡片 poster 不預抓」，收斂快捲時的瞬間連線爆量
        （dev 模式曾見 poster webp 觸發 ERR_INSUFFICIENT_RESOURCES）。
        loading=lazy + decoding=async 作為 belt-and-suspenders；iframe 載完後 poster 淡出顯示即時預覽。
      -->
      <img
        v-if="posterSrc && isVisible"
        :src="posterSrc"
        :alt="`${props.theme.label} 預覽縮圖`"
        class="theme-card__poster"
        :class="{ 'theme-card__poster--hidden': isFrameLoaded }"
        loading="lazy"
        decoding="async"
      />

      <!--
        即時預覽 iframe：只在進視窗時掛載（isVisible），離開即卸載
        - pointer-events:none：不攔截捲動 / 點擊，交給上層透明按鈕
        - scrolling=no + tabindex=-1 + aria-hidden：純視覺預覽，不進 tab 序、不可捲動
        - transform: scale() 由 frameStyle 依容器寬度算出
      -->
      <iframe
        v-if="isVisible"
        :src="previewSrc"
        :title="`${props.theme.label} 即時預覽`"
        class="theme-card__frame"
        :style="frameStyle"
        scrolling="no"
        tabindex="-1"
        aria-hidden="true"
        loading="lazy"
        @load="onFrameLoad"
      />

      <!-- 透明點擊層 + hover 遮罩文字 -->
      <button
        class="theme-card__thumb-btn"
        type="button"
        :aria-label="`預覽 ${props.theme.label}`"
        @click="handlePreview"
      >
        <span class="theme-card__thumb-overlay">
          <span class="theme-card__thumb-overlay-text">點擊預覽</span>
        </span>
      </button>
    </div>

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

  // 推薦態：金色邊框 + 加重陰影
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
    z-index: 3;
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
    pointer-events: none;
  }

  &__badge-mark {
    font-size: 12px;
    line-height: 1;
  }

  &__badge-text {
    line-height: 1;
  }

  // 縮圖容器：16:10 佔位（防 CLS），內含 poster / iframe / 點擊層三層疊放
  &__thumb {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #faf5ef;
  }

  // poster：鋪滿容器，iframe 載完後淡出
  &__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    z-index: 1;
    transition: opacity 0.35s ease;
  }

  &__poster--gradient {
    // 無 WebP 時的漸層佔位（背景色由 inline style 帶入 theme 主色）
    object-fit: fill;
  }

  &__poster--hidden {
    opacity: 0;
  }

  // 即時預覽 iframe：左上為原點縮放，鋪在 poster 之上
  &__frame {
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    transform-origin: top left;
    pointer-events: none;
    background: transparent;
    z-index: 2;
  }

  // 透明點擊層：覆蓋整個縮圖，承接點擊 → 預覽
  &__thumb-btn {
    position: absolute;
    inset: 0;
    z-index: 3;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    display: block;
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

  // hover：顯示遮罩文字（放在 base 規則之後，避免 stylelint no-descending-specificity 違規）
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
    min-height: 44px;
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
