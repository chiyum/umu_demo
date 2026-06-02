<script setup lang="ts">
// 六角卡中央視覺：改用整合自 kingdom_front 的 platform demo 圖
// 四張遊戲類別卡片圖：真人 / 體育 / 棋牌 / 電子
import imgLive from "@/assets/themes/noya/images/games/live.png";
import imgSport from "@/assets/themes/noya/images/games/sport.png";
import imgChess from "@/assets/themes/noya/images/games/chess.png";
import imgSlot from "@/assets/themes/noya/images/games/slot.png";

/**
 * noya 熱門遊戲區 — Round 5 改版：4 張六角形大卡（橫排）
 *
 * 設計：
 * - 從原本 4 欄 × 2 列 = 8 張矩形卡，改為 1 欄 × 4 張橫排「六角形大卡」
 * - 每張卡：頂部分類大字（真人視訊 / 體育 / 棋牌 / 電子）+ 中央素材圖 + 底部 CTA
 * - 六角形邊界用 clip-path: polygon(...) 達成，外層金色細線（用 background gradient + clip-path 套疊）
 * - hover 浮起 + 金色發光（box-shadow 因 clip-path 會被裁掉，改用內層 drop-shadow filter 在父層）
 *
 * 為何 4 張不是 5 張：使用者要求「4 張六角形大卡（橫排）」對齊真人/體育/棋牌/電子四大主分類；
 * 捕魚另外放在 main-nav 跳轉，不佔熱門卡片版面
 *
 * 為何不用 SVG <polygon>：clip-path 對 div 比 SVG 嵌套圖片 + 文字更簡單，
 * 且讓內部 layout 用一般 flex 排版，不必處理 SVG 內 foreignObject
 *
 * 第六輪：原本中央用 AvatarSilhouette 純抽象剪影，改為實際素材圖（platform demo 系列）
 *   讓六角卡有實際遊戲視覺，且仍保留六角金邊外型與 LIVE 徽章
 *
 * 文字：類別名通用佔位（不抄原站）
 */

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface HexCard {
  key: string;
  /** 分類大字（中文，頂部顯示） */
  category: string;
  /** 副標（英文） */
  sub: string;
  /** 中央素材圖（已 import 後的 url） */
  image: string;
  /** 圖片 alt 文字 */
  alt: string;
  /** 是否上 LIVE 徽章 */
  isLive: boolean;
}

const cards: HexCard[] = [
  {
    key: "live",
    category: "真人視訊",
    sub: "Live Casino",
    image: imgLive,
    alt: "真人視訊示意圖",
    isLive: true
  },
  {
    key: "sport",
    category: "體育賽事",
    sub: "Sports Betting",
    image: imgSport,
    alt: "體育賽事示意圖",
    isLive: true
  },
  {
    key: "chess",
    category: "棋牌遊戲",
    sub: "Card Games",
    image: imgChess,
    alt: "棋牌遊戲示意圖",
    isLive: false
  },
  {
    key: "slot",
    category: "電子遊戲",
    sub: "Slots & Arcade",
    image: imgSlot,
    alt: "電子遊戲示意圖",
    isLive: true
  }
];
</script>

<template>
  <section
    id="games"
    class="noya-popular"
    :class="{ 'noya-popular--mobile': mobile }"
  >
    <div class="noya-popular__inner">
      <div class="noya-popular__grid">
        <article
          v-for="c in cards"
          :key="c.key"
          class="noya-popular__hex"
          tabindex="0"
        >
          <!--
            外層金色細邊框：用 clip-path 內外兩層 div 套色階達成
            - hex-frame 走金色 gradient 當邊框底
            - hex-card 內縮 2px 並走 surface 色，視覺上像金色細描邊
          -->
          <div class="noya-popular__hex-frame" aria-hidden="true" />
          <div class="noya-popular__hex-card">
            <!-- 頂部分類大字 -->
            <header class="noya-popular__hex-header">
              <h3 class="noya-popular__hex-title">{{ c.category }}</h3>
              <span class="noya-popular__hex-sub">{{ c.sub }}</span>
            </header>

            <!-- 中央素材圖 -->
            <div class="noya-popular__hex-media">
              <!--
                img 用 object-fit: cover 填滿六角內部矩形容器，
                超出 clip-path 範圍的會被外層自動裁掉
                loading=lazy 給首屏外的卡片省流量
              -->
              <img
                :src="c.image"
                :alt="c.alt"
                class="noya-popular__hex-img"
                loading="lazy"
                decoding="async"
              />
              <!-- LIVE 徽章保留，讓有 stream 的卡片更搶眼 -->
              <span v-if="c.isLive" class="noya-popular__live">LIVE</span>
            </div>

            <!-- 底部 CTA -->
            <footer class="noya-popular__hex-footer">
              <button type="button" class="noya-popular__play">立即遊玩</button>
            </footer>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 六角形 clip-path：top/bottom 中央兩個尖點，左右各兩個 45度角
