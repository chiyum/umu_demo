<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  hotGameSrc,
  appSrc,
  NAV_ITEMS,
  POPULAR_TABS,
  GAME_CARDS,
  SERVICE_CARDS,
  FOOTER_PROVIDERS,
  TICKER_MESSAGES
} from "./_data";

/**
 * fuyou（富遊大亨）桌面版 — 1:1 對齊大亨_富遊_clone_自包含.html 桌機結構
 *
 * 對齊原稿 6 段：
 *   1. TOP NAV     sticky 深藍 nav + RG/富遊 logo + 9 項選單（富遊直播金色）+ 客服圈
 *   2. HERO        藍色 radial 大圖 stage + 金漸層大字疊字（HERO COPY）
 *   3. TICKER      跑馬燈公告（horn + marquee，hover 暫停）
 *   4. POPULAR     tabs + 左 HOT GAME 文案 + 8 張藍邊遊戲卡 + 右主視覺圖
 *   5. DOWNLOAD    左 App 手機圖 + 右 RG APP 文案 + QR
 *   6. SERVICES    3 張藍球 icon 服務卡
 *   7. FOOTER      24 廠商文字牆 + 連結 + 版權
 *
 * 所有顏色走 [data-theme="fuyou"] CSS var，配色變體靠 _variants.scss 切，元件不寫死。
 *
 * Logo 接線：header 左側 RG/富遊 文字標旁不寫死品牌 logo，
 * 改顯示 themeStore.currentLogo（讓 showcase / demo logo 切換器能換 logo），
 * 與既有 noya / fived theme 同模式。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
// 白底彩字 logo 在深藍 nav 上套 mix-blend-mode: screen 洗白底；透明底 logo 跳過
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

/** 當前熱門 tab（純前端互動，不打 API） */
const activeTab = ref<string>("熱門");

/** 跑馬燈內容複製一輪做無縫滾動（對齊原稿 8 個 span = 4 句 × 2） */
const tickerLoop = computed(() => [...TICKER_MESSAGES, ...TICKER_MESSAGES]);
</script>

