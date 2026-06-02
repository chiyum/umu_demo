<script setup lang="ts">
import ProviderBadge from "@/components/common/landing/provider-badge.vue";
import noyaLogo from "@/assets/themes/noya/images/logo.png";

/**
 * noya footer：4 欄連結 + provider logo strip + 版權
 *
 * 結構（依 GAP_ANALYSIS）：
 * 上半 — 4 欄連結（關於 / 聯絡 / 常見問題 / 服務條款）+ 品牌與社群
 * 中段 — provider 跑馬燈（用共用 ProviderBadge 取代真實 logo）
 * 下半 — 版權字樣
 *
 * 文字：「關於 NOYA」改成「關於本平台」這類通用佔位
 *       品牌名「示範娛樂城 A」一致延續上方 nav 用法
 *
 * 注意：footer 走 footer-bg / footer-text token，配色切換時跟著走
 */

interface Props {
  mobile?: boolean;
}
withDefaults(defineProps<Props>(), { mobile: false });

interface FooterColumn {
  title: string;
  /** 欄位標題前的 icon（Iconify Material Symbols Outlined，與全站一致） */
  icon: string;
  items: string[];
}

// 為什麼每欄加 icon：原 footer 只有純文字標題，視覺密度低且使用者反映「缺 icon」；
// 加上 Material Symbols Outlined 可立刻提供分類辨識度，與全站 icon 體系一致
const columns: FooterColumn[] = [
  {
    title: "關於本平台",
    icon: "material-symbols:info-outline",
    items: ["平台介紹", "經營理念", "合作夥伴", "媒體報導"]
  },
  {
    title: "聯絡我們",
    icon: "material-symbols:support-agent-outline",
    items: ["24h 客服中心", "聯絡信箱", "意見回饋", "媒體合作"]
  },
  {
    title: "常見問題",
    icon: "material-symbols:help-outline",
    items: ["註冊存款", "提領流程", "帳戶安全", "活動規則"]
  },
  {
    title: "服務條款",
    icon: "material-symbols:gavel-outline",
    items: ["使用協議", "隱私政策", "免責聲明", "未成年保護"]
  }
];

interface SocialItem {
  key: string;
  /** Iconify icon name；社群 logo 在 Material Symbols 體系內沒有官方品牌 icon，
   *  選擇語意接近的（chat / share / mail）來表達，避免外接其他 icon set 造成依賴擴張 */
  icon: string;
  label: string;
}

// 社群連結原本只有純文字 IG / FB / LINE / TG；改為帶 icon 的版本，
// 每個 icon 走 Material Symbols Outlined 維持全站一致；
// Material Symbols 沒有真實品牌 logo，這裡用語意接近的通用 icon
const socials: SocialItem[] = [
  { key: "ig", icon: "material-symbols:photo-camera-outline", label: "IG" },
  { key: "fb", icon: "material-symbols:thumb-up-outline", label: "FB" },
  { key: "line", icon: "material-symbols:chat-outline", label: "LINE" },
  { key: "tg", icon: "material-symbols:send-outline", label: "TG" }
];

// 付款方式列：原本 footer 沒有，補上常見支付管道；走 Material Symbols Outlined
// 賭場 demo 常見的入金方式：信用卡 / 銀行 / 加密貨幣 / 行動支付
const payments = [
  {
    key: "card",
    icon: "material-symbols:credit-card-outline",
    label: "信用卡"
  },
  {
    key: "bank",
    icon: "material-symbols:account-balance-outline",
    label: "銀行轉帳"
  },
  {
    key: "crypto",
    icon: "material-symbols:currency-bitcoin",
    label: "加密貨幣"
  },
  {
    key: "wallet",
    icon: "material-symbols:account-balance-wallet-outline",
    label: "電子錢包"
  },
  {
    key: "qr",
    icon: "material-symbols:qr-code-2-outline",
    label: "行動支付"
  }
];

// 語言切換選項：footer 常見「多語系切換」入口
const languages = [
  { key: "zh-TW", icon: "material-symbols:language", label: "繁體中文" },
  { key: "zh-CN", icon: "material-symbols:language", label: "简体中文" },
  { key: "en", icon: "material-symbols:language", label: "English" }
];

