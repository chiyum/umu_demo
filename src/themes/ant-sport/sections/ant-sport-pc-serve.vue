<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import indexserveTitle from "@/themes/ant-sport/assets/pc/indexserve-title.png?url";
import iconWallet from "@/themes/ant-sport/assets/pc/icon-wallet.png?url";
import iconBall from "@/themes/ant-sport/assets/pc/icon-ball.png?url";
import iconSafety from "@/themes/ant-sport/assets/pc/icon-safety.png?url";
import iconDevice from "@/themes/ant-sport/assets/pc/icon-device.png?url";
// 三張底圖對齊原 lilian_ant_pc main.scss 第 5447 / 5479 / 5551 行的用法：
// - indexserve-bg.png：4 個服務特色卡（type-item）的卡片底，原圖是淡灰白柔光長條卡
//   只在 SCSS 中以 background-image url() 引用，故不在 script 內 import
// - indexserve-count-bg.png：4 個計數卡（stat-item）的儀錶板半開圓刻度裝飾
// - indexserve-count.png：計數卡內疊在數字上方的藍色弧線圓圈裝飾
// 任務描述把 indexserve-bg.png 寫成「整個 section 大背景」，但實圖只有 1170×210 的卡片底，
// 拉滿整區會 tile / 拉伸破版；故對齊原版用法（卡片底），整區仍走 var(--bg-base) 維持三色適配
import indexserveCountBg from "@/themes/ant-sport/assets/pc/indexserve-count-bg.png?url";
import indexserveCount from "@/themes/ant-sport/assets/pc/indexserve-count.png?url";
import AntSportCounter from "../atoms/ant-sport-counter.vue";

/**
 * ant-sport PC indexServe 區
 *
 * 對齊 lilian_ant_pc main.vue 第 256-521 行 `.indexServe`：
 * - 上：頂部標題圖
 * - 中：4 個數字計數（CURRENT SPEED / TOTALLY AMOUNT × 2 組）
 *   - 原 repo 用 vue3-autocounter 套件，這裡用自寫 ant-sport-counter atom
 *   - 觸發時機：IntersectionObserver 偵測進入 viewport 才啟動，
 *     對齊原 repo「scrollY + innerHeight > offsetTop + offsetHeight 才 start」
 * - 下：4 種服務特色 icon + 文案
 *
 * 為何用 IntersectionObserver 而非 scroll listener：
 * - 原 repo 走 scroll listener + getOffsetTop 是 vue2/vue3 早期慣用法，
 *   IntersectionObserver 是更高效的瀏覽器 native API，省 CPU 不每 scroll 觸發
 * - 同樣達成「滾到才跑」效果，且元件 unmount 自動 cleanup
 */

interface ServeStat {
  key: string;
  /** 終點數字（demo 沿用原 repo 60 / 80 / 90 / 26） */
  end: number;
  /** 上方英文小標 */
  caption: string;
  /** 數字下方單位 */
  unit: string;
  /** 整段主標題（在數字下方） */
  title: string;
  /** 副標（英文） */
  subtitle: string;
}

interface ServeType {
  key: string;
  icon: string;
  title: string;
  desc: string;
}

const stats: ServeStat[] = [
  {
    key: "deposit-time",
    end: 60,
    caption: "CURRENT SPEED",
    unit: "秒",
    title: "存款入帳時間",
    subtitle: "AVERAGE TIME OF DEPOSIT"
  },
  {
    key: "deposit-firm",
    end: 80,
    caption: "TOTALLY AMOUNT",
    unit: "+",
    title: "支付平台合作",
    subtitle: "PAYMENT PLATFORM PARTNERS"
  },
  {
    key: "withdraw-time",
    end: 90,
    caption: "CURRENT SPEED",
    unit: "秒",
    title: "提款出款時間",
    subtitle: "AVERAGE TIME OF WITHDRAW"
  },
  {
    key: "cooperate-firm",
    end: 26,
    caption: "TOTALLY AMOUNT",
    unit: "+",
    title: "遊戲廠商合作",
    subtitle: "GAMING PROVIDER PARTNERS"
  }
];

const types: ServeType[] = [
  {
    key: "trade",
    icon: iconWallet,
    title: "交易安全",
    desc: "多層加密保護資金流轉，存提款穩定快速"
  },
  {
    key: "games",
    icon: iconBall,
    title: "海量遊戲",
    desc: "對接全球頂尖廠商，遊戲品類豐富多元"
  },
  {
    key: "safety",
    icon: iconSafety,
    title: "個資保密",
    desc: "嚴格遵循國際隱私規範，個資絕不外洩"
  },
  {
    key: "device",
    icon: iconDevice,
    title: "多端支援",
    desc: "PC / H5 / Android / iOS 全平台無縫接力"
  }
];

/**
 * 是否該跑數字計數動畫
 *
 * 用 IntersectionObserver 偵測 stats section 進入可視區
 * 進入後設 true 觸發 AntSportCounter 啟動
 */
