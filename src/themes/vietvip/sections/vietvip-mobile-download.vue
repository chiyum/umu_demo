<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import imgDownloadBg from "../assets/home/download-bg.png?url";
import imgDownloadClose from "../assets/home/download-close.png?url";

/**
 * vietvip mobile Download 浮窗（下載 APP 入口）
 *
 * 對齊 lilian_vietvip_web src/widgets/download.vue + 內嵌 SCSS：
 * - 原作：fixed right: 0 / top: 9.2rem 的橘色背景條，左邊顯示「下載 APP」文字
 * - 右上角小叉叉（icon_download_float_delete）可關閉
 * - 寬度 1.6rem / 高度 0.6rem，背景 icon_download_float.png 整張圖
 *
 * Demo 改動：
 * - 關閉狀態用本機 sessionStorage 記憶（原作用 localdb 紀錄一天）
 * - 點下載按鈕跳 Notify 提示，不打開真實 apk / ipa
 *
 * 為什麼下載條獨立成一個 section：
 * - 原作就是獨立 widget（Download 元件），與 buoy 分開
 * - mobile.vue 統一在 layout 層 fixed 兩個浮窗，職責清楚
 */

const SS_KEY = "vietvip-demo-download-closed";

// SSR / 隱私模式吞錯誤
function safeGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // 隱私模式吞掉，UI 不受影響
  }
}

// 初始狀態：sessionStorage 命中過就不顯示
const isShow = ref(safeGet(SS_KEY) !== "1");

const $q = useQuasar();

function handleDownload(): void {
  $q.notify({
    message: "Demo 環境：下載 APP 僅展示版面",
    color: "primary",
    position: "top",
    timeout: 1500
  });
}

function handleClose(): void {
  isShow.value = false;
  safeSet(SS_KEY, "1");
}
</script>

<template>
  <Transition name="vietvip-download-fade">
    <div v-if="isShow" class="vietvip-m-download" @click="handleDownload">
      <img
        :src="imgDownloadBg"
        alt=""
        class="vietvip-m-download__bg"
        aria-hidden="true"
      />
      <span class="vietvip-m-download__text">下載 APP</span>
      <button
        type="button"
        class="vietvip-m-download__close"
        aria-label="關閉下載提示"
        @click.stop="handleClose"
      >
        <img :src="imgDownloadClose" alt="" />
      </button>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
// 對齊原作 download.vue 內 SCSS：
// fixed right: 0 / top 9.2rem ≈ 353px
// width 1.6rem ≈ 61px / height 0.6rem ≈ 23px
// 背景 icon_download_float.png 整張圖
// demo 站把尺寸放大到方便點擊
.vietvip-m-download {
  position: fixed;
  right: 0;

  // 原作 9.2rem 換算 ≈ 353px，demo viewport 短一些用 55% 比例避免被 buoy 蓋住
  top: 55%;
  z-index: 94;
  display: inline-flex;
  align-items: center;
  width: 76px;
  height: 30px;
  padding-left: 18px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  white-space: nowrap;
  cursor: pointer;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.35));
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.94);
  }

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    pointer-events: none;
  }

  &__text {
    position: relative;
    z-index: 2;
  }

  // 關閉小叉叉：對齊原作 .close right 0.1rem / top -0.15rem
  // 略往左上偏避免叉叉壓在圓邊上
  &__close {
    position: absolute;
    top: -10px;
    right: 4px;
    z-index: 3;
    width: 18px;
    height: 18px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  &__close img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

// 淡入淡出：搭配 Transition 元件
.vietvip-download-fade-enter-active,
.vietvip-download-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.vietvip-download-fade-enter-from,
.vietvip-download-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
