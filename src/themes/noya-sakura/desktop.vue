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
 * noya-sakura（櫻粉柔美）桌面版
 *
 * 設計主軸：淺色粉白底，全圓角 bubble 風格，柔粉陰影。
 * 結構：sticky nav / hero+公告+在線 / 遊戲大廳（左 sidebar + 右 squircle 卡片） /
 *   熱門遊戲 grid / 下載 / 服務 / footer。
 * 大廳 sidebar：bubble 膠囊 tab + badge，active = 粉漸層。
 * 卡片：squircle（border-radius 22~26px）+ 柔粉陰影，hover 微浮起。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（真人切片 + 粉漸層佔位卡混排） */
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
    desc: "真人、體育、棋牌、電子、捕魚一站集合，暢玩各式娛樂遊戲。"
  },
  {
    icon: "material-symbols:verified-user-outline",
    title: "資安守護",
    desc: "全程加密與實名制保障，守護每位會員的帳戶與資金安全。"
  }
];
</script>

<template>
  <div class="noya-sakura-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-sakura-d__nav">
      <div class="noya-sakura-d__nav-inner">
        <a class="noya-sakura-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-sakura-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-sakura-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-sakura-d__nav-cta">
          <span class="noya-sakura-d__btn noya-sakura-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-sakura-d__btn noya-sakura-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
    </header>

    <main class="noya-sakura-d__main">
      <!-- ===== HERO + 公告 + 在線 ===== -->
      <section class="noya-sakura-d__hero">
        <div class="noya-sakura-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-sakura-d__hero-side">
          <div class="noya-sakura-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-sakura-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 大廳（左 sidebar + 右 squircle 卡片）===== -->
      <section class="noya-sakura-d__section">
        <div class="noya-sakura-d__sec-head">
          <span class="noya-sakura-d__sec-zh">遊戲大廳</span>
          <span class="noya-sakura-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-sakura-d__lobby">
          <!-- 左側 sidebar 分類（bubble 膠囊 + badge） -->
          <div class="noya-sakura-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-sakura-d__stab"
              :class="{ 'noya-sakura-d__stab--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <!-- 右上角 badge -->
              <span v-if="cat.badge" class="noya-sakura-d__stab-badge">{{
                cat.badge
              }}</span>
              <Icon class="noya-sakura-d__stab-ic" :icon="cat.icon" />
              <span class="noya-sakura-d__stab-label">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 右側 squircle 卡片內容 -->
          <div class="noya-sakura-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <img
                v-if="c.img"
                class="noya-sakura-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <div v-else class="noya-sakura-d__gcard">
                <div class="noya-sakura-d__gcard-wm">{{ c.wm }}</div>
                <div class="noya-sakura-d__gcard-label">
                  <div class="noya-sakura-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-sakura-d__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-sakura-d__section noya-sakura-d__section--soft">
        <div class="noya-sakura-d__sec-head">
          <span class="noya-sakura-d__sec-zh">熱門遊戲</span>
          <span class="noya-sakura-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-sakura-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-sakura-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-sakura-d__gcard noya-sakura-d__gcard--pop">
              <div class="noya-sakura-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-sakura-d__gcard-label">
                <div class="noya-sakura-d__gcard-big">{{ c.big }}</div>
                <div class="noya-sakura-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-sakura-d__download noya-sakura-d__section">
        <div class="noya-sakura-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-sakura-d__dl-right">
          <div class="noya-sakura-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-sakura-d__dl-desc">
            娛樂平台支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-sakura-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-sakura-d__section noya-sakura-d__section--soft">
        <div class="noya-sakura-d__sec-head">
          <span class="noya-sakura-d__sec-zh">頂尖服務</span>
          <span class="noya-sakura-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-sakura-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-sakura-d__svc-card"
          >
            <div class="noya-sakura-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-sakura-d__footer">
      <div class="noya-sakura-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-sakura-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-sakura-d__footer-copy">© 2025 娛樂平台 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-sakura-d {
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
    border-bottom: 1.5px solid var(--glass-line);
    box-shadow: 0 4px 20px rgba(232, 107, 158, 0.1);
    backdrop-filter: blur(12px);
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
    padding: 9px 16px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);
    border-radius: 999px;
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
    padding: 9px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &--ghost {
      border: 1.5px solid var(--border);
      color: var(--color-primary);
      background: rgba(255, 255, 255, 0.9);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 16px rgba(232, 107, 158, 0.4);
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
    border-radius: 26px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
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
    border-radius: 22px;
    background: var(--notice-bg);
    border: 1.5px solid var(--glass-line);
    color: var(--color-primary);
    font-size: 22px;

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.7;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  &__online {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid var(--glass-line);
    box-shadow: 0 4px 16px rgba(232, 107, 158, 0.1);
    font-size: 16px;
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

      > .noya-sakura-d__sec-head,
      > .noya-sakura-d__pop-grid,
      > .noya-sakura-d__svc-grid {
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
    font-weight: 800;
    letter-spacing: 4px;
    color: var(--color-primary);
    text-shadow: 0 0 24px var(--glow);
  }

  &__sec-en {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    letter-spacing: 7px;
    color: var(--ink-mute);
  }

  // ===== LOBBY（左 sidebar + 右卡片）=====
  &__lobby {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 20px;
    align-items: flex-start;
  }

  // 左側 sidebar 分類（bubble 膠囊 tab）
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0;
  }

  &__stab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    cursor: pointer;
    color: var(--ink-soft);

    // 全圓角 bubble 膠囊
    border-radius: 999px;
    border: 1.5px solid var(--glass-line);
    background: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    font-weight: 500;
    transition:
      background 0.18s,
      color 0.18s,
      box-shadow 0.18s;

    // active：粉漸層 + 柔粉陰影
    &--on {
      background: var(--tab-active-bg);
      border-color: transparent;
      color: var(--text-on-primary);
      box-shadow:
        0 8px 24px rgba(232, 107, 158, 0.35),
        0 2px 6px rgba(232, 107, 158, 0.15);

      .noya-sakura-d__stab-badge {
        background: rgba(255, 255, 255, 0.9);
        color: var(--color-primary);
      }

      .noya-sakura-d__stab-ic,
      .noya-sakura-d__stab-label {
        color: var(--text-on-primary);
      }
    }
  }

  // 右上角 badge
  // stylelint-disable-next-line no-descending-specificity
  &__stab-badge {
    position: absolute;
    top: -4px;
    right: 8px;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--color-primary);
    color: var(--text-on-primary);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(232, 107, 158, 0.4);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__stab-ic {
    font-size: 22px;
    flex: none;
    color: var(--ink-soft);
    transition: color 0.18s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__stab-label {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);
    transition: color 0.18s;
  }

  // 右側卡片（squircle grid）
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 22px;
    box-shadow: var(--shadow);
    border: 1.5px solid var(--glass-line);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow:
        0 16px 40px rgba(232, 107, 158, 0.22),
        0 4px 12px rgba(232, 107, 158, 0.12);
    }
  }

  // 粉漸層佔位卡（squircle）
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
    border-radius: 22px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow:
        0 16px 40px rgba(232, 107, 158, 0.2),
        0 4px 12px rgba(232, 107, 158, 0.1);
    }

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
    color: rgba(232, 107, 158, 0.1);
    pointer-events: none;
  }

  &__gcard-label {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__gcard-big {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    border-left: 2px solid var(--card-label-bar);
    padding-left: 10px;
    white-space: nowrap;
  }

  &__gcard-sub {
    font-size: 11px;
    font-weight: 500;
    color: var(--card-sub);
    letter-spacing: 0.12em;
    margin: 8px 0 0 12px;
  }

  // ===== POPULAR GRID =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__pop-card {
    border-radius: 22px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

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
    border-radius: 26px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__dl-title {
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 800;
    color: var(--color-primary);
    letter-spacing: 3px;
    text-shadow: 0 0 24px var(--glow);
  }

  &__dl-desc {
    margin: 16px 0 24px;
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.9;
    max-width: 440px;
  }

  &__dl-cta {
    display: inline-block;
    padding: 12px 32px;
    border-radius: 999px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(232, 107, 158, 0.45);
    cursor: pointer;
    transition: transform 0.15s ease;

    &:hover {
      transform: translateY(-2px);
    }
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
    border-radius: 26px;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

    h3 {
      font-size: 20px;
      font-weight: 700;
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
    font-size: 36px;
    box-shadow: 0 6px 20px rgba(232, 107, 158, 0.35);
  }

  // ===== FOOTER =====
  &__footer {
    background: var(--footer-bg);
    border-top: 1.5px solid var(--glass-line);
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
      font-weight: 500;
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
        color: var(--color-primary);
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
      grid-template-columns: 130px 1fr;
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
