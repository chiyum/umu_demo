#!/usr/bin/env node
// @ts-check
/**
 * 大亨六版型預覽截圖腳本（自動跑 6 × 3 × 3 × 2 = 108 張）
 *
 * 為什麼用 Playwright（vs Chrome headless / curl + screenshot）：
 * - SPA 路由切換時序穩定（waitForLoadState + selector wait 可組合）
 * - 提供 viewport 精準控制（mobile 390 × 844 / desktop 1440 × 900）
 * - 內建 fullPage 截圖，不必自己拼 Stitch 多次 scroll
 * - README「預覽截圖矩陣」章節已有 Playwright SOP，本 script 延續慣例
 *
 * 為什麼不用 ?device=mobile 而靠 viewport 切換 awd：
 * - useDevice.isMobile 走 window.innerWidth <= 768，viewport 直接觸發
 * - 多一個 query 切版反而增加 store 狀態管理負擔，與既有 awd 邏輯不一致
 *
 * 使用方式：
 *   1. 先啟動 dev server 並確認 port：`yarn dev`（首選 9527，已佔用會自動 +1）
 *   2. 設定 base URL（可選，預設 http://localhost:9528）：
 *      `BASE_URL=http://localhost:9530 node scripts/capture-daheng-previews.mjs`
 *      或對 deployed 站：`BASE_URL=https://chiyum.github.io/umu_demo node ...`
 *   3. 截完 108 張存於 src/assets/previews/
 *
 * 為什麼 BASE_URL 預設 9528：
 * - 本機 dev 主要 port 9527 經常被 admin 專案佔住（CLAUDE.md memory 記錄），
 *   vite 自動升到 9528；若 9528 也佔用再升 9530，使用者用 env override 即可
 *
 * 規格（依任務指示）：
 * - 路徑：src/assets/previews/<theme>-<color>-<logo>-<device>.png
 * - 6 themes × 3 colors × 3 logos × 2 devices = 108 張
 * - mobile viewport 390 × 844 / desktop 1440 × 900
 * - pixelRatio 1（不要 hidpi 截圖兩倍大）
 * - fullPage:true 含整頁
 *
 * 為什麼用 networkidle + selector wait + sleep 三層：
 * - networkidle：等 HTML / 主要 chunk 載入
 * - selector wait：等 theme 元件 mount 完成（不同 layoutkey 對應不同 root selector）
 * - sleep 600ms：等字體 swap + lazy image load 穩定
 * - README 警告過：networkidle 在 dev server 下 HMR client 可能永不達成，dev 模式改用
 *   domcontentloaded + selector wait，但 production 站台 networkidle 較準
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(REPO_ROOT, "src/assets/previews");

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:9528").replace(
  /\/+$/,
  ""
);
const IS_PRODUCTION_BASE = /^https?:\/\/(?!localhost)/.test(BASE_URL);

// 6 daheng themes
const THEMES = [
  "daheng-rank",
  "daheng-grid",
  "daheng-rail",
  "daheng-compact",
  "daheng-list",
  "daheng-magazine"
];

// 3 colors（與 DAHENG_COLORS 對齊）
const COLORS = ["default", "noir", "jade"];

// 3 logos（與 SHARED_LOGOS 對齊；注意 long-heng 帶 hyphen 不要拆字）
const LOGOS = ["dahsing", "umu", "long-heng"];

/**
 * Sanity check 用的「logoKey → 預期 img.src path fragment」map
 *
 * 為什麼需要 sanity check（reviewer 觀察 #3）：
 * - v4.5 截圖踩過 silent fail bug：截圖時實際渲染的永遠是 store defaultLogo 而非
 *   URL 帶的 ?logoKey=，三個 logoKey 截出同一張圖，但檔名不同（72/108 重複）
 * - 既有 waitForReady 只 wait root selector 出現，沒驗 logo 真的切到指定值
 * - 加 sanity check 後同樣 bug 再出現會 fail-loud：「logo mismatch: expected X, got Y」
 *
 * 為什麼 fragment 選 path 中間而非結尾：
 * - dahsing 與 umu 兩者 logo 圖檔都叫 default.png，差別只在 path 中間（at99 / noya）
 * - 結尾比對會雙方 match 失效；中間 path segment 唯一識別
 * - long-heng 圖檔名本身就是 long-heng.png（path: src/assets/shared-logos/long-heng.png）
 *
 * fragment 來源（dev server 實測）：
 * - dahsing:    http://.../src/themes/at99/assets/logos/default.png
 * - umu:        http://.../src/themes/noya/assets/logos/default.png
 * - long-heng:  http://.../src/assets/shared-logos/long-heng.png
 *
 * 注意：production build 後 vite 會把 path 改成 /assets/<filename>-<hash>.png，
 * 不再保有原始路徑結構。本 script 預設跑 dev server（路徑保留可用），
 * 若使用者改跑 prod build 站台（BASE_URL=https://...），sanity check 會誤判失敗。
 * 因此 IS_PRODUCTION_BASE=true 時跳過 sanity check（信任 prod 已 reviewed）。
 */
