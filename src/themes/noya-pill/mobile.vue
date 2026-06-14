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
 * noya-pill（經典直欄膠囊）手機版
 *
 * 移植設計稿 ly1 手機端：
 *   左側 84px 直欄膠囊（icon 上 + label 下，flex-direction:column）
 *   右側遊戲卡縱向堆疊（橫幅卡 aspect-ratio 2.6/1）
 *   選中態：白底 + 軟漸層 + 橘色投影
 *
 * 整頁結構 = header / hero / 公告跑馬燈 / 在線人數 + 快捷 / 遊戲大廳 / 底部 5 格 tabbar
 * BEM prefix：noya-pill-m__*
 * Logo 走 themeStore.currentLogo，不寫死。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-pill-m">
    <div class="noya-pill-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-pill-m__header">
        <div class="noya-pill-m__brand">
          <img class="noya-pill-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-pill-m__head-right">
          <span class="noya-pill-m__pill noya-pill-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-pill-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-pill-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-pill-m__notice">
        <Icon
          class="noya-pill-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-pill-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-pill-m__strip">
        <div class="noya-pill-m__online">在線人數：<b>3063</b></div>
        <div class="noya-pill-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-pill-m__qa"
          >
            <span class="noya-pill-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-pill-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳（ly1 版型：左側 84px 直欄膠囊 + 右側縱向橫幅卡） -->
      <div class="noya-pill-m__lobby">
        <!-- 左側：84px 直欄膠囊按鈕（icon 上 label 下） -->
        <aside class="noya-pill-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-pill-m__cat"
            :class="{ 'noya-pill-m__cat--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-pill-m__cat-ic" :icon="cat.icon" />
            <span class="noya-pill-m__cat-lb">{{ cat.label }}</span>
          </button>
        </aside>

        <!-- 右側：遊戲卡縱向堆疊（三層合成） -->
        <main class="noya-pill-m__cards">
          <article v-for="(c, i) in cards" :key="i" class="noya-pill-m__g">
            <!-- 層 1：背景漸層 -->
            <div class="noya-pill-m__g-bg"></div>
            <!-- 裝飾圓泡（忠實照設計稿 g-deco） -->
            <div class="noya-pill-m__g-deco">
              <i></i>
              <i></i>
            </div>
            <!-- HOT / NEW 角標 -->
            <span v-if="c.tag" class="noya-pill-m__g-tag">{{ c.tag }}</span>
            <!-- 層 2：文字區（左側 6.5% 垂直置中） -->
            <div class="noya-pill-m__g-txt">
              <h4>{{ c.name }}</h4>
              <div class="noya-pill-m__g-en">{{ c.en }}</div>
              <span class="noya-pill-m__g-cta">立即進入 ›</span>
            </div>
            <!-- 層 3：人物圖層（live 用真實切片；其他用 CSS 斜紋佔位） -->
            <div class="noya-pill-m__g-fig">
              <img
                v-if="c.figSrc"
                :src="c.figSrc"
                :alt="c.name"
                class="noya-pill-m__g-fig-img"
              />
              <div v-else class="noya-pill-m__ph">
                <span>{{ c.figLabel }}</span>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>

    <!-- 底部 tabbar（5 格，中間「首頁」凸出球） -->
    <nav class="noya-pill-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-pill-m__nav"
        :class="{ 'noya-pill-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-pill-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-pill-m__nav-ic" :icon="t.icon" />
        <span class="noya-pill-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
// noya-pill 手機版（ly1 直欄膠囊，手機態：84px 直欄、icon 上 label 下）
.noya-pill-m {
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

    // 登入按鈕實色
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
      animation: noya-pill-marquee 18s linear infinite;

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

  // ── 遊戲大廳（ly1 版型） ──────────────────────────────────────
  &__lobby {
    display: flex;
    gap: 14px;
    padding: 16px 14px 0;
    align-items: flex-start;
  }

  // 左側 84px 直欄（手機版：icon 上 label 下）
  &__rail {
    width: 84px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  // 膠囊按鈕（手機版：flex-direction:column，icon 上 label 下）
  &__cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 11px 4px;
    border-radius: 18px;
    cursor: pointer;
    color: var(--mut);
    border: 0;
    background: transparent;
    font-family: inherit;
    text-align: center;
    transition: all 0.18s ease;

    // 選中態：白底 + 米色漸層 + 橘色投影（忠實照設計稿 .cat.on）
    &--on {
      color: var(--acc);
      background: var(--tab-active-bg);
      box-shadow: var(--tab-active-shadow);
    }
  }

  &__cat-ic {
    font-size: 24px;
    flex: none;
  }

  &__cat-lb {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }

  // 右側卡片（縱向堆疊，三層合成）
  &__cards {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: noya-pill-cards-in 0.28s ease;
  }

  // 遊戲卡容器（aspect-ratio 2.6/1，忠實照設計稿 .g）
  &__g {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: 0 10px 22px -10px rgba(120, 80, 50, 0.35);
  }

  // 層 1：背景漸層（對齊設計稿 .g-bg radial）
  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  // 裝飾圓泡（設計稿 .g-deco）
  &__g-deco {
    i {
      position: absolute;
      z-index: 1;
      border-radius: 50%;
      background: color-mix(in oklab, var(--acc), #ffffff 55%);
      opacity: 0.5;

      &:nth-child(1) {
        width: 30px;
        height: 30px;
        right: 32%;
        top: 14%;
      }

      &:nth-child(2) {
        width: 14px;
        height: 14px;
        right: 50%;
        bottom: 18%;
        opacity: 0.35;
      }
    }
  }

  // HOT / NEW 角標（設計稿 .g-tag）
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

  // 層 2：文字區（設計稿 .g-txt，左側 6.5% 垂直置中）
  &__g-txt {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 56%;

    h4 {
      font-size: clamp(15px, 4.6cqw, 23px);
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

  // 立即進入按鈕（設計稿 .g-cta）
  &__g-cta {
    display: inline-block;
    margin-top: 9px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  // 層 3：人物圖層（設計稿 .g-fig，右側 46%）
  &__g-fig {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 46%;
    z-index: 2;

    // 左側淡出遮罩（讓圖與背景自然融合）
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(90deg, var(--soft) 0%, transparent 44%);
    }
  }

  // 真實人物切片圖
  &__g-fig-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // CSS 斜紋佔位（設計稿 .ph，非 live 分類）
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

      .noya-pill-m__nav-label {
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

@keyframes noya-pill-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-pill-cards-in {
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
