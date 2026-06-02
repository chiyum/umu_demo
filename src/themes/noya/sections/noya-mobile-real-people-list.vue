<script setup lang="ts">
import AvatarSilhouette from "@/components/common/landing/avatar-silhouette.vue";

/**
 * noya 手機版主內容區 — Round 5 改版：直立 promo banner 堆疊
 *
 * 元件職責由原本的「真人館卡片列表」改為「promo banner 堆疊」：
 * - 5 個直立式 banner（每個 ~136px 高，等同 minHeight 約 130-150 區間）
 * - 每張：左大字標題 + 右側 silhouette / 抽象插畫 + 底部小 CTA
 * - 不同配色變化（暖橘 / 粉金 / 米白 / 棕金）讓堆疊有變化感
 *
 * 為何保留檔名 noya-mobile-real-people-list.vue：使用者要求「不動既有檔案結構命名」，
 * 因此檔名保留，內容語意改為 promo banner（用 banner-card / promo-card-row 為 class 前綴釐清）
 *
 * 為何不在父層改 import 路徑：父層 mobile.vue 只 import section 路徑，
 * 元件內部用什麼結構是子層自己的事；改子層即可
 *
 * 配色變化策略：banner 自己內部 hardcode 一組 gradient + 字色組合
 * （bannerVariants），不走全站 token；這是因為「banner 是 promo 視覺、本身就是裝飾色」，
 * 不應該被三配色 variant 一起壓平，否則 5 張都會同一色
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

/** Banner 視覺主題：4 種交替使用，5 張 banner 不會出現連續同色 */
type Variant = "warm-orange" | "pink-gold" | "ivory" | "brown-gold";

interface Banner {
  key: string;
  /** 大字標題（2-6 字內最有效） */
  title: string;
  /** 副標 / 描述 */
  desc: string;
  /** CTA 按鈕字 */
  cta: string;
  /** 視覺主題 */
  variant: Variant;
  /** 右側 silhouette seed（給插畫顏色變化） */
  seed: number;
}

const banners: Banner[] = [
  {
    key: "b1",
    title: "新會員首存好禮",
    desc: "註冊即享 100% 首儲金，限額體驗",
    cta: "立即註冊",
    variant: "warm-orange",
    seed: 10
  },
  {
    key: "b2",
    title: "真人視訊 24 小時開放",
    desc: "百家、輪盤、龍虎、骰寶不打烊",
    cta: "進入大廳",
    variant: "pink-gold",
    seed: 24
  },
  {
    key: "b3",
    title: "體育賽事每日特賠",
    desc: "歐美聯賽、亞盤 / 大小球同步開盤",
    cta: "看賽程",
    variant: "ivory",
    seed: 38
  },
  {
    key: "b4",
    title: "電子遊戲免費試玩",
    desc: "千款熱門 slot、JP 累積彩金",
    cta: "試玩體驗",
    variant: "brown-gold",
    seed: 52
  },
  {
    key: "b5",
    title: "VIP 專屬尊榮回饋",
    desc: "升等享每月返水、生日金、專屬客服",
    cta: "查看 VIP 等級",
    variant: "warm-orange",
    seed: 66
  }
];
</script>

