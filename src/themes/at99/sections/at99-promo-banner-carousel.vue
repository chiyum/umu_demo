<script setup lang="ts">
//
// Round 4 結構對齊：原本的 onMounted / onBeforeUnmount 自動輪播 + activeIdx
// 已不需要，因雙 banner 改為靜態並列同時顯示
//

/**
 * at99 主視覺 promo banner — round 4 對齊原站結構：雙 banner 同列並排
 *
 * 原 at99tw.net PC 是「左 1 大張主 banner + 右 1 張次 banner」同時顯示在同列；
 * 之前實作為「單張輪播 carousel」（一次只看到 1 張）方向不對，本次改為並列。
 *
 * 設計：
 * - PC：grid 2 欄（左 7fr 大 banner + 右 5fr 次 banner），同時可見
 * - Mobile：壓成單欄直疊，避免並排在窄畫面被壓扁
 * - 視覺：CSS 繪製的 token 角色、金幣、霓虹光環（不抄原站素材）
 * - 內容文案完全通用佔位
 *
 * 為何保留檔名 `at99-promo-banner-carousel.vue`：避免改檔名觸發全域 search/replace，
 * 元件 class 維持 `at99-promo-c`（c = carousel），語意上以「promo carousel 區塊」
 * 視之即可。
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface Slide {
  key: string;
  tag: string;
  tagColor: "cyan" | "gold";
  title: string;
  desc: string;
  cta: string;
  /** banner 配色 */
  gradient: string;
  /** 主視覺裝飾文字（大字疊在背景上） */
  decorText: string;
}

// 雙 banner 並列：左大張 (主推) + 右小張 (次推)
const slides: Slide[] = [
  {
    key: "p1",
    tag: "限時活動",
    tagColor: "cyan",
    title: "首存豪禮．百倍回饋",
    desc: "新會員專屬入金加碼，最高加碼 100% 返水",
    cta: "立即參加",
    gradient: "linear-gradient(135deg, #1a3a8f 0%, #6c27d1 50%, #d62b9a 100%)",
    decorText: "MEGA BONUS"
  },
  {
    key: "p2",
    tag: "賽事盤口",
    tagColor: "gold",
    title: "熱門賽事．即時開盤",
    desc: "全球賽事完整覆蓋，多元玩法立即下注",
    cta: "查看賽程",
    gradient: "linear-gradient(135deg, #0e2e6e 0%, #1561c4 60%, #2dd4ff 100%)",
    decorText: "SPORTS LIVE"
  }
];
</script>

