<script setup lang="ts">
import { computed } from "vue";
import ProviderBadge from "@/components/common/landing/provider-badge.vue";
import { useDemoThemeStore } from "@/store/demo-theme.store";

// Logo 改由 demo-theme store 動態切換（與 top-header / mobile-top-bar / drawer 同源），
// FAB 切 logo 時 footer 也要跟動，否則同一頁上下品牌不一致。
// 這份 commit f06f5af 漏改的修正，reviewer 抓到，補回對齊 noya-footer.vue 的 pattern。
const themeStore = useDemoThemeStore();
const logoSrc = computed(() => themeStore.currentLogo.src);
const logoLabel = computed(() => themeStore.currentLogo.label);

// Round 9：5d_v2 example/game2.jpg（財神立繪 + 元寶，純藝術無平台 logo）
// 取代原 AvatarSilhouette 純抽象剪影，讓 at99 footer 左下角具備「賭場吉祥物」具象視覺
// 為何用 jpg：原圖即為 jpg 格式，不必為了 transparent 改檔，背景配合 mascot wrap 玻璃效果即可
import footerMascotImg from "@/assets/themes/at99/extra/illustrations/footer-mascot.jpg";

/**
 * at99 footer：左下角色立繪 + Partner logos 跑馬燈 + 法律連結 + 版權
 *
 * 設計：
 * - 左：抽象人形 silhouette（取代原站的具體角色立繪）
 * - 中：partner logos 横排（用共用 ProviderBadge）
 * - 右：4 個法律連結
 * - 底部：版權字樣 + 18+ 提醒
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

const partners = Array.from({ length: 14 }, (_, i) => ({
  key: `pt-${i}`,
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
  seed: (i + 1) * 6
}));

interface LegalItem {
  /** Iconify icon name；走 Material Symbols Outlined 與全站一致 */
  icon: string;
  label: string;
}

// 為什麼法律連結加 icon：原本純文字四個連結視覺密度低，使用者反映「缺 icon」；
// 加 icon 提供分類辨識度
const legal: LegalItem[] = [
  { icon: "material-symbols:shield-outline", label: "責任博彩" },
  { icon: "material-symbols:gavel-outline", label: "服務條款" },
  { icon: "material-symbols:lock-outline", label: "隱私政策" },
  { icon: "material-symbols:support-agent", label: "聯絡我們" }
];

// 社群連結：footer 常見的客服 / 社群入口，補齊 icon 對應
const socials = [
  {
    key: "service",
    icon: "material-symbols:headset-mic-outline",
    label: "客服"
  },
  { key: "tg", icon: "material-symbols:send-outline", label: "TG" },
  { key: "line", icon: "material-symbols:chat-outline", label: "LINE" },
  { key: "mail", icon: "material-symbols:mail-outline", label: "信箱" }
];

// 付款方式：與 noya footer 一致的支付管道列
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
  { key: "zh-TW", label: "繁體中文" },
  { key: "zh-CN", label: "简体中文" },
  { key: "en", label: "English" }
];
</script>

