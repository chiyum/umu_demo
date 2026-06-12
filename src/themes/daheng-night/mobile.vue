<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { useHeroCarousel } from "@/utils/use-hero-carousel";
import {
  CATS,
  GAMES,
  ICONS,
  SCENES,
  DECOS,
  BALANCES,
  JACKPOT,
  PROMOS,
  WINNERS,
  FOOTER_LINKS,
  FOOTER_FINE,
  BOTTOM_TABS
} from "./_data";

/**
 * daheng-night（a16 大亨夜空樂園）手機版（<960px）
 * 1:1 對齊 大亨_AWD_版型D_紫色手遊_單檔版.html 的手機佈局。
 *
 * 對齊原稿手機結構（<960）：
 *   canvas 星空背景（fixed，z-0）
 *   → HUD 頂欄（avatar「亨」+ 餘額 pills 縱向疊 + 儲值 btn3d；nav 隱藏）
 *   → jackboard GRAND JACKPOT 燈板
 *   → cats 分類入口（SVG 圓鈕，可橫向捲動）
 *   → lobby 遊戲大廳（2 欄，feat 大卡跨 2 行 + HOT/NEW ribbon）
 *   → duo 堆疊（promoCar 促銷輪播 → dots → winners 中獎跑馬）
 *   → footer
 *   → 固定底部 bottomnav 5 格（中間「獎金池」凸出金球）
 *
 * 與桌機共用同一份 _data，僅佈局/欄數不同。
 * 動畫策略同桌機（canvas RAF + jackpot RAF tween + 輪播 composable + CSS keyframes）。
 */
const themeStore = useDemoThemeStore();
const logoLabel = computed(() => themeStore.currentLogo.label);

/* ===== 分類過濾（預設 all 全部） ===== */
const activeCat = ref<string>("all");
const visibleGames = computed(() =>
  GAMES.filter((g) =>
    activeCat.value === "all" ? true : g.cat === activeCat.value
  )
);

const fmt = (n: number) => n.toLocaleString("en-US");

/** 中獎跑馬分隔符（對齊原稿全形空格 + 中點，抽常數避免 no-irregular-whitespace） */
const WINNER_SEP = "\u3000\u00b7\u3000";

function cardSvg(scene: string, idx: number, feat: boolean): string {
  return SCENES[scene](`m_${idx}_`, feat);
}
function isFeat(g: (typeof GAMES)[number]): boolean {
  return Boolean(g.feat) && activeCat.value === "all";
}

/* ===== 促銷輪播 ===== */
const { activeIdx: promoIdx, select: selectPromo } = useHeroCarousel(
  PROMOS.length,
  4500
);

/* ===== Jackpot 數字跳動（RAF tween） ===== */
const jackText = ref<string>(fmt(JACKPOT.value));
let jackRaf = 0;
function tweenJackpot() {
  const from = JACKPOT.value;
  const to = from + Math.floor(800 + Math.random() * 9000);
  const dur = 2400;
  const start = performance.now();
  function step(now: number) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - (1 - t) * (1 - t);
    const v = Math.floor(from + (to - from) * eased);
    jackText.value = fmt(v);
    if (t < 1) jackRaf = requestAnimationFrame(step);
  }
  jackRaf = requestAnimationFrame(step);
}

/* ===== Canvas 星空背景 + 流星 ===== */
const bgfx = ref<HTMLCanvasElement | null>(null);
let starRaf = 0;
let onResize: (() => void) | null = null;

