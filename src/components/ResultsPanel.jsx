import React from "react";

function ResultsPanel({ hasSearched, errorMessage, words, totalWords }) {
  return (
    <section className="panel" aria-labelledby="results-heading">
      <div className="panel-head">
        <h2 id="results-heading">Results</h2>
        <p className="results-count">
          {hasSearched ? words.length : totalWords}
        </p>
      </div>

      {errorMessage && <p className="error-text">{errorMessage}</p>}

      {hasSearched && words.length > 0 && (
        <ul className="result-list" aria-label="Search results">
          {words.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ResultsPanel;
