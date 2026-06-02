import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeStore } from "@/store/theme.store";

/**
 * Theme 與 URL query 雙向同步
 *
 * 設計：
 * - store 改變 → router.replace 更新 query（不 push 避免污染 history）
 * - URL 改變 → 同步回 store（例如使用者貼上含 query 的網址）
 * - 用 flag 避免無限循環（自己改 URL 觸發 watch 又改 store 又觸發 URL）
 *
 * 在 layout-default.vue 內呼叫即可，整站只需要一個 sync 點。
 */
export function useThemeUrlSync(): void {
  const route = useRoute();
  const router = useRouter();
  const themeStore = useThemeStore();

  /** 防呆旗標：自己改完 URL 不要再被 URL watch 觸發 store change */
  let syncingFromStore = false;

  // store → URL
  watch(
    () => [themeStore.layoutKey, themeStore.colorKey],
    ([theme, color]) => {
      if (route.query.theme === theme && route.query.color === color) return;
      syncingFromStore = true;
      router
        .replace({
          // 保留現有 query（例如 utm_source），只覆蓋 theme / color
          query: {
            ...route.query,
            theme,
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

  // URL → store
  watch(
    () => [route.query.theme, route.query.color],
    ([theme, color]) => {
      if (syncingFromStore) return;
      // route.query value 可能是 string | string[] | null | undefined
      const themeStr = typeof theme === "string" ? theme : null;
      const colorStr = typeof color === "string" ? color : null;
      if (themeStr && themeStr !== themeStore.layoutKey) {
        themeStore.setLayout(themeStr);
      }
      if (colorStr && colorStr !== themeStore.colorKey) {
        themeStore.setColor(colorStr);
      }
    }
  );
}
