<script setup lang="ts">
import { useQuasar } from "quasar";
import iconDiscount from "../assets/user-action/discount.svg?url";

/**
 * vietvip mobile Buoy 浮窗（小遊戲入口）
 *
 * 對齊 lilian_vietvip_web src/widgets/buoy.vue 與 buoy.scss：
 * - 原專案是「右側固定紅包按鈕」（icon_redEnvelope_pop.png），右上 50vw、top 2.4rem
 * - 標題用 btn_redEnvelope_pop.png、次數用 btn_icon_prompt.jpeg
 * - 動畫：baloon_1 3s 上下擺動
 *
 * Demo 改用「金邊圓形浮窗 + 金色禮物 icon + 次數徽章」：
 * - 不抄死原專案 PNG（避免帶進不必要圖檔且品牌混雜）
 * - 視覺保留「上下擺動動畫 + 右側固定按鈕 + 紅色數字徽章」三大核心
 *
 * 為什麼浮窗 fixed 在右側中段而非右下角：
 * - 原專案 buoy 是右側中段（top 2.4rem）
 * - 右下角已被 tab bar 與 vietvip-m-user-card 邏輯保留給未來
 * - 中段方便使用者一眼注意到「VIP 福利入口」
 */

const $q = useQuasar();

function handleTap(): void {
  $q.notify({
    message: "Demo 環境：VIP 小遊戲僅展示版面",
    color: "primary",
    position: "top",
    timeout: 1500
  });
}
</script>

<template>
  <button
    type="button"
    class="vietvip-m-buoy"
    aria-label="VIP 小遊戲入口"
    @click="handleTap"
  >
    <span class="vietvip-m-buoy__icon" aria-hidden="true">
      <img :src="iconDiscount" alt="" />
    </span>
    <!-- 次數徽章：對齊原專案 buoy__num 視覺（右下角紅圓 + 白字） -->
    <span class="vietvip-m-buoy__num" aria-label="可用次數">3</span>
    <!-- 浮窗下方脈動光圈：對齊原專案的注目度設計 -->
    <span class="vietvip-m-buoy__pulse" aria-hidden="true" />
  </button>
</template>

<style lang="scss" scoped>
// 對齊原專案 buoy：fixed 右側、上下浮動動畫
.vietvip-m-buoy {
  position: fixed;
  right: 12px;
  // 中段偏下，避開 header（80px）也避開 bottom tab（80px 內）
  top: 38%;
  z-index: 95;
  width: 60px;
  height: 60px;
  padding: 0;
  border: 2px solid var(--vietvip-gold-1);
  border-radius: 50%;
  background: var(--gradient-gold);
  box-shadow:
    0 6px 16px rgba(199, 154, 69, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: vietvip-bob 3s ease-in-out infinite;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.92);
  }

  &__icon {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  &__icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    // SVG 白色填色配金底會失焦 → multiply 把白變透明只留線條輪廓
    mix-blend-mode: multiply;
    opacity: 0.85;
  }

  // 數字徽章：對齊原專案 buoy__num
  &__num {
    position: absolute;
    bottom: -4px;
    right: -4px;
    z-index: 3;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 11px;
    background: var(--primary-01);
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    line-height: 22px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.32);
    border: 1.5px solid #ffffff;
  }

  // 脈動光圈
  &__pulse {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid var(--vietvip-gold-1);
    z-index: 1;
    animation: vietvip-pulse 2s ease-out infinite;
  }
}

// 對齊原專案 buoy 的 baloon_1 keyframes：上下擺動
@keyframes vietvip-bob {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes vietvip-pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.6;
  }

  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}
</style>
