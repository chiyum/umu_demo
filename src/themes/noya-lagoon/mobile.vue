<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  LOBBY_CATEGORIES,
  LOBBY_CARDS,
  CHECKIN_DAYS,
  QUICK_ACTIONS,
  BOTTOM_TABS
} from "./_data";

/**
 * noya-lagoon（諾亞礁湖，c26）手機版 — 以 c13 諾亞珊瑚為基底的改版
 *
 * 與 c13 手機版的差異：
 *   - 移除在線人數
 *   - strip 改為「左快捷（存款 / 取款 / 消息）+ 右每日簽到」兩欄並等高
 *   - 每日簽到緊湊版：head 一行 space-between（左標題 + 右「今日領取」小膠囊按鈕），
 *     7 天圓點列 overflow-x 可水平滑動；右側內容區只留卡片列表
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
  <div class="noya-lagoon-m">
    <div class="noya-lagoon-m__app">
      <!-- Header：logo（走 store）+ 登入/註冊 pill -->
      <header class="noya-lagoon-m__header">
        <div class="noya-lagoon-m__brand">
          <img class="noya-lagoon-m__logo" :src="logoSrc" :alt="logoLabel" />
        </div>
        <div class="noya-lagoon-m__head-right">
          <span class="noya-lagoon-m__pill noya-lagoon-m__pill--solid"
            >會員登入</span
          >
          <span class="noya-lagoon-m__pill">會員註冊</span>
        </div>
      </header>

      <!-- Hero banner -->
      <section class="noya-lagoon-m__hero">
        <img :src="heroSrc" alt="首存 1000 送 1000 · 珊瑚礁尊享" />
      </section>

      <!-- 公告跑馬燈 -->
      <div class="noya-lagoon-m__notice">
        <Icon
          class="noya-lagoon-m__notice-horn"
          icon="material-symbols:campaign-outline"
        />
        <div class="noya-lagoon-m__notice-track">
          <p>
            <b>【系統公告】</b>自 5/1（00:00:00）起，ATM 存款最低金額將調整為
            300 元，感謝您的理解與配合！
          </p>
        </div>
      </div>

      <!--
        strip：左側快捷功能（存款 / 取款 / 消息）+ 右側每日簽到（緊湊版）
        在線人數已移除；每日簽到由原本右側內容區上方搬到這裡。
      -->
      <div class="noya-lagoon-m__strip">
        <!-- 左側快捷功能 -->
        <div class="noya-lagoon-m__quick">
          <div
            v-for="qa in QUICK_ACTIONS"
            :key="qa.key"
            class="noya-lagoon-m__qa"
          >
            <span class="noya-lagoon-m__qa-ico"><Icon :icon="qa.icon" /></span>
            <span class="noya-lagoon-m__qa-label">{{ qa.label }}</span>
          </div>
        </div>

        <!--
          右側每日簽到（緊湊版）：與左側快捷功能等高。
          head 一行用 space-between：左「每日簽到」標題、右「今日領取」小按鈕；
          7 天圓點列 overflow-x: auto，超出時可水平滑動。
        -->
        <div class="noya-lagoon-m__checkin noya-lagoon-m__checkin--compact">
          <div class="noya-lagoon-m__checkin-head">
            <div class="noya-lagoon-m__checkin-title">
              <Icon icon="material-symbols:calendar-today-outline" />
              <span>每日簽到</span>
            </div>
            <button type="button" class="noya-lagoon-m__checkin-cta">
              <Icon icon="material-symbols:redeem" />
              今日領取
            </button>
          </div>
          <div class="noya-lagoon-m__checkin-days">
            <div
              v-for="d in CHECKIN_DAYS"
              :key="d.day"
              class="noya-lagoon-m__checkin-day"
              :class="{
                'noya-lagoon-m__checkin-day--claimed': d.claimed,
                'noya-lagoon-m__checkin-day--today': d.day === 3
              }"
            >
              <div class="noya-lagoon-m__checkin-dot">
                <Icon v-if="d.claimed" icon="material-symbols:check-circle" />
                <span v-else class="noya-lagoon-m__checkin-num">{{
                  d.day
                }}</span>
              </div>
              <span class="noya-lagoon-m__checkin-reward">{{ d.reward }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 大廳：左 squircle 分類 + 右內容區 -->
      <div class="noya-lagoon-m__lobby">
        <!--
          左側 squircle 分類按鈕欄：
          每個按鈕是大 squircle（30% border-radius），icon 置中 + 下方 label。
          active = 珊瑚漸層填底 + 柔影
        -->
        <div class="noya-lagoon-m__cats">
          <button
            v-for="cat in LOBBY_CATEGORIES"
            :key="cat.key"
            type="button"
            class="noya-lagoon-m__sqbtn"
            :class="{ 'noya-lagoon-m__sqbtn--on': activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <Icon class="noya-lagoon-m__sqbtn-ic" :icon="cat.icon" />
            <span class="noya-lagoon-m__sqbtn-label">{{ cat.label }}</span>
          </button>
        </div>

        <!-- 右側內容區（每日簽到已移到上方 strip，這裡只留卡片列表） -->
        <div class="noya-lagoon-m__content">
          <!-- 卡片列表（squircle 卡片） -->
          <div class="noya-lagoon-m__cards" :key="activeCat">
            <template v-for="(c, i) in cards" :key="i">
              <div class="noya-lagoon-m__sqcard">
                <img
                  v-if="c.img"
                  class="noya-lagoon-m__gfull"
                  :src="c.img"
                  :alt="c.alt"
                />
                <div v-else class="noya-lagoon-m__gcard">
                  <div class="noya-lagoon-m__gcard-wm">{{ c.wm }}</div>
                  <div class="noya-lagoon-m__gcard-label">
                    <div class="noya-lagoon-m__gcard-big">{{ c.big }}</div>
                    <div class="noya-lagoon-m__gcard-sub">{{ c.sub }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 tabbar（中間首頁凸出球） -->
    <nav class="noya-lagoon-m__tabbar">
      <div
        v-for="t in BOTTOM_TABS"
        :key="t.key"
        class="noya-lagoon-m__nav"
        :class="{ 'noya-lagoon-m__nav--center': t.center }"
      >
        <span v-if="t.center" class="noya-lagoon-m__nav-badge">
          <Icon :icon="t.icon" />
        </span>
        <Icon v-else class="noya-lagoon-m__nav-ic" :icon="t.icon" />
        <span class="noya-lagoon-m__nav-label">{{ t.label }}</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.noya-lagoon-m {
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
    border: 1px solid var(--border);
    background: var(--glass);
    white-space: nowrap;

    &--solid {
      background: var(--pill-solid-bg);
      border-color: rgba(240, 116, 78, 0.4);
      box-shadow: 0 4px 12px rgba(240, 116, 78, 0.25);
      color: var(--text-on-primary);
    }
  }

  // ===== Hero =====
  &__hero {
    position: relative;
    margin: 6px 14px 0;

    // squircle 大圓角
    border-radius: 28px;
    overflow: hidden;
    border: 2px solid var(--border);
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

    // squircle 公告條
    border-radius: 18px;
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
      font-size: 13px;
      color: var(--text-muted);
      white-space: nowrap;
      will-change: transform;
      animation: noya-lagoon-marquee 18s linear infinite;

      // stylelint-disable-next-line no-descending-specificity
      b {
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // ===== Strip：左側快捷功能 + 右側每日簽到 =====
  // align-items: stretch → 左快捷與右簽到等高
  &__strip {
    display: flex;
    align-items: stretch;
    gap: 12px;
    padding: 16px 14px 6px;
  }

  // 左側快捷功能（存款 / 取款 / 消息）：保留 icon 球 + 下方 label，靠左成一排，
  // 垂直置中以對齊等高的右側簽到區塊
  &__quick {
    flex: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__qa {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  &__qa-ico {
    width: 44px;
    height: 44px;

    // squircle icon 球
    border-radius: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--qa-ico-bg);
    border: 1px solid var(--border);
    box-shadow:
      0 4px 12px rgba(60, 30, 20, 0.1),
      inset 0 1px 1px rgba(255, 255, 255, 0.8);
    color: var(--color-primary);
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

  // ───── 核心精緻設計：squircle 分類按鈕欄 ─────
  &__cats {
    width: 72px;
    flex: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 2px;
  }

  // 大 squircle 按鈕（30% border-radius）
  &__sqbtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    padding: 12px 6px;
    border-radius: 30%;
    cursor: pointer;

    // 靜態白底 + 細珊瑚邊
    background: var(--sqbtn-bg);
    border: 1.5px solid var(--border);
    box-shadow: 0 3px 10px rgba(60, 30, 20, 0.08);
    color: var(--ink-mute);
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;

    // active：珊瑚漸層填底 + 柔影
    &--on {
      background: var(--tab-active-bg);
      border-color: transparent;

      // 珊瑚柔影
      box-shadow:
        0 6px 20px rgba(240, 116, 78, 0.35),
        0 2px 6px rgba(240, 116, 78, 0.2);
      color: var(--text-on-primary);

      .noya-lagoon-m__sqbtn-ic {
        color: var(--text-on-primary);
      }

      .noya-lagoon-m__sqbtn-label {
        color: rgba(255, 255, 255, 0.95);
        font-weight: 700;
      }
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sqbtn-ic {
    font-size: 24px;
    color: var(--ink-mute);
    transition: color 0.2s ease;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sqbtn-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.01em;
    transition: color 0.2s ease;
  }

  // ───── 右側內容區 ─────
  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  // ───── 每日簽到 strip ─────
  // flex column：head（標題 + 領取按鈕）在上、7 天圓點列在下
  &__checkin {
    background: var(--checkin-bg);
    border-radius: 18px;
    border: 1.5px solid var(--border);
    padding: 12px 12px 10px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  // head 一行用 space-between：左標題、右「今日領取」小按鈕
  &__checkin-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  // 左標題（icon + 每日簽到）
  &__checkin-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-primary);

    :deep(svg) {
      font-size: 16px;
    }
  }

  // 7 天圓點列：overflow-x auto，子元素超出時可水平滑動
  &__checkin-days {
    display: flex;
    gap: 4px;
    overflow-x: auto;
  }

  &__checkin-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    flex: none;
    width: 34px;
  }

  &__checkin-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    background: var(--checkin-unclaimed);
    color: var(--text-muted);
    transition: background 0.15s;

    :deep(svg) {
      font-size: 18px;
    }

    // 已領取：珊瑚實心
    .noya-lagoon-m__checkin-day--claimed & {
      background: var(--checkin-claimed);
      color: #ffffff;
    }

    // 今日：珊瑚光環
    .noya-lagoon-m__checkin-day--today & {
      background: var(--checkin-claimed);
      color: #ffffff;
      box-shadow: 0 0 0 3px var(--checkin-today);
    }
  }

  &__checkin-num {
    font-size: 12px;
    font-weight: 700;
  }

  &__checkin-reward {
    font-size: 9px;
    font-weight: 600;
    color: var(--ink-mute);
    text-align: center;
    white-space: nowrap;
  }

  // 「今日領取」小膠囊按鈕（移到 head 右側，靠右）
  &__checkin-cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex: none;
    padding: 5px 10px;
    border-radius: 999px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    box-shadow: 0 3px 10px rgba(240, 116, 78, 0.3);
    white-space: nowrap;

    :deep(svg) {
      font-size: 14px;
    }
  }

  // ───── squircle 卡片列表 ─────
  &__cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: noya-lagoon-cards-in 0.28s ease;
  }

  // squircle 卡片包裝（大圓角）
  &__sqcard {
    border-radius: 20px;
    overflow: hidden;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow);
    background: var(--bg-surface);
  }

  &__gfull {
    width: 100%;
    height: auto;
    display: block;
  }

  // 佔位遊戲卡（奶油粉漸層）
  &__gcard {
    position: relative;
    width: 100%;
    aspect-ratio: 760 / 232;
    overflow: hidden;
    background: var(--gcard-bg);
  }

  &__gcard-wm {
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 36px;
    font-weight: 900;
    font-style: italic;
    color: rgba(240, 116, 78, 0.08);
    pointer-events: none;
    z-index: 1;
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
    border-top: 1.5px solid var(--border);
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

      .noya-lagoon-m__nav-label {
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

    // 奶油底邊環（淺色 theme 用較亮的邊）
    border: 3px solid var(--bg-base);
    box-shadow:
      0 8px 20px rgba(240, 116, 78, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
    color: var(--text-on-primary);
    font-size: 30px;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__nav-label {
    font-size: 11px;
    font-weight: 500;
  }

  // ───── 每日簽到「緊湊版」（塞進 strip 右半）─────
  // 放在最後，讓較高特異性的覆寫排在各 base 元件規則之後，避免 no-descending-specificity
  &__checkin--compact {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;

    .noya-lagoon-m__checkin-title {
      font-size: 12px;
    }

    .noya-lagoon-m__checkin-days {
      gap: 2px;
    }

    .noya-lagoon-m__checkin-day {
      width: 36px;
    }

    .noya-lagoon-m__checkin-dot {
      width: 22px;
      height: 22px;
      font-size: 11px;

      :deep(svg) {
        font-size: 14px;
      }
    }

    .noya-lagoon-m__checkin-num {
      font-size: 10px;
    }

    .noya-lagoon-m__checkin-reward {
      font-size: 8px;
    }
  }
}

@keyframes noya-lagoon-marquee {
  from {
    transform: translateX(8%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes noya-lagoon-cards-in {
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
