<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useHeroCarousel } from "@/utils/use-hero-carousel";
import {
  heroSrc,
  HERO_SLIDES,
  TOP_NAV,
  HERO_MINIS,
  CAT_BUBBLES,
  CAT_TITLE,
  CAT_TAG,
  GAMES,
  WINNERS,
  JACKPOT,
  PROMOS,
  NOTICE,
  FOOTER_LINKS,
  FOOTER_FINE
} from "./_data";

/**
 * daheng-fresh（a15 大亨清新活力）桌面版
 * 1:1 對齊 大亨_AWD_版型C_清新活力.html 的 ≥960px 佈局。
 *
 * 對齊原稿桌機結構（淺色藍白系，無 sidebar）：
 *   topbar（logo + 水平 nav 5 項 + 註冊/登入）
 *   → heroRow（左 hero 大圖 2.1fr + 右 sideStack 2 張漸層 mini 1fr）
 *   → notice 跑馬燈 → bubbles 分類氣泡（置中）→ jackpot 彩金池橫條
 *   → 遊戲大廳（標題依分類動態 + grid 4 欄）→ 中獎跑馬 winners
 *   → 優惠活動（promo 3 卡，桌機縱向排列）→ app banner（橫向）→ footer
 *
 * Logo 接 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("hot");
const visibleGames = computed(() =>
  GAMES.filter((g) =>
    activeCat.value === "hot" ? g.hot : g.cat === activeCat.value
  )
);
/** 大廳標題依分類動態（對齊原稿 gridTitle） */
const gridTitle = computed(() => CAT_TITLE[activeCat.value] ?? "熱門推薦");

const fmt = (n: number) => n.toLocaleString("en-US");
/** 中獎跑馬複製一輪做無縫滾動（對齊原稿 chips + chips） */
const winnerLoop = computed(() => [...WINNERS, ...WINNERS]);

/** Hero 輪播（3 slide 自動播 4.5 秒，對齊原稿 setInterval(4500)） */
const { activeIdx: heroIdx, select: selectHero } = useHeroCarousel(
  HERO_SLIDES.length,
  4500
);
</script>

