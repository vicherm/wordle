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
  onSearch,
  onClear,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="panel" aria-labelledby="search-heading">
      <div className="panel-head">
        <h2 id="search-heading">Search</h2>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="word-list-buttons">
          {wordListOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`list-button ${wordListId === option.id ? "active" : ""}`}
              onClick={() => onWordListChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

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
          <button type="submit">Search</button>
          <button type="button" className="secondary" onClick={onClear}>
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchPanel;
