<script setup lang="ts">
import { ref } from "vue";
import At99Button from "../atoms/at99-button.vue";
import LoginModal from "@/components/common/landing/login-modal.vue";
import at99Logo from "@/assets/themes/at99/images/logo.png";

/**
 * at99 頂部 header：大亨 ONLINE logo + 11 項 nav + 登入/開戶 + 音訊 toggle
 *
 * 設計：
 * - sticky 在頁面最頂，背景 bg-base-translucent
 * - logo 使用「大亨 ONLINE」品牌 PNG（src/assets/themes/at99/images/logo.png）
 * - 11 個 nav 項目，水平排列
 * - 右側登入（實心 cyan）+ 免費開戶（金色漸層）+ 音訊 toggle
 *
 * 為何用 PNG 取代原本的金色 monogram SVG：使用者提供自有品牌 logo，
 * 圖片本身已帶顏色與光感，不再需要 SVG monogram；以 img 標籤直接渲染
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

const navItems = [
  { key: "home", label: "首頁" },
  { key: "sport", label: "體育賽事" },
  { key: "lottery", label: "彩票遊戲" },
  { key: "live", label: "真人視訊" },
  { key: "slot", label: "電子遊戲" },
  { key: "fish", label: "捕魚達人" },
  { key: "chess", label: "棋牌遊戲" },
  { key: "esport", label: "電子競技" },
  { key: "vip", label: "VIP" },
  { key: "promo", label: "優惠活動" },
  { key: "reward", label: "領獎中心" }
];

const audioOn = ref(true);
const loginOpen = ref(false);
</script>

<template>
  <header class="at99-top" :class="{ 'at99-top--mobile': mobile }">
    <div class="at99-top__inner">
      <!-- 左：大亨 ONLINE 品牌 logo -->
      <a class="at99-top__brand" href="#" aria-label="DEMO 回首頁">
        <img :src="at99Logo" alt="DEMO" class="at99-top__brand-img" />
      </a>

      <!-- 中：11 nav（mobile 隱藏） -->
      <nav v-if="!mobile" class="at99-top__nav" aria-label="主導覽">
        <a
          v-for="item in navItems"
          :key="item.key"
          href="#"
          class="at99-top__nav-item"
          :class="{ 'at99-top__nav-item--active': item.key === 'home' }"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- 右：登入 / 開戶 / 音訊 -->
      <div class="at99-top__actions">
        <At99Button variant="primary" @click="loginOpen = true">
          登入
        </At99Button>
        <At99Button variant="gold" @click="loginOpen = true">
          免費開戶
        </At99Button>
        <button
          type="button"
          class="at99-top__audio"
          :class="{ 'at99-top__audio--on': audioOn }"
          :aria-label="audioOn ? '靜音' : '開啟音訊'"
          @click="audioOn = !audioOn"
        >
          <Icon
            :icon="
              audioOn
                ? 'material-symbols:volume-up-outline'
                : 'material-symbols:volume-off-outline'
            "
            class="at99-top__audio-icon"
          />
        </button>
      </div>
    </div>

    <LoginModal v-model="loginOpen" title="會員登入 / 開戶" />
  </header>
</template>

<style lang="scss" scoped>
.at99-top {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  // kingdom DNA：sticky header 帶雙層陰影（細線 + 軟光暈），主色 alpha 與 theme 一致
  box-shadow: var(--shadow-sticky);

  // 父層 .at99-layout 為 flex column container，flex item 預設 stretch 會在
  // Chromium 把 sticky 拉到 cross-axis 滿版尺寸，導致 sticky 失效（QA scrollY=1500
  // 時 rectTop=-1500 完全捲走）。顯式 align-self: flex-start + width: 100%
  // 維持原 stretch 視覺寬度但不參與 stretch 計算。
  align-self: flex-start;
  width: 100%;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    gap: 18px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  // 大亨 ONLINE logo（方形比例），PC header 高 40px
  &__brand-img {
    height: 40px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 4px;
    flex-wrap: wrap;
  }

  &__nav-item {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 10px;

    // kingdom DNA：nav item 走小圓角 (--radius-xs)
    border-radius: var(--radius-xs);
    transition: all var(--transition-fast);
    white-space: nowrap;

    &:hover {
      color: var(--color-primary);
      background: var(--bg-overlay);
      text-shadow: 0 0 6px var(--color-primary);
    }

    &--active {
      color: var(--color-primary);
      text-shadow: 0 0 6px var(--color-primary);

      &::after {
        content: "";
        display: block;
        margin: 4px auto 0;
        width: 16px;
        height: 2px;
        background: var(--color-primary);
        border-radius: 1px;
        box-shadow: var(--neon-glow);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__audio {
    width: 36px;
    height: 36px;

    // kingdom DNA：圓 icon 走 --radius-circle + var transition
    border-radius: var(--radius-circle);
    background: var(--bg-overlay);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);

    &--on {
      color: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  // audio toggle icon：currentColor 跟父層狀態色（off 灰、on 主色）
  &__audio-icon {
    width: 20px;
    height: 20px;
  }

  &--mobile {
    .at99-top__inner {
      padding: 8px 12px;
      gap: 10px;
    }

    .at99-top__brand-img {
      height: 32px;
    }

    .at99-top__actions :deep(.at99-btn) {
      padding: 6px 10px;
      font-size: 11px;
    }

    .at99-top__audio {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
