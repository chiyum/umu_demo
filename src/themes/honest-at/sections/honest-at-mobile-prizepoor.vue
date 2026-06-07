<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from "vue";

/**
 * honest-at mobile JACKPOT 獎池 — 1:1 對齊 honest_real widgets/pages/at/prizepoor.vue + sprite-animation.vue
 *
 * 原作 DOM：
 *   .at-home-prizepoor
 *     .at-home-prizepoor-numbers
 *       <SpriteAnimation v-for="n in 11" :num="..." />  ← 11 個 sprite 數字
 *
 * 原作 SCSS：
 *   .at-home-prizepoor:
 *     position relative / margin-top -50px / 25vw / min-height 102px
 *     background-image url(10015.png) bg-size 98% center / z-index 3
 *   .at-home-prizepoor-numbers:
 *     position relative / bottom 13px / right 8.5% / display flex / gap 0.15rem
 *   .sprite-animation：
 *     固定 sprite-animation-num 高度 40px，翻動 -40px*n
 *
 * 原作邏輯：每 5 秒呼叫 randomAdjust，把 6 位數獎金隨機 +0~9999
 *
 * Demo 化：HTML+CSS sprite，11 個 .digit 都載入 0-9 的縱向列表，
 *   translateY 移到目標數字，重現翻動效果
 */

// formatNumberToFixedLength：把數字補齊到 11 位
function padTo11(n: number): string {
  return n.toString().padStart(11, "0");
}

const state = reactive({
  prizepoor: 651234
});

const digits = computed<number[]>(() =>
  padTo11(state.prizepoor)
    .split("")
    .map((c) => Number.parseInt(c, 10))
);

let timer: number | null = null;
onMounted(() => {
  // 對齊原作：每 5 秒 +0~9999 隨機
  timer = window.setInterval(() => {
    const maxRandom = 9999;
    state.prizepoor += Math.floor(Math.random() * (maxRandom + 1));
  }, 5000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
</script>

<template>
  <div class="honest-at-m-prizepoor">
    <div class="honest-at-m-prizepoor__numbers">
      <div
        v-for="(d, idx) in digits"
        :key="idx"
        class="honest-at-m-prizepoor__digit"
      >
        <div
          class="honest-at-m-prizepoor__digit-track"
          :style="{ transform: `translateY(-${d * 40}px)` }"
        >
          <div
            v-for="n in 10"
            :key="n"
            class="honest-at-m-prizepoor__digit-num"
          >
            {{ n - 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊原作 .at-home-prizepoor：margin-top -50px / 25vw / min-height 102px
// background-image 10015.png 98% center / z-index 3
.honest-at-m-prizepoor {
  position: relative;
  margin-top: -50px;
  height: 25vw;
  min-height: 102px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-image: url("../assets/games/prizepoor-bg.png");
  background-repeat: no-repeat;
  background-size: 98%;
  background-position: center;
  z-index: 3;
}

// 對齊原作 .at-home-prizepoor-numbers：bottom 13px right 8.5% gap 0.15rem
.honest-at-m-prizepoor__numbers {
  position: relative;
  bottom: 13px;
  right: 8.5%;
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

// sprite digit 容器：固定 40px 高度（對齊 sprite-animation-num 高度）
.honest-at-m-prizepoor__digit {
  width: 22px;
  height: 40px;
  overflow: hidden;
  position: relative;
}

// 翻動 track：0~9 縱向列，每個 40px 高
.honest-at-m-prizepoor__digit-track {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.honest-at-m-prizepoor__digit-num {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Courier New", Menlo, monospace;
  font-size: 26px;
  font-weight: 900;
  color: #ffd57c;
  text-shadow: 0 0 6px rgba(255, 213, 124, 0.6);
}
</style>
