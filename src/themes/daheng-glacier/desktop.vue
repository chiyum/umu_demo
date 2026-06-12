<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { heroSrc, GAMES, RAIL_ITEMS, PROMOS, FOOTER_FINE } from "./_data";

/**
 * daheng-glacier（a21 大亨冰川晨藍）桌面版
 * 1:1 對齊 大亨_AWD_版型I_冰川晨藍.html 的 ≥768px 寬版佈局。
 *
 * 對齊原稿桌機結構：
 *   sticky topbar（logo「大亨遊戲城」+ spacer + 登入 soft + 註冊 blue）
 *   → layout（flex）：
 *       main.content（左，flex:1）
 *         本週人氣館別 sec（ggrid 圓頂雪窗卡 6，桌機 3 欄 / ≥1100px 4 欄，排在 hero 之前）
 *         → hero banner（壓縮版單圖）→ prail 優惠 3（桌機 grid 3 欄）→ footer
 *       nav.rail（右側 order:2，桌機 78px sticky top:76px，8 項類別圖示）
 *   桌機無 dock。
 *
 * 所有顏色走 [data-theme="daheng-glacier"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接線：topbar logo 讀 themeStore.currentLogo，品牌字「大亨遊戲城」保留。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="glc">
    <!-- ===== sticky topbar ===== -->
    <header class="glc-topbar">
      <div class="glc-topbar__row">
        <a class="glc-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <span class="glc-topbar__spacer"></span>
        <a class="glc-btn glc-btn--soft" href="#" @click.prevent>登入</a>
        <a class="glc-btn glc-btn--blue" href="#" @click.prevent>註冊</a>
      </div>
    </header>

    <!-- ===== 內容欄 + 右側類別欄（rail order:2 在右側） ===== -->
    <div class="glc-layout">
      <main class="glc-content">
        <!-- 本週人氣館別（排在 hero 之前，圓頂雪窗卡） -->
        <section class="glc-sec glc-sec--first">
          <div class="glc-sec__head">
            <span class="glc-sec__pin"></span>
            <h3 class="glc-sec__title">本週人氣館別</h3>
            <a class="glc-sec__more" href="#" @click.prevent>全部 ›</a>
          </div>
          <div class="glc-ggrid">
            <a
              v-for="g in GAMES"
              :key="g.name"
              class="glc-gcard"
              href="#"
              @click.prevent
            >
              <span v-if="g.tag" class="glc-gcard__tag">{{ g.tag }}</span>
              <span class="glc-gcard__ph">
                <img :src="g.img" :alt="g.name" />
              </span>
              <span class="glc-gcard__meta">
                <b>{{ g.name }}</b>
                <span class="glc-gcard__play">▶</span>
              </span>
            </a>
          </div>
        </section>

        <!-- hero banner（壓縮版單圖） -->
        <section class="glc-hero">
          <img :src="heroSrc" alt="首存1000送1000" />
        </section>

        <!-- 優惠帶 -->
        <section class="glc-prail">
          <a
            v-for="p in PROMOS"
            :key="p.title"
            class="glc-pcard"
            href="#"
            @click.prevent
          >
            <span class="glc-pcard__ico">{{ p.icon }}</span>
            <span class="glc-pcard__txt">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
          </a>
        </section>

        <footer class="glc-footer">
          <p>{{ FOOTER_FINE }}</p>
        </footer>
      </main>

      <!-- 右側類別欄（order:2 在右） -->
      <nav class="glc-rail">
        <a
          v-for="item in RAIL_ITEMS"
          :key="item.label"
          class="glc-rail__link"
          :class="{ 'glc-rail__link--on': item.active }"
          href="#"
          @click.prevent
        >
          <span class="glc-rail__ic">{{ item.icon }}</span>
          <i class="glc-rail__label">{{ item.label }}</i>
        </a>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.glc {
  min-height: 100vh;

  // 忠實重現原稿 body 的淺藍漸層底
  background: var(--page-grad);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.glc-btn {
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

  &--soft {
    background: var(--bg-surface);
    color: var(--color-secondary);
    box-shadow: var(--shadow);

    &:hover {
      background: var(--color-accent);
    }
  }

  &--blue {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: var(--cta-shadow);

    &:hover {
      filter: brightness(1.07);
    }
  }
}

// ===== topbar =====
.glc-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--topbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

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

.glc-logo {
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
    letter-spacing: 0.08em;
    color: var(--color-secondary);
  }
}

// ===== layout：content + 右側 rail =====
.glc-layout {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 16px 0;
}

.glc-content {
  flex: 1;
  min-width: 0;
}

// 右側類別欄（order:2 確保排在 content 之後 = 右側）
.glc-rail {
  flex: none;
  order: 2;
  position: sticky;
  top: 76px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 78px;
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

    &:not(.glc-rail__link--on):hover {
      color: var(--color-secondary);
      transform: translateX(-3px);
    }

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
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
}

// ===== section head =====
.glc-sec {
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

// ===== 遊戲卡（圓頂雪窗形）=====
.glc-ggrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.glc-gcard {
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

// ===== hero（壓縮版 banner）=====
.glc-hero {
  position: relative;
  margin-top: 24px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);

  // stylelint-disable-next-line no-descending-specificity
  img {
    width: 100%;
    aspect-ratio: 1065 / 280;
    object-fit: cover;
    object-position: center 28%;
  }
}

// ===== 優惠帶（桌機 grid 3 欄）=====
.glc-prail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 22px;
}

.glc-pcard {
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

// ===== footer =====
.glc-footer {
  margin-top: 30px;
  padding: 24px 0 30px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.76rem;
  border-top: 1px solid var(--border);
}

// ===== ≥1100px：ggrid 升至 4 欄（對齊原稿 @media min-width:1100px）=====
@media (width >= 1100px) {
  .glc-ggrid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
