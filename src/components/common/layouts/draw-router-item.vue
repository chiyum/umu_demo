<template>
  <div>
    <!-- 無子選單的項目 -->
    <q-item
      v-if="!item.children"
      clickable
      :to="item.path"
      class="navigation-item q-mx-sm q-mt-xs"
      :active-class="$q.dark.isActive ? 'dark_active' : 'tab-active'"
      :active="isActive"
      v-ripple
    >
      <q-item-section avatar>
        <q-icon
          v-if="item?.meta?.icon"
          :name="item.meta.icon"
          size="sm"
          class="mr-2"
        />
      </q-item-section>

      <q-item-section>
        {{ getItemLabel }}
      </q-item-section>
    </q-item>
    <!-- 有子選單的項目 -->
    <q-expansion-item
      v-else
      class="overflow-hidden q-mx-sm q-mt-xs"
      style="border-radius: 12px"
      expand-icon-class="text-primary"
      :icon="getFolderIcon"
      :label="getItemLabel"
      :default-opened="isAnyChildActive"
      :content-inset-level="1"
      :header-class="
        route.path.includes(item.path)
          ? $q.dark.isActive
            ? 'expantion_bg dark_text'
            : 'bg-grey-2'
          : $q.dark.isActive
            ? 'dark_text'
            : ''
      "
    >
      <!--      {{ item.path }} | {{ route.path }}-->
      <!-- 遞迴渲染子項目 -->
      <div class="q-pa-none q-ma-none">
        <draw-router-item
          v-for="(child, index) in item.children"
          :key="child.name + index"
          :item="child"
          @item-click="onChildClick"
        />
      </div>
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { t } = useI18n();

// 定義 props
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// 定義事件
const emit = defineEmits(["item-click"]);

// 檢查是否處於活動狀態
const isActive = computed(() => {
  return route.path === props.item.path;
});

// 檢查是否有任何子項目處於活動狀態
const isAnyChildActive = computed(() => {
  if (!props.item.children) return false;

  const checkChildrenActive = (children) => {
    return children.some((child) => {
      if (child.path === route.path) return true;
      if (child.children) return checkChildrenActive(child.children);
      return false;
    });
  };

  return checkChildrenActive(props.item.children);
});

// 獲取項目標籤
const getItemLabel = computed(() => {
  if (props.item.i18nName && t(props.item.i18nName) !== props.item.i18nName) {
    return t(props.item.i18nName);
  }

  // 如果沒有 i18n 翻譯或翻譯結果與 key 相同，使用名稱的最後一部分
  const nameParts = props.item.name.split("/");
  console.log(props.item.i18nName);
  return (
    nameParts[nameParts.length - 1].charAt(0).toUpperCase() +
    nameParts[nameParts.length - 1].slice(1)
  );
});

// 獲取資料夾圖標
const getFolderIcon = computed(() => {
  // 可以根據項目名稱或路徑來獲取適當的圖標
  const name = props.item.name.toLowerCase();
  const metaIcon = props.item.meta?.icon ?? null;
  switch (true) {
    case metaIcon !== null:
      return metaIcon;
    case name.includes("home"):
      return "person";
    case name.includes("member"):
      return "people";
    case name.includes("setting"):
      return "settings";
    default:
      return "folder";
  }
});

// 處理子項目點擊
const onChildClick = (item) => {
  emit("item-click", item);
};
</script>
