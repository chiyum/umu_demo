<script setup lang="ts">
/**
 * at-deluxe desktop 底部 footer
 *
 * 精簡版：品牌 + 多語列 + 版權，與其它 theme footer 設計語言一致（單行精簡）
 * 對齊 slime-at99 視覺：深藍底 + 青藍細線 + 灰藍字
 */
const LANGUAGES = ["繁體中文", "简体中文", "ENGLISH", "TIẾNG VIỆT", "ภาษาไทย"];
const LINKS = ["關於我們", "服務條款", "隱私政策", "負責任博弈", "聯絡客服"];
</script>

<template>
  <footer class="at-deluxe-pc-footer">
    <div class="at-deluxe-pc-footer__inner">
      <nav class="at-deluxe-pc-footer__links" aria-label="網站連結">
        <a
          v-for="l in LINKS"
          :key="l"
          href="#"
          class="at-deluxe-pc-footer__link"
        >
          {{ l }}
        </a>
      </nav>
      <div class="at-deluxe-pc-footer__divider" />
      <div class="at-deluxe-pc-footer__row">
        <div class="at-deluxe-pc-footer__langs">
          <button
            v-for="l in LANGUAGES"
            :key="l"
            type="button"
            class="at-deluxe-pc-footer__lang"
          >
            {{ l }}
          </button>
        </div>
        <p class="at-deluxe-pc-footer__copy">
          © 2026 AT Deluxe Demo · 本站僅為版型展示用途
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.at-deluxe-pc-footer {
  background: var(--footer-bg);
  border-top: 1px solid var(--border);
  padding: 24px 0;
}

.at-deluxe-pc-footer__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 16px;
}

.at-deluxe-pc-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding-bottom: 16px;
}

.at-deluxe-pc-footer__link {
  color: var(--footer-text);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover {
    color: var(--primary-01);
  }
}

.at-deluxe-pc-footer__divider {
  height: 1px;
  background: var(--at-deluxe-marquee-line);
  margin: 8px 0 16px;
}

.at-deluxe-pc-footer__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.at-deluxe-pc-footer__langs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.at-deluxe-pc-footer__lang {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--footer-text);
  background: transparent;
  border: 1px solid var(--at-deluxe-card-border);
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.18s ease;

  &:hover {
    color: var(--primary-01);
    border-color: var(--primary-01);
  }
}

.at-deluxe-pc-footer__copy {
  margin: 0;
  font-size: 12px;
  color: var(--footer-text);
}
</style>
