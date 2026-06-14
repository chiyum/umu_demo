#!/usr/bin/env node
// @ts-check
/**
 * 諾亞真人 live 第三批（noya-pill ~ noya-tabline，c16~c25）預覽截圖腳本
 *
 * 本專案預覽圖統一 WebP：桌面 1080w / 手機原寸 / quality 82
 * （與 scripts/compress-previews.mjs、capture-noya-live-v2-previews.mjs 的轉檔策略一致）
 *
 * 產出 10 themes × 3 logos × 2 devices = 60 張，命名規約：
 *   <themeKey>-<logoKey>-<device>.webp（不含 color 段，對齊 registry buildPreviews 的 legacy 命名）
 *   例：noya-pill-dahsing-desktop.webp、noya-tabline-umu-mobile.webp
 *
 * 等待策略（延續 README「預覽截圖矩陣」SOP）：
 * - dev server 下用 domcontentloaded（不要 networkidle，HMR client poll 可能永不達成）
 * - 顯式 wait 各 theme 的 root selector（.<key>-d / .<key>-m），確認 Vue mount 完成
 * - sleep 700ms 等字體 swap + lazy image 穩定
 *
 * 換 logo 機制：透過 URL ?logoKey=<key>（demo-theme.store 第一優先讀 URL ?logoKey=）
 *
 * 使用：
 *   BASE_URL=http://localhost:9528 node scripts/capture-noya-live-v3-previews.mjs
 */

import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// 桌面預覽縮圖目標寬度（與 dialog 面板 max-width 對齊）
const DESKTOP_TARGET_WIDTH = 1080;
const WEBP_QUALITY = 82;

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(REPO_ROOT, "src/assets/previews");

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:9527").replace(
  /\/+$/,
  ""
);
const IS_PRODUCTION_BASE = /^https?:\/\/(?!localhost)/.test(BASE_URL);

const THEMES = [
  "noya-pill",
  "noya-orbit",
  "noya-petal",
  "noya-rhombus",
  "noya-hive",
  "noya-beacon",
  "noya-bubble",
  "noya-bookmark",
  "noya-squircle",
  "noya-tabline"
];
const LOGOS = ["dahsing", "umu", "long-heng"];
const DEVICES = /** @type {const} */ ([
  { key: "mobile", viewport: { width: 390, height: 844 } },
  { key: "desktop", viewport: { width: 1440, height: 900 } }
]);

/**
 * 本批 10 個 theme 的 root class 規約一致：desktop .<key>-d / mobile .<key>-m
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
  const fname = `${theme}-${logoKey}-${device.key}.webp`;
  const outPath = resolve(OUT_DIR, fname);
  const url = `${BASE_URL}/demo/${theme}?logoKey=${logoKey}`;

  const page = await context.newPage();
  await page.setViewportSize(device.viewport);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await waitForReady(page, theme, device.key);

    // 先以 PNG buffer 截圖，再交給 sharp 轉 WebP：
    // 桌面圖縮到 1080 寬（手機原寸），統一 quality 82
    const pngBuffer = await page.screenshot({ fullPage: true, type: "png" });
    const pipeline = sharp(pngBuffer);
    if (device.key === "desktop") {
      pipeline.resize({ width: DESKTOP_TARGET_WIDTH, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);

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
  console.log(`[noya-live-v3-preview] base url: ${BASE_URL}`);
  console.log(`[noya-live-v3-preview] output dir: ${OUT_DIR}`);
  console.log(
    `[noya-live-v3-preview] plan: ${THEMES.length} × ${LOGOS.length} × ${DEVICES.length} = ${total} shots`
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
          console.log(`[noya-live-v3-preview] OK ${r.fname}`);
        } else {
          failures.push(r);
          console.error(`[noya-live-v3-preview] FAIL ${r.fname}: ${r.error}`);
        }
      }
    }
  }

  await context.close();
  await browser.close();

  console.log(
    `[noya-live-v3-preview] done: ${success} success / ${failures.length} fail`
  );
  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
