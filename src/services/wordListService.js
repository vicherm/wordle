import wordListRaw from "../resources/wordle-answers.txt?raw";
import validWordListRaw from "../resources/wordle-valid.txt?raw";

const fallbackWords = ["crane", "slate", "adieu", "stare", "alone"];
const fallbackValidWords = ["crane", "slate", "stare", "adieu", "arise"];

export const WORD_LISTS = [
  { id: "answers", label: "Official Answers" },
  { id: "valid", label: "Valid Guess List" },
];

export function parseWordList(rawText) {
  if (!rawText) {
    return [];
  }

  const words = rawText
    .split("\n")
    .map((line) => line.trim().toLowerCase())
    .filter((line) => /^[a-z]+$/.test(line));

  return [...new Set(words)];
}

export function getWordList() {
  return getWordListById("answers");
}

export function getWordListById(listId) {
  if (listId === "valid") {
    const valid = parseWordList(validWordListRaw);
    return valid.length > 0 ? valid : fallbackValidWords;
  }

  const answers = parseWordList(wordListRaw);
  return answers.length > 0 ? answers : fallbackWords;
}
