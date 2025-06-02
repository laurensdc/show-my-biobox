import { it, describe } from "node:test";
import { equal, ok } from "node:assert"
import fs from "node:fs"
import { fetchRelevantArticleAsHTML } from "./biobox.js";

/**
 * For testing DOM selection, without network calls
 */
function readHtmlAsTempCodingThing() {
  const data = fs.readFileSync("./src/dom-snip-for-testing.html", "utf-8");
  return data;
}

describe("fetchRelevantArticleAsHTML", () => {

  it("characterization test", () => {
    const html = readHtmlAsTempCodingThing();
    const got = fetchRelevantArticleAsHTML(html)

    const expected = `
      <h1 class="text-heading-primary md:text-3xl text-2xl font-extrabold md:mb-4
 mb-2">Groente- &amp; fruitpakket</h1>
      <div class="xl:gap-20 lg:gap-10 md:columns-3 gap-5 prose !max-w-full">
        <p class="text-base text-primary-black"><strong>Week van 21 okt tot 28 okt (week 43)</strong>
        </p>
        <ul>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=knolselder" target="_BLANK"><strong>knolselder met loof </strong></a>('t goed ter heule, Menen-Lauwe) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=spinazie" target="_BLANK"><strong>spinazie </strong></a>(van eigen oogst) (500 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=prei" target="_BLANK"><strong>prei </strong></a>(Bla
            uw Kasteel, Scheldewindeke) (700 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=postelein" target="_BLANK"><strong>postelein</strong></a> (van eigen oogst) (1 bussel)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=wortel" target="_BLANK"><strong>wortel </strong></a>(Blauw Kasteel) (700 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=mandarijn" target="_BLANK"><strong>mandarijn 'S
              atsuma'</strong></a> (Juan Luis Ruiz, Coöp. Tierra y Libertad, ES) (500 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=mango" target="_BLANK"><strong>mango 'Osteen'</strong></a> (ES) (1 stuk)&nbsp;</li>
        </ul>
        <p class="block-img"></p>
        <p class="text-base text-primary-black"><strong>Week van 14 okt tot 21 okt (week 42)</strong></p>
        <ul>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=kervel" target="_BLANK"><strong>kervel </strong></a>(van eigen oogst) (1 bussel)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=groene" target="_BLANK"><strong>groene pompoen of pompoen 'Blue Ballet' </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=
" target="_BLANK"><strong>
              spinazie </strong></a>(van eigen oogst) (400 gram)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=courgette" target="_BLANK"><strong>courgette </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=rode" target="_BLANK"><strong>rode biet </strong></a>(van eigen oogst) (500 gram)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=avocado" target="_BLANK"><strong>avocado &lt; /strong&gt;(ES) (1 stuk)</strong></a></li><strong>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=gele" target="_BLANK"><strong>gele kiwi </strong></a>(IT) (400 gram)</li>
        </strong></ul><strong>
        <p class="block-img"></p>
        <p class="text-base text-primary-black"><strong>Week van 7 okt tot 14 okt (week 41)</strong></p>
        <ul>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=courgette" target="_BLANK"><strong>courgette </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=groenlof" target="_BLANK"><strong>groenlof </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=postelein" target="_BLANK"><strong>postelein </strong></a>(van eigen oogst) (1 bussel)</li>
          <l i=""><strong>kaki </strong>(ES) (350 gram)
            <li><a href="https://www.dewassendemaan.be/nl/recepten?search=rucola" target="_BLANK"><strong>rucola </strong></a>(van eigen oogst) (1 bussel)</li>
            <li><a href="https://www.dewassendemaan.be/nl/recepten?search=paksoi" target="_BLANK"><strong>paksoi </strong></a>(De Zonnekouter) (1 stuk)</li>
            <li><a href="https://www.dewassendemaan.be/nl/recepten?search=pompelmoes" target="_BLANK"><strong>pompelmoes</strong></a> &amp;#x
              27;<a href="https://www.dewassendemaan.be/nl/recepten?search=Star" target="_BLANK"><strong>Star Ruby'</strong></a> (ES) (650 gram)</li>
        </l></ul>
        <p class="block-img"></p>
      </strong></div><strong>
    </strong>`

    equal(got, expected)
  })

  it("extracts the snippet where <h1> contains 'groente & fruit'", () => {
    const html = readHtmlAsTempCodingThing();
    const got = fetchRelevantArticleAsHTML(html)
    ok(!got.includes("Groot groentepakket"))
    ok(!got.includes("Fruitpakket"))
    ok(!got.includes("Klein groentepakket"))
    ok(!got.includes("Mini groentepakket"))
    ok(!got.includes("Aardappelpakket"))
    ok(!got.includes("Speciaal broodabonnement"))
    ok(got.includes("Groente- &amp; fruitpakket"))
  })

  it("declutters links from the article", () => {
    const html = readHtmlAsTempCodingThing();
    const got = fetchRelevantArticleAsHTML(html);
    ok(!got.includes(`< a href = "/recepten"`))
    ok(!got.includes(`< a href = "/contact"`))
  })

  it("adds links to the recipes with the first word of the thing", () => {
    const html = readHtmlAsTempCodingThing();
    const got = fetchRelevantArticleAsHTML(html);
    ok(got.includes(`<a href="https://www.dewassendemaan.be/nl/recepten?search=courgette" target="_BLANK">`))
    ok(got.includes(`<a href="https://www.dewassendemaan.be/nl/recepten?search=avocado" target="_BLANK">`))
  })

  it("highlights the current, previous and next week", () => {
    const html = readHtmlAsTempCodingThing();
    const got = fetchRelevantArticleAsHTML(html, new Date(2024, 9, 16));
    ok(got.includes(`Vorige week: Week van 7 okt tot 14 okt (week 41)`), got)
    ok(got.includes(`Deze week: Week van 14 okt tot 21 okt (week 42)`), got)
    ok(got.includes(`Volgende week: Week van 21 okt tot 28 okt (week 43)`), got)
  })
})