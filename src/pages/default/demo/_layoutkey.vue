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
  // 用 theme demo 專用薄殼 layout（已存在），會掛 FAB + URL sync + [data-theme] 屬性
  layout: "layout-theme-host",
  setting: {
    // 本頁是純單檔，無 desktop / mobile 兩版檔案，關掉 awd 才不會去找 layout-theme-host-mobile
    useAwdLayout: false,
    // 不出現在 nav / drawer：demo 頁是 deep link，從 showcase 開新分頁進來
    sort: 999,
    icon: "",
    i18nName: ""
  }
});

/**
 * Demo Page — /demo/:layoutkey 路由的展示頁
 *
 * 角色：
 * - URL 鎖定 layoutKey：使用者貼這個連結，收件人一定看到對應版型
 * - FAB（layout-theme-host 掛的）只剩切配色，版面已由 URL 鎖定
 * - layoutKey 由 route.params 注入 theme.store，不寫 LS（demo 頁的 layoutKey 不該被 persist）
 *
 * 為什麼整頁邏輯放 page 而不放 layout-theme-host：
 * - layout 應該對「上面是什麼 page」無感；page 才知道「我這個 URL 帶了 :layoutkey」
 * - layout-theme-host 只負責「掛 FAB + 同步 [data-theme] + URL sync」這三件事
 * - 這樣未來若要有 /preview/:layoutkey（純預覽不可切色）的新 page，
 *   只需新增 page，不必動 layout
 *
 * 路由設定來源：
 * - 檔名 _layoutkey.vue 被 src/_app/pages.ts 自動轉成 path "/demo/:layoutkey"
 *   （參考 pages.ts 第 74 行 .replace(/\/_+/g, "/:")）
 * - vue-router 動態段 param 名稱是 "layoutkey"（全小寫，pages.ts 走 toLowerCase）
 */

const route = useRoute();
const router = useRouter();
const themeStore = useDemoThemeStore();

// isMobile 由 App.vue 透過 provide 注入（已是 Ref）
const isMobile = inject<Ref<boolean>>("isMobile");

/**
 * 從 route 拿 layoutkey；型別保護：可能是 string / string[] / undefined
 *
 * vue-router 對動態段預設給 string；用 catch-all（*）才會是 string[]。
 * 仍守住型別以策安全。
 */
const routeLayoutKey = computed<string | null>(() => {
  const raw = route.params.layoutkey;
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && raw.length > 0) return raw[0];
  return null;
});

/**
 * 驗證 layoutKey 是否存在於 registry；不存在 → redirect /
 *
 * 為什麼用 watchEffect + immediate：
 * - 首次進站、route 改變、HMR 都要驗
 * - replace 而非 push，避免使用者點上一頁回到壞網址無限 loop
 *
 * 為什麼不用 router beforeEach guard：
 * - guard 在 route enter 前跑，但 page setup 才能讀 themes registry，
 *   把驗證放在 page 內 watchEffect 邏輯更內聚（route + theme 都已 ready）
 *
 * 注意：本檔不再呼叫 hydrateLayoutFromRoute / setLayout
 * demo-theme store 的 layoutKey 已是 computed from route.params，無需手動 sync
 */
watchEffect(() => {
  const key = routeLayoutKey.value;
  if (!key || !themes[key]) {
    router.replace({ path: "/" });
  }
});

/**
 * 動態挑出當前 theme 的入口元件
 *
 * 沿用原 home.vue 的邏輯：依 store.layoutKey + isMobile 動態切 desktop / mobile chunk
 * demo-theme store 的 layoutKey 是 computed from route，URL 改變這個 computed 會自動更新
 */
const ThemeComponent = computed(() => {
  const theme = themeStore.currentTheme;
  const loader = isMobile?.value ? theme.mobile : theme.desktop;
  return defineAsyncComponent({
    loader,
    onError(err) {
      console.error("[demo] failed to load theme chunk", err);
    }
  });
});
</script>

<template>
  <Suspense>
    <component :is="ThemeComponent" />
    <template #fallback>
      <!-- 載入中骨架：簡單的水平律動條，避免 layout shift -->
      <div class="demo-skeleton">
        <div class="demo-skeleton__bar" />
        <div class="demo-skeleton__bar" />
        <div class="demo-skeleton__bar" />
      </div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.demo-skeleton {
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
    animation: demo-shimmer 1.4s infinite;

    &:nth-child(2) {
      width: 70%;
    }

    &:nth-child(3) {
      width: 40%;
    }
  }
}

@keyframes demo-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
