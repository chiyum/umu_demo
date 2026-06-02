<script setup lang="ts">
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";
import ProviderBadge from "@/components/common/landing/provider-badge.vue";

// Round 9：lilian_vietvip_web 純金幣 PNG（無平台字樣）作為 hero banner 立體飛幣裝飾
// 為何不用 CSS 畫金幣：寫實金屬高光、邊緣反射用 CSS 摹仿成本高、且容易卡住，
// 直接用 PNG 帶 alpha 效果好且 bundle size 可接受（< 50KB / 張）
import coinSingleImg from "@/assets/themes/noya/extra/decor/coin-single.png";
import coinStackImg from "@/assets/themes/noya/extra/decor/coin-stack.png";

/**
 * noya 雙 banner hero：左 phone promo + 右 live casino
 *
 * 設計（對齊原站 5168th.com 雙 banner 結構）：
 * - 左 banner：深綠藍底（banner-dark-bg），「APP 下載」主標 + 桌機下載 CTA + phone mockup
 * - 右 banner：粉橘漸層（warm-start → accent），LIVE CASINO eyebrow + 大白字「真人視訊」
 *   + 4×2 provider 小圓徽章 + 真人剪影
 * - 兩 banner 都帶圓角、立體陰影、背景 radial blob 製造景深
 * - 完全不用真實圖檔，phone mockup / 真人剪影 / provider 都是程式繪製
 *
 * 為何 phone mockup 用 CSS：避免外部素材授權問題；
 * 黑色圓角矩形 + 螢幕色塊 + 缺口已足以表達手機概念。
 *
 * 注意 props.mobile：手機版改成單欄堆疊，因為並排 2 banner 在窄畫面無法看清。
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

// 右 banner 的 provider 小圓 logo（4×2 共 8 個）
// 走 ProviderBadge 共用元件，避免散落寫死 logo 圖
const liveProviders = [
  { key: "lp1", text: "DA", seed: 6 },
  { key: "lp2", text: "DB", seed: 14 },
  { key: "lp3", text: "DC", seed: 22 },
  { key: "lp4", text: "DD", seed: 30 },
  { key: "lp5", text: "EA", seed: 38 },
  { key: "lp6", text: "EB", seed: 46 },
  { key: "lp7", text: "SA", seed: 54 },
  { key: "lp8", text: "SB", seed: 62 }
];
</script>

<template>
  <section
    class="noya-hero-banner"
    :class="{ 'noya-hero-banner--mobile': mobile }"
  >
    <div class="noya-hero-banner__inner">
      <!-- 左 banner：phone promo（對齊原站深綠藍） -->
      <article class="noya-hero-banner__card noya-hero-banner__card--left">
        <!-- 背景立體裝飾光：左上、右下兩顆 radial 製造景深 -->
        <span class="noya-hero-banner__bg-blob noya-hero-banner__bg-blob--tl" />
        <span class="noya-hero-banner__bg-blob noya-hero-banner__bg-blob--br" />

        <div class="noya-hero-banner__copy">
          <h3
            class="noya-hero-banner__title kingdom-metal-gold kingdom-display-serif"
          >
            DEMO APP 即刻下載
          </h3>
          <p class="noya-hero-banner__desc">安卓 / iOS 系統．行動體驗無界</p>
          <button
            type="button"
            class="noya-hero-banner__cta noya-hero-banner__cta--solid"
          >
            桌機下載
          </button>
        </div>
        <!-- 純 CSS phone mockup -->
        <div class="noya-hero-banner__phone" aria-hidden="true">
          <div class="noya-hero-banner__phone-frame">
            <div class="noya-hero-banner__phone-notch" />
            <div class="noya-hero-banner__phone-screen">
              <div class="noya-hero-banner__phone-row" />
              <div
                class="noya-hero-banner__phone-row noya-hero-banner__phone-row--w70"
              />
              <div
                class="noya-hero-banner__phone-row noya-hero-banner__phone-row--w50"
              />
              <div class="noya-hero-banner__phone-tiles">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- 右 banner：LIVE CASINO 真人視訊（對齊原站粉橘漸） -->
      <article class="noya-hero-banner__card noya-hero-banner__card--right">
        <span class="noya-hero-banner__bg-blob noya-hero-banner__bg-blob--tl" />

        <!--
          Round 9：金幣裝飾（兩枚 PNG 透明背景）
          位置：右 banner 左下角 + 中央偏右、與 avatar 形成「玩家+金幣」場景敘事
          aria-hidden：純裝飾，不需朗讀
          mobile 時藉由 CSS 隱藏避免遮擋主要 CTA
        -->
        <img
          :src="coinSingleImg"
          alt=""
          aria-hidden="true"
          class="noya-hero-banner__coin noya-hero-banner__coin--single"
        />
        <img
          :src="coinStackImg"
          alt=""
          aria-hidden="true"
          class="noya-hero-banner__coin noya-hero-banner__coin--stack"
        />

        <div class="noya-hero-banner__copy noya-hero-banner__copy--right">
          <span class="noya-hero-banner__eyebrow">LIVE CASINO</span>
          <h3 class="noya-hero-banner__title noya-hero-banner__title--white">
            真人視訊
          </h3>
          <p class="noya-hero-banner__desc">沉浸體驗．專業荷官 24 小時不打烊</p>

          <!-- provider 小圓 4×2 -->
          <div class="noya-hero-banner__provider-grid" aria-label="合作提供商">
            <div
              v-for="p in liveProviders"
              :key="p.key"
              class="noya-hero-banner__provider-cell"
            >
              <ProviderBadge :text="p.text" :seed="p.seed" size="sm" />
            </div>
          </div>
        </div>

        <div class="noya-hero-banner__avatar-wrap" aria-hidden="true">
          <AvatarSilhouette :seed="42" variant="vivid" />
        </div>
        <!-- 右側小裝飾：dots 暗示可橫向滑動 -->
        <div class="noya-hero-banner__dots" aria-hidden="true">
          <span class="noya-hero-banner__dot noya-hero-banner__dot--on" />
          <span class="noya-hero-banner__dot" />
          <span class="noya-hero-banner__dot" />
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-hero-banner {
  background: var(--bg-base);
  padding: 8px 0 24px;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  &__card {
    position: relative;
    border-radius: var(--radius-xl); // kingdom DNA：圖片容器級別大圓角
    padding: var(--space-2xl) var(--space-3xl);
    overflow: hidden;

    // kingdom shadow stack：var(--shadow-xl) 大型容器 + 黑色 alpha 玻璃陰影 + 內亮邊
    // 外層走 theme 色相帶色光 (shadow-xl)，第二層深灰加強立體感，最後 inset 模仿玻璃高光
    box-shadow:
      var(--shadow-xl),
      0 12px 28px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    min-height: 260px;
    display: flex;
    align-items: center;
    transition:
      transform var(--transition-slow),
      box-shadow var(--transition-slow);

    &:hover {
      transform: translateY(-4px);

      // kingdom hover：陰影向外擴張一階（變 lg→xl 增強），保留內亮邊
      box-shadow:
        var(--shadow-xl),
        0 18px 36px rgba(0, 0, 0, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.18);
    }

    // 左 banner：深底（token 控制，配色變動只改 _tokens.scss）
    // 多疊一層暗角 vignette 強化深度
    &--left {
      background: radial-gradient(
          circle at 100% 100%,
          rgba(0, 0, 0, 0.35) 0%,
          transparent 60%
        ),
        var(--banner-dark-bg);
      color: var(--banner-dark-text);
    }

    // 右 banner：暖色起點 + accent 終點，串成日落漸層
    // 額外多一道高光 highlight 仿玻璃反射
    &--right {
      background: radial-gradient(
          ellipse at 0% 0%,
          rgba(255, 255, 255, 0.4) 0%,
          transparent 50%
        ),
        linear-gradient(
          135deg,
          var(--banner-warm-start) 0%,
          var(--color-accent) 100%
        );
      color: var(--text-primary);
    }
  }

  // 背景裝飾 blob — 雙 banner 共用，營造光暈景深
  &__bg-blob {
    position: absolute;
    width: 280px;
    height: 280px;
    border-radius: var(--radius-circle);
    pointer-events: none;
    filter: blur(50px);
    z-index: 0;

    &--tl {
      top: -100px;
      left: -80px;
      background: rgba(255, 255, 255, 0.12);
    }

    &--br {
      bottom: -120px;
      right: -100px;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__copy {
    flex: 1;
    z-index: 2;
    max-width: 55%;
    position: relative;

    &--right {
      max-width: 58%;
    }
  }

  // eyebrow：右 banner 的 LIVE CASINO 小英文 label
  &__eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 4px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.18);
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 34px;
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 14px;
    letter-spacing: 3px;

    &--accent {
      color: var(--color-primary);
      text-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);
    }

    // 白字大標題：右 banner 用，與粉橘漸層形成高對比
    &--white {
      color: #ffffff;
      text-shadow:
        0 2px 8px rgba(0, 0, 0, 0.25),
        0 4px 16px rgba(255, 255, 255, 0.3);
    }
  }

  &__desc {
    font-size: 13px;
    line-height: 1.6;
    opacity: 0.92;
    margin: 0 0 20px;
  }

  // provider 4×2 小圓徽章（右 banner）
  &__provider-grid {
    display: grid;
    grid-template-columns: repeat(4, 36px);
    gap: 10px 12px;
    margin-top: 4px;
  }

  &__provider-cell {
    display: flex;
    align-items: center;
    justify-content: center;

    // 用 ProviderBadge 的 sm size，再加一圈白色背景作為原站效果
    :deep(.provider-badge) {
      width: 32px;
      height: 32px;
      font-size: 11px;
      border-radius: var(--radius-circle);
      box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
  }

  &__cta {
    // kingdom DNA：pill 形 CTA + filter brightness hover + var token 化
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: none;
    border-radius: var(--radius-pill);
    padding: 10px 22px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: var(--shadow-md);
    transition: filter var(--transition-fast);

    &:hover {
      filter: var(--filter-hover-soft);
    }

    // 實心橘金漸層按鈕：左 banner 「桌機下載」用
    // 對齊原站視覺：較大字、較粗 padding、白字
    &--solid {
      padding: 11px 26px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 2px;
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
  }

  // 純 CSS phone mockup
  &__phone {
    position: absolute;
    right: 28px;
    bottom: -20px;
    width: 130px;
    height: 240px;
    transform: rotate(-8deg);
  }

  &__phone-frame {
    width: 100%;
    height: 100%;

    // device frame 顏色集中在 token，variants 可單獨覆寫淺色 frame
    background: var(--device-frame-bg);
    border-radius: 24px;
    padding: 8px;
    box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.35),
      inset 0 0 0 2px var(--device-frame-inner);
    position: relative;
  }

  &__phone-notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 6px;
    background: #000000;
    border-radius: 3px;
    z-index: 2;
  }

  &__phone-screen {
    width: 100%;
    height: 100%;

    // 螢幕內漸層走 token；variants 切配色時可單獨換暖 / 冷 / 中性
    background: var(--device-screen-overlay);
    border-radius: 18px;
    padding: 24px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__phone-row {
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;

    &--w70 {
      width: 70%;
    }

    &--w50 {
      width: 50%;
    }
  }

  &__phone-tiles {
    flex: 1;
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;

    span {
      background: rgba(255, 255, 255, 0.6);
      border-radius: 6px;
    }
  }

  // 右 banner 真人剪影
  &__avatar-wrap {
    position: absolute;
    right: 20px;
    bottom: 0;
    width: 160px;
    height: 100%;
    z-index: 1;
    display: flex;
    align-items: flex-end;

    // 把 avatar 固定到右下並修剪溢出
    :deep(.avatar-silhouette) {
      width: 100%;
      height: 110%;
      border-radius: 16px 16px 0 0;
    }
  }

  &__dots {
    position: absolute;
    right: 20px;
    top: 16px;
    display: flex;
    gap: 6px;
    z-index: 3;
  }

  &__dot {
    // kingdom DNA #12：banner swiper pagination 走白圓點
    //   非選中：rgba(255,255,255,0.55) — 半透明白
    //   active：純白 #ffffff（kingdom .swiper-pagination-bullet-active）
    // 為何不再用 var(--color-primary)：banner 內部背景已是主色漸層，
    // active dot 用主色會與底融在一起；白色與底有最高對比
    width: 6px;
    height: 6px;
    border-radius: var(--radius-circle);
    background: rgba(255, 255, 255, 0.55);

    &--on {
      background: #ffffff;
      width: 16px;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }

  // 手機版：單欄堆疊
  &--mobile {
    padding: 12px 0;

    .noya-hero-banner__inner {
      grid-template-columns: 1fr;
      padding: 0 16px;
      gap: 12px;
    }

    .noya-hero-banner__card {
      padding: 20px 18px;
      min-height: 160px;
    }

    .noya-hero-banner__title {
      font-size: 22px;
    }

    .noya-hero-banner__desc {
      font-size: 12px;
    }

    .noya-hero-banner__phone {
      width: 90px;
      height: 160px;
      right: 12px;
      bottom: -10px;
    }

    .noya-hero-banner__avatar-wrap {
      width: 100px;
    }

    // mobile 飛幣縮小（避免遮 CTA），位置略貼右邊
    .noya-hero-banner__coin--single {
      width: 50px;
      bottom: 8px;
      left: 8px;
    }

    .noya-hero-banner__coin--stack {
      width: 40px;
      top: 14px;
      right: 50px;
    }
  }

  // ─────────────── Round 9：金幣 PNG 立體裝飾 ───────────────
  // 走輕微 floating 動畫 + drop-shadow，呼應 kingdom DNA 立體金屬感
  // stylelint-disable-next-line no-descending-specificity
  &__coin {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))
      drop-shadow(0 0 12px rgba(255, 216, 77, 0.4));
    user-select: none;

    // stylelint-disable-next-line no-descending-specificity
    &--single {
      // 左下角獨立一枚，輕微傾斜
      width: 80px;
      bottom: 16px;
      left: 16px;
      transform: rotate(-12deg);
      animation: noya-coin-float-a 3.2s ease-in-out infinite;
    }

    // stylelint-disable-next-line no-descending-specificity
    &--stack {
      // 右上角兩枚堆疊，斜向飛入
      width: 64px;
      top: 18px;
      right: 90px;
      transform: rotate(8deg);
      animation: noya-coin-float-b 2.8s ease-in-out infinite;
    }
  }
}

// 兩道相位錯開的 floating，避免雙金幣同步上下太機械
@keyframes noya-coin-float-a {
  0%,
  100% {
    transform: rotate(-12deg) translateY(0);
  }

  50% {
    transform: rotate(-12deg) translateY(-6px);
  }
}

@keyframes noya-coin-float-b {
  0%,
  100% {
    transform: rotate(8deg) translateY(0);
  }

  50% {
    transform: rotate(8deg) translateY(-8px);
  }
}
</style>
