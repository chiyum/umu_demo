<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  hotGameSrc,
  GAME_CARDS,
  SERVICE_CARDS,
  TICKER_MESSAGES,
  LOBBY_CATEGORIES
} from "./_data";

/**
 * fuyou（富遊大亨）手機版 — 「新做」的 app 式佈局
 *
 * 來源稿（大亨_富遊_clone）本身是桌機優先設計，依任務規約：
 *   「電腦版設計稿 → 參考兩份諾亞手機版的 app 佈局補做 mobile」
 * 故 mobile 結構參考諾亞米色 / 諾亞藍的 app 式佈局：
 *   app(max 480) / header(logo + 登入註冊) / hero banner + dots /
 *   公告跑馬燈 / 在線人數 + 快捷 / 大廳（左分類 tab + 右卡片列）/ 底部 tabbar
 * 但「配色與內容沿用富遊自己的深藍金調性」：
 *   - 深藍金底（[data-theme="fuyou"] var）
 *   - 內容沿用富遊：熱門遊戲卡 / RG APP / 頂尖服務文案
 *
 * Logo 接線：header 顯示 themeStore.currentLogo，不寫死品牌。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

/** 當前大廳分類（純前端互動） */
const activeCat = ref<string>("hot");

/** 公告跑馬燈複製一輪做無縫滾動 */
const tickerLoop = computed(() => [...TICKER_MESSAGES, ...TICKER_MESSAGES]);

/** 底部 5 tab（中間「首頁」放大凸出，對齊諾亞藍的 center badge 概念） */
const bottomTabs = [
  {
    key: "promo",
    label: "優惠活動",
    icon: "material-symbols:local-activity-outline"
  },
  { key: "service", label: "在線客服", icon: "material-symbols:chat-outline" },
  { key: "home", label: "首頁", icon: "material-symbols:home", center: true },
  { key: "app", label: "APP下載", icon: "material-symbols:download" },
  { key: "me", label: "個人中心", icon: "material-symbols:person-outline" }
];
</script>

