<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import homeLine from "../../assets/desktop/home-line.png?url";

/**
 * honest-at 桌面版「線上人數」 — 參考 kingdom_front long/desktop/online-people.vue
 *
 * 視覺骨架：
 *   .pc-online flex column center
 *   p 標題「即時線上人數」
 *   .digits 7 位數字翻動（kingdom 用 AnimationCounter 套件，這裡 CSS-only sprite）
 *   下方裝飾線
 *
 * 配色：原作 kingdom 是淡藍漸層 #e3f2fd → #fcfeff 白底，
 * honest-at 改成自家深藍底 + 青藍光線（手機 marquee 設計語言一致）
 */

const onlineCount = ref<number>(28567);
let timer: number | null = null;

onMounted(() => {
  // 每 2 秒小幅變動，營造即時感
  timer = window.setInterval(() => {
    const delta = Math.floor(Math.random() * 41) - 20;
    onlineCount.value = Math.max(1000, onlineCount.value + delta);
  }, 2000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});

// 7 位數字 sprite：每位拆出 -40px * n 的 translateY
function digits(n: number): number[] {
  return n
    .toString()
    .padStart(7, "0")
    .split("")
    .map((c) => Number.parseInt(c, 10));
}
</script>

<template>
  <div class="honest-at-pc-online">
    <p class="honest-at-pc-online__title">即時線上人數</p>
    <div class="honest-at-pc-online__counter">
      <div
        v-for="(d, idx) in digits(onlineCount)"
        :key="idx"
        class="honest-at-pc-online__digit"
      >
        <div
          class="honest-at-pc-online__digit-track"
          :style="{ transform: `translateY(-${d * 60}px)` }"
        >
          <div v-for="n in 10" :key="n" class="honest-at-pc-online__digit-num">
            {{ n - 1 }}
          </div>
        </div>
      </div>
    </div>
    <img :src="homeLine" alt="" class="honest-at-pc-online__line" />
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long/desktop/online-people：column center / 大 title + 數字 + bottom line
// 配色改為 honest-at 深藍底 + 青藍光
.honest-at-pc-online {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0 40px;
  background: linear-gradient(
    to bottom,
    var(--bg-base) 0%,
    var(--bg-surface) 100%
  );
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 1200px 400px at center,
      hsla(var(--primary-h), var(--primary-s), 60%, 0.18) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 40px;
    font-weight: 500;
    color: var(--text-on-primary);
    text-shadow: 0 0 12px hsla(var(--primary-h), var(--primary-s), 60%, 0.5);
    position: relative;
    z-index: 1;
  }

  &__counter {
    display: flex;
    gap: 12px;
    padding: 18px 32px;
    background: var(--bg-base-translucent);
    border: 1px solid var(--honest-at-neon-frame);
    border-radius: 8px;
    box-shadow:
      0 0 18px hsla(var(--primary-h), var(--primary-s), 60%, 0.4),
      inset 0 0 12px hsla(var(--primary-h), var(--primary-s), 60%, 0.2);
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  &__digit {
    width: 48px;
    height: 60px;
    overflow: hidden;
    position: relative;
    background: var(--honest-at-pc-digit-bg);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  &__digit-track {
    position: absolute;
    inset: 0 0 auto;
    display: flex;
    flex-direction: column;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__digit-num {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", "Segoe UI", sans-serif;
    font-size: 36px;
    font-weight: 900;
    color: var(--text-on-primary);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  &__line {
    max-width: 80%;
    height: auto;
    object-fit: contain;
    margin-top: 16px;
    opacity: 0.6;
    position: relative;
    z-index: 1;
  }
}
</style>
