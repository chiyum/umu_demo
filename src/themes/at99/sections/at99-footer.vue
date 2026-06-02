<script setup lang="ts">
// 真實素材：at99 官方 logo（與 header 共用同檔）
import at99Logo from "@/assets/themes/at99/images/logos/at99-logo.png";

interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const links = [
  { label: "關於 AT99", href: "#" },
  { label: "服務條款", href: "#" },
  { label: "隱私政策", href: "#" },
  { label: "聯絡客服", href: "#" }
];
</script>

<template>
  <footer class="at99-footer" :class="{ 'at99-footer--mobile': mobile }">
    <div class="at99-footer__inner">
      <div class="at99-footer__left">
        <img class="at99-footer__logo" :src="at99Logo" alt="AT99" />
        <p class="at99-footer__desc">
          AT99 娛樂城，提供最完整的遊戲體驗，本網站僅供娛樂展示用途。
        </p>
      </div>
      <nav class="at99-footer__nav">
        <a v-for="l in links" :key="l.label" :href="l.href">
          {{ l.label }}
        </a>
      </nav>
    </div>
    <div class="at99-footer__copy">© 2025 AT99 Demo. All rights reserved.</div>
  </footer>
</template>

<style lang="scss" scoped>
.at99-footer {
  background: var(--bg-base-deep);
  color: var(--text-muted);
  border-top: 1px solid var(--border);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: flex-start;
  }

  &__logo {
    display: block;
    height: 40px;
    width: auto;
  }

  &__desc {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 1.6;
    max-width: 360px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: right;

    a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.15s ease;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__copy {
    text-align: center;
    padding: 12px 24px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 11px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  &--mobile {
    .at99-footer__inner {
      grid-template-columns: 1fr;
      padding: 24px 14px 14px;
    }

    .at99-footer__nav {
      flex-flow: row wrap;
      gap: 14px;
      text-align: left;
    }
  }
}
</style>