<template>
  <div class="fresh">
    <header class="fresh-topbar">
      <div class="fresh-topbar__inner">
        <div class="fresh-topbar__logo">
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨娛樂城</b>
        </div>
        <nav class="fresh-topbar__nav">
          <a
            v-for="n in TOP_NAV"
            :key="n.label"
            class="fresh-topbar__link"
            :class="{ 'fresh-topbar__link--on': n.active }"
            href="#"
            @click.prevent
          >
            {{ n.label }}
          </a>
        </nav>
        <span class="fresh-topbar__spacer"></span>
        <button type="button" class="fresh-btn fresh-btn--soft">註冊</button>
        <button type="button" class="fresh-btn fresh-btn--blue">登入</button>
      </div>
    </header>

    <div class="fresh-wrap">
      <!-- heroRow：hero + sideStack -->
      <div class="fresh-hero-row">
        <section class="fresh-hero">
          <div
            class="fresh-hero__slides"
            :style="{ transform: `translateX(-${heroIdx * 100}%)` }"
          >
            <div
              v-for="(slide, i) in HERO_SLIDES"
              :key="i"
              class="fresh-hero__slide"
              :class="
                slide.kind === 'grad'
                  ? [
                      'fresh-hero__slide--grad',
                      `fresh-hero__slide--${slide.variant}`
                    ]
                  : []
              "
            >
              <img
                v-if="slide.kind === 'image'"
                :src="heroSrc"
                alt="首存1000送1000"
              />
              <template v-else>
                <span class="fresh-hero__kicker">{{ slide.kicker }}</span>
                <h2 class="fresh-hero__title">
                  <template v-for="(line, li) in slide.titleLines" :key="li">
                    {{ line }}<br v-if="li < slide.titleLines.length - 1" />
                  </template>
                </h2>
                <p class="fresh-hero__desc">{{ slide.desc }}</p>
              </template>
            </div>
          </div>
          <div class="fresh-hero__dots">
            <button
              v-for="(slide, i) in HERO_SLIDES"
              :key="i"
              type="button"
              class="fresh-hero__dot"
              :class="{ 'fresh-hero__dot--on': heroIdx === i }"
              :aria-label="`切換到第 ${i + 1} 張`"
              @click="selectHero(i)"
            ></button>
          </div>
        </section>
        <div class="fresh-side">
          <a
            v-for="m in HERO_MINIS"
            :key="m.title"
            class="fresh-side__mini"
            :class="`fresh-side__mini--${m.variant}`"
            href="#"
            @click.prevent
          >
            <b>{{ m.title }}</b>
            <span>{{ m.desc }}</span>
            <span class="fresh-side__arrow">›</span>
          </a>
        </div>
      </div>

      <!-- notice -->
      <div class="fresh-notice">
        <span class="fresh-notice__ico">🔔</span>
        <div class="fresh-notice__clip">
          <span class="fresh-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 分類氣泡 -->
      <div class="fresh-bubbles">
        <button
          v-for="c in CAT_BUBBLES"
          :key="c.id"
          type="button"
          class="fresh-bubble"
          :class="{ 'fresh-bubble--on': activeCat === c.id }"
          @click="activeCat = c.id"
        >
          <span class="fresh-bubble__ic">{{ c.icon }}</span>
          <span class="fresh-bubble__label">{{ c.label }}</span>
        </button>
      </div>

      <!-- 彩金池橫條 -->
      <div class="fresh-jackpot">
        <div>
          <div class="fresh-jackpot__label">GRAND JACKPOT 累積彩金</div>
          <div class="fresh-jackpot__num">NT$ {{ fmt(JACKPOT) }}</div>
        </div>
        <button
          type="button"
          class="fresh-btn fresh-btn--orange fresh-jackpot__cta"
        >
          試試手氣
        </button>
      </div>

      <!-- 遊戲大廳 -->
      <section class="fresh-sec">
        <div class="fresh-sec__head">
          <span class="fresh-sec__dot"></span>
          <h3 class="fresh-sec__title">{{ gridTitle }}</h3>
          <a class="fresh-sec__more" href="#" @click.prevent>看全部 ›</a>
        </div>
        <div class="fresh-grid">
          <a
            v-for="g in visibleGames"
            :key="g.name"
            class="fresh-gcard"
            href="#"
            @click.prevent
          >
            <span class="fresh-gcard__tag">{{ CAT_TAG[g.cat] }}</span>
            <span v-if="g.hot" class="fresh-gcard__hotdot">HOT</span>
            <div class="fresh-gcard__ph">
              <img :src="g.img" :alt="g.name" />
            </div>
            <div class="fresh-gcard__meta">
              <span class="fresh-gcard__t">
                <b>{{ g.name }}</b
                ><em>{{ g.en }}</em>
              </span>
              <span class="fresh-gcard__go">›</span>
            </div>
          </a>
        </div>
      </section>

      <!-- 中獎跑馬 -->
      <section class="fresh-sec">
        <div class="fresh-sec__head">
          <span class="fresh-sec__dot"></span>
          <h3 class="fresh-sec__title">大家都在中獎</h3>
        </div>
        <div class="fresh-winners">
          <div class="fresh-winners__track">
            <span v-for="(w, i) in winnerLoop" :key="i" class="fresh-wchip">
              <span class="fresh-wchip__av">{{ w.name.charAt(0) }}</span>
              <span class="fresh-wchip__txt">
                {{ w.name }} 在{{ w.game }}贏得 <b>NT$ {{ fmt(w.amount) }}</b>
              </span>
            </span>
          </div>
        </div>
      </section>

      <!-- 優惠活動 -->
      <section class="fresh-sec">
        <div class="fresh-sec__head">
          <span class="fresh-sec__dot"></span>
          <h3 class="fresh-sec__title">優惠活動</h3>
          <a class="fresh-sec__more" href="#" @click.prevent>更多 ›</a>
        </div>
        <div class="fresh-promo">
          <div v-for="p in PROMOS" :key="p.title" class="fresh-pcard">
            <span
              class="fresh-pcard__ic"
              :class="`fresh-pcard__ic--${p.colorClass}`"
            >
              {{ p.icon }}
            </span>
            <span class="fresh-pcard__txt">
              <b>{{ p.title }}</b
              ><span>{{ p.desc }}</span>
            </span>
            <button
              type="button"
              class="fresh-btn fresh-btn--blue fresh-pcard__cta"
            >
              領取
            </button>
          </div>
        </div>
      </section>

      <!-- App banner -->
      <section class="fresh-app">
        <div>
          <h4 class="fresh-app__title">大亨 APP 隨身玩 📱</h4>
          <p class="fresh-app__desc">
            掃碼下載，支援 iOS / Android，生物辨識極速登入
          </p>
        </div>
        <div class="fresh-app__row">
          <button type="button" class="fresh-btn fresh-app__btn-line">
            App Store
          </button>
          <button type="button" class="fresh-btn fresh-app__btn-line">
            Android APK
          </button>
          <button type="button" class="fresh-btn fresh-app__btn-white">
            掃碼下載
          </button>
        </div>
      </section>

      <footer class="fresh-footer">
        <div class="fresh-footer__cols">
          <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
            l
          }}</a>
        </div>
        <p class="fresh-footer__fine">
          {{ FOOTER_FINE }}<br />© 2026 TYCOON Entertainment. All rights
          reserved.
        </p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fresh {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

.fresh-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px 70px;
}

