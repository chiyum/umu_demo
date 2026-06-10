<script setup lang="ts">
/**
 * daheng-magazine mobile masonry：2 欄 6 張磚牆瀑布流（v6 對齊）
 *
 * 對應 phones.js v6 masonry 部分：
 *   <div class="masonry">
 *     <div class="gcard tall"><img src="g4.png"></div>
 *     <div class="gcard shortc"><img src="g2.png"></div>
 *     <div class="gcard shortc"><img src="g3.png"></div>
 *     <div class="gcard tall"><img src="g5.png"></div>
 *     <div class="gcard tall"><img src="g1.png"></div>
 *     <div class="gcard shortc"><img src="g6.png"></div>
 *   </div>
 *
 * tall = aspect-ratio 3/4 / shortc = aspect-ratio 4/3
 * 用 CSS column-count:2 + break-inside:avoid 達成磚牆效果
 */
import { computed } from "vue";
import { DAHENG_GAMES } from "../../daheng-shared/_data";

// GAMES 索引：g1=0, g2=1, g3=2, g4=3, g5=4, g6=5
const masonryItems = computed(() => [
  { img: DAHENG_GAMES[3].img, alt: DAHENG_GAMES[3].name, kind: "tall" },
  { img: DAHENG_GAMES[1].img, alt: DAHENG_GAMES[1].name, kind: "shortc" },
  { img: DAHENG_GAMES[2].img, alt: DAHENG_GAMES[2].name, kind: "shortc" },
  { img: DAHENG_GAMES[4].img, alt: DAHENG_GAMES[4].name, kind: "tall" },
  { img: DAHENG_GAMES[0].img, alt: DAHENG_GAMES[0].name, kind: "tall" },
  { img: DAHENG_GAMES[5].img, alt: DAHENG_GAMES[5].name, kind: "shortc" }
]);
</script>

<template>
  <div class="daheng-magazine-masonry">
    <div
      v-for="(item, i) in masonryItems"
      :key="`${item.alt}-${i}`"
      class="daheng-magazine-masonry__gcard"
      :class="`daheng-magazine-masonry__gcard--${item.kind}`"
    >
      <img :src="item.img" :alt="item.alt" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-magazine-masonry {
  margin-top: 13px;
  columns: 2;
  column-gap: 13px;

  &__gcard {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);
    box-shadow: var(--shadow);
    margin-bottom: 13px;
    break-inside: avoid;
    width: 100%;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    &--tall img {
      aspect-ratio: 3 / 4;
      object-fit: cover;
    }

    &--shortc img {
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  }
}
</style>
