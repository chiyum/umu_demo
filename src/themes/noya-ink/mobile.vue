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
 * noya-ink（東方墨竹宣紙）手機版
 *
 * 設計重點：
 *   左側分類欄採「印章風方形 tab」（方角 + 2px 墨框 + 左側缺角 notch）；
 *   active 帶硃砂紅印章感（紅底白字）；
 *   分類欄與右側卡片之間有一條墨竹垂直分隔線；
 *   右側採「宣紙裱框卡片」（雙層細框 + 墨色直式標題 accent），直列佈局，東方留白感。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-ink-m">
    <div class="noya-ink-m__app">
      <!-- Header -->
      <header class="noya-ink-m__header">
        <div class="noya-ink-m__brand">
          <img class="noya-ink-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-ink-m__head-right">
          <!-- 登入按鈕：硃砂紅印章感 -->
          <span class="noya-ink-m__pill noya-ink-m__pill--solid">會員登入</span>
          <span class="noya-ink-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-ink-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 東方視訊體驗" />
      </section>

      <!-- Announcement marquee -->
      <div class="noya-ink-m__notice">
        <Icon
          class="noya-ink-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-ink-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-ink-m__strip">
        <div class="noya-ink-m__online">在線人數：<b>3063</b></div>
        <div class="noya-ink-m__quick">
          <div v-for="qa in QUICK_ACTIONS" :key="qa.key" class="noya-ink-m__qa">
            <span class="noya-ink-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-ink-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby：左印章 tab 欄 + 墨竹分隔線 + 右宣紙裱框卡片 -->
      <div class="noya-ink-m__lobby">
        <!--
          左側印章風方形 tab（記憶點設計）：
          - 方角（border-radius: 0）+ 2px 墨框
          - active 時紅底白字（硃砂印章感）
          - 分類欄右側有「墨竹毛筆風垂直分隔線」
        -->
        <div class="noya-ink-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-ink-m__tab"
            :class="{ 'noya-ink-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-ink-m__tab-ic" :icon="cat.icon" />
            <span class="noya-ink-m__tab-label">{{ cat.label }}</span>
          </button>
          <!-- 底部留白裝飾文字（東方感） -->
          <div class="noya-ink-m__tabs-deco">娛樂</div>
        </div>

        <!-- 墨竹毛筆風垂直分隔線 -->
        <div class="noya-ink-m__divider"></div>

        <!-- 右側宣紙裱框卡片（直列佈局） -->
        <div class="noya-ink-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片：裱框包裹 -->
            <div v-if="c.img" class="noya-ink-m__frame">
              <img class="noya-ink-m__gfull" :src="c.img" :alt="c.alt" />
            </div>
            <!-- 宣紙裱框佔位卡 -->
            <div v-else class="noya-ink-m__gcard">
              <!-- 外框（雙層細框） -->
              <div class="noya-ink-m__gcard-outer">
                <div class="noya-ink-m__gcard-inner">
                  <!-- 墨色水印大字 -->
                  <div class="noya-ink-m__gcard-wm">{{ c.wm }}</div>
                  <!-- 直式 accent 標題 -->
                  <div class="noya-ink-m__gcard-label">
                    <div class="noya-ink-m__gcard-big">{{ c.big }}</div>
                    <div class="noya-ink-m__gcard-sub">{{ c.sub }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom nav（中間「首頁」凸出球） -->
    <nav class="noya-ink-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-ink-m__nav"
        :class="{ 'noya-ink-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-ink-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-ink-m__nav-ic" :icon="t.icon" />
        <span class="noya-ink-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-ink-m {
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
    border-bottom: 1px solid rgba(47, 125, 94, 0.15);
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
    padding: 8px 16px;

    // 印章感：方角（不用 border-radius）
    border-radius: 2px;
    cursor: pointer;
    border: var(--ink-stamp-border);
    background: transparent;
    white-space: nowrap;
    font-family: var(--font-display);

    &--solid {
      background: var(--pill-solid-bg);
      border-color: var(--color-accent);
      color: var(--text-on-primary);
    }
  }

  // ===== HERO =====
  &__hero {
    position: relative;
    margin: 12px 14px 0;

    // 宣紙感：外雙框裱框
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid var(--ink-frame-outer);
    outline: 4px solid transparent;
    box-shadow:
      0 0 0 1px var(--ink-frame-inner),
      var(--shadow);
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
    padding: 10px 14px;
    border-radius: 0;
    background: var(--notice-bg);

    // 左側用墨竹色粗線（如書法橫批）
    border-left: 3px solid var(--color-primary);
    border-top: 1px solid var(--glass-line);
    border-bottom: 1px solid var(--glass-line);
    border-right: 1px solid var(--glass-line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--color-primary);
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
      animation: noya-ink-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
        font-family: var(--font-display);
      }
    }
  }

  // ===== STRIP =====
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 16px 20px 6px;
  }

  &__online {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);
    font-family: var(--font-display);

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
    width: 48px;
    height: 48px;
    border-radius: 2px; // 印章感方角
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    color: var(--color-primary);
    font-size: 24px;
  }

  &__qa-label {
    font-size: 12px;
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

  // ─────── 左側印章風方形 tab 欄（記憶點設計）───────
  &__tabs {
    width: 80px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 0; // 印章方塊緊密排列無間距
    position: relative;
  }

  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 12px 6px;

    // 印章方形：方角 + 2px 墨框
    border-radius: 0;
    cursor: pointer;
    color: var(--ink-soft);
    border: var(--ink-stamp-border);
    background: var(--glass);

    // 負 margin 讓邊框共用（視覺連成一塊）
    margin-top: -1px;
    position: relative;
    transition:
      background 0.18s ease,
      color 0.18s ease;

    &:first-child {
      margin-top: 0;

      // 左上角缺角 notch（用 clip-path 製造）
      clip-path: polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 8px);
    }

    &--on {
      // 硃砂紅印章感：紅底白字
      background: var(--ink-stamp-active-bg);
      border: var(--ink-stamp-active-border);
      color: var(--ink-stamp-active-color);
      z-index: 2; // 浮在其他 tab 上方讓邊框完整顯示

      .noya-ink-m__tab-ic {
        color: var(--ink-stamp-active-color);
      }

      .noya-ink-m__tab-label {
        color: var(--ink-stamp-active-color);
        font-weight: 700;
        font-family: var(--font-display);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 22px;
    flex: none;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-display);
  }

  // 底部裝飾「娛樂」字樣（東方直書感）
  &__tabs-deco {
    margin-top: 12px;
    font-family: var(--font-display);
    font-size: 11px;
    color: var(--ink-mute);
    text-align: center;
    letter-spacing: 2px;
    writing-mode: vertical-rl;
    align-self: center;
    opacity: 0.5;
  }

  // ─────── 墨竹毛筆風垂直分隔線（記憶點設計）───────
  &__divider {
    width: 2px;

    // 不等寬（上細下粗）模擬毛筆筆觸
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--ink-divider) 10%,
      var(--ink-divider) 80%,
      transparent 100%
    );
    align-self: stretch;
    margin: 0 10px;
    min-height: 100%;
    opacity: 0.5;
  }

  // ─────── 右側宣紙裱框卡片（直列佈局，東方留白感）───────
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    animation: noya-ink-cards-in 0.3s ease;
  }

  // 真實切片圖：裱框容器
  &__frame {
    width: 100%;
    border-radius: 2px;

    // 宣紙雙層細框
    border: 2px solid var(--ink-frame-outer);
    padding: 3px;
    background: var(--ink-frame-inner);
    box-shadow: var(--shadow);
  }

  &__gfull {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0;
  }

  // 宣紙裱框佔位卡
  &__gcard {
    width: 100%;
    aspect-ratio: 760 / 232;
    box-shadow: var(--shadow);
  }

  &__gcard-outer {
    width: 100%;
    height: 100%;

    // 外雙框（宣紙裱框感）
    border: 2px solid var(--ink-frame-outer);
    padding: 3px;
    border-radius: 0;
  }

  &__gcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--gcard-bg);
    border: 1px solid var(--ink-frame-inner);
    overflow: hidden;
  }

  &__gcard-wm {
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 36px;
    font-weight: 900;

    // 使用 display 用字體增加東方感
    font-family: var(--font-display);
    color: rgba(47, 125, 94, 0.08);
    letter-spacing: 0.05em;
    pointer-events: none;
    z-index: 1;
  }

  &__gcard-label {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &__gcard-big {
    font-size: 22px;
    font-weight: 900;
    font-family: var(--font-display);
    color: var(--text-primary);

    // 左側墨竹 accent bar
    border-left: 3px solid var(--card-label-bar);
    padding-left: 10px;
    white-space: nowrap;
    letter-spacing: 1px;
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 10px;
    color: var(--card-sub);
    letter-spacing: 0.12em;
    margin: 6px 0 0 13px;
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
    border-top: 2px solid rgba(47, 125, 94, 0.2);
    backdrop-filter: blur(6px);
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

      .noya-ink-m__nav-label {
        color: var(--color-primary);
        font-weight: 700;
        font-family: var(--font-display);
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

    // 凸出球：硃砂印章圓形
    border: 3px solid var(--bg-base);
    box-shadow: 0 6px 18px rgba(200, 67, 46, 0.4);
    color: var(--text-on-primary);
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
    font-family: var(--font-display);
  }
}

// ===== KEYFRAMES =====
@keyframes noya-ink-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-ink-cards-in {
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
