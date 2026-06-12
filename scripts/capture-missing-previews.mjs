#!/usr/bin/env node
// @ts-check
/**
 * 補漏腳本：只重截 capture-awd2-and-color-previews.mjs 首跑時因時序 flaky 漏掉的張數
 *
 * 為什麼另寫一支而非重跑全量：
 * - 首跑 300 張裡有 54 張在 dev server 暖機期（chunk 尚未 warm）的早期請求 race 掉 logo sanity，
 *   重跑全量浪費時間且可能覆蓋已 OK 的圖
 * - 本腳本吃一份「明確的 MISSING 清單」逐張重截，wait 拉長到 1200ms 降低 race
 *
 * 命名 / ready / sanity 機制完全與 capture-awd2-and-color-previews.mjs 一致（data-theme selector）
 *
 * 使用：BASE_URL=http://localhost:9530 node scripts/capture-missing-previews.mjs
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

const DEVICE_VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};

const LOGO_KEY_TO_SRC_FRAGMENT = {
  dahsing: "themes/at99/assets/logos/default",
  umu: "themes/noya/assets/logos/default",
  "long-heng": "shared-logos/long-heng"
};

/**
 * 待補檔名清單（base 不含 color 段 / color 含 color 段，由首跑 missing 報告產出）
 * 由 fname 反解出 theme / color? / logo / device 再組 URL
 */
const MISSING = [
  // --- A 基礎縮圖 ---
  "daheng-night-dahsing-mobile.png",
  "daheng-night-umu-desktop.png",
  "daheng-night-umu-mobile.png",
  "daheng-night-long-heng-desktop.png",
  "daheng-night-long-heng-mobile.png",
  "daheng-onyx-dahsing-mobile.png",
  "daheng-coral-dahsing-mobile.png",
  "daheng-crimson-dahsing-mobile.png",
  "daheng-titan-dahsing-mobile.png",
  "daheng-glacier-dahsing-mobile.png",
  // --- B 色變體 ---
  "noya-sunset-dahsing-mobile.png",
  "noya-sunset-umu-desktop.png",
  "noya-sunset-umu-mobile.png",
  "noya-sunset-long-heng-mobile.png",
  "at99-neon-purple-dahsing-mobile.png",
  "at99-neon-purple-umu-desktop.png",
  "at99-neon-purple-umu-mobile.png",
  "ant-sport-midnight-dahsing-mobile.png",
  "ant-sport-midnight-umu-desktop.png",
  "ant-sport-midnight-umu-mobile.png",
  "tycoon-deep-dahsing-mobile.png",
  "vietvip-midnight-dahsing-mobile.png",
  "vietvip-midnight-umu-desktop.png",
  "vietvip-midnight-umu-mobile.png",
  "honest-at-neon-purple-dahsing-mobile.png",
  "honest-at-neon-purple-umu-desktop.png",
  "honest-at-neon-purple-umu-mobile.png",
  "honest-max-azure-dahsing-mobile.png",
  "honest-max-azure-umu-desktop.png",
  "honest-max-azure-umu-mobile.png",
  "honest-max-azure-long-heng-desktop.png",
  "honest-no6-midnight-dahsing-mobile.png",
  "honest-no6-midnight-umu-desktop.png",
  "honest-no6-midnight-umu-mobile.png",
  "at-deluxe-rose-neon-dahsing-mobile.png",
  "at-deluxe-rose-neon-umu-desktop.png",
  "at-deluxe-rose-neon-umu-mobile.png",
  "fived-royal-blue-dahsing-mobile.png",
  "fuyou-royal-dahsing-mobile.png",
  "noya-beige-rose-dahsing-mobile.png",
  "noya-blue-teal-dahsing-mobile.png",
  "daheng-neon-neon-magenta-dahsing-mobile.png",
  "daheng-emerald-jade-rose-dahsing-mobile.png",
  "daheng-fresh-mint-green-dahsing-mobile.png",
  "daheng-night-aurora-dahsing-mobile.png",
  "daheng-night-aurora-umu-desktop.png",
  "daheng-night-aurora-umu-mobile.png",
  "daheng-night-aurora-long-heng-desktop.png",
  "daheng-night-aurora-long-heng-mobile.png",
  "daheng-night-cyber-blue-dahsing-mobile.png",
  "daheng-night-cyber-blue-umu-desktop.png",
  "daheng-night-cyber-blue-umu-mobile.png",
  "daheng-night-cyber-blue-long-heng-desktop.png",
  "daheng-night-cyber-blue-long-heng-mobile.png"
];

/**
 * 已知的 theme key 清單（最長前綴匹配用，避免把 theme 名稱裡的 hyphen 誤拆成 color）
 * 含 hyphen 的 theme key 必須完整列出，解析時取「最長命中前綴」
 */
