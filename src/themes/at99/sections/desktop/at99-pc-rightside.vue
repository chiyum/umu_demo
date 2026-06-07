<script setup lang="ts">
import iconDeposit from "../../assets/desktop/rightSide/firstDeposit.png?url";
import iconElectronic from "../../assets/desktop/rightSide/electronic.png?url";
import iconMember from "../../assets/desktop/rightSide/pamperMember.png?url";
import iconCs from "../../assets/desktop/rightSide/customerService.png?url";

/**
 * at99 桌面版右側浮窗 — 視覺結構參考 slime-at99 desktop layout/rightSide.vue
 *
 * 原作 DOM：
 *   .rightSide (fixed right)
 *     .rightSide--block
 *       .rightSide--firstDeposit （點擊跳優惠）
 *       .rightSide--electronic
 *       .rightSide--pamperMember
 *       .rightSide--customerService
 *
 * Demo 化：4 個按鈕固定右側，純展示
 */

const ITEMS = [
  { key: "deposit", label: "首儲優惠", icon: iconDeposit },
  { key: "electronic", label: "電子福利", icon: iconElectronic },
  { key: "member", label: "尊榮會員", icon: iconMember },
  { key: "cs", label: "線上客服", icon: iconCs }
];
</script>

<template>
  <div class="at99-pc-rightside">
    <div
      v-for="item in ITEMS"
      :key="item.key"
      class="at99-pc-rightside__item"
      :aria-label="item.label"
    >
      <img :src="item.icon" :alt="item.label" class="at99-pc-rightside__icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 slime-at99 .rightSide：fixed right / 圓角卡片堆疊
.at99-pc-rightside {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.at99-pc-rightside__item {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--neon-glow);
  }
}

.at99-pc-rightside__icon {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

@media (width <= 1280px) {
  .at99-pc-rightside {
    display: none;
  }
}
</style>
