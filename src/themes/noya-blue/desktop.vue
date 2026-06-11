<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  cardDgSrc,
  cardAllbetSrc,
  DESKTOP_NAV,
  LOBBY_CATEGORIES,
  LOBBY_CARDS,
  FOOTER_PROVIDERS
} from "./_data";

/**
 * noya-blue（諾亞藍）桌面版 — 「新做」的桌機版
 *
 * 來源稿諾亞藍只有手機版，依任務規約：
 *   「手機版設計稿 → 參考另一份（大亨富遊）桌機版區塊結構補做 desktop」
 * 故 desktop 區塊結構參考富遊桌機（top nav / hero stage / 熱門遊戲 grid /
 *   下載 / 服務 / footer 多欄佈局），但「配色與內容沿用諾亞藍自己的調性」：
 *   - 深海軍藍調（[data-theme="noya-blue"] var）
 *   - 內容沿用諾亞藍手機版區塊：hero banner、系統公告、在線人數、
 *     大廳分類（真人/體育/棋牌/電子/捕魚）+ 卡片（藍漸層佔位卡含水印）
 *
 * Logo 接線：header 顯示 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（藍漸層佔位卡 + 真人切片混排，沿用諾亞藍 gcard 視覺） */
const popularCards = [
  { img: cardDgSrc, alt: "DG 真人" },
  { wm: "SLOT", big: "PG 電子", sub: "PG SLOT" },
  { wm: "SPORTS", big: "熊貓體育", sub: "PANDA SPORTS" },
  { img: cardAllbetSrc, alt: "歐博真人" },
  { wm: "POKER", big: "開元棋牌", sub: "KAIYUAN CHESS" },
  { wm: "FISHING", big: "捕魚達人", sub: "FISHING MASTER" }
];

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
  <div class="noya-blue-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-blue-d__nav">
      <div class="noya-blue-d__nav-inner">
        <a class="noya-blue-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-blue-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-blue-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-blue-d__nav-cta">
          <span class="noya-blue-d__btn noya-blue-d__btn--ghost">會員登入</span>
          <span class="noya-blue-d__btn noya-blue-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-blue-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-blue-d__hero">
        <div class="noya-blue-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-blue-d__hero-side">
          <div class="noya-blue-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-blue-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 大廳 ===== -->
      <section class="noya-blue-d__section">
        <div class="noya-blue-d__sec-head">
          <span class="noya-blue-d__sec-zh">遊戲大廳</span>
          <span class="noya-blue-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-blue-d__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-blue-d__tab"
            :class="{ 'noya-blue-d__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon :icon="cat.icon" />
            <span>{{ cat.label }}</span>
          </button>
        </div>
        <div class="noya-blue-d__cards">
          <template v-for="(c, i) in cards" :key="i">
            <img
              v-if="c.img"
              class="noya-blue-d__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <div v-else class="noya-blue-d__gcard">
              <div class="noya-blue-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-blue-d__gcard-label">
                <div class="noya-blue-d__gcard-big">{{ c.big }}</div>
                <div class="noya-blue-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-blue-d__section noya-blue-d__section--soft">
        <div class="noya-blue-d__sec-head">
          <span class="noya-blue-d__sec-zh">熱門遊戲</span>
          <span class="noya-blue-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-blue-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-blue-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-blue-d__gcard noya-blue-d__gcard--pop">
              <div class="noya-blue-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-blue-d__gcard-label">
                <div class="noya-blue-d__gcard-big">{{ c.big }}</div>
                <div class="noya-blue-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-blue-d__download noya-blue-d__section">
        <div class="noya-blue-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-blue-d__dl-right">
          <div class="noya-blue-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-blue-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-blue-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-blue-d__section noya-blue-d__section--soft">
        <div class="noya-blue-d__sec-head">
          <span class="noya-blue-d__sec-zh">頂尖服務</span>
          <span class="noya-blue-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-blue-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-blue-d__svc-card"
          >
            <div class="noya-blue-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-blue-d__footer">
      <div class="noya-blue-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-blue-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-blue-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-blue-d {
  background: var(--app-bg);
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
    border-bottom: 1px solid var(--glass-line);
    box-shadow: 0 4px 16px rgba(8, 28, 60, 0.4);
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
    color: var(--ink-soft);
    border-radius: 10px;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: var(--bg-overlay);
      color: #ffffff;
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
      color: var(--color-secondary);
      background: var(--glass);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 14px rgba(40, 104, 210, 0.5);
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
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

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
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 16px 18px;
    border-radius: 16px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    color: var(--color-secondary);
    font-size: 24px;

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;

      b {
        color: var(--color-secondary);
        font-weight: 700;
      }
    }
  }

  &__online {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 16px;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    font-size: 18px;
    font-weight: 500;
    color: var(--ink-soft);

    // stylelint-disable-next-line no-descending-specificity
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

      > .noya-blue-d__sec-head,
      > .noya-blue-d__pop-grid,
      > .noya-blue-d__svc-grid {
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
    color: #ffffff;
    text-shadow: 0 0 18px var(--glow);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--ink-mute);
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
    border: 1px solid var(--glass-line);
    background: var(--glass);
    color: var(--ink-mute);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.15s;

    :deep(svg) {
      font-size: 20px;
    }

    &--on {
      background: var(--tab-active-bg);
      border-color: rgba(120, 185, 255, 0.5);
      color: #eaf4ff;
      box-shadow: 0 6px 18px var(--glow);

      :deep(svg) {
        color: var(--color-secondary);
      }
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 18px;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: var(--shadow);
  }

  // 藍漸層佔位卡（與 mobile gcard 同視覺）
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
    border-radius: 16px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    &--pop {
      aspect-ratio: 4 / 3;
    }
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 46px;
    font-weight: 900;
    font-style: italic;
    color: rgba(120, 170, 235, 0.1);
    pointer-events: none;
  }

  &__gcard-label {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &__gcard-big {
    font-size: 26px;
    font-weight: 900;
    color: #eaf4ff;
    border-left: 3px solid var(--card-label-bar);
    padding-left: 12px;
    white-space: nowrap;
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 11px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 8px 0 0 15px;
  }

  // ===== POPULAR GRID =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  &__pop-card {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
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
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__dl-title {
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 2px;
    text-shadow: 0 0 18px var(--glow);
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
    box-shadow: 0 4px 14px rgba(40, 104, 210, 0.5);
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
    background: var(--glass);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    h3 {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
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
    border-top: 1px solid var(--glass-line);
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
      color: var(--ink-mute);
      opacity: 0.8;
    }
  }

  &__footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 12px;

    a {
      color: var(--ink-soft);
      font-size: 14px;

      &:hover {
        color: var(--color-secondary);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--ink-mute);
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
