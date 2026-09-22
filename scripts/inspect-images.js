const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "assets", "images");
const files = [
  "WarLogoRed.png",
  "DeathlogoBlue.png",
  "famineLogoYellow.png",
  "pestilenceLogo.png",
  "BoxCover_Transparent.png",
  "mist.jpeg",
];

(async () => {
  for (const file of files) {
    const full = path.join(dir, file);
    if (!fs.existsSync(full)) {
      console.log(`${file}: MISSING`);
      continue;
    }
    const meta = await sharp(full).metadata();
    const size = fs.statSync(full).size;
    console.log(
      `${file} | ${meta.width}x${meta.height} | ${(size / 1024 / 1024).toFixed(2)} MB | ${meta.format}`,
    );
  }
})();
