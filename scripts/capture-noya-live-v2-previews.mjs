#!/usr/bin/env node
// @ts-check
/**
 * 諾亞真人 live 第二批（noya-jade ~ noya-mint，c06~c15）預覽截圖腳本
 *
 * 產出 10 themes × 3 logos × 2 devices = 60 張，命名規約：
 *   <themeKey>-<logoKey>-<device>.png（不含 color 段，對齊 registry buildPreviews 的 legacy 命名）
 *   例：noya-jade-dahsing-desktop.png、noya-mint-umu-mobile.png
 *
 * 為什麼沿用 capture-new-themes-previews.mjs 的做法而非合進去：
 * - 與三新 theme 同屬「不含 color 段」18→60 張命名 + 各自 root selector（-d / -m）
 * - 本批 10 個 theme 的 root selector pattern 完全一致（.<key>-d / .<key>-m），
 *   故 ROOT_SELECTORS 用程式生成，不再逐一手寫
 *
 * 等待策略（延續 README「預覽截圖矩陣」SOP）：
 * - dev server 下用 domcontentloaded（不要 networkidle，HMR client poll 可能永不達成）
 * - 顯式 wait 各 theme 的 root selector，確認 Vue mount 完成
 * - sleep 700ms 等字體 swap + lazy image 穩定
 *
 * 換 logo 機制：透過 URL ?logoKey=<key>（demo-theme.store 的 resolveInitialThemeQuery
 * 第一優先讀 URL ?logoKey=），與其他 script 一致
 *
 * 使用：
 *   BASE_URL=http://localhost:9527 node scripts/capture-noya-live-v2-previews.mjs
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(REPO_ROOT, "src/assets/previews");

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:9527").replace(
  /\/+$/,
  ""
);
const IS_PRODUCTION_BASE = /^https?:\/\/(?!localhost)/.test(BASE_URL);

const THEMES = [
  "noya-jade",
  "noya-dawn",
  "noya-lux",
  "noya-sakura",
  "noya-aurora",
  "noya-ink",
  "noya-steel",
  "noya-reef",
  "noya-starlit",
  "noya-mint"
];
const LOGOS = ["dahsing", "umu", "long-heng"];
const DEVICES = /** @type {const} */ ([
  { key: "mobile", viewport: { width: 390, height: 844 } },
  { key: "desktop", viewport: { width: 1440, height: 900 } }
]);

/**
 * 本批 10 個 theme 的 root class 規約一致：desktop .<key>-d / mobile .<key>-m
 * （與各 SFC 最外層 div 對齊，已於 QA render 測試逐一驗證）
 */
function rootSelector(theme, device) {
  return device === "desktop" ? `.${theme}-d` : `.${theme}-m`;
}

async function waitForReady(page, theme, device) {
  const loadState = IS_PRODUCTION_BASE ? "networkidle" : "domcontentloaded";
  await page.waitForLoadState(loadState, { timeout: 30000 }).catch(() => {});
  await page.waitForSelector(rootSelector(theme, device), { timeout: 40000 });
  await page.waitForTimeout(700);
}

async function captureOne(context, theme, logoKey, device) {
  const fname = `${theme}-${logoKey}-${device.key}.png`;
  const outPath = resolve(OUT_DIR, fname);
  const url = `${BASE_URL}/demo/${theme}?logoKey=${logoKey}`;

  const page = await context.newPage();
  await page.setViewportSize(device.viewport);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await waitForReady(page, theme, device.key);
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
  const total = THEMES.length * LOGOS.length * DEVICES.length;
  console.log(`[noya-live-v2-preview] base url: ${BASE_URL}`);
  console.log(`[noya-live-v2-preview] output dir: ${OUT_DIR}`);
  console.log(
    `[noya-live-v2-preview] plan: ${THEMES.length} × ${LOGOS.length} × ${DEVICES.length} = ${total} shots`
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
          console.log(`[noya-live-v2-preview] OK ${r.fname}`);
        } else {
          failures.push(r);
          console.error(
            `[noya-live-v2-preview] FAIL ${r.fname}: ${r.error}`
          );
        }
      }
    }
  }

  await context.close();
  await browser.close();

  console.log(
    `[noya-live-v2-preview] done: ${success} success / ${failures.length} fail`
  );
  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
