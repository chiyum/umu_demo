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
 * noya-lux（曜黑燙金）桌面版
 *
 * 設計主軸：深色曜黑底 + 香檳燙金，古典奢華格調，全用襯線字體。
 * 結構：sticky nav / hero+公告+在線 / 遊戲大廳（左 sidebar 分類 + 右卡片） /
 *   熱門遊戲 grid / 下載 / 服務 / footer。
 * 大廳 sidebar：細金框直式 tab，active = 金漸層填底，與 mobile 視覺一致。
 * 卡片：深色底 + 金邊 + 右上金角標 ribbon + 大型淡金水印英文。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（真人切片 + 金漸層佔位卡混排） */
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
    desc: "真人、體育、棋牌、電子、捕魚一站集合，暢玩各式頂級娛樂。"
  },
  {
    icon: "material-symbols:verified-user-outline",
    title: "資安守護",
    desc: "全程加密與實名制保障，守護每位尊貴會員的帳戶與資金安全。"
  }
];
</script>

<template>
  <div class="noya-lux-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-lux-d__nav">
      <div class="noya-lux-d__nav-inner">
        <a class="noya-lux-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-lux-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-lux-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-lux-d__nav-cta">
          <span class="noya-lux-d__btn noya-lux-d__btn--ghost">會員登入</span>
          <span class="noya-lux-d__btn noya-lux-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-lux-d__main">
      <!-- ===== HERO + 公告 + 在線 ===== -->
      <section class="noya-lux-d__hero">
        <div class="noya-lux-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
          <!-- hero 右上金角標 -->
          <div class="noya-lux-d__hero-ribbon">VIP</div>
        </div>
        <aside class="noya-lux-d__hero-side">
          <div class="noya-lux-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-lux-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 大廳（左 sidebar + 右卡片）===== -->
      <section class="noya-lux-d__section">
        <div class="noya-lux-d__sec-head">
          <span class="noya-lux-d__sec-zh">遊戲大廳</span>
          <span class="noya-lux-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-lux-d__lobby">
          <!-- 左側 sidebar 分類（細金框直式 tab） -->
          <div class="noya-lux-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-lux-d__stab"
              :class="{ 'noya-lux-d__stab--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <span class="noya-lux-d__stab-accent"></span>
              <Icon class="noya-lux-d__stab-ic" :icon="cat.icon" />
              <span class="noya-lux-d__stab-label">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 右側卡片內容 -->
          <div class="noya-lux-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <img
                v-if="c.img"
                class="noya-lux-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <div v-else class="noya-lux-d__gcard">
                <div class="noya-lux-d__gcard-wm">{{ c.wm }}</div>
                <div class="noya-lux-d__gcard-ribbon">HOT</div>
                <div class="noya-lux-d__gcard-label">
                  <div class="noya-lux-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-lux-d__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-lux-d__section noya-lux-d__section--soft">
        <div class="noya-lux-d__sec-head">
          <span class="noya-lux-d__sec-zh">熱門遊戲</span>
          <span class="noya-lux-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-lux-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-lux-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-lux-d__gcard noya-lux-d__gcard--pop">
              <div class="noya-lux-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-lux-d__gcard-ribbon">HOT</div>
              <div class="noya-lux-d__gcard-label">
                <div class="noya-lux-d__gcard-big">{{ c.big }}</div>
                <div class="noya-lux-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-lux-d__download noya-lux-d__section">
        <div class="noya-lux-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-lux-d__dl-right">
          <div class="noya-lux-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-lux-d__dl-desc">
            奢華娛樂支持所有行動裝置，下載 App
            即可隨時享受真人、體育、棋牌、電子與捕魚頂級遊戲。
          </p>
          <span class="noya-lux-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-lux-d__section noya-lux-d__section--soft">
        <div class="noya-lux-d__sec-head">
          <span class="noya-lux-d__sec-zh">頂尖服務</span>
          <span class="noya-lux-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-lux-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-lux-d__svc-card"
          >
            <div class="noya-lux-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-lux-d__footer">
      <div class="noya-lux-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-lux-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-lux-d__footer-copy">© 2025 奢華娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-lux-d {
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
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
    font-weight: 500;
    font-family: var(--font-display);
    color: var(--ink-soft);
    border-radius: 2px;
    letter-spacing: 0.04em;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: var(--bg-overlay);
      color: var(--color-secondary);
    }
  }

  &__nav-cta {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  &__btn {
    padding: 8px 20px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-display);
    cursor: pointer;
    letter-spacing: 0.05em;

    &--ghost {
      border: 1px solid var(--border);
      outline: 1px solid rgba(217, 184, 106, 0.06);
      outline-offset: -3px;
      color: var(--color-secondary);
      background: var(--glass);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 4px 16px rgba(200, 164, 74, 0.4);
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
    position: relative;
    border-radius: 4px;
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

  // hero 右上角金角標
  &__hero-ribbon {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 64px 64px 0;
    border-color: transparent var(--color-primary) transparent transparent;

    &::after {
      content: "VIP";
      position: absolute;
      top: 9px;
      right: -59px;
      font-size: 12px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--text-on-primary);
      letter-spacing: 0.06em;
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
    border-radius: 4px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    color: var(--color-secondary);
    font-size: 22px;

    p {
      font-size: 14px;
      font-family: var(--font-display);
      color: var(--text-muted);
      line-height: 1.7;
      letter-spacing: 0.02em;

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
    border-radius: 4px;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    font-size: 16px;
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

      > .noya-lux-d__sec-head,
      > .noya-lux-d__pop-grid,
      > .noya-lux-d__svc-grid {
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
    font-weight: 700;
    font-family: var(--font-display);
    letter-spacing: 6px;
    color: var(--color-secondary);
    text-shadow: 0 0 24px var(--glow);
  }

  &__sec-en {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    letter-spacing: 8px;
    font-family: Georgia, serif;
    font-style: italic;
    color: var(--ink-mute);
  }

  // ===== LOBBY（左 sidebar + 右卡片）=====
  &__lobby {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 20px;
    align-items: flex-start;
  }

  // 左側 sidebar 分類（細金框直式 tab）
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 4px 0;
  }

  &__stab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 14px 14px 20px;
    cursor: pointer;
    color: var(--ink-mute);

    // 細金框
    border: 1px solid var(--glass-line);
    outline: 1px solid rgba(217, 184, 106, 0.04);
    outline-offset: -3px;
    background: rgba(20, 18, 10, 0.5);
    border-radius: 2px;
    font-family: var(--font-display);
    transition:
      background 0.18s,
      color 0.18s,
      border-color 0.18s;

    // active：金漸層填底 + 黑字 + 上下細金線
    &--on {
      background: var(--tab-active-bg);
      border-color: rgba(230, 200, 120, 0.7);
      outline-color: rgba(217, 184, 106, 0.15);
      color: var(--text-on-primary);
      box-shadow:
        0 4px 16px rgba(200, 164, 74, 0.25),
        inset 0 1px 0 rgba(255, 240, 180, 0.4),
        inset 0 -1px 0 rgba(160, 110, 20, 0.4);

      .noya-lux-d__stab-accent {
        opacity: 1;
      }

      .noya-lux-d__stab-ic,
      .noya-lux-d__stab-label {
        color: var(--text-on-primary);
      }
    }
  }

  // 左側細金 accent 線
  // stylelint-disable-next-line no-descending-specificity
  &__stab-accent {
    position: absolute;
    left: -1px;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: var(--color-secondary);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 0.18s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__stab-ic {
    font-size: 22px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.18s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__stab-label {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--ink-mute);
    transition: color 0.18s;
  }

  // 右側卡片
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 3px;
    box-shadow: var(--shadow);
    border: 1px solid var(--glass-line);
  }

  // 金漸層佔位卡
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
    border-radius: 3px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1px solid var(--border);
    outline: 1px solid rgba(217, 184, 106, 0.05);
    outline-offset: -3px;
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
    font-family: Georgia, serif;
    color: rgba(217, 184, 106, 0.07);
    pointer-events: none;
  }

  // 右上角金角標 ribbon
  &__gcard-ribbon {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 44px 44px 0;
    border-color: transparent var(--color-primary) transparent transparent;
    z-index: 3;

    &::after {
      content: "HOT";
      position: absolute;
      top: 6px;
      right: -40px;
      font-size: 9px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--text-on-primary);
      letter-spacing: 0.04em;
    }
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
    font-family: var(--font-display);
    color: var(--text-primary);
    border-left: 2px solid var(--card-label-bar);
    padding-left: 10px;
    white-space: nowrap;
    letter-spacing: 0.03em;
  }

  &__gcard-sub {
    font-family: Georgia, serif;
    font-weight: 400;
    font-size: 11px;
    font-style: italic;
    color: var(--card-sub);
    letter-spacing: 0.16em;
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
    border-radius: 3px;
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
    border-radius: 4px;
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
    font-weight: 700;
    font-family: var(--font-display);
    color: var(--color-secondary);
    letter-spacing: 4px;
    text-shadow: 0 0 24px var(--glow);
  }

  &__dl-desc {
    margin: 16px 0 24px;
    color: var(--text-muted);
    font-size: 15px;
    font-family: var(--font-display);
    line-height: 2;
    max-width: 440px;
    letter-spacing: 0.03em;
  }

  &__dl-cta {
    display: inline-block;
    padding: 12px 32px;
    border-radius: 2px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-weight: 700;
    font-family: var(--font-display);
    letter-spacing: 0.08em;
    box-shadow: 0 4px 16px rgba(200, 164, 74, 0.45);
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
    border-radius: 3px;
    text-align: center;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);

    h3 {
      font-size: 20px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--color-secondary);
      margin: 16px 0 12px;
      letter-spacing: 0.06em;
    }

    p {
      color: var(--text-muted);
      font-size: 14px;
      font-family: var(--font-display);
      line-height: 1.9;
      letter-spacing: 0.02em;
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
      font-size: 12px;
      font-weight: 500;
      font-family: var(--font-display);
      color: var(--ink-mute);
      letter-spacing: 0.05em;
      opacity: 0.7;
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
      font-family: var(--font-display);
      letter-spacing: 0.03em;

      &:hover {
        color: var(--color-secondary);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--ink-mute);
    font-size: 12px;
    font-family: var(--font-display);
    letter-spacing: 2px;
  }

  // ===== RESPONSIVE =====
  @media (width <= 980px) {
    &__hero {
      grid-template-columns: 1fr;
    }

    &__lobby {
      grid-template-columns: 120px 1fr;
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
