<script setup lang="ts">
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";

/**
 * noya 雙 banner hero：左 phone promo + 右 live casino
 *
 * 設計：
 * - 左 banner：深綠藍底，左側標題副標，右側 phone mockup（純 CSS 繪製）
 * - 右 banner：粉色漸層，含真人剪影，可橫向 swipe 視覺暗示
 * - 兩 banner 都帶圓角、陰影、立體感
 * - 完全不用真實圖檔，phone mockup 與真人剪影都是程式繪製
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
</script>

<template>
  <section
    class="noya-hero-banner"
    :class="{ 'noya-hero-banner--mobile': mobile }"
  >
    <div class="noya-hero-banner__inner">
      <!-- 左 banner：phone promo -->
      <article class="noya-hero-banner__card noya-hero-banner__card--left">
        <div class="noya-hero-banner__copy">
          <h3 class="noya-hero-banner__title">隨時隨地</h3>
          <p class="noya-hero-banner__desc">
            最齊全的精選娛樂，<br />
            支援行動裝置即刻體驗。
          </p>
          <button type="button" class="noya-hero-banner__cta">立即體驗</button>
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

      <!-- 右 banner：live casino -->
      <article class="noya-hero-banner__card noya-hero-banner__card--right">
        <div class="noya-hero-banner__copy noya-hero-banner__copy--right">
          <h3 class="noya-hero-banner__title noya-hero-banner__title--accent">
            LIVE CASINO
          </h3>
          <p class="noya-hero-banner__desc">
            真人視訊．沉浸體驗<br />
            專業荷官 24 小時不打烊
          </p>
          <button type="button" class="noya-hero-banner__cta">立即進入</button>
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
    border-radius: 18px;
    padding: 28px 32px;
    overflow: hidden;
    box-shadow: var(--shadow);
    min-height: 220px;
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

    // 左 banner：深底（token 控制，配色變動只改 _tokens.scss）
    &--left {
      background: var(--banner-dark-bg);
      color: var(--banner-dark-text);
    }

    // 右 banner：暖色起點 + accent 終點，串成日落漸層
    &--right {
      background: linear-gradient(
        135deg,
        var(--banner-warm-start) 0%,
        var(--color-accent) 100%
      );
      color: var(--text-primary);
    }
  }

  &__copy {
    flex: 1;
    z-index: 2;
    max-width: 55%;

    &--right {
      max-width: 60%;
    }
  }

  &__title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 12px;
    letter-spacing: 2px;

    &--accent {
      color: var(--color-primary);
      text-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);
    }
  }

  &__desc {
    font-size: 13px;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0 0 20px;
  }

  &__cta {
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: none;
    border-radius: 999px;
    padding: 10px 22px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: var(--shadow);

    &:hover {
      filter: brightness(1.05);
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
    background: #000;
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
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);

    &--on {
      background: var(--color-primary);
      width: 16px;
      border-radius: 3px;
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
  }
}
</style>
