<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  HERO_RIBBON,
  TOP_NAV,
  COINS,
  NOTICE,
  LANTS,
  PACKETS,
  SEC_GAMES_TITLE,
  SEC_PROMO_TITLE,
  FOOTER_FINE
} from "./_data";

/**
 * daheng-crimson（a19 大亨赤焰紅金）寬版（桌機 ≥768）
 * 1:1 對齊 大亨_AWD_版型G_赤焰紅金.html 的 ≥768px 佈局。
 *
 * 對齊原稿寬版結構：
 *   topbar（logo + topnav 6 項 + 登入 / 註冊領紅包）
 *   → coins 錢幣入口 8 欄（桌機顯示英文短名）
 *   → hero（金邊主視覺 + .ribbon 開運首存禮）
 *   → notice 🏮 跑馬燈
 *   → 金牌館別（lant-grid 燈籠拱形卡，桌機 3 欄 → ≥1024 升 6 欄，.tag 角標）
 *   → 開運紅包（packets 3 張，桌機並排）
 *   → footer
 *   寬版無底部 dock（原稿 @media min-width:768 .dock{display:none}）。
 *
 * 所有顏色走 [data-theme="daheng-crimson"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接 themeStore.currentLogo，品牌字「大亨遊戲城」保留（對齊原稿 .logo b）。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="crm">
    <!-- ===== topbar（紅底 + 金邊） ===== -->
    <header class="crm-topbar">
      <div class="crm-wrap crm-topbar__row">
        <a class="crm-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <nav class="crm-topnav">
          <a
            v-for="n in TOP_NAV"
            :key="n.label"
            class="crm-topnav__link"
            :class="{ 'crm-topnav__link--on': n.active }"
            href="#"
            @click.prevent
            >{{ n.label }}</a
          >
        </nav>
        <span class="crm-topbar__spacer"></span>
        <a class="crm-btn crm-btn--line" href="#" @click.prevent>登入</a>
        <a class="crm-btn crm-btn--gold" href="#" @click.prevent>註冊領紅包</a>
      </div>
    </header>

    <main class="crm-wrap crm-main">
      <!-- ===== 錢幣遊戲入口（桌機 8 欄） ===== -->
      <section class="crm-coins">
        <div class="crm-coins__rail">
          <a
            v-for="c in COINS"
            :key="c.label"
            class="crm-coin"
            href="#"
            @click.prevent
          >
            <span class="crm-coin__c">{{ c.icon }}</span>
            <i class="crm-coin__label">{{ c.label }}</i>
            <em class="crm-coin__en">{{ c.en }}</em>
          </a>
        </div>
      </section>

      <!-- ===== hero（金邊 + .ribbon 開運首存禮） ===== -->
      <section class="crm-hero">
        <img :src="heroSrc" alt="首存1000送1000" />
        <span class="crm-hero__ribbon">{{ HERO_RIBBON }}</span>
      </section>

      <!-- ===== 公告 🏮 跑馬燈 ===== -->
      <div class="crm-notice">
        <span class="crm-notice__ico">🏮</span>
        <div class="crm-notice__clip">
          <span class="crm-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- ===== 金牌館別（燈籠拱形卡） ===== -->
      <section class="crm-sec">
        <div class="crm-sec__head">
          <span class="crm-sec__knot">❖</span>
          <h3 class="crm-sec__title">{{ SEC_GAMES_TITLE }}</h3>
          <span class="crm-sec__knot">❖</span>
        </div>
        <div class="crm-lant-grid">
          <a
            v-for="l in LANTS"
            :key="l.name"
            class="crm-lant"
            href="#"
            @click.prevent
          >
            <span v-if="l.tag" class="crm-lant__tag">{{ l.tag }}</span>
            <span class="crm-lant__ph"><img :src="l.img" :alt="l.name" /></span>
            <span class="crm-lant__meta">
              <b>{{ l.name }}</b>
              <em>{{ l.en }}</em>
            </span>
          </a>
        </div>
      </section>

      <!-- ===== 開運紅包（packets） ===== -->
      <section class="crm-sec">
        <div class="crm-sec__head">
          <span class="crm-sec__knot">❖</span>
          <h3 class="crm-sec__title">{{ SEC_PROMO_TITLE }}</h3>
          <span class="crm-sec__knot">❖</span>
        </div>
        <div class="crm-packets">
          <a
            v-for="p in PACKETS"
            :key="p.title"
            class="crm-packet"
            href="#"
            @click.prevent
          >
            <span class="crm-packet__ico">{{ p.icon }}</span>
            <span class="crm-packet__body">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
            <span class="crm-packet__amt">{{ p.amount }}</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="crm-footer">
      <div class="crm-footer__logo">大亨遊戲城</div>
      <p>{{ FOOTER_FINE }}</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.crm {
  min-height: 100vh;

  // body 深紅雙 radial 漸層底（忠實重現原稿 html,body background）
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
}

.crm-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 16px;
}

// ===== 共用按鈕 =====
.crm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-decoration: none;
  transition: 0.15s;

  &--line {
    border: 1px solid var(--line-2);
    color: var(--color-secondary);

    &:hover {
      background: var(--bg-overlay);
    }
  }

  &--gold {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);

    &:hover {
      filter: brightness(1.06);
    }
  }
}

// ===== topbar（sticky 紅底 + 金邊） =====
.crm-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--topbar-bg);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--color-accent);

  &__row {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 60px;
  }

  &__spacer {
    flex: 1;
  }
}

.crm-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  img {
    height: 42px;
    width: auto;
    object-fit: contain;
  }

  b {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    color: var(--color-primary);
    text-shadow: 0 1px 0 var(--ink-shadow);
  }
}

// ===== topnav（桌機顯示） =====
.crm-topnav {
  display: flex;
  gap: 2px;
  margin-left: 14px;

  &__link {
    padding: 8px 14px;
    font-size: 0.94rem;
    font-weight: 700;
    color: var(--text-muted);
    border-radius: 999px;
    text-decoration: none;
    transition: 0.15s;

    &:hover,
    &--on {
      color: var(--cta-ink);
      background: linear-gradient(
        180deg,
        var(--color-secondary),
        var(--color-primary)
      );
    }
  }
}

// ===== 錢幣遊戲入口（桌機 8 欄） =====
.crm-coins {
  margin-top: 18px;

  &__rail {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 14px;
  }
}

.crm-coin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;

  &__c {
    position: relative;
    width: 100%;
    max-width: 86px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.65rem;
    background: var(--coin-face);
    border: 2px solid var(--color-accent);
    box-shadow:
      inset 0 0 0 4px rgba(255, 210, 130, 0.18),
      0 4px 12px rgba(0, 0, 0, 0.35);
    transition: 0.18s;

    // 內側虛線金環（對齊原稿 .coin .c::after）
    &::after {
      content: "";
      position: absolute;
      inset: 7px;
      border-radius: 50%;
      border: 1px dashed rgba(255, 210, 130, 0.5);
    }
  }

  &:hover &__c {
    transform: translateY(-4px) rotate(-4deg);
    border-color: var(--color-primary);
    box-shadow:
      inset 0 0 0 4px rgba(255, 210, 130, 0.28),
      0 10px 20px rgba(0, 0, 0, 0.45);
  }

  &__label {
    font-style: normal;
    font-size: 0.92rem;
    font-weight: 900;
    letter-spacing: 0.18em;
  }

  &__en {
    font-style: normal;
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    color: var(--text-muted);
  }
}

// ===== hero（金邊 + ribbon） =====
.crm-hero {
  position: relative;
  margin-top: 18px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 2px solid var(--color-accent);
  box-shadow: var(--shadow);

  img {
    width: 100%;
    aspect-ratio: 1065 / 300;
    object-fit: cover;
    object-position: center 25%;
    display: block;
  }

  // 開運首存禮緞帶（對齊原稿 .ribbon clip-path 旗形）
  &__ribbon {
    position: absolute;
    top: 0;
    left: 18px;
    padding: 10px 12px 14px;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--cta-ink);
    background: linear-gradient(
      180deg,
      var(--color-secondary),
      var(--color-primary)
    );
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%);
  }
}

// ===== 公告跑馬燈 =====
.crm-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 9px 16px;
  font-size: 0.84rem;
  color: var(--color-secondary);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.18);

  &__ico {
    flex: none;
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
    animation: crm-run 20s linear infinite;
  }
}

@keyframes crm-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== section 標題 =====
.crm-sec {
  margin-top: 36px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  &__knot {
    color: var(--color-primary);
    font-size: 0.8rem;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 900;
    letter-spacing: 0.3em;
    color: var(--color-secondary);
    text-shadow: 0 1px 0 var(--ink-shadow);
  }
}

// ===== 燈籠拱形遊戲卡（桌機 3 欄 → ≥1024 6 欄） =====
.crm-lant-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.crm-lant {
  position: relative;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);

  // 拱形：上方圓弧 + 下方小圓角（對齊原稿 .lant border-radius）
  border-radius: 999px 999px 18px 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: inherit;
  transition: 0.18s;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-primary);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
  }

  &__ph {
    display: block;
    aspect-ratio: 1 / 1.08;
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
    gap: 2px;
    padding: 10px 8px 13px;
    background: linear-gradient(180deg, var(--card-2), var(--bg-surface));
    border-top: 1px solid var(--border);

    b {
      font-size: 0.96rem;
      font-weight: 900;
      letter-spacing: 0.12em;
    }

    em {
      font-style: normal;
      font-size: 0.66rem;
      letter-spacing: 0.2em;
      color: var(--text-muted);
      text-transform: uppercase;
    }
  }

  // 頂部角標（對齊原稿 .tag）
  &__tag {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    padding: 3px 14px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 900;
    background: linear-gradient(
      180deg,
      var(--color-secondary),
      var(--color-primary)
    );
    color: var(--cta-ink);
  }
}

// ===== 紅包優惠（桌機並排，縱向置中） =====
.crm-packets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.crm-packet {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 24px 18px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--packet-bg);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  transition: 0.15s;

  // 右上角金色暈光（對齊原稿 .packet::before）
  &::before {
    content: "";
    position: absolute;
    top: -30px;
    right: -30px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 210, 130, 0.22),
      transparent 70%
    );
  }

  &:hover {
    border-color: var(--color-primary);
  }

  &__ico {
    flex: none;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    background: linear-gradient(
      180deg,
      var(--color-secondary),
      var(--color-primary)
    );
  }

  &__body {
    b {
      display: block;
      font-size: 1rem;
      font-weight: 900;
      letter-spacing: 0.06em;
    }

    p {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 3px;
    }
  }

  &__amt {
    flex: none;
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-primary);
  }
}

// ===== footer =====
.crm-footer {
  margin-top: 46px;
  border-top: 1px solid var(--border);
  padding: 26px 16px 34px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.78rem;
  letter-spacing: 0.08em;

  &__logo {
    font-family: var(--font-display);
    font-size: 1.05rem;
    letter-spacing: 0.34em;
    color: var(--color-primary);
    margin-bottom: 8px;
  }
}

.crm-main {
  display: flex;
  flex-direction: column;
}

// ≥1024：燈籠卡升至 6 欄（對齊原稿 @media min-width:1024）
@media (width >= 1024px) {
  .crm-lant-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .crm-lant__meta b {
    font-size: 0.86rem;
  }
}
</style>