const LOGO_KEY_TO_SRC_FRAGMENT = {
  dahsing: "themes/at99/assets/logos/default",
  umu: "themes/noya/assets/logos/default",
  "long-heng": "shared-logos/long-heng"
};

// 2 devices
const DEVICES = /** @type {const} */ ([
  { key: "mobile", viewport: { width: 390, height: 844 } },
  { key: "desktop", viewport: { width: 1440, height: 900 } }
]);

/**
 * 給 daheng 各 theme 對應的 root selector
 *
 * mobile.vue 與 desktop.vue 用不同的 root class（`<theme>-m` / `<theme>-pc`）
 */
function rootSelector(theme, device) {
  const suffix = device === "mobile" ? "-m" : "-pc";
  return `.${theme}${suffix}`;
}

/**
 * 等待頁面渲染穩定
 *
 * 三層等待：
 * 1. waitForLoadState（local dev 用 domcontentloaded 避開 HMR poll，prod 用 networkidle）
 * 2. waitForSelector：theme root selector 出現代表 Vue 已 mount
 * 3. sleep 600ms：字體 swap + lazy image 穩定
 */
async function waitForReady(page, theme, device) {
  const loadState = IS_PRODUCTION_BASE ? "networkidle" : "domcontentloaded";
  await page.waitForLoadState(loadState, { timeout: 30000 }).catch(() => {
    // dev server 下 networkidle 可能永不達成，吞掉錯誤往下走 selector wait
  });
  await page.waitForSelector(rootSelector(theme, device), { timeout: 15000 });
  await page.waitForTimeout(600);
}

async function ensureOutDir() {
  await mkdir(OUT_DIR, { recursive: true });
}

/**
 * Sanity check：驗證頁面實際渲染的 logo 對應 URL 帶的 logoKey
 *
 * 為什麼選 `.daheng-header__logo` 與 `[class*="__brand"] img` 兩個 selector：
 * - mobile 走 daheng-header.vue（class: daheng-header__logo）
 * - desktop 走各自 desktop.vue brand 區塊（class: daheng-<theme>-pc__brand img）
 *   pattern 是 `[class*="__brand"] img`，命中 6 個 theme 的 PC brand logo
 * - 不用其他 logo 渲染點（如 footer / drawer），避免無關 logo 干擾
 *
 * IS_PRODUCTION_BASE 跳過 sanity check：prod build 後 path 是 hash 命名，
 * 與 dev server 完全不同，硬比對 fragment 必誤判失敗
 *
 * 為什麼 throw 而非回 false：
 * - captureOne 的 try/catch 會接住，個別 page 失敗不中斷整個批次
 * - error message 含 expected / actual 對照，方便偵錯
 */
