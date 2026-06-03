<script setup lang="ts">
import vipMedal from "@/themes/ant-sport/assets/vip/level-5.webp";
import refreshIcon from "@/themes/ant-sport/assets/user-action/refresh.webp";
import infoIcon from "@/themes/ant-sport/assets/user-action/info.webp";
import depositIcon from "@/themes/ant-sport/assets/user-action/deposit.webp";
import withdrawIcon from "@/themes/ant-sport/assets/user-action/withdraw.webp";
import feedbackIcon from "@/themes/ant-sport/assets/user-action/feedback.svg";
import promoteIcon from "@/themes/ant-sport/assets/user-action/promote.webp";
import { ref } from "vue";

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
        <span class="ant-sport-m-user__currency">¥</span>
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
  </section>
</template>

<style lang="scss" scoped>
.ant-sport-m-user {
  margin: 8px 12px 12px;
  padding: 14px 16px;
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
    font-size: 16px;
    color: var(--color-primary);
    font-weight: 600;
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
