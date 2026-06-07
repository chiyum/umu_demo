<script setup lang="ts">
import { ref } from "vue";
import plat100 from "../../assets/wu88/platform/100.png?url";
import plat101 from "../../assets/wu88/platform/101.png?url";
import plat102 from "../../assets/wu88/platform/102.png?url";
import plat103 from "../../assets/wu88/platform/103.png?url";
import plat105 from "../../assets/wu88/platform/105.png?url";
import plat106 from "../../assets/wu88/platform/106.png?url";

/**
 * honest-no6 桌面版遊戲平台網格 — 視覺結構參考 slime-wu88-pc main-nav 副選單 + index 平台 grid
 *
 * 對應原作：main-nav subList 內 .listContainer，包含平台 logo + 名稱（KU真人 / KU體育 等）
 * Demo 化：用獨立 section 渲染 6 個 KU 系平台 grid（3 col × 2 row）
 *
 * 上方 tabs 切換類別（熱門 / 真人 / 體育 / 棋牌 / 電子 / 彩球）
 * 每個 tab 對應一組平台縮圖（demo 用同一組 6 張示範）
 */

interface Platform {
  key: string;
  label: string;
  img: string;
}

const PLATFORMS_BY_TAB: Record<string, Platform[]> = {
  hot: [
    { key: "ku-live", label: "KU 真人", img: plat100 },
    { key: "ku-sport", label: "KU 體育", img: plat101 },
    { key: "ku-ball", label: "KU 彩球", img: plat102 },
    { key: "ku-3d", label: "3D 電子", img: plat103 },
    { key: "ku-chess", label: "KU 棋牌", img: plat105 },
    { key: "ku-fish", label: "KU 捕魚", img: plat106 }
  ]
};

const TABS = [
  { key: "hot", label: "熱門遊戲" },
  { key: "live", label: "真人視訊" },
  { key: "sport", label: "體育投注" },
  { key: "slot", label: "電子遊戲" },
  { key: "lottery", label: "彩票彩球" },
  { key: "fish", label: "捕魚遊戲" }
];

const activeTab = ref<string>("hot");
function currentPlatforms(): Platform[] {
  return PLATFORMS_BY_TAB[activeTab.value] ?? PLATFORMS_BY_TAB.hot;
}
</script>

<template>
  <section class="honest-max-pc-platforms">
    <div class="honest-max-pc-platforms__tabs">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        type="button"
        class="honest-max-pc-platforms__tab"
        :class="{
          'honest-max-pc-platforms__tab--active': activeTab === tab.key
        }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="honest-max-pc-platforms__grid">
      <div
        v-for="p in currentPlatforms()"
        :key="p.key"
        class="honest-max-pc-platforms__card"
      >
        <img :src="p.img" :alt="p.label" class="honest-max-pc-platforms__img" />
        <div class="honest-max-pc-platforms__title">{{ p.label }}</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.honest-max-pc-platforms {
  margin: 32px 0;
}

.honest-max-pc-platforms__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.honest-max-pc-platforms__tab {
  padding: 8px 20px;
  border-radius: 18px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    color: var(--secondary-01);
    border-color: var(--secondary-01);
  }

  &--active {
    color: var(--text-on-gold);
    background: var(--gradient-gold);
    border-color: transparent;
    box-shadow: var(--shadow-glow);
  }
}

.honest-max-pc-platforms__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.honest-max-pc-platforms__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px hsla(var(--primary-h), var(--primary-s), 40%, 0.5);
  }
}

.honest-max-pc-platforms__img {
  width: 100%;
  max-width: 140px;
  height: auto;
  object-fit: contain;
}

.honest-max-pc-platforms__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-on-primary);
}

@media (width <= 1024px) {
  .honest-max-pc-platforms__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
