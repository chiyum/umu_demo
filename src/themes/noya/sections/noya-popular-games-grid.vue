<script setup lang="ts">
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";
import ProviderBadge from "@/components/common/landing/provider-badge.vue";

/**
 * noya 熱門遊戲 grid：4 欄 × 2 列 = 8 張卡片
 *
 * 每張卡片：
 * - 頂部 LIVE 徽章
 * - 左下小 provider 標籤
 * - 右上小角圖（裝飾）
 * - 卡片主視覺：抽象人形剪影
 * - 底部標題與副標
 *
 * 設計：
 * - 結構參考原站，但所有圖檔 / 文字皆通用佔位
 * - 4 欄寬度由 grid 自動分配，最小 240px
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface GameCard {
  key: string;
  title: string;
  sub: string;
  providerBadge: string;
  providerSeed: number;
  /** 圖像 seed，給 avatar 顏色變化 */
  avatarSeed: number;
  /** 是否顯示 LIVE 徽章 */
  isLive: boolean;
}

const games: GameCard[] = [
  {
    key: "g1",
    title: "幸運寶藏",
    sub: "Lucky Treasure",
    providerBadge: "DA",
    providerSeed: 1,
    avatarSeed: 5,
    isLive: true
  },
  {
    key: "g2",
    title: "金幣大富翁",
    sub: "Gold Tycoon",
    providerBadge: "DB",
    providerSeed: 7,
    avatarSeed: 11,
    isLive: true
  },
  {
    key: "g3",
    title: "神秘寶箱",
    sub: "Mystery Chest",
    providerBadge: "DC",
    providerSeed: 13,
    avatarSeed: 18,
    isLive: true
  },
  {
    key: "g4",
    title: "東方明珠",
    sub: "Orient Pearl",
    providerBadge: "DD",
    providerSeed: 19,
    avatarSeed: 24,
    isLive: false
  },
  {
    key: "g5",
    title: "夜之女王",
    sub: "Night Queen",
    providerBadge: "DE",
    providerSeed: 25,
    avatarSeed: 31,
    isLive: true
  },
  {
    key: "g6",
    title: "翡翠之心",
    sub: "Jade Heart",
    providerBadge: "DF",
    providerSeed: 31,
    avatarSeed: 37,
    isLive: true
  },
  {
    key: "g7",
    title: "巴黎玫瑰",
    sub: "Paris Rose",
    providerBadge: "DG",
    providerSeed: 37,
    avatarSeed: 43,
    isLive: false
  },
  {
    key: "g8",
    title: "拉斯維加斯",
    sub: "Vegas Night",
    providerBadge: "DH",
    providerSeed: 43,
    avatarSeed: 49,
    isLive: true
  }
];
</script>

<template>
  <section
    class="noya-popular"
    :class="{ 'noya-popular--mobile': mobile }"
    id="games"
  >
    <div class="noya-popular__inner">
      <div class="noya-popular__grid">
        <article
          v-for="g in games"
          :key="g.key"
          class="noya-popular__card"
          tabindex="0"
        >
          <!-- 圖像區（剪影） -->
          <div class="noya-popular__media">
            <AvatarSilhouette
              :seed="g.avatarSeed"
              :variant="g.isLive ? 'vivid' : 'default'"
            />
            <!-- LIVE 徽章 -->
            <span v-if="g.isLive" class="noya-popular__live">LIVE</span>
            <!-- 右上裝飾小圖（CSS 繪製，金屬光澤點） -->
            <span class="noya-popular__corner" aria-hidden="true">★</span>
            <!-- 左下 provider 標籤 -->
            <div class="noya-popular__provider">
              <ProviderBadge
                :text="g.providerBadge"
                :seed="g.providerSeed"
                size="sm"
              />
            </div>
          </div>

          <!-- 底部文字 -->
          <div class="noya-popular__meta">
            <span class="noya-popular__title">{{ g.title }}</span>
            <span class="noya-popular__sub">{{ g.sub }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-popular {
  background: var(--bg-base);
  padding: 8px 0 32px;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }

  &__card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px var(--border);
      outline: none;
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 5 / 6;
    overflow: hidden;
  }

  &__live {
    position: absolute;
    top: 10px;
    left: 10px;
    background: var(--badge-live);
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.5px;
    padding: 3px 8px;
    border-radius: 4px;
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

    // LIVE 閃爍動畫
    animation: noya-live-pulse 1.6s ease-in-out infinite;
  }

  &__corner {
    position: absolute;
    top: 8px;
    right: 10px;
    color: var(--color-accent);
    font-size: 18px;
    z-index: 2;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }

  &__provider {
    position: absolute;
    bottom: 8px;
    left: 8px;
    z-index: 2;

    // 略縮小 size=sm 已 36px，這裡再縮 80% 配合卡片
    :deep(.provider-badge) {
      transform: scale(0.85);
      transform-origin: bottom left;
    }
  }

  &__meta {
    padding: 10px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }

  &__sub {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &--mobile {
    .noya-popular__inner {
      padding: 0 16px;
    }

    .noya-popular__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .noya-popular__title {
      font-size: 13px;
    }

    .noya-popular__sub {
      font-size: 10px;
    }
  }
}

@keyframes noya-live-pulse {
  0%,
  100% {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  50% {
    box-shadow: 0 0 8px var(--badge-live);
  }
}
</style>
