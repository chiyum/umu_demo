<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useShowcaseStore } from "@/store/showcase.store";
import { getTheme, getPreview } from "@/themes/_registry";

/**
 * Showcase Preview Dialog — 預覽 lightbox
 *
 * 設計：
 * - 由 showcase store 集中控制開啟 / 切換 device tab / 關閉
 * - 顯示當前 theme 的 desktop / mobile 截圖，可在內部切 tab
 * - 點背景關閉、ESC 鍵關閉、右上 × 關閉
 * - 開啟時 body 鎖捲動，避免背景跟著捲
 *
 * 為什麼不用 Quasar Dialog：
 * - Quasar Dialog 需要 boot 設定 + plugin，這個專案 home 走 layout-theme-host 也不依賴 Quasar dialog
 * - 自己實作 lightbox 可完全控制視覺（暖金背景描邊 / device tab 樣式），不受 Quasar 預設樣式干擾
 *
 * 為什麼用 store 而不 props：
 * - dialog 是「全域 overlay」，由 home.vue 掛一次即可；任何卡片點預覽都改 store 觸發
 * - props 模式會強迫 home.vue 維護 open / activeKey 等 ref，與 showcase store 重複
 */

const showcaseStore = useShowcaseStore();

/** 當前預覽的 theme（依 activePreviewKey 找） */
const activeTheme = computed(() => {
  const key = showcaseStore.activePreviewKey;
  if (!key) return null;
  // getTheme 會 fallback 到預設 theme，這裡用 null 守住「沒在預覽就不渲染」
  return getTheme(key);
});

/**
 * 當前要顯示的圖片 URL
 *
 * 為什麼用 getPreview helper：
 * - dialog 內的桌面 / 手機切換要 reactively 跟著 showcaseLogoKey + previewDevice + previewColor 三個 state
 * - getPreview 內含 fallback 鏈，無效 key / 缺檔時退到 default 截圖，dialog 不會破圖
 */
const previewSrc = computed(() => {
  if (!activeTheme.value) return "";
  return getPreview(
    activeTheme.value,
    showcaseStore.showcaseLogoKey,
    showcaseStore.previewDevice,
    showcaseStore.previewColor
  );
});

/** alt 文字隨 device 切，aria 友善 */
const previewAlt = computed(() => {
  if (!activeTheme.value) return "";
  const deviceLabel =
    showcaseStore.previewDevice === "desktop" ? "桌面版" : "手機版";
  return `${activeTheme.value.label} ${deviceLabel}預覽`;
});

/**
 * 是否要顯示 color swatch row
 *
 * 條件：activeTheme.colors 至少 2 個（單色 theme 顯示 swatch row 沒意義）
 *
 * 為什麼不額外檢查「該 theme 是否提供 colorPreviews」：
 * - getPreview 內已處理「沒 colorPreviews 退回 default 截圖」
 * - 即使該 theme 沒色截圖，使用者點 swatch 仍會看到 default 截圖（無視覺效果）
 *   這比「藏 swatch」更不混淆（不然其他 theme 也看不到 color 切換能力）
 * - 但 dahsing 三 theme 走完整截圖切換，其他 theme 點 swatch 等於不動
 *   未來其他 theme 補上 colorPreviews 截圖時，這條件不必動
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
 * 圖片載入 loading 狀態
 *
 * 行為：
 * - previewSrc 變化（切 device / logo / color）→ imgLoading = true
 * - <img @load> 觸發 → imgLoading = false
 * - <img @error> 觸發 → 也設 false（避免 spinner 永遠不消，缺圖時直接顯示破圖比較直觀）
 *
 * 為什麼需要這層 state：
 * - 純靠 <img src> 換 URL 時，舊圖會殘留到新圖 onload 才被替換，視覺上「卡住舊圖」很怪
 * - loading 期間用 opacity:0 把 <img> 藏起來，同位置顯示 spinner；
 *   onload 後 opacity:1 淡入新圖，視覺平順
 *
 * 為什麼不在 spinner 蓋一層 v-if 切換 <img>：
 * - 切 <img> 會丟掉「瀏覽器在背景已經拉到一半的請求」（DOM unmount）
 * - 用 opacity 控制可讓瀏覽器持續解碼，spinner 純粹是視覺遮罩，更省資源
 */
const imgLoading = ref(true);

function handleImgLoad(): void {
  imgLoading.value = false;
}

function handleImgError(): void {
  imgLoading.value = false;
}

// previewSrc 變化 → 重置 loading（切 device / logo / color 都會觸發）
watch(previewSrc, () => {
  imgLoading.value = true;
});

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

        <div class="preview__body" :data-device="showcaseStore.previewDevice">
          <!--
            效能：dialog 本身用 v-if 動態 mount，僅在 user 點預覽時才產生此 img；
            仍維持 loading="lazy" + decoding="async" 讓瀏覽器在快速切換時能更好地排程解碼工作。

            載入體驗：用 wrapper + spinner，圖片 opacity 控制顯示時機：
            - imgLoading=true：opacity 0，spinner 顯示，避免舊圖殘留
            - imgLoading=false（onload）：opacity 1 淡入
          -->
          <div class="preview__img-wrap">
            <img
              :src="previewSrc"
              :alt="previewAlt"
              class="preview__img"
              :class="{ 'preview__img--loading': imgLoading }"
              loading="lazy"
              decoding="async"
              @load="handleImgLoad"
              @error="handleImgError"
            />
            <div
              v-if="imgLoading"
              class="preview__spinner"
              role="status"
              aria-live="polite"
              aria-label="預覽圖載入中"
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

  // 自身吃滿，內部 panel 自定義寬高
  &__panel {
    width: 100%;
    max-width: 1080px;
    max-height: 92vh;
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

  &__body {
    flex: 1;
    overflow: auto;
    background: #faf5ef;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  // 圖片包一層 wrapper，用來定位 spinner overlay
  &__img-wrap {
    position: relative;
    width: 100%;

    // 至少撐起一個高度，loading 時 spinner 才有空間顯示
    min-height: 200px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  &__img {
    display: block;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    transition: opacity 0.22s ease;

    // 桌面版圖較寬，手機版較窄；用 max-width 自適應
    width: 100%;
    height: auto;
    object-fit: contain;

    // loading 期間隱藏舊圖，spinner 顯示在同位置
    &--loading {
      opacity: 0;
    }
  }

  // spinner overlay：圖片載入中央顯示
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

  // 手機版預覽：圖塞窄一點模擬實際裝置寬度
  &__body[data-device="mobile"] .preview__img-wrap {
    max-width: 380px;
  }

  &__body[data-device="mobile"] .preview__img {
    max-width: 380px;
  }

  &__body[data-device="desktop"] .preview__img {
    max-width: 100%;
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

    &__body {
      padding: 16px;
    }

    &__body[data-device="mobile"] .preview__img-wrap,
    &__body[data-device="mobile"] .preview__img {
      max-width: 320px;
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
