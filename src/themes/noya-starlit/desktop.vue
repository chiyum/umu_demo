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
 * noya-starlit（星夜紫玻璃）桌面版
 *
 * 設計主軸：深紫星空底 + 磨砂玻璃 sidebar 分類 + 星芒卡片裝飾
 *
 * 遊戲大廳 section 採用「左 sidebar 分類 + 右卡片內容」佈局：
 *   - 左 sidebar：磨砂玻璃 chip 垂直列，active 紫色發光 + 星點
 *   - 右卡片：玻璃卡片含星芒裝飾 + 紫色籌碼
 *
 * Logo 接線：header 顯示 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲混排（真人切片 + 深紫佔位卡） */
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
  <div class="noya-starlit-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-starlit-d__nav">
      <div class="noya-starlit-d__nav-inner">
        <a class="noya-starlit-d__logo-wrap" href="#" @click.prevent>
          <span class="noya-starlit-d__logo-mark">
            <Icon icon="material-symbols:star-rate" />
          </span>
          <img :src="logoSrc" :alt="logoLabel" class="noya-starlit-d__logo" />
        </a>
        <nav class="noya-starlit-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-starlit-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-starlit-d__nav-cta">
          <span class="noya-starlit-d__btn noya-starlit-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-starlit-d__btn noya-starlit-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
    </header>

    <main class="noya-starlit-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-starlit-d__hero">
        <div class="noya-starlit-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-starlit-d__hero-side">
          <div class="noya-starlit-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-starlit-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3,063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳：左 sidebar + 右卡片 ===== -->
      <section class="noya-starlit-d__section">
        <div class="noya-starlit-d__sec-head">
          <span class="noya-starlit-d__sec-zh">遊戲大廳</span>
          <span class="noya-starlit-d__sec-en">GAME LOBBY</span>
        </div>
        <!-- 左 sidebar 分類 + 右卡片並排 -->
        <div class="noya-starlit-d__lobby">
          <!-- 左 sidebar：磨砂玻璃 chip 分類 -->
          <aside class="noya-starlit-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-starlit-d__cat-chip"
              :class="{ 'noya-starlit-d__cat-chip--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <span class="noya-starlit-d__cat-star"></span>
              <Icon class="noya-starlit-d__cat-ic" :icon="cat.icon" />
              <span class="noya-starlit-d__cat-label">{{ cat.label }}</span>
            </button>
          </aside>
          <!-- 右側卡片區 -->
          <div class="noya-starlit-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <img
                v-if="c.img"
                class="noya-starlit-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <div v-else class="noya-starlit-d__gcard">
                <div class="noya-starlit-d__gcard-wm">{{ c.wm }}</div>
                <span class="noya-starlit-d__sp noya-starlit-d__sp--1"></span>
                <span class="noya-starlit-d__sp noya-starlit-d__sp--2"></span>
                <div class="noya-starlit-d__gcard-label">
                  <div class="noya-starlit-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-starlit-d__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-starlit-d__section noya-starlit-d__section--soft">
        <div class="noya-starlit-d__sec-head">
          <span class="noya-starlit-d__sec-zh">熱門遊戲</span>
          <span class="noya-starlit-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-starlit-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-starlit-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div
              v-else
              class="noya-starlit-d__gcard noya-starlit-d__gcard--pop"
            >
              <div class="noya-starlit-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-starlit-d__gcard-label">
                <div class="noya-starlit-d__gcard-big">{{ c.big }}</div>
                <div class="noya-starlit-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-starlit-d__download noya-starlit-d__section">
        <div class="noya-starlit-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-starlit-d__dl-right">
          <div class="noya-starlit-d__dl-title">星夜娛樂隨身帶著走</div>
          <p class="noya-starlit-d__dl-desc">
            星夜娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚，星空陪伴全天候。
          </p>
          <span class="noya-starlit-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-starlit-d__section noya-starlit-d__section--soft">
        <div class="noya-starlit-d__sec-head">
          <span class="noya-starlit-d__sec-zh">頂尖服務</span>
          <span class="noya-starlit-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-starlit-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-starlit-d__svc-card"
          >
            <div class="noya-starlit-d__svc-ic">
              <Icon :icon="svc.icon" />
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-starlit-d__footer">
      <div class="noya-starlit-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-starlit-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-starlit-d__footer-copy">© 2025 星夜娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-starlit-d {
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
    box-shadow: 0 4px 18px rgba(20, 6, 50, 0.5);
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

  &__logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    text-decoration: none;
  }

  &__logo-mark {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--brand-mark-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d0b8ff;
    font-size: 20px;
    box-shadow: 0 0 14px rgba(138, 92, 240, 0.5);
  }

  &__logo {
    height: 38px;
    width: auto;
    object-fit: contain;
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
      background: var(--glass);
      color: var(--color-secondary);
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
      backdrop-filter: blur(6px);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 14px rgba(138, 92, 240, 0.5);
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
    font-size: 22px;
    backdrop-filter: blur(8px);

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
    backdrop-filter: blur(8px);

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

      > .noya-starlit-d__sec-head,
      > .noya-starlit-d__pop-grid,
      > .noya-starlit-d__svc-grid {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sec-head {
    text-align: center;
    margin-bottom: 32px;
  }

  &__sec-zh {
    display: block;
    font-size: clamp(24px, 3vw, 34px);
    font-weight: 900;
    letter-spacing: 4px;
    color: #ffffff;
    text-shadow: 0 0 20px var(--glow);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 13px;
    letter-spacing: 7px;
    color: var(--ink-mute);
  }

  // ===== 遊戲大廳 sidebar + 卡片佈局 =====
  &__lobby {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  // 左 sidebar 磨砂玻璃分類
  &__sidebar {
    width: 140px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  // 每個分類 chip（磨砂玻璃 + 星點 + 發光 active）
  &__cat-chip {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 18px;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    backdrop-filter: blur(10px);
    color: var(--ink-mute);
    cursor: pointer;
    box-shadow:
      0 4px 12px rgba(20, 6, 50, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.06);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;

    // active：紫色發光 + 上浮
    &--on {
      background: var(--tab-active-bg);
      border-color: rgba(180, 120, 255, 0.6);
      color: var(--text-primary);
      transform: translateY(-2px);
      box-shadow:
        0 8px 24px var(--glow),
        0 2px 8px rgba(20, 6, 50, 0.4),
        inset 0 1px 1px rgba(255, 255, 255, 0.15);

      .noya-starlit-d__cat-ic {
        color: var(--color-secondary);
      }

      .noya-starlit-d__cat-label {
        font-weight: 700;
        color: var(--text-primary);
      }

      .noya-starlit-d__cat-star {
        background: var(--color-secondary);
        box-shadow: 0 0 6px var(--glow);
        opacity: 1;
      }
    }
  }

  // 小星點裝飾（右上角）
  // stylelint-disable-next-line no-descending-specificity
  &__cat-star {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--ink-mute);
    opacity: 0.4;
    transition:
      background 0.2s,
      opacity 0.2s,
      box-shadow 0.2s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 22px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.2s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-label {
    font-size: 15px;
    font-weight: 500;
    transition:
      font-weight 0.1s,
      color 0.2s;
  }

  // 右側卡片
  &__cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    animation: noya-starlit-d-cards-in 0.28s ease;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: var(--shadow);
  }

  // 深紫漸層佔位卡
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
    font-size: 44px;
    font-weight: 900;
    font-style: italic;
    color: rgba(160, 100, 255, 0.08);
    pointer-events: none;
  }

  // 星芒裝飾（桌面版）
  &__sp {
    position: absolute;
    z-index: 2;
    pointer-events: none;

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: rgba(220, 190, 255, 0.5);
      border-radius: 999px;
    }

    &::before {
      width: 16px;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &::after {
      width: 2px;
      height: 16px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &--1 {
      top: 14%;
      right: 16%;
      opacity: 0.65;
    }

    &--2 {
      bottom: 18%;
      right: 26%;
      opacity: 0.4;
      transform: scale(0.65);
    }
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
    color: var(--text-primary);
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
    font-size: clamp(26px, 3.2vw, 40px);
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 2px;
    text-shadow: 0 0 20px var(--glow);
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
    box-shadow: 0 4px 14px rgba(138, 92, 240, 0.5);
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
    backdrop-filter: blur(8px);

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
    box-shadow: 0 0 20px rgba(138, 92, 240, 0.4);
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

@keyframes noya-starlit-d-cards-in {
  from {
    opacity: 0;
    transform: translateX(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
