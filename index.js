import express from 'express';
import fs from 'fs';

import { writeArticleToFile, getFileName } from './files.js';

import { fetchRelevantArticleAsHTML } from './biobox.js';
const app = express();

app.set('view engine', 'ejs')

const filesInBioboxes = fs.readdirSync('./bioboxes');
console.log(filesInBioboxes);
let nav = '';
filesInBioboxes.forEach(file => {
  nav += `<a href="/${file}">${file}</a> `;
})

const test = '<a href="test">test</a>';

app.get('/', async (req, res) => {
  const article = await fetchRelevantArticleAsHTML();
  writeArticleToFile(article, getFileName());

  res.render('./index', { article, nav })
});

app.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const article = fs.readFileSync('./bioboxes/' + filename, 'utf-8');
    res.render('./index', { article, nav })
  }
  catch (err) {
    res.status(404).send('File not found');
  }
})

app.use('favicon.png', express.static('./favicon.png'));

const server = app.listen(3000);
