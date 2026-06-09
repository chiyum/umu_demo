<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

/**
 * fived desktop 右側浮動側欄
 *
 * 視覺結構 1:1 對齊 5d_v2 src/components/layout/RightSidebar.vue：
 *   .container-right
 *     .rightSidebar-wrap (fixed right:20px top:50% translateY -50%)
 *       .rightSidebar-titleBox (gtitle.png + float_btn_01.png 立即儲值)
 *       .rightSidebar
 *         .rightSidebar-box
 *           .side-qrcode (190×190 QR + logo 中心)
 *           .side-download (iOS / Android 兩個下載鈕)
 *         .side-social (6 社群圖 grid 3×2)
 *         .rightSidebar-footer (up-btn 回頂)
 *
 * 顯示時機（對齊原作 handleScroll）：
 *   - 非首頁：永遠顯示
 *   - 首頁：scrollY > 500 才顯示
 *   - d1280 以下隱藏（mobile 不顯示）
 *
 * Demo 化（保留結構但不打 API、不引外部圖檔）：
 *   - 立即儲值 / 下載 / 社群按鈕 → @click.prevent
 *   - QR Code 不用 qrcode-vue3 套件，純 CSS 方格陣列模擬視覺
 *   - 6 社群圖標用字符（與 mobile-menu 一致）
 *   - 回頂按鈕走 window.scrollTo smooth
 */

// 對齊原作：滾動超過 500px 才顯示（demo 站只有首頁，所以 always 走 home 規則）
const showSidebar = ref<boolean>(false);
function handleScroll(): void {
  showSidebar.value = window.scrollY > 500;
}

function goToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 6 社群圖示：對齊原作 facebook / instagram / youtube / line / tiktok / threads
interface SocialItem {
  key: string;
  label: string;
  glyph: string;
}
const socials: SocialItem[] = [
  { key: "facebook", label: "Facebook", glyph: "f" },
  { key: "instagram", label: "Instagram", glyph: "ig" },
  { key: "youtube", label: "YouTube", glyph: "▶" },
  { key: "line", label: "LINE", glyph: "L" },
  { key: "tiktok", label: "TikTok", glyph: "tt" },
  { key: "threads", label: "Threads", glyph: "@" }
];
</script>

<template>
  <Transition name="fived-pc-right-sidebar-fade">
    <aside v-if="showSidebar" class="fived-pc-right-sidebar">
      <!-- 立即儲值頂部按鈕區（對齊原作 .rightSidebar-titleBox） -->
      <a
        href="#"
        class="fived-pc-right-sidebar__title-box"
        aria-label="立即儲值"
        @click.prevent
      >
        <span class="fived-pc-right-sidebar__title-top">立即儲值</span>
        <span class="fived-pc-right-sidebar__title">前往充值</span>
      </a>

      <!-- 主體面板（對齊原作 .rightSidebar） -->
      <div class="fived-pc-right-sidebar__panel">
        <div class="fived-pc-right-sidebar__top">
          <!-- QR Code 視覺（純 CSS 方格陣列模擬，避免引 qrcode-vue3） -->
          <div class="fived-pc-right-sidebar__qr">
            <div class="fived-pc-right-sidebar__qr-grid">
              <span v-for="n in 49" :key="n" />
            </div>
            <div class="fived-pc-right-sidebar__qr-center" />
          </div>

          <!-- iOS / Android 下載按鈕（對齊原作 .side-download ul） -->
          <ul class="fived-pc-right-sidebar__download">
            <li>
              <a href="#" aria-label="下載 iOS 版" @click.prevent>
                <span class="fived-pc-right-sidebar__dl-icon">iOS</span>
                <span class="fived-pc-right-sidebar__dl-text">App Store</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="下載 Android 版" @click.prevent>
                <span class="fived-pc-right-sidebar__dl-icon">▲</span>
                <span class="fived-pc-right-sidebar__dl-text">Android</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 6 社群圖示（對齊原作 .side-social grid 3×2） -->
        <div class="fived-pc-right-sidebar__social">
          <ul>
            <li v-for="s in socials" :key="s.key">
              <a
                href="#"
                :aria-label="s.label"
                class="fived-pc-right-sidebar__social-link"
                @click.prevent
              >
                <span>{{ s.glyph }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 回頂按鈕（對齊原作 .rightSidebar-footer up-btn.png） -->
      <button
        type="button"
        class="fived-pc-right-sidebar__top-btn"
        aria-label="回到頂部"
        @click="goToTop"
      >
        <span />
      </button>
    </aside>
  </Transition>
</template>

<style lang="scss" scoped>
// rightSidebar-wrap：固定右側、垂直置中
.fived-pc-right-sidebar {
  position: fixed;
  right: 20px;
  top: 50%;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 220px;
  transform: translateY(-50%);
  pointer-events: auto;
}

// d1280 以下隱藏（對齊原作 @include MQ(d1280) display: none）
@media (width <= 1280px) {
  .fived-pc-right-sidebar {
    display: none;
  }
}

// 頂部立即儲值（對齊原作 .rightSidebar-titleBox 雙圖疊放）
.fived-pc-right-sidebar__title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 8px 10px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: filter 0.18s ease;

  &:hover {
    filter: brightness(1.18);
  }
}

