import { it, describe } from "node:test";
import { equal } from "node:assert";
import { getNavElement } from "./nav.js";

describe("getNavElement", () => {
  it("returns links to the passed files without '.html'", () => {
    const got = getNavElement(['2025-06-01.html', '2025-05-30.html'], new Date(2025, 5, 2))
    const expected = `<ul><li><a href="/2025-06-01.html">2025-06-01</a></li> <li><a href="/2025-05-30.html">2025-05-30</a></li> </ul>`
    equal(got, expected)
  })

  it("does not include files that were longer than 21 days ago", () => {
    const got = getNavElement([
      '2025-01-9.html', //included
      '2025-01-8.html' // not included
    ], new Date(2025, 0, 30)) // month is 0-indexed
    const expected = `<ul><li><a href="/2025-01-9.html">2025-01-9</a></li> </ul>`
    equal(got, expected)
  })

  it("sorts dates, last first", () => {
    const got = getNavElement(['2025-01-25.html', '2025-01-24.html', '2025-01-26.html'],
      new Date(2025, 0, 30))
    const expected = `<ul><li><a href="/2025-01-26.html">2025-01-26</a></li> <li><a href="/2025-01-25.html">2025-01-25</a></li> <li><a href="/2025-01-24.html">2025-01-24</a></li> </ul>`
    equal(got, expected)
  })

  it("returns an empty <ul></ul> if everything is longer than 21 days ago", () => {
    const got = getNavElement(['2024-01-25.html', '2024-01-24.html'],
      new Date(2025, 0, 30))
    const expected = `<ul></ul>`
    equal(got, expected)
  })

  it("returns an empty <ul></ul> if no files are provided", () => {
    const got = getNavElement([], new Date(2025, 0, 30))
    const expected = `<ul></ul>`
    equal(got, expected)
  })
})