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
 * noya-bookmark（書籤摺角標籤）桌面版
 *
 * 整頁結構：sticky nav / hero + 公告 + 在線 /
 *   遊戲大廳（左 sidebar 書籤標籤 + 右遊戲卡 15px 圓角）/ 熱門 / 下載 / 服務 / footer
 *
 * 遊戲大廳忠實還原 ly8：
 *   - 左 sidebar：書籤箭頭 clip-path 按鈕欄（指向右）
 *   - 預設 margin-right:10px；選中時 margin-right:0 外推貼齊卡片 + 發光
 *   - 右區塊：15px 圓角卡，g-tag 貼右上角折角效果
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
  <div class="noya-bookmark-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-bookmark-d__nav">
      <div class="noya-bookmark-d__nav-inner">
        <a class="noya-bookmark-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-bookmark-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-bookmark-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-bookmark-d__nav-cta">
          <span class="noya-bookmark-d__btn noya-bookmark-d__btn--ghost">
            會員登入
          </span>
          <span class="noya-bookmark-d__btn noya-bookmark-d__btn--solid">
            免費註冊
          </span>
        </div>
      </div>
    </header>

    <main class="noya-bookmark-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-bookmark-d__hero">
        <div class="noya-bookmark-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-bookmark-d__hero-side">
          <div class="noya-bookmark-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-bookmark-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（主視覺，ly8 書籤標籤 + 15px 圓角卡）===== -->
      <section class="noya-bookmark-d__section">
        <div class="noya-bookmark-d__sec-head">
          <span class="noya-bookmark-d__sec-zh">遊戲大廳</span>
          <span class="noya-bookmark-d__sec-en">GAME LOBBY</span>
        </div>

        <!-- desktop 大廳：左 sidebar 書籤 + 右卡片 -->
        <!-- 對齊 ly8：lobby padding:16px 0 16px 14px（左側無 padding 讓書籤貼邊）-->
        <div class="noya-bookmark-d__lobby">
          <!-- 左側 sidebar：書籤箭頭按鈕 -->
          <div class="noya-bookmark-d__rail">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-bookmark-d__cat"
              :class="{ 'noya-bookmark-d__cat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-bookmark-d__cat-ic" :icon="cat.icon" />
              <span class="noya-bookmark-d__cat-lb">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 右側卡片區 -->
          <div class="noya-bookmark-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <!-- 真實切片卡 -->
              <img
                v-if="c.img"
                class="noya-bookmark-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <!-- 佔位卡（15px 圓角，三層合成） -->
              <div v-else class="noya-bookmark-d__gcard">
                <div class="noya-bookmark-d__gcard-deco">
                  <i></i>
                  <i></i>
                </div>
                <!-- ly8 角標：貼右上角折角 -->
                <span v-if="c.tag" class="noya-bookmark-d__gcard-tag">
                  {{ c.tag }}
                </span>
                <div class="noya-bookmark-d__gcard-label">
                  <div class="noya-bookmark-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-bookmark-d__gcard-sub">{{ c.sub }}</div>
                  <span class="noya-bookmark-d__gcard-cta">立即進入 ›</span>
                </div>
                <div class="noya-bookmark-d__gcard-fig">
                  <div class="noya-bookmark-d__ph">
                    <span>{{ c.wm }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-bookmark-d__section noya-bookmark-d__section--soft">
        <div class="noya-bookmark-d__sec-head">
          <span class="noya-bookmark-d__sec-zh">熱門遊戲</span>
          <span class="noya-bookmark-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-bookmark-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-bookmark-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div
              v-else
              class="noya-bookmark-d__gcard noya-bookmark-d__gcard--pop"
            >
              <div class="noya-bookmark-d__gcard-label">
                <div class="noya-bookmark-d__gcard-big">{{ c.big }}</div>
                <div class="noya-bookmark-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-bookmark-d__download noya-bookmark-d__section">
        <div class="noya-bookmark-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-bookmark-d__dl-right">
          <div class="noya-bookmark-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-bookmark-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-bookmark-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-bookmark-d__section noya-bookmark-d__section--soft">
        <div class="noya-bookmark-d__sec-head">
          <span class="noya-bookmark-d__sec-zh">頂尖服務</span>
          <span class="noya-bookmark-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-bookmark-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-bookmark-d__svc-card"
          >
            <div class="noya-bookmark-d__svc-ic">
              <Icon :icon="svc.icon" />
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-bookmark-d__footer">
      <div class="noya-bookmark-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-bookmark-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-bookmark-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-bookmark-d {
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
    border-bottom: 1px solid var(--line);
    box-shadow: 0 4px 16px rgba(100, 80, 30, 0.1);
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
    color: var(--text-muted);
    border-radius: 10px;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: var(--soft);
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
      border: 1px solid var(--border);
      color: var(--acc);
      background: transparent;
    }

    &--solid {
      background: var(--gradient-cta);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(154, 125, 58, 0.4);
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
    border: 1px solid var(--line);
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
    border: 1px solid var(--line);
    color: var(--acc);
    font-size: 24px;

    // stylelint-disable-next-line no-descending-specificity
    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;

      // stylelint-disable-next-line no-descending-specificity
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
    background: var(--soft);
    border: 1px solid var(--line);
    font-size: 18px;
    font-weight: 500;
    color: var(--text-muted);

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

      > .noya-bookmark-d__sec-head,
      > .noya-bookmark-d__pop-grid,
      > .noya-bookmark-d__svc-grid {
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
    color: var(--acc);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--mut);
  }

  // ===== 遊戲大廳（ly8 雙欄：左書籤 sidebar + 右卡片）=====
  // 對齊 ly8：lobby padding:16px 0 16px 14px（讓書籤從左緣開始）
  &__lobby {
    display: flex;
    gap: 6px;
    padding: 0; // section 已有 padding，lobby 自己無需再加
    align-items: flex-start;
  }

  // 左側書籤欄（ly8 rail width:108px + 無右 padding 貼合）
  &__rail {
    width: 120px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  // 書籤箭頭按鈕（忠實移植 ly8 clip-path 箭頭形）
  &__cat {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 12px 12px 12px 14px;
    background: var(--bookmark-bg);
    border-radius: 13px 0 0 13px;

    // 書籤箭頭 clip-path
    clip-path: polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%);
    box-shadow: var(--bookmark-border);
    margin-right: 10px;
    color: var(--mut);
    cursor: pointer;
    font-family: inherit;
    transition:
      margin-right 0.18s ease,
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    // 選中：外推貼齊（margin-right:0）+ 暗金漸層 + 發光
    &--on {
      background: var(--bookmark-on-bg);
      color: #ffffff;
      margin-right: 0;
      box-shadow: var(--bookmark-on-shadow);

      .noya-bookmark-d__cat-ic {
        color: #ffffff;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 20px;
    flex: none;
    color: var(--mut);
    transition: color 0.18s;
  }

  &__cat-lb {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  // 右側卡片區（ly8 cards 有 padding-right）
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    padding-right: 0; // desktop 無需額外 padding
  }

  // 真實切片卡（ly8 圓角 15px）
  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: var(--shadow);
    display: block;
  }

  // 佔位卡（ly8 border-radius:15px）
  &__gcard {
    position: relative;
    aspect-ratio: 2.6 / 1;
    min-height: 90px;
    border-radius: 15px;
    overflow: hidden;
    isolation: isolate;
    background: var(--gcard-bg);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);

    &--pop {
      aspect-ratio: 4 / 3;
      min-height: 0;
    }
  }

  &__gcard-deco {
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

  // 角標（ly8：貼右上角 border-radius:0 0 0 11px 折角）
  &__gcard-tag {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;
    font-family: ui-monospace, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #ffffff;
    background: color-mix(in oklab, var(--acc), #000000 8%);
    padding: 3px 7px;
    border-radius: 0 0 0 11px; // ly8 折角
  }

  &__gcard-label {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &__gcard-big {
    font-size: clamp(18px, 3.2cqw, 26px);
    font-weight: 900;
    color: var(--acc);
    white-space: nowrap;
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: var(--mut);
    letter-spacing: 0.14em;
    margin-top: 4px;
  }

  &__gcard-cta {
    display: inline-block;
    margin-top: 10px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 14px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  &__gcard-fig {
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
      font-size: 9px;
      letter-spacing: 0.14em;
      color: color-mix(in oklab, var(--acc), var(--ink) 30%);
      text-align: center;
    }
  }

  // ===== POPULAR GRID =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  &__pop-card {
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid var(--line);
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
    border: 1px solid var(--line);
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
    color: var(--acc);
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
    color: #ffffff;
    font-weight: 900;
    box-shadow: 0 4px 14px rgba(154, 125, 58, 0.4);
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
    border-radius: 15px;
    text-align: center;
    background: #ffffff;
    border: 1px solid var(--line);
    box-shadow: var(--shadow);

    h3 {
      font-size: 20px;
      font-weight: 800;
      color: var(--acc);
      margin: 16px 0 12px;
    }

    // stylelint-disable-next-line no-descending-specificity
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
    border-top: 1px solid var(--line);
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
      color: var(--mut);
      opacity: 0.8;
    }
  }

  &__footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 12px;

    a {
      color: var(--text-muted);
      font-size: 14px;

      &:hover {
        color: var(--acc);
      }
    }
  }

  &__footer-copy {
    text-align: center;
    color: var(--mut);
    font-size: 13px;
    letter-spacing: 1px;
  }

  // ===== RESPONSIVE =====
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

    &__lobby {
      flex-direction: column;
    }

    &__rail {
      width: 100%;
      flex-flow: row wrap;
      gap: 8px;
    }

    // 響應式時取消書籤外推效果，改水平排列
    &__cat {
      border-radius: 999px;
      clip-path: none; // 水平排列時回復正常形狀
      margin-right: 0;

      &--on {
        margin-right: 0;
      }
    }
  }
}
</style>
