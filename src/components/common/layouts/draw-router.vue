<template>
  <div class="drawer-router">
    <drawer-router-item
      v-for="(item, index) in menuItems"
      :key="item.name + index"
      :item="item"
      @item-click="onItemClick"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import DrawerRouterItem from "@/components/common/layouts/draw-router-item.vue";
import {
  convertRoutesToTree,
  optimizeRouteTree
} from "@/utils/draw-router.util";

const router = useRouter();

// 從路由獲取菜單項目
const menuItems = computed(() => {
  // 獲取路由數據，排除不需要在菜單中顯示的路由
  const routes = router
    .getRoutes()
    .filter(
      (route) =>
        route.meta?.layout === "layout-default" && !route.meta?.hideInMenu
    )
    .map((route) => ({
      path: route.path,
      name: route.name,
      meta: route.meta
    }));

  // 轉換為樹狀結構並優化
  const routeTree = convertRoutesToTree(routes);
  const optimizedTree = optimizeRouteTree(routeTree);

  return optimizedTree;
});

// 處理點擊事件
const onItemClick = (item) => {
  // 如果有自定義的點擊處理邏輯，可以在這裡實現
  console.log("Item clicked:", item);

  // 如果需要執行額外操作，例如添加到頁籤
  // appStore.onAddTabPage(item);
};

onMounted(() => {
  console.log("Drawer Router mounted", menuItems.value);
});
</script>

<style lang="scss"></style>
