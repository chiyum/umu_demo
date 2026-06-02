<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";

/**
 * noya 手機版頂部 banner swiper (~180px 高)
 *
 * 設計：
 * - 不依賴 swiper 套件，自己用 transform + setInterval 做最簡輪播
 * - 每 4 秒切下一張，使用者點圓點可手動切換
 * - 每張 banner 各有不同漸層配色，與真人剪影搭配
 *
 * 為何不引 swiper：本專案沒有預先安裝 swiper，
 * 加進來會多 100KB+，僅 demo 不值得；CSS transform 已足夠流暢。
 */

interface Slide {
  key: string;
  title: string;
  sub: string;
  /** banner 背景漸層 */
  gradient: string;
  /** silhouette seed */
  seed: number;
}

// 3 張 slide 的漸層由 _tokens.scss 的 --banner-gradient-{1,2,3} 控制，
// 元件只持 var() reference；切配色時不必動元件就能換漸層
const slides: Slide[] = [
  {
    key: "s1",
    title: "新會員首存好禮",
    sub: "註冊即享專屬迎新方案",
    gradient: "var(--banner-gradient-1)",
    seed: 21
  },
  {
    key: "s2",
    title: "真人視訊．沉浸體驗",
    sub: "專業荷官 24 小時服務",
    gradient: "var(--banner-gradient-2)",
    seed: 53
  },
  {
    key: "s3",
    title: "電子遊戲．歡樂無限",
    sub: "上百款熱門機台等你來",
    gradient: "var(--banner-gradient-3)",
    seed: 88
  }
];

const activeIdx = ref(0);

/** transform 偏移值（百分比） */
const trackStyle = computed(() => ({
  transform: `translateX(-${activeIdx.value * 100}%)`
}));

/** 自動輪播 timer id */
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
  // 使用者手動切後重啟 timer，避免馬上又被切掉
  startAuto();
}

onMounted(() => startAuto());
onBeforeUnmount(() => stopAuto());
</script>

<template>
  <section class="noya-m-swiper" aria-label="活動 Banner">
    <div class="noya-m-swiper__viewport">
      <div class="noya-m-swiper__track" :style="trackStyle">
        <article
          v-for="s in slides"
          :key="s.key"
          class="noya-m-swiper__slide"
          :style="{ background: s.gradient }"
        >
          <div class="noya-m-swiper__copy">
            <h3 class="noya-m-swiper__title">{{ s.title }}</h3>
            <p class="noya-m-swiper__sub">{{ s.sub }}</p>
          </div>
          <div class="noya-m-swiper__avatar" aria-hidden="true">
            <AvatarSilhouette :seed="s.seed" variant="vivid" />
          </div>
        </article>
      </div>
    </div>

    <!-- 分頁圓點 -->
    <div class="noya-m-swiper__dots">
      <button
        v-for="(s, i) in slides"
        :key="s.key"
        type="button"
        class="noya-m-swiper__dot"
        :class="{ 'noya-m-swiper__dot--on': activeIdx === i }"
        :aria-label="`第 ${i + 1} 張 banner`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-m-swiper {
  background: var(--bg-base);
  padding: 12px 0 8px;
  position: relative;

  &__viewport {
    // kingdom DNA：圖片容器 --radius-xl + shadow-lg 主色光暈
    overflow: hidden;
    margin: 0 16px;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
  }

  &__track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  &__slide {
    flex: 0 0 100%;
    min-height: 160px;
    position: relative;
    padding: 22px 18px;
    display: flex;
    align-items: center;
    color: #ffffff;
    overflow: hidden;
  }

  &__copy {
    flex: 1;
    max-width: 60%;
    z-index: 2;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 6px;
    letter-spacing: 1px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  }

  &__sub {
    font-size: 12px;
    line-height: 1.5;
    opacity: 0.95;
    margin: 0;
  }

  &__avatar {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 110px;
    height: 130%;
    z-index: 1;

    :deep(.avatar-silhouette) {
      width: 100%;
      height: 100%;
      border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
      opacity: 0.9;
    }
  }

  &__dots {
    // kingdom DNA #12：swiper-pagination 圓點走 --radius-circle + 白色配色
    // 對齊 kingdom_front banner.vue 內 swiper-pagination 慣例：
    //   .swiper-pagination-bullet         { background: rgba(255,255,255,0.9); }
    //   .swiper-pagination-bullet-active  { background: $global-white; }
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 8px;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: var(--radius-circle);
    border: none;

    // kingdom DNA：未選中為半透明白（rgba 0.55），對應原 .swiper-pagination-bullet
    // 比 rgba(255,255,255,0.9) 略低是因為 mobile 的圓點放在 banner 下方淺底，
    // 不像 banner 內部需要強對比；保持低 alpha 才不會搶視覺
    background: rgba(255, 255, 255, 0.55);

    // 在淺底環境用 box-shadow 細邊增加可見性（kingdom banner 底層暗、不需要陰影；
    // demo mobile 底層淺，加細陰影避免圓點 wash out）
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all var(--transition-base);

    &--on {
      // kingdom DNA：active dot 為純白並拉成短條（保留原 demo 的「拉長條」高亮樣式）
      // 走 #ffffff 對齊 kingdom .swiper-pagination-bullet-active
      width: 18px;
      border-radius: 3px;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
