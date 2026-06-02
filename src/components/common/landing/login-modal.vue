<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

/**
 * 彈窗版登入表單 — 用在 at99 / mobile 場景
 *
 * 設計：
 * - 用 v-model 開合，外層自行控制顯示與否
 * - 內容欄位同 LoginInlineForm，但是縱向排列
 * - 純 demo，按下登入只彈 Quasar Notify
 *
 * 注意：刻意不直接使用 LoginInlineForm 內嵌，因為內嵌版是 row 排版、
 * 而 modal 內要 column 排，且輸入框寬度需要全寬，兩者 CSS 差異太大，
 * 與其用 prop 把兩種佈局塞進同個元件，不如拆兩個各自簡潔。
 */

interface Props {
  /** 是否顯示，用 v-model 雙向綁定 */
  modelValue: boolean;
  /** 標題（不同版面可調整） */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "會員登入"
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const $q = useQuasar();

const account = ref("");
const password = ref("");
const captcha = ref("");

function close() {
  emit("update:modelValue", false);
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
  close();
}

function onRegister() {
  notifyDemo("註冊");
}

function onForgot() {
  notifyDemo("忘記密碼");
}
</script>

<template>
  <!-- 遮罩 + 中央彈窗 -->
  <transition name="login-modal">
    <div
      v-if="props.modelValue"
      class="login-modal"
      role="dialog"
      aria-modal="true"
      @click.self="close"
    >
      <div class="login-modal__panel">
        <button
          type="button"
          class="login-modal__close"
          aria-label="關閉"
          @click="close"
        >
          ×
        </button>
        <h2 class="login-modal__title">{{ title }}</h2>

        <form class="login-modal__form" @submit.prevent="onSubmit">
          <label class="login-modal__field">
            <span class="login-modal__label">帳號</span>
            <input
              v-model="account"
              type="text"
              placeholder="請輸入會員帳號"
              autocomplete="off"
            />
          </label>
          <label class="login-modal__field">
            <span class="login-modal__label">密碼</span>
            <input
              v-model="password"
              type="password"
              placeholder="請輸入會員密碼"
              autocomplete="off"
            />
          </label>
          <label class="login-modal__field">
            <span class="login-modal__label">驗證碼</span>
            <input
              v-model="captcha"
              type="text"
              placeholder="請輸入驗證碼"
              maxlength="4"
              autocomplete="off"
            />
          </label>

          <button type="submit" class="login-modal__submit">立即登入</button>
        </form>

        <div class="login-modal__footer">
          <button type="button" class="login-modal__link" @click="onRegister">
            註冊新帳號
          </button>
          <button type="button" class="login-modal__link" @click="onForgot">
            忘記密碼
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.login-modal {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &__panel {
    width: 100%;
    max-width: 360px;
    background: var(--bg-surface);
    color: var(--text-primary);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px 24px 20px;
    position: relative;
    box-shadow: var(--shadow);
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    font-size: 22px;
    line-height: 1;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.15s ease;

    &:hover {
      background: var(--bg-overlay);
      color: var(--color-primary);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0 0 18px;
    text-align: center;
    letter-spacing: 1px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    input {
      height: 38px;
      padding: 0 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 13px;
      background: var(--bg-base);
      color: var(--text-primary);
      outline: none;
      transition: border-color 0.15s ease;

      &::placeholder {
        color: var(--text-muted);
      }

      &:focus {
        border-color: var(--color-primary);
      }
    }
  }

  &__label {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  &__submit {
    margin-top: 8px;
    height: 42px;
    border: none;
    border-radius: 6px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(1.05);
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }

  &__link {
    background: transparent;
    border: none;
    color: var(--color-primary);
    font-size: 12px;
    cursor: pointer;
    padding: 4px 6px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.login-modal-enter-active,
.login-modal-leave-active {
  transition: opacity 0.18s ease;

  .login-modal__panel {
    transition: transform 0.22s ease;
  }
}

.login-modal-enter-from,
.login-modal-leave-to {
  opacity: 0;

  .login-modal__panel {
    transform: translateY(20px) scale(0.96);
  }
}
</style>
