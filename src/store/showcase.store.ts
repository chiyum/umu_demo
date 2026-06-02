import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * Showcase store — 服務「/」showcase 主頁
 *
 * 為什麼獨立成 store 而不重用 theme.store：
 * - 領域不同：theme.store（demo-theme）服務 demo 頁的 layoutKey / colorKey / fabPosition；
 *   showcase 頁完全不關心 layoutKey、不需要 persist 配色
 * - 解耦後 showcase 頁不會誤觸 LS 寫入、不必背 demo store 的 mode 旗標
 * - 元件 inject 時意圖明確：showcase 頁只 `useShowcaseStore`、demo 頁只 `useDemoThemeStore`
 *
 * 目前 state：
 * - 預覽 dialog 開關 + 鎖定當前預覽的 layoutKey
 * - dialog 內當前顯示的尺寸 tab（desktop / mobile）
 * 之後若加篩選 / 排序 / hover preview 也都歸到這份 store。
 */

export type PreviewDevice = "desktop" | "mobile";

export const useShowcaseStore = defineStore("showcase", () => {
  /** 是否開啟預覽 dialog */
  const previewDialogOpen = ref(false);
  /** 當前預覽的 theme key（null = 未開或剛關） */
  const activePreviewKey = ref<string | null>(null);
  /** dialog 內顯示的尺寸（desktop / mobile） */
  const previewDevice = ref<PreviewDevice>("desktop");

  /** 給 UI 判斷便利用 */
  const isPreviewing = computed(() => previewDialogOpen.value);

  /**
   * 開啟預覽
   *
   * 為什麼參數帶 key 而不靠呼叫端先 setActive：避免「忘了 set 就 open」的時序坑
   */
  function openPreview(key: string, device: PreviewDevice = "desktop"): void {
    activePreviewKey.value = key;
    previewDevice.value = device;
    previewDialogOpen.value = true;
  }

  /** 關閉預覽，順手清掉 activePreviewKey 讓 dialog 內的 watch 不再亂跑 */
  function closePreview(): void {
    previewDialogOpen.value = false;
    activePreviewKey.value = null;
  }

  /** 切換 dialog 內的尺寸 tab */
  function setPreviewDevice(device: PreviewDevice): void {
    previewDevice.value = device;
  }

  return {
    // state
    previewDialogOpen,
    activePreviewKey,
    previewDevice,
    // getters
    isPreviewing,
    // actions
    openPreview,
    closePreview,
    setPreviewDevice
  };
});
