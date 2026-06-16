import React from "react";

function SearchPanel({ pattern, onPatternChange, onSearch, onClear }) {
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
