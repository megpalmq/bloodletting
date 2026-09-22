// One-shot image optimizer for oversized site art.
// - Reports original dimensions / size
// - Backs up originals to .image-originals/ (gitignored)
// - Writes resized, compressed replacements using the SAME filenames,
//   so existing HTML references keep working.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imgDir = path.join(__dirname, "..", "assets", "images");
const backupDir = path.join(__dirname, "..", ".image-originals");

// maxWidth chosen ~2x the largest on-screen render (cards ~260px).
const targets = [
  { file: "WarLogoRed.png", maxWidth: 640 },
  { file: "DeathlogoBlue.png", maxWidth: 640 },
  { file: "famineLogoYellow.png", maxWidth: 640 },
  { file: "pestilenceLogo.png", maxWidth: 640 },
];

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

(async () => {
  fs.mkdirSync(backupDir, { recursive: true });
  const report = [];

  for (const { file, maxWidth } of targets) {
    const full = path.join(imgDir, file);
    if (!fs.existsSync(full)) {
      report.push(`${file}: MISSING`);
      continue;
    }

    const beforeSize = fs.statSync(full).size;
    const meta = await sharp(full, { limitInputPixels: false }).metadata();

    // Back up the original only once.
    const backup = path.join(backupDir, file);
    if (!fs.existsSync(backup)) {
      fs.copyFileSync(full, backup);
    }

    const buffer = await sharp(full, { limitInputPixels: false })
      .resize({
        width: Math.min(maxWidth, meta.width),
        withoutEnlargement: true,
      })
      .png({ compressionLevel: 9, quality: 80, palette: true })
      .toBuffer();

    fs.writeFileSync(full, buffer);
    const afterSize = fs.statSync(full).size;

    report.push(
      `${file}: ${meta.width}x${meta.height} ${mb(beforeSize)} -> ` +
        `${Math.min(maxWidth, meta.width)}px ${mb(afterSize)}`,
    );
  }

  fs.writeFileSync(path.join(__dirname, "_report.txt"), report.join("\n"));
  console.log(report.join("\n"));
})();
