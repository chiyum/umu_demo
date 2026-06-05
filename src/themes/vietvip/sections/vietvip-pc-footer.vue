<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * vietvip PC footer — 精簡版權底（mobile tab-bar 同設計語言）
 *
 * 設計取捨：
 * - 上輪用「商業站 4 欄」結構（左 logo + 中 3 欄連結 + 右客服），
 *   但使用者要求「以 1:1 復刻為主」，原作沒有 PC footer 可以對照，
 *   不該硬塞商業站範式
 * - 改為精簡單行：左 logo + 中央 nav 標籤 + 右多語標籤
 * - 配色與 mobile tab-bar 一致（深酒紅 + 金線分隔 + 圓角上邊）
 *
 * 動機：footer 在 demo 站不該分散使用者對「mobile 五段 + game grid」核心內容的注意力，
 * 只需精簡收尾即可
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

// 與 mobile bottom tab 5 個 key 對齊（首頁 / 優惠 / 錢包 / 客服 / 我的）+ 補幾個導覽項
const navItems = [
  "首頁",
  "優惠",
  "VIP 制度",
  "存提教學",
  "線上客服",
  "常見問題"
];
const langs = ["VN", "TH", "ID", "繁中"];
</script>

<template>
  <footer class="vietvip-pc-footer">
    <div class="vietvip-pc-footer__inner">
      <a class="vietvip-pc-footer__brand" href="#" :aria-label="logoLabel">
        <img
          :src="logoSrc"
          :alt="logoLabel"
          class="vietvip-pc-footer__logo"
          :class="{ 'vietvip-pc-footer__logo--blend': useScreenBlend }"
        />
      </a>

      <nav class="vietvip-pc-footer__nav" aria-label="footer 導覽">
        <a
          v-for="n in navItems"
          :key="n"
          href="#"
          class="vietvip-pc-footer__nav-link"
        >
          {{ n }}
        </a>
      </nav>

      <div class="vietvip-pc-footer__langs">
        <span v-for="l in langs" :key="l" class="vietvip-pc-footer__lang-tag">
          {{ l }}
        </span>
      </div>
    </div>

    <div class="vietvip-pc-footer__copy">
      <span class="vietvip-pc-footer__copy-line" aria-hidden="true" />
      <p class="vietvip-pc-footer__copy-text">
        © 2026 越南 VIP Demo Site. 本站為示範用途，不涉及任何實際博彩活動。
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
// mobile tab-bar 同設計語言：深酒紅半透 + 上方金線 + 圓角上邊
.vietvip-pc-footer {
  margin-top: 40px;
  background: linear-gradient(
    180deg,
    rgba(74, 15, 29, 0.92) 0%,
    rgba(28, 3, 9, 0.98) 100%
  );
  border-top: 1px solid var(--vietvip-gold-2);
  border-radius: 18px 18px 0 0;
  color: var(--vietvip-gold-1);
  font-family: var(--font-body);
  padding: 22px 0 18px;
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.45);

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  &__logo {
    height: 38px;
    width: auto;
    max-width: 160px;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__nav {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  &__nav-link {
    color: var(--vietvip-gold-2);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.3px;
    transition: color 0.18s ease;

    &:hover {
      color: var(--vietvip-gold-1);
    }
  }

  &__langs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex-shrink: 0;
  }

  &__lang-tag {
    padding: 3px 10px;
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 10px;
    font-size: 11px;
    color: var(--vietvip-gold-1);
    letter-spacing: 0.4px;
  }

  &__copy {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 22px auto 0;
    text-align: center;
  }

  &__copy-line {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--vietvip-divider);
    margin-bottom: 14px;
  }

  &__copy-text {
    margin: 0;
    font-size: 12px;
    color: var(--footer-text);
    opacity: 0.78;
    letter-spacing: 0.4px;
  }
}
</style>
