/**
 * @deprecated
 *
 * 此 store 已被 src/store/demo-theme.store.ts 取代（方案 2 雙 store 解耦）
 *
 * 為什麼保留檔案而不直接刪：
 * - 避免單一 PR diff 過大，方便 review focus 在新架構
 * - 提供回滾退路：若 demo-theme.store 上線後發生未預期問題，
 *   可快速 revert layout-theme-host 的 import 切回此 store 救命
 *
 * 預計清理時機：demo-theme.store 上線一週、確認 dev / prod 都穩定後，
 * 由獨立 chore PR 移除此檔案 + 舊 theme-switcher-fab(.mobile).vue
 *
 * 已知唯一仍依賴此檔的：無（已全面切換到 demo-theme.store）
 *
 * 不要在新程式碼中 import 這個 store；改用 `useDemoThemeStore`
 */

import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import {
  themes,
  listThemes,
  getTheme,
  getColorVariant,
  DEFAULT_LAYOUT_KEY
} from "@/themes/_registry";
import type { FabPosition } from "@/themes/_types";

/** localStorage 鍵名（統一在這邊管理，避免散在各處難找） */
const LS_LAYOUT_KEY = "casino-demo:layoutKey";
const LS_COLOR_KEY = "casino-demo:colorKey";
// v2：FAB 預設位置從右下改左下（避開原站客服浮標衝突）
// 使用版本後綴讓舊使用者的右下角位置失效，直接拿到新預設左下角
const LS_FAB_POSITION = "casino-demo:fabPosition:v2";

/** FAB 預設位置：左下角（避開原站常駐的右下角客服浮標 / 回到頂部按鈕） */
const DEFAULT_FAB_POSITION: FabPosition = {
  xRatio: 0.02,
  yRatio: 0.88,
  edge: "left"
};

/**
 * 讀 localStorage 的 helper
 * 為什麼包：避免在 SSR / 測試環境炸 ReferenceError，並統一 try/catch
 */
function safeGetLS(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLS(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 隱私模式 / quota exceeded 都吞掉，UI 不受影響
  }
}

/** 初始解析 FAB 位置（localStorage 拿，缺則 default） */
function loadFabPosition(): FabPosition {
  const raw = safeGetLS(LS_FAB_POSITION);
  if (!raw) return { ...DEFAULT_FAB_POSITION };
  try {
    const parsed = JSON.parse(raw) as Partial<FabPosition>;
    // 防呆：拿到壞掉的 JSON 也要能撐住
    const x =
      typeof parsed.xRatio === "number"
        ? parsed.xRatio
        : DEFAULT_FAB_POSITION.xRatio;
    const y =
      typeof parsed.yRatio === "number"
        ? parsed.yRatio
        : DEFAULT_FAB_POSITION.yRatio;
    const edge: FabPosition["edge"] =
      parsed.edge === "left" ||
      parsed.edge === "right" ||
      parsed.edge === "top" ||
      parsed.edge === "bottom"
        ? parsed.edge
        : null;
    return {
      xRatio: Math.min(1, Math.max(0, x)),
      yRatio: Math.min(1, Math.max(0, y)),
      edge
    };
  } catch {
    return { ...DEFAULT_FAB_POSITION };
  }
}

/**
 * 解析初始 layoutKey 與 colorKey 的優先順序：
 * 1. URL query（?theme=xxx&color=yyy）若有效 → 用
 * 2. localStorage 若有 → 用
 * 3. 預設值
 *
 * URL 優先是為了「分享連結時收件方一定看到對應配色」，
 * 不會被收件方自己 localStorage 蓋掉。
 */
function resolveInitialKeys() {
  let layoutKey = DEFAULT_LAYOUT_KEY;
  let colorKey = themes[DEFAULT_LAYOUT_KEY].defaultColor;

  // 從 URL 拿
  try {
    const search = new URLSearchParams(window.location.search);
    const qTheme = search.get("theme");
    const qColor = search.get("color");
    if (qTheme && themes[qTheme]) {
      layoutKey = qTheme;
      // theme 切換時 color 預設也跟著切（除非 URL 明確指定）
      colorKey = themes[qTheme].defaultColor;
      if (qColor && themes[qTheme].colors.some((c) => c.key === qColor)) {
        colorKey = qColor;
      }
      return { layoutKey, colorKey };
    }
  } catch {
    // window 不存在或 URLSearchParams 不支援都跳到下一步
  }

  // fallback：localStorage
  const lsLayout = safeGetLS(LS_LAYOUT_KEY);
  if (lsLayout && themes[lsLayout]) {
    layoutKey = lsLayout;
    colorKey = themes[lsLayout].defaultColor;
    const lsColor = safeGetLS(LS_COLOR_KEY);
    if (lsColor && themes[lsLayout].colors.some((c) => c.key === lsColor)) {
      colorKey = lsColor;
    }
  }

  return { layoutKey, colorKey };
}

