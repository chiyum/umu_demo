import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Hero 輪播共用 composable
 *
 * 為什麼抽出：daheng-neon / emerald / fresh 三 theme 的 desktop / mobile 共 6 個 SFC
 * 都要「N 個 slide 自動輪播 + dot 可點 + 自動播」，邏輯完全一致，
 * 抽成純 composable 避免 6 處複製 timer / 索引邏輯（符合「重複邏輯必須封裝」）。
 *
 * 為什麼放 src/utils（而非各 theme 內）：
 * - 與既有 use-device / use-draggable / use-theme-url-sync 同層級的無狀態 UI composable
 * - theme 之間不跨 @use scss，但 TS composable 可自由共用，不違反 theme 隔離原則
 *
 * 行為：
 * - activeIdx 由 0 起算，go(i) 取模循環，restart() 重置自動播計時器
 * - 自動播間隔可調（原稿 A/C 為 4500ms、B 為 5000ms）
 * - onMounted 啟動、onBeforeUnmount 清掉 timer（避免元件卸載後 race / 記憶體洩漏）
 * - 使用者點 dot → go(i) + restart()，避免剛點完馬上又被自動播跳走
 *
 * @param count slide 總數（須 >= 1，等於 dot 數，確保 slide 數與 dot 數一致）
 * @param intervalMs 自動播間隔毫秒（預設 4500，對齊原稿）
 */
export function useHeroCarousel(count: number, intervalMs = 4500) {
  const activeIdx = ref<number>(0);
  let timer: number | null = null;

  /** 跳到第 i 張（取模循環，負數也正規化） */
  function go(i: number) {
    if (count <= 0) return;
    activeIdx.value = ((i % count) + count) % count;
  }

  /** 重置自動播計時器（點 dot 後呼叫，避免立即被跳走） */
  function restart() {
    if (timer !== null) window.clearInterval(timer);
    if (count <= 1) return; // 只有 1 張不需要自動播
    timer = window.setInterval(() => go(activeIdx.value + 1), intervalMs);
  }

  /** 點 dot：跳指定張 + 重置計時器 */
  function select(i: number) {
    go(i);
    restart();
  }

  onMounted(restart);
  onBeforeUnmount(() => {
    if (timer !== null) window.clearInterval(timer);
  });

  return { activeIdx, go, restart, select };
}
