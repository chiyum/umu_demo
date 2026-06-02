<script setup lang="ts">
/**
 * at99 關於平台介紹
 *
 * 設計：
 * - 標題 + 多段落內容，左側可選裝飾元素
 * - 文字完全通用（不抄原站文案）
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

const paragraphs = [
  "本站為前端版面 Demo，所有內容、文案、人物均為通用範例，不對應任何真實娛樂城。",
  "我們示範了從導覽列、跑馬燈、主視覺輪播、遊戲分類網格、電競賽事、真人館別、排行榜，到完整 Footer 結構的多層次版面組合。",
  "藉由本 demo，使用者可以即時切換版面骨架（noya / at99）與配色變體（深藍霓虹、霓虹紫、霓虹綠等），體驗同一份結構下不同色調的視覺呈現。"
];
</script>

<template>
  <section class="at99-about" :class="{ 'at99-about--mobile': mobile }">
    <div class="at99-about__inner">
      <div class="at99-about__copy">
        <h2 class="at99-about__heading">關於本平台</h2>
        <p v-for="(p, i) in paragraphs" :key="i" class="at99-about__paragraph">
          {{ p }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-about {
  background: var(--bg-base);
  padding: 30px 0;
  padding-left: var(--dock-offset);
  border-top: 1px solid var(--border);

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__heading {
    font-size: 18px;
    font-weight: 800;
    color: var(--color-primary);
    text-shadow: var(--neon-glow);
    margin: 0 0 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__paragraph {
    font-size: 12px;
    line-height: 1.8;
    color: var(--text-muted);
    margin: 0 0 8px;
  }

  &--mobile {
    padding-left: 0;
    padding: 18px 0;

    .at99-about__inner {
      padding: 0 16px;
    }
  }
}
</style>
