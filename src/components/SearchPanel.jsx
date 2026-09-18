import React, { useEffect, useState } from "react";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [".", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

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
  const [showOptionalFilters, setShowOptionalFilters] = useState(false);
  const [activeInput, setActiveInput] = useState("");

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!event.target.closest("input, .virtual-keyboard")) {
        setActiveInput("");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const toggleOptionalFilters = () => {
    setShowOptionalFilters((previous) => !previous);
  };

  const inputValues = {
    pattern,
    includedLetters,
    excludedLetters,
  };

  const inputChanges = {
    pattern: onPatternChange,
    includedLetters: onIncludedLettersChange,
    excludedLetters: onExcludedLettersChange,
  };

  const handleKeyboardKey = (key) => {
    if (!activeInput) return;

    if (key === "BACKSPACE") {
      inputChanges[activeInput](inputValues[activeInput].slice(0, -1));
      return;
    }

    inputChanges[activeInput](`${inputValues[activeInput]}${key}`);
  };

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
          onFocus={() => setActiveInput("pattern")}
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
          onFocus={() => setActiveInput("excludedLetters")}
        />

        <div className="action-row">
          <button type="button" className="secondary" onClick={onClear}>
            Clear
          </button>
          <button
            type="button"
            className="tertiary"
            onClick={toggleOptionalFilters}
            aria-expanded={showOptionalFilters}
            aria-controls="optional-filters"
          >
            {showOptionalFilters ? "Hide optional" : "Show optional"}
          </button>
        </div>

        {showOptionalFilters && (
          <div id="optional-filters" className="optional-filters">
            <label htmlFor="included-letters-input">Included letters</label>
            <input
              id="included-letters-input"
              name="includedLetters"
              type="text"
              placeholder="Example: ael"
              autoComplete="off"
              value={includedLetters}
              onChange={(event) => onIncludedLettersChange(event.target.value)}
              onFocus={() => setActiveInput("includedLetters")}
            />

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
        )}

        {activeInput && (
          <div className="virtual-keyboard" aria-label="Letter keyboard">
            {KEYBOARD_ROWS.map((row) => (
              <div key={row.join("")} className="keyboard-row">
                {row.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="keyboard-key"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleKeyboardKey(key)}
                    aria-label={key === "BACKSPACE" ? "Backspace" : undefined}
                  >
                    {key === "BACKSPACE" ? "←" : key}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchPanel;
