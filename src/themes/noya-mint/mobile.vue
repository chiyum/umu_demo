<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  LOBBY_CATEGORIES,
  LOBBY_CARDS,
  QUICK_ACTIONS,
  BOTTOM_TABS,
  POPULAR_RANK
} from "./_data";

/**
 * noya-mint（薄荷清新）手機版
 *
 * 設計主軸：純白/極淺薄荷底 + 極簡 tab indicator + 扁平白卡 + 人氣榜表格
 *
 * 左側分類欄（精緻重點）：
 *   - 極簡 tab：文字 + icon 並排，無色塊背景
 *   - active 用「右緣 3px 薄荷直條 indicator」標示（box-shadow inset 右側）
 *   - active 文字變粗體（font-weight 700）
 *   - inactive 文字 ink-mute 淡顯，hover 時薄荷色
 *   - 整體乾淨俐落，不做任何大色塊
 *
 * 右側卡片：
 *   - 扁平白卡（細邊框 border、極淡陰影）
 *   - 無水印大字，改用細緻 accent bar 區隔
 *
 * 下方：人氣榜小表格（排名 / 遊戲 / 熱度 / 進入按鈕）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

const activeCat = ref<string>("live");
const cards = computed(() => LOBBY_CARDS[activeCat.value] ?? []);
</script>

<template>
  <div class="noya-mint-m">
    <div class="noya-mint-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-mint-m__header">
        <div class="noya-mint-m__brand">
          <span class="noya-mint-m__logo-mark">
            <Icon icon="material-symbols:eco-outline" />
          </span>
          <img class="noya-mint-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-mint-m__head-right">
          <span class="noya-mint-m__pill noya-mint-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-mint-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero -->
      <section class="noya-mint-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 薄荷清新視訊" />
      </section>

      <!-- Announcement -->
      <div class="noya-mint-m__notice">
        <Icon
          class="noya-mint-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-mint-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!-- Online + quick actions -->
      <div class="noya-mint-m__strip">
        <div class="noya-mint-m__online">在線人數：<b>3,063</b></div>
        <div class="noya-mint-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-mint-m__qa"
          >
            <span class="noya-mint-m__qa-ico">
              <Icon :icon="qa.icon" />
            </span>
            <span class="noya-mint-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>
      </div>

      <!-- Lobby：左極簡 tab 欄 + 右扁平白卡 -->
      <div class="noya-mint-m__lobby">
        <!-- 左側極簡 tab 欄（核心精緻設計） -->
        <div class="noya-mint-m__tabs">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-mint-m__tab"
            :class="{ 'noya-mint-m__tab--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-mint-m__tab-ic" :icon="cat.icon" />
            <span class="noya-mint-m__tab-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側扁平白卡區 -->
        <div class="noya-mint-m__cards">
          <template v-for="(c, i) in cards" :key="i">
            <!-- 真實切片卡 -->
            <img
              v-if="c.img"
              class="noya-mint-m__gfull"
              :src="c.img"
              :alt="c.alt"
            />
            <!-- 扁平白卡（極簡風 + 薄荷 accent bar） -->
            <div v-else class="noya-mint-m__gcard">
              <!-- 右側淡水印 -->
              <div class="noya-mint-m__gcard-wm">{{ c.wm }}</div>
              <!-- 標題 -->
              <div class="noya-mint-m__gcard-label">
                <div class="noya-mint-m__gcard-big">{{ c.big }}</div>
                <div class="noya-mint-m__gcard-sub">{{ c.sub }}</div>
              </div>
              <!-- 右下角薄荷進入箭頭 -->
              <span class="noya-mint-m__gcard-arrow">
                <Icon icon="material-symbols:arrow-forward" />
              </span>
            </div>
          </template>
        </div>
      </div>

      <!-- 人氣榜（noya-mint 獨有精緻表格） -->
      <div class="noya-mint-m__rank">
        <div class="noya-mint-m__rank-head">
          <Icon icon="material-symbols:local-fire-department" />
          <span>人氣榜</span>
          <span class="noya-mint-m__rank-head-sub">POPULAR GAMES</span>
        </div>
        <table class="noya-mint-m__rank-table">
          <thead>
            <tr>
              <th>排名</th>
              <th>遊戲</th>
              <th>熱度</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in POPULAR_RANK"
              :key="item.rank"
              class="noya-mint-m__rank-row"
            >
              <td>
                <span
                  class="noya-mint-m__rank-num"
                  :class="{ 'noya-mint-m__rank-num--top': item.rank <= 3 }"
                >
                  {{ item.rank }}
                </span>
              </td>
              <td>
                <div class="noya-mint-m__rank-game">
                  <span class="noya-mint-m__rank-name">{{ item.name }}</span>
                  <span class="noya-mint-m__rank-cat">{{ item.category }}</span>
                </div>
              </td>
              <td>
                <!-- 熱度條 -->
                <div class="noya-mint-m__heat-bar">
                  <div
                    class="noya-mint-m__heat-fill"
                    :style="{ width: `${item.heat}%` }"
                  ></div>
                </div>
              </td>
              <td>
                <span class="noya-mint-m__rank-btn">進入</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bottom tabbar（中間「首頁」凸出） -->
    <nav class="noya-mint-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-mint-m__nav"
        :class="{ 'noya-mint-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-mint-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-mint-m__nav-ic" :icon="t.icon" />
        <span class="noya-mint-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-mint-m {
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
    border-bottom: 1px solid var(--border);
    background: var(--bg-surface);
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // 薄荷葉 logo mark
  &__logo-mark {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background: var(--brand-mark-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 18px;
    flex-shrink: 0;
  }

  &__logo {
    height: 36px;
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
    padding: 7px 13px;
    border-radius: 999px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: transparent;
      color: var(--text-on-primary);
    }
  }

  // ===== HERO =====
  &__hero {
    position: relative;
    margin: 12px 14px 0;
    border-radius: 16px;
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

  // ===== NOTICE =====
  &__notice {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 12px 14px 0;
    padding: 10px 14px;
    border-radius: 10px;
    background: var(--notice-bg);
    border: 1px solid var(--border);
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
      color: var(--text-muted);
      white-space: nowrap;
      will-change: transform;
      animation: noya-mint-marquee 18s linear infinite;

      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // ===== STRIP =====
  &__strip {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 18px 18px 6px;
  }

  &__online {
    font-size: 14px;
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
    gap: 14px;
  }

  &__qa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  &__qa-ico {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--border);
    color: var(--color-primary);
    font-size: 22px;
  }

  &__qa-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--ink-mute);
  }

  // ===== LOBBY =====
  &__lobby {
    display: flex;
    gap: 0;
    padding: 12px 14px 0;
    align-items: flex-start;
  }

  // 左側極簡 tab 欄（精緻核心）
  &__tabs {
    width: 80px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 2px;

    // 與右側用極細分隔線區隔
    border-right: 1px solid var(--border);
    padding-right: 0;
    margin-right: 12px;
  }

  // 極簡 tab 按鈕（核心：右緣 indicator 設計）
  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 11px 8px 11px 10px;
    border-radius: 8px 0 0 8px; // 左側圓角，右側方角貼 border
    cursor: pointer;
    background: transparent;
    border: none;
    color: var(--ink-mute);
    font-size: 14px;
    font-weight: 500;
    transition:
      color 0.15s ease,
      background 0.15s ease;

    // active 樣式：右緣 3px 薄荷直條 indicator（box-shadow 模擬，右側 inset）
    // + 淡薄荷背景 + 粗體
    &--on {
      background: var(--tab-active-bg);
      color: var(--color-primary);
      font-weight: 700;

      // 用右側 border 模擬 indicator 直條（不用 box-shadow 避免溢出）
      border-right: 3px solid var(--color-primary);
      margin-right: -1px; // 補回 1px 讓位置精準

      .noya-mint-m__tab-ic {
        color: var(--color-primary);
      }

      .noya-mint-m__tab-label {
        color: var(--color-primary);
      }
    }

    &:hover:not(&--on) {
      color: var(--color-secondary);
      background: var(--bg-overlay);

      .noya-mint-m__tab-ic {
        color: var(--color-secondary);
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-ic {
    font-size: 20px;
    flex: none;
    color: var(--ink-mute);
    transition: color 0.15s;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__tab-label {
    font-size: 14px;
    transition:
      color 0.15s,
      font-weight 0.1s;
  }

  // ===== 右側扁平白卡 =====
  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    animation: noya-mint-cards-in 0.25s ease;
  }

  &__gfull {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
  }

  // 扁平白卡（極簡）
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 232;
    border-radius: 12px;
    overflow: hidden;
    background: var(--gcard-bg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;

    // 左側薄荷 accent 線
    border-left: 3px solid var(--color-primary);
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 36px;
    font-weight: 900;
    font-style: italic;

    // 薄荷主題用淡薄荷色水印
    color: rgba(47, 185, 138, 0.07);
    pointer-events: none;
    z-index: 1;
  }

  &__gcard-label {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__gcard-big {
    font-size: 22px;
    font-weight: 800;
    line-height: 1.1;
    color: var(--text-primary);
    white-space: nowrap;
  }

  &__gcard-sub {
    font-family: ui-monospace, monospace;
    font-weight: 500;
    font-size: 10px;
    color: var(--ink-mute);
    letter-spacing: 0.12em;
    margin: 6px 0 0 2px;
  }

  // 右下角薄荷進入箭頭
  &__gcard-arrow {
    position: absolute;
    bottom: 10px;
    right: 12px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 16px;
    z-index: 3;
    opacity: 0.85;
  }

  // ===== 人氣榜（noya-mint 獨有） =====
  &__rank {
    margin: 20px 14px 0;
    background: var(--bg-surface);
    border-radius: 14px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  &__rank-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px 12px;
    border-bottom: 1px solid var(--border);
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);

    // 火焰 icon 用薄荷色（提示熱門，不用真實火焰色避免與主題衝突）
    :deep(svg) {
      color: var(--color-primary);
      font-size: 20px;
    }
  }

  &__rank-head-sub {
    font-size: 11px;
    font-weight: 500;
    color: var(--ink-mute);
    letter-spacing: 0.1em;
    margin-left: auto;
  }

  &__rank-table {
    width: 100%;
    border-collapse: collapse;

    th {
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-mute);
      text-align: left;
      letter-spacing: 0.05em;
    }
  }

  &__rank-row {
    border-top: 1px solid rgba(47, 185, 138, 0.06);
    transition: background 0.12s;

    &:hover {
      background: var(--bg-overlay);
    }

    td {
      padding: 10px 12px;
      vertical-align: middle;
    }
  }

  // 排名數字（前三名用薄荷色強調）
  &__rank-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    background: rgba(47, 185, 138, 0.08);
    color: var(--ink-mute);

    &--top {
      background: var(--color-primary);
      color: #ffffff;
    }
  }

  &__rank-game {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__rank-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    display: block;
  }

  &__rank-cat {
    font-size: 10px;
    color: var(--ink-mute);
  }

  // 熱度條
  &__heat-bar {
    width: 60px;
    height: 5px;
    background: rgba(47, 185, 138, 0.12);
    border-radius: 999px;
    overflow: hidden;
  }

  &__heat-fill {
    height: 100%;
    background: var(--gradient-cta);
    border-radius: 999px;
    transition: width 0.4s ease;
  }

  // 進入按鈕
  &__rank-btn {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary);
    border: 1px solid var(--border);
    background: var(--bg-surface);
    cursor: pointer;
    white-space: nowrap;
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
    border-top: 1px solid var(--border);

    // 亮色版 tabbar 不用 backdrop-filter，白底即夠
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

      .noya-mint-m__nav-label {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  &__nav-ic {
    font-size: 24px;
  }

  &__nav-badge {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tabbar-center-bg);

    // 邊框用 bg-base 顏色
    border: 3px solid var(--bg-base);
    box-shadow:
      0 6px 18px rgba(47, 185, 138, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
    color: #ffffff;
    font-size: 26px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }
}

// ===== 動畫 =====
@keyframes noya-mint-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-mint-cards-in {
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