function initBgfx() {
  const cv = bgfx.value;
  if (!cv) return;
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  let W = 0;
  let H = 0;
  type Star = { x: number; y: number; r: number; ph: number; sp: number };
  let stars: Star[] = [];
  type Shoot = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
  } | null;
  let shoot: Shoot = null;

  function resize() {
    if (!cv || !ctx) return;
    W = cv.width = window.innerWidth * dpr;
    H = cv.height = window.innerHeight * dpr;
    cv.style.width = window.innerWidth + "px";
    cv.style.height = window.innerHeight + "px";
    stars = [];
    const n = Math.min(110, Math.floor(window.innerWidth / 12));
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: (Math.random() * 1.6 + 0.5) * dpr,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.2
      });
    }
  }
  onResize = resize;
  window.addEventListener("resize", resize);
  resize();

  let t = 0;
  function loop() {
    if (!ctx) return;
    starRaf = requestAnimationFrame(loop);
    t += 0.016;
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      const a = 0.18 + 0.4 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
      ctx.globalAlpha = a;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 7);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (!shoot && Math.random() < 0.004) {
      shoot = {
        x: Math.random() * W * 0.7 + W * 0.15,
        y: Math.random() * H * 0.25,
        vx: (6 + Math.random() * 5) * dpr,
        vy: (3 + Math.random() * 2) * dpr,
        life: 1
      };
    }
    if (shoot) {
      shoot.x += shoot.vx;
      shoot.y += shoot.vy;
      shoot.life -= 0.025;
      if (shoot.life <= 0) {
        shoot = null;
      } else {
        const g = ctx.createLinearGradient(
          shoot.x,
          shoot.y,
          shoot.x - shoot.vx * 8,
          shoot.y - shoot.vy * 8
        );
        g.addColorStop(0, `rgba(255,243,192,${0.9 * shoot.life})`);
        g.addColorStop(1, "rgba(255,243,192,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(shoot.x, shoot.y);
        ctx.lineTo(shoot.x - shoot.vx * 8, shoot.y - shoot.vy * 8);
        ctx.stroke();
      }
    }
  }
  loop();
}

