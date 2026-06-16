import React, { useMemo, useState, useEffect } from "react";
import SearchPanel from "../components/SearchPanel.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import { getWordListById, WORD_LISTS } from "../services/wordListService.js";
import {
  filterWords,
  isPatternValid,
  normalizeLetterRule,
  normalizePattern,
} from "../utils/wordFilter.js";

function HomePage() {
  const [wordListId, setWordListId] = useState("answers");
  const [pattern, setPattern] = useState("");
  const [includedLetters, setIncludedLetters] = useState("");
  const [excludedLetters, setExcludedLetters] = useState("");
  const [searchedPattern, setSearchedPattern] = useState("");
  const [searchedIncludedLetters, setSearchedIncludedLetters] = useState("");
  const [searchedExcludedLetters, setSearchedExcludedLetters] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);

  const wordList = useMemo(() => getWordListById(wordListId), [wordListId]);

  const normalizedPattern = normalizePattern(pattern);
  const normalizedIncludedLetters = normalizeLetterRule(includedLetters);
  const normalizedExcludedLetters = normalizeLetterRule(excludedLetters);

  const errorMessage = useMemo(() => {
    if (!hasSearched) return "";
    if (searchedPattern && searchedPattern.length !== 5) {
      return "Pattern must be 5 characters";
    }
    if (searchedPattern && !isPatternValid(searchedPattern)) {
      return "Pattern: letters and . only";
    }
    const overlappingLetters = [...searchedIncludedLetters].filter((letter) =>
      searchedExcludedLetters.includes(letter)
    );
    if (overlappingLetters.length > 0) {
      return "Included and excluded overlap";
    }
    return "";
  }, [hasSearched, searchedPattern, searchedIncludedLetters, searchedExcludedLetters]);

  useEffect(() => {
    const shouldSearch =
      (normalizedPattern && normalizedPattern.length === 5) ||
      normalizedIncludedLetters ||
      normalizedExcludedLetters;

    if (!shouldSearch) {
      setHasSearched(false);
      setSearchedPattern("");
      setSearchedIncludedLetters("");
      setSearchedExcludedLetters("");
      setResults([]);
      return;
    }

    const overlappingLetters = [...normalizedIncludedLetters].filter((letter) =>
      normalizedExcludedLetters.includes(letter)
    );

    setHasSearched(true);
    setSearchedPattern(normalizedPattern);
    setSearchedIncludedLetters(normalizedIncludedLetters);
    setSearchedExcludedLetters(normalizedExcludedLetters);

    if (overlappingLetters.length > 0) {
      setResults([]);
      return;
    }

    setResults(
      filterWords(wordList, {
        pattern: normalizedPattern,
        includedLetters: normalizedIncludedLetters,
        excludedLetters: normalizedExcludedLetters,
      })
    );
  }, [normalizedPattern, normalizedIncludedLetters, normalizedExcludedLetters, wordList]);

  const handleClear = () => {
    setPattern("");
    setIncludedLetters("");
    setExcludedLetters("");
  };

  const handleWordListChange = (nextWordListId) => {
    setWordListId(nextWordListId);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Wordle Helper</h1>
      </header>

      <main className="app-main">
        <SearchPanel
          wordListId={wordListId}
          wordListOptions={WORD_LISTS}
          pattern={pattern}
          includedLetters={includedLetters}
          excludedLetters={excludedLetters}
          onWordListChange={handleWordListChange}
          onPatternChange={setPattern}
          onIncludedLettersChange={setIncludedLetters}
          onExcludedLettersChange={setExcludedLetters}
          onClear={handleClear}
        />

        <ResultsPanel
          hasSearched={hasSearched}
          errorMessage={errorMessage}
          words={results}
          totalWords={wordList.length}
        />
      </main>
    </div>
  );
}

export default HomePage;
