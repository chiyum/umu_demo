<script setup lang="ts">
// VIP 11 等級徽章（0~10）：根據 URL ?vip=N 切換，預設 5
// 全部 import 進來而非動態 import，因為：
// (1) 單張平均 ~5KB，11 張共 ~55KB，比動態 import 額外 chunk 開銷低
// (2) 切換時零延遲（demo 站體驗優先）
// (3) Vite 會把每張轉成獨立 asset hash URL，瀏覽器可獨立快取
import vipLevel0 from "@/themes/ant-sport/assets/vip/level-0.webp?url";
import vipLevel1 from "@/themes/ant-sport/assets/vip/level-1.webp?url";
import vipLevel2 from "@/themes/ant-sport/assets/vip/level-2.webp?url";
import vipLevel3 from "@/themes/ant-sport/assets/vip/level-3.webp?url";
import vipLevel4 from "@/themes/ant-sport/assets/vip/level-4.webp?url";
import vipLevel5 from "@/themes/ant-sport/assets/vip/level-5.webp?url";
import vipLevel6 from "@/themes/ant-sport/assets/vip/level-6.webp?url";
import vipLevel7 from "@/themes/ant-sport/assets/vip/level-7.webp?url";
import vipLevel8 from "@/themes/ant-sport/assets/vip/level-8.webp?url";
import vipLevel9 from "@/themes/ant-sport/assets/vip/level-9.webp?url";
import vipLevel10 from "@/themes/ant-sport/assets/vip/level-10.webp?url";
import refreshIcon from "@/themes/ant-sport/assets/user-action/refresh.webp?url";
import infoIcon from "@/themes/ant-sport/assets/user-action/info.webp?url";
import depositIcon from "@/themes/ant-sport/assets/user-action/deposit.webp?url";
import withdrawIcon from "@/themes/ant-sport/assets/user-action/withdraw.webp?url";
import feedbackIcon from "@/themes/ant-sport/assets/user-action/feedback.svg?url";
import promoteIcon from "@/themes/ant-sport/assets/user-action/promote.webp?url";
// 對齊 lilian_ant_web/src/assets/scss/home.scss 的 .user__icon.money 用法：
// 原 home.vue 第 31 行 .money 區塊註解掉了文字 "$"，但 SCSS 仍指定
// background-image: url(.../icon_rmb.webp)，代表 原版 是用圖示而非純文字符號
import currencyIcon from "@/themes/ant-sport/assets/user-action/currency.webp?url";
// 紅包浮窗：對齊 lilian_ant_web home/icon_redEnvelope_pop_tiger.195dfd7a.png
// 原 repo 為「跑酷型」紅包浮窗按鈕（在 mobile 右下角），demo 沿用此 UI 慣例
import redEnvelopeIcon from "@/themes/ant-sport/assets/user-action/red-envelope.png?url";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

/**
 * ant-sport mobile 會員資訊卡
 *
 * 對齊 lilian_ant_web home.vue 第 18-72 行 `.home__user__action`：
 * - 上半：帳號 + VIP 徽章 + 餘額 + 重整 / info 兩個小 icon
 * - 下半：4 個快捷功能（反水 / 存款 / 提款 / 推廣）
 *
 * Demo 純展示，account 寫死、credit 寫死；
 * 重整 icon 點擊時觸發旋轉動畫示意 refresh
 */

/**
 * VIP 等級對應表：以 URL ?vip=N 切換顯示徽章
 *
 * 為何用陣列 index 而非 Record<number, string>：
 * - 等級連續 0~10，陣列查找 O(1) 且型別最簡
 * - 容錯：超出範圍 / 非數字 → fallback level 5（demo 預設）
 */
const VIP_MEDALS = [
  vipLevel0,
  vipLevel1,
  vipLevel2,
  vipLevel3,
  vipLevel4,
  vipLevel5,
  vipLevel6,
  vipLevel7,
  vipLevel8,
  vipLevel9,
  vipLevel10
] as const;

const DEFAULT_VIP_LEVEL = 5;

const route = useRoute();

/**
 * 解析 URL ?vip=N 並夾在合法區間 0~10
 *
 * 為什麼用 computed：route.query 是 reactive，使用者按瀏覽器網址列改 ?vip=
 * 或 demo 站內透過 router push 切換時自動跟動
 */
const vipMedal = computed(() => {
  const raw = route.query.vip;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 10) {
    return VIP_MEDALS[Math.floor(parsed)];
  }
  return VIP_MEDALS[DEFAULT_VIP_LEVEL];
});

/** 重整動畫 flag */
const refreshFlag = ref(false);

function handleRefresh() {
  refreshFlag.value = true;
  // 模擬 API 1 秒回應
  setTimeout(() => (refreshFlag.value = false), 1000);
}

interface ActionItem {
  key: string;
  icon: string;
  label: string;
}

const actions: ActionItem[] = [
  { key: "feedback", icon: feedbackIcon, label: "反水" },
  { key: "deposit", icon: depositIcon, label: "存款" },
  { key: "withdraw", icon: withdrawIcon, label: "提款" },
  { key: "promote", icon: promoteIcon, label: "推廣" }
];

/**
 * 紅包浮窗按鈕：對應 lilian_ant 原站「跑酷紅包」UI
 *
 * 視覺上是右下方浮窗按鈕（floating action），demo 點擊純 Notify 提示
 * 為何放這個元件而不另開 section：紅包浮窗是「跟著會員區走」的入口，
 * 邏輯依附於登入狀態（demo 內固定可見），與 user-card 同檔較內聚
 */