<template>
  <div class="fuyou-layout">
    <!-- ===== 1. TOP NAV ===== -->
    <header class="fuyou-nav">
      <div class="fuyou-nav__inner">
        <a class="fuyou-nav__logo" href="#" @click.prevent>
          <img
            class="fuyou-nav__logo-img"
            :class="{ 'fuyou-nav__logo-img--blend': useScreenBlend }"
            :src="logoSrc"
            :alt="logoLabel"
          />
        </a>
        <nav class="fuyou-nav__menu">
          <a
            v-for="item in NAV_ITEMS"
            :key="item.label"
            class="fuyou-nav__link"
            :class="{ 'fuyou-nav__link--gold': item.gold }"
            href="#"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="fuyou-nav__help" title="客服">?</div>
      </div>
    </header>

    <main class="fuyou-layout__main">
      <!-- ===== 2. HERO ===== -->
      <section class="fuyou-hero">
        <div class="fuyou-hero__stage">
          <img class="fuyou-hero__img" :src="heroSrc" alt="富遊娛樂城主視覺" />
          <div class="fuyou-hero__copy">
            <span class="fuyou-hero__copy-line">FORTUNE</span>
            <span class="fuyou-hero__copy-line">富遊娛樂</span>
          </div>
        </div>
      </section>

      <!-- ===== 3. TICKER ===== -->
      <div class="fuyou-ticker">
        <div class="fuyou-ticker__horn">
          <Icon icon="material-symbols:campaign-outline" />
        </div>
        <div class="fuyou-ticker__track">
          <span
            v-for="(msg, i) in tickerLoop"
            :key="i"
            class="fuyou-ticker__item"
          >
            {{ msg }}
          </span>
        </div>
      </div>

      <!-- ===== 4. POPULAR ===== -->
      <section class="fuyou-block fuyou-popular">
        <div class="fuyou-wrap">
          <div class="fuyou-sec-head">
            <span class="fuyou-sec-head__zh">眾多熱門遊戲</span>
            <span class="fuyou-sec-head__en">POPULAR</span>
          </div>

          <div class="fuyou-tabs">
            <button
              v-for="tab in POPULAR_TABS"
              :key="tab"
              type="button"
              class="fuyou-tabs__btn"
              :class="{ 'fuyou-tabs__btn--active': activeTab === tab }"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <div class="fuyou-hot">
            <div class="fuyou-hot__left">
              <div class="fuyou-hot__title">HOT GAME</div>
              <p class="fuyou-hot__sub">
                富遊娛樂城所精選的暢銷遊戲，賠率多、耐玩且讓您玩到愛不釋手
              </p>
              <div class="fuyou-game-grid">
                <div
                  v-for="(g, i) in GAME_CARDS"
                  :key="i"
                  class="fuyou-game-card"
                >
                  <span v-if="g.badge" class="fuyou-game-card__badge">
                    {{ g.badge }}
                  </span>
                  <span v-if="g.rg" class="fuyou-game-card__rg">
                    <i class="fuyou-game-card__rg-mark">RG</i>
                    <em class="fuyou-game-card__rg-label">{{ g.rgLabel }}</em>
                  </span>
                  <template v-else>
                    <span class="fuyou-game-card__logo">{{ g.wm }}</span>
                    <span class="fuyou-game-card__name">{{ g.name }}</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="fuyou-hot__right">
              <img
                class="fuyou-hot__img"
                :src="hotGameSrc"
                alt="熱門遊戲主視覺"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ===== 5. DOWNLOAD ===== -->
      <section class="fuyou-block fuyou-download">
        <div class="fuyou-wrap">
          <div class="fuyou-sec-head">
            <span class="fuyou-sec-head__zh">暢享行動裝置</span>
            <span class="fuyou-sec-head__en">DOWNLOAD</span>
          </div>
          <div class="fuyou-dl">
            <div class="fuyou-dl__left">
              <img class="fuyou-dl__img" :src="appSrc" alt="App 手機展示" />
            </div>
            <div class="fuyou-dl__right">
              <div class="fuyou-dl__rgapp">RG APP</div>
              <div class="fuyou-dl__anytime">隨時隨地</div>
              <p class="fuyou-dl__desc">
                富遊娛樂城支持所有移動裝置，提供真人、電子、彩票、棋牌暨富遊體育賽事、電競賽事，立即下載，隨時隨地享受最暢快的遊戲體驗。
              </p>
              <div class="fuyou-dl__qr" title="掃描下載 App">
                <Icon icon="material-symbols:qr-code-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== 6. SERVICES ===== -->
      <section class="fuyou-block fuyou-services">
        <div class="fuyou-wrap">
          <div class="fuyou-sec-head">
            <span class="fuyou-sec-head__zh">頂尖優質服務</span>
            <span class="fuyou-sec-head__en">SERVICES</span>
          </div>
          <div class="fuyou-svc-grid">
            <div
              v-for="svc in SERVICE_CARDS"
              :key="svc.title"
              class="fuyou-svc-card"
            >
              <div class="fuyou-svc-card__ic">
                <Icon :icon="svc.icon" />
              </div>
              <h3 class="fuyou-svc-card__title">{{ svc.title }}</h3>
              <p class="fuyou-svc-card__desc">{{ svc.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== 7. FOOTER ===== -->
    <footer class="fuyou-footer">
      <div class="fuyou-wrap">
        <div class="fuyou-footer__grid">
          <div v-for="p in FOOTER_PROVIDERS" :key="p" class="fuyou-footer__pl">
            {{ p }}
          </div>
        </div>
        <div class="fuyou-footer__links">
          <a href="#" @click.prevent>免責聲明</a>
          <a href="#" @click.prevent>服務條款</a>
          <a href="#" @click.prevent>責任博彩</a>
        </div>
        <div class="fuyou-footer__copy">© 2018-2025 富遊娛樂城 版權所有</div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.fuyou-layout {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  &__main {
    flex: 1;
  }
}

.fuyou-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// ===== TOP NAV =====
.fuyou-nav {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--nav-bg);
  border-top: 3px solid var(--nav-line);
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.45);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 64px;
  }

  &__logo {
    display: flex;
    align-items: center;
    margin-right: 14px;
    flex-shrink: 0;
  }

  &__logo-img {
    height: 38px;
    width: auto;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  &__link {
    position: relative;
    padding: 8px 13px;
    font-size: 16px;
    font-weight: 700;
    color: #cdddf6;
    border-radius: 7px;
    white-space: nowrap;
    transition:
      color 0.15s,
      background 0.15s;

    &:hover {
      color: #ffffff;
      background: var(--bg-overlay);
    }

    &--gold {
      color: var(--text-on-cta);
      font-weight: 900;
      background: var(--gradient-cta);
      box-shadow: 0 3px 12px rgba(255, 180, 40, 0.45);

      &:hover {
        color: var(--text-on-cta);
        filter: brightness(1.06);
      }
    }
  }

  &__help {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1.5px solid rgba(120, 180, 255, 0.55);
    color: var(--cyan);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 17px;
    background: rgba(40, 90, 180, 0.25);
  }
}

