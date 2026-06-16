import React from "react";

function SearchPanel({
  wordListId,
  wordListOptions,
  pattern,
  includedLetters,
  excludedLetters,
  onWordListChange,
  onPatternChange,
  onIncludedLettersChange,
  onExcludedLettersChange,
  onClear,
}) {
  return (
    <section className="panel">
      <div className="search-form">
        <label htmlFor="pattern-input">Pattern</label>
        <input
          id="pattern-input"
          name="pattern"
          type="text"
          placeholder="Example: a..le"
          autoComplete="off"
          value={pattern}
          onChange={(event) => onPatternChange(event.target.value)}
        />

        <label htmlFor="excluded-letters-input">Excluded letters</label>
        <input
          id="excluded-letters-input"
          name="excludedLetters"
          type="text"
          placeholder="Example: t, r"
          autoComplete="off"
          value={excludedLetters}
          onChange={(event) => onExcludedLettersChange(event.target.value)}
        />

        <label htmlFor="included-letters-input">Included letters</label>
        <input
          id="included-letters-input"
          name="includedLetters"
          type="text"
          placeholder="Example: ael"
          autoComplete="off"
          value={includedLetters}
          onChange={(event) => onIncludedLettersChange(event.target.value)}
        />

        <div className="action-row">
          <button type="button" className="secondary" onClick={onClear}>
            Clear
          </button>
          <div className="word-list-buttons">
            {wordListOptions.map((option) => {
              const shortLabel = option.id === "answers" ? "Answers" : "Valid";
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`list-button ${wordListId === option.id ? "active" : ""}`}
                  onClick={() => onWordListChange(option.id)}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPanel;
