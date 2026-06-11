<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useHeroCarousel } from "@/utils/use-hero-carousel";
import {
  heroSrc,
  HERO_SLIDES,
  trophySrc,
  GAME_CATS,
  CAT_TAG,
  GAMES,
  BOARD_ROWS,
  PROMOS,
  NOTICE,
  VIP_DESC,
  FOOTER_LINKS,
  FOOTER_FINE,
  BOTTOM_TABS
} from "./_data";

/**
 * daheng-emerald（a14 大亨翡翠金典）手機版
 * 1:1 對齊 大亨_AWD_版型B_翡翠金典.html 的 <960px 佈局。
 *
 * 對齊原稿手機結構（topbar nav 在手機隱藏）：
 *   topbar（logo + 註冊/登入）→ hero framebox → notice
 *   → 遊戲大廳（head + tabs 左對齊 + 直式卡 2 欄）
 *   → 中獎名單・優惠（duo 收成單欄：board 表格榜 + promo 2 banner 堆疊）
 *   → VIP 條 → footer（置中）→ 固定底部 5 格 tab（中間皇冠凸出 CTA）
 *
 * 與桌機共用 _data，僅欄數 / 排列不同。Logo 接 themeStore.currentLogo。
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

const fmt = (n: number) => n.toLocaleString("en-US");
const seq = (i: number) => (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`);

/** Hero 輪播（3 slide 自動播 5 秒，與桌機一致） */
const { activeIdx: heroIdx, select: selectHero } = useHeroCarousel(
  HERO_SLIDES.length,
  5000
);
</script>

