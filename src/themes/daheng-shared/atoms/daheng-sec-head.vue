<script setup lang="ts">
/**
 * 大亨段落標題：「XX🔥」+ 「更多 >」
 *
 * hot prop：true 時標題前帶火焰 icon（原稿橘色 fill #e8642a）
 */
defineProps<{
  title: string;
  hot?: boolean;
}>();
</script>

<template>
  <div class="daheng-sec-head">
    <h2 class="daheng-sec-head__title">
      <svg
        v-if="hot"
        class="daheng-sec-head__flame"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2c1 3-1 4-2 6-1 1.7-3 3-3 6a5 5 0 0 0 10 0c0-2-1-3-1-4 1 .4 2 1.2 2 2 .8-1 1-2 1-3 0-3-3-5-3-8-1.5 1-2 2.5-2 3 0-2-1-3-2-4Z"
          fill="#e8642a"
        />
      </svg>
      {{ title }}
    </h2>
    <span class="daheng-sec-head__more">
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
  </div>
</template>

<style lang="scss" scoped>
.daheng-sec-head {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;

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
}
</style>
