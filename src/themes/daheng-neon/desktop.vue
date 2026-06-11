<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useHeroCarousel } from "@/utils/use-hero-carousel";
import {
  heroSrc,
  HERO_SLIDES,
  SIDE_NAV,
  QUICK_ACTIONS,
  GAME_CATS,
  CAT_TAG,
  GAMES,
  PROMOS,
  RANKS,
  NOTICE,
  WELCOME,
  FOOTER_LINKS,
  FOOTER_FINE
} from "./_data";

/**
 * daheng-neon（a13 大亨霓虹電競）桌面版
 * 1:1 對齊 大亨_AWD_版型A_霓虹電競.html 的 ≥960px sidebar 佈局。
 *
 * 對齊原稿桌機結構：
 *   左 sidebar（slogo + 8 項 nav + 下載 APP 卡） | 主內容
 *   主內容 = topbar（welcome + 註冊/登入）→ hero 輪播 → notice 跑馬燈
 *           → quick 4 顆 → 遊戲大廳（tabs + grid，桌機 3~4 欄）
 *           → duo（左 promo 3 卡 + 右即時派彩 rank）→ app 下載條 → footer
 *
 * 所有顏色走 [data-theme="daheng-neon"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接線：sidebar slogo + topbar logo 都讀 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前遊戲分類（純前端互動，不打 API；預設熱門推薦） */
const activeCat = ref<string>("hot");

/** 依當前分類過濾遊戲卡（hot 取 hot 標記，其餘比對 cat） */
const visibleGames = computed(() =>
  GAMES.filter((g) =>
    activeCat.value === "hot" ? g.hot : g.cat === activeCat.value
  )
);

/** 金額千分位格式（即時派彩） */
const fmt = (n: number) => n.toLocaleString("en-US");

/** Hero 輪播（3 slide 自動播 4.5 秒，對齊原稿 setInterval(4500)） */
const { activeIdx: heroIdx, select: selectHero } = useHeroCarousel(
  HERO_SLIDES.length,
  4500
);
</script>

