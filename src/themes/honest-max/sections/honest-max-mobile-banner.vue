<script setup lang="ts">
import banner1 from "../assets/banner/banner-1.jpg?url";

/**
 * honest-max mobile banner — 對齊 honest_real max/widgets/pages/max/banner.vue
 *
 * 原作只有一張 BannerGuest01.jpg（包含「人在塔在 玩轉德州」三人 RPG 角色 + 文案）
 * 直接使用該圖即可，疊上 hero 文字疊層強化視覺
 */
</script>

<template>
  <section class="honest-max-m-banner">
    <img :src="banner1" alt="人在塔在" class="honest-max-m-banner__img" />
    <div class="honest-max-m-banner__caption">
      <div class="honest-max-m-banner__brand">88WIN</div>
      <div class="honest-max-m-banner__sub">
        88WIN 注送 8,888 流水只需一次即可體現
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.honest-max-m-banner {
  position: relative;
  width: 100%;
  margin: 0 0 8px;

  &__img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: var(--shadow-md);
  }

  // 疊在 banner 下方的小字幕條：原作 banner 圖上本身有「人在塔在」字樣
  // 額外補一條 caption 增加品牌記憶度
  &__caption {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 10px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    padding: 6px 10px;
    border-radius: 6px;
    color: #ffffff;
    display: none; // 預設不顯示避免遮蓋 banner 文字；保留結構供未來啟用
  }

  &__brand {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  &__sub {
    font-size: 11px;
    opacity: 0.85;
  }
}
</style>
