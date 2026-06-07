<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import homeLine from "../../assets/desktop/home-line.png?url";

const onlineCount = ref<number>(19842);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    const delta = Math.floor(Math.random() * 41) - 20;
    onlineCount.value = Math.max(1000, onlineCount.value + delta);
  }, 2000);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});

function digits(n: number): number[] {
  return n
    .toString()
    .padStart(7, "0")
    .split("")
    .map((c) => Number.parseInt(c, 10));
}
</script>

<template>
  <div class="honest-no6-pc-online">
    <p class="honest-no6-pc-online__title">山日日 · 即時線上玩家</p>
    <div class="honest-no6-pc-online__counter">
      <div
        v-for="(d, idx) in digits(onlineCount)"
        :key="idx"
        class="honest-no6-pc-online__digit"
      >
        <div
          class="honest-no6-pc-online__digit-track"
          :style="{ transform: `translateY(-${d * 60}px)` }"
        >
          <div v-for="n in 10" :key="n" class="honest-no6-pc-online__digit-num">
            {{ n - 1 }}
          </div>
        </div>
      </div>
    </div>
    <img :src="homeLine" alt="" class="honest-no6-pc-online__line" />
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom online-people / 配色 no6 紫黑 + 金光
.honest-no6-pc-online {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0 40px;
  background: linear-gradient(to bottom, #1a0526 0%, #2a1042 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 1200px 400px at center,
      rgba(212, 78, 224, 0.2) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 40px;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0 0 12px rgba(212, 78, 224, 0.55);
    position: relative;
    z-index: 1;
  }

  &__counter {
    display: flex;
    gap: 12px;
    padding: 18px 32px;
    background: rgba(10, 3, 18, 0.78);
    border: 1px solid #f7c66c;
    border-radius: 8px;
    box-shadow:
      0 0 18px rgba(212, 78, 224, 0.42),
      inset 0 0 12px rgba(212, 78, 224, 0.25);
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  &__digit {
    width: 48px;
    height: 60px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(to bottom, #f7c66c 0%, #c79a45 100%);
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
    color: #1a0526;
  }

  &__line {
    max-width: 80%;
    height: auto;
    object-fit: contain;
    margin-top: 16px;
    opacity: 0.5;
    filter: hue-rotate(280deg);
    position: relative;
    z-index: 1;
  }
}
</style>
