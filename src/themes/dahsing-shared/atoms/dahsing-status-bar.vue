<script setup lang="ts">
/**
 * dahsing 三版型共用 status bar（手機頂部時間 / 訊號 / 電池模擬條）
 *
 * 為什麼抽 atom：三份原始 HTML 的 .statusbar 結構與樣式完全一致；
 * 抽出後三 theme mobile.vue 直接 <DahsingStatusBar /> 即可。
 *
 * 為什麼用 Iconify（q-icon）而非 fa-solid class：本專案已統一走 Iconify material-symbols；
 * 原稿用 Font Awesome 但 demo 內並未引入 FA 字型，需替換為 q-icon 才會渲染。
 */
import { QIcon } from "quasar";
</script>

<template>
  <div class="dahsing-status-bar">
    <div class="dahsing-status-bar__time">8:15</div>
    <div class="dahsing-status-bar__right">
      <QIcon name="material-symbols:signal-cellular-alt" size="14px" />
      <QIcon name="material-symbols:wifi" size="14px" />
      <div class="dahsing-status-bar__battery">
        <i class="dahsing-status-bar__battery-fill" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 26px 4px;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-primary);

  &__right {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 15px;
    color: var(--text-primary);
  }

  &__battery {
    position: relative;
    width: 25px;
    height: 13px;
    padding: 1.5px;
    border: 1.6px solid var(--text-primary);
    border-radius: 4px;

    &::after {
      content: "";
      position: absolute;
      right: -3.5px;
      top: 3.5px;
      width: 2px;
      height: 5px;
      background: var(--text-primary);
      border-radius: 0 2px 2px 0;
    }
  }

  &__battery-fill {
    display: block;
    width: 90%;
    height: 100%;
    background: var(--text-primary);
    border-radius: 1.5px;
  }
}
</style>