const THEME_KEYS = [
  "ant-sport",
  "at-deluxe",
  "noya-beige",
  "noya-blue",
  "daheng-night",
  "daheng-onyx",
  "daheng-coral",
  "daheng-crimson",
  "daheng-titan",
  "daheng-glacier",
  "daheng-neon",
  "daheng-emerald",
  "daheng-fresh",
  "honest-at",
  "honest-max",
  "honest-no6",
  "noya",
  "at99",
  "tycoon",
  "vietvip",
  "fived",
  "fuyou"
];

/**
 * 反解檔名 → { theme, color|null, logo, device }
 * 規則：去掉 .png → 末段是 device，倒數第二段(含可能的 long-heng) 是 logo
 * theme 取「最長命中前綴」；theme 之後到 logo 之前剩餘即 color（無剩餘 = 基礎縮圖）
 */
function parseFname(fname) {
  const stem = fname.replace(/\.png$/, "");
  const device = stem.endsWith("-desktop")
    ? "desktop"
    : stem.endsWith("-mobile")
      ? "mobile"
      : null;
  if (!device) throw new Error(`device 無法解析: ${fname}`);
  let rest = stem.slice(0, -(device.length + 1)); // 去掉 -<device>

  const logo = ["long-heng", "dahsing", "umu"].find(
    (l) => rest === l || rest.endsWith(`-${l}`)
  );
  if (!logo) throw new Error(`logo 無法解析: ${fname}`);
  rest = rest === logo ? "" : rest.slice(0, -(logo.length + 1));

  // rest 此時是 `<theme>` 或 `<theme>-<color>`，theme 取最長命中前綴
  const theme = THEME_KEYS.filter(
    (t) => rest === t || rest.startsWith(`${t}-`)
  ).sort((a, b) => b.length - a.length)[0];
  if (!theme) throw new Error(`theme 無法解析: ${fname}（rest=${rest}）`);
  const color = rest === theme ? null : rest.slice(theme.length + 1);

  return { theme, color, logo, device };
}

async function waitForReady(page, themeKey) {
  await page
    .waitForLoadState("domcontentloaded", { timeout: 30000 })
    .catch(() => {});
  await page.waitForSelector(`[data-theme="${themeKey}"]`, { timeout: 20000 });
  // 等 Suspense 骨架（.demo-skeleton）detached，代表 theme chunk 已渲染完成
  // （[data-theme] 只代表 layout mount，chunk 冷啟動時仍在跑骨架）
  await page
    .waitForSelector(".demo-skeleton", { state: "detached", timeout: 20000 })
    .catch(() => {});
  // 補漏跑把 wait 從 700 拉到 1200，降低 dev server 暖機期 race
  await page.waitForTimeout(1200);
}

/**
 * daheng-night 例外：此 theme 的 HUD avatar 用文字「亨」而非 logo <img>，
 * 只把 currentLogo.label 綁到 title 屬性（見 daheng-night/{desktop,mobile}.vue）。
 * 整頁找不到 /logos/ img，硬跑 sanity check 必失敗；且切 logoKey 對此 theme
 * 無視覺差異（by design），故對它略過 logo sanity（其餘 theme 照常驗）。
 */
const NO_LOGO_IMG_THEMES = new Set(["daheng-night"]);

async function assertLogoMatches(page, logoKey, themeKey) {
  if (NO_LOGO_IMG_THEMES.has(themeKey)) return;
  const expectedFragment = LOGO_KEY_TO_SRC_FRAGMENT[logoKey];
  const actualSrc = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const logo = imgs.find(
      (i) => i.src.includes("/logos/") || i.src.includes("/shared-logos/")
    );
    return logo ? logo.src : null;
  });
  if (!actualSrc) throw new Error(`logo img not found（logoKey=${logoKey}）`);
  if (!actualSrc.includes(expectedFragment)) {
    throw new Error(
      `logo mismatch: expected "${expectedFragment}" (logoKey=${logoKey}), got "${actualSrc}"`
    );
  }
}

async function captureOne(context, fname) {
  const { theme, color, logo, device } = parseFname(fname);
  const outPath = resolve(OUT_DIR, fname);
  const url = color
    ? `${BASE_URL}/demo/${theme}?color=${color}&logoKey=${logo}`
    : `${BASE_URL}/demo/${theme}?logoKey=${logo}`;

  const page = await context.newPage();
  await page.setViewportSize(DEVICE_VIEWPORTS[device]);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForReady(page, theme);
    await assertLogoMatches(page, logo, theme);
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
  console.log(`[missing-preview] base url: ${BASE_URL}`);
  console.log(`[missing-preview] plan: 重截 ${MISSING.length} 張`);
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    locale: "zh-TW"
  });

  let success = 0;
  const failures = [];
  for (const fname of MISSING) {
    const r = await captureOne(context, fname);
    if (r.ok) {
      success += 1;
      console.log(`[missing-preview] OK ${r.fname}`);
    } else {
      failures.push(r);
      console.error(`[missing-preview] FAIL ${r.fname}: ${r.error}`);
    }
  }

  await context.close();
  await browser.close();

  console.log(
    `[missing-preview] done: ${success} success / ${failures.length} fail`
  );
  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