onMounted(() => {
  initBgfx();
  tweenJackpot();
});
onBeforeUnmount(() => {
  if (starRaf) cancelAnimationFrame(starRaf);
  if (jackRaf) cancelAnimationFrame(jackRaf);
  if (onResize) window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div class="night-m">
    <!-- 星空背景 canvas -->
    <canvas ref="bgfx" class="night-m-bgfx" aria-hidden="true"></canvas>

    <!-- ===== HUD 頂欄（手機：餘額縱向疊，nav 隱藏） ===== -->
    <header class="night-m-hud">
      <div class="night-m-hud__inner">
        <div class="night-m-hud__avatar" :title="logoLabel">亨</div>
        <div class="night-m-hud__balances">
          <div class="night-m-hud__balrow">
            <span
              v-for="b in BALANCES.filter((x) => x.kind === 'coin')"
              :key="b.kind"
              class="night-m-pill"
            >
              <span class="night-m-pill__ic">{{ b.icon }}</span>
              <b>{{ b.value }}</b>
            </span>
          </div>
          <div class="night-m-hud__balrow">
            <span
              v-for="b in BALANCES.filter((x) => x.kind !== 'coin')"
              :key="b.kind"
              class="night-m-pill night-m-pill--sm"
              :class="`night-m-pill--${b.kind}`"
            >
              <span class="night-m-pill__ic">{{ b.icon }}</span>
              <b>{{ b.value }}</b>
            </span>
          </div>
        </div>
        <span class="night-m-hud__spacer"></span>
        <button type="button" class="night-m-btn3d">儲值</button>
      </div>
    </header>

    <div class="night-m-wrap">
      <!-- ===== Jackpot 燈板 ===== -->
      <section class="night-m-jackboard">
        <span
          v-for="i in 22"
          :key="i"
          class="night-m-jackboard__bulb"
          :style="{ animationDelay: `${i * 0.07}s` }"
        ></span>
        <p class="night-m-jackboard__label">{{ JACKPOT.label }}</p>
        <div class="night-m-jackboard__num">{{ jackText }}</div>
        <p class="night-m-jackboard__hint">{{ JACKPOT.hint }}</p>
      </section>

      <!-- ===== 分類入口 ===== -->
      <div class="night-m-cats">
        <button
          v-for="c in CATS"
          :key="c.id"
          type="button"
          class="night-m-cats__btn"
          :class="{ 'night-m-cats__btn--on': activeCat === c.id }"
          @click="activeCat = c.id"
        >
          <span class="night-m-cats__ic" v-html="ICONS[c.id]"></span>
          <span class="night-m-cats__label">{{ c.label }}</span>
        </button>
      </div>

      <!-- ===== 遊戲大廳（2 欄） ===== -->
      <section class="night-m-lobby">
        <a
          v-for="(g, gi) in visibleGames"
          :key="g.name"
          class="night-m-gtile"
          :class="{ 'night-m-gtile--feat': isFeat(g) }"
          href="#"
          @click.prevent
        >
          <span v-if="g.badge === 'hot'" class="night-m-gtile__ribbon"
            >HOT</span
          >
          <span
            v-if="g.badge === 'new'"
            class="night-m-gtile__ribbon night-m-gtile__ribbon--new"
            >NEW</span
          >
          <span
            class="night-m-gtile__art"
            v-html="cardSvg(g.scene, gi, isFeat(g))"
          ></span>
          <span class="night-m-gtile__band">
            <b>{{ g.name }}</b>
            <em>{{ g.en }}</em>
          </span>
          <span v-if="isFeat(g)" class="night-m-gtile__stand">
            <i v-for="k in 9" :key="k"></i>
          </span>
        </a>
      </section>

      <!-- ===== duo（手機堆疊）：促銷輪播 → dots → 中獎跑馬 ===== -->
      <section class="night-m-promo">
        <div
          class="night-m-promo__slides"
          :style="{ transform: `translateX(-${promoIdx * 100}%)` }"
        >
          <div
            v-for="p in PROMOS"
            :key="p.variant"
            class="night-m-promo__slide"
            :class="`night-m-promo__slide--${p.variant}`"
          >
            <span class="night-m-promo__kicker">{{ p.kicker }}</span>
            <h4 class="night-m-promo__title">{{ p.title }}</h4>
            <p class="night-m-promo__desc">{{ p.desc }}</p>
            <span class="night-m-promo__deco" v-html="DECOS[p.deco]()"></span>
          </div>
        </div>
      </section>
      <div class="night-m-dots">
        <button
          v-for="(p, i) in PROMOS"
          :key="p.variant"
          type="button"
          class="night-m-dots__dot"
          :class="{ 'night-m-dots__dot--on': promoIdx === i }"
          :aria-label="`切換到第 ${i + 1} 張`"
          @click="selectPromo(i)"
        ></button>
      </div>
      <div class="night-m-winners">
        <span class="night-m-winners__ico">$</span>
        <div class="night-m-winners__clip">
          <span class="night-m-winners__run">
            <template v-for="(w, i) in WINNERS" :key="i"
              >恭喜 {{ w.name }} 在「{{ w.game }}」贏得
              <b>{{ fmt(w.amount) }} 金幣</b>
              <span v-if="i < WINNERS.length - 1">{{
                WINNER_SEP
              }}</span></template
            >
          </span>
        </div>
      </div>

      <!-- ===== footer ===== -->
      <footer class="night-m-footer">
        <div class="night-m-footer__cols">
          <a v-for="l in FOOTER_LINKS" :key="l" href="#" @click.prevent>{{
            l
          }}</a>
        </div>
        <p class="night-m-footer__fine">
          {{ FOOTER_FINE }}<br /><br />© 2026 TYCOON Games. All rights
          reserved.
        </p>
      </footer>
    </div>

    <!-- ===== 固定底部 5 格 bottomnav（中間獎金池凸出金球） ===== -->
    <nav class="night-m-bottomnav">
      <a
        v-for="t in BOTTOM_TABS"
        :key="t.label"
        class="night-m-bottomnav__item"
        :class="{
          'night-m-bottomnav__item--jackpot': t.jackpot,
          'night-m-bottomnav__item--on': t.active
        }"
        href="#"
        @click.prevent
      >
        <span class="night-m-bottomnav__ic">{{ t.icon }}</span>
        {{ t.label }}
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&display=swap";

.night-m {
  position: relative;
  min-height: 100vh;
  background: var(--gradient-hero);
  background-attachment: fixed;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 700;
  overflow-x: hidden;
}

.night-m-bgfx {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

// ===== HUD =====
.night-m-hud {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--hud-bg);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(255, 255, 255, 0.09);

  &__inner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
  }

  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 16px;
    flex: none;
    display: grid;
    place-items: center;
    font-size: 1.3rem;
    font-weight: 800;
    color: #3a1c00;
    background: radial-gradient(
      circle at 35% 28%,
      #ffe9a8,
      var(--gold) 60%,
      oklch(70% 0.14 75deg)
    );
    border: 2.5px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.4),
      inset 0 -3px 6px rgba(120, 70, 0, 0.35);
  }

  // 手機：餘額縱向疊
  &__balances {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__balrow {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__spacer {
    flex: 1;
  }
}

.night-m-pill {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 150px;
  height: 28px;
  padding: 0 12px 0 28px;
  border-radius: 14px;
  background: var(--bg-overlay);
  border: 1.5px solid var(--border);
  white-space: nowrap;

  b {
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--gold);
    font-variant-numeric: tabular-nums;
  }

  &__ic {
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.74rem;
    font-weight: 800;
    color: #3a1c00;
    background: radial-gradient(
      circle at 35% 28%,
      var(--gold-hi),
      var(--gold) 58%,
      oklch(68% 0.14 78deg)
    );
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.45),
      inset 0 -2px 3px rgba(120, 70, 0, 0.35);
  }

  &--sm {
    min-width: 78px;
    height: 23px;
    padding: 0 10px 0 22px;

    b {
      font-size: 0.74rem;
    }

    .night-m-pill__ic {
      width: 21px;
      height: 21px;
      font-size: 0.6rem;
    }
  }

  &--gem {
    .night-m-pill__ic {
      border-radius: 6px;
      color: #03422a;
      background: radial-gradient(
        circle at 35% 28%,
        #c9ffe4,
        oklch(85% 0.15 165deg) 58%,
        oklch(62% 0.13 168deg)
      );
    }

    b {
      color: oklch(85% 0.15 165deg);
    }
  }

  &--lv b {
    color: #ffe9a8;
  }
}

