import { EXCLUDE_ROUTES } from "@/contants/draw-router.contant";
// 引入 Vue Router 的類型定義
import type {
  RouteRecordRaw,
  RouteRecordName,
  RouteMeta as VueRouteMeta
} from "vue-router";
import { getRouteI18nName } from "@/utils/common";

// 定義路由元數據型別，擴展 Vue Router 的 RouteMeta
interface RouteMeta extends VueRouteMeta {
  layout?: string;
  title?: string;
  icon?: string;
  hideInMenu?: boolean;
  isLeaf?: boolean;
  sort?: number; // 新增 sort 字段用於排序
  [key: string]: any;
}

// 定義路由型別，兼容 Vue Router 的路由類型
interface Route {
  path: string;
  name: RouteRecordName | string;
  meta?: RouteMeta;
  [key: string]: any;
}

// 定義樹節點型別
interface TreeNode {
  path: string;
  name: string;
  i18nName: string;
  meta?: RouteMeta;
  children?: TreeNode[];
  [key: string]: any;
}

// 樹節點的映射型別，用於快速查找
interface NodeMap {
  [path: string]: TreeNode;
}

/**
 * 將扁平路由轉換為樹狀結構
 * @param routes 扁平的路由數組
 * @returns 樹狀結構的路由
 */
export function convertRoutesToTree(
  routes: (Route | RouteRecordRaw)[]
): TreeNode[] {
  const result: TreeNode[] = [];
  const map: NodeMap = {};

  // 初始化根節點
  routes.forEach((route) => {
    // 排除不需要的路由
    if (EXCLUDE_ROUTES.includes(route.path)) {
      return;
    }
    // 移除開頭的 '/' 並拆分路徑
    const pathParts: string[] = route.path.replace(/^\//, "").split("/");

    // 為每一級創建或更新節點
    let currentLevel: TreeNode[] = result;
    let currentPath: string = "";

    pathParts.forEach((part, index) => {
      // 構建當前路徑
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      // 檢查此路徑是否已存在於 map 中
      const existingNode: TreeNode | undefined = map[currentPath];

      if (existingNode) {
        // 節點已存在，移動到下一層
        currentLevel = existingNode.children || [];
      } else {
        // 創建新節點
        const newNode: TreeNode = {
          path: `/${currentPath}`,
          name: part,
          i18nName:
            route.meta?.setting?.i18nName ?? getRouteI18nName(currentPath), // 可以根據需要調整 i18n key
          children: [],
          meta: {
            ...(route.meta || {}),
            // 僅當是完整路徑時才保留原始路由的元數據
            isLeaf:
              index === pathParts.length - 1 && `/${currentPath}` === route.path
          }
        };

        // 將新節點添加到當前級別
        currentLevel.push(newNode);
        // 更新 map
        map[currentPath] = newNode;
        // 移動到子級
        currentLevel = newNode.children || [];
      }
    });
  });

  // 清理空的 children 數組，將其設置為 undefined
  const cleanupEmptyChildren = (nodes: TreeNode[]): void => {
    nodes.forEach((node) => {
      if (node.children && node.children.length === 0) {
        delete node.children;
      } else if (node.children) {
        cleanupEmptyChildren(node.children);
      }
    });
  };

  cleanupEmptyChildren(result);

  // 遞迴排序樹節點
  const sortNodes = (nodes: TreeNode[]): void => {
    // 對節點數組進行排序
    nodes.sort((a, b) => {
      const sortA = a.meta?.sort ?? -1;
      const sortB = b.meta?.sort ?? -1;

      // 如果兩個節點都有有效的排序值（不是 -1）
      if (sortA !== -1 && sortB !== -1) {
        return sortA - sortB;
      }
      // 如果只有節點 A 有有效的排序值
      else if (sortA !== -1) {
        return -1; // A 排在前面
      }
      // 如果只有節點 B 有有效的排序值
      else if (sortB !== -1) {
        return 1; // B 排在前面
      }
      // 如果兩個節點都沒有有效的排序值，保持原始順序
      return 0;
    });

    // 遞迴排序子節點
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortNodes(node.children);
      }
    });
  };

  // 對結果進行排序
  sortNodes(result);

  return result;
}

/**
 * 整理路由樹，移除中間節點，保留葉子節點
 * @param tree 樹狀結構的路由
 * @returns 整理後的樹狀結構
 */
export function optimizeRouteTree(tree: TreeNode[]): TreeNode[] {
  // 遞迴處理每個節點
  const processNode = (node: TreeNode): TreeNode => {
    // 如果沒有子節點，直接返回
    if (!node.children) {
      return node;
    }

    // 處理所有子節點
    node.children = node.children.map((child) => processNode(child));

    // 如果只有一個子節點且當前節點不是葉子節點，可以考慮合併
    if (node.children.length === 1 && !node.meta?.isLeaf) {
      const child = node.children[0];
      // 如果子節點也不是葉子節點且有自己的子節點，合併
      if (!child.meta?.isLeaf && child.children) {
        return {
          ...node,
          name: `${node.name}/${child.name}`,
          i18nName: child.i18nName, // 使用子節點的 i18n 名稱
          path: child.path,
          children: child.children
        };
      }
    }

    return node;
  };

  return tree.map((node) => processNode(node));
}
