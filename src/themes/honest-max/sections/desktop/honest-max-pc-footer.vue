<script setup lang="ts">
import footerBg from "../../assets/desktop/footer-bg.png?url";

/**
 * honest-max 桌面版 footer — 對齊 kingdom long footer
 * 配色：max 桃粉天藍主題色
 */

const INSIDE_LINKS = ["常見問題", "新手教學", "公司資訊", "聯絡我們"];
</script>

<template>
  <footer class="honest-max-pc-footer">
    <img :src="footerBg" alt="" class="honest-max-pc-footer__logo-bg" />
    <div class="honest-max-pc-footer__link">
      <div class="honest-max-pc-footer__nav-inside">
        <p
          v-for="link in INSIDE_LINKS"
          :key="link"
          class="honest-max-pc-footer__nav-item"
        >
          {{ link }}
        </p>
      </div>
      <div class="honest-max-pc-footer__nav-outside">
        <a class="honest-max-pc-footer__social" aria-label="Instagram">
          <span>IG</span>
        </a>
        <a class="honest-max-pc-footer__social" aria-label="Facebook">
          <span>FB</span>
        </a>
      </div>
      <div class="honest-max-pc-footer__copyright">
        © {{ new Date().getFullYear() }} 88WIN Demo Layout · All Rights
        Reserved
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.honest-max-pc-footer {
  width: 100%;
  background: var(--bg-surface);
}

.honest-max-pc-footer__logo-bg {
  width: 100%;
  aspect-ratio: 192 / 31;
  object-fit: cover;
  opacity: 0.8;
}

.honest-max-pc-footer__link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 28px 0 24px;
  color: var(--text-on-primary);
  background: linear-gradient(
    90deg,
    var(--primary-01) 0%,
    var(--secondary-01) 100%
  );
}

.honest-max-pc-footer__nav-inside {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  font-size: 16px;
}

.honest-max-pc-footer__nav-item {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.15s ease;

  &:hover {
    color: #ffffff;
  }
}

.honest-max-pc-footer__nav-outside {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.honest-max-pc-footer__social {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
}

.honest-max-pc-footer__copyright {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
}
</style>
