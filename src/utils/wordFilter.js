const VALID_PATTERN_REGEX = /^[a-z.]+$/;

export function normalizePattern(input) {
  return input.trim().toLowerCase();
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

export function filterWordsByPattern(words, pattern) {
  const normalizedPattern = normalizePattern(pattern);

  if (!normalizedPattern || !isPatternValid(normalizedPattern)) {
    return [];
  }

  return words.filter((word) => matchesPattern(word, normalizedPattern));
}
