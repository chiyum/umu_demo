<script setup lang="ts">
/**
 * dahsing-tabs 子分頁 pill（全部 / 真人 / 體育 / 電子 / 捕魚）
 *
 * 1:1 對齊原稿 大亨首頁-版型B 分頁 (1).html 的 .subtabs / .subtab：
 * - flex 橫向 scroll；scrollbar 隱藏
 * - pill 形 padding 8px 16px / radius 999px / font 13px bold
 * - active：var(--gradient-cta) 漸層 + white text + 投影
 */
import { ref } from "vue";

const tabs = ["全部", "真人", "體育", "電子", "捕魚"];
const activeIdx = ref(0);
</script>

<template>
  <div class="dahsing-tabs-subtabs">
    <button
      v-for="(label, idx) in tabs"
      :key="label"
      type="button"
      class="dahsing-tabs-subtabs__pill"
      :class="{ 'dahsing-tabs-subtabs__pill--active': activeIdx === idx }"
      @click="activeIdx = idx"
    >
      {{ label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-tabs-subtabs {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 4px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__pill {
    flex: 0 0 auto;
    padding: 8px 16px;
    background: var(--bg-surface);
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 999px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    white-space: nowrap;
    transition: filter 0.18s ease;

    &--active {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: transparent;
      box-shadow: var(--shadow-md, var(--shadow));
    }
  }
}
</style>
