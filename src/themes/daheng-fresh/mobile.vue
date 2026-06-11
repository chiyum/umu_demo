<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  CAT_BUBBLES,
  CAT_TITLE,
  CAT_TAG,
  GAMES,
  WINNERS,
  JACKPOT,
  PROMOS,
  NOTICE,
  FOOTER_LINKS,
  FOOTER_FINE,
  BOTTOM_TABS
} from "./_data";

/**
 * daheng-fresh（a15 大亨清新活力）手機版
 * 1:1 對齊 大亨_AWD_版型C_清新活力.html 的 <960px 佈局。
 *
 * 對齊原稿手機結構（topbar nav + hero 右側 sideStack 在手機隱藏）：
 *   topbar（logo + 註冊/登入）→ hero 大圖（單欄）→ notice
 *   → bubbles 分類氣泡（左對齊可橫滾）→ jackpot 彩金池橫條
 *   → 遊戲大廳（標題依分類 + grid 2 欄）→ 中獎跑馬 winners
 *   → 優惠活動（promo 卡，手機橫向圖示+文字+領取鈕排列）→ app banner（縱向）
 *   → footer → 浮動圓角底部 5 格 tab（中間骰子凸出 CTA）
 *
 * 與桌機共用 _data。Logo 接 themeStore.currentLogo。
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
const gridTitle = computed(() => CAT_TITLE[activeCat.value] ?? "熱門推薦");

const fmt = (n: number) => n.toLocaleString("en-US");
const winnerLoop = computed(() => [...WINNERS, ...WINNERS]);
</script>

<template>
  <div class="fresh-m">
    <header class="fresh-m-topbar">
      <div class="fresh-m-topbar__logo">
        <img :src="logoSrc" :alt="logoLabel" />
        <b>大亨娛樂城</b>
      </div>
      <span class="fresh-m-topbar__spacer"></span>
      <button type="button" class="fresh-m-btn fresh-m-btn--soft">註冊</button>
      <button type="button" class="fresh-m-btn fresh-m-btn--blue">登入</button>
    </header>

    <div class="fresh-m-wrap">
      <!-- Hero（單欄，sideStack 在手機隱藏） -->
      <section class="fresh-m-hero">
        <div class="fresh-m-hero__slide">
          <img :src="heroSrc" alt="首存1000送1000" />
        </div>
        <div class="fresh-m-hero__dots">
          <span class="fresh-m-hero__dot fresh-m-hero__dot--on"></span>
          <span class="fresh-m-hero__dot"></span>
          <span class="fresh-m-hero__dot"></span>
        </div>
      </section>

      <!-- notice -->
      <div class="fresh-m-notice">
        <span class="fresh-m-notice__ico">🔔</span>
        <div class="fresh-m-notice__clip">
          <span class="fresh-m-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 分類氣泡 -->
      <div class="fresh-m-bubbles">
        <button
          v-for="c in CAT_BUBBLES"
          :key="c.id"
          type="button"
          class="fresh-m-bubble"
          :class="{ 'fresh-m-bubble--on': activeCat === c.id }"
          @click="activeCat = c.id"
        >
          <span class="fresh-m-bubble__ic">{{ c.icon }}</span>
          <span class="fresh-m-bubble__label">{{ c.label }}</span>
        </button>
      </div>

      <!-- 彩金池 -->
      <div class="fresh-m-jackpot">
        <div>
          <div class="fresh-m-jackpot__label">GRAND JACKPOT 累積彩金</div>
          <div class="fresh-m-jackpot__num">NT$ {{ fmt(JACKPOT) }}</div>
        </div>
        <button
          type="button"
          class="fresh-m-btn fresh-m-btn--orange fresh-m-jackpot__cta"
        >
          試試手氣
        </button>
      </div>

      <!-- 遊戲大廳 -->
      <section class="fresh-m-sec">
        <div class="fresh-m-sec__head">
          <span class="fresh-m-sec__dot"></span>
          <h3 class="fresh-m-sec__title">{{ gridTitle }}</h3>
          <a class="fresh-m-sec__more" href="#" @click.prevent>看全部 ›</a>
        </div>
        <div class="fresh-m-grid">
          <a
            v-for="g in visibleGames"
            :key="g.name"
            class="fresh-m-gcard"
            href="#"
            @click.prevent
          >
            <span class="fresh-m-gcard__tag">{{ CAT_TAG[g.cat] }}</span>
            <span v-if="g.hot" class="fresh-m-gcard__hotdot">HOT</span>
            <div class="fresh-m-gcard__ph">
              <img :src="g.img" :alt="g.name" />
            </div>
            <div class="fresh-m-gcard__meta">
              <span class="fresh-m-gcard__t">
                <b>{{ g.name }}</b
                ><em>{{ g.en }}</em>
              </span>
              <span class="fresh-m-gcard__go">›</span>
            </div>
          </a>
        </div>
      </section>

      <!-- 中獎跑馬 -->
      <section class="fresh-m-sec">
        <div class="fresh-m-sec__head">
          <span class="fresh-m-sec__dot"></span>
          <h3 class="fresh-m-sec__title">大家都在中獎</h3>
        </div>
        <div class="fresh-m-winners">
          <div class="fresh-m-winners__track">
            <span v-for="(w, i) in winnerLoop" :key="i" class="fresh-m-wchip">
              <span class="fresh-m-wchip__av">{{ w.name.charAt(0) }}</span>
              <span class="fresh-m-wchip__txt">
                {{ w.name }} 在{{ w.game }}贏得 <b>NT$ {{ fmt(w.amount) }}</b>
              </span>
            </span>
          </div>
        </div>
      </section>

      <!-- 優惠活動 -->
      <section class="fresh-m-sec">
        <div class="fresh-m-sec__head">
          <span class="fresh-m-sec__dot"></span>
          <h3 class="fresh-m-sec__title">優惠活動</h3>
          <a class="fresh-m-sec__more" href="#" @click.prevent>更多 ›</a>
        </div>
        <div class="fresh-m-promo">
          <div v-for="p in PROMOS" :key="p.title" class="fresh-m-pcard">
            <span
              class="fresh-m-pcard__ic"
              :class="`fresh-m-pcard__ic--${p.colorClass}`"
            >
              {{ p.icon }}
            </span>
            <span class="fresh-m-pcard__txt">
              <b>{{ p.title }}</b
              ><span>{{ p.desc }}</span>
            </span>
            <button
              type="button"
              class="fresh-m-btn fresh-m-btn--blue fresh-m-pcard__cta"
            >
              領取
            </button>
          </div>
        </div>
      </section>

      <!-- App banner -->
      <section class="fresh-m-app">
        <div>
          <h4 class="fresh-m-app__title">大亨 APP 隨身玩 📱</h4>
          <p class="fresh-m-app__desc">
            掃碼下載，支援 iOS / Android，生物辨識極速登入
          </p>
        </div>
        <div class="fresh-m-app__row">
          <button type="button" class="fresh-m-btn fresh-m-app__btn-line">
            App Store
          </button>
          <button type="button" class="fresh-m-btn fresh-m-app__btn-line">
            Android APK
          </button>
          <button type="button" class="fresh-m-btn fresh-m-app__btn-white">
            掃碼下載
          </button>
        </div>
      </section>

      <footer class="fresh-m-footer">
        <div class="fresh-m-footer__cols">
          <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
            l
          }}</a>
        </div>
        <p class="fresh-m-footer__fine">
          {{ FOOTER_FINE }}<br />© 2026 TYCOON Entertainment. All rights
          reserved.
        </p>
      </footer>
    </div>

    <!-- 浮動圓角底部 5 格 tab -->
    <nav class="fresh-m-bottomnav">
      <a
        v-for="t in BOTTOM_TABS"
        :key="t.label"
        class="fresh-m-bottomnav__item"
        :class="{
          'fresh-m-bottomnav__item--cta': t.cta,
          'fresh-m-bottomnav__item--on': t.active
        }"
        href="#"
        @click.prevent
      >
        <span class="fresh-m-bottomnav__ic">{{ t.icon }}</span
        >{{ t.label }}
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.fresh-m {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

.fresh-m-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px 110px;
}

.fresh-m-btn {
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
.fresh-m-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

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

  &__spacer {
    flex: 1;
  }
}

// hero
.fresh-m-hero {
  position: relative;
  margin-top: 16px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);

  &__slide {
    aspect-ratio: 1065 / 438;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);

    &--on {
      width: 22px;
      border-radius: 5px;
      background: #ffffff;
    }
  }
}

// notice
.fresh-m-notice {
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
    animation: fresh-m-run 18s linear infinite;
  }
}

@keyframes fresh-m-run {
  to {
    transform: translateX(-100%);
  }
}

// 分類氣泡（手機左對齊橫滾）
.fresh-m-bubbles {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-top: 18px;
  padding: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.fresh-m-bubble {
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
.fresh-m-jackpot {
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

  &__label {
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    font-weight: 800;
    opacity: 0.85;
  }

  &__num {
    font-size: clamp(1.5rem, 7vw, 2.3rem);
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }

  &__cta {
    margin-left: auto;
  }
}

// section
.fresh-m-sec {
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

// 遊戲卡（2 欄）
.fresh-m-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.fresh-m-gcard {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  position: relative;
  text-decoration: none;
  color: inherit;

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
.fresh-m-winners {
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
    animation: fresh-m-wtrack 26s linear infinite;
  }
}

@keyframes fresh-m-wtrack {
  to {
    transform: translateX(-50%);
  }
}

.fresh-m-wchip {
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

// 優惠卡（手機橫向：圖示 + 文字 + 領取鈕）
.fresh-m-promo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.fresh-m-pcard {
  border-radius: var(--radius);
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: center;

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
  }
}

// App banner（手機縱向）
.fresh-m-app {
  margin-top: 32px;
  border-radius: calc(var(--radius) + 6px);
  overflow: hidden;
  position: relative;
  background: var(--gradient-app);
  color: #ffffff;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
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
    margin-top: 6px;
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
.fresh-m-footer {
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
    }
  }

  &__fine {
    line-height: 1.7;
    opacity: 0.75;
  }
}

// 浮動圓角底部 5 格 tab（對齊原稿 bottomnav 圓角浮島）
.fresh-m-bottomnav {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(10px + env(safe-area-inset-bottom));
  z-index: 60;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(34, 50, 74, 0.18);
  padding: 8px 6px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 0.66rem;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;
    padding: 3px 0;

    &--on {
      color: var(--blue-deep);
    }
  }

  &__ic {
    font-size: 1.15rem;
    line-height: 1;
  }

  // 中間「首頁」凸出 CTA 球（橘）
  &__item--cta &__ic {
    width: 46px;
    height: 46px;
    margin-top: -26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-orange);
    color: #ffffff;
    font-size: 1.25rem;
    box-shadow: 0 8px 20px rgba(220, 120, 40, 0.45);
    border: 4px solid var(--bg-base);
  }
}
</style>
