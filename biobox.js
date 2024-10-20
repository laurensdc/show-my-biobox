import fs from "fs";
import * as cheerio from "cheerio";

async function scrapeWebsite() {
  const req = await fetch(
    "https://www.dewassendemaan.be/nl/inhoud/pakketinhoud",
  );
  const html = await req.text();
  return html;
}

/**
 * For testing DOM selection, without network calls
 */
function readHtmlAsTempCodingThing() {
  const data = fs.readFileSync("./dom-snip-for-testing.html", "utf-8");
  return data;
}

async function getHtmlAsCheerioFunction() {
  // Fetch from actual live website
  const html = await scrapeWebsite();

  // Hard coded HTML snippet for debugging
  // const html = readHtmlAsTempCodingThing();

  const $ = cheerio.load(html);
  return $;
}

function declutterArticle(ourBox) {
  // Remove clutter from article
  ourBox.find("a").remove();
  return ourBox;
}

/**
 * Mutate the box and wrap strong tags in a tags to link to the recipes
 * Fugly as f and works
 */
async function addLinksToRecipes(ourBox, $) {
  ourBox.find("li strong").each(function (index, el) {
    const item = $(el);
    const itemContent = item.text();
    item.wrap(
      `<a href="https://www.dewassendemaan.be/nl/recepten?search=${itemContent}" target="_BLANK"></a>`,
    );
  });
}

export async function fetchRelevantArticleAsHTML() {
  const $ = await getHtmlAsCheerioFunction();

  const extractedArticle = $("main section").filter(function () {
    return (
      $(this).find("h1").text().trim().toLowerCase().includes("groente") &&
      $(this).find("h1").text().trim().toLowerCase().includes("fruit")
    );
  });

  const declutteredArticle = declutterArticle(extractedArticle);

  addLinksToRecipes(declutteredArticle, $);

  return declutteredArticle.html();
}
