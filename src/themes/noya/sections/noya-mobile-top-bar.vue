<script setup lang="ts">
import { ref } from "vue";
import LoginModal from "@/components/common/landing/login-modal.vue";

/**
 * noya 手機版頂部 fixed top bar (50px)
 *
 * 結構：
 * - 左：logo（圓形）+ 品牌文字
 * - 右：登入 / 註冊（橘色 outline 圓角）+ 語言下拉
 *
 * 為何不直接複用 noya-main-nav：手機版 sticky 50px 結構與 PC 完全不同，
 * 且要承載 LoginModal 開合狀態，與其加 prop 條件分支不如獨立元件。
 *
 * 品牌：「示範娛樂城 A」，避免侵權
 */

const loginOpen = ref(false);

function openLogin() {
  loginOpen.value = true;
}
</script>

<template>
  <div class="noya-m-topbar">
    <div class="noya-m-topbar__inner">
      <!-- 左：logo -->
      <a class="noya-m-topbar__brand" href="#">
        <span class="noya-m-topbar__mark">A</span>
        <span class="noya-m-topbar__name">示範娛樂城 A</span>
      </a>

      <!-- 右：登入 / 註冊 / 語言 -->
      <div class="noya-m-topbar__actions">
        <button
          type="button"
          class="noya-m-topbar__btn noya-m-topbar__btn--ghost"
          @click="openLogin"
        >
          登入
        </button>
        <button
          type="button"
          class="noya-m-topbar__btn noya-m-topbar__btn--primary"
          @click="openLogin"
        >
          註冊
        </button>
        <button type="button" class="noya-m-topbar__lang" aria-label="切換語言">
          <!-- 用 emoji 旗幟做語言切換暗示，純展示 -->
          <span>繁</span>
          <span class="noya-m-topbar__lang-arrow">▾</span>
        </button>
      </div>
    </div>

    <!-- 登入彈窗 -->
    <LoginModal v-model="loginOpen" title="會員登入" />
  </div>
</template>

<style lang="scss" scoped>
.noya-m-topbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 50px;
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__inner {
    height: 100%;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: inherit;
    min-width: 0;
  }

  &__mark {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: var(--shadow);
  }

  &__name {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__btn {
    height: 30px;
    padding: 0 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--color-primary);
    transition: all 0.15s ease;

    &--ghost {
      background: transparent;
      color: var(--color-primary);
    }

    &--primary {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
    }
  }

  &__lang {
    height: 30px;
    padding: 0 6px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-muted);
    font-size: 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  &__lang-arrow {
    font-size: 9px;
  }
}
</style>
