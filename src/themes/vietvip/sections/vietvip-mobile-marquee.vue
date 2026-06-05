<script setup lang="ts">
/**
 * vietvip mobile 跑馬燈
 *
 * 對齊 lilian_vietvip_web src/widgets/marquee.vue：
 * - 原專案是 v-for + 自動 scroll，內容含「提款成功」等動態訊息
 * - demo 站文字寫死示意越南 VIP 場景：歡迎獎金、VIP 等級、客服資訊
 *
 * 視覺對齊「越南 VIP 紅金主題」：
 * - 半透明深酒紅底 + 金色描邊 + 金色喇叭 SVG
 * - 跑馬燈文字用奶金色，與深紅底高對比
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
  <div class="vietvip-m-marquee" role="status" aria-live="polite">
    <span class="vietvip-m-marquee__horn" aria-hidden="true">
      <!--
        喇叭 SVG：currentColor 跟父層金色走
        為什麼 inline SVG 而非借用原專案 message icon：
        - icon-message.png 是訊息泡泡，語意不符跑馬燈
        - 自繪 monochrome SVG 體積極小且可吃 var(--vietvip-gold-1) 跟著三變體變色
      -->
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M3 10v4a2 2 0 0 0 2 2h2l5 4V4l-5 4H5a2 2 0 0 0-2 2zm14 2a4 4 0 0 1-1.2 2.85l-1.42-1.42A2 2 0 0 0 15 12a2 2 0 0 0-.62-1.44l1.42-1.42A4 4 0 0 1 17 12zm3 0a7 7 0 0 1-2.1 5l-1.42-1.42A5 5 0 0 0 18 12a5 5 0 0 0-1.52-3.58L17.9 7A7 7 0 0 1 20 12z"
        />
      </svg>
    </span>

    <div class="vietvip-m-marquee__viewport">
      <div class="vietvip-m-marquee__track">
        <span class="vietvip-m-marquee__text">{{ joinedText }}</span>
        <span class="vietvip-m-marquee__text" aria-hidden="true">
          {{ joinedText }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊越南 VIP 風的「半透紅底金線」跑馬燈
.vietvip-m-marquee {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 12px 14px 0;
  padding: 9px 12px;
  background: linear-gradient(
    180deg,
    rgba(74, 15, 29, 0.62) 0%,
    rgba(42, 6, 15, 0.78) 100%
  );
  border: 1px solid var(--vietvip-gold-2);
  border-radius: 14px;
  box-shadow:
    0 3px 10px var(--vietvip-card-glow),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  overflow: hidden;

  &__horn {
    flex: none;
    width: 22px;
    height: 22px;
    color: var(--vietvip-gold-1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__horn svg {
    width: 100%;
    height: 100%;
  }

  &__viewport {
    flex: 1;
    overflow: hidden;
    min-width: 0;
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 4%,
      #000000 96%,
      transparent 100%
    );
  }

  &__track {
    display: inline-flex;
    gap: 36px;
    white-space: nowrap;
    animation: vietvip-marquee 28s linear infinite;
    will-change: transform;
  }

  &__text {
    font-size: 13px;
    font-weight: 500;
    color: var(--vietvip-gold-1);
    line-height: 1.6;
    letter-spacing: 0.4px;
  }
}

@keyframes vietvip-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
