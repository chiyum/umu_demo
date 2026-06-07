<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import homeLine from "../../assets/desktop/home-line.png?url";

/**
 * honest-max 桌面版「線上人數」— 視覺骨架參考 kingdom_front long online-people
 * 配色：max 桃粉天藍混色
 */

const onlineCount = ref<number>(32158);
let timer: number | null = null;

onMounted(() => {
  timer = window.setInterval(() => {
    const delta = Math.floor(Math.random() * 51) - 25;
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
  <div class="honest-max-pc-online">
    <p class="honest-max-pc-online__title">88WIN 即時線上人數</p>
    <div class="honest-max-pc-online__counter">
      <div
        v-for="(d, idx) in digits(onlineCount)"
        :key="idx"
        class="honest-max-pc-online__digit"
      >
        <div
          class="honest-max-pc-online__digit-track"
          :style="{ transform: `translateY(-${d * 60}px)` }"
        >
          <div v-for="n in 10" :key="n" class="honest-max-pc-online__digit-num">
            {{ n - 1 }}
          </div>
        </div>
      </div>
    </div>
    <img :src="homeLine" alt="" class="honest-max-pc-online__line" />
  </div>
</template>

<style lang="scss" scoped>
// 對齊 kingdom online-people 結構：column center / title + counter + line
// 配色 max 淡粉漸層白底（取自手機 bg-base #f5f6fa）
.honest-max-pc-online {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0 40px;
  background: linear-gradient(
    to left,
    hsla(var(--primary-h), var(--primary-s), 75%, 0.18) 0%,
    var(--bg-base) 50%
  );

  &__title {
    margin-bottom: 24px;
    font-size: 40px;
    font-weight: 500;
    color: var(--text-primary);
  }

  &__counter {
    display: flex;
    gap: 12px;
    padding: 18px 32px;
    background: var(--bg-surface);
    border-radius: 8px;
    box-shadow: var(--shadow-md);
    margin-bottom: 16px;
  }

  &__digit {
    width: 48px;
    height: 60px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(
      to bottom,
      var(--primary-01) 0%,
      var(--secondary-01) 100%
    );
    border-radius: 6px;
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
  }

  &__line {
    max-width: 80%;
    height: auto;
    object-fit: contain;
    margin-top: 16px;
    opacity: 0.5;
  }
}
</style>
