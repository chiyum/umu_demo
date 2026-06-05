<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * vietvip PC footer — VIP 廳堂風格的版權底部 + 客服 / 渠道資訊
 *
 * 對齊一般博彩站台的「深底 + 金字版權 + 多欄資訊」格式：
 * - 左：品牌 logo + 簡介
 * - 中：3 欄連結（關於我們 / 客服 / 法律）
 * - 右：客服與多語系入口
 *
 * 為什麼 vietvip 需要自製 footer：
 * - tycoon / ant-sport 沒有 footer，但 vietvip 主打 VIP 廳堂質感需要「儀式感收尾」
 * - 深酒紅底 + 金線分隔的 footer 是越南 VIP 站台常見視覺收束
 */

const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

interface LinkCol {
  title: string;
  links: string[];
}

const linkCols: LinkCol[] = [
  { title: "關於我們", links: ["品牌故事", "VIP 制度", "牌照資訊"] },
  { title: "客戶服務", links: ["線上客服", "常見問題", "存提教學"] },
  { title: "法律規範", links: ["服務條款", "隱私政策", "責任博彩"] }
];
</script>

<template>
  <footer class="vietvip-pc-footer">
    <div class="vietvip-pc-footer__inner">
      <div class="vietvip-pc-footer__brand-col">
        <a class="vietvip-pc-footer__brand" href="#" :aria-label="logoLabel">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="vietvip-pc-footer__logo"
            :class="{ 'vietvip-pc-footer__logo--blend': useScreenBlend }"
          />
        </a>
        <p class="vietvip-pc-footer__tagline">
          東南亞首屈一指的 VIP 線上娛樂城，提供越南、泰國、印尼等多語系即時服務
        </p>
      </div>

      <div class="vietvip-pc-footer__links">
        <div
          v-for="col in linkCols"
          :key="col.title"
          class="vietvip-pc-footer__col"
        >
          <h3 class="vietvip-pc-footer__col-title">{{ col.title }}</h3>
          <ul class="vietvip-pc-footer__col-list" role="list">
            <li v-for="l in col.links" :key="l">
              <a class="vietvip-pc-footer__col-link" href="#">{{ l }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="vietvip-pc-footer__service">
        <h3 class="vietvip-pc-footer__col-title">即時客服</h3>
        <p class="vietvip-pc-footer__service-hours">24 / 7 全天候服務</p>
        <button type="button" class="vietvip-pc-footer__cs-btn">
          線上即時客服
        </button>
        <div class="vietvip-pc-footer__lang">
          <span>多語支援：</span>
          <span class="vietvip-pc-footer__lang-tag">VN</span>
          <span class="vietvip-pc-footer__lang-tag">TH</span>
          <span class="vietvip-pc-footer__lang-tag">ID</span>
          <span class="vietvip-pc-footer__lang-tag">繁中</span>
        </div>
      </div>
    </div>

    <div class="vietvip-pc-footer__copyright">
      <span class="vietvip-pc-footer__copy-line" aria-hidden="true" />
      <p class="vietvip-pc-footer__copy-text">
        © 2026 越南 VIP Demo Site. 本站為示範用途，不涉及任何實際博彩活動。
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.vietvip-pc-footer {
  background: var(--footer-bg);
  color: var(--footer-text);
  padding: 60px 0 0;
  // 上方一條金線分隔上方內容區
  border-top: 1px solid var(--vietvip-gold-2);
  font-family: var(--font-body);

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.4fr 2fr 1.2fr;
    gap: 48px;
  }

  &__brand-col {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  &__logo {
    height: 50px;
    width: auto;
    max-width: 200px;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__tagline {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: var(--footer-text);
    letter-spacing: 0.3px;
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  &__col-title {
    margin: 0 0 16px;
    font-size: 15px;
    font-weight: 700;
    color: var(--vietvip-gold-1);
    letter-spacing: 0.5px;
    font-family: var(--font-display);
  }

  &__col-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__col-link {
    color: var(--footer-link);
    text-decoration: none;
    font-size: 13px;
    transition: color 0.18s ease;

    &:hover {
      color: var(--vietvip-gold-1);
    }
  }

  &__service {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__service-hours {
    margin: 0;
    font-size: 13px;
    color: var(--vietvip-gold-2);
  }

  &__cs-btn {
    align-self: flex-start;
    padding: 10px 22px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    color: var(--text-on-gold);
    background: var(--gradient-gold);
    border: none;
    border-radius: 22px;
    cursor: pointer;
    box-shadow: 0 4px 12px
      hsla(var(--secondary-h), var(--secondary-s), 50%, 0.45);
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(1.1);
    }
  }

  &__lang {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--footer-text);
  }

  &__lang-tag {
    padding: 3px 10px;
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 10px;
    font-size: 11px;
    color: var(--vietvip-gold-1);
    letter-spacing: 0.4px;
  }

  &__copyright {
    margin-top: 50px;
    padding: 20px 0;
    text-align: center;
  }

  &__copy-line {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--vietvip-divider);
    margin-bottom: 18px;
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
