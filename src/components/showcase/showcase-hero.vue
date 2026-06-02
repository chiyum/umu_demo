<script setup lang="ts">
/**
 * Showcase Hero — 主頁頂部標題區
 *
 * 設計重點：
 * - 暖金調性：白底奶油色基底 + rose-gold accent 漸層描線 + 角落 radial 柔光
 * - 文案精簡，僅標題 + 副標 + 視覺裝飾，避免占用太多首屏
 * - 完全靜態，無 props / state，純展示元件
 *
 * 為什麼配色直接寫死十六進位而不引 noya tokens：
 * - showcase 不掛 data-theme，CSS var 對它無效
 * - 直接寫死能保證 showcase 視覺穩定不會被 demo 頁切配色影響
 * - 視覺基準對齊 noya 預設 rose-gold（#d4a574 / #f0d4a7 / #faf5ef）
 */
</script>

<template>
  <header class="showcase-hero">
    <!-- 角落柔光裝飾 — 對應 noya 的 bg-decoration 設計語言 -->
    <div class="showcase-hero__decoration" aria-hidden="true" />

    <div class="showcase-hero__inner">
      <div class="showcase-hero__eyebrow">CASINO LANDING DEMO</div>
      <h1 class="showcase-hero__title">示範版型集</h1>
      <p class="showcase-hero__subtitle">
        點選版型卡片快速預覽，或開啟新分頁體驗完整 demo
      </p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.showcase-hero {
  position: relative;
  overflow: hidden;

  // 暖金漸層底，從奶油色淡到玫瑰金 accent
  background: linear-gradient(180deg, #faf5ef 0%, #fef9f1 100%), #ffffff;

  &__decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;

    // 雙 radial 角落柔光：右上玫瑰金 + 左下日落橘
    background: radial-gradient(
        ellipse 800px 600px at 100% 0%,
        rgba(240, 212, 167, 0.55) 0%,
        transparent 60%
      ),
      radial-gradient(
        ellipse 700px 500px at 0% 100%,
        rgba(212, 165, 116, 0.28) 0%,
        transparent 65%
      );
  }

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 96px 32px 80px;
    text-align: center;
  }

  &__eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #b8854a;
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  &__title {
    font-size: 56px;
    font-weight: 700;
    color: #3d3329;
    margin: 0 0 20px;
    line-height: 1.15;

    // 玫瑰金漸層文字，視覺記憶點
    background: linear-gradient(135deg, #b8854a 0%, #d4a574 50%, #f0d4a7 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    font-size: 18px;
    color: #6b5a48;
    margin: 0 auto;
    max-width: 560px;
    line-height: 1.6;
  }
}

@media (width <= 768px) {
  .showcase-hero {
    &__inner {
      padding: 64px 20px 48px;
    }

    &__title {
      font-size: 36px;
    }

    &__subtitle {
      font-size: 15px;
    }
  }
}
</style>
