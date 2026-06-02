<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * at99 主視覺 promo banner carousel
 *
 * 設計：
 * - 兩張橫排大 banner，下方分頁圓點
 * - 視覺豐富：CSS 繪製的 token 角色、金幣、霓虹光環
 * - 內容文案完全通用佔位（不抄原站「週年慶」「世足賽」字樣）
 *
 * 為何不用真實 banner 圖：使用者要求避免原站素材，
 * 改以 CSS gradient + 光環 + 文字營造氣勢，足以表達版面結構
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

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
}

function startAuto() {
  stopAuto();
  timer = setInterval(next, 5000);
}

function stopAuto() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function goTo(idx: number) {
  activeIdx.value = idx;
  startAuto();
}

onMounted(() => startAuto());
onBeforeUnmount(() => stopAuto());
</script>

<template>
  <section class="at99-promo-c" :class="{ 'at99-promo-c--mobile': mobile }">
    <div class="at99-promo-c__inner">
      <div class="at99-promo-c__viewport">
        <div class="at99-promo-c__track" :style="trackStyle">
          <article
            v-for="s in slides"
            :key="s.key"
            class="at99-promo-c__slide"
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
                v-for="i in 3"
                :key="i"
                class="at99-promo-c__coin"
                :style="{ '--coin-delay': `${i * 0.3}s` }"
              />
              <span class="at99-promo-c__halo" />
            </div>
          </article>
        </div>
      </div>

      <!-- 分頁圓點 -->
      <div class="at99-promo-c__dots">
        <button
          v-for="(s, i) in slides"
          :key="s.key"
          type="button"
          class="at99-promo-c__dot"
          :class="{ 'at99-promo-c__dot--on': activeIdx === i }"
          :aria-label="`第 ${i + 1} 張`"
          @click="goTo(i)"
        />
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

  &__viewport {
    overflow: hidden;
    border-radius: 14px;
    box-shadow: var(--shadow);
  }

  &__track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__slide {
    flex: 0 0 100%;
    min-height: 240px;
    position: relative;
    padding: 36px 44px;
    display: flex;
    align-items: center;
    color: #ffffff;
    overflow: hidden;
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

  &__dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: var(--border);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 24px;
      border-radius: 4px;
      background: var(--color-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &--mobile {
    // mobile 不留 dock 空間：padding 直接覆寫，左右 0 等同移除 dock-offset
    padding: 16px 0 8px;

    .at99-promo-c__inner {
      padding: 0 16px;
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
