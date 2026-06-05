<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * tycoon mobile 頂部 header
 *
 * 對齊使用者設計稿（大亨娛樂城.html）的 header 段：
 * - 左：品牌 logo（由 demo-theme store 動態切換）
 * - 中：彈性 spacer 推開
 * - 右：註冊（白底藍字）/ 登入（藍漸層白字）/ 語系國旗
 *
 * 設計亮點（取自 HTML）：
 * - 註冊鈕：白底 + inset 1.5px 淡藍邊框 + 藍色淡陰影
 * - 登入鈕：藍漸層 + 重藍陰影 + inset 白頂亮邊
 * - 國旗：圓形容器 + 漸層白底 + 內嵌簡易 SVG 國旗
 *
 * 為什麼用 SVG 國旗而非 emoji 🇹🇼：
 * - 跨平台一致性：emoji 國旗在 Linux / Windows 顯示經常失敗或被擋下
 * - 任務描述明確禁止 emoji
 * - 自繪 SVG 體積極小（< 200B），無 HTTP request 成本
 *
 * Logo 切換邏輯沿用其他 theme：用 mix-blend-mode: screen 洗白底 PNG
 * 但 tycoon header 是淺底，screen 模式對淺底 logo 效果不對
 * → 改採「淺底直接顯示，深底洗白」策略：
 *   - tycoon header 走白底＋淺藍底，PNG logo 直接落上就好，不該套 mix-blend-mode
 *   - 所以這裡完全不用 transparentBg 判斷，移除 useScreenBlend 邏輯
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <header class="tycoon-m-header">
    <a class="tycoon-m-header__brand" href="#" :aria-label="logoLabel">
      <img :src="logoSrc" :alt="logoLabel" class="tycoon-m-header__logo" />
    </a>

    <div class="tycoon-m-header__spacer" />

    <button type="button" class="tycoon-m-header__btn-reg" aria-label="註冊">
      註冊
    </button>
    <button type="button" class="tycoon-m-header__btn-login" aria-label="登入">
      登入
    </button>

    <div
      class="tycoon-m-header__flag"
      title="繁體中文"
      aria-label="語系：繁體中文"
    >
      <!--
        簡化版臺灣國旗 SVG：青天白日滿地紅
        - 取自設計稿 .flag svg 區塊（移除 xmlns、移除 width/height inline 改交給 CSS 控）
        - 純裝飾，無互動，純粹示意「demo 站有語系切換入口」
      -->
      <svg viewBox="0 0 60 40" aria-hidden="true" focusable="false">
        <rect width="60" height="40" fill="#fe0000" />
        <rect width="30" height="20" fill="#000095" />
        <circle cx="15" cy="10" r="6.2" fill="#fff" />
        <circle cx="15" cy="10" r="3" fill="#000095" />
      </svg>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// 對齊設計稿 header { padding: 14px 16px 10px; gap: 10px }
// - header 落在 phone radial-gradient 底上方，無 background；
//   要讓條紋從 hero 一路串到 tab bar 都看得到，header 自己保留透明
.tycoon-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 10px;

  // 為什麼底要半透明而非全 transparent：
  // sticky 時若完全透明，捲動的時候 hero / marquee 會穿透到 header 上方，難辨識
  // 取 ice-1 + alpha 維持「冰白半透感」，與下方 hero 過渡自然
  background: linear-gradient(
    180deg,
    rgba(234, 243, 252, 0.92) 0%,
    rgba(234, 243, 252, 0.78) 100%
  );
  backdrop-filter: blur(8px);
  color: var(--text-primary);
  box-shadow: var(--shadow-sticky);

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    padding-left: 0;
  }

  &__logo {
    height: 36px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;
  }

  &__spacer {
    flex: 1;
  }

  // 註冊鈕：白底 + 藍字 + 淡藍邊（對齊設計稿 .btn-reg）
  &__btn-reg {
    padding: 9px 18px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    border: none;
    border-radius: 22px;
    color: var(--color-primary);
    background: var(--bg-surface);
    cursor: pointer;
    box-shadow:
      0 2px 6px var(--tycoon-card-glow),
      inset 0 0 0 1.5px hsla(var(--primary-h), var(--primary-s), 80%, 0.7);
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.95);
    }
  }

  // 登入鈕：藍漸層 + inset 白頂亮邊 + 重藍陰影（對齊設計稿 .btn-login）
  &__btn-login {
    padding: 9px 18px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    border: none;
    border-radius: 22px;
    color: var(--text-on-primary);
    background: linear-gradient(180deg, var(--primary-04), var(--primary-05));
    cursor: pointer;
    box-shadow:
      0 4px 10px
        hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.95);
    }
  }

  // 國旗圓形容器（對齊設計稿 .flag）
  &__flag {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ffffff 0%, #dbe9fb 100%);
    box-shadow: 0 2px 6px var(--tycoon-card-glow);
  }

  &__flag svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
