import React from "react";

function ResultsPanel({ hasSearched, helperText, words }) {
  return (
    <section className="panel" aria-labelledby="results-heading">
      <div className="panel-head">
        <h2 id="results-heading">Results</h2>
        <p className="results-count">Sample list: {words.length} words</p>
      </div>

      <p className="helper-text">{helperText}</p>

      {!hasSearched && (
        <p className="empty-state">
          Filtering is not implemented yet. This area is ready for result rendering.
        </p>
      )}

      {hasSearched && (
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
