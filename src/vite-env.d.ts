/// <reference types="vite/client" />

declare module "virtual:page-meta" {
  // 由 vite.config.ts 中 pageMetaPlugin 提供
  // key 為 /src/pages/<template>/.../xxx.vue，value 為頁面 defineOptions 字面量
  const meta: Record<
    string,
    {
      layout?: string;
      title?: string;
      header?: string;
      noScroll?: boolean;
      setting?: Record<string, unknown>;
    }
  >;
  export default meta;
}
