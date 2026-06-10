<script setup lang="ts">
/**
 * daheng-compact desktop：a09 大亨三欄密集 PC 重構版面（dashboard 風格）
 *
 * PC 重構策略：
 * - 左 vertical menu（cats 直立 + 圖示）
 * - 中央 6 欄高密度 grid（從 mobile 3 欄擴展到 6 欄，凸顯「密集」精神）
 * - 右側訊息 / promo / 排行榜聚合面板
 *
 * 為什麼選 dashboard：手機 v4 是「分類密集 + 遊戲密集」的高密度版面，
 * PC 用 dashboard 結構（左 menu 固定 + 中央寬 grid + 右多元 panel）最契合
 */
import { computed } from "vue";
import {
  DAHENG_CATS,
  DAHENG_GAMES,
  DAHENG_RANKS,
  trophySrc
} from "../daheng-shared/_data";
import DahengCatIcon from "../daheng-shared/atoms/daheng-cat-icon.vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

// logo 改接 themeStore.currentLogo（v4.5 起）：對齊既有 theme 慣例
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

// 中央密集 grid：6 欄 × 3 列 = 18 張，用 GAMES 重複填滿
const gridSet = computed(() => [
  ...DAHENG_GAMES,
  ...DAHENG_GAMES,
  ...DAHENG_GAMES
]);
</script>

<template>
  <div class="daheng-compact-pc">
    <!-- 左 vertical menu -->
    <aside class="daheng-compact-pc__menu">
      <div class="daheng-compact-pc__brand">
        <img :src="logoSrc" :alt="logoLabel" />
      </div>
      <nav>
        <div
          v-for="(cat, i) in DAHENG_CATS"
          :key="cat.key"
          class="daheng-compact-pc__menu-item"
          :class="{ 'daheng-compact-pc__menu-item--active': i === 0 }"
        >
          <DahengCatIcon :kind="cat.iconKind" />
          <span>{{ cat.label }}</span>
          <span v-if="cat.hot" class="daheng-compact-pc__menu-hot">HOT</span>
        </div>
      </nav>
    </aside>

    <!-- 中央 6 欄高密度 grid -->
    <main class="daheng-compact-pc__main">
      <header class="daheng-compact-pc__main-head">
        <h2>全部遊戲</h2>
        <div class="daheng-compact-pc__filter">
          <span
            class="daheng-compact-pc__filter-chip daheng-compact-pc__filter-chip--on"
          >
            全部
          </span>
          <span class="daheng-compact-pc__filter-chip">熱門</span>
          <span class="daheng-compact-pc__filter-chip">最新</span>
          <span class="daheng-compact-pc__filter-chip">真人</span>
          <span class="daheng-compact-pc__filter-chip">電子</span>
        </div>
      </header>
      <div class="daheng-compact-pc__grid">
        <div
          v-for="(g, i) in gridSet"
          :key="`${g.key}-${i}`"
          class="daheng-compact-pc__tile"
        >
          <img :src="g.img" :alt="g.name" />
          <div class="daheng-compact-pc__tile-name">{{ g.name }}</div>
        </div>
      </div>
    </main>

    <!-- 右側聚合 panel -->
    <aside class="daheng-compact-pc__panel">
      <section class="daheng-compact-pc__rank-panel">
        <h3>本週熱門 TOP 5</h3>
        <ol>
          <li
            v-for="r in DAHENG_RANKS"
            :key="r.n"
            class="daheng-compact-pc__rank-row"
          >
            <span class="daheng-compact-pc__rank-num">{{ r.n }}</span>
            <span class="daheng-compact-pc__rank-name">{{ r.name }}</span>
          </li>
        </ol>
      </section>

      <section class="daheng-compact-pc__promo-panel">
        <img :src="trophySrc" alt="獎盃" />
        <h3>週週優惠</h3>
        <p>首存 1000 送 1000</p>
        <button type="button">立即查看</button>
      </section>

      <section class="daheng-compact-pc__news-panel">
        <h3>近期公告</h3>
        <ul>
          <li>系統升級維護完成</li>
          <li>新增 RSG 12 款</li>
          <li>VIP 月禮開放領取</li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.daheng-compact-pc {
  min-height: 100vh;
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) 240px;
  gap: 16px;
  padding: 20px 28px 48px;

  // ── 左 menu ───────────────────────────────
  &__menu {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 18px;
    padding: 16px 10px;
    box-shadow: var(--shadow);
    position: sticky;
    top: 20px;
    height: fit-content;
  }

  &__brand {
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);

    // logo 樣式對齊 at99 / noya 橫式 logo pattern：height 固定 + width auto + max-width contain
    img {
      height: 60px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      display: block;
    }
  }

  &__menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 8px;
    border-radius: 10px;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 6px;

    &:hover {
      background: rgba(255, 255, 255, 0.7);
      color: var(--color-primary);
    }

    &--active {
      background: linear-gradient(180deg, #ffffff, #ffe7d2);
      color: var(--color-primary);
    }

    > span:nth-child(2) {
      flex: 1;
    }
  }

  &__menu-hot {
    font-style: italic;
    font-weight: 900;
    font-size: 10px;
    color: #ffffff;
    background: #e8642a;
    padding: 1px 5px;
    border-radius: 5px;
  }

  // ── 中央 main ───────────────────────────────
  &__main {
    background: rgba(255, 255, 255, 0.45);
    border-radius: 20px;
    padding: 20px 22px;
    box-shadow: var(--shadow);
  }

  &__main-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    h2 {
      font-size: 22px;
      font-weight: 900;
      margin: 0;
    }
  }

  &__filter {
    display: flex;
    gap: 8px;
  }

  &__filter-chip {
    padding: 6px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--border);
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted);
    cursor: pointer;

    &--on {
      color: #ffffff;
      background: var(--gradient-cta);
      border-color: transparent;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  &__tile {
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.18s ease;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      display: block;
    }
  }

  &__tile-name {
    padding: 6px 8px 8px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // ── 右側聚合 panel ───────────────────────────────
  &__panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: sticky;
    top: 20px;
    height: fit-content;
  }

  &__rank-panel,
  &__news-panel {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: var(--shadow);

    h3 {
      font-size: 15px;
      font-weight: 900;
      margin: 0 0 10px;
    }
  }

  &__rank-panel ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__rank-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__rank-num {
    font-style: italic;
    font-weight: 900;
    font-size: 16px;
    color: var(--color-accent);
    width: 22px;
    -webkit-text-stroke: 0.3px rgba(180, 130, 60, 0.35);
  }

  &__rank-name {
    flex: 1;
    font-size: 13px;
    font-weight: 700;
  }

  &__promo-panel {
    background: linear-gradient(160deg, #fbe6d2, #f7dcbf);
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: var(--shadow);
    text-align: center;

    img {
      width: 90px;
      margin: 0 auto 8px;
      display: block;
    }

    h3 {
      font-size: 16px;
      font-weight: 900;
      margin: 0;
    }

    p {
      font-size: 12px;
      color: #86705c;
      margin: 4px 0 10px;
    }

    button {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 16px;
      background: var(--gradient-cta);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  &__news-panel ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__news-panel li {
    font-size: 12px;
    color: var(--text-muted);
    padding-left: 12px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 6px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--color-accent);
    }
  }
}
</style>
