<script setup lang="ts">
//
// 第六輪結構：保留 Round 4 的「雙 banner 同列並排」（左 7fr 主 + 右 5fr 次），
// 但每張 banner 從「CSS 漸層 + 自繪 token 金幣 + decor 大字 + 完整 copy 區塊」
// 換成整張 kingdom_front 廣告素材鋪滿，僅留 CTA 按鈕貼右下。
// 這跟 noya mobile banner 處理一致：素材本身已是完整廣告，疊文字會打架。
//

/**
 * at99 主視覺 promo banner — 第六輪：實際素材鋪滿版
 *
 * 設計：
 * - PC：grid 2 欄（左 7fr 大 banner + 右 5fr 次 banner），同時可見
 * - Mobile：壓成單欄直疊，避免並排在窄畫面被壓扁
 * - 視覺：banner-deposit / banner-new 兩張 kingdom_front 廣告 banner
 * - 文案：拿掉，僅以 alt 表達 + CTA 按鈕貼右下
 *
 * 為何保留檔名 `at99-promo-banner-carousel.vue`：避免改檔名觸發全域 search/replace，
 * 元件 class 維持 `at99-promo-c`（c = carousel），語意上以「promo carousel 區塊」
 * 視之即可。
 */

// 兩張 banner 素材：deposit / new（對應入金加碼 / 新會員加碼兩個主題）
import imgDeposit from "@/assets/themes/at99/images/banners/banner-deposit.png";
import imgNew from "@/assets/themes/at99/images/banners/banner-new.png";

// Round 9：sub-banner 4 張節慶素材（5d_v2，無平台字樣純中文藝術）
// 為何加 sub-banner 而非取代主 banner：主 banner 已是「入金 / 新會員」實際 promo 主題，
// sub-banner 走「節慶活動 / 限定遊戲」副推，與主推不打架且擴充 promo 覆蓋面
import subGoldenSnake from "@/assets/themes/at99/extra/banners/golden-snake.png";
import subQinBanner from "@/assets/themes/at99/extra/banners/qin-banner.png";
import subMiniSnake from "@/assets/themes/at99/extra/banners/mini-snake.png";
// 重複拿 homeGame2 怪獸當第 4 張，可避免再 cp 一張，bundle 更小
import subMonster from "@/assets/themes/noya/extra/games/monster-arena.png";

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface Slide {
  key: string;
  /** 圖片 alt（語意化標題） */
  alt: string;
  /** CTA 按鈕字 */
  cta: string;
  /** 主視覺素材 url */
  image: string;
}

// 雙 banner 並列：左大張 (主推) + 右小張 (次推)
const slides: Slide[] = [
  {
    key: "p1",
    alt: "首存豪禮．百倍回饋",
    cta: "立即參加",
    image: imgDeposit
  },
  {
    key: "p2",
    alt: "新會員專屬加碼",
    cta: "查看詳情",
    image: imgNew
  }
];

interface SubBanner {
  key: string;
  alt: string;
  label: string;
  image: string;
}

// Round 9：sub-banner 4 張（節慶 / 限定遊戲）
const subBanners: SubBanner[] = [
  {
    key: "sb1",
    alt: "霸旺大金蛇 限定",
    label: "新春限定",
    image: subGoldenSnake
  },
  { key: "sb2", alt: "秦皇霸業", label: "熱門推薦", image: subQinBanner },
  { key: "sb3", alt: "霸旺小金蛇", label: "新春限定", image: subMiniSnake },
  { key: "sb4", alt: "怪獸大決戰", label: "玩家最愛", image: subMonster }
];
</script>

