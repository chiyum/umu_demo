<script setup lang="ts">
import { ref } from "vue";
// 借用 ant-sport 的 7 張遊戲類別圖（內容對齊：sport / live / chess / esport / lottery / fish / egame）
// 圖片本身藍 / 中性運動風，搭藍冰主題不違和
// 只 import 實際在 games 陣列用到的 4 種：sport / live / slot / fish
// lottery / chess 雖然是 sidebar 分類選項，但 games 列表 demo 沒對應卡片，不需 import
import imgHot from "@/themes/ant-sport/assets/pc/game-sport.png?url";
import imgLive from "@/themes/ant-sport/assets/pc/game-live.png?url";
import imgSlot from "@/themes/ant-sport/assets/pc/game-egame.png?url";
import imgFish from "@/themes/ant-sport/assets/pc/game-fish.png?url";

/**
 * tycoon mobile body —「左 sidebar 6 分類 + 右遊戲卡片 6 個」
 *
 * 對齊使用者設計稿 .body 段，這是設計稿與其他 theme 最大差異的核心結構：
 * - 左側固定 74px 寬度的縱列 sidebar：6 個分類卡（Hot / 真人 / 彩票 / 棋牌 / 電子 / 捕魚）
 *   - 每張卡：icon + label 上下排列
 *   - Hot 卡左上角有「HOT!」紅色斜體浮動標籤
 *   - active 卡片：藍漸層底 + 白字
 * - 右側 flex: 1 的遊戲卡片列表：6 張橫式遊戲卡
 *   - 每張卡 96px 高：左側中文名 + 英文 outline 字 / 右側 figure 圖
 *   - 卡片底用對角白光條紋強化「冰光感」
 *
 * 為什麼分類 icon 用 inline SVG 而非圖檔：
 * - 任務描述明確要求「不要新增任何外部圖檔」
 * - 6 個簡單分類 icon 用 monochrome SVG 自繪最輕量
 * - currentColor + 父層 color 切換 → active 狀態整個 icon 跟著變白
 *
 * 為什麼右側遊戲卡 figure 用既有素材而非 placeholder：
 * - 設計稿用 dashed border 條紋底色當 placeholder，是因為他沒圖
 * - 我們有 ant-sport 既有遊戲圖可借，補上更精緻
 */

interface CatItem {
  key: string;
  label: string;
  /** 是否帶「HOT!」浮動標籤 */
  hot?: boolean;
}

interface GameItem {
  key: string;
  cn: string;
  en: string;
  image: string;
}

const cats: CatItem[] = [
  { key: "hot", label: "Hot", hot: true },
  { key: "live", label: "真人" },
  { key: "lotto", label: "彩票" },
  { key: "poker", label: "棋牌" },
  { key: "slot", label: "電子" },
  { key: "fish", label: "捕魚" }
];

const games: GameItem[] = [
  { key: "g1", cn: "DG 真人", en: "DG LIVE", image: imgLive },
  { key: "g2", cn: "熊貓體育", en: "PANDA SPORTS", image: imgHot },
  { key: "g3", cn: "QT 電子", en: "QT SLOTS", image: imgSlot },
  { key: "g4", cn: "美女直播", en: "OFA GIRLS", image: imgLive },
  { key: "g5", cn: "RSG 電子", en: "RSG SLOTS", image: imgSlot },
  { key: "g6", cn: "JDB 捕魚", en: "JDB FISHING", image: imgFish }
];

/** 當前 active 分類 key（預設 hot） */
const activeCat = ref<string>("hot");

function pickCat(item: CatItem): void {
  activeCat.value = item.key;
}
</script>

