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
  FOOTER_PROVIDERS,
  POPULAR_RANK
} from "./_data";

/**
 * noya-mint（薄荷清新）桌面版
 *
 * 設計主軸：純白底 + 極簡 sidebar tab + 扁平白卡 + 人氣榜 section
 *
 * 遊戲大廳 section 採用「左 sidebar 分類 + 右卡片內容」佈局：
 *   - 左 sidebar：極簡文字+icon tab，active 用左緣 4px 薄荷直條 indicator
 *   - 右卡片：扁平白卡（細邊框 + 極淡陰影）
 *
 * 額外 section：人氣榜（排名 / 遊戲 / 熱度條 / 進入按鈕）
 *
 * Logo 接線：header 顯示 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);

/** 熱門遊戲混排 */
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
  <div class="noya-mint-d">
    <!-- ===== TOP NAV ===== -->
    <header class="noya-mint-d__nav">
      <div class="noya-mint-d__nav-inner">
        <a class="noya-mint-d__logo-wrap" href="#" @click.prevent>
          <span class="noya-mint-d__logo-mark">
            <Icon icon="material-symbols:eco-outline" />
          </span>
          <img :src="logoSrc" :alt="logoLabel" class="noya-mint-d__logo" />
        </a>
        <nav class="noya-mint-d__menu">
          <a
            v-for="item in DESKTOP_NAV"
            :key="item.key"
            href="#"
            class="noya-mint-d__link"
            @click.prevent
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="noya-mint-d__nav-cta">
          <span class="noya-mint-d__btn noya-mint-d__btn--ghost">會員登入</span>
          <span class="noya-mint-d__btn noya-mint-d__btn--solid">免費註冊</span>
        </div>
      </div>
    </header>

    <main class="noya-mint-d__main">
      <!-- ===== HERO + 公告 + 在線人數 ===== -->
      <section class="noya-mint-d__hero">
        <div class="noya-mint-d__hero-banner">
          <img :src="heroSrc" alt="首存 1000 送 1000" />
        </div>
        <aside class="noya-mint-d__hero-side">
          <div class="noya-mint-d__notice">
            <Icon icon="material-symbols:campaign-outline" />
            <p>
              <b>【系統公告】</b>自 5/1 起，ATM 存款最低金額將調整為 300 元。
            </p>
          </div>
          <div class="noya-mint-d__online">
            <Icon icon="material-symbols:group-outline" />
            <span>在線人數 <b>3,063</b></span>
          </div>
        </aside>
      </section>

      <!-- ===== 遊戲大廳：左 sidebar + 右卡片 ===== -->
      <section class="noya-mint-d__section">
        <div class="noya-mint-d__sec-head">
          <span class="noya-mint-d__sec-zh">遊戲大廳</span>
          <span class="noya-mint-d__sec-en">GAME LOBBY</span>
        </div>
        <!-- 左 sidebar 分類 + 右卡片並排 -->
        <div class="noya-mint-d__lobby">
          <!-- 左 sidebar：極簡文字 tab -->
          <aside class="noya-mint-d__sidebar">
            <button
              v-for="cat in LOBBY_CATEGORIES"
              :key="cat.key"
              type="button"
              class="noya-mint-d__cat-tab"
              :class="{ 'noya-mint-d__cat-tab--on': activeCat === cat.key }"
              @click="activeCat = cat.key"
            >
              <Icon class="noya-mint-d__cat-ic" :icon="cat.icon" />
              <span class="noya-mint-d__cat-label">{{ cat.label }}</span>
            </button>
          </aside>
          <!-- 右側扁平白卡區 -->
          <div class="noya-mint-d__cards">
            <template v-for="(c, i) in cards" :key="i">
              <img
                v-if="c.img"
                class="noya-mint-d__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <div v-else class="noya-mint-d__gcard">
                <div class="noya-mint-d__gcard-wm">{{ c.wm }}</div>
                <div class="noya-mint-d__gcard-label">
                  <div class="noya-mint-d__gcard-big">{{ c.big }}</div>
                  <div class="noya-mint-d__gcard-sub">{{ c.sub }}</div>
                </div>
                <span class="noya-mint-d__gcard-arrow">
                  <Icon icon="material-symbols:arrow-forward" />
                </span>
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- ===== 人氣榜（noya-mint 獨有）===== -->
      <section class="noya-mint-d__section noya-mint-d__section--soft">
        <div class="noya-mint-d__sec-head">
          <span class="noya-mint-d__sec-zh">人氣榜</span>
          <span class="noya-mint-d__sec-en">POPULAR RANK</span>
        </div>
        <table class="noya-mint-d__rank-table">
          <thead>
            <tr>
              <th>排名</th>
              <th>遊戲名稱</th>
              <th>類別</th>
              <th>廠商</th>
              <th>熱度</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in POPULAR_RANK"
              :key="item.rank"
              class="noya-mint-d__rank-row"
            >
              <td>
                <span
                  class="noya-mint-d__rank-num"
                  :class="{ 'noya-mint-d__rank-num--top': item.rank <= 3 }"
                >
                  {{ item.rank }}
                </span>
              </td>
              <td class="noya-mint-d__rank-name">{{ item.name }}</td>
              <td>
                <span class="noya-mint-d__rank-tag">{{ item.category }}</span>
              </td>
              <td class="noya-mint-d__rank-provider">{{ item.provider }}</td>
              <td>
                <div class="noya-mint-d__heat-wrap">
                  <div class="noya-mint-d__heat-bar">
                    <div
                      class="noya-mint-d__heat-fill"
                      :style="{ width: `${item.heat}%` }"
                    ></div>
                  </div>
                  <span class="noya-mint-d__heat-num">{{ item.heat }}</span>
                </div>
              </td>
              <td>
                <span class="noya-mint-d__rank-btn">進入遊戲</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- ===== 熱門遊戲 ===== -->
      <section class="noya-mint-d__section">
        <div class="noya-mint-d__sec-head">
          <span class="noya-mint-d__sec-zh">熱門遊戲</span>
          <span class="noya-mint-d__sec-en">POPULAR</span>
        </div>
        <div class="noya-mint-d__pop-grid">
          <template v-for="(c, i) in popularCards" :key="i">
            <div v-if="c.img" class="noya-mint-d__pop-card">
              <img :src="c.img" :alt="c.alt" />
            </div>
            <div v-else class="noya-mint-d__gcard noya-mint-d__gcard--pop">
              <div class="noya-mint-d__gcard-wm">{{ c.wm }}</div>
              <div class="noya-mint-d__gcard-label">
                <div class="noya-mint-d__gcard-big">{{ c.big }}</div>
                <div class="noya-mint-d__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- ===== 下載 ===== -->
      <section
        class="noya-mint-d__download noya-mint-d__section noya-mint-d__section--soft"
      >
        <div class="noya-mint-d__dl-left">
          <img :src="heroSrc" alt="App 下載" />
        </div>
        <div class="noya-mint-d__dl-right">
          <div class="noya-mint-d__dl-title">清新體驗 · 隨時隨地</div>
          <p class="noya-mint-d__dl-desc">
            薄荷娛樂支持所有行動裝置，下載 App
            即可隨時暢玩真人、體育、棋牌、電子與捕魚。
          </p>
          <span class="noya-mint-d__dl-cta">立即下載</span>
        </div>
      </section>

      <!-- ===== 服務 ===== -->
      <section class="noya-mint-d__section">
        <div class="noya-mint-d__sec-head">
          <span class="noya-mint-d__sec-zh">頂尖服務</span>
          <span class="noya-mint-d__sec-en">SERVICES</span>
        </div>
        <div class="noya-mint-d__svc-grid">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="noya-mint-d__svc-card"
          >
            <div class="noya-mint-d__svc-ic"><Icon :icon="svc.icon" /></div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="noya-mint-d__footer">
      <div class="noya-mint-d__footer-grid">
        <span v-for="p in FOOTER_PROVIDERS" :key="p">{{ p }}</span>
      </div>
      <div class="noya-mint-d__footer-links">
        <a href="#" @click.prevent>免責聲明</a>
        <a href="#" @click.prevent>服務條款</a>
        <a href="#" @click.prevent>責任博彩</a>
      </div>
      <div class="noya-mint-d__footer-copy">© 2025 薄荷娛樂 版權所有</div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.noya-mint-d {
  background: var(--bg-base);
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

    // 亮色版 nav 用極淡陰影
    box-shadow: 0 2px 12px rgba(36, 100, 76, 0.06);
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

  &__logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    text-decoration: none;
  }

  &__logo-mark {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: var(--brand-mark-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 18px;
  }

  &__logo {
    height: 36px;
    width: auto;
    object-fit: contain;
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  &__link {
    padding: 9px 16px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);
    border-radius: 8px;
    transition:
      background 0.12s,
      color 0.12s;

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
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &--ghost {
      border: 1px solid var(--border);
      color: var(--color-primary);
      background: var(--bg-surface);
    }

    &--solid {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      box-shadow: 0 2px 10px rgba(47, 185, 138, 0.25);
    }
  }

  // ===== HERO =====
  &__hero {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 24px 0;
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 20px;
    align-items: stretch;
  }

  &__hero-banner {
    border-radius: 16px;
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
    border: 1px solid var(--border);
    color: var(--color-primary);
    font-size: 20px;

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
    border-radius: 14px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    font-size: 16px;
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
    padding: 44px 24px;

    &--soft {
      max-width: none;
      background: var(--section-soft);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);

      > .noya-mint-d__sec-head,
      > .noya-mint-d__rank-table,
      > .noya-mint-d__svc-grid {
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
    font-size: clamp(22px, 2.8vw, 32px);
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--color-primary);
  }

  &__sec-en {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    letter-spacing: 6px;
    color: var(--ink-mute);
  }

  // ===== 遊戲大廳 sidebar + 卡片佈局 =====
  &__lobby {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  // 左 sidebar 極簡分類
  &__sidebar {
    width: 150px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-right: 1px solid var(--border);
    padding-right: 0;
  }

  // 極簡 tab 按鈕（active 用左緣 4px indicator + 粗體）
  &__cat-tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border-radius: 0; // 平整無圓角讓 sidebar 更俐落
    cursor: pointer;
    background: transparent;
    border: none;
    color: var(--ink-mute);
    font-size: 15px;
    font-weight: 500;
    text-align: left;
    transition:
      color 0.15s ease,
      background 0.15s ease;

    // active：左緣 4px 薄荷直條 indicator
    &--on {
      background: var(--tab-active-bg);
      color: var(--color-primary);
      font-weight: 700;

      // 左側 indicator 直條
      border-left: 4px solid var(--color-primary);
      padding-left: 14px; // 補回 4px 讓內容不移位

      .noya-mint-d__cat-ic {
        color: var(--color-primary);
      }

      .noya-mint-d__cat-label {
        color: var(--color-primary);
      }
    }

    // 若非 active，左側補個透明邊讓 layout 穩定
    &:not(&--on) {
      border-left: 4px solid transparent;
      padding-left: 14px;
    }

    &:hover:not(&--on) {
      background: var(--bg-overlay);
      color: var(--color-secondary);
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 20px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.15s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-label {
    font-size: 15px;
    transition:
      color 0.15s,
      font-weight 0.1s;
  }

  // 右側卡片
  &__cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    animation: noya-mint-d-cards-in 0.25s ease;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
  }

  // 扁平白卡
  &__gcard {
    position: relative;
    aspect-ratio: 760 / 232;
    border-radius: 12px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1px solid var(--border);
    border-left: 3px solid var(--color-primary);
    box-shadow: var(--shadow);

    &--pop {
      aspect-ratio: 4 / 3;
      border-left: 1px solid var(--border);
    }
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 44px;
    font-weight: 900;
    font-style: italic;
    color: rgba(47, 185, 138, 0.07);
    pointer-events: none;
  }

  &__gcard-label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__gcard-big {
    font-size: 24px;
    font-weight: 800;
    color: var(--text-primary);
    white-space: nowrap;
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 500;
    font-size: 10px;
    color: var(--ink-mute);
    letter-spacing: 0.12em;
    margin: 6px 0 0 2px;
  }

  &__gcard-arrow {
    position: absolute;
    bottom: 12px;
    right: 14px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 16px;
    z-index: 3;
    opacity: 0.85;
  }

  // ===== 人氣榜表格 =====
  // stylelint-disable-next-line no-descending-specificity
  &__rank-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--bg-surface);
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);

    th {
      padding: 12px 20px;
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-mute);
      text-align: left;
      letter-spacing: 0.05em;
      background: var(--bg-base);
      border-bottom: 1px solid var(--border);
    }
  }

  &__rank-row {
    border-top: 1px solid rgba(47, 185, 138, 0.06);
    transition: background 0.12s;

    &:hover {
      background: var(--bg-overlay);
    }

    td {
      padding: 14px 20px;
      vertical-align: middle;
      font-size: 14px;
      color: var(--text-primary);
    }
  }

  &__rank-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    background: rgba(47, 185, 138, 0.08);
    color: var(--ink-mute);

    &--top {
      background: var(--color-primary);
      color: #ffffff;
    }
  }

  &__rank-name {
    font-weight: 600;
    color: var(--text-primary);
  }

  &__rank-tag {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    background: var(--bg-overlay);
    color: var(--color-primary);
    border: 1px solid var(--border);
  }

  &__rank-provider {
    color: var(--ink-mute);
    font-size: 13px;
  }

  &__heat-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__heat-bar {
    width: 100px;
    height: 6px;
    background: rgba(47, 185, 138, 0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  &__heat-fill {
    height: 100%;
    background: var(--gradient-cta);
    border-radius: 999px;
  }

  &__heat-num {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary);
    min-width: 26px;
  }

  &__rank-btn {
    display: inline-block;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-on-primary);
    background: var(--gradient-cta);
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(47, 185, 138, 0.2);
  }

  // ===== POPULAR GRID =====
  // stylelint-disable-next-line no-descending-specificity
  &__pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__pop-card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition:
      transform 0.15s,
      box-shadow 0.15s;

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(47, 185, 138, 0.12);
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
    border-radius: 16px;
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
    font-size: clamp(26px, 3.2vw, 40px);
    font-weight: 900;
    color: var(--color-primary);
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
    border-radius: 8px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(47, 185, 138, 0.3);
  }

  // ===== SERVICES =====
  // stylelint-disable-next-line no-descending-specificity
  &__svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  &__svc-card {
    padding: 32px 24px;
    border-radius: 16px;
    text-align: center;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition:
      transform 0.15s,
      box-shadow 0.15s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(47, 185, 138, 0.12);
    }

    h3 {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 14px 0 10px;
    }

    p {
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  &__svc-ic {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 34px;
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
      font-size: 12px;
      font-weight: 500;
      color: var(--ink-mute);
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--bg-surface);
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
      border-right: none;
      border-bottom: 1px solid var(--border);
    }

    &__cat-tab {
      border-left: none;
      border-bottom: 3px solid transparent;
      padding-left: 14px;

      &--on {
        border-left: none;
        border-bottom: 3px solid var(--color-primary);
      }

      &:not(&--on) {
        border-left: none;
        border-bottom: 3px solid transparent;
      }
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

    &__rank-table {
      font-size: 13px;

      td,
      th {
        padding: 10px 12px;
      }
    }
  }
}

@keyframes noya-mint-d-cards-in {
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
