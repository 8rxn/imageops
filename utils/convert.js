const sharp = require("sharp");
// const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

async function convertImage(files, inputFileType, outputFileType) {
  console.log("convertImage");
  console.log(files);
  if (files === null) {
    console.error("No files found to convert");
    return;
  }
  const allFiles = files.map(async (file) => {
    const inputFilePath = file;

    fs.mkdirSync(path.join(process.cwd(), "converted/"), { recursive: true });
    const outputFilePath = path.join(
      process.cwd(),
      "converted/",
      file.replace(new RegExp(`.${inputFileType}$`, "i"), `.${outputFileType}`)
    );
    return await sharp(inputFilePath)
      .toFormat(outputFileType)
      .toFile(outputFilePath);
  });

  await Promise.all(allFiles);
}

module.exports = convertImage;
