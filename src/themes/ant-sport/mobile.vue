<script setup lang="ts">
/**
 * ant-sport 手機版佈局 — 對齊 lilian_ant_web src/pages/home.vue 五段結構
 *
 * c1 階段：先放骨架佔位，sections 在 c3 commit 補上
 *
 * 預定五段順序：
 * 1. Header        頂部 logo bar（左 logo / 右訊息 icon）
 * 2. BannerSwiper  全寬輪播 banner
 * 3. Marquee       跑馬燈
 * 4. UserCard      會員卡（VIP / 餘額 / 反水・存款・提款・推廣 4 icon）
 * 5. GameMenu      遊戲類別卡片矩陣
 * 底部：共用 mobile-bottom-tab-bar，5 個 tab（首頁/優惠/客服/我的/聊天）
 */
</script>

<template>
  <div class="ant-sport-m-layout">
    <!-- c1 骨架佔位：sections 將於 c3 commit 補上 -->
    <main class="ant-sport-m-layout__main">
      <p class="ant-sport-m-layout__placeholder">
        ant-sport mobile placeholder
      </p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ant-sport-m-layout {
  background: var(--bg-decoration, none), var(--bg-base);
  background-repeat: no-repeat;
  background-attachment: scroll;
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
    padding-bottom: 60px;
  }

  &__placeholder {
    padding: 80px 24px;
    text-align: center;
    color: var(--text-muted);
  }
}
</style>
