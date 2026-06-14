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
 * noya-steel（鈦銀琥珀）桌面版
 *
 * 視覺亮點：
 *   - 深鈦灰金屬底（#1a1d22）+ 琥珀金屬高光系統
 *   - 遊戲大廳：左 sidebar segmented rail 分類 + 右側斜切卡片（clip-path 斜角）
 *   - Nav / footer 帶金屬雙描邊質感
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（鈦灰佔位卡 + 真人切片混排） */
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
  <div class="noya-steel-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-steel-d__nav">
      <div class="noya-steel-d__nav-inner">
        <a class="noya-steel-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-steel-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-steel-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-steel-d__nav-cta">
          <span class="noya-steel-d__btn noya-steel-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-steel-d__btn noya-steel-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
    </header>

    <main class="noya-steel-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-steel-d__hero">
        <div class="noya-steel-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
          <!-- 底部琥珀金屬切邊高光 -->
          <div class="noya-steel-d__hero-edge"></div>
        </div>
        <aside class="noya-steel-d__hero-side">
          <div class="noya-steel-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-steel-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（左 sidebar rail + 右斜切卡片）===== -->
      <section class="noya-steel-d__section">
        <div class="noya-steel-d__sec-head">
          <span class="noya-steel-d__sec-zh">遊戲大廳</span>
          <span class="noya-steel-d__sec-en">GAME LOBBY</span>
        </div>
        <!-- 大廳主體：左 rail + 右卡片 -->
        <div class="noya-steel-d__lobby">
          <!-- 左側 segmented rail sidebar -->
          <div class="noya-steel-d__rail">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-steel-d__seg"
              :class="{ 'noya-steel-d__seg--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-steel-d__seg-ic" :icon="cat.icon" />
              <span class="noya-steel-d__seg-label">{{ cat.label }}</span>
            </button>
          </div>
          <!-- 右側卡片內容（2 欄斜切卡片） -->
          <div class="noya-steel-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <div class="noya-steel-d__card-wrap">
                <img
                  v-if="c.img"
                  class="noya-steel-d__gfull"
                  :src="c.img"
                  :alt="c.alt"
                />
                <div v-else class="noya-steel-d__gcard">
                  <div class="noya-steel-d__gcard-wm">{{ c.wm }}</div>
                  <div class="noya-steel-d__gcard-label">
                    <div class="noya-steel-d__gcard-big">{{ c.big }}</div>
                    <div class="noya-steel-d__gcard-sub">{{ c.sub }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-steel-d__section noya-steel-d__section--soft">
        <div class="noya-steel-d__sec-head">
          <span class="noya-steel-d__sec-zh">熱門遊戲</span>
          <span class="noya-steel-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-steel-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div class="noya-steel-d__card-wrap">
              <div v-if="c.img" class="noya-steel-d__pop-card">
                <img :src="c.img" :alt="c.alt" />
              </div>
              <div v-else class="noya-steel-d__gcard noya-steel-d__gcard--pop">
                <div class="noya-steel-d__gcard-wm">{{ c.wm }}</div>
                <div class="noya-steel-d__gcard-label">
                  <div class="noya-steel-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-steel-d__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-steel-d__download noya-steel-d__section">
        <div class="noya-steel-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-steel-d__dl-right">
          <div class="noya-steel-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-steel-d__dl-desc">
            支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-steel-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-steel-d__section noya-steel-d__section--soft">
        <div class="noya-steel-d__sec-head">
          <span class="noya-steel-d__sec-zh">頂尖服務</span>
          <span class="noya-steel-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-steel-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-steel-d__svc-card"
          >
            <div class="noya-steel-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-steel-d__footer">
      <div class="noya-steel-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-steel-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-steel-d__footer-copy">© 2025 鈦銀娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-steel-d {
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

    // 金屬雙描邊：下方琥珀光線 + 外投影
    border-bottom: 1px solid var(--glass-line);
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.6),
      inset 0 -1px 0 rgba(217, 162, 75, 0.1);
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
    transition: box-shadow 0.15s;

    &--ghost {
      border: 1px solid var(--glass-line);
      color: var(--color-secondary);
      background: var(--glass);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: none;
      box-shadow:
        0 4px 14px rgba(0, 0, 0, 0.5),
        inset 0 1px 1px rgba(255, 255, 255, 0.2);
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

  // 底部琥珀切邊高光
  &__hero-edge {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 5%,
      var(--color-primary) 40%,
      var(--color-secondary) 60%,
      transparent 95%
    );
    opacity: 0.65;
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

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;

      // stylelint-disable-next-line no-descending-specificity
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
    font-size: 17px;
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

      > .noya-steel-d__sec-head,
      > .noya-steel-d__pop-grid,
      > .noya-steel-d__svc-grid {
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
    text-shadow: 0 0 18px var(--glow);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ===== 大廳 sidebar + 卡片佈局 =====
  &__lobby {
    display: flex;
    gap: 22px;
    align-items: flex-start;
  }

  // 左側 segmented rail sidebar（桌面版寬一點）
  &__rail {
    width: 110px;
    flex: none;
    border-radius: 18px;
    background: var(--rail-bg);
    border: 1px solid var(--rail-border);
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  // 每個分段按鈕
  &__seg {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    padding: 14px 8px;
    cursor: pointer;
    color: var(--ink-mute);
    border: none;
    background: transparent;
    transition:
      color 0.18s ease,
      background 0.18s ease;

    // 段分隔細線
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 14%;
      right: 14%;
      height: 1px;
      background: var(--rail-divider);
    }

    // active：內凹琥珀高光
    &--on {
      background: var(--tab-active-bg);
      color: var(--color-secondary);
      box-shadow: var(--rail-active-inset);

      .noya-steel-d__seg-ic {
        color: var(--color-primary);
        filter: drop-shadow(0 0 5px rgba(217, 162, 75, 0.6));
      }

      .noya-steel-d__seg-label {
        color: var(--color-secondary);
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__seg-ic {
    font-size: 26px;
    color: var(--ink-mute);
    transition: color 0.18s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__seg-label {
    font-size: 13px;
    font-weight: 500;
    transition: color 0.18s ease;
  }

  // 右側卡片（2 欄）
  &__cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    animation: noya-steel-d-in 0.28s ease;
  }

  // 卡片斜切包裝
  &__card-wrap {
    position: relative;
    border-radius: 14px;
    overflow: hidden;

    // 右上角斜切
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);

    // 斜切口琥珀高光
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 26px;
      height: 26px;
      background: linear-gradient(
        225deg,
        var(--card-clip-glow) 0%,
        transparent 55%
      );
      z-index: 10;
      pointer-events: none;
    }
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 0;
    box-shadow: var(--shadow);
    display: block;
  }

  // 鈦灰佔位卡
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
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
    font-size: 42px;
    font-weight: 900;
    font-style: italic;
    color: rgba(217, 162, 75, 0.07);
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

  // ===== 熱門遊戲 =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__pop-card {
    border-radius: 14px;
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

  // ===== 下載 =====
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
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
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
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.4),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
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

    &__rail {
      width: 100%;
      display: flex;
      flex-direction: row;
      border-radius: 14px;

      // 水平排列時，分隔線改為垂直
      .noya-steel-d__seg:not(:last-child)::after {
        inset: 14% 0 14% auto;
        width: 1px;
        height: auto;
      }
    }

    &__seg {
      flex: 1;
      padding: 12px 4px;
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

@keyframes noya-steel-d-in {
  from {
    opacity: 0;
    transform: translateX(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
