import { it, describe } from "node:test";
import fs from "node:fs"
import { equal } from "node:assert";
import { getNavElement } from "./nav.js";
import { bioboxDir } from "./files.js";

describe("getNavElement", () => {
  it("characterization test", () => {
    const filesInBioboxesDir = fs.readdirSync(bioboxDir);
    const got = getNavElement(filesInBioboxesDir)
    const expected = `<ul><li><a href="/2025-05-30.html">2025-05-30</a></li> </ul>`

    equal(got, expected)
  });

  it("takes in files as an argument (dependency injection)", () => {
    const got = getNavElement(['2025-06-01.html', '2025-05-30.html'])
    const expected = `<ul><li><a href="/2025-06-01.html">2025-06-01</a></li> <li><a href="/2025-05-30.html">2025-05-30</a></li> </ul>`

    equal(got, expected)
  })

})