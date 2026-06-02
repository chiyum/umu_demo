<script setup lang="ts">
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";

/**
 * noya 手機版真人卡片列表 — 直式垂直清單
 *
 * 結構：
 * - 每張卡片：左 thumbnail（剪影）+ 右 文字（標題、subTitle、類別 tag）
 * - 10 張卡，可往下捲動
 *
 * 文字：全部用通用佔位（不抄原站）
 */

interface Card {
  key: string;
  title: string;
  sub: string;
  category: string;
  /** 圖像 seed */
  seed: number;
}

const cards: Card[] = [
  {
    key: "c1",
    title: "玫瑰夜場",
    sub: "Lucky Rose Live",
    category: "真人",
    seed: 6
  },
  {
    key: "c2",
    title: "夢幻荷官",
    sub: "Dream Dealer",
    category: "真人",
    seed: 12
  },
  {
    key: "c3",
    title: "翡翠殿堂",
    sub: "Jade Hall",
    category: "真人",
    seed: 18
  },
  {
    key: "c4",
    title: "皇家俱樂部",
    sub: "Royal Club",
    category: "棋牌",
    seed: 24
  },
  {
    key: "c5",
    title: "東方明月",
    sub: "Orient Moon",
    category: "真人",
    seed: 30
  },
  {
    key: "c6",
    title: "拉斯維加斯",
    sub: "Vegas Night",
    category: "電子",
    seed: 36
  },
  {
    key: "c7",
    title: "巴黎玫瑰",
    sub: "Paris Rose",
    category: "真人",
    seed: 42
  },
  {
    key: "c8",
    title: "東京華燈",
    sub: "Tokyo Lights",
    category: "真人",
    seed: 48
  },
  {
    key: "c9",
    title: "黃金海岸",
    sub: "Gold Coast",
    category: "體育",
    seed: 54
  },
  {
    key: "c10",
    title: "夜之女王",
    sub: "Night Queen",
    category: "真人",
    seed: 60
  }
];
</script>

<template>
  <section class="noya-m-list" aria-label="真人列表">
    <div class="noya-m-list__header">
      <h2 class="noya-m-list__heading">真人視訊</h2>
      <span class="noya-m-list__count">共 {{ cards.length }} 個館別</span>
    </div>

    <ul class="noya-m-list__items">
      <li v-for="c in cards" :key="c.key" class="noya-m-list__card">
        <div class="noya-m-list__thumb">
          <AvatarSilhouette :seed="c.seed" variant="vivid" />
        </div>
        <div class="noya-m-list__meta">
          <div class="noya-m-list__title">{{ c.title }}</div>
          <div class="noya-m-list__sub">{{ c.sub }}</div>
          <div class="noya-m-list__tag">
            <span class="noya-m-list__tag-dot" /> {{ c.category }}
          </div>
        </div>
        <div class="noya-m-list__arrow" aria-hidden="true">›</div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.noya-m-list {
  background: var(--bg-base);
  padding: 12px 16px 88px; // 底部預留 tab bar 空間

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  &__heading {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    color: var(--color-primary);
    letter-spacing: 2px;
  }

  &__count {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
    box-shadow: var(--shadow);
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.985);
    }
  }

  &__thumb {
    width: 64px;
    height: 64px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__meta {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
  }

  &__sub {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: var(--color-primary);
    background: var(--bg-overlay);
    border-radius: 999px;
    padding: 2px 8px;
    margin-top: 2px;
    align-self: flex-start;
    font-weight: 600;
  }

  &__tag-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--color-primary);
  }

  &__arrow {
    color: var(--text-muted);
    font-size: 22px;
    line-height: 1;
    flex-shrink: 0;
  }
}
</style>
