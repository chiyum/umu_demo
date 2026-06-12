<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  RAIL_ITEMS,
  GAMES,
  STATS,
  NOTICE,
  FOOTER_FINE,
  DOCK_ITEMS
} from "./_data";

/**
 * daheng-titan（a20 大亨鈦灰琥珀）手機版（窄版）
 * 1:1 對齊 大亨_AWD_版型H_鈦灰琥珀.html 的 <768px 佈局。
 *
 * 對齊原稿手機結構：
 *   sticky topbar（logo 大亨遊戲城 + 登入/註冊）
 *   → .layout（左 .rail 窄 64px sticky 圖示直排 | 右 .content）
 *   → .content 內依序：
 *        sec 熱門館別（ggrid 圓角斜切卡 6 張，2 欄，排在 hero 之前）
 *        → hero 壓縮 banner → notice 公告 → stats 3 數據條 → footer
 *   → 固定底部 5 格 dock（首頁為 on 狀態）。
 *
 * 與桌機共用同一份 _data，僅佈局 / rail 寬度 / 欄數不同。Logo 接 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="titan-m">
    <!-- ===== sticky topbar ===== -->
    <header class="titan-m-topbar">
      <div class="titan-m-topbar__row">
        <a class="titan-m-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <span class="titan-m-topbar__spacer"></span>
        <a class="titan-m-btn titan-m-btn--line" href="#" @click.prevent>
          登入
        </a>
        <a class="titan-m-btn titan-m-btn--amber" href="#" @click.prevent>
          註冊
        </a>
      </div>
    </header>

    <!-- ===== 左側窄類別欄 + 內容欄 ===== -->
    <div class="titan-m-layout">
      <!-- 左側類別欄（手機窄 64px 圖示直排 sticky） -->
      <nav class="titan-m-rail">
        <a
          v-for="item in RAIL_ITEMS"
          :key="item.label"
          class="titan-m-rail__a"
          :class="{ 'titan-m-rail__a--on': item.active }"
          href="#"
          @click.prevent
        >
          <span class="titan-m-rail__ic">{{ item.icon }}</span>
          <i class="titan-m-rail__label">{{ item.label }}</i>
        </a>
      </nav>

      <main class="titan-m-content">
        <!-- 熱門館別（排在 hero 之前，2 欄圓角斜切卡） -->
        <section class="titan-m-sec">
          <div class="titan-m-sec__head">
            <span class="titan-m-sec__tick"></span>
            <h3 class="titan-m-sec__title">熱門館別</h3>
            <a class="titan-m-sec__more" href="#" @click.prevent>全部 ›</a>
          </div>
          <div class="titan-m-ggrid">
            <a
              v-for="g in GAMES"
              :key="g.name"
              class="titan-m-gcard"
              href="#"
              @click.prevent
            >
              <span v-if="g.tag" class="titan-m-gcard__tag">{{ g.tag }}</span>
              <span class="titan-m-gcard__ph">
                <img :src="g.img" :alt="g.name" />
              </span>
              <span class="titan-m-gcard__meta">
                <span class="titan-m-gcard__txt">
                  <b>{{ g.name }}</b>
                  <em>{{ g.en }}</em>
                </span>
                <span class="titan-m-gcard__play">▶</span>
              </span>
            </a>
          </div>
        </section>

        <!-- hero 壓縮 banner -->
        <section class="titan-m-hero">
          <img :src="heroSrc" alt="首存1000送1000" />
        </section>

        <!-- 公告跑馬燈 -->
        <div class="titan-m-notice">
          <span class="titan-m-notice__ico">📣</span>
          <div class="titan-m-notice__clip">
            <span class="titan-m-notice__run">{{ NOTICE }}</span>
          </div>
        </div>

        <!-- 平台數據條（3 欄） -->
        <section class="titan-m-stats">
          <div v-for="s in STATS" :key="s.label" class="titan-m-stat">
            <b>{{ s.value }}</b>
            <span>{{ s.label }}</span>
          </div>
        </section>

        <footer class="titan-m-footer">
          <p>{{ FOOTER_FINE }}</p>
        </footer>
      </main>
    </div>

    <!-- ===== 固定底部 5 格 dock ===== -->
    <nav class="titan-m-dock">
      <a
        v-for="d in DOCK_ITEMS"
        :key="d.label"
        class="titan-m-dock__a"
        :class="{ 'titan-m-dock__a--on': d.active }"
        href="#"
        @click.prevent
      >
        <span class="titan-m-dock__ic">{{ d.icon }}</span>
        {{ d.label }}
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.titan-m {
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.titan-m-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  transition: 0.15s;

  &--line {
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: var(--text-muted);
  }

  &--amber {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 3px 12px var(--glow);
  }
}

// ===== topbar =====
.titan-m-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(20, 22, 25, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line-n);

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 58px;
    padding: 0 14px;
  }

  &__spacer {
    flex: 1;
  }
}

.titan-m-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  img {
    height: 34px;
    width: auto;
    object-fit: contain;
  }

  b {
    font-size: 0.96rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    color: var(--color-primary);
  }
}

// ===== layout（窄 rail + content） =====
.titan-m-layout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 12px 0;
}

// ===== 左側類別欄（手機窄 64px 圖示直排） =====
.titan-m-rail {
  flex: none;
  position: sticky;
  top: 70px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 64px;
  max-height: calc(100vh - 86px);
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 9px 2px 8px;
    border-radius: 999px;
    background: var(--bg-surface);
    border: 1px solid var(--line-n);
    color: var(--text-muted);
    text-decoration: none;
    transition: 0.15s;

    &:not(.titan-m-rail__a--on):hover {
      border-color: var(--border);
      color: var(--text-primary);
    }

    &--on {
      background: var(--gradient-cta);
      border-color: transparent;
      color: var(--rail-on-ink);
      box-shadow: 0 4px 14px var(--glow);
    }
  }

  &__ic {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.12rem;
    background: var(--bg-2);
  }

  &__a--on &__ic {
    background: rgba(255, 255, 255, 0.25);
  }

  &__label {
    font-style: normal;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
}

// ===== content =====
.titan-m-content {
  flex: 1;
  min-width: 0;
}

// ===== section head =====
.titan-m-sec {
  margin-top: 22px;

  &:first-child {
    margin-top: 0;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  &__tick {
    width: 18px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--color-primary), transparent);
  }

  &__title {
    font-size: 1.08rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  &__more {
    margin-left: auto;
    font-size: 0.8rem;
    color: var(--text-muted);
    text-decoration: none;
    white-space: nowrap;
  }
}

// ===== ggrid 圓角斜切卡（手機 2 欄） =====
.titan-m-ggrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.titan-m-gcard {
  position: relative;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--line-n);
  border-radius: var(--radius-card);
  text-decoration: none;
  color: inherit;
  transition: 0.18s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--border);
    box-shadow: var(--shadow);
  }

  &__ph {
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px 12px 18px;
  }

  &__txt {
    min-width: 0;

    b {
      font-size: 0.9rem;
      font-weight: 900;
    }

    em {
      display: block;
      font-style: normal;
      font-size: 0.64rem;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      text-transform: uppercase;
    }
  }

  &__play {
    margin-left: auto;
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    background: var(--gradient-cta);
    color: var(--cta-ink);
  }

  &__tag {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.66rem;
    font-weight: 900;
    background: rgba(20, 22, 25, 0.75);
    backdrop-filter: blur(4px);
    border: 1px solid var(--border);
    color: var(--color-primary);
  }
}

// ===== hero 壓縮 banner =====
.titan-m-hero {
  position: relative;
  margin-top: 22px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--line-n);

  img {
    width: 100%;
    aspect-ratio: 1065 / 300;
    object-fit: cover;
    object-position: center 28%;
    display: block;
  }
}

// ===== notice =====
.titan-m-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 7px 12px;
  font-size: 0.78rem;
  color: var(--text-muted);
  border-radius: 999px;
  background: var(--bg-2);
  border: 1px solid var(--line-n);

  &__ico {
    color: var(--color-primary);
    flex: none;
    font-size: 0.8rem;
  }

  &__clip {
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  &__run {
    display: inline-block;
    padding-left: 100%;
    animation: titan-m-run 20s linear infinite;
  }
}

@keyframes titan-m-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== 數據條 =====
.titan-m-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 22px;
}

.titan-m-stat {
  padding: 14px 8px;
  text-align: center;
  border-radius: 16px;
  background: var(--bg-2);
  border: 1px solid var(--line-n);

  b {
    display: block;
    font-size: 1.15rem;
    font-weight: 900;
    color: var(--color-primary);
  }

  span {
    font-size: 0.7rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
  }
}

// ===== footer =====
.titan-m-footer {
  margin-top: 30px;
  border-top: 1px solid var(--line-n);

  // 底部留 dock 高度的安全間距（對齊原稿 footer padding-bottom:110px）
  padding: 24px 0 110px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
}

// ===== 固定底部 5 格 dock =====
.titan-m-dock {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
  background: rgba(22, 24, 28, 0.96);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line-n);

  &__a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 0.66rem;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;
    min-width: 50px;

    &--on {
      color: var(--color-primary);
    }
  }

  &__ic {
    font-size: 1.2rem;
  }
}
</style>
