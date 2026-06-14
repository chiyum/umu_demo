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
  CHECKIN_DAYS,
  FOOTER_PROVIDERS
} from "./_data";

/**
 * noya-reef（珊瑚奶油）桌面版
 *
 * 視覺亮點：
 *   - 奶油近白淺色底調（light theme），珊瑚橙主色系
 *   - 遊戲大廳：左 sidebar squircle 分類按鈕 + 右側內容區（簽到 strip + squircle 卡片）
 *   - 全站 squircle 圓角設計語言（~20-28px 圓角 / 30% border-radius）
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲格 */
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
  <div class="noya-reef-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-reef-d__nav">
      <div class="noya-reef-d__nav-inner">
        <a class="noya-reef-d__logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
        </a>
        <nav class="noya-reef-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-reef-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-reef-d__nav-cta">
          <span class="noya-reef-d__btn noya-reef-d__btn--ghost">會員登入</span>
          <span class="noya-reef-d__btn noya-reef-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-reef-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-reef-d__hero">
        <div class="noya-reef-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-reef-d__hero-side">
          <div class="noya-reef-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-reef-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳（左 sidebar squircle + 右內容）===== -->
      <section class="noya-reef-d__section">
        <div class="noya-reef-d__sec-head">
          <span class="noya-reef-d__sec-zh">遊戲大廳</span>
          <span class="noya-reef-d__sec-en">GAME LOBBY</span>
        </div>
        <div class="noya-reef-d__lobby">
          <!-- 左側 squircle 分類 sidebar -->
          <div class="noya-reef-d__cats">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-reef-d__sqbtn"
              :class="{ 'noya-reef-d__sqbtn--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-reef-d__sqbtn-ic" :icon="cat.icon" />
              <span class="noya-reef-d__sqbtn-label">{{ cat.label }}</span>
            </button>
          </div>

          <!-- 右側內容：每日簽到 strip + squircle 卡片 -->
          <div class="noya-reef-d__content">
            <!-- 每日簽到 strip -->
            <div class="noya-reef-d__checkin">
              <div class="noya-reef-d__checkin-head">
                <Icon icon="material-symbols:calendar-today-outline" />
                <span>每日簽到</span>
                <span class="noya-reef-d__checkin-subtitle"
                  >連續簽到 7 天可獲得大獎</span
                >
              </div>
              <div class="noya-reef-d__checkin-days">
                <div
                  v-for="d in CHECKIN_DAYS"
                  :key="d.day"
                  class="noya-reef-d__checkin-day"
                  :class="{
                    'noya-reef-d__checkin-day--claimed': d.claimed,
                    'noya-reef-d__checkin-day--today': d.day === 3
                  }"
                >
                  <div class="noya-reef-d__checkin-dot">
                    <Icon
                      v-if="d.claimed"
                      icon="material-symbols:check-circle"
                    />
                    <span v-else class="noya-reef-d__checkin-num">{{
                      d.day
                    }}</span>
                  </div>
                  <div class="noya-reef-d__checkin-info">
                    <span class="noya-reef-d__checkin-day-label">{{
                      d.label
                    }}</span>
                    <span class="noya-reef-d__checkin-reward">{{
                      d.reward
                    }}</span>
                  </div>
                </div>
                <button type="button" class="noya-reef-d__checkin-cta">
                  <Icon icon="material-symbols:redeem-outline" />
                  今日領取
                </button>
              </div>
            </div>

            <!-- squircle 卡片（2 欄） -->
            <div class="noya-reef-d__cards" :key="activeCat">
              <template v-for="(c, i) in cards" :key="i">
                <div class="noya-reef-d__sqcard">
                  <img
                    v-if="c.img"
                    class="noya-reef-d__gfull"
                    :src="c.img"
                    :alt="c.alt"
                  />
                  <div v-else class="noya-reef-d__gcard">
                    <div class="noya-reef-d__gcard-wm">{{ c.wm }}</div>
                    <div class="noya-reef-d__gcard-label">
                      <div class="noya-reef-d__gcard-big">{{ c.big }}</div>
                      <div class="noya-reef-d__gcard-sub">{{ c.sub }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-reef-d__section noya-reef-d__section--soft">
        <div class="noya-reef-d__sec-head">
          <span class="noya-reef-d__sec-zh">熱門遊戲</span>
          <span class="noya-reef-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-reef-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div class="noya-reef-d__sqcard">
              <div v-if="c.img" class="noya-reef-d__pop-card">
                <img :src="c.img" :alt="c.alt" />
              </div>
              <div v-else class="noya-reef-d__gcard noya-reef-d__gcard--pop">
                <div class="noya-reef-d__gcard-wm">{{ c.wm }}</div>
                <div class="noya-reef-d__gcard-label">
                  <div class="noya-reef-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-reef-d__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section class="noya-reef-d__download noya-reef-d__section">
        <div class="noya-reef-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-reef-d__dl-right">
          <div class="noya-reef-d__dl-title">隨時隨地暢玩</div>
          <p class="noya-reef-d__dl-desc">
            支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-reef-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-reef-d__section noya-reef-d__section--soft">
        <div class="noya-reef-d__sec-head">
          <span class="noya-reef-d__sec-zh">頂尖服務</span>
          <span class="noya-reef-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-reef-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-reef-d__svc-card"
          >
            <div class="noya-reef-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-reef-d__footer">
      <div class="noya-reef-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-reef-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-reef-d__footer-copy">© 2025 珊瑚礁娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-reef-d {
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
    box-shadow: 0 2px 12px rgba(240, 116, 78, 0.1);
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
    border-radius: 12px;
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
      border: 1.5px solid var(--border);
      color: var(--color-primary);
      background: transparent;
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border: none;
      box-shadow: 0 4px 14px rgba(240, 116, 78, 0.35);
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
    // squircle 大圓角
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid var(--border);
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
    border-radius: 20px;
    background: var(--notice-bg);
    border: 1.5px solid var(--border);
    color: var(--color-primary);
    font-size: 22px;

    p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;

      // stylelint-disable-next-line no-descending-specificity
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
    border-radius: 20px;
    background: var(--glass);
    border: 1.5px solid var(--border);
    font-size: 17px;
    font-weight: 500;
    color: var(--ink-soft);
    box-shadow: var(--shadow);

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

      > .noya-reef-d__sec-head,
      > .noya-reef-d__pop-grid,
      > .noya-reef-d__svc-grid {
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

  // ===== 大廳 sidebar + 卡片佈局 =====
  &__lobby {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  // 左側 squircle sidebar
  &__cats {
    width: 100px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 2px;
  }

  // 大 squircle 按鈕（桌面版寬一點）
  &__sqbtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 14px 8px;

    // squircle：30% 視覺等效
    border-radius: 30%;
    cursor: pointer;
    background: var(--sqbtn-bg);
    border: 1.5px solid var(--border);
    box-shadow: 0 3px 12px rgba(60, 30, 20, 0.08);
    color: var(--ink-mute);
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;

    &--on {
      background: var(--tab-active-bg);
      border-color: transparent;
      box-shadow:
        0 8px 24px rgba(240, 116, 78, 0.35),
        0 2px 8px rgba(240, 116, 78, 0.2);
      color: var(--text-on-primary);

      .noya-reef-d__sqbtn-ic {
        color: var(--text-on-primary);
      }

      .noya-reef-d__sqbtn-label {
        color: rgba(255, 255, 255, 0.95);
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sqbtn-ic {
    font-size: 28px;
    color: var(--ink-mute);
    transition: color 0.2s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sqbtn-label {
    font-size: 13px;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  // 右側內容區
  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  // 每日簽到 strip（桌面版橫排）
  &__checkin {
    background: var(--checkin-bg);
    border-radius: 20px;
    border: 1.5px solid var(--border);
    padding: 16px 20px;
    box-shadow: var(--shadow);
  }

  &__checkin-head {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 14px;

    :deep(svg) {
      font-size: 20px;
    }
  }

  &__checkin-subtitle {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-muted);
    margin-left: 4px;
  }

  &__checkin-days {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__checkin-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  &__checkin-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: var(--checkin-unclaimed);
    color: var(--text-muted);

    :deep(svg) {
      font-size: 22px;
    }

    .noya-reef-d__checkin-day--claimed & {
      background: var(--checkin-claimed);
      color: #ffffff;
    }

    .noya-reef-d__checkin-day--today & {
      background: var(--checkin-claimed);
      color: #ffffff;
      box-shadow: 0 0 0 4px var(--checkin-today);
    }
  }

  &__checkin-num {
    font-size: 14px;
    font-weight: 700;
  }

  &__checkin-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  &__checkin-day-label {
    font-size: 11px;
    color: var(--ink-mute);
  }

  &__checkin-reward {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
    white-space: nowrap;
  }

  &__checkin-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 18px;
    border-radius: 16px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 14px rgba(240, 116, 78, 0.35);
    white-space: nowrap;
    flex-shrink: 0;

    :deep(svg) {
      font-size: 20px;
    }
  }

  // squircle 卡片（2 欄）
  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    animation: noya-reef-d-in 0.28s ease;
  }

  // squircle 卡片包裝
  &__sqcard {
    border-radius: 20px;
    overflow: hidden;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow);
    background: var(--bg-surface);
  }

  &__gfull {
    width: 100%;
    height: auto;
    display: block;
  }

  // 佔位遊戲卡
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
    overflow: hidden;
    background: var(--gcard-bg);

    &--pop {
      aspect-ratio: 4 / 3;
    }
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    font-weight: 900;
    font-style: italic;
    color: rgba(240, 116, 78, 0.08);
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
    font-size: 22px;
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
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid var(--border);
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
    box-shadow: 0 4px 14px rgba(240, 116, 78, 0.35);
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
    border-radius: 24px;
    text-align: center;
    background: var(--glass);
    border: 1.5px solid var(--border);
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
    box-shadow: 0 4px 14px rgba(240, 116, 78, 0.35);
  }

  // ===== FOOTER =====
  &__footer {
    background: var(--footer-bg);
    border-top: 1.5px solid var(--border);
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

    &__cats {
      width: 100%;
      flex-direction: row;
    }

    &__sqbtn {
      flex: 1;
      padding: 10px 4px;
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

@keyframes noya-reef-d-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
