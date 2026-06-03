<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import indexserveTitle from "@/themes/ant-sport/assets/pc/indexserve-title.png?url";
import iconWallet from "@/themes/ant-sport/assets/pc/icon-wallet.png?url";
import iconBall from "@/themes/ant-sport/assets/pc/icon-ball.png?url";
import iconSafety from "@/themes/ant-sport/assets/pc/icon-safety.png?url";
import iconDevice from "@/themes/ant-sport/assets/pc/icon-device.png?url";
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
    text-align: center;
    background: var(--bg-surface);
    border-radius: 16px;
    padding: 28px 20px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border);
  }

  &__stat-counter {
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
    margin: 0;
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

  &__type-item {
    background: var(--bg-surface);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    transition: all 0.18s ease;

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
