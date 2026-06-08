<script setup lang="ts">
import hot1 from "../../assets/games/hot-1.png?url";
import hot2 from "../../assets/games/hot-2.png?url";
import hot3 from "../../assets/games/hot-3.png?url";
import hot4 from "../../assets/games/hot-4.png?url";
import hot5 from "../../assets/games/hot-5.png?url";
import hot6 from "../../assets/games/hot-6.png?url";

/**
 * at-deluxe desktop 熱門遊戲區 — 對齊 slime-at99 desktop.vue HotGame 區
 *
 * 原作結構：
 *   <HotGame :games="hotGame">
 *   hotGame 內含三組（熱門遊戲 / 電子遊戲 / 最新遊戲），各組 9~33 張 hot.png
 *   切 tab 顯示對應的 images grid，hover 浮動效果
 *
 * Demo 化：
 * - 標題列「熱門遊戲 HOT GAMES」+ tab 三段（熱門 / 電子 / 最新）
 * - 6 張卡片 grid 3-col，hover 帶青藍光暈與微浮動
 * - 標題用大字 + 小字英文副標（與 5d_v2 titleBox 風格對齊）
 */
import { ref } from "vue";

const TABS = [
  { key: "hot", label: "熱門遊戲" },
  { key: "slot", label: "電子遊戲" },
  { key: "new", label: "最新遊戲" }
];

const activeTab = ref<string>("hot");

const games = [hot1, hot2, hot3, hot4, hot5, hot6];
</script>

<template>
  <section class="at-deluxe-pc-hot">
    <div class="at-deluxe-pc-hot__inner">
      <header class="at-deluxe-pc-hot__head">
        <div class="at-deluxe-pc-hot__title">
          <h2 class="at-deluxe-pc-hot__title-cn">熱門遊戲</h2>
          <span class="at-deluxe-pc-hot__title-en">HOT GAMES</span>
        </div>
        <nav class="at-deluxe-pc-hot__tabs" aria-label="遊戲分類">
          <button
            v-for="t in TABS"
            :key="t.key"
            type="button"
            class="at-deluxe-pc-hot__tab"
            :class="{
              'at-deluxe-pc-hot__tab--active': activeTab === t.key
            }"
            @click="activeTab = t.key"
          >
            {{ t.label }}
          </button>
        </nav>
      </header>

      <div class="at-deluxe-pc-hot__grid">
        <article
          v-for="(img, i) in games"
          :key="i"
          class="at-deluxe-pc-hot__card"
        >
          <div class="at-deluxe-pc-hot__card-img">
            <img :src="img" :alt="`熱門遊戲 ${i + 1}`" />
            <span v-if="i < 3" class="at-deluxe-pc-hot__card-hot">HOT</span>
          </div>
          <div class="at-deluxe-pc-hot__card-info">
            <h3 class="at-deluxe-pc-hot__card-title">熱門遊戲 {{ i + 1 }}</h3>
            <p class="at-deluxe-pc-hot__card-desc">
              即刻開始體驗，享受極致刺激
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-hot {
  padding: 32px 0 16px;
}

.at-deluxe-pc-hot__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 16px;
}

.at-deluxe-pc-hot__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}

.at-deluxe-pc-hot__title {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.at-deluxe-pc-hot__title-cn {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: var(--text-on-primary);
  letter-spacing: 2px;
}

.at-deluxe-pc-hot__title-en {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-01);
  letter-spacing: 3px;
  text-shadow: 0 0 8px var(--primary-01);
}

.at-deluxe-pc-hot__tabs {
  display: flex;
  gap: 8px;
}

.at-deluxe-pc-hot__tab {
  padding: 8px 18px;
  background: transparent;
  border: 1px solid var(--at-deluxe-card-border);
  border-radius: 18px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.18s ease;

  &--active,
  &:hover {
    color: #ffffff;
    background: var(--gradient-sidebar-cat-active);
    border-color: transparent;
    box-shadow: var(--shadow-glow);
  }
}

.at-deluxe-pc-hot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.at-deluxe-pc-hot__card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border: 1px solid var(--at-deluxe-card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--at-deluxe-card-border-active);
    box-shadow: var(--shadow-glow);
  }
}

.at-deluxe-pc-hot__card-img {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
}

.at-deluxe-pc-hot__card:hover .at-deluxe-pc-hot__card-img img {
  transform: scale(1.05);
}

.at-deluxe-pc-hot__card-hot {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  background: var(--gradient-hot);
  color: #ffffff;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  border-radius: 6px 0 8px;
  box-shadow: var(--shadow-glow-hot);
}

.at-deluxe-pc-hot__card-info {
  padding: 14px 16px 18px;
}

.at-deluxe-pc-hot__card-title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: var(--text-on-primary);
  letter-spacing: 1px;
}

.at-deluxe-pc-hot__card-desc {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
