<script setup lang="ts">
import { watchEffect } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * Theme preview layout — 給 /preview/:layoutkey 獨立預覽頁專用的極簡薄殼 layout
 *
 * 為什麼獨立於 layout-theme-host（demo 頁用）另開一個 layout：
 * - preview 頁的定位是「可分享 / 可被 iframe 嵌入的乾淨版面」：
 *   只渲染 theme 本體，不掛任何 chrome（無 FAB、無切色浮標、無 showcase）
 * - layout-theme-host 會掛 ThemeColorFab 浮標並跑 useThemeUrlSync（雙向寫回 URL）；
 *   preview 頁兩者都不要——嵌進 showcase 卡片 iframe 時 FAB 會擋住縮圖、
 *   而 URL sync 的 router.replace 會在 iframe 內製造無謂的 history churn
 * - 徹底解耦（各自一個 layout）比在 layout-theme-host 內加 isPreview 條件分支更乾淨，
 *   對齊本專案「showcase / demo 兩 layout 完全分離、不做條件分支」的既有設計哲學
 *
 * 這個 layout 的職責（只有一件事）：
 * - 把 [data-theme] / [data-theme-color] 掛到 iframe（或分享頁）自己的 documentElement，
 *   讓該 theme 的 CSS var（_tokens / _variants）接管整頁
 *
 * colorKey / logoKey 來源：
 * - 由 demo-theme store 於 init 時從 URL（?color= / ?logoKey=）解析（見 resolveInitialThemeQuery）
 * - preview 頁不提供切換入口，故 store 值在頁面生命週期內固定，不需要 URL sync 寫回
 * - 因此不呼叫 useThemeUrlSync：preview 是「唯讀渲染」，避免污染 iframe 內的 history / LS
 */

const themeStore = useDemoThemeStore();

/**
 * 把 theme 屬性同步到 <html>
 *
 * 與 layout-theme-host 同樣掛在 documentElement（而非 layout 根）：
 * 保持一致，且讓 fixed / 全頁 scope 的 CSS var 規則都讀得到。
 * 每個 iframe 是獨立 browsing context，這裡設定的是 iframe 自己的 documentElement，
 * 互不干擾（父頁 showcase 的 documentElement 不受影響）。
 */
watchEffect(() => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", themeStore.layoutKey);
  document.documentElement.setAttribute(
    "data-theme-color",
    themeStore.colorKey
  );
});
</script>

<template>
  <div class="theme-preview-layout">
    <!-- theme 元件區：preview page 的 <Suspense> 渲染這裡；無 FAB、無其他 chrome -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.theme-preview-layout {
  // 父層充滿，內部 theme 自行決定高度 / 滾動
  width: 100%;
  min-height: 100vh;
}
</style>
