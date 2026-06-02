export interface SavedRoute {
  name: string;
  path: string;
  params: Record<string, any>;
  query: Record<string, any>;
  meta: {
    title?: string;
    icon?: string;
    timestamp: number;
  };
  componentInstance?: any; // 可以存儲組件實例引用
}
