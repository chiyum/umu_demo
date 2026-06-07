<script setup lang="ts">
import footerLogo from "../../assets/wu88/footer/icon_footerLogo5.png?url";

/**
 * honest-no6 桌面版 footer — 視覺結構參考 slime-wu88-pc widgets/layout/footer.vue
 *
 * 對應原作 DOM：
 *   .footer
 *     .under_list  ← 上方版權列：關於 | QA | 瀏覽器 | 版本 | 網站地圖
 *     .btmGuild    ← 中段下拉：6 大類 + 各廠商 + APP 下載
 *     .footer-footer ← 大 logo 收尾
 *
 * Demo 化：簡化為「上方連結列 + 下方大 logo」兩段，去掉複雜的展開選單
 */

const TOP_LINKS = ["關於我們", "常見問題", "適用瀏覽器", "v1.0.0", "網站地圖"];
const CATEGORY_LINKS = [
  "熱門 KU真人 KU體育",
  "真人 DG WM 歐博",
  "體育 IM BTI",
  "電子 BNG BT KU",
  "彩球 DBG DG"
];
</script>

<template>
  <footer class="honest-max-pc-footer">
    <div class="honest-max-pc-footer__top">
      <ul class="honest-max-pc-footer__links">
        <li
          v-for="(item, idx) in TOP_LINKS"
          :key="item"
          class="honest-max-pc-footer__link-item"
        >
          {{ item }}
          <span
            v-if="idx < TOP_LINKS.length - 1"
            class="honest-max-pc-footer__sep"
          >
            |
          </span>
        </li>
      </ul>
    </div>

    <div class="honest-max-pc-footer__categories">
      <div
        v-for="cat in CATEGORY_LINKS"
        :key="cat"
        class="honest-max-pc-footer__cat"
      >
        {{ cat }}
      </div>
    </div>

    <div class="honest-max-pc-footer__brand">
      <img
        :src="footerLogo"
        alt="88WIN"
        class="honest-max-pc-footer__brand-img"
      />
    </div>

    <div class="honest-max-pc-footer__copy">
      © {{ new Date().getFullYear() }} 88WIN Demo Layout · All Rights Reserved
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.honest-max-pc-footer {
  width: 100%;
  background: var(--footer-bg);
  padding: 28px 32px 24px;
  border-top: 1px solid hsla(var(--primary-h), var(--primary-s), 60%, 0.4);
}

.honest-max-pc-footer__top {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.honest-max-pc-footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.honest-max-pc-footer__link-item {
  color: var(--footer-text);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: var(--secondary-01);
  }
}

.honest-max-pc-footer__sep {
  margin-left: 8px;
  color: var(--text-muted);
  cursor: default;

  &:hover {
    color: var(--text-muted);
  }
}

.honest-max-pc-footer__categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 16px 0;
  margin-bottom: 16px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.honest-max-pc-footer__cat {
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;

  &:hover {
    color: var(--secondary-01);
  }
}

.honest-max-pc-footer__brand {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.honest-max-pc-footer__brand-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  opacity: 0.85;
}

.honest-max-pc-footer__copy {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
