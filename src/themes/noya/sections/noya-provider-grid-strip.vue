<script setup lang="ts">
import { computed } from "vue";
import ProviderBadge from "@/components/common/landing/provider-badge.vue";

/**
 * noya provider 橫排：依當前 active 分類顯示對應 provider 卡片
 *
 * 設計：
 * - 左 56×53 徽章（用共用 ProviderBadge 取代真實 logo），右標題
 * - 可橫向 scroll，超過視窗寬度時拖曳查看
 * - 各分類對應 5-7 個 provider
 *
 * 為何把 provider 表寫死在這：純前端 demo，沒打 API；
 * 之後若要接後端，把 providersByCategory 改成 prop 即可。
 *
 * 文字內容：通用佔位（不抄原站文案），徽章字母為通用 2-3 字組合。
 */

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
  badge: string;
  /** seed 用來讓徽章配色不同 */
  seed: number;
}

/**
 * 每個分類對應的 provider 列表
 * 標題刻意用「示範館 A / 視訊館 B」這類通用代號，避免品牌侵權
 */
const providersByCategory: Record<string, ProviderItem[]> = {
  live: [
    { key: "live-1", title: "示範真人 A", badge: "DA", seed: 1 },
    { key: "live-2", title: "示範真人 B", badge: "DB", seed: 7 },
    { key: "live-3", title: "示範真人 C", badge: "DC", seed: 13 },
    { key: "live-4", title: "示範真人 D", badge: "DD", seed: 19 },
    { key: "live-5", title: "示範真人 E", badge: "DE", seed: 25 },
    { key: "live-6", title: "示範真人 F", badge: "DF", seed: 31 }
  ],
  sport: [
    { key: "sp-1", title: "示範體育 A", badge: "SA", seed: 2 },
    { key: "sp-2", title: "示範體育 B", badge: "SB", seed: 8 },
    { key: "sp-3", title: "示範體育 C", badge: "SC", seed: 14 },
    { key: "sp-4", title: "示範體育 D", badge: "SD", seed: 20 },
    { key: "sp-5", title: "示範體育 E", badge: "SE", seed: 26 }
  ],
  chess: [
    { key: "ch-1", title: "示範棋牌 A", badge: "CA", seed: 3 },
    { key: "ch-2", title: "示範棋牌 B", badge: "CB", seed: 9 },
    { key: "ch-3", title: "示範棋牌 C", badge: "CC", seed: 15 },
    { key: "ch-4", title: "示範棋牌 D", badge: "CD", seed: 21 },
    { key: "ch-5", title: "示範棋牌 E", badge: "CE", seed: 27 }
  ],
  slot: [
    { key: "sl-1", title: "示範電子 A", badge: "EA", seed: 4 },
    { key: "sl-2", title: "示範電子 B", badge: "EB", seed: 10 },
    { key: "sl-3", title: "示範電子 C", badge: "EC", seed: 16 },
    { key: "sl-4", title: "示範電子 D", badge: "ED", seed: 22 },
    { key: "sl-5", title: "示範電子 E", badge: "EE", seed: 28 },
    { key: "sl-6", title: "示範電子 F", badge: "EF", seed: 34 }
  ],
  fish: [
    { key: "fi-1", title: "示範捕魚 A", badge: "FA", seed: 5 },
    { key: "fi-2", title: "示範捕魚 B", badge: "FB", seed: 11 },
    { key: "fi-3", title: "示範捕魚 C", badge: "FC", seed: 17 },
    { key: "fi-4", title: "示範捕魚 D", badge: "FD", seed: 23 }
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
          <ProviderBadge :text="p.badge" :seed="p.seed" size="md" />
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
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    padding: 12px 18px;
    background: var(--provider-card-bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow);
    transition:
      transform 0.18s ease,
      box-shadow 0.2s ease;
    cursor: pointer;
    min-width: 180px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px var(--border);
    }
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
