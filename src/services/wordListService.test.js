import { describe, expect, it } from "vitest";
import {
  getWordList,
  getWordListById,
  parseWordList,
  WORD_LISTS,
} from "./wordListService.js";

describe("wordListService", () => {
  it("exposes two selectable word list options", () => {
    expect(WORD_LISTS).toHaveLength(2);
    expect(WORD_LISTS.map((option) => option.id)).toEqual(["answers", "valid"]);
  });

  it("parses, normalizes, and deduplicates raw text", () => {
    expect(parseWordList(" Crane\ncrane\nAPPLE\ninvalid1\n")).toEqual([
      "crane",
      "apple",
    ]);
  });

  it("returns default answers list", () => {
    const answers = getWordList();
    expect(answers.length).toBeGreaterThan(100);
    expect(answers).toContain("cigar");
  });

  it("returns valid guess list when selected", () => {
    const valid = getWordListById("valid");
    expect(valid.length).toBeGreaterThan(1000);
    expect(valid).toContain("crane");
  });

  it("falls back to answers list for unknown list ids", () => {
    const fallback = getWordListById("unknown");
    expect(fallback).toContain("cigar");
  });
});
