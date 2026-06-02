import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import {
  themes,
  listThemes,
  getTheme,
  getColorVariant,
  DEFAULT_LAYOUT_KEY
} from "@/themes/_registry";
import type { FabPosition } from "@/themes/_types";

/**
 * Demo Theme Store — 只服務 /demo/:layoutkey 路由
 *
 * 與舊 theme.store 的關鍵差異：
 * 1. layoutKey 不是 reactive state，而是 computed from useRoute().params.layoutkey
 *    → 「URL 是 source of truth」徹底貫徹，消除 state vs URL 雙來源不一致風險
 * 2. layoutKey 完全不寫 LS（demo 頁的版型是 URL 決定的，不該污染下次使用者偏好）
 * 3. colorKey 仍 persist 到 LS（使用者切的配色屬於「偏好」），但用新 LS key（v3 後綴）
 * 4. fabPosition 仍 persist
 *
 * 為什麼 colorKey 仍 persist：
 * - 使用者在 noya 切到 sunset，下次再開 /demo/noya 應該看到 sunset（同 theme 的配色記憶）
 * - 但若切到 /demo/at99（不同 theme），sunset 不在 at99 的配色清單，會 fallback 到 at99 預設色
 *
 * 為什麼 LS key 加 :v3 後綴：
 * - 與舊 theme.store 的 LS key 完全隔離，舊使用者不會帶著舊偏好過來（避免污染）
 * - 對齊 CLAUDE.md「新增功能若要 invalidate 舊 LS 用 :v3 後綴」的指示
 */

/** localStorage 鍵名（與舊 theme.store 隔離） */
const LS_COLOR_KEY = "casino-demo:colorKey:v3";
const LS_FAB_POSITION = "casino-demo:fabPosition:v3";

/** FAB 預設位置：左下角（避開原站常駐的右下角客服浮標 / 回到頂部按鈕） */
const DEFAULT_FAB_POSITION: FabPosition = {
  xRatio: 0.02,
  yRatio: 0.88,
  edge: "left"
};

/** 讀 localStorage 的 helper，吞 SSR / 隱私模式錯誤 */
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

