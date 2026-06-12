<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import {
  heroSrc,
  HERO_RIBBON,
  COINS,
  NOTICE,
  LANTS,
  PACKETS,
  SEC_GAMES_TITLE,
  SEC_PROMO_TITLE,
  FOOTER_FINE,
  DOCK_TABS
} from "./_data";

/**
 * daheng-crimson（a19 大亨赤焰紅金）窄版（手機 <768）
 * 1:1 對齊 大亨_AWD_版型G_赤焰紅金.html 的 <768px 佈局。
 *
 * 對齊原稿窄版結構：
 *   topbar（緊湊 logo + 登入 / 註冊領紅包，topnav 隱藏）
 *   → coins 錢幣入口排最前（原稿 main>.coins{order:-1}），手機 4 欄、英文短名隱藏
 *   → hero（金邊 + .ribbon）
 *   → notice 🏮 跑馬燈
 *   → 金牌館別（lant-grid 燈籠拱形卡 2 欄，.tag 角標）
 *   → 開運紅包（packets 單欄、左圖右文 + 右側金額）
 *   → footer
 *   → 固定底部 dock 5 格（中間「遊戲」凸出 CTA 球）
 *
 * 與桌機共用同一份 _data，僅佈局 / 欄數 / 順序不同。Logo 接 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="crm-m">
    <!-- ===== topbar（緊湊，topnav 隱藏） ===== -->
    <header class="crm-m-topbar">
      <a class="crm-m-logo" href="#" @click.prevent>
        <img :src="logoSrc" :alt="logoLabel" />
        <b>大亨遊戲城</b>
      </a>
      <span class="crm-m-topbar__spacer"></span>
      <a class="crm-m-btn crm-m-btn--line" href="#" @click.prevent>登入</a>
      <a class="crm-m-btn crm-m-btn--gold" href="#" @click.prevent
        >註冊領紅包</a
      >
    </header>

    <main class="crm-m-wrap">
      <!-- ===== 錢幣遊戲入口（手機排最前、4 欄） ===== -->
      <section class="crm-m-coins">
        <div class="crm-m-coins__rail">
          <a
            v-for="c in COINS"
            :key="c.label"
            class="crm-m-coin"
            href="#"
            @click.prevent
          >
            <span class="crm-m-coin__c">{{ c.icon }}</span>
            <i class="crm-m-coin__label">{{ c.label }}</i>
          </a>
        </div>
      </section>

      <!-- ===== hero（金邊 + .ribbon） ===== -->
      <section class="crm-m-hero">
        <img :src="heroSrc" alt="首存1000送1000" />
        <span class="crm-m-hero__ribbon">{{ HERO_RIBBON }}</span>
      </section>

      <!-- ===== 公告 🏮 跑馬燈 ===== -->
      <div class="crm-m-notice">
        <span class="crm-m-notice__ico">🏮</span>
        <div class="crm-m-notice__clip">
          <span class="crm-m-notice__run">{{ NOTICE }}</span>
        </div>
      </div>

      <!-- ===== 金牌館別（燈籠拱形卡 2 欄） ===== -->
      <section class="crm-m-sec">
        <div class="crm-m-sec__head">
          <span class="crm-m-sec__knot">❖</span>
          <h3 class="crm-m-sec__title">{{ SEC_GAMES_TITLE }}</h3>
          <span class="crm-m-sec__knot">❖</span>
        </div>
        <div class="crm-m-lant-grid">
          <a
            v-for="l in LANTS"
            :key="l.name"
            class="crm-m-lant"
            href="#"
            @click.prevent
          >
            <span v-if="l.tag" class="crm-m-lant__tag">{{ l.tag }}</span>
            <span class="crm-m-lant__ph"
              ><img :src="l.img" :alt="l.name"
            /></span>
            <span class="crm-m-lant__meta">
              <b>{{ l.name }}</b>
              <em>{{ l.en }}</em>
            </span>
          </a>
        </div>
      </section>

      <!-- ===== 開運紅包（單欄、左圖右文 + 右側金額） ===== -->
      <section class="crm-m-sec">
        <div class="crm-m-sec__head">
          <span class="crm-m-sec__knot">❖</span>
          <h3 class="crm-m-sec__title">{{ SEC_PROMO_TITLE }}</h3>
          <span class="crm-m-sec__knot">❖</span>
        </div>
        <div class="crm-m-packets">
          <a
            v-for="p in PACKETS"
            :key="p.title"
            class="crm-m-packet"
            href="#"
            @click.prevent
          >
            <span class="crm-m-packet__ico">{{ p.icon }}</span>
            <span class="crm-m-packet__body">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
            <span class="crm-m-packet__amt">{{ p.amount }}</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="crm-m-footer">
      <div class="crm-m-footer__logo">大亨遊戲城</div>
      <p>{{ FOOTER_FINE }}</p>
    </footer>

    <!-- ===== 固定底部 dock 5 格（中間凸出 CTA 球） ===== -->
    <nav class="crm-m-dock">
      <a
        v-for="(t, i) in DOCK_TABS"
        :key="i"
        class="crm-m-dock__item"
        :class="{
          'crm-m-dock__item--cta': t.cta,
          'crm-m-dock__item--on': t.active
        }"
        href="#"
        @click.prevent
      >
        <span class="crm-m-dock__ic">{{ t.icon }}</span>
        <template v-if="t.label">{{ t.label }}</template>
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.crm-m {
  min-height: 100vh;

  // body 深紅雙 radial 漸層底（忠實重現原稿 html,body background）
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
}

.crm-m-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
}

// ===== 共用按鈕（手機緊湊化） =====
.crm-m-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 13px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  white-space: nowrap;
  text-decoration: none;
  transition: 0.15s;

  &--line {
    border: 1px solid var(--line-2);
    color: var(--color-secondary);
  }

  &--gold {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
  }
}

// ===== topbar（sticky，緊湊） =====
.crm-m-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 60px;
  padding: 0 16px;
  background: var(--topbar-bg);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--color-accent);

  &__spacer {
    flex: 1;
  }
}

.crm-m-logo {
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
    font-weight: 900;
    letter-spacing: 0.06em;
    color: var(--color-primary);
    text-shadow: 0 1px 0 var(--ink-shadow);
  }
}

// ===== 錢幣遊戲入口（手機 4 欄） =====
.crm-m-coins {
  margin-top: 18px;

  &__rail {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
}

.crm-m-coin {
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

    &::after {
      content: "";
      position: absolute;
      inset: 7px;
      border-radius: 50%;
      border: 1px dashed rgba(255, 210, 130, 0.5);
    }
  }

  &__label {
    font-style: normal;
    font-size: 0.92rem;
    font-weight: 900;
    letter-spacing: 0.18em;
  }
}

// ===== hero（金邊 + ribbon） =====
.crm-m-hero {
  position: relative;
  margin-top: 18px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 2px solid var(--color-accent);
  box-shadow: var(--shadow);

  img {
    width: 100%;
    aspect-ratio: 1065 / 320;
    object-fit: cover;
    object-position: center 25%;
    display: block;
  }

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
.crm-m-notice {
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
    animation: crm-m-run 20s linear infinite;
  }
}

@keyframes crm-m-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== section 標題 =====
.crm-m-sec {
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

// ===== 燈籠拱形遊戲卡（手機 2 欄） =====
.crm-m-lant-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.crm-m-lant {
  position: relative;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 999px 999px 18px 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: inherit;

  &__ph {
    display: block;
    aspect-ratio: 1 / 1.08;
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

// ===== 紅包優惠（手機單欄，左圖右文 + 右側金額） =====
.crm-m-packets {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.crm-m-packet {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--packet-bg);
  border: 1px solid var(--border);
  text-decoration: none;
  color: inherit;

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
    min-width: 0;

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
    margin-left: auto;
    flex: none;
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-primary);
  }
}

// ===== footer =====
.crm-m-footer {
  margin-top: 46px;
  border-top: 1px solid var(--border);

  // 底部留白給固定 dock（對齊原稿 footer padding-bottom:112px）
  padding: 26px 16px 112px;
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

// ===== 固定底部 dock（5 格，中間凸出 CTA 球） =====
.crm-m-dock {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
  background: var(--dock-bg);
  backdrop-filter: blur(12px);
  border-top: 2px solid var(--color-accent);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    text-decoration: none;
    min-width: 54px;

    &--on {
      color: var(--color-primary);
    }
  }

  &__ic {
    font-size: 1.25rem;
    line-height: 1;
  }

  // 中間「遊戲」凸出 CTA 球（對齊原稿 .dock .cta）
  &__item--cta {
    position: relative;
    top: -16px;
    min-width: 0;
  }

  &__item--cta &__ic {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
    border: 2px solid var(--ink-shadow);
  }
}
</style>
