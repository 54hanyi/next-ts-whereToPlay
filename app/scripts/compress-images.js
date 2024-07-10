// 負責壓縮和轉換圖片的腳本
// node scripts/compress-images.js  來執行
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// 獲取當前文件的路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const inputPath = `${__dirname}/../public/images/*.{jpg,png}`;
  const outputPath = `${__dirname}/../public/images`;

  // 列出所有文件
  const filesList = fs.readdirSync(`${__dirname}/../public/images`);
  console.log("Files in the directory:", filesList);

  const files = await imagemin([inputPath], {
    destination: outputPath,
    plugins: [
      imageminWebp({ quality: 75 }),
      imageminMozjpeg({ quality: 75 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
    ],
  });

  console.log("Images optimized:", files);
})();
