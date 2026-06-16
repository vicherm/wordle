import React, { useMemo, useState } from "react";
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

  const helperText = useMemo(() => {
    if (!hasSearched) {
      return "Enter a pattern and click Search to view results here.";
    }

    if (searchedPattern && !isPatternValid(searchedPattern)) {
      return "Pattern can only contain letters and . placeholders.";
    }

    const overlappingLetters = [...searchedIncludedLetters].filter((letter) =>
      searchedExcludedLetters.includes(letter)
    );
    if (overlappingLetters.length > 0) {
      return "Included and excluded letters cannot overlap.";
    }

    if (results.length === 0) {
      return "No matches found for the selected rules.";
    }

    return `Found ${results.length} matches.`;
  }, [
    hasSearched,
    searchedPattern,
    searchedIncludedLetters,
    searchedExcludedLetters,
    results.length,
  ]);

  const handleSearch = () => {
    const hasAnyRule =
      normalizedPattern || normalizedIncludedLetters || normalizedExcludedLetters;

    if (!hasAnyRule) {
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

    if (overlappingLetters.length > 0) {
      setHasSearched(true);
      setSearchedPattern(normalizedPattern);
      setSearchedIncludedLetters(normalizedIncludedLetters);
      setSearchedExcludedLetters(normalizedExcludedLetters);
      setResults([]);
      return;
    }

    setHasSearched(true);
    setSearchedPattern(normalizedPattern);
    setSearchedIncludedLetters(normalizedIncludedLetters);
    setSearchedExcludedLetters(normalizedExcludedLetters);
    setResults(
      filterWords(wordList, {
        pattern: normalizedPattern,
        includedLetters: normalizedIncludedLetters,
        excludedLetters: normalizedExcludedLetters,
      })
    );
  };

  const handleClear = () => {
    setPattern("");
    setIncludedLetters("");
    setExcludedLetters("");
    setHasSearched(false);
    setSearchedPattern("");
    setSearchedIncludedLetters("");
    setSearchedExcludedLetters("");
    setResults([]);
  };

  const handleWordListChange = (nextWordListId) => {
    setWordListId(nextWordListId);
    setHasSearched(false);
    setSearchedPattern("");
    setSearchedIncludedLetters("");
    setSearchedExcludedLetters("");
    setResults([]);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Wordle Helper</p>
        <h1>Find Candidate Words Quickly</h1>
        <p className="subtitle">
          Use patterns like <strong>a..le</strong>, <strong>.r...</strong>, or an exact
          word.
        </p>
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
          onSearch={handleSearch}
          onClear={handleClear}
        />

        <ResultsPanel
          hasSearched={hasSearched}
          helperText={helperText}
          words={results}
          totalWords={wordList.length}
        />
      </main>
    </div>
  );
}

export default HomePage;
