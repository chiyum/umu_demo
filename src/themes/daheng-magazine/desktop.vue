<script setup lang="ts">
/**
 * daheng-magazine desktop：a11 大亨雜誌精選 PC 重構版面（雜誌封面風）
 *
 * PC 重構策略：
 * - 上方雜誌封面 banner（左 2/3 大 hero + 右 1/3 編輯精選清單）
 * - 下方 4 欄專欄式 masonry
 * - 視覺像「Vogue / 國家地理」這種專題雜誌封面結構
 *
 * 為什麼選雜誌封面風：
 * - 手機 v6 的 feature 大圖 + masonry 已經有「雜誌風」基因
 * - PC 用更大的封面 + 編輯精選 + 多欄 masonry 強化此風格
 */
import { computed } from "vue";
import { DAHENG_CHIPS, DAHENG_GAMES, heroSrc } from "../daheng-shared/_data";
import { useDemoThemeStore } from "@/store/demo-theme.store";

// logo 改接 themeStore.currentLogo（v4.5 起）：對齊既有 theme 慣例
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

// 編輯精選清單：用 GAMES 前 5 個
const editorPicks = computed(() => DAHENG_GAMES.slice(0, 5));

// 4 欄 masonry：12 張，tall / shortc 交錯
const masonryItems = computed(() => {
  const tallShort = ["tall", "shortc", "tall", "shortc", "shortc", "tall"];
  return [...DAHENG_GAMES, ...DAHENG_GAMES].map((g, i) => ({
    ...g,
    kind: tallShort[i % tallShort.length]
  }));
});
</script>

