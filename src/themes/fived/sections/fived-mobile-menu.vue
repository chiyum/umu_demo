<script setup lang="ts">
import { computed, ref } from "vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

/**
 * fived mobile 抽屜選單
 *
 * 視覺結構 1:1 對齊 5d_v2 src/components/layout/MobileMenu.vue：
 *   .menu-wrap
 *     .menu-main
 *       .menu-overflow
 *         .menu-list ul
 *           li 首頁 (logo)
 *           li 儲值專區 (toggle → 4 sub)
 *           li 最新公告 (toggle → 4 sub)
 *           li 會員專區 (toggle → 4 sub)
 *           li 新手教學 (toggle → 4 sub)
 *           li 排行榜   (toggle → 3 sub)
 *           li 客服中心 (toggle → 4 sub)
 *         .menu-bottom (logo + 6 社群圖 + 版權)
 *       .menu-close
 *     .menu-mask
 *
 * BEM 本地化（命名公約）：
 *   menu-wrap → fived-m-menu
 *   menu-main → fived-m-menu__main
 *   menu-list → fived-m-menu__list
 *   menu-sub  → fived-m-menu__sub
 *   menu-bottom → fived-m-menu__bottom
 *   is-active / is-toggle 維持作為 modifier 直接用 class
 *
 * Demo 化（保留結構不發 router-link、按鈕點擊不打 API）：
 *   - 所有 router-link 改為 <a href="#" @click.prevent>
 *   - 社群圖示用純 CSS 圖示符號（不引外部 PNG）
 */
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);
const useScreenBlend = computed(
  () => themeStore.currentLogo.transparentBg !== true
);

defineProps<{
  isActive: boolean;
}>();
const emit = defineEmits<{
  (e: "toggleMenu"): void;
}>();

// 對齊原作 activeMenu / toggleSubMenu 邏輯：點一次展開，再點折疊
const activeKey = ref<string | null>(null);
function toggleSection(key: string): void {
  activeKey.value = activeKey.value === key ? null : key;
}

interface NavSection {
  key: string;
  label: string;
  children: string[];
}

// 對齊原作 6 大選單與子項（順序、文案完全一致）
const sections: NavSection[] = [
  {
    key: "deposit",
    label: "儲值專區",
    children: ["線上購點", "超值禮包", "序號儲值", "禮包介紹"]
  },
  {
    key: "news",
    label: "最新公告",
    children: ["最新公告", "熱門活動", "促銷公告", "系統公告"]
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

// 6 社群圖示：對齊原作 facebook / instagram / youtube / line / tiktok / threads
interface SocialItem {
  key: string;
  label: string;
  glyph: string;
}
const socials: SocialItem[] = [
  { key: "facebook", label: "Facebook", glyph: "f" },
  { key: "instagram", label: "Instagram", glyph: "ig" },
  { key: "youtube", label: "YouTube", glyph: "▶" },
  { key: "line", label: "LINE", glyph: "L" },
  { key: "tiktok", label: "TikTok", glyph: "tt" },
  { key: "threads", label: "Threads", glyph: "@" }
];

// 點任何 link 後關閉抽屜（對齊原作 @click="emit('toggleMenu')"）
function handleNavClick(): void {
  emit("toggleMenu");
}
</script>

<template>
  <!-- menu-wrap：對齊原作 fixed 全屏遮罩 + 左滑入抽屜 -->
  <menu class="fived-m-menu" :class="{ 'is-active': isActive }">
    <div class="fived-m-menu__main">
      <div class="fived-m-menu__overflow">
        <div class="fived-m-menu__list">
          <ul>
            <!-- 頂部 logo（對齊原作首項 router-link to="/"） -->
            <li>
              <a
                href="#"
                class="fived-m-menu__logo"
                :aria-label="logoLabel"
                @click.prevent="handleNavClick"
              >
                <img
                  :src="logoSrc"
                  :alt="logoLabel"
                  :class="{ 'fived-m-menu__logo-img--blend': useScreenBlend }"
                />
              </a>
            </li>

            <!-- 6 大主分類（對齊原作 6 個 .is-toggle 區塊） -->
            <li
              v-for="section in sections"
              :key="section.key"
              :class="{ 'is-toggle': activeKey === section.key }"
            >
              <button type="button" @click="toggleSection(section.key)">
                {{ section.label }}
              </button>
              <div class="fived-m-menu__sub">
                <a
                  v-for="child in section.children"
                  :key="child"
                  href="#"
                  @click.prevent="handleNavClick"
                >
                  {{ child }}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- 底部：小 logo + 6 社群圖 + 版權（對齊原作 .menu-bottom） -->
        <div class="fived-m-menu__bottom">
          <img
            :src="logoSrc"
            :alt="logoLabel"
            class="fived-m-menu__bottom-logo"
            :class="{ 'fived-m-menu__logo-img--blend': useScreenBlend }"
          />
          <div class="fived-m-menu__social">
            <ul>
              <li v-for="s in socials" :key="s.key">
                <a
                  href="#"
                  :aria-label="s.label"
                  class="fived-m-menu__social-link"
                  @click.prevent
                >
                  <span class="fived-m-menu__social-glyph">{{ s.glyph }}</span>
                </a>
              </li>
            </ul>
          </div>
          <p class="fived-m-menu__copy">
            Casino Landing Demo &copy; 2025 All rights reserved
          </p>
        </div>
      </div>

      <!-- 關閉鈕（對齊原作 .menu-close） -->
      <button
        type="button"
        class="fived-m-menu__close"
        aria-label="關閉選單"
        @click="emit('toggleMenu')"
      >
        <span />
        <span />
      </button>
    </div>

    <!-- 遮罩（點擊關閉，對齊原作 .menu-mask） -->
    <div class="fived-m-menu__mask" @click="emit('toggleMenu')" />
  </menu>
</template>

<style lang="scss" scoped>
// menu-wrap：fixed 全屏，未開啟時 transform 上推 + 透明，開啟後出現
.fived-m-menu {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.5);
  transform: translateY(-100%);
  transition: opacity 0.5s ease;
  pointer-events: none;
  opacity: 0;

  &.is-active {
    transform: translateY(0);
    pointer-events: auto;
    opacity: 1;
  }
}

.fived-m-menu__mask {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
}

// menu-main：左 75vw 抽屜，從左滑入（對齊原作）
.fived-m-menu__main {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: block;
  width: 75vw;
  max-width: 360px;
  height: 100%;
  padding: 36px 18px 18px;
  background: rgba(33, 13, 20, 0.96);
  transform: translateX(-100%);
  transition: transform 0.5s ease;

  .is-active & {
    transform: translateX(0);
  }
}

.fived-m-menu__overflow {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

// menu-logo（頂部）
.fived-m-menu__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 4px 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);

  img {
    height: 48px;
    width: auto;
    max-width: 80%;
    object-fit: contain;
  }
}

