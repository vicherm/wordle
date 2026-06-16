import { describe, expect, it } from "vitest";
import {
  filterWords,
  filterWordsByPattern,
  isPatternValid,
  matchesLetterRules,
  matchesPattern,
  normalizeLetterRule,
  normalizePattern,
} from "./wordFilter.js";

describe("wordFilter", () => {
  it("normalizes pattern input", () => {
    expect(normalizePattern("  A..LE ")).toBe("a..le");
  });

  it("validates allowed pattern tokens", () => {
    expect(isPatternValid("a..le")).toBe(true);
    expect(isPatternValid("abc12")).toBe(false);
  });

  it("enforces 5-letter pattern length", () => {
    expect(isPatternValid("a..l")).toBe(false);
    expect(isPatternValid("a..le")).toBe(true);
    expect(isPatternValid("a..le.")).toBe(false);
    expect(isPatternValid("crane")).toBe(true);
    expect(isPatternValid("cr")).toBe(false);
  });

  it("matches exact patterns", () => {
    expect(matchesPattern("crane", "crane")).toBe(true);
    expect(matchesPattern("crate", "crane")).toBe(false);
  });

  it("matches dot placeholders by position", () => {
    expect(matchesPattern("apple", "a..le")).toBe(true);
    expect(matchesPattern("addle", "a..le")).toBe(true);
    expect(matchesPattern("angle", "a..le")).toBe(true);
    expect(matchesPattern("ample", "a..lz")).toBe(false);
  });

  it("filters words from a list", () => {
    const words = ["apple", "angle", "alone", "amble", "crane"];
    expect(filterWordsByPattern(words, "a..le")).toEqual([
      "apple",
      "angle",
      "amble",
    ]);
  });

  it("returns empty results for invalid patterns", () => {
    const words = ["apple", "angle", "alone"];
    expect(filterWordsByPattern(words, "a..l3")).toEqual([]);
    expect(filterWordsByPattern(words, "")).toEqual([]);
    expect(filterWordsByPattern(words, "abc")).toEqual([]);
  });

  it("normalizes letter rule input", () => {
    expect(normalizeLetterRule(" A, l e ")).toBe("ale");
  });

  it("matches included and excluded letter rules", () => {
    expect(matchesLetterRules("angle", "ae", "r")).toBe(true);
    expect(matchesLetterRules("angle", "az", "r")).toBe(false);
    expect(matchesLetterRules("crane", "ae", "r")).toBe(false);
  });

  it("allows excluded letters only in fixed pattern positions", () => {
    expect(matchesLetterRules("angle", "", "a", "a..le")).toBe(true);
    expect(matchesLetterRules("amale", "", "a", "a..le")).toBe(false);
    expect(matchesLetterRules("paler", "", "p", "p....")).toBe(true);
    expect(matchesLetterRules("poppy", "", "p", "p....")).toBe(false);
  });

  it("applies pattern and letter rules together", () => {
    const words = ["apple", "angle", "amble", "adore", "crane"];
    expect(
      filterWords(words, {
        pattern: "a..le",
        includedLetters: "l",
        excludedLetters: "p",
      })
    ).toEqual(["angle", "amble"]);
  });

  it("supports letter-only filtering when pattern is empty", () => {
    const words = ["apple", "angle", "alone", "stare"];
    expect(
      filterWords(words, {
        pattern: "",
        includedLetters: "a",
        excludedLetters: "n",
      })
    ).toEqual(["apple", "stare"]);
  });

  it("keeps pattern-fixed excluded letters and removes extra occurrences", () => {
    const words = ["angle", "amale", "addle"];
    expect(
      filterWords(words, {
        pattern: "a..le",
        excludedLetters: "a",
      })
    ).toEqual(["angle", "addle"]);
  });

  it("rejects patterns that are not 5 characters", () => {
    const words = ["apple", "angle", "alone"];
    expect(
      filterWords(words, {
        pattern: "abc",
        includedLetters: "",
        excludedLetters: "",
      })
    ).toEqual([]);
  });
});
