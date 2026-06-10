<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useShowcaseStore } from "@/store/showcase.store";
import ShowcaseHero from "@/components/showcase/showcase-hero.vue";
import ShowcaseLogoSwitcher from "@/components/showcase/showcase-logo-switcher.vue";
import ShowcaseFilterBar from "@/components/showcase/showcase-filter-bar.vue";
import ShowcaseThemeCard from "@/components/showcase/showcase-theme-card.vue";
import ShowcasePreviewDialog from "@/components/showcase/showcase-preview-dialog.vue";

defineOptions({
  // 用 showcase 專用薄殼 layout：不掛 FAB、不讀 theme store、不掛 data-theme
  // 與 demo 頁完全分離，避免條件分支邏輯
  layout: "layout-showcase",
  setting: {
    // useAwdLayout 預設由 pages.ts 給 true，會去找 layout-showcase-mobile（不存在）
    // 本頁 desktop / mobile 共用一份（純展示卡片網格，CSS media query 處理 RWD），關掉 awd
    useAwdLayout: false,
    sort: 0,
    icon: "home",
    i18nName: "nav.home"
  }
});

/**
 * Home — Showcase 列表頁
 *
 * 角色：
 * - URL = / → 顯示所有可用版型的卡片網格
 * - 不負責 demo 顯示（demo 頁是 /demo/:layoutkey）
 * - 不寫 LS、不掛 FAB、不掛 [data-theme]
 *
 * 為什麼 showcase 不引 useThemeStore：
 * - 領域隔離：theme.store（demo 主）只服務 demo 頁；showcase 自有 showcase.store
 * - 避免 showcase 首訪就觸發 theme.store 的 resolveInitialKeys（讀 LS、寫 LS），
 *   讓「主頁訪客」與「demo 體驗者」徹底分流
 *
 * 列表來源：listThemes() 直接從 registry 拿，registry 純 metadata 不會 eager 載入 theme chunk
 */

const showcaseStore = useShowcaseStore();
const route = useRoute();

/**
 * 同步 URL `?preview=1` 到 showcase store
 *
 * 行為：
 * - `?preview=1`（或任何 truthy 字串值）→ 跳過排程過濾，顯示所有 theme（含未到 releaseDate 的）
 * - 沒帶 query / `?preview=0` → 正常排程過濾
 *
 * 為什麼在 home.vue 而非 store 內 useRoute：
 * - showcase store 是 setup store，在 module load 階段 useRoute 會踩到 router 未注入的 SSR / 測試環境問題
 * - 改由 page 元件持有 route 來源，store 接受 setter 推進來，職責邊界清楚
 *
 * 為什麼用 watch + immediate 而非 onMounted：
 * - SPA navigation（query 變動）不會觸發 onMounted，watch 才會抓到 ?preview=1 → ?preview=0 切換
 * - immediate=true 取代額外的 onMounted；首次 mount 時也會跑一次同步
 *
 * 為什麼用 truthy 判斷（"1"、"true"、"yes" 都可）：
 * - 預期值是 `?preview=1` 但容錯接受其他常見 truthy 字串，避免使用者寫 `?preview=true` 失效
 * - 空字串 / "0" / "false" 視為 false（明確關掉）
 */
function isQueryTruthy(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(isQueryTruthy);
  if (value === null || value === undefined) return false;
  const s = String(value).trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes" || s === "on";
}

watch(
  () => route.query.preview,
  (raw) => {
    showcaseStore.setPreviewQueryActive(isQueryTruthy(raw));
  },
  { immediate: true }
);

// 額外保險：route 在某些情境（HMR / hydration 邊界）watch immediate 觸發前
// 已經有值，這層 onMounted 確保 store 至少同步一次最新 route.query
onMounted(() => {
  showcaseStore.setPreviewQueryActive(isQueryTruthy(route.query.preview));
});

/**
 * 篩選後的可見版型清單（由 store 計算，套用 brightness + categories）
 *
 * 為什麼從 listThemes() 改為 showcaseStore.filteredThemes：
 * - 篩選邏輯集中在 store，UI 只負責渲染派生 state
 * - 與 recommendedThemeKeys 都來自 store，兩者協作（推薦 ∩ 篩選）自動 reactive
 */
