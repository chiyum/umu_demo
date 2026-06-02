<script setup lang="ts">
// 第十輪：六角卡中央視覺改用 noya providers 接近正方比例的圖（444×368，~1.2:1）
// 原本走 games/live.png 等長條 banner 圖（626×182，~3.4:1），塞進近正方 hex media 容器後
// 圖被嚴重橫向拉伸 / 縱向裁切大半，主視覺看不見；
// providers/{live,sport,chess,slot}-1 是接近正方的人物圖，cover 後中心可視範圍才合理
import imgLive from "@/assets/themes/noya/images/providers/live-1.png";
import imgSport from "@/assets/themes/noya/images/providers/sport-1.png";
import imgChess from "@/assets/themes/noya/images/providers/chess-1.png";
import imgSlot from "@/assets/themes/noya/images/providers/slot-1.png";

// Round 9：5d_v2 中文遊戲卡（無平台 logo，可作為「精選熱門」橫滾條）
// 6 張遊戲卡作為類別大卡下方的「實際熱門款」展示
import gameRocket from "@/assets/themes/noya/extra/games/rocket-king.png";
import gameMonster from "@/assets/themes/noya/extra/games/monster-arena.png";
import gameFairy from "@/assets/themes/noya/extra/games/fairy-treasure.png";
import gameLamp from "@/assets/themes/noya/extra/games/lamp-legend.png";
import gameQin from "@/assets/themes/noya/extra/games/qin-emperor.png";
import gameDog from "@/assets/themes/noya/extra/games/dog-feast.png";

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

interface FeaturedGame {
  key: string;
  /** 遊戲名（中文，純展示） */
  name: string;
  /** 副標籤（HOT / NEW / LIVE） */
  tag: "HOT" | "NEW" | "LIVE";
  /** 遊戲圖（已 import 的 url） */
  image: string;
}

