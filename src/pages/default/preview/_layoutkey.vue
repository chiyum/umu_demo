<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  inject,
  watchEffect,
  type Ref
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDemoThemeStore } from "@/store/demo-theme.store";
import { themes } from "@/themes/_registry";

defineOptions({
  // 用 preview 專用薄殼 layout：只掛 [data-theme]，不掛 FAB / URL sync
  layout: "layout-theme-preview",
  setting: {
    // 純單檔、無 desktop/mobile 兩版，關掉 awd 才不會去找 layout-theme-preview-mobile
    useAwdLayout: false,
    // 不出現在 nav / drawer：preview 是可分享的 deep link / iframe src
    sort: 999,
    icon: "",
    i18nName: ""
  }
});

/**
 * Preview Page — /preview/:layoutkey 路由的「獨立可分享 HTML 預覽頁」
 *
 * 角色（與 /demo/:layoutkey 的差異）：
 * - /demo/:layoutkey：完整體驗頁，掛 ThemeColorFab 可切色、URL 雙向同步
 * - /preview/:layoutkey：乾淨版面，只渲染該 theme 本體，無任何 chrome，
 *   專供「分享連結直達」與「被 showcase 卡片 iframe 嵌入即時預覽（A8）」兩用途
 *
 * 為什麼用 SPA 專屬路由而非 build 時靜態 pre-render 每套一檔（見 docs/adr/0002）：
 * - 72 套 × headless pre-render 會大幅推高 build 記憶體，逼近 CI OOM 上限（A6 鐵則）
 * - SPA 路由零 build 成本，且沿用既有 404.html SPA fallback，直連子路徑不 404
 * - iframe 可直接複用此路由當 src，一石二鳥
 *
 * 為什麼渲染邏輯與 demo page 幾乎一致卻不抽共用：
 * - 兩頁 defineOptions 的 layout 不同（host vs preview），且未來可能各自演化
 *   （demo 可能加更多互動、preview 要維持極簡），複製這段短小的 async component
 *   選擇邏輯比硬抽 composable 更好維護；真正的共用邏輯（store / getTheme）已封裝
 *
 * 路由來源：檔名 _layoutkey.vue 被 pages.ts 自動轉成 path "/preview/:layoutkey"
 * （與 /demo/:layoutkey 同一套 `.replace(/\/_+/g, "/:")` 規則）
 */

const route = useRoute();
const router = useRouter();
const themeStore = useDemoThemeStore();

// isMobile 由 App.vue 透過 provide 注入（iframe 內為該 iframe 自己的 window 寬度判斷）
const isMobile = inject<Ref<boolean>>("isMobile");

/** 從 route 拿 layoutkey（型別保護：可能 string / string[] / undefined） */
const routeLayoutKey = computed<string | null>(() => {
  const raw = route.params.layoutkey;
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && raw.length > 0) return raw[0];
  return null;
});

/**
 * 驗證 layoutKey 是否存在於 registry；不存在 → redirect /
 *
 * 與 demo page 同策略：用 watchEffect + replace（非 push），
 * 避免使用者點上一頁回到壞網址無限 loop。
 */
watchEffect(() => {
  const key = routeLayoutKey.value;
  if (!key || !themes[key]) {
    router.replace({ path: "/" });
  }
});

/**
 * 動態挑出當前 theme 的入口元件（依 store.currentTheme + isMobile 切 desktop / mobile chunk）
 *
 * store.currentTheme 由 layoutKey（computed from route.params）驅動，URL 改變自動更新。
 */
const ThemeComponent = computed(() => {
  const theme = themeStore.currentTheme;
  const loader = isMobile?.value ? theme.mobile : theme.desktop;
  return defineAsyncComponent({
    loader,
    onError(err) {
      console.error("[preview] failed to load theme chunk", err);
    }
  });
});
</script>

<template>
  <Suspense>
    <component :is="ThemeComponent" />
    <template #fallback>
      <!-- 載入中骨架：與 demo page 一致的水平律動條，避免 layout shift -->
      <div class="preview-skeleton">
        <div class="preview-skeleton__bar" />
        <div class="preview-skeleton__bar" />
        <div class="preview-skeleton__bar" />
      </div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.preview-skeleton {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__bar {
    height: 24px;
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.05) 100%
    );
    background-size: 200% 100%;
    animation: preview-shimmer 1.4s infinite;

    &:nth-child(2) {
      width: 70%;
    }

    &:nth-child(3) {
      width: 40%;
    }
  }
}

@keyframes preview-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
