<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * at99 熱門遊戲區：頂部 4 tab 切換 + 下方 5×2 = 10 個 slot tile
 *
 * 設計：
 * - 4 個分類 tab：電子遊戲 / 彩票遊戲 / 真人視訊 / 棋牌遊戲
 * - 每個 tile：圖像（platform demo 素材） + 標題 + 副標 + 「立即遊玩」按鈕
 * - 切 tab 換 grid 內容；資料寫死在組件內
 *
 * Round 4 對齊原站：原 at99tw.net PC 熱門遊戲是 5 欄 × 2 列 = 10 個 tile，
 * 過往實作為 6×2 = 12 個欄寬偏窄，本次調回 5×2 = 10 個（每張 tile 有更多呼吸空間）
 *
 * 為何 tabs + grid 合併在一個 SFC：tab 是 grid 的控制器，
 * 若拆兩個元件得用 store 或 prop 同步，徒增複雜度
 *
 * 第六輪：tile 中央視覺從「CSS 漸層 + 抽象大字符 + 老虎機輪盤 SVG」換成
 *   實際素材圖（platform demo 系列），每分類兩張變體輪替；
 *   仍保留 corner cut clip-path、top accent bar、底部光帶、spark 粒子（電玩感裝飾）
 *
 * 文字：遊戲名通用幻想名（如「霓虹之夜」「太空冒險」），不抄原站
 */

// 用 import.meta.glob eager 載入 slot 素材；分類→兩張變體
// 每個 tile 依 tile index 在分類陣列內 % 2 拿對應圖
const slotImages = import.meta.glob<string>(
  "@/assets/themes/at99/images/slots/*.png",
  { eager: true, query: "?url", import: "default" }
);

function getSlotImg(name: string): string {
  const key = `/src/assets/themes/at99/images/slots/${name}.png`;
  return slotImages[key] ?? "";
}

/** 每個分類對應 2 張變體素材，tile 依 index % 2 輪替 */
const imagesByCategory: Record<string, string[]> = {
  slot: [getSlotImg("electronic-1"), getSlotImg("electronic-2")],
  lottery: [getSlotImg("lottery-1"), getSlotImg("lottery-2")],
  live: [getSlotImg("live-1"), getSlotImg("live-2")],
  chess: [getSlotImg("chess-1"), getSlotImg("chess-2")]
};

interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), { mobile: false });

interface SlotTile {
  key: string;
  title: string;
  sub: string;
  /** 視覺色相（0-360） */
  hue: number;
  /** 中央大字符（避免直接寫遊戲品牌名） */
  icon: string;
}

interface Category {
  key: string;
  label: string;
  tiles: SlotTile[];
}

