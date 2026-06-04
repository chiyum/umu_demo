<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import AntSportPcBanner from "./sections/ant-sport-pc-banner.vue";
import AntSportPcNews from "./sections/ant-sport-pc-news.vue";
import AntSportPcAppDownload from "./sections/ant-sport-pc-app-download.vue";
import AntSportPcGameGrid from "./sections/ant-sport-pc-game-grid.vue";
import AntSportPcServe from "./sections/ant-sport-pc-serve.vue";

// Logo 改由 store 取，使用者可在 FAB Logo row 切換
// 為什麼用 computed 而非直接綁 themeStore.currentLogo：
// - SFC 內 template 直接用 themeStore.currentLogo.src 也可，但抽 computed 較清楚
// - 切 theme 時 currentLogo 自動跟著切（store 內有 watch layoutKey 處理）
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/**
 * ant-sport 桌面版佈局 — 對齊 lilian_ant_pc src/pages/main.vue 五段結構
 *
 * 五段順序：
 * 1. Banner            頂部全寬輪播 banner
 * 2. News              跑馬燈 + 「更多」按鈕（疊在 banner 下方，視覺上往上偏移 -28px）
 * 3. AppDownload       APP / H5 下載區（左 phone mockup / 右 tabs + QR）
 * 4. GameGrid          熱門遊戲類別 tabs + 7 大類別（左大圖右文字 + provider 列）
 * 5. Serve             4 個數字計數（IntersectionObserver 觸發）+ 4 種特色
 *
 * 額外：頂部 sticky brand bar（lilian_ant_pc 的 layout header 摘要版），
 * 含 logo + 簡易導覽，讓 demo 視覺完整不只跳到 banner
 */

// 簡易導覽項目（demo 不接路由）
const navItems = [
  "首頁",
  "體育",
  "真人",
  "電競",
  "棋牌",
  "彩票",
  "電子",
  "捕魚"
];
</script>

<template>
  <div class="ant-sport-layout">
    <!-- 頂部 brand bar：對齊 lilian_ant_pc layout（main.vue 之外） -->
    <header class="ant-sport-layout__topbar">
      <div class="ant-sport-layout__topbar-inner">
        <a class="ant-sport-layout__brand" href="#" :aria-label="logoLabel">
          <img :src="logoSrc" :alt="logoLabel" class="ant-sport-layout__logo" />
        </a>
        <nav class="ant-sport-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="ant-sport-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>
        <div class="ant-sport-layout__actions">
          <button
            type="button"
            class="ant-sport-layout__btn ant-sport-layout__btn--ghost"
          >
            登入
          </button>
          <button
            type="button"
            class="ant-sport-layout__btn ant-sport-layout__btn--primary"
          >
            註冊
          </button>
        </div>
      </div>
    </header>

    <main class="ant-sport-layout__main">
      <AntSportPcBanner />
      <AntSportPcNews />
      <AntSportPcAppDownload />
      <AntSportPcGameGrid />
      <AntSportPcServe />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ant-sport-layout {
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }

  &__topbar {
    position: sticky;
    top: 0;
    z-index: 200;
    background: var(--bg-base-translucent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-sticky);
  }

  // 對齊 lilian_ant_pc header 80px / 1200 寬度容器
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
    height: 36px;
    padding: 0 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--color-primary);
    transition: filter 0.18s ease;

    &--ghost {
      background: transparent;
      color: var(--color-primary);

      &:hover {
        filter: brightness(1.1);
      }
    }

    &--primary {
      background: var(--gradient-cta);
      color: var(--text-on-primary);

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}
</style>
