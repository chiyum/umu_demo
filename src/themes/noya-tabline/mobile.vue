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
 * noya-tabline（諾亞極簡側線）手機版
 *
 * 移植設計稿 ly10 手機側：
 * - 左側分類：純文字 + icon，選中以左側 3px 直條指示
 *   (.cat::before 左緣條，選中 height:60%)
 *   + 淡漸層底（linear-gradient(90deg, --soft, transparent)）
 * - 右側遊戲卡：扁平描邊（box-shadow:none; border:1px solid var(--line)）
 * - 三層合成卡結構不變
 *
 * 整頁結構：
 *   header / hero / 公告 / 在線+快捷 / 遊戲大廳（ly10 左側線）/ 底部5格tabbar（中間凸出）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");
</script>

<template>
  <div class="noya-tabline-m">
    <div class="noya-tabline-m__app">
      <!-- Header -->
      <header class="noya-tabline-m__header">
        <div class="noya-tabline-m__brand">
          <img class="noya-tabline-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-tabline-m__head-right">
          <span class="noya-tabline-m__pill noya-tabline-m__pill--solid">
            會員登入
          </span>
          <span class="noya-tabline-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-tabline-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 真人視訊體驗金" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-tabline-m__notice">
        <Icon
          class="noya-tabline-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-tabline-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-tabline-m__strip">
        <div class="noya-tabline-m__online">在線人數：<b>3063</b></div>
        <div class="noya-tabline-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-tabline-m__qa"
          >
            <span class="noya-tabline-m__qa-ico">
              <Icon :icon="qa.icon" />
            </span>
            <span class="noya-tabline-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳（ly10 手機：左側線按鈕 + 右扁平描邊卡） -->
      <div class="noya-tabline-m__lobby">
        <!-- 左側純文字 + 側線指示分類 -->
        <aside class="noya-tabline-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-tabline-m__cat"
            :class="{ 'noya-tabline-m__cat--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-tabline-m__cat-ic" :icon="cat.icon" />
            <span class="noya-tabline-m__cat-lb">{{ cat.label }}</span>
          </button>
        </aside>

        <!-- 右側扁平描邊卡（三層合成） -->
        <main class="noya-tabline-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片卡（live） -->
            <div v-if="c.img" class="noya-tabline-m__g noya-tabline-m__g--img">
              <img :src="c.img" :alt="c.alt ?? c.name" />
              <span v-if="c.tag" class="noya-tabline-m__g-tag">{{
                c.tag
              }}</span>
            </div>
            <!-- 三層合成佔位卡（扁平描邊，無陰影） -->
            <article v-else class="noya-tabline-m__g">
              <div class="noya-tabline-m__g-bg"></div>
              <div class="noya-tabline-m__g-txt">
                <h4>{{ c.name }}</h4>
                <div class="noya-tabline-m__g-en">{{ c.en }}</div>
                <span class="noya-tabline-m__g-cta">立即進入 ›</span>
              </div>
              <div class="noya-tabline-m__g-fig">
                <div class="noya-tabline-m__ph">
                  <span>{{ figLabel }}</span>
                </div>
              </div>
              <span v-if="c.tag" class="noya-tabline-m__g-tag">{{
                c.tag
              }}</span>
            </article>
          </template>
        </main>
      </div>
    </div>

    <!-- 底部 tabbar -->
    <nav class="noya-tabline-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-tabline-m__nav"
        :class="{ 'noya-tabline-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-tabline-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-tabline-m__nav-ic" :icon="t.icon" />
        <span class="noya-tabline-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-tabline-m {
  background: var(--app-bg);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  color: var(--ink);

  &__app {
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    background: var(--app-bg);
    position: relative;
    padding-bottom: 96px;
    overflow: hidden;
  }

  // ── Header ──
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
    height: 38px;
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
    color: var(--color-primary);
    padding: 8px 15px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.7);
    white-space: nowrap;

    &--solid {
      background: var(--gradient-cta);
      border-color: transparent;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(198, 106, 60, 0.35);
    }
  }

  // ── Hero ──
  &__hero {
    margin: 6px 14px 0;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 6px 18px rgba(120, 80, 50, 0.18);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // ── 公告 ──
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 12px 14px 0;
    padding: 10px 14px;
    border-radius: 10px;
    background: var(--notice-bg);
    border: 1px solid var(--notice-line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--color-primary);
    font-size: 18px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13px;
      color: var(--text-primary);
      white-space: nowrap;
      will-change: transform;
      animation: noya-tabline-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // ── 在線 + 快捷 ──
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 18px 18px 6px;
  }

  &__online {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-muted);

    // stylelint-disable-next-line no-descending-specificity
    b {
      color: var(--online-num);
      font-weight: 700;
    }
  }

  &__quick {
    display: flex;
    gap: 14px;
  }

  &__qa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  &__qa-ico {
    width: 44px;
    height: 44px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--qa-ico-line);
    color: var(--color-primary);
    font-size: 20px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
  }

  // ── 遊戲大廳（ly10 手機側線版）──
  &__lobby {
    display: flex;
    gap: 14px;
    padding: 16px 14px 0;
    align-items: flex-start;
  }

  // 左側文字標籤 + 側線導欄
  &__rail {
    width: 78px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  // ly10 側線按鈕：純文字 + icon，選中以 ::before 左緣 3px 直條指示
  &__cat {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 6px 11px 13px;
    border-radius: 0 10px 10px 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: var(--mut);
    transition:
      background 0.18s ease,
      color 0.18s ease;

    // 左側指示線（高度由 0 → 60% 動畫，選中態）
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 0;
      border-radius: 3px;
      background: var(--indicator);
      transition: height 0.18s ease;
    }

    // 選中：淡漸層底 + 側線展開至 60%
    &--on {
      background: var(--cat-on-bg);
      color: var(--acc);

      &::before {
        height: 60%;
      }

      .noya-tabline-m__cat-lb {
        font-weight: 700;
        color: var(--acc);
      }

      .noya-tabline-m__cat-ic {
        color: var(--acc);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 19px;
    flex: none;
    color: var(--mut);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-lb {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  // 右側扁平描邊卡區
  &__cards {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: noya-tabline-cards-in 0.28s ease;
  }

  // ly10 扁平描邊卡（無陰影，只有邊框）
  &__g {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;

    // ly10 核心：扁平描邊，無 box-shadow
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
    border-top: 1px solid var(--tabbar-line);
    backdrop-filter: blur(12px);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: var(--mut);

    &--center {
      margin-top: -22px;

      .noya-tabline-m__nav-label {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  &__nav-ic {
    font-size: 24px;
  }

  &__nav-badge {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tabbar-center-bg);
    border: 3px solid var(--page);
    box-shadow: 0 6px 18px rgba(198, 106, 60, 0.45);
    color: #ffffff;
    font-size: 26px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }
}

@keyframes noya-tabline-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-tabline-cards-in {
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