<template>
  <section class="noya-m-promo" aria-label="精選活動">
    <div class="noya-m-promo__header">
      <h2 class="noya-m-promo__heading">精選活動</h2>
      <span class="noya-m-promo__count">{{ banners.length }} 個活動進行中</span>
    </div>

    <ul class="noya-m-promo__items">
      <li
        v-for="b in banners"
        :key="b.key"
        class="noya-m-promo__banner"
        :class="`noya-m-promo__banner--${b.variant}`"
        tabindex="0"
      >
        <!-- 左：文字區 -->
        <div class="noya-m-promo__copy">
          <h3 class="noya-m-promo__title">{{ b.title }}</h3>
          <p class="noya-m-promo__desc">{{ b.desc }}</p>
          <button type="button" class="noya-m-promo__cta">
            {{ b.cta }}
            <span class="noya-m-promo__cta-arrow" aria-hidden="true">›</span>
          </button>
        </div>

        <!-- 右：silhouette 插畫（裝飾，不影響語意） -->
        <div class="noya-m-promo__art" aria-hidden="true">
          <AvatarSilhouette :seed="b.seed" variant="vivid" />

          <!-- 漸層遮罩讓 silhouette 與底色融合，不顯得突兀 -->
          <span class="noya-m-promo__art-mask" />
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.noya-m-promo {
  // padding-bottom 由父層 mobile.vue 統一給 tab bar 留空間，元件本身只關心自己內距
  padding: 12px 16px 16px;
  background: var(--bg-base);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 12px;
  }

  &__heading {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    color: var(--color-primary);
    letter-spacing: 2px;
  }

  &__count {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  // 單張 banner 共用基底：橫向 row（左文字 / 右插畫），最小高度 136px
  &__banner {
    display: flex;
    align-items: stretch;
    min-height: 136px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.18s ease;

    // 預設陰影；不同 variant 之間用 box-shadow 走自己色階
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);

    &:active {
      transform: scale(0.985);
    }
  }

  &__copy {
    flex: 1.4;
    min-width: 0;
    padding: 14px 14px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    position: relative;
    z-index: 2;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 1.5px;
    line-height: 1.2;

    // 微微 text-shadow 增加在不同底色上的可讀性
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  &__desc {
    font-size: 11px;
    margin: 0;
    line-height: 1.4;
    letter-spacing: 0.5px;
    opacity: 0.85;
  }

  &__cta {
    align-self: flex-start;
    margin-top: 6px;
    background: rgba(255, 255, 255, 0.85);
    border: none;
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #4a2d18;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease;

    &:hover {
      background: #ffffff;
      transform: translateX(2px);
    }
  }

  &__cta-arrow {
    font-size: 14px;
    line-height: 1;
  }

  &__art {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-width: 0;
  }

  // 漸層遮罩：從 banner 中央往右淡入，讓 silhouette 邊緣與底色融合
  // mask 由左透明 → 右不透明，視覺上像「人形從色塊中浮出」
  &__art-mask {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      currentcolor 0%,
      transparent 40%,
      transparent 100%
    );
    pointer-events: none;
  }

  // 4 種 variant：每張 banner 自己 hardcode gradient + 字色，
  // 不走 token 是因為這是「裝飾色」非「主題色」，三配色 variant 切換時不需要跟著變
  // ---
  // 暖橘：日落感 / 新會員首存好禮類
  &__banner--warm-orange {
    background: linear-gradient(135deg, #ffb38a 0%, #ff7e47 100%);
    color: #4a1e08;

    .noya-m-promo__art {
      color: #ff7e47;
    }
  }

  // 粉金：柔奢感 / 真人視訊類
  &__banner--pink-gold {
    background: linear-gradient(135deg, #f7e1d3 0%, #d4a574 100%);
    color: #4a2c18;

    .noya-m-promo__art {
      color: #d4a574;
    }
  }

  // 米白：素雅感 / 體育賽事類
  &__banner--ivory {
    background: linear-gradient(135deg, #faf3e6 0%, #e8d5b0 100%);
    color: #5a3e1f;

    .noya-m-promo__art {
      color: #c79968;
    }
  }

  // 棕金：沉穩感 / 電子遊戲類
  &__banner--brown-gold {
    background: linear-gradient(135deg, #8a5a2e 0%, #4a2818 100%);
    color: #ffe6c4;

    .noya-m-promo__art {
      color: #4a2818;
    }

    // 深底時 cta 需要更亮的對比
    .noya-m-promo__cta {
      background: var(--color-accent, #f0d4a7);
      color: #2a1408;
    }
  }
}
</style>
