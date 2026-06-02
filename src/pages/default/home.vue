<script setup lang="ts">
import { computed } from "vue";
import { listThemes } from "@/themes/_registry";
import { useShowcaseStore } from "@/store/showcase.store";
import ShowcaseHero from "@/components/showcase/showcase-hero.vue";
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

/** 所有可用版型，依 registry 順序顯示 */
const themes = computed(() => listThemes());

/**
 * 卡片 emit preview 時的處理：把 themeKey 餵進 showcase store 觸發 dialog
 */
function handlePreview(themeKey: string): void {
  showcaseStore.openPreview(themeKey, "desktop");
}
</script>

<template>
  <div class="showcase-page">
    <ShowcaseHero />

    <section class="showcase-page__grid-wrap">
      <div class="showcase-page__grid">
        <ShowcaseThemeCard
          v-for="theme in themes"
          :key="theme.key"
          :theme="theme"
          @preview="handlePreview"
        />
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
}

@media (max-width: 768px) {
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
