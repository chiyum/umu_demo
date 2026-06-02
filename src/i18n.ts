import { createI18n } from "vue-i18n";
import messages from "@/_app/locales";
import storage from "store2";
import { Quasar } from "quasar";
import langZhTW from "quasar/lang/zh-TW";
import langEnUS from "quasar/lang/en-US";

export const setQuasarLang = (locale: string) => {
  switch (locale) {
    case "zh-tw":
      Quasar.lang.set(langZhTW);
      break;
    case "en-us":
      Quasar.lang.set(langEnUS);
      break;
    default:
      Quasar.lang.set(langZhTW);
  }
};

const initLocale = (() => {
  // 1. 優先使用已儲存的語言設定
  const savedLocale = storage.get("locale");
  console.log("Saved locale:", savedLocale);
  if (savedLocale) return savedLocale;

  // 2. 使用環境變數預設值
  const defaultLocale = import.meta.env.VITE_LOCALE;

  // 3. 偵測使用者瀏覽器語言
  const userLang = navigator.language || navigator.languages?.[0] || "";

  // 4. 語言對應邏輯
  let detectedLocale;
  if (userLang.startsWith("en")) {
    detectedLocale = "en";
  } else if (userLang.startsWith("zh")) {
    detectedLocale = "zh-tw";
  } else {
    detectedLocale = defaultLocale;
  }

  // 5. 驗證語系是否支援，不支援則使用預設值
  return detectedLocale in messages ? detectedLocale : defaultLocale;
})();
const i18n = createI18n({
  locale: initLocale,
  fallbackLocale: import.meta.env.VITE_DEFAULT_LANG ?? "zh-tw",
  messages // 語系資料
});

export const setLocale = (locale: string) => {
  console.log(`Setting locale to "${locale}"...`);
  if (locale in messages) {
    setQuasarLang(locale);
    i18n.global.locale = locale;
    storage.set("locale", locale);
    console.log(`Locale set to "${locale}"`);
  } else {
    console.warn(`Locale "${locale}" is not supported.`);
  }
};

export default i18n;
