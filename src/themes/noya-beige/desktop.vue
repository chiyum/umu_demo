<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  promoSrc,
  noticeSrc,
  gameThumbs,
  cardDgSrc,
  cardAllbetSrc,
  DESKTOP_NAV,
  LOBBY_CATEGORIES,
  LOBBY_CARDS,
  FOOTER_PROVIDERS
} from "./_data";

/**
 * noya-beige（諾亞米色）桌面版 — 「新做」的桌機版
 *
 * 來源稿諾亞米色只有手機版，依任務規約：
 *   「手機版設計稿 → 參考另一份（大亨富遊）桌機版區塊結構補做 desktop」
 * 故 desktop 區塊結構參考富遊桌機（top nav / hero stage / 熱門遊戲 grid /
 *   下載 / 服務 / footer 多欄佈局），但「配色與內容沿用諾亞米色自己的調性」：
 *   - 米色暖調（[data-theme="noya-beige"] var）
 *   - 內容沿用諾亞手機版區塊：hero banner、系統公告、在線人數、
 *     大廳分類（真人/體育/棋牌/電子/捕魚）+ 卡片
 *
 * Logo 接線：header 顯示 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前大廳分類 */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲縮圖（沿用 g1..g6 切片，desktop 4 欄宮格） */
const popularThumbs = gameThumbs;

/** 服務 3 卡（沿用諾亞調性文案） */
const services = [
  {
    icon: "material-symbols:bolt-outline",
    title: "極速存提",
    desc: "智能金流系統，存款即時到帳、提款快速審核，全程透明安心。"
  },
  {
    icon: "material-symbols:diversity-3-outline",
    title: "多元品類",
    desc: "真人、體育、棋牌、電子、捕魚一站集合，暢玩各式娛樂。"
  },
  {
    icon: "material-symbols:verified-user-outline",
    title: "資安守護",
    desc: "全程加密與實名制保障，守護每位會員的帳戶與資金安全。"
  }
];
</script>

