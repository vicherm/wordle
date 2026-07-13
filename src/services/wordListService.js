import wordListRaw from "../resources/wordle-answers-cs.csv?raw";
import validWordListRaw from "../resources/wordle-valid-cs.csv?raw";

const fallbackWords = ["crane", "slate", "adieu", "stare", "alone"];
const fallbackValidWords = ["crane", "slate", "stare", "adieu", "arise"];
const fallbackEntries = fallbackWords.map((word) => ({ word, translation: "" }));
const fallbackValidEntries = fallbackValidWords.map((word) => ({ word, translation: "" }));

export const WORD_LISTS = [
  { id: "answers", label: "Official Answers" },
  { id: "valid", label: "Valid Guess List" },
];

export function parseWordEntries(rawText) {
  if (!rawText) {
    return [];
  }

  const entries = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [word = "", ...translationParts] = line.split(",");

      return {
        word: word.trim().toLowerCase(),
        translation: translationParts.join(",").trim(),
      };
    })
    .filter((entry) => entry.word !== "word")
    .filter((entry) => /^[a-z]+$/.test(entry.word));

  return Object.values(
    entries.reduce((uniqueEntries, entry) => {
      if (!uniqueEntries[entry.word]) {
        uniqueEntries[entry.word] = entry;
      }

      return uniqueEntries;
    }, {})
  );
}

export function parseWordList(rawText) {
  return parseWordEntries(rawText).map((entry) => entry.word);
}

export function getWordList() {
  return getWordListById("answers");
}

export function getWordEntries() {
  return getWordEntriesById("answers");
}

export function getWordEntriesById(listId) {
  if (listId === "valid") {
    const valid = parseWordEntries(validWordListRaw);
    return valid.length > 0 ? valid : fallbackValidEntries;
  }

  const answers = parseWordEntries(wordListRaw);
  return answers.length > 0 ? answers : fallbackEntries;
}

export function getWordListById(listId) {
  return getWordEntriesById(listId).map((entry) => entry.word);
}
