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
 * noya-hive（諾亞蜂巢）桌面版
 *
 * 遊戲大廳移植 ly5 六角蜂巢：
 *   - 左側按鈕：六角形 clip-path，桌面版橫式排列，icon+label 並排
 *   - 右側卡片：寬六角輪廓 clip-path，桌面版 grid 雙欄
 * 整頁結構對齊 noya-blue desktop 五段：
 *   sticky nav / hero+公告+在線 / 遊戲大廳（六角）/ 下載 / 服務 / footer
 *
 * Logo 接線：themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");

/** 熱門遊戲格（混排真人切片與翡翠漸層佔位卡） */
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
  <div class="noya-hive-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-hive-d__nav">
      <div class="noya-hive-d__nav-inner">
        <a class="noya-hive-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-hive-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-hive-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-hive-d__nav-cta">
          <span class="noya-hive-d__btn noya-hive-d__btn--ghost">會員登入</span>
          <span class="noya-hive-d__btn noya-hive-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-hive-d__main">
      <!-- ===== HERO + 公告 + 在線 ===== -->
      <section class="noya-hive-d__hero">
        <div class="noya-hive-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-hive-d__hero-side">
          <div class="noya-hive-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-hive-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3,063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（六角蜂巢版型）===== -->
      <section class="noya-hive-d__section">
        <div class="noya-hive-d__sec-head">
          <span class="noya-hive-d__sec-zh">遊戲大廳</span>
          <span class="noya-hive-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-hive-d__lobby">
          <!-- 左側六角按鈕欄（桌面版橫式，icon + label 並排） -->
          <aside class="noya-hive-d__rail">
            <button
              v-for="(cat, idx) in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-hive-d__cat"
              :class="{
                'noya-hive-d__cat--on': activeCat === cat.key,
                'noya-hive-d__cat--even': idx % 2 === 1
              }"
              @click="activeCat = cat.key"
            >
              <span class="noya-hive-d__cat-ic"><Icon :icon="cat.icon" /></span>
              <span class="noya-hive-d__cat-lb">{{ cat.label }}</span>
            </button>
          </aside>

          <!-- 右側遊戲卡片（寬六角輪廓，桌面版雙欄） -->
          <main class="noya-hive-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <div class="noya-hive-d__g">
                <img
                  v-if="c.img"
                  class="noya-hive-d__g-img"
                  :src="c.img"
                  :alt="c.alt"
                />
                <template v-else>
                  <div class="noya-hive-d__g-bg"></div>
                  <div class="noya-hive-d__g-deco">
                    <i></i>
                    <i></i>
                  </div>
                  <div class="noya-hive-d__g-fig">
                    <div class="noya-hive-d__ph">
                      <span>{{ figLabel }}</span>
                    </div>
                  </div>
                  <div class="noya-hive-d__g-txt">
                    <h4>{{ c.name }}</h4>
                    <div class="noya-hive-d__g-en">{{ c.en }}</div>
                    <span class="noya-hive-d__g-cta">立即進入 ›</span>
                  </div>
                </template>
                <span v-if="c.tag" class="noya-hive-d__g-tag">{{ c.tag }}</span>
              </div>
            </template>
          </main>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-hive-d__section noya-hive-d__section--soft">
        <div class="noya-hive-d__sec-head">
          <span class="noya-hive-d__sec-zh">熱門遊戲</span>
          <span class="noya-hive-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-hive-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div class="noya-hive-d__pop-card">
              <img v-if="c.img" :src="c.img" :alt="c.alt" />
              <div v-else class="noya-hive-d__pop-inner">
                <div class="noya-hive-d__g-bg"></div>
                <div class="noya-hive-d__g-txt noya-hive-d__g-txt--pop">
                  <h4>{{ c.name }}</h4>
                  <div class="noya-hive-d__g-en">{{ c.en }}</div>
                  <span class="noya-hive-d__g-cta">立即進入 ›</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-hive-d__download noya-hive-d__section">
        <div class="noya-hive-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-hive-d__dl-right">
          <div class="noya-hive-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-hive-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-hive-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-hive-d__section noya-hive-d__section--soft">
        <div class="noya-hive-d__sec-head">
          <span class="noya-hive-d__sec-zh">頂尖服務</span>
          <span class="noya-hive-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-hive-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-hive-d__svc-card"
          >
            <div class="noya-hive-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-hive-d__footer">
      <div class="noya-hive-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-hive-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-hive-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// ── ly5 六角蜂巢（noya-hive）桌面版 ──
// 整頁以 noya-blue desktop 為骨架，遊戲大廳區塊忠實移植 ly5 六角蜂巢造型。
.noya-hive-d {
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
    box-shadow: 0 2px 12px rgba(63, 138, 110, 0.12);
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
      box-shadow: 0 4px 14px rgba(63, 138, 110, 0.4);
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

  // ── SECTION SHELL ──
  &__section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;

    &--soft {
      max-width: none;
      background: var(--section-soft);

      > .noya-hive-d__sec-head,
      > .noya-hive-d__pop-grid,
      > .noya-hive-d__svc-grid {
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
    text-shadow: 0 0 18px rgba(63, 138, 110, 0.3);
  }

  &__sec-en {
    display: block;
    margin-top: 3px;
    font-size: 13px;
    letter-spacing: 6px;
    color: var(--mut);
  }

  // ── 遊戲大廳（六角蜂巢版型）──
  // 桌面版：左側六角按鈕欄 + 右側雙欄卡片
  &__lobby {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  // 桌面版左側欄寬 120px（按鈕較小，整齊縱排）
  &__rail {
    width: 120px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 4px;
  }

  // 桌面版六角按鈕（橫式 icon+label，六角 clip-path 保持）
  // 桌面拉寬成固定 100px × 64px，偶數交錯 26px 仍保持
  &__cat {
    width: 100px;
    height: 64px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    background: var(--bg-surface);
    border: none;
    cursor: pointer;
    color: var(--mut);
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    // 偶數項交錯
    &--even {
      margin-left: 26px;
    }

    // 選中翡翠漸層發光
    &--on {
      background: var(--tab-active-bg);
      color: #ffffff;
      box-shadow: 0 8px 16px -6px rgba(63, 138, 110, 0.65);
    }
  }

  &__cat-ic {
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cat-lb {
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
  }

  // 右側卡片（寬六角輪廓，桌面雙欄）
  &__cards {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  // 寬六角卡片外框
  &__g {
    position: relative;
    width: 100%;
    aspect-ratio: 2.6 / 1;
    min-height: 90px;
    isolation: isolate;
    overflow: hidden;
    clip-path: polygon(
      18px 0,
      100% 0,
      100% calc(100% - 18px),
      calc(100% - 18px) 100%,
      0 100%,
      0 18px
    );
    box-shadow: 0 10px 22px -10px rgba(63, 138, 110, 0.25);
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
      font-size: clamp(14px, 2.6cqw, 22px);
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
    box-shadow: 0 4px 14px rgba(63, 138, 110, 0.4);
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

    &__rail {
      width: 100%;
      flex-flow: row wrap;
      gap: 12px;
    }

    &__cat {
      width: 64px;
      height: 64px;

      &--even {
        margin-left: 0;
      }
    }

    &__cards {
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