<template>
  <footer class="at99-foot" :class="{ 'at99-foot--mobile': mobile }">
    <!-- 上半：左 mascot + 右文字 + 連結 -->
    <div class="at99-foot__top">
      <div class="at99-foot__top-inner">
        <!--
          Round 9：左下角色立繪改為 5d_v2 財神立繪圖
          原 AvatarSilhouette 抽象剪影 → 真實場景圖（財神 + 元寶 + 燈籠 + 廟宇）
          aria-hidden 維持，純裝飾不需朗讀
          mobile 隱藏：footer 空間有限不適合塞大圖
        -->
        <div v-if="!mobile" class="at99-foot__mascot" aria-hidden="true">
          <div class="at99-foot__mascot-halo" />
          <div class="at99-foot__mascot-figure">
            <img
              :src="footerMascotImg"
              alt=""
              class="at99-foot__mascot-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <!-- 中文字（大亨 ONLINE 品牌 logo + 描述 + 連結） -->
        <div class="at99-foot__text">
          <img :src="logoSrc" :alt="logoLabel" class="at99-foot__brand-img" />
          <p class="at99-foot__desc">
            本站為前端版面 Demo，所有內容、人物、遊戲與標籤皆為通用範例，<br />
            不代表任何真實服務、品牌或營運主體。
          </p>
          <!-- 法律連結 + icon：與全站 Material Symbols Outlined 體系一致 -->
          <nav class="at99-foot__legal" aria-label="法律連結">
            <a
              v-for="l in legal"
              :key="l.label"
              href="#"
              class="at99-foot__legal-link"
            >
              <Icon :icon="l.icon" class="at99-foot__legal-icon" />
              <span>{{ l.label }}</span>
            </a>
          </nav>

          <!-- 社群 / 客服連結：客服 + TG / LINE / Mail，補上 icon -->
          <div class="at99-foot__socials" aria-label="社群連結">
            <a
              v-for="s in socials"
              :key="s.key"
              href="#"
              class="at99-foot__social"
              :aria-label="`${s.label} 入口`"
              :title="s.label"
            >
              <Icon :icon="s.icon" class="at99-foot__social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 付款方式列：賭場 demo 常見的入金管道 icon 列 -->
    <div class="at99-foot__payments" aria-label="支援的支付方式">
      <div class="at99-foot__payments-inner">
        <span class="at99-foot__payments-label">
          <Icon
            icon="material-symbols:payments-outline"
            class="at99-foot__payments-label-icon"
          />
          支付方式
        </span>
        <ul class="at99-foot__payments-list" role="list">
          <li
            v-for="p in payments"
            :key="p.key"
            class="at99-foot__payment"
            :title="p.label"
          >
            <Icon :icon="p.icon" class="at99-foot__payment-icon" />
            <span class="at99-foot__payment-label">{{ p.label }}</span>
          </li>
        </ul>

        <!-- 語言切換 -->
        <div class="at99-foot__lang" aria-label="語言切換">
          <Icon icon="material-symbols:language" class="at99-foot__lang-icon" />
          <select class="at99-foot__lang-select" aria-label="選擇語言">
            <option v-for="lang in languages" :key="lang.key" :value="lang.key">
              {{ lang.label }}
            </option>
          </select>
          <Icon
            icon="material-symbols:expand-more"
            class="at99-foot__lang-caret"
          />
        </div>
      </div>
    </div>

    <!-- Partner logos 跑馬燈 -->
    <div class="at99-foot__partners">
      <div class="at99-foot__partners-label kingdom-marquee-text">
        <Icon
          icon="material-symbols:handshake-outline"
          class="at99-foot__partners-icon"
        />
        合作夥伴
      </div>
      <div class="at99-foot__partners-track">
        <div v-for="p in partners" :key="p.key" class="at99-foot__partner">
          <ProviderBadge :text="p.text" :seed="p.seed" size="sm" glow />
        </div>
        <!-- duplicate 做無縫 -->
        <div
          v-for="p in partners"
          :key="`dup-${p.key}`"
          class="at99-foot__partner"
          aria-hidden="true"
        >
          <ProviderBadge :text="p.text" :seed="p.seed" size="sm" glow />
        </div>
      </div>
    </div>

    <!-- 版權 + 18+ -->
    <div class="at99-foot__copy">
      <span>© 2025 DEMO CASINO. 本站為前端 Demo，僅供版面展示用途</span>
      <span class="at99-foot__age">18+ 請理性娛樂</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.at99-foot {
  background: var(--bg-base-deep);
  border-top: 1px solid var(--border);

  // PC：左側 dock 預留空間，寬度走 token 集中管理
  padding-left: var(--dock-offset);

  &__top {
    border-bottom: 1px solid var(--border);
  }

  &__top-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 32px 24px 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__mascot {
    position: relative;
    width: 140px;
    height: 200px;
    flex-shrink: 0;
  }

  &__mascot-halo {
    // kingdom DNA：圓形光暈 --radius-circle
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 60px;
    border-radius: var(--radius-circle);
    background: radial-gradient(
      ellipse,
      var(--color-primary) 0%,
      transparent 70%
    );
    opacity: 0.5;
  }

  &__mascot-figure {
    position: relative;
    width: 100%;
    height: 100%;

    // Round 9：直接放真實立繪圖，原 :deep(.avatar-silhouette) 規則已不需要
    // kingdom DNA：圖片容器 --radius-xl + shadow-glow（與主色一致的霓虹光暈）+ 2px 主色細邊
    // object-fit: cover 配 object-position: top 確保財神頭部不被裁掉
  }

  &__mascot-img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-xl);
    border: 2px solid var(--color-primary);
    box-shadow: var(--shadow-glow);
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  &__text {
    flex: 1;
    color: var(--text-primary);
  }

  // 大亨 ONLINE footer logo：高 36px，與其他位置一致；下方留 desc 與連結
  &__brand-img {
    height: 36px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;
    margin-bottom: 10px;
  }

  &__desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 12px;
  }

  &__legal {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    margin-bottom: 12px;
  }

  // 法律連結：icon + label 並排
  &__legal-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
      text-shadow: 0 0 6px var(--color-primary);
    }
  }

  &__legal-icon {
    width: 16px;
    height: 16px;
  }

  // 社群連結列：圓形 icon 按鈕，hover 主色
  &__socials {
    display: flex;
    gap: 8px;
  }

  &__social {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-circle);
    border: 1px solid var(--border);
    color: var(--text-muted);
    background: var(--bg-surface);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--text-on-primary);
      background: var(--color-primary);
      border-color: var(--color-primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  }

  &__social-icon {
    width: 16px;
    height: 16px;
  }

  // 付款方式列：跟 noya 一致的視覺結構
  &__payments {
    background: var(--bg-base-deep);
    border-bottom: 1px solid var(--border);
  }

  &__payments-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 24px;
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
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__payments-label-icon {
    width: 18px;
    height: 18px;
  }

  &__payments-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
    flex: 1;
  }

  &__payment {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    color: var(--text-muted);
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

  // 語言切換：原生 select 套樣式
  &__lang {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    color: var(--text-muted);
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

  &__partners {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 14px 24px;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
    max-width: 1280px;
    margin: 0 auto;
  }

  // 合作夥伴 label：加 handshake icon 視覺一致
  &__partners-label {
    color: var(--color-primary);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  &__partners-icon {
    width: 16px;
    height: 16px;
  }

  &__partners-track {
    display: inline-flex;
    gap: 14px;
    animation: at99-foot-marquee 50s linear infinite;
    will-change: transform;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000000 8%,
      #000000 92%,
      transparent 100%
    );
  }

  &__partner {
    flex-shrink: 0;
  }

  &__copy {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: var(--text-muted);
    gap: 12px;
  }

  &__age {
    color: var(--color-primary);
    font-weight: 600;
    letter-spacing: 1px;
  }

  &--mobile {
    padding-left: 0;

    .at99-foot__top-inner {
      padding: 22px 16px;
    }

    .at99-foot__partners {
      padding: 12px 16px;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .at99-foot__partners-track {
      // 手機禁用 mask（過窄 mask 會吃掉內容）
      mask-image: none;
    }

    .at99-foot__copy {
      flex-direction: column;
      text-align: center;
      padding: 12px 16px 16px;
    }

    // mobile 付款方式列：壓緊間距
    .at99-foot__payments-inner {
      padding: 10px 16px;
      gap: 10px;
    }

    .at99-foot__payments-label {
      width: 100%;
      font-size: 11px;
    }

    .at99-foot__payment {
      padding: 4px 10px;
    }

    .at99-foot__payment-label {
      font-size: 10px;
    }

    .at99-foot__lang {
      margin-left: auto;
    }
  }
}

@keyframes at99-foot-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
