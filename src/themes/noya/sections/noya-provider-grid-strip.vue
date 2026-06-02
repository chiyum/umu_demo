<script setup lang="ts">
import { computed } from "vue";

/**
 * noya provider 橫排：依當前 active 分類顯示對應 provider 卡片
 *
 * 設計：
 * - 左 56×53 視覺圖（platform desktop bg 系列），右標題
 * - 可橫向 scroll，超過視窗寬度時拖曳查看
 * - 各分類對應 4-6 個 provider
 *
 * 為何把 provider 表寫死在這：純前端 demo，沒打 API；
 * 之後若要接後端，把 providersByCategory 改成 prop 即可。
 *
 * 第六輪：把 ProviderBadge 抽象徽章換成 kingdom_front desktop_platform_*_bg 實際素材，
 *   讓 provider 視覺更具體；保留橫向 scroll + meta 區（標題 + 立即體驗）結構不變
 *
 * 文字內容：通用佔位（不抄原站文案）。
 */

// 用 import.meta.glob 一次抓 providers 目錄全部圖
// eager:true 直接打進 chunk，避免 runtime 動態載入造成首屏閃白；
// query/import 拿到 default export（URL）
const providerImages = import.meta.glob<string>(
  "@/assets/themes/noya/images/providers/*.png",
  { eager: true, query: "?url", import: "default" }
);

/**
 * 依檔名（如 live-1）拿到對應的素材 URL，
 * 找不到就回空字串，避免 runtime 噴 undefined
 */
function getProviderImg(name: string): string {
  const key = `/src/assets/themes/noya/images/providers/${name}.png`;
  return providerImages[key] ?? "";
}

interface Props {
  /** 當前 active 分類 key（live / sport / chess / slot / fish） */
  activeCategory?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeCategory: "live"
});

interface ProviderItem {
  key: string;
  title: string;
  /** 對應 providers/ 內的圖檔名（不含副檔名） */
  img: string;
}

/**
 * 每個分類對應的 provider 列表
 * 標題刻意用「示範館 A / 視訊館 B」這類通用代號，避免品牌侵權
 */
const providersByCategory: Record<string, ProviderItem[]> = {
  live: [
    { key: "live-1", title: "示範真人 A", img: "live-1" },
    { key: "live-2", title: "示範真人 B", img: "live-2" },
    { key: "live-3", title: "示範真人 C", img: "live-3" },
    { key: "live-4", title: "示範真人 D", img: "live-4" },
    { key: "live-5", title: "示範真人 E", img: "live-5" },
    { key: "live-6", title: "示範真人 F", img: "live-6" }
  ],
  sport: [
    { key: "sp-1", title: "示範體育 A", img: "sport-1" },
    { key: "sp-2", title: "示範體育 B", img: "sport-2" },
    { key: "sp-3", title: "示範體育 C", img: "sport-3" },
    { key: "sp-4", title: "示範體育 D", img: "sport-4" },
    { key: "sp-5", title: "示範體育 E", img: "sport-5" }
  ],
  chess: [
    { key: "ch-1", title: "示範棋牌 A", img: "chess-1" },
    { key: "ch-2", title: "示範棋牌 B", img: "chess-2" },
    { key: "ch-3", title: "示範棋牌 C", img: "chess-3" },
    { key: "ch-4", title: "示範棋牌 D", img: "chess-4" },
    { key: "ch-5", title: "示範棋牌 E", img: "chess-5" }
  ],
  slot: [
    { key: "sl-1", title: "示範電子 A", img: "slot-1" },
    { key: "sl-2", title: "示範電子 B", img: "slot-2" },
    { key: "sl-3", title: "示範電子 C", img: "slot-3" },
    { key: "sl-4", title: "示範電子 D", img: "slot-4" },
    { key: "sl-5", title: "示範電子 E", img: "slot-5" },
    { key: "sl-6", title: "示範電子 F", img: "slot-6" }
  ],
  fish: [
    { key: "fi-1", title: "示範捕魚 A", img: "fish-1" },
    { key: "fi-2", title: "示範捕魚 B", img: "fish-2" },
    { key: "fi-3", title: "示範捕魚 C", img: "fish-3" },
    { key: "fi-4", title: "示範捕魚 D", img: "fish-4" }
  ]
};

/** 當前顯示的 provider 列表，找不到分類就 fallback 為 live */
const activeProviders = computed(
  () => providersByCategory[props.activeCategory] ?? providersByCategory.live
);
</script>

<template>
  <section class="noya-provider-strip" aria-label="遊戲提供商列表">
    <div class="noya-provider-strip__inner">
      <div class="noya-provider-strip__scroll">
        <div
          v-for="p in activeProviders"
          :key="p.key"
          class="noya-provider-strip__card"
        >
          <!--
            素材圖：cover 進 56×56 容器、加金邊圓角；
            lazy + async 讓非首屏 provider 不阻塞首屏載入
          -->
          <img
            :src="getProviderImg(p.img)"
            :alt="p.title"
            class="noya-provider-strip__img"
            loading="lazy"
            decoding="async"
          />
          <div class="noya-provider-strip__meta">
            <span class="noya-provider-strip__title">{{ p.title }}</span>
            <span class="noya-provider-strip__sub">立即體驗</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-provider-strip {
  background: var(--bg-base);
  padding: 18px 0 24px;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__scroll {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 3px;
    }
  }

  &__card {
    // kingdom DNA：卡片 --radius-xl（16px）+ shadow-md 預設、shadow-lg hover
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    padding: 12px 18px;
    background: var(--provider-card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    transition:
      transform var(--transition-base),
      box-shadow var(--transition-base);
    cursor: pointer;
    min-width: 180px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
  }

  // 素材圖：56×56 cover，金色邊框 + 圓角，與卡片視覺一致
  &__img {
    // kingdom DNA：小圖容器 --radius-lg（10px）
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    background: var(--bg-overlay);
    flex-shrink: 0;
    display: block;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }

  &__sub {
    font-size: 11px;
    color: var(--color-primary);
    letter-spacing: 1px;
  }
}
</style>
