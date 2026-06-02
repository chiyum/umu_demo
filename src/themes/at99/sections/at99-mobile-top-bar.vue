<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import LoginModal from "@/components/common/landing/login-modal.vue";
import at99Logo from "@/assets/themes/at99/images/logo.png";

/**
 * at99 手機版頂部 bar：hamburger + 大亨 ONLINE logo + 登入按鈕
 *
 * 設計：
 * - 左側 hamburger 點開 drawer（裡面收納 dock 內容）
 * - 中央：大亨 ONLINE 自有品牌 PNG logo（取代原 DC 文字徽章）
 * - 右側登入按鈕（單顆，免費開戶縮排到 drawer）
 *
 * Drawer 採全螢幕從左側滑入，內含 8 個快捷工具列項目
 */

interface DockItem {
  key: string;
  /** Iconify icon 名稱 */
  icon: string;
  label: string;
}

/**
 * Drawer 內 8 項與 at99 PC dock 共用同一組 icon name，
 * 跨版面同樣語意對齊同視覺，但 mobile 用較長的「客服中心 / VIP 會員」等說明字
 */
const dockItems: DockItem[] = [
  {
    key: "service",
    icon: "material-symbols:support-agent-outline",
    label: "客服中心"
  },
  {
    key: "vip",
    icon: "material-symbols:workspace-premium-outline",
    label: "VIP 會員"
  },
  {
    key: "promo",
    icon: "material-symbols:redeem-outline",
    label: "優惠活動"
  },
  {
    key: "rank",
    icon: "material-symbols:emoji-events-outline",
    label: "排行榜"
  },
  {
    key: "app",
    icon: "material-symbols:smartphone-outline",
    label: "App 下載"
  },
  { key: "faq", icon: "material-symbols:help-outline", label: "常見問題" },
  {
    key: "agent",
    icon: "material-symbols:handshake-outline",
    label: "代理合作"
  },
  {
    key: "deposit",
    icon: "material-symbols:account-balance-wallet-outline",
    label: "存提資訊"
  }
];

const drawerOpen = ref(false);
const loginOpen = ref(false);
const $q = useQuasar();

function tapDock(item: DockItem) {
  drawerOpen.value = false;
  $q.notify({
    message: `Demo：${item.label} 僅展示版面`,
    color: "primary",
    position: "top",
    timeout: 1200
  });
}
</script>

<template>
  <header class="at99-m-top">
    <div class="at99-m-top__inner">
      <!-- 左：hamburger -->
      <button
        type="button"
        class="at99-m-top__menu-btn"
        aria-label="開啟選單"
        @click="drawerOpen = true"
      >
        <Icon icon="material-symbols:menu" class="at99-m-top__menu-icon" />
      </button>

      <!-- 中：大亨 ONLINE 品牌 logo -->
      <a class="at99-m-top__brand" href="#" aria-label="DEMO 回首頁">
        <img :src="at99Logo" alt="DEMO" class="at99-m-top__brand-img" />
      </a>

      <!-- 右：登入 -->
      <button
        type="button"
        class="at99-m-top__login-btn"
        @click="loginOpen = true"
      >
        登入
      </button>
    </div>

    <!-- Drawer -->
    <transition name="drawer">
      <div
        v-if="drawerOpen"
        class="at99-m-drawer"
        role="dialog"
        aria-modal="true"
        @click.self="drawerOpen = false"
      >
        <aside class="at99-m-drawer__panel">
          <div class="at99-m-drawer__header">
            <img :src="at99Logo" alt="DEMO" class="at99-m-drawer__brand-img" />
            <button
              type="button"
              class="at99-m-drawer__close"
              aria-label="關閉選單"
              @click="drawerOpen = false"
            >
              ×
            </button>
          </div>

          <!-- 快捷項目 -->
          <ul class="at99-m-drawer__list">
            <li v-for="item in dockItems" :key="item.key">
              <button
                type="button"
                class="at99-m-drawer__item"
                @click="tapDock(item)"
              >
                <Icon :icon="item.icon" class="at99-m-drawer__item-icon" />
                <span>{{ item.label }}</span>
                <Icon
                  icon="material-symbols:chevron-right"
                  class="at99-m-drawer__arrow"
                />
              </button>
            </li>
          </ul>

          <div class="at99-m-drawer__footer">
            <button
              type="button"
              class="at99-m-drawer__cta"
              @click="
                () => {
                  drawerOpen = false;
                  loginOpen = true;
                }
              "
            >
              立即開戶
            </button>
          </div>
        </aside>
      </div>
    </transition>

    <LoginModal v-model="loginOpen" title="會員登入" />
  </header>