<template>
  <div class="emer-m">
    <header class="emer-m-topbar">
      <div class="emer-m-topbar__logo">
        <img :src="logoSrc" :alt="logoLabel" />
        <b>大亨娛樂城</b>
      </div>
      <span class="emer-m-topbar__spacer"></span>
      <button type="button" class="emer-m-btn emer-m-btn--line">註冊</button>
      <button type="button" class="emer-m-btn emer-m-btn--gold">登入</button>
    </header>

    <div class="emer-m-wrap">
      <!-- Hero framebox（對齊原稿 3 slide：1 張圖 + 2 漸層文案，自動播 + dot 可點） -->
      <section class="emer-m-hero">
        <div class="emer-m-hero__framebox">
          <div
            class="emer-m-hero__slides"
            :style="{ transform: `translateX(-${heroIdx * 100}%)` }"
          >
            <div
              v-for="(slide, i) in HERO_SLIDES"
              :key="i"
              class="emer-m-hero__slide"
              :class="
                slide.kind === 'grad'
                  ? [
                      'emer-m-hero__slide--grad',
                      `emer-m-hero__slide--${slide.variant}`
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
                <span class="emer-m-hero__kicker">{{ slide.kicker }}</span>
                <h2 class="emer-m-hero__title">
                  <template v-for="(line, li) in slide.titleLines" :key="li">
                    {{ line }}<br v-if="li < slide.titleLines.length - 1" />
                  </template>
                </h2>
                <span
                  v-if="slide.descStyle === 'rule'"
                  class="emer-m-hero__rule"
                >
                  {{ slide.desc }}
                </span>
                <p v-else class="emer-m-hero__desc">{{ slide.desc }}</p>
              </template>
            </div>
          </div>
          <div class="emer-m-hero__dots">
            <button
              v-for="(slide, i) in HERO_SLIDES"
              :key="i"
              type="button"
              class="emer-m-hero__dot"
              :class="{ 'emer-m-hero__dot--on': heroIdx === i }"
              :aria-label="`切換到第 ${i + 1} 張`"
              @click="selectHero(i)"
            ></button>
          </div>
        </div>
      </section>

      <!-- notice -->
      <div class="emer-m-notice">
        <span class="emer-m-notice__ico">公告</span>
        <div class="emer-m-notice__clip">
          <span class="emer-m-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 遊戲大廳 -->
      <section class="emer-m-sec">
        <div class="emer-m-sec-head">
          <p class="emer-m-sec-head__eyebrow">GAME LOBBY</p>
          <h3 class="emer-m-sec-head__title">遊戲大廳</h3>
          <div class="emer-m-sec-head__orn"><i></i></div>
        </div>
        <div class="emer-m-tabs">
          <button
            v-for="c in GAME_CATS"
            :key="c.id"
            type="button"
            class="emer-m-tabs__btn"
            :class="{ 'emer-m-tabs__btn--on': activeCat === c.id }"
            @click="activeCat = c.id"
          >
            {{ c.label }}
          </button>
        </div>
        <div class="emer-m-grid">
          <a
            v-for="g in visibleGames"
            :key="g.name"
            class="emer-m-gcard"
            href="#"
            @click.prevent
          >
            <div class="emer-m-gcard__ph">
              <img :src="g.img" :alt="g.name" />
            </div>
            <span class="emer-m-gcard__tag">{{ CAT_TAG[g.cat] }}</span>
            <div class="emer-m-gcard__meta">
              <b>{{ g.name }}</b
              ><em>{{ g.en }}</em>
            </div>
          </a>
        </div>
      </section>

      <!-- 中獎名單・優惠 -->
      <section class="emer-m-sec">
        <div class="emer-m-sec-head">
          <p class="emer-m-sec-head__eyebrow">WINNERS &amp; OFFERS</p>
          <h3 class="emer-m-sec-head__title">中獎名單・優惠活動</h3>
          <div class="emer-m-sec-head__orn"><i></i></div>
        </div>
        <div class="emer-m-board">
          <div class="emer-m-board__head">
            <span>名次</span><span>會員／遊戲</span>
            <span class="emer-m-board__amt-h">派彩金額</span>
          </div>
          <div v-for="(r, i) in BOARD_ROWS" :key="i" class="emer-m-board__row">
            <span class="emer-m-board__no">{{ seq(i) }}</span>
            <span class="emer-m-board__who">
              <b>{{ r.name }}</b
              ><span>{{ r.game }}</span>
            </span>
            <span class="emer-m-board__amt">NT$ {{ fmt(r.amount) }}</span>
          </div>
        </div>
        <div class="emer-m-promo">
          <div v-for="p in PROMOS" :key="p.title" class="emer-m-pban">
            <span class="emer-m-pban__pk">{{ p.kicker }}</span>
            <h4 class="emer-m-pban__title">{{ p.title }}</h4>
            <p class="emer-m-pban__desc">{{ p.desc }}</p>
            <a class="emer-m-pban__go" href="#" @click.prevent>立即領取</a>
            <img
              v-if="p.trophy"
              class="emer-m-pban__deco"
              :src="trophySrc"
              alt=""
            />
          </div>
        </div>
      </section>

      <!-- VIP -->
      <section class="emer-m-vip">
        <p class="emer-m-vip__eyebrow">TYCOON VIP</p>
        <h4 class="emer-m-vip__title">尊爵會員計畫</h4>
        <p class="emer-m-vip__desc">{{ VIP_DESC }}</p>
        <div class="emer-m-vip__row">
          <button type="button" class="emer-m-btn emer-m-btn--line">
            了解 VIP 權益
          </button>
          <button type="button" class="emer-m-btn emer-m-btn--gold">
            下載 APP
          </button>
        </div>
      </section>

      <footer class="emer-m-footer">
        <div class="emer-m-footer__cols">
          <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
            l
          }}</a>
        </div>
        <p class="emer-m-footer__fine">
          {{ FOOTER_FINE }}<br />© 2026 TYCOON Entertainment. All rights
          reserved.
        </p>
      </footer>
    </div>

    <!-- 固定底部 5 格 tab -->
    <nav class="emer-m-bottomnav">
      <a
        v-for="t in BOTTOM_TABS"
        :key="t.label"
        class="emer-m-bottomnav__item"
        :class="{
          'emer-m-bottomnav__item--cta': t.cta,
          'emer-m-bottomnav__item--on': t.active
        }"
        href="#"
        @click.prevent
      >
        <span class="emer-m-bottomnav__ic">{{ t.icon }}</span
        >{{ t.label }}
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.emer-m {
  background: var(--page-bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

.emer-m-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px 96px;
}

.emer-m-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 18px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;

  &--line {
    border: 1px solid var(--gold-dim);
    color: var(--color-primary);
    background: transparent;
  }

  &--gold {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 2px 12px rgba(216, 181, 108, 0.3);
  }
}

