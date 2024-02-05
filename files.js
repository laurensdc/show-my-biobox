import fs from 'fs';

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
