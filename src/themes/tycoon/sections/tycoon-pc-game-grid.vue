<script setup lang="ts">
import { ref } from "vue";
// 借用 ant-sport 既有遊戲圖（藍 / 中性色調與藍冰系搭配自然）
// 只 import games 陣列實際用到的 4 種；其餘 sidebar 分類沒對應卡片不必引入
import imgHot from "@/themes/ant-sport/assets/pc/game-sport.png?url";
import imgLive from "@/themes/ant-sport/assets/pc/game-live.png?url";
import imgSlot from "@/themes/ant-sport/assets/pc/game-egame.png?url";
import imgFish from "@/themes/ant-sport/assets/pc/game-fish.png?url";

/**
 * tycoon PC 遊戲區 — 左 sidebar 6 分類 + 右遊戲卡列表
 *
 * 這是 tycoon 與 ant-sport 最大差異點（任務描述明確指定）：
 * - ant-sport：上排 7 個 tab + 下方左大圖右文字（單一類別深度展示）
 * - tycoon  ：左側固定 sidebar + 右側橫向遊戲卡列表（廣度展示，呼應 mobile 設計稿）
 *
 * 為什麼 PC 也用 sidebar 結構：
 * - 設計稿 mobile 的 body 區是「左 sidebar 6 分類 + 右 6 遊戲卡」
 * - 同樣這套結構直接放大到 PC viewport，左 sidebar 加寬 + 卡片變大、橫向間距變寬
 * - 不重複 ant-sport tabs 的視覺套路，建立 tycoon 自己的識別
 *
 * 為什麼遊戲卡走橫式 96px 高（PC 也保持）：
 * - 與 mobile 完全一致的視覺語言，使用者切換 mobile / desktop 認得是同一個品牌
 * - PC 卡片直接 6 卡縱排列，sidebar 在左、卡片在右
 */

interface CatItem {
  key: string;
  label: string;
  hot?: boolean;
}

interface GameItem {
  key: string;
  cn: string;
  en: string;
  image: string;
  /** 對應分類 key */
  cat: string;
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
  { key: "g1", cn: "DG 真人", en: "DG LIVE", image: imgLive, cat: "live" },
  { key: "g2", cn: "熊貓體育", en: "PANDA SPORTS", image: imgHot, cat: "hot" },
  { key: "g3", cn: "QT 電子", en: "QT SLOTS", image: imgSlot, cat: "slot" },
  { key: "g4", cn: "美女直播", en: "OFA GIRLS", image: imgLive, cat: "live" },
  { key: "g5", cn: "RSG 電子", en: "RSG SLOTS", image: imgSlot, cat: "slot" },
  { key: "g6", cn: "JDB 捕魚", en: "JDB FISHING", image: imgFish, cat: "fish" }
];

const activeCat = ref<string>("hot");

function pickCat(item: CatItem): void {
  activeCat.value = item.key;
}
</script>

