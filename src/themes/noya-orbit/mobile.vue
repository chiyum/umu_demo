<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  LOBBY_CATEGORIES,
  LOBBY_CARDS,
  QUICK_ACTIONS,
  BOTTOM_TABS
} from "./_data";

/**
 * noya-orbit（圓形圖標導航）手機版
 *
 * 移植設計稿 ly2：
 *   左側：正圓圖標（52px 圓 + label 在圓下方）
 *   選中：圓環點亮（radial-gradient + 橘框）+ translateY(-2px) 浮起
 *   右側：緊湊雙欄卡（aspect-ratio 1/0.84）
 *   卡片：圖在上 60%（.g-fig 上方）、文字在下（.g-txt 置底）
 *   無 g-cta / g-deco 隱藏（忠實照設計稿 ly2）
 *
 * 整頁結構 = header / hero / 公告跑馬燈 / 在線人數 + 快捷 / 遊戲大廳 / 底部 tabbar
 * BEM prefix：noya-orbit-m__*
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-orbit-m">
    <div class="noya-orbit-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-orbit-m__header">
        <div class="noya-orbit-m__brand">
          <img class="noya-orbit-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-orbit-m__head-right">
          <span class="noya-orbit-m__pill noya-orbit-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-orbit-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-orbit-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-orbit-m__notice">
        <Icon
          class="noya-orbit-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-orbit-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-orbit-m__strip">
        <div class="noya-orbit-m__online">在線人數：<b>3063</b></div>
        <div class="noya-orbit-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-orbit-m__qa"
          >
            <span class="noya-orbit-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-orbit-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳（ly2 版型：左側正圓圖標欄 + 右側緊湊雙欄） -->
      <div class="noya-orbit-m__lobby">
        <!-- 左側：正圓圖標欄（52px 圓 + label 在下） -->
        <aside class="noya-orbit-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-orbit-m__cat"
            :class="{ 'noya-orbit-m__cat--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <span class="noya-orbit-m__cat-circle">
              <Icon :icon="cat.icon" />
            </span>
            <span class="noya-orbit-m__cat-lb">{{ cat.label }}</span>
          </button>
        </aside>

        <!-- 右側：緊湊雙欄卡（圖在上 60%、文字置底、無 g-cta、g-deco 不顯示） -->
        <main class="noya-orbit-m__cards">
          <article v-for="(c, i) in cards" :key="i" class="noya-orbit-m__g">
            <!-- 層 1：背景漸層 -->
            <div class="noya-orbit-m__g-bg"></div>
            <!-- HOT / NEW 角標（ly2 tag 靠左，設計稿 .g-tag{left:9px;right:auto}） -->
            <span v-if="c.tag" class="noya-orbit-m__g-tag">{{ c.tag }}</span>
            <!-- 層 3：人物圖層（上方 60%，g-fig） -->
            <div class="noya-orbit-m__g-fig">
              <img
                v-if="c.figSrc"
                :src="c.figSrc"
                :alt="c.name"
                class="noya-orbit-m__g-fig-img"
              />
              <div v-else class="noya-orbit-m__ph">
                <span>{{ c.figLabel }}</span>
              </div>
            </div>
            <!-- 層 2：文字區（置底） -->
            <div class="noya-orbit-m__g-txt">
              <h4>{{ c.name }}</h4>
              <div class="noya-orbit-m__g-en">{{ c.en }}</div>
              <!-- ly2 無 g-cta，刻意省略 -->
            </div>
          </article>
        </main>
      </div>
    </div>

    <!-- 底部 tabbar（5 格，中間「首頁」凸出球） -->
    <nav class="noya-orbit-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-orbit-m__nav"
        :class="{ 'noya-orbit-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-orbit-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-orbit-m__nav-ic" :icon="t.icon" />
        <span class="noya-orbit-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
// noya-orbit 手機版（ly2：正圓圖標欄 + 緊湊雙欄卡）
.noya-orbit-m {
  background: var(--bg-base);
  font-family: var(--font-body);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  -webkit-font-smoothing: antialiased;

  &__app {
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    background: var(--app-bg);
    position: relative;
    padding-bottom: 96px;
    overflow: hidden;
  }

  // ── Header ──────────────────────────────────────────────────
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 16px 10px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__logo {
    height: 40px;
    width: auto;
    object-fit: contain;
  }

  &__head-right {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  &__pill {
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--glass-line);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(232, 160, 120, 0.7);
      box-shadow: 0 4px 14px rgba(198, 106, 60, 0.4);
      color: #ffffff;
    }
  }

  // ── Hero ──────────────────────────────────────────────────
  &__hero {
    margin: 6px 14px 0;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // ── 公告跑馬燈 ──────────────────────────────────────────────
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 14px 14px 0;
    padding: 11px 16px;
    border-radius: 14px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--acc);
    font-size: 20px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13px;
      color: var(--ink-soft);
      white-space: nowrap;
      will-change: transform;
      animation: noya-orbit-marquee 18s linear infinite;

      b {
        color: var(--acc);
        font-weight: 700;
      }
    }
  }

  // ── 在線人數 + 快捷 ──────────────────────────────────────────
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px 20px 6px;
  }

  &__online {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);

    // stylelint-disable-next-line no-descending-specificity
    b {
      color: var(--online-num);
      font-weight: 700;
    }
  }

  &__quick {
    display: flex;
    gap: 16px;
  }

  &__qa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
  }

  &__qa-ico {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--glass-line);
    box-shadow:
      0 6px 16px rgba(120, 80, 40, 0.25),
      inset 0 1px 1px rgba(255, 255, 255, 0.7);
    color: var(--acc);
    font-size: 24px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // ── 遊戲大廳（ly2 版型） ──────────────────────────────────────
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 16px 14px 0;
    align-items: flex-start;
  }

  // 左側：72px 正圓圖標欄（對齊設計稿 ly2 .rail width:72px）
  &__rail {
    width: 72px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 4px;
  }

  // 正圓按鈕容器（flex-direction:column，圓在上 label 在下）
  &__cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.18s ease;

    // 選中：圓環點亮 + 浮起（設計稿 .cat.on .ic + .cat.on .lb font-weight:700）
    &--on {
      .noya-orbit-m__cat-circle {
        background: var(--orbit-on-bg);
        box-shadow: var(--orbit-on-shadow);
        transform: translateY(-2px);
      }

      .noya-orbit-m__cat-lb {
        font-weight: 700;
        color: var(--acc);
      }
    }
  }

  // 正圓圖標（52px 圓，白底 + 細邊 + 陰影）
  // stylelint-disable-next-line no-descending-specificity
  &__cat-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #ffffff;
    box-shadow: var(--orbit-off-shadow);
    color: var(--mut);
    font-size: 24px;
    transition: all 0.18s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-lb {
    font-size: 12px;
    font-weight: 500;
    color: var(--mut);
    white-space: nowrap;
  }

  // 右側：緊湊雙欄卡（設計稿 .cards grid-template-columns:1fr 1fr）
  &__cards {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    animation: noya-orbit-cards-in 0.28s ease;
  }

  // 遊戲卡（ly2 比例 1/0.84，圖在上 60%、文字在下）
  &__g {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 1 / 0.84;
    min-height: 118px;
    display: block;
    isolation: isolate;
    box-shadow: 0 10px 22px -10px rgba(120, 80, 50, 0.3);
  }

  // 層 1：背景漸層
  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  // HOT / NEW 角標（ly2 靠左，設計稿 .g-tag{left:9px;right:auto}）
  &__g-tag {
    position: absolute;
    left: 9px;
    right: auto;
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

  // 層 3：人物圖層（上方 60%，ly2 特徵）
  &__g-fig {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 60%;
    z-index: 2;

    // 從下往上淡出遮罩（讓文字疊在圖上可讀）
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: var(--fig-fade);
    }
  }

  // 真實人物切片圖
  &__g-fig-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // CSS 斜紋佔位（設計稿 ly2 .ph 略改斜角）
  &__ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: repeating-linear-gradient(
      125deg,
      color-mix(in oklab, var(--acc), transparent 80%) 0 7px,
      color-mix(in oklab, var(--acc), transparent 92%) 7px 14px
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

  // 層 2：文字區（置底，ly2 .g-txt{top:auto;bottom:10px;left:12px;transform:none}）
  &__g-txt {
    position: absolute;
    top: auto;
    bottom: 10px;
    left: 12px;
    transform: none;
    z-index: 3;
    max-width: 90%;

    h4 {
      font-size: clamp(14px, 5cqw, 18px);
      font-weight: 900;
      color: var(--acc);
      line-height: 1.1;
      white-space: nowrap;
    }
  }

  &__g-en {
    font-family: ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    color: var(--mut);
    margin-top: 2px;
    text-transform: uppercase;
  }

  // ── 底部 tabbar ──────────────────────────────────────────────
  &__tabbar {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 100%;
    max-width: 480px;
    z-index: 20;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 10px 8px 14px;
    background: var(--tabbar-bg);
    border-top: 1px solid var(--glass-line);
    backdrop-filter: blur(10px);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: var(--ink-mute);

    &--center {
      margin-top: -22px;

      .noya-orbit-m__nav-label {
        color: var(--acc);
        font-weight: 700;
      }
    }
  }

  &__nav-ic {
    font-size: 24px;
  }

  &__nav-badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tabbar-center-bg);
    border: 3px solid var(--bg-base);
    box-shadow:
      0 8px 20px rgba(198, 106, 60, 0.5),
      inset 0 1px 2px rgba(255, 255, 255, 0.5);
    color: #ffffff;
    font-size: 28px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}

@keyframes noya-orbit-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-orbit-cards-in {
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
