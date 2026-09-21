import React, { useEffect, useRef, useState } from "react";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [".", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];
const EMPTY_PATTERN_CELLS = Array(5).fill(".");

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
  const [activeInput, setActiveInput] = useState("");
  const [activePatternIndex, setActivePatternIndex] = useState(0);
  const [patternCells, setPatternCells] = useState(() =>
    Array.from({ length: 5 }, (_, index) => pattern[index] ?? ".")
  );
  const patternInputRefs = useRef([]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!event.target.closest("input, .virtual-keyboard")) {
        setActiveInput("");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    setActiveInput("pattern");
    patternInputRefs.current[0]?.focus();
  }, []);

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

  const updatePatternCell = (index, value) => {
    const nextCells = patternCells.map((cell, cellIndex) =>
      cellIndex === index ? value : cell
    );

    setPatternCells(nextCells);
    onPatternChange(nextCells.every(Boolean) ? nextCells.join("") : "");
  };

  const focusPatternCell = (index) => {
    const nextIndex = Math.max(0, Math.min(index, patternCells.length - 1));
    setActivePatternIndex(nextIndex);
    patternInputRefs.current[nextIndex]?.focus();
  };

  const handlePatternCellChange = (index, value) => {
    const nextValue = value.toUpperCase().slice(-1);

    if (nextValue && !/^[A-Z.]$/.test(nextValue)) return;
    updatePatternCell(index, nextValue);

    if (nextValue && index < patternCells.length - 1) {
      focusPatternCell(index + 1);
    }
  };

  const handlePatternCellKeyDown = (event, index) => {
    if (/^[a-z.]$/i.test(event.key)) {
      event.preventDefault();
      updatePatternCell(index, event.key.toUpperCase());

      if (index < patternCells.length - 1) {
        focusPatternCell(index + 1);
      }
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();

      if (patternCells[index] !== ".") {
        updatePatternCell(index, ".");
        return;
      }

      if (index > 0) {
        updatePatternCell(index - 1, ".");
        focusPatternCell(index - 1);
      }
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusPatternCell(index - 1);
      return;
    }

    if (event.key === "ArrowRight" && index < patternCells.length - 1) {
      event.preventDefault();
      focusPatternCell(index + 1);
    }
  };

  const handleClear = () => {
    setPatternCells(EMPTY_PATTERN_CELLS);
    setActivePatternIndex(0);
    setActiveInput("pattern");
    onClear();
    patternInputRefs.current[0]?.focus();
  };

  const handleKeyboardKey = (key) => {
    if (!activeInput) return;

    if (activeInput === "pattern") {
      if (key === "BACKSPACE") {
        if (patternCells[activePatternIndex] !== ".") {
          updatePatternCell(activePatternIndex, ".");
          return;
        }

        if (activePatternIndex > 0) {
          updatePatternCell(activePatternIndex - 1, ".");
          focusPatternCell(activePatternIndex - 1);
        }
        return;
      }

      updatePatternCell(activePatternIndex, key);
      if (activePatternIndex < patternCells.length - 1) {
        focusPatternCell(activePatternIndex + 1);
      }
      return;
    }

    if (key === "BACKSPACE") {
      inputChanges[activeInput](inputValues[activeInput].slice(0, -1));
      return;
    }

    inputChanges[activeInput](`${inputValues[activeInput]}${key}`);
  };

  return (
    <section className="panel">
      <div className="search-form">
        <div className="pattern-controls">
          <div className="pattern-boxes" role="group" aria-label="Pattern">
            {patternCells.map((value, index) => (
              <input
                key={index}
                ref={(element) => {
                  patternInputRefs.current[index] = element;
                }}
                className="pattern-box"
                type="text"
                inputMode="none"
                maxLength="1"
                autoComplete="off"
                aria-label={`Pattern position ${index + 1}`}
                value={value}
                onChange={(event) => handlePatternCellChange(index, event.target.value)}
                onKeyDown={(event) => handlePatternCellKeyDown(event, index)}
                onFocus={() => {
                  setActiveInput("pattern");
                  setActivePatternIndex(index);
                }}
              />
            ))}
          </div>
          <button type="button" className="secondary" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="filter-controls">
          <div className="filter-row">
            <label htmlFor="excluded-letters-input">Excluded</label>
            <input
              id="excluded-letters-input"
              name="excludedLetters"
              type="text"
              inputMode="none"
              placeholder="Example: t, r"
              autoComplete="off"
              value={excludedLetters}
              onChange={(event) => onExcludedLettersChange(event.target.value)}
              onFocus={() => setActiveInput("excludedLetters")}
            />
          </div>

          <div className="filter-row">
            <label htmlFor="included-letters-input">Included</label>
            <input
              id="included-letters-input"
              name="includedLetters"
              type="text"
              inputMode="none"
              placeholder="Example: ael"
              autoComplete="off"
              value={includedLetters}
              onChange={(event) => onIncludedLettersChange(event.target.value)}
              onFocus={() => setActiveInput("includedLetters")}
            />
          </div>

          <div className="word-list-buttons">
            {wordListOptions.map((option) => {
              const shortLabel = option.id === "answers" ? "Answers" : "All";
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
