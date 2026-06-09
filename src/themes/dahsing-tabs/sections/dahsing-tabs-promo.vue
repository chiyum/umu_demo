<script setup lang="ts">
/**
 * dahsing-tabs VIP 條（皇冠 icon + 文字 + chev）
 *
 * 1:1 對齊原稿 .promo：
 * - 左側 30×30 漸層方塊 + 皇冠 icon
 * - 中間 b（VIP 專屬回饋）+ small（每日簽到領彩金）
 * - 右側 chev
 */
import DahsingIcon from "../../dahsing-shared/atoms/dahsing-icon.vue";
</script>

<template>
  <div class="dahsing-tabs-promo">
    <div class="dahsing-tabs-promo__pic">
      <DahsingIcon name="premium" size="15px" />
    </div>
    <div class="dahsing-tabs-promo__text">
      <b>VIP 專屬回饋</b>
      <small>每日簽到領彩金</small>
    </div>
    <DahsingIcon
      name="chevron-right"
      size="13px"
      class="dahsing-tabs-promo__chev"
    />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-tabs-promo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding: 11px 14px;
  background: var(--gradient-hero);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);

  &__pic {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border-radius: 9px;
    box-shadow: var(--shadow);
  }

  &__text {
    flex: 1;
    min-width: 0;

    b {
      display: block;
      color: var(--text-primary);
      font-size: 13px;
      font-weight: 900;
    }

    small {
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
    }
  }

  &__chev {
    color: var(--text-muted);
  }
}
</style>
