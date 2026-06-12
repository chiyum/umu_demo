<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { heroSrc, SIDE_NAV, GAMES, PROMOS, DAILY, FOOTER_FINE } from "./_data";

/**
 * daheng-coral（a18 大亨奶油珊瑚）桌面版（寬版 ≥1024）
 * 1:1 對齊 大亨_AWD_版型F_奶油珊瑚.html 的 ≥1024px 佈局。
 *
 * 對齊原稿桌機（寬版）結構：
 *   topbar（logo + 登入/免費註冊）
 *   frame = 左 220px 側欄（.side，兩 group 導覽，桌機限定顯示）+ 主欄
 *   主欄 .wrap：
 *     hero-row（2fr hero 輪播感大圖 + 1fr 每日簽到卡 .daily，桌機才顯示 daily）
 *     → 大家都在玩（ggrid squircle 圓角大卡 3 欄，.hot 角標）
 *     → 限時優惠（prail 3 張橫向優惠卡，桌機展開為 grid 3 欄）
 *     → footer
 *   寬版隱藏膠囊分類列 .chips 與手機 dock。
 *
 * 所有顏色走 [data-theme="daheng-coral"] CSS var，配色變體靠 _variants.scss 切。
 * Logo 接 themeStore.currentLogo，不寫死品牌；品牌字「大亨遊戲城」保留。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="coral">
    <!-- ===== topbar ===== -->
    <header class="coral-topbar">
      <div class="coral-topbar__row">
        <a class="coral-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <span class="coral-topbar__spacer"></span>
        <a class="coral-btn coral-btn--soft" href="#" @click.prevent>登入</a>
        <a class="coral-btn coral-btn--coral" href="#" @click.prevent
          >免費註冊</a
        >
      </div>
    </header>

    <!-- ===== frame：左側欄 + 主欄 ===== -->
    <div class="coral-frame">
      <!-- 桌機側欄（寬版限定顯示） -->
      <aside class="coral-side">
        <template v-for="item in SIDE_NAV" :key="item.label">
          <div v-if="item.group" class="coral-side__group">
            {{ item.group }}
          </div>
          <a
            class="coral-side__link"
            :class="{ 'coral-side__link--on': item.active }"
            href="#"
            @click.prevent
          >
            <span class="coral-side__ic">{{ item.icon }}</span
            >{{ item.label }}
          </a>
        </template>
      </aside>

      <!-- 主欄 -->
      <main class="coral-main">
        <div class="coral-wrap">
          <!-- hero-row：大圖 + 每日簽到卡 -->
          <section class="coral-hero-row">
            <div class="coral-hero">
              <img :src="heroSrc" alt="首存1000送1000" />
              <div class="coral-hero__dots">
                <i class="coral-hero__dot coral-hero__dot--on"></i>
                <i class="coral-hero__dot"></i>
                <i class="coral-hero__dot"></i>
              </div>
            </div>
            <div class="coral-daily">
              <b>{{ DAILY.title }}</b>
              <p>{{ DAILY.desc }}</p>
              <a class="coral-btn coral-btn--coral" href="#" @click.prevent>{{
                DAILY.cta
              }}</a>
            </div>
          </section>

          <!-- 大家都在玩：squircle 圓角大卡 -->
          <section class="coral-sec">
            <div class="coral-sec__head">
              <span class="coral-sec__dot"></span>
              <h3 class="coral-sec__title">大家都在玩</h3>
              <a class="coral-sec__more" href="#" @click.prevent>更多 ›</a>
            </div>
            <div class="coral-ggrid">
              <a
                v-for="g in GAMES"
                :key="g.name"
                class="coral-gcard"
                href="#"
                @click.prevent
              >
                <span v-if="g.hot" class="coral-gcard__hot">HOT</span>
                <span class="coral-gcard__ph">
                  <img :src="g.img" :alt="g.name" />
                </span>
                <span class="coral-gcard__meta">
                  <span class="coral-gcard__txt">
                    <b>{{ g.name }}</b
                    ><em>{{ g.en }}</em>
                  </span>
                  <span class="coral-gcard__play">▶</span>
                </span>
              </a>
            </div>
          </section>

          <!-- 限時優惠：橫向優惠卡（寬版展開為 grid 3 欄） -->
          <section class="coral-sec">
            <div class="coral-sec__head">
              <span class="coral-sec__dot"></span>
              <h3 class="coral-sec__title">限時優惠</h3>
              <a class="coral-sec__more" href="#" @click.prevent>全部 ›</a>
            </div>
            <div class="coral-prail">
              <a
                v-for="p in PROMOS"
                :key="p.title"
                class="coral-pcard"
                href="#"
                @click.prevent
              >
                <span class="coral-pcard__ico">{{ p.icon }}</span>
                <span class="coral-pcard__txt">
                  <b>{{ p.title }}</b>
                  <p>{{ p.desc }}</p>
                </span>
              </a>
            </div>
          </section>

          <footer class="coral-footer">
            <p>{{ FOOTER_FINE }}</p>
          </footer>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coral {
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.coral-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  transition: 0.15s;

  &--soft {
    background: var(--soft-bg);
    color: var(--color-secondary);

    &:hover {
      background: var(--soft-hover);
    }
  }

  &--coral {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 4px 14px var(--glow);

    &:hover {
      filter: brightness(1.06);
    }
  }
}

// ===== topbar =====
.coral-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--topbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

  &__row {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 62px;
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 16px;
  }

  &__spacer {
    flex: 1;
  }
}

.coral-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  img {
    height: 40px;
    width: auto;
    object-fit: contain;
  }

  b {
    font-size: 1.1rem;
    font-weight: 900;
    color: var(--color-secondary);
    letter-spacing: 0.06em;
  }
}

// ===== frame =====
.coral-frame {
  display: flex;
  min-height: 100vh;
}

// ===== 桌機側欄（寬版限定顯示） =====
.coral-side {
  flex: none;
  width: 220px;
  padding: 20px 14px;
  border-right: 1px solid var(--border);
  background: var(--bg-surface);

  &__group {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    color: var(--text-muted);
    margin: 18px 10px 8px;

    &:first-child {
      margin-top: 0;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border-radius: 999px;
    font-size: 0.94rem;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    transition: 0.15s;

    &:hover {
      background: var(--soft-bg);
      color: var(--text-primary);
    }

    &--on {
      background: var(--gradient-cta);
      color: var(--cta-ink);
      font-weight: 700;
      box-shadow: 0 4px 12px var(--glow);
    }
  }

  &__ic {
    font-size: 1.15rem;
  }
}

// ===== main =====
.coral-main {
  flex: 1;
  min-width: 0;
}

.coral-wrap {
  display: flex;
  flex-direction: column;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 16px 40px;
}

// ===== hero-row（2fr hero + 1fr daily） =====
.coral-hero-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
  margin-top: 16px;
}

.coral-hero {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);

  img {
    width: 100%;
    aspect-ratio: 1065 / 340;
    object-fit: cover;
  }

  &__dots {
    position: absolute;
    left: 16px;
    bottom: 12px;
    display: flex;
    gap: 6px;
  }

  &__dot {
    width: 18px;
    height: 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.55);

    &--on {
      background: var(--color-primary);
    }
  }
}

.coral-daily {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 22px;
  border-radius: var(--radius);
  background: var(--gradient-hero);
  box-shadow: var(--shadow);

  b {
    font-size: 1.05rem;
    font-weight: 900;
  }

  p {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .coral-btn {
    align-self: flex-start;
    margin-top: 4px;
    height: 36px;
  }
}

// ===== section head =====
.coral-sec {
  margin-top: 30px;

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-primary);
  }

  &__title {
    font-size: 1.18rem;
    font-weight: 900;
    letter-spacing: 0.05em;
  }

  &__more {
    margin-left: auto;
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--color-secondary);
    white-space: nowrap;
    text-decoration: none;
  }
}

// ===== squircle 圓角大卡（寬版 3 欄） =====
.coral-ggrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.coral-gcard {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;
  transition: 0.18s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(150, 90, 50, 0.18);
  }

  &__ph {
    display: block;
    aspect-ratio: 5 / 4;
    overflow: hidden;
    border-radius: var(--radius-card) var(--radius-card) 0 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      transition: transform 0.3s;
    }
  }

  &:hover &__ph img {
    transform: scale(1.04);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px 14px;
  }

  &__txt {
    b {
      font-size: 0.96rem;
      font-weight: 900;
    }

    em {
      display: block;
      font-style: normal;
      font-size: 0.7rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
    }
  }

  &__play {
    margin-left: auto;
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gradient-cta);
    color: var(--cta-ink);
    font-size: 0.9rem;
    box-shadow: 0 4px 10px var(--glow);
  }

  &__hot {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 900;
    background: var(--hot-bg);
    backdrop-filter: blur(4px);
    color: var(--color-secondary);
  }
}

// ===== 橫向優惠卡（寬版展開為 grid 3 欄） =====
.coral-prail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.coral-pcard {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: var(--radius);
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;

  &__ico {
    flex: none;
    width: 52px;
    height: 52px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    background: var(--soft-bg);
  }

  &__txt {
    b {
      display: block;
      font-size: 0.95rem;
      font-weight: 900;
    }

    p {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 2px;
    }
  }
}

// ===== footer =====
.coral-footer {
  margin-top: 44px;
  padding: 26px 16px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.78rem;
}
</style>
