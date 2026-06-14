<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { heroSrc, LOBBY_CATEGORIES, LOBBY_SECTIONS } from "./_data";

/**
 * noya-dawn（蜜桃晨曦）手機版
 *
 * 設計主軸：近白米暖底（light theme），蜜桃晨曦 accent
 * 左側分類（精緻重點）：圓角卡片按鈕
 *   - 上方圓形 icon 徽章、下方 label，垂直堆疊
 *   - active = 蜜桃 tint 底 + 上浮陰影（translateY + shadow）
 * 右側頁面：
 *   - 最上方 1 張精選大卡（封面 + 標題覆層）
 *   - 下方垂直 list（左縮圖 + 中標題/英文副標 + 右「進入」膠囊按鈕）
 *
 * Logo 接線：走 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類（預設 live） */
const activeCat = ref<string>("live");
const section = computed(() => LOBBY_SECTIONS[activeCat.value]);
</script>

<template>
  <div class="noya-dawn-m">
    <div class="noya-dawn-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-dawn-m__header">
        <div class="noya-dawn-m__brand">
          <img class="noya-dawn-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-dawn-m__head-right">
          <span class="noya-dawn-m__pill noya-dawn-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-dawn-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-dawn-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- Announcement marquee -->
      <div class="noya-dawn-m__notice">
        <Icon
          class="noya-dawn-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-dawn-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-dawn-m__strip">
        <div class="noya-dawn-m__online">在線人數：<b>3063</b></div>
        <div class="noya-dawn-m__quick">
          <div
            v-for="qa in [
              {
                key: 'deposit',
                label: '存款',
                icon: 'material-symbols:credit-card-outline'
              },
              {
                key: 'withdraw',
                label: '取款',
                icon: 'material-symbols:account-balance-outline'
              },
              {
                key: 'msg',
                label: '消息',
                icon: 'material-symbols:notifications-outline'
              }
            ]"
            :key="qa.key"
            class="noya-dawn-m__qa"
          >
            <span class="noya-dawn-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-dawn-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby：左側圓角卡片按鈕欄 + 右側精選+列表 -->
      <div class="noya-dawn-m__lobby">
        <!-- 左側分類（圓角卡片按鈕，icon 徽章 + label 垂直堆疊） -->
        <div class="noya-dawn-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-dawn-m__tab"
            :class="{ 'noya-dawn-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <!-- 圓形 icon 徽章 -->
            <span class="noya-dawn-m__tab-badge">
              <Icon :icon="cat.icon" />
            </span>
            <span class="noya-dawn-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側：精選大卡 + 垂直列表 -->
        <div class="noya-dawn-m__content">
          <template v-if="section">
            <!-- 精選大卡（封面 + 標題覆層） -->
            <div class="noya-dawn-m__featured">
              <img
                v-if="section.featured.img"
                class="noya-dawn-m__featured-img"
                :src="section.featured.img"
                :alt="section.featured.alt"
              />
              <div v-else class="noya-dawn-m__featured-placeholder">
                <div class="noya-dawn-m__featured-wm">
                  {{ section.featured.wm }}
                </div>
                <div class="noya-dawn-m__featured-overlay">
                  <div class="noya-dawn-m__featured-big">
                    {{ section.featured.big }}
                  </div>
                  <div class="noya-dawn-m__featured-sub">
                    {{ section.featured.sub }}
                  </div>
                </div>
              </div>
              <!-- 精選標籤 -->
              <span class="noya-dawn-m__featured-tag">精選推薦</span>
              <!-- 進入按鈕 -->
              <span class="noya-dawn-m__featured-enter">立即進入</span>
            </div>

            <!-- 垂直列表（左縮圖 + 中標題副標 + 右進入按鈕） -->
            <div class="noya-dawn-m__list">
              <div
                v-for="(item, idx) in section.list"
                :key="idx"
                class="noya-dawn-m__list-item"
              >
                <!-- 縮圖 -->
                <div class="noya-dawn-m__list-thumb">
                  <img v-if="item.img" :src="item.img" :alt="item.alt" />
                  <div v-else class="noya-dawn-m__list-thumb-placeholder">
                    <Icon icon="material-symbols:casino-outline" />
                  </div>
                </div>
                <!-- 文字 -->
                <div class="noya-dawn-m__list-info">
                  <div class="noya-dawn-m__list-big">{{ item.big }}</div>
                  <div class="noya-dawn-m__list-sub">{{ item.sub }}</div>
                </div>
                <!-- 進入按鈕 -->
                <span class="noya-dawn-m__list-enter">進入</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom nav（中間「首頁」凸出） -->
    <nav class="noya-dawn-m__tabbar">
      <div
        v-for="t in [
          {
            key: 'promo',
            label: '優惠活動',
            icon: 'material-symbols:local-activity-outline'
          },
          {
            key: 'service',
            label: '在線客服',
            icon: 'material-symbols:chat-outline'
          },
          {
            key: 'home',
            label: '首頁',
            icon: 'material-symbols:home',
            center: true
          },
          { key: 'app', label: 'APP下載', icon: 'material-symbols:download' },
          {
            key: 'me',
            label: '個人中心',
            icon: 'material-symbols:person-outline'
          }
        ]"
        :key="t.key"
        class="noya-dawn-m__nav"
        :class="{ 'noya-dawn-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-dawn-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-dawn-m__nav-ic" :icon="t.icon" />
        <span class="noya-dawn-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-dawn-m {
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
    color: var(--text-muted);
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(240, 150, 100, 0.7);
      box-shadow: 0 4px 14px rgba(220, 100, 50, 0.3);
      color: #ffffff;
    }
  }

  // Hero
  &__hero {
    position: relative;
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

  // Notice
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 14px 14px 0;
    padding: 11px 16px;
    border-radius: 14px;
    background: var(--notice-bg);
    border: 1px solid var(--border);
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
      color: var(--ink-soft);
      white-space: nowrap;
      will-change: transform;
      animation: noya-dawn-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
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
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    color: var(--color-primary);
    font-size: 26px;
  }

  &__qa-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
  }

  // Lobby：左側卡片按鈕欄 + 右側精選+列表
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 12px 14px 0;
    align-items: flex-start;
  }

  // 左側分類（圓角卡片按鈕，垂直堆疊）
  &__tabs {
    width: 72px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 2px;
  }

  // 圓角卡片按鈕：icon 徽章 + label，active = tint + 上浮
  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 6px 10px;
    border-radius: 16px;
    cursor: pointer;
    color: var(--ink-mute);
    border: 1px solid transparent;
    background: transparent;
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease;

    &--on {
      background: var(--tab-active-bg);
      border-color: var(--border);

      // 上浮陰影，凸顯 active 狀態
      box-shadow:
        0 -4px 14px rgba(240, 130, 88, 0.22),
        0 4px 12px rgba(200, 80, 30, 0.1);
      transform: translateY(-3px);

      .noya-dawn-m__tab-badge {
        background: var(--gradient-cta);
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(220, 100, 50, 0.4);
      }

      .noya-dawn-m__tab-label {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // 圓形 icon 徽章
  // stylelint-disable-next-line no-descending-specificity
  &__tab-badge {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--glass);
    border: 1px solid var(--border);
    color: var(--ink-mute);
    font-size: 24px;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-mute);
    white-space: nowrap;
    transition: color 0.18s ease;
  }

  // 右側內容區
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    animation: noya-dawn-content-in 0.28s ease;
  }

  // 精選大卡
  &__featured {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  &__featured-img {
    width: 100%;
    height: auto;
    display: block;
  }

  // 精選佔位卡（其他分類用）
  &__featured-placeholder {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 340;
    background: var(--gcard-bg);
    border-radius: 16px;
    overflow: hidden;
  }

  &__featured-wm {
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 52px;
    font-weight: 900;
    font-style: italic;
    color: rgba(240, 130, 88, 0.1);
    pointer-events: none;
    line-height: 0.9;
  }

  &__featured-overlay {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__featured-big {
    font-size: 26px;
    font-weight: 900;
    color: var(--text-primary);
    border-left: 3px solid var(--card-label-bar);
    padding-left: 12px;
    white-space: nowrap;
  }

  &__featured-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 11px;
    color: var(--card-sub);
    letter-spacing: 0.14em;
    margin: 6px 0 0 15px;
  }

  // 精選標籤（左上角）
  &__featured-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    background: var(--gradient-cta);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(220, 100, 50, 0.4);
    z-index: 4;
  }

  // 精選進入按鈕（右下角）
  &__featured-enter {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.9);
    color: var(--color-primary);
    border: 1px solid var(--border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 4;
    cursor: pointer;
  }

  // 垂直列表
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 14px;
    background: var(--glass);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  // 縮圖
  &__list-thumb {
    width: 54px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    flex: none;
    background: var(--gcard-bg);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__list-thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    font-size: 22px;
    opacity: 0.6;
  }

  // 文字
  &__list-info {
    flex: 1;
    min-width: 0;
  }

  &__list-big {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__list-sub {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    font-weight: 600;
    color: var(--ink-mute);
    letter-spacing: 0.1em;
    margin-top: 2px;
    white-space: nowrap;
  }

  // 進入按鈕（膠囊）
  &__list-enter {
    flex: none;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    background: var(--gradient-cta);
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(220, 100, 50, 0.3);
    white-space: nowrap;
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
    border-top: 1px solid var(--border);
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

      .noya-dawn-m__nav-label {
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
    border: 3px solid var(--bg-base);
    box-shadow:
      0 8px 20px rgba(220, 100, 50, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.5);
    color: #ffffff;
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}

@keyframes noya-dawn-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-dawn-content-in {
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
