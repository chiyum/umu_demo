<script setup lang="ts">
import { ref } from "vue";
import indexappTitle from "@/themes/ant-sport/assets/pc/indexapp-title.png?url";
import indexappImg1 from "@/themes/ant-sport/assets/pc/indexapp-img-1.png?url";
import indexappImg2 from "@/themes/ant-sport/assets/pc/indexapp-img-2.png?url";
import indexappImg3 from "@/themes/ant-sport/assets/pc/indexapp-img-3.png?url";
import qrSample from "@/themes/ant-sport/assets/pc/qrcode-sample.png?url";
// QR 旁的「掃描」小螞蟻 icon：對齊原 lilian_ant_pc 同一張資產位於 .scanTitle 前方的視覺
import qrcodeIcon from "@/themes/ant-sport/assets/pc/qrcode-icon.png?url";

/**
 * ant-sport PC indexAPP 區
 *
 * 對齊 lilian_ant_pc main.vue 第 39-144 行 `.indexAPP`：
 * - 上：頂部標題圖
 * - 左：phone mockup 圖（依當前 tab 切換）
 * - 右：tabs（H5 / 安卓 APP / iOS）+ 介紹文字 + QR code + 連結
 *
 * 簡化處：
 * - 原 repo QR 用 qrcode-vue3 動態生成，demo 直接用 QRCode-all.png 靜態圖
 * - tabs 切換用 ref index，圖片淡入動畫保留
 */

interface AppTab {
  key: string;
  name: string;
  title: string;
  desc: string;
  leftImg: string;
  scanTitle1: string;
  scanTitle2: string;
  url: string;
}

const tabs: AppTab[] = [
  {
    key: "h5",
    name: "H5",
    title: "輕量網頁版",
    desc: "免下載，掃描 QR 立即開啟手機網頁版，支援所有手機平台",
    leftImg: indexappImg1,
    scanTitle1: "掃描以下二維碼",
    scanTitle2: "前往手機網頁版",
    url: "https://m.ant-sport-demo.com"
  },
  {
    key: "android",
    name: "安卓 APP",
    title: "Android 原生版",
    desc: "支援 Android 5.0 以上系統，遊戲流暢，登入更便利",
    leftImg: indexappImg2,
    scanTitle1: "掃描以下二維碼",
    scanTitle2: "下載 Android APP",
    url: "https://app.ant-sport-demo.com/android"
  },
  {
    key: "ios",
    name: "iOS APP",
    title: "iOS 原生版",
    desc: "支援 iOS 13 以上系統，與 App Store 商店體驗一致",
    leftImg: indexappImg3,
    scanTitle1: "掃描以下二維碼",
    scanTitle2: "下載 iOS APP",
    url: "https://app.ant-sport-demo.com/ios"
  }
];

/** 當前 active tab index */
const activeTab = ref(0);
</script>

