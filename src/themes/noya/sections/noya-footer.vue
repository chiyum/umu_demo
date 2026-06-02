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
  items: string[];
}

const columns: FooterColumn[] = [
  {
    title: "關於本平台",
    items: ["平台介紹", "經營理念", "合作夥伴", "媒體報導"]
  },
  {
    title: "聯絡我們",
    items: ["24h 客服中心", "聯絡信箱", "意見回饋", "媒體合作"]
  },
  {
    title: "常見問題",
    items: ["註冊存款", "提領流程", "帳戶安全", "活動規則"]
  },
  {
    title: "服務條款",
    items: ["使用協議", "隱私政策", "免責聲明", "未成年保護"]
  }
];

const socials = ["IG", "FB", "LINE", "TG"];

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
              :key="s"
              href="#"
              class="noya-footer__social"
              :aria-label="`${s} 社群`"
            >
              {{ s }}
            </a>
          </div>
        </div>

        <!-- 4 欄連結 -->
        <div class="noya-footer__cols">
          <div v-for="col in columns" :key="col.title" class="noya-footer__col">
            <div class="noya-footer__col-title">{{ col.title }}</div>
            <ul class="noya-footer__list">
              <li v-for="it in col.items" :key="it">
                <a href="#">{{ it }}</a>
              </li>
            </ul>
          </div>
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
    border-radius: 50%;
    border: 1px solid var(--border);
    color: var(--footer-link);
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--text-on-primary);
    }
  }

  &__cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  &__col-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 1px;
    margin-bottom: 12px;
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