</template>

<style lang="scss" scoped>
.at99-m-top {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg-base-translucent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);

  &__inner {
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  &__menu-btn {
    // kingdom DNA：方形 icon 按鈕 --radius-sm
    width: 36px;
    height: 36px;
    border-radius: var(--radius-sm);
    background: var(--bg-overlay);
    border: 1px solid var(--border);
    color: var(--color-primary);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--transition-fast);

    &:hover {
      box-shadow: var(--shadow-glow);
    }
  }

  // hamburger Icon 走 currentColor 跟父層 button 顏色一致
  &__menu-icon {
    width: 22px;
    height: 22px;
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    flex: 1;
    justify-content: center;
    min-width: 0;
  }

  // 大亨 ONLINE 行動版 logo：高 32px、自動寬，保留留白
  &__brand-img {
    height: 32px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;
  }

  &__login-btn {
    // kingdom DNA：mobile CTA 走 --radius-pill 對齊 PC at99-button atom
    height: 32px;
    padding: 0 18px;
    border-radius: var(--radius-pill);
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: 1px solid var(--color-primary);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    flex-shrink: 0;
    letter-spacing: 1px;
    box-shadow: var(--neon-glow);
    transition: filter var(--transition-fast);

    &:hover {
      filter: var(--filter-hover-strong);
    }
  }
}

// Drawer
.at99-m-drawer {
  position: fixed;
  inset: 0;
  z-index: 8500;
  background: rgba(0, 0, 0, 0.55);
  display: flex;

  &__panel {
    width: 80%;
    max-width: 320px;
    background: var(--bg-base-deep);
    height: 100%;
    border-right: 1px solid var(--color-primary);
    box-shadow: 0 0 32px var(--color-primary);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 14px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-base-translucent);
  }

  // Drawer 頂部使用同一張品牌 logo，高度與 mobile top bar 一致
  &__brand-img {
    height: 36px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;
  }

  &__close {
    // kingdom DNA：圓形 icon 按鈕 --radius-circle
    margin-left: auto;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-circle);
    background: var(--bg-overlay);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 20px;
    cursor: pointer;
    line-height: 1;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__list {
    list-style: none;
    padding: 8px 0;
    margin: 0;
    flex: 1;
  }

  &__item {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--text-primary);
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 13px;
    cursor: pointer;
    transition: background var(--transition-fast);

    &:hover,
    &:active {
      background: var(--bg-overlay);
      color: var(--color-primary);
    }
  }

  // drawer 內項目 icon：與 dock PC 一致 20px，主項目色
  &__item-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &__arrow {
    margin-left: auto;
    color: var(--text-muted);
    width: 18px;
    height: 18px;
  }

  &__footer {
    padding: 14px 18px 22px;
    border-top: 1px solid var(--border);
  }

  &__cta {
    // kingdom DNA：drawer 底部金色 CTA 走 --radius-pill 對齊 at99-button gold
    width: 100%;
    height: 42px;
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    border: none;
    border-radius: var(--radius-pill);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 2px;
    cursor: pointer;
    box-shadow: 0 0 12px var(--color-accent);
    transition: filter var(--transition-fast);

    &:hover {
      filter: var(--filter-hover-soft);
    }
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.22s ease;

  .at99-m-drawer__panel {
    transition: transform 0.26s ease;
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .at99-m-drawer__panel {
    transform: translateX(-100%);
  }
}
</style>
