<script setup lang="ts">
import ProviderBadge from "@/components/common/landing/provider-badge.vue";
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";
import at99Logo from "@/assets/themes/at99/images/logo.png";

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

const legal = ["責任博彩", "服務條款", "隱私政策", "聯絡我們"];
</script>

<template>
  <footer class="at99-foot" :class="{ 'at99-foot--mobile': mobile }">
    <!-- 上半：左 mascot + 右文字 + 連結 -->
    <div class="at99-foot__top">
      <div class="at99-foot__top-inner">
        <!-- 左下角色立繪 -->
        <div v-if="!mobile" class="at99-foot__mascot" aria-hidden="true">
          <div class="at99-foot__mascot-halo" />
          <div class="at99-foot__mascot-figure">
            <AvatarSilhouette :seed="71" variant="vivid" />
          </div>
        </div>

        <!-- 中文字（大亨 ONLINE 品牌 logo + 描述 + 連結） -->
        <div class="at99-foot__text">
          <img :src="at99Logo" alt="DEMO" class="at99-foot__brand-img" />
          <p class="at99-foot__desc">
            本站為前端版面 Demo，所有內容、人物、遊戲與標籤皆為通用範例，<br />
            不代表任何真實服務、品牌或營運主體。
          </p>
          <nav class="at99-foot__legal" aria-label="法律連結">
            <a v-for="l in legal" :key="l" href="#">{{ l }}</a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Partner logos 跑馬燈 -->
    <div class="at99-foot__partners">
      <div class="at99-foot__partners-label">合作夥伴</div>
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
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 60px;
    border-radius: 50%;
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

    :deep(.avatar-silhouette) {
      width: 100%;
      height: 100%;
      border-radius: 14px;
      border: 2px solid var(--color-primary);
      box-shadow: var(--neon-glow);
    }
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

    a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 12px;
      letter-spacing: 1px;
      transition: color 0.15s ease;

      &:hover {
        color: var(--color-primary);
        text-shadow: 0 0 6px var(--color-primary);
      }
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

  &__partners-label {
    color: var(--color-primary);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    flex-shrink: 0;
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
