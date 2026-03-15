const path = require("path");
const { v2: cloudinary } = require("cloudinary");

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] || null;
}

function getPositionalArg(positionFrom2) {
  const idx = 2 + positionFrom2;
  return process.argv[idx] || null;
}

async function main() {
  const filePath = getArgValue("--file") || getPositionalArg(0);
  const publicId = getArgValue("--publicId") || getPositionalArg(1);
  const tag = getArgValue("--tag") || "nomads_oneoff";
  const overwrite = process.argv.includes("--overwrite");

  if (!filePath || !publicId) {
    console.error("Usage: node scripts/upload-one-cloudinary.js --file <path> --publicId <publicId> [--overwrite] [--tag <tag>]");
    process.exit(1);
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error(
      "Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET before running."
    );
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const normalizedPublicId = publicId.split(path.sep).join("/");

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    public_id: normalizedPublicId,
    overwrite,
    tags: tag ? [tag] : undefined,
  });

  console.log(JSON.stringify({
    ok: true,
    publicId: normalizedPublicId,
    secure_url: result.secure_url,
    bytes: result.bytes,
    format: result.format,
    width: result.width,
    height: result.height,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
