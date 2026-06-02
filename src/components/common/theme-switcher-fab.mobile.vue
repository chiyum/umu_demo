<script setup lang="ts">
import { ref, toRef } from "vue";
import { useThemeStore } from "@/store/theme.store";
import { useDraggable } from "@/utils/use-draggable";

/**
 * Theme Switcher FAB（手機版）
 *
 * 設計：圓鈕 + bottom sheet — 點主鈕彈出全寬底部面板，
 * 更符合手機操作習慣（按鈕大、點擊區大、操作直覺）。
 * 拖曳：圓鈕本體可拖；bottom sheet 開啟時整個畫面為操作面板，主鈕暫停拖曳。
 */

const themeStore = useThemeStore();
const opened = ref(false);

const initialPos = toRef(themeStore, "fabPosition");
const FAB_SIZE = 56;

const { isDragging, onPointerDown, getStyle, wasJustDragged } = useDraggable({
  initialPosition: initialPos,
  elementSize: FAB_SIZE,
  onDragEnd: (pos) => themeStore.setFabPosition(pos)
});

// 同 desktop FAB：用 wasJustDragged() 取代 isDragging 來擋拖曳剛結束的誤觸 click
// 詳細原因見 theme-switcher-fab.vue 與 use-draggable.ts 註解
function openSheet() {
  if (wasJustDragged()) return;
  opened.value = true;
}

function closeSheet() {
  opened.value = false;
}

function pickLayout(key: string) {
  themeStore.setLayout(key);
}

function pickColor(key: string) {
  themeStore.setColor(key);
}
</script>

<template>
  <!-- 主鈕：可拖、可點 -->
  <button
    class="fab-mobile"
    :class="{ 'fab-mobile--dragging': isDragging }"
    type="button"
    aria-label="主題切換"
    :style="getStyle()"
    @pointerdown="onPointerDown"
    @click="openSheet"
  >
    <span class="fab-mobile__inner" />
  </button>

  <!-- Bottom sheet 面板 -->
  <transition name="sheet">
    <div v-if="opened" class="fab-sheet" @click.self="closeSheet">
      <div class="fab-sheet__panel">
        <div class="fab-sheet__handle" />
        <div class="fab-sheet__title">
          切換主題
          <button
            class="fab-sheet__close"
            type="button"
            aria-label="關閉"
            @click="closeSheet"
          >
            ×
          </button>
        </div>

        <div class="fab-sheet__section">
          <div class="fab-sheet__section-title">版面</div>
          <div class="fab-sheet__layout-row">
            <button
              v-for="theme in themeStore.allThemes"
              :key="theme.key"
              type="button"
              class="fab-sheet__layout-btn"
              :class="{
                'fab-sheet__layout-btn--active':
                  themeStore.layoutKey === theme.key
              }"
              @click="pickLayout(theme.key)"
            >
              {{ theme.label }}
            </button>
          </div>
        </div>

        <div class="fab-sheet__section">
          <div class="fab-sheet__section-title">配色</div>
          <div class="fab-sheet__color-row">
            <button
              v-for="variant in themeStore.currentTheme.colors"
              :key="variant.key"
              type="button"
              class="fab-sheet__color-btn"
              :class="{
                'fab-sheet__color-btn--active':
                  themeStore.colorKey === variant.key
              }"
              :style="{ '--swatch': variant.swatch }"
              @click="pickColor(variant.key)"
            >
              <span class="fab-sheet__color-swatch" />
              <span class="fab-sheet__color-label">{{ variant.label }}</span>
            </button>
          </div>
        </div>

        <button
          class="fab-sheet__reset"
          type="button"
          @click="themeStore.resetFabPosition()"
        >
          重設浮標位置
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fab-mobile {
  position: fixed;
  z-index: 9999;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
  cursor: grab;
  user-select: none;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.95);
    cursor: grabbing;
  }

  &--dragging {
    cursor: grabbing;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3));
  }

  &__inner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: conic-gradient(#ffffff 0deg, transparent 270deg);
  }
}

.fab-sheet {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;

  &__panel {
    width: 100%;
    background: #ffffff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 12px 20px 24px;
    color: #1f2937;
  }

  &__handle {
    width: 36px;
    height: 4px;
    background: #d1d5db;
    border-radius: 2px;
    margin: 4px auto 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__close {
    border: none;
    background: transparent;
    font-size: 24px;
    line-height: 1;
    color: #6b7280;
    cursor: pointer;
    padding: 0 8px;
  }

  &__section {
    & + & {
      margin-top: 18px;
    }
  }

  &__section-title {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  &__layout-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__layout-btn {
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    color: #374151;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s ease;

    &--active {
      background: linear-gradient(135deg, #4f46e5, #ec4899);
      border-color: transparent;
      color: #ffffff;
    }
  }

  &__color-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__color-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 4px;
    border: 2px solid transparent;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    color: inherit;

    &--active {
      border-color: #1f2937;
    }
  }

  &__color-swatch {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--swatch, #888888);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  }

  &__color-label {
    font-size: 12px;
    color: #4b5563;
  }

  &__reset {
    margin-top: 18px;
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background: #f9fafb;
    color: #4b5563;
    font-size: 13px;
    cursor: pointer;
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.2s ease;

  .fab-sheet__panel {
    transition: transform 0.25s ease;
  }
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;

  .fab-sheet__panel {
    transform: translateY(100%);
  }
}
</style>
