<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  GAMES,
  RAIL_ITEMS,
  PROMOS,
  FOOTER_FINE,
  DOCK_TABS
} from "./_data";

/**
 * daheng-glacier（a21 大亨冰川晨藍）手機版
 * 1:1 對齊 大亨_AWD_版型I_冰川晨藍.html 的 <768px 窄版佈局。
 *
 * 對齊原稿手機結構：
 *   sticky topbar（logo「大亨遊戲城」+ 登入 soft + 註冊 blue）
 *   → layout（flex）：
 *       main.content（左）：本週人氣館別 ggrid 2 欄（排在 hero 之前）
 *         → hero banner → prail 優惠 3（橫向捲動）→ footer
 *       nav.rail（右側 order:2，窄 64px sticky，8 項類別圖示）
 *   → 固定底部 dock 膠囊 5 格（首頁為當前 on）
 *
 * 與桌機共用同一份 _data，僅佈局/欄數不同。Logo 接 themeStore.currentLogo，
 * 品牌字「大亨遊戲城」保留。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="glc-m">
    <!-- ===== sticky topbar ===== -->
    <header class="glc-m-topbar">
      <div class="glc-m-topbar__row">
        <a class="glc-m-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <span class="glc-m-topbar__spacer"></span>
        <a class="glc-m-btn glc-m-btn--soft" href="#" @click.prevent>登入</a>
        <a class="glc-m-btn glc-m-btn--blue" href="#" @click.prevent>註冊</a>
      </div>
    </header>

    <!-- ===== 內容欄 + 右側類別欄（rail order:2 在右側） ===== -->
    <div class="glc-m-layout">
      <main class="glc-m-content">
        <!-- 本週人氣館別（排在 hero 之前，圓頂雪窗卡 2 欄） -->
        <section class="glc-m-sec glc-m-sec--first">
          <div class="glc-m-sec__head">
            <span class="glc-m-sec__pin"></span>
            <h3 class="glc-m-sec__title">本週人氣館別</h3>
            <a class="glc-m-sec__more" href="#" @click.prevent>全部 ›</a>
          </div>
          <div class="glc-m-ggrid">
            <a
              v-for="g in GAMES"
              :key="g.name"
              class="glc-m-gcard"
              href="#"
              @click.prevent
            >
              <span v-if="g.tag" class="glc-m-gcard__tag">{{ g.tag }}</span>
              <span class="glc-m-gcard__ph">
                <img :src="g.img" :alt="g.name" />
              </span>
              <span class="glc-m-gcard__meta">
                <b>{{ g.name }}</b>
                <span class="glc-m-gcard__play">▶</span>
              </span>
            </a>
          </div>
        </section>

        <!-- hero banner（壓縮版單圖） -->
        <section class="glc-m-hero">
          <img :src="heroSrc" alt="首存1000送1000" />
        </section>

        <!-- 優惠帶（手機橫向捲動） -->
        <section class="glc-m-prail">
          <a
            v-for="p in PROMOS"
            :key="p.title"
            class="glc-m-pcard"
            href="#"
            @click.prevent
          >
            <span class="glc-m-pcard__ico">{{ p.icon }}</span>
            <span class="glc-m-pcard__txt">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
          </a>
        </section>

        <footer class="glc-m-footer">
          <p>{{ FOOTER_FINE }}</p>
        </footer>
      </main>

      <!-- 右側類別欄（order:2 在右，窄 64px） -->
      <nav class="glc-m-rail">
        <a
          v-for="item in RAIL_ITEMS"
          :key="item.label"
          class="glc-m-rail__link"
          :class="{ 'glc-m-rail__link--on': item.active }"
          href="#"
          @click.prevent
        >
          <span class="glc-m-rail__ic">{{ item.icon }}</span>
          <i class="glc-m-rail__label">{{ item.label }}</i>
        </a>
      </nav>
    </div>

    <!-- ===== 固定底部 dock 膠囊 5 格 ===== -->
    <nav class="glc-m-dock">
      <a
        v-for="t in DOCK_TABS"
        :key="t.label"
        class="glc-m-dock__item"
        :class="{ 'glc-m-dock__item--on': t.active }"
        href="#"
        @click.prevent
      >
        <span class="glc-m-dock__ic">{{ t.icon }}</span>
        {{ t.label }}
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.glc-m {
  min-height: 100vh;

  // 忠實重現原稿 body 的淺藍漸層底
  background: var(--page-grad);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.glc-m-btn {
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

  &--soft {
    background: var(--bg-surface);
    color: var(--color-secondary);
    box-shadow: var(--shadow);
  }

  &--blue {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: var(--cta-shadow);
  }
}

// ===== topbar =====
.glc-m-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--topbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 56px;
    padding: 0 14px;
  }

  &__spacer {
    flex: 1;
  }
}

.glc-m-logo {
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
    letter-spacing: 0.04em;
    color: var(--color-secondary);
  }
}

// ===== layout：content + 右側 rail =====
.glc-m-layout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 12px 0;
}

.glc-m-content {
  flex: 1;
  min-width: 0;
}

// 右側類別欄（order:2 = 右側，手機窄 64px）
.glc-m-rail {
  flex: none;
  order: 2;
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

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 9px 2px 8px;
    border-radius: 999px;
    background: var(--bg-surface);
    box-shadow: var(--shadow);
    color: var(--text-muted);
    text-decoration: none;
    transition: 0.15s;

    &--on {
      background: linear-gradient(
        180deg,
        var(--color-primary),
        var(--color-secondary)
      );
      color: var(--cta-ink);
      box-shadow: var(--rail-on-shadow);
    }
  }

  &__ic {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.12rem;
    background: var(--color-accent);
  }

  &__link--on &__ic {
    background: rgba(255, 255, 255, 0.22);
  }

  &__label {
    font-style: normal;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
}

// ===== section head =====
.glc-m-sec {
  margin-top: 22px;

  &--first {
    margin-top: 0;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  &__pin {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--color-primary);
    box-shadow: 0 0 0 4px var(--pin-ring);
  }

  &__title {
    font-size: 1.08rem;
    font-weight: 900;
    letter-spacing: 0.06em;
  }

  &__more {
    margin-left: auto;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-secondary);
    white-space: nowrap;
    text-decoration: none;
  }
}

// ===== 遊戲卡（圓頂雪窗形，手機 2 欄）=====
.glc-m-ggrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.glc-m-gcard {
  position: relative;
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  border-radius: 90px 90px 20px 20px;
  text-decoration: none;
  color: inherit;
  transition: 0.18s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--gcard-hover-shadow);
  }

  &__ph {
    display: block;
    aspect-ratio: 1 / 1.04;
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
    justify-content: center;
    gap: 8px;
    padding: 10px 10px 13px;
    border-top: 1px solid var(--border);

    b {
      font-size: 0.92rem;
      font-weight: 900;
    }
  }

  &__play {
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.7rem;
    background: var(--gradient-cta);
    color: var(--cta-ink);
  }

  &__tag {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 12px;
    border-radius: 999px;
    font-size: 0.66rem;
    font-weight: 900;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(4px);
    color: var(--color-secondary);
    box-shadow: var(--shadow);
  }
}

// ===== hero（壓縮版 banner，手機 1065/300）=====
.glc-m-hero {
  position: relative;
  margin-top: 24px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);

  // stylelint-disable-next-line no-descending-specificity
  img {
    width: 100%;
    aspect-ratio: 1065 / 300;
    object-fit: cover;
    object-position: center 28%;
  }
}

// ===== 優惠帶（手機橫向捲動）=====
.glc-m-prail {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-top: 22px;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.glc-m-pcard {
  flex: none;
  width: 80%;
  max-width: 300px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 20px;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;

  &__ico {
    flex: none;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.3rem;
    background: var(--color-accent);
  }

  &__txt {
    min-width: 0;

    b {
      display: block;
      font-size: 0.9rem;
      font-weight: 900;
    }

    p {
      font-size: 0.74rem;
      color: var(--text-muted);
      margin-top: 2px;
    }
  }
}

// ===== footer（手機底部留白給 dock）=====
.glc-m-footer {
  margin-top: 30px;
  padding: 24px 0 110px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.76rem;
  border-top: 1px solid var(--border);
}

// ===== 固定底部 dock 膠囊 5 格 =====
.glc-m-dock {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 70;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 62px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  box-shadow: var(--dock-shadow);

  &__item {
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
      color: var(--color-secondary);
    }
  }

  &__ic {
    font-size: 1.2rem;
    line-height: 1;
  }
}
</style>
