import fs from 'fs';
import * as cheerio from 'cheerio';

async function scrapeWebsite() {
  const req = await fetch('https://www.dewassendemaan.be/biobox/bioboxen');
  const html = await req.text();
  return html;
}

/**
 * For testing DOM selection, without network calls
 */
function readHtmlAsTempCodingThing() {
  const data = fs.readFileSync('./dom-snip-for-testing.html', 'utf-8');
  return data;
}

export async function fetchRelevantArticleAsHTML() {
  const html = await scrapeWebsite();
  const $ = cheerio.load(html);

  const rowsWithBioboxArticles = $('#main #content #content-area section.views__rows .views-row');

  const isTheBoxWereLookingFor = item => $(item).find('article').attr('about') === '/gemengde-biobox';
  let extractedArticle;

  rowsWithBioboxArticles.each(function (row) {
    if (isTheBoxWereLookingFor(this)) {
      const ourBox = $(this);

      // Remove clutter from article
      ourBox.find('h4').remove(); // box price
      ourBox.find('p').remove(); // same text always
      ourBox.find('header').remove(); // double title
      ourBox.find('img').remove(); // local src to image
      ourBox.find('.biobox.links').remove(); // webshop url
      ourBox.find('.biobox__biopakket-form-key a').remove(); // choose this box url

      extractedArticle = ourBox.html();
    }
  })

  return extractedArticle;
}

