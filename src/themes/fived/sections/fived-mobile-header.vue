<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * fived mobile 頂部 header
 *
 * 視覺結構對齊 5d_v2 src/components/layout/MobileHeader.vue：
 *   [漢堡] ── (logo 置中) ── [登入頭像 / 登入鈕]
 *
 * 5d_v2 原作三大特徵 demo 化還原：
 *   1. scroll 後深酒紅底（mobile-header-scroll）— 用 window scroll 切 class
 *   2. 漢堡走 emit toggleMenu 給 parent（mobile.vue）控制抽屜開合
 *   3. logo 用 demo theme 動態 logo，保留 demo 切 logo 行為
 *
 * 與原作差異（demo 限制）：
 *   - 原作未登入時用 mb-login-btn 圖像背景；demo 改純 button + CSS 圖示，避免引外部圖檔
 *   - 已登入時的頭像分支省略（demo 沒登入流程）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

defineProps<{
  /** 由 parent 維護的選單開合狀態 */
  isMenuActive?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggleMenu"): void;
}>();

// 對齊原作 isScrolled 切 class 切色塊
const isScrolled = ref<boolean>(false);
function handleScroll(): void {
  isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="fived-m-header"
    :class="{ 'fived-m-header--scroll': isScrolled }"
  >
    <!-- 左側漢堡按鈕（對齊原作 .header-btn） -->
    <button
      type="button"
      class="fived-m-header__menu-btn"
      :class="{ 'fived-m-header__menu-btn--active': isMenuActive }"
      aria-label="開啟選單"
      @click="emit('toggleMenu')"
    >
      <span class="fived-m-header__menu-bar" />
      <span class="fived-m-header__menu-bar" />
      <span class="fived-m-header__menu-bar" />
    </button>

    <!-- 中央 logo（對齊原作 mb-login-icon 置中） -->
    <a class="fived-m-header__brand" href="#" :aria-label="logoLabel">
      <img
        :src="logoSrc"
        :alt="logoLabel"
        class="fived-m-header__logo"
        :class="{ 'fived-m-header__logo--blend': useScreenBlend }"
      />
    </a>

    <!-- 右側登入入口（對齊原作 .side-links 右側按鈕） -->
    <div class="fived-m-header__actions">
      <button
        type="button"
        class="fived-m-header__login-btn"
        aria-label="會員登入"
      >
        <span class="fived-m-header__login-icon" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.fived-m-header {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  height: 64px;
  background: transparent;
  border-bottom: 1px solid transparent;
  color: var(--text-on-primary);
  transition:
    background 0.3s ease,
    border-color 0.3s ease;

  // 底邊漸層細線（原作 ::after linear-gradient #303030 → 透白 → #1c1e1c）
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(48, 48, 48, 0.64) 0%,
      rgba(255, 255, 255, 0.16) 50%,
      rgba(28, 30, 28, 0.64) 100%
    );
    pointer-events: none;
  }

  // 滾動後深酒紅半透明底（對齊原作 .mobile-header-scroll）
  &--scroll {
    background: rgba(77, 14, 39, 0.9);
    backdrop-filter: blur(8px);

    &::after {
      background: none;
    }
  }

  // 漢堡按鈕（純 CSS 三條線，避免引外部 btn-menu.svg）
  &__menu-btn {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: transform 0.18s ease;

    &:active {
      transform: scale(0.92);
    }
  }

  // 三條金線：基底樣式
  &__menu-bar {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--primary-01);
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(226, 189, 135, 0.4);
    transition: background 0.18s ease;
  }

  // menu-btn active 變體：金線變亮金色
  // 為什麼把 &--active 從 &__menu-btn 內巢狀抽到 &__menu-bar 之後：
  // stylelint no-descending-specificity 要求 specificity 升冪排列；
  // 原本巢狀寫法被解析成更 specific 的 selector 卻出現在後面 `&__menu-bar` 之前，
  // 會被擋下且阻塞 dev server buildStart hook
  &__menu-btn--active &__menu-bar {
    background: var(--primary-03, #ffdaa4);
  }

  // logo 中央定位（flex 兩側按鈕推中間 logo）
  &__brand {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  &__logo {
    height: 36px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;

    &--blend {
      mix-blend-mode: screen;
    }
  }

  // 右側登入按鈕
  &__actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__login-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition:
      filter 0.18s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    &:hover {
      filter: brightness(1.18);
    }
  }

  // 登入圖示：金漸層圓 + 上方人頭剪影（CSS 純樣式對應原作 login-icon.png）
  &__login-icon {
    display: block;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    border-radius: 50%;
    background: radial-gradient(
        circle at 50% 36%,
        rgba(12, 6, 8, 0.85) 0 7px,
        transparent 7.5px
      ),
      radial-gradient(
        circle at 50% 78%,
        rgba(12, 6, 8, 0.85) 0 11px,
        transparent 11.5px
      ),
      var(--gradient-gold);
    box-shadow:
      0 0 0 1px rgba(226, 189, 135, 0.4),
      0 2px 8px rgba(226, 189, 135, 0.32);
  }
}
</style>
