import express from 'express';
import fs from 'fs';
import open from 'open';

import { getNavElement, writeFileIfItDoesNotExist } from './files.js';
import { fetchRelevantArticleAsHTML } from './biobox.js';

const app = express();

app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
  const article = await fetchRelevantArticleAsHTML();
  const nav = getNavElement();

  writeFileIfItDoesNotExist(article);

  res.render('./index', { article, nav })
});

app.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const article = fs.readFileSync('./bioboxes/' + filename, 'utf-8');
    const nav = getNavElement();

    res.render('./index', { article, nav })
  }
  catch (err) {
    res.status(404).send('File not found: ' + err);
  }
})

app.use('favicon.png', express.static('./favicon.png'));

app.listen(3000, () => {
  open('http://localhost:3000')
});
