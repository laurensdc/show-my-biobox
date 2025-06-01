import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';
import path from 'path';


import { bioboxDir, writeFile } from './files.js';
import { getNavElement } from "./nav.js";
import { fetchRelevantArticleAsHTML } from './biobox.js';

const app = express();

export async function scrapeWebsite() {
  const req = await fetch(
    "https://www.dewassendemaan.be/nl/inhoud/pakketinhoud",
  );
  const html = await req.text();
  return html;
}

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const html = await scrapeWebsite();
  const article = await fetchRelevantArticleAsHTML(html);
  const nav = getNavElement();

  writeFile(article);

  res.render('./index', { article, nav })
});

app.get('/favicon.png', (req, res) => {
  const __dirname = fileURLToPath(new URL('../', import.meta.url));
  res.sendFile(path.join(__dirname, 'favicon.png'));
});

app.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const filePath = path.join(bioboxDir, filename);
    const article = fs.readFileSync(filePath, 'utf-8');
    const nav = getNavElement();

    res.render('./index', { article, nav })
  }
  catch (err) {
    res.status(404).send('File not found: ' + err);
  }
})

app.listen(3000, () => {
  console.log('Started show-my-biobox on port 3000')
});