const runCounter = ref(false);
const statsRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!statsRef.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          runCounter.value = true;
        } else {
          // 離開可視區時 reset，下次再進可重播（對齊原 repo 行為）
          runCounter.value = false;
        }
      }
    },
    // 30% 進入就算觸發，避免使用者剛滑到頂端就被忽略
    { threshold: 0.3 }
  );
  observer.observe(statsRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section class="ant-sport-pc-serve" aria-label="優質服務">
    <div class="ant-sport-pc-serve__inner">
      <div class="ant-sport-pc-serve__title">
        <img
          :src="indexserveTitle"
          alt="優質服務"
          class="ant-sport-pc-serve__title-img"
        />
      </div>

      <!-- 上半：4 個數字 -->
      <ul ref="statsRef" class="ant-sport-pc-serve__stats" role="list">
        <li
          v-for="s in stats"
          :key="s.key"
          class="ant-sport-pc-serve__stat-item"
        >
          <!--
            計數卡內疊圖層：底（半開圓刻度）+ 弧線圓圈裝飾
            aria-hidden 因為純裝飾、無語意；用兩張 img 不用 background 是為了
            midnight 主題可直接套 filter 反白（CSS background-image 套 filter 會連文字一起變色）
          -->
          <div class="ant-sport-pc-serve__stat-deco" aria-hidden="true">
            <img
              :src="indexserveCountBg"
              alt=""
              class="ant-sport-pc-serve__stat-deco-img ant-sport-pc-serve__stat-deco-img--gauge"
            />
            <img
              :src="indexserveCount"
              alt=""
              class="ant-sport-pc-serve__stat-deco-img ant-sport-pc-serve__stat-deco-img--arc"
            />
          </div>
          <div class="ant-sport-pc-serve__stat-counter">
            <p class="ant-sport-pc-serve__stat-caption">{{ s.caption }}</p>
            <p class="ant-sport-pc-serve__stat-num">
              <AntSportCounter :end-amount="s.end" :run="runCounter" />
            </p>
            <p class="ant-sport-pc-serve__stat-unit">{{ s.unit }}</p>
          </div>
          <p class="ant-sport-pc-serve__stat-title">{{ s.title }}</p>
          <p class="ant-sport-pc-serve__stat-subtitle">{{ s.subtitle }}</p>
        </li>
      </ul>

      <!-- 下半：4 種特色 -->
      <ul class="ant-sport-pc-serve__types" role="list">
        <li
          v-for="t in types"
          :key="t.key"
          class="ant-sport-pc-serve__type-item"
        >
          <div class="ant-sport-pc-serve__type-icon">
            <img
              :src="t.icon"
              :alt="`${t.title} 圖示`"
              class="ant-sport-pc-serve__type-img"
            />
          </div>
          <div class="ant-sport-pc-serve__type-info">
            <p class="ant-sport-pc-serve__type-title">{{ t.title }}</p>
            <p class="ant-sport-pc-serve__type-desc">{{ t.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ant-sport-pc-serve {
  background: var(--bg-base);
  padding: 80px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__title {
    text-align: center;
    margin-bottom: 36px;
  }

  &__title-img {
    height: 60px;
    width: auto;
    object-fit: contain;
  }

  &__stats {
    margin: 0 0 60px;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }

  &__stat-item {
    position: relative;
    text-align: center;
    background: var(--bg-surface);
    border-radius: 16px;
    padding: 28px 20px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  // 計數卡裝飾層：絕對定位疊在卡內，置中對齊數字位置
  // 為何用 absolute 而非 background：兩張圖各自需要不同的尺寸 / 位移 / 透明度，
  // 用 img 比 multiple background 更可控（也方便 midnight 套 filter）
  &__stat-deco {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 140px;
    pointer-events: none;
    z-index: 0;
  }

  &__stat-deco-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: var(--ant-sport-serve-deco-opacity, 0.85);
    filter: var(--ant-sport-serve-deco-filter, none);
  }

  &__stat-deco-img--arc {
    // 弧線圓圈：相對於 gauge 半開圓刻度往內縮並上移，讓兩層裝飾錯落
    inset: 18px 36px auto;
    width: auto;
    height: auto;
    bottom: 22px;
    opacity: var(--ant-sport-serve-deco-arc-opacity, 0.9);
  }

  &__stat-counter {
    position: relative;
    z-index: 1;
    margin-bottom: 14px;
  }

  &__stat-caption {
    margin: 0 0 4px;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1.5px;
  }

  &__stat-num {
    margin: 0;
    font-size: 56px;
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1;
    font-family: var(--font-display);
  }

  &__stat-unit {
    margin: 4px 0 0;
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
  }

  &__stat-title {
    position: relative;
    z-index: 1;
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  &__stat-subtitle {
    position: relative;
    z-index: 1;
    margin: 4px 0 0;
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &__types {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  // 服務特色卡：對齊原 lilian_ant_pc main.scss 第 5543 行 .indexServe-type-item，
  // 用 indexServe-bg.png 當卡片底（淡灰白柔光長條）。三色 variant 中：
  // - blue / red 底色淺，圖片本身可直接看到
  // - midnight 深底會吃掉淡圖；走 token 控制 brightness / opacity（見 _variants.scss）
  &__type-item {
    background-color: var(--bg-surface);
    background-image: var(
      --ant-sport-serve-type-bg,
      url("@/themes/ant-sport/assets/pc/indexserve-bg.png")
    );
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: var(--ant-sport-serve-type-blend, normal);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    transition: all 0.18s ease;
    filter: var(--ant-sport-serve-type-filter, none);

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-primary);
    }
  }

  &__type-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__type-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__type-info {
    flex: 1;
    min-width: 0;
  }

  &__type-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
  }

  &__type-desc {
    margin: 4px 0 0;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
  }
}
</style>
