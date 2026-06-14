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
 * noya-bookmark（書籤摺角標籤）手機版
 *
 * 移植設計稿 ly8 書籤箭頭標籤版型：
 *   - 左側按鈕：書籤箭頭 clip-path polygon(0 0,86% 0,100% 50%,86% 100%,0 100%)
 *   - 指向右側卡片，預設 margin-right:10px
 *   - 選中時 margin-right:0 外推貼齊 + 暗金漸層白字發光
 *   - 右卡片：border-radius:15px，g-tag 角標貼右上角 border-radius:0 0 0 11px
 *
 * 完整頁面：header / hero / 公告 / 在線+快捷 / 遊戲大廳（ly8）/ 底部 tabbar
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/** 當前分類，預設 live */
const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-bookmark-m">
    <div class="noya-bookmark-m__app">
      <!-- Header：logo + 登入/註冊 pill -->
      <header class="noya-bookmark-m__header">
        <div class="noya-bookmark-m__brand">
          <img class="noya-bookmark-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-bookmark-m__head-right">
          <span class="noya-bookmark-m__pill noya-bookmark-m__pill--solid">
            會員登入
          </span>
          <span class="noya-bookmark-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-bookmark-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 視訊實名制體驗金" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-bookmark-m__notice">
        <Icon
          class="noya-bookmark-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-bookmark-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- 在線人數 + 快捷功能 -->
      <div class="noya-bookmark-m__strip">
        <div class="noya-bookmark-m__online">在線人數：<b>3063</b></div>
        <div class="noya-bookmark-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-bookmark-m__qa"
          >
            <span class="noya-bookmark-m__qa-ico">
              <Icon :icon="qa.icon" />
            </span>
            <span class="noya-bookmark-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- 遊戲大廳：ly8 書籤箭頭標籤 -->
      <!-- 對齊 ly8：padding:16px 0 16px 14px; gap:6px -->
      <div class="noya-bookmark-m__lobby">
        <!-- 左側：書籤箭頭標籤按鈕 -->
        <div class="noya-bookmark-m__rail">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-bookmark-m__cat"
            :class="{ 'noya-bookmark-m__cat--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <span class="noya-bookmark-m__cat-ic">
              <Icon :icon="cat.icon" />
            </span>
            <span class="noya-bookmark-m__cat-lb">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側：遊戲卡（15px 圓角，g-tag 貼右上角） -->
        <div class="noya-bookmark-m__cards">
          <article v-for="(c, i) in cards" :key="i" class="noya-bookmark-m__g">
            <!-- 三層合成背景 -->
            <div class="noya-bookmark-m__g-bg"></div>
            <!-- 裝飾圓點 -->
            <div class="noya-bookmark-m__g-deco">
              <i></i>
              <i></i>
            </div>
            <!-- 角標：ly8 特有貼右上角 border-radius:0 0 0 11px -->
            <span v-if="c.tag" class="noya-bookmark-m__g-tag">
              {{ c.tag }}
            </span>
            <!-- 左側文字層 -->
            <div class="noya-bookmark-m__g-txt">
              <h4>{{ c.big || c.alt?.split(" ")[0] }}</h4>
              <div class="noya-bookmark-m__g-en">
                {{ c.sub || c.alt?.split(" ").slice(1).join(" ") }}
              </div>
              <span class="noya-bookmark-m__g-cta">立即進入 ›</span>
            </div>
            <!-- 右側人物/場景圖 -->
            <div class="noya-bookmark-m__g-fig">
              <img
                v-if="c.img"
                :src="c.img"
                :alt="c.alt"
                class="noya-bookmark-m__g-img"
              />
              <div v-else class="noya-bookmark-m__ph">
                <span>真人視訊 · LIVE</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- 底部 tabbar（5 格，中間首頁凸出） -->
    <nav class="noya-bookmark-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-bookmark-m__nav"
        :class="{ 'noya-bookmark-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-bookmark-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-bookmark-m__nav-ic" :icon="t.icon" />
        <span class="noya-bookmark-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-bookmark-m {
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
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    white-space: nowrap;

    &--solid {
      background: var(--gradient-cta);
      border-color: transparent;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(154, 125, 58, 0.4);
    }
  }

  // ===== Hero =====
  &__hero {
    position: relative;
    margin: 6px 14px 0;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    line-height: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  // ===== 公告 =====
  &__notice {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 14px 14px 0;
    padding: 11px 16px;
    border-radius: 14px;
    background: var(--notice-bg);
    border: 1px solid var(--line);
    overflow: hidden;
  }

  &__notice-horn {
    flex: none;
    color: var(--acc);
    font-size: 20px;
  }

  &__notice-track {
    overflow: hidden;
    flex: 1;

    // stylelint-disable-next-line no-descending-specificity
    p {
      font-size: 13.5px;
      color: var(--text-muted);
      white-space: nowrap;
      will-change: transform;
      animation: noya-bookmark-marquee 18s linear infinite;

      // stylelint-disable-next-line no-descending-specificity
      b {
        color: var(--acc);
        font-weight: 700;
      }
    }
  }

  // ===== 在線人數 + 快捷 =====
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px 20px 6px;
  }

  &__online {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-muted);

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
    box-shadow:
      0 6px 16px rgba(100, 80, 30, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
    color: var(--acc);
    font-size: 26px;
  }

  &__qa-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
  }

  // ===== 遊戲大廳（ly8 書籤箭頭） =====
  // 對齊 ly8：padding:16px 0 16px 14px; gap:6px
  &__lobby {
    display: flex;
    gap: 6px;
    padding: 16px 0 16px 14px;
    align-items: flex-start;
  }

  // 左側書籤欄（ly8 rail width:108px）
  &__rail {
    width: 108px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  // 書籤箭頭按鈕（ly8：clip-path 箭頭指向右側）
  &__cat {
    display: flex;
    align-items: center;
    gap: 9px;

    // 對齊 ly8 padding:12px 12px 12px 14px
    padding: 12px 12px 12px 14px;
    background: var(--bookmark-bg);

    // ly8 大圓角左側 + 右側箭頭（clip-path 覆蓋右邊緣 border-radius）
    border-radius: 13px 0 0 13px;

    // 書籤箭頭 clip-path：指向右側卡片
    clip-path: polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%);
    box-shadow: var(--bookmark-border);

    // 預設 margin-right:10px（選中時改為 0，外推貼齊）
    margin-right: 10px;
    color: var(--mut);
    cursor: pointer;
    font-family: inherit;
    transition:
      margin-right 0.18s ease,
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;

    // 選中：暗金漸層白字 + margin-right:0 外推貼齊卡片 + 發光
    &--on {
      background: var(--bookmark-on-bg);
      color: #ffffff;

      // margin-right 改為 0，書籤外推貼齊右側卡片區
      margin-right: 0;
      box-shadow: var(--bookmark-on-shadow);

      .noya-bookmark-m__cat-ic {
        color: #ffffff;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__cat-ic {
    display: grid;
    place-items: center;
    flex: none;
    font-size: 20px;
    color: var(--mut);
    transition: color 0.18s;
  }

  &__cat-lb {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  // 右側遊戲卡（ly8 border-radius:15px）
  // ly8：cards 有 padding-right:14px
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    padding-right: 14px;
    animation: noya-bookmark-cards-in 0.28s ease;
  }

  // 遊戲卡（三層合成，ly8 圓角 15px）
  &__g {
    position: relative;
    border-radius: 15px; // ly8 較小圓角（對比 ly7 的 24px）
    overflow: hidden;
    aspect-ratio: 2.6 / 1;
    min-height: 82px;
    isolation: isolate;
    box-shadow: 0 10px 22px -10px rgba(100, 80, 30, 0.35);
  }

  // 背景層
  &__g-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--gcard-bg);
  }

  // 裝飾圓點
  &__g-deco {
    i {
      position: absolute;
      z-index: 1;
      border-radius: 50%;
      background: color-mix(in oklab, var(--acc), #ffffff 55%);
      opacity: 0.5;

      &:first-child {
        width: 30px;
        height: 30px;
        right: 32%;
        top: 14%;
      }

      &:last-child {
        width: 14px;
        height: 14px;
        right: 50%;
        bottom: 18%;
        opacity: 0.35;
      }
    }
  }

  // 文字層
  &__g-txt {
    position: absolute;
    left: 6.5%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    max-width: 56%;

    // stylelint-disable-next-line no-descending-specificity
    h4 {
      font-size: clamp(14px, 4.6cqw, 22px);
      font-weight: 900;
      color: var(--acc);
      line-height: 1.05;
      white-space: nowrap;
    }
  }

  &__g-en {
    font-family: ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    color: var(--mut);
    margin-top: 4px;
    text-transform: uppercase;
  }

  &__g-cta {
    display: inline-block;
    margin-top: 9px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    background: var(--acc);
    padding: 5px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  // 角標（ly8 特有：貼右上角，border-radius:0 0 0 11px 折角效果）
  &__g-tag {
    position: absolute;
    right: 0; // ly8：right:0 top:0 貼右上角
    top: 0;
    z-index: 4;
    font-family: ui-monospace, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #ffffff;
    background: color-mix(in oklab, var(--acc), #000000 8%);
    padding: 3px 7px;
    border-radius: 0 0 0 11px; // ly8 折角：只左下圓角
  }

  // 右側人物圖層
  &__g-fig {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 46%;
    z-index: 2;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(90deg, var(--soft) 0%, transparent 44%);
    }
  }

  &__g-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: repeating-linear-gradient(
      135deg,
      color-mix(in oklab, var(--acc), transparent 78%) 0 7px,
      color-mix(in oklab, var(--acc), transparent 90%) 7px 14px
    );

    span {
      font-family: ui-monospace, monospace;
      font-size: 8.5px;
      letter-spacing: 0.12em;
      color: color-mix(in oklab, var(--acc), var(--ink) 30%);
      text-align: center;
      padding: 0 6px;
    }
  }

  // ===== 底部 tabbar =====
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
    border-top: 1px solid var(--line);
    backdrop-filter: blur(10px);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: var(--mut);

    &--center {
      margin-top: -22px;

      .noya-bookmark-m__nav-label {
        color: var(--acc);
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
    border: 3px solid var(--page);
    box-shadow:
      0 8px 20px rgba(154, 125, 58, 0.45),
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

// ===== 動畫 =====
@keyframes noya-bookmark-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-bookmark-cards-in {
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
