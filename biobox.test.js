import { it, describe } from "node:test";
import { equal } from "node:assert"
import fs from "node:fs"
import { fetchRelevantArticleAsHTML } from "./biobox.js";

/**
 * For testing DOM selection, without network calls
 */
function readHtmlAsTempCodingThing() {
  const data = fs.readFileSync("./dom-snip-for-testing.html", "utf-8");
  return data;
}

describe("fetchRelevantArticleAsHTML", () => {

  it("characterization test", async () => {
    const html = readHtmlAsTempCodingThing();
    const got = await fetchRelevantArticleAsHTML(html)

    const expected = `
      <h1 class="text-heading-primary md:text-3xl text-2xl font-extrabold md:mb-4
 mb-2">Groente- &amp; fruitpakket</h1>
      <div class="xl:gap-20 lg:gap-10 md:columns-3 gap-5 prose !max-w-full">
        <p class="text-base text-primary-black"><strong>Week van 21 okt tot 28 okt (week 43)</strong>
        </p>
        <ul>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=knolselder met loof " target="_BLANK"><strong>knolselder met loof </strong></a>('t goed ter heule, Menen-Lauwe) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=spinazie " target="_BLANK"><strong>spinazie </strong></a>(van eigen oogst) (500 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=prei " target="_BLANK"><strong>prei </strong></a>(Bla
            uw Kasteel, Scheldewindeke) (700 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=postelein" target="_BLANK"><strong>postelein</strong></a> (van eigen oogst) (1 bussel)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=wortel " target="_BLANK"><strong>wortel </strong></a>(Blauw Kasteel) (700 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=mandarijn 'S
              atsuma'" target="_BLANK"><strong>mandarijn 'S
              atsuma'</strong></a> (Juan Luis Ruiz, Coöp. Tierra y Libertad, ES) (500 gram)&nbsp;</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=mango 'Osteen'" target="_BLANK"><strong>mango 'Osteen'</strong></a> (ES) (1 stuk)&nbsp;</li>
        </ul>
        <p class="block-img"></p>
        <p class="text-base text-primary-black"><strong>Week van 14 okt tot 21 okt (we
            ek 42)</strong></p>
        <ul>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=kervel " target="_BLANK"><strong>kervel </strong></a>(van eigen oogst) (1 bussel)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=groene pompoen of pompoen 'Blue Ballet' " target="_BLANK"><strong>groene pompoen of pompoen 'Blue Ballet' </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=
              spinazie " target="_BLANK"><strong>
              spinazie </strong></a>(van eigen oogst) (400 gram)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=courgette " target="_BLANK"><strong>courgette </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=rode biet " target="_BLANK"><strong>rode biet </strong></a>(van eigen oogst) (500 gram)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=avocado < /strong>(ES) (1 stuk)" target="_BLANK"><strong>avocado &lt; /strong&gt;(ES) (1 stuk)</strong></a></li><strong>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=gele kiwi " target="_BLANK"><strong>gele kiwi </strong></a>(IT) (400 gram)</li>
        </strong></ul><strong>
        <p class="block-img"></p>
        <p class="text-base text-primary-black"><strong>Week van 7 okt tot 14 okt (week 41)</strong></p>
        <ul>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=courgette " target="_BLANK"><strong>courgette </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=groenlof " target="_BLANK"><strong>groenlof </strong></a>(van eigen oogst) (1 stuk)</li>
          <li><a href="https://www.dewassendemaan.be/nl/recepten?search=postelein " target="_BLANK"><strong>postelein </strong></a>(van eigen oogst) (1 bussel)</li>
          <l i=""><strong>kaki </strong>(ES) (350 gram)
            <li><a href="https://www.dewassendemaan.be/nl/recepten?search=rucola " target="_BLANK"><strong>rucola </strong></a>(van eigen oogst) (1 bussel)</li>
            <li><a href="https://www.dewassendemaan.be/nl/recepten?search=paksoi " target="_BLANK"><strong>paksoi </strong></a>(De Zonnekouter) (1 stuk)</li>
            <li><a href="https://www.dewassendemaan.be/nl/recepten?search=pompelmoes" target="_BLANK"><strong>pompelmoes</strong></a> &amp;#x
              27;<a href="https://www.dewassendemaan.be/nl/recepten?search=Star Ruby'" target="_BLANK"><strong>Star Ruby'</strong></a> (ES) (650 gram)</li>
        </l></ul>
        <p class="block-img"></p>
      </strong></div><strong>
    </strong>`

    equal(got, expected)
  })

  it("extracts the snippet where <h1> contains 'groente & fruit'", () => {

  })

  it.todo("declutters links from the article")

  it.todo("adds links to the recipes")

  it.todo("highlights the current week")
})