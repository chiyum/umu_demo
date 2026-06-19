#!/usr/bin/env node
// @ts-check
/**
 * noya-lagoon（c26 諾亞礁湖）預覽截圖腳本
 *
 * 與 capture-noya-live-v2-previews.mjs 的差異：
 * - 只產 1 個 theme（noya-lagoon），但要含 color 變體（coral 預設 + mango + berry）
 * - 重點：device 偵測自 2026-06-16 起改為「UA 為主」（src/utils/use-device.ts），
 *   舊腳本用桌面 UA + 390 寬截「mobile」會被判成電腦版。
 *   故本腳本 mobile 走獨立的「行動 UA」context（isMobile + hasTouch + 手機 UA），
 *   才會真的載入 mobile.vue。
 *
 * 命名規約（對齊 registry 的 buildPreviews / buildColorPreviews）：
 * - 預設色 coral：<theme>-<logo>-<device>.webp（不含 color 段）
 * - 其他色：<theme>-<color>-<logo>-<device>.webp
 *
 * 預覽圖統一 WebP：桌面縮到 1080w / 手機原寸 / quality 82
 *
 * 使用：
 *   BASE_URL=http://localhost:5180 node scripts/capture-noya-lagoon-previews.mjs
 */

import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DESKTOP_TARGET_WIDTH = 1080;
const WEBP_QUALITY = 82;

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(REPO_ROOT, "src/assets/previews");

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:5180").replace(
  /\/+$/,
  ""
);
const IS_PRODUCTION_BASE = /^https?:\/\/(?!localhost)/.test(BASE_URL);

const THEME = "noya-lagoon";
const DEFAULT_COLOR = "coral";
// 對齊 noya-reef（c13）的既有做法：只產 base（預設色 coral）預覽，
// color 變體 preview 留空走 fallback（與 reef 一致）。如未來要補色變體，
// 把 mango / berry 加回即可（mobile 色變體 capture 已驗證可行；desktop 色變體實測像素相同）。
const COLORS = ["coral"];
const LOGOS = ["dahsing", "umu", "long-heng"];
const DEVICES = /** @type {const} */ ([
  { key: "mobile", viewport: { width: 390, height: 844 } },
  { key: "desktop", viewport: { width: 1440, height: 900 } }
]);

// 行動裝置 UA：讓 use-device.ts 的 isMobileUserAgent() 命中 → 載入 mobile.vue
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1";

function rootSelector(device) {
  return device === "desktop" ? `.${THEME}-d` : `.${THEME}-m`;
}

function fileName(color, logo, device) {
  // 預設色不含 color 段（對齊 buildPreviews legacy 命名）
  return color === DEFAULT_COLOR
    ? `${THEME}-${logo}-${device}.webp`
    : `${THEME}-${color}-${logo}-${device}.webp`;
}

async function waitForReady(page, device) {
  const loadState = IS_PRODUCTION_BASE ? "networkidle" : "domcontentloaded";
  await page.waitForLoadState(loadState, { timeout: 30000 }).catch(() => {});
  await page.waitForSelector(rootSelector(device), { timeout: 40000 });
  await page.waitForTimeout(800);
}

async function captureOne(context, color, logo, device) {
  const fname = fileName(color, logo, device.key);
  const outPath = resolve(OUT_DIR, fname);
  const url = `${BASE_URL}/demo/${THEME}?logoKey=${logo}&color=${color}`;

  const page = await context.newPage();
  await page.setViewportSize(device.viewport);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await waitForReady(page, device.key);

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
  const total = COLORS.length * LOGOS.length * DEVICES.length;
  console.log(`[lagoon-preview] base url: ${BASE_URL}`);
  console.log(`[lagoon-preview] output dir: ${OUT_DIR}`);
  console.log(
    `[lagoon-preview] plan: ${COLORS.length} colors × ${LOGOS.length} logos × ${DEVICES.length} devices = ${total} shots`
  );
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  // 桌面 context：預設桌面 UA
  const desktopCtx = await browser.newContext({
    deviceScaleFactor: 1,
    locale: "zh-TW"
  });
  // 手機 context：行動 UA + isMobile，才會載入 mobile.vue
  const mobileCtx = await browser.newContext({
    userAgent: MOBILE_UA,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    locale: "zh-TW"
  });

  let success = 0;
  const failures = [];
  for (const color of COLORS) {
    for (const logo of LOGOS) {
      for (const device of DEVICES) {
        const ctx = device.key === "mobile" ? mobileCtx : desktopCtx;
        const r = await captureOne(ctx, color, logo, device);
        if (r.ok) {
          success += 1;
          console.log(`[lagoon-preview] OK ${r.fname}`);
        } else {
          failures.push(r);
          console.error(`[lagoon-preview] FAIL ${r.fname}: ${r.error}`);
        }
      }
    }
  }

  await desktopCtx.close();
  await mobileCtx.close();
  await browser.close();

  console.log(
    `[lagoon-preview] done: ${success} success / ${failures.length} fail`
  );
  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
