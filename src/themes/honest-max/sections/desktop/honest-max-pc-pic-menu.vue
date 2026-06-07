<script setup lang="ts">
import pic1 from "../../assets/wu88/pic-menu/home001.png?url";
import pic2 from "../../assets/wu88/pic-menu/home002.png?url";
import pic3 from "../../assets/wu88/pic-menu/home003.png?url";
import pic4 from "../../assets/wu88/pic-menu/home004.png?url";

/**
 * honest-no6 桌面版圖片活動選單 — 視覺結構參考 slime-wu88-pc widgets/index/pic-menu.vue
 *
 * 對應原作 DOM：
 *   <ul.picMenu.space-x-20>
 *     <li.photo.btnX v-for picMenu :style background>
 *       <div.picMenu_T>{{ t(title_key) }}</div>
 *
 * 原作 4 個活動：first_deposit / friend_invitation / electronic / trial_fund
 * Demo 化：橫向 4 卡片，純展示，hover 浮起
 */

interface PicItem {
  key: string;
  label: string;
  img: string;
}

const PIC_ITEMS: PicItem[] = [
  { key: "first-deposit", label: "首儲優惠", img: pic1 },
  { key: "invite", label: "邀請好友", img: pic2 },
  { key: "electronic", label: "電子加碼", img: pic3 },
  { key: "trial", label: "試玩贈金", img: pic4 }
];
</script>

<template>
  <ul class="honest-max-pc-pic-menu">
    <li
      v-for="item in PIC_ITEMS"
      :key="item.key"
      class="honest-max-pc-pic-menu__item"
    >
      <img
        :src="item.img"
        :alt="item.label"
        class="honest-max-pc-pic-menu__img"
      />
      <div class="honest-max-pc-pic-menu__label">{{ item.label }}</div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
// 對齊 wu88 picMenu：橫向 4 列等寬卡片
.honest-max-pc-pic-menu {
  list-style: none;
  margin: 24px 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.honest-max-pc-pic-menu__item {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px hsla(var(--primary-h), var(--primary-s), 40%, 0.45);
  }
}

.honest-max-pc-pic-menu__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.honest-max-pc-pic-menu__label {
  position: absolute;
  left: 16px;
  bottom: 14px;
  padding: 6px 14px;
  background: linear-gradient(
    135deg,
    var(--primary-01) 0%,
    var(--primary-04) 100%
  );
  color: var(--text-on-primary);
  font-size: 15px;
  font-weight: 700;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
</style>
