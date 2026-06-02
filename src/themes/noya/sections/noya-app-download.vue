<script setup lang="ts">
/**
 * noya APP 下載區：QR Code（SVG 模擬）+ iOS / Android 下載鈕
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });
</script>

<template>
  <section id="download" class="noya-dl" :class="{ 'noya-dl--mobile': mobile }">
    <div class="noya-dl__inner">
      <div class="noya-dl__text">
        <span class="noya-dl__eyebrow">NOYA 手機版</span>
        <h2 class="noya-dl__title">隨時隨地<br />沉浸真人體驗</h2>
        <p class="noya-dl__desc">iOS / Android 雙平台支援，掃描 QR Code 下載</p>
        <div class="noya-dl__btns">
          <a href="#" class="noya-dl__btn">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.05 12.04c-.03-2.66 2.18-3.94 2.28-4-1.24-1.81-3.17-2.06-3.86-2.09-1.64-.16-3.2.97-4.03.97-.85 0-2.12-.95-3.49-.92-1.8.03-3.46 1.04-4.39 2.65-1.87 3.24-.48 8.04 1.35 10.67.9 1.29 1.97 2.74 3.38 2.69 1.36-.05 1.88-.88 3.52-.88 1.64 0 2.1.88 3.54.85 1.46-.03 2.39-1.31 3.28-2.6.6-.86 1.05-1.84 1.37-2.86-3-.13-3.95-2.4-3.95-2.48zm-2.55-7.66c.73-.91 1.23-2.17 1.09-3.43-1.05.05-2.36.73-3.12 1.62-.68.79-1.29 2.08-1.13 3.31 1.18.09 2.4-.6 3.16-1.5z"
              />
            </svg>
            <div>
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>
          </a>
          <a href="#" class="noya-dl__btn">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 20.5V3.5c0-.4.2-.7.6-.9l10 8.6c.3.2.3.6 0 .8l-10 8.6c-.4-.2-.6-.5-.6-.9zm12.7-7.4l2.6-1.6c.4-.2.4-.8 0-1l-2.6-1.6L13 11l2.7 2.1zm-1.4-3.3L4.6 4l7.7 6.7-3.7 3.6 5.7-2.5zM4.6 19l9.7-5.8-3.7-3.6L4.6 19z"
              />
            </svg>
            <div>
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </div>
          </a>
        </div>
      </div>
      <div class="noya-dl__qr" aria-label="下載 QR Code">
        <!-- SVG QR placeholder：模擬的 21x21 二維碼方塊 -->
        <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <rect width="21" height="21" fill="#fff" />
          <!-- 3 個定位點 -->
          <g fill="var(--text-primary)">
            <rect x="0" y="0" width="7" height="7" />
            <rect x="1" y="1" width="5" height="5" fill="#fff" />
            <rect x="2" y="2" width="3" height="3" />

            <rect x="14" y="0" width="7" height="7" />
            <rect x="15" y="1" width="5" height="5" fill="#fff" />
            <rect x="16" y="2" width="3" height="3" />

            <rect x="0" y="14" width="7" height="7" />
            <rect x="1" y="15" width="5" height="5" fill="#fff" />
            <rect x="2" y="16" width="3" height="3" />
          </g>
          <!-- 假裝的資料區（隨機方塊） -->
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
    </div>
  </section>
</template>

<style lang="scss" scoped>
.noya-dl {
  background: var(--bg-base);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px 24px;
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 48px;
    align-items: center;
  }

  &__eyebrow {
    display: inline-block;
    color: var(--color-primary);
    font-weight: 600;
    letter-spacing: 3px;
    font-size: 12px;
    margin-bottom: 8px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 42px);
    line-height: 1.2;
    color: var(--text-primary);
    margin: 0 0 16px;
  }

  &__desc {
    color: var(--text-muted);
    margin: 0 0 24px;
  }

  &__btns {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    background: var(--text-primary);
    color: #ffffff;
    border-radius: 10px;
    text-decoration: none;
    transition: transform 0.15s ease;

    &:hover {
      transform: translateY(-2px);
    }

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

  &__qr {
    justify-self: end;
    background: var(--bg-surface);
    padding: 16px;
    border-radius: 14px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);

    svg {
      width: 180px;
      height: 180px;
      display: block;
    }
  }

  &--mobile {
    .noya-dl__inner {
      grid-template-columns: 1fr;
      padding: 40px 16px;
      text-align: center;
    }

    .noya-dl__btns {
      justify-content: center;
    }

    .noya-dl__qr {
      justify-self: center;

      svg {
        width: 140px;
        height: 140px;
      }
    }
  }
}
</style>
