<script setup lang="ts">
import { useQuasar } from "quasar";
// 對齊 lilian_vietvip_web/src/widgets/buoy.vue + buoy.scss 的「紅包 + WINNER 票券」
// 原作浮窗組合：icon_redEnvelope_pop.png 大紅包當底
// + btn_redEnvelope_pop.png（WINNER 金色 pill 標題）
// + btn_icon_prompt.jpeg（紅圓底配可用次數）
// + icon_redEnvelope_pop_tiger.png（從紅包裡跳出來的小老虎）
// 這 4 張上一個 commit 已複製進 vietvip/assets/buoy/
import imgEnvelope from "../assets/buoy/red-envelope.png?url";
import imgWinnerBtn from "../assets/buoy/winner-btn.png?url";
import imgNumBg from "../assets/buoy/num-bg.jpeg?url";
import imgTiger from "../assets/buoy/tiger.png?url";

/**
 * vietvip mobile Buoy 浮窗（小遊戲入口）
 *
 * 對齊 lilian_vietvip_web src/widgets/buoy.vue + assets/scss/buoy.scss：
 * - 主視覺：紅包大底 + 金色 WINNER 標題 + 紅圓次數徽章 + 小老虎跳出
 * - 位置：fixed 右側、top 約 2.4rem（原作位置）
 * - 動畫：原作 baloon_1 3s 上下擺動
 *
 * 上輪用 SVG 禮物 icon 過於簡陋，現改回原作 4 張組合圖，
 * 完整呈現「越南 VIP 紅包小遊戲」品牌記憶
 *
 * 為什麼浮窗 fixed 在右側中段：
 * - 原作 game__link 就是 fixed top 2.4rem right 0（buoy.scss 第 7-8 行）
 * - 右下角已被 tab bar 與 download 預留
 * - 中段方便使用者一眼注意到「VIP 福利入口」
 *
 * 為什麼 demo 不複製原作 drag-to-move 互動：
 * - 原作 buoy.vue 第 38-141 行寫了完整 mousedown/touchstart 拖曳邏輯
 * - demo 站純展示版面、不接登入流程，拖曳無實際意義
 * - 改為單純 click → Notify 提示，保留視覺即可
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
    <!-- 紅包大底（原作 icon_redEnvelope_pop.png） -->
    <img
      :src="imgEnvelope"
      alt=""
      class="vietvip-m-buoy__envelope"
      aria-hidden="true"
    />
    <!-- 小老虎跳出（原作 icon_redEnvelope_pop_tiger.png） -->
    <img
      :src="imgTiger"
      alt=""
      class="vietvip-m-buoy__tiger"
      aria-hidden="true"
    />
    <!-- WINNER 金色標題 pill（原作 btn_redEnvelope_pop.png） -->
    <img
      :src="imgWinnerBtn"
      alt=""
      class="vietvip-m-buoy__winner"
      aria-hidden="true"
    />
    <!-- 可用次數徽章（原作 btn_icon_prompt.jpeg + 數字） -->
    <span
      class="vietvip-m-buoy__num"
      :style="{ backgroundImage: `url(${imgNumBg})` }"
      aria-label="可用次數"
    >
      3
    </span>
  </button>
</template>

<style lang="scss" scoped>
// 對齊原作 buoy.scss：fixed 右側、上下浮動 baloon_1 動畫
// 尺寸與原作對齊：width 2rem / height 2.5rem（≈ 76 / 96 px）
.vietvip-m-buoy {
  position: fixed;
  right: 6px;

  // 原作 top 2.4rem ≈ 92px，避開 header（約 110px）改用 35%
  top: 35%;
  z-index: 95;
  width: 76px;
  height: 96px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  // 原作 baloon_1：上下擺動 + 2.5s 延遲（避免和入場動畫衝突）
  animation: vietvip-bob 3s ease-in-out infinite;
  animation-delay: 2.5s;

  // 點擊回饋
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.94);
  }

  // 紅包主體：absolute 鋪滿父容器
  &__envelope {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;

    // 紅包陰影強化「浮在紅金大底之上」的層次
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  }

  // 小老虎：absolute 右上方略偏，疊在紅包之上
  // 原作 SCSS 用 buoy__icon::after + toBottom keyframes 讓老虎從紅包後方往下移動
  // demo 簡化成靜態露出，避免動畫吵雜
  &__tiger {
    position: absolute;
    top: -16px;
    right: -8px;
    width: 42px;
    height: 42px;
    object-fit: contain;
    z-index: 3;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
  }

  // WINNER pill 金條：絕對定位在紅包中段
  &__winner {
    position: absolute;
    left: 50%;
    bottom: 30%;
    transform: translateX(-50%);
    width: 56px;
    height: auto;
    z-index: 4;
  }

  // 可用次數徽章：紅圓 + 白字，疊在紅包右下角
  &__num {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 5;
    width: 26px;
    height: 26px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    color: #ffffff;
    font-size: 13px;
    font-weight: 800;
    line-height: 26px;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
}

// 對齊原作 baloon_1 keyframes（buoy.scss 第 102-113 行）
// 0% / 100% translateY(0)；50% translateY(10px)
// demo 用 -8px 視覺更明顯（fixed 在頁面右側，幅度小看不出來）
@keyframes vietvip-bob {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