<template>
  <div class="fuyou-m-layout">
    <div class="fuyou-m-app">
      <!-- Header：logo + 登入註冊 -->
      <header class="fuyou-m-header">
        <img
          class="fuyou-m-header__logo"
          :class="{ 'fuyou-m-header__logo--blend': useScreenBlend }"
          :src="logoSrc"
          :alt="logoLabel"
        />
        <div class="fuyou-m-header__right">
          <span class="fuyou-m-header__btn fuyou-m-header__btn--solid">
            會員登入
          </span>
          <span class="fuyou-m-header__btn">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner + dots -->
      <section class="fuyou-m-hero">
        <img class="fuyou-m-hero__img" :src="heroSrc" alt="富遊主視覺" />
        <div class="fuyou-m-hero__dots">
          <i class="fuyou-m-hero__dot fuyou-m-hero__dot--on"></i>
          <i class="fuyou-m-hero__dot"></i>
          <i class="fuyou-m-hero__dot"></i>
        </div>
      </section>

      <!-- 公告跑馬燈 -->
      <div class="fuyou-m-notice">
        <Icon
          class="fuyou-m-notice__horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="fuyou-m-notice__track">
          <span
            v-for="(msg, i) in tickerLoop"
            :key="i"
            class="fuyou-m-notice__item"
          >
            {{ msg }}
          </span>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="fuyou-m-strip">
        <div class="fuyou-m-strip__online">在線人數：<b>3063</b></div>
        <div class="fuyou-m-strip__quick">
          <span class="fuyou-m-strip__qa">
            <Icon icon="material-symbols:account-balance-wallet-outline" />
            <em>存款</em>
          </span>
          <span class="fuyou-m-strip__qa">
            <Icon icon="material-symbols:payments-outline" />
            <em>取款</em>
          </span>
        </div>
      </div>

      <!-- 大廳：左分類 tab + 右卡片列 -->
      <div class="fuyou-m-lobby">
        <div class="fuyou-m-tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="fuyou-m-tab"
            :class="{ 'fuyou-m-tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="fuyou-m-tab__ic" :icon="cat.icon" />
            <span class="fuyou-m-tab__label">{{ cat.label }}</span>
          </button>
        </div>

        <div class="fuyou-m-cards">
          <!-- 熱門遊戲主視覺大卡 -->
          <div class="fuyou-m-banner-card">
            <img :src="hotGameSrc" alt="熱門遊戲" />
          </div>
          <!-- 富遊熱門遊戲卡片（取 _data 前 6 張，2 欄） -->
          <div class="fuyou-m-game-grid">
            <div
              v-for="(g, i) in GAME_CARDS.slice(0, 6)"
              :key="i"
              class="fuyou-m-game-card"
            >
              <span v-if="g.badge" class="fuyou-m-game-card__badge">
                {{ g.badge }}
              </span>
              <span v-if="g.rg" class="fuyou-m-game-card__rg">
                <i>RG</i><em>{{ g.rgLabel }}</em>
              </span>
              <template v-else>
                <span class="fuyou-m-game-card__logo">{{ g.wm }}</span>
                <span class="fuyou-m-game-card__name">{{ g.name }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- RG APP 下載條 -->
      <section class="fuyou-m-download">
        <div class="fuyou-m-download__rgapp">RG APP</div>
        <div class="fuyou-m-download__anytime">隨時隨地</div>
        <p class="fuyou-m-download__desc">
          富遊娛樂城支持所有移動裝置，立即下載，隨時隨地享受最暢快的遊戲體驗。
        </p>
        <span class="fuyou-m-download__cta">立即下載</span>
      </section>

      <!-- 頂尖服務 3 卡 -->
      <section class="fuyou-m-services">
        <div v-for="svc in SERVICE_CARDS" :key="svc.title" class="fuyou-m-svc">
          <div class="fuyou-m-svc__ic"><Icon :icon="svc.icon" /></div>
          <div class="fuyou-m-svc__title">{{ svc.title }}</div>
        </div>
      </section>
    </div>

    <!-- 底部 tabbar（固定） -->
    <nav class="fuyou-m-tabbar">
      <div
        v-for="t in bottomTabs"
        :key="t.key"
        class="fuyou-m-tabbar__item"
        :class="{ 'fuyou-m-tabbar__item--center': t.center }"
      >
        <span v-if="t.center" class="fuyou-m-tabbar__badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="fuyou-m-tabbar__ic" :icon="t.icon" />
        <span class="fuyou-m-tabbar__label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.fuyou-m-layout {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.fuyou-m-app {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background: radial-gradient(
      120% 60% at 50% -8%,
      var(--bg-overlay) 0%,
      transparent 60%
    ),
    var(--bg-base);
  position: relative;
  padding-bottom: 96px;
  overflow: hidden;
}

// Header
.fuyou-m-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px 10px;

  &__logo {
    height: 36px;
    width: auto;
    object-fit: contain;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  &__btn {
    font-size: 14px;
    font-weight: 700;
    color: #dbeaff;
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--bg-overlay);
    white-space: nowrap;

    &--solid {
      background: linear-gradient(180deg, #3f8ae8, #2767c4);
      border-color: rgba(150, 200, 255, 0.7);
      box-shadow: 0 4px 14px rgba(40, 104, 210, 0.5);
      color: #ffffff;
    }
  }
}

// Hero
.fuyou-m-hero {
  position: relative;
  margin: 4px 14px 0;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(8, 28, 60, 0.55);
  line-height: 0;

  &__img {
    width: 100%;
    height: auto;
    display: block;
  }

  &__dots {
    position: absolute;
    left: 6.5%;
    bottom: 7%;
    display: flex;
    gap: 6px;
    align-items: center;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(150, 195, 255, 0.45);
    display: block;

    &--on {
      width: 18px;
      border-radius: 3px;
      background: var(--color-secondary);
    }
  }
}

// 公告
.fuyou-m-notice {
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 14px 14px 0;
  padding: 11px 16px;
  border-radius: 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  overflow: hidden;

  &__horn {
    flex: none;
    color: var(--color-secondary);
    font-size: 20px;
  }

  &__track {
    overflow: hidden;
    flex: 1;
    display: flex;
    white-space: nowrap;
    will-change: transform;
    animation: fuyou-m-marquee 22s linear infinite;
  }

  &__item {
    padding: 0 26px;
    font-size: 13.5px;
    color: var(--text-muted);
  }
}

