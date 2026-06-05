<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import TycoonPcBanner from "./sections/tycoon-pc-banner.vue";
import TycoonPcNews from "./sections/tycoon-pc-news.vue";
import TycoonPcGameGrid from "./sections/tycoon-pc-game-grid.vue";
import TycoonPcAppDownload from "./sections/tycoon-pc-app-download.vue";
import TycoonPcServe from "./sections/tycoon-pc-serve.vue";

/**
 * tycoon 桌面版佈局 — fork ant-sport 桌面五段結構，融入設計稿藍冰系
 *
 * 五段順序（與 ant-sport 對齊）：
 * 1. Banner       頂部全寬輪播 banner（加冰光 swoosh 條紋）
 * 2. News         跑馬燈 + 「更多」按鈕（疊在 banner 下方）
 * 3. GameGrid     左 sidebar 6 分類 + 右遊戲卡列表（與 ant-sport 最大差異）
 * 4. AppDownload  APP / H5 下載區（左 phone mockup / 右 tabs + QR）
 * 5. Serve        4 個數字計數（圓盤改藍冰漸層）+ 4 種特色
 *
 * 為什麼 GameGrid 提前到第 3 段（ant-sport 是第 4 段）：
 * - tycoon 主打「藍冰大亨遊戲廳」，遊戲分類是核心賣點，應該優先曝光
 * - ant-sport 是體育博彩風，APP 下載作為主要 CTA 較早曝光
 *
 * Logo 切換邏輯沿用 ant-sport / at99 / noya：
 * - themeStore.currentLogo 取當前 logoKey 對應 src
 * - sticky topbar 永遠可見，便於切換間維持品牌存在感
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

// 桌面 sticky topbar 的簡易導覽項目（demo 不接路由）
const navItems = ["首頁", "真人", "彩票", "棋牌", "電子", "捕魚", "優惠"];
</script>

<template>
  <div class="tycoon-layout">
    <!-- 對角冰光條紋（PC 背景，與 mobile 同設計語言） -->
    <div class="tycoon-layout__streak" aria-hidden="true" />

    <!-- 頂部 brand bar -->
    <header class="tycoon-layout__topbar">
      <div class="tycoon-layout__topbar-inner">
        <a class="tycoon-layout__brand" href="#" :aria-label="logoLabel">
          <img :src="logoSrc" :alt="logoLabel" class="tycoon-layout__logo" />
        </a>

        <nav class="tycoon-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="tycoon-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="tycoon-layout__actions">
          <button
            type="button"
            class="tycoon-layout__btn tycoon-layout__btn--ghost"
          >
            註冊
          </button>
          <button
            type="button"
            class="tycoon-layout__btn tycoon-layout__btn--primary"
          >
            登入
          </button>
        </div>
      </div>
    </header>

    <main class="tycoon-layout__main">
      <TycoonPcBanner />
      <TycoonPcNews />
      <TycoonPcGameGrid />
      <TycoonPcAppDownload />
      <TycoonPcServe />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.tycoon-layout {
  position: relative;
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // 對角冰光條紋（pointer-events: none 不擋互動）
  // 與 mobile.vue 同設計語言，但條紋走更大尺寸覆蓋整個 PC viewport
  &__streak {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: linear-gradient(
        115deg,
        transparent 35%,
        var(--tycoon-streak-1) 42%,
        transparent 48%
      ),
      linear-gradient(
        115deg,
        transparent 62%,
        var(--tycoon-streak-2) 68%,
        transparent 73%
      );
    opacity: 0.45;
  }

  // 所有子層 z-index: 1 蓋過 streak
  > *:not(&__streak) {
    position: relative;
    z-index: 1;
  }

  &__main {
    flex: 1;
  }

  // 頂部 sticky bar
  &__topbar {
    position: sticky;
    top: 0;
    z-index: 200;
    background: var(--bg-base-translucent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-sticky);
  }

  &__topbar-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 24px;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 50px;
    width: auto;
    max-width: 200px;
    object-fit: contain;
  }

  &__nav {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  &__nav-link {
    color: var(--text-primary);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;
    position: relative;

    &:hover {
      color: var(--color-primary);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: var(--color-primary);
        border-radius: 1px;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  &__btn {
    height: 38px;
    padding: 0 24px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.18s ease;

    &--ghost {
      // 註冊按鈕：白底藍字（對齊設計稿 .btn-reg）
      background: var(--bg-surface);
      color: var(--color-primary);
      border: none;
      box-shadow:
        0 2px 6px var(--tycoon-card-glow),
        inset 0 0 0 1.5px hsla(var(--primary-h), var(--primary-s), 80%, 0.7);

      &:hover {
        filter: brightness(1.05);
      }
    }

    &--primary {
      // 登入按鈕：藍漸層白字（對齊設計稿 .btn-login）
      background: linear-gradient(180deg, var(--primary-04), var(--primary-05));
      color: var(--text-on-primary);
      border: none;
      box-shadow:
        0 4px 10px
          hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}
</style>
