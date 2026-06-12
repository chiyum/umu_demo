<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  MEDALS,
  ARCH_CARDS,
  PROMOS,
  NOTICE,
  FOOTER_FINE,
  DOCK_ITEMS
} from "./_data";

/**
 * daheng-onyx（a17 大亨曜黑燙金）窄版
 * 1:1 對齊 大亨_AWD_版型E_曜黑燙金.html 的 <約960px 狀態。
 *
 * 對齊原稿窄版結構（預設 / <768px）：
 *   sticky topbar（logo + 登入/註冊，topnav 隱藏）
 *   → 八角徽章遊戲入口排最前（原稿 main.wrap > .medals{order:-1}，2 排 grid 4 欄）
 *   → hero banner（金雙框，較高 aspect）→ notice 金色膠囊跑馬燈
 *   → 熱門館別（拱門卡 2 欄）→ 尊榮禮遇（優惠單欄橫向）→ footer
 *   → 固定底部 dock（首頁 / 優惠 / 中間 CTA 球 / 存款 / 我的）
 *
 * 為什麼 medals 用 order:-1 + DOM 順序放後面：忠於原稿 flex order 寫法——
 * 桌機 order:0 維持文件流順序、手機 order:-1 把遊戲入口拉到 Banner / 跑馬燈之前進首屏。
 *
 * 所有顏色走 [data-theme="daheng-onyx"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接線：topbar / footer 品牌字保留「大亨遊戲城」，logo 圖讀 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="onyx-m">
    <!-- ===== sticky topbar（窄版隱藏 topnav） ===== -->
    <header class="onyx-m-topbar">
      <a class="onyx-m-logo" href="#" @click.prevent>
        <img :src="logoSrc" :alt="logoLabel" />
        <b>大亨遊戲城</b>
      </a>
      <span class="onyx-m-topbar__spacer"></span>
      <button type="button" class="onyx-m-btn onyx-m-btn--ghost">登入</button>
      <button type="button" class="onyx-m-btn onyx-m-btn--gold">註冊</button>
    </header>

    <!-- main：flex column，medals 用 order:-1 拉到最前（對齊原稿 main.wrap） -->
    <main class="onyx-m-wrap">
      <!-- hero banner（金色雙框） -->
      <section class="onyx-m-hero">
        <img :src="heroSrc" alt="首存1000送1000" />
      </section>

      <!-- 公告金色膠囊跑馬燈 -->
      <div class="onyx-m-notice">
        <span class="onyx-m-notice__dia">◆</span>
        <div class="onyx-m-notice__clip">
          <span class="onyx-m-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 八角徽章遊戲入口（窄版 order:-1 排最前，grid 4 欄 2 排） -->
      <section class="onyx-m-medals">
        <a
          v-for="m in MEDALS"
          :key="m.name"
          class="onyx-m-medal"
          href="#"
          @click.prevent
        >
          <span class="onyx-m-medal__oct"
            ><span>{{ m.icon }}</span></span
          >
          <i>{{ m.name }}</i>
          <em>{{ m.en }}</em>
        </a>
      </section>

      <!-- 熱門館別：拱門卡（窄版 2 欄） -->
      <section class="onyx-m-sec">
        <div class="onyx-m-sec__head">
          <span class="onyx-m-sec__orn"></span>
          <h3>熱門館別</h3>
          <span class="onyx-m-sec__orn onyx-m-sec__orn--r"></span>
          <a class="onyx-m-sec__more" href="#" @click.prevent>查看全部 ›</a>
        </div>
        <div class="onyx-m-arch-grid">
          <a
            v-for="a in ARCH_CARDS"
            :key="a.name"
            class="onyx-m-arch"
            href="#"
            @click.prevent
          >
            <span class="onyx-m-arch__ph"
              ><img :src="a.img" :alt="a.name"
            /></span>
            <span class="onyx-m-arch__go">➜</span>
            <span class="onyx-m-arch__meta">
              <b>{{ a.name }}</b>
              <em>{{ a.en }}</em>
            </span>
          </a>
        </div>
      </section>

      <!-- 尊榮禮遇：優惠列（窄版單欄橫向） -->
      <section class="onyx-m-sec">
        <div class="onyx-m-sec__head">
          <span class="onyx-m-sec__orn"></span>
          <h3>尊榮禮遇</h3>
          <span class="onyx-m-sec__orn onyx-m-sec__orn--r"></span>
          <a class="onyx-m-sec__more" href="#" @click.prevent>全部優惠 ›</a>
        </div>
        <div class="onyx-m-promos">
          <a
            v-for="p in PROMOS"
            :key="p.title"
            class="onyx-m-promo"
            href="#"
            @click.prevent
          >
            <span class="onyx-m-promo__ico">{{ p.icon }}</span>
            <span class="onyx-m-promo__body">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
            <span class="onyx-m-promo__pct">{{ p.pct }}</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="onyx-m-footer">
      <div class="onyx-m-footer__logo">大亨遊戲城</div>
      <p>{{ FOOTER_FINE }}</p>
    </footer>

    <!-- 固定底部 dock（中間「🎰」凸出 CTA 球） -->
    <nav class="onyx-m-dock">
      <a
        v-for="(d, i) in DOCK_ITEMS"
        :key="i"
        class="onyx-m-dock__item"
        :class="{
          'onyx-m-dock__item--cta': d.cta,
          'onyx-m-dock__item--on': d.active
        }"
        href="#"
        @click.prevent
      >
        <span class="onyx-m-dock__ic">{{ d.icon }}</span
        ><template v-if="d.label">{{ d.label }}</template>
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.onyx-m {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

// ===== 共用按鈕 =====
.onyx-m-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  white-space: nowrap;
  cursor: pointer;

  &--ghost {
    border: 1px solid var(--line-2);
    color: var(--color-secondary);
    background: transparent;
  }

  &--gold {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 2px 14px rgba(212, 175, 95, 0.35);
  }
}

// ===== topbar =====
.onyx-m-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 60px;
  padding: 0 16px;
  background: rgba(12, 11, 9, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__spacer {
    flex: 1;
  }
}

.onyx-m-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;

  img {
    height: 36px;
    width: auto;
    object-fit: contain;
  }

  b {
    font-family: var(--font-display);
    font-size: 1rem;
    letter-spacing: 0.1em;
    background: linear-gradient(
      180deg,
      var(--color-secondary),
      var(--color-accent)
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

// ===== wrap（flex column，給 medals order:-1 用） =====
.onyx-m-wrap {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 16px 0;
}

// ===== hero =====
.onyx-m-hero {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);

  &::after {
    content: "";
    position: absolute;
    inset: 6px;
    border: 1px solid var(--inner-line);
    border-radius: 3px;
    pointer-events: none;
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 1065 / 300; // 窄版（原稿預設）較高
    object-fit: cover;
    object-position: center 30%;
  }
}

// ===== notice =====
.onyx-m-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 0.82rem;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-2);

  &__dia {
    color: var(--color-primary);
    flex: none;
    font-size: 0.7rem;
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
    animation: onyx-m-run 20s linear infinite;
  }
}

@keyframes onyx-m-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== 八角徽章遊戲入口（窄版 order:-1 排最前，grid 4 欄 2 排） =====
.onyx-m-medals {
  order: -1; // 對齊原稿 main.wrap > .medals{order:-1}
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 18px;
}

.onyx-m-medal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 4px 0 2px;
  text-decoration: none;

  &__oct {
    position: relative;
    width: 100%;
    max-width: 108px;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    clip-path: polygon(
      30% 0,
      70% 0,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0 70%,
      0 30%
    );
    background: linear-gradient(
        160deg,
        rgba(38, 33, 23, 0.25),
        rgba(38, 33, 23, 0)
      ),
      linear-gradient(180deg, var(--card-2), var(--bg-surface));
    border: 1px solid var(--border);

    &::before {
      content: "";
      position: absolute;
      inset: 5px;
      clip-path: polygon(
        30% 0,
        70% 0,
        100% 30%,
        100% 70%,
        70% 100%,
        30% 100%,
        0 70%,
        0 30%
      );
      border: 1px solid var(--inner-line);
    }

    span {
      font-size: 1.7rem;
    }
  }

  i {
    font-style: normal;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--text-primary);
  }

  em {
    font-style: normal;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    color: var(--text-muted);
  }
}

// ===== section 標題 =====
.onyx-m-sec {
  margin-top: 40px;

  &__head {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  &__orn {
    flex: none;
    width: 26px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-primary));

    &--r {
      background: linear-gradient(90deg, var(--color-primary), transparent);
    }
  }

  h3 {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: 0.24em;
    color: var(--color-secondary);
  }

  &__more {
    margin-left: auto;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    white-space: nowrap;
    text-decoration: none;
  }
}

// ===== 拱門卡（窄版 2 欄） =====
.onyx-m-arch-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.onyx-m-arch {
  position: relative;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 120px 120px 10px 10px;
  text-decoration: none;
  color: inherit;

  &__ph {
    display: block;
    aspect-ratio: 1 / 1.06;
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
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 12px 10px 14px;
    border-top: 1px solid var(--border);
    background: var(--bg-2);

    b {
      font-size: 0.98rem;
      letter-spacing: 0.1em;
    }

    em {
      font-style: normal;
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      color: var(--text-muted);
      text-transform: uppercase;
    }
  }

  // 窄版 go 鈕常顯（無 hover 介質），對齊原稿視覺仍保留圓鈕但弱化
  &__go {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    font-weight: 900;
    opacity: 0;
  }
}

// ===== 優惠列（窄版單欄橫向，對齊原稿預設 .promo flex-direction:row） =====
.onyx-m-promos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.onyx-m-promo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: linear-gradient(120deg, var(--card-2), var(--bg-surface));
  text-decoration: none;
  color: inherit;

  &__ico {
    flex: none;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    border: 1px solid var(--line-2);
    background: radial-gradient(
      circle at 35% 30%,
      rgba(240, 212, 144, 0.25),
      transparent 70%
    );
  }

  &__body {
    b {
      display: block;
      font-size: 1rem;
      letter-spacing: 0.08em;
    }

    p {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 3px;
      letter-spacing: 0.04em;
    }
  }

  &__pct {
    margin-left: auto;
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--color-secondary);
    flex: none;
  }
}

// ===== footer（窄版預留底部 dock 空間，對齊原稿 padding:28px 0 110px） =====
.onyx-m-footer {
  margin-top: 48px;
  border-top: 1px solid var(--border);
  padding: 28px 16px 110px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.78rem;
  letter-spacing: 0.1em;

  &__logo {
    font-family: var(--font-display);
    font-size: 1rem;
    letter-spacing: 0.3em;
    color: var(--color-primary);
    margin-bottom: 8px;
  }
}

// ===== 固定底部 dock =====
.onyx-m-dock {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
  background: rgba(16, 14, 11, 0.96);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line-2);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    min-width: 54px;
    text-decoration: none;

    &--on {
      color: var(--color-secondary);
    }
  }

  &__ic {
    font-size: 1.25rem;
    line-height: 1;
  }

  // 中間凸出 CTA 球（對齊原稿 .dock .cta）
  &__item--cta {
    min-width: 0;
  }

  &__item--cta &__ic {
    position: relative;
    top: -16px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 6px 18px rgba(212, 175, 95, 0.45);
    border: 2px solid #2a2417;
  }
}
</style>
