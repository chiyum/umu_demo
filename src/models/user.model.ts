export interface UserModel {
  id: string; // 使用者ID
  username: string; // 使用者名稱
  email: string; // 使用者信箱
  avatarUrl: string; // 使用者頭像
  isActive: boolean; // 使用者是否啟用
  joinDate: string; // 使用者加入日期
}