<template>
  <div class="daheng-magazine-pc">
    <header class="daheng-magazine-pc__header">
      <div class="daheng-magazine-pc__brand">
        <img :src="logoSrc" :alt="logoLabel" />
        <span>大亨雜誌</span>
      </div>
      <div class="daheng-magazine-pc__chips">
        <span
          v-for="(c, i) in DAHENG_CHIPS"
          :key="c"
          class="daheng-magazine-pc__chip"
          :class="{ 'daheng-magazine-pc__chip--on': i === 0 }"
        >
          {{ c }}
        </span>
      </div>
      <button type="button" class="daheng-magazine-pc__btn-login">登入</button>
    </header>

    <!-- 封面 banner：左 2/3 大 hero + 右 1/3 編輯精選 -->
    <section class="daheng-magazine-pc__cover">
      <div class="daheng-magazine-pc__cover-main">
        <img :src="heroSrc" alt="本期主題" />
        <div class="daheng-magazine-pc__cover-overlay">
          <div class="daheng-magazine-pc__cover-tag">本期專題 · ISSUE 06</div>
          <h2>從零認識 DG 真人廳</h2>
          <p>本期特別企劃帶你走進視訊真人荷官的舞台</p>
          <button type="button">立即閱讀</button>
        </div>
      </div>
      <aside class="daheng-magazine-pc__cover-aside">
        <h3>編輯精選</h3>
        <ul>
          <li
            v-for="(g, i) in editorPicks"
            :key="g.key"
            class="daheng-magazine-pc__pick"
          >
            <span class="daheng-magazine-pc__pick-no">
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <img :src="g.img" :alt="g.name" />
            <div>
              <b>{{ g.name }}</b>
              <small>{{ g.en }}</small>
            </div>
          </li>
        </ul>
      </aside>
    </section>

    <!-- 4 欄專欄式 masonry -->
    <section class="daheng-magazine-pc__masonry-section">
      <header class="daheng-magazine-pc__sec-head">
        <h2>精選遊戲</h2>
        <span class="daheng-magazine-pc__more">查看全部</span>
      </header>
      <div class="daheng-magazine-pc__masonry">
        <div
          v-for="(item, i) in masonryItems"
          :key="`${item.key}-${i}`"
          class="daheng-magazine-pc__gcard"
          :class="`daheng-magazine-pc__gcard--${item.kind}`"
        >
          <img :src="item.img" :alt="item.name" />
          <div class="daheng-magazine-pc__gcard-meta">
            <b>{{ item.name }}</b>
            <small>{{ item.en }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.daheng-magazine-pc {
  min-height: 100vh;
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
  padding: 0 0 60px;

  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 18px 48px;
    background: rgba(255, 255, 255, 0.84);
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 18px -10px rgba(120, 72, 28, 0.3);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;

    // logo 樣式對齊 at99 / noya 橫式 logo pattern：height 固定 + width auto + max-width contain
    img {
      height: 44px;
      width: auto;
      max-width: 120px;
      object-fit: contain;
      display: block;
    }

    span {
      font-size: 18px;
      font-weight: 900;
      color: var(--color-primary);
      letter-spacing: 2px;
      font-family: var(--font-display);
    }
  }

  &__chips {
    flex: 1;
    display: flex;
    gap: 8px;
  }

  &__chip {
    padding: 8px 16px;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid var(--border);
    cursor: pointer;

    &--on {
      color: #ffffff;
      background: var(--gradient-cta);
      border-color: transparent;
    }
  }

  &__btn-login {
    padding: 10px 24px;
    border: none;
    border-radius: 22px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  // ── 封面 banner ───────────────────────────────
  &__cover {
    margin: 28px 48px 0;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  &__cover-main {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 460px;
      object-fit: cover;
      display: block;
    }
  }

  &__cover-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 32px 38px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(44, 37, 33, 0.85) 70%
    );
    color: #ffffff;
  }

  &__cover-tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 6px 14px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    margin-bottom: 14px;
  }

  &__cover-overlay h2 {
    font-size: 36px;
    font-weight: 900;
    margin: 0 0 8px;
    letter-spacing: 2px;
  }

  &__cover-overlay p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 18px;
  }

  &__cover-overlay button {
    padding: 12px 30px;
    border: 1.5px solid #ffffff;
    border-radius: 22px;
    background: transparent;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.18s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.18);
    }
  }

  &__cover-aside {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 24px;
    padding: 24px 24px 18px;
    box-shadow: var(--shadow);

    h3 {
      font-size: 18px;
      font-weight: 900;
      margin: 0 0 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }

  &__pick {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  &__pick-no {
    font-style: italic;
    font-weight: 900;
    font-size: 24px;
    color: var(--color-accent);
    width: 36px;
    -webkit-text-stroke: 0.4px rgba(180, 130, 60, 0.35);
  }

  &__pick img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  &__pick b {
    display: block;
    font-size: 14px;
    font-weight: 700;
  }

  &__pick small {
    display: block;
    margin-top: 2px;
    font-style: italic;
    font-weight: 700;
    font-size: 10px;
    color: #c4a68c;
    letter-spacing: 0.4px;
  }

  // ── 4 欄 masonry ───────────────────────────────
  &__masonry-section {
    margin: 48px 48px 0;
  }

  &__sec-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;

    h2 {
      font-size: 24px;
      font-weight: 900;
      margin: 0;
      letter-spacing: 1.5px;
    }
  }

  &__more {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-primary);
  }

  &__masonry {
    columns: 4;
    column-gap: 18px;
  }

  &__gcard {
    background: #ffffff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
    margin-bottom: 18px;
    break-inside: avoid;
    width: 100%;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    &--tall img {
      aspect-ratio: 3 / 4;
      object-fit: cover;
    }

    &--shortc img {
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  }

  &__gcard-meta {
    padding: 12px 14px 14px;
    text-align: center;

    b {
      display: block;
      font-size: 14px;
      font-weight: 700;
    }

    small {
      display: block;
      margin-top: 2px;
      font-style: italic;
      font-weight: 700;
      font-size: 10px;
      color: #c4a68c;
    }
  }

  // 註：hover img 規則必須放在整個 style block 最末，否則 stylelint
  // no-descending-specificity 會把 `&__gcard img` / `&__gcard--tall img` 視為
  // 後續更低特異度規則。pick:hover 放最後即可避開
  &__pick:hover img {
    transform: scale(1.04);
  }
}
</style>