.fived-pc-right-sidebar__title-top {
  display: inline-block;
  padding: 2px 12px;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(226, 189, 135, 0.35);
}

.fived-pc-right-sidebar__title {
  display: inline-block;
  width: 100%;
  padding: 10px 0;
  background: linear-gradient(
    180deg,
    rgba(77, 14, 39, 0.95) 0%,
    rgba(33, 13, 20, 0.95) 100%
  );
  color: var(--primary-03, #ffdaa4);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

// 主面板（對齊原作 .rightSidebar 暗紅底 + 金邊）
.fived-pc-right-sidebar__panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 12px;
  background: linear-gradient(
    180deg,
    rgba(46, 24, 34, 0.95) 0%,
    rgba(20, 8, 14, 0.95) 100%
  );
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
}

.fived-pc-right-sidebar__top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

// QR Code 區塊
.fived-pc-right-sidebar__qr {
  position: relative;
  width: 170px;
  height: 170px;
  padding: 6px;
  background: #ffffff;
  border-radius: 6px;
}

.fived-pc-right-sidebar__qr-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36px;
  height: 36px;
  background: var(--gradient-gold);
  border-radius: 4px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 3px #ffffff;
}

// 下載按鈕兩排
.fived-pc-right-sidebar__download {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    width: 100%;
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    background: linear-gradient(180deg, #1a0c12 0%, #2e1822 100%);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--primary-01);
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    transition:
      filter 0.18s ease,
      transform 0.15s ease;

    &:hover {
      filter: brightness(1.18);
    }

    &:active {
      transform: scale(0.97);
    }
  }
}

.fived-pc-right-sidebar__dl-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  font-size: 10px;
  font-weight: 800;
  border-radius: 4px;
}

.fived-pc-right-sidebar__dl-text {
  letter-spacing: 1px;
}

// 6 社群圖（對齊原作 .side-social ul grid 3×2）
.fived-pc-right-sidebar__social {
  width: 100%;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 6px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.fived-pc-right-sidebar__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 36px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--primary-01);
  text-decoration: none;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.15s ease;

  span {
    font-size: 13px;
    font-weight: 700;
  }

  &:hover {
    background: rgba(226, 189, 135, 0.18);
    border-color: var(--primary-03, #ffdaa4);
    transform: translateY(-1px);
  }
}

// 回頂按鈕（對齊原作 .rightSidebar-footer up-btn 絕對定位浮在面板下方）
.fived-pc-right-sidebar__top-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  background: var(--gradient-gold);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(226, 189, 135, 0.32);
  cursor: pointer;
  transition:
    filter 0.18s ease,
    transform 0.15s ease;

  // 純 CSS 向上箭頭
  span {
    display: block;
    width: 14px;
    height: 14px;
    border-top: 3px solid var(--text-on-gold);
    border-left: 3px solid var(--text-on-gold);
    transform: rotate(45deg) translate(2px, 2px);
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.94);
  }
}

// QR 視覺：7×7 方格陣列模擬碼點（不引 qrcode-vue3，純樣式）
// 為什麼放到本檔最後（在 social-link / top-btn 之後）：
// qr-grid 內 `span:nth-child(...)` 屬高 specificity 規則，
// 若放前面，social-link / top-btn 內的裸 `span`（同元素低 specificity）會被 stylelint
// no-descending-specificity 判為「specificity 倒退」並阻擋 dev server buildStart。
.fived-pc-right-sidebar__qr-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 2px;

  span {
    background: #000000;
    border-radius: 1px;
  }

  // 用 nth-child 製造交替點陣（讓視覺不全黑也不規律）
  span:nth-child(2n),
  span:nth-child(5n + 1),
  span:nth-child(7n + 3) {
    background: transparent;
  }

  // 三角定位點（左上、右上、左下）
  span:nth-child(1),
  span:nth-child(7),
  span:nth-child(43) {
    background: #000000;
    box-shadow:
      0 8px 0 0 #000000,
      8px 0 0 0 #000000,
      8px 8px 0 0 #000000;
  }
}

// fade 進場：對齊原作 v-if showRightSidebar 切換時的順滑出現
.fived-pc-right-sidebar-fade-enter-active,
.fived-pc-right-sidebar-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fived-pc-right-sidebar-fade-enter-from,
.fived-pc-right-sidebar-fade-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(20px);
}
</style>
