<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import banner1 from "@/themes/ant-sport/assets/banner/banner-1.jpg?url";
import banner2 from "@/themes/ant-sport/assets/banner/banner-2.jpg?url";
import banner3 from "@/themes/ant-sport/assets/banner/banner-3.jpg?url";
import banner4 from "@/themes/ant-sport/assets/banner/banner-4.jpg?url";

/**
 * ant-sport mobile banner swiper
 *
 * 對齊 lilian_ant_web home.vue 第 10-14 行 `<Banner />` widget，
 * 4 張原 banner 1:1 拷貝過來，輪播 4 秒一張
 *
 * 為何不引 swiper.js 套件：noya 已驗證自寫 transform + setInterval 足夠流暢，
 * 不增加 100KB+ 依賴；點圓點手動切換後重啟 timer 避免馬上又被覆蓋
 */

interface Slide {
  key: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { key: "b1", image: banner1, alt: "蚂蚁体育 活動 banner 1" },
  { key: "b2", image: banner2, alt: "蚂蚁体育 活動 banner 2" },
  { key: "b3", image: banner3, alt: "蚂蚁体育 活動 banner 3" },
  { key: "b4", image: banner4, alt: "蚂蚁体育 活動 banner 4" }
];

const activeIdx = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

/** 輪播 timer */
let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  activeIdx.value = (activeIdx.value + 1) % slides.length;
}

function startAuto() {
  stopAuto();
  timer = setInterval(next, 4000);
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

onMounted(startAuto);
onBeforeUnmount(stopAuto);
</script>

<template>
  <section class="ant-sport-m-banner" aria-label="活動輪播 banner">
    <div class="ant-sport-m-banner__viewport">
      <div class="ant-sport-m-banner__track" :style="trackStyle">
        <article
          v-for="s in slides"
          :key="s.key"
          class="ant-sport-m-banner__slide"
        >
          <img
            :src="s.image"
            :alt="s.alt"
            class="ant-sport-m-banner__img"
            loading="lazy"
            decoding="async"
          />
        </article>
      </div>
    </div>

    <div class="ant-sport-m-banner__dots">
      <button
        v-for="(s, i) in slides"
        :key="s.key"
        type="button"
        class="ant-sport-m-banner__dot"
        :class="{ 'ant-sport-m-banner__dot--on': activeIdx === i }"
        :aria-label="`第 ${i + 1} 張 banner`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊 lilian_ant_web .home__banner：
// - height: 2.75rem (~104px), padding: 0 0.25rem (~9px)
// - border-radius: 0.2rem (~8px)
.ant-sport-m-banner {
  background: var(--bg-base);
  padding: 10px 9px 8px;
  position: relative;

  &__viewport {
    overflow: hidden;
    margin: 0;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
  }

  &__track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__slide {
    flex: 0 0 100%;
    aspect-ratio: 15 / 8; // 對齊原 banner_01 的 750x400 比例
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 8px;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;

    &--on {
      width: 18px;
      border-radius: 3px;
      background: var(--color-primary);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
