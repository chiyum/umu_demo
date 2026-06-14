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
 * noya-aurora（極光霓虹）手機版
 *
 * 設計重點：
 *   左側分類欄採「icon-only 窄 rail（64px）」，
 *   active 分類「展開變寬」露出 label + 霓虹發光膠囊（transition width + glow 動畫）；
 *   右側卡片採 2 欄格，卡片邊框為「流動霓虹漸層描邊」（conic-gradient 動畫）+ 玻璃感半透明卡身。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-aurora-m">
    <div class="noya-aurora-m__app">
      <!-- Header -->
      <header class="noya-aurora-m__header">
        <div class="noya-aurora-m__brand">
          <img class="noya-aurora-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-aurora-m__head-right">
          <span class="noya-aurora-m__pill noya-aurora-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-aurora-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-aurora-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 極光視訊體驗" />
      </section>

      <!-- Announcement marquee -->
      <div class="noya-aurora-m__notice">
        <Icon
          class="noya-aurora-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-aurora-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-aurora-m__strip">
        <div class="noya-aurora-m__online">在線人數：<b>3063</b></div>
        <div class="noya-aurora-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-aurora-m__qa"
          >
            <span class="noya-aurora-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-aurora-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby：左 icon rail + 右 2 欄霓虹卡片 -->
      <div class="noya-aurora-m__lobby">
        <!--
          左側 icon rail（記憶點）：
          - 平時 64px 窄，只顯示 icon
          - active 那一個 transition 展開到 110px，露出 label + 霓虹膠囊
        -->
        <div class="noya-aurora-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-aurora-m__rail-btn"
            :class="{ 'noya-aurora-m__rail-btn--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-aurora-m__rail-ic" :icon="cat.icon" />
            <span class="noya-aurora-m__rail-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側 2 欄霓虹卡片（流動漸層描邊） -->
        <div class="noya-aurora-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片：全寬橫跨 2 欄 -->
            <img
              v-if="c.img"
              class="noya-aurora-m__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 霓虹漸層描邊佔位卡 -->
            <div v-else class="noya-aurora-m__gcard">
              <!-- 流動漸層描邊偽元素透過 CSS 動畫處理 -->
              <div class="noya-aurora-m__gcard-inner">
                <div class="noya-aurora-m__gcard-wm">{{ c.wm }}</div>
                <div class="noya-aurora-m__gcard-label">
                  <div class="noya-aurora-m__gcard-big">{{ c.big }}</div>
                  <div class="noya-aurora-m__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom nav（中間「首頁」凸出球） -->
    <nav class="noya-aurora-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-aurora-m__nav"
        :class="{ 'noya-aurora-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-aurora-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-aurora-m__nav-ic" :icon="t.icon" />
        <span class="noya-aurora-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-aurora-m {
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

  // ===== HEADER =====
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
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: var(--color-primary);
      box-shadow: 0 4px 14px var(--glow);
      color: var(--text-on-primary);
    }
  }

  // ===== HERO =====
  &__hero {
    position: relative;
    margin: 6px 14px 0;
    border-radius: 20px;
    overflow: hidden;

    // 霓虹光邊框
    border: 1px solid var(--border);
    box-shadow:
      var(--shadow),
      0 0 16px var(--glow);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // ===== NOTICE =====
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
    color: var(--color-primary);
    font-size: 20px;

    // 霓虹發光圖示
    filter: drop-shadow(0 0 6px var(--color-primary));
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13.5px;
      color: var(--text-muted);
      white-space: nowrap;
      will-change: transform;
      animation: noya-aurora-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // ===== STRIP =====
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
      text-shadow: 0 0 8px var(--online-num);
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
      0 6px 16px rgba(4, 14, 30, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
    color: var(--color-primary);
    font-size: 26px;
  }

  &__qa-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // ===== LOBBY =====
  &__lobby {
    display: flex;
    gap: 0;
    padding: 16px 14px 0;
    align-items: flex-start;
  }

  // ─────── 左側 icon rail（記憶點設計）───────
  // 平時 64px 窄，只顯示 icon；
  // active 按鈕展開到 110px，露出 label + 霓虹膠囊光暈
  &__rail {
    width: 64px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--aurora-rail-bg);
    border-right: 1px solid var(--aurora-rail-border);
    border-radius: 16px 0 0 16px;
    padding: 8px 0;

    // 讓子按鈕的 width 展開能溢出容器但不裁切
    overflow: visible;
    position: relative;
    z-index: 2;
  }

  &__rail-btn {
    // 預設窄 64px，僅顯示 icon
    width: 64px;
    max-width: 64px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    color: var(--ink-mute);
    border: 1px solid transparent;
    background: transparent;
    position: relative;
    overflow: hidden;

    // 展開動畫：width + max-width + padding 同步過渡
    transition:
      width 0.32s cubic-bezier(0.34, 1.28, 0.64, 1),
      max-width 0.32s cubic-bezier(0.34, 1.28, 0.64, 1),
      padding 0.32s ease,
      background 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease;

    &--on {
      // 展開到 110px 露出 label
      width: 110px;
      max-width: 110px;
      padding: 12px 8px 12px 12px;
      justify-content: flex-start;
      color: var(--color-primary);
      background: var(--aurora-capsule-bg);
      border-color: var(--color-primary);

      // 霓虹膠囊發光
      box-shadow: var(--aurora-capsule-glow);

      .noya-aurora-m__rail-ic {
        color: var(--color-primary);

        // icon 本身也發光
        filter: drop-shadow(0 0 6px var(--color-primary));
      }

      .noya-aurora-m__rail-label {
        // label 漸入
        opacity: 1;
        max-width: 60px;
        transform: translateX(0);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__rail-ic {
    font-size: 24px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.2s ease;
  }

  // label 預設隱藏（opacity + max-width 動畫，不用 display:none 才能 transition）
  // stylelint-disable-next-line no-descending-specificity
  &__rail-label {
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    max-width: 0;
    opacity: 0;
    transform: translateX(-4px);
    transition:
      opacity 0.25s ease 0.08s,
      max-width 0.25s ease,
      transform 0.25s ease 0.08s;
  }

  // ─────── 右側卡片（2 欄，霓虹描邊）───────
  &__cards {
    flex: 1;
    display: grid;

    // 真人切片全寬 span 2，其他 2 欄排列
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 8px 0 8px 12px;
    min-width: 0;
    animation: noya-aurora-cards-in 0.3s ease;
  }

  // 真實切片（live 卡）：橫跨 2 欄
  &__gfull {
    grid-column: span 2;
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
    box-shadow:
      var(--shadow),
      0 0 10px var(--glow);
    border: 1px solid var(--border);
  }

  // ─────── 霓虹流動漸層描邊卡（記憶點設計）───────
  // 原理：外層 .gcard 用 padding + 偽元素 conic-gradient 旋轉製造「流動描邊」效果；
  // 內層 .gcard-inner 是玻璃感卡身
  &__gcard {
    grid-column: span 1;
    position: relative;
    border-radius: 14px;
    padding: 2px; // 這 2px 是「描邊厚度」
    // conic-gradient 旋轉動畫製造流動描邊
    background: conic-gradient(
      from 0deg,
      var(--aurora-border-a) 0%,
      var(--aurora-border-b) 40%,
      var(--aurora-border-c) 70%,
      var(--aurora-border-a) 100%
    );
    animation: noya-aurora-spin-border 3s linear infinite;
    box-shadow: 0 0 10px rgba(52, 224, 208, 0.2);
    aspect-ratio: 3 / 4;
  }

  &__gcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: var(--bg-surface);

    // 玻璃感：背景再疊一層深色
    background: linear-gradient(
        160deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      var(--gcard-bg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px;
  }

  &__gcard-wm {
    position: absolute;
    right: 6%;
    top: 20%;
    font-size: 30px;
    font-weight: 900;
    font-style: italic;
    color: rgba(52, 224, 208, 0.06);
    pointer-events: none;
    z-index: 1;
  }

  &__gcard-label {
    position: relative;
    z-index: 3;
  }

  &__gcard-big {
    font-size: 16px;
    font-weight: 900;
    color: var(--text-primary);
    border-left: 2px solid var(--card-label-bar);
    padding-left: 8px;
    white-space: nowrap;
    text-shadow: 0 0 8px var(--glow);
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 10px;
    color: var(--card-sub);
    letter-spacing: 0.1em;
    margin: 5px 0 0 10px;
  }

  // ===== BOTTOM TABBAR =====
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
    backdrop-filter: blur(12px);
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

      .noya-aurora-m__nav-label {
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

    // 凸出球也帶霓虹光暈
    border: 3px solid var(--bg-base);
    box-shadow:
      0 8px 20px var(--glow),
      inset 0 1px 2px rgba(255, 255, 255, 0.3);
    color: var(--text-on-primary);
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}

// ===== KEYFRAMES =====
@keyframes noya-aurora-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-aurora-cards-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

// 流動漸層描邊旋轉動畫（只旋轉背景的 conic-gradient 起始角度）
@keyframes noya-aurora-spin-border {
  from {
    // stylelint-disable-next-line property-no-unknown
    --aurora-angle: 0deg;
  }

  to {
    // stylelint-disable-next-line property-no-unknown
    --aurora-angle: 360deg;
  }
}
</style>
