<script setup lang="ts">
/**
 * dahsing 三版型共用跑馬燈（喇叭 icon + 滾動文字 + 右箭頭）
 *
 * 為什麼用 CSS keyframes 而非 JS：原稿就是純 CSS animation: scroll 16s linear infinite；
 * 維持輕量、不引入 swiper / marquee 套件。
 *
 * 為什麼 mask 漸層保留：原稿用 mask: linear-gradient(...) 讓兩端文字淡出，避免硬切顯得粗糙；
 * 移除會讓滾動視覺斷裂。
 */
import { QIcon } from "quasar";
</script>

<template>
  <div class="dahsing-marquee">
    <QIcon
      name="material-symbols:campaign-outline"
      size="16px"
      class="dahsing-marquee__spk"
    />
    <div class="dahsing-marquee__track">
      <span
        >公告跑馬燈示意&emsp;公告跑馬燈示意&emsp;公告跑馬燈示意&emsp;歡迎來到大亨遊戲城！</span
      >
    </div>
    <QIcon
      name="material-symbols:chevron-right"
      size="14px"
      class="dahsing-marquee__chev"
    />
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

  &__spk {
    color: var(--color-primary);
    flex-shrink: 0;
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

  &__chev {
    color: var(--text-muted);
    flex-shrink: 0;
  }
}

@keyframes dahsing-marquee-scroll {
  to {
    transform: translateX(-100%);
  }
}
</style>
