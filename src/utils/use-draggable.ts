import { ref, watch, onMounted, onBeforeUnmount, type Ref } from "vue";
import type { FabPosition } from "@/themes/_types";

/** 邊緣吸附閾值（px）；距邊小於此值時會自動吸到邊 */
const EDGE_SNAP_THRESHOLD = 20;

/** 拖曳時為避免誤觸（例如想點擊），位移超過此距離才視為「拖曳中」 */
const DRAG_THRESHOLD = 4;

export interface UseDraggableOptions {
  /** 初始位置（百分比） */
  initialPosition: Ref<FabPosition>;
  /** 拖曳結束的 callback：把最終位置寫回 store */
  onDragEnd: (pos: FabPosition) => void;
  /** 元件實際寬高（用來算邊界），預設 56 */
  elementSize?: number;
}

/**
 * 通用拖曳 composable
 *
 * 設計重點：
 * 1. 用 PointerEvent 統一處理滑鼠 + 觸控，省一份事件
 * 2. 位置存「百分比 ratio」而非絕對 px，視窗縮放後位置不會跑掉
 * 3. 拖曳中即時更新本地 ref，拖完才呼叫 onDragEnd 寫回 store（避免高頻 watch）
 * 4. 邊緣吸附：拖完判斷距邊小於閾值就吸到邊
 * 5. 點擊判斷：位移 < DRAG_THRESHOLD 視為單純點擊，不阻擋 click 事件
 */
export function useDraggable(options: UseDraggableOptions) {
  const { initialPosition, onDragEnd, elementSize = 56 } = options;

  /** 元件當前位置（拖曳中即時更新；初始從 store 拿） */
  const position = ref<FabPosition>({ ...initialPosition.value });

  /** 是否正在拖曳中（>= DRAG_THRESHOLD 才為 true） */
  const isDragging = ref(false);

  // 外部 ref 變動時（例如使用者按重設位置按鈕）同步進來
  // 拖曳中不 sync 避免畫面跳動
  watch(initialPosition, (next) => {
    if (isDragging.value) return;
    position.value = { ...next };
  });

  /** pointer 起始位置與元件起始位置（拿來算位移差） */
  let startX = 0;
  let startY = 0;
  let startRatioX = 0;
  let startRatioY = 0;
  let pointerId: number | null = null;

  /** 算 viewport 可用範圍（扣掉元件尺寸） */
  function getViewportBounds() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      maxX: Math.max(0, w - elementSize),
      maxY: Math.max(0, h - elementSize),
      width: w,
      height: h
    };
  }

  /** 將絕對 px 轉成 ratio（不能除以 0，缺尺寸時用安全值） */
  function pxToRatio(x: number, y: number): { xRatio: number; yRatio: number } {
    const { maxX, maxY } = getViewportBounds();
    return {
      xRatio: maxX > 0 ? Math.min(1, Math.max(0, x / maxX)) : 0,
      yRatio: maxY > 0 ? Math.min(1, Math.max(0, y / maxY)) : 0
    };
  }

  /** ratio 轉 px（給 CSS 用） */
  function ratioToPx(ratio: FabPosition): { x: number; y: number } {
    const { maxX, maxY } = getViewportBounds();
    return {
      x: ratio.xRatio * maxX,
      y: ratio.yRatio * maxY
    };
  }

  /** 拖曳結束時計算是否吸邊 */
  function computeEdgeSnap(x: number, y: number): FabPosition["edge"] {
    const { width, height } = getViewportBounds();
    const distLeft = x;
    const distRight = width - elementSize - x;
    const distTop = y;
    const distBottom = height - elementSize - y;
    const minDist = Math.min(distLeft, distRight, distTop, distBottom);
    if (minDist > EDGE_SNAP_THRESHOLD) return null;
    if (minDist === distLeft) return "left";
    if (minDist === distRight) return "right";
    if (minDist === distTop) return "top";
    return "bottom";
  }

  function onPointerDown(e: PointerEvent) {
    // 只允許主鍵（左鍵）或觸控
    if (e.button !== undefined && e.button !== 0) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    const { x, y } = ratioToPx(position.value);
    startRatioX = x;
    startRatioY = y;
    // 把後續 pointer 事件捕獲到 target 上，這樣 pointermove 不會因為移出元素而漏掉
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    // 拖曳期間阻止 q-btn 等子元素觸發 ripple 抖動
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
  }

  function onPointerMove(e: PointerEvent) {
    if (pointerId === null || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    // 位移過小視為點擊，不啟動拖曳模式
    if (!isDragging.value && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    isDragging.value = true;
    // 拖曳中暫時不吸邊，使用者完全自由移動
    const nextX = startRatioX + dx;
    const nextY = startRatioY + dy;
    const { maxX, maxY } = getViewportBounds();
    const clampedX = Math.min(maxX, Math.max(0, nextX));
    const clampedY = Math.min(maxY, Math.max(0, nextY));
    const ratio = pxToRatio(clampedX, clampedY);
    position.value = {
      xRatio: ratio.xRatio,
      yRatio: ratio.yRatio,
      edge: null
    };
    // 拖曳中阻止 textselect / 頁面滾動
    e.preventDefault();
  }

  function onPointerUp(e: PointerEvent) {
    if (pointerId === null || e.pointerId !== pointerId) return;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("pointercancel", onPointerUp);
    pointerId = null;
    if (!isDragging.value) return; // 純點擊，不寫回
    // 算最終吸邊
    const { x, y } = ratioToPx(position.value);
    const edge = computeEdgeSnap(x, y);
    const { maxX, maxY, width, height } = getViewportBounds();
    let finalX = x;
    let finalY = y;
    // 吸邊：把對應軸座標貼齊邊（保留 6px 視覺間距）
    const SAFE_INSET = 6;
    if (edge === "left") finalX = SAFE_INSET;
    else if (edge === "right")
      finalX = Math.max(0, width - elementSize - SAFE_INSET);
    else if (edge === "top") finalY = SAFE_INSET;
    else if (edge === "bottom")
      finalY = Math.max(0, height - elementSize - SAFE_INSET);
    finalX = Math.min(maxX, Math.max(0, finalX));
    finalY = Math.min(maxY, Math.max(0, finalY));
    const ratio = pxToRatio(finalX, finalY);
    const finalPos: FabPosition = {
      xRatio: ratio.xRatio,
      yRatio: ratio.yRatio,
      edge
    };
    position.value = finalPos;
    onDragEnd(finalPos);
    // 用 setTimeout 把 isDragging 清掉，避免同步 click 在拖曳剛結束時被誤觸
    setTimeout(() => {
      isDragging.value = false;
    }, 0);
  }

  /** 視窗大小改變時重新算 px（ratio 不動，CSS 端會自動跟） */
  function onResize() {
    // 為了讓子元件 watch position.value 有觸發，這裡直接 reassign（雖然值一樣）
    position.value = { ...position.value };
  }

  onMounted(() => {
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("pointercancel", onPointerUp);
  });

  /** 給元件套樣式用：把 ratio 算成 left/top 的 px */
  function getStyle(): Record<string, string> {
    const { x, y } = ratioToPx(position.value);
    return {
      left: `${x}px`,
      top: `${y}px`
    };
  }

  return {
    position,
    isDragging,
    onPointerDown,
    getStyle
  };
}
