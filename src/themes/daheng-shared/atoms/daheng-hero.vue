<script setup lang="ts">
/**
 * 大亨 hero banner：首存 1000 送 1000 圖
 *
 * size prop：
 * - 'default'（預設）：aspect-ratio 816/312（v1/v2/v3/v5/v6 用）
 * - 'small'：aspect-ratio 816/220（v4 三欄密集用）
 *
 * 為什麼用 aspect-ratio 而非 height：
 * - 手機寬度不固定（320~430），用 aspect-ratio 保持比例避免變形
 * - 原稿 CSS .hero / .hero.small 兩條規則照搬
 */
import { heroSrc } from "../_data";

withDefaults(
  defineProps<{
    size?: "default" | "small";
  }>(),
  { size: "default" }
);
</script>

<template>
  <img
    :src="heroSrc"
    alt="首存1000送1000"
    class="daheng-hero"
    :class="{ 'daheng-hero--small': size === 'small' }"
  />
</template>

<style lang="scss" scoped>
.daheng-hero {
  width: 100%;
  aspect-ratio: 816 / 312;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  flex: none;
  display: block;

  &--small {
    aspect-ratio: 816 / 220;
  }
}
</style>
