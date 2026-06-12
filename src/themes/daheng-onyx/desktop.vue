<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  TOP_NAV,
  MEDALS,
  ARCH_CARDS,
  PROMOS,
  NOTICE,
  FOOTER_FINE
} from "./_data";

/**
 * daheng-onyx（a17 大亨曜黑燙金）寬版
 * 1:1 對齊 大亨_AWD_版型E_曜黑燙金.html 的 ≥約960px 狀態。
 *
 * 對齊原稿寬版結構（@media min-width:768px / 1024px）：
 *   sticky topbar（logo + 水平 topnav 顯示 + 登入/註冊）
 *   → hero banner（金雙框）→ notice 金色膠囊跑馬燈
 *   → 八角徽章 8 欄一排（medals，order:0）
 *   → 熱門館別（拱門卡 6 欄一排，≥1024px）
 *   → 尊榮禮遇（優惠 3 欄縱向置中）→ footer（無底部 dock）
 *
 * 所有顏色走 [data-theme="daheng-onyx"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接線：topbar / footer 品牌字保留「大亨遊戲城」，logo 圖讀 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="onyx">
    <!-- ===== sticky topbar（寬版顯示水平 topnav） ===== -->
    <header class="onyx-topbar">
      <div class="onyx-topbar__row">
        <a class="onyx-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <nav class="onyx-topnav">
          <a
            v-for="n in TOP_NAV"
            :key="n.label"
            class="onyx-topnav__link"
            :class="{ 'onyx-topnav__link--on': n.active }"
            href="#"
            @click.prevent
            >{{ n.label }}</a
          >
        </nav>
        <span class="onyx-topbar__spacer"></span>
        <button type="button" class="onyx-btn onyx-btn--ghost">登入</button>
        <button type="button" class="onyx-btn onyx-btn--gold">註冊</button>
      </div>
    </header>

    <main class="onyx-wrap">
      <!-- hero banner（金色雙框，對齊原稿 .hero + .hero::after 內框） -->
      <section class="onyx-hero">
        <img :src="heroSrc" alt="首存1000送1000" />
      </section>

      <!-- 公告金色膠囊跑馬燈 -->
      <div class="onyx-notice">
        <span class="onyx-notice__dia">◆</span>
        <div class="onyx-notice__clip">
          <span class="onyx-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- 八角徽章遊戲入口（寬版 8 欄一排） -->
      <section class="onyx-medals">
        <a
          v-for="m in MEDALS"
          :key="m.name"
          class="onyx-medal"
          href="#"
          @click.prevent
        >
          <span class="onyx-medal__oct"
            ><span>{{ m.icon }}</span></span
          >
          <i>{{ m.name }}</i>
          <em>{{ m.en }}</em>
        </a>
      </section>

      <!-- 熱門館別：拱門卡（寬版 ≥1024px 6 欄一排） -->
      <section class="onyx-sec">
        <div class="onyx-sec__head">
          <span class="onyx-sec__orn"></span>
          <h3>熱門館別</h3>
          <span class="onyx-sec__orn onyx-sec__orn--r"></span>
          <a class="onyx-sec__more" href="#" @click.prevent>查看全部 ›</a>
        </div>
        <div class="onyx-arch-grid">
          <a
            v-for="a in ARCH_CARDS"
            :key="a.name"
            class="onyx-arch"
            href="#"
            @click.prevent
          >
            <span class="onyx-arch__ph"
              ><img :src="a.img" :alt="a.name"
            /></span>
            <span class="onyx-arch__go">➜</span>
            <span class="onyx-arch__meta">
              <b>{{ a.name }}</b>
              <em>{{ a.en }}</em>
            </span>
          </a>
        </div>
      </section>

      <!-- 尊榮禮遇：優惠列（寬版 3 欄縱向置中） -->
      <section class="onyx-sec">
        <div class="onyx-sec__head">
          <span class="onyx-sec__orn"></span>
          <h3>尊榮禮遇</h3>
          <span class="onyx-sec__orn onyx-sec__orn--r"></span>
          <a class="onyx-sec__more" href="#" @click.prevent>全部優惠 ›</a>
        </div>
        <div class="onyx-promos">
          <a
            v-for="p in PROMOS"
            :key="p.title"
            class="onyx-promo"
            href="#"
            @click.prevent
          >
            <span class="onyx-promo__ico">{{ p.icon }}</span>
            <span class="onyx-promo__body">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
            <span class="onyx-promo__pct">{{ p.pct }}</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="onyx-footer">
      <div class="onyx-footer__logo">大亨遊戲城</div>
      <p>{{ FOOTER_FINE }}</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.onyx {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
}

// ===== 共用按鈕（對齊原稿 .btn / .btn-ghost / .btn-gold） =====
.onyx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 20px;
  border: none;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  white-space: nowrap;
  cursor: pointer;
  transition:
    filter 0.15s,
    background 0.15s;

  &--ghost {
    border: 1px solid var(--line-2);
    color: var(--color-secondary);
    background: transparent;

    &:hover {
      background: var(--bg-overlay);
    }
  }

  &--gold {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 2px 14px rgba(212, 175, 95, 0.35);

    &:hover {
      filter: brightness(1.08);
    }
  }
}

// ===== topbar =====
.onyx-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(12, 11, 9, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__row {
    display: flex;
    align-items: center;
    gap: 14px;
    height: 60px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  &__spacer {
    flex: 1;
  }
}

.onyx-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  img {
    height: 42px;
    width: auto;
    object-fit: contain;
  }

  b {
    font-family: var(--font-display);
    font-size: 1.15rem;
    letter-spacing: 0.18em;
    background: linear-gradient(
      180deg,
      var(--color-secondary),
      var(--color-accent)
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

// 寬版顯示水平 nav（對齊原稿 @media min-width:768px .topnav{display:flex}）
.onyx-topnav {
  display: flex;
  gap: 4px;
  margin-left: 18px;

  &__link {
    padding: 8px 14px;
    font-size: 0.92rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition:
      color 0.15s,
      border-color 0.15s;

    &:hover,
    &--on {
      color: var(--color-secondary);
      border-color: var(--color-primary);
    }
  }
}

// ===== wrap =====
.onyx-wrap {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 16px 0;
}

// ===== hero（金色雙框 banner） =====
.onyx-hero {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);

  // 原稿 .hero::after 內框金線
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
    aspect-ratio: 1065 / 280; // 寬版（原稿 @media min-width:768px）
    object-fit: cover;
    object-position: center 30%;
  }
}

// ===== notice 跑馬燈 =====
.onyx-notice {
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
    animation: onyx-run 20s linear infinite;
  }
}

@keyframes onyx-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== 八角徽章遊戲入口（寬版 8 欄一排） =====
.onyx-medals {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
  margin-top: 18px;
}

.onyx-medal {
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
    transition:
      transform 0.18s,
      box-shadow 0.18s,
      border-color 0.18s;

    // 原稿 .oct::before 八角內框金線
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

  &:hover &__oct {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: var(--line-2);
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

// ===== section 標題（對齊原稿 .sec-head 金線飾條） =====
.onyx-sec {
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

    &:hover {
      color: var(--color-secondary);
    }
  }
}

// ===== 拱門形熱門館別卡（寬版 ≥1024px 6 欄一排） =====
.onyx-arch-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 18px;
}

.onyx-arch {
  position: relative;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 120px 120px 10px 10px;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.18s,
    border-color 0.18s,
    box-shadow 0.18s;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--line-2);
    box-shadow:
      0 14px 30px rgba(0, 0, 0, 0.5),
      0 0 24px rgba(212, 175, 95, 0.12);
  }

  &__ph {
    display: block;
    aspect-ratio: 1 / 1.06;
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
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 12px 10px 14px;
    border-top: 1px solid var(--border);
    background: var(--bg-2);

    b {
      font-size: 0.88rem; // 原稿 @media min-width:1024px 縮小
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

  // 原稿 .go：hover 浮現的金色圓鈕
  &__go {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    font-weight: 900;
    opacity: 0;
    transform: scale(0.7);
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  &:hover &__go {
    opacity: 1;
    transform: scale(1);
  }
}

// ===== 優惠列（寬版 3 欄縱向置中，對齊原稿 @media .promo flex-direction:column） =====
.onyx-promos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.onyx-promo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 26px 18px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: linear-gradient(120deg, var(--card-2), var(--bg-surface));
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;

  &:hover {
    border-color: var(--line-2);
  }

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
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--color-secondary);
    flex: none;
  }
}

// ===== footer（寬版無底部 dock，padding-bottom 收回，對齊原稿 @media footer） =====
.onyx-footer {
  margin-top: 48px;
  border-top: 1px solid var(--border);
  padding: 28px 16px 36px;
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
</style>
