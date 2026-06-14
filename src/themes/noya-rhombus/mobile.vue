<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  LOBBY_CATEGORIES,
  LOBBY_CARDS,
  FIGLAB,
  QUICK_ACTIONS,
  BOTTOM_TABS
} from "./_data";

/**
 * noya-rhombus（諾亞斜切菱形）手機版
 *
 * 移植設計稿 ly4「斜切平行四邊形」版型：
 *   - 左側類別按鈕：transform: skewX(-11deg) 平行四邊形
 *     內層 children skewX(11deg) 文字回正，電競速度感
 *     選中時梅紫漸層白字
 *   - 右側遊戲卡：clip-path 右緣斜切
 *     polygon(0 0, 100% 0, 100% 100%, 26px 100%)
 *   - 整體亮白梅紫底，動感速度感
 *
 * Logo 接線：header logo 走 store（themeStore.currentLogo）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類（預設 live） */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");
</script>

<template>
  <div class="noya-rhombus-m">
    <div class="noya-rhombus-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 -->
      <header class="noya-rhombus-m__header">
        <div class="noya-rhombus-m__brand">
          <img class="noya-rhombus-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-rhombus-m__head-right">
          <span class="noya-rhombus-m__pill noya-rhombus-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-rhombus-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-rhombus-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 真人視訊體驗" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-rhombus-m__notice">
        <Icon
          class="noya-rhombus-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-rhombus-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-rhombus-m__strip">
        <div class="noya-rhombus-m__online">在線人數：<b>3063</b></div>
        <div class="noya-rhombus-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-rhombus-m__qa"
          >
            <span class="noya-rhombus-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-rhombus-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳：平行四邊形按鈕 + 斜切卡片（ly4 版型主視覺） -->
      <div class="noya-rhombus-m__lobby">
        <!-- 左側平行四邊形類別按鈕 -->
        <div class="noya-rhombus-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-rhombus-m__tab"
            :class="{ 'noya-rhombus-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <!-- 內層 wrapper：skewX(11deg) 讓文字回正（移植 ly4 .cat > *）-->
            <span class="noya-rhombus-m__tab-inner">
              <Icon class="noya-rhombus-m__tab-ic" :icon="cat.icon" />
              <span class="noya-rhombus-m__tab-label">{{ cat.label }}</span>
            </span>
          </button>
        </div>

        <!-- 右側 clip-path 斜切遊戲卡（移植 ly4 .g clip-path）-->
        <div class="noya-rhombus-m__cards">
          <article
            v-for="(card, i) in cards"
            :key="i"
            class="noya-rhombus-m__g"
          >
            <!-- 第一層：漸層背景 -->
            <div class="noya-rhombus-m__g-bg"></div>
            <!-- 標籤 -->
            <span v-if="card.tag" class="noya-rhombus-m__g-tag">{{
              card.tag
            }}</span>
            <!-- 第二層：文字 + CTA -->
            <div class="noya-rhombus-m__g-txt">
              <h4>{{ card.name }}</h4>
              <div class="noya-rhombus-m__g-en">{{ card.en }}</div>
              <span class="noya-rhombus-m__g-cta">立即進入 ›</span>
            </div>
            <!-- 第三層：人物圖（真人切片 / .ph 佔位） -->
            <div class="noya-rhombus-m__g-fig">
              <img
                v-if="card.img"
                :src="card.img"
                :alt="card.imgAlt"
                class="noya-rhombus-m__g-fig-img"
              />
              <div v-else class="noya-rhombus-m__ph">
                <span>{{ figLabel }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- 底部 tabbar（5 格，中間「首頁」凸出） -->
    <nav class="noya-rhombus-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-rhombus-m__nav"
        :class="{ 'noya-rhombus-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-rhombus-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-rhombus-m__nav-ic" :icon="t.icon" />
        <span class="noya-rhombus-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
// noya-rhombus 手機版 BEM：noya-rhombus-m__*
// 移植 ly4 斜切平行四邊形版型 CSS，整頁梅紫亮色調
.noya-rhombus-m {
  background: var(--bg-base);
  font-family: var(--font-body);
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

  // Header
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

  // 平行四邊形 pill（nav 用，skew 造型）
  &__pill {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    padding: 9px 18px;
    border-radius: 9px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--glass);
    white-space: nowrap;

    // 微斜切造型（呼應平行四邊形主題）
    transform: skewX(-8deg);
    transition:
      background 0.15s ease,
      box-shadow 0.15s ease;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: transparent;
      box-shadow: 0 4px 14px var(--glow);
      color: #ffffff;
    }
  }

  // Hero
  &__hero {
    position: relative;
    margin: 6px 14px 0;
    border-radius: 14px;
    overflow: hidden;
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);

    // 右下角微斜切呼應卡片造型
    clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // 公告跑馬燈
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 14px 14px 0;
    padding: 11px 16px;
    border-radius: 9px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--color-primary);
    font-size: 20px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13.5px;
      color: var(--text-primary);
      white-space: nowrap;
      will-change: transform;
      animation: noya-rhombus-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // 在線人數 + 快捷
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px 20px 6px;
  }

  &__online {
    font-size: 16px;
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
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--glass-line);
    box-shadow: 0 4px 12px rgba(157, 79, 134, 0.12);
    color: var(--color-primary);
    font-size: 26px;

    // 微斜切呼應主題
    transform: skewX(-8deg);
  }

  &__qa-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // ── 遊戲大廳（ly4 主視覺）──
  &__lobby {
    display: flex;
    gap: 16px;
    padding: 16px 18px 0;
    align-items: flex-start;
  }

  // 左側平行四邊形類別按鈕欄
  &__tabs {
    width: 92px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 2px;
  }

  // 平行四邊形按鈕：transform: skewX(-11deg)（忠實移植 ly4 .cat）
  &__tab {
    // 整個按鈕傾斜成平行四邊形
    transform: skewX(-11deg);
    border-radius: 9px;
    background: #ffffff;
    border: none;
    box-shadow:
      0 5px 12px -6px rgba(120, 60, 110, 0.4),
      inset 0 0 0 1px var(--line);
    cursor: pointer;
    color: var(--mut);
    font-family: inherit;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;
    overflow: visible;

    // 選中狀態：梅紫漸層（移植 ly4 .cat.on）
    &--on {
      background: linear-gradient(120deg, var(--acc), var(--acc2));
      color: #ffffff;
      box-shadow: 0 10px 18px -7px rgba(157, 79, 134, 0.7);

      .noya-rhombus-m__tab-ic {
        color: #ffffff;
      }

      .noya-rhombus-m__tab-label {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  // 內層 wrapper：skewX(11deg) 讓文字/icon 回正（移植 ly4 .cat > *）
  &__tab-inner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 12px;
    transform: skewX(11deg);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 22px;
    flex: none;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 14px;
    font-weight: 500;
  }

  // 右側遊戲卡列（動畫切換）
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    animation: noya-rhombus-cards-in 0.28s ease;
  }

  // 三層合成遊戲卡：右緣斜切（移植 ly4 .g clip-path）
  &__g {
    position: relative;

    // 右緣斜切 polygon（忠實移植 ly4 .g clip-path）
    clip-path: polygon(0 0, 100% 0, 100% 100%, 26px 100%);
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: 0 10px 22px -10px rgba(157, 79, 134, 0.35);
  }

  // 第一層：漸層背景（移植 ly4 .g-bg）
  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;

    // ly4 原稿漸層（白→soft→acc 混色）
    background: linear-gradient(
      110deg,
      #ffffff,
      var(--soft) 60%,
      color-mix(in oklab, var(--acc), #ffffff 55%)
    );
  }

  // 標籤
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

  // 第二層：文字（移植 ly4 .g-txt left: 9%）
  &__g-txt {
    position: absolute;
    left: 9%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 52%;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__g-txt h4 {
    font-size: clamp(15px, 4.6cqw, 23px);
    font-weight: 900;
    color: var(--acc);
    line-height: 1.05;
    white-space: nowrap;
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
    margin-top: 9px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  // 第三層：人物圖區
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

  &__g-fig-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // 佔位卡
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

  // ── 底部 tabbar ──
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

      .noya-rhombus-m__nav-label {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  &__nav-ic {
    font-size: 25px;
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
      0 8px 20px var(--glow),
      inset 0 1px 2px rgba(255, 255, 255, 0.5);
    color: #ffffff;
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}

// 跑馬燈動畫
@keyframes noya-rhombus-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

// 遊戲卡切換動畫
@keyframes noya-rhombus-cards-in {
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
