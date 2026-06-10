<script setup lang="ts">
/**
 * daheng-compact mobile：3 欄 3 列 9 張 tcard（v4 對齊）
 *
 * 對應 phones.js v4：
 *   const v4set=[...GAMES,GAMES[0],GAMES[3],GAMES[2]];
 *   <div class="grid3">{9 個 tcard}</div>
 *   .tcard{display:flex;flex-direction:column;gap:6px}
 *   .tcard .gcard{height:96px}
 *   .tcard b{font-size:12.5px;font-weight:700;text-align:center}
 */
import { computed } from "vue";
import { DAHENG_GAMES } from "../../daheng-shared/_data";

// 對應原稿 v4set：6 個 GAMES + 補 3 個（g1 / g4 / g3）= 9 張
const v4Set = computed(() => [
  ...DAHENG_GAMES,
  DAHENG_GAMES[0],
  DAHENG_GAMES[3],
  DAHENG_GAMES[2]
]);
</script>

<template>
  <div class="daheng-compact-mobile-grid3">
    <div
      v-for="(g, i) in v4Set"
      :key="`${g.key}-${i}`"
      class="daheng-compact-mobile-grid3__tcard"
    >
      <div class="daheng-compact-mobile-grid3__gcard">
        <img :src="g.img" :alt="g.name" />
      </div>
      <b>{{ g.name }}</b>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-compact-mobile-grid3 {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  &__tcard {
    display: flex;
    flex-direction: column;
    gap: 6px;

    b {
      font-size: 12.5px;
      font-weight: 700;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__gcard {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);
    box-shadow: var(--shadow);
    height: 96px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
