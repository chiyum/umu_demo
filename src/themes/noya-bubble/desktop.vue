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
 * noya-bubble（浮動藥丸交錯）桌面版
 *
 * 整頁結構：sticky nav / hero + 公告 + 在線 /
 *   遊戲大廳（左 sidebar 浮動藥丸 + 右遊戲卡大圓角）/ 熱門 / 下載 / 服務 / footer
 *
 * 遊戲大廳忠實還原 ly7：
 *   - 左 sidebar：全圓藥丸按鈕欄，第 2/4 項 margin-left:12px 交錯
 *   - 選中藥丸：米橘漸層白字 + scale(1.04) 浮起
 *   - 右區塊：大圓角卡（24px），三層合成
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格（混排切片與佔位卡） */
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
  <div class="noya-bubble-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-bubble-d__nav">
      <div class="noya-bubble-d__nav-inner">
        <a class="noya-bubble-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-bubble-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-bubble-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-bubble-d__nav-cta">
          <span class="noya-bubble-d__btn noya-bubble-d__btn--ghost">
            會員登入
          </span>
          <span class="noya-bubble-d__btn noya-bubble-d__btn--solid">
            免費註冊
          </span>
        </div>
      </div>
    </header>

    <main class="noya-bubble-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-bubble-d__hero">
        <div class="noya-bubble-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-bubble-d__hero-side">
          <div class="noya-bubble-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-bubble-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（主視覺，ly7 浮動藥丸 + 大圓角卡） ===== -->
      <section class="noya-bubble-d__section">
        <div class="noya-bubble-d__sec-head">
          <span class="noya-bubble-d__sec-zh">遊戲大廳</span>
          <span class="noya-bubble-d__sec-en">GAME LOBBY</span>
        </div>
        <!-- desktop 大廳：左側 sidebar 藥丸 + 右側卡片區 -->
        <div class="noya-bubble-d__lobby">
          <!-- 左側 sidebar：浮動藥丸按鈕 -->
          <div class="noya-bubble-d__rail">
            <button
              v-for="(cat, idx) in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-bubble-d__cat"
              :class="{
                'noya-bubble-d__cat--on': activeCat === cat.key,
                'noya-bubble-d__cat--offset': idx === 1 || idx === 3
              }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-bubble-d__cat-ic" :icon="cat.icon" />
              <span class="noya-bubble-d__cat-lb">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 右側卡片區 -->
          <div class="noya-bubble-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <!-- 真實切片卡（真人分類） -->
              <img
                v-if="c.img"
                class="noya-bubble-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <!-- 佔位卡（大圓角 24px，三層合成） -->
              <div v-else class="noya-bubble-d__gcard">
                <div class="noya-bubble-d__gcard-deco">
                  <i></i>
                  <i></i>
                </div>
                <span v-if="c.tag" class="noya-bubble-d__gcard-tag">
                  {{ c.tag }}
                </span>
                <div class="noya-bubble-d__gcard-label">
                  <div class="noya-bubble-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-bubble-d__gcard-sub">{{ c.sub }}</div>
                  <span class="noya-bubble-d__gcard-cta">立即進入 ›</span>
                </div>
                <div class="noya-bubble-d__gcard-fig">
                  <div class="noya-bubble-d__ph">
                    <span>{{ c.wm }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-bubble-d__section noya-bubble-d__section--soft">
        <div class="noya-bubble-d__sec-head">
          <span class="noya-bubble-d__sec-zh">熱門遊戲</span>
          <span class="noya-bubble-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-bubble-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-bubble-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-bubble-d__gcard noya-bubble-d__gcard--pop">
              <div class="noya-bubble-d__gcard-label">
                <div class="noya-bubble-d__gcard-big">{{ c.big }}</div>
                <div class="noya-bubble-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-bubble-d__download noya-bubble-d__section">
        <div class="noya-bubble-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-bubble-d__dl-right">
          <div class="noya-bubble-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-bubble-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-bubble-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-bubble-d__section noya-bubble-d__section--soft">
        <div class="noya-bubble-d__sec-head">
          <span class="noya-bubble-d__sec-zh">頂尖服務</span>
          <span class="noya-bubble-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-bubble-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-bubble-d__svc-card"
          >
            <div class="noya-bubble-d__svc-ic">
              <Icon :icon="svc.icon" />
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-bubble-d__footer">
      <div class="noya-bubble-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-bubble-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-bubble-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-bubble-d {
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
    box-shadow: 0 4px 16px rgba(120, 70, 30, 0.1);
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
    border-radius: 999px; // nav 連結也用藥丸圓角呼應主題
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
      box-shadow: 0 4px 14px rgba(198, 106, 60, 0.4);
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

      > .noya-bubble-d__sec-head,
      > .noya-bubble-d__pop-grid,
      > .noya-bubble-d__svc-grid {
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

  // ===== 遊戲大廳（ly7 雙欄：左 sidebar + 右卡片）=====
  &__lobby {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  // 左側 sidebar 藥丸欄
  &__rail {
    width: 120px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  // 藥丸按鈕（忠實移植 ly7 全圓 999px）
  &__cat {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 15px;
    border-radius: 999px;
    background: var(--pill-btn-bg);
    box-shadow: var(--pill-btn-shadow);
    border: var(--pill-btn-border);
    color: var(--mut);
    cursor: pointer;
    font-family: inherit;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease,
      box-shadow 0.18s ease;

    // 第 2/4 項（idx 1/3）向右交錯浮動
    &--offset {
      margin-left: 12px;
    }

    // 選中：米橘漸層 + 白字 + scale(1.04) 浮起
    &--on {
      background: var(--pill-btn-on-bg);
      color: #ffffff;
      box-shadow: var(--pill-btn-on-shadow);
      transform: scale(1.04);
      border-color: transparent;

      .noya-bubble-d__cat-ic {
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

  // 右側卡片區
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }

  // 真實切片卡
  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 24px; // ly7 大圓角
    box-shadow: var(--shadow);
    display: block;
  }

  // 佔位卡（大圓角 24px，對齊 ly7）
  &__gcard {
    position: relative;
    aspect-ratio: 2.6 / 1;
    min-height: 90px;
    border-radius: 24px;
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

  &__gcard-tag {
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
    border-radius: 20px;
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
    box-shadow: 0 4px 14px rgba(198, 106, 60, 0.4);
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
    border-radius: 24px;
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
      gap: 10px;
    }

    // 響應式時取消 offset，改水平排列
    &__cat--offset {
      margin-left: 0;
    }
  }
}
</style>