// topbar
.emer-m-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
  background: rgba(11, 31, 23, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 40px;
      width: auto;
      object-fit: contain;
    }

    b {
      font-family: var(--font-display);
      font-size: 1.1rem;
      letter-spacing: 0.12em;
      color: var(--color-secondary);
    }
  }

  &__spacer {
    flex: 1;
  }
}

// hero
.emer-m-hero {
  position: relative;
  margin-top: 18px;

  &__framebox {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--gold-dim);
    box-shadow:
      0 0 0 4px rgba(216, 181, 108, 0.06),
      var(--shadow);
  }

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

    // 漸層文案 slide（對齊原稿 .s-grad，置中對齊）
    &--grad {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 10px;
      padding: 0 8%;
    }

    &--g1 {
      background: var(--hero-slide-g1);
    }

    &--g2 {
      background: var(--hero-slide-g2);
    }
  }

  &__kicker {
    font-size: clamp(0.68rem, 3vw, 0.85rem);
    letter-spacing: 0.42em;
    color: var(--color-primary);
    font-weight: 700;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 6vw, 1.9rem);
    line-height: 1.25;
    font-weight: 900;
    color: var(--color-secondary);
  }

  &__desc {
    font-size: clamp(0.75rem, 3.2vw, 0.95rem);
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  &__rule {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-primary);
    font-size: 0.78rem;
    letter-spacing: 0.3em;

    &::before,
    &::after {
      content: "";
      height: 1px;
      width: 40px;
      background: linear-gradient(90deg, transparent, var(--color-primary));
    }

    &::after {
      transform: scaleX(-1);
    }
  }

  &__dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12px;
    display: flex;
    justify-content: center;
    gap: 9px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid var(--gold-dim);
    background: transparent;
    cursor: pointer;

    &--on {
      background: var(--color-primary);
    }
  }
}

// notice
.emer-m-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 9px 16px;
  border: 1px solid var(--border);
  border-left: 3px solid var(--color-primary);
  background: var(--bg-surface);
  font-size: 0.85rem;
  color: var(--text-muted);
  border-radius: 4px;

  &__ico {
    color: var(--color-primary);
    flex: none;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    font-weight: 700;
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
    animation: emer-m-run 18s linear infinite;
  }
}

@keyframes emer-m-run {
  to {
    transform: translateX(-100%);
  }
}

// section head（手機仍居中古典）
.emer-m-sec {
  margin-top: 44px;
}

.emer-m-sec-head {
  text-align: center;
  margin-bottom: 20px;

  &__eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.5em;
    color: var(--color-primary);
    font-weight: 700;
    text-indent: 0.5em;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-secondary);
    margin-top: 6px;
    letter-spacing: 0.1em;
  }

  &__orn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    color: var(--color-primary);

    &::before,
    &::after {
      content: "";
      height: 1px;
      width: 64px;
      background: linear-gradient(90deg, transparent, var(--gold-dim));
    }

    &::after {
      transform: scaleX(-1);
    }

    i {
      font-style: normal;
      transform: rotate(45deg);
      border: 1px solid var(--gold-dim);
      width: 8px;
      height: 8px;
      display: block;
    }
  }
}

// tabs（手機左對齊可橫滾）
.emer-m-tabs {
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid var(--border);
  margin-bottom: 18px;

  &::-webkit-scrollbar {
    display: none;
  }

  &__btn {
    flex: none;
    height: 44px;
    padding: 0 18px;
    border: none;
    background: transparent;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;

    &--on {
      color: var(--color-secondary);
      border-bottom-color: var(--color-primary);
    }
  }
}

// 2 欄直式卡
.emer-m-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.emer-m-gcard {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;

  &__ph {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    position: relative;
    background: var(--card-2);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    &::after {
      content: "";
      position: absolute;
      inset: auto 0 0;
      height: 55%;
      background: linear-gradient(transparent, rgba(8, 22, 16, 0.92));
    }
  }

  &__meta {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;

    b {
      font-family: var(--font-display);
      font-size: 1.02rem;
      color: var(--color-secondary);
      letter-spacing: 0.06em;
    }

    em {
      font-style: normal;
      font-size: 0.68rem;
      color: var(--text-muted);
      letter-spacing: 0.18em;
    }
  }

  &__tag {
    position: absolute;
    top: 0;
    left: 14px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 5px 8px 7px;
    color: var(--cta-ink);
    background: linear-gradient(
      160deg,
      var(--color-secondary),
      var(--color-primary)
    );
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 6px),
      50% 100%,
      0 calc(100% - 6px)
    );
  }
}

