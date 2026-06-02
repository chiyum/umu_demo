<script setup lang="ts">
import { computed, defineAsyncComponent, provide } from "vue";
import { useRoute } from "vue-router";
import { isNil, defaultTo, path } from "ramda";
import { useDevice } from "@/utils/use-device"; // 引入 useDevice
import { useTabStore } from "@/store/page-tab";

const route = useRoute();
const { isMobile } = useDevice(); // 使用 useDevice composable，獲取裝置狀態
const tabStore = useTabStore();
provide("isMobile", isMobile); // 將 isMobile 提供給所有子組件

// 計算屬性 layout，用於根據當前裝置動態設置 layout
const layout = computed(() => {
  if (isNil(route?.path)) return null;
  // 若無layout指定預設使用 layout-error
  const currentLayout = defaultTo("layout-default")(
    path(["meta", "layout"], route)
  );
  const useAwdLayout = defaultTo(false)(path(["meta", "useAwdLayout"], route)); // 使用 awd layout
  const awdAssignLayout = defaultTo(null)(
    path(["meta", "awdAssignLayout"], route)
  ); // 使用 awd layout
  switch (true) {
    // 為手機裝置且使用 AWD layout，但卻有指定layout時，使用awdAssignLayout
    case isMobile.value && awdAssignLayout !== null:
      console.log("awdAssignLayout", awdAssignLayout);
      return awdAssignLayout;
    // 為手機裝置且使用 AWD layout，預設是使用指定layout-加上-mobile
    case isMobile.value && useAwdLayout:
      console.log("defaultMobileAwdLayout");
      return currentLayout + "-mobile";
    /**
     * 使用預設指定的layout
     * 有幾種情況是使用此layout
     * 1. 電腦版
     * 2. 手機版但不使用 AWD layout
     */
    default:
      return currentLayout;
  }
});

// 動態選擇 AWD 組件（若組件包含 desktop 和 mobile 版本，則根據裝置選擇相應的組件版本）
const getComponent = (vnode: VNode) => {
  if (vnode?.type && typeof vnode.type === "object") {
    const componentType = vnode.type as {
      desktop?: () => Promise<Component>;
      mobile?: () => Promise<Component>;
    };

    if ("desktop" in componentType && "mobile" in componentType) {
      const selectedComponent = isMobile.value
        ? componentType.mobile
        : componentType.desktop;
      return defineAsyncComponent({ loader: selectedComponent });
    }
  }
  return vnode;
};

console.log("testHusky");
</script>

<template>
  <!-- 根據計算屬性 layout 動態載入 layout 組件 -->
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <!-- 使用 getComponent 函數選擇 desktop 或 mobile 版本的組件 -->
      <keep-alive :include="tabStore.cachedComponents">
        <component :is="getComponent(Component)" />
      </keep-alive>
    </router-view>
  </component>
</template>
