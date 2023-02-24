import { fetchRelevantArticleAsHTML } from './biobox.js';

import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const article = await fetchRelevantArticleAsHTML();
  res.render('./index', { article })
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
});
