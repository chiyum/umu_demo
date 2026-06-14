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
 * noya-beacon（諾亞燈塔）手機版
 *
 * 移植設計稿 ly6 窄條側燈導航（手機段）：
 *   左按鈕：極窄圖標條（54px，icon 上小字下）
 *            選中時左緣亮起發光側燈指示（.cat.on::before 漸層發光條）
 *   右遊戲卡：首張卡放大為主打 Banner（aspect-ratio 2.1/1，標題加大）
 *              其餘並排（縱向堆疊）
 *   @container 響應：手機段 54px 窄欄
 *
 * Logo 接線：themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
const figLabel = computed(() => FIGLAB[activeCat.value] ?? "GAME ART");
</script>

<template>
  <div class="noya-beacon-m">
    <div class="noya-beacon-m__app">
      <!-- Header -->
      <header class="noya-beacon-m__header">
        <div class="noya-beacon-m__brand">
          <img class="noya-beacon-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-beacon-m__head-right">
          <span class="noya-beacon-m__pill noya-beacon-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-beacon-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-beacon-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 真人視訊" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-beacon-m__notice">
        <Icon
          class="noya-beacon-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-beacon-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-beacon-m__strip">
        <div class="noya-beacon-m__online">在線人數：<b>3,063</b></div>
        <div class="noya-beacon-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-beacon-m__qa"
          >
            <span class="noya-beacon-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-beacon-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳：窄條側燈 + 首卡放大 -->
      <!-- container-type 對應設計稿 @container 響應 -->
      <div class="noya-beacon-m__lobby">
        <!-- 左側極窄圖標條（54px） -->
        <aside class="noya-beacon-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-beacon-m__cat"
            :class="{ 'noya-beacon-m__cat--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <span class="noya-beacon-m__cat-ic"><Icon :icon="cat.icon" /></span>
            <span class="noya-beacon-m__cat-lb">{{ cat.label }}</span>
          </button>
        </aside>

        <!-- 右側遊戲卡片（首張 Banner 放大） -->
        <main class="noya-beacon-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <div
              class="noya-beacon-m__g"
              :class="{ 'noya-beacon-m__g--banner': i === 0 }"
            >
              <img
                v-if="c.img"
                class="noya-beacon-m__g-img"
                :src="c.img"
                :alt="c.alt"
              />
              <template v-else>
                <div class="noya-beacon-m__g-bg"></div>
                <div class="noya-beacon-m__g-deco">
                  <i></i>
                  <i></i>
                </div>
                <div class="noya-beacon-m__g-fig">
                  <div class="noya-beacon-m__ph">
                    <span>{{ figLabel }}</span>
                  </div>
                </div>
                <div class="noya-beacon-m__g-txt">
                  <h4>{{ c.name }}</h4>
                  <div class="noya-beacon-m__g-en">{{ c.en }}</div>
                  <span class="noya-beacon-m__g-cta">立即進入 ›</span>
                </div>
              </template>
              <span v-if="c.tag" class="noya-beacon-m__g-tag">{{ c.tag }}</span>
            </div>
          </template>
        </main>
      </div>
    </div>

    <!-- 底部 tabbar -->
    <nav class="noya-beacon-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-beacon-m__nav"
        :class="{ 'noya-beacon-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-beacon-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-beacon-m__nav-ic" :icon="t.icon" />
        <span class="noya-beacon-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
