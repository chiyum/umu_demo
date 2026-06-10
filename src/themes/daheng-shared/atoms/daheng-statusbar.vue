<script setup lang="ts">
/**
 * 大亨手機 status bar：8:15 + signal bars + wifi + 電池
 *
 * 為什麼把時間寫死 8:15：
 * - 原稿 phones.js statusbar() 內 time 寫死「8:15」當設計示意，不接 runtime now()
 * - demo 站台無需顯示真實時間，照搬避免「不同時間進站截圖不一致」
 *
 * 為什麼 wifi icon path / 訊號條 / 電池都照原稿 byte-by-byte：
 * - 4 條訊號條高度 5/8/10/12px、電池外框 25×13 1.6px border / 80% 電量、wifi 雙弧 SVG path，
 *   皆是設計師刻意拉出的視覺密度，重畫會 drift
 */
</script>

<template>
  <div class="daheng-statusbar">
    <div class="daheng-statusbar__time">8:15</div>
    <div class="daheng-statusbar__icons">
      <div class="daheng-statusbar__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 3.5c2.3 0 4.4.9 6 2.3l-1.4 1.5A7 7 0 0 0 9 5.5a7 7 0 0 0-4.6 1.8L3 5.8A8.9 8.9 0 0 1 9 3.5Z"
          fill="currentColor"
        />
        <path
          d="M9 7.2c1.3 0 2.5.5 3.4 1.3L9 12 5.6 8.5A5 5 0 0 1 9 7.2Z"
          fill="currentColor"
        />
      </svg>
      <div class="daheng-statusbar__battery" aria-hidden="true">
        <span />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px 4px;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-primary);

  &__time {
    font-weight: 700;
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--text-primary);
  }

  // 4 條訊號條：高度 5 / 8 / 10 / 12px（原稿照搬）
  &__bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;

    i {
      width: 3px;
      background: var(--text-primary);
      border-radius: 1px;
      display: block;
    }

    i:nth-child(1) {
      height: 5px;
    }

    i:nth-child(2) {
      height: 8px;
    }

    i:nth-child(3) {
      height: 10px;
    }

    i:nth-child(4) {
      height: 12px;
    }
  }

  // 電池：外框 25×13 + 80% 內條 + 右側突起
  &__battery {
    position: relative;
    width: 25px;
    height: 13px;
    border: 1.6px solid var(--text-primary);
    border-radius: 4px;
    padding: 1.5px;

    &::after {
      content: "";
      position: absolute;
      right: -3px;
      top: 3.5px;
      width: 2px;
      height: 5px;
      background: var(--text-primary);
      border-radius: 0 2px 2px 0;
    }

    span {
      display: block;
      height: 100%;
      width: 80%;
      background: var(--text-primary);
      border-radius: 1.5px;
    }
  }
}
</style>
