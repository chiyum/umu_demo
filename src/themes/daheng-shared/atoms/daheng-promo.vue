<script setup lang="ts">
/**
 * 大亨 promo 區：左側獎盃圖 + 右側「週週優惠享不停」標題 + 立即查看 CTA
 *
 * 為什麼 promo img 用 trophy.png（替代原 promo_v2.png）：
 * - 使用者拍板：原稿 promo_v2.png 在素材夾不存在，獎盃延續「週週優惠」視覺意涵
 *
 * aspect-ratio 340/184 對齊原稿 .promo img CSS
 */
import { trophySrc } from "../_data";
</script>

<template>
  <div class="daheng-promo-wrap">
    <div class="daheng-promo">
      <img :src="trophySrc" alt="獎盃" class="daheng-promo__img" />
      <div class="daheng-promo__text">
        <h3 class="daheng-promo__title">週週優惠享不停</h3>
        <p class="daheng-promo__subtitle">超值回饋等你拿！</p>
        <button type="button" class="daheng-promo__btn">
          立即查看
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-promo-wrap {
  padding: 0 16px;
}

.daheng-promo {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(110deg, #fbe6d2, #f7dcbf);
  border-radius: 18px;
  padding: 14px 16px;
  box-shadow: var(--shadow);
  overflow: hidden;

  &__img {
    width: 138px;
    aspect-ratio: 340 / 184;
    height: auto;
    flex: none;
    border-radius: 12px;
    object-fit: cover;
  }

  &__text {
    flex: 1;
    text-align: right;
  }

  &__title {
    font-size: 23px;
    font-weight: 900;
    letter-spacing: 1px;
    margin: 0;
  }

  &__subtitle {
    font-size: 13px;
    font-weight: 500;
    color: #86705c;
    margin: 3px 0 10px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(180deg, #cf8a4f, #a85d2b);
    border: none;
    padding: 9px 18px;
    border-radius: 20px;
    box-shadow: 0 6px 12px -6px rgba(150, 80, 30, 0.6);
    cursor: pointer;
  }
}
</style>