// 共用按鈕
.fresh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.12s,
    filter 0.15s;

  &:hover {
    filter: brightness(1.06);
  }

  &:active {
    transform: scale(0.96);
  }

  &--soft {
    background: var(--bg-overlay);
    color: var(--blue-deep);
  }

  &--blue {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 6px 16px rgba(46, 98, 178, 0.3);
  }

  &--orange {
    background: var(--gradient-orange);
    color: var(--cta-ink);
    box-shadow: 0 6px 16px rgba(220, 120, 40, 0.32);
  }
}

// topbar
.fresh-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

  &__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 28px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      height: 38px;
      width: auto;
      object-fit: contain;
    }

    b {
      font-size: 1.05rem;
      color: var(--blue-deep);
      letter-spacing: 0.04em;
    }
  }

  &__nav {
    display: flex;
    gap: 2px;
    margin-left: 14px;
  }

  &__link {
    padding: 9px 15px;
    border-radius: 999px;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.15s;

    &:hover {
      color: var(--blue-deep);
      background: var(--bg-overlay);
    }

    &--on {
      color: var(--cta-ink);
      background: var(--gradient-cta);
    }
  }

  &__spacer {
    flex: 1;
  }
}

// heroRow
.fresh-hero-row {
  display: grid;
  grid-template-columns: 2.1fr 1fr;
  gap: 14px;
  margin-top: 16px;
}

.fresh-hero {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);

  &__slides {
    display: flex;
    transition: transform 0.55s cubic-bezier(0.22, 0.8, 0.3, 1);
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;
    aspect-ratio: 1065 / 438;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    // 漸層文案 slide（對齊原稿 .s-grad，白字疊在藍/橘漸層上）
    &--grad {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 0 7%;
      color: #ffffff;
    }

    &--b1 {
      background: var(--hero-slide-b1);
    }

    &--b2 {
      background: var(--hero-slide-b2);
    }
  }

  &__kicker {
    font-size: clamp(0.72rem, 1.3vw, 0.9rem);
    letter-spacing: 0.22em;
    font-weight: 800;
    opacity: 0.85;
  }

  &__title {
    font-size: clamp(1.4rem, 4vw, 2.8rem);
    line-height: 1.25;
    font-weight: 900;
  }

  &__desc {
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    opacity: 0.85;
  }

  &__dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    gap: 7px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    transition: all 0.2s;

    &--on {
      width: 22px;
      border-radius: 5px;
      background: #ffffff;
    }
  }
}

.fresh-side {
  display: flex;
  flex-direction: column;
  gap: 14px;

  &__mini {
    flex: 1;
    border-radius: var(--radius);
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    color: #ffffff;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
    text-decoration: none;

    b {
      font-size: 1.05rem;
      font-weight: 900;
    }

    span {
      font-size: 0.8rem;
      opacity: 0.85;
    }

    &--m1 {
      background: var(--mini-1);
    }

    &--m2 {
      background: var(--mini-2);
    }
  }

  &__arrow {
    position: absolute;
    right: 16px;
    bottom: 14px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    display: grid;
    place-items: center;
    font-weight: 800;
  }
}

// notice
.fresh-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  font-size: 0.85rem;
  color: var(--text-muted);

  &__ico {
    flex: none;
  }

  &__clip {
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  &__run {
    display: inline-block;
    padding-left: 100%;
    animation: fresh-run 18s linear infinite;
  }
}

@keyframes fresh-run {
  to {
    transform: translateX(-100%);
  }
}

// 分類氣泡
.fresh-bubbles {
  display: flex;
  justify-content: center;
  gap: 14px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-top: 18px;
  padding: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.fresh-bubble {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 76px;
  padding: 10px 0 9px;
  border: none;
  background: transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.15s;

  &__ic {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.25rem;
    background: var(--bg-surface);
    box-shadow: var(--shadow);
    transition: all 0.15s;
  }

  &__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-muted);
  }

  &--on &__ic {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 8px 18px rgba(46, 98, 178, 0.35);
    transform: translateY(-2px);
  }

  &--on &__label {
    color: var(--blue-deep);
  }
}

