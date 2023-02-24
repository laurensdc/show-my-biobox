
import open from 'open';
import express from 'express';

import { fetchRelevantArticleAsHTML } from './biobox.js';
const app = express();

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const article = await fetchRelevantArticleAsHTML();
  res.render('./index', { article })
});

app.use('favicon.png', express.static('./favicon.png'));

const server = app.listen(3000);
server.on('connection', () => {
  console.log('Connection received, shutting it down');
  server.close();
});

await open('http://localhost:3000');
