<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import banner1 from "@/themes/ant-sport/assets/banner/banner-1.jpg?url";
import banner2 from "@/themes/ant-sport/assets/banner/banner-2.jpg?url";
import banner3 from "@/themes/ant-sport/assets/banner/banner-3.jpg?url";
import banner4 from "@/themes/ant-sport/assets/banner/banner-4.jpg?url";

/**
 * ant-sport PC banner — 對齊 lilian_ant_pc main.vue 第 1 行的 `<Banner />` widget
 *
 * 結構：全寬大圖輪播，4 張 banner 自動輪播 5 秒一張
 * 與 mobile 版差異：高度更高（450px），左右兩側帶切換箭頭
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "p1", image: banner1, alt: "蚂蚁体育 PC banner 1" },
  { key: "p2", image: banner2, alt: "蚂蚁体育 PC banner 2" },
  { key: "p3", image: banner3, alt: "蚂蚁体育 PC banner 3" },
  { key: "p4", image: banner4, alt: "蚂蚁体育 PC banner 4" }
];

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
}

function prev() {
  activeIdx.value = (activeIdx.value - 1 + slides.length) % slides.length;
}

function startAuto() {
  stopAuto();
  timer = setInterval(next, 5000);
}

function stopAuto() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function goTo(idx: number) {
  activeIdx.value = idx;
  startAuto();
}

function handlePrev() {
  prev();
  startAuto();
}

function handleNext() {
  next();
  startAuto();
}

onMounted(startAuto);
onBeforeUnmount(stopAuto);
</script>

<template>
  <section class="ant-sport-pc-banner" aria-label="活動 banner 輪播">
    <div class="ant-sport-pc-banner__viewport">
      <div class="ant-sport-pc-banner__track" :style="trackStyle">
        <article
          v-for="s in slides"
          :key="s.key"
          class="ant-sport-pc-banner__slide"
        >
          <img
            :src="s.image"
            :alt="s.alt"
            class="ant-sport-pc-banner__img"
            loading="lazy"
            decoding="async"
          />
        </article>
      </div>
    </div>

    <!-- 左右切換箭頭 -->
    <button
      type="button"
      class="ant-sport-pc-banner__arrow ant-sport-pc-banner__arrow--prev"
      aria-label="上一張 banner"
      @click="handlePrev"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      type="button"
      class="ant-sport-pc-banner__arrow ant-sport-pc-banner__arrow--next"
      aria-label="下一張 banner"
      @click="handleNext"
    >
      <span aria-hidden="true">›</span>
    </button>

    <!-- 底部圓點 -->
    <div class="ant-sport-pc-banner__dots">
      <button
        v-for="(s, i) in slides"
        :key="s.key"
        type="button"
        class="ant-sport-pc-banner__dot"
        :class="{ 'ant-sport-pc-banner__dot--on': activeIdx === i }"
        :aria-label="`第 ${i + 1} 張 banner`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ant-sport-pc-banner {
  position: relative;
  width: 100%;
  background: var(--bg-base-deep);
  overflow: hidden;

  &__viewport {
    width: 100%;
    overflow: hidden;
  }

  &__track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  // 對齊原作 .indexSlider height: 700px / .indexSlider-img 1920×700
  &__slide {
    flex: 0 0 100%;
    aspect-ratio: 1920 / 700;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-size: 26px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    &--prev {
      left: 24px;
    }

    &--next {
      right: 24px;
    }
  }

  &__dots {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 24px;
      border-radius: 4px;
      background: var(--color-primary);
    }
  }
}
</style>