.night-m-btn3d {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #ffffff;
  cursor: pointer;
  background: var(--gradient-cta);
  box-shadow:
    0 5px 0 var(--cta-shadow),
    0 8px 14px rgba(0, 0, 0, 0.4),
    inset 0 2px 3px rgba(255, 255, 255, 0.5);
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.1s,
    box-shadow 0.1s;

  &:active {
    transform: translateY(4px);
    box-shadow:
      0 1px 0 var(--cta-shadow),
      0 3px 8px rgba(0, 0, 0, 0.4),
      inset 0 2px 3px rgba(255, 255, 255, 0.5);
  }
}

// ===== wrap（底部留 bottomnav 空間） =====
.night-m-wrap {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 14px 116px;
}

// ===== Jackpot 燈板 =====
.night-m-jackboard {
  position: relative;
  margin-top: 18px;
  border-radius: 20px;
  padding: 24px 18px 20px;
  text-align: center;
  background: radial-gradient(
      80% 130% at 50% 115%,
      rgba(255, 213, 74, 0.16),
      transparent 55%
    ),
    var(--board-bg);
  border: 3px solid var(--purple-deep);
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.08),
    var(--shadow);

  &__label {
    font-size: 0.78rem;
    letter-spacing: 0.42em;
    text-indent: 0.42em;
    color: var(--text-muted);
    font-weight: 800;
  }

  &__num {
    margin-top: 4px;
    font-size: clamp(2rem, 7.5vw, 3.2rem);
    font-weight: 800;
    line-height: 1.05;
    background: linear-gradient(
      180deg,
      var(--gold-hi),
      var(--gold) 55%,
      oklch(68% 0.14 78deg)
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 3px 8px rgba(255, 213, 74, 0.3));
    font-variant-numeric: tabular-nums;
  }

  &__hint {
    margin-top: 2px;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  &__bulb {
    position: absolute;
    top: -4.5px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 35% 30%,
      var(--gold-hi),
      var(--gold) 65%,
      oklch(62% 0.13 80deg)
    );
    box-shadow: 0 0 8px oklch(85% 0.15 90deg / 0.9);
    animation: night-m-bulb 0.84s linear infinite alternate;

    @for $i from 1 through 22 {
      &:nth-child(#{$i}) {
        left: calc(#{$i - 1} * (100% / 21));
      }
    }
  }
}

