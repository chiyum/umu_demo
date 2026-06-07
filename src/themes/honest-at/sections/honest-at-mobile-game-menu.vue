<script setup lang="ts">
import { ref, computed } from "vue";
import cardBg from "../assets/games/card-bg.png?url";
import hot1 from "../assets/hot/hot-1.png?url";
import hot2 from "../assets/hot/hot-2.png?url";
import hot3 from "../assets/hot/hot-3.png?url";
import hot4 from "../assets/hot/hot-4.png?url";
import hot5 from "../assets/hot/hot-5.png?url";
import live1 from "../assets/games/10023.png?url";
import live1Logo from "../assets/games/10024.png?url";
import live2 from "../assets/games/10025.png?url";
import live2Logo from "../assets/games/10026.png?url";
import live3 from "../assets/games/10027.png?url";
import live3Logo from "../assets/games/10028.png?url";
import live4 from "../assets/games/10029.png?url";
import live4Logo from "../assets/games/10030.png?url";
import live5 from "../assets/games/10031.png?url";
import live5Logo from "../assets/games/10032.png?url";

/**
 * honest-at mobile 遊戲選單 — 對齊 honest_real at/widgets/pages/at/game.vue
 *
 * 原作結構：
 *   左側 .at-game-category 7 分類垂直 tab（熱門/真人/電子/彩票/棋牌/捕魚/體育）
 *   右側 swiper 垂直滑動 7 個 slide，目前 demo 只渲染「熱門 + 真人」兩段
 *   - 熱門 slide：5 個圓形 hot-item 卡（icon + label）
 *   - 真人 slide：2x3 grid 卡（platform-item 含 bg + image + content）
 *
 * 為什麼 demo 化只渲染熱門 + 真人：
 * - 真實業務站點才需要 swiper 滑動切換 7 個分類
 * - demo 站點目標是「展示 layout 視覺」，2 段卡片已足夠呈現結構
 * - 7 分類仍保留在 sidebar 內（含 active 視覺），點擊不切換但維持 hover 互動
 */

interface Category {
  key: string;
  label: string;
}

const CATEGORIES: Category[] = [
  { key: "hot", label: "熱門" },
  { key: "live", label: "真人" },
  { key: "slot", label: "電子" },
  { key: "lottery", label: "彩票" },
  { key: "chess", label: "棋牌" },
  { key: "fish", label: "捕魚" },
  { key: "sport", label: "體育" }
];

const activeCategory = ref<string>("hot");

const HOT_ITEMS = [
  { icon: hot1, label: "AT-體育" },
  { icon: hot2, label: "DG-真人" },
  { icon: hot3, label: "ATG-電子" },
  { icon: hot4, label: "ATG-麻將" },
  { icon: hot5, label: "AG-戰神塞特" }
];

const LIVE_CARDS = [
  { image: live1, logo: live1Logo, title: "AG-真人", desc: "AT-LIVE" },
  { image: live2, logo: live2Logo, title: "DG-真人", desc: "DG-LIVE" },
  { image: live3, logo: live3Logo, title: "ATG-真人", desc: "ATG-LIVE" },
  { image: live4, logo: live4Logo, title: "WM-真人", desc: "WM-LIVE" },
  { image: live5, logo: live5Logo, title: "AG-真人", desc: "AG-LIVE" }
];

// 右下角的「切換版本 + 粉絲專頁 / 活動中心」
// 為什麼放在 game-menu 內部而非獨立 section：
// - 原作就是 slide 內最後一段（at-game-list-slide-hot-link）
// - 視覺上跟卡片貼著，獨立 section padding 對不上
const showSwitcher = computed(() => activeCategory.value === "hot");
</script>

