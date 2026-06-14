<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  cardDgSrc,
  cardAllbetSrc,
  DESKTOP_NAV,
  LOBBY_CATEGORIES,
  LOBBY_SECTIONS,
  FOOTER_PROVIDERS
} from "./_data";

/**
 * noya-dawn（蜜桃晨曦）桌面版
 *
 * 設計主軸：近白米暖底（light theme），蜜桃晨曦 accent
 * 遊戲大廳 section 採「左側分類 sidebar + 右側精選+列表」橫向佈局，
 * 左側 sidebar 沿用圓角卡片按鈕設計（icon 徽章 + label，active 上浮效果）。
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const section = computed(() => LOBBY_SECTIONS[activeCat.value]);

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
  <div class="noya-dawn-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-dawn-d__nav">
      <div class="noya-dawn-d__nav-inner">
        <a class="noya-dawn-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-dawn-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-dawn-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-dawn-d__nav-cta">
          <span class="noya-dawn-d__btn noya-dawn-d__btn--ghost">會員登入</span>
          <span class="noya-dawn-d__btn noya-dawn-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-dawn-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-dawn-d__hero">
        <div class="noya-dawn-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-dawn-d__hero-side">
          <div class="noya-dawn-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-dawn-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 大廳（左側 sidebar + 右側精選+列表）===== -->
      <section class="noya-dawn-d__section">
        <div class="noya-dawn-d__sec-head">
          <span class="noya-dawn-d__sec-zh">遊戲大廳</span>
          <span class="noya-dawn-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-dawn-d__lobby">
          <!-- 左側分類 sidebar（圓角卡片按鈕） -->
          <div class="noya-dawn-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-dawn-d__tab"
              :class="{ 'noya-dawn-d__tab--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <span class="noya-dawn-d__tab-badge">
                <Icon :icon="cat.icon" />
              </span>
              <span class="noya-dawn-d__tab-label">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 右側內容（精選大卡 + 垂直列表） -->
          <div class="noya-dawn-d__content">
            <template v-if="section">
              <!-- 精選大卡 -->
              <div class="noya-dawn-d__featured">
                <img
                  v-if="section.featured.img"
                  class="noya-dawn-d__featured-img"
                  :src="section.featured.img"
                  :alt="section.featured.alt"
                />
                <div v-else class="noya-dawn-d__featured-placeholder">
                  <div class="noya-dawn-d__featured-wm">
                    {{ section.featured.wm }}
                  </div>
                  <div class="noya-dawn-d__featured-overlay">
                    <div class="noya-dawn-d__featured-big">
                      {{ section.featured.big }}
                    </div>
                    <div class="noya-dawn-d__featured-sub">
                      {{ section.featured.sub }}
                    </div>
                  </div>
                </div>
                <span class="noya-dawn-d__featured-tag">精選推薦</span>
                <span class="noya-dawn-d__featured-enter">立即進入</span>
              </div>

              <!-- 垂直列表 -->
              <div class="noya-dawn-d__list">
                <div
                  v-for="(item, idx) in section.list"
                  :key="idx"
                  class="noya-dawn-d__list-item"
                >
                  <div class="noya-dawn-d__list-thumb">
                    <img v-if="item.img" :src="item.img" :alt="item.alt" />
                    <div v-else class="noya-dawn-d__list-thumb-placeholder">
                      <Icon icon="material-symbols:casino-outline" />
                    </div>
                  </div>
                  <div class="noya-dawn-d__list-info">
                    <div class="noya-dawn-d__list-big">{{ item.big }}</div>
                    <div class="noya-dawn-d__list-sub">{{ item.sub }}</div>
                  </div>
                  <span class="noya-dawn-d__list-enter">立即進入</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-dawn-d__section noya-dawn-d__section--soft">
        <div class="noya-dawn-d__sec-head">
          <span class="noya-dawn-d__sec-zh">熱門遊戲</span>
          <span class="noya-dawn-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-dawn-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-dawn-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-dawn-d__gcard noya-dawn-d__gcard--pop">
              <div class="noya-dawn-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-dawn-d__gcard-label">
                <div class="noya-dawn-d__gcard-big">{{ c.big }}</div>
                <div class="noya-dawn-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-dawn-d__download noya-dawn-d__section">
        <div class="noya-dawn-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-dawn-d__dl-right">
          <div class="noya-dawn-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-dawn-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-dawn-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-dawn-d__section noya-dawn-d__section--soft">
        <div class="noya-dawn-d__sec-head">
          <span class="noya-dawn-d__sec-zh">頂尖服務</span>
          <span class="noya-dawn-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-dawn-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-dawn-d__svc-card"
          >
            <div class="noya-dawn-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-dawn-d__footer">
      <div class="noya-dawn-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-dawn-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-dawn-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-dawn-d {
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
    border-bottom: 1px solid var(--border);
    box-shadow: 0 4px 16px rgba(100, 40, 10, 0.08);
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
      color: var(--text-primary);
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
      background: var(--glass);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 14px rgba(220, 100, 50, 0.3);
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
    border: 1px solid var(--border);
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
    border: 1px solid var(--border);
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
    border-radius: 16px;
    background: var(--glass);
    border: 1px solid var(--border);
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

      > .noya-dawn-d__sec-head,
      > .noya-dawn-d__pop-grid,
      > .noya-dawn-d__svc-grid {
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
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ===== LOBBY（橫向佈局）=====
  &__lobby {
    display: flex;
    gap: 28px;
    align-items: flex-start;
  }

  // 左側 sidebar（圓角卡片按鈕垂直列）
  &__sidebar {
    width: 120px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  // 圓角卡片按鈕（上下垂直堆疊）：active = tint + 上浮
  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 14px 8px 12px;
    border-radius: 18px;
    cursor: pointer;
    color: var(--ink-mute);
    border: 1px solid transparent;
    background: transparent;
    width: 100%;
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease,
      border-color 0.18s ease;

    &--on {
      background: var(--tab-active-bg);
      border-color: var(--border);
      box-shadow:
        0 -4px 16px rgba(240, 130, 88, 0.2),
        0 6px 14px rgba(200, 80, 30, 0.1);
      transform: translateY(-4px);

      .noya-dawn-d__tab-badge {
        background: var(--gradient-cta);
        color: #ffffff;
        box-shadow: 0 4px 14px rgba(220, 100, 50, 0.4);
      }

      .noya-dawn-d__tab-label {
        color: var(--color-primary);
        font-weight: 700;
      }
    }

    &:hover:not(.noya-dawn-d__tab--on) {
      background: var(--glass);
    }
  }

  // 圓形 icon 徽章
  // stylelint-disable-next-line no-descending-specificity
  &__tab-badge {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--glass);
    border: 1px solid var(--border);
    color: var(--ink-mute);
    font-size: 28px;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--ink-mute);
    transition: color 0.18s ease;
  }

  // 右側內容區
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }

  // 精選大卡
  &__featured {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  &__featured-img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 300px;
    object-fit: cover;
  }

  &__featured-placeholder {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 5;
    background: var(--gcard-bg);
    border-radius: 18px;
    overflow: hidden;
  }

  &__featured-wm {
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 80px;
    font-weight: 900;
    font-style: italic;
    color: rgba(240, 130, 88, 0.1);
    pointer-events: none;
    line-height: 0.9;
  }

  &__featured-overlay {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__featured-big {
    font-size: 32px;
    font-weight: 900;
    color: var(--text-primary);
    border-left: 4px solid var(--card-label-bar);
    padding-left: 14px;
    white-space: nowrap;
  }

  &__featured-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 13px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 8px 0 0 18px;
  }

  &__featured-tag {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 4px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    background: var(--gradient-cta);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(220, 100, 50, 0.4);
    z-index: 4;
  }

  &__featured-enter {
    position: absolute;
    right: 16px;
    bottom: 16px;
    padding: 8px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.9);
    color: var(--color-primary);
    border: 1px solid var(--border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 4;
    cursor: pointer;
  }

  // 垂直列表
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 18px;
    border-radius: 16px;
    background: var(--glass);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition:
      background 0.15s,
      box-shadow 0.15s;

    &:hover {
      background: var(--bg-overlay);
    }
  }

  &__list-thumb {
    width: 80px;
    height: 56px;
    border-radius: 10px;
    overflow: hidden;
    flex: none;
    background: var(--gcard-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__list-thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    font-size: 28px;
    opacity: 0.5;
  }

  &__list-info {
    flex: 1;
    min-width: 0;
  }

  &__list-big {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__list-sub {
    font-family: ui-monospace, monospace;
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-mute);
    letter-spacing: 0.1em;
    margin-top: 4px;
    white-space: nowrap;
  }

  &__list-enter {
    flex: none;
    padding: 8px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    background: var(--gradient-cta);
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(220, 100, 50, 0.3);
    white-space: nowrap;
    transition: box-shadow 0.15s;

    &:hover {
      box-shadow: 0 4px 14px rgba(220, 100, 50, 0.5);
    }
  }

  // 佔位卡（熱門遊戲區用）
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
    border-radius: 16px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1px solid var(--border);
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
    color: rgba(240, 130, 88, 0.12);
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
    border: 1px solid var(--border);
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
    border: 1px solid var(--border);
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
    box-shadow: 0 4px 14px rgba(220, 100, 50, 0.3);
    cursor: pointer;
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
    border: 1px solid var(--border);
    box-shadow: var(--shadow);

    h3 {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
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
      gap: 8px;
    }

    &__tab {
      width: auto;
      flex: 1;
      min-width: 80px;
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
