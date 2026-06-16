import React from "react";

function SearchPanel({
  pattern,
  includedLetters,
  excludedLetters,
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
