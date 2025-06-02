import fs from "fs";
import path from "path";

export const bioboxDir = "./bioboxes";

/**
 * Write the file if no other file contains the same content
 */
export function writeFile(article) {
  if (!contentExists(article)) {
    writeArticleToFile(article, getFileName());
    console.log(`Wrote file ${getFileName()}`);
  }
}

/**
 * Return file names from bioboxDir
 */
export function readFileNames() {
  let fileNames = [];
  try {
    fileNames = fs.readdirSync(bioboxDir);
  } catch (err) {
    console.error(`Failed to read files in ${bioboxDir}: ${err.message}`);
  }
  return fileNames;
}

function writeArticleToFile(article, fileName) {
  if (!article) {
    throw Error("Article is empty");
  }
  fs.writeFileSync(`${bioboxDir}/${fileName}`, article, "utf-8");
}

function getFileName() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}.html`;
}

/**
 * @returns {boolean} - True if the content exists in any file, false otherwise
 */
function contentExists(article) {
  const bioboxes = fs.readdirSync(bioboxDir);

  for (const biobox of bioboxes) {
    const filePath = path.join(bioboxDir, biobox);

    if (fs.statSync(filePath).isFile()) {
      const existingContent = fs.readFileSync(filePath, "utf8");

      if (existingContent === article) {
        console.log(
          `Content already exists in file ${filePath}. Skipping write.`,
        );
        return true;
      }
    }
  }

  return false;
}


