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
 * noya-squircle（諾亞 Squircle 漸層磚）手機版
 *
 * 移植設計稿 ly9：
 * - 左側分類：大圓角 squircle 方磚（70×70、border-radius:27px）
 *   常駐柔和漸層底，選中時加深米橘漸層並發光
 * - 右側遊戲卡：border-radius:20px
 *   頂部加一道玻璃高光（::before 線性漸層）
 * - 三層合成卡（g-bg + g-txt + g-fig + g-tag）
 *
 * 整頁結構：
 *   header / hero / 公告 / 在線+快捷 / 遊戲大廳（ly9） / 底部5格tabbar（中間凸出）
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
  <div class="noya-squircle-m">
    <div class="noya-squircle-m__app">
      <!-- Header：logo + 登入/註冊 pill -->
      <header class="noya-squircle-m__header">
        <div class="noya-squircle-m__brand">
          <img class="noya-squircle-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-squircle-m__head-right">
          <span class="noya-squircle-m__pill noya-squircle-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-squircle-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-squircle-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 真人視訊體驗金" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-squircle-m__notice">
        <Icon
          class="noya-squircle-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-squircle-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-squircle-m__strip">
        <div class="noya-squircle-m__online">在線人數：<b>3063</b></div>
        <div class="noya-squircle-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-squircle-m__qa"
          >
            <span class="noya-squircle-m__qa-ico">
              <Icon :icon="qa.icon" />
            </span>
            <span class="noya-squircle-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳（ly9：左 Squircle 方磚 + 右玻璃高光卡） -->
      <div class="noya-squircle-m__lobby">
        <!-- 左側 squircle 分類按鈕群 -->
        <aside class="noya-squircle-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-squircle-m__cat"
            :class="{ 'noya-squircle-m__cat--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-squircle-m__cat-ic" :icon="cat.icon" />
            <span class="noya-squircle-m__cat-lb">{{ cat.label }}</span>
          </button>
        </aside>

        <!-- 右側遊戲卡（三層合成，頂部玻璃高光） -->
        <main class="noya-squircle-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片卡（live 分類） -->
            <div
              v-if="c.img"
              class="noya-squircle-m__g noya-squircle-m__g--img"
            >
              <img :src="c.img" :alt="c.alt ?? c.name" />
              <span v-if="c.tag" class="noya-squircle-m__g-tag">{{
                c.tag
              }}</span>
            </div>
            <!-- 三層合成佔位卡 -->
            <article v-else class="noya-squircle-m__g">
              <!-- 層 1：背景漸層 -->
              <div class="noya-squircle-m__g-bg"></div>
              <!-- 層 2：文字資訊 -->
              <div class="noya-squircle-m__g-txt">
                <h4>{{ c.name }}</h4>
                <div class="noya-squircle-m__g-en">{{ c.en }}</div>
                <span class="noya-squircle-m__g-cta">立即進入 ›</span>
              </div>
              <!-- 層 3：人物圖（佔位條紋） -->
              <div class="noya-squircle-m__g-fig">
                <div class="noya-squircle-m__ph">
                  <span>{{ figLabel }}</span>
                </div>
              </div>
              <!-- tag 標籤 -->
              <span v-if="c.tag" class="noya-squircle-m__g-tag">{{
                c.tag
              }}</span>
            </article>
          </template>
        </main>
      </div>
    </div>

    <!-- 底部 tabbar（5 格，中間首頁凸出） -->
    <nav class="noya-squircle-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-squircle-m__nav"
        :class="{ 'noya-squircle-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-squircle-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-squircle-m__nav-ic" :icon="t.icon" />
        <span class="noya-squircle-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-squircle-m {
  // 米色頁面底（app-bg 漸層）
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
      box-shadow: 0 4px 14px rgba(198, 106, 60, 0.4);
    }
  }

  // ── Hero ──
  &__hero {
    margin: 6px 14px 0;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // ── 公告跑馬燈 ──
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 12px 14px 0;
    padding: 10px 14px;
    border-radius: 12px;
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
      animation: noya-squircle-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // ── 在線人數 + 快捷 ──
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
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--qa-ico-line);
    box-shadow: 0 4px 10px rgba(160, 110, 70, 0.2);
    color: var(--color-primary);
    font-size: 22px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
  }

  // ── 遊戲大廳（ly9 核心）──
  &__lobby {
    display: flex;
    gap: 13px;
    padding: 14px 14px 0;
    align-items: flex-start;
  }

  // 左側 squircle 方磚群
  &__rail {
    width: 82px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  // 每個 squircle 按鈕：70×70、border-radius:27px、icon 上 label 下
  &__cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 70px;
    height: 70px;
    padding: 0;
    border-radius: 27px; // ly9 核心：squircle 超橢圓圓角
    background: var(--cat-bg); // 常駐柔和漸層
    box-shadow: var(--cat-shadow);
    border: 0;
    cursor: pointer;
    color: var(--mut);
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      color 0.18s ease;

    // 選中：加深米橘漸層 + 發光陰影
    &--on {
      background: var(--cat-on-bg);
      box-shadow: var(--cat-on-shadow);
      color: #ffffff;

      .noya-squircle-m__cat-ic {
        color: #ffffff;
      }

      .noya-squircle-m__cat-lb {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    font-size: 24px;
    flex: none;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-lb {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  // 右側遊戲卡區
  &__cards {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: noya-squircle-cards-in 0.28s ease;
  }

  // 遊戲卡（三層合成）：border-radius:20px + 玻璃高光 ::before
  &__g {
    position: relative;
    border-radius: 20px; // ly9 核心
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: var(--shadow);

    // 玻璃高光：頂部白光漸層（ly9 核心特徵）
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 46%;
      z-index: 5;
      pointer-events: none;
      background: var(
        --glass-highlight
      ); // linear-gradient(180deg, rgba(255,255,255,.42), transparent)

      border-radius: 20px 20px 40% 40%;
    }

    // 真實切片卡（live 用圖）
    &--img {
      aspect-ratio: auto;
      min-height: 0;

      img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 0; // 由 overflow:hidden 裁切
      }
    }
  }

  // 層 1：背景漸層（g-bg）
  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  // 層 2：文字資訊（g-txt）
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

  // 層 3：人物圖（g-fig，右半 + 漸層遮罩）
  &__g-fig {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 46%;
    z-index: 2;

    // 左側漸層遮罩（讓人物與背景融合）
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(90deg, var(--soft) 0%, transparent 44%);
    }
  }

  // 佔位條紋（無真實圖時顯示）
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

  // tag 標籤（右上角）
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

      .noya-squircle-m__nav-label {
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
    border: 3px solid var(--page);
    box-shadow: 0 8px 20px rgba(198, 106, 60, 0.5);
    color: #ffffff;
    font-size: 28px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }
}

// 跑馬燈動畫
@keyframes noya-squircle-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

// 切換分類時卡片入場動畫
@keyframes noya-squircle-cards-in {
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
