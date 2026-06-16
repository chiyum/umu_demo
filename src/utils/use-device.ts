// src/composables/use-device.ts
import debounce from "lodash/debounce";

// 手機裝置的寬度閾值（以像素為單位）
// 抽成模組層級常數，讓 UA helper 與混合判斷共用同一份數值，避免散落
const MOBILE_WIDTH_THRESHOLD = 768;

/**
 * 偵測當前瀏覽器的 User-Agent 是否屬於「行動裝置」。
 *
 * 為什麼需要這支：
 * 整站的 desktop/mobile 切換原本只看 window.innerWidth，但「手機桌面模式
 * （請求桌面版網站）」的本質是把 UA 換成桌面瀏覽器，而非真的改變裝置寬度。
 * 各家瀏覽器在桌面模式下回報的 viewport 寬度不一致（Chrome Android 會強制
 * 撐到約 980px、iOS Safari 則不一定），純寬度判斷無法可靠地反映使用者的意圖。
 *
 * 改用 UA 比對行動關鍵字後：使用者一旦切到桌面模式，UA 會變成桌面瀏覽器，
 * 此函式回傳 false → 上層判定為非手機 → 載入電腦版 layout 與元件，正是目標行為。
 *
 * 註：iPadOS Safari 預設就送桌面 UA，因此 iPad 會被視為電腦版，此為預期可接受的行為。
 */
function isMobileUserAgent(): boolean {
  // 防呆：非瀏覽器環境（理論上此 demo 不會 SSR，但保留保護避免 navigator 為 undefined 報錯）
  if (typeof navigator === "undefined" || !navigator.userAgent) return false;

  const ua = navigator.userAgent;

  // 涵蓋主流行動裝置 UA 關鍵字：
  // - iPhone / iPod：iOS 手機
  // - Android.*Mobile：Android「手機」（Android 平板的 UA 不含 Mobile，會被當電腦版）
  // - Windows Phone / IEMobile：Windows 行動裝置
  // - BlackBerry / Opera Mini / webOS：其他較少見的行動瀏覽器
  const MOBILE_UA_REGEX =
    /iPhone|iPod|Android.*Mobile|Windows Phone|IEMobile|BlackBerry|Opera Mini|webOS/i;

  return MOBILE_UA_REGEX.test(ua);
}

/**
 * 集中計算「是否為手機」的混合判斷邏輯，供初始化與 resize 共用（DRY）。
 *
 * 採「UA 為主、寬度為輔」：兩者皆成立才算手機。
 * - UA 那半邊：桌面模式下 UA 變桌面即回 false，直接顯示電腦版（核心目標）。
 * - 寬度那半邊：保留一點響應式彈性，例如真手機但被某些情境放寬時仍能收斂；
 *   同時讓桌機縮窗時寬度條件可被重新評估（雖然 UA 仍為桌面，結果仍會是電腦版）。
 */
function evaluateIsMobile(): boolean {
  return isMobileUserAgent() && window.innerWidth <= MOBILE_WIDTH_THRESHOLD;
}

// useDevice composable 用於判斷當前裝置是否為手機
// 並根據裝置選擇不同版本的元件
export function useDevice() {
  // 初始值同樣走混合判斷，確保首屏即正確
  const isMobile = ref(evaluateIsMobile()); // 判斷是否為手機裝置的標誌

  // 檢查裝置是否為手機，使用 debounce 限制頻繁調用
  // 注意：UA 不會因視窗縮放而改變，但寬度會，因此 resize 時仍需重新評估混合判斷，
  // 讓寬度那半邊能反應（例如桌機拖曳縮窗）；桌面模式下 UA 恆為桌面，結果仍維持電腦版。
  const checkDevice = debounce(() => {
    isMobile.value = evaluateIsMobile();
  }, 200);

  // 當組件掛載時，初始化裝置檢查並添加 resize 事件監聽器
  onMounted(() => {
    checkDevice(); // 初始化裝置檢查
    window.addEventListener("resize", checkDevice); // 監聽 resize 事件以便動態更新裝置狀態
  });

  // 當組件卸載時，移除 resize 事件監聽器，避免記憶體洩漏
  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkDevice);
  });

  // 動態選擇 AWD 組件（若組件包含 desktop 和 mobile 版本，則根據裝置選擇相應的組件版本）
  const getComponent = (vnode: VNode) => {
    if (vnode?.type && typeof vnode.type === "object") {
      // 將 vnode 的類型轉換為特定的 AWD 組件類型，方便讀取 desktop 和 mobile 屬性
      const componentType = vnode.type as {
        desktop?: () => Promise<Component>; // 定義桌面版組件
        mobile?: () => Promise<Component>; // 定義手機版組件
      };

      // 檢查該組件是否包含 desktop 和 mobile 版本
      if ("desktop" in componentType && "mobile" in componentType) {
        // 使用 defineAsyncComponent 動態載入根據當前裝置選擇的組件版本
        return defineAsyncComponent({
          loader: isMobile.value ? componentType.mobile : componentType.desktop // 當前裝置的組件版本
        });
      }
    }
    // 若組件並非 AWD 組件（不包含 desktop 和 mobile），直接返回原始 vnode
    return vnode;
  };

  // 返回裝置狀態和 getComponent 方法
  return {
    isMobile, // 判斷是否為手機的 ref
    getComponent // 根據裝置選擇相應組件版本的函數
  };
}
