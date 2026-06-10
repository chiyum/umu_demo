import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * Theme 與 URL query 雙向同步（colorKey + logoKey，v4.5 起 logoKey 加入同步）
 *
 * 為什麼新版只同步 colorKey + logoKey：
 * - layoutKey 在 demo store 是 computed from route.params.layoutkey，
 *   URL → store 已自動同步、不需要再透過 sync 機制
 * - 也不需要 sync 回 URL：layoutKey 改變代表 URL 已經改了（使用者切到 /demo/at99）
 *
 * 為什麼 v4.5 加 logoKey 同步：
 * - 截圖 script（scripts/capture-daheng-previews.mjs）需要用 URL query 控制 logo 切換，
 *   不必透過 page.evaluate 操作 store；其他 dev tools / 分享連結也能精確指定 logo
 * - 與 colorKey 對稱實作（互不干擾），維持「URL 是唯一事實來源」的設計理念
 *
 * 設計：
 * - store.colorKey 改變 → router.replace 更新 ?color=xxx（不 push 避免污染 history）
 * - ?color=xxx 改變 → 同步回 store.colorKey（例如使用者貼上含 query 的網址）
 * - store.logoKey 同上，query key 為 ?logoKey=xxx
 * - 用 flag 避免無限循環（自己改 URL 觸發 watch 又改 store 又觸發 URL）
 * - color 與 logo 各自一支 flag，避免互相阻塞
 *
 * 在 layout-theme-host.vue 內呼叫即可，demo 頁只需要一個 sync 點。
 */
export function useThemeUrlSync(): void {
  const route = useRoute();
  const router = useRouter();
  const themeStore = useDemoThemeStore();

  /** 防呆旗標：自己改完 URL 不要再被 URL watch 觸發 store change */
  let syncingColorFromStore = false;
  let syncingLogoFromStore = false;

  // store.colorKey → URL ?color=xxx
  watch(
    () => themeStore.colorKey,
    (color) => {
      if (route.query.color === color) return;
      syncingColorFromStore = true;
      router
        .replace({
          // 保留現有 query（例如 utm_source / logoKey），只覆蓋 color
          query: {
            ...route.query,
            color
          }
        })
        .finally(() => {
          // 等 router 動完才放掉 flag，避免微任務時序問題
          queueMicrotask(() => {
            syncingColorFromStore = false;
          });
        });
    },
    { immediate: true }
  );

  // URL ?color=xxx → store.colorKey
  watch(
    () => route.query.color,
    (color) => {
      if (syncingColorFromStore) return;
      // route.query value 可能是 string | string[] | null | undefined
      const colorStr = typeof color === "string" ? color : null;
      if (colorStr && colorStr !== themeStore.colorKey) {
        themeStore.setColor(colorStr);
      }
    }
  );

  // store.logoKey → URL ?logoKey=xxx（v4.5 起新增）
  watch(
    () => themeStore.logoKey,
    (logoKey) => {
      if (route.query.logoKey === logoKey) return;
      syncingLogoFromStore = true;
      router
        .replace({
          query: {
            ...route.query,
            logoKey
          }
        })
        .finally(() => {
          queueMicrotask(() => {
            syncingLogoFromStore = false;
          });
        });
    },
    { immediate: true }
  );

  // URL ?logoKey=xxx → store.logoKey（v4.5 起新增）
  watch(
    () => route.query.logoKey,
    (logoKey) => {
      if (syncingLogoFromStore) return;
      const logoStr = typeof logoKey === "string" ? logoKey : null;
      if (logoStr && logoStr !== themeStore.logoKey) {
        themeStore.setLogo(logoStr);
      }
    }
  );
}
