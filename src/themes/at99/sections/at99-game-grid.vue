<script setup lang="ts">
/**
 * at99 電子遊戲列：6 個遊戲方塊 + 上方 tab（熱門遊戲 / 電子遊戲 / 桌牌遊戲）
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const tabs = ["熱門遊戲", "電子遊戲", "桌牌遊戲"];
const activeTab = ref(0);

const games = [
  { id: 1, name: "雷神之槌", color: "#ff5252" },
  { id: 2, name: "海盜寶藏", color: "#00bfa5" },
  { id: 3, name: "皇家撲克", color: "#ff9800" },
  { id: 4, name: "千年金獅", color: "#ffd84d" },
  { id: 5, name: "東方戰神", color: "#7c3aed" },
  { id: 6, name: "麻將之夜", color: "#1e88e5" }
];
</script>

<template>
  <section
    id="games"
    class="at99-grid"
    :class="{ 'at99-grid--mobile': mobile }"
  >
    <div class="at99-grid__inner">
      <div class="at99-grid__tabs">
        <button
          v-for="(tab, idx) in tabs"
          :key="tab"
          type="button"
          class="at99-grid__tab"
          :class="{ 'at99-grid__tab--active': activeTab === idx }"
          @click="activeTab = idx"
        >
          {{ tab }}
        </button>
      </div>

      <div class="at99-grid__list">
        <div v-for="game in games" :key="game.id" class="at99-grid__card">
          <div
            class="at99-grid__card-bg"
            :style="{
              background: `linear-gradient(135deg, ${game.color}, var(--bg-surface))`
            }"
          >
            <!-- 遊戲圖示：SVG 抽象圖樣 -->
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="50,15 61,40 88,42 67,60 74,86 50,72 26,86 33,60 12,42 39,40"
                fill="#fff"
                opacity="0.3"
              />
            </svg>
          </div>
          <div class="at99-grid__card-name">{{ game.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-grid {
  background: var(--bg-base);
  padding: 24px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  &__tab {
    padding: 8px 18px;
    border: 1px solid var(--border);
    background: var(--bg-surface);
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;

    &--active {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  &__card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &__card-bg {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 60%;
      height: auto;
    }
  }

  &__card-name {
    padding: 8px;
    text-align: center;
    color: var(--text-primary);
    font-size: 12px;
    font-weight: 600;
    background: var(--bg-surface);
  }

  &--mobile {
    .at99-grid__inner {
      padding: 0 14px;
    }

    .at99-grid__list {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .at99-grid__tabs {
      overflow-x: auto;
    }

    .at99-grid__tab {
      flex: 0 0 auto;
    }
  }
}
</style>
