<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useHeroCarousel } from "@/utils/use-hero-carousel";
import {
  heroSrc,
  HERO_SLIDES,
  QUICK_ACTIONS,
  GAME_CATS,
  CAT_TAG,
  GAMES,
  PROMOS,
  RANKS,
  NOTICE,
  FOOTER_LINKS,
  FOOTER_FINE,
  BOTTOM_TABS
} from "./_data";

/**
 * daheng-neon（a13 大亨霓虹電競）手機版
 * 1:1 對齊 大亨_AWD_版型A_霓虹電競.html 的 <960px 佈局。
 *
 * 對齊原稿手機結構：
 *   sticky topbar（logo + 註冊/登入，welcome 在手機隱藏）→ hero 輪播
 *   → notice 跑馬燈 → quick 4 顆（2×2 縱向圖示）→ 遊戲大廳（tabs + grid 2 欄）
 *   → 優惠活動（promo 單欄堆疊）→ 即時派彩 rank → app 下載條（縱向）→ footer
 *   → 固定底部 5 格 tab bar（中間「首頁」凸出 CTA 球）
 *
 * 與桌機共用同一份 _data，僅佈局/欄數不同。Logo 接 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前遊戲分類（純前端互動，預設熱門推薦） */
const activeCat = ref<string>("hot");
const visibleGames = computed(() =>
  GAMES.filter((g) =>
    activeCat.value === "hot" ? g.hot : g.cat === activeCat.value
  )
);

const fmt = (n: number) => n.toLocaleString("en-US");

/** Hero 輪播（3 slide 自動播 4.5 秒，與桌機一致） */
const { activeIdx: heroIdx, select: selectHero } = useHeroCarousel(
  HERO_SLIDES.length,
  4500
);
</script>