<template>
  <section class="honest-at-m-menu">
    <!-- 左 sidebar：7 分類垂直 tab -->
    <aside class="honest-at-m-menu__sidebar">
      <button
        v-for="c in CATEGORIES"
        :key="c.key"
        type="button"
        class="honest-at-m-menu__tab"
        :class="{ 'honest-at-m-menu__tab--active': activeCategory === c.key }"
        @click="activeCategory = c.key"
      >
        <span class="honest-at-m-menu__tab-icon" :class="`is-${c.key}`" />
        <span class="honest-at-m-menu__tab-label">{{ c.label }}</span>
      </button>
    </aside>

    <!-- 右側內容：依 active category 切換 -->
    <div class="honest-at-m-menu__panel">
      <!-- 熱門 -->
      <div v-if="activeCategory === 'hot'" class="honest-at-m-menu__hot-grid">
        <div
          v-for="(item, i) in HOT_ITEMS"
          :key="i"
          class="honest-at-m-menu__hot-item"
        >
          <div class="honest-at-m-menu__hot-circle">
            <img :src="item.icon" :alt="item.label" />
          </div>
          <div class="honest-at-m-menu__hot-label">{{ item.label }}</div>
        </div>

        <!-- 切換版本 / 粉絲專頁區（右下方膠囊塊） -->
        <div class="honest-at-m-menu__switcher" v-if="showSwitcher">
          <div class="honest-at-m-menu__switcher-row">粉絲專頁</div>
          <div class="honest-at-m-menu__switcher-btn">切換版本</div>
          <div class="honest-at-m-menu__switcher-row">活動中心</div>
        </div>
      </div>

      <!-- 真人卡片 grid -->
      <div
        v-else-if="activeCategory === 'live'"
        class="honest-at-m-menu__cards"
      >
        <div
          v-for="(card, i) in LIVE_CARDS"
          :key="i"
          class="honest-at-m-menu__card"
          :style="{ backgroundImage: `url(${cardBg})` }"
        >
          <img
            :src="card.image"
            :alt="card.title"
            class="honest-at-m-menu__card-img"
          />
          <div class="honest-at-m-menu__card-info">
            <img
              :src="card.logo"
              :alt="`${card.title} logo`"
              class="honest-at-m-menu__card-logo"
            />
            <div class="honest-at-m-menu__card-title">{{ card.title }}</div>
            <div class="honest-at-m-menu__card-desc">{{ card.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 其他分類顯示「即將上線」placeholder -->
      <div v-else class="honest-at-m-menu__placeholder">
        <span
          >{{
            CATEGORIES.find((c) => c.key === activeCategory)?.label
          }}
          分類即將上線</span
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 主結構：左 70px sidebar + 右 1fr panel
.honest-at-m-menu {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 8px;
  padding: 8px;
}

// ─────── sidebar ───────
.honest-at-m-menu__sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.honest-at-m-menu__tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 4px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:active {
    transform: scale(0.96);
  }

  &--active {
    background: rgba(45, 212, 255, 0.18);
    color: var(--honest-at-neon-frame);
    box-shadow: inset 0 0 0 1px var(--honest-at-neon-frame);
  }
}

// sidebar icon：用 CSS 純色 + 文字標誌（demo 化省 7 張 icon 圖檔）
// 對齊原作每個分類 icon class（is-hot / is-live ...），這裡用 ::before 渲染熱詞 emoji 風
.honest-at-m-menu__tab-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    var(--primary-04) 0%,
    var(--primary-01) 100%
  );
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  // 為什麼用 emoji-like 文字當 icon：demo 化省 7 張 SVG 不必額外複製
  // 視覺上接近原作的彩色 icon 群（火/真人/電子/彩票/棋/魚/球）
  &::before {
    content: "";
    width: 18px;
    height: 18px;
    background: currentcolor;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    color: var(--honest-at-neon-frame);
  }

  &.is-hot::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M12 23c-4.4 0-8-3-8-7.5 0-3 2-5.4 3-7l1 1c.5-2.5 2-5 3-7 1 5 4 6 4 11 0 2-1 4-3 4-1.5 0-3-1-3-2.5 0-1.5 1-2 2-2.5C13 14 16 14 16 16c0 1.5-2 7-4 7Z'/%3E%3C/svg%3E");
  }

  &.is-live::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4Z'/%3E%3C/svg%3E");
  }

  &.is-slot::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M5 4h14v16H5z M7 8h3v8H7zm4 0h2v8h-2zm4 0h2v8h-2z'/%3E%3C/svg%3E");
  }

  &.is-lottery::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z'/%3E%3C/svg%3E");
  }

  &.is-chess::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z'/%3E%3C/svg%3E");
  }

  &.is-fish::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M2 12s4-6 10-6 8 4 10 6c-2 2-4 6-10 6S2 12 2 12Zm14-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'/%3E%3C/svg%3E");
  }

  &.is-sport::before {
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a6 6 0 0 1 6 6h-3l-3-3V6Zm-6 6a6 6 0 0 1 3-5l3 3v3l-3 3-3-1Zm6 6a6 6 0 0 1-3-1l3-3h6l-3 3-3 1Z'/%3E%3C/svg%3E");
  }
}

.honest-at-m-menu__tab-label {
  font-size: 12px;
  line-height: 1.2;
}

// ─────── 熱門 grid ───────
.honest-at-m-menu__hot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-content: start;
}

.honest-at-m-menu__hot-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.honest-at-m-menu__hot-circle {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  border: 2px solid var(--honest-at-neon-frame);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--honest-at-card-bg);
  box-shadow: var(--shadow-glow);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.honest-at-m-menu__hot-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-on-primary);
}

// 切換版本 / 粉絲專頁 / 活動中心：右下方膠囊塊
// 為什麼跨整行兩格：對齊原作右下方擺放
.honest-at-m-menu__switcher {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  margin-top: 4px;
}

.honest-at-m-menu__switcher-row {
  padding: 6px 10px;
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
}

.honest-at-m-menu__switcher-btn {
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #1a0500;
  text-align: center;
  background: var(--gradient-gold);
  border-radius: 8px;
  cursor: pointer;
}

// ─────── 真人 grid ───────
.honest-at-m-menu__cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  align-content: start;
}

.honest-at-m-menu__card {
  position: relative;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}

.honest-at-m-menu__card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.honest-at-m-menu__card-info {
  position: absolute;
  left: 6px;
  bottom: 6px;
  right: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.55) 100%
  );
  padding: 4px 6px;
  border-radius: 6px;
}

.honest-at-m-menu__card-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: var(--honest-at-card-bg);
  border-radius: 6px;
  padding: 3px;
}

.honest-at-m-menu__card-title {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.honest-at-m-menu__card-desc {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.78);
}

.honest-at-m-menu__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--text-muted);
  font-size: 14px;
}
</style>
