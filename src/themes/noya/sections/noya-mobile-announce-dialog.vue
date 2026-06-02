<script setup lang="ts">
import { onMounted, ref } from "vue";

/**
 * noya 手機版開站公告 modal
 *
 * 設計：
 * - 紙條外觀（黃 + 橘色）
 * - 首次開站自動跳出，使用者關閉後寫入 sessionStorage，當次 session 不再跳
 * - X 按鈕關閉、點遮罩也可關閉
 *
 * 為何用 sessionStorage 而非 localStorage：
 * - localStorage 永久關閉太絕；sessionStorage 每次重開瀏覽器仍會跳一次，符合公告期望
 *
 * 文字內容：完全不抄原站，改用通用「示範娛樂城」說明文字
 */

const SS_KEY = "noya-demo:announce-dismissed";
const visible = ref(false);

onMounted(() => {
  try {
    if (sessionStorage.getItem(SS_KEY) === "1") return;
    visible.value = true;
  } catch {
    // sessionStorage 不可用時直接顯示，不阻擋體驗
    visible.value = true;
  }
});

function close() {
  visible.value = false;
  try {
    sessionStorage.setItem(SS_KEY, "1");
  } catch {
    // 無權限寫入也吞掉
  }
}
</script>

<template>
  <transition name="m-announce">
    <div
      v-if="visible"
      class="noya-m-announce"
      role="dialog"
      aria-modal="true"
      aria-labelledby="noya-m-announce-title"
      @click.self="close"
    >
      <div class="noya-m-announce__panel">
        <button
          type="button"
          class="noya-m-announce__close"
          aria-label="關閉公告"
          @click="close"
        >
          ×
        </button>

        <header class="noya-m-announce__header">
          <span class="noya-m-announce__icon" aria-hidden="true">📢</span>
          <h2 id="noya-m-announce-title" class="noya-m-announce__title">
            最新公告
          </h2>
        </header>

        <div class="noya-m-announce__body">
          <p>
            歡迎光臨示範娛樂城 A，本站為前端版面 Demo，<br />
            所有內容、人物、遊戲名稱均為通用範例，不代表任何真實服務。
          </p>
          <p>
            您可以透過左下角浮標切換版面與配色，<br />
            體驗不同樣式的同一份版型結構。
          </p>
          <ul class="noya-m-announce__notes">
            <li>所有顏色由 CSS variable 控制，配色可即時切換</li>
            <li>版面骨架共用，內容元件可重組</li>
            <li>登入 / 註冊 / 跑馬燈皆為 demo，不會實際送出</li>
          </ul>
        </div>

        <button type="button" class="noya-m-announce__confirm" @click="close">
          我知道了
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.noya-m-announce {
  position: fixed;
  inset: 0;
  z-index: 8000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  &__panel {
    width: 100%;
    max-width: 340px;

    // 紙條黃漸層走 token；切配色時可改成沙色 / 蜜綠保持公告質感
    background: var(--accent-warning-bg);
    border-radius: 14px;
    padding: 20px 20px 16px;
    position: relative;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    color: var(--accent-warning-text);
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    border: none;
    background: var(--accent-warning-overlay);
    border-radius: 50%;
    font-size: 18px;
    color: var(--accent-warning-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  &__icon {
    font-size: 18px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 2px;
  }

  &__body {
    font-size: 12px;
    line-height: 1.65;

    p {
      margin: 0 0 8px;
    }
  }

  &__notes {
    list-style: none;
    padding: 8px 12px;
    margin: 8px 0 0;
    background: var(--accent-warning-paper);
    border-radius: 8px;
    font-size: 11px;
    line-height: 1.6;

    li {
      position: relative;
      padding-left: 14px;

      &::before {
        content: "·";
        position: absolute;
        left: 4px;
        top: -3px;
        font-size: 16px;
        font-weight: 700;
      }
    }
  }

  &__confirm {
    margin-top: 14px;
    width: 100%;
    height: 38px;
    background: var(--accent-warning-cta);
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 4px;
    cursor: pointer;
    box-shadow: var(--accent-warning-cta-shadow);
  }
}

.m-announce-enter-active,
.m-announce-leave-active {
  transition: opacity 0.2s ease;

  .noya-m-announce__panel {
    transition: transform 0.25s ease;
  }
}

.m-announce-enter-from,
.m-announce-leave-to {
  opacity: 0;

  .noya-m-announce__panel {
    transform: translateY(-20px) scale(0.94);
  }
}
</style>