<template>
  <div class="neon">
    <!-- ===== 左 sidebar（桌機限定） ===== -->
    <aside class="neon-sidebar">
      <div class="neon-sidebar__logo">
        <img :src="logoSrc" :alt="logoLabel" />
        <b>大亨娛樂城</b>
      </div>
      <nav class="neon-sidebar__nav">
        <a
          v-for="item in SIDE_NAV"
          :key="item.label"
          class="neon-sidebar__link"
          :class="{ 'neon-sidebar__link--on': item.active }"
          href="#"
          @click.prevent
        >
          <span class="neon-sidebar__ic">{{ item.icon }}</span
          >{{ item.label }}
        </a>
      </nav>
      <div class="neon-sidebar__app">
        <b>下載 APP</b>
        <span>隨時隨地，極速投注</span>
        <button
          type="button"
          class="neon-btn neon-btn--neon neon-sidebar__appbtn"
        >
          立即下載
        </button>
      </div>
    </aside>

    <!-- ===== 主內容 ===== -->
    <div class="neon-main">
      <header class="neon-topbar">
        <div class="neon-topbar__logo">
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨娛樂城</b>
        </div>
        <span class="neon-topbar__welcome">{{ WELCOME }}</span>
        <span class="neon-topbar__spacer"></span>
        <button type="button" class="neon-btn neon-btn--ghost">註冊</button>
        <button type="button" class="neon-btn neon-btn--neon">登入</button>
      </header>

      <div class="neon-wrap">
        <!-- Hero 輪播（對齊原稿 3 slide：1 張圖 + 2 漸層文案，自動播 + dot 可點） -->
        <section class="neon-hero">
          <div
            class="neon-hero__slides"
            :style="{ transform: `translateX(-${heroIdx * 100}%)` }"
          >
            <div
              v-for="(slide, i) in HERO_SLIDES"
              :key="i"
              class="neon-hero__slide"
              :class="
                slide.kind === 'grad'
                  ? [
                      'neon-hero__slide--grad',
                      `neon-hero__slide--${slide.variant}`
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
                <span class="neon-hero__kicker">{{ slide.kicker }}</span>
                <h2 class="neon-hero__title">
                  <template v-for="(line, li) in slide.titleLines" :key="li">
                    {{ line }}<br v-if="li < slide.titleLines.length - 1" />
                  </template>
                </h2>
                <p class="neon-hero__desc">{{ slide.desc }}</p>
              </template>
            </div>
          </div>
          <div class="neon-hero__dots">
            <button
              v-for="(slide, i) in HERO_SLIDES"
              :key="i"
              type="button"
              class="neon-hero__dot"
              :class="{ 'neon-hero__dot--on': heroIdx === i }"
              :aria-label="`切換到第 ${i + 1} 張`"
              @click="selectHero(i)"
            ></button>
          </div>
        </section>

        <!-- 公告跑馬燈 -->
        <div class="neon-notice">
          <span class="neon-notice__ico">📣</span>
          <div class="neon-notice__clip">
            <span class="neon-notice__run">{{ NOTICE }}</span>
          </div>
        </div>

        <!-- 快捷功能 -->
        <div class="neon-quick">
          <a
            v-for="q in QUICK_ACTIONS"
            :key="q.label"
            class="neon-quick__item"
            href="#"
            @click.prevent
          >
            <span class="neon-quick__ic">{{ q.icon }}</span>
            <span class="neon-quick__label">{{ q.label }}</span>
          </a>
        </div>

        <!-- 遊戲大廳：tabs + grid -->
        <section class="neon-sec">
          <div class="neon-sec__head">
            <span class="neon-sec__bar"></span>
            <h3 class="neon-sec__title">遊戲大廳</h3>
            <a class="neon-sec__more" href="#" @click.prevent>全部遊戲 ›</a>
          </div>
          <div class="neon-tabs">
            <button
              v-for="c in GAME_CATS"
              :key="c.id"
              type="button"
              class="neon-tabs__btn"
              :class="{ 'neon-tabs__btn--on': activeCat === c.id }"
              @click="activeCat = c.id"
            >
              {{ c.label }}
            </button>
          </div>
          <div class="neon-grid">
            <a
              v-for="g in visibleGames"
              :key="g.name"
              class="neon-gcard"
              href="#"
              @click.prevent
            >
              <span class="neon-gcard__tag">{{ CAT_TAG[g.cat] }}</span>
              <span class="neon-gcard__play">▶</span>
              <div class="neon-gcard__ph">
                <img :src="g.img" :alt="g.name" />
              </div>
              <div class="neon-gcard__meta">
                <b>{{ g.name }}</b
                ><em>{{ g.en }}</em>
              </div>
            </a>
          </div>
        </section>

        <!-- duo：左優惠活動 + 右即時派彩 -->
        <div class="neon-duo">
          <section class="neon-sec">
            <div class="neon-sec__head">
              <span class="neon-sec__bar"></span>
              <h3 class="neon-sec__title">優惠活動</h3>
              <a class="neon-sec__more" href="#" @click.prevent>更多 ›</a>
            </div>
            <div class="neon-promo">
              <div v-for="p in PROMOS" :key="p.title" class="neon-promo__card">
                <span class="neon-promo__kicker">{{ p.kicker }}</span>
                <h4 class="neon-promo__title">{{ p.title }}</h4>
                <p class="neon-promo__desc">{{ p.desc }}</p>
                <a class="neon-promo__go" href="#" @click.prevent>立即領取 ›</a>
              </div>
            </div>
          </section>

          <section class="neon-sec">
            <div class="neon-sec__head">
              <span class="neon-sec__bar"></span>
              <h3 class="neon-sec__title">即時派彩</h3>
            </div>
            <div class="neon-rank">
              <div v-for="(r, i) in RANKS" :key="i" class="neon-rank__row">
                <span class="neon-rank__no">{{ i + 1 }}</span>
                <span class="neon-rank__who">
                  <b>{{ r.name }}</b
                  ><span>{{ r.game }}</span>
                </span>
                <span class="neon-rank__amt">+NT$ {{ fmt(r.amount) }}</span>
              </div>
            </div>
          </section>
        </div>

        <!-- APP 下載條 -->
        <section class="neon-app">
          <div>
            <h4 class="neon-app__title">大亨 APP・極速體驗</h4>
            <p class="neon-app__desc">
              掃碼下載，支援 iOS / Android，開啟生物辨識極速登入
            </p>
          </div>
          <div class="neon-app__row">
            <button type="button" class="neon-btn neon-btn--ghost">
              App Store
            </button>
            <button type="button" class="neon-btn neon-btn--ghost">
              Android APK
            </button>
            <button type="button" class="neon-btn neon-btn--neon">
              掃碼下載
            </button>
          </div>
        </section>

        <footer class="neon-footer">
          <div class="neon-footer__cols">
            <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
              l
            }}</a>
          </div>
          <p class="neon-footer__fine">
            {{ FOOTER_FINE }}<br />© 2026 TYCOON Entertainment. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.neon {
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.neon-btn {
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
  transition: filter 0.15s;

  &:hover {
    filter: brightness(1.15);
  }

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

// ===== sidebar =====
.neon-sidebar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 228px;
  flex: none;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 18px 14px;
  background: var(--bg-2);
  border-right: 1px solid var(--border);

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px 16px;

    img {
      height: 44px;
      width: auto;
      object-fit: contain;
    }

    b {
      font-size: 1.05rem;
      letter-spacing: 0.06em;
      background: var(--gradient-cta);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    border-radius: 10px;
    font-size: 0.92rem;
    color: var(--text-muted);
    text-decoration: none;
    transition:
      color 0.15s,
      background 0.15s;

    &:hover {
      color: var(--text-primary);
      background: var(--bg-overlay);
    }

    &--on {
      color: var(--color-primary);
      background: linear-gradient(120deg, var(--glow-c), var(--glow-v));
      border: 1px solid var(--border);
    }
  }

  &__ic {
    width: 22px;
    text-align: center;
    font-size: 1rem;
  }

  &__app {
    margin-top: auto;
    border-radius: 12px;
    border: 1px solid var(--border);
    padding: 14px;
    background: linear-gradient(150deg, var(--glow-c), var(--glow-v));

    b {
      font-size: 0.9rem;
      display: block;
      margin-bottom: 4px;
    }

    span {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 10px;
    }
  }

  &__appbtn {
    height: 34px;
    font-size: 0.8rem;
  }
}

// ===== main =====
.neon-main {
  flex: 1;
  min-width: 0;
}

.neon-wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px 60px;
}

