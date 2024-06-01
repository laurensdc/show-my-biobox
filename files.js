import fs from 'fs';
import path from 'path';

export const bioboxDir = './bioboxes';

export function writeArticleToFile(article, fileName) {
  fs.writeFileSync(`${bioboxDir}/${fileName}`, article, 'utf-8')
}

export function getFileName() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
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
      const existingContent = fs.readFileSync(filePath, 'utf8');

      if (existingContent === article) {
        console.log(`Content already exists in file ${filePath}. Skipping write.`);
        return true;
      }
    }
  }

  return false;
}

/**
 * Write the file if no other file contains the same content
 */
export function writeFile(article) {
  if (!contentExists(article)) {
    writeArticleToFile(article, getFileName());
    console.log(`Wrote file ${getFileName()}`);
  }
}

export const getNavElement = () => {
  const filesInBioboxesDir = fs.readdirSync(bioboxDir);

  // Only use files of last 21 days, files are in the format of YYYY-MM-dd.html
  const filesOfLast7Days = filesInBioboxesDir.filter(file => {
    const date = new Date(file.replace(/\.html$/, ''));
    console.dir(date, { depth: null, colors: true });
    const now = new Date();
    const diff = Math.abs(now - date);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays <= 21;
  });

  // Sort chronologically
  filesOfLast7Days.sort((a, b) => {
    const dateA = new Date(a.replace(/\.html$/, ''));
    const dateB = new Date(b.replace(/\.html$/, ''));
    return dateB - dateA;
  });

  console.dir({ filesOfLast7Days }, { depth: null, colors: true });

  let nav = '<ul>';
  filesOfLast7Days.forEach(file => {
    const removeDotHtml = file.replace(/\.html$/, '');
    nav += `<li><a href="/${file}">${removeDotHtml}</a></li> `
  })

  nav += '</ul>';

  return nav;
}
