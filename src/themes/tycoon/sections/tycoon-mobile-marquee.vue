<script setup lang="ts">
/**
 * tycoon mobile 跑馬燈
 *
 * 對齊使用者設計稿 .marquee 段：
 * - 半透明白底 + 白邊 + inset 內邊 + 卡片陰影
 * - 左 horn 喇叭 icon（設計稿用 emoji 📣，我們改用 inline SVG monochrome 藍色喇叭）
 * - 中橫向滾動文字，左右 mask 漸隱
 *
 * 為什麼用 inline SVG 而非 emoji 📣：
 * - 任務描述明確禁止 emoji
 * - SVG 可吃 var(--color-primary) 跟著 variant 變色（emoji 顏色寫死）
 * - SVG 體積極小（< 200B）
 *
 * 跑馬燈文字寫死示意活動內容（demo 純展示，無 API）
 * 動畫用 CSS keyframes，duplicate 兩份首尾相接 + translateX(-100%) 實現無縫
 */

// 示意性公告文字（demo 純展示）
const items: string[] = [
  "歡迎來到藍冰大亨，VIP 升等獎金加碼中",
  "週週反水 5%，越玩越賺",
  "新會員首儲獎勵自動入帳，再加額外驚喜",
  "全平台 24 小時專人客服，問題即時處理"
];

/** 串接後的文字（用 · 分隔，雙份首尾相接無縫滾動） */
const joinedText = items.join("　·　");
</script>

<template>
  <div class="tycoon-m-marquee" role="status" aria-live="polite">
    <!-- 喇叭 icon：inline SVG monochrome 藍 -->
    <span class="tycoon-m-marquee__horn" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <!--
          簡化版喇叭 path：左側喇叭 body + 右側音波三條
          填色用 currentColor，外層套 color: var(--color-primary) 讓 variant 跟著變
        -->
        <path
          fill="currentColor"
          d="M3 10v4a2 2 0 0 0 2 2h2l5 4V4l-5 4H5a2 2 0 0 0-2 2zm14 2a4 4 0 0 1-1.2 2.85l-1.42-1.42A2 2 0 0 0 15 12a2 2 0 0 0-.62-1.44l1.42-1.42A4 4 0 0 1 17 12zm3 0a7 7 0 0 1-2.1 5l-1.42-1.42A5 5 0 0 0 18 12a5 5 0 0 0-1.52-3.58L17.9 7A7 7 0 0 1 20 12z"
        />
      </svg>
    </span>

    <div class="tycoon-m-marquee__viewport">
      <div class="tycoon-m-marquee__track">
        <span class="tycoon-m-marquee__text">{{ joinedText }}</span>
        <!-- 第二份首尾相接，aria-hidden 避免 screen reader 重複念 -->
        <span class="tycoon-m-marquee__text" aria-hidden="true">{{
          joinedText
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 對齊設計稿 .marquee 規格：
// - margin: 12px 14px 0 / padding: 9px 12px / radius: 14px
// - 半透白底 + 白色 1.5px 邊 + inset 卡片陰影
.tycoon-m-marquee {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 12px 14px 0;
  padding: 9px 12px;
  background: rgba(255, 255, 255, 0.7);
  border: 1.5px solid #ffffff;
  border-radius: 14px;
  box-shadow:
    0 3px 10px var(--tycoon-card-glow),
    inset 0 0 0 1px hsla(var(--primary-h), var(--primary-s), 80%, 0.6);
  overflow: hidden;

  &__horn {
    flex: none;
    width: 22px;
    height: 22px;
    color: var(--color-primary);
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

    // 邊緣淡出（對齊設計稿 .marquee .track -webkit-mask）
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 4%,
      #000000 96%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
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
    animation: tycoon-marquee 26s linear infinite;
    will-change: transform;
  }

  // 文字（對齊設計稿 .marquee .track span font-size: 13 / color: #2a6ad0）
  &__text {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-05);
    line-height: 1.6;
  }
}

@keyframes tycoon-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
