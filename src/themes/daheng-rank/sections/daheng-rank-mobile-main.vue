<script setup lang="ts">
/**
 * daheng-rank mobile 主內容：左排行榜（5 名+查看全部）+ 右 2 欄遊戲縮圖
 *
 * 對應 phones.js v1：
 *   <div class="main">
 *     <div class="ranklist">{5 個 rank row + .seeall}</div>
 *     <div class="grid2">{6 個 gcard}</div>
 *   </div>
 *
 * 為什麼 ranklist 寬度寫死 124px：原稿 .ranklist{width:124px;flex:none}
 * 為什麼 grid2 卡片高度寫死 127px：原稿 .grid2 .gcard{height:127px}
 */
import { DAHENG_GAMES, DAHENG_RANKS } from "../../daheng-shared/_data";
</script>

<template>
  <div class="daheng-rank-main">
    <div class="daheng-rank-main__ranklist">
      <div v-for="r in DAHENG_RANKS" :key="r.n" class="daheng-rank-main__rank">
        <div class="daheng-rank-main__num">{{ r.n }}</div>
        <div class="daheng-rank-main__txt">
          <b>{{ r.name }}</b>
          <small>{{ r.en }}</small>
        </div>
        <span class="daheng-rank-main__chev" aria-hidden="true">
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
      </div>
      <div class="daheng-rank-main__seeall">
        查看全部遊戲
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="daheng-rank-main__grid">
      <div
        v-for="g in DAHENG_GAMES"
        :key="g.key"
        class="daheng-rank-main__gcard"
      >
        <img :src="g.img" :alt="g.name" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-rank-main {
  margin-top: 16px;
  display: flex;
  gap: 9px;
  align-items: flex-start;

  &__ranklist {
    width: 124px;
    flex: none;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    padding: 4px 9px 12px;
    box-shadow: var(--shadow);
  }

  &__rank {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    position: relative;

    &:last-of-type {
      border-bottom: none;
    }
  }

  &__num {
    font-style: italic;
    font-weight: 900;
    font-size: 18px;
    color: var(--color-accent);
    flex: none;
    width: 18px;
    line-height: 1;
    -webkit-text-stroke: 0.4px rgba(180, 130, 60, 0.35);
  }

  &__txt {
    flex: 1;
    min-width: 0;

    b {
      display: block;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;
    }

    small {
      display: block;
      font-style: italic;
      font-weight: 700;
      font-size: 8px;
      color: #c4a68c;
      white-space: nowrap;
    }
  }

  &__chev {
    color: #cbb094;
    flex: none;
    display: flex;
  }

  &__seeall {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-primary);
    background: #ffffff;
    border: 1.5px solid #e7c9a8;
    border-radius: 20px;
    padding: 9px 4px;
    cursor: pointer;
  }

  &__grid {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 11px;
  }

  &__gcard {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);
    box-shadow: var(--shadow);
    height: 127px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
