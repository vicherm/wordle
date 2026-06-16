import React, { useMemo, useState } from "react";
import SearchPanel from "../components/SearchPanel.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";

const sampleWords = ["crane", "slate", "adieu", "stare", "alone"];

function HomePage() {
  const [pattern, setPattern] = useState("");
  const [searchedPattern, setSearchedPattern] = useState("");

  const hasSearched = searchedPattern.length > 0;
  const normalizedPattern = pattern.trim().toLowerCase();

  const helperText = useMemo(() => {
    if (!hasSearched) {
      return "Enter a pattern and click Search to view results here.";
    }

    return `Search executed for pattern: ${searchedPattern}`;
  }, [hasSearched, searchedPattern]);

  const handleSearch = () => {
    setSearchedPattern(normalizedPattern);
  };

  const handleClear = () => {
    setPattern("");
    setSearchedPattern("");
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
          words={sampleWords}
        />
      </main>
    </div>
  );
}

export default HomePage;
