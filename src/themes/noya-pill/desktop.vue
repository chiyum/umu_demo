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
 * noya-pill（經典直欄膠囊）桌面版
 *
 * 移植設計稿 ly1 電腦端（@container min-width:560px 那段）：
 *   左側 sidebar 150px 橫式膠囊（icon 左 + label 右，flex-direction:row）
 *   右側雙欄 grid（grid-template-columns:1fr 1fr）
 *
 * 整頁結構 = sticky nav / hero+公告+在線 / 遊戲大廳（sidebar 膠囊 + 雙欄卡）/
 *   熱門遊戲 / 下載 / 服務 / footer
 * BEM prefix：noya-pill-d__*
 * Logo 走 themeStore.currentLogo，不寫死。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（真人切片 + 佔位卡混排） */
const popularCards = [
  { figSrc: cardDgSrc, name: "DG 真人" },
  { name: "PG 電子", en: "PG SLOT", figLabel: "機台 · MACHINE" },
  { name: "熊貓體育", en: "PANDA SPORTS", figLabel: "賽事畫面 · MATCH" },
  { figSrc: cardAllbetSrc, name: "歐博真人" },
  { name: "開元棋牌", en: "KAIYUAN CHESS", figLabel: "牌桌 · TABLE" },
  { name: "捕魚達人", en: "FISHING MASTER", figLabel: "場景 · SCENE" }
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
  <div class="noya-pill-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-pill-d__nav">
      <div class="noya-pill-d__nav-inner">
        <a class="noya-pill-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-pill-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-pill-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-pill-d__nav-cta">
          <span class="noya-pill-d__btn noya-pill-d__btn--ghost">會員登入</span>
          <span class="noya-pill-d__btn noya-pill-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-pill-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-pill-d__hero">
        <div class="noya-pill-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-pill-d__hero-side">
          <div class="noya-pill-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-pill-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（ly1 電腦版：sidebar 150px 橫式膠囊 + 雙欄卡） ===== -->
      <section class="noya-pill-d__section">
        <div class="noya-pill-d__sec-head">
          <span class="noya-pill-d__sec-zh">遊戲大廳</span>
          <span class="noya-pill-d__sec-en">GAME LOBBY</span>
        </div>

        <!-- 大廳主體：左側 sidebar + 右側雙欄 grid -->
        <div class="noya-pill-d__lobby">
          <!-- 左側：150px 橫式膠囊 sidebar（電腦版） -->
          <aside class="noya-pill-d__rail">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-pill-d__cat"
              :class="{ 'noya-pill-d__cat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-pill-d__cat-ic" :icon="cat.icon" />
              <span class="noya-pill-d__cat-lb">{{ cat.label }}</span>
            </button>
          </aside>

          <!-- 右側：雙欄 grid（三層合成卡） -->
          <main class="noya-pill-d__cards">
            <article v-for="(c, i) in cards" :key="i" class="noya-pill-d__g">
              <div class="noya-pill-d__g-bg"></div>
              <div class="noya-pill-d__g-deco">
                <i></i>
                <i></i>
              </div>
              <span v-if="c.tag" class="noya-pill-d__g-tag">{{ c.tag }}</span>
              <div class="noya-pill-d__g-txt">
                <h4>{{ c.name }}</h4>
                <div class="noya-pill-d__g-en">{{ c.en }}</div>
                <span class="noya-pill-d__g-cta">立即進入 ›</span>
              </div>
              <div class="noya-pill-d__g-fig">
                <img
                  v-if="c.figSrc"
                  :src="c.figSrc"
                  :alt="c.name"
                  class="noya-pill-d__g-fig-img"
                />
                <div v-else class="noya-pill-d__ph">
                  <span>{{ c.figLabel }}</span>
                </div>
              </div>
            </article>
          </main>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-pill-d__section noya-pill-d__section--soft">
        <div class="noya-pill-d__sec-head">
          <span class="noya-pill-d__sec-zh">熱門遊戲</span>
          <span class="noya-pill-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-pill-d__pop-grid">
          <div
            v-for="(c, i) in popularCards"
            :key="i"
            class="noya-pill-d__pop-card"
          >
            <img v-if="c.figSrc" :src="c.figSrc" :alt="c.name" />
            <!-- 佔位卡（三層合成） -->
            <template v-else>
              <div class="noya-pill-d__pop-bg"></div>
              <div class="noya-pill-d__pop-deco"><i></i><i></i></div>
              <div class="noya-pill-d__pop-fig">
                <div class="noya-pill-d__ph">
                  <span>{{ c.figLabel }}</span>
                </div>
              </div>
              <div class="noya-pill-d__pop-txt">
                <div class="noya-pill-d__pop-name">{{ c.name }}</div>
                <div class="noya-pill-d__pop-en">{{ c.en }}</div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-pill-d__download noya-pill-d__section">
        <div class="noya-pill-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-pill-d__dl-right">
          <div class="noya-pill-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-pill-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-pill-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-pill-d__section noya-pill-d__section--soft">
        <div class="noya-pill-d__sec-head">
          <span class="noya-pill-d__sec-zh">頂尖服務</span>
          <span class="noya-pill-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-pill-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-pill-d__svc-card"
          >
            <div class="noya-pill-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-pill-d__footer">
      <div class="noya-pill-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-pill-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-pill-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// noya-pill 桌面版（ly1 電腦版：150px sidebar 橫式膠囊 + 雙欄卡 grid）
.noya-pill-d {
  background: var(--app-bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;

  &__main {
    flex: 1;
  }

  // ── TOP NAV ──────────────────────────────────────────────────
  &__nav {
    position: sticky;
    top: 0;
    z-index: 60;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--glass-line);
    box-shadow: 0 4px 16px rgba(120, 80, 40, 0.12);
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
    font-size: 15px;
    font-weight: 600;
    color: var(--ink-soft);
    border-radius: 10px;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: var(--bg-overlay);
      color: var(--acc);
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
      border: 1px solid var(--glass-line);
      color: var(--acc);
      background: var(--glass);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 14px rgba(198, 106, 60, 0.4);
    }
  }

  // ── HERO ──────────────────────────────────────────────────
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
    color: var(--acc);
    font-size: 22px;

    p {
      font-size: 14px;
      color: var(--ink-soft);
      line-height: 1.6;

      b {
        color: var(--acc);
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
    font-size: 17px;
    font-weight: 500;
    color: var(--ink-soft);

    // stylelint-disable-next-line no-descending-specificity
    b {
      color: var(--online-num);
      font-weight: 700;
    }
  }

  // ── SECTION SHELL ──────────────────────────────────────────
  &__section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;

    &--soft {
      max-width: none;
      background: var(--section-soft);

      > .noya-pill-d__sec-head,
      > .noya-pill-d__pop-grid,
      > .noya-pill-d__svc-grid {
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
    color: var(--text-primary);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 13px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ── 遊戲大廳（ly1 電腦版版型） ────────────────────────────────
  // 大廳主體：左 sidebar + 右雙欄
  &__lobby {
    display: flex;
    gap: 20px;
    padding: 20px 0;
  }

  // 左側：150px 橫式膠囊 sidebar
  &__rail {
    width: 150px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  // 電腦版膠囊（icon 左 label 右，flex-direction:row）
  &__cat {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    padding: 13px 15px;
    border-radius: 16px;
    cursor: pointer;
    color: var(--mut);
    border: 0;
    background: transparent;
    font-family: inherit;
    text-align: left;
    width: 100%;
    transition: all 0.18s ease;

    // 選中態（對齊設計稿 .cat.on）
    &--on {
      color: var(--acc);
      background: var(--tab-active-bg);
      box-shadow: var(--tab-active-shadow);
    }
  }

  &__cat-ic {
    font-size: 22px;
    flex: none;
  }

  &__cat-lb {
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
  }

  // 右側：雙欄 grid（對齊設計稿 @container min-width:560px 的 grid-template-columns:1fr 1fr）
  &__cards {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    animation: noya-pill-d-cards-in 0.28s ease;
  }

  // 遊戲卡（三層合成，aspect-ratio 2.6/1）
  &__g {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: 0 10px 22px -10px rgba(120, 80, 50, 0.35);
  }

  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  &__g-deco {
    i {
      position: absolute;
      z-index: 1;
      border-radius: 50%;
      background: color-mix(in oklab, var(--acc), #ffffff 55%);
      opacity: 0.5;

      &:nth-child(1) {
        width: 30px;
        height: 30px;
        right: 32%;
        top: 14%;
      }

      &:nth-child(2) {
        width: 14px;
        height: 14px;
        right: 50%;
        bottom: 18%;
        opacity: 0.35;
      }
    }
  }

  &__g-tag {
    position: absolute;
    right: 9px;
    top: 9px;
    z-index: 4;
    font-family: ui-monospace, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #ffffff;
    background: color-mix(in oklab, var(--acc), #000000 8%);
    padding: 3px 7px;
    border-radius: 7px;
  }

  &__g-txt {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 56%;

    h4 {
      font-size: clamp(14px, 2vw, 20px);
      font-weight: 900;
      color: var(--acc);
      line-height: 1.05;
      white-space: nowrap;
    }
  }

  &__g-en {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    color: var(--mut);
    margin-top: 4px;
    text-transform: uppercase;
  }

  &__g-cta {
    display: inline-block;
    margin-top: 9px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  &__g-fig {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 46%;
    z-index: 2;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(90deg, var(--soft) 0%, transparent 44%);
    }
  }

  &__g-fig-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: repeating-linear-gradient(
      135deg,
      color-mix(in oklab, var(--acc), transparent 78%) 0 7px,
      color-mix(in oklab, var(--acc), transparent 90%) 7px 14px
    );

    span {
      font-family: ui-monospace, monospace;
      font-size: 8.5px;
      letter-spacing: 0.12em;
      color: color-mix(in oklab, var(--acc), var(--ink) 30%);
      text-align: center;
      padding: 0 6px;
    }
  }

  // ── 熱門遊戲 ──────────────────────────────────────────────────
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  &__pop-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);
    isolation: isolate;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  // 熱門卡三層合成子元素
  &__pop-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  &__pop-deco {
    // stylelint-disable-next-line no-descending-specificity
    i {
      position: absolute;
      z-index: 1;
      border-radius: 50%;
      background: color-mix(in oklab, var(--acc), #ffffff 55%);
      opacity: 0.4;

      &:nth-child(1) {
        width: 40px;
        height: 40px;
        right: 25%;
        top: 12%;
      }

      &:nth-child(2) {
        width: 20px;
        height: 20px;
        right: 45%;
        bottom: 20%;
        opacity: 0.3;
      }
    }
  }

  &__pop-fig {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 55%;
    z-index: 2;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(90deg, var(--soft) 0%, transparent 40%);
    }
  }

  &__pop-txt {
    position: absolute;
    left: 14px;
    bottom: 16px;
    z-index: 3;
  }

  &__pop-name {
    font-size: 18px;
    font-weight: 900;
    color: var(--acc);
    line-height: 1.1;
  }

  &__pop-en {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: var(--mut);
    margin-top: 4px;
  }

  // ── 下載 ──────────────────────────────────────────────────
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
    color: var(--text-primary);
    letter-spacing: 2px;
  }

  &__dl-desc {
    margin: 16px 0 24px;
    color: var(--ink-soft);
    font-size: 15px;
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
    box-shadow: 0 4px 14px rgba(198, 106, 60, 0.4);
    cursor: pointer;
  }

  // ── 服務 ──────────────────────────────────────────────────
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
      color: var(--text-primary);
      margin: 16px 0 12px;
    }

    p {
      color: var(--ink-soft);
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
  }

  // ── FOOTER ──────────────────────────────────────────────────
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
        color: var(--acc);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--ink-mute);
    font-size: 13px;
    letter-spacing: 1px;
  }

  // ── 響應式 ──────────────────────────────────────────────────
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

    // 中等螢幕時 lobby 改為單欄卡
    &__cards {
      grid-template-columns: 1fr;
    }
  }
}

@keyframes noya-pill-d-cards-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
