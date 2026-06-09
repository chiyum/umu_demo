<script setup lang="ts">
/**
 * dahsing 共用「彩票 6 / 電子 777 / 棋牌 cards」三種特殊 mini icon
 *
 * 為什麼抽出獨立元件：原稿 sidebar 內這三個 icon 是「純 CSS / 純文字」做的（不是字型圖示），
 * sidebar 內邏輯反覆 v-if 切會混亂；獨立 atom 讓 sidebar 元件只負責 layout。
 *
 * kind = 'cards' 是棋牌：原稿用 .mi-cards 內兩個 b 元素疊出兩張撲克的造型；
 * 這裡用 ::before/::after 等價實作，sidebar 不必再放兩個 b 標籤。
 */
defineProps<{
  kind: "lotto" | "slot" | "cards";
}>();
</script>

<template>
  <span
    class="dahsing-mini-icon"
    :class="`dahsing-mini-icon--${kind}`"
    aria-hidden="true"
  >
    <template v-if="kind === 'lotto'">6</template>
    <template v-else-if="kind === 'slot'">777</template>
  </span>
</template>

<style lang="scss" scoped>
.dahsing-mini-icon {
  display: grid;
  place-items: center;
  font-weight: 900;
  line-height: 1;
  color: currentcolor;

  &--lotto {
    font-size: 15px;
  }

  &--slot {
    font-size: 11px;
    letter-spacing: -1px;
  }

  // 棋牌：兩張疊牌造型，用 ::before/::after 畫出
  &--cards {
    position: relative;
    width: 20px;
    height: 20px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 11px;
      height: 15px;
      background: currentcolor;
      border-radius: 2px;
    }

    &::before {
      left: 0;
      top: 3px;
      transform: rotate(-12deg);
      opacity: 0.55;
    }

    &::after {
      right: 0;
      top: 1px;
      transform: rotate(10deg);
    }
  }
}
</style>
