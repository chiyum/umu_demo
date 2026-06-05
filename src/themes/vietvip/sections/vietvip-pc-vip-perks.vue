<script setup lang="ts">
// 從本 theme assets 取 VIP 徽章與 4 個快捷功能 icon
import vipLevel0 from "../assets/home/vip-0.png?url";
import vipLevel1 from "../assets/home/vip-1.png?url";
import vipLevel2 from "../assets/home/vip-2.png?url";
import vipLevel3 from "../assets/home/vip-3.png?url";
import iconWithdraw from "../assets/user-action/withdraw.svg?url";
import iconDiscount from "../assets/user-action/discount.svg?url";
import iconCommission from "../assets/user-action/commission.svg?url";
import iconRanking from "../assets/user-action/ranking.svg?url";

/**
 * vietvip PC VIP Perks 區 — 4 個等級徽章 + 4 個 VIP 福利
 *
 * Demo 站專屬區塊（mobile 版的 user-card 是登入後資料，PC 版改為「VIP 等級與福利展示」），
 * 對齊原專案 user.vue 4 個快捷功能 + vip_0..3 徽章，但改為宣傳 banner 風格：
 *
 * 上排：4 個 VIP 等級徽章（vip-0..vip-3），每張卡片下方寫等級名稱與門檻
 * 下排：4 個 VIP 福利（提款、豪華盛宴、領取佣金、排行榜），每張卡片下方寫福利說明
 *
 * 為什麼這個區塊只出現在 PC 而非 mobile：
 * - mobile user-card 已涵蓋「登入後顯示帳號 + VIP + 4 個快捷」
 * - PC 版面寬，把「等級晉升 / 福利說明」當行銷區塊更有質感
 * - 也填補 PC 版上下 5 段（banner / marquee / game / vip-perks / footer）的版面密度
 */

interface VipTier {
  badge: string;
  name: string;
  threshold: string;
}

const vipTiers: VipTier[] = [
  { badge: vipLevel0, name: "新會員", threshold: "首儲即可加入" },
  { badge: vipLevel1, name: "白銀 VIP", threshold: "累計流水 10 萬" },
  { badge: vipLevel2, name: "黃金 VIP", threshold: "累計流水 100 萬" },
  { badge: vipLevel3, name: "鑽石 VIP", threshold: "累計流水 1000 萬" }
];

interface Perk {
  icon: string;
  title: string;
  description: string;
}

const perks: Perk[] = [
  {
    icon: iconWithdraw,
    title: "綠色提款",
    description: "VIP 專屬通道，5 分鐘內極速到帳"
  },
  {
    icon: iconDiscount,
    title: "豪華盛宴",
    description: "每月實體禮品與限量活動邀請"
  },
  {
    icon: iconCommission,
    title: "現金返水",
    description: "依等級最高 1.5% 無限反水"
  },
  {
    icon: iconRanking,
    title: "排行榜獎勵",
    description: "週週競賽，獎金累積千萬越南盾"
  }
];
</script>

<template>
  <section class="vietvip-pc-perks" aria-label="VIP 等級與福利">
    <div class="vietvip-pc-perks__inner">
      <header class="vietvip-pc-perks__header">
        <span class="vietvip-pc-perks__eyebrow">VIP PRIVILEGE</span>
        <h2 class="vietvip-pc-perks__title">越南 VIP 等級與福利</h2>
        <span class="vietvip-pc-perks__divider" aria-hidden="true" />
      </header>

      <!-- 4 個等級徽章 -->
      <ul class="vietvip-pc-perks__tiers" role="list">
        <li v-for="t in vipTiers" :key="t.name" class="vietvip-pc-perks__tier">
          <div class="vietvip-pc-perks__tier-badge">
            <img :src="t.badge" :alt="`${t.name} 徽章`" />
          </div>
          <span class="vietvip-pc-perks__tier-name">{{ t.name }}</span>
          <span class="vietvip-pc-perks__tier-threshold">{{
            t.threshold
          }}</span>
        </li>
      </ul>

      <!-- 4 個 VIP 福利 -->
      <ul class="vietvip-pc-perks__list" role="list">
        <li v-for="p in perks" :key="p.title" class="vietvip-pc-perks__item">
          <div class="vietvip-pc-perks__icon">
            <img :src="p.icon" :alt="`${p.title} 圖示`" />
          </div>
          <div class="vietvip-pc-perks__body">
            <h3 class="vietvip-pc-perks__item-title">{{ p.title }}</h3>
            <p class="vietvip-pc-perks__item-desc">{{ p.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.vietvip-pc-perks {
  padding: 60px 0 80px;

  // 整層底色：深酒紅 + 左下金色 radial 對齊整體基調
  background: radial-gradient(
      ellipse 60% 50% at 0% 100%,
      hsla(var(--secondary-h), var(--secondary-s), 50%, 0.22) 0%,
      transparent 70%
    ),
    var(--bg-base-deep);

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;
  }

  &__eyebrow {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 6px;
    color: var(--vietvip-gold-2);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  &__title {
    margin: 0;
    font-size: 38px;
    font-weight: 800;
    color: var(--vietvip-gold-1);
    letter-spacing: 2px;
    font-family: var(--font-display);
  }

  &__divider {
    display: block;
    margin: 16px auto 0;
    width: 200px;
    height: 1px;
    background: var(--vietvip-divider);
  }

  // 4 等級徽章
  &__tiers {
    margin: 0 0 50px;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
  }

  &__tier {
    padding: 28px 18px 22px;
    background: linear-gradient(
      180deg,
      rgba(74, 15, 29, 0.62) 0%,
      rgba(28, 3, 9, 0.85) 100%
    );
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    transition: transform 0.18s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  &__tier-badge {
    width: 80px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__tier-badge img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }

  &__tier-name {
    font-size: 18px;
    font-weight: 800;
    color: var(--vietvip-gold-1);
    font-family: var(--font-display);
    letter-spacing: 0.5px;
  }

  &__tier-threshold {
    font-size: 13px;
    color: var(--vietvip-gold-2);
    letter-spacing: 0.3px;
  }

  // 4 個福利 grid
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  &__item {
    padding: 24px 20px;
    background: var(--bg-surface);
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
    box-shadow: 0 6px 18px var(--vietvip-card-glow);

    &:hover {
      transform: translateY(-4px);
      box-shadow:
        0 12px 26px var(--vietvip-card-glow),
        0 0 0 1px var(--vietvip-gold-1);
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    padding: 8px;
    border-radius: 50%;
    background: var(--gradient-gold);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(199, 154, 69, 0.45);
  }

  &__icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    // 同 mobile user-card：白色 SVG 在金底失焦 → multiply 留輪廓
    mix-blend-mode: multiply;
    opacity: 0.85;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__item-title {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: var(--primary-01);
    letter-spacing: 0.5px;
    font-family: var(--font-display);
  }

  &__item-desc {
    margin: 0;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
    letter-spacing: 0.2px;
  }
}
</style>
