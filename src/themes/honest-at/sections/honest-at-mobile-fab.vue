<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

/**
 * honest-at mobile Fab「切換版本」拖曳球 — 1:1 對齊 honest_real src/widgets/fab.vue
 *
 * 原作 DOM：
 *   .draggable (100×50 圓角 5rem / 1px #3aa2ec 邊)
 *     <div>切換版本</div>
 *     .draggable-actions (v-if isShowActions)
 *       <div v-for v-model 三個 mode>
 *         <q-icon play_circle /><div>{{title}}</div>
 *       </div>
 *
 * 原作邏輯：
 *   - 點擊 toggle actions 列表（at / max / no6）
 *   - 拖曳球可在 parent 容器內自由移動（mousedown/touchstart 觸發 drag）
 *   - onMounted 用 nextTick 設定初始位置為 parent 右下角
 *
 * Demo 化：保留拖曳行為與 toggle 顯示，但「mode 切換」按下不真的跳路由
 *   （改為觸發 quasar notify 提示「Demo 環境」）
 */

interface ModeItem {
  value: string;
  title: string;
}

const MODE_LIST: ModeItem[] = [
  { value: "at", title: "AT" },
  { value: "max", title: "MAX" },
  { value: "no6", title: "NO6" }
];

const isShowActions = ref<boolean>(false);
const position = reactive({ x: 0, y: 0 });
let isDragging = false;
const start = { x: 0, y: 0 };
const draggableEl = ref<HTMLDivElement | null>(null);

function toggleActions(): void {
  isShowActions.value = !isShowActions.value;
}

function changeMode(_mode: ModeItem): void {
  // Demo 環境不真的切路由（避免 dev 找不到 /max/home /no6/home）
  isShowActions.value = false;
}

function startDrag(event: MouseEvent | TouchEvent): void {
  isDragging = true;
  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
  start.x = clientX - position.x;
  start.y = clientY - position.y;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", onDrag, { passive: false });
  document.addEventListener("touchend", stopDrag);
}

function onDrag(event: MouseEvent | TouchEvent): void {
  if (!isDragging) return;
  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
  position.x = clientX - start.x;
  position.y = clientY - start.y;
}

function stopDrag(): void {
  isDragging = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
}

onMounted(() => {
  // 對齊原作：初始位置為 parent 右下角（距右下 10/50 px）
  const parent = draggableEl.value?.parentElement;
  if (parent && draggableEl.value) {
    position.x = parent.offsetWidth - draggableEl.value.offsetWidth - 10;
    position.y = parent.offsetHeight - draggableEl.value.offsetHeight - 130;
  }
});

onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
});
</script>

<template>
  <div
    ref="draggableEl"
    class="honest-at-m-fab"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @click="toggleActions"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div>切換版本</div>
    <div v-if="isShowActions" class="honest-at-m-fab__actions">
      <div
        v-for="item in MODE_LIST"
        :key="item.value"
        class="honest-at-m-fab__action-item"
        @click.stop="changeMode(item)"
      >
        <span class="honest-at-m-fab__action-icon" aria-hidden="true">▶</span>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .draggable：100×50 / 圓角 5rem / 1px #3aa2ec
// gradient: rgba(3,3,3,0.6) → rgba(51,66,107,0.9)
.honest-at-m-fab {
  position: absolute;
  width: 100px;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(3, 3, 3, 0.6) 0%,
    rgba(51, 66, 107, 0.9) 100%
  );
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  border: 1px solid #3aa2ec;
  z-index: 200;
  cursor: pointer;
  user-select: none;
  touch-action: none;
  font-size: 14px;
  font-weight: 600;

  // 對齊原作 .draggable-actions：absolute right:100px / 100px 寬 / dark bg + #3aa2ec border
  &__actions {
    position: absolute;
    right: 100px;
    top: 0;
    display: flex;
    padding: 5px 0;
    width: 100px;
    gap: 5px;
    flex-direction: column;
    align-items: stretch;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid #3aa2ec;
    border-radius: 5px;
    z-index: 11;
  }

  &__action-item {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    gap: 6px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      background: rgba(58, 162, 236, 0.18);
    }
  }

  &__action-icon {
    color: #3aa2ec;
    font-size: 12px;
  }
}
</style>
