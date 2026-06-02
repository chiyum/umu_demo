<script setup lang="ts">
/**
 * noya footer：版權 + 社群連結 + 客服資訊
 */
interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

const links = [
  { label: "關於 NOYA", href: "#" },
  { label: "服務條款", href: "#" },
  { label: "隱私政策", href: "#" },
  { label: "客服中心", href: "#" }
];

const socials = ["IG", "FB", "LINE", "TG"];
</script>

<template>
  <footer class="noya-footer" :class="{ 'noya-footer--mobile': mobile }">
    <div class="noya-footer__inner">
      <div class="noya-footer__brand">
        <div class="noya-footer__logo">N</div>
        <div>
          <div class="noya-footer__brand-name">NOYA</div>
          <div class="noya-footer__brand-sub">優雅真人娛樂</div>
        </div>
      </div>
      <nav class="noya-footer__nav">
        <a v-for="l in links" :key="l.label" :href="l.href">
          {{ l.label }}
        </a>
      </nav>
      <div class="noya-footer__socials">
        <a v-for="s in socials" :key="s" href="#" class="noya-footer__social">
          {{ s }}
        </a>
      </div>
    </div>
    <div class="noya-footer__copy">© 2025 NOYA. 本站僅供娛樂示範用途</div>
  </footer>
</template>

<style lang="scss" scoped>
.noya-footer {
  background: var(--text-primary);
  color: rgba(255, 255, 255, 0.8);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px 24px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 32px;
    align-items: center;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__logo {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--color-primary);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 22px;
  }

  &__brand-name {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--color-accent);
    letter-spacing: 2px;
  }

  &__brand-sub {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.55);
  }

  &__nav {
    display: flex;
    gap: 24px;
    justify-content: center;

    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 14px;

      &:hover {
        color: var(--color-accent);
      }
    }
  }

  &__socials {
    display: flex;
    gap: 8px;
  }

  &__social {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 11px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: #ffffff;
    }
  }

  &__copy {
    text-align: center;
    padding: 16px 24px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  &--mobile {
    .noya-footer__inner {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 20px;
      padding: 32px 16px 16px;
    }

    .noya-footer__brand {
      justify-content: center;
    }

    .noya-footer__nav {
      flex-wrap: wrap;
      gap: 14px;
    }

    .noya-footer__socials {
      justify-content: center;
    }
  }
}
</style>
