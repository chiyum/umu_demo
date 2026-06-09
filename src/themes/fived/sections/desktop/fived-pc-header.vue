<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * fived desktop 頂部 header
 *
 * 視覺結構 1:1 對齊 5d_v2 src/components/common/Header.vue：
 *   .header-wrap
 *     .header-nav
 *       ul
 *         <router-link to="/" class="header-logo" />
 *         .header-nav--box (6 主分類 li + 子選單 .header-sub)
 *         li.header-nav--login (.header-nav-loginBtn 圖按鈕)
 *
 * 6 大主分類順序、文案、子項完全對齊原作：
 *   儲值專區 / 最新公告 / 會員專區 / 新手教學 / 排行榜 / 客服中心
 *
 * scroll 行為：對齊原作 .header-wrap-scroll → 深酒紅 rgba(77, 14, 39, 0.9) 底
 *
 * BEM 本地化：
 *   header-wrap     → fived-pc-header
 *   header-nav      → fived-pc-header__nav
 *   header-logo     → fived-pc-header__logo
 *   header-nav--box → fived-pc-header__nav-box
 *   header-sub      → fived-pc-header__sub
 *   保留 is-active 作 modifier class
 *
 * Demo 化（保留結構不發 router-link、按鈕不打 API）：
 *   - 所有 router-link 改為 <a href="#" @click.prevent>
 *   - 主分類用 hover 觸發子選單（對齊原作 :hover .header-sub transform scaleY(1)）
 *   - 已登入分支省略（demo 沒登入流程，只保留會員登入按鈕）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

interface NavSection {
  key: string;
  label: string;
  children: string[];
}

// 對齊原作 6 大主選單與子項（順序、文案完全一致）
const sections: NavSection[] = [
  {
    key: "deposit",
    label: "儲值專區",
    children: ["線上購點", "超值禮包", "序號儲值", "禮包介紹"]
  },
  {
    key: "news",
    label: "最新公告",
    children: ["全部公告", "熱門活動", "促銷公告", "系統公告"]
  },
  {
    key: "member",
    label: "會員專區",
    children: ["個人資訊", "贈禮", "交易記錄", "大獎時刻"]
  },
  {
    key: "tutorial",
    label: "新手教學",
    children: ["遊戲說明", "介面操作", "VIP介紹", "等級介紹"]
  },
  {
    key: "ranking",
    label: "排行榜",
    children: ["富豪榜", "單局倍率榜", "彩金榜"]
  },
  {
    key: "support",
    label: "客服中心",
    children: ["意見回饋", "常見問題", "相關規範", "停權名單"]
  }
];

// 對齊原作 isScrolled
const isScrolled = ref<boolean>(false);
function handleScroll(): void {
  isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="fived-pc-header"
    :class="{ 'fived-pc-header--scroll': isScrolled }"
  >
    <div class="fived-pc-header__nav">
      <ul>
        <!-- logo（對齊原作 .header-logo） -->
        <li class="fived-pc-header__logo-li">
          <a
            href="#"
            class="fived-pc-header__logo"
            :aria-label="logoLabel"
            @click.prevent
          >
            <img
              :src="logoSrc"
              :alt="logoLabel"
              class="fived-pc-header__logo-img"
              :class="{ 'fived-pc-header__logo-img--blend': useScreenBlend }"
            />
          </a>
        </li>

        <!-- 6 主分類橫向排（對齊原作 .header-nav--box） -->
        <div class="fived-pc-header__nav-box">
          <li v-for="section in sections" :key="section.key">
            <a href="#" @click.prevent>{{ section.label }}</a>
            <div class="fived-pc-header__sub">
              <a
                v-for="child in section.children"
                :key="child"
                href="#"
                @click.prevent
              >
                {{ child }}
              </a>
            </div>
          </li>
        </div>

        <!-- 會員登入按鈕（對齊原作 .header-nav--login） -->
        <li class="fived-pc-header__login-li">
          <a
            href="#"
            class="fived-pc-header__login-btn"
            aria-label="會員登入"
            @click.prevent
          >
            <p>會員登入</p>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// header-wrap：對齊原作 sticky top:0 + 漸層底邊細線
.fived-pc-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  display: block;
  width: 100%;
  background: transparent;
  transition: background 0.3s ease;

  // 漸層細線（原作 ::after 灰白漸層）
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(48, 48, 48, 0.64) 0%,
      rgba(255, 255, 255, 0.16) 50%,
      rgba(28, 30, 28, 0.64) 100%
    );
    pointer-events: none;
  }

  // 滾動後深酒紅半透明（對齊原作 .header-wrap-scroll）
  &--scroll {
    background: rgba(77, 14, 39, 0.9);
    backdrop-filter: blur(8px);

    &::after {
      background: none;
    }
  }
}

// header-nav：對齊原作 ul flex 排列、height 86px
.fived-pc-header__nav {
  ul {
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    height: 86px;
    max-width: 1440px;
    list-style: none;
  }
}

// logo 容器（對齊原作 .header-logo 158px / padding 16px）
.fived-pc-header__logo-li {
  list-style: none;
  flex-shrink: 0;
}

.fived-pc-header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158px;
  padding: 16px;
  text-decoration: none;
}

.fived-pc-header__logo-img {
  width: auto;
  height: 44px;
  max-width: 100%;
  object-fit: contain;
  display: block;

  &--blend {
    mix-blend-mode: screen;
  }
}

// nav-box：對齊原作 6 主分類橫向 flex，max-width 1214px
.fived-pc-header__nav-box {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1214px;

  li {
    position: relative;
    cursor: pointer;
    list-style: none;

    // hover 黑底 50% 透 + 文字描邊
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    > a {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      width: 158px;
      height: 100%;
      color: var(--text-on-primary);
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 3px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    &:hover {
      &::before {
        opacity: 1;
      }

      > a {
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.5));
      }

      .fived-pc-header__sub {
        transform: scaleY(1);
      }
    }
  }
}

// 子選單下拉（對齊原作 .header-sub transform-origin: 50% 0 + scaleY 0→1）
.fived-pc-header__sub {
  position: absolute;
  top: 85px;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  background: rgba(56, 29, 42, 0.88);
  transform: scaleY(0);
  transform-origin: 50% 0;
  transition: transform 0.3s ease;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--text-muted, #a67c8b);
    font-size: 18px;
    letter-spacing: 4px;
    text-align: center;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-03, #ffdaa4);
    }
  }
}

// 右側登入按鈕（對齊原作 .header-nav--login + .header-nav-loginBtn 金漸層底）
.fived-pc-header__login-li {
  margin-left: auto;
  list-style: none;
  flex-shrink: 0;
}

.fived-pc-header__login-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 49px;
  margin-right: 16px;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 4px;
  box-shadow:
    0 4px 12px rgba(226, 189, 135, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition:
    filter 0.18s ease,
    transform 0.15s ease;

  p {
    margin: 0;
    padding: 0;
    letter-spacing: 2px;
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.97);
  }
}

// 對齊原作 d1280 隱藏（手機版另有 mobile-header）
@media (max-width: 1280px) {
  .fived-pc-header {
    display: none;
  }
}
</style>