<template>
  <div class="tycoon-m-body">
    <!-- 左側：6 分類 sidebar -->
    <nav class="tycoon-m-body__side" aria-label="遊戲分類">
      <button
        v-for="c in cats"
        :key="c.key"
        type="button"
        class="tycoon-m-body__cat"
        :class="{ 'tycoon-m-body__cat--active': activeCat === c.key }"
        :aria-pressed="activeCat === c.key"
        @click="pickCat(c)"
      >
        <!-- HOT! 浮動標籤 -->
        <span v-if="c.hot" class="tycoon-m-body__cat-hot" aria-hidden="true">
          HOT!
        </span>

        <!-- 分類 icon：每個分類獨立 SVG path，currentColor 跟父層顏色 -->
        <span class="tycoon-m-body__cat-ico" aria-hidden="true">
          <!-- HOT 火焰 -->
          <svg v-if="c.key === 'hot'" viewBox="0 0 24 24" focusable="false">
            <path
              fill="currentColor"
              d="M12 2c1 3-2 4-2 7a3 3 0 0 0 6 0c0-1-.3-2-.3-2 1.6 1 3.3 3 3.3 6a7 7 0 1 1-14 0c0-4 3-7 4-9 1.2 1 2 2 3 3 .2-1.6-1-3-1-5z"
            />
          </svg>
          <!-- 真人直播 -->
          <svg
            v-else-if="c.key === 'live'"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M12 3a8 8 0 0 0-8 8v4a3 3 0 0 0 3 3h1v-7H6a6 6 0 0 1 12 0H16v7h1a3 3 0 0 0 3-3v-4a8 8 0 0 0-8-8z"
            />
          </svg>
          <!-- 彩票 -->
          <svg
            v-else-if="c.key === 'lotto'"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <circle cx="12" cy="12" r="9" fill="currentColor" />
            <circle cx="12" cy="12" r="5.5" fill="#fff" />
            <text
              x="12"
              y="15"
              font-size="7"
              font-weight="900"
              text-anchor="middle"
              fill="currentColor"
              font-family="Inter, sans-serif"
            >
              6
            </text>
          </svg>
          <!-- 棋牌（撲克牌） -->
          <svg
            v-else-if="c.key === 'poker'"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <rect
              x="5"
              y="4"
              width="11"
              height="15"
              rx="2"
              fill="currentColor"
            />
            <rect x="8" y="6" width="11" height="15" rx="2" fill="#5aa6f5" />
            <path
              fill="#fff"
              d="M13.5 9l2 2.4c.5.6.1 1.6-.8 1.6-.4 0-.7-.3-.7-.3s0 1.3.5 1.8h-2.5c.5-.5.5-1.8.5-1.8s-.3.3-.7.3c-.9 0-1.3-1-.8-1.6z"
            />
          </svg>
          <!-- 電子 slot 機 -->
          <svg
            v-else-if="c.key === 'slot'"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <rect
              x="3"
              y="6"
              width="18"
              height="13"
              rx="2.5"
              fill="currentColor"
            />
            <rect x="5.5" y="9" width="3.5" height="7" rx="1" fill="#fff" />
            <rect x="10.2" y="9" width="3.5" height="7" rx="1" fill="#fff" />
            <rect x="14.9" y="9" width="3.5" height="7" rx="1" fill="#fff" />
            <rect
              x="9"
              y="3.5"
              width="6"
              height="3"
              rx="1.5"
              fill="currentColor"
            />
          </svg>
          <!-- 捕魚 -->
          <svg v-else viewBox="0 0 24 24" focusable="false">
            <path
              fill="currentColor"
              d="M3 12c3-5 9-6 13-3l4-3-1 6 1 6-4-3c-4 3-10 2-13-3zm12-1.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"
            />
          </svg>
        </span>

        <span class="tycoon-m-body__cat-lbl">{{ c.label }}</span>
      </button>
    </nav>

    <!-- 右側：遊戲卡列表 -->
    <ul class="tycoon-m-body__games" role="list">
      <li v-for="g in games" :key="g.key" class="tycoon-m-body__game">
        <div class="tycoon-m-body__game-txt">
          <div class="tycoon-m-body__game-cn">{{ g.cn }}</div>
          <div class="tycoon-m-body__game-en">{{ g.en }}</div>
        </div>
        <div class="tycoon-m-body__game-figure">
          <img
            :src="g.image"
            :alt="`${g.cn} 主視覺`"
            class="tycoon-m-body__game-img"
            loading="lazy"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// 對齊設計稿 .body 規格：
