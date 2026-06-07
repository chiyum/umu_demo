<script setup lang="ts">
/**
 * honest-no6 桌面版右側客服浮窗 — 視覺結構參考 slime-wu88-pc widgets/layout/right-bar.vue
 *
 * 對應原作 .customerServ ul li 結構：4-5 個客服渠道 icon + 文字
 * Demo 化：4 個 emoji-style icon + 文字（不引入額外圖檔，純 CSS 即可）
 */

interface CsItem {
  key: string;
  label: string;
  emoji: string;
}

const CS_ITEMS: CsItem[] = [
  { key: "line", label: "Line 客服", emoji: "L" },
  { key: "chat", label: "線上客服", emoji: "💬" },
  { key: "tg", label: "TG 客服", emoji: "T" },
  { key: "app", label: "APP 下載", emoji: "📱" }
];
</script>

<template>
  <div class="honest-max-pc-right-bar">
    <ul class="honest-max-pc-right-bar__list">
      <li
        v-for="item in CS_ITEMS"
        :key="item.key"
        class="honest-max-pc-right-bar__item"
      >
        <div class="honest-max-pc-right-bar__icon">{{ item.emoji }}</div>
        <p class="honest-max-pc-right-bar__label">{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 wu88 .customerServ：fixed right / 4 個 icon 堆疊
.honest-max-pc-right-bar {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
}

.honest-max-pc-right-bar__list {
  list-style: none;
  margin: 0;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
}

.honest-max-pc-right-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 4px;
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.18s ease;

  &:hover {
    background: hsla(var(--primary-h), var(--primary-s), 60%, 0.18);
  }
}

.honest-max-pc-right-bar__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  box-shadow: var(--shadow-glow);
}

.honest-max-pc-right-bar__label {
  margin: 0;
  font-size: 11px;
  color: var(--text-on-primary);
  white-space: nowrap;
}

@media (width <= 1280px) {
  .honest-max-pc-right-bar {
    display: none;
  }
}
</style>
