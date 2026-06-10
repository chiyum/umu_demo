<script setup lang="ts">
/**
 * daheng-rail mobile：3 條橫向滑軌（v3 對齊）
 *
 * 對應 phones.js v3：
 *   railwrap × 3：熱門推薦🔥 4 張 / 真人 LIVE 3 張 / 電子 SLOTS 3 張
 *
 * 為什麼 rail 寫死 padding 0 16px：原稿 .rail{padding:4px 16px 6px}
 * 為什麼卡片寬度寫死 208px：原稿 .rail .gcard{flex:none;width:208px;height:132px}
 */
import { computed } from "vue";
import { DAHENG_GAMES } from "../../daheng-shared/_data";

const rails = computed(() => [
  {
    title: "熱門推薦",
    hot: true,
    games: [DAHENG_GAMES[0], DAHENG_GAMES[3], DAHENG_GAMES[2], DAHENG_GAMES[1]]
  },
  {
    title: "真人 LIVE",
    hot: false,
    games: [DAHENG_GAMES[0], DAHENG_GAMES[3], DAHENG_GAMES[5]]
  },
  {
    title: "電子 SLOTS",
    hot: false,
    games: [DAHENG_GAMES[2], DAHENG_GAMES[4], DAHENG_GAMES[1]]
  }
]);
</script>

<template>
  <div
    v-for="rail in rails"
    :key="rail.title"
    class="daheng-rail-mobile-rails__wrap"
  >
    <header class="daheng-rail-mobile-rails__sec">
      <h2 class="daheng-rail-mobile-rails__title">
        <svg
          v-if="rail.hot"
          class="daheng-rail-mobile-rails__flame"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 2c1 3-1 4-2 6-1 1.7-3 3-3 6a5 5 0 0 0 10 0c0-2-1-3-1-4 1 .4 2 1.2 2 2 .8-1 1-2 1-3 0-3-3-5-3-8-1.5 1-2 2.5-2 3 0-2-1-3-2-4Z"
            fill="#e8642a"
          />
        </svg>
        {{ rail.title }}
      </h2>
      <span class="daheng-rail-mobile-rails__more">
        更多
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </header>
    <div class="daheng-rail-mobile-rails__rail">
      <div
        v-for="(g, i) in rail.games"
        :key="`${g.key}-${i}`"
        class="daheng-rail-mobile-rails__card"
      >
        <img :src="g.img" :alt="g.name" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-rail-mobile-rails {
  &__wrap {
    margin-top: 4px;
  }

  &__sec {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }

  &__title {
    font-size: 19px;
    font-weight: 900;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
  }

  &__flame {
    width: 20px;
    height: 20px;
  }

  &__more {
    font-size: 13px;
    font-weight: 700;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__rail {
    margin-top: 12px;
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 4px 16px 6px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__card {
    flex: none;
    width: 208px;
    height: 132px;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
