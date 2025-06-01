import * as cheerio from "cheerio";

export function fetchRelevantArticleAsHTML(html) {
  const $ = getHtmlAsCheerioFunction(html);

  const extractedArticle = $("main section").filter(function () {
    return (
      $(this).find("h1").text().trim().toLowerCase().includes("groente") &&
      $(this).find("h1").text().trim().toLowerCase().includes("fruit")
    );
  });

  const declutteredArticle = declutterArticle(extractedArticle);

  const thisWeekHighlightedArticle = highlightThisWeek(declutteredArticle, $)

  addLinksToRecipes(thisWeekHighlightedArticle, $);

  return thisWeekHighlightedArticle.html();
}

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

function getHtmlAsCheerioFunction(html) {
  const $ = cheerio.load(html);
  return $;
}

function declutterArticle(ourBox) {
  // Remove clutter from article
  ourBox.find("a").remove();
  return ourBox;
}

function highlightThisWeek(ourBox, $) {
  const weekNumber = (getWeekNumber(new Date()))

  // it shows bioboxes from 3 different weeks
  // <strong>2 juni tot 8 juni (week 23)</strong>
  ourBox.find("p > strong").each(function (index, el) {
    const item = $(el)

    if (item.text().includes('week ' + weekNumber)) {
      item.prepend("Deze week: ")
    } else if (item.text().includes('week ' + (weekNumber - 1))) {
      item.prepend("Vorige week: ")
    } else if (item.text().includes('week ' + (weekNumber + 1))) {
      item.prepend("Volgende week: ")
    }
  })

  return ourBox;
}

/**
 * Mutate the box and wrap strong tags in a tags to link to the recipes
 * Fugly as f and works
 */
function addLinksToRecipes(ourBox, $) {
  ourBox.find("li strong").each(function (index, el) {
    const item = $(el);
    const itemContent = item.text().split(' ')[0];
    item.wrap(
      `<a href="https://www.dewassendemaan.be/nl/recepten?search=${itemContent}" target="_BLANK"></a>`,
    );
  });
}