<template>
  <section class="at99-promo-c" :class="{ 'at99-promo-c--mobile': mobile }">
    <div class="at99-promo-c__inner">
      <!-- 雙 banner 並列（round 4 對齊原站）：左大張 + 右小張 -->
      <div class="at99-promo-c__row">
        <article
          v-for="(s, i) in slides"
          :key="s.key"
          class="at99-promo-c__slide"
          :class="{
            'at99-promo-c__slide--primary': i === 0,
            'at99-promo-c__slide--secondary': i === 1
          }"
        >
          <!--
            素材鋪滿整個 banner；alt 給 screen reader
            loading=lazy 讓非首屏 banner 不阻塞首屏
          -->
          <img
            :src="s.image"
            :alt="s.alt"
            class="at99-promo-c__img"
            loading="lazy"
            decoding="async"
          />

          <!-- CTA 按鈕貼右下，金色霓虹按鈕；不擋圖主要視覺 -->
          <button type="button" class="at99-promo-c__cta">
            {{ s.cta }}
          </button>
        </article>
      </div>

      <!--
        kingdom DNA #12：swiper 風格白圓點分頁指示
        本元件目前是靜態雙 banner 並列，但保留 kingdom 慣例的「分頁圓點」視覺暗示
        讓使用者一眼看出這區是 promo 輪播語意；第一顆為 active 對應主推 banner
        為何不做真的輪播：原 round 4 設計刻意把雙圖同時可見，互動體驗更直接
      -->
      <div class="at99-promo-c__pagination" aria-hidden="true">
        <span class="at99-promo-c__dot at99-promo-c__dot--on" />
        <span class="at99-promo-c__dot" />
      </div>

      <!--
        Round 9：sub-banner 4 張橫條（節慶 / 限定遊戲，5d_v2 素材）
        為何放在 pagination 下：先看主推、再看分頁、最後 sub-banner 是「同 promo 區的次層延伸」
        每張卡覆蓋對應 label 與遊戲名，hover 上浮 + 金色邊框立體感
      -->
      <ul class="at99-promo-c__sub-row" role="list">
        <li
          v-for="sb in subBanners"
          :key="sb.key"
          class="at99-promo-c__sub-card"
          tabindex="0"
        >
          <img
            :src="sb.image"
            :alt="sb.alt"
            class="at99-promo-c__sub-img"
            loading="lazy"
            decoding="async"
          />
          <span class="at99-promo-c__sub-label">{{ sb.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-promo-c {
  background: var(--bg-base);
  padding: 24px 0 12px;

  // PC：左側 sidebar dock 預留空間，寬度走 token，集中管理
  padding-left: var(--dock-offset);

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  // 雙 banner 並列 row：7fr 大 + 5fr 小
  // 比例貼近原站 at99tw.net PC promo 區（左主推較寬、右次推較窄）
  &__row {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: 16px;
  }

  // banner slide：素材圖鋪滿，CTA 絕對貼右下
  // aspect-ratio 32/13 對齊原站 PC 雙 banner 視覺比例
  &__slide {
    // kingdom DNA：圖片容器 --radius-xl（16px）+ shadow-lg 帶主色光暈
    position: relative;
    aspect-ratio: 32 / 13;
    min-height: 200px;
    overflow: hidden;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
  }

  // 主圖：cover 鋪滿整張 banner，center 對齊讓重點視覺不被裁
  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  &__cta {
    // kingdom DNA：金色 CTA 走 --radius-sm（6px）+ filter brightness soft
    position: absolute;
    right: 24px;
    bottom: 22px;
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 22px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 0 12px var(--color-accent);
    text-transform: uppercase;
    z-index: 2;
    transition: filter var(--transition-fast);

    &:hover {
      filter: var(--filter-hover-soft);
    }
  }

  // kingdom DNA #12：swiper pagination 白圓點區
  // 對齊 kingdom_front banner.vue 的 .swiper-pagination-bullet 慣例：
  //   非選中：rgba(255,255,255,0.55)；active：純白 #ffffff
  // 深底 at99 環境下白圓點對比強，不需要額外陰影框
  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
    margin-top: var(--space-md);
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-circle);
    background: rgba(255, 255, 255, 0.55);
    transition: all var(--transition-base);

    &--on {
      background: #ffffff;

      // active dot 拉成短條，與 noya 一致的 swiper-pagination「active 拉長」視覺
      width: 22px;
      border-radius: 4px;

      // 深底加白色 active 配上微光暈，模擬 kingdom 主色光感
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }

  // ─────────────── Round 9：sub-banner row（4 張小卡） ───────────────
  &__sub-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-top: var(--space-md);
    padding: 0;
    list-style: none;
  }

  // 第十輪：sub-banner 4 張原圖比例差異大（最寬 2.32:1、最窄 1.45:1）
  // 原 5/3 (1.67:1) 對較寬圖會裁很多、對較窄圖會把上下黑邊塞滿；
  // 改 16/9 (~1.78:1) 作為折衷，搭配 object-fit: cover + center 把各圖中心區域對齊
  &__sub-card {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg-surface);
    cursor: pointer;
    transition: all var(--transition-base);

    // hover：金邊光暈 + 上浮 + 多層 shadow，kingdom 立體金屬感
    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      border-color: var(--color-accent);
      box-shadow:
        0 6px 14px var(--bg-overlay),
        0 0 18px rgba(255, 216, 77, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
      outline: none;
    }
  }

  // stylelint-disable-next-line no-descending-specificity
  &__sub-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform var(--transition-base);
  }

  &__sub-card:hover &__sub-img {
    transform: scale(1.05);
  }

  &__sub-label {
    position: absolute;
    bottom: 8px;
    left: 8px;
    background: rgba(0, 0, 0, 0.55);
    color: var(--color-accent);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 3px 9px;
    border-radius: var(--radius-sm);
    backdrop-filter: blur(4px);
  }

  &--mobile {
    // mobile 不留 dock 空間：padding 直接覆寫，左右 0 等同移除 dock-offset
    padding: 16px 0 8px;

    .at99-promo-c__inner {
      padding: 0 16px;
    }

    // 雙 banner 在窄畫面壓單欄直疊，避免並排被壓扁看不清楚
    .at99-promo-c__row {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .at99-promo-c__slide {
      min-height: 150px;
      aspect-ratio: 16 / 7;
    }

    .at99-promo-c__cta {
      right: 12px;
      bottom: 12px;
      padding: 7px 14px;
      font-size: 11px;
    }

    // sub-banner mobile 改 2 欄 2 列，避免 4 欄擠
    .at99-promo-c__sub-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .at99-promo-c__sub-label {
      font-size: 10px;
      padding: 2px 6px;
    }
  }
}
</style>
