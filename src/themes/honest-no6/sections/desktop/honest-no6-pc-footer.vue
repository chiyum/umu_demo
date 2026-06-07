<script setup lang="ts">
import footerBg from "../../assets/desktop/footer-bg.png?url";

const INSIDE_LINKS = [
  "關於 FG",
  "服務條款",
  "VIP 福利",
  "綁定教學",
  "聯絡客服"
];
</script>

<template>
  <footer class="honest-no6-pc-footer">
    <img :src="footerBg" alt="" class="honest-no6-pc-footer__logo-bg" />
    <div class="honest-no6-pc-footer__link">
      <div class="honest-no6-pc-footer__nav-inside">
        <p
          v-for="link in INSIDE_LINKS"
          :key="link"
          class="honest-no6-pc-footer__nav-item"
        >
          {{ link }}
        </p>
      </div>
      <div class="honest-no6-pc-footer__nav-outside">
        <a class="honest-no6-pc-footer__social" aria-label="Instagram">
          <span>IG</span>
        </a>
        <a class="honest-no6-pc-footer__social" aria-label="Facebook">
          <span>FB</span>
        </a>
      </div>
      <div class="honest-no6-pc-footer__copyright">
        © {{ new Date().getFullYear() }} FG Demo Layout · All Rights Reserved
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.honest-no6-pc-footer {
  width: 100%;
  background: var(--footer-bg);
}

.honest-no6-pc-footer__logo-bg {
  width: 100%;
  aspect-ratio: 192 / 31;
  object-fit: cover;
  opacity: 0.7;
  filter: hue-rotate(280deg);
}

.honest-no6-pc-footer__link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 28px 0 24px;
  color: var(--text-on-primary);
  background: linear-gradient(
    180deg,
    var(--bg-surface) 0%,
    var(--bg-base-deep) 100%
  );
  border-top: 1px solid hsla(var(--primary-h), var(--primary-s), 60%, 0.4);
}

.honest-no6-pc-footer__nav-inside {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  font-size: 16px;
}

.honest-no6-pc-footer__nav-item {
  cursor: pointer;
  color: var(--footer-text);
  transition: color 0.15s ease;

  &:hover {
    color: var(--secondary-01);
  }
}

.honest-no6-pc-footer__nav-outside {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.honest-no6-pc-footer__social {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: hsla(var(--primary-h), var(--primary-s), 60%, 0.18);
  border: 1px solid var(--primary-01);
  color: var(--secondary-01);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: hsla(var(--primary-h), var(--primary-s), 60%, 0.35);
  }
}

.honest-no6-pc-footer__copyright {
  font-size: 13px;
  color: var(--text-muted);
}
</style>
