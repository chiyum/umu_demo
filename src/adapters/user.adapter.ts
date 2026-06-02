import { DataAdapter } from "./base";
import { UserModel } from "@/models/user.model";
import { UserResponse } from "@/types/user.type";

/**
 * 使用者資訊的資料轉換
 * DataAdapter是一個介面，裡面有兩個方法，分別是 adapt 和 adaptMany。
 * DataAdapter定義好了這個東西會有兩個功能，那兩個功能內的參數和回傳值都是自己定義的。
 * 其中運用了DIP、DI、OCP的概念，有些抽象，需要花一些時間理解。
 */
export class UserAdapter implements DataAdapter<UserResponse, UserModel> {
  /**
   * 單一資料進行處理 函式內可以改成自己的邏輯
   * {{ apiData }} 是從後端 API 取得的資料
   * {{ UserModel }} 是轉換後的資料格式
   */
  adapt(apiData: UserResponse): UserModel {
    // 資料處理的部分在這個區塊
    return {
      id: apiData.user_id.toString(),
      username: apiData.display_name,
      email: apiData.user_email,
      avatarUrl: apiData.profile_image,
      isActive: apiData.status === 1,
      joinDate: apiData.created_at
    };
  }

  // 陣列資料進行處理 不限定陣列，由自己定義。主要是處理多筆資料
  adaptMany(apiDataArray: UserResponse[]): UserModel[] {
    return apiDataArray.map((item) => this.adapt(item));
  }
}

// 當定義好後，透過 new 來建立一個實例供外部使用
export const userAdapterService = new UserAdapter();
