<script setup lang="ts">
import { ref } from "vue";
// 借用 ant-sport phone mockup（藍 / 中性色，搭藍冰主題自然）
import indexappImg1 from "@/themes/ant-sport/assets/pc/indexapp-img-1.png?url";
import indexappImg2 from "@/themes/ant-sport/assets/pc/indexapp-img-2.png?url";
import indexappImg3 from "@/themes/ant-sport/assets/pc/indexapp-img-3.png?url";
import qrSample from "@/themes/ant-sport/assets/pc/qrcode-sample.png?url";

/**
 * tycoon PC App 下載區
 *
 * 對齊 ant-sport-pc-app-download 範式（左 phone mockup / 右 tabs + QR），
 * 但走 tycoon 自己的色票：藍冰漸層 + 卡片陰影改藍光暈
 *
 * 設計簡化處：
 * - 標題用文字而非圖檔（tycoon 沒有 indexapp-title.png 對應品牌字）
 * - 「掃描小螞蟻 icon」（ant-sport 專屬）改用 inline SVG 通用「掃描」圖示
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
    url: "https://m.tycoon-demo.com"
  },
  {
    key: "android",
    name: "安卓 APP",
    title: "Android 原生版",
    desc: "支援 Android 5.0 以上系統，遊戲流暢，登入更便利",
    leftImg: indexappImg2,
    scanTitle1: "掃描以下二維碼",
    scanTitle2: "下載 Android APP",
    url: "https://app.tycoon-demo.com/android"
  },
  {
    key: "ios",
    name: "iOS APP",
    title: "iOS 原生版",
    desc: "支援 iOS 13 以上系統，與 App Store 商店體驗一致",
    leftImg: indexappImg3,
    scanTitle1: "掃描以下二維碼",
    scanTitle2: "下載 iOS APP",
    url: "https://app.tycoon-demo.com/ios"
  }
];

const activeTab = ref(0);
</script>

<template>
  <section class="tycoon-pc-app" aria-label="App 下載區">
    <div class="tycoon-pc-app__inner">
      <header class="tycoon-pc-app__header">
        <h2 class="tycoon-pc-app__title">藍冰大亨 APP</h2>
        <p class="tycoon-pc-app__subtitle">三平台同步上線，掃碼即下載</p>
      </header>

      <div class="tycoon-pc-app__content">
        <div class="tycoon-pc-app__left">
          <div
            v-for="(t, i) in tabs"
            :key="t.key"
            class="tycoon-pc-app__frame"
            :class="{ 'tycoon-pc-app__frame--active': i === activeTab }"
          >
            <img
              :src="t.leftImg"
              :alt="`${t.name} mockup`"
              class="tycoon-pc-app__frame-img"
              loading="lazy"
            />
          </div>
        </div>

        <div class="tycoon-pc-app__right">
          <ul class="tycoon-pc-app__tabs" role="tablist">
            <li
              v-for="(t, i) in tabs"
              :key="t.key"
              role="tab"
              :aria-selected="i === activeTab"
              class="tycoon-pc-app__tab"
              :class="{ 'tycoon-pc-app__tab--active': i === activeTab }"
              @click="activeTab = i"
            >
              <span>{{ t.name }}</span>
            </li>
          </ul>

          <template v-for="(t, i) in tabs" :key="t.key">
            <div
              v-show="i === activeTab"
              class="tycoon-pc-app__panel"
              role="tabpanel"
            >
              <div class="tycoon-pc-app__info">
                <h3 class="tycoon-pc-app__name">{{ t.title }}</h3>
                <p class="tycoon-pc-app__desc">{{ t.desc }}</p>
              </div>

              <div class="tycoon-pc-app__access">
                <div class="tycoon-pc-app__access-box">
                  <div class="tycoon-pc-app__qr">
                    <img
                      :src="qrSample"
                      alt="QR Code 示意"
                      class="tycoon-pc-app__qr-img"
                    />
                  </div>
                  <p class="tycoon-pc-app__access-title">
                    <!-- 「掃描」inline SVG 取代 ant-sport 專屬 qrcode-icon -->
                    <span class="tycoon-pc-app__scan-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path
                          fill="currentColor"
                          d="M3 3h6v2H5v4H3zm12 0h6v6h-2V5h-4zM3 15h2v4h4v2H3zm16 0h2v6h-6v-2h4zM7 7h4v4H7zm0 6h4v4H7zm6-6h4v4h-4zm0 6h2v2h-2zm2 2h2v2h-2z"
                        />
                      </svg>
                    </span>
                    {{ t.scanTitle1 }}
                  </p>
                  <p class="tycoon-pc-app__access-subtitle">
                    {{ t.scanTitle2 }}
                  </p>
                </div>

                <div class="tycoon-pc-app__access-box">
                  <div class="tycoon-pc-app__link">
                    <a :href="t.url" class="tycoon-pc-app__link-text">
                      {{ t.url }}
                    </a>
                  </div>
                  <p class="tycoon-pc-app__access-title">點擊以下連結</p>
                  <p class="tycoon-pc-app__access-subtitle">直接前往</p>
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
.tycoon-pc-app {
  background: var(--bg-base);
  padding: 60px 0;

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  &__header {
    text-align: center;
    margin-bottom: 36px;
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

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 32px;
  }

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

  &__right {
    flex-shrink: 0;
    width: 456px;
    min-height: 580px;
    border-radius: 24px;
    box-shadow:
      0 20px 30px -10px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    background: linear-gradient(
      180deg,
      var(--bg-surface) 0%,
      var(--tycoon-ice-1) 100%
    );
    padding: 36px 24px 32px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  &__tabs {
    margin: 0 0 8px;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__tab {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    text-align: center;
    color: var(--primary-05);
    background: var(--bg-surface);
    box-shadow:
      0 4px 8px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    list-style: none;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.85;
    }

    &--active {
      color: var(--text-on-primary);
      background: var(--gradient-cta);
      box-shadow: 0 4px 10px
        hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.4);

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
    animation: tycoon-pc-app-fade 0.4s ease;
  }

  &__info {
    color: var(--text-primary);
  }

  &__name {
    height: 40px;
    margin: 32px 0 0 16px;
    line-height: 40px;
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
  }

  &__desc {
    width: 100%;
    max-width: 384px;
    min-height: 56px;
    margin: 12px 0 0 16px;
    line-height: 26px;
    font-size: 15px;
    color: var(--text-muted);
  }

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
    color: var(--text-primary);
  }

  &__qr {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 168px;
    border-radius: 12px;
    border: 2px solid var(--bg-surface);
    background: linear-gradient(
      180deg,
      var(--tycoon-ice-1) 1%,
      var(--tycoon-ice-2) 100%
    );
    padding: 18px;
  }

  &__qr-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 168px;
    border-radius: 12px;
    background: linear-gradient(
      225deg,
      var(--tycoon-ice-2) 0%,
      var(--tycoon-ice-1) 50%,
      var(--bg-surface) 100%
    );
    border: 2px solid var(--tycoon-ice-2);
    padding: 12px 18px;
  }

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

  &__scan-icon {
    width: 18px;
    height: 18px;
    color: var(--color-primary);
    display: inline-flex;
  }

  &__scan-icon svg {
    width: 100%;
    height: 100%;
  }

  &__access-subtitle {
    margin: 1px 0 0;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 22px;
  }
}

@keyframes tycoon-pc-app-fade {
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
