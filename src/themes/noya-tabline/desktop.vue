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
 * noya-tabline（諾亞極簡頂分頁）桌面版
 *
 * 移植設計稿 ly10 電腦版：
 * - 整組遊戲大廳翻轉為頂部分頁列：
 *   rail 改為水平（flex-direction:row 滿寬 + 底線分隔）
 *   指示線改為底部橫線（bottom 3px，width 動畫展開）
 * - 卡片三欄 grid（三層合成扁平描邊卡）
 *
 * 整頁結構：
 *   sticky nav / hero + 公告 + 在線 /
 *   遊戲大廳（頂部分頁列 + 三欄卡片）/
 *   熱門 / 下載 / 服務 / footer
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");

/** 熱門遊戲格 */
const popularCards = [
  { img: cardDgSrc, alt: "DG 真人" },
  { name: "PG 電子", en: "PG SLOT" },
  { name: "熊貓體育", en: "PANDA SPORTS" },
  { img: cardAllbetSrc, alt: "歐博真人" },
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
  <div class="noya-tabline-d">
    <!-- ===== TOP NAV =====-->
    <header class="noya-tabline-d__nav">
      <div class="noya-tabline-d__nav-inner">
        <a class="noya-tabline-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-tabline-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-tabline-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-tabline-d__nav-cta">
          <span class="noya-tabline-d__btn noya-tabline-d__btn--ghost">
            會員登入
          </span>
          <span class="noya-tabline-d__btn noya-tabline-d__btn--solid">
            免費註冊
          </span>
        </div>
      </div>
    </header>

    <main class="noya-tabline-d__main">
      <!-- ===== HERO + 公告 + 在線 ===== -->
      <section class="noya-tabline-d__hero">
        <div class="noya-tabline-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-tabline-d__hero-side">
          <div class="noya-tabline-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-tabline-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（ly10 桌面：頂分頁 + 三欄卡片）===== -->
      <section class="noya-tabline-d__section">
        <div class="noya-tabline-d__sec-head">
          <span class="noya-tabline-d__sec-zh">遊戲大廳</span>
          <span class="noya-tabline-d__sec-en">GAME LOBBY</span>
        </div>

        <div class="noya-tabline-d__lobby">
          <!-- 頂部分頁列（水平 rail）ly10 核心：底線分隔 + 底橫線指示器 -->
          <div class="noya-tabline-d__rail">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-tabline-d__cat"
              :class="{ 'noya-tabline-d__cat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-tabline-d__cat-ic" :icon="cat.icon" />
              <span class="noya-tabline-d__cat-lb">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 三欄卡片 grid（扁平描邊） -->
          <div class="noya-tabline-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <div
                v-if="c.img"
                class="noya-tabline-d__g noya-tabline-d__g--img"
              >
                <img :src="c.img" :alt="c.alt ?? c.name" />
                <span v-if="c.tag" class="noya-tabline-d__g-tag">
                  {{ c.tag }}
                </span>
              </div>
              <article v-else class="noya-tabline-d__g">
                <div class="noya-tabline-d__g-bg"></div>
                <div class="noya-tabline-d__g-txt">
                  <h4>{{ c.name }}</h4>
                  <div class="noya-tabline-d__g-en">{{ c.en }}</div>
                  <span class="noya-tabline-d__g-cta">立即進入 ›</span>
                </div>
                <div class="noya-tabline-d__g-fig">
                  <div class="noya-tabline-d__ph">
                    <span>{{ figLabel }}</span>
                  </div>
                </div>
                <span v-if="c.tag" class="noya-tabline-d__g-tag">
                  {{ c.tag }}
                </span>
              </article>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-tabline-d__section noya-tabline-d__section--soft">
        <div class="noya-tabline-d__sec-head">
          <span class="noya-tabline-d__sec-zh">熱門遊戲</span>
          <span class="noya-tabline-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-tabline-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-tabline-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-tabline-d__pop-ph">
              <div class="noya-tabline-d__pop-ph-bg"></div>
              <div class="noya-tabline-d__pop-ph-txt">
                <span class="noya-tabline-d__pop-ph-name">{{ c.name }}</span>
                <span class="noya-tabline-d__pop-ph-en">{{ c.en }}</span>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-tabline-d__download noya-tabline-d__section">
        <div class="noya-tabline-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-tabline-d__dl-right">
          <div class="noya-tabline-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-tabline-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-tabline-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-tabline-d__section noya-tabline-d__section--soft">
        <div class="noya-tabline-d__sec-head">
          <span class="noya-tabline-d__sec-zh">頂尖服務</span>
          <span class="noya-tabline-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-tabline-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-tabline-d__svc-card"
          >
            <div class="noya-tabline-d__svc-ic">
              <Icon :icon="svc.icon" />
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-tabline-d__footer">
      <div class="noya-tabline-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-tabline-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-tabline-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-tabline-d {
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
    border-bottom: 1.5px solid var(--border);
    box-shadow: 0 2px 10px rgba(160, 110, 70, 0.1);
    backdrop-filter: blur(12px);
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
    padding: 9px 14px;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-muted);
    border-radius: 8px;
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
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &--ghost {
      border: 1px solid var(--border);
      color: var(--color-primary);
      background: rgba(255, 255, 255, 0.7);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: 0;
      box-shadow: 0 4px 12px rgba(198, 106, 60, 0.35);
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
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 6px 20px rgba(120, 80, 50, 0.15);

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
    gap: 14px;
  }

  &__notice {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 16px 18px;
    border-radius: 14px;
    background: var(--notice-bg);
    border: 1px solid var(--notice-line);
    color: var(--color-primary);
    font-size: 20px;

    p {
      font-size: 14px;
      color: var(--text-primary);
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
    padding: 14px 18px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.65);
    border: 1px solid var(--border);
    font-size: 16px;
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

      > .noya-tabline-d__sec-head,
      > .noya-tabline-d__pop-grid,
      > .noya-tabline-d__svc-grid {
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
    font-size: clamp(22px, 3vw, 30px);
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--ink);
  }

  &__sec-en {
    display: block;
    margin-top: 3px;
    font-size: 12px;
    letter-spacing: 6px;
    color: var(--mut);
  }

  // ===== 大廳（頂部分頁 + 三欄卡）=====
  &__lobby {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  // ly10 頂部分頁列（水平 rail）
  // 整列滿寬 + 底線分隔，指示線改底部橫線
  &__rail {
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: 100%;
    border-bottom: 1.5px solid var(--border);
    padding: 0 0 2px;
  }

  // ly10 頂分頁按鈕：flex 1 均分，指示線在 bottom（::before）
  &__cat {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 8px;
    border-radius: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: var(--mut);
    transition:
      color 0.18s ease,
      background 0.18s ease;

    // 底部橫線指示器（選中時 width 由 0 → 64%）
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -2px;
      transform: translateX(-50%);
      width: 0;
      height: 3px;
      border-radius: 3px;
      background: var(--indicator);
      transition: width 0.18s ease;
    }

    // 選中：純色字 + 底橫線展開
    &--on {
      color: var(--acc);

      &::before {
        width: 64%;
      }

      .noya-tabline-d__cat-lb {
        font-weight: 700;
        color: var(--acc);
      }

      .noya-tabline-d__cat-ic {
        color: var(--acc);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 22px;
    flex: none;
    color: var(--mut);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-lb {
    font-size: 15px;
    font-weight: 500;
  }

  // 三欄卡片 grid（扁平描邊）
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  // ly10 扁平描邊遊戲卡（box-shadow:none; border:1px solid var(--line)）
  &__g {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: none;
    border: 1px solid var(--line);

    &--img {
      aspect-ratio: auto;
      min-height: 0;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  &__g-txt {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 56%;

    h4 {
      font-size: clamp(14px, 2.2cqw, 20px);
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
    margin-top: 8px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 4px 10px;
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

  // ===== 熱門遊戲 =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  &__pop-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__pop-ph {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: var(--gcard-bg);
    border: 1px solid var(--border);
  }

  &__pop-ph-bg {
    position: absolute;
    inset: 0;
    background: var(--gcard-bg);
  }

  &__pop-ph-txt {
    position: absolute;
    left: 16px;
    bottom: 16px;
    z-index: 2;
  }

  &__pop-ph-name {
    display: block;
    font-size: 17px;
    font-weight: 900;
    color: var(--acc);
  }

  &__pop-ph-en {
    display: block;
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: var(--mut);
    margin-top: 4px;
  }

  // ===== 下載 =====
  &__download {
    display: flex;
    gap: 48px;
    align-items: center;
  }

  &__dl-left {
    flex: none;
    width: 300px;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--border);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__dl-right {
    flex: 1;
  }

  &__dl-title {
    font-size: 30px;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: 2px;
    margin-bottom: 14px;
  }

  &__dl-desc {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 460px;
    margin-bottom: 22px;
  }

  &__dl-cta {
    display: inline-block;
    padding: 11px 28px;
    border-radius: 999px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 5px 16px rgba(198, 106, 60, 0.35);
  }

  // ===== 服務 =====
  // stylelint-disable-next-line no-descending-specificity
  &__svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  &__svc-card {
    padding: 26px 22px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.65);
    border: 1px solid var(--border);

    h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--ink);
      margin: 12px 0 8px;
    }

    p {
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-muted);
    }
  }

  &__svc-ic {
    width: 46px;
    height: 46px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--qa-ico-line);
    color: var(--color-primary);
    font-size: 24px;
  }

  // ===== FOOTER =====
  &__footer {
    background: var(--footer-bg);
    border-top: 1px solid var(--border);
    padding: 32px 24px 20px;
    text-align: center;
  }

  &__footer-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 16px;
    margin-bottom: 20px;

    span {
      font-size: 13px;
      color: var(--text-muted);
    }
  }

  &__footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 12px;

    a {
      font-size: 13px;
      color: var(--text-muted);
      transition: color 0.15s;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__footer-copy {
    font-size: 12px;
    color: var(--mut);
  }
}
</style>
