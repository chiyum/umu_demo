<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import TycoonCounter from "../atoms/tycoon-counter.vue";

/**
 * tycoon PC 服務特色區（4 計數卡 + 4 特色卡）
 *
 * 對齊 ant-sport-pc-serve 範式，但簡化兩處：
 * 1. 圓盤裝飾：ant-sport 借兩張 PNG 圖（gauge + arc）疊圖；
 *    tycoon 沒有對應圖檔，改純 CSS 畫圓盤（conic-gradient + radial-gradient）
 *    → 任務描述指定「圓盤改藍冰漸層」
 * 2. 特色卡背景：ant-sport 用 indexserve-bg.png；
 *    tycoon 改純漸層底（藍冰 surface → ice-1）+ 卡片白邊
 */

interface ServeStat {
  key: string;
  end: number;
  caption: string;
  unit: string;
  title: string;
  subtitle: string;
}

interface ServeType {
  key: string;
  title: string;
  desc: string;
  /** SVG path d 字串（inline 用，monochrome 圖示） */
  iconPath: string;
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

// 4 個特色 icon 用 inline SVG（與 mobile 風格一致，monochrome currentColor）
// path 來源：常見金鋼鎖頭 / 體育球 / 證件 / 多裝置
const types: ServeType[] = [
  {
    key: "trade",
    title: "交易安全",
    desc: "多層加密保護資金流轉，存提款穩定快速",
    iconPath:
      "M12 1 4 5v6c0 5.5 3.84 10.74 8 12 4.16-1.26 8-6.5 8-12V5l-8-4zm0 11h6c-.46 4.05-2.99 7.65-6 8.91V12H6V6.39l6-2.7v8.31z"
  },
  {
    key: "games",
    title: "海量遊戲",
    desc: "對接全球頂尖廠商，遊戲品類豐富多元",
    iconPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 14c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08C16.71 18.72 14.5 20 12 20z"
  },
  {
    key: "safety",
    title: "個資保密",
    desc: "嚴格遵循國際隱私規範，個資絕不外洩",
    iconPath:
      "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9a2 2 0 0 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
  },
  {
    key: "device",
    title: "多端支援",
    desc: "PC / H5 / Android / iOS 全平台無縫接力",
    iconPath:
      "M21 16V4H3v12h18zm0 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm-7 4v-2H4v2h10zm6 0v-2h-4v2h4z"
  }
];

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
          runCounter.value = false;
        }
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(statsRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section class="tycoon-pc-serve" aria-label="優質服務">
    <div class="tycoon-pc-serve__inner">
      <header class="tycoon-pc-serve__header">
        <h2 class="tycoon-pc-serve__title">優質服務</h2>
        <p class="tycoon-pc-serve__subtitle">藍冰大亨給您 24 小時專業守護</p>
      </header>

      <!-- 4 個計數卡 -->
      <ul ref="statsRef" class="tycoon-pc-serve__stats" role="list">
        <li v-for="s in stats" :key="s.key" class="tycoon-pc-serve__stat-item">
          <!--
            圓盤裝飾：純 CSS 畫
            - 外圈 conic-gradient 半開圓刻度（240° 主色 + 120° 透明）
            - 內圈 radial 漸層白冰
            - 中央放計數文字
            這比 ant-sport 借 2 張 PNG 更輕量、跟 variant 切色自動同步
          -->
          <div class="tycoon-pc-serve__stat-disc" aria-hidden="true">
            <div class="tycoon-pc-serve__stat-disc-outer" />
            <div class="tycoon-pc-serve__stat-disc-inner" />
            <div class="tycoon-pc-serve__stat-counter">
              <p class="tycoon-pc-serve__stat-caption">{{ s.caption }}</p>
              <p class="tycoon-pc-serve__stat-num">
                <TycoonCounter :end-amount="s.end" :run="runCounter" />
              </p>
              <p class="tycoon-pc-serve__stat-unit">{{ s.unit }}</p>
            </div>
          </div>
          <p class="tycoon-pc-serve__stat-title">{{ s.title }}</p>
          <p class="tycoon-pc-serve__stat-subtitle">{{ s.subtitle }}</p>
        </li>
      </ul>

      <!-- 4 個特色卡 -->
      <ul class="tycoon-pc-serve__types" role="list">
        <li v-for="t in types" :key="t.key" class="tycoon-pc-serve__type-item">
          <div class="tycoon-pc-serve__type-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path fill="currentColor" :d="t.iconPath" />
            </svg>
          </div>
          <div class="tycoon-pc-serve__type-info">
            <p class="tycoon-pc-serve__type-title">{{ t.title }}</p>
            <p class="tycoon-pc-serve__type-desc">{{ t.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tycoon-pc-serve {
  background: var(--bg-base);
  padding: 80px 0;

  &__inner {
    position: relative;
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;
  }

  &__title {
    margin: 0;
    font-size: 38px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 2px;
    font-family: var(--font-display);
  }

  &__subtitle {
    margin: 8px 0 0;
    font-size: 15px;
    color: var(--text-muted);
    letter-spacing: 1px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  // 圓盤容器（180×180）
  &__stat-disc {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto;
    pointer-events: none;
  }

  // 外圈：藍冰 conic-gradient 半開圓
  // 從 -120° 開始順時鐘畫 240° 主色 + 120° 透明 = 模擬「儀錶半開圓刻度」
  &__stat-disc-outer {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from -120deg,
      var(--primary-04) 0deg,
      var(--primary-01) 120deg,
      var(--primary-07) 240deg,
      transparent 240deg,
      transparent 360deg
    );

    // mask 讓中間挖空成環狀
    mask: radial-gradient(
      circle at center,
      transparent 55%,
      #000000 56%,
      #000000 100%
    );
    filter: drop-shadow(0 0 12px var(--tycoon-card-glow));
  }

  // 內圈：白冰 radial 漸層底
  &__stat-disc-inner {
    position: absolute;
    inset: 18px;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      var(--bg-surface) 0%,
      var(--tycoon-ice-1) 60%,
      var(--tycoon-ice-2) 100%
    );
    box-shadow:
      inset 0 4px 12px rgba(31, 127, 240, 0.12),
      inset 0 -2px 6px rgba(255, 255, 255, 0.9);
  }

  &__stat-counter {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__stat-caption {
    margin: 0 0 4px;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1.5px;
    line-height: 1;
  }

  &__stat-num {
    margin: 0;
    font-size: 52px;
    color: var(--color-primary);
    line-height: 1;
  }

  &__stat-unit {
    margin: 4px 0 0;
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
    line-height: 1;
  }

  &__stat-title {
    margin: 24px 0 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  &__stat-subtitle {
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

  // 特色卡：純漸層底（無底圖），藍冰白邊 + 卡片陰影
  &__type-item {
    position: relative;
    min-height: 120px;
    background: linear-gradient(
      180deg,
      var(--bg-surface) 0%,
      var(--tycoon-ice-1) 100%
    );
    border-radius: 14px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 18px;
    box-shadow:
      0 12px 24px -8px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    transition: all 0.18s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow:
        0 16px 28px -8px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.36),
        inset 0 0 0 1.5px #ffffff;
    }
  }

  &__type-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    color: var(--color-primary);
    background: var(--tycoon-ice-1);
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }

  &__type-icon svg {
    width: 100%;
    height: 100%;
  }

  &__type-info {
    flex: 1;
    min-width: 0;
  }

  &__type-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 25px;
  }

  &__type-desc {
    margin: 6px 0 0;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 22px;
  }
}
</style>
