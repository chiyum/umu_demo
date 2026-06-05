<script setup lang="ts">
/**
 * tycoon PC 跑馬燈 + 「更多」按鈕
 *
 * 對齊 ant-sport-pc-news 範式（橫長窄條 pill 卡 + 內部喇叭 icon），
 * 但 icon 改用 inline SVG monochrome（與 mobile marquee 同 path），
 * 避免引入 ant-sport 專屬的 marquee-icon.png 造成「品牌互相沾染」
 *
 * 為什麼 PC 也提供跑馬燈：
 * - 設計稿原本只在 mobile 有 marquee，PC 沒這段；
 *   但 tycoon 桌面要 fork ant-sport 五段結構，News 是其中一段
 * - 把 marquee 內容延續到 PC，整體資訊密度與品牌語氣一致
 */

const items: string[] = [
  "歡迎來到藍冰大亨，VIP 升等獎金加碼中",
  "週週反水 5%，越玩越賺",
  "新會員首儲獎勵自動入帳，再加額外驚喜",
  "全平台 24 小時專人客服，問題即時處理"
];

const joinedText = items.join("　·　");
</script>

<template>
  <div class="tycoon-pc-news">
    <div class="tycoon-pc-news__content">
      <div class="tycoon-pc-news__marquee">
        <!-- 喇叭 SVG icon（與 mobile marquee 同 path，currentColor 跟主色） -->
        <span class="tycoon-pc-news__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              fill="currentColor"
              d="M3 10v4a2 2 0 0 0 2 2h2l5 4V4l-5 4H5a2 2 0 0 0-2 2zm14 2a4 4 0 0 1-1.2 2.85l-1.42-1.42A2 2 0 0 0 15 12a2 2 0 0 0-.62-1.44l1.42-1.42A4 4 0 0 1 17 12zm3 0a7 7 0 0 1-2.1 5l-1.42-1.42A5 5 0 0 0 18 12a5 5 0 0 0-1.52-3.58L17.9 7A7 7 0 0 1 20 12z"
            />
          </svg>
        </span>
        <div class="tycoon-pc-news__viewport">
          <div class="tycoon-pc-news__track">
            <span class="tycoon-pc-news__text">{{ joinedText }}</span>
            <span class="tycoon-pc-news__text" aria-hidden="true">
              {{ joinedText }}
            </span>
          </div>
        </div>
      </div>
      <button type="button" class="tycoon-pc-news__btn">更多</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊 ant-sport-pc-news 橫長 pill 卡規格：1200×40 / radius 20px / margin-top -20
// 為什麼 margin-top 負值：原 ant-sport 是 News 疊在 Banner 下方 28px 偏移，
// tycoon banner 比較偏冷藍 + swoosh 條紋，News 卡上提創造重疊層次
.tycoon-pc-news {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    width: 1200px;
    max-width: calc(100% - 48px);
    height: 44px;
    padding: 0 10px 0 18px;
    margin-top: -20px;
    border-radius: 22px;
    background: linear-gradient(
      180deg,
      var(--bg-surface) 14%,
      var(--tycoon-ice-1) 74%,
      var(--bg-base-translucent) 98%
    );
    box-shadow:
      0 6px 16px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
  }

  &__marquee {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    height: 100%;
  }

  &__icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    color: var(--color-primary);
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
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 3%,
      #000000 97%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 3%,
      #000000 97%,
      transparent 100%
    );
  }

  &__track {
    display: inline-flex;
    gap: 36px;
    white-space: nowrap;
    animation: tycoon-pc-news-scroll 32s linear infinite;
    will-change: transform;
  }

  &__text {
    font-size: 15px;
    letter-spacing: -0.2px;
    color: var(--primary-05);
    line-height: 44px;
  }

  &__btn {
    flex-shrink: 0;
    width: 78px;
    height: 28px;
    line-height: 26px;
    margin-left: 10px;
    padding: 0;
    text-align: center;
    border: 1px solid var(--color-primary);
    border-radius: 14px;
    color: var(--color-primary);
    background: transparent;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: transparent;
    }
  }
}

@keyframes tycoon-pc-news-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