// ===== topbar =====
.neon-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 28px;
  background: rgba(7, 11, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

  &__logo {
    display: none; // 桌機隱藏（sidebar 已有 logo），對齊原稿 .topbar .logo{display:none}
  }

  &__welcome {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  &__spacer {
    flex: 1;
  }
}

// ===== hero =====
.neon-hero {
  position: relative;
  margin-top: 16px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);

  // 對齊原稿 .slides 滑動轉場
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
      gap: 10px;
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
    font-size: clamp(0.75rem, 1.4vw, 0.95rem);
    letter-spacing: 0.3em;
    color: var(--color-primary);
    font-weight: 700;
  }

  &__title {
    font-size: clamp(1.4rem, 4.2vw, 3rem);
    line-height: 1.2;
    font-weight: 800;
  }

  &__desc {
    font-size: clamp(0.8rem, 1.6vw, 1.05rem);
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

// ===== notice =====
.neon-notice {
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
    animation: neon-run 18s linear infinite;
  }
}

@keyframes neon-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== quick =====
.neon-quick {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 16px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 18px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    text-decoration: none;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 0 16px var(--glow-c);
    }
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

// ===== section head =====
.neon-sec {
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

    &:hover {
      color: var(--color-primary);
    }
  }
}

// ===== tabs + grid =====
.neon-tabs {
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
    transition: all 0.15s;

    &--on {
      color: var(--cta-ink);
      background: var(--gradient-cta);
      border-color: transparent;
      box-shadow: 0 0 14px var(--glow-c);
    }
  }
}

.neon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 14px;
}

.neon-gcard {
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
    box-shadow: 0 10px 30px var(--glow-c);
  }

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

  &__play {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    font-weight: 800;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.18s;
  }

  &:hover &__play {
    opacity: 1;
    transform: scale(1);
  }
}

// ===== duo =====
.neon-duo {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: start;
}

// ===== promo =====
.neon-promo {
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

// ===== rank =====
.neon-rank {
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

  // 基礎 &__no 先宣告（低 specificity），nth-child 強調色覆寫放後面，
  // 避免 stylelint no-descending-specificity（dev lintOnStart 會擋）
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

// ===== app =====
.neon-app {
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &__title {
    font-size: 1.3rem;
    font-weight: 800;
  }

  &__desc {
    font-size: 0.88rem;
    color: var(--text-muted);
    margin-top: 4px;
  }

  &__row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
}

// ===== footer =====
.neon-footer {
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

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__fine {
    line-height: 1.7;
    opacity: 0.7;
  }
}

// 1280px 以上：grid 升至 4 欄（對齊原稿 @media min-width:1280px）
@media (width >= 1280px) {
  .neon-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
