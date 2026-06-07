<script setup lang="ts">
import footerLogo from "../../assets/desktop/footer_logo.png?url";

/**
 * at99 桌面版 footer — 視覺結構參考 slime-at99 desktop layout/footer.vue
 *
 * 原作 DOM：
 *   <footer.footer>
 *     <img.footer-img />  ← footer_logo.png
 *     <ul.footer-nav>
 *       <li v-for> 關於 / 聯絡 / 遊戲幫助 / 責任博彩
 *     <p.footer-text>Copyright© 2023 AT99 All Rights Reserved
 */

const NAV_ITEMS = ["關於我們", "聯絡我們", "遊戲幫助", "責任博彩"];
</script>

<template>
  <footer class="at99-pc-footer">
    <img :src="footerLogo" alt="AT99" class="at99-pc-footer__logo" />
    <ul class="at99-pc-footer__nav">
      <li
        v-for="(item, idx) in NAV_ITEMS"
        :key="item"
        class="at99-pc-footer__nav-item"
        :class="{ 'at99-pc-footer__nav-item--border': idx > 0 }"
      >
        <a href="#">{{ item }}</a>
      </li>
    </ul>
    <p class="at99-pc-footer__copy">
      Copyright © {{ new Date().getFullYear() }} AT99 Demo Layout · All Rights
      Reserved
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.at99-pc-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 24px 24px;
  background: var(--bg-base-deep);
  border-top: 1px solid var(--border);
}

.at99-pc-footer__logo {
  height: 42px;
  width: auto;
  object-fit: contain;
}

.at99-pc-footer__nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.at99-pc-footer__nav-item {
  position: relative;
  padding: 0 12px;

  &--border::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 14px;
    background: var(--border);
  }

  a {
    color: var(--text-muted);
    font-size: 14px;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-primary);
    }
  }
}

.at99-pc-footer__copy {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