.fived-m-menu__logo-img--blend {
  mix-blend-mode: screen;
}

// 子選單：依 is-toggle 控制 max-height 展開
// 為什麼要在 .fived-m-menu__list 之前定義：
// stylelint no-descending-specificity 要求低 specificity selector 必須在高 specificity 之前；
// .fived-m-menu__sub a（裸 a）若放後面、而前面已出現 .fived-m-menu__list li > a，
// 規則會被視為「specificity 倒退」並阻擋 dev server buildStart。
.fived-m-menu__sub {
  display: block;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 8px;
    background: rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(33, 13, 20, 1);
    color: var(--text-muted, #a67c8b);
    font-size: 16px;
    letter-spacing: 1px;
    text-decoration: none;
    transition:
      color 0.18s ease,
      background 0.18s ease;
  }

  .is-toggle & {
    max-height: 400px;
  }
}

// 主選單列
// 為什麼放在 .fived-m-menu__sub 之後：
// list li > a 的 specificity 比 sub 內 a 高，依 stylelint 升序原則放後面
.fived-m-menu__list {
  padding-bottom: 8px;

  li {
    list-style: none;

    > a,
    > button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px 8px;
      background: transparent;
      border: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.28);
      color: var(--text-on-primary);
      font-size: 20px;
      letter-spacing: 1px;
      font-family: inherit;
      cursor: pointer;
      transition: color 0.18s ease;
    }

    // 子選單展開鈕右側下箭頭（對齊原作 button::after arrow-down2）
    > button {
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 12px;
        width: 12px;
        height: 12px;
        border-right: 2px solid var(--primary-01);
        border-bottom: 2px solid var(--primary-01);
        transform: translateY(-70%) rotate(45deg);
        transition: transform 0.3s ease;
      }
    }

    &.is-toggle {
      > button {
        color: var(--primary-03, #ffdaa4);

        &::after {
          transform: translateY(-30%) rotate(-135deg);
        }
      }
    }
  }
}

// 子選單 hover：拆出來放在 list 之後
// 為什麼不寫在 .fived-m-menu__sub 巢狀內：
// `.fived-m-menu__sub a:hover` specificity (0,2,1) 高於 `.fived-m-menu__list li > a` (0,1,2)，
// 必須放在 list 規則之後才不違反 stylelint no-descending-specificity
.fived-m-menu__sub a:hover {
  color: var(--primary-03, #ffdaa4);
  background: rgba(255, 255, 255, 0.1);
}

// 底部 logo + 社群 + 版權
.fived-m-menu__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 20px 0 4px;
}

.fived-m-menu__bottom-logo {
  width: 80px;
  height: auto;
  object-fit: contain;
}

.fived-m-menu__social {
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.fived-m-menu__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 30px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--primary-01);
  text-decoration: none;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.15s ease;

  &:hover {
    background: rgba(226, 189, 135, 0.18);
    border-color: var(--primary-03, #ffdaa4);
    transform: translateY(-1px);
  }
}

.fived-m-menu__social-glyph {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
}

.fived-m-menu__copy {
  margin: 0;
  padding: 0;
  line-height: 1.2;
  font-size: 12px;
  color: var(--text-muted, #a67c8b);
  text-align: center;
  letter-spacing: 0.5px;
}

// 關閉鈕：右上 X 圖示（純 CSS 兩斜線）
.fived-m-menu__close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: transform 0.15s ease;

  span {
    position: absolute;
    left: 4px;
    right: 4px;
    height: 2px;
    background: var(--primary-01);
    border-radius: 2px;

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
  }

  &:active {
    transform: scale(0.92);
  }
}
</style>
