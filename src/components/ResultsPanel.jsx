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
        <div className="result-table-wrapper">
          <table className="result-table" aria-label="Search results">
            <thead>
              <tr>
                <th scope="col">Word</th>
                <th scope="col">Czech</th>
              </tr>
            </thead>
            <tbody>
              {words.map((entry) => (
                <tr key={entry.word}>
                  <td>{entry.word}</td>
                  <td>{entry.translation || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ResultsPanel;
