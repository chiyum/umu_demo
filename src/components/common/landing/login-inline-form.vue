<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

/**
 * 內嵌式登入表單 — 用在 noya PC 最上方 sticky bar 內
 *
 * 設計：
 * - 純 UI demo，按下登入只跳 Quasar Notify 提示「Demo 環境」
 * - 不打 API，不接 Pinia user store，避免 demo 站誤導使用者以為能登入
 * - 驗證碼用一個極簡 CSS 繪製的圖示佔位，不接外部 captcha
 * - 所有顏色走 var()，跨配色不殘色
 *
 * 為何不放在 noya/sections：因為 at99 mobile 之類的 modal 內也可能會用到，
 * 與其複製貼上一份不如做成共用 component。
 */

const $q = useQuasar();

const account = ref("");
const password = ref("");
const captcha = ref("");
/** 假驗證碼：每次 mount 隨機四碼，僅做視覺呈現 */
const fakeCaptcha = ref(generateCaptcha());

function generateCaptcha(): string {
  // 不用真實亂數，給足夠隨機性即可
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function refreshCaptcha() {
  fakeCaptcha.value = generateCaptcha();
}

function notifyDemo(action: string) {
  $q.notify({
    message: `Demo 環境：${action} 僅展示版面，不會實際送出`,
    color: "primary",
    position: "top",
    timeout: 1800
  });
}

function onSubmit() {
  notifyDemo("登入");
}

function onRegister() {
  notifyDemo("註冊");
}
</script>

<template>
  <form class="login-inline" @submit.prevent="onSubmit">
    <input
      v-model="account"
      class="login-inline__input"
      type="text"
      placeholder="會員帳號"
      autocomplete="off"
    />
    <input
      v-model="password"
      class="login-inline__input"
      type="password"
      placeholder="會員密碼"
      autocomplete="off"
    />
    <input
      v-model="captcha"
      class="login-inline__input login-inline__input--captcha"
      type="text"
      placeholder="驗證碼"
      maxlength="4"
      autocomplete="off"
    />
    <!-- 假驗證碼圖：純 CSS 繪製，無真實驗證邏輯 -->
    <button
      type="button"
      class="login-inline__captcha-img"
      :aria-label="`重新整理驗證碼，目前為 ${fakeCaptcha}`"
      @click="refreshCaptcha"
    >
      {{ fakeCaptcha }}
    </button>
    <button type="submit" class="login-inline__btn login-inline__btn--primary">
      登入
    </button>
    <button
      type="button"
      class="login-inline__btn login-inline__btn--ghost"
      @click="onRegister"
    >
      註冊
    </button>
  </form>
</template>

<style lang="scss" scoped>
.login-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  &__input {
    height: 30px;
    padding: 0 10px;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 12px;
    background: var(--bg-surface);
    color: var(--text-primary);
    width: 110px;
    outline: none;
    transition: border-color 0.15s ease;

    &::placeholder {
      color: var(--text-muted);
    }

    &:focus {
      border-color: var(--color-primary);
    }

    &--captcha {
      width: 70px;
    }
  }

  &__captcha-img {
    height: 30px;
    padding: 0 10px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--highlight-strip);
    color: var(--color-primary);
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3px;
    cursor: pointer;
    font-style: italic;
    user-select: none;

    // 視覺干擾線，仿驗證碼風格但不真的擋人類
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 3px,
      var(--bg-overlay) 3px,
      var(--bg-overlay) 4px
    );
  }

  &__btn {
    height: 30px;
    padding: 0 14px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s ease;
    white-space: nowrap;

    &--primary {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: var(--color-primary);

      &:hover {
        box-shadow: 0 2px 8px var(--color-primary);
      }
    }

    &--ghost {
      background: transparent;
      color: var(--color-primary);
      border-color: var(--color-primary);

      &:hover {
        background: var(--bg-overlay);
      }
    }
  }
}
</style>
