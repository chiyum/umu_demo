<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, watch } from "vue";
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
 * - dialog 內的桌面 / 手機切換要 reactively 跟著 showcaseLogoKey + previewDevice 兩個 state
 * - getPreview 內含 fallback 鏈，無效 key 時退到 defaultLogo 截圖，dialog 不會破圖
 */
const previewSrc = computed(() => {
  if (!activeTheme.value) return "";
  return getPreview(
    activeTheme.value,
    showcaseStore.showcaseLogoKey,
    showcaseStore.previewDevice
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

        <div class="preview__body" :data-device="showcaseStore.previewDevice">
          <img :src="previewSrc" :alt="previewAlt" class="preview__img" />
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

  &__body {
    flex: 1;
    overflow: auto;
    background: #faf5ef;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  &__img {
    display: block;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

    // 桌面版圖較寬，手機版較窄；用 max-width 自適應
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  // 手機版預覽：圖塞窄一點模擬實際裝置寬度
  &__body[data-device="mobile"] .preview__img {
    max-width: 380px;
  }

  &__body[data-device="desktop"] .preview__img {
    max-width: 100%;
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

    &__body[data-device="mobile"] .preview__img {
      max-width: 320px;
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
