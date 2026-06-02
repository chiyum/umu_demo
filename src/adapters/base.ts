/**
 * 資料轉換的接口定義
 * 主要用於把API格式轉為template所需格式
 * 使用接口的原因是為了讓開發者知道這些功能有哪些方法並且可以自行定義參數和回傳值
 * 當想修改程式某部分時，只要遵守接口的規範，就不會影響到其他部分
 * 使用function也可以有相同功能，但使用interface的原因有下方幾點
 * 1. 致性保證：interface 確保所有資料轉換器都遵循相同的結構和方法名稱。
 *    如果只使用函數，每個開發者可能會用不同的名稱或參數結構，導致系統不一致。
 * 2. 當專案有多種資料轉換需求時（用戶、產品、訂單等），interface 定義好同樣的結構，讓開發者可以快速了解如何使用。
 */
export interface DataAdapter<_ApiType, _ModelType> {
  adapt(apiData: _ApiType): _ModelType;
  adaptMany(apiDataArray: _ApiType[]): _ModelType[];
}
