import { App, Component } from "vue";

// 定義 layout 模組的類型
interface LayoutModule {
  componentName: string;
  component: Component;
}

// 使用 @layouts alias 確保只載入當前環境模板的 layouts，避免其他模板被打包
const files = import.meta.glob("@layouts/**/*.vue", {
  eager: true
}) as Record<string, { default: Component }>;
const modules: LayoutModule[] = [];

// alias 解析後，路徑會是 /src/layouts/<template>/...
// 動態取出模板資料夾名稱，避免硬編
const firstPath = Object.keys(files)[0] || "";
const matchTpl = firstPath.match(/\/layouts\/([^/]+)\//);
const envTemplate =
  matchTpl?.[1] || import.meta.env.VITE_TEMPLATE_ENV || "base";

for (const path in files) {
  const isDesktop = path.includes("/desktop.vue");
  const isMobile = path.includes("/mobile.vue");
  const currentStylePath = `/src/layouts/${envTemplate}/`; // 基於當前環境模板的頁面路徑
  let name = ""; // 初始化 name 變數
  switch (true) {
    // 因應App.vue寫法，如果是PC版本則直接使用layout名稱 例如layout-vip
    case isDesktop:
      name = path
        .replace(currentStylePath, "") // 去掉當前環境模板的路徑
        .replace(/\/desktop/g, "") // 去掉路徑中的斜杠改為串燒
        .replace(".vue", "") // 去掉.vue
        .toLowerCase();
      break;
    // 若為mobile版本則在原本的layout名稱後面加上-mobile 例如layout-vip-mobile
    case isMobile:
      name = path
        .replace(currentStylePath, "") // 去掉當前環境模板的路徑
        .replace(/\//g, "-") // 去掉路徑中的斜杠改為串燒
        .replace(".vue", "")
        .toLowerCase();
      break;
    default:
      // 一般文件保持原有的處理方式
      name = path
        .replace(currentStylePath, "")
        .toLowerCase()
        .replace(".vue", "");
      break;
  }
  /* 將處理好的模組push */
  modules.push({
    componentName: name,
    component: files[path].default
  });
}

const layouts = {
  /* 將layout新增為component */
  install: (app: App) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  }
};

export default layouts;
