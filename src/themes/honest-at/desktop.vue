<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import HonestAtMobileHero from "./sections/honest-at-mobile-hero.vue";
import HonestAtMobileGameMenu from "./sections/honest-at-mobile-game-menu.vue";

/**
 * honest-at 桌面版佈局 — 「mobile 結構橫向延伸 + 同設計語言放大」
 *
 * honest_real 三個版本（at / max / no6）皆為純手機站，無 PC 原作。
 * 採與 vietvip 同樣的「忠於 mobile 元素、橫向延伸」策略：
 * - 頂部 sticky brand bar（mobile header 放大版 + 加 nav）
 * - 主內容區 1200px 居中容器，內嵌 mobile hero 與 mobile game-menu
 * - 不另開 PC 專屬 hero / game-grid 元件（避免維護兩套）
 *
 * 為什麼 hero + game-menu 直接重用 mobile 元件：
 * - 三個 honest theme 都是純手機原作，原本沒有 PC layout 可參考
 * - 與其硬掰 PC 五段塞 placeholder，不如「放大顯示手機核心元素」反而更貼近原作
 * - 還能 100% 維持配色 / token 一致性，沒有 PC / mobile drift 風險
 * - showcase 主頁主要看 mobile 縮圖，PC 縮圖只是輔助
 *
 * Header / Footer 仍走 PC 專屬樣式，因為 mobile header 是 sticky 透明
 * 直接放大會掉品牌識別度
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

const navItems = [
  "首頁",
  "熱門",
  "真人",
  "電子",
  "彩票",
  "棋牌",
  "捕魚",
  "體育"
];

const footerLinks = [
  "關於 AT99",
  "服務條款",
  "隱私政策",
  "負責任博彩",
  "聯絡客服"
];
</script>

<template>
  <div class="honest-at-layout">
    <!-- 頂部 sticky brand bar（mobile 同設計語言加寬） -->
    <header class="honest-at-layout__header">
      <div class="honest-at-layout__header-inner">
        <a class="honest-at-layout__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-at-layout__logo"
            :class="{ 'honest-at-layout__logo--blend': useScreenBlend }"
          />
        </a>

        <nav class="honest-at-layout__nav" aria-label="主導覽">
          <a
            v-for="n in navItems"
            :key="n"
            href="#"
            class="honest-at-layout__nav-link"
          >
            {{ n }}
          </a>
        </nav>

        <div class="honest-at-layout__actions">
          <button
            type="button"
            class="honest-at-layout__btn honest-at-layout__btn--ghost"
          >
            註冊
          </button>
          <button
            type="button"
            class="honest-at-layout__btn honest-at-layout__btn--primary"
          >
            登入
          </button>
        </div>
      </div>
    </header>

    <main class="honest-at-layout__main">
      <!-- 大寬版 hero + game menu：mobile section 直接放大顯示，
           container 居中、寬度 1200，內部 mobile section 自動撐滿 -->
      <div class="honest-at-layout__container">
        <HonestAtMobileHero />
        <HonestAtMobileGameMenu />
      </div>
    </main>

    <footer class="honest-at-layout__footer">
      <div class="honest-at-layout__footer-inner">
        <div class="honest-at-layout__footer-brand">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="honest-at-layout__footer-logo"
            :class="{ 'honest-at-layout__logo--blend': useScreenBlend }"
          />
          <span class="honest-at-layout__footer-tag"
            >霓虹電競 · 24h 不打烊</span
          >
        </div>
        <nav class="honest-at-layout__footer-nav">
          <a v-for="l in footerLinks" :key="l" href="#">{{ l }}</a>
        </nav>
        <div class="honest-at-layout__footer-copy">
          © {{ new Date().getFullYear() }} AT99 Demo Layout · All Rights
          Reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.honest-at-layout {
  position: relative;
  background: var(--bg-base);
  background-image: var(--bg-decoration);
  color: var(--text-on-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: linear-gradient(
      180deg,
      rgba(5, 10, 26, 0.85) 0%,
      rgba(5, 10, 26, 0.62) 100%
    );
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--honest-at-neon-frame);
    box-shadow: var(--shadow-sticky);
  }

  &__header-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    padding: 0 12px;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo {
    height: 44px;
    width: auto;
    max-width: 180px;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  &__nav-link {
    color: var(--text-on-primary);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;
    position: relative;

    &:hover {
      color: var(--honest-at-neon-frame);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 2px;
        background: var(--honest-at-neon-frame);
        border-radius: 1px;
        box-shadow: 0 0 6px var(--honest-at-neon-frame);
      }
    }
  }

  &__actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  &__btn {
    height: 38px;
    padding: 0 22px;
    border-radius: 22px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition:
      filter 0.18s ease,
      transform 0.18s ease;

    &:active {
      transform: scale(0.96);
    }

    &--ghost {
      color: var(--honest-at-neon-frame);
      background: transparent;
      border: 1.5px solid var(--honest-at-neon-frame);

      &:hover {
        background: rgba(45, 212, 255, 0.18);
      }
    }

    &--primary {
      color: var(--text-on-gold);
      background: var(--gradient-gold);
      border: none;
      box-shadow: 0 4px 12px rgba(255, 138, 76, 0.4);

      &:hover {
        filter: brightness(1.08);
      }
    }
  }

  &__main {
    flex: 1;
    padding: 24px 0 64px;
  }

  &__container {
    width: 1024px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;

    // 為什麼 1024 而非 1200：mobile section 內部已是 100% 寬度的 grid 配置，
    // 整體放大太多會造成 hero 文字過大、卡片之間 gap 太寬，視覺反而失衡
  }

  // ─────── footer ───────
  &__footer {
    background: var(--footer-bg);
    border-top: 1px solid var(--honest-at-neon-frame);
    padding: 32px 0 24px;
  }

  &__footer-inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    text-align: center;
  }

  &__footer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__footer-logo {
    height: 38px;
    object-fit: contain;
  }

  &__footer-tag {
    font-size: 13px;
    color: var(--footer-text);
  }

  &__footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    a {
      color: var(--footer-text);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.15s ease;

      &:hover {
        color: var(--honest-at-neon-frame);
      }
    }
  }

  &__footer-copy {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 8px;
  }
}
</style>
