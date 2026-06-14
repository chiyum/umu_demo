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
 * noya-ink（東方墨竹宣紙）桌面版
 *
 * 設計重點：
 *   大廳 section 採「左 sidebar（印章方形分類）+ 右宣紙裱框卡片直列」佈局；
 *   整體宣紙米白底，display 字體用 Noto Serif TC 增加東方書法氣韻；
 *   留白感強，卡片邊框採宣紙雙層裱框（inner + outer border），東方古典。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

const popularCards = [
  { img: cardDgSrc, alt: "DG 真人" },
  { wm: "電子", big: "PG 電子", sub: "PG SLOT" },
  { wm: "體育", big: "熊貓體育", sub: "PANDA SPORTS" },
  { img: cardAllbetSrc, alt: "歐博真人" },
  { wm: "棋牌", big: "開元棋牌", sub: "KAIYUAN CHESS" },
  { wm: "捕魚", big: "捕魚達人", sub: "FISHING MASTER" }
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
  <div class="noya-ink-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-ink-d__nav">
      <div class="noya-ink-d__nav-inner">
        <a class="noya-ink-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-ink-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-ink-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-ink-d__nav-cta">
          <span class="noya-ink-d__btn noya-ink-d__btn--ghost">會員登入</span>
          <span class="noya-ink-d__btn noya-ink-d__btn--solid">免費註冊</span>
        </div>
      </div>
      <!-- nav 底部墨竹橫線 -->
      <div class="noya-ink-d__nav-ink-line"></div>
    </header>

    <main class="noya-ink-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-ink-d__hero">
        <div class="noya-ink-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-ink-d__hero-side">
          <div class="noya-ink-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-ink-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（左 sidebar 印章分類 + 右宣紙裱框卡片）===== -->
      <section class="noya-ink-d__section">
        <div class="noya-ink-d__sec-head">
          <span class="noya-ink-d__sec-zh">遊戲大廳</span>
          <span class="noya-ink-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-ink-d__lobby">
          <!-- 左 sidebar（印章風分類） -->
          <div class="noya-ink-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-ink-d__scat"
              :class="{ 'noya-ink-d__scat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-ink-d__scat-ic" :icon="cat.icon" />
              <span>{{ cat.label }}</span>
            </button>
            <!-- 裝飾：墨竹垂直細字 -->
            <div class="noya-ink-d__sidebar-deco">東方娛樂</div>
          </div>

          <!-- 墨竹垂直分隔線 -->
          <div class="noya-ink-d__divider"></div>

          <!-- 右側宣紙裱框卡片（直列） -->
          <div class="noya-ink-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <div v-if="c.img" class="noya-ink-d__frame">
                <img class="noya-ink-d__gfull" :src="c.img" :alt="c.alt" />
              </div>
              <div v-else class="noya-ink-d__gcard">
                <div class="noya-ink-d__gcard-outer">
                  <div class="noya-ink-d__gcard-inner">
                    <div class="noya-ink-d__gcard-wm">{{ c.wm }}</div>
                    <div class="noya-ink-d__gcard-label">
                      <div class="noya-ink-d__gcard-big">{{ c.big }}</div>
                      <div class="noya-ink-d__gcard-sub">{{ c.sub }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-ink-d__section noya-ink-d__section--soft">
        <div class="noya-ink-d__sec-head">
          <span class="noya-ink-d__sec-zh">熱門遊戲</span>
          <span class="noya-ink-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-ink-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-ink-d__frame noya-ink-d__frame--pop">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-ink-d__gcard noya-ink-d__gcard--pop">
              <div class="noya-ink-d__gcard-outer">
                <div class="noya-ink-d__gcard-inner">
                  <div class="noya-ink-d__gcard-wm">{{ c.wm }}</div>
                  <div class="noya-ink-d__gcard-label">
                    <div class="noya-ink-d__gcard-big">{{ c.big }}</div>
                    <div class="noya-ink-d__gcard-sub">{{ c.sub }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-ink-d__download noya-ink-d__section">
        <div class="noya-ink-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-ink-d__dl-right">
          <div class="noya-ink-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-ink-d__dl-desc">
            墨竹娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-ink-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-ink-d__section noya-ink-d__section--soft">
        <div class="noya-ink-d__sec-head">
          <span class="noya-ink-d__sec-zh">頂尖服務</span>
          <span class="noya-ink-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-ink-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-ink-d__svc-card"
          >
            <div class="noya-ink-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-ink-d__footer">
      <div class="noya-ink-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-ink-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-ink-d__footer-copy">© 2025 墨竹娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-ink-d {
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
    box-shadow: var(--shadow);
  }

  // nav 底部墨竹橫線（模擬毛筆橫批）
  &__nav-ink-line {
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--color-primary) 20%,
      var(--color-accent) 60%,
      transparent 100%
    );
    opacity: 0.5;
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
    font-family: var(--font-display);
    color: var(--ink-soft);
    border-radius: 2px;
    transition:
      background 0.15s,
      color 0.15s;
    letter-spacing: 1px;

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
    border-radius: 2px; // 印章方角
    font-size: 14px;
    font-weight: 700;
    font-family: var(--font-display);
    cursor: pointer;
    letter-spacing: 1px;

    &--ghost {
      border: var(--ink-stamp-border);
      color: var(--color-primary);
      background: transparent;
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: 1px solid var(--color-accent);
      box-shadow: var(--shadow);
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
    border-radius: 2px;
    overflow: hidden;

    // 宣紙裱框雙框
    border: 2px solid var(--ink-frame-outer);
    padding: 3px;
    background: var(--ink-frame-inner);
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 0;
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
    border-radius: 0;
    background: var(--notice-bg);
    border-left: 3px solid var(--color-primary);
    border-top: 1px solid var(--glass-line);
    border-right: 1px solid var(--glass-line);
    border-bottom: 1px solid var(--glass-line);
    color: var(--color-primary);
    font-size: 22px;

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;

      b {
        color: var(--color-primary);
        font-weight: 700;
        font-family: var(--font-display);
      }
    }
  }

  &__online {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 0;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    font-size: 18px;
    font-weight: 500;
    font-family: var(--font-display);
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

      > .noya-ink-d__sec-head,
      > .noya-ink-d__pop-grid,
      > .noya-ink-d__svc-grid {
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
    font-family: var(--font-display);
    letter-spacing: 6px;
    color: var(--text-primary);
  }

  &__sec-en {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ===== LOBBY（左 sidebar + 右卡片）=====
  &__lobby {
    display: grid;
    grid-template-columns: 140px 2px 1fr;
    gap: 0 16px;
    align-items: start;
  }

  // 左 sidebar 印章分類
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__scat {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 14px;
    border-radius: 0;
    border: 1px solid transparent;
    border-top: 1px solid var(--glass-line);
    background: transparent;
    color: var(--ink-soft);
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-display);
    cursor: pointer;
    letter-spacing: 1px;
    transition:
      background 0.18s ease,
      color 0.18s ease;

    &:first-child {
      border-top-color: transparent;
    }

    &--on {
      // 硃砂紅印章感
      background: var(--ink-stamp-active-bg);
      border-color: var(--ink-stamp-active-border);
      color: var(--ink-stamp-active-color);

      .noya-ink-d__scat-ic {
        color: var(--ink-stamp-active-color);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__scat-ic {
    font-size: 20px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.18s ease;
  }

  // 底部裝飾直書字樣
  &__sidebar-deco {
    margin-top: 20px;
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--ink-mute);
    text-align: center;
    letter-spacing: 3px;
    opacity: 0.45;
  }

  // 墨竹垂直分隔線
  &__divider {
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--ink-divider) 8%,
      var(--ink-divider) 85%,
      transparent 100%
    );
    opacity: 0.4;
    align-self: stretch;
  }

  // 右側宣紙裱框卡片（直列，留白感）
  &__cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  // 裱框容器（真實切片用）
  &__frame {
    border-radius: 2px;
    border: 2px solid var(--ink-frame-outer);
    padding: 3px;
    background: var(--ink-frame-inner);
    box-shadow: var(--shadow);

    &--pop {
      overflow: hidden;

      img {
        aspect-ratio: 4 / 3;
        object-fit: cover;
      }
    }

    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 0;
    }
  }

  &__gfull {
    width: 100%;
    height: auto;
    display: block;
  }

  // 宣紙裱框佔位卡
  &__gcard {
    aspect-ratio: 760 / 232;
    box-shadow: var(--shadow);

    &--pop {
      aspect-ratio: 4 / 3;
    }
  }

  &__gcard-outer {
    width: 100%;
    height: 100%;
    border: 2px solid var(--ink-frame-outer);
    padding: 3px;
    border-radius: 0;
  }

  &__gcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--gcard-bg);
    border: 1px solid var(--ink-frame-inner);
    overflow: hidden;
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 42px;
    font-weight: 900;
    font-family: var(--font-display);
    color: rgba(47, 125, 94, 0.07);
    letter-spacing: 0.05em;
    pointer-events: none;
  }

  &__gcard-label {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &__gcard-big {
    font-size: 24px;
    font-weight: 900;
    font-family: var(--font-display);
    color: var(--text-primary);
    border-left: 3px solid var(--card-label-bar);
    padding-left: 10px;
    white-space: nowrap;
    letter-spacing: 2px;
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 11px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 7px 0 0 13px;
  }

  // ===== POPULAR GRID =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  // ===== DOWNLOAD =====
  &__download {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: center;
  }

  &__dl-left {
    border-radius: 2px;
    overflow: hidden;
    border: 2px solid var(--ink-frame-outer);
    padding: 3px;
    background: var(--ink-frame-inner);
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 0;
    }
  }

  &__dl-title {
    font-size: clamp(28px, 3.4vw, 42px);
    font-weight: 900;
    font-family: var(--font-display);
    color: var(--text-primary);
    letter-spacing: 4px;
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
    border-radius: 2px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-weight: 900;
    font-family: var(--font-display);
    letter-spacing: 2px;
    box-shadow: var(--shadow);
    border: 1px solid var(--color-accent);
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
    border-radius: 2px;
    text-align: center;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    h3 {
      font-size: 20px;
      font-weight: 800;
      font-family: var(--font-display);
      color: var(--text-primary);
      margin: 16px 0 12px;
      letter-spacing: 2px;
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
    border-radius: 2px; // 印章方角
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 38px;
    box-shadow: var(--shadow);
    border: 1px solid var(--color-accent);
  }

  // ===== FOOTER =====
  &__footer {
    background: var(--footer-bg);
    border-top: 2px solid rgba(47, 125, 94, 0.2);
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
      font-family: var(--font-display);
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
      font-family: var(--font-display);
      letter-spacing: 1px;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--ink-mute);
    font-size: 13px;
    letter-spacing: 2px;
    font-family: var(--font-display);
  }

  // ===== RESPONSIVE =====
  @media (width <= 980px) {
    &__hero {
      grid-template-columns: 1fr;
    }

    &__lobby {
      grid-template-columns: 1fr;
    }

    &__sidebar {
      flex-flow: row wrap;
    }

    &__divider {
      display: none;
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