// - display: flex / gap: 12 / padding: 14px 14px 0
// - .side width: 74px / gap: 11px
// - .game height: 96px / radius: 18px
// - .game .cn font-size 21 weight 900 color #0d3f8e
// - .game .en font-size 22 Inter italic outline字
.tycoon-m-body {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 14px 0;

  // ─────── sidebar 6 分類 ───────
  &__side {
    display: flex;
    flex-direction: column;
    gap: 11px;
    flex: none;
    width: 74px;
  }

  // 單張分類卡（對齊 .cat）
  // - 白漸層底 + inset 白邊 + 卡片藍陰影
  // - active：藍漸層底 + 白字 + 重陰影
  // 為何用 button 而非 div：a11y 要 keyboard focusable + role 預設語意，aria-pressed 反映狀態
  &__cat {
    position: relative;
    padding: 11px 4px 8px;
    border: none;
    border-radius: 16px;
    background: linear-gradient(
      180deg,
      var(--bg-surface) 0%,
      var(--tycoon-ice-1) 100%
    );
    color: var(--primary-05);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    box-shadow:
      0 3px 9px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease,
      background 0.15s ease;

    &:active {
      transform: scale(0.95);
    }

    // active 狀態：藍漸層底 + 白字
    &--active {
      color: var(--text-on-primary);
      background: linear-gradient(
        180deg,
        var(--primary-04) 0%,
        var(--primary-05) 100%
      );
      box-shadow:
        0 5px 14px
          hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
  }

  // HOT! 浮動標籤（對齊設計稿 .cat .hot）
  // - 上方突出 7px，向左斜旋 -8 度，橙紅 Inter italic 900
  // - 不擋住 cat 內容區（pointer-events: none）
  &__cat-hot {
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%) rotate(-8deg);
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 0.5px;
    color: var(--badge-live);
    text-shadow: 0 1px 0 #ffffff;
    pointer-events: none;
  }

  &__cat-ico {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  &__cat-ico svg {
    width: 100%;
    height: 100%;
  }

  &__cat-lbl {
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  }

  // ─────── 右側遊戲卡列表 ───────
  &__games {
    flex: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
  }

  // 單張遊戲卡（對齊 .game）
  // - 110deg 漸層底（白 → 淺冰白 → 淺冰）+ inset 白邊 + 藍陰影
  // - ::after 對角白光條紋強化冰光感
  // - flex: 文字左、圖右；高度 96px 固定
  &__game {
    position: relative;
    height: 96px;
    border-radius: 18px;
    overflow: hidden;
    background: linear-gradient(
      110deg,
      #fbfdff 30%,
      var(--tycoon-ice-1) 70%,
      var(--tycoon-ice-2) 100%
    );
    box-shadow:
      0 5px 14px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;

    &:active {
      transform: translateY(1px) scale(0.99);
    }

    // 對角白光條紋（對齊設計稿 .game::after）
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        115deg,
        transparent 55%,
        rgba(255, 255, 255, 0.6) 62%,
        transparent 67%
      );
      pointer-events: none;
    }
  }

  &__game-txt {
    position: relative;
    z-index: 2;
    padding-left: 22px;
  }

  // 中文名（對齊 .game .cn 21px / 900 / #0d3f8e）
  &__game-cn {
    font-size: 21px;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: var(--secondary-01);
  }

  // 英文名 outline 字（對齊 .game .en 22px / Inter italic 800 / 描邊 + 漸層）
  // 走「透明 fill + 1px stroke + 淡漸層 background-clip」做出 outline 效果
  &__game-en {
    margin-top: 2px;
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 0.5px;
    line-height: 1;
    -webkit-text-stroke: 1px hsla(var(--primary-h), var(--primary-s), 70%, 0.7);
    background: linear-gradient(180deg, #cfe0f6 0%, #a9c8ee 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  // 右側 figure：遊戲圖
  // - 用 mask 從左淡出讓圖只在右側可見，避免擠壓左側文字
  // - 寬度 150px 對齊設計稿 .game .figure
  &__game-figure {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 150px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    mask-image: linear-gradient(90deg, transparent 0%, #000000 35%);
  }

  &__game-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px 12px;
    opacity: 0.9;
  }
}
</style>