const visibleThemes = computed(() => showcaseStore.filteredThemes);

/** 是否為「篩到 0 結果」狀態（給 0 結果提示用） */
const isEmptyResult = computed(() => visibleThemes.value.length === 0);

/**
 * 判斷某 theme 是否屬於「依當前 logo 主色推薦」的最佳 5 個
 *
 * 為什麼不在 ThemeCard 內部自己判：
 * - Set 查詢結果由父層決定後，元件只需被告知「是 / 否」即可
 * - 維持 ThemeCard 對外介面純粹（props 接收事實，元件不主動 reach into store 算邏輯）
 */
function isRecommended(themeKey: string): boolean {
  return showcaseStore.recommendedThemeKeys.has(themeKey);
}

/**
 * 卡片 emit preview 時的處理：把 themeKey 餵進 showcase store 觸發 dialog
 */
function handlePreview(themeKey: string): void {
  showcaseStore.openPreview(themeKey, "desktop");
}

/**
 * 清除篩選 CTA：給 0 結果頁的「重設」按鈕用
 */
function handleClearFilters(): void {
  showcaseStore.clearFilters();
}
</script>

<template>
  <div class="showcase-page">
    <ShowcaseHero />

    <!--
      Logo 切換 row：放在 hero 與卡片網格之間，
      使用者可在「主頁觀感」上選定 logo，所有卡片預覽圖即時跟著換
    -->
    <ShowcaseLogoSwitcher />

    <!--
      篩選列：亮 / 暗 + 5 個類別 chip + 「LOGO 推薦」提示
      放在 logo 切換器下方、卡片 grid 上方，與 logo 視覺一氣呵成
    -->
    <ShowcaseFilterBar />

    <section class="showcase-page__grid-wrap">
      <div v-if="!isEmptyResult" class="showcase-page__grid">
        <ShowcaseThemeCard
          v-for="theme in visibleThemes"
          :key="theme.key"
          :theme="theme"
          :recommended="isRecommended(theme.key)"
          @preview="handlePreview"
        />
      </div>

      <!--
        0 結果提示：使用者把 brightness / category 篩到沒命中時顯示
        提供「清除篩選」CTA 一鍵重設，避免使用者卡在無法操作的畫面
      -->
      <div v-else class="showcase-page__empty">
        <p class="showcase-page__empty-title">目前條件沒有版型</p>
        <p class="showcase-page__empty-desc">
          試試減少篩選條件，或切換到「全部」明暗看更多選擇
        </p>
        <button
          type="button"
          class="showcase-page__empty-btn"
          @click="handleClearFilters"
        >
          清除篩選
        </button>
      </div>
    </section>

    <!-- 全域 overlay：所有卡片共用同一個 dialog，由 showcase store 統一控 -->
    <ShowcasePreviewDialog />
  </div>
</template>

<style lang="scss" scoped>
.showcase-page {
  // 整體底 + 角落柔光由 hero 自己處理；卡片區用淺色底拉開層次
  background: #ffffff;
  min-height: 100vh;

  &__grid-wrap {
    background: linear-gradient(180deg, #ffffff 0%, #faf5ef 100%);
    padding: 56px 32px 96px;
  }

  &__grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }

  // 0 結果提示卡：暖金描邊 + 置中文字，與整體 showcase 視覺一致
  &__empty {
    max-width: 520px;
    margin: 0 auto;
    padding: 56px 32px;
    text-align: center;
    background: #ffffff;
    border: 1px dashed rgba(212, 165, 116, 0.45);
    border-radius: 16px;
  }

  &__empty-title {
    font-size: 22px;
    font-weight: 700;
    color: #3d3329;
    margin: 0 0 10px;
  }

  &__empty-desc {
    font-size: 14px;
    color: #8a7a6a;
    line-height: 1.6;
    margin: 0 0 24px;
  }

  &__empty-btn {
    padding: 12px 26px;
    border-radius: 10px;
    background: linear-gradient(135deg, #d4a574 0%, #c79968 100%);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid transparent;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(212, 165, 116, 0.32);
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(212, 165, 116, 0.42);
    }
  }
}

@media (width <= 768px) {
  .showcase-page {
    &__grid-wrap {
      padding: 40px 20px 64px;
    }

    &__grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
}
</style>
