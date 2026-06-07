<script setup lang="ts">
import { computed } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * honest-no6 mobile 頂部 header — 1:1 對齊 honest_real no6/home.vue 第 3-14 行
 *
 * 原作 DOM：
 *   .home__header (env class，refs head)
 *     <img :src="getImageUrl('no6/images/home/logo.png')" />
 *     .login_reg (style="display: flex")
 *       .log_btn.log  「登入」
 *       .log_btn.reg  「註冊」(id="register")
 *
 * 注意：原作 header 是 absolute 浮在 banner 上方，沒有 padding 大塊
 * 登入在前、註冊在後（與 max 順序相反）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);
</script>

<template>
  <div class="honest-no6-m-header">
    <a class="honest-no6-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="honest-no6-m-header__logo"
        :class="{ 'honest-no6-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <div class="honest-no6-m-header__login-reg">
      <div class="honest-no6-m-header__btn honest-no6-m-header__btn--log">
        登入
      </div>
      <div class="honest-no6-m-header__btn honest-no6-m-header__btn--reg">
        註冊
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 原作 header 是 absolute 浮在 banner 上方
.honest-no6-m-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
}

.honest-no6-m-header__brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.honest-no6-m-header__logo {
  height: 32px;
  width: auto;
  max-width: 140px;
  object-fit: contain;
  display: block;

  &--blend {
    mix-blend-mode: screen;
  }
}

.honest-no6-m-header__login-reg {
  display: flex;
  gap: 6px;
}

// 兩顆膠囊：log 透明邊 / reg 金漸層
.honest-no6-m-header__btn {
  height: 28px;
  padding: 0 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    filter 0.15s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.95);
  }

  &--log {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(6px);
  }

  &--reg {
    color: #1a0526;
    background: linear-gradient(135deg, #ffe79e 0%, #f7c66c 50%, #c79a45 100%);
    box-shadow: 0 2px 6px rgba(247, 198, 108, 0.4);
  }

  &:hover {
    filter: brightness(1.08);
  }
}
</style>
