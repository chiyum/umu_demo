import { defineConfig, loadEnv, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";
import eslint from "vite-plugin-eslint";
import { viteMockServe } from "vite-plugin-mock";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";
import { imagetools } from "vite-imagetools";
import fs from "fs";
import path from "path";
import stylelint from "vite-plugin-stylelint";

/**
 * 自動掃描 src/themes/<key>/ 下的 _tokens.scss 與 _variants.scss
 * 組成 @use 字串，給 vite css.preprocessorOptions.additionalData 用
 *
 * 動機：原本每次新增版面要去 main.default.scss 手動加兩行 @use；
 * 這跟 registry 一行就能新增版面的設計精神不符。
 * 改成 build-time 掃資料夾自動產生 @use 列表，新增版面就只動 _registry.ts。
 *
 * 為何不放在 theme 的 index.ts 用 SFC import：theme 是 lazy chunk，
 * tokens 會被切到對應 chunk 裡，首次載入未切到的 theme 配色不會在 :root 注入，
 * 違反「CSS var 一開始就要可用」的需求，故必須走 build-time。
 *
 * 注意：tokens 與 variants 都是 [data-theme] selector，沒有真正的 export，
 * 所以 @use ... as alias 只是避免 namespace collision 警告。
 */
function buildThemeScssImports(): string {
  const themesDir = path.resolve(__dirname, "src/themes");
  if (!fs.existsSync(themesDir)) return "";

  const lines: string[] = [];
  for (const entry of fs.readdirSync(themesDir, { withFileTypes: true })) {
    // 跳過 _registry.ts / _types.ts 等檔案，只看資料夾
    if (!entry.isDirectory()) continue;
    const themeKey = entry.name;
    const themePath = path.join(themesDir, themeKey);
    const tokensPath = path.join(themePath, "_tokens.scss");
    const variantsPath = path.join(themePath, "_variants.scss");
    // tokens 為必要（定義 CSS var 主體），不存在就跳過
    if (!fs.existsSync(tokensPath)) continue;
    lines.push(`@use "@/themes/${themeKey}/tokens" as ${themeKey}-tokens;`);
    // variants 為可選（單一配色 theme 可能不需要 variants）
    if (fs.existsSync(variantsPath)) {
      lines.push(
        `@use "@/themes/${themeKey}/variants" as ${themeKey}-variants;`
      );
    }
  }
  return lines.join("\n");
}

// 自定義插件：把每個頁面 defineOptions 內容抽到虛擬模組 virtual:page-meta
// 用途：讓 pages.ts 不必 eager import 頁面就能拿到 layout / setting / title
// 這是 bundle 體積優化的關鍵 — 避免所有 page component 被打進主 chunk
function pageMetaPlugin(template: string): Plugin {
  const virtualId = "virtual:page-meta";
  const resolvedId = "\0" + virtualId;
  const pagesDir = path.resolve(__dirname, `src/pages/${template}`);

  // 遞迴掃描 .vue 檔
  function walkVue(dir: string, out: string[] = []): string[] {
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkVue(full, out);
      else if (entry.isFile() && entry.name.endsWith(".vue")) out.push(full);
    }
    return out;
  }

  // 從 SFC 原始碼中萃取 defineOptions({...}) 字面量
  function extractMeta(src: string): Record<string, unknown> {
    const m = src.match(/defineOptions\s*\(\s*(\{[\s\S]*?\})\s*\)\s*;?/);
    if (!m) return {};
    try {
      // 本專案內 defineOptions 內容皆為靜態字面量；用 Function 解析即可
      // 不用 JSON.parse 因為 key 沒加引號、有註解、單引號等 JS 寫法
      return new Function(`return ${m[1]}`)() as Record<string, unknown>;
    } catch (e) {
      console.warn(`[page-meta] 無法解析 defineOptions: ${e}`);
      return {};
    }
  }

  return {
    name: "page-meta",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      const files = walkVue(pagesDir);
      const meta: Record<string, Record<string, unknown>> = {};
      for (const f of files) {
        // 對齊 import.meta.glob 的 key 格式：以 /src/... 為開頭
        const key = "/" + path.relative(__dirname, f).split(path.sep).join("/");
        const src = fs.readFileSync(f, "utf-8");
        meta[key] = extractMeta(src);
        this.addWatchFile(f);
      }
      return `export default ${JSON.stringify(meta)};`;
    },
    handleHotUpdate(ctx) {
      // page 內容變動時讓 virtual module 失效，方便 HMR 抓到新的 meta
      if (ctx.file.startsWith(pagesDir)) {
        const mod = ctx.server.moduleGraph.getModuleById(resolvedId);
        if (mod) ctx.server.moduleGraph.invalidateModule(mod);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 載入指定模式的環境變數，並指定環境變數目錄為 "env"
  const env = loadEnv(mode, process.cwd() + "/env");
  const currentEnvStyle = env.VITE_STYLE_ENV || "base";
  const currentEnvTemplate = env.VITE_TEMPLATE_ENV || "base";
  // 僅提取以 VITE_ 開頭的環境變數
  const viteEnv = Object.keys(env)
    .filter((key) => key.startsWith("VITE_"))
    .reduce((acc, key) => {
      acc[key] = env[key];
      return acc;
    }, {});

  // 在控制台輸出當前模式及載入的 VITE_ 開頭環境變數，便於調試
  console.log("當前模式:", mode);
  console.log("載入的 VITE 環境變數:", viteEnv);
  console.log("當前載入模板:", currentEnvTemplate);
  console.log("當前載入全域樣式:", env.VITE_STYLE_ENV);

  return {
    base: "./",
    envDir: "./env", // 指定環境變數文件的目錄
    plugins: [
      pageMetaPlugin(currentEnvTemplate),
      // Vue 插件，用於支援 Vue 單文件組件
      vue({
        template: { transformAssetUrls } // 處理資源文件的 URL 路徑，讓 Vue 支援 Quasar 資源加載
      }),
      imagetools(),
      // Quasar 插件，用於支援 Quasar UI 元件庫
      quasar({
        sassVariables: fileURLToPath(
          new URL("./src/quasar-variables.sass", import.meta.url)
        ) // 自訂 Quasar Sass 變數
      }),
      /** 自動導入插件 */
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            "vue-i18n": ["useI18n"]
            // 列出自動導入的函數或方法
            // 這裡可以加入其他常用的函數
          }
        ],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "src/auto-imports.d.ts", // 自動生成類型定義檔案
        // 配置 ESLint 支援自動導入，避免未使用的變數報錯
        eslintrc: {
          enabled: true, // 預設為 false，這裡設為 true 啟用 ESLint 支援
          filepath: "./.eslintrc-auto-import.json", // 配置文件的路徑
          globalsPropValue: true // 設定全域變數的屬性值，預設為 true
        }
      }),
      stylelint({
        // 自動修復
        fix: true,
        // 檢查的檔案
        include: ["src/**/*.{css,scss,sass,vue}"],
        // 排除的檔案
        exclude: [
          "node_modules",
          "dist",
          "src/assets/scss/global/reset.scss",
          "src/assets/scss/global/setting.scss"
        ],
        // 在開發模式啟用
        lintOnStart: true,
        // 快取提升效能
        cache: false,
        // 顯示在終端機
        emitErrorAsWarning: false
      }),
      /** ESLint 插件 */
      {
        // ESLint 插件設定：在本地開發模式下不因警告報錯，但出錯時中止編譯
        ...eslint({
          failOnWarning: false, // 忽略警告
          failOnError: true // 嚴重錯誤中止編譯
        }),
        apply: "serve",
        enforce: "post"
      },
      // 模擬 API 請求插件，支援本地開發 Mock 數據
      viteMockServe({
        mockPath: "mock", // 指定 Mock 資料夾路徑
        enable: true // 啟用 Mock 服務
      }),
      createHtmlPlugin({
        // 配置將環境變數注入到 index.html
        inject: {
          data: {
            VITE_FAVICON_URL: env.VITE_FAVICON_URL, // favicon 路徑
            VITE_PROJECT_DESCRIPTION: env.VITE_PROJECT_DESCRIPTION, // meta 描述
            VITE_SITE_TITLE: env.VITE_SITE_TITLE // 網站標題
          }
        }
      })
    ],
    /** 快捷路徑設定 */
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)), // 設定 `@` 指向 `src` 資料夾
        "@pages": path.resolve(__dirname, `src/pages/${currentEnvTemplate}`), // 指向當前環境的頁面資料夾
        "@layouts": path.resolve(
          __dirname,
          `src/layouts/${currentEnvTemplate}`
        ), // 指向當前環境的佈局資料夾
        "@template-components": path.resolve(
          __dirname,
          `src/components/${currentEnvTemplate}`
        ) // 指向當前環境的模板專屬元件資料夾（單模板 default 也預先準備好）
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 自動引入全域 SCSS 變數
          // themeScssImports 動態掃 src/themes/*/_tokens.scss + _variants.scss，
          // 新增版面只需動 _registry.ts，不必再來這裡 / main.scss 手動 @use
          additionalData: `
          @use "@/assets/scss/variables.${currentEnvStyle}.scss" as *;
          @use "@/assets/scss/main.${currentEnvStyle}.scss" as *;
          ${buildThemeScssImports()}
          `
        }
      }
    },
    /** 支援全域使用 await */
    esbuild: {
      supported: {
        "top-level-await": true // 瀏覽器可處理頂層 await 特性
      }
    },
    /** 本地開發 Server 設定 */
    server: {
      port: 9527, // 本地開發伺服器的端口號
      proxy: {
        "/api": {
          target: "http://localhost:3000", // 將 /apis 請求代理到本地 3000 端口
          changeOrigin: true, // 更改來源，以符合後端 API 的 CORS 設定
          rewrite: (path) => path.replace(/^\/api/, "") // 去除 /apis 前綴
        }
      },
      cors: {
        origin: "*" // 允許所有來源跨域請求
      }
    },
    /** 打包設定 */
    build: {
      // 根據 Git 分支決定輸出目錄，如果是 "online" 分支，輸出到 `dist_online`，否則輸出到 `dist`
      outDir: "dist"
      // rollupOptions: {
      //   output: {
      //     // 定義資源文件的輸出路徑和命名規則
      //     assetFileNames: (assetInfo) => {
      //       let extType = assetInfo.name.split(".").at(1); // 獲取文件的擴展名
      //       if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
      //         extType = "img"; // 如果是圖片文件，將擴展名設置為 "img"
      //       }
      //       return `assets/${extType}/[name]-[hash][extname]`; // 根據文件類型輸出到相應目錄
      //     },
      //     // 定義代碼塊的輸出路徑和命名規則
      //     chunkFileNames: "assets/js/[name]-[hash].js",
      //     entryFileNames: "assets/js/[name]-[hash].js",
      //     // 自定義代碼分塊策略
      //     manualChunks(id) {
      //       if (id.includes("node_modules")) {
      //         // 將 node_modules 內的模組單獨打包，並以其第一層目錄命名
      //         return id
      //           .toString()
      //           .split("node_modules/")[1]
      //           .split("/")[0]
      //           .toString();
      //       }
      //       if (id.includes("pages")) {
      //         // 將 views 目錄的模組單獨打包為 "pages"
      //         return "pages";
      //       }
      //     }
      //   }
      // }
    }
  };
});
