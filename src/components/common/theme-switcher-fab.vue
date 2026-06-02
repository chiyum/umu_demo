<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useThemeStore } from "@/store/theme.store";
import { useDraggable } from "@/utils/use-draggable";

/**
 * @deprecated
 *
 * Theme Switcher FAB（桌面版）— 已被 theme-color-fab.vue 取代（方案 2 雙 store 解耦）
 *
 * 舊版同時提供「版面切換」+「配色切換」兩 row；新架構下版面由 URL 鎖定，
 * FAB 不該再有切版面功能，故拆成只切配色的新 FAB（theme-color-fab.vue）
 *
 * 為什麼保留檔案而不直接刪：見 src/store/theme.store.ts 頂部 @deprecated 註解
 *
 * 不要在新程式碼中 import 這個元件；改用 `theme-color-fab.vue`
 *
 * 原設計：dock 樣式 — 主鈕展開後直接顯示版面列 + 配色列，無需二次點擊
 * 拖曳：整個外層容器都可拖，避免使用者只能抓主鈕
 */

const themeStore = useThemeStore();
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
  // 拿 ratio 的 X 判斷在左半或右半
  return position.value.xRatio > 0.5 ? "left" : "right";
});

/**
 * 點主鈕的處理：拖曳剛結束的不要觸發開合
 *
 * 為什麼用 wasJustDragged()：
 * 原本用 isDragging.value 判斷，但 click 事件與 pointerup 在同一 task 接續觸發，
 * 拖曳剛結束時 isDragging 還未被 setTimeout 清掉，第一次 click 會被吃掉。
 * 改用 wasJustDragged() 透過 timestamp 比對，邏輯更穩。
 * 純點擊（沒拖曳）時 lastDragEndTime 仍是 0，差距遠大於 GAP，正常放行。
 */
function toggleOpen() {
  if (wasJustDragged()) return;
  opened.value = !opened.value;
}

function pickLayout(key: string) {
  themeStore.setLayout(key);
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
      :aria-label="$t ? '主題切換' : 'Theme switcher'"
      @click="toggleOpen"
    >
      <span class="fab__trigger-inner" />
      <span class="fab__trigger-label">主題</span>
    </button>

    <!-- 展開面板：版面列 + 配色列 -->
    <transition name="fab-panel">
      <div v-show="opened" class="fab__panel" @pointerdown.stop>
        <div class="fab__section">
          <div class="fab__section-title">版面</div>
          <div class="fab__layout-row">
            <button
              v-for="theme in themeStore.allThemes"
              :key="theme.key"
              type="button"
              class="fab__layout-btn"
              :class="{
                'fab__layout-btn--active': themeStore.layoutKey === theme.key
              }"
              @click="pickLayout(theme.key)"
            >
              {{ theme.label }}
            </button>
          </div>
        </div>
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
  min-width: 220px;
  color: #1f2937;
  font-size: 13px;
}

// expand 方向用 absolute 飄出，左 / 右二擇一
// 用 calc(100% + 12px) 取代 margin，讓主鈕跟面板之間留 12px gap
// 主鈕的 left 維持鎖在 FAB 拖曳位置，面板根據 expand 方向往外延伸不會擠出視窗
.fab--expand-right .fab__panel {
  left: calc(100% + 12px);
}

.fab--expand-left .fab__panel {
  right: calc(100% + 12px);
}

.fab__section {
  & + & {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
}

.fab__section-title {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.fab__layout-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.fab__layout-btn {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #6366f1;
    color: #4338ca;
  }

  &--active {
    background: linear-gradient(135deg, #4f46e5, #ec4899);
    border-color: transparent;
    color: #ffffff;
  }
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
