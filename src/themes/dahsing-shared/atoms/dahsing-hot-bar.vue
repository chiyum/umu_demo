<script setup lang="ts">
/**
 * dahsing 三版型共用 HOT banner（含 ribbon + 文字 + 立即查看 + 獎盃 mask 漸入）
 *
 * 為什麼抽：三份 HTML 的 .hotbar 完全一致（包含 ribbon 角度 / trophy mask / hgo 按鈕樣式）
 *
 * 為什麼 trophy 走 mask: linear-gradient：
 * - 原稿用 mask: linear-gradient(90deg, transparent, #000 34%) 讓獎盃左半邊淡出
 * - 與文字區自然銜接，不會硬切；這是視覺重點不可省略
 */
import DahsingIcon from "./dahsing-icon.vue";
import { trophySrc } from "../_assets";
</script>

<template>
  <div class="dahsing-hot-bar">
    <div class="dahsing-hot-bar__ribbon" aria-hidden="true" />
    <div class="dahsing-hot-bar__text">
      <h3 class="dahsing-hot-bar__title">週週優惠享不停</h3>
      <div class="dahsing-hot-bar__sub">超值回饋等你拿！</div>
      <button type="button" class="dahsing-hot-bar__cta">
        立即查看
        <DahsingIcon name="chevron-right" size="11px" />
      </button>
    </div>
    <img class="dahsing-hot-bar__trophy" :src="trophySrc" alt="獎盃" />
  </div>
</template>

<style lang="scss" scoped>
.dahsing-hot-bar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 118px;
  margin: 16px 16px 0;
  background: var(--gradient-hero);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow-lg, var(--shadow));

  // ribbon：左上 HOT 斜角徽章（保留原稿視覺強度）
  &__ribbon {
    position: absolute;
    left: 0;
    top: 0;
    width: 74px;
    height: 74px;
    z-index: 4;
    overflow: hidden;

    &::before {
      content: "HOT";
      position: absolute;
      left: -26px;
      top: 13px;
      width: 96px;
      padding: 4px 0;

      // HOT ribbon 漸層走 --gradient-hot-ribbon token；金 / 紫變體會改色適配主色系
      background: var(
        --gradient-hot-ribbon,
        linear-gradient(180deg, #e35d34, #c23a16)
      );
      color: #ffffff;
      font-size: 13px;
      font-weight: 900;
      font-style: italic;
      letter-spacing: 1px;
      text-align: center;
      transform: rotate(-45deg);
      box-shadow: 0 3px 7px rgba(170, 50, 20, 0.4);
    }
  }

  &__text {
    position: relative;
    z-index: 3;
    flex: 1;
    padding: 16px 0 16px 26px;
  }

  &__title {
    font-size: 25px;
    font-weight: 900;
    letter-spacing: 0.5px;
    line-height: 1.05;
    background: var(--gradient-cta);
    background-clip: text;
    color: transparent;
  }

  &__sub {
    margin-top: 5px;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-secondary);
  }

  &__cta {
    margin-top: 13px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 22px;
    background: var(--bg-surface);
    color: var(--color-primary);
    border: 1.5px solid var(--border);
    border-radius: 999px;
    font-family: inherit;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    box-shadow: var(--shadow);

    &:active {
      transform: scale(0.96);
    }
  }

  // 獎盃右側 mask 漸入（原稿關鍵視覺）
  &__trophy {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 215px;
    height: 100%;
    object-fit: cover;
    object-position: left center;
    z-index: 2;
    mask: linear-gradient(90deg, transparent 0%, #000000 34%, #000000 100%);
  }
}
</style>
