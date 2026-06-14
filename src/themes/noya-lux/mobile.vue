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
 * noya-lux（曜黑燙金）手機版
 *
 * 設計核心：深色曜黑（#0c0c0e 系）+ 香檳燙金，古典奢華格調。
 * 左側 tab 採細金框直式按鈕（1px 金邊 + 內層細雙線裝飾），
 * active 狀態 = 金漸層填底 + 深黑字 + 上下細金線；全用襯線字。
 * 右側卡片：深色底 + 右上角金色 ribbon 角標 + 大型淡金水印英文。
 * max-width 480px + 底部 5 格 tabbar（中間首頁凸出球）。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類，預設 live */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-lux-m">
    <div class="noya-lux-m__app">
      <!-- Header：logo + 登入/註冊 pill -->
      <header class="noya-lux-m__header">
        <div class="noya-lux-m__brand">
          <img class="noya-lux-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-lux-m__head-right">
          <span class="noya-lux-m__pill noya-lux-m__pill--solid">會員登入</span>
          <span class="noya-lux-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-lux-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
        <!-- 右上金色角標 ribbon -->
        <div class="noya-lux-m__hero-ribbon">VIP</div>
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-lux-m__notice">
        <Icon
          class="noya-lux-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-lux-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-lux-m__strip">
        <div class="noya-lux-m__online">在線人數：<b>3063</b></div>
        <div class="noya-lux-m__quick">
          <div v-for="qa in QUICK_ACTIONS" :key="qa.key" class="noya-lux-m__qa">
            <span class="noya-lux-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-lux-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 大廳：左側細金框直式 tab + 右側卡片 -->
      <div class="noya-lux-m__lobby">
        <!-- 左側分類按鈕欄（精緻重點：細金框直式 tab） -->
        <div class="noya-lux-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-lux-m__tab"
            :class="{ 'noya-lux-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <!-- 左側細金線（active 時顯示） -->
            <span class="noya-lux-m__tab-accent"></span>
            <Icon class="noya-lux-m__tab-ic" :icon="cat.icon" />
            <span class="noya-lux-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側卡片頁面 -->
        <div class="noya-lux-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- live 真實切片卡 -->
            <img
              v-if="c.img"
              class="noya-lux-m__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 金漸層佔位卡（右上角 ribbon + 水印 + 標題） -->
            <div v-else class="noya-lux-m__gcard">
              <!-- 大型淡金水印英文 -->
              <div class="noya-lux-m__gcard-wm">{{ c.wm }}</div>
              <!-- 右上角金色角標 ribbon -->
              <div class="noya-lux-m__gcard-ribbon">HOT</div>
              <!-- 左側金色標題 accent bar + 文字 -->
              <div class="noya-lux-m__gcard-label">
                <div class="noya-lux-m__gcard-big">{{ c.big }}</div>
                <div class="noya-lux-m__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部 tabbar（中間首頁凸出球） -->
    <nav class="noya-lux-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-lux-m__nav"
        :class="{ 'noya-lux-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-lux-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-lux-m__nav-ic" :icon="t.icon" />
        <span class="noya-lux-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-lux-m {
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

    // 頂部細金線裝飾
    border-bottom: 1px solid var(--glass-line);
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
    font-weight: 600;
    font-family: var(--font-display);
    color: var(--ink-soft);
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;

    // 細金框，內層有雙線感
    border: 1px solid var(--border);
    outline: 1px solid rgba(217, 184, 106, 0.08);
    outline-offset: -3px;
    background: var(--glass);
    white-space: nowrap;
    letter-spacing: 0.04em;
    transition:
      background 0.15s,
      color 0.15s;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(240, 220, 160, 0.8);
      box-shadow: 0 4px 16px rgba(200, 164, 74, 0.35);
      color: var(--text-on-primary);
      font-weight: 700;
    }
  }

  // Hero
  &__hero {
    position: relative;
    margin: 10px 14px 0;
    border-radius: 4px;
    overflow: hidden;

    // 細金框雙線感
    border: 1px solid var(--border);
    outline: 1px solid rgba(217, 184, 106, 0.08);
    outline-offset: -4px;
    box-shadow: var(--shadow);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // Hero 右上金色角標
  &__hero-ribbon {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 52px 52px 0;
    border-color: transparent var(--color-primary) transparent transparent;

    &::after {
      content: "VIP";
      position: absolute;
      top: 6px;
      right: -48px;
      font-size: 10px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--text-on-primary);
      letter-spacing: 0.05em;
    }
  }

  // 公告條
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 12px 14px 0;
    padding: 10px 14px;
    border-radius: 3px;
    background: var(--notice-bg);
    border: 1px solid var(--glass-line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--color-secondary);
    font-size: 18px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13px;
      color: var(--ink-soft);
      white-space: nowrap;
      will-change: transform;
      animation: noya-lux-marquee 20s linear infinite;

      b {
        color: var(--color-secondary);
        font-weight: 700;
      }
    }
  }

  // Strip：在線人數 + 快捷
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 18px 18px 4px;
  }

  &__online {
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-display);
    color: var(--ink-mute);
    letter-spacing: 0.02em;

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
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--border);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.08);
    color: var(--color-secondary);
    font-size: 24px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    font-family: var(--font-display);
    color: var(--ink-mute);
  }

  // Lobby
  &__lobby {
    display: flex;
    gap: 0;
    padding: 16px 0 0;
    align-items: flex-start;
  }

  // 左側細金框直式 tab（精緻設計重點）
  &__tabs {
    width: 88px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 0 0 12px;
  }

  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 12px 8px 12px 14px;
    cursor: pointer;
    color: var(--ink-mute);

    // 細金框（1px 金邊）
    border: 1px solid var(--glass-line);

    // 內層細雙線裝飾（outline 模擬）
    outline: 1px solid rgba(217, 184, 106, 0.04);
    outline-offset: -3px;
    background: rgba(20, 18, 10, 0.5);
    border-radius: 2px;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      border-color 0.18s ease;

    // active：金漸層填底 + 深黑字 + 上下細金線效果
    &--on {
      background: var(--tab-active-bg);
      border-color: rgba(230, 200, 120, 0.7);
      outline-color: rgba(217, 184, 106, 0.15);
      color: var(--text-on-primary);
      box-shadow:
        0 4px 16px rgba(200, 164, 74, 0.25),
        inset 0 1px 0 rgba(255, 240, 180, 0.4),
        inset 0 -1px 0 rgba(160, 110, 20, 0.4);

      .noya-lux-m__tab-accent {
        opacity: 1;
      }

      .noya-lux-m__tab-ic {
        color: var(--text-on-primary);
      }

      .noya-lux-m__tab-label {
        color: var(--text-on-primary);
        font-weight: 700;
      }
    }
  }

  // tab 左側細金 accent 線（active 時顯示）
  // stylelint-disable-next-line no-descending-specificity
  &__tab-accent {
    position: absolute;
    left: -1px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: var(--color-secondary);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 0.18s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 22px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.18s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-display);
    letter-spacing: 0.02em;
    transition: color 0.18s;
  }

  // 右側卡片區
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    padding: 0 12px 0 10px;
    animation: noya-lux-cards-in 0.28s ease;
  }

  // live 切片卡
  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 3px;
    display: block;
    box-shadow: var(--shadow);
    border: 1px solid var(--glass-line);
  }

  // 金漸層佔位卡
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 232;
    border-radius: 3px;
    overflow: hidden;
    background: var(--gcard-bg);

    // 細金框雙線感
    border: 1px solid var(--border);
    outline: 1px solid rgba(217, 184, 106, 0.05);
    outline-offset: -3px;
    box-shadow: var(--shadow);
  }

  // 大型淡金水印英文
  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 38px;
    font-weight: 900;
    font-style: italic;
    font-family: Georgia, serif;
    line-height: 0.9;
    color: rgba(217, 184, 106, 0.07);
    letter-spacing: 0.02em;
    text-align: right;
    pointer-events: none;
    z-index: 1;
  }

  // 右上角金色角標 ribbon
  &__gcard-ribbon {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 42px 42px 0;
    border-color: transparent var(--color-primary) transparent transparent;
    z-index: 3;

    &::after {
      content: "HOT";
      position: absolute;
      top: 5px;
      right: -39px;
      font-size: 9px;
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--text-on-primary);
      letter-spacing: 0.04em;
    }
  }

  // 左側金色標題 accent bar + 文字
  &__gcard-label {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__gcard-big {
    font-size: 24px;
    font-weight: 700;
    font-family: var(--font-display);
    line-height: 1;
    color: var(--text-primary);

    // 左側金色 accent bar
    border-left: 2px solid var(--card-label-bar);
    padding-left: 10px;
    white-space: nowrap;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
    letter-spacing: 0.03em;
  }

  &__gcard-sub {
    font-family: Georgia, serif;
    font-weight: 400;
    font-size: 10px;
    font-style: italic;
    color: var(--card-sub);
    letter-spacing: 0.18em;
    margin: 7px 0 0 12px;
  }

  // 底部 tabbar
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

      .noya-lux-m__nav-label {
        color: var(--color-secondary);
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
    border: 3px solid #0a0a0c;
    box-shadow:
      0 8px 24px rgba(200, 164, 74, 0.5),
      inset 0 1px 2px rgba(255, 240, 180, 0.4);
    color: var(--text-on-primary);
    font-size: 28px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
    font-family: var(--font-display);
    letter-spacing: 0.02em;
  }
}

@keyframes noya-lux-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-lux-cards-in {
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
