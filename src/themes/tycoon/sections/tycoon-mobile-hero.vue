<script setup lang="ts">
// hero 圖借用 ant-sport banner（藍色 / 中性運動風，色調適合藍冰版型）
// 任務要求「不要新增任何外部圖檔」，從現有 assets 借用色調搭得起來的素材
// banner-2 / banner-3 是藍底圖，這裡借 banner-3（畫面有橘藍對比，當人物形象 placeholder）
import heroFigure from "@/themes/ant-sport/assets/banner/banner-3.jpg?url";

/**
 * tycoon mobile hero banner
 *
 * 對齊使用者設計稿 .hero 段：
 * - 高度 200px 圓角卡片，左 22 top 30 放大斜體標語
 * - 右側上中下三個 placeholder（真人主播 / 禮盒 / 吉祥物）→ demo 借 ant-sport banner 當形象圖
 * - 整面疊白光 swoosh 對角線（mix-blend-mode: screen 強化冰光感）
 * - 大字「歡迎獎金」用 Inter italic 900 + 漸層底色 + drop-shadow + 1.5px 描邊
 *
 * 為什麼把 hero 切成獨立 section 而非整入 header：
 * - 設計稿原本就是「header / hero / marquee / body / tabbar」五段獨立
 * - 拆檔讓 mobile.vue 整潔，每段 < 200 行
 *
 * 為什麼 hero 標語改成「歡迎獎金 大亨等你」而非「首存 1000 送 1000」：
 * - 任務描述要求改成中性，避免具體金額（可能被誤認為真實賭場宣傳）
 * - 維持兩行斜體大字的設計骨架不變
 */

interface HeroLine {
  key: string;
  text: string;
}

const lines: HeroLine[] = [
  { key: "l1", text: "歡迎獎金" },
  { key: "l2", text: "大亨等你" }
];
</script>

<template>
  <section class="tycoon-m-hero" aria-label="首頁主視覺">
    <!-- 冰光 swoosh：兩條對角線白光疊在 hero 上強化「藍冰光感」-->
    <div class="tycoon-m-hero__swoosh" aria-hidden="true" />

    <!-- 標語：兩行斜體大字（設計稿用 Inter italic 900 + 漸層 + 描邊） -->
    <div class="tycoon-m-hero__copy">
      <b v-for="line in lines" :key="line.key" class="tycoon-m-hero__copy-line">
        {{ line.text }}
      </b>
    </div>

    <!--
      右上 figure：人物形象 placeholder
      設計稿用 dashed border + 條紋底色當「未上圖」標記，
      改用既有 banner 圖填入，視覺更完整；右上角用 mask 漸隱讓圖自然融入
    -->
    <div class="tycoon-m-hero__figure" aria-hidden="true">
      <img
        :src="heroFigure"
        alt=""
        class="tycoon-m-hero__figure-img"
        loading="lazy"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊設計稿 .hero 規格：margin: 6px 14px 0 / height: 200px / radius: 18px
// 漸層底：radial-gradient(120% 120% at 75% 30%, #bfe0ff → #6db4f5 → #2a78dd)
.tycoon-m-hero {
  position: relative;
  margin: 6px 14px 0;
  height: 200px;
  border-radius: 18px;
  overflow: hidden;
  background: radial-gradient(
    120% 120% at 75% 30%,
    var(--tycoon-ice-1) 0%,
    var(--primary-03) 45%,
    var(--primary-07) 100%
  );
  box-shadow:
    0 8px 22px rgba(20, 70, 160, 0.3),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.4);

  // 冰光 swoosh：對角線白光 + radial 高光，對齊設計稿 .hero .swoosh
  // mix-blend-mode: screen 把白光與下方漸層混合，營造金屬冰光感
  &__swoosh {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        60% 90% at 18% 30%,
        var(--tycoon-streak-1),
        transparent 60%
      ),
      linear-gradient(
        120deg,
        transparent 45%,
        var(--tycoon-streak-1) 52%,
        transparent 58%
      );
    mix-blend-mode: screen;
    pointer-events: none;
  }

  // 標語容器（對齊 .hero .copy 規格 left: 22 top: 30）
  &__copy {
    position: absolute;
    top: 28px;
    left: 22px;
    z-index: 3;
    color: #ffffff;
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 900;
    line-height: 0.92;
    pointer-events: none;
  }

  // 單行標語（設計稿 .hero .copy b）
  // - font-size 52px 太大改成 44px 適合 mobile viewport（避免吃滿 placeholder）
  // - 漸層底色 + 文字描邊 + drop-shadow
  &__copy-line {
    display: block;
    font-size: 44px;
    letter-spacing: 1px;

    // 漸層文字：白頂 → 淺藍 → 中藍
    background: linear-gradient(
      180deg,
      #ffffff 30%,
      var(--tycoon-ice-1) 75%,
      var(--primary-03)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;

    // 描邊（讓白字落在淺色漸層上仍可讀）
    -webkit-text-stroke: 1.5px var(--tycoon-hero-stroke);
    filter: drop-shadow(0 3px 2px rgba(8, 40, 100, 0.5))
      drop-shadow(0 1px 0 #2160c0);

    & + & {
      margin-top: 2px;
    }
  }

  // 右側 figure：人物形象圖
  // - 設計稿是 placeholder 條紋底色 dashed border，這裡用真實圖檔填入更精緻
  // - mask 漸隱讓圖只在右側可見，避免擠壓左側標語
  &__figure {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60%;
    z-index: 1;

    // mask 從左→右逐漸顯現：左 50% 透明，右側完全顯現
    mask-image: linear-gradient(90deg, transparent 0%, #000000 60%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000000 60%);
  }

  &__figure-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center right;

    // 偏冷藍混色：把借用的非藍冰系圖檔色相往藍冰拉
    // 用 multiply 而非 hue-rotate：multiply 保留圖細節只壓色溫，hue-rotate 會把皮膚色洗掉
    mix-blend-mode: luminosity;
    opacity: 0.85;
  }
}
</style>