/** 初始解析 FAB 位置 */
function loadFabPosition(): FabPosition {
  const raw = safeGetLS(LS_FAB_POSITION);
  if (!raw) return { ...DEFAULT_FAB_POSITION };
  try {
    const parsed = JSON.parse(raw) as Partial<FabPosition>;
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
 * 初始解析 colorKey
 *
 * 優先順序：
 * 1. URL query ?color=xxx（分享連結時收件方一定看到指定配色）
 * 2. localStorage（使用者上次切過的同 theme colorKey）
 * 3. 該 theme 的 defaultColor
 *
 * 注意：這裡需要當下的 layoutKey 來決定 colorKey 是否在該 theme 的配色清單內。
 * layoutKey 來源是 window.location.pathname 解析（在 store init 階段 route 還沒 ready）
 */
function resolveInitialColorKey(): { layoutKey: string; colorKey: string } {
  // 嘗試從 URL pathname 解析 layoutkey（/demo/noya → noya）
  // store 在 createPinia 階段才會被建立、useRoute 還沒 reactive 可用，
  // 但 store 是 setup-style，被首次 use 時 component 已 mount，route 才可用
  // 為了不依賴呼叫順序，這裡 fallback 用 pathname 暴力 parse；後續會被 setup 內的 watch 修正
  let layoutKey = DEFAULT_LAYOUT_KEY;
  try {
    const path = window.location.pathname;
    // 比對 /demo/<key>（或子路徑 /umu_demo/demo/<key>）
    const match = path.match(/\/demo\/([^/?#]+)/);
    if (match && themes[match[1]]) {
      layoutKey = match[1];
    }
  } catch {
    // window 不存在或解析失敗：用 DEFAULT_LAYOUT_KEY
  }

  let colorKey = themes[layoutKey].defaultColor;

  // URL ?color=xxx 優先
  try {
    const search = new URLSearchParams(window.location.search);
    const qColor = search.get("color");
    if (qColor && themes[layoutKey].colors.some((c) => c.key === qColor)) {
      colorKey = qColor;
      return { layoutKey, colorKey };
    }
  } catch {
    // 解析失敗：跳到下一步
  }

  // LS fallback
  const lsColor = safeGetLS(LS_COLOR_KEY);
  if (lsColor && themes[layoutKey].colors.some((c) => c.key === lsColor)) {
    colorKey = lsColor;
  }

  return { layoutKey, colorKey };
}

/**
 * 此 store 內部使用 useRoute()，必須在 Vue component / composable / setup context 中被首次呼叫
 * （即被 router-view 渲染的 component 內），否則 useRoute 會回 undefined
 *
 * 安全呼叫點：demo page、layout-theme-host、theme-color-fab(.mobile)、useThemeUrlSync
 * 不要在 main.ts / plugin install 階段呼叫此 store
 */
export const useDemoThemeStore = defineStore("demo-theme", () => {
  const route = useRoute();

  const initial = resolveInitialColorKey();

  /**
   * layoutKey：完全 derived from route.params.layoutkey
   *
   * - URL = single source of truth
   * - route param 不存在或無效 → fallback 到初始解析值
   * - 不存在 setter（也沒有 setLayout API），呼叫端只能透過 router 改 URL 影響它
   */
  const layoutKey = computed<string>(() => {
    const raw = route.params.layoutkey;
    const key = typeof raw === "string" ? raw : null;
    if (key && themes[key]) return key;
    return initial.layoutKey;
  });

  const colorKey = ref<string>(initial.colorKey);
  const fabPosition = ref<FabPosition>(loadFabPosition());

  /** 當前 theme metadata */
  const currentTheme = computed(() => getTheme(layoutKey.value));
  /** 當前配色 metadata */
  const currentColor = computed(() =>
    getColorVariant(currentTheme.value, colorKey.value)
  );
  /** 給 UI 列舉所有版面（FAB 用不到，但留著給未來擴充） */
  const allThemes = computed(() => listThemes());

  /**
   * 切換配色（限定在當前 theme 的配色清單中）
   *
   * 為什麼 demo store 仍提供 setColor：
   * - 配色是「使用者主動操作」（FAB 點配色 swatch）
   * - 與 layoutKey「URL-driven」截然不同
   */
  function setColor(key: string): void {
    const theme = currentTheme.value;
    if (!theme.colors.some((c) => c.key === key)) return;
    colorKey.value = key;
  }

  /**
   * Hydrate colorKey when layoutKey changes
   *
   * 當 URL 從 /demo/noya 切到 /demo/at99（同 tab 內切，雖罕見但要支援），
   * 需重置 colorKey 為新 theme 的預設色，因為 noya 的 colorKey 在 at99 沒定義
   *
   * 為什麼用 watch 而不在 layoutKey computed getter 內 side effect：
   * - computed 內 side effect 是 Vue 反 pattern（重複求值不可預測）
   * - watch 一次 settled 賦值，乾淨
   */
  watch(layoutKey, (newKey, oldKey) => {
    if (newKey === oldKey) return;
    // 切到新 theme 時，若舊 colorKey 不在新 theme 的配色清單中，重置成新 theme 預設
    const newTheme = themes[newKey];
    if (!newTheme) return;
    if (!newTheme.colors.some((c) => c.key === colorKey.value)) {
      colorKey.value = newTheme.defaultColor;
    }
  });

  /** 更新 FAB 位置（拖曳結束時呼叫） */
  function setFabPosition(pos: FabPosition): void {
    fabPosition.value = {
      xRatio: Math.min(1, Math.max(0, pos.xRatio)),
      yRatio: Math.min(1, Math.max(0, pos.yRatio)),
      edge: pos.edge
    };
  }

  /** 重置 FAB 位置到預設左下角 */
  function resetFabPosition(): void {
    fabPosition.value = { ...DEFAULT_FAB_POSITION };
  }

  // ---- persist 副作用 ----
  // colorKey 仍 persist（使用者偏好）；layoutKey 不 persist（URL 才是 source of truth）
  watch(colorKey, (v) => safeSetLS(LS_COLOR_KEY, v));
  watch(fabPosition, (v) => safeSetLS(LS_FAB_POSITION, JSON.stringify(v)), {
    deep: true
  });

  return {
    // state（layoutKey 是 computed，其餘 ref / computed）
    layoutKey,
    colorKey,
    fabPosition,
    // getters
    currentTheme,
    currentColor,
    allThemes,
    // actions
    setColor,
    setFabPosition,
    resetFabPosition
  };
});
