<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

/**
 * ant-sport 數字計數動畫 atom
 *
 * 用 requestAnimationFrame 自寫小型計數動畫，
 * 不引入 vue3-autocounter 這類 100KB 套件
 *
 * 設計：
 * - props.endAmount 變動時自動啟動動畫；外層也可主動呼叫 start() 重播
 * - props.run 為 true 時才跑（給「滾動到可視區才觸發」的場景用）；
 *   未提供 run 時預設 mounted 立即跑
 * - 用 ease-out cubic 緩出曲線，比線性順眼
 */

interface Props {
  /** 終點數字 */
  endAmount: number;
  /** 動畫總時長（秒），預設 1.4 */
  durationSec?: number;
  /** 控制是否該跑動畫；false 不跑、true 觸發跑一次 */
  run?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  durationSec: 1.4,
  run: true
});

/** 目前顯示的整數值 */
const display = ref(0);

/** 動畫 RAF id（給 cleanup） */
let rafId: number | null = null;

/**
 * 啟動計數動畫
 *
 * 用 performance.now() 作為時間起點，每幀計算進度比例
 * ease-out 公式：1 - (1 - t)^3，讓數字越接近終點越慢
 */
function start() {
  cancel();
  const startTs = performance.now();
  const startVal = 0;
  const delta = props.endAmount - startVal;
  const duration = props.durationSec * 1000;

  const tick = (now: number) => {
    const elapsed = now - startTs;
    const t = Math.min(1, elapsed / duration);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    display.value = Math.round(startVal + delta * eased);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };
  rafId = requestAnimationFrame(tick);
}

function cancel() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/**
 * 觀察 run 屬性：true → 觸發動畫
 *
 * 用 watch + immediate 確保 mounted 時若已 run=true 也會跑一次
 * 避免使用者一進 demo 看到 0 不動的窘境
 */
watch(
  () => props.run,
  (v) => {
    if (v) start();
    else {
      // run 變 false 時把 display reset 為 0，下次再 run=true 重播
      cancel();
      display.value = 0;
    }
  },
  { immediate: true }
);

onBeforeUnmount(cancel);

defineExpose({ start });
</script>

<template>
  <span class="ant-sport-counter">{{ display }}</span>
</template>

<style lang="scss" scoped>
.ant-sport-counter {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}
</style>