<template>
  <div class="neon-m">
    <!-- sticky topbar -->
    <header class="neon-m-topbar">
      <div class="neon-m-topbar__logo">
        <img :src="logoSrc" :alt="logoLabel" />
        <b>大亨娛樂城</b>
      </div>
      <span class="neon-m-topbar__spacer"></span>
      <button type="button" class="neon-m-btn neon-m-btn--ghost">註冊</button>
      <button type="button" class="neon-m-btn neon-m-btn--neon">登入</button>
    </header>

    <div class="neon-m-wrap">
      <!-- Hero 輪播（對齊原稿 3 slide：1 張圖 + 2 漸層文案，自動播 + dot 可點） -->
      <section class="neon-m-hero">
        <div
          class="neon-m-hero__slides"
          :style="{ transform: `translateX(-${heroIdx * 100}%)` }"
        >
          <div
            v-for="(slide, i) in HERO_SLIDES"
            :key="i"
            class="neon-m-hero__slide"
            :class="
              slide.kind === 'grad'
                ? [
                    'neon-m-hero__slide--grad',
                    `neon-m-hero__slide--${slide.variant}`
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
              <span class="neon-m-hero__kicker">{{ slide.kicker }}</span>
              <h2 class="neon-m-hero__title">
                <template v-for="(line, li) in slide.titleLines" :key="li">
                  {{ line }}<br v-if="li < slide.titleLines.length - 1" />
                </template>
              </h2>
              <p class="neon-m-hero__desc">{{ slide.desc }}</p>
            </template>
          </div>
        </div>
        <div class="neon-m-hero__dots">
          <button
            v-for="(slide, i) in HERO_SLIDES"
            :key="i"
            type="button"
            class="neon-m-hero__dot"
            :class="{ 'neon-m-hero__dot--on': heroIdx === i }"
            :aria-label="`切換到第 ${i + 1} 張`"
            @click="selectHero(i)"
          ></button>
        </div>
      </section>

      <!-- 公告 -->
      <div class="neon-m-notice">
        <span class="neon-m-notice__ico">📣</span>
        <div class="neon-m-notice__clip">
          <span class="neon-m-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 快捷 -->
      <div class="neon-m-quick">
        <a
          v-for="q in QUICK_ACTIONS"
          :key="q.label"
          class="neon-m-quick__item"
          href="#"
          @click.prevent
        >
          <span class="neon-m-quick__ic">{{ q.icon }}</span>
          <span class="neon-m-quick__label">{{ q.label }}</span>
        </a>
      </div>

      <!-- 遊戲大廳 -->
      <section class="neon-m-sec">
        <div class="neon-m-sec__head">
          <span class="neon-m-sec__bar"></span>
          <h3 class="neon-m-sec__title">遊戲大廳</h3>
          <a class="neon-m-sec__more" href="#" @click.prevent>全部遊戲 ›</a>
        </div>
        <div class="neon-m-tabs">
          <button
            v-for="c in GAME_CATS"
            :key="c.id"
            type="button"
            class="neon-m-tabs__btn"
            :class="{ 'neon-m-tabs__btn--on': activeCat === c.id }"
            @click="activeCat = c.id"
          >
            {{ c.label }}
          </button>
        </div>
        <div class="neon-m-grid">
          <a
            v-for="g in visibleGames"
            :key="g.name"
            class="neon-m-gcard"
            href="#"
            @click.prevent
          >
            <span class="neon-m-gcard__tag">{{ CAT_TAG[g.cat] }}</span>
            <div class="neon-m-gcard__ph">
              <img :src="g.img" :alt="g.name" />
            </div>
            <div class="neon-m-gcard__meta">
              <b>{{ g.name }}</b
              ><em>{{ g.en }}</em>
            </div>
          </a>
        </div>
      </section>

      <!-- 優惠活動 -->
      <section class="neon-m-sec">
        <div class="neon-m-sec__head">
          <span class="neon-m-sec__bar"></span>
          <h3 class="neon-m-sec__title">優惠活動</h3>
          <a class="neon-m-sec__more" href="#" @click.prevent>更多 ›</a>
        </div>
        <div class="neon-m-promo">
          <div v-for="p in PROMOS" :key="p.title" class="neon-m-promo__card">
            <span class="neon-m-promo__kicker">{{ p.kicker }}</span>
            <h4 class="neon-m-promo__title">{{ p.title }}</h4>
            <p class="neon-m-promo__desc">{{ p.desc }}</p>
            <a class="neon-m-promo__go" href="#" @click.prevent>立即領取 ›</a>
          </div>
        </div>
      </section>

      <!-- 即時派彩 -->
      <section class="neon-m-sec">
        <div class="neon-m-sec__head">
          <span class="neon-m-sec__bar"></span>
          <h3 class="neon-m-sec__title">即時派彩</h3>
        </div>
        <div class="neon-m-rank">
          <div v-for="(r, i) in RANKS" :key="i" class="neon-m-rank__row">
            <span class="neon-m-rank__no">{{ i + 1 }}</span>
            <span class="neon-m-rank__who">
              <b>{{ r.name }}</b
              ><span>{{ r.game }}</span>
            </span>
            <span class="neon-m-rank__amt">+NT$ {{ fmt(r.amount) }}</span>
          </div>
        </div>
      </section>

      <!-- APP 下載 -->
      <section class="neon-m-app">
        <h4 class="neon-m-app__title">大亨 APP・極速體驗</h4>
        <p class="neon-m-app__desc">
          掃碼下載，支援 iOS / Android，開啟生物辨識極速登入
        </p>
        <div class="neon-m-app__row">
          <button type="button" class="neon-m-btn neon-m-btn--ghost">
            App Store
          </button>
          <button type="button" class="neon-m-btn neon-m-btn--ghost">
            Android APK
          </button>
          <button type="button" class="neon-m-btn neon-m-btn--neon">
            掃碼下載
          </button>
        </div>
      </section>

      <footer class="neon-m-footer">
        <div class="neon-m-footer__cols">
          <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
            l
          }}</a>
        </div>
        <p class="neon-m-footer__fine">
          {{ FOOTER_FINE }}<br />© 2026 TYCOON Entertainment. All rights
          reserved.
        </p>
      </footer>
    </div>

    <!-- 固定底部 5 格 tab bar -->
    <nav class="neon-m-bottomnav">
      <a
        v-for="t in BOTTOM_TABS"
        :key="t.label"
        class="neon-m-bottomnav__item"
        :class="{
          'neon-m-bottomnav__item--cta': t.cta,
          'neon-m-bottomnav__item--on': t.active
        }"
        href="#"
        @click.prevent
      >
        <span class="neon-m-bottomnav__ic">{{ t.icon }}</span
        >{{ t.label }}
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.neon-m {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

.neon-m-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px 96px;
}

// 共用按鈕
.neon-m-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;

  &--ghost {
    border: 1px solid var(--border);
    color: var(--text-muted);
    background: transparent;
  }

  &--neon {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 0 18px var(--glow-c);
  }
}

// topbar
.neon-m-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(7, 11, 20, 0.85);
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
      letter-spacing: 0.08em;
      background: var(--gradient-cta);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__spacer {
    flex: 1;
  }
}

// hero
.neon-m-hero {
  position: relative;
  margin-top: 16px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
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

    // 漸層文案 slide（對齊原稿 .s-grad）
    &--grad {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      padding: 0 7%;
    }

    &--v1 {
      background: var(--hero-slide-v1);
    }

    &--v2 {
      background: var(--hero-slide-v2);
    }
  }

  &__kicker {
    font-size: clamp(0.75rem, 3.4vw, 0.9rem);
    letter-spacing: 0.3em;
    color: var(--color-primary);
    font-weight: 700;
  }

  &__title {
    font-size: clamp(1.2rem, 6vw, 1.8rem);
    line-height: 1.2;
    font-weight: 800;
  }

  &__desc {
    font-size: clamp(0.75rem, 3.2vw, 0.95rem);
    color: var(--text-muted);
  }

  &__dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  &__dot {
    width: 22px;
    height: 4px;
    border: none;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.25);
    cursor: pointer;

    &--on {
      background: var(--color-primary);
      box-shadow: 0 0 8px var(--glow-c);
    }
  }
}

