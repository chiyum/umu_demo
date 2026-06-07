<script setup lang="ts">
import { ref } from "vue";
import iconHome from "../../assets/desktop/leftSide/home.png?url";
import iconSport from "../../assets/desktop/leftSide/sport.png?url";
import iconLottery from "../../assets/desktop/leftSide/lottery.png?url";
import iconLive from "../../assets/desktop/leftSide/live.png?url";
import iconSlot from "../../assets/desktop/leftSide/slot.png?url";
import iconFish from "../../assets/desktop/leftSide/fish.png?url";
import iconBoard from "../../assets/desktop/leftSide/board.png?url";
import iconEsport from "../../assets/desktop/leftSide/esport.png?url";
import iconVip from "../../assets/desktop/leftSide/vip.png?url";
import iconPromo from "../../assets/desktop/leftSide/promotion.png?url";
import iconAward from "../../assets/desktop/leftSide/award-center.png?url";

/**
 * at99 桌面版左側 sidebar — 視覺結構參考 slime-at99 desktop layout/leftSide.vue
 *
 * 對應原作 DOM：
 *   .leftSide
 *     .leftSide--contens
 *       <ul>
 *         <li.leftSide-menu>
 *           <a.leftSide-block.leftSide-block--gameMenu v-for menuData (8 個遊戲分類)>
 *             <img.leftSide-block--img />
 *             <p>{ menu }</p>
 *       <div.leftSide-border />
 *       <ul>
 *         <li.leftSide-menu>
 *           <a.leftSide-block v-for menuItems (vip / 優惠 / 領獎中心)>
 *             <img + <p>
 *
 * Demo 化策略：
 * - 保留 8 + 3 = 11 個項目（首頁 / 體育 / 彩票 / 真人 / 電子 / 捕魚 / 棋牌 / 電競 / VIP / 優惠 / 領獎）
 * - sticky 左側，桌面內容區 padding-left 避開
 * - icon 圖檔不染色（原作就是彩色 PNG）；active 視覺用 box-shadow 高亮
 */

interface MenuItem {
  key: string;
  label: string;
  icon: string;
}

const GAME_MENU: MenuItem[] = [
  { key: "home", label: "首頁", icon: iconHome },
  { key: "sport", label: "體育", icon: iconSport },
  { key: "lottery", label: "彩票", icon: iconLottery },
  { key: "live", label: "真人", icon: iconLive },
  { key: "slot", label: "電子", icon: iconSlot },
  { key: "fish", label: "捕魚", icon: iconFish },
  { key: "board", label: "棋牌", icon: iconBoard },
  { key: "esport", label: "電競", icon: iconEsport }
];

const MEMBER_MENU: MenuItem[] = [
  { key: "vip", label: "VIP 中心", icon: iconVip },
  { key: "promotion", label: "優惠活動", icon: iconPromo },
  { key: "award", label: "領獎中心", icon: iconAward }
];

const activeKey = ref<string>("home");
</script>

<template>
  <aside class="at99-pc-leftside">
    <div class="at99-pc-leftside__contents">
      <ul class="at99-pc-leftside__list">
        <li
          v-for="item in GAME_MENU"
          :key="item.key"
          class="at99-pc-leftside__item"
          :class="{ 'at99-pc-leftside__item--active': activeKey === item.key }"
          @click="activeKey = item.key"
        >
          <img
            :src="item.icon"
            :alt="item.label"
            class="at99-pc-leftside__icon"
          />
          <p class="at99-pc-leftside__label">{{ item.label }}</p>
        </li>
      </ul>

      <div class="at99-pc-leftside__border" />

      <ul class="at99-pc-leftside__list">
        <li
          v-for="item in MEMBER_MENU"
          :key="item.key"
          class="at99-pc-leftside__item at99-pc-leftside__item--member"
          :class="{ 'at99-pc-leftside__item--active': activeKey === item.key }"
          @click="activeKey = item.key"
        >
          <img
            :src="item.icon"
            :alt="item.label"
            class="at99-pc-leftside__icon"
          />
          <p class="at99-pc-leftside__label">{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
// 對齊 slime-at99 .leftSide：fixed 左側 / 深底 / icon + 文字垂直排列
// 寬度 110 提供足夠 icon + 文字空間，配合主內容區 padding-left
.at99-pc-leftside {
  position: sticky;
  top: 76px; // header 高度
  width: 110px;
  flex-shrink: 0;
  align-self: flex-start;
  background: var(--dock-bg);
  border-right: 1px solid var(--border);
  padding: 16px 0;
  max-height: calc(100vh - 76px);
  overflow-y: auto;

  &__contents {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  // 每個 item：圓角方塊 + icon + label，hover/active 加霓虹光
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 10px 6px;
    border-radius: 12px;
    cursor: pointer;
    background: var(--dock-icon-bg);
    color: var(--text-primary);
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease;

    &:hover {
      background: var(--bg-overlay);
      box-shadow:
        0 0 8px hsla(0deg, 0%, 0%, 0.4),
        inset 0 0 0 1px var(--color-primary);
    }

    &--active {
      background: var(--gradient-cta);
      box-shadow: var(--neon-glow);
      color: var(--text-on-primary);
    }
  }

  &__icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  &__label {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    line-height: 1.2;
  }

  &__border {
    height: 1px;
    margin: 4px 16px;
    background: linear-gradient(
      to right,
      transparent,
      var(--color-primary),
      transparent
    );
    opacity: 0.5;
  }
}

@media (width <= 1280px) {
  .at99-pc-leftside {
    width: 88px;
  }

  .at99-pc-leftside__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
