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
 * noya-squircle（諾亞 Squircle 漸層磚）桌面版
 *
 * 整頁結構：
 *   sticky nav / hero + 公告 + 在線 /
 *   遊戲大廳（左 sidebar squircle + 右三層合成卡）/
 *   熱門 / 下載 / 服務 / footer
 *
 * 遊戲大廳為主視覺，忠實還原 ly9 squircle 按鈕 + 玻璃高光卡
 * 桌面遊戲大廳：左 sidebar（垂直 squircle 欄）+ 右三欄卡片 grid
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");

/** 熱門遊戲格（真實切片 + 佔位卡混排） */
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
  <div class="noya-squircle-d">
    <!-- ===== TOP NAV（sticky）===== -->
    <header class="noya-squircle-d__nav">
      <div class="noya-squircle-d__nav-inner">
        <a class="noya-squircle-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-squircle-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-squircle-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-squircle-d__nav-cta">
          <span class="noya-squircle-d__btn noya-squircle-d__btn--ghost">
            會員登入
          </span>
          <span class="noya-squircle-d__btn noya-squircle-d__btn--solid">
            免費註冊
          </span>
        </div>
      </div>
    </header>

    <main class="noya-squircle-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-squircle-d__hero">
        <div class="noya-squircle-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-squircle-d__hero-side">
          <div class="noya-squircle-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-squircle-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（ly9 主視覺：左 squircle sidebar + 右三欄卡）===== -->
      <section class="noya-squircle-d__section">
        <div class="noya-squircle-d__sec-head">
          <span class="noya-squircle-d__sec-zh">遊戲大廳</span>
          <span class="noya-squircle-d__sec-en">GAME LOBBY</span>
        </div>

        <!-- 大廳主體：左側 squircle 導欄 + 右側卡片 -->
        <div class="noya-squircle-d__lobby">
          <!-- 左側 squircle 方磚（桌面版垂直排列） -->
          <aside class="noya-squircle-d__rail">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-squircle-d__cat"
              :class="{ 'noya-squircle-d__cat--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-squircle-d__cat-ic" :icon="cat.icon" />
              <span class="noya-squircle-d__cat-lb">{{ cat.label }}</span>
            </button>
          </aside>

          <!-- 右側三層合成卡（三欄 grid） -->
          <div class="noya-squircle-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <!-- 真實切片卡（live 分類） -->
              <div
                v-if="c.img"
                class="noya-squircle-d__g noya-squircle-d__g--img"
              >
                <img :src="c.img" :alt="c.alt ?? c.name" />
                <span v-if="c.tag" class="noya-squircle-d__g-tag">
                  {{ c.tag }}
                </span>
              </div>
              <!-- 三層合成佔位卡 -->
              <article v-else class="noya-squircle-d__g">
                <div class="noya-squircle-d__g-bg"></div>
                <div class="noya-squircle-d__g-txt">
                  <h4>{{ c.name }}</h4>
                  <div class="noya-squircle-d__g-en">{{ c.en }}</div>
                  <span class="noya-squircle-d__g-cta">立即進入 ›</span>
                </div>
                <div class="noya-squircle-d__g-fig">
                  <div class="noya-squircle-d__ph">
                    <span>{{ figLabel }}</span>
                  </div>
                </div>
                <span v-if="c.tag" class="noya-squircle-d__g-tag">
                  {{ c.tag }}
                </span>
              </article>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-squircle-d__section noya-squircle-d__section--soft">
        <div class="noya-squircle-d__sec-head">
          <span class="noya-squircle-d__sec-zh">熱門遊戲</span>
          <span class="noya-squircle-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-squircle-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-squircle-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <!-- 熱門佔位卡（簡化版，無 CTA） -->
            <div v-else class="noya-squircle-d__pop-ph">
              <div class="noya-squircle-d__pop-ph-bg"></div>
              <div class="noya-squircle-d__pop-ph-txt">
                <span class="noya-squircle-d__pop-ph-name">{{ c.name }}</span>
                <span class="noya-squircle-d__pop-ph-en">{{ c.en }}</span>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-squircle-d__download noya-squircle-d__section">
        <div class="noya-squircle-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-squircle-d__dl-right">
          <div class="noya-squircle-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-squircle-d__dl-desc">
            諾亞娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-squircle-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-squircle-d__section noya-squircle-d__section--soft">
        <div class="noya-squircle-d__sec-head">
          <span class="noya-squircle-d__sec-zh">頂尖服務</span>
          <span class="noya-squircle-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-squircle-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-squircle-d__svc-card"
          >
            <div class="noya-squircle-d__svc-ic">
              <Icon :icon="svc.icon" />
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-squircle-d__footer">
      <div class="noya-squircle-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-squircle-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-squircle-d__footer-copy">© 2025 諾亞娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-squircle-d {
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
    border-bottom: 1px solid var(--nav-line);
    box-shadow: 0 4px 16px rgba(160, 110, 70, 0.12);
    backdrop-filter: blur(12px);
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
    color: var(--text-muted);
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
      background: rgba(255, 255, 255, 0.7);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: 0;
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
    border: 1px solid var(--notice-line);
    color: var(--color-primary);
    font-size: 22px;

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
    padding: 16px 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid var(--border);
    font-size: 17px;
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

      > .noya-squircle-d__sec-head,
      > .noya-squircle-d__pop-grid,
      > .noya-squircle-d__svc-grid {
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
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--ink);
  }

  &__sec-en {
    display: block;
    margin-top: 3px;
    font-size: 13px;
    letter-spacing: 6px;
    color: var(--mut);
  }

  // ===== 大廳（左 sidebar + 右 grid）=====
  &__lobby {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  // 左側 squircle sidebar（桌面版：vertical 排列，寬 100px）
  &__rail {
    width: 100px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  // squircle 方磚（桌面版略大：80×80）
  &__cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 80px;
    height: 80px;
    padding: 0;
    border-radius: 27px;
    background: var(--cat-bg);
    box-shadow: var(--cat-shadow);
    border: 0;
    cursor: pointer;
    color: var(--mut);
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      color 0.18s ease;

    &--on {
      background: var(--cat-on-bg);
      box-shadow: var(--cat-on-shadow);
      color: #ffffff;

      .noya-squircle-d__cat-ic {
        color: #ffffff;
      }

      .noya-squircle-d__cat-lb {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 28px;
    flex: none;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-lb {
    font-size: 13px;
    font-weight: 500;
  }

  // 右側卡片 grid（三欄）
  &__cards {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  // 遊戲卡（三層合成），border-radius:20px + 玻璃高光
  &__g {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: var(--shadow);

    // 玻璃高光（ly9 核心）
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 46%;
      z-index: 5;
      pointer-events: none;
      background: var(--glass-highlight);
      border-radius: 20px 20px 40% 40%;
    }

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
    z-index: 6;
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
    gap: 16px;
  }

  &__pop-card {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__pop-ph {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: var(--gcard-bg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
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
    font-size: 18px;
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
    width: 320px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);

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
    font-size: 32px;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: 2px;
    margin-bottom: 14px;
  }

  &__dl-desc {
    font-size: 16px;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 460px;
    margin-bottom: 24px;
  }

  &__dl-cta {
    display: inline-block;
    padding: 12px 32px;
    border-radius: 999px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(198, 106, 60, 0.4);
  }

  // ===== 服務卡 =====
  // stylelint-disable-next-line no-descending-specificity
  &__svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  &__svc-card {
    padding: 28px 24px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid var(--border);
    box-shadow: 0 4px 14px rgba(160, 110, 70, 0.1);

    h3 {
      font-size: 18px;
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
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--qa-ico-line);
    color: var(--color-primary);
    font-size: 26px;
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