async function assertLogoMatches(page, logoKey, device) {
  if (IS_PRODUCTION_BASE) return;
  const expectedFragment = LOGO_KEY_TO_SRC_FRAGMENT[logoKey];
  if (!expectedFragment) {
    throw new Error(`unknown logoKey: ${logoKey}（map 沒對應 fragment）`);
  }
  const selector =
    device === "mobile"
      ? ".daheng-header__logo"
      : '[class*="__brand"] img';
  const actualSrc = await page.evaluate((sel) => {
    const img = document.querySelector(sel);
    return img instanceof HTMLImageElement ? img.src : null;
  }, selector);
  if (!actualSrc) {
    throw new Error(
      `logo img not found (selector: ${selector}, device: ${device})`
    );
  }
  if (!actualSrc.includes(expectedFragment)) {
    throw new Error(
      `logo mismatch: expected fragment "${expectedFragment}" (logoKey=${logoKey}), got src="${actualSrc}"`
    );
  }
}

/**
 * 截單張：navigate → wait → screenshot
 *
 * 為什麼每張各自一個新 page：
 * - 不同 logoKey / color 切換靠 URL query，無狀態污染；但每張 fresh page 最保險
 * - 共用 context 但 page 用完關掉，避免 memory 堆積
 */
async function captureOne(context, theme, color, logoKey, device) {
  const fname = `${theme}-${color}-${logoKey}-${device.key}.png`;
  const outPath = resolve(OUT_DIR, fname);
  const url = `${BASE_URL}/demo/${theme}?color=${color}&logoKey=${logoKey}`;

  const page = await context.newPage();
  await page.setViewportSize(device.viewport);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForReady(page, theme, device.key);
    // v4.6 加：sanity check 確認頁面實際渲染的 logo 對應 URL 帶的 logoKey
    // 防 v4.5 silent fail bug 再發生（72/108 重複截圖）
    await assertLogoMatches(page, logoKey, device.key);
    await page.screenshot({
      path: outPath,
      fullPage: true,
      type: "png"
    });
    return { ok: true, fname };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, fname, error: msg };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log(`[daheng-preview] base url: ${BASE_URL}`);
  console.log(`[daheng-preview] output dir: ${OUT_DIR}`);
  console.log(
    `[daheng-preview] plan: ${THEMES.length} themes × ${COLORS.length} colors × ${LOGOS.length} logos × ${DEVICES.length} devices = ${THEMES.length * COLORS.length * LOGOS.length * DEVICES.length} shots`
  );

  await ensureOutDir();

  // 為什麼用 devicePixelRatio: 1 + headless：依任務指示「不要 hidpi 兩倍大」
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    // 限定 zh-TW 確保字體 swap 與 fallback 一致
    locale: "zh-TW"
  });

  let success = 0;
  const failures = [];
  const startedAt = Date.now();

  // 為什麼 serial 跑而非 parallel：
  // - 平行打 SPA 同一份 dev server 容易把字體 / chunk 載入排程打亂
  // - 108 張 × 約 3 秒 / 張 ≈ 5 分鐘，可接受
  // - 若使用者要加速可改成限制 concurrency 的 worker pool
  for (const theme of THEMES) {
    for (const color of COLORS) {
      for (const logo of LOGOS) {
        for (const device of DEVICES) {
          const result = await captureOne(context, theme, color, logo, device);
          if (result.ok) {
            success += 1;
            // 每 10 張回報一次進度避免 stdout 過長
            if (success % 10 === 0) {
              const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
              console.log(
                `[daheng-preview] progress: ${success} done in ${elapsed}s`
              );
            }
          } else {
            failures.push(result);
            console.error(
              `[daheng-preview] FAIL ${result.fname}: ${result.error}`
            );
          }
        }
      }
    }
  }

  await context.close();
  await browser.close();

  const totalSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(
    `[daheng-preview] done: ${success} success / ${failures.length} fail in ${totalSec}s`
  );

  if (failures.length > 0) {
    console.error(`[daheng-preview] failures (re-run to retry):`);
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
