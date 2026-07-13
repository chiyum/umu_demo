<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  watch
} from "vue";
import { useRouter } from "vue-router";
import { useShowcaseStore } from "@/store/showcase.store";
import { getTheme } from "@/themes/_registry";

/**
 * Showcase Preview Dialog — 預覽 lightbox（v4.13 起改為「即時 HTML 預覽」）
 *
 * 設計：
 * - 由 showcase store 集中控制開啟 / 切換 device tab / 關閉
 * - 桌面版 / 手機版兩分頁都改為即時 iframe 嵌 `/preview/<key>`（複用 A9 獨立預覽路由），
 *   桌機分頁用桌機視口寬度、手機分頁用手機視口寬度（帶 `?device=`），以 transform: scale() 縮進 modal 框
 * - 內部配色 swatch 切換即時反映到 iframe（帶 `?color=` 重載 iframe）
 * - 點背景關閉、ESC 鍵關閉、右上 × 關閉；開啟時 body 鎖捲動
 *
 * 為什麼從靜態 WebP <img> 改成即時 iframe：
 * - v4.11 新增的 20 套 theme 沒有 WebP 截圖，舊 dialog 的 desktop/mobile 分頁對它們是空白破圖（實測 a22）
 * - 改即時 HTML 後任何 theme（含沒截圖的新版面）都顯示真實版面，不再破圖，且內容永遠與 demo 頁一致
 *
 * 為什麼手機分頁要帶 `?device=mobile` 而非只縮窄 iframe：
 * - useDevice 是「UA 為行動關鍵字 AND 寬度<=768」兩者皆真才算手機；桌機 UA 下縮窄 iframe 仍渲染 desktop.vue
 * - 故由 modal 明確帶 device 參數，強制 /preview 渲染對應版面（見 preview/_layoutkey.vue 的 forcedIsMobile）
 *
 * 效能：
 * - 一次最多掛 1 個 iframe（桌機 / 手機分頁互斥，切分頁時 src 改變 = 重載，不並存兩個）
 * - dialog 本身用 v-if 動態 mount，關閉即整塊卸載，不像 showcase 72 卡需要 IntersectionObserver
 *
 * 為什麼不用 Quasar Dialog：自己實作 lightbox 可完全控制視覺（暖金描邊 / device tab / 縮放框），不受預設樣式干擾
 * 為什麼用 store 而不 props：dialog 是全域 overlay，任何卡片點預覽都改 store 觸發，home.vue 不必自持 open/activeKey
 */

const showcaseStore = useShowcaseStore();
const router = useRouter();

/** 當前預覽的 theme（依 activePreviewKey 找） */
const activeTheme = computed(() => {
  const key = showcaseStore.activePreviewKey;
  if (!key) return null;
  // getTheme 會 fallback 到預設 theme，這裡用 null 守住「沒在預覽就不渲染」
  return getTheme(key);
});

/**
 * 各裝置的 iframe「參考視口尺寸」（CSS px）
 *
 * - desktop：1280×820，iframe 內 innerWidth=1280 > 768，配 ?device=desktop 渲染桌機版
 * - mobile：390×800，配 ?device=mobile 強制渲染手機版（單靠寬度在桌機 UA 下觸發不了）
 *
 * 這兩組是 iframe 的「內在渲染尺寸」，再由 scale 縮放塞進 modal 的預覽框。
 */
const DEVICE_DIMS = {
  desktop: { w: 1280, h: 820 },
  mobile: { w: 390, h: 800 }
} as const;

/** 當前裝置參考尺寸 */
const dims = computed(() => DEVICE_DIMS[showcaseStore.previewDevice]);

/**
 * iframe src：/preview/<key>?color=<activeColorKey>&logoKey=<showcaseLogoKey>&device=<previewDevice>
 *
 * - router.resolve(...).href 取得含 BASE_URL 的完整路徑（處理 GitHub Pages /umu_demo/ 子路徑）
 * - color 帶 activeColorKey（null 時等於 defaultColor），modal 內切色 swatch 即時重載對應配色
 * - device 帶 previewDevice，讓 /preview 渲染對應桌機 / 手機版面
 */
const previewSrc = computed(() => {
  if (!activeTheme.value) return "";
  const query = new URLSearchParams({
    color: activeColorKey.value ?? activeTheme.value.defaultColor,
    logoKey: showcaseStore.showcaseLogoKey,
    device: showcaseStore.previewDevice
  }).toString();
  return router.resolve(`/preview/${activeTheme.value.key}?${query}`).href;
});

/** iframe title 文字隨 device 切，aria 友善 */
const previewAlt = computed(() => {
  if (!activeTheme.value) return "";
  const deviceLabel =
    showcaseStore.previewDevice === "desktop" ? "桌面版" : "手機版";
  return `${activeTheme.value.label} ${deviceLabel}即時預覽`;
});

