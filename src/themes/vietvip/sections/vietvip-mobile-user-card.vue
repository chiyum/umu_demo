<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
// 從本 theme 自家 assets 取 VIP 徽章 / 重整 icon / 4 個快捷功能 icon
// 為什麼 4 個快捷功能用 SVG：原專案就是 SVG（icon_*_member_newyear2.svg），可吃 currentColor 變色
import vipLevel0 from "../assets/home/vip-0.png?url";
import vipLevel1 from "../assets/home/vip-1.png?url";
import vipLevel2 from "../assets/home/vip-2.png?url";
import vipLevel3 from "../assets/home/vip-3.png?url";
import iconRefresh from "../assets/home/icon-refresh.webp?url";
import iconMoney from "../assets/home/icon-money.svg?url";
import iconWithdraw from "../assets/user-action/withdraw.svg?url";
import iconDiscount from "../assets/user-action/discount.svg?url";
import iconCommission from "../assets/user-action/commission.svg?url";
import iconRanking from "../assets/user-action/ranking.svg?url";

/**
 * vietvip mobile 會員資訊卡
 *
 * 對齊 lilian_vietvip_web src/widgets/pages/home/user.vue：
 * - 上半：帳號 + VIP 徽章 + 餘額 + 重整 icon
 * - 下半：4 個快捷功能（提款 / 豪華盛宴 / 領取佣金 / 排行榜）
 *
 * 原專案的視覺特徵：
 * - 卡片白底（home.scss .home__user__action background: #fff），與深紅大底形成強對比
 * - VIP 徽章是 vip_0s..vip_3s.png 圖檔，徽章本身就是視覺核心
 * - 重整 icon 是 icon_refresh.webp 加 keyframes 旋轉
 *
 * Demo 純展示，account / credit 寫死；
 * 點重整時加 1 秒旋轉動畫示意
 */

interface VipLevel {
  level: number;
  src: string;
}

// 原專案 vip_0..3 對應未 / 一般 / 進階 / 至尊四階
// 為什麼用 0..3 而非 ant-sport 的 0..10：原專案就只有 4 張，與 ant-sport 的等級體系不同
// vietvip 走「精簡的 VIP 等級」是越南 VIP 站的常見設計（會員分檔較粗）
const VIP_BADGES: VipLevel[] = [
  { level: 0, src: vipLevel0 },
  { level: 1, src: vipLevel1 },
  { level: 2, src: vipLevel2 },
  { level: 3, src: vipLevel3 }
];

const DEFAULT_VIP_LEVEL = 2;

const route = useRoute();

const vipBadge = computed(() => {
  const raw = route.query.vip;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 3) {
    return VIP_BADGES[Math.floor(parsed)].src;
  }
  return VIP_BADGES[DEFAULT_VIP_LEVEL].src;
});

const refreshFlag = ref(false);

function handleRefresh(): void {
  if (refreshFlag.value) return;
  refreshFlag.value = true;
  setTimeout(() => (refreshFlag.value = false), 1000);
}

interface ActionItem {
  key: string;
  icon: string;
  label: string;
}

const actions: ActionItem[] = [
  { key: "withdraw", icon: iconWithdraw, label: "提款" },
  { key: "discount", icon: iconDiscount, label: "豪華盛宴" },
  { key: "commission", icon: iconCommission, label: "領取佣金" },
  { key: "ranking", icon: iconRanking, label: "排行榜" }
];
</script>

<template>
  <section class="vietvip-m-user" aria-label="會員資訊">
    <!-- 上半：帳號 / VIP / 餘額 -->
    <div class="vietvip-m-user__data">
      <div class="vietvip-m-user__account-row">
        <span class="vietvip-m-user__account">demo_vip</span>
        <span class="vietvip-m-user__vip" aria-label="VIP 等級徽章">
          <img :src="vipBadge" alt="" class="vietvip-m-user__vip-img" />
        </span>
      </div>
      <div class="vietvip-m-user__credit-row">
        <span class="vietvip-m-user__currency" aria-label="餘額">
          <img :src="iconMoney" alt="" class="vietvip-m-user__currency-img" />
        </span>
        <span class="vietvip-m-user__credit">68,888</span>
        <button
          type="button"
          class="vietvip-m-user__icon-btn"
          :class="{ 'vietvip-m-user__icon-btn--turn': refreshFlag }"
          aria-label="重整餘額"
          @click="handleRefresh"
        >
          <img :src="iconRefresh" alt="" class="vietvip-m-user__icon-img" />
        </button>
      </div>
    </div>

    <!-- 下半：4 個快捷功能 -->
    <ul class="vietvip-m-user__actions" role="list">
      <li v-for="a in actions" :key="a.key" class="vietvip-m-user__action-item">
        <div class="vietvip-m-user__action-icon">
          <img
            :src="a.icon"
            :alt="`${a.label} 圖示`"
            class="vietvip-m-user__action-img"
          />
        </div>
        <span class="vietvip-m-user__action-label">{{ a.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
// 對齊 lilian_vietvip_web .home__user__action：白底卡片 padding 0.2rem 0.35rem
// 我們改成「金邊白底卡」，與深紅大底形成強烈反差，符合「禮盒 VIP 卡」氣息
.vietvip-m-user {
  margin: 12px 14px 0;
  padding: 14px 14px 12px;
  background: var(--bg-surface);
  border: 1px solid var(--vietvip-gold-2);
  border-radius: 16px;
  box-shadow:
    0 8px 22px var(--vietvip-card-glow),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);

  &__data {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 10px;

    // 金色細分隔線：對齊原專案視覺特徵的金箔線
    border-bottom: 1px solid var(--vietvip-gold-2);
  }

  &__account-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__account {
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 600;
  }

  // VIP 徽章：對齊原專案 vip_*s.png 0.7rem 寬（約 36px）
  &__vip {
    width: 48px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__vip-img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }

  &__credit-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // 金錢符號圖示：對齊原專案 .user__icon.money 0.28×0.33rem
  &__currency {
    width: 18px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__currency-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__credit {
    font-size: 24px;
    font-weight: 800;
    color: var(--primary-01);
    line-height: 1;
    letter-spacing: 0.5px;
    font-family: var(--font-display);
  }

  &__icon-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.18s ease;

    &:hover {
      background: var(--bg-overlay);
    }

    // 對齊原專案 .turn 旋轉動畫
    &--turn {
      animation: vietvip-spin 1s linear infinite;
    }
  }

  &__icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__actions {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  &__action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }
  }

  &__action-icon {
    width: 46px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px;

    // 金邊圓形 icon 容器，呼應 vip 徽章視覺
    border-radius: 50%;
    background: linear-gradient(
      180deg,
      var(--vietvip-gold-1) 0%,
      var(--vietvip-gold-2) 100%
    );
    box-shadow:
      0 3px 8px rgba(199, 154, 69, 0.32),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }

  &__action-img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    // 原 SVG 是白色填色，配金底反而失焦 → mix-blend-mode: multiply 把白變透明、線條留下
    mix-blend-mode: multiply;
    opacity: 0.85;
  }

  &__action-label {
    font-size: 12px;
    color: var(--text-primary);
    line-height: 1.2;
    font-weight: 600;
  }
}

@keyframes vietvip-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
