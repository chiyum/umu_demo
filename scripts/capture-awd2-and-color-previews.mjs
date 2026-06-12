#!/usr/bin/env node
// @ts-check
/**
 * 補預覽截圖腳本（兩批）
 *
 * 解決兩個預覽相關問題：
 * (1) a16~a21 六個新 theme（daheng-night/onyx/coral/crimson/titan/glacier）完全沒有基礎縮圖
 *     → 主頁卡片破圖。本腳本補「基礎縮圖」36 張。
 * (2) 22 個 theme 沒有任何「色變體截圖」，預覽 dialog 切換配色時 getPreview 退回 default 截圖
 *     → 無視覺變化。本腳本補「色變體截圖」264 張（跳過 default 色）。
 *
 * 命名規約（沿用既有 _registry.ts 消費規約）：
 * - A 基礎縮圖：`<themeKey>-<logoKey>-<device>.png`（不含 color 段，buildPreviews 抓）
 * - B 色變體：  `<themeKey>-<colorKey>-<logoKey>-<device>.png`（含 color 段，buildColorPreviews 抓，跳過 default 色）
 *
 * 統計：
 * - A：6 themes × 3 logos × 2 devices = 36 張
 * - B：22 themes × 2 非預設色 × 3 logos × 2 devices = 264 張
 * - 合計 300 張，全部存到 src/assets/previews/
 *
 * 為什麼 ready 偵測用通用 selector `[data-theme="<key>"]`（vs 逐 theme root class）：
 * - layout-theme-host.vue 會把 data-theme 屬性掛到 document.documentElement（<html>），
 *   所有 theme 通用，免去像 capture-daheng-awd-previews.mjs 那樣維護每 theme 的 root class map
 * - waitForSelector(`[data-theme="<key>"]`) 命中即代表 demo store 已把 layoutKey 同步上去、Vue 已 mount
 *
 * 等待策略（延續既有 README「預覽截圖矩陣」SOP）：
 * - dev server 用 domcontentloaded（不要 networkidle，HMR client poll 可能永不達成）
 * - waitForSelector data-theme 屬性出現
 * - waitForTimeout(700) 等字體 swap + lazy image 穩定
 *
 * 換 logo / 換 color 機制：透過 URL query（demo-theme.store 第一優先讀 URL）
 * - logo：?logoKey=<key>
 * - color：?color=<key>（A 批不帶 color，走預設色；B 批帶非預設色）
 *
 * 使用：
 *   BASE_URL=http://localhost:9530 node scripts/capture-awd2-and-color-previews.mjs
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(REPO_ROOT, "src/assets/previews");

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:9530").replace(
  /\/+$/,
  ""
);
const IS_PRODUCTION_BASE = /^https?:\/\/(?!localhost)/.test(BASE_URL);

const LOGOS = ["dahsing", "umu", "long-heng"];
const DEVICES = /** @type {const} */ ([
  { key: "mobile", viewport: { width: 390, height: 844 } },
  { key: "desktop", viewport: { width: 1440, height: 900 } }
]);

/**
 * A 批：a16~a21 六個新 theme 的基礎縮圖（不含 color 段）
 */
const BASE_THEMES = [
  "daheng-night",
  "daheng-onyx",
  "daheng-coral",
  "daheng-crimson",
  "daheng-titan",
  "daheng-glacier"
];

/**
 * B 批：22 個沒有 colorPreviews 的 theme，各自 2 個非預設色（與 _registry.ts colors 對齊）
 *
 * 注意：跳過 default 色（既有 buildColorPreviews 規約：default 色直接用基礎縮圖，不重截）
 */
