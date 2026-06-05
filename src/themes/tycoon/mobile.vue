<script setup lang="ts">
import TycoonMobileHeader from "./sections/tycoon-mobile-header.vue";
import TycoonMobileHero from "./sections/tycoon-mobile-hero.vue";
import TycoonMobileMarquee from "./sections/tycoon-mobile-marquee.vue";
import TycoonMobileBody from "./sections/tycoon-mobile-body.vue";
import TycoonMobileTabBar from "./sections/tycoon-mobile-tab-bar.vue";

/**
 * tycoon 手機版佈局 — 對齊使用者設計稿（大亨娛樂城.html）五段結構
 *
 * 由上到下：
 * 1. Header     頂部 logo bar + 註冊/登入按鈕 + 語系國旗
 * 2. Hero       藍冰漸層 banner + 大斜體標語 + 形象圖
 * 3. Marquee    跑馬燈
 * 4. Body       左 6 分類 sidebar + 右 6 張遊戲卡（核心結構）
 * 5. TabBar     底部 5 tab（首頁/優惠/存提/客服/我的，fixed 固定）
 *
 * 為什麼整體背景用 radial-gradient + 對角線冰光條紋：
 * - 對齊設計稿 .phone 的層次：radial 底色 + ::before 條紋
 * - radial: 右上偏亮、左下偏深，模擬「金屬冰光從右上灑下」
 * - 條紋：兩條對角白光，與 hero swoosh 視覺呼應
 *
 * 為什麼不直接搬設計稿的 .phone 寫法：
 * - 設計稿 .phone max-width: 430px + center align 是「展示用塑膠手機殼」效果
 * - 在 demo 站走 mobile 路徑時，已被 awd 路由限縮在 mobile viewport（通常 < 768px）
 *   不需要再用內層 430px 容器框起來；直接用 100% width 鋪滿即可
 * - 條紋 / radial 背景仍保留，是視覺核心識別
 */
</script>

<template>
  <div class="tycoon-m-layout">
    <!-- 對角線冰光條紋 + radial 高光（純裝飾 div，pointer-events: none） -->
    <div class="tycoon-m-layout__streak" aria-hidden="true" />

    <TycoonMobileHeader />

    <main class="tycoon-m-layout__main">
      <TycoonMobileHero />
      <TycoonMobileMarquee />
      <TycoonMobileBody />
    </main>

    <TycoonMobileTabBar />
  </div>
</template>

<style lang="scss" scoped>
.tycoon-m-layout {
  position: relative;
  min-height: 100vh;
  color: var(--text-primary);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;

  // 對齊設計稿 .phone 的 radial + linear 組合背景
  // - radial：右上 #eef6ff → 中冰白 → 偏深冰
  // - linear：整體底色細調，避免 radial 過大導致左下死黑
  background: radial-gradient(
      120% 60% at 80% 0%,
      var(--tycoon-ice-1) 0%,
      var(--tycoon-ice-2) 40%,
      var(--tycoon-ice-3) 100%
    ),
    linear-gradient(180deg, var(--tycoon-ice-1), var(--tycoon-ice-2));
  overflow: hidden;

  // 對角線冰光條紋（對齊設計稿 .phone::before）
  // - 兩條對角線白光：第一條 47% 位置、第二條 66% 位置
  // - opacity 0.6 + pointer-events: none 不擋互動
  // - z-index: 0 確保條紋在所有 section 後面、但仍在 layout background 上方
  &__streak {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: linear-gradient(
        115deg,
        transparent 40%,
        var(--tycoon-streak-1) 47%,
        transparent 52%
      ),
      linear-gradient(
        115deg,
        transparent 60%,
        var(--tycoon-streak-2) 66%,
        transparent 70%
      );
    opacity: 0.6;
  }

  // 所有子層級需高於 streak（z-index 1）
  // 用 > * 統一拉高，避免每個 section 都要寫 position: relative + z-index: 1
  > *:not(&__streak) {
    position: relative;
    z-index: 1;
  }

  &__main {
    flex: 1;

    // 底部留出 tab bar 高度（約 60px + safe-area），避免最後一張遊戲卡被擋
    padding-bottom: calc(96px + env(safe-area-inset-bottom));
  }
}
</style>
