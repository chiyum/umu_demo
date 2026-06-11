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
 * noya-blue（諾亞藍）手機版 — 1:1 忠實復刻 諾亞_版型探索_藍_自包含.html
 *
 * 對齊原稿 app 結構（max-width 480px，深海軍藍底）：
 *   header（brand mark + 諾亞娛樂/NOYA 名 + 登入/註冊 pill）/ hero banner /
 *   notice 跑馬燈公告 / strip（在線人數 + 存款/取款/消息 快捷）/
 *   lobby（左 5 分類 tab + 右卡片：真人用切片、其他用藍漸層佔位卡含水印+籌碼）/
 *   底部 tabbar（5 項，中間「首頁」凸出球）
 *
 * 忠實還原規約：版面結構對齊原稿，BEM 本地化（noya-blue-m__*），
 * 原稿用 inline SVG 排版，這裡 icon 本地化為 Iconify 等義 icon（結構不變）。
 *
 * Logo 接線：header 品牌區 logo 不寫死，左側 brand mark 旁顯示 themeStore.currentLogo
 * （讓 showcase / demo logo 切換器能換 logo）；原稿的「諾亞娛樂 / NOYA」文字標移除，
 * 改由 store logo 提供品牌識別，與既有 theme 一致。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類（對齊原稿預設 live） */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-blue-m">
    <div class="noya-blue-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-blue-m__header">
        <div class="noya-blue-m__brand">
          <img class="noya-blue-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-blue-m__head-right">
          <span class="noya-blue-m__pill noya-blue-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-blue-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-blue-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- Announcement marquee -->
      <div class="noya-blue-m__notice">
        <Icon
          class="noya-blue-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-blue-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-blue-m__strip">
        <div class="noya-blue-m__online">在線人數：<b>3063</b></div>
        <div class="noya-blue-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-blue-m__qa"
          >
            <span class="noya-blue-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-blue-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby -->
      <div class="noya-blue-m__lobby">
        <div class="noya-blue-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-blue-m__tab"
            :class="{ 'noya-blue-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-blue-m__tab-ic" :icon="cat.icon" />
            <span class="noya-blue-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <div class="noya-blue-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片卡 -->
            <img
              v-if="c.img"
              class="noya-blue-m__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 藍漸層佔位卡（忠實復刻原稿 gcard：水印 + 籌碼 + 標題） -->
            <div v-else class="noya-blue-m__gcard">
              <div class="noya-blue-m__gcard-wm">{{ c.wm }}</div>
              <i class="noya-blue-m__chip noya-blue-m__chip--a"></i>
              <i class="noya-blue-m__chip noya-blue-m__chip--b"></i>
              <div class="noya-blue-m__gcard-label">
                <div class="noya-blue-m__gcard-big">{{ c.big }}</div>
                <div class="noya-blue-m__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom nav（中間「首頁」凸出） -->
    <nav class="noya-blue-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-blue-m__nav"
        :class="{ 'noya-blue-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-blue-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-blue-m__nav-ic" :icon="t.icon" />
        <span class="noya-blue-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-blue-m {
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

  &__pill {
    font-size: 14px;
    font-weight: 700;
    color: #dbeaff;
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(150, 200, 255, 0.7);
      box-shadow: 0 4px 14px rgba(40, 104, 210, 0.5);
      color: #ffffff;
    }
  }

  // Hero
  &__hero {
    position: relative;
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

  // Notice
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
    color: var(--color-secondary);
    font-size: 20px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    p {
      font-size: 13.5px;
      color: #b8d0f2;
      white-space: nowrap;
      will-change: transform;
      animation: noya-blue-marquee 18s linear infinite;

      b {
        color: var(--color-secondary);
        font-weight: 700;
      }
    }
  }

  // Strip
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
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid rgba(104, 168, 244, 0.34);
    box-shadow:
      0 6px 16px rgba(10, 32, 68, 0.45),
      inset 0 1px 1px rgba(255, 255, 255, 0.16);
    color: var(--color-secondary);
    font-size: 26px;
  }

  &__qa-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // Lobby
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 12px 14px 0;
    align-items: flex-start;
  }

  &__tabs {
    width: 92px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 2px;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 6px 11px 11px;
    border-radius: 16px;
    cursor: pointer;
    color: var(--ink-mute);
    border: 1px solid transparent;
    background: transparent;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    &--on {
      color: #eaf4ff;
      background: var(--tab-active-bg);
      border-color: rgba(120, 185, 255, 0.5);
      box-shadow:
        0 6px 18px var(--glow),
        inset 0 1px 1px rgba(255, 255, 255, 0.22);

      .noya-blue-m__tab-ic {
        color: var(--color-secondary);
      }

      .noya-blue-m__tab-label {
        color: #eaf4ff;
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 26px;
    flex: none;
    color: var(--ink-mute);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 17px;
    font-weight: 500;
  }

  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    animation: noya-blue-cards-in 0.28s ease;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 16px;
    display: block;
    box-shadow: var(--shadow);
  }

  // 藍漸層佔位卡（對齊原稿 gcard）
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 232;
    border-radius: 16px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1px solid var(--glass-line);
    box-shadow: var(--shadow);
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    font-weight: 900;
    font-style: italic;
    line-height: 0.9;
    color: rgba(120, 170, 235, 0.1);
    letter-spacing: 0.02em;
    text-align: right;
    pointer-events: none;
    z-index: 1;
  }

  &__chip {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    background: repeating-conic-gradient(#dcecff 0 18deg, #4f8fe0 18deg 36deg);
    box-shadow:
      0 4px 10px rgba(6, 22, 52, 0.5),
      inset 0 0 0 3px rgba(255, 255, 255, 0.35);
    opacity: 0.9;

    &::after {
      content: "";
      position: absolute;
      inset: 24%;
      border-radius: 50%;
      background: #2f6fd0;
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.45);
    }

    &--a {
      width: 34px;
      height: 34px;
      left: 50%;
      top: 22%;
    }

    &--b {
      width: 26px;
      height: 26px;
      left: 42%;
      bottom: 16%;
    }
  }

  &__gcard-label {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &__gcard-big {
    font-size: 27px;
    font-weight: 900;
    line-height: 1;
    color: #eaf4ff;
    border-left: 3px solid var(--card-label-bar);
    padding-left: 12px;
    white-space: nowrap;
    text-shadow: 0 2px 6px rgba(6, 22, 52, 0.6);
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 11px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 8px 0 0 15px;
  }

  // Bottom nav
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

      .noya-blue-m__nav-label {
        color: var(--color-secondary);
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
    border: 3px solid #0a2143;
    box-shadow:
      0 8px 20px rgba(40, 104, 210, 0.6),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
    color: #ffffff;
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}

@keyframes noya-blue-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-blue-cards-in {
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
