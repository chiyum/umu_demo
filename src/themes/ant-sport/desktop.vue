<script setup lang="ts">
/**
 * ant-sport 桌面版佈局 — 對齊 lilian_ant_pc src/pages/main.vue 五段結構
 *
 * c1 階段：先放骨架佔位，sections 在 c4 commit 補上
 *
 * 預定五段順序：
 * 1. Banner            頂部全寬輪播 banner
 * 2. IndexNews         跑馬燈 + 「更多」按鈕
 * 3. IndexAPP          APP / H5 下載區（左 phone mockup / 右 QR + tabs）
 * 4. IndexGame         熱門遊戲類別 + provider list（左圖右文）
 * 5. IndexServe        4 個數字計數 + 4 種特色
 */
</script>

<template>
  <div class="ant-sport-layout">
    <!-- c1 骨架佔位：sections 將於 c4 commit 補上 -->
    <main class="ant-sport-layout__main">
      <p class="ant-sport-layout__placeholder">ant-sport desktop placeholder</p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ant-sport-layout {
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
  }

  &__placeholder {
    padding: 80px 24px;
    text-align: center;
    color: var(--text-muted);
  }
}
</style>
