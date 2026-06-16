import wordListRaw from "../resources/wordle-answers.txt?raw";

const fallbackWords = ["crane", "slate", "adieu", "stare", "alone"];

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
  const parsed = parseWordList(wordListRaw);
  return parsed.length > 0 ? parsed : fallbackWords;
}
