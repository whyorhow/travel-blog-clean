const path = require("path");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");
const sharp = require("sharp");

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB — safely under Cloudinary's 10MB free-tier limit

async function compressIfNeeded(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size <= MAX_FILE_BYTES) return null; // no compression needed

  const buffer = await sharp(filePath)
    .resize({ width: 3000, height: 3000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  return buffer;
}

function serializeError(err) {
  if (!err) return "unknown error";
  if (typeof err === "string") return err;
  if (err.message) return err.message;
  if (err.error && err.error.message) return err.error.message;
  return JSON.stringify(err);
}

function uploadBuffer(buffer, opts) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(opts, (err, result) => {
      if (err) reject(new Error(serializeError(err)));
      else resolve(result);
    });
    stream.end(buffer);
  });
}

const DEFAULT_INPUT_DIR = "C:\\Users\\benji\\cloudinary-staging\\images";

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] || null;
}

function toPosixPath(p) {
  return p.split(path.sep).join("/");
}

function walkFiles(dir) {
  const out = [];
  const stack = [dir];

  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile()) out.push(full);
    }
  }

  return out;
}

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ext === ".webp" || ext === ".jpg" || ext === ".jpeg" || ext === ".png";
}

function publicIdFromFile(inputDir, filePath) {
  const rel = path.relative(inputDir, filePath);
  const relNoExt = rel.slice(0, rel.length - path.extname(rel).length);
  return toPosixPath(relNoExt)
    .split("/")
    .map((seg) => seg.replace(/&/g, "-"))
    .join("/");
}

async function uploadOne({ inputDir, filePath, tag, overwrite }) {
  const publicId = publicIdFromFile(inputDir, filePath);
  const opts = {
    resource_type: "image",
    public_id: publicId,
    overwrite,
    tags: tag ? [tag] : undefined,
  };

  try {
    const compressed = await compressIfNeeded(filePath);
    if (compressed) {
      await uploadBuffer(compressed, opts);
    } else {
      await cloudinary.uploader.upload(filePath, opts);
    }

    return { ok: true, publicId, compressed: !!compressed };
  } catch (err) {
    const msg = serializeError(err);

    // If overwrite is false and the asset exists already, Cloudinary returns an error.
    // We treat that as a non-fatal "skipped" so you can resume re-runs.
    if (!overwrite && /already exists/i.test(msg)) {
      return { ok: true, publicId, skipped: true };
    }

    // Rate limited — wait 60s and retry once
    if (/420|429|rate.?limit|too many/i.test(msg)) {
      console.warn(`  Rate limited on ${publicId}, waiting 60s...`);
      await new Promise(r => setTimeout(r, 60000));
      try {
        const compressed2 = await compressIfNeeded(filePath);
        if (compressed2) await uploadBuffer(compressed2, opts);
        else await cloudinary.uploader.upload(filePath, opts);
        return { ok: true, publicId, compressed: false };
      } catch (err2) {
        return { ok: false, publicId, error: serializeError(err2) };
      }
    }

    return { ok: false, publicId, error: msg };
  }
}

async function main() {
  const positional = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const inputDir = getArgValue("--input") || positional[0] || DEFAULT_INPUT_DIR;
  const subdir = getArgValue("--subdir") || positional[1] || null;
  const tag = getArgValue("--tag") || "nomads_staging";
  const overwrite = process.argv.includes("--overwrite");

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error(
      "Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET before running."
    );
    process.exit(1);
  }

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  // Parse CLOUDINARY_URL if provided, otherwise use individual env vars
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_URL.split('@')[1],
      api_key: process.env.CLOUDINARY_URL.split('://')[1].split(':')[0],
      api_secret: process.env.CLOUDINARY_URL.split('://')[1].split(':')[1].split('@')[0],
      secure: true,
    });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  const scanRoot = subdir ? path.join(inputDir, subdir) : inputDir;
  if (subdir && !fs.existsSync(scanRoot)) {
    console.error(`Subdir does not exist: ${scanRoot}`);
    process.exit(1);
  }

  const allFiles = walkFiles(scanRoot).filter(isImageFile);
  allFiles.sort((a, b) => a.localeCompare(b));

  console.log(`Uploading ${allFiles.length} images from: ${scanRoot}`);
  if (subdir) console.log(`Public ID prefix: ${toPosixPath(subdir)}/…`);
  console.log(`Tag: ${tag}`);
  console.log(`Overwrite: ${overwrite}`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;
  let compressed = 0;

  const failures = [];

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];

    const result = await uploadOne({ inputDir, filePath, tag, overwrite });

    if (result.ok) {
      ok++;
      if (result.skipped) skipped++;
      if (result.compressed) compressed++;
    } else {
      failed++;
      failures.push({ filePath, publicId: result.publicId, error: result.error });
    }

    if ((i + 1) % 25 === 0 || i === allFiles.length - 1) {
      console.log(`Progress: ${i + 1}/${allFiles.length} | ok=${ok} (skipped=${skipped}, compressed=${compressed}) | failed=${failed}`);
    }
  }

  if (failures.length) {
    const outPath = path.join(process.cwd(), "cloudinary-upload-failures.json");
    fs.writeFileSync(outPath, JSON.stringify(failures, null, 2), "utf8");
    console.log(`Wrote failures to: ${outPath}`);
  }

  console.log(`Done. ok=${ok} (skipped=${skipped}, compressed=${compressed}) failed=${failed}`);

  if (failed > 0) process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
