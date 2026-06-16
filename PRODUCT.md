# Product: Wordle Helper

## Overview

Wordle Helper is a React application built with Vite that helps users find valid five-letter words from local word lists using pattern matching and letter-based filtering.

The app is fast, minimal, and requires no backend.

## Features Implemented

### Core Search Capabilities

- **Pattern Matching**: Search using 5-letter patterns with fixed letters and dot (`.`) placeholders
  - Example: `a..le` matches words with `a` at position 0 and `le` at positions 3-4
  - Exact matches: `crane` matches only "crane"
  - Placeholders: `.....` matches any 5-letter word

- **Excluded Letters**: Filter out words containing specific letters
  - If a letter is fixed in the pattern, it's allowed only at that position
  - If a letter is not in the pattern, it cannot appear anywhere

- **Included Letters**: Require words to contain specific letters (in any position)
  - Works in combination with pattern and excluded letters

- **Selectable Word Lists**: Choose between two dictionaries via button toggle
  - Official Answers: Curated list of valid Wordle answers
  - Valid Guess List: Larger list of valid 5-letter guesses

### User Interface

- **Compact Design**: Minimal spacing and layout for efficiency
- **Auto-Search**: Results update instantly as you type
  - Pattern automatically triggers search when 5 letters are entered
  - Included/excluded letters filter results immediately
  - No manual Search button needed
- **Quick Controls**:
  - Pattern input (exactly 5 characters)
  - Excluded letters input
  - Included letters input
  - Clear button (left) - reset all fields
  - Word list selector (right) - toggle between "Answers" and "Valid"
- **Results Panel**: Displays match count and word list
- **Error Handling**: Shows validation errors for invalid patterns or overlapping rules
- **Visual Hierarchy**: Clear visual distinction between Clear action and word list selection
- **Responsive**: Works on desktop and mobile

## Data Source

- Words loaded from local text files (`wordle-answers.txt`, `wordle-valid.txt`)
- Loaded via Vite's raw import at build time
- No backend required

## Technical Implementation

### Architecture

- **React Functional Components**: All components built with hooks
- **Separation of Concerns**:
  - `services/wordListService.js`: Handles word list loading and selection
  - `utils/wordFilter.js`: Pure functions for pattern matching and letter rule evaluation
  - `components/`: UI components (SearchPanel, ResultsPanel)
  - `pages/HomePage.jsx`: Main application logic and state management

### Pattern Matching Logic

- Valid characters: `a-z` (letters) and `.` (placeholder)
- Exactly 5 characters required
- Dot placeholders match any letter at that position
- Fixed letters must match exactly at their position

### Letter Rules

- Included letters must appear somewhere in the word
- Excluded letters cannot appear except where fixed by pattern
- Rules can combine with pattern constraints

### State Management

- **HomePage.jsx**: Main component using React hooks (useState, useEffect, useMemo)
- **Auto-search via useEffect**: Watches pattern and letter inputs, triggers filtering when:
  - Pattern reaches exactly 5 characters, OR
  - Included/excluded letters are entered
- **Form state**: Pattern, included letters, excluded letters
- **Search state**: Previous search values to determine when new filtering is needed
- **Results**: Filtered word list updated in real-time

### UI Layout

- **Action Row**: Clear button (left) and word list selector (right) in single row
- **Clear Button**: Slate gray styling for distinct visual hierarchy
- **Word List Selector**: Bordered container with "Answers" and "Valid" toggle buttons
- **Input Stack**: Pattern, excluded letters, included letters stacked vertically above actions
- **Minimal Spacing**: 6px gaps between form elements, 2px panel shadow for depth

### Testing

- Unit tests for all filter functions (19 tests passing)
- Tests cover edge cases: validation, length constraints, rule combinations
- Service tests verify word list loading and selection

## Build & Deployment

- Built with Vite for fast development and minimal bundle size
- Production build: ~92KB gzipped
- No external dependencies beyond React

## Functional Requirements Met

✓ Search words from local text files  
✓ Filter by 5-letter pattern (fixed letters + placeholders)  
✓ Filter by included letters  
✓ Filter by excluded letters (with pattern awareness)  
✓ Auto-search as user types (no manual button required)  
✓ Show match count  
✓ Show matching words in list  
✓ Allow clearing search  
✓ Handle empty results gracefully  
✓ Select between word lists  
✓ Validate pattern length (exactly 5)  
✓ Validate pattern format (letters and dots only)  
✓ Validate no overlapping included/excluded letters  

## Non-Functional Requirements Met

✓ Minimal, compact UI  
✓ Fast filtering (pure functions, memoized results)  
✓ No unnecessary dependencies  
✓ Clean, readable, maintainable code  
✓ Fully unit tested  
✓ Mobile-responsive design  

## Out of Scope

- Multiplayer features
- Online dictionary lookup
- User accounts
- Game automation
- Backend API
- Persistence/bookmarking