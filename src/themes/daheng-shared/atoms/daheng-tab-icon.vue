<script setup lang="ts">
/**
 * 大亨底部 5 tab inline SVG icon
 *
 * 為什麼 inline SVG：原稿 phones.js nav() 內 5 個 tab SVG path 寫死，與 dahsing-icon 的
 * Material Symbols 不同（特別是「存提款」帶 $ 符號、「客服」是耳機支架造型），照搬避免風格漂移
 *
 * fill="currentColor" 讓 tab.active 切色 var(--color-primary) 自動套用
 */
import type { DahengTabIconKind } from "../_data";

defineProps<{
  kind: DahengTabIconKind;
}>();
</script>

<template>
  <!-- home: 首頁（房屋帶門） -->
  <svg
    v-if="kind === 'home'"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5Z"
      fill="currentColor"
    />
  </svg>

  <!-- promo: 優惠（喇叭+揚聲） -->
  <svg
    v-else-if="kind === 'promo'"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M4 10v4h3l6 4V6l-6 4H4Z" fill="currentColor" />
    <path d="M16 7l4-2v14l-4-2" fill="currentColor" />
  </svg>

  <!-- deposit: 存提款（錢袋+$） -->
  <svg
    v-else-if="kind === 'deposit'"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M9 4h6l2 3H7l2-3Z" fill="currentColor" />
    <path
      d="M5 7h14l1 6.5C20 18 17 20 12 20S4 18 4 13.5L5 7Z"
      fill="currentColor"
    />
    <text
      x="12"
      y="16.5"
      text-anchor="middle"
      font-size="7"
      font-weight="900"
      fill="#fff"
      font-family="sans-serif"
    >
      $
    </text>
  </svg>

  <!-- service: 客服（耳機+支架） -->
  <svg
    v-else-if="kind === 'service'"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 13a8 8 0 0 1 16 0"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
    />
    <rect x="3" y="13" width="4" height="7" rx="2" fill="currentColor" />
    <rect x="17" y="13" width="4" height="7" rx="2" fill="currentColor" />
  </svg>

  <!-- account: 我的（人像） -->
  <svg
    v-else-if="kind === 'account'"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="8" r="4" fill="currentColor" />
    <path d="M4 21a8 8 0 0 1 16 0Z" fill="currentColor" />
  </svg>
</template>