const $q = useQuasar();
function handleRedEnvelope() {
  $q.notify({
    message: "Demo 環境：紅包活動僅展示版面",
    color: "primary",
    position: "top",
    timeout: 1500
  });
}
</script>

<template>
  <section class="ant-sport-m-user" aria-label="會員資訊">
    <!-- 上半：帳號 / VIP / 餘額 -->
    <div class="ant-sport-m-user__data">
      <div class="ant-sport-m-user__account-row">
        <span class="ant-sport-m-user__account">demo_user</span>
        <span class="ant-sport-m-user__vip" aria-label="VIP 等級 5">
          <img :src="vipMedal" alt="" class="ant-sport-m-user__vip-img" />
        </span>
      </div>
      <div class="ant-sport-m-user__credit-row">
        <!-- 對齊原站：用 icon_rmb.webp 圖示而非純文字 ¥ -->
        <span class="ant-sport-m-user__currency" aria-label="人民幣">
          <img
            :src="currencyIcon"
            alt=""
            class="ant-sport-m-user__currency-img"
          />
        </span>
        <span class="ant-sport-m-user__credit">8,888</span>
        <button
          type="button"
          class="ant-sport-m-user__icon-btn"
          :class="{ 'ant-sport-m-user__icon-btn--turn': refreshFlag }"
          aria-label="重整餘額"
          @click="handleRefresh"
        >
          <img :src="refreshIcon" alt="" class="ant-sport-m-user__icon-img" />
        </button>
        <button
          type="button"
          class="ant-sport-m-user__icon-btn"
          aria-label="餘額說明"
        >
          <img :src="infoIcon" alt="" class="ant-sport-m-user__icon-img" />
        </button>
      </div>
    </div>

    <!-- 下半：4 個快捷功能 -->
    <ul class="ant-sport-m-user__actions" role="list">
      <li
        v-for="a in actions"
        :key="a.key"
        class="ant-sport-m-user__action-item"
      >
        <div class="ant-sport-m-user__action-icon">
          <img
            :src="a.icon"
            :alt="`${a.label} 圖示`"
            class="ant-sport-m-user__action-img"
          />
        </div>
        <span class="ant-sport-m-user__action-label">{{ a.label }}</span>
      </li>
    </ul>

    <!--
      紅包浮窗按鈕：對應 lilian_ant 原站「跑酷紅包」UI
      用 fixed 定位掛在 viewport 右側中下方，避開底部 tab bar；
      bottom 給足 80px = 56 (tab bar) + 24 (safe gap)
      aria-label 給可讀性、demo 點擊只跳 Notify
    -->
    <button
      type="button"
      class="ant-sport-m-user__envelope"
      aria-label="紅包活動入口"
      @click="handleRedEnvelope"
    >
      <img
        :src="redEnvelopeIcon"
        alt=""
        class="ant-sport-m-user__envelope-img"
      />
      <span class="ant-sport-m-user__envelope-pulse" aria-hidden="true" />
    </button>
  </section>
</template>

<style lang="scss" scoped>
// 對齊 lilian_ant_web .home__user__action padding: 0rem 0.2rem (~7px)
// - user__icon 0.6rem×0.62rem (~22×23px)
// - 整區由 user__data (40% 寬) + user__action (60% 寬) 組成
// demo 改卡片化 + 上下排列，比較適合手機 viewport，但 padding 內縮對齊原版手感
.ant-sport-m-user {
  margin: 6px 8px 12px;
  padding: 14px 12px;
  background: var(--bg-surface);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);

  &__data {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 12px;
    border-bottom: 1px dashed var(--border);
  }

  &__account-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__account {
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 500;
  }

  &__vip {
    width: 36px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__vip-img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }

  &__credit-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__currency {
    // 對齊原站 .user__icon.money 的尺寸（0.2rem 寬 / 0.42rem 高，約 12 / 25px）
    // 改用圖示後 font-size 失去意義，改成固定容器寬高
    width: 14px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__currency-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__credit {
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
  }

  &__icon-btn {
    width: 26px;
    height: 26px;
    border: none;
    background: transparent;
    padding: 3px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.18s ease;

    &:hover {
      background: var(--bg-overlay);
    }

    &--turn {
      animation: ant-sport-spin 1s linear infinite;
    }
  }

  &__icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__actions {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  &__action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  &__action-icon {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }

  &__action-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__action-label {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.2;
  }

  // 紅包浮窗按鈕：fixed 右下、避開 bottom tab bar
  // 為什麼 z-index 90 對齊 bottom-nav：同層級不互相蓋，因為紅包定位在 tab bar 上方
  &__envelope {
    position: fixed;
    right: 12px;
    bottom: 80px;
    z-index: 90;
    width: 60px;
    height: 60px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
    transition: transform 0.18s ease;

    &:hover {
      transform: scale(1.06);
    }

    &:active {
      transform: scale(0.94);
    }
  }

  &__envelope-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 2;

    // 輕微上下擺動，增加注目度（純展示，不消耗 CPU）
    animation: ant-sport-envelope-bob 2.4s ease-in-out infinite;
  }

  // 浮窗下方脈動光圈：用 absolute 圓形 box-shadow 模擬「正在發紅包」
  &__envelope-pulse {
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: var(--badge-live);
    opacity: 0.4;
    z-index: 1;
    animation: ant-sport-envelope-pulse 1.6s ease-out infinite;
  }
}

@keyframes ant-sport-envelope-bob {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes ant-sport-envelope-pulse {
  0% {
    transform: scale(0.85);
    opacity: 0.5;
  }

  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

@keyframes ant-sport-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
