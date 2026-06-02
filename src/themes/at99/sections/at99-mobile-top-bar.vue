<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import LoginModal from "@/components/common/landing/login-modal.vue";

/**
 * at99 手機版頂部 bar：hamburger + logo + 登入按鈕
 *
 * 設計：
 * - 左側 hamburger 點開 drawer（裡面收納 dock 內容）
 * - 中央 logo（DC 標誌 + 文字）
 * - 右側登入按鈕（單顆，免費開戶縮排到 drawer）
 *
 * Drawer 採全螢幕從左側滑入，內含 8 個快捷工具列項目
 */

interface DockItem {
  key: string;
  icon: string;
  label: string;
}

const dockItems: DockItem[] = [
  { key: "service", icon: "support_agent", label: "客服中心" },
  { key: "vip", icon: "diamond", label: "VIP 會員" },
  { key: "promo", icon: "card_giftcard", label: "優惠活動" },
  { key: "rank", icon: "emoji_events", label: "排行榜" },
  { key: "app", icon: "smartphone", label: "App 下載" },
  { key: "faq", icon: "help_outline", label: "常見問題" },
  { key: "agent", icon: "groups", label: "代理合作" },
  { key: "deposit", icon: "account_balance_wallet", label: "存提資訊" }
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
        <q-icon name="menu" size="22px" />
      </button>

      <!-- 中：logo -->
      <a class="at99-m-top__brand" href="#">
        <span class="at99-m-top__mark">DC</span>
        <span class="at99-m-top__name">DEMO CASINO</span>
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
            <span class="at99-m-top__mark">DC</span>
            <div>
              <div class="at99-m-drawer__brand">DEMO CASINO</div>
              <div class="at99-m-drawer__sub">示範娛樂城 B</div>
            </div>
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
                <q-icon :name="item.icon" size="20px" />
                <span>{{ item.label }}</span>
                <q-icon
                  name="chevron_right"
                  size="18px"
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
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: var(--bg-overlay);
    border: 1px solid var(--border);
    color: var(--color-primary);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: inherit;
    flex: 1;
    justify-content: center;
    min-width: 0;
  }

  &__mark {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 12px;
    letter-spacing: 1px;
    box-shadow:
      0 0 8px var(--color-accent),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    flex-shrink: 0;
  }

  &__name {
    font-size: 14px;
    font-weight: 800;
    color: var(--color-primary);
    text-shadow: 0 0 6px var(--color-primary);
    letter-spacing: 1.5px;
  }

  &__login-btn {
    height: 32px;
    padding: 0 14px;
    border-radius: 6px;
    background: var(--gradient-cta);
    color: var(--text-on-primary);
    border: 1px solid var(--color-primary);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    flex-shrink: 0;
    letter-spacing: 1px;
    box-shadow: var(--neon-glow);
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

  &__brand {
    font-size: 14px;
    font-weight: 800;
    color: var(--color-primary);
    letter-spacing: 1.5px;
  }

  &__sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &__close {
    margin-left: auto;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--bg-overlay);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 20px;
    cursor: pointer;
    line-height: 1;
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
    transition: background 0.15s ease;

    &:hover,
    &:active {
      background: var(--bg-overlay);
      color: var(--color-primary);
    }
  }

  &__arrow {
    margin-left: auto;
    color: var(--text-muted);
  }

  &__footer {
    padding: 14px 18px 22px;
    border-top: 1px solid var(--border);
  }

  &__cta {
    width: 100%;
    height: 42px;
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 2px;
    cursor: pointer;
    box-shadow: 0 0 12px var(--color-accent);
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