// 彩金池
.fresh-jackpot {
  margin-top: 18px;
  border-radius: var(--radius);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background: var(--gradient-jackpot);
  color: #ffffff;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -40%;
    left: -10%;
    width: 50%;
    height: 180%;
    transform: rotate(20deg);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.14),
      transparent
    );
    animation: fresh-shine 4s ease-in-out infinite;
  }

  &__label {
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    font-weight: 800;
    opacity: 0.85;
  }

  &__num {
    font-size: clamp(1.5rem, 4vw, 2.3rem);
    font-weight: 900;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }

  &__cta {
    margin-left: auto;
  }
}

@keyframes fresh-shine {
  0%,
  100% {
    left: -30%;
  }

  50% {
    left: 110%;
  }
}

// section
.fresh-sec {
  margin-top: 32px;

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-accent);
  }

  &__title {
    font-size: 1.18rem;
    font-weight: 900;
  }

  &__more {
    margin-left: auto;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
  }
}

// 遊戲卡（淺色 4 欄）
.fresh-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.fresh-gcard {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  transition:
    transform 0.16s,
    box-shadow 0.16s;
  position: relative;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 30px rgba(46, 98, 178, 0.18);
  }

  &__ph {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--bg-overlay);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 14px;
  }

  &__t {
    flex: 1;
    min-width: 0;

    b {
      display: block;
      font-size: 0.95rem;
    }

    em {
      font-style: normal;
      font-size: 0.7rem;
      color: var(--text-muted);
      letter-spacing: 0.1em;
    }
  }

  &__go {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex: none;
    background: var(--bg-overlay);
    color: var(--blue-deep);
    font-weight: 800;
    transition: all 0.15s;
  }

  &:hover &__go {
    background: var(--gradient-orange);
    color: #ffffff;
  }

  &__tag {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    color: var(--blue-deep);
    box-shadow: 0 2px 8px rgba(46, 98, 178, 0.18);
  }

  &__hotdot {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 4px 9px;
    border-radius: 999px;
    background: var(--gradient-orange);
    color: #ffffff;
  }
}

// 中獎跑馬
.fresh-winners {
  display: flex;
  gap: 10px;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000000 6%,
    #000000 94%,
    transparent
  );

  &__track {
    display: flex;
    gap: 10px;
    animation: fresh-wtrack 26s linear infinite;
  }
}

@keyframes fresh-wtrack {
  to {
    transform: translateX(-50%);
  }
}

.fresh-wchip {
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px 9px 10px;
  border-radius: 999px;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  font-size: 0.82rem;

  &__av {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    font-weight: 800;
    color: #ffffff;
    background: var(--gradient-cta);
  }

  &__txt {
    color: var(--text-muted);
    white-space: nowrap;

    b {
      color: var(--color-accent);
      font-variant-numeric: tabular-nums;
    }
  }
}

// 優惠卡（桌機縱向 3 欄）
.fresh-promo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.fresh-pcard {
  border-radius: var(--radius);
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  &__ic {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    flex: none;

    &--c1 {
      background: var(--promo-c1);
    }

    &--c2 {
      background: var(--promo-c2);
    }

    &--c3 {
      background: var(--promo-c3);
    }
  }

  &__txt {
    flex: 1;
    min-width: 0;

    b {
      display: block;
      font-size: 1rem;
    }

    span {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
  }

  &__cta {
    height: 34px;
    padding: 0 14px;
    font-size: 0.8rem;
    flex: none;
    margin-top: 4px;
  }
}

// App banner
.fresh-app {
  margin-top: 32px;
  border-radius: calc(var(--radius) + 6px);
  overflow: hidden;
  position: relative;
  background: var(--gradient-app);
  color: #ffffff;
  padding: 32px 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: var(--shadow);

  &__title {
    font-size: 1.35rem;
    font-weight: 900;
  }

  &__desc {
    font-size: 0.88rem;
    opacity: 0.85;
    margin-top: 4px;
  }

  &__row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__btn-white {
    background: #ffffff;
    color: var(--blue-deep);
  }

  &__btn-line {
    border: 1.5px solid rgba(255, 255, 255, 0.6);
    color: #ffffff;
    background: transparent;
  }
}

// footer
.fresh-footer {
  margin-top: 40px;
  padding: 26px 0 12px;
  color: var(--text-muted);
  font-size: 0.8rem;
  border-top: 1px solid var(--border);

  &__cols {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 30px;
    margin-bottom: 16px;

    a {
      font-weight: 600;
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__fine {
    line-height: 1.7;
    opacity: 0.75;
  }
}
</style>
