<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  headRightSrc,
  noticeSrc,
  actionsSrc,
  navSrc,
  LOBBY_CATEGORIES,
  LOBBY_CARDS
} from "./_data";

/**
 * noya-beige（諾亞米色）手機版 — 1:1 忠實復刻 諾亞_版型探索_米色_自包含.html
 *
 * 對齊原稿 app 結構（max-width 480px）：
 *   header（logo + headright 切片）/ hero banner + dots /
 *   notice 公告切片 / strip（在線人數 + actions 切片）/
 *   lobby（左 5 分類 tab + 右卡片列）/ 底部 tabbar 切片
 *
 * 忠實還原規約：版面結構對齊原稿，BEM 本地化（noya-beige-m__*），
 * 不加原稿沒有的元素；原稿用圖片切片排版，這裡照樣用同批素材切片。
 *
 * Logo 接線：header 左側品牌不寫死，改走 themeStore.currentLogo
 * （讓 showcase / demo logo 切換器能換 logo）；原稿 logo.png 改由 store 提供，
 * 其餘 headright / notice / actions / nav 切片忠實沿用。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類（對齊原稿預設 live） */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-beige-m">
    <div class="noya-beige-m__app">
      <!-- Header：logo（走 store）+ headright 切片 -->
      <header class="noya-beige-m__header">
        <img class="noya-beige-m__logo" :src="logoSrc" :alt="logoLabel" />
        <img
          class="noya-beige-m__headright"
          :src="headRightSrc"
          alt="會員登入 會員註冊"
        />
      </header>

      <!-- Hero banner + dots -->
      <section class="noya-beige-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000" />
        <div class="noya-beige-m__dots">
          <i class="noya-beige-m__dot noya-beige-m__dot--on"></i>
          <i class="noya-beige-m__dot"></i>
          <i class="noya-beige-m__dot"></i>
        </div>
      </section>

      <!-- Announcement -->
      <div class="noya-beige-m__notice">
        <img
          :src="noticeSrc"
          alt="【系統公告】自 5/1 起，ATM 存款最低金額將調整為 300 元"
        />
      </div>

      <!-- Online count + quick actions -->
      <div class="noya-beige-m__strip">
        <div class="noya-beige-m__online">在線人數：<b>3063</b></div>
        <img
          class="noya-beige-m__actions"
          :src="actionsSrc"
          alt="存款 取款 消息"
        />
      </div>

      <!-- Lobby：左分類 tab + 右卡片列 -->
      <div class="noya-beige-m__lobby">
        <div class="noya-beige-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-beige-m__tab"
            :class="{ 'noya-beige-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-beige-m__tab-ic" :icon="cat.icon" />
            <span class="noya-beige-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <div class="noya-beige-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實 banner 切片卡 -->
            <img
              v-if="c.img"
              class="noya-beige-m__gcard"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 佔位卡（無素材分類，忠實復刻原稿 phcard） -->
            <div v-else class="noya-beige-m__phcard">
              <div class="noya-beige-m__phcard-slot">
                <span>GAME IMAGE</span>
              </div>
              <div class="noya-beige-m__phcard-label">
                <div class="noya-beige-m__phcard-big">{{ c.big }}</div>
                <div class="noya-beige-m__phcard-sub">{{ c.sub }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Bottom nav 切片（固定） -->
    <nav class="noya-beige-m__tabbar">
      <img :src="navSrc" alt="優惠活動 在線客服 首頁 APP下載 個人中心" />
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-beige-m {
  background: var(--bg-base);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  justify-content: center;

  &__app {
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    background: var(--bg-base);
    position: relative;
    padding-bottom: 92px;
    overflow: hidden;
  }

  // Header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 10px;
  }

  &__logo {
    height: 36px;
    width: auto;
    object-fit: contain;
  }

  &__headright {
    height: 42px;
    width: auto;
  }

  // Hero
  &__hero {
    margin: 4px 14px 0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--hero-shadow);
    position: relative;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
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
    background: rgba(170, 110, 72, 0.45);
    display: block;

    &--on {
      width: 18px;
      border-radius: 3px;
      background: var(--color-primary);
    }
  }

  // Notice
  &__notice {
    margin: 14px 14px 0;

    img {
      width: 100%;
      height: auto;
    }
  }

  // Strip
  &__strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 4px;
  }

  &__online {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-muted);

    b {
      color: var(--online-num);
      font-weight: 700;
    }
  }

  &__actions {
    width: 205px;
    height: auto;
  }

  // Lobby
  &__lobby {
    display: flex;
    gap: 12px;
    padding: 10px 14px 0;
    align-items: flex-start;
  }

  &__tabs {
    width: 90px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding-top: 2px;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 5px 9px 9px;
    border-radius: 15px;
    cursor: pointer;
    border: 0;
    background: transparent;
    color: var(--tab-text);
    transition: background 0.15s ease;

    &--on {
      border-radius: 18px;
      background: var(--tab-active-bg);
      box-shadow: var(--tab-active-shadow);

      .noya-beige-m__tab-ic {
        color: var(--tab-icon-active);
      }

      .noya-beige-m__tab-label {
        color: var(--tab-text-active);
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 25px;
    flex: none;
    color: var(--tab-icon);
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    animation: noya-beige-cards-in 0.28s ease;
  }

  &__gcard {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: var(--gcard-shadow);
  }

  // 佔位卡（對齊原稿 phcard）
  &__phcard {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 215;
    border-radius: 16px;
    overflow: hidden;
    background: var(--phcard-bg);
    box-shadow: var(--shadow);
  }

  &__phcard-slot {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 52%;
    background: repeating-linear-gradient(
      45deg,
      #f7e7da 0 9px,
      #fbefe6 9px 18px
    );
    display: flex;
    align-items: center;
    justify-content: center;
    mask: linear-gradient(90deg, transparent, #000000 28%);

    span {
      font-family: ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      color: #c39e89;
    }
  }

  &__phcard-label {
    position: absolute;
    left: 6%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__phcard-big {
    font-size: clamp(18px, 5vw, 24px);
    font-weight: 700;
    font-style: italic;
    color: var(--phcard-label);
    letter-spacing: 0.01em;
    white-space: nowrap;
    border-left: 3px solid var(--phcard-label-bar);
    padding-left: 10px;
    line-height: 1.1;
  }

  &__phcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 600;
    font-size: 11px;
    color: var(--phcard-sub);
    letter-spacing: 0.12em;
    margin: 4px 0 0 13px;
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
    filter: var(--tabbar-shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

@keyframes noya-beige-cards-in {
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
