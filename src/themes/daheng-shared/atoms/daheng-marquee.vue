<script setup lang="ts">
/**
 * 大亨跑馬燈：喇叭 icon + 文字 + chev
 *
 * 為什麼跑馬燈文字寫死「公告跑馬燈示意公告跑馬燈示意公告跑馬燈示意公告跑馬燈示意」：
 * - 原稿 phones.js marquee() 內 <p> 內容寫死，demo 用途不接後端
 * - white-space:nowrap + overflow:hidden + text-overflow:ellipsis 達成「示意條」視覺
 */
</script>

<template>
  <div class="daheng-marquee">
    <span class="daheng-marquee__spk" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 9v6h3l5 4V5L7 9H4Z" fill="currentColor" />
        <path
          d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <p class="daheng-marquee__text">
      公告跑馬燈示意公告跑馬燈示意公告跑馬燈示意公告跑馬燈示意
    </p>
    <span class="daheng-marquee__chev" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
</template>

<style lang="scss" scoped>
.daheng-marquee {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: var(--shadow);

  &__spk {
    color: var(--color-primary);
    flex: none;
    display: flex;
  }

  &__text {
    flex: 1;
    font-size: 14.5px;
    font-weight: 500;
    color: #6a5a4c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  &__chev {
    color: #c2a98f;
    flex: none;
    display: flex;
  }
}
</style>
