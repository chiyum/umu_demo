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
 * noya-jade（翡翠綠金）桌面版
 *
 * 設計主軸：深墨綠玻璃感底，翡翠金 accent
 * 遊戲大廳 section 改為「左側分類 sidebar + 右側卡片內容」橫向佈局，
 * 讓桌機也凸顯左按鈕 + 右頁面主軸。
 * 左側 sidebar 按鈕沿用手機版精緻 pill 欄設計（左緣 accent bar + glow）。
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（混排） */
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
  <div class="noya-jade-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-jade-d__nav">
      <div class="noya-jade-d__nav-inner">
        <a class="noya-jade-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-jade-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-jade-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-jade-d__nav-cta">
          <span class="noya-jade-d__btn noya-jade-d__btn--ghost">會員登入</span>
          <span class="noya-jade-d__btn noya-jade-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-jade-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-jade-d__hero">
        <div class="noya-jade-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-jade-d__hero-side">
          <div class="noya-jade-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-jade-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 大廳（左側分類 sidebar + 右側卡片）===== -->
      <section class="noya-jade-d__section">
        <div class="noya-jade-d__sec-head">
          <span class="noya-jade-d__sec-zh">遊戲大廳</span>
          <span class="noya-jade-d__sec-en">GAME LOBBY</span>
        </div>
        <!-- 橫向佈局：左 sidebar + 右卡片 -->
        <div class="noya-jade-d__lobby">
          <!-- 左側分類 sidebar（精緻 pill 欄，與手機版視覺一致） -->
          <div class="noya-jade-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-jade-d__tab"
              :class="{ 'noya-jade-d__tab--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-jade-d__tab-ic" :icon="cat.icon" />
              <span>{{ cat.label }}</span>
            </button>
          </div>
          <!-- 右側卡片區 -->
          <div class="noya-jade-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <!-- 真實切片卡 -->
              <div v-if="c.img" class="noya-jade-d__card-wrap">
                <img class="noya-jade-d__gfull" :src="c.img" :alt="c.alt" />
                <span
                  v-if="c.badge"
                  class="noya-jade-d__badge"
                  :class="{
                    'noya-jade-d__badge--hot': c.badge === 'HOT',
                    'noya-jade-d__badge--new': c.badge === 'NEW'
                  }"
                  >{{ c.badge }}</span
                >
              </div>
              <!-- 綠漸層佔位卡 -->
              <div v-else class="noya-jade-d__card-wrap">
                <div class="noya-jade-d__gcard">
                  <div class="noya-jade-d__gcard-wm">{{ c.wm }}</div>
                  <div class="noya-jade-d__gcard-label">
                    <div class="noya-jade-d__gcard-big">{{ c.big }}</div>
                    <div class="noya-jade-d__gcard-sub">{{ c.sub }}</div>
                  </div>
                </div>
                <span
                  v-if="c.badge"
                  class="noya-jade-d__badge"
                  :class="{
                    'noya-jade-d__badge--hot': c.badge === 'HOT',
                    'noya-jade-d__badge--new': c.badge === 'NEW'
                  }"
                  >{{ c.badge }}</span
                >
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-jade-d__section noya-jade-d__section--soft">
        <div class="noya-jade-d__sec-head">
          <span class="noya-jade-d__sec-zh">熱門遊戲</span>
          <span class="noya-jade-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-jade-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-jade-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-jade-d__gcard noya-jade-d__gcard--pop">
              <div class="noya-jade-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-jade-d__gcard-label">
                <div class="noya-jade-d__gcard-big">{{ c.big }}</div>
                <div class="noya-jade-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-jade-d__download noya-jade-d__section">
        <div class="noya-jade-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-jade-d__dl-right">
          <div class="noya-jade-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-jade-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-jade-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-jade-d__section noya-jade-d__section--soft">
        <div class="noya-jade-d__sec-head">
          <span class="noya-jade-d__sec-zh">頂尖服務</span>
          <span class="noya-jade-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-jade-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-jade-d__svc-card"
          >
            <div class="noya-jade-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-jade-d__footer">
      <div class="noya-jade-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-jade-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-jade-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-jade-d {
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
    box-shadow: 0 4px 16px rgba(4, 18, 10, 0.4);
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
      box-shadow: 0 4px 14px rgba(20, 130, 80, 0.5);
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

      > .noya-jade-d__sec-head,
      > .noya-jade-d__pop-grid,
      > .noya-jade-d__svc-grid {
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

  // ===== LOBBY（橫向佈局）=====
  &__lobby {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  // 左側 sidebar 分類 pill 欄
  &__sidebar {
    width: 160px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  // sidebar 按鈕：pill 造型 + 左緣 accent bar + glow
  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 13px 16px 13px 20px;
    border-radius: 999px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--ink-mute);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    // 左緣 3px accent bar
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 18%;
      bottom: 18%;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--color-primary);
      opacity: 0;
      transition: opacity 0.18s ease;
    }

    &--on {
      background: var(--tab-active-bg);
      border-color: rgba(40, 180, 110, 0.5);
      color: #e8fff4;
      box-shadow:
        0 6px 18px var(--glow),
        inset 0 1px 1px rgba(255, 255, 255, 0.18);

      &::before {
        opacity: 1;
      }

      .noya-jade-d__tab-ic {
        color: var(--color-secondary);
      }
    }

    &:hover:not(.noya-jade-d__tab--on) {
      background: var(--glass);
      color: var(--text-muted);
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 22px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.18s ease;
  }

  // 右側卡片區（2 欄 grid）
  &__cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    min-width: 0;
  }

  // 卡片包裝（含角標定位錨點）
  &__card-wrap {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 16px;
    display: block;
    box-shadow: var(--shadow);
  }

  // HOT/NEW 角標
  &__badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.06em;
    z-index: 4;

    &--hot {
      background: linear-gradient(135deg, #ff6b3d, #e8432a);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(230, 60, 30, 0.6);
    }

    &--new {
      background: linear-gradient(135deg, #1cd9cc, #0fa89e);
      color: #001e1c;
      box-shadow: 0 2px 8px rgba(20, 200, 190, 0.6);
    }
  }

  // 綠漸層佔位卡
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
    color: rgba(40, 180, 110, 0.1);
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
    color: #e8fff4;
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
    box-shadow: 0 4px 14px rgba(20, 130, 80, 0.5);
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

    &__lobby {
      flex-direction: column;
    }

    &__sidebar {
      width: 100%;
      flex-flow: row wrap;
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