const categories: Category[] = [
  {
    key: "slot",
    label: "電子遊戲",
    tiles: [
      { key: "s1", title: "霓虹之夜", sub: "Neon Night", hue: 200, icon: "✦" },
      { key: "s2", title: "黃金國度", sub: "Golden Land", hue: 45, icon: "★" },
      { key: "s3", title: "太空冒險", sub: "Space Quest", hue: 270, icon: "✺" },
      { key: "s4", title: "深海寶藏", sub: "Deep Sea", hue: 180, icon: "✧" },
      {
        key: "s5",
        title: "森林精靈",
        sub: "Forest Spirit",
        hue: 140,
        icon: "✿"
      },
      { key: "s6", title: "火焰戰場", sub: "Fire Field", hue: 10, icon: "✷" },
      { key: "s7", title: "幻夜之歌", sub: "Night Song", hue: 290, icon: "✨" },
      { key: "s8", title: "古代神殿", sub: "Ancient Hall", hue: 30, icon: "✪" },
      {
        key: "s9",
        title: "魔法城堡",
        sub: "Magic Castle",
        hue: 320,
        icon: "⚜"
      },
      {
        key: "s10",
        title: "極光之境",
        sub: "Aurora Land",
        hue: 160,
        icon: "❋"
      }
    ]
  },
  {
    key: "lottery",
    label: "彩票遊戲",
    tiles: [
      { key: "l1", title: "幸運大球", sub: "Big Lotto", hue: 0, icon: "❶" },
      { key: "l2", title: "今彩 539", sub: "Lucky 539", hue: 200, icon: "❷" },
      { key: "l3", title: "雙球大彩", sub: "Twin Pick", hue: 45, icon: "❸" },
      { key: "l4", title: "快樂時時", sub: "Lucky Time", hue: 140, icon: "❹" },
      { key: "l5", title: "六合彩", sub: "Mark Six", hue: 290, icon: "❺" },
      { key: "l6", title: "幸運轉盤", sub: "Lucky Wheel", hue: 30, icon: "❻" },
      { key: "l7", title: "刮刮卡", sub: "Scratch Off", hue: 170, icon: "❼" },
      { key: "l8", title: "賓果連線", sub: "Bingo Line", hue: 320, icon: "❽" },
      { key: "l9", title: "三星彩", sub: "Pick Three", hue: 60, icon: "❾" },
      { key: "l10", title: "彩球連珠", sub: "Ball Combo", hue: 240, icon: "❶" }
    ]
  },
  {
    key: "live",
    label: "真人視訊",
    tiles: [
      { key: "v1", title: "百家樂", sub: "Baccarat", hue: 0, icon: "♠" },
      { key: "v2", title: "龍虎鬥", sub: "Dragon Tiger", hue: 200, icon: "♥" },
      { key: "v3", title: "輪盤賭", sub: "Roulette", hue: 45, icon: "◉" },
      { key: "v4", title: "21 點", sub: "Blackjack", hue: 140, icon: "♣" },
      { key: "v5", title: "骰寶", sub: "Sic Bo", hue: 290, icon: "⚀" },
      { key: "v6", title: "牛牛", sub: "Bull Bull", hue: 30, icon: "♦" },
      { key: "v7", title: "炸金花", sub: "Three Flower", hue: 170, icon: "❀" },
      { key: "v8", title: "鬥地主", sub: "Landlord", hue: 320, icon: "✦" },
      { key: "v9", title: "百搭撲克", sub: "Poker Mix", hue: 60, icon: "♤" },
      { key: "v10", title: "魚蝦蟹", sub: "Fish Shrimp", hue: 240, icon: "✻" }
    ]
  },
  {
    key: "chess",
    label: "棋牌遊戲",
    tiles: [
      { key: "c1", title: "麻將大廳", sub: "Mahjong Hall", hue: 0, icon: "麻" },
      { key: "c2", title: "象棋對決", sub: "Chess Duel", hue: 200, icon: "象" },
      { key: "c3", title: "中國跳棋", sub: "Checkers", hue: 45, icon: "跳" },
      { key: "c4", title: "圍棋大師", sub: "Go Master", hue: 140, icon: "圍" },
      {
        key: "c5",
        title: "撲克大賽",
        sub: "Poker Battle",
        hue: 290,
        icon: "撲"
      },
      { key: "c6", title: "鬥地主", sub: "Landlord", hue: 30, icon: "鬥" },
      { key: "c7", title: "拱豬戰", sub: "Hearts", hue: 170, icon: "豬" },
      {
        key: "c8",
        title: "橋牌大廳",
        sub: "Bridge Hall",
        hue: 320,
        icon: "橋"
      },
      { key: "c9", title: "五子相連", sub: "Gomoku", hue: 60, icon: "五" },
      { key: "c10", title: "海戰棋", sub: "Battleship", hue: 240, icon: "海" }
    ]
  }
];

const activeKey = ref<string>("slot");

const activeCategory = computed(
  () => categories.find((c) => c.key === activeKey.value) ?? categories[0]
);
</script>

