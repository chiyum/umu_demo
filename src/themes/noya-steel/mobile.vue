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
 * noya-steel（鈦銀琥珀）手機版
 *
 * 視覺亮點：
 *   左側分類：連體金屬 segmented rail——整欄是一個圓角容器（鈦灰金屬），
 *     各分類段以細髮絲線分隔，active 段用 inset shadow 模擬內凹琥珀高光
 *   右側卡片：clip-path 輕微斜切角 + 琥珀邊緣光（偽元素 border-image 仿金屬邊框）
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-steel-m">
    <div class="noya-steel-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-steel-m__header">
        <div class="noya-steel-m__brand">
          <img class="noya-steel-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-steel-m__head-right">
          <span class="noya-steel-m__pill noya-steel-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-steel-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-steel-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 鈦銀金屬尊享" />
        <!-- 金屬質感斜邊裝飾條 -->
        <div class="noya-steel-m__hero-bar"></div>
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-steel-m__notice">
        <Icon
          class="noya-steel-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-steel-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-steel-m__strip">
        <div class="noya-steel-m__online">
          <Icon icon="material-symbols:group-outline" />
          <span>在線：<b>3063</b></span>
        </div>
        <div class="noya-steel-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-steel-m__qa"
          >
            <span class="noya-steel-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-steel-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 大廳：左 segmented rail + 右斜切卡片 -->
      <div class="noya-steel-m__lobby">
        <!--
          左側 segmented rail：整欄是一個圓角鈦灰金屬容器，
          各分類用細髮絲線分隔，active 段模擬內凹琥珀高光
        -->
        <div class="noya-steel-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-steel-m__seg"
            :class="{ 'noya-steel-m__seg--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-steel-m__seg-ic" :icon="cat.icon" />
            <span class="noya-steel-m__seg-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側卡片（斜切角 + 琥珀邊緣高光） -->
        <div class="noya-steel-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <div class="noya-steel-m__card-wrap">
              <img
                v-if="c.img"
                class="noya-steel-m__gfull"
                :src="c.img"
                :alt="c.alt"
              />
              <div v-else class="noya-steel-m__gcard">
                <div class="noya-steel-m__gcard-wm">{{ c.wm }}</div>
                <div class="noya-steel-m__gcard-label">
                  <div class="noya-steel-m__gcard-big">{{ c.big }}</div>
                  <div class="noya-steel-m__gcard-sub">{{ c.sub }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部 tabbar（中間首頁凸出球） -->
    <nav class="noya-steel-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-steel-m__nav"
        :class="{ 'noya-steel-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-steel-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-steel-m__nav-ic" :icon="t.icon" />
        <span class="noya-steel-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-steel-m {
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

  // ===== Header =====
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
    color: var(--ink-soft);
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--glass-line);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(217, 162, 75, 0.5);

      // 金屬質感 shadow
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.5),
        inset 0 1px 1px rgba(255, 255, 255, 0.15);
      color: var(--text-on-primary);
    }
  }

  // ===== Hero =====
  &__hero {
    position: relative;
    margin: 6px 14px 0;
    border-radius: 16px;
    overflow: hidden;

    // 雙描邊：外層容器深灰邊 + 圓角
    border: 1px solid var(--glass-line);
    box-shadow:
      var(--shadow),
      inset 0 0 0 1px rgba(217, 162, 75, 0.08);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // 底部金屬斜邊裝飾條（琥珀漸層，模擬金屬切邊高光）
  &__hero-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-primary),
      transparent
    );
    opacity: 0.7;
  }

  // ===== 公告 =====
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 14px 14px 0;
    padding: 11px 16px;
    border-radius: 12px;
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
      font-size: 13px;
      color: var(--text-muted);
      white-space: nowrap;
      will-change: transform;
      animation: noya-steel-marquee 18s linear infinite;

      // stylelint-disable-next-line no-descending-specificity
      b {
        color: var(--color-secondary);
        font-weight: 700;
      }
    }
  }

  // ===== Strip =====
  &__strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 18px 6px;
  }

  &__online {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink-soft);

    :deep(svg) {
      color: var(--color-secondary);
      font-size: 18px;
    }

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

    // 金屬質感 inset + 外光
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.4),
      inset 0 1px 1px rgba(255, 255, 255, 0.12);
    color: var(--color-secondary);
    font-size: 24px;
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // ===== Lobby =====
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 14px 14px 0;
    align-items: flex-start;
  }

  // ───── 核心精緻設計：segmented rail 左側按鈕欄 ─────
  // 整欄是一個圓角鈦灰金屬容器，內部各段用細髮絲線分隔
  &__rail {
    width: 86px;
    flex: none;
    border-radius: 18px;

    // 金屬容器底
    background: var(--rail-bg);

    // 雙描邊：外圍琥珀光線 + 內嵌陰影
    border: 1px solid var(--rail-border);
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  // 每個分段按鈕
  &__seg {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    padding: 12px 4px;
    cursor: pointer;
    color: var(--ink-mute);
    border: none;
    background: transparent;
    transition:
      color 0.18s ease,
      background 0.18s ease;

    // 段與段之間的細髮絲分隔線（排除最後一段）
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 12%;
      right: 12%;
      height: 1px;
      background: var(--rail-divider);
    }

    // active 段：內凹琥珀高光
    &--on {
      background: var(--tab-active-bg);
      color: var(--color-secondary);

      // 模擬內凹高光的核心：inset shadow + 邊緣光暈
      box-shadow: var(--rail-active-inset);

      .noya-steel-m__seg-ic {
        color: var(--color-primary);

        // 圖示琥珀光暈
        filter: drop-shadow(0 0 4px rgba(217, 162, 75, 0.6));
      }

      .noya-steel-m__seg-label {
        color: var(--color-secondary);
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__seg-ic {
    font-size: 22px;
    color: var(--ink-mute);
    transition: color 0.18s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__seg-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.18s ease;
  }

  // ───── 右側卡片：斜切角 + 琥珀邊緣高光 ─────
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    animation: noya-steel-cards-in 0.3s ease;
  }

  // 每張卡片的包裝：clip-path 斜切 + 偽元素高光
  &__card-wrap {
    position: relative;
    border-radius: 14px;
    overflow: hidden;

    // clip-path 右上角輕微斜切（切 12px 斜角，模擬精密切削）
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);

    // 斜切口的琥珀高光（偽元素放在包裝上方）
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 22px;
      height: 22px;
      background: linear-gradient(
        225deg,
        var(--card-clip-glow) 0%,
        transparent 60%
      );
      z-index: 10;
      pointer-events: none;
    }
  }

  &__gfull {
    width: 100%;
    height: auto;
    display: block;
    box-shadow: var(--shadow);
  }

  // 佔位遊戲卡（鈦灰漸層）
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 232;
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
    font-size: 36px;
    font-weight: 900;
    font-style: italic;
    color: rgba(217, 162, 75, 0.08);
    pointer-events: none;
    z-index: 1;
    letter-spacing: 0.02em;
  }

  &__gcard-label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &__gcard-big {
    font-size: 24px;
    font-weight: 900;
    line-height: 1;
    color: var(--text-primary);
    border-left: 3px solid var(--card-label-bar);
    padding-left: 11px;
    white-space: nowrap;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 10px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 7px 0 0 14px;
  }

  // ===== Bottom tabbar =====
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

      .noya-steel-m__nav-label {
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

    // 鈦灰深邊環
    border: 3px solid #12141a;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.6),
      0 0 12px rgba(217, 162, 75, 0.35),
      inset 0 1px 2px rgba(255, 255, 255, 0.25);
    color: var(--text-on-primary);
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }
}

@keyframes noya-steel-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-steel-cards-in {
  from {
    opacity: 0;
    transform: translateX(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
