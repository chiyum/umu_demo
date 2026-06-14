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
 * noya-beacon（諾亞燈塔）桌面版
 *
 * 移植設計稿 ly6 窄條側燈（電腦段，@container min-width:560px）：
 *   - 左側按鈕展開為 138px 橫式（icon + label 並排）
 *   - 選中左緣發光側燈
 *   - 右遊戲卡：雙欄 grid，首卡 grid-column:1/-1 橫跨整列（Banner）+ 雙欄
 *
 * 整頁五段：sticky nav / hero+公告+在線 / 遊戲大廳 / 服務 / footer
 *
 * Logo 接線：themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");

/** 熱門遊戲格（混排切片與佔位卡） */
const popularCards = [
  { img: cardDgSrc, alt: "DG 真人" },
  { name: "招財進寶", en: "FORTUNE" },
  { name: "體育投注", en: "SPORTS" },
  { img: cardAllbetSrc, alt: "歐博真人" },
  { name: "德州撲克", en: "TEXAS POKER" },
  { name: "神龍捕魚", en: "DRAGON FISH" }
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
  <div class="noya-beacon-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-beacon-d__nav">
      <div class="noya-beacon-d__nav-inner">
        <a class="noya-beacon-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-beacon-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-beacon-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-beacon-d__nav-cta">
          <span class="noya-beacon-d__btn noya-beacon-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-beacon-d__btn noya-beacon-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
    </header>

    <main class="noya-beacon-d__main">
      <!-- ===== HERO + 公告 + 在線 ===== -->
      <section class="noya-beacon-d__hero">
        <div class="noya-beacon-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-beacon-d__hero-side">
          <div class="noya-beacon-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-beacon-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3,063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（窄條側燈版型）===== -->
      <section class="noya-beacon-d__section">
        <div class="noya-beacon-d__sec-head">
          <span class="noya-beacon-d__sec-zh">遊戲大廳</span>
          <span class="noya-beacon-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-beacon-d__lobby">
          <!-- 左側展開 138px 橫式欄（icon + label 並排） -->
          <aside class="noya-beacon-d__rail">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-beacon-d__cat"
              :class="{ 'noya-beacon-d__cat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <span class="noya-beacon-d__cat-ic"
                ><Icon :icon="cat.icon"
              /></span>
              <span class="noya-beacon-d__cat-lb">{{ cat.label }}</span>
            </button>
          </aside>

          <!-- 右側遊戲卡片：雙欄 grid，首卡橫跨整列 -->
          <main class="noya-beacon-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <div
                class="noya-beacon-d__g"
                :class="{ 'noya-beacon-d__g--banner': i === 0 }"
              >
                <img
                  v-if="c.img"
                  class="noya-beacon-d__g-img"
                  :src="c.img"
                  :alt="c.alt"
                />
                <template v-else>
                  <div class="noya-beacon-d__g-bg"></div>
                  <div class="noya-beacon-d__g-deco">
                    <i></i>
                    <i></i>
                  </div>
                  <div class="noya-beacon-d__g-fig">
                    <div class="noya-beacon-d__ph">
                      <span>{{ figLabel }}</span>
                    </div>
                  </div>
                  <div class="noya-beacon-d__g-txt">
                    <h4>{{ c.name }}</h4>
                    <div class="noya-beacon-d__g-en">{{ c.en }}</div>
                    <span class="noya-beacon-d__g-cta">立即進入 ›</span>
                  </div>
                </template>
                <span v-if="c.tag" class="noya-beacon-d__g-tag">{{
                  c.tag
                }}</span>
              </div>
            </template>
          </main>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-beacon-d__section noya-beacon-d__section--soft">
        <div class="noya-beacon-d__sec-head">
          <span class="noya-beacon-d__sec-zh">熱門遊戲</span>
          <span class="noya-beacon-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-beacon-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div class="noya-beacon-d__pop-card">
              <img v-if="c.img" :src="c.img" :alt="c.alt" />
              <div v-else class="noya-beacon-d__pop-inner">
                <div class="noya-beacon-d__g-bg"></div>
                <div class="noya-beacon-d__g-txt noya-beacon-d__g-txt--pop">
                  <h4>{{ c.name }}</h4>
                  <div class="noya-beacon-d__g-en">{{ c.en }}</div>
                  <span class="noya-beacon-d__g-cta">立即進入 ›</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-beacon-d__download noya-beacon-d__section">
        <div class="noya-beacon-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-beacon-d__dl-right">
          <div class="noya-beacon-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-beacon-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-beacon-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-beacon-d__section noya-beacon-d__section--soft">
        <div class="noya-beacon-d__sec-head">
          <span class="noya-beacon-d__sec-zh">頂尖服務</span>
          <span class="noya-beacon-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-beacon-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-beacon-d__svc-card"
          >
            <div class="noya-beacon-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-beacon-d__footer">
      <div class="noya-beacon-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-beacon-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-beacon-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// ── ly6 窄條側燈（noya-beacon）桌面版 ──
// 電腦段：左側展開 138px（icon+label 橫式），首卡 grid-column:1/-1 橫跨整列
// 選中 cat::before 側燈發光（left:-4px）
.noya-beacon-d {
  background: var(--app-bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }

  // ── TOP NAV ──
  &__nav {
    position: sticky;
    top: 0;
    z-index: 60;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--glass-line);
    box-shadow: 0 2px 12px rgba(90, 111, 157, 0.1);
  }

  &__nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 68px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__logo {
    flex-shrink: 0;

    img {
      height: 38px;
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
    padding: 9px 14px;
    font-size: 15px;
    font-weight: 600;
    color: var(--ink-soft);
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
      background: var(--bg-overlay);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 14px rgba(90, 111, 157, 0.36);
    }
  }

  // ── HERO ──
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
    border-radius: 18px;
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
    color: var(--color-primary);
    font-size: 22px;

    p {
      font-size: 14px;
      color: var(--ink-soft);
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

  // ── SECTION ──
  &__section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;

    &--soft {
      max-width: none;
      background: var(--section-soft);

      > .noya-beacon-d__sec-head,
      > .noya-beacon-d__pop-grid,
      > .noya-beacon-d__svc-grid {
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
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--color-primary);
  }

  &__sec-en {
    display: block;
    margin-top: 3px;
    font-size: 13px;
    letter-spacing: 6px;
    color: var(--mut);
  }

  // ── 遊戲大廳（窄條側燈，桌面展開）──
  // 對齊設計稿 @container(min-width:560px) 電腦段：
  //   .lobby{ padding:20px; gap:20px; }
  //   .rail{ width:138px; gap:7px; }
  //   .cat{ flex-direction:row; gap:11px; padding:13px 15px; }
  //   .cards{ grid-template-columns:1fr 1fr; gap:15px; }
  //   .g:first-child{ grid-column:1/-1; aspect-ratio:4/1; }
  &__lobby {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 20px 0 0;
  }

  // 展開 138px 橫式欄
  &__rail {
    width: 138px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  // 橫式按鈕（icon + label 並排，position:relative 供側燈 ::before）
  &__cat {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    padding: 13px 15px;
    border-radius: 13px;
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--mut);
    transition:
      background 0.18s ease,
      color 0.18s ease;

    &--on {
      background: var(--tab-active-bg);
      color: var(--acc);

      // 側燈發光（桌面 left:-4px，對齊設計稿）
      &::before {
        content: "";
        position: absolute;
        left: -4px;
        top: 20%;
        bottom: 20%;
        width: 4px;
        border-radius: 4px;
        background: linear-gradient(var(--acc2), var(--acc));
        box-shadow: 0 0 9px color-mix(in oklab, var(--acc2), transparent 30%);
      }
    }
  }

  &__cat-ic {
    font-size: 22px;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cat-lb {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }

  // 右側雙欄卡片，首卡橫跨整列
  &__cards {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  // 一般卡片
  &__g {
    position: relative;
    width: 100%;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    overflow: hidden;
    border-radius: 18px;
    box-shadow: 0 10px 22px -10px rgba(90, 111, 157, 0.22);

    // 首卡 Banner：橫跨整列 + 加寬比例（對齊設計稿 grid-column:1/-1; aspect-ratio:4/1）
    &--banner {
      grid-column: 1 / -1;
      aspect-ratio: 4 / 1;
      min-height: 0;

      // Banner 標題加大
      .noya-beacon-d__g-txt {
        h4 {
          font-size: clamp(20px, 3.5vw, 32px);
        }
      }
    }
  }

  &__g-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: radial-gradient(
      120% 140% at 88% 30%,
      var(--soft) 0%,
      color-mix(in oklab, var(--soft), #ffffff 30%) 45%,
      var(--page) 100%
    );
  }

  &__g-deco {
    i {
      position: absolute;
      z-index: 1;
      border-radius: 50%;
      background: color-mix(in oklab, var(--acc), #ffffff 55%);
      opacity: 0.5;

      &:first-child {
        width: 30px;
        height: 30px;
        right: 32%;
        top: 14%;
      }

      &:last-child {
        width: 14px;
        height: 14px;
        right: 50%;
        bottom: 18%;
        opacity: 0.35;
      }
    }
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
      font-size: 8px;
      letter-spacing: 0.12em;
      color: color-mix(in oklab, var(--acc), var(--ink) 30%);
      text-align: center;
      padding: 0 6px;
    }
  }

  &__g-txt {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 56%;

    // stylelint-disable-next-line no-descending-specificity
    h4 {
      font-size: clamp(15px, 2.4cqw, 22px);
      font-weight: 900;
      color: var(--acc);
      line-height: 1.05;
      white-space: nowrap;
    }

    &--pop {
      left: 10%;
    }
  }

  &__g-en {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: var(--mut);
    margin-top: 4px;
    text-transform: uppercase;
  }

  &__g-cta {
    display: inline-block;
    margin-top: 8px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
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

  // ── POPULAR GRID ──
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__pop-card {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);
    position: relative;
    aspect-ratio: 4 / 3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__pop-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }

  // ── DOWNLOAD ──
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
    color: var(--color-primary);
    letter-spacing: 2px;
  }

  &__dl-desc {
    margin: 14px 0 22px;
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
    box-shadow: 0 4px 14px rgba(90, 111, 157, 0.36);
  }

  // ── SERVICES ──
  // stylelint-disable-next-line no-descending-specificity
  &__svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }

  &__svc-card {
    padding: 34px 26px;
    border-radius: 18px;
    text-align: center;
    background: var(--bg-surface);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    h3 {
      font-size: 19px;
      font-weight: 800;
      color: var(--color-primary);
      margin: 14px 0 10px;
    }

    p {
      color: var(--ink-soft);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  &__svc-ic {
    width: 72px;
    height: 72px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 34px;
  }

  // ── FOOTER ──
  &__footer {
    background: var(--footer-bg);
    border-top: 1px solid var(--glass-line);
    padding: 36px 24px 24px;
  }

  &__footer-grid {
    max-width: 1200px;
    margin: 0 auto 24px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;

    span {
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
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
      font-size: 13px;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--ink-mute);
    font-size: 12px;
    letter-spacing: 1px;
  }

  // ── RESPONSIVE ──
  @media (width <= 980px) {
    &__hero {
      grid-template-columns: 1fr;
    }

    &__lobby {
      flex-direction: column;
    }

    // 窄螢幕時 rail 縮回 54px 窄條（與 mobile.vue 一致造型）
    &__rail {
      width: 100%;
      flex-direction: row;
      gap: 8px;
    }

    &__cat {
      flex-direction: column;
      gap: 3px;
      padding: 10px 8px;
      flex: 1;
      border-radius: 14px;
    }

    &__cat-lb {
      font-size: 11px;
    }

    // 窄螢幕卡片退回單欄
    &__cards {
      grid-template-columns: 1fr;
    }

    &__g--banner {
      aspect-ratio: 2.1 / 1;
      grid-column: auto;
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