<template>
  <section class="ant-sport-pc-app" aria-label="App 下載區">
    <div class="ant-sport-pc-app__inner">
      <div class="ant-sport-pc-app__title">
        <img
          :src="indexappTitle"
          alt="APP 下載"
          class="ant-sport-pc-app__title-img"
        />
      </div>

      <div class="ant-sport-pc-app__content">
        <!-- 左：phone mockup（依當前 tab 切換圖） -->
        <div class="ant-sport-pc-app__left">
          <div
            v-for="(t, i) in tabs"
            :key="t.key"
            class="ant-sport-pc-app__frame"
            :class="{ 'ant-sport-pc-app__frame--active': i === activeTab }"
          >
            <img
              :src="t.leftImg"
              :alt="`${t.name} mockup`"
              class="ant-sport-pc-app__frame-img"
              loading="lazy"
            />
          </div>
        </div>

        <!-- 右：tabs + 內容 + QR -->
        <div class="ant-sport-pc-app__right">
          <ul class="ant-sport-pc-app__tabs" role="tablist">
            <li
              v-for="(t, i) in tabs"
              :key="t.key"
              role="tab"
              :aria-selected="i === activeTab"
              class="ant-sport-pc-app__tab"
              :class="{ 'ant-sport-pc-app__tab--active': i === activeTab }"
              @click="activeTab = i"
            >
              <span>{{ t.name }}</span>
            </li>
          </ul>

          <template v-for="(t, i) in tabs" :key="t.key">
            <div
              v-show="i === activeTab"
              class="ant-sport-pc-app__panel"
              role="tabpanel"
            >
              <div class="ant-sport-pc-app__info">
                <h3 class="ant-sport-pc-app__name">{{ t.title }}</h3>
                <p class="ant-sport-pc-app__desc">{{ t.desc }}</p>
              </div>

              <div class="ant-sport-pc-app__access">
                <div class="ant-sport-pc-app__access-box">
                  <div class="ant-sport-pc-app__qr">
                    <img
                      :src="qrSample"
                      alt="QR Code 示意圖"
                      class="ant-sport-pc-app__qr-img"
                    />
                  </div>
                  <p class="ant-sport-pc-app__access-title">
                    <!-- 「掃描以下二維碼」前的小螞蟻 icon，純裝飾 aria-hidden -->
                    <img
                      :src="qrcodeIcon"
                      alt=""
                      class="ant-sport-pc-app__scan-icon"
                      aria-hidden="true"
                    />
                    {{ t.scanTitle1 }}
                  </p>
                  <p class="ant-sport-pc-app__access-subtitle">
                    {{ t.scanTitle2 }}
                  </p>
                </div>

                <div class="ant-sport-pc-app__access-box">
                  <div class="ant-sport-pc-app__link">
                    <a :href="t.url" class="ant-sport-pc-app__link-text">
                      {{ t.url }}
                    </a>
                  </div>
                  <p class="ant-sport-pc-app__access-title">點擊以下連結</p>
                  <p class="ant-sport-pc-app__access-subtitle">直接前往</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ant-sport-pc-app {
  background: var(--bg-base);
  padding: 60px 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__title {
    text-align: center;
    margin-bottom: 32px;
  }

  &__title-img {
    height: 60px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  &__content {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 40px;
    align-items: center;
    background: var(--bg-surface);
    padding: 36px;
    border-radius: 16px;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border);
  }

  &__left {
    position: relative;
    aspect-ratio: 9 / 16;
    max-height: 420px;
    margin: 0 auto;
    width: 100%;
    max-width: 240px;
  }

  &__frame {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;

    &--active {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__frame-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__tabs {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 8px;
    border-bottom: 2px solid var(--border);
  }

  &__tab {
    padding: 10px 22px;
    cursor: pointer;
    font-size: 15px;
    color: var(--text-muted);
    font-weight: 600;
    position: relative;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary);
    }

    &--active {
      color: var(--color-primary);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        height: 3px;
        background: var(--color-primary);
        border-radius: 2px;
      }
    }
  }

  &__panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: ant-sport-pc-app-fade 0.4s ease;
  }

  &__name {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
  }

  &__desc {
    margin: 8px 0 0;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }

  &__access {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  &__access-box {
    background: var(--provider-card-bg);
    padding: 18px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid var(--border);
  }

  &__qr {
    width: 130px;
    height: 130px;
    margin: 0 auto 12px;
    background: var(--bg-surface);
    border-radius: 8px;
    padding: 8px;
    box-shadow: var(--shadow-sm);
  }

  &__qr-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__link {
    margin-bottom: 12px;
    padding: 12px;
    background: var(--bg-surface);
    border-radius: 8px;
    min-height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__link-text {
    color: var(--color-primary);
    font-size: 13px;
    font-weight: 600;
    word-break: break-all;
    text-decoration: none;
  }

  &__access-title {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
  }

  // 掃描小螞蟻 icon：在「掃描以下二維碼」文字前
  // vertical-align 用 inline-flex gap 控制；尺寸小到不影響行高
  &__scan-icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__access-subtitle {
    margin: 4px 0 0;
    font-size: 12px;
    color: var(--text-muted);
  }
}

@keyframes ant-sport-pc-app-fade {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
