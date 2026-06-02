<script setup lang="ts">
import { computed, defineAsyncComponent, inject, type Ref } from "vue";
import { useThemeStore } from "@/store/theme.store";

defineOptions({
  // 用專屬的薄殼 layout，避開 layout-default 的 Quasar admin 骨架干擾
  layout: "layout-theme-host",
  setting: {
    // useAwdLayout 預設由 pages.ts 給 true，但本頁是純單檔，無 desktop/mobile 分版
    // 關掉 awd 才不會去找 layout-theme-host-mobile
    useAwdLayout: false,
    sort: 0,
    icon: "home",
    i18nName: "nav.home"
  }
});

/**
 * Home 頁作為 theme layout host
 *
 * 設計：
 * - 不直接渲染任何視覺元素，僅根據 themeStore.layoutKey + isMobile
 *   動態挑出對應 theme 的 desktop / mobile 元件
 * - 用 defineAsyncComponent + Suspense 處理載入過程，避免閃白
 * - layout 切換是 reactive：computed 依 layoutKey + isMobile 重新算
 */

const themeStore = useThemeStore();

// isMobile 由 App.vue 透過 provide 注入（已是 Ref）
const isMobile = inject<Ref<boolean>>("isMobile");

/**
 * 動態挑出當前 theme 的入口元件
 *
 * 用 defineAsyncComponent 包是為了：
 * 1. 切版面時走 dynamic import（每個 theme 是獨立 chunk）
 * 2. 配合外層 Suspense 顯示 fallback
 *
 * 每次 layoutKey / isMobile 改變都會回傳新的 defineAsyncComponent 實例，
 * Vue 會自動把舊元件卸載、新元件掛上。
 */
const ThemeComponent = computed(() => {
  const theme = themeStore.currentTheme;
  const loader = isMobile?.value ? theme.mobile : theme.desktop;
  return defineAsyncComponent({
    loader,
    // 載入失敗時顯示提示，不要整頁炸
    onError(err) {
      console.error("[theme-host] failed to load theme chunk", err);
    }
  });
});
</script>

<template>
  <Suspense>
    <component :is="ThemeComponent" />
    <template #fallback>
      <!-- 載入中骨架：簡單的水平律動條，避免 layout shift -->
      <div class="theme-host__skeleton">
        <div class="theme-host__skeleton-bar" />
        <div class="theme-host__skeleton-bar" />
        <div class="theme-host__skeleton-bar" />
      </div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.theme-host__skeleton {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.theme-host__skeleton-bar {
  height: 24px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: theme-host-shimmer 1.4s infinite;

  &:nth-child(2) {
    width: 70%;
  }

  &:nth-child(3) {
    width: 40%;
  }
}

@keyframes theme-host-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
