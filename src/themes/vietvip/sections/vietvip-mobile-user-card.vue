<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
// 從本 theme 自家 assets 取重整 icon + 餘額符號 + 4 個快捷功能 icon
// VIP 徽章改為純 CSS 渲染，不再使用 vip-0~3 PNG 圖檔
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
 * - 上半：VIP 徽章 + 餘額 + 重整 icon（移除帳號名）
 * - 下半：4 個快捷功能（提款 / 豪華盛宴 / 領取佣金 / 排行榜）
 *
 * 與上輪差異：
 * - 移除「demo_vip」帳號顯示：demo 站採「預設已登入會員視角」，
 *   帳號名稱沒有實際意義反而吵雜，徽章本身就代表會員身份
 * - VIP 徽章從 vip-0~3 PNG 改成純 CSS 渲染：
 *   1. 圖檔本身是黑底金光的窄條設計，深色徽章在白底卡片內視覺較弱
 *   2. 純 CSS（金漸層底 + 白色 VIP{N} 文字）能跟著 ruby / midnight / gold
 *      三變體的 --vietvip-gold-* token 動，視覺統一度更高
 *   3. 移除 4 張 PNG import 減少 bundle size
 *
 * 原專案的視覺特徵：
 * - 卡片白底（home.scss .home__user__action background: #fff），與深紅大底形成強對比
 * - 重整 icon 是 icon_refresh.webp 加 keyframes 旋轉
 *
 * Demo 純展示，credit 寫死；點重整時加 1 秒旋轉動畫示意
 * URL ?vip=0~3 仍可覆寫 VIP 等級供 demo 切換展示
 */

const DEFAULT_VIP_LEVEL = 2;

const route = useRoute();

// 解析 URL ?vip=N 並夾在合法區間 0~3
const vipLevel = computed(() => {
  const raw = route.query.vip;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 3) {
    return Math.floor(parsed);
  }
  return DEFAULT_VIP_LEVEL;
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
    <!-- 上半：VIP 徽章 + 餘額 -->
    <div class="vietvip-m-user__data">
      <div class="vietvip-m-user__vip-row">
        <span class="vietvip-m-user__vip" :aria-label="`VIP 等級 ${vipLevel}`">
          VIP{{ vipLevel }}
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
    gap: 8px;
    padding-bottom: 10px;

    // 金色細分隔線：對齊原專案視覺特徵的金箔線
    border-bottom: 1px solid var(--vietvip-gold-2);
  }

  // VIP 徽章列：移除帳號後改為靠左 inline-flex
  &__vip-row {
    display: inline-flex;
    align-items: center;
  }

  // VIP 徽章：純 CSS 渲染（金漸層底 + 白字 + 細白邊 + 內陰影）
  // 為什麼用 var(--gradient-gold) 而非 --gradient-cta：
  // - gradient-gold 在三變體下都走金漸層（ruby/midnight 真金、gold 變體更亮金）
  // - gradient-cta 在 gold 變體會切到酒紅漸層，VIP 徽章視覺不一致
  // - 徽章作為「會員身份標記」應保持金色一致性，與 quick-action 圓 icon 同調
  &__vip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.8px;
    color: #ffffff;
    background: var(--gradient-gold);
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 12px;
    box-shadow:
      0 2px 6px rgba(199, 154, 69, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
    text-shadow: 0 1px 2px rgba(122, 80, 12, 0.35);
    font-family: var(--font-display);
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