<template>
  <section class="tycoon-pc-game" aria-label="遊戲分類與卡片">
    <div class="tycoon-pc-game__inner">
      <header class="tycoon-pc-game__header">
        <h2 class="tycoon-pc-game__title">熱門遊戲</h2>
        <p class="tycoon-pc-game__subtitle">
          挑選分類，立即進入藍冰大亨專屬遊戲廳
        </p>
      </header>

      <div class="tycoon-pc-game__layout">
        <!-- 左側：6 分類 sidebar（直立卡片堆疊） -->
        <nav class="tycoon-pc-game__side" aria-label="遊戲分類">
          <button
            v-for="c in cats"
            :key="c.key"
            type="button"
            class="tycoon-pc-game__cat"
            :class="{ 'tycoon-pc-game__cat--active': activeCat === c.key }"
            :aria-pressed="activeCat === c.key"
            @click="pickCat(c)"
          >
            <span
              v-if="c.hot"
              class="tycoon-pc-game__cat-hot"
              aria-hidden="true"
            >
              HOT!
            </span>
            <span class="tycoon-pc-game__cat-ico" aria-hidden="true">
              <!-- 6 個分類 SVG（與 mobile 完全同 path 來源） -->
              <svg v-if="c.key === 'hot'" viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M12 2c1 3-2 4-2 7a3 3 0 0 0 6 0c0-1-.3-2-.3-2 1.6 1 3.3 3 3.3 6a7 7 0 1 1-14 0c0-4 3-7 4-9 1.2 1 2 2 3 3 .2-1.6-1-3-1-5z"
                />
              </svg>
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
                <rect
                  x="8"
                  y="6"
                  width="11"
                  height="15"
                  rx="2"
                  fill="#5aa6f5"
                />
                <path
                  fill="#fff"
                  d="M13.5 9l2 2.4c.5.6.1 1.6-.8 1.6-.4 0-.7-.3-.7-.3s0 1.3.5 1.8h-2.5c.5-.5.5-1.8.5-1.8s-.3.3-.7.3c-.9 0-1.3-1-.8-1.6z"
                />
              </svg>
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
                <rect
                  x="10.2"
                  y="9"
                  width="3.5"
                  height="7"
                  rx="1"
                  fill="#fff"
                />
                <rect
                  x="14.9"
                  y="9"
                  width="3.5"
                  height="7"
                  rx="1"
                  fill="#fff"
                />
                <rect
                  x="9"
                  y="3.5"
                  width="6"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M3 12c3-5 9-6 13-3l4-3-1 6 1 6-4-3c-4 3-10 2-13-3zm12-1.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"
                />
              </svg>
            </span>
            <span class="tycoon-pc-game__cat-lbl">{{ c.label }}</span>
          </button>
        </nav>

        <!-- 右側：遊戲卡片列表（橫式卡，每張 110px 高） -->
        <ul class="tycoon-pc-game__games" role="list">
          <li v-for="g in games" :key="g.key" class="tycoon-pc-game__game">
            <div class="tycoon-pc-game__game-txt">
              <div class="tycoon-pc-game__game-cn">{{ g.cn }}</div>
              <div class="tycoon-pc-game__game-en">{{ g.en }}</div>
            </div>
            <div class="tycoon-pc-game__game-figure">
              <img
                :src="g.image"
                :alt="`${g.cn} 主視覺`"
                class="tycoon-pc-game__game-img"
                loading="lazy"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// PC 遊戲區規格：1200 寬容器 + 左 120px sidebar + 右 flex: 1 卡片列表
.tycoon-pc-game {
  padding: 80px 0 40px;
  background: var(--bg-base);

  &__inner {
    width: 1200px;
    max-width: calc(100% - 48px);
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 36px;
  }

  &__title {
    margin: 0;
    font-size: 38px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 2px;
    font-family: var(--font-display);
  }

  &__subtitle {
    margin: 8px 0 0;
    font-size: 15px;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  &__layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  // ─────── 左側 sidebar 6 分類（PC 寬 120px） ───────
  &__side {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: none;
    width: 120px;
  }

  // 分類卡（與 mobile 同設計語言但放大尺寸）
  &__cat {
    position: relative;
    padding: 18px 6px 14px;
    border: none;
    border-radius: 18px;
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
    gap: 8px;
    box-shadow:
      0 4px 12px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    transition: all 0.18s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0 6px 16px
          hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.28),
        inset 0 0 0 1.5px #ffffff;
    }

    &--active {
      color: var(--text-on-primary);
      background: linear-gradient(
        180deg,
        var(--primary-04) 0%,
        var(--primary-05) 100%
      );
      box-shadow:
        0 6px 16px
          hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
  }

  &__cat-hot {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(-8deg);
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 900;
    font-size: 13px;
    letter-spacing: 0.5px;
    color: var(--badge-live);
    text-shadow: 0 1px 0 #ffffff;
    pointer-events: none;
  }

  &__cat-ico {
    width: 42px;
    height: 42px;
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
    font-size: 14px;
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
    gap: 16px;
    min-width: 0;
  }

  // 單張遊戲卡（PC 高 110px、文字級別放大）
  &__game {
    position: relative;
    height: 110px;
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(
      110deg,
      #fbfdff 30%,
      var(--tycoon-ice-1) 70%,
      var(--tycoon-ice-2) 100%
    );
    box-shadow:
      0 6px 18px var(--tycoon-card-glow),
      inset 0 0 0 1.5px #ffffff;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0 10px 24px
          hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.32),
        inset 0 0 0 1.5px #ffffff;
    }

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
    padding-left: 32px;
  }

  &__game-cn {
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: var(--secondary-01);
  }

  &__game-en {
    margin-top: 4px;
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 800;
    font-size: 26px;
    letter-spacing: 0.5px;
    line-height: 1;

    -webkit-text-stroke: 1px hsla(var(--primary-h), var(--primary-s), 70%, 0.7);
    background: linear-gradient(180deg, #cfe0f6 0%, #a9c8ee 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  &__game-figure {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    mask-image: linear-gradient(90deg, transparent 0%, #000000 35%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000000 35%);
  }

  &__game-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px 16px;
    opacity: 0.92;
  }
}
</style>
