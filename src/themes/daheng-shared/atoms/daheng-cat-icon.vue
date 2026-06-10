<script setup lang="ts">
/**
 * 大亨 7 分類 inline SVG icon
 *
 * 為什麼 inline SVG：
 * - 原稿 phones.js CATS 用 inline SVG path 寫死，視覺密度（火焰漸層、足球白點、撲克牌雙色等）
 *   是 Material Symbols 沒有的細節，必須照搬 path
 * - flame（熱門）固定吃橘色 #e8642a（原稿 inline 寫死），其他 6 個吃 currentColor 跟隨主色
 *
 * 為什麼用 enum：與 dahsing-icon 一致，TS 編譯期擋拼錯
 *
 * path 來源：phones.js CATS 陣列原始 SVG 內容（byte-by-byte 對齊）
 */
import type { DahengCatIconKind } from "../_data";

defineProps<{
  kind: DahengCatIconKind;
}>();
</script>

<template>
  <!-- flame: 熱門推薦（橘色火焰，固定填色） -->
  <svg
    v-if="kind === 'flame'"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 2c1 3-1 4-2 6-1 1.7-3 3-3 6a5 5 0 0 0 10 0c0-2-1-3-1-4 1 .4 2 1.2 2 2 .8-1 1-2 1-3 0-3-3-5-3-8-1.5 1-2 2.5-2 3 0-2-1-3-2-4Z"
      fill="#e8642a"
    />
  </svg>

  <!-- live: 真人遊戲（人像剪影） -->
  <svg
    v-else-if="kind === 'live'"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="8" r="3.6" fill="currentColor" />
    <path d="M5 20a7 7 0 0 1 14 0Z" fill="currentColor" />
  </svg>

  <!-- sport: 體育賽事（足球） -->
  <svg
    v-else-if="kind === 'sport'"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="9" fill="currentColor" />
    <path d="M12 7l2.4 1.8-.9 2.9h-3l-.9-2.9L12 7Z" fill="#fff" />
    <circle cx="12" cy="3.5" r="1.2" fill="#fff" />
    <circle cx="20" cy="14" r="1.2" fill="#fff" />
    <circle cx="4" cy="14" r="1.2" fill="#fff" />
  </svg>

  <!-- lotto: 彩票遊戲（圓圈帶數字 6） -->
  <svg
    v-else-if="kind === 'lotto'"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="9" fill="currentColor" />
    <text
      x="12"
      y="16.5"
      text-anchor="middle"
      font-size="11"
      font-weight="900"
      fill="#fff"
      font-family="sans-serif"
    >
      6
    </text>
  </svg>

  <!-- chess: 棋牌遊戲（雙撲克牌） -->
  <svg
    v-else-if="kind === 'chess'"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect
      x="4"
      y="5"
      width="10"
      height="14"
      rx="2"
      fill="currentColor"
      transform="rotate(-9 9 12)"
    />
    <rect
      x="10"
      y="5"
      width="10"
      height="14"
      rx="2"
      fill="#c98a52"
      transform="rotate(9 15 12)"
    />
    <path d="M15 9l1.4 2.2L15 13l-1.4-1.8L15 9Z" fill="#fff" />
  </svg>

  <!-- slot: 電子遊戲（777 機台） -->
  <svg
    v-else-if="kind === 'slot'"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect x="4" y="6" width="16" height="13" rx="2.5" fill="currentColor" />
    <rect x="6.5" y="9" width="11" height="5" rx="1" fill="#fff" />
    <text
      x="12"
      y="13.4"
      text-anchor="middle"
      font-size="5"
      font-weight="900"
      fill="#b06a34"
      font-family="sans-serif"
    >
      777
    </text>
    <circle cx="12" cy="17" r="1" fill="#fff" />
  </svg>

  <!-- fish: 捕魚遊戲（魚 + 漁網） -->
  <svg
    v-else-if="kind === 'fish'"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 12c3-4 7-5 10-5 2 0 4 .6 5.5 1.8L21 6v12l-2.5-2.8C17 16.4 15 17 13 17c-3 0-7-1-10-5Z"
      fill="currentColor"
    />
    <circle cx="9" cy="11" r="1.2" fill="#fff" />
  </svg>
</template>