// notice
.neon-m-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  font-size: 0.85rem;
  color: var(--text-muted);

  &__ico {
    color: var(--color-primary);
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
    animation: neon-m-run 18s linear infinite;
  }
}

@keyframes neon-m-run {
  to {
    transform: translateX(-100%);
  }
}

// quick（手機 4 欄縱向圖示）
.neon-m-quick {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 16px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 14px 6px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    text-decoration: none;
  }

  &__ic {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    background: linear-gradient(140deg, var(--glow-c), var(--glow-v));
    border: 1px solid var(--border);
    color: var(--color-primary);
  }

  &__label {
    font-size: 0.85rem;
    color: var(--text-muted);
  }
}

// section head
.neon-m-sec {
  margin-top: 34px;

  &__head {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 14px;
  }

  &__bar {
    width: 4px;
    height: 18px;
    border-radius: 2px;
    align-self: center;
    background: linear-gradient(var(--color-primary), var(--color-secondary));
    box-shadow: 0 0 10px var(--glow-c);
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  &__more {
    margin-left: auto;
    font-size: 0.85rem;
    color: var(--text-muted);
    text-decoration: none;
  }
}

// tabs + grid（手機 2 欄）
.neon-m-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  &__btn {
    flex: none;
    height: 38px;
    padding: 0 18px;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-muted);
    background: var(--bg-2);
    cursor: pointer;

    &--on {
      color: var(--cta-ink);
      background: var(--gradient-cta);
      border-color: transparent;
      box-shadow: 0 0 14px var(--glow-c);
    }
  }
}

.neon-m-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 14px;
}

.neon-m-gcard {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;

  &__ph {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #1a2238;

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
    padding: 10px 12px;

    b {
      font-size: 0.95rem;
    }

    em {
      font-style: normal;
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.06em;
    }
  }

  &__tag {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(7, 11, 20, 0.7);
    backdrop-filter: blur(4px);
    border: 1px solid var(--border);
    color: var(--color-primary);
  }
}

// promo（手機單欄堆疊）
.neon-m-promo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  &__card {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    background: linear-gradient(140deg, var(--bg-surface), var(--card-2));
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 150px;
  }

  &__kicker {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: var(--color-secondary);
    font-weight: 700;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 800;
  }

  &__desc {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  &__go {
    margin-top: auto;
    align-self: flex-start;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
  }
}

// rank
.neon-m-rank {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border-radius: var(--radius);
    background: var(--bg-surface);
    border: 1px solid var(--border);
  }

  // 基礎 &__no 先宣告，nth-child 強調色覆寫放後面（避免 no-descending-specificity）
  &__no {
    width: 30px;
    font-size: 1.1rem;
    font-weight: 800;
    font-style: italic;
    color: var(--text-muted);
    text-align: center;
    flex: none;
  }

  &__row:nth-child(1) &__no {
    color: var(--color-primary);
    text-shadow: 0 0 12px var(--glow-c);
  }

  &__row:nth-child(2) &__no {
    color: var(--color-secondary);
    text-shadow: 0 0 12px var(--glow-v);
  }

  &__who {
    flex: 1;
    min-width: 0;

    b {
      font-size: 0.95rem;
      display: block;
    }

    span {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  }

  &__amt {
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-primary);
    font-variant-numeric: tabular-nums;
  }
}

// app（手機縱向）
.neon-m-app {
  margin-top: 34px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
  background: radial-gradient(
      90% 140% at 90% 10%,
      var(--glow-v),
      transparent 55%
    ),
    radial-gradient(70% 120% at 5% 95%, var(--glow-c), transparent 50%),
    var(--bg-2);
  padding: 26px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    font-size: 1.3rem;
    font-weight: 800;
  }

  &__desc {
    font-size: 0.88rem;
    color: var(--text-muted);
  }

  &__row {
    display: flex;
    gap: 10px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
}

// footer
.neon-m-footer {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  padding: 26px 0 10px;
  color: var(--text-muted);
  font-size: 0.8rem;

  &__cols {
    display: flex;
    flex-wrap: wrap;
    gap: 18px 36px;
    margin-bottom: 18px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__fine {
    line-height: 1.7;
    opacity: 0.7;
  }
}

// 固定底部 5 格 tab bar
.neon-m-bottomnav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: rgba(10, 14, 26, 0.92);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--border);
  padding: 6px 4px calc(6px + env(safe-area-inset-bottom));

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 0.68rem;
    color: var(--text-muted);
    text-decoration: none;
    padding: 4px 0;

    &--on {
      color: var(--color-primary);
    }
  }

  &__ic {
    font-size: 1.15rem;
    line-height: 1;
  }

  // 中間「首頁」凸出 CTA 球
  &__item--cta &__ic {
    width: 46px;
    height: 46px;
    margin-top: -22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    font-size: 1.25rem;
    box-shadow: 0 0 20px var(--glow-c);
    border: 3px solid var(--bg-base);
  }
}
</style>
