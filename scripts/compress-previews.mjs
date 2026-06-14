#!/usr/bin/env node
// @ts-check
/**
 * 預覽圖批次壓縮腳本：PNG → WebP（一次性遷移 + 後續可重跑）
 *
 * 為什麼要做：
 * - src/assets/previews 原本是全解析度 PNG（528MB / 636 張），registry 用
 *   `import.meta.glob({ eager: true })` 會把命中的所有圖片打進 dist，造成
 *   build 吃記憶體 + 部署產物肥大（dist 高達 828MB）。轉 WebP + 桌面縮圖可大幅瘦身。
 *
 * 轉檔策略（使用者已拍板）：
 * - 桌面圖（width > 1080）：先 resize 到 1080 寬（dialog 面板 max-width 1080px，
 *   再大顯示也看不出差異），withoutEnlargement 避免把小圖放大失真
 * - 手機圖（原 390 寬）：不縮尺寸，只轉格式
 * - 一律輸出 WebP quality 82 / effort 5，輸出同檔名 .webp 到同目錄，成功後刪除原 .png
 *
 * 為什麼用 1080 當門檻：桌面截圖是 1440 viewport，> 1080 必為桌面圖；
 * 手機圖 390 寬 < 1080 不會被縮，邏輯天然分流不需另記裝置。
 *
 * 冪等性：掃的是 *.png，已轉成 .webp 並刪掉 png 的檔案不會再被處理，可安全重跑。
 *
 * 使用：node scripts/compress-previews.mjs
 */

import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const PREVIEW_DIR = resolve(REPO_ROOT, "src/assets/previews");

// 桌面預覽縮圖目標寬度（與 dialog 面板 max-width 對齊）
const DESKTOP_TARGET_WIDTH = 1080;
const WEBP_QUALITY = 82;
const WEBP_EFFORT = 5;

/** 將 bytes 格式化為可讀字串 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

async function main() {
  console.log(`[compress-previews] 掃描目錄：${PREVIEW_DIR}`);

  const entries = await readdir(PREVIEW_DIR);
  const pngFiles = entries.filter((f) => f.toLowerCase().endsWith(".png"));

  console.log(`[compress-previews] 找到 ${pngFiles.length} 張 PNG，開始轉檔...`);

  let processed = 0;
  let totalBefore = 0;
  let totalAfter = 0;
  const failures = [];

  for (const fname of pngFiles) {
    const pngPath = join(PREVIEW_DIR, fname);
    // 同檔名換副檔名為 .webp（含 color 段 / hyphen logoKey 等命名全沿用，不動主檔名）
    const webpPath = pngPath.replace(/\.png$/i, ".webp");

    try {
      const beforeSize = (await stat(pngPath)).size;

      const image = sharp(pngPath);
      const metadata = await image.metadata();

      // 桌面圖（寬度 > 1080）先縮到 1080；手機圖維持原寸
      if ((metadata.width ?? 0) > DESKTOP_TARGET_WIDTH) {
        image.resize({
          width: DESKTOP_TARGET_WIDTH,
          withoutEnlargement: true
        });
      }

      await image
        .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
        .toFile(webpPath);

      const afterSize = (await stat(webpPath)).size;

      // 轉檔成功才刪原 PNG，避免轉檔失敗連原圖一起丟
      await unlink(pngPath);

      processed += 1;
      totalBefore += beforeSize;
      totalAfter += afterSize;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failures.push({ fname, error: msg });
      console.error(`[compress-previews] 失敗 ${fname}: ${msg}`);
    }
  }

  const ratio =
    totalBefore > 0
      ? `${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`
      : "0%";

  console.log("\n========== 轉檔結果 ==========");
  console.log(`處理張數：${processed} / ${pngFiles.length}`);
  console.log(`轉檔前總大小：${formatBytes(totalBefore)}`);
  console.log(`轉檔後總大小：${formatBytes(totalAfter)}`);
  console.log(`平均壓縮比：節省 ${ratio}`);
  console.log(`失敗張數：${failures.length}`);
  if (failures.length > 0) {
    console.log("失敗清單：");
    for (const f of failures) {
      console.log(`  - ${f.fname}: ${f.error}`);
    }
    process.exit(1);
  }
  console.log("==============================");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
