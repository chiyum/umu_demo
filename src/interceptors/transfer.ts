import { keys, forEach, reduce, isNil, isEmpty, assoc } from "ramda";

/**
 * 這個函數用於過濾對象中的 null 和空值。具體作用如下：
 * • payload: 輸入的對象
 * • rejectNil: 是否過濾 null 值
 * • rejectEmpty: 是否過濾空值
 * 該函式遍歷 payload 的鍵，如果值為 null 或空，且對應的旗標為 true，則不將該key的值對加到結果對象中。最終返回過濾後的新資料。
 */
const _computedRejectData = (
  payload: Record<string, any>,
  { rejectNil, rejectEmpty }: { rejectNil: boolean; rejectEmpty: boolean }
) =>
  reduce(
    (result, key) => {
      const value = payload[key];
      if (rejectNil && isNil(value)) return result;
      if (rejectEmpty && isEmpty(value)) return result;
      return assoc(key, value, result);
    },
    {},
    keys(payload)
  );

interface ConfigType {
  params?: Record<string, any>;
  data?: Record<string, any>;
  rejectNil?: boolean;
  rejectEmpty?: boolean;
  isFormData?: boolean;
}

const transfer = {
  use(instance: any) {
    instance.interceptors.request.use(
      function (config: ConfigType) {
        const {
          rejectNil = true /** 過濾 null */,
          rejectEmpty = false /** 過濾空值 */,
          isFormData = false /** 轉換成 FormData */
        } = config;

        if (config.params) {
          config.params = _computedRejectData(config.params, {
            rejectNil,
            rejectEmpty
          });
        }

        if (config.data) {
          config.data = _computedRejectData(config.data, {
            rejectNil,
            rejectEmpty
          });

          if (isFormData) {
            const formData = new FormData();
            forEach((key: string) => {
              if (Array.isArray(config.data?.[key])) {
                forEach((value: any) => {
                  // 使用 String() 來確保值是字符串類型
                  formData.append(`${key}[]`, String(value));
                }, config.data[key]);
              } else if (config.data?.[key] instanceof Blob) {
                // 如果是 Blob 或 File 類型，直接添加
                formData.append(key, config.data[key]);
              } else if (config.data?.[key] !== undefined) {
                // 對於其他類型，將其轉換為字符串
                formData.append(key, String(config.data[key]));
              }
            }, keys(config.data));
            config.data = formData;
          }
        }

        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
    /** response回傳 */
    instance.interceptors.response.use(
      // 狀態碼為 2xx
      async function (response: any) {
        return response.data;
      },
      // 狀態碼不為 2xx
      function (error: any) {
        return Promise.resolve({
          code: -1000,
          data: error.response?.data || null,
          status: error.response?.status || 500,
          message: error.message || "未知錯誤",
          originalError: error
        });
      }
    );
  }
};

export default transfer;
