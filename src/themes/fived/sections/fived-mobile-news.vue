<script setup lang="ts">
import { ref } from "vue";
import newsIcon from "../assets/icon/news-icon.png?url";

/**
 * fived mobile 公告 / 最新消息卡 — 對齊 5d_v2 src/components/pages/home/news.vue
 *
 * 原作結構：
 *   .news-wrap
 *     .news-bg.newFrame-style  ← 金邊框風格
 *       .news-list
 *         .titleBox            ← icon + 中文標題 + 英文副標
 *           <img news_icon /> + <h2>最新公告</h2> + <h3>NEWS</h3>
 *         .news-list-tab       ← 5 tab（全部 / 系統 / 促銷 / 其他 / 活動 / 遊戲）
 *         <ul><li>            ← 每筆：tag 多色 + 標題 + 日期
 *
 * 原作 tagColorMap 顏色：
 *   系統 #1CDADC / 促銷 #ff02bc / 其他 #ffffff / 活動 #f9cc44 / 遊戲 #f76965
 *
 * Demo 化：
 * - 6 筆假資料 + 4 tab filter + 多色 tag
 * - tag 顏色完全照原作 tagColorMap
 */

interface NewsItem {
  id: number;
  tag: "系統" | "促銷" | "其他" | "活動" | "遊戲";
  title: string;
  date: string;
}

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
  { id: 6, tag: "遊戲", title: "全新「鳳凰之翼」電子遊戲上線", date: "06/02" }
];

const TABS = ["全部", "系統", "促銷", "活動", "遊戲"];
const activeTab = ref<string>("全部");

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

const filtered = computed<NewsItem[]>(() => {
  if (activeTab.value === "全部") return NEWS;
  return NEWS.filter((n) => n.tag === activeTab.value);
});
</script>

<template>
  <section class="fived-m-news">
    <div class="fived-m-news__frame">
      <header class="fived-m-news__title">
        <img :src="newsIcon" alt="" class="fived-m-news__icon" />
        <h2 class="fived-m-news__cn">最新公告</h2>
        <span class="fived-m-news__en">NEWS</span>
      </header>

      <nav class="fived-m-news__tabs" aria-label="公告分類">
        <button
          v-for="t in TABS"
          :key="t"
          type="button"
          class="fived-m-news__tab"
          :class="{ 'fived-m-news__tab--active': activeTab === t }"
          @click="activeTab = t"
        >
          【{{ t }}】
        </button>
      </nav>

      <ul class="fived-m-news__list">
        <li v-for="n in filtered" :key="n.id" class="fived-m-news__item">
          <span
            class="fived-m-news__tag"
            :style="{ color: getTagColor(n.tag) }"
          >
            【{{ n.tag }}】
          </span>
          <span class="fived-m-news__title-text">{{ n.title }}</span>
          <span class="fived-m-news__date">{{ n.date }}</span>
        </li>
      </ul>

      <div class="fived-m-news__more">
        <a href="#" class="fived-m-news__more-link">MORE</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 對齊原作 .news-bg.newFrame-style：金框風（demo 化用 2px 金邊 + 暗底）
.fived-m-news {
  padding: 0 12px;
  margin: 12px 0;
}

.fived-m-news__frame {
  position: relative;
  background: rgba(46, 24, 34, 0.65);
  border: 2px solid var(--fived-banner-border);
  border-radius: 8px;
  padding: 14px 14px 12px;
  box-shadow: var(--shadow-md);
}

// 對齊原作 .titleBox：icon + cn + en 三層橫排
.fived-m-news__title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.fived-m-news__icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  align-self: center;
}

.fived-m-news__cn {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--fived-title-cn);
  letter-spacing: 1px;
}

.fived-m-news__en {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: var(--fived-title-en);
  letter-spacing: 2px;
}

// 對齊原作 .news-list-tab：橫向 5 tab，active 帶高亮
.fived-m-news__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.fived-m-news__tab {
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  font-family: inherit;
  transition: all 0.15s ease;

  &--active,
  &:hover {
    color: var(--primary-01);
    background: rgba(226, 189, 135, 0.12);
  }
}

// 對齊原作 .news-list ul li：tag + 標題 + 日期橫排
.fived-m-news__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.fived-m-news__item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-size: 13px;
  color: var(--text-on-primary);
  border-bottom: 1px dashed rgba(226, 189, 135, 0.2);
  cursor: pointer;
  transition: color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--primary-01);
  }
}

.fived-m-news__tag {
  font-weight: 800;
  flex-shrink: 0;
}

.fived-m-news__title-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fived-m-news__date {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 11px;
}

.fived-m-news__more {
  margin-top: 8px;
  text-align: center;
}

.fived-m-news__more-link {
  display: inline-block;
  padding: 6px 24px;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 4px;
  color: var(--text-on-gold);
  background: var(--gradient-gold);
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(226, 189, 135, 0.32);
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.08);
  }
}
</style>
