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
 * noya-jade（翡翠綠金）手機版
 *
 * 設計主軸：深墨綠玻璃感底，翡翠金 accent
 * 左側分類（精緻重點）：直式 pill 欄
 *   - active 填入翡翠漸層 + 左緣 3px 滑動 accent bar（::before 絕對定位）
 *   - 外發光 box-shadow glow 效果
 *   - icon 在左、label 在右
 * 右側頁面：2 欄卡片 grid
 *   - live 分類：card-dg / card-allbet 切片
 *   - 其他分類：綠漸層 gcard（右側水印 + 左側標題 bar）
 *   - 每張卡右上角加 HOT/NEW 角標 ribbon（CSS 膠囊）
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類（預設 live） */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-jade-m">
    <div class="noya-jade-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-jade-m__header">
        <div class="noya-jade-m__brand">
          <img class="noya-jade-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-jade-m__head-right">
          <span class="noya-jade-m__pill noya-jade-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-jade-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-jade-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- Announcement marquee -->
      <div class="noya-jade-m__notice">
        <Icon
          class="noya-jade-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-jade-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-jade-m__strip">
        <div class="noya-jade-m__online">在線人數：<b>3063</b></div>
        <div class="noya-jade-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-jade-m__qa"
          >
            <span class="noya-jade-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-jade-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby：左側分類 pill 欄 + 右側 2 欄卡片 -->
      <div class="noya-jade-m__lobby">
        <!-- 左側分類 pill 欄（精緻設計：左緣 accent bar + glow） -->
        <div class="noya-jade-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-jade-m__tab"
            :class="{ 'noya-jade-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-jade-m__tab-ic" :icon="cat.icon" />
            <span class="noya-jade-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側 2 欄卡片 grid -->
        <div class="noya-jade-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片卡（live 分類） -->
            <div v-if="c.img" class="noya-jade-m__card-wrap">
              <img class="noya-jade-m__gfull" :src="c.img" :alt="c.alt" />
              <!-- HOT/NEW 角標 ribbon -->
              <span
                v-if="c.badge"
                class="noya-jade-m__badge"
                :class="{
                  'noya-jade-m__badge--hot': c.badge === 'HOT',
                  'noya-jade-m__badge--new': c.badge === 'NEW'
                }"
                >{{ c.badge }}</span
              >
            </div>
            <!-- 綠漸層佔位卡（其他分類） -->
            <div v-else class="noya-jade-m__card-wrap">
              <div class="noya-jade-m__gcard">
                <div class="noya-jade-m__gcard-wm">{{ c.wm }}</div>
                <div class="noya-jade-m__gcard-label">
                  <div class="noya-jade-m__gcard-big">{{ c.big }}</div>
                  <div class="noya-jade-m__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
              <!-- HOT/NEW 角標 ribbon -->
              <span
                v-if="c.badge"
                class="noya-jade-m__badge"
                :class="{
                  'noya-jade-m__badge--hot': c.badge === 'HOT',
                  'noya-jade-m__badge--new': c.badge === 'NEW'
                }"
                >{{ c.badge }}</span
              >
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom nav（中間「首頁」凸出） -->
    <nav class="noya-jade-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-jade-m__nav"
        :class="{ 'noya-jade-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-jade-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-jade-m__nav-ic" :icon="t.icon" />
        <span class="noya-jade-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-jade-m {
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
    color: #cdfae8;
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(80, 220, 150, 0.7);
      box-shadow: 0 4px 14px rgba(20, 130, 80, 0.5);
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
      color: #a8dfc2;
      white-space: nowrap;
      will-change: transform;
      animation: noya-jade-marquee 18s linear infinite;

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
    border: 1px solid rgba(40, 180, 110, 0.34);
    box-shadow:
      0 6px 16px rgba(4, 18, 10, 0.45),
      inset 0 1px 1px rgba(255, 255, 255, 0.16);
    color: var(--color-secondary);
    font-size: 26px;
  }

  &__qa-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // Lobby：左側 pill 欄 + 右側 2 欄 grid
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 12px 14px 0;
    align-items: flex-start;
  }

  // 左側分類 pill 欄
  &__tabs {
    width: 88px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 2px;
  }

  // pill 按鈕：active 時翡翠漸層 + 左緣 3px accent bar + 外發光
  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 11px 8px 11px 14px;
    border-radius: 999px; // 完整膠囊形
    cursor: pointer;
    color: var(--ink-mute);
    border: 1px solid transparent;
    background: transparent;
    overflow: hidden;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    // 左緣 accent bar — 預設透明，active 時顯示翡翠色
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 16%;
      bottom: 16%;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--color-primary);
      opacity: 0;
      transition: opacity 0.18s ease;
    }

    &--on {
      color: #e8fff4;
      background: var(--tab-active-bg);
      border-color: rgba(40, 180, 110, 0.5);
      box-shadow:
        0 6px 18px var(--glow),
        inset 0 1px 1px rgba(255, 255, 255, 0.18);

      // 左緣 accent bar 浮現
      &::before {
        opacity: 1;
      }

      .noya-jade-m__tab-ic {
        color: var(--color-secondary);
      }

      .noya-jade-m__tab-label {
        color: #e8fff4;
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 22px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.18s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
  }

  // 右側 2 欄卡片 grid
  &__cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    min-width: 0;
    animation: noya-jade-cards-in 0.28s ease;
  }

  // 卡片包裝（含角標定位錨點）
  &__card-wrap {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 14px;
    display: block;
    box-shadow: var(--shadow);
  }

  // HOT/NEW 角標 ribbon — 右上角膠囊
  &__badge {
    position: absolute;
    top: 7px;
    right: 7px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.06em;
    z-index: 4;

    &--hot {
      background: linear-gradient(135deg, #ff6b3d, #e8432a);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(230, 60, 30, 0.6);
    }

    &--new {
      background: linear-gradient(135deg, #1cd9cc, #0fa89e);
      color: #001e1c;
      box-shadow: 0 2px 8px rgba(20, 200, 190, 0.6);
    }
  }

  // 綠漸層佔位卡
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 14px;
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
    font-size: 28px;
    font-weight: 900;
    font-style: italic;
    line-height: 0.9;
    color: rgba(40, 180, 110, 0.1);
    letter-spacing: 0.02em;
    text-align: right;
    pointer-events: none;
    z-index: 1;
  }

  &__gcard-label {
    position: absolute;
    left: 12px;
    bottom: 14px;
    z-index: 3;
  }

  &__gcard-big {
    font-size: 16px;
    font-weight: 900;
    line-height: 1;
    color: #e8fff4;
    border-left: 3px solid var(--card-label-bar);
    padding-left: 8px;
    white-space: nowrap;
    text-shadow: 0 2px 6px rgba(4, 18, 10, 0.6);
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 9px;
    color: var(--card-sub);
    letter-spacing: 0.12em;
    margin: 4px 0 0 11px;
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

      .noya-jade-m__nav-label {
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
    border: 3px solid #050f0c;
    box-shadow:
      0 8px 20px rgba(20, 130, 80, 0.6),
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

@keyframes noya-jade-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-jade-cards-in {
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