/**
 * 是否要顯示 color swatch row
 *
 * 條件：activeTheme.colors 至少 2 個（單色 theme 顯示 swatch row 沒意義）
 *
 * 改即時 iframe 後（v4.13）任何多色 theme 點 swatch 都會即時重載對應配色的真實版面
 * （帶 ?color= 到 /preview），不再依賴是否備有 colorPreviews 色截圖，
 * 故所有 colors>=2 的 theme 一律顯示 swatch row 且切色都有效。
 */
const showColorSwatches = computed(() => {
  return !!activeTheme.value && activeTheme.value.colors.length >= 2;
});

/**
 * 當前 active 的 colorKey（給 swatch render active 樣式用）
 *
 * 為什麼不直接拿 showcaseStore.previewColor：
 * - store 端 null = 用 default color；UI 端為了 active 樣式比對需要實際 colorKey
 * - 這層 computed 把 null 換算成 theme.defaultColor
 */
const activeColorKey = computed(() => {
  if (showcaseStore.previewColor) return showcaseStore.previewColor;
  return activeTheme.value?.defaultColor ?? null;
});

/**
 * iframe 載入 loading 狀態
 *
 * 行為：
 * - previewSrc 變化（切 device / logo / color）→ frameLoading = true（iframe 會重載）
 * - <iframe @load> 觸發 → frameLoading = false，spinner 淡出、預覽淡入
 *
 * 為什麼需要這層：iframe 換 src 時舊畫面殘留到新頁 load 才替換，用 spinner + opacity 過渡較平順
 */
const frameLoading = ref(true);

function onFrameLoad(): void {
  frameLoading.value = false;
}

// previewSrc 變化 → iframe 重載，重置 loading（切 device / logo / color 都會觸發）
watch(previewSrc, () => {
  frameLoading.value = true;
});

/**
 * 預覽框縮放：把「iframe 參考視口（dims）」縮進 modal 的實際預覽區
 *
 * - bodyWrap：預覽區容器（尺寸由 flex 決定，不受內部 iframe 撐大 → 量測穩定不循環）
 * - scale = min(容器寬 / dims.w, 容器高 / dims.h)，取小值讓整個參考視口 contain 進框，最大不超過 1（不放大）
 * - viewport 盒子 = dims × scale（縮放後實際佔位），iframe 內在 dims 尺寸再 transform: scale 從左上縮放填滿盒子
 */
const bodyWrap = ref<HTMLElement | null>(null);
const scale = ref(1);

/** 縮放後預覽盒的實際尺寸（給置中用） */
const viewportStyle = computed(() => ({
  width: `${dims.value.w * scale.value}px`,
  height: `${dims.value.h * scale.value}px`
}));

/** iframe 內在尺寸 + transform 縮放（transform-origin: top left） */
const frameStyle = computed(() => ({
  width: `${dims.value.w}px`,
  height: `${dims.value.h}px`,
  transform: `scale(${scale.value})`
}));

/** 依容器實際尺寸與當前 dims 重算 scale */
function recomputeScale(): void {
  const el = bodyWrap.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const d = dims.value;
  const s = Math.min(rect.width / d.w, rect.height / d.h);
  scale.value = s > 0 ? Math.min(s, 1) : 1;
}

let ro: ResizeObserver | null = null;

/** 開始觀測容器尺寸（dialog 開啟時、元素已在 DOM 後呼叫） */
function startObserve(): void {
  const el = bodyWrap.value;
  if (!el) return;
  recomputeScale();
  if (!ro) {
    ro = new ResizeObserver(() => recomputeScale());
  }
  ro.observe(el);
}

/** 停止觀測（dialog 關閉時） */
function stopObserve(): void {
  ro?.disconnect();
}

// dialog 開關：開 → 等 DOM 掛好再量測 + 觀測；關 → 停止觀測
watch(
  () => showcaseStore.previewDialogOpen,
  async (open) => {
    if (open) {
      await nextTick();
      startObserve();
    } else {
      stopObserve();
    }
  }
);

// 切裝置分頁 → dims 改變，重算縮放（容器尺寸不變但參考視口變了）
watch(
  () => showcaseStore.previewDevice,
  () => {
    // 等 iframe 尺寸 style 更新後再量一次；scale 依 dims 立即重算即可
    recomputeScale();
  }
);

/**
 * ESC 鍵關閉
 *
 * 為什麼掛在 window 而非 dialog 元素：
 * dialog 用 v-if 動態 mount，focus 不一定落在元素上；
 * 掛 window 一勞永逸，配合 isPreviewing 判斷才動作
 */
function onKeydown(e: KeyboardEvent): void {
  if (e.key === "Escape" && showcaseStore.isPreviewing) {
    showcaseStore.closePreview();
  }
}