<template>
  <div class="noya-beige-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-beige-d__nav">
      <div class="noya-beige-d__nav-inner">
        <a class="noya-beige-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-beige-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-beige-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-beige-d__nav-cta">
          <span class="noya-beige-d__btn noya-beige-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-beige-d__btn noya-beige-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
    </header>

    <main class="noya-beige-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-beige-d__hero">
        <div class="noya-beige-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-beige-d__hero-side">
          <div class="noya-beige-d__notice">
            <img :src="noticeSrc" alt="系統公告" />
          </div>
          <div class="noya-beige-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 大廳：分類 tab + 卡片 ===== -->
      <section class="noya-beige-d__lobby noya-beige-d__section">
        <div class="noya-beige-d__sec-head">
          <span class="noya-beige-d__sec-zh">遊戲大廳</span>
          <span class="noya-beige-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-beige-d__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-beige-d__tab"
            :class="{ 'noya-beige-d__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon :icon="cat.icon" />
            <span>{{ cat.label }}</span>
          </button>
        </div>
        <div class="noya-beige-d__cards">
          <template v-for="(c, i) in cards" :key="i">
            <img
              v-if="c.img"
              class="noya-beige-d__gcard"
              :src="c.img"
              :alt="c.alt"
            />
            <div v-else class="noya-beige-d__phcard">
              <div class="noya-beige-d__phcard-label">
                <div class="noya-beige-d__phcard-big">{{ c.big }}</div>
                <div class="noya-beige-d__phcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 熱門遊戲 4 欄宮格 ===== -->
      <section class="noya-beige-d__section noya-beige-d__section--soft">
        <div class="noya-beige-d__sec-head">
          <span class="noya-beige-d__sec-zh">熱門遊戲</span>
          <span class="noya-beige-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-beige-d__pop-grid">
          <div
            v-for="(g, i) in popularThumbs"
            :key="i"
            class="noya-beige-d__pop-card"
          >
            <img :src="g" :alt="`熱門遊戲 ${i + 1}`" />
          </div>
          <div class="noya-beige-d__pop-card noya-beige-d__pop-card--live">
            <img :src="cardDgSrc" alt="DG 真人" />
          </div>
          <div class="noya-beige-d__pop-card noya-beige-d__pop-card--live">
            <img :src="cardAllbetSrc" alt="歐博真人" />
          </div>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-beige-d__download noya-beige-d__section">
        <div class="noya-beige-d__dl-left">
          <img :src="promoSrc" alt="App 下載" />
        </div>
        <div class="noya-beige-d__dl-right">
          <div class="noya-beige-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-beige-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-beige-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 3 卡 ===== -->
      <section class="noya-beige-d__section noya-beige-d__section--soft">
        <div class="noya-beige-d__sec-head">
          <span class="noya-beige-d__sec-zh">頂尖服務</span>
          <span class="noya-beige-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-beige-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-beige-d__svc-card"
          >
            <div class="noya-beige-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-beige-d__footer">
      <div class="noya-beige-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-beige-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-beige-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-beige-d {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }

  // ===== TOP NAV =====
  &__nav {
    position: sticky;
    top: 0;
    z-index: 60;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 4px 16px rgba(170, 150, 140, 0.12);
  }

  &__nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__logo {
    flex-shrink: 0;

    img {
      height: 40px;
      width: auto;
      object-fit: contain;
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  &__link {
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    border-radius: 10px;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: var(--bg-overlay);
      color: var(--color-primary);
    }
  }

  &__nav-cta {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  &__btn {
    padding: 9px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &--ghost {
      border: 1px solid var(--border);
      color: var(--color-primary);
      background: var(--bg-surface);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 12px rgba(198, 106, 60, 0.3);
    }
  }

  // ===== HERO =====
  &__hero {
    max-width: 1200px;
    margin: 0 auto;
    padding: 28px 24px 0;
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 20px;
    align-items: stretch;
  }

  &__hero-banner {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--hero-shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__hero-side {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__notice {
    flex: 1;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__online {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 16px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    font-size: 18px;
    font-weight: 500;
    color: var(--text-muted);

    b {
      color: var(--online-num);
      font-weight: 700;
    }
  }

  // ===== SECTION SHELL =====
  &__section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;

    &--soft {
      max-width: none;
      background: var(--section-soft);

      > .noya-beige-d__sec-head,
      > .noya-beige-d__pop-grid,
      > .noya-beige-d__svc-grid {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sec-head {
    text-align: center;
    margin-bottom: 28px;
  }

  &__sec-zh {
    display: block;
    font-size: clamp(24px, 3vw, 34px);
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--color-primary);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--text-muted);
  }

  // ===== LOBBY =====
  &__tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 20px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--tab-text);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s;

    :deep(svg) {
      font-size: 20px;
      color: var(--tab-icon);
    }

    &--on {
      background: var(--tab-active-bg);
      border-color: transparent;
      color: var(--tab-text-active);
      box-shadow: var(--tab-active-shadow);

      :deep(svg) {
        color: var(--tab-icon-active);
      }
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
  }

  &__gcard {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: var(--gcard-shadow);
  }

  &__phcard {
    position: relative;
    aspect-ratio: 760 / 215;
    border-radius: 16px;
    overflow: hidden;
    background: var(--phcard-bg);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    padding-left: 28px;
  }

  &__phcard-big {
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    color: var(--phcard-label);
    border-left: 3px solid var(--phcard-label-bar);
    padding-left: 12px;
    line-height: 1.1;
  }

  &__phcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 12px;
    color: var(--phcard-sub);
    letter-spacing: 0.12em;
    margin: 6px 0 0 15px;
  }

  // ===== POPULAR GRID =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }

  &__pop-card {
    border-radius: 16px;
    overflow: hidden;
    background: var(--bg-surface);
    box-shadow: var(--shadow);
    transition:
      transform 0.18s,
      box-shadow 0.18s;

    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      display: block;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--gcard-shadow);
    }

    &--live img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
  }

  // ===== DOWNLOAD =====
  &__download {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: center;
  }

  &__dl-left {
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--gcard-shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__dl-title {
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 900;
    color: var(--color-primary);
    letter-spacing: 2px;
  }

  &__dl-desc {
    margin: 16px 0 24px;
    color: var(--text-muted);
    font-size: 16px;
    line-height: 1.9;
    max-width: 440px;
  }

  &__dl-cta {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 999px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-weight: 900;
    box-shadow: 0 4px 12px rgba(198, 106, 60, 0.3);
  }

  // ===== SERVICES =====
  // stylelint-disable-next-line no-descending-specificity
  &__svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }

  &__svc-card {
    padding: 36px 28px;
    border-radius: 18px;
    text-align: center;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);

    h3 {
      font-size: 20px;
      font-weight: 800;
      color: var(--color-primary);
      margin: 16px 0 12px;
    }

    p {
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  &__svc-ic {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 38px;
  }

  // ===== FOOTER =====
  &__footer {
    background: var(--footer-bg);
    border-top: 1px solid var(--border);
    padding: 40px 24px 28px;
  }

  &__footer-grid {
    max-width: 1200px;
    margin: 0 auto 28px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;

    span {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      opacity: 0.8;
    }
  }

  &__footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 12px;

    a {
      color: var(--text-muted);
      font-size: 14px;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
    letter-spacing: 1px;
  }

  // ===== RESPONSIVE =====
  @media (width <= 980px) {
    &__hero {
      grid-template-columns: 1fr;
    }

    &__pop-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    &__download {
      grid-template-columns: 1fr;
    }

    &__svc-grid {
      grid-template-columns: 1fr;
    }

    &__footer-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    &__menu {
      display: none;
    }
  }
}
</style>