// ===== HERO =====
.fuyou-hero {
  position: relative;
  background: var(--gradient-hero);
  overflow: hidden;

  &__stage {
    position: relative;
    max-width: 1500px;
    margin: 0 auto;
    height: clamp(240px, 33vw, 520px);
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__copy {
    position: absolute;
    left: max(20px, calc(50% - 720px));
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    pointer-events: none;
    display: flex;
    flex-direction: column;
  }

  &__copy-line {
    font-family: var(--font-display);
    font-weight: 900;
    font-size: clamp(40px, 7vw, 100px);
    line-height: 0.92;
    letter-spacing: 2px;
    background: linear-gradient(
      180deg,
      #fff6cf 8%,
      #ffd24a 42%,
      #b9760f 60%,
      #ffe79a 90%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 0 rgba(90, 40, 0, 0.35))
      drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
  }
}

// ===== TICKER =====
.fuyou-ticker {
  background: var(--ticker-bg);
  border-top: 1px solid rgba(80, 140, 240, 0.25);
  border-bottom: 1px solid rgba(80, 140, 240, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
  height: 42px;
  overflow: hidden;

  &__horn {
    flex-shrink: 0;
    padding-left: 18px;
    color: var(--cyan);
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  &__track {
    display: flex;
    white-space: nowrap;
    will-change: transform;
    animation: fuyou-marq 30s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__item {
    padding: 0 38px;
    font-size: 14px;
    color: #cfe0fb;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 14px;
      background: rgba(120, 170, 255, 0.3);
    }
  }
}

@keyframes fuyou-marq {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

// ===== SECTION SHELL =====
.fuyou-block {
  position: relative;
  padding: 64px 0 30px;
}

.fuyou-sec-head {
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  &__zh {
    position: relative;
    z-index: 2;
    display: inline-block;
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 900;
    letter-spacing: 6px;
    color: #ffffff;
    text-shadow: var(--head-glow);
  }

  &__en {
    display: block;
    margin-top: -6px;
    font-family: var(--font-display);
    font-weight: 800;
    font-style: italic;
    font-size: clamp(20px, 2.6vw, 34px);
    letter-spacing: 8px;
    color: transparent;
    -webkit-text-stroke: 1px rgba(120, 175, 255, 0.28);
  }
}

// ===== POPULAR =====
.fuyou-popular {
  background: var(--popular-bg);
  background-image: var(--popular-bg), var(--tech-grid);
  background-size:
    cover,
    46px 46px;
}

.fuyou-tabs {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 0 auto 26px;
  background: rgba(10, 22, 52, 0.6);
  border: 1px solid rgba(80, 140, 240, 0.2);
  border-radius: 40px;
  padding: 7px;
  max-width: 760px;

  &__btn {
    appearance: none;
    border: 0;
    cursor: pointer;
    background: transparent;
    color: #a9c2e8;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    padding: 9px 22px;
    border-radius: 30px;
    transition: 0.15s;

    &:hover {
      color: #ffffff;
    }

    &--active {
      color: #ffffff;
      background: linear-gradient(180deg, #3f9bff, #1c5fe0);
      box-shadow:
        0 4px 16px rgba(40, 110, 235, 0.6),
        inset 0 1px 2px rgba(255, 255, 255, 0.4);
    }
  }
}

.fuyou-hot {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 20px;
  align-items: center;

  &__title {
    font-family: var(--font-display);
    font-weight: 800;
    font-style: italic;
    font-size: clamp(44px, 7vw, 96px);
    line-height: 0.9;
    letter-spacing: 1px;
    background: linear-gradient(
      180deg,
      #eaf4ff 10%,
      #9cc6ff 45%,
      #3f7fe0 60%,
      #dcebff 92%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 3px 0 rgba(10, 30, 80, 0.5))
      drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
  }

  &__sub {
    margin: 14px 2px 26px;
    color: var(--txt-dim);
    font-size: 15px;
    line-height: 1.7;
    max-width: 520px;
  }

  &__right {
    position: relative;
    min-height: 330px;
  }

  &__img {
    width: 100%;
    height: 100%;
    min-height: 330px;
    object-fit: contain;
    border-radius: 18px;
  }
}

.fuyou-game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 560px;
}

.fuyou-game-card {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: var(--game-card-bg);
  border: 1px solid var(--card-edge);
  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(150, 200, 255, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.18s,
    box-shadow 0.18s;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 14px 30px rgba(30, 90, 200, 0.55),
      inset 0 1px 1px rgba(150, 200, 255, 0.3);
  }

  &__badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--badge-bg);
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 12px 4px;
    border-radius: 0 0 9px 9px;
    letter-spacing: 1px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
  }

  &__logo {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -1px;
    color: #ffffff;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
  }

  &__name {
    font-size: 15px;
    font-weight: 700;
    color: #dcebff;
    letter-spacing: 1px;
  }

  &__rg {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    margin-top: 8px;
  }

  &__rg-mark {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: 26px;
    background: var(--rg-red);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__rg-label {
    font-style: normal;
    font-size: 11px;
    letter-spacing: 2px;
    color: #cfe0fb;
    margin-top: 2px;
  }
}

// ===== DOWNLOAD =====
.fuyou-download {
  background: var(--download-bg);
}

.fuyou-dl {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 30px;
  align-items: center;

  &__left {
    position: relative;
    min-height: 360px;
  }

  &__img {
    width: 100%;
    height: 100%;
    min-height: 360px;
    object-fit: contain;
    border-radius: 18px;
  }

  &__right {
    padding: 10px 6px;
  }

  &__rgapp {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: clamp(44px, 5vw, 70px);
    color: #ffffff;
    letter-spacing: 1px;
    line-height: 1;
    text-shadow:
      0 0 22px rgba(80, 160, 255, 0.6),
      0 3px 0 rgba(0, 0, 0, 0.4);
  }

  &__anytime {
    font-size: clamp(26px, 3vw, 40px);
    font-weight: 900;
    color: var(--text-primary);
    margin: 8px 0 18px;
    letter-spacing: 4px;
  }

  &__desc {
    color: var(--txt-dim);
    font-size: 15px;
    line-height: 1.9;
    max-width: 430px;
  }

  &__qr {
    margin-top: 24px;
    width: 150px;
    height: 150px;
    border-radius: 12px;
    background: #ffffff;
    padding: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a1430;
    font-size: 120px;
  }
}

// ===== SERVICES =====
.fuyou-services {
  background: var(--services-bg);
  padding-bottom: 60px;
}

.fuyou-svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.fuyou-svc-card {
  position: relative;
  padding: 46px 28px 34px;
  border-radius: 18px;
  text-align: center;
  background: var(--svc-card-bg);
  border: 1px solid var(--card-edge);
  box-shadow:
    0 14px 34px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(150, 200, 255, 0.2);

  &__ic {
    width: 96px;
    height: 96px;
    margin: 0 auto 22px;
    border-radius: 50%;
    background: var(--svc-ic-bg);
    box-shadow:
      0 0 0 8px rgba(50, 120, 230, 0.18),
      0 10px 26px rgba(20, 80, 200, 0.55),
      inset 0 2px 6px rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46px;
    color: #eaf6ff;
  }

  &__title {
    font-size: 21px;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 14px;
    letter-spacing: 2px;
  }

  &__desc {
    color: var(--txt-dim);
    font-size: 14px;
    line-height: 1.85;
  }
}

// ===== FOOTER =====
.fuyou-footer {
  background: var(--footer-bg);
  border-top: 1px solid rgba(80, 140, 240, 0.18);
  padding: 46px 0 30px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 18px 14px;
    margin-bottom: 38px;
  }

  &__pl {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-style: italic;
    font-size: 15px;
    letter-spacing: 0.5px;
    color: #5d76a3;
    opacity: 0.72;
    line-height: 1.05;
    transition: 0.18s;

    &:hover {
      color: #acc6ee;
      opacity: 1;
    }
  }

  &__links {
    display: flex;
    justify-content: center;
    gap: 26px;
    margin-bottom: 14px;

    a {
      color: #8aa2c8;
      font-size: 14px;

      &:hover {
        color: #ffffff;
      }
    }
  }

  &__copy {
    text-align: center;
    color: #56688c;
    font-size: 13px;
    letter-spacing: 1px;
  }
}

// ===== RESPONSIVE（對齊原稿斷點）=====
@media (width <= 980px) {
  .fuyou-hot,
  .fuyou-dl {
    grid-template-columns: 1fr;
  }

  .fuyou-hot__right,
  .fuyou-dl__left {
    order: -1;
    min-height: 300px;
  }

  .fuyou-game-grid {
    max-width: none;
  }

  .fuyou-svc-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .fuyou-footer__grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .fuyou-dl__right {
    text-align: center;
  }

  .fuyou-dl__desc {
    margin: 0 auto;
  }

  .fuyou-dl__qr {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (width <= 760px) {
  .fuyou-nav__menu {
    display: none;
  }

  .fuyou-nav__inner {
    height: 56px;
    justify-content: space-between;
  }

  .fuyou-game-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .fuyou-block {
    padding: 46px 0 24px;
  }
}

@media (width <= 430px) {
  .fuyou-game-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .fuyou-footer__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
