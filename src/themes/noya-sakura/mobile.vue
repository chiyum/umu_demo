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
 * noya-sakura（櫻粉柔美）手機版
 *
 * 設計核心：淺色底（極淺粉白）+ 櫻粉，柔美溫暖。
 * 左側 tab：全圓角 bubble 膠囊按鈕，每個右上角帶小數字 badge（熱門數），
 * active = 櫻粉漸層 + 柔粉陰影 + 白字。
 * 右側卡片：squircle（border-radius ~26px）2 欄，柔粉陰影，
 * live 用真人切片，其他用粉漸層佔位卡。
 * max-width 480px + 底部 5 格 tabbar（中間首頁凸出粉球）。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類，預設 live */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-sakura-m">
    <div class="noya-sakura-m__app">
      <!-- Header：logo + 登入/註冊 pill -->
      <header class="noya-sakura-m__header">
        <div class="noya-sakura-m__brand">
          <img class="noya-sakura-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-sakura-m__head-right">
          <span class="noya-sakura-m__pill noya-sakura-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-sakura-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-sakura-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-sakura-m__notice">
        <Icon
          class="noya-sakura-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-sakura-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-sakura-m__strip">
        <div class="noya-sakura-m__online">在線人數：<b>3063</b></div>
        <div class="noya-sakura-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-sakura-m__qa"
          >
            <span class="noya-sakura-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-sakura-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 大廳：左側 bubble 膠囊 tab + 右側 squircle 卡片 -->
      <div class="noya-sakura-m__lobby">
        <!-- 左側分類按鈕欄（精緻重點：全圓角 bubble 膠囊 + badge） -->
        <div class="noya-sakura-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-sakura-m__tab"
            :class="{ 'noya-sakura-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <!-- 右上角小數字 badge（熱門數） -->
            <span v-if="cat.badge" class="noya-sakura-m__badge">{{
              cat.badge
            }}</span>
            <Icon class="noya-sakura-m__tab-ic" :icon="cat.icon" />
            <span class="noya-sakura-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側卡片頁面（squircle 2 欄 grid） -->
        <div
          class="noya-sakura-m__cards"
          :class="{
            'noya-sakura-m__cards--single': activeCat === 'live'
          }"
        >
          <template v-for="(c, i) in cards" :key="i">
            <!-- live 真實切片卡 -->
            <img
              v-if="c.img"
              class="noya-sakura-m__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 粉漸層佔位卡（squircle） -->
            <div v-else class="noya-sakura-m__gcard">
              <!-- 大型淡粉水印英文 -->
              <div class="noya-sakura-m__gcard-wm">{{ c.wm }}</div>
              <!-- 標題文字 -->
              <div class="noya-sakura-m__gcard-label">
                <div class="noya-sakura-m__gcard-big">{{ c.big }}</div>
                <div class="noya-sakura-m__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部 tabbar（中間首頁凸出粉球） -->
    <nav class="noya-sakura-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-sakura-m__nav"
        :class="{ 'noya-sakura-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-sakura-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-sakura-m__nav-ic" :icon="t.icon" />
        <span class="noya-sakura-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-sakura-m {
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
    padding: 14px 16px 10px;
    border-bottom: 1px solid var(--glass-line);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
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
    font-weight: 600;
    color: var(--color-primary);
    padding: 8px 14px;

    // 全圓角 bubble 膠囊
    border-radius: 999px;
    cursor: pointer;
    border: 1.5px solid var(--border);
    background: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
    transition:
      background 0.15s,
      box-shadow 0.15s;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: transparent;
      box-shadow: 0 4px 16px rgba(232, 107, 158, 0.35);
      color: var(--text-on-primary);
    }
  }

  // Hero（squircle 大圓角）
  &__hero {
    position: relative;
    margin: 12px 14px 0;
    border-radius: 26px;
    overflow: hidden;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // 公告條（圓角 bubble 風格）
  &__notice {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 14px 0;
    padding: 10px 14px;
    border-radius: 999px;
    background: var(--notice-bg);
    border: 1.5px solid var(--glass-line);
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
      color: var(--ink-soft);
      white-space: nowrap;
      will-change: transform;
      animation: noya-sakura-marquee 20s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // Strip：在線人數 + 快捷
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 16px 18px 4px;
  }

  &__online {
    font-size: 14px;
    font-weight: 500;
    color: var(--ink-mute);

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

    // squircle 圓角
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1.5px solid var(--glass-line);
    box-shadow: 0 4px 12px rgba(232, 107, 158, 0.15);
    color: var(--color-primary);
    font-size: 22px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // Lobby
  &__lobby {
    display: flex;
    gap: 0;
    padding: 14px 0 0;
    align-items: flex-start;
  }

  // 左側 bubble 膠囊 tab（精緻設計重點）
  &__tabs {
    width: 82px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0 6px 0 10px;
  }

  &__tab {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 6px 10px;
    cursor: pointer;
    color: var(--ink-mute);

    // 全圓角 bubble 膠囊
    border-radius: 22px;
    border: 1.5px solid var(--glass-line);
    background: rgba(255, 255, 255, 0.7);
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    // active：櫻粉漸層 + 柔粉陰影
    &--on {
      background: var(--tab-active-bg);
      border-color: transparent;
      color: var(--text-on-primary);

      // 柔粉陰影
      box-shadow:
        0 8px 24px rgba(232, 107, 158, 0.35),
        0 2px 6px rgba(232, 107, 158, 0.2);

      .noya-sakura-m__tab-ic {
        color: var(--text-on-primary);
      }

      .noya-sakura-m__tab-label {
        color: var(--text-on-primary);
        font-weight: 700;
      }

      .noya-sakura-m__badge {
        background: rgba(255, 255, 255, 0.9);
        color: var(--color-primary);
      }
    }
  }

  // 右上角小數字 badge（熱門數）
  // stylelint-disable-next-line no-descending-specificity
  &__badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 999px;
    background: var(--color-primary);
    color: var(--text-on-primary);
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(232, 107, 158, 0.4);
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
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-mute);
    transition: color 0.18s;
  }

  // 右側卡片區（squircle 2 欄 grid）
  &__cards {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    min-width: 0;
    padding: 0 10px 0 6px;
    animation: noya-sakura-cards-in 0.28s ease;

    // live 分類只有一欄（切片卡較寬）
    &--single {
      grid-template-columns: 1fr;
    }
  }

  // live 切片卡（squircle）
  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 20px;
    display: block;
    box-shadow: var(--shadow);
    border: 1.5px solid var(--glass-line);

    // hover/active 微浮起
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow:
        0 12px 32px rgba(232, 107, 158, 0.22),
        0 4px 12px rgba(232, 107, 158, 0.12);
    }
  }

  // 粉漸層佔位卡（squircle）
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 22px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1.5px solid var(--glass-line);
    box-shadow: var(--shadow);

    // hover/active 微浮起
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow:
        0 12px 32px rgba(232, 107, 158, 0.2),
        0 4px 12px rgba(232, 107, 158, 0.1);
    }
  }

  // 大型淡粉水印英文
  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    font-weight: 900;
    font-style: italic;
    line-height: 0.9;
    color: rgba(232, 107, 158, 0.1);
    letter-spacing: 0.02em;
    text-align: right;
    pointer-events: none;
    z-index: 1;
  }

  // 標題文字（左下角）
  &__gcard-label {
    position: absolute;
    left: 14px;
    bottom: 14px;
    z-index: 2;
  }

  &__gcard-big {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--text-primary);
    border-left: 2px solid var(--card-label-bar);
    padding-left: 8px;
    white-space: nowrap;
  }

  &__gcard-sub {
    font-size: 10px;
    font-weight: 500;
    color: var(--card-sub);
    letter-spacing: 0.1em;
    margin: 5px 0 0 10px;
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
    border-top: 1.5px solid var(--glass-line);
    backdrop-filter: blur(12px);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    color: var(--ink-mute);

    &--center {
      margin-top: -22px;

      .noya-sakura-m__nav-label {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  &__nav-ic {
    font-size: 24px;
  }

  // 中間首頁凸出粉球
  &__nav-badge {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tabbar-center-bg);
    border: 3px solid var(--bg-base);
    box-shadow:
      0 8px 24px rgba(232, 107, 158, 0.45),
      inset 0 1px 2px rgba(255, 255, 255, 0.6);
    color: var(--text-on-primary);
    font-size: 28px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }
}

@keyframes noya-sakura-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-sakura-cards-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