// 由於要保留卡片內部夠多版面給「標題 / 圖像 / 按鈕」三段內容，
// 故水平方向縮少（10% / 90%），垂直方向（0 / 100%）給滿，
// 形成「直立式拉長六角形」而非寬六角
$hex-clip: polygon(50% 0%, 95% 18%, 95% 82%, 50% 100%, 5% 82%, 5% 18%);

.noya-popular {
  background: var(--bg-base);

  // 整體上下留呼吸空間，給金色發光不被切掉
  padding: 24px 0 40px;

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  // 4 張橫排，gap 給金色發光不互相蓋住
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  // 單張六角卡的容器：relative 讓 frame / card 兩層絕對堆疊；
  // aspect-ratio 維持六角形視覺比例（直立拉長）
  &__hex {
    position: relative;
    aspect-ratio: 5 / 6;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      filter 0.25s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-6px);

      // clip-path 會吃掉 box-shadow，改用 drop-shadow 在父層
      // kingdom DNA：兩層 drop-shadow（柔陰影 + 金色光暈），與 shadow-lg/glow 規律一致
      filter: drop-shadow(0 8px 18px var(--bg-overlay))
        drop-shadow(var(--shadow-glow));
      outline: none;

      // hover 時 frame 提亮一層
      .noya-popular__hex-frame {
        filter: brightness(1.18) saturate(1.1);
      }
    }
  }

  // 金邊：用 clip-path 在「絕對定位 inset:0」的 div 上跑金色 gradient
  // 內層 hex-card 縮 2px，留出金線寬度
  // stylelint-disable-next-line no-descending-specificity
  &__hex-frame {
    position: absolute;
    inset: 0;
    background: var(--gradient-gold, var(--gradient-cta));
    clip-path: $hex-clip;
    transition: filter 0.25s ease;
  }

  // 內層卡：縮 2px 形成「金邊 + 內容白底」
  &__hex-card {
    position: absolute;
    inset: 2px;
    background: var(--bg-surface);
    clip-path: $hex-clip;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // 內距較寬，避免內容被 clip-path 切到（尤其左右兩側上下交界）
    padding: 18px 12px 14px;
  }

  &__hex-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    text-align: center;
    flex-shrink: 0;
  }

  &__hex-title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 800;
    margin: 0;
    color: var(--color-primary);
    letter-spacing: 3px;
    line-height: 1.1;

    // 金色標題輕微 inner-glow，與金邊呼應
    text-shadow: 0 0 8px var(--bg-overlay);
  }

  &__hex-sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  // 中央素材圖容器：填滿剩餘空間
  &__hex-media {
    position: relative;
    flex: 1;
    margin: 8px 6px;
    overflow: hidden;
    border-radius: 6px;
  }

  // 中央素材圖 cover 整個 media 區域；
  // 因為 hex-card 已套 clip-path，超出的邊角會自然被裁掉
  &__hex-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__live {
    position: absolute;
    top: 6px;
    left: 6px;
    background: var(--badge-live);
    color: #ffffff;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.5px;
    padding: 2px 6px;
    border-radius: 4px;
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    animation: noya-live-pulse 1.6s ease-in-out infinite;
  }

  &__hex-footer {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
  }

  // 立即遊玩按鈕：金色實心圓角，集中對齊
  // kingdom DNA：pill 形 CTA + var token / filter brightness hover 慣例
  &__play {
    background: var(--gradient-gold, var(--gradient-cta));
    color: var(--text-on-gold, var(--text-on-primary));
    border: none;
    border-radius: var(--radius-pill);
    padding: 7px 18px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.5px;
    cursor: pointer;
    box-shadow:
      0 2px 6px var(--bg-overlay),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
    transition: filter var(--transition-fast);

    &:hover {
      filter: var(--filter-hover-strong);
    }
  }

  // mobile 版：4 張仍橫排會太擠，改為 2 × 2
  &--mobile {
    padding: 16px 0 24px;

    .noya-popular__inner {
      padding: 0 16px;
    }

    .noya-popular__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .noya-popular__hex-title {
      font-size: 15px;
      letter-spacing: 2px;
    }

    .noya-popular__hex-sub {
      font-size: 9px;
      letter-spacing: 1.5px;
    }

    .noya-popular__play {
      padding: 6px 14px;
      font-size: 10px;
    }
  }
}

@keyframes noya-live-pulse {
  0%,
  100% {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  50% {
    box-shadow: 0 0 8px var(--badge-live);
  }
}
</style>