<template>
  <section class="at99-promo-c" :class="{ 'at99-promo-c--mobile': mobile }">
    <div class="at99-promo-c__inner">
      <!-- 雙 banner 並列（round 4 對齊原站）：左大張 + 右小張 -->
      <div class="at99-promo-c__row">
        <article
          v-for="(s, i) in slides"
          :key="s.key"
          class="at99-promo-c__slide"
          :class="{
            'at99-promo-c__slide--primary': i === 0,
            'at99-promo-c__slide--secondary': i === 1
          }"
          :style="{ background: s.gradient }"
        >
          <!-- 裝飾大字（背景） -->
          <div class="at99-promo-c__decor" aria-hidden="true">
            {{ s.decorText }}
          </div>

          <!-- 內容 -->
          <div class="at99-promo-c__copy">
            <span
              class="at99-promo-c__tag"
              :class="`at99-promo-c__tag--${s.tagColor}`"
            >
              {{ s.tag }}
            </span>
            <h2 class="at99-promo-c__title">{{ s.title }}</h2>
            <p class="at99-promo-c__desc">{{ s.desc }}</p>
            <button type="button" class="at99-promo-c__cta">
              {{ s.cta }}
            </button>
          </div>

          <!-- 金幣 / token 裝飾（純 CSS） -->
          <div class="at99-promo-c__tokens" aria-hidden="true">
            <span
              v-for="j in 3"
              :key="j"
              class="at99-promo-c__coin"
              :style="{ '--coin-delay': `${j * 0.3}s` }"
            />
            <span class="at99-promo-c__halo" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-promo-c {
  background: var(--bg-base);
  padding: 24px 0 12px;

  // PC：左側 sidebar dock 預留空間，寬度走 token，集中管理
  padding-left: var(--dock-offset);

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  // 雙 banner 並列 row：7fr 大 + 5fr 小
  // 比例貼近原站 at99tw.net PC promo 區（左主推較寬、右次推較窄）
  &__row {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: 16px;
  }

  &__slide {
    min-height: 240px;
    position: relative;
    padding: 36px 44px;
    display: flex;
    align-items: center;
    color: #ffffff;
    overflow: hidden;
    border-radius: 14px;
    box-shadow: var(--shadow);
  }

  &__decor {
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    font-size: 80px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.06);
    letter-spacing: 6px;
    pointer-events: none;
    z-index: 0;
    line-height: 1;
  }

  &__copy {
    flex: 1;
    z-index: 2;
    max-width: 60%;
  }

  &__tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 12px;

    &--cyan {
      background: var(--bg-overlay);
      color: var(--color-primary);
      text-shadow: 0 0 6px var(--color-primary);
      border: 1px solid var(--color-primary);
    }

    &--gold {
      // tag bg / border 用 accent 主色帶 alpha；切換 variants 時跟著走
      background: color-mix(in srgb, var(--color-accent) 18%, transparent);
      color: var(--color-accent);
      text-shadow: 0 0 6px var(--color-accent);
      border: 1px solid color-mix(in srgb, var(--color-accent) 50%, transparent);
    }
  }

  &__title {
    font-size: 30px;
    font-weight: 900;
    margin: 0 0 10px;
    letter-spacing: 2px;
    text-shadow:
      0 2px 4px rgba(0, 0, 0, 0.35),
      0 0 12px rgba(255, 255, 255, 0.2);
  }

  &__desc {
    font-size: 13px;
    line-height: 1.6;
    opacity: 0.92;
    margin: 0 0 18px;
  }

  &__cta {
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    border: none;
    border-radius: 6px;
    padding: 10px 22px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 0 12px var(--color-accent);
    text-transform: uppercase;

    &:hover {
      filter: brightness(1.08);
    }
  }

  // Token 裝飾
  &__tokens {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-50%);
    width: 160px;
    height: 160px;
    z-index: 1;
  }

  &__halo {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 216, 77, 0.4) 0%,
      transparent 60%
    );
    animation: at99-halo-pulse 3s ease-in-out infinite;
  }

  &__coin {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--coin-gradient);
    box-shadow:
      inset 0 -3px 6px rgba(120, 70, 0, 0.5),
      0 4px 12px rgba(0, 0, 0, 0.3);
    animation: at99-coin-float 3s ease-in-out infinite;
    animation-delay: var(--coin-delay, 0s);

    &:nth-child(1) {
      top: 10px;
      left: 20px;
    }

    &:nth-child(2) {
      top: 60px;
      right: 10px;
      width: 56px;
      height: 56px;
    }

    &:nth-child(3) {
      bottom: 10px;
      left: 50px;
      width: 40px;
      height: 40px;
    }
  }

  // 次要 banner 視覺差異：稍微縮小 padding、字級調整，視覺上比主推弱一點
  // stylelint-disable no-descending-specificity
  &__slide--secondary {
    .at99-promo-c__title {
      font-size: 22px;
    }

    .at99-promo-c__desc {
      font-size: 12px;
    }

    .at99-promo-c__copy {
      max-width: 70%;
    }

    .at99-promo-c__tokens {
      width: 110px;
      height: 110px;
    }

    padding: 28px 30px;
  }
  // stylelint-enable no-descending-specificity

  &--mobile {
    // mobile 不留 dock 空間：padding 直接覆寫，左右 0 等同移除 dock-offset
    padding: 16px 0 8px;

    .at99-promo-c__inner {
      padding: 0 16px;
    }

    // 雙 banner 在窄畫面壓單欄直疊，避免並排被壓扁看不清楚
    .at99-promo-c__row {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .at99-promo-c__slide {
      min-height: 180px;
      padding: 22px 20px;
    }

    .at99-promo-c__decor {
      font-size: 50px;
    }

    .at99-promo-c__title {
      font-size: 20px;
    }

    .at99-promo-c__desc {
      font-size: 11px;
    }

    .at99-promo-c__tokens {
      width: 100px;
      height: 100px;
      right: 4%;
    }

    .at99-promo-c__coin {
      width: 32px;
      height: 32px;

      &:nth-child(2) {
        width: 38px;
        height: 38px;
      }

      &:nth-child(3) {
        width: 28px;
        height: 28px;
      }
    }
  }
}

@keyframes at99-coin-float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-8px) rotate(180deg);
  }
}

@keyframes at99-halo-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }

  50% {
    opacity: 0.85;
    transform: scale(1.08);
  }
}
</style>
