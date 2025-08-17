import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { execFile } from 'child_process';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const SUPPORTED_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);
const BYTES_PER_KB = 1024;

// Target limits
const TARGET_MAX_BYTES = 900 * BYTES_PER_KB; // ~900KB hard cap per image
const QUALITY_STEPS = [75, 72, 70, 68, 65, 62, 60];
const WIDTH_STEPS = [1600, 1400, 1280, 1200, 1024, 900, 800, 700, 600];

function runSips(args) {
  return new Promise((resolve, reject) => {
    execFile('sips', args, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr?.toString() || error?.message || 'sips failed'));
      } else {
        resolve(stdout?.toString() || '');
      }
    });
  });
}

async function sipsToJpeg(inputPath, outputPath, maxWidth) {
  const args = ['-s', 'format', 'jpeg'];
  if (maxWidth) {
    args.push('-Z', String(maxWidth));
  }
  args.push(inputPath, '--out', outputPath);
  await runSips(args);
  return outputPath;
}

async function ensureSharpReadable(filePath) {
  try {
    await sharp(filePath, { failOn: 'none' }).metadata();
    return filePath;
  } catch {
    const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'imgfix-'));
    const tmpJpeg = path.join(tmpDir, path.basename(filePath) + '.jpg');
    await sipsToJpeg(filePath, tmpJpeg);
    return tmpJpeg;
  }
}

async function encodeToWebpBuffer(inputPath, width, quality) {
  // rotate() applies EXIF orientation and resets orientation tag to avoid rotated outputs
  return sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .withMetadata()
    .toBuffer();
}

async function tryEncodeGrid(inputPath) {
  let best = null;
  for (const width of WIDTH_STEPS) {
    for (const quality of QUALITY_STEPS) {
      try {
        const buf = await encodeToWebpBuffer(inputPath, width, quality);
        if (!best || buf.length < best.size) {
          best = { buf, width, quality, size: buf.length };
        }
        if (buf.length <= TARGET_MAX_BYTES) {
          return { buf, width, quality, size: buf.length };
        }
      } catch {
        // continue
      }
    }
  }
  return best; // may be > target but smallest we could get
}

async function shouldSkip(filePath) {
  const base = path.basename(filePath);
  if (base.startsWith('.')) return true;
  if (base === '.DS_Store') return true;
  if (base === 'favicon.png') return true;

  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.webp') return false; // only skip checks for webp; others should be converted to webp

  try {
    const stat = await fs.promises.stat(filePath);
    const sizeOK = stat.size <= TARGET_MAX_BYTES;
    const meta = await sharp(filePath, { failOn: 'none' }).metadata();
    const width = meta.width || 0;
    const widthOK = width <= WIDTH_STEPS[0]; // <= 1600

    // If already a reasonably sized webp with acceptable width, skip re-encoding
    return sizeOK && widthOK;
  } catch {
    return false;
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXT.has(ext)) return;
  if (await shouldSkip(filePath)) {
    // Already optimized; do not re-encode
    return;
  }

  try {
    // Step 1: try direct via sharp (or sips fallback to readable)
    let sourcePath = await ensureSharpReadable(filePath);
    let result = await tryEncodeGrid(sourcePath);

    // Step 2: if we couldn't produce anything or size still excessive or encode failed, force sips resize then encode
    if (!result || result.size > TARGET_MAX_BYTES) {
      for (const sipsWidth of WIDTH_STEPS) {
        try {
          const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'imgfix-'));
          const tmpJpeg = path.join(tmpDir, path.basename(filePath) + `.w${sipsWidth}.jpg`);
          await sipsToJpeg(filePath, tmpJpeg, sipsWidth);
          const altResult = await tryEncodeGrid(tmpJpeg);
          if (altResult) {
            result = altResult;
            if (result.size <= TARGET_MAX_BYTES) break;
          }
        } catch {
          // try next width
        }
      }
    }

    if (!result) {
      throw new Error('Failed to optimize after fallbacks');
    }

    await fs.promises.writeFile(filePath, result.buf);
    const rel = path.relative(ASSETS_DIR, filePath);
    console.log(`Optimized: ${rel} -> ${Math.round(result.size / BYTES_PER_KB)}KB (w=${result.width}, q=${result.quality})`);
  } catch (err) {
    console.warn(`Skip (error): ${filePath} -> ${err?.message || err}`);
  }
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

(async function run() {
  console.log(`Optimizing images in ${ASSETS_DIR}...`);
  for await (const file of walk(ASSETS_DIR)) {
    await optimizeImage(file);
  }
  console.log('Done optimizing images.');
})(); 