// ── ly6 窄條側燈（noya-beacon）手機版 ──
// 手機段：左側 54px 極窄圖標條，首卡 Banner 放大（aspect-ratio 2.1/1）
// 選中 cat::before 漸層發光側燈（對齊設計稿 .cat.on::before）
.noya-beacon-m {
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
    gap: 8px;
  }

  &__pill {
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: transparent;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(90, 111, 157, 0.36);
    }
  }

  // ── Hero ──
  &__hero {
    margin: 6px 14px 0;
    border-radius: 18px;
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

  // ── 公告 ──
  &__notice {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 12px 14px 0;
    padding: 10px 14px;
    border-radius: 12px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--color-secondary);
    font-size: 19px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13px;
      color: var(--ink);
      white-space: nowrap;
      will-change: transform;
      animation: noya-beacon-marquee 18s linear infinite;

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
    color: var(--ink-soft);

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
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--glass-line);
    box-shadow: 0 4px 12px rgba(90, 111, 157, 0.12);
    color: var(--color-primary);
    font-size: 24px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // ── 遊戲大廳 ──
  // 對齊設計稿 .lobby{ padding:14px 12px; gap:11px; }
  &__lobby {
    display: flex;
    gap: 11px;
    padding: 14px 12px 0;
    align-items: flex-start;
  }

  // ── 左側極窄圖標條（54px）──
  // 對齊設計稿：width:54px; gap:6px; padding-top:2px
  &__rail {
    width: 54px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 2px;
  }

  // 側燈按鈕（icon 上 小字 下，position:relative 讓 ::before 能定位）
  // 對齊設計稿：flex-direction:column; gap:3px; padding:10px 0; border-radius:14px
  &__cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 10px 0;
    border-radius: 14px;
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--mut);
    transition:
      background 0.18s ease,
      color 0.18s ease;

    // 選中：淡藍底色
    &--on {
      background: var(--tab-active-bg);
      color: var(--acc);

      // 側燈發光指示條（對齊設計稿 .cat.on::before）
      // left:-3px; top:20%; bottom:20%; width:4px
      // 漸層：linear-gradient(var(--acc2), var(--acc))
      // box-shadow 發光
      &::before {
        content: "";
        position: absolute;
        left: -3px;
        top: 20%;
        bottom: 20%;
        width: 4px;
        border-radius: 4px;
        background: linear-gradient(var(--acc2), var(--acc));
        box-shadow: 0 0 9px color-mix(in oklab, var(--acc2), transparent 30%);
      }
    }
  }

  &__cat-ic {
    font-size: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cat-lb {
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
  }

  // ── 右側遊戲卡片 ──
  // 對齊設計稿 .cards{ gap:11px }
  &__cards {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 11px;
    animation: noya-beacon-cards-in 0.28s ease;
  }

  // 一般卡片外框（對齊設計稿 .g）
  &__g {
    position: relative;
    width: 100%;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    overflow: hidden;
    border-radius: 18px;
    box-shadow: 0 10px 22px -10px rgba(90, 111, 157, 0.26);

    // 首張主打 Banner：放大（對齊設計稿 .g:first-child{ aspect-ratio:2.1/1; min-height:128px }）
    &--banner {
      aspect-ratio: 2.1 / 1;
      min-height: 128px;

      // Banner 標題加大（對齊設計稿 .g:first-child h4{ font-size:clamp(18px,6cqw,26px) }）
      .noya-beacon-m__g-txt {
        h4 {
          font-size: clamp(18px, 6cqw, 26px);
        }
      }
    }
  }

  &__g-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // 背景漸層
  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: radial-gradient(
      120% 140% at 88% 30%,
      var(--soft) 0%,
      color-mix(in oklab, var(--soft), #ffffff 30%) 45%,
      var(--page) 100%
    );
  }

  // 裝飾圓點
  &__g-deco {
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

  // 人物圖區（右側 46%）
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

  // 佔位斜線圖
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

  // 文字層
  &__g-txt {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 56%;

    // stylelint-disable-next-line no-descending-specificity
    h4 {
      font-size: clamp(15px, 4.6cqw, 22px);
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
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
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

      .noya-beacon-m__nav-label {
        color: var(--color-primary);
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
      0 8px 20px rgba(90, 111, 157, 0.46),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
    color: #ffffff;
    font-size: 29px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}

@keyframes noya-beacon-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-beacon-cards-in {
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