export const useThemeStore = defineStore("theme", () => {
  const initial = resolveInitialKeys();

  const layoutKey = ref<string>(initial.layoutKey);
  const colorKey = ref<string>(initial.colorKey);
  const fabPosition = ref<FabPosition>(loadFabPosition());

  /** 當前 theme metadata（給 UI 列舉 / 顯示 label 用） */
  const currentTheme = computed(() => getTheme(layoutKey.value));
  /** 當前配色 metadata */
  const currentColor = computed(() =>
    getColorVariant(currentTheme.value, colorKey.value)
  );
  /** 給 UI 列舉所有版面 */
  const allThemes = computed(() => listThemes());

  /**
   * 切換版面
   *
   * 切版面時 color 重置為該版面的預設配色，因為跨版面的 colorKey 通常不共用
   * （noya 的 rose-gold 在 at99 沒定義）。
   */
  function setLayout(key: string): void {
    if (!themes[key]) return;
    if (layoutKey.value === key) return;
    layoutKey.value = key;
    colorKey.value = themes[key].defaultColor;
  }

  /**
   * Hydrate layoutKey from route param（demo 頁專用）
   *
   * 為什麼跟 setLayout 分開：
   * - demo 頁的 layoutKey 由 URL 鎖定，是「當下要顯示什麼」，不是「使用者偏好」
   * - 雖然目前 setLayout 也會寫 LS（與 hydrate 行為差異尚小），但分兩個函式讓
   *   呼叫端意圖清楚：「我是 URL-driven」vs「我是使用者主動切」
   * - 階段 5 store 拆分後，此函式會搬到 demo-theme.store，
   *   layoutKey 也會改為 computed from route param 完全不寫 LS
   *
   * 為什麼重置 colorKey：跨 theme 的 colorKey 不共用（noya 的 rose-gold ≠ at99 的 neon-blue）
   * URL 上若帶 ?color=xxx，useThemeUrlSync 會在之後覆寫成 URL 指定值
   */
  function hydrateLayoutFromRoute(key: string): void {
    if (!themes[key]) return;
    if (layoutKey.value === key) return;
    layoutKey.value = key;
    colorKey.value = themes[key].defaultColor;
  }

  /** 切換配色（限定在當前 theme 的配色清單中） */
  function setColor(key: string): void {
    const theme = currentTheme.value;
    if (!theme.colors.some((c) => c.key === key)) return;
    colorKey.value = key;
  }

  /** 更新 FAB 位置（拖曳結束時呼叫） */
  function setFabPosition(pos: FabPosition): void {
    fabPosition.value = {
      xRatio: Math.min(1, Math.max(0, pos.xRatio)),
      yRatio: Math.min(1, Math.max(0, pos.yRatio)),
      edge: pos.edge
    };
  }

  /** 重置 FAB 位置到預設左下角（給 UI「重設」按鈕用，避開原站右下角浮標） */
  function resetFabPosition(): void {
    fabPosition.value = { ...DEFAULT_FAB_POSITION };
  }

  // ---- persist 副作用 ----
  // 為什麼不用 pinia-plugin-persistedstate：避免引額外依賴；
  // 三個 key 自己 watch 寫就好，邏輯也乾淨。
  watch(layoutKey, (v) => safeSetLS(LS_LAYOUT_KEY, v));
  watch(colorKey, (v) => safeSetLS(LS_COLOR_KEY, v));
  watch(fabPosition, (v) => safeSetLS(LS_FAB_POSITION, JSON.stringify(v)), {
    deep: true
  });

  return {
    // state
    layoutKey,
    colorKey,
    fabPosition,
    // getters
    currentTheme,
    currentColor,
    allThemes,
    // actions
    setLayout,
    hydrateLayoutFromRoute,
    setColor,
    setFabPosition,
    resetFabPosition
  };
});