const COLOR_THEMES = /** @type {const} */ ([
  { key: "noya", colors: ["sunset", "lime"] },
  { key: "at99", colors: ["neon-purple", "neon-green"] },
  { key: "ant-sport", colors: ["midnight", "red"] },
  { key: "tycoon", colors: ["deep", "gold"] },
  { key: "vietvip", colors: ["midnight", "gold"] },
  { key: "honest-at", colors: ["neon-purple", "neon-cyan"] },
  { key: "honest-max", colors: ["azure", "sunset"] },
  { key: "honest-no6", colors: ["midnight", "crimson"] },
  { key: "at-deluxe", colors: ["rose-neon", "gold-deluxe"] },
  { key: "fived", colors: ["royal-blue", "crimson-rose"] },
  { key: "fuyou", colors: ["royal", "crimson"] },
  { key: "noya-beige", colors: ["rose", "olive"] },
  { key: "noya-blue", colors: ["teal", "indigo"] },
  { key: "daheng-neon", colors: ["neon-magenta", "neon-lime"] },
  { key: "daheng-emerald", colors: ["jade-rose", "onyx-gold"] },
  { key: "daheng-fresh", colors: ["mint-green", "coral-pink"] },
  { key: "daheng-night", colors: ["aurora", "cyber-blue"] },
  { key: "daheng-onyx", colors: ["rose-gold", "champagne"] },
  { key: "daheng-coral", colors: ["mango", "berry"] },
  { key: "daheng-crimson", colors: ["imperial", "vermillion"] },
  { key: "daheng-titan", colors: ["gunmetal-cyan", "graphite-rose"] },
  { key: "daheng-glacier", colors: ["mint-ice", "lavender-frost"] }
]);

/**
 * logoKey → 預期 img.src path fragment（dev server 路徑，sanity check 用）
 * 沿用既有 daheng 腳本的 map（三 logo 來源固定）
 */
const LOGO_KEY_TO_SRC_FRAGMENT = {
  dahsing: "themes/at99/assets/logos/default",
  umu: "themes/noya/assets/logos/default",
  "long-heng": "shared-logos/long-heng"
};

/**
 * 等待頁面渲染穩定：domcontentloaded + data-theme selector + 700ms
 */
async function waitForReady(page, themeKey) {
  const loadState = IS_PRODUCTION_BASE ? "networkidle" : "domcontentloaded";
  await page.waitForLoadState(loadState, { timeout: 30000 }).catch(() => {
    // dev server 下 networkidle 可能永不達成，吞掉錯誤往下走 selector wait
  });
  await page.waitForSelector(`[data-theme="${themeKey}"]`, { timeout: 15000 });
  // 關鍵：[data-theme] 只代表 layout-theme-host 已 mount 並掛屬性，但 theme 本體是
  // _layoutkey.vue 的 <Suspense> 動態 import chunk，冷啟動時還在跑骨架（.demo-skeleton）。
  // 等骨架 detached 才代表 chunk 已渲染完成，否則 dev server 暖機期會截到 loading 骨架圖。
  await page
    .waitForSelector(".demo-skeleton", { state: "detached", timeout: 20000 })
    .catch(() => {
      // 極少數情況下 chunk 已是 warm（骨架從未出現），detached wait 立即過或 timeout 都不致命
    });
  await page.waitForTimeout(700);
}

/**
 * 無 logo <img> 的 theme：跳過 logo sanity check
 *
 * daheng-night 的 HUD avatar 用文字「亨」而非 logo <img>，只把 currentLogo.label 綁到
 * title 屬性（見 daheng-night/{desktop,mobile}.vue）。整頁找不到 /logos/ img，硬跑
 * sanity check 必失敗；且切 logoKey 對此 theme 無視覺差異（by design），故對它略過。
 */
const NO_LOGO_IMG_THEMES = new Set(["daheng-night"]);

/**
 * Sanity check：確認頁面實際渲染的 logo 對應 URL 帶的 logoKey
 *
 * 為什麼需要：防 silent fail（截圖時實際渲染永遠是 store defaultLogo，三 logoKey 截出同圖）
 * 取整頁第一張命中 logos / shared-logos 路徑的 img 比對（通用所有 theme，不綁特定 class）
 */
