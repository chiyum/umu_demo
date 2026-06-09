<script setup lang="ts">
/**
 * dahsing 三版型共用 inline SVG icon 元件
 *
 * 為什麼抽：原本各處用 <QIcon name="material-symbols:xxx"> 想吃 Iconify，但 Quasar QIcon
 * 預設不認 Iconify 命名空間（沒掛 svg-use loader / 沒設 iconSet），實際渲染為空字串，
 * 造成多處 layout 跑版 + 裸字串顯示（已被使用者連續回報三次）。
 *
 * 為什麼用 inline SVG：
 * - bundle 內、立即渲染、無外部依賴
 * - fill="currentColor" 跟著父層 color 走，theme 切色 / hover 自動同步
 * - 不需新增 icon set 套件、不需改 Quasar 全域設定
 *
 * 為什麼風格選 Material Symbols（24×24）：
 * - 原專案本來就在用 material-symbols:xxx 命名（雖然吃不到），代表「想要 Material 風格」是設計意圖
 * - 共用元件統一 viewBox 24×24，size prop 直接套到 width/height，行為可預期
 * - sidebar 內 FA 風格的 4 個 icon 不重構（已驗收 + FA viewBox 各異，整合進來反而會破壞精細對齊）
 *
 * 為什麼用 enum 限制 name：
 * - 統一可用 icon 清單，避免再次出現「字串 name 對不到實作」的問題
 * - TypeScript 編譯期即可抓到拼錯
 *
 * path data 來源：Material Symbols（Google）公開的 24×24 grid SVG path
 */
withDefaults(
  defineProps<{
    /** icon 名稱（13 種已收錄，皆 24×24 Material 風格） */
    name:
      | "fire"
      | "star"
      | "soccer"
      | "premium"
      | "schedule"
      | "casino"
      | "headphones"
      | "chevron-right"
      | "home"
      | "campaign"
      | "savings"
      | "support-agent"
      | "person";
    /** 渲染尺寸（CSS 長度單位，預設 16px） */
    size?: string | number;
  }>(),
  { size: "16px" }
);

/** 把 size prop 統一處理為帶單位字串（純數字補 px） */
function toCssSize(size: string | number): string {
  if (typeof size === "number") return `${size}px`;
  if (/^\d+(\.\d+)?$/.test(size)) return `${size}px`;
  return size;
}
</script>

<template>
  <span
    class="dahsing-icon"
    :style="{ width: toCssSize(size), height: toCssSize(size) }"
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <!-- fire：local-fire-department（熱門 / 火焰）-->
      <path
        v-if="name === 'fire'"
        d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"
      />

      <!-- star：star-outline（推薦 / 新 / 推 tag）-->
      <path
        v-else-if="name === 'star'"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />

      <!-- soccer：sports-soccer（體育 tag / 標題）-->
      <path
        v-else-if="name === 'soccer'"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8 10c0 .65-.08 1.27-.21 1.88l-1.93-1.74-2.25.96-.41-3.18 2.32-2.1 2.62 1.07c1.18 1.56 1.86 3.31 1.86 5.11zM12.96 4.04L12 5l-1-1c.32-.04.66-.04 1-.04.32 0 .65 0 .96.04zM8.99 5.5L10.5 4l1.5 1.5L11 7H9V5.5zM4.46 9.67l1.04-.6.5 1.5L4.5 11.85c-.02-.18-.04-.36-.04-.55 0-.56.04-1.1.13-1.63zM6.07 18.36C5.05 17.07 4.4 15.6 4.16 14.06l1.27.62 2.32 2.1-.41 3.18-1.27.4zm5.93 1.6c-1.07 0-2.09-.21-3.04-.59l.4-1.32 2.13-.95 2.16.95.4 1.32c-.95.38-1.98.59-3.05.59zm2.94-3.18L13 16l-1.5-1.5L13 13l1.94.78z"
      />

      <!-- premium：workspace-premium（VIP / 精選 / 皇冠）-->
      <path
        v-else-if="name === 'premium'"
        d="M9.68 13.69L12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 14.78l-4 1.34v-3.39c1.18.68 2.54 1.07 4 1.07s2.82-.39 4-1.07v3.39l-4-1.34z"
      />

      <!-- schedule：schedule-outline / 時鐘（最新 tag）-->
      <path
        v-else-if="name === 'schedule'"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
      />

      <!-- casino：casino-outline（棋牌 / 骰子）-->
      <path
        v-else-if="name === 'casino'"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7.5 8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5zm6 6c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-6 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 16 9 16s-1.5-.67-1.5-1.5zm3-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm3-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"
      />

      <!-- headphones：headphones-outline（真人 / 客服）-->
      <path
        v-else-if="name === 'headphones'"
        d="M12 1C7.03 1 3 5.03 3 10v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"
      />

      <!-- chevron-right：箭頭（more / play）-->
      <path
        v-else-if="name === 'chevron-right'"
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      />

      <!-- home：home-outline（底部首頁）-->
      <path
        v-else-if="name === 'home'"
        d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
      />

      <!-- campaign：campaign-outline（喇叭 / 優惠）-->
      <path
        v-else-if="name === 'campaign'"
        d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"
      />

      <!-- savings：savings-outline（存提款 / 撲滿）-->
      <path
        v-else-if="name === 'savings'"
        d="M19.83 7.5l-2.27-2.27c.07-.42.18-.81.32-1.15.16-.4.32-.74.48-1.08L17.5 2 16 3.5c-.42.42-.81.91-1.18 1.5H10C6.69 5 4 7.69 4 11c0 3.03 1.81 5.86 4 7v3h4v-2h2v2h4v-3.34c.55-.41 1.04-.89 1.46-1.42L22 16.5v-7l-2.17-2zm-.58 6.81l-.86.7c-.36.45-.69.85-1.08 1.16l-1.31.97V19h-2v-2h-4v2h-2v-2.34l-1.21-.66C5.95 15.18 5 13.18 5 11c0-2.76 2.24-5 5-5h6.32c.36-.55.79-1.03 1.28-1.42-.01.07-.02.14-.03.21-.02.13-.04.27-.06.41L17.4 5.7l1.85 1.85V13c-.7 0-1.25.55-1.25 1.25s.55 1.25 1.25 1.25.43-.18.43-.18zM11.5 11c0 .83-.67 1.5-1.5 1.5S8.5 11.83 8.5 11 9.17 9.5 10 9.5s1.5.67 1.5 1.5z"
      />

      <!-- support-agent：客服耳機（底部客服 tab）-->
      <path
        v-else-if="name === 'support-agent'"
        d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28C2.4 12.6 2 13.26 2 14v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62zM9 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3-6c-2.05 0-3.81 1.24-4.58 3.01C8.66 8.21 10.66 7 12.95 7 14.85 7 16.5 7.83 17.67 9.13c-1.06-1.27-2.65-2.13-4.67-2.13z"
      />

      <!-- person：person-outline（底部我的）-->
      <path
        v-else-if="name === 'person'"
        d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.dahsing-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
  color: currentcolor;

  > svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
