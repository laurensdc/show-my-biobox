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

async function getHtmlAsCheerioFunction() {
  // Fetch from actual live website
  const html = await scrapeWebsite();

  // Hard coded HTML snippet for debugging
  // const html = await readHtmlAsTempCodingThing();

  const $ = cheerio.load(html);
  return $;
}

function declutterArticle(ourBox) {
  // Remove clutter from article
  ourBox.find('h4').remove(); // box price
  ourBox.find('h3').remove(); // box title
  ourBox.find('p').remove(); // same text always
  // ourBox.find('header').remove(); // double title
  ourBox.find('img').remove(); // local src to image
  ourBox.find('.biobox.links').remove(); // webshop url
  ourBox.find('.biobox__biopakket-form-key a').remove(); // choose this box url
  const html = ourBox.html();
  return html;
}

export async function fetchRelevantArticleAsHTML() {
  const $ = await getHtmlAsCheerioFunction();
  const rowsWithBioboxArticles = $('#main #content #content-area section.views__rows .views-row');
  const isTheBoxWereLookingFor = item => $(item).find('article').attr('about') === '/gemengde-biobox';

  let extractedArticle;
  rowsWithBioboxArticles.each(function (row) {
    if (isTheBoxWereLookingFor(this)) {
      const ourBox = $(this);
      extractedArticle = declutterArticle(ourBox);
    }
  })

  return extractedArticle;
}
