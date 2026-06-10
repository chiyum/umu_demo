<script setup lang="ts">
/**
 * daheng-magazine mobile feature 大圖 + 立即遊玩 CTA（v6 對齊）
 *
 * 對應 phones.js v6 feature 部分：
 *   <div class="feature"><img src="hero.png"><button class="play">立即遊玩 ›</button></div>
 *
 * 拆分理由：原稿結構是 chips → feature → sec-head(精選遊戲🔥) → masonry，
 * sec-head 必須塞在 feature 與 masonry 之間，所以拆成兩個 section
 */
import { heroSrc } from "../../daheng-shared/_data";
</script>

<template>
  <div class="daheng-magazine-feature">
    <img :src="heroSrc" alt="精選" />
    <button type="button" class="daheng-magazine-feature__play">
      立即遊玩
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.daheng-magazine-feature {
  margin-top: 14px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  &__play {
    position: absolute;
    right: 14px;
    bottom: 14px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(180deg, #cf8a4f, #a85d2b);
    border: none;
    padding: 11px 22px;
    border-radius: 22px;
    box-shadow: 0 8px 16px -6px rgba(120, 60, 20, 0.7);
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
}
</style>