@keyframes night-m-bulb {
  to {
    opacity: 0.18;
  }
}

// ===== 分類入口（橫向捲動） =====
.night-m-cats {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-top: 18px;
  padding-top: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  &__btn {
    flex: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 72px;
    border: none;
    background: none;
    cursor: pointer;
    transition: transform 0.12s;

    &:active {
      transform: scale(0.92);
    }
  }

  &__ic {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: radial-gradient(
      circle at 35% 28%,
      #6d48c9,
      #46248f 62%,
      #321a66
    );
    border: 2.5px solid var(--purple);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.45),
      inset 0 2px 4px rgba(255, 255, 255, 0.25);

    :deep(svg) {
      width: 30px;
      height: 30px;
    }
  }

  &__label {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--text-muted);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  &__btn--on &__ic {
    background: radial-gradient(
      circle at 35% 28%,
      #ffeeb0,
      var(--gold) 58%,
      oklch(68% 0.14 78deg)
    );
    border-color: #fff3c4;
    box-shadow:
      0 0 18px oklch(85% 0.15 90deg / 0.55),
      0 4px 10px rgba(0, 0, 0, 0.45);
  }

  &__btn--on &__label {
    color: var(--gold);
  }
}

// ===== 遊戲大廳（2 欄） =====
.night-m-lobby {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
  align-items: stretch;
  perspective: 900px;
}

.night-m-gtile {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border: 2.5px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.45),
    inset 0 2px 4px rgba(255, 255, 255, 0.18);

  &__art {
    position: relative;
    aspect-ratio: 200 / 190;

    :deep(svg) {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      display: block;
    }
  }

  &__band {
    position: relative;
    z-index: 2;
    padding: 9px 12px 11px;
    text-align: center;
    background: rgba(10, 4, 30, 0.55);
    backdrop-filter: blur(3px);

    b {
      display: block;
      font-size: 1rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
    }

    em {
      font-style: normal;
      font-size: 0.64rem;
      letter-spacing: 0.2em;
      color: var(--text-muted);
      font-weight: 700;
    }
  }

  &__ribbon {
    position: absolute;
    top: 12px;
    left: -30px;
    z-index: 4;
    width: 110px;
    padding: 4px 0;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #ffffff;
    transform: rotate(-38deg);
    background: linear-gradient(
      180deg,
      oklch(72% 0.19 28deg),
      oklch(58% 0.2 25deg)
    );
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);

    &--new {
      background: linear-gradient(
        180deg,
        oklch(70% 0.16 235deg),
        oklch(55% 0.17 245deg)
      );
    }
  }

  // featured 大卡：手機跨 2 行（grid-row span 2），場景撐滿
  &--feat {
    grid-row: span 2;
    border-color: var(--gold);
    box-shadow:
      0 0 0 2.5px rgba(120, 80, 0, 0.55),
      0 12px 26px rgba(0, 0, 0, 0.5);
  }

  &--feat &__art {
    aspect-ratio: auto;
    flex: 1;
  }

  &__stand {
    height: 13px;
    flex: none;
    position: relative;
    z-index: 2;
    background: linear-gradient(
      180deg,
      oklch(50% 0.17 320deg),
      oklch(36% 0.15 315deg)
    );
    border-top: 2px solid rgba(255, 255, 255, 0.35);
    display: flex;
    align-items: center;
    justify-content: space-around;

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--gold-hi);
      box-shadow: 0 0 6px oklch(85% 0.15 90deg / 0.9);
    }
  }
}

