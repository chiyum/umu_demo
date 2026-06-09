<script setup lang="ts">
/**
 * dahsing 三版型共用跑馬燈（喇叭 icon + 滾動文字 + 右箭頭）
 *
 * 為什麼用 CSS keyframes 而非 JS：原稿就是純 CSS animation: scroll 16s linear infinite；
 * 維持輕量、不引入 swiper / marquee 套件。
 *
 * 為什麼 mask 漸層保留：原稿用 mask: linear-gradient(...) 讓兩端文字淡出，避免硬切顯得粗糙；
 * 移除會讓滾動視覺斷裂。
 *
 * 為什麼 icon 改內嵌 SVG：原本用 <q-icon name="material-symbols:campaign-outline">，但 Quasar
 * 不認 Iconify name（需額外載入 icon set），導致 spk 元素沒寬高、flex layout 被擠跑版。
 * 內嵌 SVG + fill="currentColor" 跟主題色變數同步，且不需任何 icon set 依賴。
 */
</script>

<template>
  <div class="dahsing-marquee">
    <span class="dahsing-marquee__spk" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 2.05v2.06a8 8 0 0 1 0 15.78v2.06A10 10 0 0 0 14 2.05z"
        />
      </svg>
    </span>
    <div class="dahsing-marquee__track">
      <span
        >公告跑馬燈示意&emsp;公告跑馬燈示意&emsp;公告跑馬燈示意&emsp;歡迎來到大亨遊戲城！</span
      >
    </div>
    <span class="dahsing-marquee__chev" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 6l6 6-6 6V6z" />
      </svg>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.dahsing-marquee {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 14px 16px 0;
  padding: 12px 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);

  // 喇叭 icon：固定 16×16，色彩跟著 --color-primary，svg 用 currentColor 自動同步
  &__spk {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--color-primary);
    flex-shrink: 0;

    svg {
      width: 16px;
      height: 16px;
      display: block;
    }
  }

  &__track {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    mask: linear-gradient(
      90deg,
      transparent,
      #000000 6%,
      #000000 94%,
      transparent
    );

    span {
      display: inline-block;
      padding-left: 100%;
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 500;
      animation: dahsing-marquee-scroll 16s linear infinite;
    }
  }

  // 右箭頭：原本 size 14px，內嵌 svg 同步用 14×14，色彩維持 --text-muted
  &__chev {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    color: var(--text-muted);
    flex-shrink: 0;

    svg {
      width: 14px;
      height: 14px;
      display: block;
    }
  }
}

@keyframes dahsing-marquee-scroll {
  to {
    transform: translateX(-100%);
  }
}
</style>
