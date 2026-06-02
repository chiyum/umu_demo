// Response返回格式 依照API定義
export interface ResponseData<T> {
  code: number;
  data: T;
  status?: number; // HTTP 狀態碼，例如 500 錯誤才會有
  message?: string; // 錯誤訊息，例如 "未知錯誤" 錯誤才會有
  originalError?: unknown; // 原始錯誤對象 錯誤才會有
}
