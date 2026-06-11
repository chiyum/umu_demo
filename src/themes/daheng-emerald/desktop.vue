<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  trophySrc,
  TOP_NAV,
  GAME_CATS,
  CAT_TAG,
  GAMES,
  BOARD_ROWS,
  PROMOS,
  NOTICE,
  VIP_DESC,
  FOOTER_LINKS,
  FOOTER_FINE
} from "./_data";

/**
 * daheng-emerald（a14 大亨翡翠金典）桌面版
 * 1:1 對齊 大亨_AWD_版型B_翡翠金典.html 的 ≥960px 佈局。
 *
 * 對齊原稿桌機結構（無 sidebar，置中容器）：
 *   topbar（logo + 水平 nav 7 項 + 註冊/登入）→ hero framebox（金邊輪播）
 *   → notice 跑馬燈 → 遊戲大廳（居中 eyebrow head + tabs 置中 + 直式卡 4~5 欄）
 *   → 中獎名單・優惠（duo：左 board 表格榜 + 右 promo 2 banner）
 *   → VIP 尊爵會員條 → footer（置中）
 *
 * 古典金典風：襯線標題 + 金色細描線裝飾 + 直式遊戲卡（3/4 比例）。
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

const fmt = (n: number) => n.toLocaleString("en-US");
/** 兩位序號補零（對齊原稿 board no 的 0X） */
const seq = (i: number) => (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`);
</script>

<template>
  <div class="emer">
    <!-- topbar -->
    <header class="emer-topbar">
      <div class="emer-topbar__inner">
        <div class="emer-topbar__logo">
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨娛樂城</b>
        </div>
        <nav class="emer-topbar__nav">
          <a
            v-for="n in TOP_NAV"
            :key="n.label"
            class="emer-topbar__link"
            :class="{ 'emer-topbar__link--on': n.active }"
            href="#"
            @click.prevent
          >
            {{ n.label }}
          </a>
        </nav>
        <span class="emer-topbar__spacer"></span>
        <button type="button" class="emer-btn emer-btn--line">註冊</button>
        <button type="button" class="emer-btn emer-btn--gold">登入</button>
      </div>
    </header>

    <div class="emer-wrap">
      <!-- Hero framebox -->
      <section class="emer-hero">
        <div class="emer-hero__framebox">
          <div class="emer-hero__slide">
            <img :src="heroSrc" alt="首存1000送1000" />
          </div>
          <div class="emer-hero__dots">
            <span class="emer-hero__dot emer-hero__dot--on"></span>
            <span class="emer-hero__dot"></span>
            <span class="emer-hero__dot"></span>
          </div>
        </div>
      </section>

      <!-- notice -->
      <div class="emer-notice">
        <span class="emer-notice__ico">公告</span>
        <div class="emer-notice__clip">
          <span class="emer-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 遊戲大廳 -->
      <section class="emer-sec">
        <div class="emer-sec-head">
          <p class="emer-sec-head__eyebrow">GAME LOBBY</p>
          <h3 class="emer-sec-head__title">遊戲大廳</h3>
          <div class="emer-sec-head__orn"><i></i></div>
        </div>
        <div class="emer-tabs">
          <button
            v-for="c in GAME_CATS"
            :key="c.id"
            type="button"
            class="emer-tabs__btn"
            :class="{ 'emer-tabs__btn--on': activeCat === c.id }"
            @click="activeCat = c.id"
          >
            {{ c.label }}
          </button>
        </div>
        <div class="emer-grid">
          <a
            v-for="g in visibleGames"
            :key="g.name"
            class="emer-gcard"
            href="#"
            @click.prevent
          >
            <div class="emer-gcard__ph"><img :src="g.img" :alt="g.name" /></div>
            <span class="emer-gcard__tag">{{ CAT_TAG[g.cat] }}</span>
            <div class="emer-gcard__meta">
              <b>{{ g.name }}</b
              ><em>{{ g.en }}</em>
            </div>
            <span class="emer-gcard__enter"><span>進入遊戲</span></span>
          </a>
        </div>
      </section>

      <!-- 中獎名單・優惠活動 -->
      <section class="emer-sec">
        <div class="emer-sec-head">
          <p class="emer-sec-head__eyebrow">WINNERS &amp; OFFERS</p>
          <h3 class="emer-sec-head__title">中獎名單・優惠活動</h3>
          <div class="emer-sec-head__orn"><i></i></div>
        </div>
        <div class="emer-duo">
          <div class="emer-board">
            <div class="emer-board__head">
              <span>名次</span><span>會員／遊戲</span>
              <span class="emer-board__amt-h">派彩金額</span>
            </div>
            <div v-for="(r, i) in BOARD_ROWS" :key="i" class="emer-board__row">
              <span class="emer-board__no">{{ seq(i) }}</span>
              <span class="emer-board__who">
                <b>{{ r.name }}</b
                ><span>{{ r.game }}</span>
              </span>
              <span class="emer-board__amt">NT$ {{ fmt(r.amount) }}</span>
            </div>
          </div>

          <div class="emer-promo">
            <div v-for="p in PROMOS" :key="p.title" class="emer-pban">
              <span class="emer-pban__pk">{{ p.kicker }}</span>
              <h4 class="emer-pban__title">{{ p.title }}</h4>
              <p class="emer-pban__desc">{{ p.desc }}</p>
              <a class="emer-pban__go" href="#" @click.prevent>立即領取</a>
              <img
                v-if="p.trophy"
                class="emer-pban__deco"
                :src="trophySrc"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <!-- VIP -->
      <section class="emer-vip">
        <p class="emer-vip__eyebrow">TYCOON VIP</p>
        <h4 class="emer-vip__title">尊爵會員計畫</h4>
        <p class="emer-vip__desc">{{ VIP_DESC }}</p>
        <div class="emer-vip__row">
          <button type="button" class="emer-btn emer-btn--line">
            了解 VIP 權益
          </button>
          <button type="button" class="emer-btn emer-btn--gold">
            下載 APP
          </button>
        </div>
      </section>

      <footer class="emer-footer">
        <div class="emer-footer__cols">
          <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
            l
          }}</a>
        </div>
        <p class="emer-footer__fine">
          {{ FOOTER_FINE }}<br />© 2026 TYCOON Entertainment. All rights
          reserved.
        </p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emer {
  background: var(--page-bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

.emer-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px 64px;
}

// 共用按鈕
.emer-btn {
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
  transition: filter 0.15s;

  &:hover {
    filter: brightness(1.12);
  }

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
.emer-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 31, 23, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 28px;
  }

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

  &__nav {
    display: flex;
    gap: 4px;
    margin-left: 18px;
  }

  &__link {
    padding: 9px 14px;
    font-size: 0.92rem;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    border-radius: 4px;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: var(--text-primary);
    }

    &--on {
      color: var(--color-secondary);
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 14px;
        right: 14px;
        bottom: 4px;
        height: 2px;
        background: var(--color-primary);
      }
    }
  }

  &__spacer {
    flex: 1;
  }
}

// hero
.emer-hero {
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

    &--on {
      background: var(--color-primary);
    }
  }
}

// notice
.emer-notice {
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
    animation: emer-run 18s linear infinite;
  }
}

@keyframes emer-run {
  to {
    transform: translateX(-100%);
  }
}

// section head（居中古典）
.emer-sec {
  margin-top: 44px;
}

.emer-sec-head {
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

// tabs（置中下劃線）
.emer-tabs {
  display: flex;
  justify-content: center;
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
    transition: all 0.15s;

    &:hover {
      color: var(--text-primary);
    }

    &--on {
      color: var(--color-secondary);
      border-bottom-color: var(--color-primary);
    }
  }
}

// 直式遊戲卡（3/4 比例 + 底部漸層 + 斜切金角標）
.emer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.emer-gcard {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.18s,
    box-shadow 0.18s,
    border-color 0.18s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--color-primary);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
  }

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
      transition: transform 0.3s;
    }

    &::after {
      content: "";
      position: absolute;
      inset: auto 0 0;
      height: 55%;
      background: linear-gradient(transparent, rgba(8, 22, 16, 0.92));
    }
  }

  &:hover &__ph img {
    transform: scale(1.05);
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

  &__enter {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity 0.2s;
    background: rgba(8, 22, 16, 0.45);

    span {
      border: 1px solid var(--color-primary);
      color: var(--color-secondary);
      padding: 9px 26px;
      font-size: 0.88rem;
      letter-spacing: 0.3em;
      text-indent: 0.3em;
      background: rgba(11, 31, 23, 0.7);
    }
  }

  &:hover &__enter {
    opacity: 1;
  }
}

// duo：board + promo
.emer-duo {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 24px;
  align-items: start;
}

// 中獎名單榜
.emer-board {
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

// 優惠橫幅
.emer-promo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.emer-pban {
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
.emer-vip {
  margin-top: 44px;
  border: 1px solid var(--gold-dim);
  border-radius: var(--radius);
  background: radial-gradient(
      80% 160% at 50% 130%,
      rgba(216, 181, 108, 0.18),
      transparent 60%
    ),
    linear-gradient(170deg, var(--bg-surface), var(--bg-2));
  padding: 44px 30px;
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

// footer（置中）
.emer-footer {
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

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__fine {
    line-height: 1.8;
    opacity: 0.65;
  }
}

// 1280px 以上：grid 升至 5 欄（對齊原稿 @media min-width:1280px）
@media (width >= 1280px) {
  .emer-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