async function assertLogoMatches(page, logoKey, themeKey) {
  if (IS_PRODUCTION_BASE) return;
  if (NO_LOGO_IMG_THEMES.has(themeKey)) return;
  const expectedFragment = LOGO_KEY_TO_SRC_FRAGMENT[logoKey];
  if (!expectedFragment) {
    throw new Error(`unknown logoKey: ${logoKey}（map 沒對應 fragment）`);
  }
  const actualSrc = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const logo = imgs.find(
      (i) =>
        i.src.includes("/logos/") || i.src.includes("/shared-logos/")
    );
    return logo ? logo.src : null;
  });
  if (!actualSrc) {
    throw new Error(`logo img not found（logoKey=${logoKey}）`);
  }
  if (!actualSrc.includes(expectedFragment)) {
    throw new Error(
      `logo mismatch: expected "${expectedFragment}" (logoKey=${logoKey}), got "${actualSrc}"`
    );
  }
}

/**
 * 截單張：navigate → wait → sanity → screenshot
 *
 * @param {import('playwright').BrowserContext} context
 * @param {string} themeKey
 * @param {string | null} colorKey  null = 基礎縮圖（不帶 ?color）
 * @param {string} logoKey
 * @param {{ key: string, viewport: { width: number, height: number } }} device
 */
async function captureOne(context, themeKey, colorKey, logoKey, device) {
  const fname = colorKey
    ? `${themeKey}-${colorKey}-${logoKey}-${device.key}.png`
    : `${themeKey}-${logoKey}-${device.key}.png`;
  const outPath = resolve(OUT_DIR, fname);
  const url = colorKey
    ? `${BASE_URL}/demo/${themeKey}?color=${colorKey}&logoKey=${logoKey}`
    : `${BASE_URL}/demo/${themeKey}?logoKey=${logoKey}`;

  const page = await context.newPage();
  await page.setViewportSize(device.viewport);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForReady(page, themeKey);
    await assertLogoMatches(page, logoKey, themeKey);
    await page.screenshot({ path: outPath, fullPage: true, type: "png" });
    return { ok: true, fname };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, fname, error: msg };
  } finally {
    await page.close();
  }
}

async function main() {
  const baseShots = BASE_THEMES.length * LOGOS.length * DEVICES.length;
  const colorShots = COLOR_THEMES.reduce(
    (sum, t) => sum + t.colors.length * LOGOS.length * DEVICES.length,
    0
  );
  console.log(`[awd2-color-preview] base url: ${BASE_URL}`);
  console.log(`[awd2-color-preview] output dir: ${OUT_DIR}`);
  console.log(
    `[awd2-color-preview] plan: A 基礎 ${baseShots} 張 + B 色變體 ${colorShots} 張 = ${baseShots + colorShots} 張`
  );
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    locale: "zh-TW"
  });

  let success = 0;
  const failures = [];
  const startedAt = Date.now();

  // A 批：基礎縮圖（不帶 color）
  console.log(`[awd2-color-preview] === A 基礎縮圖（${baseShots} 張）===`);
  for (const themeKey of BASE_THEMES) {
    for (const logo of LOGOS) {
      for (const device of DEVICES) {
        const r = await captureOne(context, themeKey, null, logo, device);
        if (r.ok) {
          success += 1;
          console.log(`[awd2-color-preview] OK ${r.fname}`);
        } else {
          failures.push(r);
          console.error(`[awd2-color-preview] FAIL ${r.fname}: ${r.error}`);
        }
      }
    }
  }

  // B 批：色變體截圖（帶非預設 color）
  console.log(`[awd2-color-preview] === B 色變體（${colorShots} 張）===`);
  for (const { key: themeKey, colors } of COLOR_THEMES) {
    for (const color of colors) {
      for (const logo of LOGOS) {
        for (const device of DEVICES) {
          const r = await captureOne(context, themeKey, color, logo, device);
          if (r.ok) {
            success += 1;
            console.log(`[awd2-color-preview] OK ${r.fname}`);
          } else {
            failures.push(r);
            console.error(`[awd2-color-preview] FAIL ${r.fname}: ${r.error}`);
          }
        }
      }
    }
  }

  await context.close();
  await browser.close();

  const totalSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(
    `[awd2-color-preview] done: ${success} success / ${failures.length} fail in ${totalSec}s`
  );
  if (failures.length > 0) {
    console.error(`[awd2-color-preview] failures:`);
    for (const f of failures) {
      console.error(`  - ${f.fname}: ${f.error}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
