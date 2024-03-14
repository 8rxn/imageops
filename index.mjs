#!/usr/bin/env node

import { select, Separator, checkbox } from "@inquirer/prompts";

import getFilesWithExtension from "./utils/get-files.js";

import convertImage from "./utils/convert.js";

try {
  const inputFileType = await select({
    message: "Select an input File Type",
    choices: [
      {
        name: "jpg",
        value: "jpg",
        description: "jpg is a good file type",
      },
      {
        name: "png",
        value: "png",
        description:
          " Portable Network Graphics (PNG) is a raster-graphics file-format that supports lossless data compression.",
      },
      {
        name: "webp",
        value: "webp",
        description:
          " WebP is a modern image format that provides superior lossless and lossy compression for images on the web.",
      },
      new Separator(),
      {
        name: "bmp",
        value: "bmp",
        disabled: true,
        description:
          " BMP is a standard image file format which was historically used by computers running the Windows operating system.",
      },
    ],
  });

  const outputFileType = await select({
    message: "\n\n\nSelect an output File Type",
    choices: [
      {
        name: "jpg",
        value: "jpg",
        description: "jpg is a good file type",
      },
      {
        name: "png",
        value: "png",
        description:
          " Portable Network Graphics (PNG) is a raster-graphics file-format that supports lossless data compression.",
      },
      {
        name: "webp",
        value: "webp",
        description:
          " WebP is a modern image format that provides superior lossless and lossy compression for images on the web.",
      },
      new Separator(),
      {
        name: "bmp",
        value: "bmp",
        disabled: true,
        description:
          "BMP is a standard image file format which was historically used by computers running the Windows operating system.",
      },
    ],
  });

  const files = getFilesWithExtension(inputFileType);

  if (!files) {
    process.exit(1);
  }

  const allFiles = await select({
    message: "Do you want to convert all files?",
    choices: [
      new Separator(),
      {
        name: "Yes! Convert All Files",
        value: true,
        description: `Converts all ${inputFileType} files to ${outputFileType} files.`,
      },
      {
        name: "No! Select Files to Convert",
        value: false,
        description:
          "Toggle the files you want to convert from the list of files.",
      },
      new Separator(),
    ],
  });

  var selectedFiles = files;

  if (!allFiles) {
    selectedFiles = await checkbox(
      {
        message: "Select the files you want to convert",
        choices: files.map((file) => ({ name: file, value: file })),
      },
      new Separator()
    );
  }

  // const paths = selectedFiles.map((file) => path.join(process.cwd(), file));

  await convertImage(selectedFiles, inputFileType, outputFileType);
  console.log("\nFinished converting and optimizing files! \n");
} catch (error) {
  console.error("\n",error,"\n");
}


