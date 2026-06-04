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
// PC indexAPP 區嚴格對齊原作 lilian_ant_pc main.scss 第 3629-3812 行：
// - .indexAPP 1200 寬 / margin auto
// - .indexAPP-titleImg 1200×110
// - .indexAPP-content margin-top: 32px, justify-content: space-between
// - .indexAPP-contentL（phone mockup 容器）879×620
// - .indexAPP-contentR 456×580, border-radius: 24px,
//   box-shadow: 0 20px 30px -10px var(--secondary-10), 漸層 / 落影模仿原 indexAPP-Bg.png
// - .indexAPP-item 96×40, border-radius: 30.6px (pill)
// - .indexAPP-title 40px 字體
// - .indexAPP-qrcode 168×168, border-radius: 12px
// - .indexAPP-link 168×168, primary 文字
.ant-sport-pc-app {
  background: var(--bg-base);
  padding: 60px 0;

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  // 對齊原版 .indexAPP-titleImg 1200×110，文字 / 圖示置中
  &__title {
    position: relative;
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title-img {
    height: 64px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  // 對齊 .indexAPP-content margin-top: 32px + space-between 左右拉開
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 32px;
    gap: 32px;
  }

  // 左：phone mockup
  // 對齊 .indexAPP-contentL display: flex, width: 779px (扣掉右邊 contentR 後剩餘空間)
  &__left {
    position: relative;
    width: 100%;
    max-width: 720px;
    flex: 1;
    aspect-ratio: 779 / 620;
  }

  &__frame {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.45s ease;
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

  // 右：tabs + QR + link
  // 對齊 .indexAPP-contentR 456×580 / border-radius: 24px / 落影
  &__right {
    flex-shrink: 0;
    width: 456px;
    min-height: 580px;
    border-radius: 24px;
    box-shadow: 0 20px 30px -10px var(--secondary-10);
    background: linear-gradient(
      180deg,
      var(--bg-surface) 0%,
      var(--highlight-strip) 100%
    );
    border: 1px solid var(--border);
    padding: 36px 24px 32px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  // 對齊 .indexAPP-tabs padding: 36px 18px 0 18px
  &__tabs {
    margin: 0 0 8px;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  // 對齊 .indexAPP-item 96×40 / radius 30.6px / 淡 chip 底
  // active: 漸層底 + 白字（對齊原版 .indexAPP-item-active）
  &__tab {
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-radius: 30.6px;
    text-align: center;
    color: var(--secondary-01);
    background: var(--highlight-strip);
    box-shadow: 0 4px 8px 0 var(--secondary-11);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    list-style: none;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.85;
    }

    &--active {
      color: var(--text-on-primary);
      background: var(--gradient-cta);
      box-shadow: 0 4px 8px 0 var(--secondary-12);

      &:hover {
        opacity: 1;
        filter: brightness(1.05);
      }
    }
  }

  &__panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    animation: ant-sport-pc-app-fade 0.4s ease;
  }

  &__info {
    color: var(--secondary-01);
  }

  // 對齊 .indexAPP-title 40px h3
  &__name {
    height: 40px;
    margin: 32px 0 0 16px;
    line-height: 40px;
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
  }

  // 對齊 .indexAPP-desciption width: 384px / line-height: 28px / font-size: 18px
  &__desc {
    width: 100%;
    max-width: 384px;
    min-height: 56px;
    margin: 12px 0 0 16px;
    line-height: 26px;
    font-size: 15px;
    color: var(--text-muted);
  }

  // 對齊 .indexAPP-access margin-top: 40px / padding: 0 40px
  &__access {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    padding: 0 16px;
    gap: 16px;
  }

  &__access-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--secondary-01);
  }

  // 對齊 .indexAPP-qrcode 168×168 / radius 12px / 2px 白邊 / 漸層
  &__qr {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 168px;
    border-radius: 12px;
    border: 2px solid var(--bg-surface);
    background-image: linear-gradient(
      180deg,
      var(--highlight-strip) 1%,
      var(--bg-base-deep)
    );
    padding: 18px;
  }

  &__qr-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  // 對齊 .indexAPP-link 168×168 / radius 12px / 漸層底 / 2px secondary-09 邊
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 168px;
    border-radius: 12px;
    background: linear-gradient(
      225.09deg,
      var(--secondary-09),
      var(--highlight-strip) 31.82%,
      var(--provider-card-bg) 63.9%,
      var(--highlight-strip) 97.47%
    );
    border: 2px solid var(--secondary-09);
    padding: 12px 18px;
  }

  // 對齊原版 a：display: inline-block / 28px 行高 / 底線 / primary-05 色
  &__link-text {
    display: inline-block;
    width: 100%;
    line-height: 24px;
    text-align: center;
    text-decoration: underline;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: var(--primary-05);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  // 對齊 .indexAPP-accessTitle margin-top: 10px / font-size: 18px / 25px line-height
  &__access-title {
    margin: 10px 0 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: var(--text-primary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
  }

  // 掃描小螞蟻 icon
  &__scan-icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    flex-shrink: 0;
  }

  // 對齊 .indexAPP-accessTitle2 margin-top: 1px / line-height: 22px
  &__access-subtitle {
    margin: 1px 0 0;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 22px;
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
