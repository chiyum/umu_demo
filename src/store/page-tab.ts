import { defineStore } from "pinia";
import { getRouteI18nName } from "@/utils/common";

// 簡化的Tab項目接口
export interface TabItem {
  name: string; // 路由名稱，用於keep-alive
  path: string; // 路由路徑，用於導航
  title: string; // 顯示標題
  timestamp: number; // 時間戳，可用於排序或識別最近訪問
}

export const useTabStore = defineStore("tabs", () => {
  // 儲存的tab列表
  const tabs = ref<TabItem[]>([]);

  // 獲取所有tab
  const getAllTabs = computed(() => tabs.value);

  // 用於keep-alive的組件名稱列表
  const cachedComponents = computed(() => tabs.value.map((tab) => tab.name));

  // 添加或更新tab
  function addTab(tab: TabItem) {
    const removeSlash = tab.title.replace("/", "");
    tab.title = getRouteI18nName(removeSlash); // 如果沒有title，則使用path作為title
    const index = tabs.value.findIndex((item) => item.path === tab.path);

    if (index >= 0) {
      // 更新已存在的tab
      tabs.value[index] = {
        ...tab,
        timestamp: Date.now()
      };
    } else {
      // 添加新tab
      tabs.value.push({
        ...tab,
        timestamp: Date.now()
      });
    }
  }

  // 移除tab
  function removeTab(path: string) {
    const index = tabs.value.findIndex((tab) => tab.path === path);
    if (index >= 0) {
      tabs.value.splice(index, 1);
    }
  }

  // 檢查tab是否存在
  function hasTab(path: string) {
    return tabs.value.some((tab) => tab.path === path);
  }

  return {
    tabs,
    getAllTabs,
    cachedComponents,
    addTab,
    removeTab,
    hasTab
  };
});
