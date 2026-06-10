<script setup lang="ts">
/**
 * daheng-rank desktop：a06 大亨排行榜 PC 重構版面
 *
 * 為什麼 PC 完全不抄 mobile 結構：
 * - 使用者要求 PC 「不是 RWD 縮放、版面完全重構」
 * - 手機 = 直立排行榜 list 5 行 + 右側 2 欄遊戲縮圖
 * - PC = 左側 fixed sidebar（品牌 + 7 分類）+ 中央上 hero banner + 中央下排行榜橫向卡片帶（5 張橫排）+ 右側 promo / activity 側欄
 *
 * 版面構成（1440 設計寬度）：
 *   左 sidebar 220px（fixed）+ 中央 main 940px（hero 全寬 + 排行榜橫排）+ 右 sidebar 220px（promo 側欄）
 *
 * 為什麼 sidebar 不用 dahsing-shared 的 sidebar：
 * - 大亨品牌色 + 7 分類用大圖塊感（mobile cats-row 直接放大化），跟 dahsing-sidebar 視覺差異大
 * - 走自家 token，視覺一致性更好
 */
import { computed } from "vue";
import {
  DAHENG_CATS,
  DAHENG_GAMES,
  DAHENG_RANKS,
  heroSrc,
  mascotLogoSrc,
  trophySrc
} from "../daheng-shared/_data";
import DahengCatIcon from "../daheng-shared/atoms/daheng-cat-icon.vue";

// 排行榜橫排卡片：對應 5 名各自配一張遊戲縮圖（用 GAMES 前 5 張）
const rankCards = computed(() =>
  DAHENG_RANKS.map((r, i) => ({
    ...r,
    img: DAHENG_GAMES[i]?.img ?? DAHENG_GAMES[0].img
  }))
);
</script>

