const VALID_PATTERN_REGEX = /^[a-z.]+$/;

export function normalizePattern(input) {
  return input.trim().toLowerCase();
}

export function normalizeLetterRule(input) {
  return input.toLowerCase().replace(/[^a-z]/g, "");
}

export function isPatternValid(pattern) {
  return VALID_PATTERN_REGEX.test(pattern);
}

export function matchesPattern(word, pattern) {
  const normalizedWord = word.trim().toLowerCase();
  const normalizedPattern = normalizePattern(pattern);

  if (!normalizedWord || !normalizedPattern) {
    return false;
  }

  if (normalizedWord.length !== normalizedPattern.length) {
    return false;
  }

  for (let index = 0; index < normalizedPattern.length; index += 1) {
    const token = normalizedPattern[index];

    if (token === ".") {
      continue;
    }

    if (normalizedWord[index] !== token) {
      return false;
    }
  }

  return true;
}

export function matchesLetterRules(word, includedLetters, excludedLetters) {
  const normalizedWord = word.trim().toLowerCase();
  const included = [...new Set(normalizeLetterRule(includedLetters).split(""))];
  const excluded = [...new Set(normalizeLetterRule(excludedLetters).split(""))];

  if (!normalizedWord) {
    return false;
  }

  for (const letter of included) {
    if (!normalizedWord.includes(letter)) {
      return false;
    }
  }

  for (const letter of excluded) {
    if (normalizedWord.includes(letter)) {
      return false;
    }
  }

  return true;
}

export function filterWordsByPattern(words, pattern) {
  const normalizedPattern = normalizePattern(pattern);

  if (!normalizedPattern || !isPatternValid(normalizedPattern)) {
    return [];
  }

  return words.filter((word) => matchesPattern(word, normalizedPattern));
}

export function filterWords(
  words,
  { pattern = "", includedLetters = "", excludedLetters = "" }
) {
  const normalizedPattern = normalizePattern(pattern);

  if (normalizedPattern && !isPatternValid(normalizedPattern)) {
    return [];
  }

  return words.filter((word) => {
    const patternMatches = normalizedPattern ? matchesPattern(word, normalizedPattern) : true;
    const letterRulesMatch = matchesLetterRules(word, includedLetters, excludedLetters);
    return patternMatches && letterRulesMatch;
  });
}
