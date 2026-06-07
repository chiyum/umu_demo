<script setup lang="ts">
import footerBg from "../../assets/desktop/footer-bg.png?url";

/**
 * honest-at 桌面版 footer — 參考 kingdom_front long/desktop/footer.vue
 *
 * 視覺骨架：上方 logo bg / 下方 .footer-link 三段（內部導覽 / 社群 icon / 版權）
 * 配色：原作 kingdom 藍 #0c4ea3，honest-at 沿用自家深藍 #050a1a + 青藍邊框
 */

const INSIDE_LINKS = ["常見問題", "新手教學", "公司資訊", "聯絡我們"];
</script>

<template>
  <footer class="honest-at-pc-footer">
    <img :src="footerBg" alt="" class="honest-at-pc-footer__logo-bg" />
    <div class="honest-at-pc-footer__link">
      <div class="honest-at-pc-footer__nav-inside">
        <p
          v-for="link in INSIDE_LINKS"
          :key="link"
          class="honest-at-pc-footer__nav-item"
        >
          {{ link }}
        </p>
      </div>
      <div class="honest-at-pc-footer__nav-outside">
        <a class="honest-at-pc-footer__social" aria-label="Instagram">
          <span>IG</span>
        </a>
        <a class="honest-at-pc-footer__social" aria-label="Facebook">
          <span>FB</span>
        </a>
      </div>
      <div class="honest-at-pc-footer__copyright">
        © {{ new Date().getFullYear() }} AT99 Demo Layout · All Rights Reserved
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
// 對齊 kingdom long/desktop/footer：兩段（上 logo bg / 下 link bar）
.honest-at-pc-footer {
  width: 100%;
  background: var(--footer-bg);
}

.honest-at-pc-footer__logo-bg {
  width: 100%;
  aspect-ratio: 192 / 31;
  object-fit: cover;
  opacity: 0.85;
}

.honest-at-pc-footer__link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 28px 0 24px;
  color: var(--text-on-primary);
  background-color: var(--honest-at-tab-bg);
  border-top: 1px solid var(--honest-at-neon-frame);
}

.honest-at-pc-footer__nav-inside {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  font-size: 16px;
}

.honest-at-pc-footer__nav-item {
  cursor: pointer;
  color: var(--footer-text);
  transition: color 0.15s ease;

  &:hover {
    color: var(--honest-at-neon-frame);
  }
}

.honest-at-pc-footer__nav-outside {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.honest-at-pc-footer__social {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: hsla(var(--primary-h), var(--primary-s), 60%, 0.15);
  border: 1px solid var(--honest-at-neon-frame);
  color: var(--honest-at-neon-frame);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: hsla(var(--primary-h), var(--primary-s), 60%, 0.32);
  }
}

.honest-at-pc-footer__copyright {
  font-size: 13px;
  color: var(--text-muted);
}
</style>
