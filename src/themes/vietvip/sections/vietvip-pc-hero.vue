<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// 與 mobile banner / user-card 共用同一組素材
// PC 把這兩段橫向疊放：左 banner 大圖 + 右 VIP 卡片
// VIP 徽章與 mobile user-card 同步改成純 CSS 渲染，不再用 vip-0~3 PNG
import banner01 from "../assets/banner/banner-01.jpg?url";
import banner02 from "../assets/banner/banner-02.jpg?url";
import banner08 from "../assets/banner/banner-08.jpg?url";
import banner09 from "../assets/banner/banner-09.jpg?url";
import iconRefresh from "../assets/home/icon-refresh.webp?url";
import iconMoney from "../assets/home/icon-money.svg?url";
import iconWithdraw from "../assets/user-action/withdraw.svg?url";
import iconDiscount from "../assets/user-action/discount.svg?url";
import iconCommission from "../assets/user-action/commission.svg?url";
import iconRanking from "../assets/user-action/ranking.svg?url";

/**
 * vietvip PC Hero 雙欄段
 *
 * 設計取捨：採「mobile 結構橫向延伸 + 同設計語言放大」方向
 * - mobile 是「banner / user-card」兩段直向疊放
 * - PC viewport 寬，把兩段橫向並排：左大圖 banner + 右 VIP 卡片
 *
 * 為什麼 PC 不另做「pc-banner 全寬獨立段 + 全寬 nav」這種商業站範式：
 * - 上輪被使用者拒收（強行套 ant-sport 五段不符合「以 1:1 復刻為主」要求）
 * - lilian_vietvip_web 是純手機專案沒有 PC 原作，
 *   PC 視覺只能從 mobile 推延，雙欄橫排是最忠於原作元素的方式
 * - 左 banner 與 mobile banner 同 4 張素材、自動輪播
 * - 右 VIP 卡片把 mobile user-card 直接放大版（VIP 徽章 + 餘額 + 4 快捷功能）
 *
 * 為什麼這層整合 banner 而不再用 vietvip-pc-banner.vue：
 * - PC hero 是雙欄結構（banner 只佔一半），不再是全寬 hero
 * - banner 子元件邏輯（自動輪播 / 指示點）內聚到 hero 段，不獨立成 section
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "p1", image: banner01, alt: "VietVip Pro FIFA 2022" },
  { key: "p2", image: banner02, alt: "VietVip Pro 777 Slots" },
  { key: "p3", image: banner08, alt: "VietVip Pro 提款獎勵" },
  { key: "p4", image: banner09, alt: "VietVip Pro 春節" }
];

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

let timer: ReturnType<typeof setInterval> | null = null;

function next(): void {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
}

function startAuto(): void {
  stopAuto();
  timer = setInterval(next, 5000);
}

function stopAuto(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function goTo(idx: number): void {
  activeIdx.value = idx;
  startAuto();
}

onMounted(startAuto);
onBeforeUnmount(stopAuto);

// VIP 卡片：與 mobile user-card 同步改純 CSS 徽章 + URL ?vip 參數
const DEFAULT_VIP_LEVEL = 2;

const route = useRoute();

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
  <section class="vietvip-pc-hero" aria-label="hero 雙欄">
    <div class="vietvip-pc-hero__inner">
      <!-- 左欄：banner 自動輪播（mobile banner 視覺放大） -->
      <div class="vietvip-pc-hero__banner">
        <div class="vietvip-pc-hero__banner-frame">
          <div class="vietvip-pc-hero__banner-viewport">
            <div class="vietvip-pc-hero__banner-track" :style="trackStyle">
              <article
                v-for="s in slides"
                :key="s.key"
                class="vietvip-pc-hero__banner-slide"
              >
                <img
                  :src="s.image"
                  :alt="s.alt"
                  class="vietvip-pc-hero__banner-img"
                  loading="lazy"
                />
              </article>
            </div>
            <div class="vietvip-pc-hero__banner-streak" aria-hidden="true" />
          </div>
        </div>
        <div class="vietvip-pc-hero__banner-dots">
          <button
            v-for="(s, i) in slides"
            :key="s.key"
            type="button"
            class="vietvip-pc-hero__banner-dot"
            :class="{ 'vietvip-pc-hero__banner-dot--on': activeIdx === i }"
            :aria-label="`第 ${i + 1} 張 banner`"
            @click="goTo(i)"
          />
        </div>
      </div>

      <!-- 右欄：VIP 會員卡片（mobile user-card 視覺放大） -->
      <aside class="vietvip-pc-hero__card" aria-label="會員資訊">
        <div class="vietvip-pc-hero__card-head">
          <span
            class="vietvip-pc-hero__card-vip"
            :aria-label="`VIP 等級 ${vipLevel}`"
          >
            VIP{{ vipLevel }}
          </span>
        </div>

        <div class="vietvip-pc-hero__card-credit">
          <span class="vietvip-pc-hero__card-currency" aria-label="餘額">
            <img :src="iconMoney" alt="" />
          </span>
          <span class="vietvip-pc-hero__card-amount">68,888</span>
          <button
            type="button"
            class="vietvip-pc-hero__card-refresh"
            :class="{
              'vietvip-pc-hero__card-refresh--turn': refreshFlag
            }"
            aria-label="重整餘額"
            @click="handleRefresh"
          >
            <img :src="iconRefresh" alt="" />
          </button>
        </div>

        <span class="vietvip-pc-hero__card-divider" aria-hidden="true" />

        <ul class="vietvip-pc-hero__card-actions" role="list">
          <li
            v-for="a in actions"
            :key="a.key"
            class="vietvip-pc-hero__card-action"
          >
            <div class="vietvip-pc-hero__card-action-icon">
              <img :src="a.icon" :alt="`${a.label} 圖示`" />
            </div>
            <span class="vietvip-pc-hero__card-action-label">
              {{ a.label }}
            </span>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// PC hero 段：1200 寬容器 + 雙欄
// 左 banner ≈ 760 / 右卡片 ≈ 400 / 間距 24
.vietvip-pc-hero {
  padding: 28px 0 36px;

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 24px;
    align-items: stretch;
  }

  // ─────── 左：banner ───────
  &__banner {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__banner-frame {
    flex: 1;
    position: relative;
    padding: 3px;
    border-radius: 18px;
    background: var(--gradient-gold);
    box-shadow:
      0 10px 26px var(--vietvip-card-glow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  &__banner-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 15px;
    overflow: hidden;
    background: var(--bg-base-deep);
  }

  &__banner-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__banner-slide {
    flex: 0 0 100%;
    height: 100%;
  }

  &__banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__banner-streak {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        70% 60% at 75% 20%,
        var(--vietvip-streak) 0%,
        transparent 60%
      ),
      linear-gradient(
        125deg,
        transparent 60%,
        var(--vietvip-streak) 66%,
        transparent 72%
      );
    mix-blend-mode: screen;
    opacity: 0.4;
  }

  &__banner-dots {
    margin-top: 14px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  &__banner-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.32);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 24px;
      border-radius: 4px;
      background: var(--vietvip-gold-1);
    }
  }

  // ─────── 右：VIP 卡片（mobile user-card 視覺放大） ───────
  &__card {
    padding: 24px 22px;
    background: var(--bg-surface);
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 18px;
    box-shadow:
      0 10px 24px var(--vietvip-card-glow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__card-head {
    display: inline-flex;
    align-items: center;
  }

  // VIP 徽章：純 CSS 渲染（金漸層底 + 白字 + 細白邊 + 內陰影）
  // 與 mobile user-card 的 &__vip 同設計語言，尺寸放大適合 PC viewport
  &__card-vip {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 1px;
    color: #ffffff;
    background: var(--gradient-gold);
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 14px;
    box-shadow:
      0 3px 8px rgba(199, 154, 69, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
    text-shadow: 0 1px 2px rgba(122, 80, 12, 0.35);
    font-family: var(--font-display);
  }

  &__card-credit {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__card-currency {
    width: 22px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__card-currency img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-amount {
    font-size: 32px;
    font-weight: 800;
    color: var(--primary-01);
    line-height: 1;
    letter-spacing: 0.5px;
    font-family: var(--font-display);
  }

  &__card-refresh {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.18s ease;

    &:hover {
      background: var(--bg-overlay);
    }

    &--turn img {
      animation: vietvip-pc-spin 1s linear infinite;
    }
  }

  &__card-refresh img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-divider {
    display: block;
    height: 1px;
    background: var(--vietvip-divider);
  }

  &__card-actions {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  &__card-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.15s ease;

    &:active {
      transform: scale(0.94);
    }
  }

  &__card-action-icon {
    width: 56px;
    height: 56px;
    padding: 7px;
    border-radius: 50%;
    background: var(--gradient-gold);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 4px 12px rgba(199, 154, 69, 0.4),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }

  // 同 mobile user-card 規範：icon 直接用 SVG 原色顯示，
  // 不對 SVG silhouette 套 mix-blend / filter 染色（金漸層只當圓背景）
  &__card-action-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-action-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }
}

@keyframes vietvip-pc-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// viewport 收窄時把卡片放到 banner 下方（避免 1024 以下擠壓）
@media (width <= 1024px) {
  .vietvip-pc-hero__inner {
    grid-template-columns: 1fr;
  }
}
</style>
