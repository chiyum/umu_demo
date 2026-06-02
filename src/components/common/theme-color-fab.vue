<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useDraggable } from "@/utils/use-draggable";

/**
 * Theme Color FAB（桌面版）— 只切配色，不切版面
 *
 * 與舊 theme-switcher-fab.vue 的差異：
 * - 移除「版面」row（demo 頁的版面由 URL 鎖定，不該被 FAB 改）
 * - 接 useDemoThemeStore 取代舊 useThemeStore
 * - 其餘拖曳 / dock 展開 / 配色點擊邏輯完全相同
 *
 * 為什麼不在舊 FAB 加 prop 隱藏版面 row：
 * - 方案 2 採「徹底解耦」策略：FAB 元件職責單一，避免 prop bool 開關蔓延
 * - 拆成獨立元件後，demo 頁的開發者一眼就知道「這個 FAB 只切配色」，認知負擔最低
 */

const themeStore = useDemoThemeStore();
const opened = ref(false);

// 拖曳：把 store 的 fabPosition 當 source of truth
const initialPos = toRef(themeStore, "fabPosition");
const FAB_SIZE = 56; // 與下方 .fab__trigger CSS 對齊

const { position, isDragging, onPointerDown, getStyle, wasJustDragged } =
  useDraggable({
    initialPosition: initialPos,
    elementSize: FAB_SIZE,
    onDragEnd: (pos) => themeStore.setFabPosition(pos)
  });

/** dock 展開方向：靠右就往左展開，靠左就往右展開（避免飛出視窗） */
const expandDirection = computed<"left" | "right">(() => {
  return position.value.xRatio > 0.5 ? "left" : "right";
});

/**
 * 點主鈕的處理：拖曳剛結束的不要觸發開合
 *
 * 沿用舊 FAB 的 wasJustDragged() pattern，避免拖曳結束的 click 誤觸
 * 詳細原因見 use-draggable.ts 的 POST_DRAG_CLICK_GAP_MS 註解
 */
function toggleOpen() {
  if (wasJustDragged()) return;
  opened.value = !opened.value;
}

function pickColor(key: string) {
  themeStore.setColor(key);
}
</script>

<template>
  <!-- 整個容器都吃 pointer down 觸發拖曳；展開後的子按鈕用 stop 防止點擊也觸發拖曳 -->
  <div
    class="fab"
    :class="{
      'fab--open': opened,
      'fab--dragging': isDragging,
      [`fab--expand-${expandDirection}`]: true
    }"
    :style="getStyle()"
    @pointerdown="onPointerDown"
  >
    <!-- 主鈕：點擊開合 dock -->
    <button
      class="fab__trigger"
      type="button"
      aria-label="配色切換"
      @click="toggleOpen"
    >
      <span class="fab__trigger-inner" />
      <span class="fab__trigger-label">配色</span>
    </button>

    <!-- 展開面板：只有配色列（版面 row 已移除） -->
    <transition name="fab-panel">
      <div v-show="opened" class="fab__panel" @pointerdown.stop>
        <div class="fab__section">
          <div class="fab__section-title">配色</div>
          <div class="fab__color-row">
            <button
              v-for="variant in themeStore.currentTheme.colors"
              :key="variant.key"
              type="button"
              class="fab__color-btn"
              :class="{
                'fab__color-btn--active': themeStore.colorKey === variant.key
              }"
              :style="{ '--swatch': variant.swatch }"
              :title="variant.label"
              @click="pickColor(variant.key)"
            >
              <span class="fab__color-swatch" />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.fab {
  position: fixed;
  z-index: 9999;
  width: 56px; // 跟主鈕同寬，這樣容器不會被面板撐大；面板用 absolute 飄出
  height: 56px;
  user-select: none;
  touch-action: none; // 阻止瀏覽器原生 pinch / scroll，讓拖曳完全可控
  transition: filter 0.2s ease;

  &--dragging {
    cursor: grabbing;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.25));
  }
}

.fab__trigger {
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: transform 0.2s ease;

  &:active {
    cursor: grabbing;
    transform: scale(0.96);
  }

  &-inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: conic-gradient(#ffffff 0deg, transparent 270deg);
  }

  &-label {
    line-height: 1;
  }
}

.fab__panel {
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  padding: 12px 14px;
  min-width: 180px;
  color: #1f2937;
  font-size: 13px;
}

// expand 方向用 absolute 飄出，左 / 右二擇一
.fab--expand-right .fab__panel {
  left: calc(100% + 12px);
}

.fab--expand-left .fab__panel {
  right: calc(100% + 12px);
}

.fab__section-title {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.fab__color-row {
  display: flex;
  gap: 8px;
}

.fab__color-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: scale(1.08);
  }

  &--active {
    border-color: #1f2937;
  }
}

.fab__color-swatch {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--swatch, #888888);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

// 展開動畫：方向依 dock 方向不同，這裡簡化用 fade + scale
.fab-panel-enter-active,
.fab-panel-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.fab-panel-enter-from,
.fab-panel-leave-to {
  opacity: 0;
  transform: scale(0.94);
}
</style>
