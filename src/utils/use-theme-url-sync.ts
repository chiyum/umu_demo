import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * Theme 與 URL query 雙向同步（只負責 colorKey）
 *
 * 為什麼新版只同步 colorKey：
 * - layoutKey 在 demo store 是 computed from route.params.layoutkey，
 *   URL → store 已自動同步、不需要再透過 sync 機制
 * - 也不需要 sync 回 URL：layoutKey 改變代表 URL 已經改了（使用者切到 /demo/at99）
 *
 * 設計：
 * - store.colorKey 改變 → router.replace 更新 ?color=xxx（不 push 避免污染 history）
 * - ?color=xxx 改變 → 同步回 store.colorKey（例如使用者貼上含 query 的網址）
 * - 用 flag 避免無限循環（自己改 URL 觸發 watch 又改 store 又觸發 URL）
 *
 * 在 layout-theme-host.vue 內呼叫即可，demo 頁只需要一個 sync 點。
 */
export function useThemeUrlSync(): void {
  const route = useRoute();
  const router = useRouter();
  const themeStore = useDemoThemeStore();

  /** 防呆旗標：自己改完 URL 不要再被 URL watch 觸發 store change */
  let syncingFromStore = false;

  // store.colorKey → URL ?color=xxx
  watch(
    () => themeStore.colorKey,
    (color) => {
      if (route.query.color === color) return;
      syncingFromStore = true;
      router
        .replace({
          // 保留現有 query（例如 utm_source），只覆蓋 color
          query: {
            ...route.query,
            color
          }
        })
        .finally(() => {
          // 等 router 動完才放掉 flag，避免微任務時序問題
          queueMicrotask(() => {
            syncingFromStore = false;
          });
        });
    },
    { immediate: true }
  );

  // URL ?color=xxx → store.colorKey
  watch(
    () => route.query.color,
    (color) => {
      if (syncingFromStore) return;
      // route.query value 可能是 string | string[] | null | undefined
      const colorStr = typeof color === "string" ? color : null;
      if (colorStr && colorStr !== themeStore.colorKey) {
        themeStore.setColor(colorStr);
      }
    }
  );
}
