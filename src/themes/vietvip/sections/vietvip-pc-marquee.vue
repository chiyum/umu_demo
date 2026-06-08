<script setup lang="ts">
/**
 * vietvip PC 跑馬燈條
 *
 * 與 ant-sport / tycoon PC news 同範式（橫長 pill 卡 + 內部喇叭 icon），
 * 但設計語言走「越南 VIP 紅金主題」：
 * - 深酒紅半透底 + 金邊 + 金色喇叭 SVG
 * - margin-top -28 讓 marquee 條從 banner 下方 overlap 一段，創造重疊層次
 */

const items: string[] = [
  "歡迎來到越南 VIP 廳堂，新會員首儲百分百加贈",
  "全平台 24 小時越南語客服，問題即時處理",
  "VIP 會員獨享當月反水加碼，最高 8 倍",
  "週週免費禮金活動，登入即可領取",
  "綠色錢包通道支援快速存提，秒到帳"
];

const joinedText = items.join("　·　");
</script>

<template>
  <div class="vietvip-pc-marquee">
    <div class="vietvip-pc-marquee__content">
      <div class="vietvip-pc-marquee__inner">
        <span class="vietvip-pc-marquee__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              fill="currentColor"
              d="M3 10v4a2 2 0 0 0 2 2h2l5 4V4l-5 4H5a2 2 0 0 0-2 2zm14 2a4 4 0 0 1-1.2 2.85l-1.42-1.42A2 2 0 0 0 15 12a2 2 0 0 0-.62-1.44l1.42-1.42A4 4 0 0 1 17 12zm3 0a7 7 0 0 1-2.1 5l-1.42-1.42A5 5 0 0 0 18 12a5 5 0 0 0-1.52-3.58L17.9 7A7 7 0 0 1 20 12z"
            />
          </svg>
        </span>
        <div class="vietvip-pc-marquee__viewport">
          <div class="vietvip-pc-marquee__track">
            <span class="vietvip-pc-marquee__text">{{ joinedText }}</span>
            <span class="vietvip-pc-marquee__text" aria-hidden="true">
              {{ joinedText }}
            </span>
          </div>
        </div>
      </div>
      <button type="button" class="vietvip-pc-marquee__btn">更多</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vietvip-pc-marquee {
  width: 100%;
  display: flex;
  justify-content: center;

  &__content {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    width: 1200px;
    max-width: calc(100% - 48px);
    height: 48px;
    padding: 0 14px 0 20px;
    margin-top: -24px;
    border-radius: 24px;
    background: linear-gradient(
      180deg,
      rgba(74, 15, 29, 0.92) 0%,
      rgba(28, 3, 9, 0.98) 100%
    );
    border: 1px solid var(--vietvip-gold-2);
    box-shadow:
      0 8px 22px var(--vietvip-card-glow),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  &__inner {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    height: 100%;
  }

  &__icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    color: var(--vietvip-gold-1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__icon svg {
    width: 100%;
    height: 100%;
  }

  &__viewport {
    flex: 1;
    overflow: hidden;
    min-width: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__track {
    display: inline-flex;
    gap: 36px;
    white-space: nowrap;
    animation: vietvip-pc-marquee-scroll 32s linear infinite;
    will-change: transform;
  }

  &__text {
    font-size: 15px;
    letter-spacing: 0.3px;
    color: var(--vietvip-gold-1);
    line-height: 48px;
  }

  &__btn {
    flex-shrink: 0;
    width: 80px;
    height: 30px;
    line-height: 28px;
    margin-left: 12px;
    padding: 0;
    text-align: center;
    border: 1px solid var(--vietvip-gold-2);
    border-radius: 15px;
    color: var(--vietvip-gold-1);
    background: transparent;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--gradient-gold);
      color: var(--text-on-gold);
      border-color: var(--vietvip-gold-1);
    }
  }
}

@keyframes vietvip-pc-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
