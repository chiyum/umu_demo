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
 * noya-starlit（星夜紫玻璃）手機版
 *
 * 設計主軸：深紫星空底 + 磨砂玻璃 chip 分類欄 + 星芒卡片裝飾
 *
 * 左側分類欄（精緻重點）：
 *   - 每個分類是一顆磨砂玻璃 chip（backdrop-filter blur + 紫邊）
 *   - 旁邊帶一個 4px 小星點裝飾（::before 偽元素）
 *   - active = 紫色發光（box-shadow glow）+ translateY(-2px) 上浮動畫
 *   - inactive 晶體透明感，文字 ink-mute 淡顯
 *
 * 右側卡片：
 *   - 玻璃卡 + 星芒（4 顆位置固定的 sparkle 偽元素）
 *   - 籌碼升級為紫色 repeating-conic-gradient
 *   - 2 欄佈局（真人切片為滿版橫幅）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-starlit-m">
    <div class="noya-starlit-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-starlit-m__header">
        <div class="noya-starlit-m__brand">
          <!-- 星光 logo mark 裝飾 -->
          <span class="noya-starlit-m__logo-mark">
            <Icon icon="material-symbols:star-rate" />
          </span>
          <img class="noya-starlit-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-starlit-m__head-right">
          <span class="noya-starlit-m__pill noya-starlit-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-starlit-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-starlit-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 星夜視訊體驗金" />
      </section>

      <!-- Announcement -->
      <div class="noya-starlit-m__notice">
        <Icon
          class="noya-starlit-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-starlit-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-starlit-m__strip">
        <div class="noya-starlit-m__online">在線人數：<b>3,063</b></div>
        <div class="noya-starlit-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-starlit-m__qa"
          >
            <span class="noya-starlit-m__qa-ico">
              <Icon :icon="qa.icon" />
            </span>
            <span class="noya-starlit-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby：左浮動玻璃 chip 欄 + 右星芒卡片 -->
      <div class="noya-starlit-m__lobby">
        <!-- 左側磨砂玻璃 chip 分類欄 -->
        <div class="noya-starlit-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-starlit-m__chip-btn"
            :class="{ 'noya-starlit-m__chip-btn--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <!-- 小星點裝飾 -->
            <span class="noya-starlit-m__star-dot"></span>
            <Icon class="noya-starlit-m__chip-ic" :icon="cat.icon" />
            <span class="noya-starlit-m__chip-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側卡片區 -->
        <div class="noya-starlit-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片卡（滿版） -->
            <img
              v-if="c.img"
              class="noya-starlit-m__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 深紫漸層佔位卡（星芒 + 籌碼 + 水印） -->
            <div v-else class="noya-starlit-m__gcard">
              <!-- 大水印 -->
              <div class="noya-starlit-m__gcard-wm">{{ c.wm }}</div>
              <!-- 籌碼裝飾（紫色） -->
              <i
                class="noya-starlit-m__chip-dec noya-starlit-m__chip-dec--a"
              ></i>
              <i
                class="noya-starlit-m__chip-dec noya-starlit-m__chip-dec--b"
              ></i>
              <!-- 星芒裝飾 -->
              <span
                class="noya-starlit-m__sparkle noya-starlit-m__sparkle--1"
              ></span>
              <span
                class="noya-starlit-m__sparkle noya-starlit-m__sparkle--2"
              ></span>
              <!-- 標題 -->
              <div class="noya-starlit-m__gcard-label">
                <div class="noya-starlit-m__gcard-big">{{ c.big }}</div>
                <div class="noya-starlit-m__gcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom tabbar（中間「首頁」凸出） -->
    <nav class="noya-starlit-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-starlit-m__nav"
        :class="{ 'noya-starlit-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-starlit-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-starlit-m__nav-ic" :icon="t.icon" />
        <span class="noya-starlit-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-starlit-m {
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
    gap: 8px;
  }

  // 星光 mark：閃爍星形裝飾，非語意用途
  &__logo-mark {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background: var(--brand-mark-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d0b8ff;
    font-size: 18px;
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(138, 92, 240, 0.5);

    // 緩慢閃爍製造星光感
    animation: noya-starlit-pulse 3s ease-in-out infinite;
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
    color: var(--text-muted);
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--glass);
    backdrop-filter: blur(8px);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(180, 140, 255, 0.7);
      box-shadow: 0 4px 14px rgba(138, 92, 240, 0.5);
      color: #ffffff;
    }
  }

  // ===== HERO =====
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
    backdrop-filter: blur(6px);
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
      color: var(--text-muted);
      white-space: nowrap;
      will-change: transform;
      animation: noya-starlit-marquee 18s linear infinite;

      b {
        color: var(--color-secondary);
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
    gap: 16px;
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
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid rgba(160, 100, 255, 0.3);
    box-shadow:
      0 6px 16px rgba(20, 6, 50, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.12);
    color: var(--color-secondary);
    font-size: 24px;
    backdrop-filter: blur(6px);
  }

  &__qa-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // ===== LOBBY =====
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 14px 14px 0;
    align-items: flex-start;
  }

  // 左側磨砂玻璃 chip 欄（精緻核心）
  &__tabs {
    width: 88px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 2px;
  }

  // 每個 chip 浮動玻璃按鈕
  &__chip-btn {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 12px 6px;
    border-radius: 18px;
    cursor: pointer;

    // 磨砂玻璃底
    background: var(--glass);
    border: 1px solid var(--glass-line);
    backdrop-filter: blur(10px);
    color: var(--ink-mute);

    // 輕微陰影製造漂浮感
    box-shadow:
      0 4px 12px rgba(20, 6, 50, 0.35),
      inset 0 1px 1px rgba(255, 255, 255, 0.08);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;

    // active：紫色發光 + 上浮
    &--on {
      background: var(--tab-active-bg);
      border-color: rgba(180, 120, 255, 0.6);
      color: var(--text-primary);
      transform: translateY(-3px);
      box-shadow:
        0 8px 24px var(--glow),
        0 2px 8px rgba(20, 6, 50, 0.4),
        inset 0 1px 1px rgba(255, 255, 255, 0.18);

      .noya-starlit-m__chip-ic {
        color: var(--color-secondary);
      }

      .noya-starlit-m__chip-label {
        color: var(--text-primary);
        font-weight: 700;
      }

      // active 時星點亮起
      .noya-starlit-m__star-dot {
        background: var(--color-secondary);
        box-shadow: 0 0 6px var(--glow);
        opacity: 1;
      }
    }
  }

  // 小星點裝飾（每個 chip 右上角）
  // stylelint-disable-next-line no-descending-specificity
  &__star-dot {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--ink-mute);
    opacity: 0.5;
    transition:
      background 0.2s,
      opacity 0.2s,
      box-shadow 0.2s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__chip-ic {
    font-size: 24px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.2s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__chip-label {
    font-size: 13px;
    font-weight: 500;
    transition: color 0.2s;
  }

  // ===== 右側卡片區 =====
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    animation: noya-starlit-cards-in 0.28s ease;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 16px;
    display: block;
    box-shadow: var(--shadow);
  }

  // 深紫漸層佔位卡
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
    font-size: 38px;
    font-weight: 900;
    font-style: italic;
    line-height: 0.9;
    color: rgba(160, 100, 255, 0.09);
    letter-spacing: 0.02em;
    text-align: right;
    pointer-events: none;
    z-index: 1;
  }

  // 籌碼裝飾（紫色 repeating-conic）
  &__chip-dec {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    background: repeating-conic-gradient(#d0b8ff 0 18deg, #7040d0 18deg 36deg);
    box-shadow:
      0 4px 10px rgba(20, 6, 50, 0.5),
      inset 0 0 0 3px rgba(255, 255, 255, 0.25);
    opacity: 0.85;

    &::after {
      content: "";
      position: absolute;
      inset: 24%;
      border-radius: 50%;
      background: #6030c0;
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
    }

    &--a {
      width: 32px;
      height: 32px;
      left: 50%;
      top: 18%;
    }

    &--b {
      width: 24px;
      height: 24px;
      left: 42%;
      bottom: 14%;
    }
  }

  // 星芒裝飾（4 光線交叉，純 CSS 製造）
  &__sparkle {
    position: absolute;
    z-index: 3;
    pointer-events: none;

    // 十字星芒：寬短橫線 + 細長豎線疊加
    &::before,
    &::after {
      content: "";
      position: absolute;
      background: rgba(220, 190, 255, 0.55);
      border-radius: 999px;
    }

    // 橫線
    &::before {
      width: 14px;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    // 豎線
    &::after {
      width: 2px;
      height: 14px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &--1 {
      top: 15%;
      right: 18%;
      opacity: 0.7;
    }

    &--2 {
      bottom: 20%;
      right: 28%;
      opacity: 0.5;
      transform: scale(0.7);
    }
  }

  &__gcard-label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
  }

  &__gcard-big {
    font-size: 25px;
    font-weight: 900;
    line-height: 1;
    color: var(--text-primary);
    border-left: 3px solid var(--card-label-bar);
    padding-left: 10px;
    white-space: nowrap;
    text-shadow: 0 2px 8px rgba(20, 6, 50, 0.7);
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 10px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 7px 0 0 13px;
  }

  // ===== TABBAR =====
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
    gap: 4px;
    cursor: pointer;
    color: var(--ink-mute);

    &--center {
      margin-top: -22px;

      .noya-starlit-m__nav-label {
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

    // 邊框用 bg-base 顏色讓球凸出效果
    border: 3px solid #0b0618;
    box-shadow:
      0 8px 22px rgba(138, 92, 240, 0.65),
      inset 0 1px 2px rgba(255, 255, 255, 0.3);
    color: #ffffff;
    font-size: 28px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }
}

// ===== 動畫 =====
@keyframes noya-starlit-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-starlit-cards-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

// logo-mark 緩慢閃爍（製造星光脈動感）
@keyframes noya-starlit-pulse {
  0%,
  100% {
    box-shadow: 0 0 12px rgba(138, 92, 240, 0.5);
  }

  50% {
    box-shadow:
      0 0 20px rgba(138, 92, 240, 0.8),
      0 0 36px rgba(180, 140, 255, 0.3);
  }
}
</style>