/**
 * Body 捲動鎖定
 *
 * 動機：lightbox 是 fixed overlay，背景 home 仍可滾動，
 * 使用者滑動時容易誤觸；鎖 body overflow 防止這狀況
 */
function setBodyScrollLock(lock: boolean): void {
  if (typeof document === "undefined") return;
  document.body.style.overflow = lock ? "hidden" : "";
}

watch(
  () => showcaseStore.previewDialogOpen,
  (open) => setBodyScrollLock(open)
);

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  // 元件卸載前一定要解鎖，否則路由切走 body 會一直無法捲動
  setBodyScrollLock(false);
  // 釋放 ResizeObserver，避免記憶體洩漏
  ro?.disconnect();
  ro = null;
});

function handleBackdropClick(): void {
  showcaseStore.closePreview();
}

function pickDevice(device: "desktop" | "mobile"): void {
  showcaseStore.setPreviewDevice(device);
}

/**
 * 點某個 color swatch → 切換 dialog 內預覽色
 *
 * 若選中色與 theme.defaultColor 相同 → 傳 null 給 store（語義上等同「回到 default」）
 * 否則傳具體 colorKey
 *
 * 為什麼這層轉換不放在 store：
 * - store 端設計上允許「previewColor 與 defaultColor 字面相同」，差別只是 null vs 字串
 * - 但 UI 端傳 null 更清楚表達「回到 default」的意圖，避免 store 端再做 if/else
 */
function pickColor(colorKey: string): void {
  if (!activeTheme.value) return;
  const next = colorKey === activeTheme.value.defaultColor ? null : colorKey;
  showcaseStore.setPreviewColor(next);
}
</script>