// 精選熱門遊戲（6 張）：5d_v2 中文遊戲卡素材
// 為何放這裡而不另開 section：六角分類卡是「分類入口」抽象，精選遊戲是「實際款」具象，
//  兩者同屬「熱門遊戲」section 上下層級，視覺連貫且 ribbon 動線一致
const featured: FeaturedGame[] = [
  { key: "rocket", name: "無敵火箭王", tag: "HOT", image: gameRocket },
  { key: "monster", name: "怪獸大決戰", tag: "NEW", image: gameMonster },
  { key: "fairy", name: "精靈寶藏", tag: "HOT", image: gameFairy },
  { key: "lamp", name: "神燈奇譚", tag: "LIVE", image: gameLamp },
  { key: "qin", name: "秦皇霸業", tag: "HOT", image: gameQin },
  { key: "dog", name: "狗狗當家", tag: "NEW", image: gameDog }
];

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
      <!--
        DNA #8：補上熱門遊戲 section 標題列（原本只有六角卡無大標題）
        kingdom-block-label 套主漸層 cta 粗條，與右側英文副標構成 kingdom 風 header
      -->
      <header class="noya-popular__header">
        <h2 class="noya-popular__heading kingdom-block-label">熱門遊戲</h2>
        <span class="noya-popular__heading-sub">Popular Categories</span>
      </header>

      <div class="noya-popular__grid">
        <!-- 4 張六角形分類大卡（live / sport / chess / slot） -->
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

      <!--
        Round 9：精選熱門遊戲橫條（6 張，5d_v2 中文遊戲卡素材）
        為何放在六角分類卡之下：六角是「分類入口」抽象、featured 是「實際款」具象，
        從抽象到具象的層級會讓使用者第一眼看到分類後再看到實際遊戲；
        手機版改為 2 欄 3 列以避免橫滾消費過多版面
      -->
      <div class="noya-popular__featured-block">
        <header class="noya-popular__featured-header">
          <h3 class="noya-popular__featured-heading kingdom-block-label">
            精選熱門
          </h3>
          <span class="noya-popular__featured-sub">Featured Picks</span>
        </header>

        <ul class="noya-popular__featured-list" role="list">
          <li
            v-for="g in featured"
            :key="g.key"
            class="noya-popular__featured-item"
            tabindex="0"
          >
            <div class="noya-popular__featured-media">
              <img
                :src="g.image"
                :alt="`${g.name} 示意圖`"
                class="noya-popular__featured-img"
                loading="lazy"
                decoding="async"
              />
              <span
                class="noya-popular__featured-tag"
                :class="`noya-popular__featured-tag--${g.tag.toLowerCase()}`"
              >
                {{ g.tag }}
              </span>
            </div>
            <p class="noya-popular__featured-name">{{ g.name }}</p>
          </li>
        </ul>
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

  // section 大標題列：DNA #8 block-label 粗條 + 英文副標
  &__header {
    display: flex;
    align-items: baseline;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
  }

  &__heading {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 800;
    color: var(--color-primary);
    letter-spacing: 2px;
    margin: 0;
    padding-left: 10px;
  }

  &__heading-sub {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 3px;
    text-transform: uppercase;
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

  // 第十輪：中央素材圖容器改為固定接近正方 aspect-ratio (1:1)
  // 為什麼從 flex:1 改為固定比例：原 flex:1 把容器拉成寬扁矩形，與圖片本身比例完全不合；
  // 改 1:1 後接近正方的 provider 圖（444×368）可完整呈現中心人物視覺
  // margin 自動撐開避免 hex clip-path 切到圖
  &__hex-media {
    position: relative;
    flex: 1;
    aspect-ratio: 1 / 1;
    align-self: center;
    width: calc(100% - 12px);
    margin: 8px 6px;
    overflow: hidden;
    border-radius: 6px;
  }

  // 中央素材圖 cover 整個 media 區域；
  // 因為 hex-card 已套 clip-path，超出的邊角會自然被裁掉
  // object-position: center 維持人物中心可視，配合接近正方的圖不會被截頭
  &__hex-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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

  // ─────────────── Round 9：精選熱門遊戲橫條（5d_v2 中文遊戲卡） ───────────────
  // 為何用獨立 sub-block：與六角卡分離視覺層級，但共用同一 section 動線
  &__featured-block {
    margin-top: var(--space-xl);
  }

  &__featured-header {
    display: flex;
    align-items: baseline;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
  }

  &__featured-heading {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 800;
    color: var(--color-primary);
    letter-spacing: 1.5px;
    margin: 0;
    padding-left: 10px;
  }

  &__featured-sub {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }

  &__featured-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__featured-item {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);

    // hover：金邊 + 上浮 + 多層 drop-shadow（kingdom DNA 立體金屬感）
    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      border-color: var(--color-accent);
      box-shadow:
        0 6px 14px var(--bg-overlay),
        0 0 18px var(--bg-overlay),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
      outline: none;
    }
  }

  // 第十輪：5d_v2 中文遊戲卡原圖約 1014×450（2.25:1）
  // 原 aspect-ratio: 5/3 (1.67:1) 會把圖橫向裁掉約 1/4，主圖文字常被切到；
  // 改成 20/9 (2.22:1) 接近原圖比例，圖可完整展示
  &__featured-media {
    position: relative;
    aspect-ratio: 20 / 9;
    overflow: hidden;
  }

  // stylelint-disable-next-line no-descending-specificity
  &__featured-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--transition-base);
  }

  &__featured-item:hover &__featured-img {
    transform: scale(1.06);
  }

  &__featured-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 2px 7px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
    border-radius: var(--radius-sm);
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    // 三種 tag 各自走 token，配色變主題時自動跟著走
    &--hot {
      background: var(--badge-live);
    }

    &--new {
      background: var(--gradient-cta);
    }

    &--live {
      background: var(--badge-live);
      animation: noya-live-pulse 1.6s ease-in-out infinite;
    }
  }

  &__featured-name {
    margin: 0;
    padding: 8px 10px 10px;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    letter-spacing: 1px;
  }

  // mobile 版：4 張仍橫排會太擠，改為 2 × 2
  &--mobile {
    padding: 16px 0 24px;

    .noya-popular__inner {
      padding: 0 16px;
    }

    // mobile section 標題縮一級避免佔太多版面
    .noya-popular__heading {
      font-size: 20px;
      letter-spacing: 1.5px;
    }

    .noya-popular__heading-sub {
      font-size: 10px;
      letter-spacing: 2px;
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

    // featured 區改 2 欄 3 列，避免 6 欄擠到看不清
    .noya-popular__featured-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .noya-popular__featured-heading {
      font-size: 17px;
    }

    .noya-popular__featured-sub {
      font-size: 10px;
    }

    .noya-popular__featured-name {
      font-size: 12px;
      padding: 6px 8px 8px;
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