@keyframes fuyou-m-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

// 在線人數 + 快捷
.fuyou-m-strip {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 20px 6px;

  &__online {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-muted);

    b {
      color: var(--color-secondary);
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
    gap: 5px;
    color: var(--text-muted);
    font-size: 22px;

    em {
      font-style: normal;
      font-size: 13px;
    }
  }
}

// 大廳
.fuyou-m-lobby {
  display: flex;
  gap: 12px;
  padding: 12px 14px 0;
  align-items: flex-start;
}

.fuyou-m-tabs {
  width: 90px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 2px;
}

.fuyou-m-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 6px 11px 11px;
  border-radius: 16px;
  cursor: pointer;
  color: var(--text-muted);
  border: 1px solid transparent;
  background: transparent;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &__ic {
    font-size: 24px;
    flex: none;
  }

  &__label {
    font-size: 16px;
    font-weight: 500;
  }

  &--on {
    color: var(--text-primary);
    background: linear-gradient(
      150deg,
      var(--bg-overlay),
      rgba(30, 74, 150, 0.4)
    );
    border-color: var(--border);
    box-shadow: 0 6px 18px rgba(40, 104, 210, 0.35);

    .fuyou-m-tab__ic {
      color: var(--color-secondary);
    }

    .fuyou-m-tab__label {
      font-weight: 700;
    }
  }
}

.fuyou-m-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.fuyou-m-banner-card {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 10px 26px rgba(8, 28, 60, 0.5);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.fuyou-m-game-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.fuyou-m-game-card {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  overflow: hidden;
  background: var(--game-card-bg);
  border: 1px solid var(--card-edge);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &__badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--badge-bg);
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 10px 3px;
    border-radius: 0 0 8px 8px;
    white-space: nowrap;
  }

  &__logo {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: 20px;
    color: #ffffff;
    margin-top: 8px;
  }

  &__name {
    font-size: 13px;
    font-weight: 700;
    color: #dcebff;
  }

  &__rg {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    margin-top: 6px;

    i {
      font-family: var(--font-display);
      font-style: italic;
      font-weight: 800;
      font-size: 22px;
      background: var(--rg-red);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    em {
      font-style: normal;
      font-size: 10px;
      letter-spacing: 1px;
      color: #cfe0fb;
      margin-top: 2px;
    }
  }
}

// 下載條
.fuyou-m-download {
  margin: 18px 14px 0;
  padding: 22px 18px;
  border-radius: 16px;
  text-align: center;
  background: var(--bg-surface);
  border: 1px solid var(--border);

  &__rgapp {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: 34px;
    color: #ffffff;
  }

  &__anytime {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 3px;
    margin: 4px 0 10px;
  }

  &__desc {
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.7;
  }

  &__cta {
    display: inline-block;
    margin-top: 14px;
    padding: 10px 28px;
    border-radius: 999px;
    background: var(--gradient-cta);
    color: var(--text-on-cta);
    font-weight: 900;
    box-shadow: 0 4px 12px rgba(255, 180, 40, 0.45);
  }
}

// 服務
.fuyou-m-services {
  display: flex;
  gap: 10px;
  padding: 18px 14px 0;
}

.fuyou-m-svc {
  flex: 1;
  padding: 16px 8px;
  border-radius: 14px;
  text-align: center;
  background: var(--svc-card-bg);
  border: 1px solid var(--card-edge);

  &__ic {
    width: 48px;
    height: 48px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background: var(--svc-ic-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eaf6ff;
    font-size: 24px;
  }

  &__title {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
  }
}

// 底部 tabbar
.fuyou-m-tabbar {
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
  background: var(--nav-bg);
  border-top: 1px solid var(--border);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    color: var(--text-muted);

    &--center {
      margin-top: -22px;
    }
  }

  &__ic {
    font-size: 24px;
  }

  &__badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(160deg, #3f8ae8, #1f55ad);
    border: 3px solid var(--bg-base);
    box-shadow: 0 8px 20px rgba(40, 104, 210, 0.6);
    color: #ffffff;
    font-size: 28px;
  }

  &__label {
    font-size: 12px;
    font-weight: 500;
  }

  &__item--center &__label {
    color: var(--color-secondary);
    font-weight: 700;
  }
}
</style>
