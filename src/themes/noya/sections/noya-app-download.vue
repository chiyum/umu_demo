<script setup lang="ts">
/**
 * noya App 下載區
 *
 * 結構（依 GAP_ANALYSIS）：
 * - 白底卡片內含 phone mockup + 主標題 + 副標
 * - iOS / Google Play 兩顆按鈕
 * - 右側 QR code 卡片
 *
 * QR：用 SVG 程式繪製假矩陣（永遠固定圖樣，不真實掃描），
 * 避免接外部 QR 服務造成內容洩漏。
 *
 * 文字：「沉浸式真人體驗」改寫為更通用的「行動裝置．即時暢玩」。
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });
</script>

<template>
  <section
    id="download"
    class="noya-dl"
    :class="{ 'noya-dl--mobile': mobile }"
    aria-label="App 下載區"
  >
    <div class="noya-dl__inner">
      <div class="noya-dl__card">
        <!-- 左：文案 + 下載按鈕 -->
        <div class="noya-dl__copy">
          <span class="noya-dl__eyebrow">DEMO CASINO APP</span>
          <h2 class="noya-dl__title">行動裝置．即時暢玩</h2>
          <p class="noya-dl__desc">
            iOS 與 Android 雙平台支援，<br />
            隨時隨地登入，掃描右側 QR Code 立即下載。
          </p>
          <div class="noya-dl__btns">
            <!-- App Store 按鈕：Apple 公開商標 + 黑底白字 brand asset 慣例 -->
            <button type="button" class="noya-dl__btn">
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                aria-hidden="true"
                class="noya-dl__btn-logo"
              >
                <path
                  fill="currentColor"
                  d="M17.05 12.04c-.03-2.66 2.18-3.94 2.28-4-1.24-1.81-3.17-2.06-3.86-2.09-1.64-.16-3.2.97-4.03.97-.85 0-2.12-.95-3.49-.92-1.8.03-3.46 1.04-4.39 2.65-1.87 3.24-.48 8.04 1.35 10.67.9 1.29 1.97 2.74 3.38 2.69 1.36-.05 1.88-.88 3.52-.88 1.64 0 2.1.88 3.54.85 1.46-.03 2.39-1.31 3.28-2.6.6-.86 1.05-1.84 1.37-2.86-3-.13-3.95-2.4-3.95-2.48zm-2.55-7.66c.73-.91 1.23-2.17 1.09-3.43-1.05.05-2.36.73-3.12 1.62-.68.79-1.29 2.08-1.13 3.31 1.18.09 2.4-.6 3.16-1.5z"
                />
              </svg>
              <div class="noya-dl__btn-meta">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </button>
            <!-- Google Play 按鈕：4 色三角公開 brand mark -->
            <button type="button" class="noya-dl__btn">
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                aria-hidden="true"
                class="noya-dl__btn-logo"
              >
                <defs>
                  <linearGradient
                    id="gp-blue"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#00c0ff" />
                    <stop offset="100%" stop-color="#0066ff" />
                  </linearGradient>
                  <linearGradient
                    id="gp-green"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#00d97e" />
                    <stop offset="100%" stop-color="#089b59" />
                  </linearGradient>
                  <linearGradient
                    id="gp-yellow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#ffd900" />
                    <stop offset="100%" stop-color="#f8a000" />
                  </linearGradient>
                  <linearGradient
                    id="gp-red"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#ff4040" />
                    <stop offset="100%" stop-color="#e60023" />
                  </linearGradient>
                </defs>
                <path fill="url(#gp-blue)" d="M3.6 2.4v19.2L13.5 12 3.6 2.4z" />
                <path
                  fill="url(#gp-green)"
                  d="M16.8 8.7l-3.3 3.3 3.3 3.3 4.2-2.4c.8-.5.8-1.7 0-2.2l-4.2-2z"
                />
                <path
                  fill="url(#gp-yellow)"
                  d="M13.5 12L3.6 21.6 16.8 15.3 13.5 12z"
                />
                <path
                  fill="url(#gp-red)"
                  d="M3.6 2.4L13.5 12l3.3-3.3L3.6 2.4z"
                />
              </svg>
              <div class="noya-dl__btn-meta">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </button>
          </div>
        </div>

        <!-- 中：插畫風 phone mockup（CSS frame + SVG 山形/太陽插畫） -->
        <div class="noya-dl__phone" aria-hidden="true">
          <div class="noya-dl__phone-frame">
            <div class="noya-dl__phone-notch" />
            <div class="noya-dl__phone-screen">
              <!-- 插畫：太陽 + 雙層山形剪影，營造度假 / 沉浸感 -->
              <svg
                class="noya-dl__phone-illust"
                viewBox="0 0 100 90"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="noya-dl-sun" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stop-color="#ffffff"
                      stop-opacity="0.95"
                    />
                    <stop
                      offset="60%"
                      stop-color="#ffeacb"
                      stop-opacity="0.8"
                    />
                    <stop offset="100%" stop-color="#ffcd8a" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <!-- 大太陽 / 月亮 -->
                <circle cx="50" cy="34" r="18" fill="url(#noya-dl-sun)" />
                <!-- 遠山 -->
                <path
                  d="M0 70 L24 48 L48 62 L72 42 L100 68 L100 90 L0 90 Z"
                  fill="rgba(255,255,255,0.45)"
                />
                <!-- 近山 -->
                <path
                  d="M0 80 L20 60 L40 72 L65 52 L85 68 L100 60 L100 90 L0 90 Z"
                  fill="rgba(255,255,255,0.3)"
                />
              </svg>
              <div class="noya-dl__phone-header" />
              <div class="noya-dl__phone-tiles">
                <span v-for="i in 6" :key="i" />
              </div>
              <div class="noya-dl__phone-cta" />
            </div>
          </div>
        </div>

        <!-- 右：QR card（金色相框 + 內白底放 QR） -->
        <div class="noya-dl__qr-card">
          <div class="noya-dl__qr-card-inner">
            <div class="noya-dl__qr-title">立即掃描</div>
            <div
              class="noya-dl__qr"
              aria-label="下載 QR Code（示意圖）"
              role="img"
            >
              <!-- 21x21 二維碼示意，含三個定位點與假裝的資料區 -->
              <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect width="21" height="21" fill="#ffffff" />
                <g fill="var(--text-primary)">
                  <!-- 三個定位點 -->
                  <rect x="0" y="0" width="7" height="7" />
                  <rect x="1" y="1" width="5" height="5" fill="#ffffff" />
                  <rect x="2" y="2" width="3" height="3" />

                  <rect x="14" y="0" width="7" height="7" />
                  <rect x="15" y="1" width="5" height="5" fill="#ffffff" />
                  <rect x="16" y="2" width="3" height="3" />

                  <rect x="0" y="14" width="7" height="7" />
                  <rect x="1" y="15" width="5" height="5" fill="#ffffff" />
                  <rect x="2" y="16" width="3" height="3" />
                </g>
                <!-- 假資料區 -->
                <g fill="var(--text-primary)">
                  <rect x="9" y="1" width="1" height="1" />
                  <rect x="10" y="2" width="1" height="1" />
                  <rect x="11" y="1" width="1" height="1" />
                  <rect x="12" y="3" width="1" height="1" />
                  <rect x="9" y="5" width="1" height="1" />
                  <rect x="11" y="6" width="1" height="1" />
                  <rect x="2" y="9" width="1" height="1" />
                  <rect x="4" y="9" width="1" height="1" />
                  <rect x="6" y="10" width="1" height="1" />
                  <rect x="8" y="9" width="1" height="1" />
                  <rect x="10" y="10" width="1" height="1" />
                  <rect x="11" y="9" width="1" height="1" />
                  <rect x="13" y="11" width="1" height="1" />
                  <rect x="15" y="10" width="1" height="1" />
                  <rect x="17" y="9" width="1" height="1" />
                  <rect x="19" y="11" width="1" height="1" />
                  <rect x="9" y="13" width="1" height="1" />
                  <rect x="11" y="14" width="1" height="1" />
                  <rect x="13" y="13" width="1" height="1" />
                  <rect x="15" y="15" width="1" height="1" />
                  <rect x="17" y="14" width="1" height="1" />
                  <rect x="19" y="16" width="1" height="1" />
                  <rect x="9" y="17" width="1" height="1" />
                  <rect x="11" y="19" width="1" height="1" />
                  <rect x="13" y="17" width="1" height="1" />
                </g>
              </svg>
            </div>
            <div class="noya-dl__qr-hint">掃描下載 App</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-dl {
  background: var(--bg-base);
  padding: 36px 0;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__card {
    // kingdom DNA：大型容器走 --radius-xl + shadow-lg
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    padding: 36px 40px;
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 36px;
    align-items: center;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__eyebrow {
    display: inline-block;
    color: var(--color-primary);
    font-weight: 600;
    letter-spacing: 3px;
    font-size: 11px;
    text-transform: uppercase;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(26px, 3.4vw, 36px);
    line-height: 1.2;
    color: var(--text-primary);
    margin: 0 0 6px;
    letter-spacing: 2px;
  }

  &__desc {
    color: var(--text-muted);
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.7;
  }

  &__btns {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__btn {
    // kingdom DNA：App Store / Google Play 按鈕走 --radius-lg + var transition
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    background: var(--text-primary);
    color: #ffffff;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition:
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);

    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0 6px 14px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }
  }

  // App Store / Google Play 按鈕 logo 顏色：Apple 用白、Google 走原 SVG 漸層
  &__btn-logo {
    flex-shrink: 0;
  }

  &__btn-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    text-align: left;

    small {
      display: block;
      font-size: 10px;
      opacity: 0.75;
      letter-spacing: 0.5px;
    }

    strong {
      font-size: 14px;
      font-weight: 700;
    }
  }

  // Phone mockup
  &__phone {
    width: 140px;
    height: 240px;
  }

  &__phone-frame {
    width: 100%;
    height: 100%;

    // device frame 顏色集中在 token，與 hero banner 同一份 token
    background: var(--device-frame-bg);
    border-radius: 24px;
    padding: 8px;
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.25),
      inset 0 0 0 2px var(--device-frame-inner);
    position: relative;
  }

  &__phone-notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 6px;
    background: #000000;
    border-radius: 3px;
    z-index: 2;
  }

  &__phone-screen {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      var(--color-accent) 0%,
      var(--color-primary) 100%
    );
    border-radius: 18px;
    padding: 22px 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    overflow: hidden;
  }

  // 插畫 SVG：絕對定位疊在 screen 頂端 1/3，給「插畫風」氛圍
  &__phone-illust {
    position: absolute;
    top: 14px;
    left: 8px;
    right: 8px;
    width: calc(100% - 16px);
    height: 50%;
    pointer-events: none;
    border-radius: 10px;
    overflow: hidden;
  }

  &__phone-header {
    height: 24px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  &__phone-tiles {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;

    span {
      background: rgba(255, 255, 255, 0.55);
      border-radius: 4px;
    }
  }

  &__phone-cta {
    height: 18px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 4px;
  }

  // QR card：對齊原站「金色邊框 + 內 QR + hint」結構
  // 用 padding + bg gradient 模擬金色相框，內層白底放 QR code
  &__qr-card {
    background: var(--gradient-gold);
    border: none;
    border-radius: 14px;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    box-shadow:
      0 8px 20px var(--bg-overlay),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  // 金邊內的白色容器：包住標題、QR、hint
  &__qr-card-inner {
    background: var(--bg-surface);
    border-radius: 11px;
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  &__qr-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 1px;
  }

  &__qr {
    background: var(--bg-surface);
    padding: 6px;
    border-radius: 8px;
    border: 1px solid var(--border);
    box-shadow: 0 2px 6px var(--bg-overlay);

    svg {
      width: 140px;
      height: 140px;
      display: block;
    }
  }

  &__qr-hint {
    font-size: 11px;
    color: var(--text-muted);
  }

  // 手機版：堆疊
  &--mobile {
    padding: 22px 0;

    .noya-dl__inner {
      padding: 0 16px;
    }

    .noya-dl__card {
      grid-template-columns: 1fr;
      padding: 24px 20px;
      gap: 20px;
      text-align: center;
    }

    .noya-dl__btns {
      justify-content: center;
    }

    .noya-dl__btn-meta {
      text-align: left;
    }

    .noya-dl__phone {
      margin: 0 auto;
      width: 110px;
      height: 200px;
    }

    .noya-dl__qr-card {
      align-self: center;

      svg {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>
