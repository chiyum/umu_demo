<script setup lang="ts">
import { useTabStore } from "@/store/page-tab";
const tabStore = useTabStore();
const router = useRouter();
const route = useRoute();
const { tabs } = storeToRefs(tabStore);

// 獲取當前路徑
const currentPath = computed(() => route.fullPath);

// 跳轉到指定tab
const goToTab = (tab: { path: string }) => {
  router.push(tab.path);
};

// 關閉tab
const closeTab = (path: string) => {
  // 先關閉tab
  tabStore.removeTab(path);

  // 如果關閉的是當前頁，則跳轉到最後一個tab
  if (path === currentPath.value && tabs.value.length > 0) {
    // 找到最新的tab（根據timestamp排序）
    const latestTab = [...tabs.value].sort(
      (a, b) => b.timestamp - a.timestamp
    )[0];
    router.push(latestTab.path);
  }
};
</script>

<template>
  <div class="tab-list">
    <q-btn
      color="primary"
      no-caps
      v-for="tab in tabs"
      :key="tab.path"
      class="tab-item"
      :class="{ active: currentPath === tab.path }"
      @click="goToTab(tab)"
    >
      <span class="tab-title">{{ $t(tab.title) }}</span>
      <q-icon
        name="close"
        color="white"
        class="tab-close"
        @click.stop="closeTab(tab.path)"
        v-if="tabs.length > 1"
      ></q-icon>
    </q-btn>
  </div>
</template>

<style scoped lang="scss">
.tab-list {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
