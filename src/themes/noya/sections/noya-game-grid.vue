<script setup lang="ts">
// 從 5168th.com 抓的兩張真人荷官圖，輪替分配給 8 個 card
import dealerA from "@/assets/themes/noya/images/live/live_modal-1.png";
import dealerB from "@/assets/themes/noya/images/chess/chess_modal-1.png";

/**
 * noya 熱門遊戲 grid：模擬「美女荷官」九宮格
 * 桌面 4 列、手機 2 列。
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

// 假資料：模擬荷官清單。8 個 card 用兩張真人圖輪替（id 奇/偶分配）
const dealers = [
  { id: 1, name: "Anna", tag: "VIP" },
  { id: 2, name: "Bella", tag: "新進" },
  { id: 3, name: "Cara", tag: "人氣" },
  { id: 4, name: "Daisy", tag: "" },
  { id: 5, name: "Elena", tag: "VIP" },
  { id: 6, name: "Fiona", tag: "" },
  { id: 7, name: "Grace", tag: "新進" },
  { id: 8, name: "Hana", tag: "人氣" }
];

// 依 id 奇偶分配兩張真人荷官圖
function dealerImg(id: number): string {
  return id % 2 === 1 ? dealerA : dealerB;
}
</script>

<template>
  <section
    id="games"
    class="noya-grid"
    :class="{ 'noya-grid--mobile': mobile }"
  >
    <div class="noya-grid__inner">
      <h2 class="noya-grid__title">熱門遊戲</h2>
      <p class="noya-grid__desc">精選真人荷官，等你來體驗</p>
      <div class="noya-grid__list">
        <div v-for="dealer in dealers" :key="dealer.id" class="noya-grid__card">
          <div class="noya-grid__card-visual">
            <img
              :src="dealerImg(dealer.id)"
              :alt="dealer.name"
              loading="lazy"
            />
            <span v-if="dealer.tag" class="noya-grid__card-tag">
              {{ dealer.tag }}
            </span>
          </div>
          <div class="noya-grid__card-info">
            <span class="noya-grid__card-name">{{ dealer.name }}</span>
            <span class="noya-grid__card-status">線上</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-grid {
  background: var(--bg-base);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px 24px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 32px;
    color: var(--color-primary);
    text-align: center;
    margin: 0 0 8px;
    letter-spacing: 2px;
  }

  &__desc {
    text-align: center;
    color: var(--text-muted);
    margin: 0 0 36px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  &__card {
    background: var(--bg-surface);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__card-visual {
    position: relative;

    // 圖片本身比例可能不是 5:6，用 aspect-ratio 鎖卡片比例，object-fit 維持人像置中
    aspect-ratio: 5 / 6;
    overflow: hidden;
    background: var(--bg-overlay);

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  &__card-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--gradient-cta);
    color: #ffffff;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 600;
  }

  &__card-info {
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__card-name {
    color: var(--text-primary);
    font-weight: 600;
  }

  &__card-status {
    color: var(--color-primary);
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
    }
  }

  &--mobile {
    .noya-grid__inner {
      padding: 40px 16px;
    }

    .noya-grid__list {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }
}
</style>
