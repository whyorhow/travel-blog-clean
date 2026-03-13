const path = require("path");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");

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
  return toPosixPath(relNoExt);
}

async function uploadOne({ inputDir, filePath, tag, overwrite }) {
  const publicId = publicIdFromFile(inputDir, filePath);

  try {
    await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      public_id: publicId,
      overwrite,
      tags: tag ? [tag] : undefined,
    });

    return { ok: true, publicId };
  } catch (err) {
    const msg = err?.message || String(err);

    // If overwrite is false and the asset exists already, Cloudinary returns an error.
    // We treat that as a non-fatal "skipped" so you can resume re-runs.
    if (!overwrite && /already exists/i.test(msg)) {
      return { ok: true, publicId, skipped: true };
    }

    return { ok: false, publicId, error: msg };
  }
}

async function main() {
  const inputDir = getArgValue("--input") || DEFAULT_INPUT_DIR;
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

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const allFiles = walkFiles(inputDir).filter(isImageFile);
  allFiles.sort((a, b) => a.localeCompare(b));

  console.log(`Uploading ${allFiles.length} images from: ${inputDir}`);
  console.log(`Tag: ${tag}`);
  console.log(`Overwrite: ${overwrite}`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  const failures = [];

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];

    const result = await uploadOne({ inputDir, filePath, tag, overwrite });

    if (result.ok) {
      ok++;
      if (result.skipped) skipped++;
    } else {
      failed++;
      failures.push({ filePath, publicId: result.publicId, error: result.error });
    }

    if ((i + 1) % 25 === 0 || i === allFiles.length - 1) {
      console.log(`Progress: ${i + 1}/${allFiles.length} | ok=${ok} (skipped=${skipped}) | failed=${failed}`);
    }
  }

  if (failures.length) {
    const outPath = path.join(process.cwd(), "cloudinary-upload-failures.json");
    fs.writeFileSync(outPath, JSON.stringify(failures, null, 2), "utf8");
    console.log(`Wrote failures to: ${outPath}`);
  }

  console.log(`Done. ok=${ok} (skipped=${skipped}) failed=${failed}`);

  if (failed > 0) process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
