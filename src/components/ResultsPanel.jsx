import React from "react";

function ResultsPanel({ hasSearched, helperText, words, totalWords }) {
  return (
    <section className="panel" aria-labelledby="results-heading">
      <div className="panel-head">
        <h2 id="results-heading">Results</h2>
        <p className="results-count">
          {hasSearched ? `Matches: ${words.length}` : `Word list: ${totalWords} words`}
        </p>
      </div>

      <p className="helper-text">{helperText}</p>

      {(!hasSearched || words.length === 0) && <p className="empty-state">{helperText}</p>}

      {hasSearched && words.length > 0 && (
        <ul className="result-list" aria-label="Sample words">
          {words.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ResultsPanel;
