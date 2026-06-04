<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import messageIcon from "@/themes/ant-sport/assets/user-action/message.webp?url";

/**
 * ant-sport mobile 頂部 logo bar
 *
 * 對齊 lilian_ant_web src/pages/home.vue 第 3-8 行 `.home__header`：
 * - 左側：蚂蚁体育 logo（由 demo-theme store 動態切換）
 * - 右側：訊息通知圖示（連到 /newsCenter，本 demo 純展示）
 *
 * 結構保留原 BEM 風格命名（home__header → ant-sport-m-header），
 * 主視覺定位用 sticky 而非 fixed，避免吃掉 banner swiper 的 z-index 層級
 *
 * Logo 不寫死 import，改透過 themeStore.currentLogo 動態切；
 * 使用者在 FAB Logo row 切換時，這裡 reactive 自動更新
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

// 是否需要套 mix-blend-mode: screen 把白底洗掉
// - 白底 PNG（transparentBg !== true）需要洗底，否則藍 bar 上會出現白色矩形
// - 透明背景 PNG 不該洗，否則彩色筆畫會被 screen 拉淡到看不清
// 由 registry 各 logo 自行標註 transparentBg，避免新增白底 logo 時忘了考慮
const useScreenBlend = computed(() => !themeStore.currentLogo.transparentBg);
</script>

<template>
  <header class="ant-sport-m-header">
    <a class="ant-sport-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="ant-sport-m-header__logo"
        :class="{ 'ant-sport-m-header__logo--screen-blend': useScreenBlend }"
      />
    </a>
    <button
      type="button"
      class="ant-sport-m-header__message"
      aria-label="訊息中心"
    >
      <img
        :src="messageIcon"
        alt=""
        aria-hidden="true"
        class="ant-sport-m-header__message-icon"
      />
      <!-- 紅點：模擬有新訊息（Demo 固定顯示） -->
      <span class="ant-sport-m-header__dot" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
// 對齊 lilian_ant_web main.scss .home__header：
// - 高度 1rem ≈ 50px / padding-right pr-3 ≈ 12px
// - logo 從左邊 background-position: 0.3rem (~12px) 起算，1.8rem (~68px) 寬
// - 訊息 icon 0.7rem 寬高 ≈ 26px，背景圖 0.5rem ≈ 19px
.ant-sport-m-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 50px;
  padding: 0 12px;
  background: var(--gradient-cta);
  color: var(--text-on-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sticky);

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    padding-left: 4px;
  }

  // 原版 1.8rem 寬 ≈ 68px，自適應高度
  &__logo {
    height: 36px;
    width: auto;
    max-width: 180px;
    object-fit: contain;
    display: block;

    // 透明底 PNG 預設不套任何 blend mode；白底 PNG（registry transparentBg=false）
    // 走 .ant-sport-m-header__logo--screen-blend 修飾類別。
    // 為什麼用修飾類別而非寫死 mix-blend-mode：mix-blend-mode 對透明底 PNG 會把彩色
    // 筆畫拉淡（screen 公式：底白 + 任何色 = 接近白），標反了 logo 就褪色
    &--screen-blend {
      mix-blend-mode: screen;
    }
  }

  &__message {
    position: relative;
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__message-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;

    // 同樣對白色圖標套色：mask 把 webp 轉成可染色形狀
    filter: brightness(0) invert(1);
  }

  &__dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--badge-live);
    box-shadow: 0 0 0 1.5px var(--bg-surface);
  }
}
</style>