// ===== 促銷輪播 =====
.night-m-promo {
  position: relative;
  margin-top: 22px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 2.5px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.5);

  &__slides {
    display: flex;
    transition: transform 0.65s cubic-bezier(0.22, 0.8, 0.3, 1);
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;
    min-height: 152px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
    padding: 22px 26px;
    position: relative;
    overflow: hidden;

    &--s1 {
      background: radial-gradient(
          85% 140% at 90% 85%,
          oklch(60% 0.19 25deg / 0.55),
          transparent 55%
        ),
        linear-gradient(120deg, oklch(50% 0.19 350deg), oklch(60% 0.2 0deg));
    }

    &--s2 {
      background: radial-gradient(
          85% 140% at 88% 15%,
          oklch(62% 0.15 165deg / 0.5),
          transparent 55%
        ),
        linear-gradient(120deg, oklch(45% 0.17 290deg), oklch(56% 0.18 305deg));
    }

    &--s3 {
      background: radial-gradient(
          85% 140% at 12% 85%,
          oklch(66% 0.14 230deg / 0.5),
          transparent 55%
        ),
        linear-gradient(240deg, oklch(50% 0.16 245deg), oklch(42% 0.16 262deg));
    }
  }

  &__kicker {
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    font-weight: 800;
    opacity: 0.8;
  }

  &__title {
    font-size: clamp(1.3rem, 4.4vw, 2rem);
    font-weight: 800;
    line-height: 1.15;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
  }

  &__desc {
    font-size: 0.82rem;
    opacity: 0.88;
    letter-spacing: 0.05em;
  }

  &__deco {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 46%;
    pointer-events: none;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
}

.night-m-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;

  &__dot {
    width: 9px;
    height: 9px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.28);
    cursor: pointer;
    transition: all 0.2s;

    &--on {
      background: var(--gold);
      box-shadow: 0 0 8px oklch(85% 0.15 90deg / 0.8);
    }
  }
}

.night-m-winners {
  margin-top: 18px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.38);
  border: 1.5px solid var(--border);
  padding: 9px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.84rem;

  &__ico {
    flex: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.66rem;
    font-weight: 800;
    color: #3a1c00;
    background: radial-gradient(
      circle at 35% 28%,
      var(--gold-hi),
      var(--gold) 58%,
      oklch(66% 0.14 78deg)
    );
  }

  &__clip {
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    color: var(--text-muted);
  }

  &__run {
    display: inline-block;
    padding-left: 100%;
    animation: night-m-run 20s linear infinite;

    :deep(b) {
      color: var(--gold);
    }
  }
}

@keyframes night-m-run {
  to {
    transform: translateX(-100%);
  }
}

// ===== footer =====
.night-m-footer {
  margin-top: 36px;
  padding: 24px 0 10px;
  border-top: 1.5px solid var(--border);
  color: var(--text-muted);
  font-size: 0.8rem;
  text-align: center;

  &__cols {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 26px;
    justify-content: center;
    margin-bottom: 14px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__fine {
    line-height: 1.8;
    opacity: 0.6;
    font-weight: 400;
  }
}

// ===== 固定底部 5 格 bottomnav =====
.night-m-bottomnav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: linear-gradient(
    180deg,
    oklch(40% 0.16 300deg),
    oklch(30% 0.14 295deg) 60%
  );
  border-top: 2.5px solid rgba(255, 255, 255, 0.22);
  padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
  box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.45);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--text-muted);
    text-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.55);
    text-decoration: none;
    padding: 2px 0;
  }

  &__ic {
    width: 34px;
    height: 34px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    font-size: 1.05rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1.5px solid rgba(255, 255, 255, 0.16);
  }

  // 中間「獎金池」凸出金球
  &__item--jackpot &__ic {
    width: 58px;
    height: 58px;
    margin-top: -28px;
    border-radius: 50%;
    font-size: 1.5rem;
    color: #4a2400;
    background: radial-gradient(
      circle at 35% 28%,
      #fff5c0,
      var(--gold) 55%,
      oklch(66% 0.14 78deg) 82%,
      oklch(55% 0.12 72deg)
    );
    border: 3px solid #fff3c4;
    box-shadow:
      0 0 22px oklch(85% 0.15 90deg / 0.6),
      0 6px 14px rgba(0, 0, 0, 0.5),
      inset 0 -4px 8px rgba(140, 85, 0, 0.45);
  }

  &__item--jackpot {
    color: var(--gold);
  }
}
</style>
