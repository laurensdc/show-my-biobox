import fs from 'fs';
import path from 'path';

export function writeArticleToFile(article, fileName) {
  fs.writeFileSync(`./bioboxes/${fileName}`, article, 'utf-8')
}

export function getFileName() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}.html`;
}

/**
 * 
 * @returns {boolean} - True if the content exists in any file, false otherwise
 */
function contentExists(article) {
  // Flag to track if the content already exists in any file
  let exists = false;

  const bioboxes = fs.readdirSync('./bioboxes');

  for (const fileName of bioboxes) {
    const filePath = path.join('./bioboxes', fileName);

    if (fs.statSync(filePath).isFile()) {
      // Check the content of the file
      const existingContent = fs.readFileSync(filePath, 'utf8');

      if (existingContent === article) {
        console.log(`Content already exists in file ${filePath}. Skipping write.`);

        exists = true;
        break;
      }
    }
  }

  return exists;
}

export function writeFileIfItDoesNotExist(article) {
  const exists = contentExists(article);

  if (!exists) {
    writeArticleToFile(article, getFileName());
    console.log(`Wrote file ${getFileName()}`);
  }
}

export const getNavElement = () => {
  const filesInBioboxes = fs.readdirSync('./bioboxes');

  let nav = '';
  filesInBioboxes.forEach(file => {
    nav += `<a href="/${file}">${file}</a> `;
  })

  return nav;
}
