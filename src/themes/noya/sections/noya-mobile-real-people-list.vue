<script setup lang="ts">
// 5 張 promo banner 素材：整合自 kingdom_front
// banner1-signin / banner2-688 / banner3-deposit / banner4-new / banner5-sport
// 主題剛好對應 註冊 / 加碼 / 入金 / 新會員 / 體育
import imgBanner1 from "@/assets/themes/noya/images/banners/banner1-signin.png";
import imgBanner2 from "@/assets/themes/noya/images/banners/banner2-688.png";
import imgBanner3 from "@/assets/themes/noya/images/banners/banner3-deposit.png";
import imgBanner4 from "@/assets/themes/noya/images/banners/banner4-new.png";
import imgBanner5 from "@/assets/themes/noya/images/banners/banner5-sport.png";

/**
 * noya 手機版主內容區 — Round 5 + 第六輪：直立 promo banner 堆疊（實際素材）
 *
 * 元件職責：5 張直立式 banner（每張 ~136px 高）
 *
 * 第六輪改版：
 * - 把原本「左大字標題 + 右 silhouette + hardcode gradient」結構，
 *   改為整張素材圖鋪滿（cover），CTA 按鈕貼底，alt 用標題語意保留可讀性
 * - 原因：素材本身已是完整廣告 banner（含視覺 + 文字），疊上文字會互相打架
 * - alt 文字仍保留語意，screen reader 可正常播放
 *
 * 為何保留檔名 noya-mobile-real-people-list.vue：使用者要求「不動既有檔案結構命名」，
 * 因此檔名保留，內容語意維持 promo banner（用 banner-card / promo-card-row 為 class 前綴釐清）
 *
 * 為何不在父層改 import 路徑：父層 mobile.vue 只 import section 路徑，
 * 元件內部用什麼結構是子層自己的事；改子層即可
 *
 * 配色策略：banner 圖本身就是裝飾色，全站三配色 variant 切換時不會影響 banner 本體；
 * 僅 header 標題、count 文字會跟著 token 切換
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface Banner {
  key: string;
  /** 圖片 alt（語意化標題） */
  alt: string;
  /** CTA 按鈕字 */
  cta: string;
  /** banner 主圖 url */
  image: string;
}

const banners: Banner[] = [
  {
    key: "b1",
    alt: "新會員首存好禮",
    cta: "立即註冊",
    image: imgBanner1
  },
  {
    key: "b2",
    alt: "限時加碼活動",
    cta: "查看詳情",
    image: imgBanner2
  },
  {
    key: "b3",
    alt: "入金加碼回饋",
    cta: "立即入金",
    image: imgBanner3
  },
  {
    key: "b4",
    alt: "新會員專屬好禮",
    cta: "立即體驗",
    image: imgBanner4
  },
  {
    key: "b5",
    alt: "體育賽事每日特賠",
    cta: "看賽程",
    image: imgBanner5
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
        tabindex="0"
      >
        <!--
          banner 主圖：cover 鋪滿；alt 帶語意化標題給 screen reader
          loading=lazy 讓首屏之外的 banner 不阻塞首屏載入
        -->
        <img
          :src="b.image"
          :alt="b.alt"
          class="noya-m-promo__img"
          loading="lazy"
          decoding="async"
        />

        <!-- CTA 按鈕貼右下，半透明白底；點圖任意處即視為觸發 -->
        <button type="button" class="noya-m-promo__cta">
          {{ b.cta }}
          <span class="noya-m-promo__cta-arrow" aria-hidden="true">›</span>
        </button>
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

  // 單張 banner：素材圖鋪滿，CTA 絕對定位貼右下；
  // aspect-ratio 維持 16/7 的廣告 banner 視覺比例，避免不同尺寸圖切版抖動
  &__banner {
    // kingdom DNA：圖片容器 --radius-xl + shadow stack 對齊
    position: relative;
    aspect-ratio: 16 / 7;
    border-radius: var(--radius-xl);
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--transition-base);

    // 主色光暈 shadow-lg + 內陰影模仿玻璃高光
    box-shadow:
      var(--shadow-lg),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);

    &:active {
      transform: scale(0.985);
    }
  }

  // 主圖：cover 鋪滿整張 banner，center 對齊讓重點視覺不被裁
  // stylelint-disable-next-line no-descending-specificity
  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  // CTA 絕對定位右下，半透明白底；不擋圖但 hover 浮起
  &__cta {
    // kingdom DNA：CTA 走 --radius-pill + var transition
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: var(--radius-pill);
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: #4a2d18;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
    transition: all var(--transition-fast);
    z-index: 2;

    &:hover {
      background: #ffffff;
      transform: translateX(2px);
    }
  }

  &__cta-arrow {
    font-size: 14px;
    line-height: 1;
  }
}
</style>
