<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { heroSrc, CHIPS, GAMES, PROMOS, FOOTER_FINE, DOCK_TABS } from "./_data";

/**
 * daheng-coral（a18 大亨奶油珊瑚）手機版（窄版 <1024）
 * 1:1 對齊 大亨_AWD_版型F_奶油珊瑚.html 的 <1024px 佈局。
 *
 * 對齊原稿手機（窄版）結構與排序：
 *   topbar（logo + 登入/免費註冊）
 *   .wrap（flex column）內容排序對齊原稿 order：
 *     1. 膠囊分類列 .chips（order:-2 → 排最前；桌機隱藏，窄版顯示）
 *     2. 大家都在玩 .sec-games（order:-1）squircle 圓角大卡 2 欄
 *     3. hero-row（窄版單欄，只剩 hero 大圖；.daily 每日簽到卡 <768 隱藏）
 *     4. 限時優惠 prail（橫向滑動優惠卡）
 *     5. footer
 *   固定底部 dock 5 格膠囊（中間「遊戲」凸出 CTA 球）
 *
 * 與桌機共用同一份 _data，僅佈局/欄數/排序不同。Logo 接 themeStore.currentLogo。
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
</script>

<template>
  <div class="coral-m">
    <!-- ===== topbar ===== -->
    <header class="coral-m-topbar">
      <div class="coral-m-topbar__row">
        <a class="coral-m-logo" href="#" @click.prevent>
          <img :src="logoSrc" :alt="logoLabel" />
          <b>大亨遊戲城</b>
        </a>
        <span class="coral-m-topbar__spacer"></span>
        <a class="coral-m-btn coral-m-btn--soft" href="#" @click.prevent
          >登入</a
        >
        <a class="coral-m-btn coral-m-btn--coral" href="#" @click.prevent
          >免費註冊</a
        >
      </div>
    </header>

    <!-- 主內容（flex column，靠 order 控排序對齊原稿手機版） -->
    <div class="coral-m-wrap">
      <!-- 膠囊分類列（order:-2 排最前） -->
      <nav class="coral-m-chips">
        <a
          v-for="c in CHIPS"
          :key="c.label"
          class="coral-m-chips__item"
          :class="{ 'coral-m-chips__item--on': c.active }"
          href="#"
          @click.prevent
        >
          <span class="coral-m-chips__ic">{{ c.icon }}</span
          >{{ c.label }}
        </a>
      </nav>

      <!-- 大家都在玩（order:-1）squircle 圓角大卡 2 欄 -->
      <section class="coral-m-sec coral-m-sec--games">
        <div class="coral-m-sec__head">
          <span class="coral-m-sec__dot"></span>
          <h3 class="coral-m-sec__title">大家都在玩</h3>
          <a class="coral-m-sec__more" href="#" @click.prevent>更多 ›</a>
        </div>
        <div class="coral-m-ggrid">
          <a
            v-for="g in GAMES"
            :key="g.name"
            class="coral-m-gcard"
            href="#"
            @click.prevent
          >
            <span v-if="g.hot" class="coral-m-gcard__hot">HOT</span>
            <span class="coral-m-gcard__ph">
              <img :src="g.img" :alt="g.name" />
            </span>
            <span class="coral-m-gcard__meta">
              <span class="coral-m-gcard__txt">
                <b>{{ g.name }}</b
                ><em>{{ g.en }}</em>
              </span>
              <span class="coral-m-gcard__play">▶</span>
            </span>
          </a>
        </div>
      </section>

      <!-- hero（窄版單欄，每日簽到卡隱藏） -->
      <section class="coral-m-hero-row">
        <div class="coral-m-hero">
          <img :src="heroSrc" alt="首存1000送1000" />
          <div class="coral-m-hero__dots">
            <i class="coral-m-hero__dot coral-m-hero__dot--on"></i>
            <i class="coral-m-hero__dot"></i>
            <i class="coral-m-hero__dot"></i>
          </div>
        </div>
      </section>

      <!-- 限時優惠：橫向滑動優惠卡 -->
      <section class="coral-m-sec">
        <div class="coral-m-sec__head">
          <span class="coral-m-sec__dot"></span>
          <h3 class="coral-m-sec__title">限時優惠</h3>
          <a class="coral-m-sec__more" href="#" @click.prevent>全部 ›</a>
        </div>
        <div class="coral-m-prail">
          <a
            v-for="p in PROMOS"
            :key="p.title"
            class="coral-m-pcard"
            href="#"
            @click.prevent
          >
            <span class="coral-m-pcard__ico">{{ p.icon }}</span>
            <span class="coral-m-pcard__txt">
              <b>{{ p.title }}</b>
              <p>{{ p.desc }}</p>
            </span>
          </a>
        </div>
      </section>

      <footer class="coral-m-footer">
        <p>{{ FOOTER_FINE }}</p>
      </footer>
    </div>

    <!-- 固定底部 dock 5 格膠囊 -->
    <nav class="coral-m-dock">
      <a
        v-for="t in DOCK_TABS"
        :key="t.label"
        class="coral-m-dock__item"
        :class="{
          'coral-m-dock__item--cta': t.cta,
          'coral-m-dock__item--on': t.active
        }"
        href="#"
        @click.prevent
      >
        <template v-if="t.cta">{{ t.icon }}</template>
        <template v-else>
          <span class="coral-m-dock__ic">{{ t.icon }}</span
          >{{ t.label }}
        </template>
      </a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.coral-m {
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}

// ===== 共用按鈕 =====
.coral-m-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  transition: 0.15s;

  &--soft {
    background: var(--soft-bg);
    color: var(--color-secondary);
  }

  &--coral {
    background: var(--gradient-cta);
    color: var(--cta-ink);
    box-shadow: 0 4px 14px var(--glow);
  }
}

// ===== topbar =====
.coral-m-topbar {
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
    height: 62px;
    padding: 0 16px;
  }

  &__spacer {
    flex: 1;
  }
}

.coral-m-logo {
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
    font-size: 1rem;
    font-weight: 900;
    color: var(--color-secondary);
    letter-spacing: 0.06em;
  }
}

// ===== wrap（flex column + order 排序） =====
.coral-m-wrap {
  display: flex;
  flex-direction: column;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 16px 110px;
}

// ===== 膠囊分類列（order:-2 排最前） =====
.coral-m-chips {
  order: -2;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-top: 16px;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  &__item {
    flex: none;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 46px;
    padding: 0 20px;
    border-radius: 999px;
    background: var(--bg-surface);
    box-shadow: var(--shadow);
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;
    transition: 0.15s;

    &:hover,
    &--on {
      background: var(--gradient-cta);
      color: var(--cta-ink);
    }
  }

  &__ic {
    font-size: 1.2rem;
  }
}

// ===== section head =====
.coral-m-sec {
  margin-top: 30px;

  &--games {
    order: -1;
  }

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

// ===== squircle 圓角大卡（窄版 2 欄） =====
.coral-m-ggrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.coral-m-gcard {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-surface);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;

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
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px 14px;
  }

  &__txt {
    min-width: 0;

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

// ===== hero（窄版單欄） =====
.coral-m-hero-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-top: 30px;
}

.coral-m-hero {
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

// ===== 橫向優惠卡（窄版橫向滑動） =====
.coral-m-prail {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 6px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.coral-m-pcard {
  flex: none;
  width: 78%;
  max-width: 330px;
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
    min-width: 0;

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
.coral-m-footer {
  margin-top: 44px;
  padding: 26px 16px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.78rem;
}

// ===== 固定底部 dock 5 格膠囊 =====
.coral-m-dock {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 70;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  border-radius: 999px;
  background: var(--dock-bg);
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
    min-width: 52px;

    &--on {
      color: var(--color-secondary);
    }

    // 中間「遊戲」凸出 CTA 球
    &--cta {
      position: relative;
      top: -14px;
      width: 56px;
      height: 56px;
      min-width: 56px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 1.45rem;
      background: var(--gradient-cta);
      color: var(--cta-ink);
      box-shadow: 0 8px 18px var(--glow);
    }
  }

  &__ic {
    font-size: 1.3rem;
  }
}
</style>
