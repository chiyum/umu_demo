<script setup lang="ts">
/**
 * at99 桌面版單一類別 game bar — 視覺結構參考 slime-at99 desktop/gameBar.vue
 *
 * 原作 DOM：
 *   .gameBar
 *     .activeGameButton.gameBar-button → 類別名稱（如「捕魚」）
 *     .gameBar-card
 *       .arrow.flipHorizontal
 *       .gameBar-game (橫向 list 顯示 6 張)
 *         <img v-for visibleImages />
 *       .arrow
 *
 * Demo 化：左側類別標籤 + 橫向 6 張遊戲圖 + 左右箭頭
 *
 * 為什麼這個 section 用 props 接 game.gameName / game.images：
 * - 原作就是 component <GameBar :game="..." />，可以在 desktop.vue 內被多次使用（捕魚 / 真人）
 * - 共用 SCSS，呼叫端只傳資料
 */

interface GameProp {
  gameName: string;
  images: string[];
}

defineProps<{
  game: GameProp;
}>();
</script>

<template>
  <div class="at99-pc-game-bar">
    <button type="button" class="at99-pc-game-bar__label">
      {{ game.gameName }}
    </button>

    <div class="at99-pc-game-bar__card">
      <div class="at99-pc-game-bar__arrow at99-pc-game-bar__arrow--prev" />
      <div class="at99-pc-game-bar__list">
        <div
          v-for="(img, idx) in game.images.slice(0, 6)"
          :key="idx"
          class="at99-pc-game-bar__item"
        >
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="at99-pc-game-bar__arrow at99-pc-game-bar__arrow--next" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.at99-pc-game-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.at99-pc-game-bar__label {
  flex-shrink: 0;
  width: 140px;
  height: 80px;
  padding: 0 16px;
  border: 1px solid var(--color-primary);
  border-radius: 16px;
  background: var(--gradient-cta);
  color: var(--text-on-primary);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--neon-glow);
}

.at99-pc-game-bar__card {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.at99-pc-game-bar__arrow {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--bg-overlay);
  border: 1px solid var(--border);
  position: relative;
  cursor: pointer;

  &:hover {
    background: var(--gradient-cta);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 10px;
    height: 10px;
    border-top: 2px solid var(--color-primary);
    border-right: 2px solid var(--color-primary);
    transform: translateX(2px) rotate(45deg);
  }

  &--prev::before {
    transform: translateX(-2px) rotate(225deg);
  }
}

.at99-pc-game-bar__list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  flex: 1;
}

.at99-pc-game-bar__item {
  position: relative;
  aspect-ratio: 4 / 3;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

@media (width <= 1440px) {
  .at99-pc-game-bar__list {
    grid-template-columns: repeat(5, 1fr);
  }

  .at99-pc-game-bar__item:nth-child(6) {
    display: none;
  }
}
</style>