// board
.emer-m-board {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);

  &__head {
    display: grid;
    grid-template-columns: 54px 1fr 110px;
    gap: 8px;
    padding: 12px 16px;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: var(--color-primary);
    border-bottom: 1px solid var(--border);
    background: rgba(216, 181, 108, 0.06);
  }

  &__amt-h {
    text-align: right;
  }

  &__row {
    display: grid;
    grid-template-columns: 54px 1fr 110px;
    gap: 8px;
    align-items: center;
    padding: 13px 16px;
    border-bottom: 1px solid rgba(216, 181, 108, 0.08);
    font-size: 0.9rem;

    &:last-child {
      border-bottom: none;
    }
  }

  // 基礎 &__no 先宣告，nth-child 名次色覆寫放後面（避免 no-descending-specificity）
  &__no {
    font-family: var(--font-display);
    font-weight: 900;
    color: var(--text-muted);
  }

  &__row:nth-child(2) &__no {
    color: var(--color-secondary);
  }

  &__row:nth-child(3) &__no {
    color: var(--color-primary);
  }

  &__who {
    min-width: 0;

    b {
      display: block;
    }

    span {
      font-size: 0.74rem;
      color: var(--text-muted);
    }
  }

  &__amt {
    text-align: right;
    font-weight: 700;
    color: var(--color-secondary);
    font-variant-numeric: tabular-nums;
  }
}

// promo（堆疊在 board 下方）
.emer-m-promo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-top: 14px;
}

.emer-m-pban {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 150px;
  padding: 22px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: linear-gradient(120deg, var(--card-2), var(--bg-surface) 70%);

  &__pk {
    font-size: 0.68rem;
    letter-spacing: 0.4em;
    color: var(--color-primary);
    font-weight: 700;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 900;
    color: var(--color-secondary);
    letter-spacing: 0.04em;
  }

  &__desc {
    font-size: 0.84rem;
    color: var(--text-muted);
  }

  &__go {
    margin-top: 8px;
    align-self: flex-start;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    color: var(--color-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--gold-dim);
    padding-bottom: 2px;
  }

  &__deco {
    position: absolute;
    right: -8px;
    bottom: -12px;
    width: 160px;
    pointer-events: none;
    filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.4));
  }
}

// VIP
.emer-m-vip {
  margin-top: 44px;
  border: 1px solid var(--gold-dim);
  border-radius: var(--radius);
  background: radial-gradient(
      80% 160% at 50% 130%,
      rgba(216, 181, 108, 0.18),
      transparent 60%
    ),
    linear-gradient(170deg, var(--bg-surface), var(--bg-2));
  padding: 30px 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &__eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.5em;
    color: var(--color-primary);
    font-weight: 700;
    text-indent: 0.5em;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-secondary);
    letter-spacing: 0.08em;
  }

  &__desc {
    font-size: 0.88rem;
    color: var(--text-muted);
    max-width: 46ch;
  }

  &__row {
    display: flex;
    gap: 10px;
    margin-top: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

// footer
.emer-m-footer {
  margin-top: 48px;
  border-top: 1px solid var(--border);
  padding: 28px 0 12px;
  color: var(--text-muted);
  font-size: 0.8rem;
  text-align: center;

  &__cols {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 30px;
    justify-content: center;
    margin-bottom: 18px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__fine {
    line-height: 1.8;
    opacity: 0.65;
  }
}

// 固定底部 5 格 tab
.emer-m-bottomnav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: rgba(9, 26, 19, 0.95);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--gold-dim);
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
      color: var(--color-secondary);
    }
  }

  &__ic {
    font-size: 1.15rem;
    line-height: 1;
  }

  &__item--cta &__ic {
    width: 46px;
    height: 46px;
    margin-top: -22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    font-size: 1.2rem;
    box-shadow: 0 4px 16px rgba(216, 181, 108, 0.35);
    border: 3px solid var(--bg-base);
  }
}
</style>
