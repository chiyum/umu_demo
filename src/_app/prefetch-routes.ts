import type { Router, RouteRecordNormalized } from "vue-router";

// 動態 import 函式型別，呼叫一次就會觸發 chunk 下載
type Importer = () => Promise<unknown>;

/**
 * 主畫面掛上後，於瀏覽器空閒時間背景預載所有路由的 chunk
 * 目的：使用者點導覽切頁時不需等網路，直接從 module cache 拿
 *
 * 設計重點：
 * 1. 用 requestIdleCallback 排程，不會搶首屏資源
 * 2. 序列下載（一次一個），避免跟正常請求搶頻寬
 * 3. AWD 兩種版型（desktop / mobile）都會預載
 * 4. 任何 chunk 失敗都吞掉，使用者真的切過去時還會再試一次
 */
export function prefetchAllRoutes(router: Router) {
  const queue: Importer[] = [];

  for (const route of router.getRoutes() as RouteRecordNormalized[]) {
    collectImporters(route.components, queue);
    // 巢狀子路由（目前沒用到，但保險起見）
    for (const child of route.children || []) {
      collectImporters(
        (child as unknown as RouteRecordNormalized).components,
        queue
      );
    }
  }

  if (queue.length === 0) return;

  // requestIdleCallback Safari 沒有，setTimeout fallback
  const ric: (cb: () => void) => void =
    typeof window !== "undefined" &&
    typeof (window as unknown as { requestIdleCallback?: unknown })
      .requestIdleCallback === "function"
      ? (cb) =>
          (
            window as unknown as {
              requestIdleCallback: (cb: () => void) => void;
            }
          ).requestIdleCallback(cb)
      : (cb) => setTimeout(cb, 200);

  async function runNext() {
    const fn = queue.shift();
    if (!fn) return;
    try {
      await fn(); // 觸發 dynamic import，瀏覽器把 chunk 放進 module cache
    } catch {
      // 預載失敗忽略；使用者真的導航時 vue-router 會再次呼叫 importer
    }
    ric(runNext);
  }

  ric(runNext);
}

// 從 route.components（vue-router 內部結構）抽出所有 dynamic import 函式
function collectImporters(
  components: Record<string, unknown> | undefined,
  out: Importer[]
) {
  if (!components) return;
  for (const value of Object.values(components)) {
    if (typeof value === "function") {
      out.push(value as Importer);
    } else if (value && typeof value === "object") {
      // pages.ts 對 AWD 路由用 { desktop, mobile } 結構塞進 component
      for (const inner of Object.values(value)) {
        if (typeof inner === "function") out.push(inner as Importer);
      }
    }
  }
}