<template>
  <div class="daheng-rank-pc">
    <!-- 左側 fixed sidebar：品牌 + 7 分類 nav -->
    <aside class="daheng-rank-pc__sidebar">
      <div class="daheng-rank-pc__brand">
        <img
          :src="mascotLogoSrc"
          alt="大亨"
          class="daheng-rank-pc__brand-logo"
        />
        <div class="daheng-rank-pc__brand-title">大亨娛樂城</div>
      </div>
      <nav class="daheng-rank-pc__nav">
        <div
          v-for="(cat, i) in DAHENG_CATS"
          :key="cat.key"
          class="daheng-rank-pc__nav-item"
          :class="{ 'daheng-rank-pc__nav-item--active': i === 0 }"
        >
          <span class="daheng-rank-pc__nav-icon">
            <DahengCatIcon :kind="cat.iconKind" />
          </span>
          <span class="daheng-rank-pc__nav-label">{{ cat.label }}</span>
          <span v-if="cat.hot" class="daheng-rank-pc__nav-hot">HOT</span>
        </div>
      </nav>
      <div class="daheng-rank-pc__sidebar-auth">
        <button type="button" class="daheng-rank-pc__btn-reg">註冊</button>
        <button type="button" class="daheng-rank-pc__btn-login">登入</button>
      </div>
    </aside>

    <!-- 中央 main：hero + 排行榜橫排卡片帶 + 遊戲牆 -->
    <main class="daheng-rank-pc__main">
      <section class="daheng-rank-pc__hero">
        <img :src="heroSrc" alt="首存1000送1000" />
        <div class="daheng-rank-pc__hero-tag">本週主打 · 首存翻倍</div>
      </section>

      <section class="daheng-rank-pc__rank-section">
        <header class="daheng-rank-pc__sec-head">
          <h2>
            <span class="daheng-rank-pc__flame">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2c1 3-1 4-2 6-1 1.7-3 3-3 6a5 5 0 0 0 10 0c0-2-1-3-1-4 1 .4 2 1.2 2 2 .8-1 1-2 1-3 0-3-3-5-3-8-1.5 1-2 2.5-2 3 0-2-1-3-2-4Z"
                  fill="#e8642a"
                />
              </svg>
            </span>
            排行榜 TOP 5
          </h2>
          <span class="daheng-rank-pc__more">查看全部</span>
        </header>
        <div class="daheng-rank-pc__rank-strip">
          <div
            v-for="r in rankCards"
            :key="r.n"
            class="daheng-rank-pc__rank-card"
          >
            <div class="daheng-rank-pc__rank-card-img">
              <img :src="r.img" :alt="r.name" />
              <span class="daheng-rank-pc__rank-card-num">{{ r.n }}</span>
            </div>
            <div class="daheng-rank-pc__rank-card-meta">
              <b>{{ r.name }}</b>
              <small>{{ r.en }}</small>
            </div>
          </div>
        </div>
      </section>

      <section class="daheng-rank-pc__games-section">
        <header class="daheng-rank-pc__sec-head">
          <h2>熱門遊戲</h2>
          <span class="daheng-rank-pc__more">更多</span>
        </header>
        <div class="daheng-rank-pc__games-grid">
          <div
            v-for="g in DAHENG_GAMES"
            :key="g.key"
            class="daheng-rank-pc__game-card"
          >
            <img :src="g.img" :alt="g.name" />
            <div class="daheng-rank-pc__game-meta">{{ g.name }}</div>
          </div>
        </div>
      </section>
    </main>

    <!-- 右側 promo 側欄 -->
    <aside class="daheng-rank-pc__aside">
      <div class="daheng-rank-pc__promo">
        <img :src="trophySrc" alt="獎盃" />
        <h3>週週優惠享不停</h3>
        <p>超值回饋等你拿！</p>
        <button type="button">立即查看</button>
      </div>
      <div class="daheng-rank-pc__notice">
        <h4>近期公告</h4>
        <ul>
          <li>系統升級維護完成</li>
          <li>新增 RSG 電子遊戲 12 款</li>
          <li>VIP 月度禮品開放領取</li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.daheng-rank-pc {
  min-height: 100vh;
  background: var(--gradient-hero);
  color: var(--text-primary);
  font-family: var(--font-body);
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 240px;
  gap: 18px;
  padding: 24px 36px 60px;

  // ── 左側 sidebar ───────────────────────────────
  &__sidebar {
    background: rgba(255, 255, 255, 0.62);
    border-radius: 20px;
    padding: 24px 18px;
    box-shadow: var(--shadow);
    position: sticky;
    top: 24px;
    height: fit-content;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border);
  }

  &__brand-logo {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  &__brand-title {
    font-size: 18px;
    font-weight: 900;
    color: var(--color-primary);
    letter-spacing: 1px;
  }

  &__nav {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.18s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.6);
      color: var(--color-primary);
    }

    &--active {
      background: linear-gradient(180deg, #ffffff, #ffe7d2);
      color: var(--color-primary);
      box-shadow: 0 4px 10px -6px rgba(150, 90, 40, 0.5);
    }
  }

  &__nav-icon {
    width: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  &__nav-label {
    flex: 1;
    font-size: 14px;
    font-weight: 700;
  }

  &__nav-hot {
    font-style: italic;
    font-weight: 900;
    font-size: 11px;
    color: #ffffff;
    background: #e8642a;
    padding: 2px 7px;
    border-radius: 6px;
    transform: rotate(-6deg);
  }

  &__sidebar-auth {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__btn-reg,
  &__btn-login {
    font: 700 15px var(--font-body);
    padding: 12px;
    border-radius: 24px;
    cursor: pointer;
    border: none;
  }

  &__btn-reg {
    color: var(--color-primary);
    background: #ffffff;
    border: 1.6px solid var(--color-secondary);
  }

  &__btn-login {
    color: #ffffff;
    background: var(--gradient-cta);
    box-shadow: 0 6px 14px -6px rgba(150, 80, 30, 0.6);
  }

  // ── 中央 main ───────────────────────────────
  &__main {
    display: flex;
    flex-direction: column;
    gap: 28px;
    min-width: 0;
  }

  &__hero {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow);

    img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      display: block;
    }
  }

  &__hero-tag {
    position: absolute;
    left: 28px;
    bottom: 24px;
    background: rgba(44, 37, 33, 0.78);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    backdrop-filter: blur(6px);
  }

  &__sec-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 22px;
      font-weight: 900;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
    }
  }

  &__flame {
    width: 22px;
    height: 22px;
    display: inline-flex;
  }

  &__more {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-primary);
    cursor: pointer;
  }

  // 排行榜橫排卡片帶（PC 版核心元素：原 mobile 直立 list 改成橫向 5 張大卡）
  &__rank-strip {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
  }

  &__rank-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__rank-card-img {
    position: relative;
    aspect-ratio: 1 / 1;
    background: linear-gradient(135deg, #fdf1e2, #f7e2cb);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__rank-card-num {
    position: absolute;
    top: 8px;
    left: 8px;
    font-style: italic;
    font-weight: 900;
    font-size: 32px;
    color: var(--color-accent);
    text-shadow: 2px 2px 0 rgba(255, 255, 255, 0.9);
    -webkit-text-stroke: 0.5px rgba(180, 130, 60, 0.4);
    line-height: 1;
  }

  &__rank-card-meta {
    padding: 12px 14px;
    text-align: center;

    b {
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary);
    }

    small {
      display: block;
      margin-top: 2px;
      font-style: italic;
      font-weight: 700;
      font-size: 10px;
      color: #c4a68c;
      letter-spacing: 0.4px;
    }
  }

  &__games-grid {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  &__game-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }
  }

  &__game-meta {
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
  }

  // ── 右側 aside（promo + 公告）───────────────────────────────
  &__aside {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: sticky;
    top: 24px;
    height: fit-content;
  }

  &__promo {
    background: linear-gradient(160deg, #fbe6d2, #f7dcbf);
    border-radius: 20px;
    padding: 20px 18px;
    text-align: center;
    box-shadow: var(--shadow);

    img {
      width: 120px;
      height: auto;
      margin: 0 auto 12px;
      display: block;
    }

    h3 {
      font-size: 18px;
      font-weight: 900;
      margin: 0;
      letter-spacing: 1px;
    }

    p {
      font-size: 13px;
      color: #86705c;
      margin: 6px 0 14px;
    }

    button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 18px;
      background: var(--gradient-cta);
      color: #ffffff;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 12px -6px rgba(150, 80, 30, 0.6);
    }
  }

  &__notice {
    background: rgba(255, 255, 255, 0.62);
    border-radius: 20px;
    padding: 18px;
    box-shadow: var(--shadow);

    h4 {
      font-size: 15px;
      font-weight: 900;
      color: var(--text-primary);
      margin: 0 0 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    li {
      font-size: 13px;
      color: var(--text-muted);
      padding-left: 14px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--color-accent);
      }
    }
  }
}
</style>
