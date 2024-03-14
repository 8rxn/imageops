const fs = require("fs");
const path = require("path");

// Function to get files with a specific extension
function getFilesWithExtension(extension) {
  const currentDir = process.cwd(); // Get the current working directory
  const files = fs.readdirSync(currentDir); // Read the contents of the directory

  // Filter the files to get only those with the specified extension
  const filteredFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === `.${extension.toLowerCase()}`
  );

  if (filteredFiles.length == 0) {
    console.error(`\nNo ${extension} files found in the current directory.\n`);
    return null
  }

  return filteredFiles;
}

// // Example usage
// const jpgFiles = getFilesWithExtension("jpg");
// console.log("JPG files in the current directory:", jpgFiles);

// const pngFiles = getFilesWithExtension("png");
// console.log("PNG files in the current directory:", pngFiles);

module.exports = getFilesWithExtension;
