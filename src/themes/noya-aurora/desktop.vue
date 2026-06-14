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
 * noya-aurora（極光霓虹）桌面版
 *
 * 設計重點：
 *   大廳 section 採「左 sidebar 分類（icon + label 垂直列）+ 右 2 欄霓虹卡片」佈局；
 *   卡片邊框為流動 conic-gradient 描邊動畫 + 玻璃感半透明卡身；
 *   整體底色深夜藍黑，accent 霓虹青紫，nav / footer 帶霓虹線。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

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
  <div class="noya-aurora-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-aurora-d__nav">
      <div class="noya-aurora-d__nav-inner">
        <a class="noya-aurora-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-aurora-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-aurora-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-aurora-d__nav-cta">
          <span class="noya-aurora-d__btn noya-aurora-d__btn--ghost"
            >會員登入</span
          >
          <span class="noya-aurora-d__btn noya-aurora-d__btn--solid"
            >免費註冊</span
          >
        </div>
      </div>
      <!-- nav 底部霓虹線 -->
      <div class="noya-aurora-d__nav-glow-line"></div>
    </header>

    <main class="noya-aurora-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-aurora-d__hero">
        <div class="noya-aurora-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-aurora-d__hero-side">
          <div class="noya-aurora-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-aurora-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（左 sidebar + 右霓虹卡片）===== -->
      <section class="noya-aurora-d__section">
        <div class="noya-aurora-d__sec-head">
          <span class="noya-aurora-d__sec-zh">遊戲大廳</span>
          <span class="noya-aurora-d__sec-en">GAME LOBBY</span>
        </div>
        <!-- 左 sidebar + 右卡片 -->
        <div class="noya-aurora-d__lobby">
          <!-- 左 sidebar 分類（展開式，帶霓虹線裝飾） -->
          <div class="noya-aurora-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-aurora-d__scat"
              :class="{ 'noya-aurora-d__scat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-aurora-d__scat-ic" :icon="cat.icon" />
              <span>{{ cat.label }}</span>
              <!-- active 時左側霓虹指示條 -->
              <span
                v-if="activeCat === cat.key"
                class="noya-aurora-d__scat-bar"
              ></span>
            </button>
          </div>
          <!-- 右側 2 欄霓虹卡片 -->
          <div class="noya-aurora-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <img
                v-if="c.img"
                class="noya-aurora-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <div v-else class="noya-aurora-d__gcard">
                <div class="noya-aurora-d__gcard-inner">
                  <div class="noya-aurora-d__gcard-wm">{{ c.wm }}</div>
                  <div class="noya-aurora-d__gcard-label">
                    <div class="noya-aurora-d__gcard-big">{{ c.big }}</div>
                    <div class="noya-aurora-d__gcard-sub">{{ c.sub }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-aurora-d__section noya-aurora-d__section--soft">
        <div class="noya-aurora-d__sec-head">
          <span class="noya-aurora-d__sec-zh">熱門遊戲</span>
          <span class="noya-aurora-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-aurora-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-aurora-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-aurora-d__gcard noya-aurora-d__gcard--pop">
              <div class="noya-aurora-d__gcard-inner">
                <div class="noya-aurora-d__gcard-wm">{{ c.wm }}</div>
                <div class="noya-aurora-d__gcard-label">
                  <div class="noya-aurora-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-aurora-d__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-aurora-d__download noya-aurora-d__section">
        <div class="noya-aurora-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-aurora-d__dl-right">
          <div class="noya-aurora-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-aurora-d__dl-desc">
            極光娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-aurora-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-aurora-d__section noya-aurora-d__section--soft">
        <div class="noya-aurora-d__sec-head">
          <span class="noya-aurora-d__sec-zh">頂尖服務</span>
          <span class="noya-aurora-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-aurora-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-aurora-d__svc-card"
          >
            <div class="noya-aurora-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-aurora-d__footer">
      <div class="noya-aurora-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-aurora-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-aurora-d__footer-copy">© 2025 極光娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-aurora-d {
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

    // 移除普通 border，改用霓虹光線替代
    box-shadow: 0 4px 24px rgba(4, 14, 30, 0.6);
  }

  // nav 底部霓虹橫線（用獨立 div 製造模糊光效）
  &__nav-glow-line {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--color-primary) 30%,
      var(--color-accent) 60%,
      transparent 100%
    );
    filter: blur(1px);
    opacity: 0.7;
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
      color 0.15s,
      text-shadow 0.15s;

    &:hover {
      background: var(--bg-overlay);
      color: var(--color-primary);
      text-shadow: 0 0 10px var(--color-primary);
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
    transition:
      box-shadow 0.2s,
      background 0.2s;

    &--ghost {
      border: 1px solid var(--border);
      color: var(--color-primary);
      background: var(--glass);

      &:hover {
        box-shadow: 0 0 12px var(--glow);
      }
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: 1px solid transparent;
      box-shadow: 0 4px 14px var(--glow);

      &:hover {
        box-shadow: 0 6px 20px var(--glow);
      }
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
    box-shadow:
      var(--shadow),
      0 0 20px var(--glow);

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
    font-size: 24px;
    filter: drop-shadow(0 0 4px var(--color-primary));

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      filter: none;

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
    font-size: 18px;
    font-weight: 500;
    color: var(--ink-soft);

    // stylelint-disable-next-line no-descending-specificity
    b {
      color: var(--online-num);
      font-weight: 700;
      text-shadow: 0 0 8px var(--online-num);
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

      > .noya-aurora-d__sec-head,
      > .noya-aurora-d__pop-grid,
      > .noya-aurora-d__svc-grid {
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
    text-shadow: 0 0 20px var(--glow);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ===== LOBBY（左 sidebar + 右卡片）=====
  &__lobby {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 20px;
    align-items: start;
  }

  // 左 sidebar 分類
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--aurora-rail-bg);
    border: 1px solid var(--aurora-rail-border);
    border-radius: 16px;
    padding: 10px 8px;
  }

  &__scat {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--ink-mute);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &--on {
      color: var(--color-primary);
      background: var(--aurora-capsule-bg);
      border-color: var(--color-primary);
      box-shadow: var(--aurora-capsule-glow);

      .noya-aurora-d__scat-ic {
        color: var(--color-primary);
        filter: drop-shadow(0 0 5px var(--color-primary));
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__scat-ic {
    font-size: 22px;
    flex: none;
    transition: color 0.2s ease;
  }

  // active 指示條（左邊框霓虹光）
  &__scat-bar {
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: var(--color-primary);
    box-shadow: 0 0 8px var(--color-primary);
  }

  // 右側 2 欄霓虹卡片
  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  // live 切片圖（橫跨 2 欄）
  &__gfull {
    grid-column: span 2;
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow:
      var(--shadow),
      0 0 12px var(--glow);
    border: 1px solid var(--border);
  }

  // 霓虹流動漸層描邊卡
  &__gcard {
    position: relative;
    border-radius: 14px;
    padding: 2px;
    background: conic-gradient(
      from 0deg,
      var(--aurora-border-a) 0%,
      var(--aurora-border-b) 40%,
      var(--aurora-border-c) 70%,
      var(--aurora-border-a) 100%
    );
    animation: noya-aurora-d-spin-border 3s linear infinite;
    box-shadow: 0 0 10px rgba(52, 224, 208, 0.15);
    aspect-ratio: 760 / 232;

    &--pop {
      aspect-ratio: 4 / 3;
    }
  }

  &__gcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: var(--gcard-bg);
    overflow: hidden;
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 46px;
    font-weight: 900;
    font-style: italic;
    color: rgba(52, 224, 208, 0.06);
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
    text-shadow: 0 0 8px var(--glow);
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
    box-shadow:
      var(--shadow),
      0 0 16px var(--glow);

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
    box-shadow: 0 4px 14px var(--glow);
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 6px 22px var(--glow);
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
    border-radius: 18px;
    text-align: center;
    background: var(--glass);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);
    transition:
      box-shadow 0.25s,
      border-color 0.25s;

    &:hover {
      border-color: var(--border);
      box-shadow:
        var(--shadow),
        0 0 16px var(--glow);
    }

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
    box-shadow: 0 0 18px var(--glow);
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
      transition: color 0.15s;

      &:hover {
        color: var(--color-primary);
        text-shadow: 0 0 8px var(--color-primary);
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
      grid-template-columns: 1fr;
    }

    &__sidebar {
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

// 流動漸層描邊旋轉動畫
@keyframes noya-aurora-d-spin-border {
  from {
    background: conic-gradient(
      from 0deg,
      var(--aurora-border-a) 0%,
      var(--aurora-border-b) 40%,
      var(--aurora-border-c) 70%,
      var(--aurora-border-a) 100%
    );
  }

  to {
    background: conic-gradient(
      from 360deg,
      var(--aurora-border-a) 0%,
      var(--aurora-border-b) 40%,
      var(--aurora-border-c) 70%,
      var(--aurora-border-a) 100%
    );
  }
}
</style>
