import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import createRoutes from "@/_app/routes";
import { useTabStore } from "@/store/page-tab";

/* 設定預設導入頁面 */
const options = {
  defaultPath: "/home"
};

/* 建立router */
const router = createRouter({
  // 用 import.meta.env.BASE_URL 餵 base，部署到 GitHub Pages 子路徑 (/umu_demo/) 時 router 才認得到 root
  history: createWebHistory(import.meta.env.BASE_URL),
  //掛載處理好的routes
  routes: createRoutes(options) as Array<RouteRecordRaw>,
  scrollBehavior() {
    /** 換頁捲軸回到上方 */
    return { top: 0 };
  }
});

// 設置全局路由守衛
router.beforeEach((to, from, next) => {
  // 排除不需要加入tab的路由
  const excludeRoutes = ["login", "error", "404"];

  if (to.name && !excludeRoutes.includes(to.name.toString())) {
    // 獲取tab store
    const tabStore = useTabStore();
    // 添加到tab列表
    console.log(to, "to");
    tabStore.addTab({
      name: to.name.toString(),
      path: to.fullPath,
      title: to.fullPath,
      timestamp: Date.now()
    });
  }

  next();
});

// router.beforeEach(async (to, from, next) => {
//   console.log(from, to);
//   next();
// });

export default router;
