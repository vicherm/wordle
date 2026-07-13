import { describe, expect, it } from "vitest";
import {
  getWordEntriesById,
  getWordList,
  getWordListById,
  parseWordEntries,
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

  it("parses CSV word lists by using the first column", () => {
    expect(
      parseWordList(
        "word,translation_cs\nCrane,jerab\ncrane,duplicitni\nAPPLE,jablko\ninvalid1,neplatne\n"
      )
    ).toEqual(["crane", "apple"]);
  });

  it("parses CSV word entries with translations", () => {
    expect(
      parseWordEntries(
        "word,translation_cs\nCrane,jerab\ncrane,duplicitni\nAPPLE,jablko\n"
      )
    ).toEqual([
      { word: "crane", translation: "jerab" },
      { word: "apple", translation: "jablko" },
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

  it("returns word entries with Czech translations", () => {
    const validEntries = getWordEntriesById("valid");
    const craneEntry = validEntries.find((entry) => entry.word === "crane");

    expect(validEntries.length).toBeGreaterThan(1000);
    expect(craneEntry).toEqual({ word: "crane", translation: "jeřáb" });
  });

  it("falls back to answers list for unknown list ids", () => {
    const fallback = getWordListById("unknown");
    expect(fallback).toContain("cigar");
  });
});