<template>
  <transition name="preview-fade">
    <div
      v-if="showcaseStore.previewDialogOpen && activeTheme"
      class="preview"
      role="dialog"
      aria-modal="true"
      :aria-label="previewAlt"
      @click.self="handleBackdropClick"
    >
      <div class="preview__panel" @click.stop>
        <header class="preview__header">
          <div class="preview__title">
            {{ activeTheme.label }}
          </div>
          <!-- 尺寸 tab：desktop / mobile -->
          <div class="preview__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              class="preview__tab"
              :class="{
                'preview__tab--active':
                  showcaseStore.previewDevice === 'desktop'
              }"
              :aria-selected="showcaseStore.previewDevice === 'desktop'"
              @click="pickDevice('desktop')"
            >
              桌面版
            </button>
            <button
              type="button"
              role="tab"
              class="preview__tab"
              :class="{
                'preview__tab--active': showcaseStore.previewDevice === 'mobile'
              }"
              :aria-selected="showcaseStore.previewDevice === 'mobile'"
              @click="pickDevice('mobile')"
            >
              手機版
            </button>
          </div>
          <button
            type="button"
            class="preview__close"
            aria-label="關閉預覽"
            @click="showcaseStore.closePreview"
          >
            ×
          </button>
        </header>

        <!-- 配色 swatch row：activeTheme.colors >= 2 才渲染（單色 theme 隱藏） -->
        <div
          v-if="showColorSwatches && activeTheme"
          class="preview__swatches"
          role="radiogroup"
          aria-label="切換預覽配色"
        >
          <button
            v-for="c in activeTheme.colors"
            :key="c.key"
            type="button"
            role="radio"
            class="preview__swatch"
            :class="{
              'preview__swatch--active': activeColorKey === c.key
            }"
            :style="{ '--swatch-color': c.swatch }"
            :aria-checked="activeColorKey === c.key"
            :title="c.label"
            @click="pickColor(c.key)"
          >
            <span class="preview__swatch-dot" aria-hidden="true" />
            <span class="preview__swatch-label">{{ c.label }}</span>
          </button>
        </div>

        <!--
          預覽區：即時 iframe 縮放進框
          - bodyWrap（.preview__body）尺寸由 flex 決定，不被內部 iframe 撐大 → 量測穩定
          - stage 絕對定位鋪滿並置中 viewport 盒；viewport 盒 = dims × scale，內含 iframe 以 transform 縮放
          - 一次僅 1 個 iframe（桌機 / 手機分頁互斥，切分頁改 src 重載）
        -->
        <div
          ref="bodyWrap"
          class="preview__body"
          :data-device="showcaseStore.previewDevice"
        >
          <div class="preview__stage">
            <div class="preview__viewport" :style="viewportStyle">
              <iframe
                :src="previewSrc"
                :title="previewAlt"
                class="preview__frame"
                :class="{ 'preview__frame--loading': frameLoading }"
                :style="frameStyle"
                loading="lazy"
                @load="onFrameLoad"
              />
            </div>
            <div
              v-if="frameLoading"
              class="preview__spinner"
              role="status"
              aria-live="polite"
              aria-label="即時預覽載入中"
            >
              <span class="preview__spinner-ring" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.preview {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(61, 51, 41, 0.72);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  // 自身吃滿，內部 panel 自定義寬高。
  // 為什麼用明確 height 而非只有 max-height（QA 批 4 修正）：
  // 父層 .preview 是 align-items:center，panel 不會縱向撐滿；若 panel 只有 max-height、無明確 height，
  // panel 高度 = 內容高度（僅 header + swatch 列）→ body 的 flex:1 拿不到自由空間 → 塌陷為 0
  // → recomputeScale 讀到 body 高度 <=0 直接 return、scale 停在 1、iframe 被 0 高 body + overflow:hidden
  // 裁掉，使用者完全看不到即時預覽。給明確 height:92vh 後 body flex:1 才有實際高度可分配。
  &__panel {
    width: 100%;
    max-width: 1080px;
    height: 92vh;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(212, 165, 116, 0.18);
    background: linear-gradient(180deg, #faf5ef 0%, #ffffff 100%);
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: #3d3329;
    margin-right: auto;
  }

  &__tabs {
    display: flex;
    gap: 4px;
    background: rgba(212, 165, 116, 0.1);
    padding: 4px;
    border-radius: 8px;
  }

  &__tab {
    padding: 6px 14px;
    border: 0;
    background: transparent;
    color: #8a7a6a;
    font-size: 13px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.18s ease;

    &--active {
      background: #ffffff;
      color: #b8854a;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }

  &__close {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 0;
    background: rgba(212, 165, 116, 0.12);
    color: #6b5a48;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.18s ease;

    &:hover {
      background: rgba(212, 165, 116, 0.24);
    }
  }

  // 配色 swatch row：放在 header 下方、body 上方
  &__swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 20px;
    background: #fffaf2;
    border-bottom: 1px solid rgba(212, 165, 116, 0.14);
  }

  &__swatch {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px 4px 6px;
    border: 1px solid rgba(212, 165, 116, 0.28);
    background: #ffffff;
    border-radius: 999px;
    color: #6b5a48;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition:
      transform 0.16s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease;

    &:hover {
      border-color: rgba(184, 133, 74, 0.6);
      background: #fff5e6;
    }

    &--active {
      border-color: #b8854a;
      background: #fff1d8;
      box-shadow: 0 1px 6px rgba(184, 133, 74, 0.28);
      transform: translateY(-1px);
    }
  }

  &__swatch-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--swatch-color, #cccccc);
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(0, 0, 0, 0.18);
    flex-shrink: 0;
  }

  &__swatch-label {
    white-space: nowrap;
  }

  // 預覽區：固定高度（flex:1 + min-height:0）不被內部 iframe 撐大，量測穩定
  &__body {
    flex: 1;
    min-height: 0;
    position: relative;
    overflow: hidden;
    background: #faf5ef;
  }

  // stage：鋪滿 body 並置中縮放後的 viewport 盒 + spinner overlay
  &__stage {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  // viewport：縮放後預覽盒（尺寸由 viewportStyle 帶入 = dims × scale），內部 iframe 以 transform 縮放填滿
  &__viewport {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    background: #ffffff;
  }

  // 即時預覽 iframe：內在 dims 尺寸，transform: scale 從左上縮放填滿 viewport 盒
  &__frame {
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    transform-origin: top left;
    background: transparent;
    transition: opacity 0.22s ease;

    // loading 期間隱藏未載完的 iframe，spinner 顯示在中央
    &--loading {
      opacity: 0;
    }
  }

  // spinner overlay：iframe 載入中央顯示
  &__spinner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  &__spinner-ring {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid rgba(184, 133, 74, 0.18);
    border-top-color: #b8854a;
    animation: preview-spin 0.8s linear infinite;
  }
}

@keyframes preview-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (width <= 768px) {
  .preview {
    padding: 12px;

    &__header {
      padding: 12px 16px;
      gap: 10px;
      flex-wrap: wrap;
    }

    &__title {
      font-size: 16px;
      flex-basis: 100%;
      order: 0;
    }

    &__tabs {
      order: 1;
    }

    &__close {
      order: 2;
      margin-left: auto;
    }

    &__stage {
      padding: 12px;
    }

    // swatch row 在小螢幕也要 wrap，間距收緊
    &__swatches {
      padding: 10px 14px;
      gap: 6px;
    }

    &__swatch {
      padding: 3px 8px 3px 5px;
      font-size: 11px;
    }

    &__swatch-dot {
      width: 14px;
      height: 14px;
    }
  }
}

.preview-fade-enter-active,
.preview-fade-leave-active {
  transition:
    opacity 0.22s ease,
    backdrop-filter 0.22s ease;

  .preview__panel {
    transition: transform 0.22s ease;
  }
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;

  .preview__panel {
    transform: translateY(20px) scale(0.97);
  }
}
</style>
