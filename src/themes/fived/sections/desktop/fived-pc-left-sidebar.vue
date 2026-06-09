<script setup lang="ts">
/**
 * fived desktop 左側欄
 *
 * 對齊 5d_v2 src/components/layout/LeftSidebar.vue 現況：
 * 原作整份檔案 v3 全部註解掉，只渲染空 `<div class="container-left" />`，
 * 但 layout-default 仍把 LeftSidebar 接在 container-wrap flex 內，
 * 與 RightSidebar 對稱地分配兩側欄寬度（_layout.scss `.container-left` flex: 0 0 224px）。
 *
 * Demo 化原則「1:1 對齊原稿」：
 * 既然原作刻意保留空殼 wrapper 卻不畫內容，這裡也保留空殼 wrapper，
 * 不憑空加原作沒有的 quick-action 按鈕 / 會員資訊面板（feedback_replication_must_read_source）。
 *
 * 將來若原作恢復內容，再從這支元件對齊。
 */
</script>

<template>
  <aside class="fived-pc-left-sidebar" aria-hidden="true" />
</template>

<style lang="scss" scoped>
// 對齊原作 .container-left 寬度（_layout.scss flex: 0 0 224px / d1919 180 / d1280 50 / d1024 隱藏）
.fived-pc-left-sidebar {
  flex: 0 0 224px;
  min-width: 0;
}

@media (width <= 1919px) {
  .fived-pc-left-sidebar {
    flex: 0 0 180px;
  }
}

@media (width <= 1280px) {
  .fived-pc-left-sidebar {
    flex: 0 0 50px;
  }
}

@media (width <= 1024px) {
  .fived-pc-left-sidebar {
    display: none;
  }
}
</style>
