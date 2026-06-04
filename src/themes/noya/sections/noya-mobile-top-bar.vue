<script setup lang="ts">
import { computed, ref } from "vue";
import LoginModal from "@/components/common/landing/login-modal.vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

// Logo 改由 demo-theme store 動態切換（透過 FAB Logo row 控制）
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

/**
 * noya 手機版頂部 fixed top bar (50px)
 *
 * 結構：
 * - 左：UMU 自有品牌 logo（圖檔）
 * - 右：登入 / 註冊（橘色 outline 圓角）+ 語言下拉
 *
 * 為何不直接複用 noya-main-nav：手機版 sticky 50px 結構與 PC 完全不同，
 * 且要承載 LoginModal 開合狀態，與其加 prop 條件分支不如獨立元件。
 *
 * Logo：使用 UMU 自有品牌 logo，行動版高度限 32px 保護畫面密度
 */

const loginOpen = ref(false);

function openLogin() {
  loginOpen.value = true;
}
</script>

<template>
  <div class="noya-m-topbar">
    <div class="noya-m-topbar__inner">
      <!-- 左：品牌 logo（由 demo-theme store 動態切換） -->
      <a class="noya-m-topbar__brand" href="#" :aria-label="logoLabel">
        <img :src="logoSrc" :alt="logoLabel" class="noya-m-topbar__brand-img" />
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
    text-decoration: none;
    color: inherit;
    min-width: 0;
  }

  // UMU logo 行動版高度 32px、寬度上限避免吃掉右側操作區
  &__brand-img {
    height: 32px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
    display: block;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__btn {
    // kingdom DNA：mobile CTA 改 pill 形對齊 PC（與 announce-bar 一致）
    height: 30px;
    padding: 0 14px;
    border-radius: var(--radius-pill);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--color-primary);
    transition: all var(--transition-fast);

    &--ghost {
      background: transparent;
      color: var(--color-primary);

      &:hover {
        filter: var(--filter-hover-strong);
      }
    }

    &--primary {
      background: var(--gradient-cta);
      color: var(--text-on-primary);

      &:hover {
        filter: var(--filter-hover-strong);
      }
    }
  }

  &__lang {
    // kingdom DNA：語言切換用 pill 形（與 PC main-nav 一致）
    height: 30px;
    padding: 0 10px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
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
