import React, { useMemo, useState } from "react";
import SearchPanel from "../components/SearchPanel.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import { getWordList } from "../services/wordListService.js";
import { filterWordsByPattern, isPatternValid } from "../utils/wordFilter.js";

function HomePage() {
  const [wordList] = useState(() => getWordList());
  const [pattern, setPattern] = useState("");
  const [searchedPattern, setSearchedPattern] = useState("");
  const [results, setResults] = useState([]);

  const hasSearched = searchedPattern.length > 0;
  const normalizedPattern = pattern.trim().toLowerCase();

  const helperText = useMemo(() => {
    if (!hasSearched) {
      return "Enter a pattern and click Search to view results here.";
    }

    if (!isPatternValid(searchedPattern)) {
      return "Pattern can only contain letters and . placeholders.";
    }

    if (results.length === 0) {
      return `No matches found for \"${searchedPattern}\".`;
    }

    return `Found ${results.length} matches for \"${searchedPattern}\".`;
  }, [hasSearched, searchedPattern, results.length]);

  const handleSearch = () => {
    if (!normalizedPattern) {
      setSearchedPattern("");
      setResults([]);
      return;
    }

    setSearchedPattern(normalizedPattern);
    setResults(filterWordsByPattern(wordList, normalizedPattern));
  };

  const handleClear = () => {
    setPattern("");
    setSearchedPattern("");
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
          pattern={pattern}
          onPatternChange={setPattern}
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