// Provider 跑馬燈：產生足夠多項用於橫排展示
const providerStrip = Array.from({ length: 14 }, (_, i) => ({
  key: `pp-${i}`,
  text: [
    "DA",
    "DB",
    "DC",
    "DD",
    "DE",
    "DF",
    "DG",
    "DH",
    "EA",
    "EB",
    "EC",
    "ED",
    "SA",
    "SB"
  ][i],
  seed: (i + 1) * 5
}));
</script>

<template>
  <footer class="noya-footer" :class="{ 'noya-footer--mobile': mobile }">
    <!-- 上半：4 欄連結 + 品牌 -->
    <div class="noya-footer__top">
      <div class="noya-footer__top-inner">
        <!-- 左側品牌資訊（UMU 品牌 logo） -->
        <div class="noya-footer__brand-col">
          <div class="noya-footer__brand">
            <img :src="noyaLogo" alt="DEMO" class="noya-footer__brand-img" />
          </div>
          <p class="noya-footer__brand-desc">
            本站僅供前端版面 Demo，<br />
            所有內容、文案、人物均為通用示例。
          </p>
          <div class="noya-footer__socials">
            <a
              v-for="s in socials"
              :key="s.key"
              href="#"
              class="noya-footer__social"
              :aria-label="`${s.label} 社群`"
            >
              <Icon :icon="s.icon" class="noya-footer__social-icon" />
            </a>
          </div>
        </div>

        <!-- 4 欄連結 -->
        <div class="noya-footer__cols">
          <div v-for="col in columns" :key="col.title" class="noya-footer__col">
            <!-- 欄位標題前 icon，與全站 Material Symbols Outlined 體系一致 -->
            <div class="noya-footer__col-title">
              <Icon :icon="col.icon" class="noya-footer__col-title-icon" />
              <span>{{ col.title }}</span>
            </div>
            <ul class="noya-footer__list">
              <li v-for="it in col.items" :key="it">
                <a href="#">{{ it }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 付款方式列：常見入金方式 icon 列，與全站 Material Symbols 統一 -->
    <div class="noya-footer__payments" aria-label="支援的支付方式">
      <div class="noya-footer__payments-inner">
        <span class="noya-footer__payments-label">支付方式</span>
        <ul class="noya-footer__payments-list" role="list">
          <li
            v-for="p in payments"
            :key="p.key"
            class="noya-footer__payment"
            :title="p.label"
          >
            <Icon :icon="p.icon" class="noya-footer__payment-icon" />
            <span class="noya-footer__payment-label">{{ p.label }}</span>
          </li>
        </ul>

        <!-- 語言切換：footer 常見「多語系入口」 -->
        <div class="noya-footer__lang" aria-label="語言切換">
          <Icon
            icon="material-symbols:language"
            class="noya-footer__lang-icon"
          />
          <select class="noya-footer__lang-select" aria-label="選擇語言">
            <option v-for="lang in languages" :key="lang.key" :value="lang.key">
              {{ lang.label }}
            </option>
          </select>
          <Icon
            icon="material-symbols:expand-more"
            class="noya-footer__lang-caret"
          />
        </div>
      </div>
    </div>

    <!-- 中段：provider 跑馬燈 -->
    <div class="noya-footer__providers">
      <div class="noya-footer__providers-track">
        <div
          v-for="p in providerStrip"
          :key="p.key"
          class="noya-footer__provider-item"
        >
          <ProviderBadge :text="p.text" :seed="p.seed" size="sm" />
        </div>
        <!-- 再放一份做無縫接續 -->
        <div
          v-for="p in providerStrip"
          :key="`dup-${p.key}`"
          class="noya-footer__provider-item"
          aria-hidden="true"
        >
          <ProviderBadge :text="p.text" :seed="p.seed" size="sm" />
        </div>
      </div>
    </div>

    <!-- 下半：版權 -->
    <div class="noya-footer__copy">
      <span>© 2025 DEMO CASINO. 本站為前端 Demo 範例，非真實營運網站。</span>
      <span class="noya-footer__age">18+ 請理性娛樂</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.noya-footer {
  background: var(--footer-bg);
  color: var(--footer-text);
  border-top: 1px solid var(--border);

  &__top {
    border-bottom: 1px solid var(--border);
  }

  &__top-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 44px 24px 32px;
    display: grid;
    grid-template-columns: 1fr 2.4fr;
    gap: 48px;
  }

  &__brand-col {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  // UMU footer logo：高 36px 與品牌一致，保留 contain 比例
  &__brand-img {
    height: 36px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;
  }

  &__brand-desc {
    font-size: 12px;
    color: var(--footer-link);
    line-height: 1.7;
    margin: 0;
  }

  &__socials {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }

  &__social {
    width: 32px;
    height: 32px;

    // kingdom DNA：圓 icon 走 --radius-circle
    border-radius: var(--radius-circle);
    border: 1px solid var(--border);
    color: var(--footer-link);
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--text-on-primary);

      // kingdom DNA：hover 浮起加 glow，視覺有反饋
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  }

  // 社群 icon：靠 currentColor 跟父層 a 切色，hover 變高亮對比
  &__social-icon {
    width: 16px;
    height: 16px;
  }

  &__cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  // 欄位標題：icon + 文字並排，icon 與標題共用主色 token
  &__col-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 1px;
    margin-bottom: 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  &__col-title-icon {
    width: 16px;
    height: 16px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;

    a {
      font-size: 12px;
      color: var(--footer-link);
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  // 付款方式列：橫排 icon 卡，與 provider 跑馬燈分開區隔；icon 走 footer-link 色
  // 為什麼不放跑馬燈：付款方式列項目少（5 個）且固定，靜態列比跑馬燈更易讀
  &__payments {
    border-bottom: 1px solid var(--border);
    background: var(--bg-base-deep);
  }

  &__payments-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__payments-label {
    font-size: 12px;
    color: var(--color-primary);
    font-weight: 700;
    letter-spacing: 2px;
    flex-shrink: 0;
  }

  &__payments-list {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
    flex: 1;
  }

  // 單顆付款方式卡：圓角小卡 + icon + label，hover 主色亮起
  &__payment {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    color: var(--footer-link);
    background: var(--bg-surface);
    transition: all var(--transition-fast);
    cursor: default;

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__payment-icon {
    width: 18px;
    height: 18px;
  }

  &__payment-label {
    font-size: 11px;
    letter-spacing: 0.5px;
  }

  // 語言切換：原生 select 套上樣式 + 前後 icon
  // 為什麼用原生 select：純 demo footer，多語切換 OOTB 行為就夠，無需 Quasar select 重量級元件
  &__lang {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    color: var(--footer-link);
    background: var(--bg-surface);
    flex-shrink: 0;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__lang-icon,
  &__lang-caret {
    width: 16px;
    height: 16px;
  }

  // 原生 select 樣式重置，避免不同 OS 風格不一致
  &__lang-select {
    background: transparent;
    border: none;
    color: inherit;
    font-size: 12px;
    cursor: pointer;
    outline: none;
    appearance: none;

    // stylelint-disable-next-line no-descending-specificity
    option {
      color: var(--text-primary);
      background: var(--bg-surface);
    }
  }

  // Provider 跑馬燈
  &__providers {
    overflow: hidden;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
    background: var(--bg-base-deep);

    // 邊緣淡出
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 5%,
      #000000 95%,
      transparent 100%
    );
  }

  &__providers-track {
    display: inline-flex;
    gap: 18px;
    animation: noya-footer-marquee 60s linear infinite;
    white-space: nowrap;
  }

  &__provider-item {
    flex-shrink: 0;
  }

  &__copy {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    color: var(--footer-link);
  }

  &__age {
    color: var(--color-primary);
    font-weight: 600;
    letter-spacing: 1px;
  }

  // 手機版
  &--mobile {
    .noya-footer__top-inner {
      grid-template-columns: 1fr;
      padding: 28px 16px 20px;
      gap: 28px;
    }

    .noya-footer__brand {
      justify-content: flex-start;
    }

    .noya-footer__cols {
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }

    .noya-footer__copy {
      flex-direction: column;
      text-align: center;
      padding: 12px 16px 16px;
    }

    // mobile 付款方式列：壓緊間距 + lang 換行到下一行避免被擠
    .noya-footer__payments-inner {
      padding: 12px 16px;
      gap: 10px;
    }

    .noya-footer__payments-label {
      width: 100%;
      font-size: 11px;
    }

    .noya-footer__payment {
      padding: 4px 9px;
    }

    .noya-footer__payment-label {
      font-size: 10px;
    }

    .noya-footer__lang {
      margin-left: auto;
    }
  }
}

@keyframes noya-footer-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
