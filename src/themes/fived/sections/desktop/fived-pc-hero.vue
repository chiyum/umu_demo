<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import slide1 from "../../assets/banner/slide-1.jpg?url";
import slide2 from "../../assets/banner/slide-2.jpg?url";
import slide3 from "../../assets/banner/slide-3.jpg?url";
import newsIcon from "../../assets/icon/news-icon.png?url";

/**
 * fived desktop hero — 對齊 5d_v2 _index.scss .index-block--swiper
 *
 * 原作結構：
 *   .index-block.index-block--swiper {
 *     display: grid;
 *     grid-template-columns: 66.5% 1fr;   ← 左 banner / 右 news
 *     gap: implicit
 *   }
 *   .index-slider-wrap         ← banner swiper
 *   <News />                    ← 公告區（PC 顯示在右邊獨立直欄）
 *
 * Demo 化：
 * - 雙欄 grid 完全照原作 66.5% / 33.5%
 * - 左 banner swiper（米金邊 + 方點 pagination）
 * - 右 news 卡（titleBox + 多色 tag + MORE 按鈕，內容比 mobile 多 8 筆）
 */

interface NewsItem {
  id: number;
  tag: "系統" | "促銷" | "其他" | "活動" | "遊戲";
  title: string;
  date: string;
}

const SLIDES = [slide1, slide2, slide3];
const activeIdx = ref<number>(0);
let timer: number | null = null;

const NEWS: NewsItem[] = [
  {
    id: 1,
    tag: "活動",
    title: "週末儲值送 50%，活動限時 72 小時",
    date: "06/06"
  },
  { id: 2, tag: "遊戲", title: "ATG 戰神塞特跨夜爆獎 188 萬", date: "06/05" },
  {
    id: 3,
    tag: "系統",
    title: "系統維護通知：每週四 03:00-05:00",
    date: "06/05"
  },
  { id: 4, tag: "促銷", title: "新用戶註冊即送 $100 體驗金", date: "06/04" },
  { id: 5, tag: "其他", title: "客服服務時間調整公告", date: "06/03" },
  { id: 6, tag: "遊戲", title: "全新「鳳凰之翼」電子遊戲上線", date: "06/02" },
  { id: 7, tag: "活動", title: "雙倍紅利週，老用戶專屬回饋", date: "06/01" },
  { id: 8, tag: "系統", title: "App 1.5.0 上線，多項體驗優化", date: "05/30" }
];

const tagColorMap: Record<NewsItem["tag"], string> = {
  系統: "var(--fived-tag-system)",
  促銷: "var(--fived-tag-promo)",
  其他: "var(--fived-tag-other)",
  活動: "var(--fived-tag-event)",
  遊戲: "var(--fived-tag-game)"
};

function getTagColor(tag: NewsItem["tag"]): string {
  return tagColorMap[tag];
}

onMounted(() => {
  timer = window.setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % SLIDES.length;
  }, 3500);
});

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer);
});
</script>

<template>
  <section class="fived-pc-hero">
    <div class="fived-pc-hero__inner">
      <!-- 左欄 banner（對齊原作 .index-slider-wrap 66.5%）-->
      <div class="fived-pc-hero__banner">
        <div class="fived-pc-hero__slider">
          <figure
            v-for="(src, idx) in SLIDES"
            :key="idx"
            class="fived-pc-hero__slide"
            :class="{ 'fived-pc-hero__slide--active': activeIdx === idx }"
            :style="{ backgroundImage: `url(${src})` }"
          />
          <div class="fived-pc-hero__dots">
            <span
              v-for="(_, idx) in SLIDES"
              :key="idx"
              class="fived-pc-hero__dot"
              :class="{ 'fived-pc-hero__dot--active': activeIdx === idx }"
            />
          </div>
        </div>
      </div>

      <!-- 右欄 news（對齊原作 News 元件 33.5%）-->
      <aside class="fived-pc-hero__news">
        <header class="fived-pc-hero__news-title">
          <img :src="newsIcon" alt="" class="fived-pc-hero__news-icon" />
          <h2 class="fived-pc-hero__news-cn">最新公告</h2>
          <span class="fived-pc-hero__news-en">NEWS</span>
        </header>

        <ul class="fived-pc-hero__news-list">
          <li v-for="n in NEWS" :key="n.id" class="fived-pc-hero__news-item">
            <span
              class="fived-pc-hero__news-tag"
              :style="{ color: getTagColor(n.tag) }"
            >
              【{{ n.tag }}】
            </span>
            <span class="fived-pc-hero__news-text">{{ n.title }}</span>
            <span class="fived-pc-hero__news-date">{{ n.date }}</span>
          </li>
        </ul>

        <div class="fived-pc-hero__news-more">
          <a href="#" class="fived-pc-hero__news-more-link">MORE</a>
        </div>
      </aside>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fived-pc-hero {
  padding: 28px 0 24px;
}

.fived-pc-hero__inner {
  width: 1280px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
  padding: 0 16px;

  // 對齊原作：grid-template-columns 66.5% 1fr / gap implicit
  display: grid;
  grid-template-columns: 66.5% 1fr;
  gap: 20px;
  align-items: stretch;
}

// 左欄 banner
.fived-pc-hero__banner {
  position: relative;
}

.fived-pc-hero__slider {
  position: relative;
  width: 100%;
  aspect-ratio: 852 / 455;
  border-radius: 8px;
  overflow: hidden;
}

.fived-pc-hero__slide {
  position: absolute;
  inset: 0;
  margin: 0;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  border: 2px solid var(--fived-banner-border);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--active {
    opacity: 1;
  }
}

.fived-pc-hero__dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.fived-pc-hero__dot {
  width: 14px;
  height: 4px;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.5);
  filter: drop-shadow(var(--shadow-glow-dot));
  transition: background 0.3s ease;

  &--active {
    background: rgba(255, 255, 255, 1);
  }
}

// 右欄 news
.fived-pc-hero__news {
  display: flex;
  flex-direction: column;
  background: rgba(46, 24, 34, 0.65);
  border: 2px solid var(--fived-banner-border);
  border-radius: 8px;
  padding: 16px 16px 12px;
  box-shadow: var(--shadow-md);
}

.fived-pc-hero__news-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.fived-pc-hero__news-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  align-self: center;
}

.fived-pc-hero__news-cn {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--fived-title-cn);
  letter-spacing: 1px;
}

.fived-pc-hero__news-en {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--fived-title-en);
  letter-spacing: 2px;
}

.fived-pc-hero__news-list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.fived-pc-hero__news-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-size: 13px;
  color: var(--text-on-primary);
  border-bottom: 1px dashed rgba(226, 189, 135, 0.18);
  cursor: pointer;
  transition: color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--primary-01);
  }
}

.fived-pc-hero__news-tag {
  font-weight: 800;
  flex-shrink: 0;
}

.fived-pc-hero__news-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fived-pc-hero__news-date {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 11px;
}

.fived-pc-hero__news-more {
  margin-top: 12px;
  text-align: center;
}

.fived-pc-hero__news-more-link {
  display: inline-block;
  padding: 8px 32px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 4px;
  color: var(--text-on-gold);
  background: var(--gradient-gold);
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(226, 189, 135, 0.32);
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.08);
  }
}
</style>
