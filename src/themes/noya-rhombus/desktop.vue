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
  FIGLAB,
  FOOTER_PROVIDERS
} from "./_data";

/**
 * noya-rhombus（諾亞斜切菱形）桌面版
 *
 * 移植設計稿 ly4「斜切平行四邊形」版型：
 *   - sticky nav + hero + 公告 + 在線人數
 *   - 遊戲大廳：左 sidebar 平行四邊形分類 + 右 clip-path 斜切卡（主視覺）
 *   - 熱門 / 下載 / 服務 section + footer
 *   - 整頁梅紫亮色調，電競速度感（brightness=light）
 *
 * Logo 接線：header logo 走 store（themeStore.currentLogo）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");

/** 熱門遊戲格 */
const popularCards = [
  { img: cardDgSrc, imgAlt: "DG 真人" },
  { name: "PG 電子", en: "PG SLOT" },
  { name: "熊貓體育", en: "PANDA SPORTS" },
  { img: cardAllbetSrc, imgAlt: "歐博真人" },
  { name: "開元棋牌", en: "KAIYUAN CHESS" },
  { name: "捕魚達人", en: "FISHING MASTER" }
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
  <div class="noya-rhombus-d">
    <!-- ===== TOP NAV（sticky）===== -->
    <header class="noya-rhombus-d__nav">
      <div class="noya-rhombus-d__nav-inner">
        <a class="noya-rhombus-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-rhombus-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-rhombus-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-rhombus-d__nav-cta">
          <span class="noya-rhombus-d__btn noya-rhombus-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-rhombus-d__btn noya-rhombus-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
    </header>

    <main class="noya-rhombus-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-rhombus-d__hero">
        <div class="noya-rhombus-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-rhombus-d__hero-side">
          <div class="noya-rhombus-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-rhombus-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（ly4 版型主視覺：左 sidebar 平行四邊形 + 右斜切卡）===== -->
      <section class="noya-rhombus-d__section">
        <div class="noya-rhombus-d__sec-head">
          <span class="noya-rhombus-d__sec-zh">遊戲大廳</span>
          <span class="noya-rhombus-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-rhombus-d__lobby">
          <!-- 左 sidebar：平行四邊形分類按鈕 -->
          <div class="noya-rhombus-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-rhombus-d__cat"
              :class="{ 'noya-rhombus-d__cat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <!-- 內層回正文字 -->
              <span class="noya-rhombus-d__cat-inner">
                <Icon class="noya-rhombus-d__cat-ic" :icon="cat.icon" />
                <span class="noya-rhombus-d__cat-label">{{ cat.label }}</span>
              </span>
            </button>
          </div>

          <!-- 右側：clip-path 斜切遊戲卡 -->
          <div class="noya-rhombus-d__cards">
            <article
              v-for="(card, i) in cards"
              :key="i"
              class="noya-rhombus-d__g"
            >
              <div class="noya-rhombus-d__g-bg"></div>
              <span v-if="card.tag" class="noya-rhombus-d__g-tag">{{
                card.tag
              }}</span>
              <div class="noya-rhombus-d__g-txt">
                <h4>{{ card.name }}</h4>
                <div class="noya-rhombus-d__g-en">{{ card.en }}</div>
                <span class="noya-rhombus-d__g-cta">立即進入 ›</span>
              </div>
              <div class="noya-rhombus-d__g-fig">
                <img
                  v-if="card.img"
                  :src="card.img"
                  :alt="card.imgAlt"
                  class="noya-rhombus-d__g-fig-img"
                />
                <div v-else class="noya-rhombus-d__ph">
                  <span>{{ figLabel }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-rhombus-d__section noya-rhombus-d__section--soft">
        <div class="noya-rhombus-d__sec-head">
          <span class="noya-rhombus-d__sec-zh">熱門遊戲</span>
          <span class="noya-rhombus-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-rhombus-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-rhombus-d__pop-card">
              <img :src="c.img" :alt="c.imgAlt" />
            </div>
            <div v-else class="noya-rhombus-d__pop-placeholder">
              <div class="noya-rhombus-d__pop-bg"></div>
              <div class="noya-rhombus-d__pop-label">
                <div class="noya-rhombus-d__pop-name">{{ c.name }}</div>
                <div class="noya-rhombus-d__pop-en">{{ c.en }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-rhombus-d__download noya-rhombus-d__section">
        <div class="noya-rhombus-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-rhombus-d__dl-right">
          <div class="noya-rhombus-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-rhombus-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-rhombus-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-rhombus-d__section noya-rhombus-d__section--soft">
        <div class="noya-rhombus-d__sec-head">
          <span class="noya-rhombus-d__sec-zh">頂尖服務</span>
          <span class="noya-rhombus-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-rhombus-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-rhombus-d__svc-card"
          >
            <div class="noya-rhombus-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-rhombus-d__footer">
      <div class="noya-rhombus-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-rhombus-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-rhombus-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// noya-rhombus 桌面版 BEM：noya-rhombus-d__*
// 移植 ly4 斜切平行四邊形版型，桌面以 sidebar 呈現左側類別
.noya-rhombus-d {
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
    box-shadow: 0 4px 16px rgba(157, 79, 134, 0.1);
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
    border-radius: 9px;
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

  // 平行四邊形 CTA 按鈕
  &__btn {
    padding: 9px 20px;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    // 斜切造型呼應平行四邊形主題
    transform: skewX(-8deg);
    transition:
      background 0.15s,
      box-shadow 0.15s;

    &--ghost {
      border: 1px solid var(--border);
      color: var(--color-primary);
      background: transparent;
    }

    &--solid {
      background: var(--gradient-cta);
      color: #ffffff;
      box-shadow: 0 4px 14px var(--glow);
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
    border-radius: 14px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);

    // hero 右下斜切呼應整頁風格
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);

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
    border-radius: 14px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    color: var(--color-primary);
    font-size: 24px;

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;

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
    border-radius: 14px;
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

      > .noya-rhombus-d__sec-head,
      > .noya-rhombus-d__pop-grid,
      > .noya-rhombus-d__svc-grid {
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
    color: var(--color-primary);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ===== 遊戲大廳 sidebar 佈局（ly4 desktop 版）=====
  &__lobby {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  // 左 sidebar：平行四邊形分類按鈕
  &__sidebar {
    width: 110px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 2px;
  }

  // 平行四邊形按鈕（desktop sidebar）
  &__cat {
    transform: skewX(-11deg);
    border-radius: 9px;
    background: #ffffff;
    border: none;
    box-shadow:
      0 5px 12px -6px rgba(120, 60, 110, 0.4),
      inset 0 0 0 1px var(--line);
    cursor: pointer;
    color: var(--mut);
    font-family: inherit;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    &--on {
      background: linear-gradient(120deg, var(--acc), var(--acc2));
      color: #ffffff;
      box-shadow: 0 10px 18px -7px rgba(157, 79, 134, 0.7);

      .noya-rhombus-d__cat-ic {
        color: #ffffff;
      }

      .noya-rhombus-d__cat-label {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  // 內層 wrapper 文字回正
  &__cat-inner {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 12px 14px;
    transform: skewX(11deg);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 22px;
    flex: none;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-label {
    font-size: 15px;
    font-weight: 500;
  }

  // 右側遊戲卡列
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    animation: noya-rhombus-d-cards-in 0.28s ease;
  }

  // 三層合成遊戲卡：右緣斜切（移植 ly4 .g）
  &__g {
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 26px 100%);
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 3.2 / 1;
    min-height: 88px;
    isolation: isolate;
    box-shadow: 0 10px 22px -10px rgba(157, 79, 134, 0.3);
  }

  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
      110deg,
      #ffffff,
      var(--soft) 60%,
      color-mix(in oklab, var(--acc), #ffffff 55%)
    );
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
    left: 9%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 50%;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__g-txt h4 {
    font-size: clamp(16px, 2.2vw, 26px);
    font-weight: 900;
    color: var(--acc);
    line-height: 1.05;
    white-space: nowrap;
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
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 6px 14px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  &__g-fig {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 44%;
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
      font-size: 9px;
      letter-spacing: 0.12em;
      color: color-mix(in oklab, var(--acc), var(--ink) 30%);
      text-align: center;
    }
  }

  // ===== 熱門遊戲格 =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  &__pop-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%);

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
    }
  }

  &__pop-placeholder {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%);
  }

  &__pop-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      #ffffff,
      var(--soft) 60%,
      color-mix(in oklab, var(--acc), #ffffff 55%)
    );
  }

  &__pop-label {
    position: absolute;
    left: 18px;
    bottom: 18px;
    z-index: 2;
  }

  &__pop-name {
    font-size: 20px;
    font-weight: 900;
    color: var(--acc);
  }

  &__pop-en {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: var(--mut);
    margin-top: 4px;
  }

  // ===== 下載 =====
  &__download {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: center;
  }

  &__dl-left {
    border-radius: 14px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%);

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
    padding: 12px 32px;
    border-radius: 9px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-weight: 900;
    box-shadow: 0 4px 14px var(--glow);

    // 斜切造型
    transform: skewX(-8deg);
  }

  // ===== 服務 =====
  // stylelint-disable-next-line no-descending-specificity
  &__svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }

  &__svc-card {
    padding: 36px 28px;
    border-radius: 14px;
    text-align: center;
    background: var(--glass);
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);

    // 卡片右下斜切呼應主題
    clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%);

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
    color: #ffffff;
    font-size: 38px;
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

// 遊戲卡切換動畫
@keyframes noya-rhombus-d-cards-in {
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
