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
            <button type="button" class="noya-dl__btn">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
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
            <button type="button" class="noya-dl__btn">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M3 20.5V3.5c0-.4.2-.7.6-.9l10 8.6c.3.2.3.6 0 .8l-10 8.6c-.4-.2-.6-.5-.6-.9zm12.7-7.4l2.6-1.6c.4-.2.4-.8 0-1l-2.6-1.6L13 11l2.7 2.1zm-1.4-3.3L4.6 4l7.7 6.7-3.7 3.6 5.7-2.5zM4.6 19l9.7-5.8-3.7-3.6L4.6 19z"
                />
              </svg>
              <div class="noya-dl__btn-meta">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </button>
          </div>
        </div>

        <!-- 中：phone mockup（純 CSS 繪製） -->
        <div class="noya-dl__phone" aria-hidden="true">
          <div class="noya-dl__phone-frame">
            <div class="noya-dl__phone-notch" />
            <div class="noya-dl__phone-screen">
              <div class="noya-dl__phone-header" />
              <div class="noya-dl__phone-tiles">
                <span v-for="i in 6" :key="i" />
              </div>
              <div class="noya-dl__phone-cta" />
            </div>
          </div>
        </div>

        <!-- 右：QR card -->
        <div class="noya-dl__qr-card">
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
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    box-shadow: var(--shadow);
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
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    background: var(--text-primary);
    color: #ffffff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.15s ease;

    &:hover {
      transform: translateY(-2px);
    }
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
    background: #0d1818;
    border-radius: 24px;
    padding: 8px;
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.25),
      inset 0 0 0 2px #2a3535;
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

  // QR card
  &__qr-card {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__qr-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary);
    letter-spacing: 1px;
  }

  &__qr {
    background: var(--bg-surface);
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);

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
