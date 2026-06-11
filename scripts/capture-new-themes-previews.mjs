#!/usr/bin/env node
// @ts-check
/**
 * 三新版型（fuyou / noya-beige / noya-blue）預覽截圖腳本
 *
 * 產出 3 themes × 3 logos × 2 devices = 18 張，命名規約：
 *   <themeKey>-<logoKey>-<device>.png（不含 color 段，對齊三新 theme 的 buildPreviews 規約）
 *   例：fuyou-dahsing-desktop.png、noya-beige-umu-mobile.png、noya-blue-long-heng-desktop.png
 *
 * 為什麼另寫一支而非沿用 capture-daheng-previews.mjs：
 * - daheng 走「含 color 段」108 張命名（<theme>-<color>-<logo>-<device>）+ 統一 root selector pattern（-m / -pc）
 * - 三新 theme 走「不含 color 段」18 張命名，且 root selector 各自不同（見 ROOT_SELECTORS）
 * - 兩者命名 / selector 規約不同，硬塞同檔 if/else 反而難讀
 *
 * 等待策略（延續 README「預覽截圖矩陣」SOP）：
 * - dev server 下用 domcontentloaded（不要 networkidle，HMR client poll 可能永不達成）
 * - 顯式 wait 各 theme 的 root selector，確認 Vue mount 完成
 * - sleep 600ms 等字體 swap + lazy image 穩定
 *
 * 換 logo 機制：透過 URL ?logoKey=<key>（demo-theme.store 的 resolveInitialThemeQuery
 * 第一優先讀 URL ?logoKey=），與 daheng script 一致
 *
 * 使用：
 *   BASE_URL=http://localhost:9528 node scripts/capture-new-themes-previews.mjs
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

const THEMES = ["fuyou", "noya-beige", "noya-blue"];
const LOGOS = ["dahsing", "umu", "long-heng"];
const DEVICES = /** @type {const} */ ([
  { key: "mobile", viewport: { width: 390, height: 844 } },
  { key: "desktop", viewport: { width: 1440, height: 900 } }
]);

/**
 * 三新 theme 的 desktop / mobile root class（與各自 SFC 最外層 div 對齊）
 * - fuyou:      desktop .fuyou-layout / mobile .fuyou-m-layout
 * - noya-beige: desktop .noya-beige-d / mobile .noya-beige-m
 * - noya-blue:  desktop .noya-blue-d  / mobile .noya-blue-m
 */
const ROOT_SELECTORS = {
  fuyou: { desktop: ".fuyou-layout", mobile: ".fuyou-m-layout" },
  "noya-beige": { desktop: ".noya-beige-d", mobile: ".noya-beige-m" },
  "noya-blue": { desktop: ".noya-blue-d", mobile: ".noya-blue-m" }
};

/**
 * logoKey → 預期 img.src path fragment（dev server 路徑，sanity check 用）
 * - dahsing:   src/themes/at99/assets/logos/default.png
 * - umu:       src/themes/noya/assets/logos/default.png
 * - long-heng: src/assets/shared-logos/long-heng.png
 */
const LOGO_KEY_TO_SRC_FRAGMENT = {
  dahsing: "themes/at99/assets/logos/default",
  umu: "themes/noya/assets/logos/default",
  "long-heng": "shared-logos/long-heng"
};

function rootSelector(theme, device) {
  return ROOT_SELECTORS[theme][device];
}

async function waitForReady(page, theme, device) {
  const loadState = IS_PRODUCTION_BASE ? "networkidle" : "domcontentloaded";
  await page.waitForLoadState(loadState, { timeout: 30000 }).catch(() => {});
  await page.waitForSelector(rootSelector(theme, device), { timeout: 15000 });
  await page.waitForTimeout(600);
}

/**
 * Sanity check：確認頁面實際渲染的 logo 對應 URL 帶的 logoKey
 * 三新 theme 的 header logo 都綁 themeStore.currentLogo.src，
 * 取 root 內第一張命中 logos / shared-logos 路徑的 img 比對
 */
async function assertLogoMatches(page, theme, device, logoKey) {
  if (IS_PRODUCTION_BASE) return;
  const expectedFragment = LOGO_KEY_TO_SRC_FRAGMENT[logoKey];
  const root = rootSelector(theme, device);
  const actualSrc = await page.evaluate((sel) => {
    const imgs = [...document.querySelectorAll(`${sel} img`)];
    const logo = imgs.find(
      (i) =>
        i.src.includes("/logos/") || i.src.includes("/shared-logos/")
    );
    return logo ? logo.src : null;
  }, root);
  if (!actualSrc) {
    throw new Error(`logo img not found (root: ${root})`);
  }
  if (!actualSrc.includes(expectedFragment)) {
    throw new Error(
      `logo mismatch: expected "${expectedFragment}" (logoKey=${logoKey}), got "${actualSrc}"`
    );
  }
}

async function captureOne(context, theme, logoKey, device) {
  const fname = `${theme}-${logoKey}-${device.key}.png`;
  const outPath = resolve(OUT_DIR, fname);
  const url = `${BASE_URL}/demo/${theme}?logoKey=${logoKey}`;

  const page = await context.newPage();
  await page.setViewportSize(device.viewport);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForReady(page, theme, device.key);
    await assertLogoMatches(page, theme, device.key, logoKey);
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
  console.log(`[new-themes-preview] base url: ${BASE_URL}`);
  console.log(`[new-themes-preview] output dir: ${OUT_DIR}`);
  console.log(
    `[new-themes-preview] plan: ${THEMES.length} × ${LOGOS.length} × ${DEVICES.length} = ${THEMES.length * LOGOS.length * DEVICES.length} shots`
  );
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    locale: "zh-TW"
  });

  let success = 0;
  const failures = [];
  for (const theme of THEMES) {
    for (const logo of LOGOS) {
      for (const device of DEVICES) {
        const r = await captureOne(context, theme, logo, device);
        if (r.ok) {
          success += 1;
          console.log(`[new-themes-preview] OK ${r.fname}`);
        } else {
          failures.push(r);
          console.error(`[new-themes-preview] FAIL ${r.fname}: ${r.error}`);
        }
      }
    }
  }

  await context.close();
  await browser.close();

  console.log(
    `[new-themes-preview] done: ${success} success / ${failures.length} fail`
  );
  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