<template>
  <section class="at99-slots" :class="{ 'at99-slots--mobile': mobile }">
    <div class="at99-slots__inner">
      <!-- 4 tab -->
      <div class="at99-slots__tabs">
        <button
          v-for="c in categories"
          :key="c.key"
          type="button"
          class="at99-slots__tab"
          :class="{ 'at99-slots__tab--active': activeKey === c.key }"
          @click="activeKey = c.key"
        >
          {{ c.label }}
        </button>
        <div class="at99-slots__more">
          <a href="#" class="at99-slots__more-link">全部 ›</a>
        </div>
      </div>

      <!-- 5×2 grid（round 4 對齊原站，從 6 欄改為 5 欄）-->
      <div class="at99-slots__grid">
        <article
          v-for="(t, idx) in activeCategory.tiles"
          :key="t.key"
          class="at99-slots__tile"
          :style="{
            // Round 5：以 tile 自身 hue 作為 css var，給內部多元素共用
            // 第六輪：素材圖鋪滿後 hue 主要影響 spark / halo / hover 光暈色調，
            //   仍保留變化避免 10 個 tile 視覺完全一致
            '--tile-hue': t.hue,
            '--tile-color-main': `hsl(${t.hue}, 75%, 55%)`,
            '--tile-color-deep': `hsl(${(t.hue + 30) % 360}, 70%, 22%)`,
            '--tile-color-glow': `hsla(${t.hue}, 90%, 60%, 0.55)`
          }"
          tabindex="0"
        >
          <!-- Round 5：金色頂飾條（top accent bar），與電玩機台頂飾呼應 -->
          <div class="at99-slots__top-accent" aria-hidden="true" />

          <div class="at99-slots__art">
            <!--
              第六輪：素材圖鋪滿，每分類兩張變體輪替（idx % 2）
              cover + center 保證主視覺不被裁；
              loading=lazy 讓非當前 tab 的 tile 不阻塞首屏
            -->
            <img
              :src="
                imagesByCategory[activeKey][
                  idx % imagesByCategory[activeKey].length
                ]
              "
              :alt="t.title"
              class="at99-slots__art-img"
              loading="lazy"
              decoding="async"
            />

            <!-- 中央獎金光暈：保留作為輕度疊加，hover 時放大 -->
            <span class="at99-slots__halo" aria-hidden="true" />

            <!-- 4 顆發光粒子（散落於圖面四角，加電玩感） -->
            <span class="at99-slots__spark at99-slots__spark--1" />
            <span class="at99-slots__spark at99-slots__spark--2" />
            <span class="at99-slots__spark at99-slots__spark--3" />
            <span class="at99-slots__spark at99-slots__spark--4" />

            <!-- 底部光帶（既有） -->
            <span class="at99-slots__glow" />
          </div>

          <div class="at99-slots__meta">
            <div class="at99-slots__title">{{ t.title }}</div>
            <div class="at99-slots__sub">{{ t.sub }}</div>
          </div>
          <button type="button" class="at99-slots__play">立即遊玩</button>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.at99-slots {
  background: var(--bg-base);
  padding: 24px 0;
  padding-left: var(--dock-offset); // 留 dock 空間，走 token 集中管理

  &__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &__tabs {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  &__tab {
    background: var(--bg-surface);
    color: var(--text-muted);
    border: 1px solid var(--border);
    padding: 8px 18px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 1px;

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }

    &--active {
      background: var(--gradient-cta);
      color: var(--text-on-primary);
      border-color: var(--color-primary);
      box-shadow: var(--neon-glow);
    }
  }

  &__more {
    margin-left: auto;
  }

  &__more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;

    &:hover {
      text-shadow: 0 0 6px var(--color-primary);
    }
  }

  &__grid {
    display: grid;

    // Round 4 對齊原站 at99tw.net：PC 5 欄 × 2 列 = 10 tile（從 6 欄改為 5 欄）
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  // Round 5：tile 加 corner cut（左上 + 右下斜切）
  // clip-path 達成非矩形外型；border-radius 不能與 clip-path 並存（會被裁），
  // 因此邊框改用 background gradient + clip-path 兩層方案
  // 為了讓邊光擴散不被 overflow:hidden 切到，hover 邊光由 filter drop-shadow 處理
  &__tile {
    position: relative;
    background: var(--slot-tile-bg);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition:
      transform 0.22s ease,
      filter 0.25s ease;

    // 左上 / 右下 corner cut，角度 16px 斜切；其他角為直角
    clip-path: polygon(
      16px 0,
      100% 0,
      100% calc(100% - 16px),
      calc(100% - 16px) 100%,
      0 100%,
      0 16px
    );

    // hover 3D 浮起 + 多層金色 / hue 色光暈
    &:hover,
    &:focus-visible {
      transform: translateY(-6px) scale(1.02);
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45))
        drop-shadow(0 0 18px var(--tile-color-glow))
        drop-shadow(0 0 8px var(--color-accent));
      outline: none;

      .at99-slots__top-accent {
        // hover 時頂飾條提亮並擴展寬度
        opacity: 1;
        height: 4px;
      }

      .at99-slots__halo {
        // hover 中央光暈放大
        transform: translate(-50%, -50%) scale(1.25);
        opacity: 0.95;
      }
    }
  }

  // 金色頂飾條：橫跨 tile 頂部，hover 時加粗加亮
  // stylelint-disable-next-line no-descending-specificity
  &__top-accent {
    position: absolute;
    inset: 0 0 auto;
    height: 3px;
    background: var(--gradient-gold);
    opacity: 0.85;
    z-index: 5;
    transition: all 0.2s ease;
    box-shadow: 0 0 6px var(--color-accent);
  }

  &__art {
    aspect-ratio: 5 / 4;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  // 素材底圖：cover 鋪滿整個 art 容器
  // 圖本身已是視覺主體，halo / spark 只是輕度疊加的電玩氛圍
  // stylelint-disable-next-line no-descending-specificity
  &__art-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    z-index: 0;
  }

  // 中央獎金光暈：橢圓光球疊在素材圖之上，加深「中獎」氛圍
  // stylelint-disable-next-line no-descending-specificity
  &__halo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--tile-color-glow) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    opacity: 0.5;
    pointer-events: none;
    z-index: 1;
    transition: all 0.25s ease;
    mix-blend-mode: screen;
  }

  // 4 顆小發光粒子：絕對位置散落，獨立 keyframes 浮動
  // 用同色系（accent 金）讓畫面整體統一在金色系上
  &__spark {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent);
    box-shadow:
      0 0 4px var(--color-accent),
      0 0 10px var(--color-accent);
    z-index: 2;
    pointer-events: none;
    animation: at99-slot-spark-float 3s ease-in-out infinite;

    &--1 {
      top: 18%;
      left: 18%;
      animation-delay: 0s;
    }

    &--2 {
      top: 28%;
      right: 14%;
      animation-delay: 0.6s;
      width: 4px;
      height: 4px;
    }

    &--3 {
      bottom: 22%;
      left: 22%;
      animation-delay: 1.2s;
      width: 3px;
      height: 3px;
    }

    &--4 {
      bottom: 16%;
      right: 20%;
      animation-delay: 1.8s;
    }
  }

  &__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 100%,
      rgba(255, 255, 255, 0.22) 0%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 1;
  }

  &__meta {
    padding: 8px 10px 4px;
  }

  &__title {
    font-size: 13px;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.1;
    letter-spacing: 1px;
  }

  &__sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  &__play {
    margin: 6px 10px 10px;
    height: 28px;
    background: var(--gradient-gold);
    color: var(--text-on-gold);
    border: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &:hover {
      filter: brightness(1.1);
    }
  }

  &--mobile {
    // mobile 不留 dock 空間：padding shorthand 直接覆寫，左右為 0
    padding: 16px 0;

    .at99-slots__inner {
      padding: 0 12px;
    }

    .at99-slots__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .at99-slots__tab {
      padding: 6px 12px;
      font-size: 12px;
    }

    // mobile 縮小 corner cut 角度，避免 tile 過小時斜角佔比過大
    .at99-slots__tile {
      clip-path: polygon(
        12px 0,
        100% 0,
        100% calc(100% - 12px),
        calc(100% - 12px) 100%,
        0 100%,
        0 12px
      );
    }
  }
}

// 粒子光點上下浮動 + 透明度交替，營造火花閃爍感
@keyframes at99-slot-spark-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.95;
  }

  50% {
    transform: translateY(-6px) scale(1.15);
    opacity: 0.5;
  }
}
</style>
