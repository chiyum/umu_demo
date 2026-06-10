<script setup lang="ts">
/**
 * daheng-list mobile：6 列 glist 清單榜單（v5 對齊）
 *
 * 對應 phones.js v5：
 *   <div class="glist">{6 個 grow}</div>
 *   .grow{display:flex;align-items:center;gap:13px;background:rgba(255,255,255,.6);
 *         border-radius:16px;padding:10px 12px}
 *   .grow .rk{font-size:22px;color:var(--gold);width:26px}
 *   .grow .thumb{width:70px;height:70px;border-radius:13px}
 *   .grow .go{進入按鈕}
 *
 * 編號 padStart(2, '0')：01 / 02 / 03 ...
 */
import { DAHENG_GAMES } from "../../daheng-shared/_data";
</script>

<template>
  <div class="daheng-list-mobile-list">
    <div
      v-for="(g, i) in DAHENG_GAMES"
      :key="g.key"
      class="daheng-list-mobile-list__row"
    >
      <div class="daheng-list-mobile-list__rk">
        {{ String(i + 1).padStart(2, "0") }}
      </div>
      <div class="daheng-list-mobile-list__thumb">
        <img :src="g.img" :alt="g.name" />
      </div>
      <div class="daheng-list-mobile-list__meta">
        <b>{{ g.name }}</b>
        <small>{{ g.en }}</small>
      </div>
      <button type="button" class="daheng-list-mobile-list__go">進入</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daheng-list-mobile-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 11px;

  &__row {
    display: flex;
    align-items: center;
    gap: 13px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16px;
    padding: 10px 12px;
    box-shadow: var(--shadow);
  }

  &__rk {
    font-style: italic;
    font-weight: 900;
    font-size: 22px;
    color: var(--color-accent);
    width: 26px;
    text-align: center;
    flex: none;
    -webkit-text-stroke: 0.5px rgba(180, 130, 60, 0.35);
  }

  &__thumb {
    width: 70px;
    height: 70px;
    border-radius: 13px;
    overflow: hidden;
    flex: none;
    background: #f3e3cf;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 78% 35%;
      display: block;
    }
  }

  &__meta {
    flex: 1;
    min-width: 0;

    b {
      display: block;
      font-size: 16px;
      font-weight: 700;
    }

    small {
      display: block;
      font-style: italic;
      font-weight: 700;
      font-size: 11px;
      color: #c4a68c;
      letter-spacing: 0.4px;
    }
  }

  &__go {
    flex: none;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(180deg, #cf8a4f, #a85d2b);
    border: none;
    padding: 9px 16px;
    border-radius: 18px;
    box-shadow: 0 6px 12px -6px rgba(150, 80, 30, 0.6);
    cursor: pointer;
  }
}
</style>
