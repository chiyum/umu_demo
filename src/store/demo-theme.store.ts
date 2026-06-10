import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import {
  themes,
  listThemes,
  getTheme,
  getColorVariant,
  getLogo,
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
// logoKey 需依 layoutKey 分開記憶（不同 theme 的 logo 清單互不通用）
// 故 LS 用 prefix + layoutKey 組合 key：casino-demo:logoKey:v3:<layoutKey>
const LS_LOGO_KEY_PREFIX = "casino-demo:logoKey:v3:";

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
 * 初始解析 URL query（colorKey + logoKey 一次處理）
 *
 * 為什麼 v4.6 起改寫成 resolveInitialThemeQuery：
 * - 既有 resolveInitialColorKey() 只讀 ?color=，沒讀 ?logoKey=
 * - 而 useThemeUrlSync 的「store → URL」watcher 是 immediate=true，
 *   會在 mount 第一拍立刻把 store 的 logoKey 寫回 URL 覆蓋掉原始 ?logoKey=
 * - 「URL → store」watcher 沒 immediate，初始 URL 的 ?logoKey= 從未被讀進 store
 * - 結果：截圖 script 用 ?logoKey=long-heng 開新 page，store 永遠 fallback 到
 *   defaultLogo="dahsing"，三個 logoKey 截出同一張圖（reviewer 抓到 72/108 重複）
 * - 修法：store init 時就把 URL 的 ?color= 與 ?logoKey= 一起吃，store 對齊 URL 後
 *   store→URL watcher 的 immediate 跑也只是寫回同值，不會反向覆蓋
 *
 * colorKey 優先順序（與 v4.5 之前一致）：
 * 1. URL query ?color=xxx → 合法即用（必須在 theme.colors 內）
 * 2. localStorage → 合法即用
 * 3. theme.defaultColor
 *
 * logoKey 優先順序（v4.6 新增 URL 第一優先級）：
 * 1. URL query ?logoKey=xxx → 合法即用（必須在 theme.logos 內），不合法回 null
 *    讓 store init 走第二優先級的 resolveInitialLogoKey()
 * 2. localStorage（依 theme 分流的 LS key）
 * 3. theme.defaultLogo
 * 4. theme.logos[0].key（型別保證 non-empty）
 *
 * 為什麼 logoKey 回傳 `string | null` 而非直接 fallback 到 defaultLogo：
 * - null 明確標示「URL 沒給，需走後續 LS / defaultLogo fallback 鏈」
 * - store 內 resolveInitialLogoKey 已含完整 LS + defaultLogo 鏈，重複實作會 drift
 * - 直接讓 store 看到 null 就 fallback 一目了然
 *
 * 為什麼 ?logoKey= 合法性檢查很重要：
 * - 防 ?logoKey=invalid 把 store 變成壞值，後續 currentLogo computed 反覆 fallback
 * - 不合法直接視為「URL 沒給」，走第二優先級鏈
 *
 * 注意：layoutKey 來源是 window.location.pathname 解析（在 store init 階段 route 還沒 ready）
 */
function resolveInitialThemeQuery(): {
  layoutKey: string;
  colorKey: string;
  logoKey: string | null;
} {
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

  const theme = themes[layoutKey];
  let colorKey = theme.defaultColor;
  let logoKey: string | null = null;

  // URL ?color=xxx 與 ?logoKey=xxx 一起讀（同一個 URLSearchParams 實例）
  try {
    const search = new URLSearchParams(window.location.search);

    // color 第一優先級
    const qColor = search.get("color");
    if (qColor && theme.colors.some((c) => c.key === qColor)) {
      colorKey = qColor;
    } else {
      // color URL 沒給 → LS fallback
      const lsColor = safeGetLS(LS_COLOR_KEY);
      if (lsColor && theme.colors.some((c) => c.key === lsColor)) {
        colorKey = lsColor;
      }
    }

    // logoKey 第一優先級（合法性檢查：必須在當前 theme 的 logos 內）
    const qLogo = search.get("logoKey");
    if (qLogo && theme.logos.some((l) => l.key === qLogo)) {
      logoKey = qLogo;
    }
    // qLogo 不合法 / 沒帶 → 維持 null，store 走 resolveInitialLogoKey() 第二優先級
  } catch {
    // URLSearchParams 解析失敗：colorKey 維持 defaultColor，logoKey 維持 null
    // 同樣 fallback 走 LS（color）/ defaultLogo（logo）
    const lsColor = safeGetLS(LS_COLOR_KEY);
    if (lsColor && theme.colors.some((c) => c.key === lsColor)) {
      colorKey = lsColor;
    }
  }

  return { layoutKey, colorKey, logoKey };
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

  // v4.6 起改用 resolveInitialThemeQuery（同時讀 ?color= 與 ?logoKey=），
  // 解決截圖 script 用 ?logoKey= 開新 page 時被 store→URL watcher immediate 覆蓋的 bug
  const initial = resolveInitialThemeQuery();

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

  /**
   * 解析初始 logoKey（依當前 layoutKey 從對應 LS key 撈，否則用 theme 預設）
   *
   * 為什麼用 function 而非 computed：
   * - 只在初始化用一次，之後 logoKey 改變透過 setLogo / watch layoutKey 處理
   * - computed 重複計算會吃 reactive 訊號，這裡是純初始解析不需要
   *
   * 防呆鏈：
   * 1. theme 不存在 → fallback 到 DEFAULT_LAYOUT_KEY 的 theme（保證有）
   * 2. LS 命中且合法 → 用 LS
   * 3. theme.defaultLogo 命中合法 logos → 用 defaultLogo
   * 4. 兩者都失敗 → 退到 theme.logos[0].key（型別已保證 logos non-empty，必存在）
   *
   * 為什麼最後加 logos[0] fallback：型別已強制 non-empty tuple，但跑時若 registry 設定錯
   * （defaultLogo 字串 typo 對不到任何 logo key）resolveInitialLogoKey 仍能回有效 key，
   * 避免 logoKey ref 被塞進空字串而後續 getLogo 反覆 fallback。
   */
  function resolveInitialLogoKey(layoutKeyVal: string): string {
    const theme = themes[layoutKeyVal] ?? themes[DEFAULT_LAYOUT_KEY];
    const ls = safeGetLS(LS_LOGO_KEY_PREFIX + layoutKeyVal);
    if (ls && theme.logos.some((l) => l.key === ls)) return ls;
    if (theme.logos.some((l) => l.key === theme.defaultLogo)) {
      return theme.defaultLogo;
    }
    return theme.logos[0].key;
  }

  // logoKey 初始值：URL 第一優先級，URL 沒給才走 LS / defaultLogo（resolveInitialLogoKey）
  // 為什麼這層 fallback 在 store 內而非塞進 resolveInitialThemeQuery：
  // resolveInitialLogoKey 需要 theme.logos / LS / defaultLogo 三層 fallback 邏輯，
  // 重複實作會 drift；resolveInitialThemeQuery 只負責「URL 解析 + 合法性檢查」，
  // store init 負責「URL 沒給 → LS → defaultLogo」第二優先級鏈
  const logoKey = ref<string>(
    initial.logoKey ?? resolveInitialLogoKey(initial.layoutKey)
  );

  /** 當前 theme metadata */
  const currentTheme = computed(() => getTheme(layoutKey.value));
  /** 當前配色 metadata */
  const currentColor = computed(() =>
    getColorVariant(currentTheme.value, colorKey.value)
  );
  /** 當前 logo metadata（含 src），給 theme entry SFC 取用 */
  const currentLogo = computed(() =>
    getLogo(currentTheme.value, logoKey.value)
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
   * 切換 logo（限定在當前 theme 的 logos 清單中）
   *
   * 為什麼 setLogo 與 setColor 行為一致：
   * - 都是「使用者主動操作」、需要當下 theme 邊界檢查
   * - 都會被 persist 但 logo key 分 theme 各自記憶
   */
  function setLogo(key: string): void {
    const theme = currentTheme.value;
    if (!theme.logos.some((l) => l.key === key)) return;
    logoKey.value = key;
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
    // logo 也跟著切：從新 theme 的 LS 偏好或預設取
    // 為什麼這裡用 resolveInitialLogoKey 而非直接 newTheme.defaultLogo：
    // 使用者可能曾在新 theme 下選過 logo，切回來應該還原他的選擇
    logoKey.value = resolveInitialLogoKey(newKey);
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
  // logoKey 寫到「按 theme 分流」的 LS key，避免不同 theme 互相覆蓋
  watch(logoKey, (v) => {
    if (!v) return;
    safeSetLS(LS_LOGO_KEY_PREFIX + layoutKey.value, v);
  });

  return {
    // state（layoutKey 是 computed，其餘 ref / computed）
    layoutKey,
    colorKey,
    logoKey,
    fabPosition,
    // getters
    currentTheme,
    currentColor,
    currentLogo,
    allThemes,
    // actions
    setColor,
    setLogo,
    setFabPosition,
    resetFabPosition
  };
});
