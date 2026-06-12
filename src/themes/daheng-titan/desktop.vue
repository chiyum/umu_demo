<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  RAIL_ITEMS,
  GAMES,
  STATS,
  NOTICE,
  FOOTER_FINE
} from "./_data";

/**
 * daheng-titan（a20 大亨鈦灰琥珀）桌面版（寬版）
 * 1:1 對齊 大亨_AWD_版型H_鈦灰琥珀.html 的 ≥768px 佈局。
 *
 * 對齊原稿桌機結構：
 *   sticky topbar（logo 大亨遊戲城 + 登入/註冊）
 *   → .layout（左 .rail 橫向展開 170px sticky 圖示+文字 | 右 .content）
 *   → .content 內依序：
 *        sec 熱門館別（ggrid 圓角斜切卡 6 張，桌機 3~4 欄，排在 hero 之前）
 *        → hero 壓縮 banner → notice 公告 → stats 3 數據條 → footer
 *   無手機 dock。
 *
 * 所有顏色走 [data-theme="daheng-titan"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接線：topbar logo 讀 themeStore.currentLogo，品牌字「大亨遊戲城」保留。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="titan">
    <!-- ===== sticky topbar ===== -->
    <header class="titan-topbar">
      <div class="titan-topbar__row">
        <a class="titan-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <span class="titan-topbar__spacer"></span>
        <a class="titan-btn titan-btn--line" href="#" @click.prevent>登入</a>
        <a class="titan-btn titan-btn--amber" href="#" @click.prevent>註冊</a>
      </div>
    </header>

    <!-- ===== 左側類別欄 + 內容欄 ===== -->
    <div class="titan-layout">
      <!-- 左側類別欄（桌機橫向展開 170px sticky） -->
      <nav class="titan-rail">
        <a
          v-for="item in RAIL_ITEMS"
          :key="item.label"
          class="titan-rail__a"
          :class="{ 'titan-rail__a--on': item.active }"
          href="#"
          @click.prevent
        >
          <span class="titan-rail__ic">{{ item.icon }}</span>
          <i class="titan-rail__label">{{ item.label }}</i>
        </a>
      </nav>

      <main class="titan-content">
        <!-- 熱門館別（排在 hero 之前，圓角斜切卡 6 張，桌機 3~4 欄） -->
        <section class="titan-sec">
          <div class="titan-sec__head">
            <span class="titan-sec__tick"></span>
            <h3 class="titan-sec__title">熱門館別</h3>
            <a class="titan-sec__more" href="#" @click.prevent>全部 ›</a>
          </div>
          <div class="titan-ggrid">
            <a
              v-for="g in GAMES"
              :key="g.name"
              class="titan-gcard"
              href="#"
              @click.prevent
            >
              <span v-if="g.tag" class="titan-gcard__tag">{{ g.tag }}</span>
              <span class="titan-gcard__ph">
                <img :src="g.img" :alt="g.name" />
              </span>
              <span class="titan-gcard__meta">
                <span class="titan-gcard__txt">
                  <b>{{ g.name }}</b>
                  <em>{{ g.en }}</em>
                </span>
                <span class="titan-gcard__play">▶</span>
              </span>
            </a>
          </div>
        </section>

        <!-- hero 壓縮 banner -->
        <section class="titan-hero">
          <img :src="heroSrc" alt="首存1000送1000" />
        </section>

        <!-- 公告跑馬燈 -->
        <div class="titan-notice">
          <span class="titan-notice__ico">📣</span>
          <div class="titan-notice__clip">
            <span class="titan-notice__run">{{ NOTICE }}</span>
          </div>
        </div>

        <!-- 平台數據條（3 欄） -->
        <section class="titan-stats">
          <div v-for="s in STATS" :key="s.label" class="titan-stat">
            <b>{{ s.value }}</b>
            <span>{{ s.label }}</span>
          </div>
        </section>

        <footer class="titan-footer">
          <p>{{ FOOTER_FINE }}</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.titan {
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.titan-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  transition: 0.15s;

  &--line {
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: var(--text-muted);

    &:hover {
      color: var(--text-primary);
      border-color: rgba(255, 255, 255, 0.35);
    }
  }

  &--amber {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 3px 12px var(--glow);

    &:hover {
      filter: brightness(1.07);
    }
  }
}

// ===== topbar =====
.titan-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(20, 22, 25, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line-n);

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 58px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  &__spacer {
    flex: 1;
  }
}

.titan-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  img {
    height: 38px;
    width: auto;
    object-fit: contain;
  }

  b {
    font-size: 1.05rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--color-primary);
  }
}

// ===== layout（rail + content） =====
.titan-layout {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 16px 0;
}

// ===== 左側類別欄（桌機橫向展開） =====
.titan-rail {
  flex: none;
  position: sticky;
  top: 76px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 170px;
  max-height: calc(100vh - 86px);
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 9px 14px;
    border-radius: 999px;
    background: var(--bg-surface);
    border: 1px solid var(--line-n);
    color: var(--text-muted);
    text-decoration: none;
    transition: 0.15s;

    &:not(.titan-rail__a--on):hover {
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
    flex: none;
  }

  &__a--on &__ic {
    background: rgba(255, 255, 255, 0.25);
  }

  &__label {
    font-style: normal;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }
}

// ===== content =====
.titan-content {
  flex: 1;
  min-width: 0;
}

// ===== section head =====
.titan-sec {
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

    &:hover {
      color: var(--color-primary);
    }
  }
}

// ===== ggrid 圓角斜切卡（桌機 3 欄，≥1100 升 4 欄） =====
.titan-ggrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.titan-gcard {
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
      transition: transform 0.3s;
    }
  }

  &:hover &__ph img {
    transform: scale(1.05);
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
.titan-hero {
  position: relative;
  margin-top: 22px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--line-n);

  // 此 img 規則的 specificity 低於前面 .titan-gcard:hover .ph img，
  // 但兩者作用對象不相干（hero 容器 vs 遊戲卡）、不會互相覆寫，停用降序檢查即可
  // stylelint-disable-next-line no-descending-specificity
  img {
    width: 100%;
    aspect-ratio: 1065 / 280;
    object-fit: cover;
    object-position: center 28%;
    display: block;
  }
}

// ===== notice =====
.titan-notice {
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
    animation: titan-run 20s linear infinite;
  }
}

@keyframes titan-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== 數據條 =====
.titan-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 22px;
}

.titan-stat {
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
.titan-footer {
  margin-top: 30px;
  border-top: 1px solid var(--line-n);
  padding: 24px 0 30px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
}

// ≥1100px：ggrid 升 4 欄（對齊原稿 @media min-width:1100px）
@media (width >= 1100px) {
  .titan-ggrid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
