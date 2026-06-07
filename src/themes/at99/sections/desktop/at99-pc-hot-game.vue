<script setup lang="ts">
import { ref } from "vue";

/**
 * at99 桌面版熱門遊戲 — 視覺結構參考 slime-at99 desktop/hotGame.vue
 *
 * 原作 DOM：
 *   .gameProduct
 *     .gameProduct-gameList  (top tabs：熱門遊戲 / 電子遊戲 / 最新遊戲)
 *       .gameProduct-gameList--button v-for（active 變藍）
 *     .gameProduct-card
 *       .arrow.flipHorizontal （上一頁）
 *       .gameProduct-game (grid)
 *         .gameProduct-imgContainer v-for visibleImages
 *           <img.gameProduct-img />
 *           <p.gameProduct-title>{{ title }}</p>
 *           .gameProduct-overlay
 *       .arrow （下一頁）
 *
 * Demo 化策略：
 * - 3 個 tab（熱門 / 電子 / 最新）
 * - 每 tab 顯示 10 張遊戲縮圖 grid（5×2）
 * - 用 import.meta.glob 動態載入 hotX.png 共 12 張
 */

const hotImages = import.meta.glob<string>(
  "../../assets/desktop/gameBar/hot*.png",
  {
    eager: true,
    import: "default",
    query: "?url"
  }
);

function urlFor(name: string): string {
  return hotImages[`../../assets/desktop/gameBar/${name}`] ?? "";
}

interface GameTab {
  key: string;
  title: string;
  imgs: string[];
}

const TABS: GameTab[] = [
  {
    key: "hot",
    title: "熱門遊戲",
    imgs: [
      urlFor("hot1.png"),
      urlFor("hot2.png"),
      urlFor("hot3.png"),
      urlFor("hot4.png"),
      urlFor("hot5.png"),
      urlFor("hot6.png"),
      urlFor("hot7.png"),
      urlFor("hot8.png"),
      urlFor("hot9.png"),
      urlFor("hot10.png")
    ]
  },
  {
    key: "electronic",
    title: "電子遊戲",
    imgs: [
      urlFor("hot2.png"),
      urlFor("hot3.png"),
      urlFor("hot4.png"),
      urlFor("hot5.png"),
      urlFor("hot6.png"),
      urlFor("hot7.png"),
      urlFor("hot8.png"),
      urlFor("hot9.png"),
      urlFor("hot10.png"),
      urlFor("hot11.png")
    ]
  },
  {
    key: "new",
    title: "最新遊戲",
    imgs: [
      urlFor("hot1.png"),
      urlFor("hot3.png"),
      urlFor("hot5.png"),
      urlFor("hot7.png"),
      urlFor("hot9.png"),
      urlFor("hot11.png"),
      urlFor("hot12.png"),
      urlFor("hot2.png"),
      urlFor("hot4.png"),
      urlFor("hot6.png")
    ]
  }
];

const activeTab = ref<number>(0);
</script>

<template>
  <div class="at99-pc-hot">
    <div class="at99-pc-hot__tabs">
      <button
        v-for="(tab, idx) in TABS"
        :key="tab.key"
        type="button"
        class="at99-pc-hot__tab"
        :class="{ 'at99-pc-hot__tab--active': activeTab === idx }"
        @click="activeTab = idx"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="at99-pc-hot__card">
      <div class="at99-pc-hot__arrow at99-pc-hot__arrow--prev" />
      <div class="at99-pc-hot__grid">
        <div
          v-for="(img, idx) in TABS[activeTab].imgs"
          :key="`${activeTab}-${idx}`"
          class="at99-pc-hot__img-container"
        >
          <img :src="img" alt="" class="at99-pc-hot__img" />
          <p class="at99-pc-hot__title">{{ TABS[activeTab].title }}</p>
          <div class="at99-pc-hot__overlay" />
        </div>
      </div>
      <div class="at99-pc-hot__arrow at99-pc-hot__arrow--next" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.at99-pc-hot {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

// tabs：膠囊鈕、active 走 gradient-cta 變體跟動
.at99-pc-hot__tabs {
  display: flex;
  align-items: center;
  gap: 12px;
}

.at99-pc-hot__tab {
  height: 36px;
  padding: 0 20px;
  border-radius: 18px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  &--active {
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border-color: transparent;
    box-shadow: var(--neon-glow);
  }
}

// 主卡：左右箭頭 + 中央 grid
.at99-pc-hot__card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.at99-pc-hot__arrow {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--bg-overlay);
  border: 1px solid var(--border);
  position: relative;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: var(--gradient-cta);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    border-top: 2px solid var(--color-primary);
    border-right: 2px solid var(--color-primary);
    transform: translateX(2px) rotate(45deg);
  }

  &--prev::before {
    transform: translateX(-2px) rotate(225deg);
  }
}

// 10 張 grid（5 col × 2 row）
.at99-pc-hot__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  flex: 1;
}

.at99-pc-hot__img-container {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: var(--slot-tile-bg);
  border: 1px solid var(--border);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--neon-glow);
  }
}

.at99-pc-hot__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.at99-pc-hot__title {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  z-index: 2;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}

.at99-pc-hot__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 60%,
    rgba(0, 0, 0, 0.62) 100%
  );
  z-index: 1;
  pointer-events: none;
}

@media (width <= 1440px) {
  .at99-pc-hot__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
