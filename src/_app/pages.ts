import { Component } from "vue";
import { markRaw } from "vue";
import { getRouteComponentName } from "@/utils/common";
import { EXCLUDE_ROUTES } from "@/contants/draw-router.contant";
// virtual:page-meta 由 vite.config.ts 中的 pageMetaPlugin 提供
// 內容為當前模板下每個 page .vue 的 defineOptions 字面量
// 透過此模組可在不 eager 載入頁面的情況下取得 layout / title / setting，
// 讓 component 走純動態 import，達到真正的 code split
import meta from "virtual:page-meta";

interface PageConfig {
  layout?: string;
  title?: string;
  header?: string;
  noScroll?: boolean;
  setting?: Record<string, any>;
}

interface Route {
  path: string;
  name: string;
  meta: {
    layout: string;
    awdAssignLayout?: string | null;
    title: string;
    useAwdLayout?: boolean;
  };
  component:
    | (() => Promise<Component>)
    | {
        desktop: () => Promise<Component>;
        mobile: () => Promise<Component>;
      };
}

// 動態 import 函式 — 不 eager，讓 Rollup 真正切 chunk
const files = import.meta.glob<Component>("@pages/**/*.vue");

// meta 由 virtual module 提供（key 為 /src/pages/<template>/.../xxx.vue）
const defaults = meta as Record<string, PageConfig>;

const modules: Route[] = [];
const processedPaths = new Set<string>();
const envTemplate = import.meta.env.VITE_TEMPLATE_ENV || "base";

for (const path in defaults) {
  // 檢查是否為 desktop 或 mobile 文件
  const isDesktop = path.includes("/desktop.vue");
  // 注意：原始碼這邊有筆 typo（兩個 desktop），保留原行為以免影響既有 routes
  const isMobile = path.includes("/mobile.vue");

  // 獲取基礎路徑
  let routePath;
  const currentStylePath = `/src/pages/${envTemplate}`;
  if (isDesktop || isMobile) {
    // 如果是 desktop 或 mobile 文件，去掉最後的 /desktop.vue 或 /mobile.vue
    routePath = path
      .replace(currentStylePath, "")
      .replace(/\/(desktop|mobile)\.vue$/, "")
      .toLowerCase();
  } else {
    // 一般文件保持原有的處理方式
    routePath = path
      .replace(currentStylePath, "")
      .toLowerCase()
      .replace(".vue", "");
  }

  if (EXCLUDE_ROUTES.includes(routePath)) {
    continue;
  }

  // 處理路由路徑
  routePath = routePath.replace(/\/index$/, "").replace(/\/_+/g, "/:");

  // 如果已經處理過這個路徑，跳過
  if (processedPaths.has(routePath)) {
    continue;
  }

  // 檢查是否存在對應的桌面版和移動版文件
  const basePath = path.replace(/\/(desktop|mobile)\.vue$/, "");
  const desktopPath = `${basePath}/desktop.vue`;
  const mobilePath = `${basePath}/mobile.vue`;

  const hasDesktop = defaults[desktopPath];
  const hasMobile = defaults[mobilePath];

  if (hasDesktop && hasMobile) {
    /**
     * 如果同時存在電腦版和手機版
     * 給予對應配置
     * layout預設以desktop為主。例如桌面版的layout是layout-default，那手機版就會是layout-default-mobile
     * 但若想要指定，
     */
    const desktopModule = defaults[desktopPath];
    const mobileModule = defaults[mobilePath];
    const title =
      desktopModule?.title || mobileModule?.title || "app.project.title";
    const layout =
      desktopModule?.layout || mobileModule?.layout || "layout-default";
    modules.push({
      path: routePath,
      name: getRouteComponentName(routePath),
      meta: {
        layout,
        title,
        useAwdLayout: true, // 預設頁面使用awdLayout
        awdAssignLayout: mobileModule?.setting?.awdAssignLayout ?? null, // 指定手機版本的awdLayout
        ...desktopModule?.setting,
        ...mobileModule?.setting
      },
      component: markRaw({
        desktop: files[desktopPath], // 動態 import — 真正 code split
        mobile: files[mobilePath]
      })
    });
  } else if (!isDesktop && !isMobile) {
    // 單一版本的頁面
    const pageModule = defaults[path];
    modules.push({
      path: routePath,
      name: getRouteComponentName(routePath),
      meta: {
        layout: pageModule?.layout || "layout-default",
        title: pageModule?.title || "app.project.title",
        ...pageModule?.setting
      },
      component: files[path] // 動態 import — 真正 code split
    });
  }

  processedPaths.add(routePath);
}

export default modules;
