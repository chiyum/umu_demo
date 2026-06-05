<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

/**
 * tycoon 數字計數動畫 atom
 *
 * 與 ant-sport-counter 相同設計：用 requestAnimationFrame 自寫
 * 不引入 vue3-autocounter 這類 100KB 套件
 *
 * 為什麼複製一份而非共用：
 * - 各 theme 的 atoms 都保持「自己 scoped」，視覺微調（字體 / tabular-nums 對齊）獨立
 * - tycoon 走 Inter 為 display 字體，未來若要切回 system-ui 不影響其他 theme
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
  <span class="tycoon-counter">{{ display }}</span>
</template>

<style lang="scss" scoped>
.tycoon-counter {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  font-family: var(--font-display);
}
</style>
